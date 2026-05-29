import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const referralSchema = z.object({
  code: z.string().trim().toUpperCase(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = referralSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { code } = parsed.data;

    // Current user (who is applying the code)
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, referredBy: true, createdAt: true },
    });

    if (!currentUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check if user has already used a referral code
    if (currentUser.referredBy) {
      return NextResponse.json(
        { error: "Anda sudah pernah menggunakan kode referral" },
        { status: 400 },
      );
    }

    // Check if the user's account is too old to use a referral code (e.g., must be within 7 days of signup)
    const accountAgeDays =
      (new Date().getTime() - new Date(currentUser.createdAt).getTime()) /
      (1000 * 60 * 60 * 24);
    if (accountAgeDays > 7) {
      return NextResponse.json(
        {
          error:
            "Kode referral hanya bisa digunakan oleh akun baru (maksimal 7 hari sejak daftar)",
        },
        { status: 400 },
      );
    }

    // Find the referrer
    const referrer = await prisma.user.findUnique({
      where: { referralCode: code },
      select: { id: true },
    });

    if (!referrer) {
      return NextResponse.json(
        { error: "Kode referral tidak valid" },
        { status: 404 },
      );
    }

    if (referrer.id === currentUser.id) {
      return NextResponse.json(
        { error: "Anda tidak bisa menggunakan kode referral Anda sendiri" },
        { status: 400 },
      );
    }

    // Begin Transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check max 3 rewards for referrer
      const referralCount = await tx.referralLog.count({
        where: { referrerId: referrer.id, rewardGiven: true },
      });

      const giveReward = referralCount < 3;

      // 2. Log the referral
      await tx.referralLog.create({
        data: {
          referrerId: referrer.id,
          referredId: currentUser.id,
          rewardGiven: giveReward,
        },
      });

      // 3. Update current user's referredBy
      await tx.user.update({
        where: { id: currentUser.id },
        data: { referredBy: code },
      });

      // 4. Give reward to referrer if eligible (7 days premium trial)
      if (giveReward) {
        // Upsert subscription for referrer
        const existingSub = await tx.subscription.findUnique({
          where: { userId: referrer.id },
        });

        let newEndDate = new Date();
        newEndDate.setDate(newEndDate.getDate() + 7);

        // If active premium, extend it by 7 days
        if (
          existingSub &&
          existingSub.status === "ACTIVE" &&
          existingSub.endDate
        ) {
          const currentEnd = new Date(existingSub.endDate);
          if (currentEnd > new Date()) {
            newEndDate = new Date(currentEnd);
            newEndDate.setDate(newEndDate.getDate() + 7);
          }
        }

        await tx.subscription.upsert({
          where: { userId: referrer.id },
          create: {
            userId: referrer.id,
            status: "ACTIVE",
            plan: "PREMIUM_TRIAL",
            startDate: new Date(),
            endDate: newEndDate,
          },
          update: {
            status: "ACTIVE",
            plan:
              existingSub?.plan === "FREE"
                ? "PREMIUM_TRIAL"
                : existingSub?.plan,
            endDate: newEndDate,
          },
        });
      }

      // 5. Reward the referred user too? (e.g. 3 days trial)
      const referredTrialDays = 3;
      let referredEndDate = new Date();
      referredEndDate.setDate(referredEndDate.getDate() + referredTrialDays);

      await tx.subscription.upsert({
        where: { userId: currentUser.id },
        create: {
          userId: currentUser.id,
          status: "ACTIVE",
          plan: "PREMIUM_TRIAL",
          startDate: new Date(),
          endDate: referredEndDate,
        },
        update: {
          status: "ACTIVE",
          plan: "PREMIUM_TRIAL", // Override free plan
          endDate: referredEndDate,
        },
      });

      return { giveReward, referredTrialDays };
    });

    return NextResponse.json({
      success: true,
      message: `Kode berhasil diklaim! Kamu mendapat ${result.referredTrialDays} hari Premium gratis.`,
    });
  } catch (error: any) {
    console.error("[REFERRAL_APPLY]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
