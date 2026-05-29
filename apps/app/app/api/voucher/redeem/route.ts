import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const redeemSchema = z.object({
  code: z.string().trim().toUpperCase(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = redeemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { code } = parsed.data;

    // Start Transaction
    const result = await prisma.$transaction(async (tx) => {
      const voucher = await tx.voucher.findUnique({
        where: { code },
      });

      if (!voucher) throw new Error("VOUCHER_NOT_FOUND");
      if (new Date(voucher.expiresAt) < new Date())
        throw new Error("VOUCHER_EXPIRED");
      if (voucher.usedCount >= voucher.maxUses) throw new Error("VOUCHER_FULL");

      const existingRedemption = await tx.voucherRedemption.findUnique({
        where: {
          voucherId_userId: { voucherId: voucher.id, userId: user.id },
        },
      });

      if (existingRedemption) throw new Error("VOUCHER_ALREADY_REDEEMED");

      // 1. Mark as redeemed
      await tx.voucherRedemption.create({
        data: {
          voucherId: voucher.id,
          userId: user.id,
        },
      });

      // 2. Increment usage
      await tx.voucher.update({
        where: { id: voucher.id },
        data: { usedCount: { increment: 1 } },
      });

      // 3. Apply rewards based on type
      if (voucher.type === "TRIAL") {
        const trialDays = voucher.trialDays || 30;
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + trialDays);

        // Update or create subscription
        await tx.subscription.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            status: "ACTIVE",
            plan: "PREMIUM_TRIAL",
            startDate: new Date(),
            endDate: endDate,
          },
          update: {
            status: "ACTIVE",
            plan: "PREMIUM_TRIAL",
            endDate: endDate,
          },
        });
      }

      return {
        type: voucher.type,
        trialDays: voucher.trialDays,
        discountPct: voucher.discountPct,
      };
    });

    // Clear Redis cache so user immediately gets Premium access
    const { redis } = await import("@/lib/ratelimit");
    await redis.del(`sub:${user.id}`);

    return NextResponse.json({ success: true, reward: result });
  } catch (error: any) {
    console.error("[VOUCHER_REDEEM]", error);

    // Check known application errors
    if (error.message === "VOUCHER_NOT_FOUND")
      return NextResponse.json(
        { error: "Voucher tidak ditemukan" },
        { status: 404 },
      );
    if (error.message === "VOUCHER_EXPIRED")
      return NextResponse.json(
        { error: "Voucher kedaluwarsa" },
        { status: 400 },
      );
    if (error.message === "VOUCHER_FULL")
      return NextResponse.json(
        { error: "Kuota voucher penuh" },
        { status: 400 },
      );
    if (error.message === "VOUCHER_ALREADY_REDEEMED")
      return NextResponse.json(
        { error: "Anda sudah mengklaim voucher ini" },
        { status: 400 },
      );

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
