import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getPlanLimits, isSubscriptionActive } from "@/lib/subscription";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const sub = await prisma.subscription.findUnique({
    where: { userId: user.id },
    select: { plan: true, status: true, startDate: true, endDate: true },
  });

  const plan = sub?.plan ?? "FREE";
  const status = sub?.status ?? "ACTIVE";
  const endDate = sub?.endDate;
  const daysRemaining = endDate
    ? Math.max(
        0,
        Math.ceil((new Date(endDate).getTime() - Date.now()) / 86400000),
      )
    : null;
  const isActive = await isSubscriptionActive(user.id);
  const isInGracePeriod = !isActive ? false : status === "EXPIRED";

  return NextResponse.json({
    plan,
    status,
    startDate: sub?.startDate,
    endDate,
    daysRemaining,
    isInGracePeriod,
    features: getPlanLimits(plan),
  });
}
