import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 1. Reset streaks for inactive users
  const inactiveUsers = await prisma.user.findMany({
    where: {
      currentStreak: { gt: 0 },
      lastActiveDate: { lt: yesterday },
    },
    select: { id: true, streakProtectionUsed: true, subscription: { select: { plan: true, status: true } } },
  });

  for (const user of inactiveUsers) {
    const isPremium = user.subscription?.status === "ACTIVE" && user.subscription.plan !== "FREE";
    if (isPremium && user.streakProtectionUsed < 1) {
      await prisma.user.update({
        where: { id: user.id },
        data: { streakProtectionUsed: { increment: 1 } },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { currentStreak: 0 },
      });
    }
  }

  // 2. Expire subscriptions past grace period (3 days)
  const graceCutoff = new Date(now);
  graceCutoff.setDate(graceCutoff.getDate() - 3);

  const expiredSubs = await prisma.subscription.findMany({
    where: { status: "ACTIVE", endDate: { lt: graceCutoff } },
    select: { id: true, userId: true },
  });

  for (const sub of expiredSubs) {
    await prisma.$transaction([
      prisma.subscription.update({ where: { id: sub.id }, data: { status: "EXPIRED" } }),
      prisma.user.update({ where: { id: sub.userId }, data: { role: "USER" } }),
      prisma.notification.create({
        data: {
          userId: sub.userId,
          type: "SUBSCRIPTION_EXPIRING",
          title: "Langganan berakhir",
          body: "Langganan Premium kamu telah berakhir. Perpanjang untuk melanjutkan akses penuh.",
        },
      }),
    ]);
  }

  // 3. Grace period warnings (H-7, H-3, H-1)
  const warningDays = [7, 3, 1];
  for (const days of warningDays) {
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + days);
    const targetStart = new Date(targetDate);
    targetStart.setHours(0, 0, 0, 0);
    const targetEnd = new Date(targetDate);
    targetEnd.setHours(23, 59, 59, 999);

    const expiringSubs = await prisma.subscription.findMany({
      where: { status: "ACTIVE", endDate: { gte: targetStart, lte: targetEnd } },
      select: { userId: true },
    });

    for (const sub of expiringSubs) {
      await prisma.notification.create({
        data: {
          userId: sub.userId,
          type: "SUBSCRIPTION_EXPIRING",
          title: `Langganan berakhir dalam ${days} hari`,
          body: `Perpanjang sebelum ${targetDate.toLocaleDateString("id-ID")} agar akses Premium tidak terputus.`,
        },
      });
    }
  }

  // 4. Reset streakProtectionUsed on 1st of month
  if (now.getDate() === 1) {
    await prisma.user.updateMany({
      where: { streakProtectionUsed: { gt: 0 } },
      data: { streakProtectionUsed: 0 },
    });
  }

  return NextResponse.json({ success: true, processed: { streakResets: inactiveUsers.length, expired: expiredSubs.length } });
}
