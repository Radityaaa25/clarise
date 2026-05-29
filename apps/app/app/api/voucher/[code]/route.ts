import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const resolvedParams = await params;
  const { code } = resolvedParams;
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // `code` is already extracted from `resolvedParams` at the top of the function

    const voucher = await prisma.voucher.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!voucher) {
      return NextResponse.json(
        { error: "Voucher tidak ditemukan" },
        { status: 404 },
      );
    }

    const isExpired = new Date(voucher.expiresAt) < new Date();
    const isFull = voucher.usedCount >= voucher.maxUses;

    // Check if user already redeemed
    const alreadyRedeemed = await prisma.voucherRedemption.findUnique({
      where: {
        voucherId_userId: {
          voucherId: voucher.id,
          userId: userId, // Wait, prisma schema has `userId` referencing User.id, but clerk passes clerkId. We must look up the user.id!
        },
      },
    });

    // Need to fix user ID look up before proceeding
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hasRedeemed = await prisma.voucherRedemption.findUnique({
      where: {
        voucherId_userId: {
          voucherId: voucher.id,
          userId: user.id,
        },
      },
    });

    return NextResponse.json({
      isValid: !isExpired && !isFull && !hasRedeemed,
      type: voucher.type,
      trialDays: voucher.trialDays,
      discountPct: voucher.discountPct,
      reason: isExpired
        ? "Expired"
        : isFull
          ? "Fully claimed"
          : hasRedeemed
            ? "Already redeemed"
            : null,
    });
  } catch (error) {
    console.error("[VOUCHER_VALIDATE_GET]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
