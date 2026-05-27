import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { xpToNextLevel } from "@/lib/gamification";
import { getCachedBadges } from "@/lib/db";

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      xp: true,
      level: true,
      currentStreak: true,
      longestStreak: true,
      badges: { select: { badgeId: true, earnedAt: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const allBadges = await getCachedBadges();
  const earnedMap = new Map(user.badges.map((b) => [b.badgeId, b.earnedAt]));

  return NextResponse.json({
    xp: user.xp,
    level: user.level,
    xpToNextLevel: xpToNextLevel(user.xp),
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    badges: allBadges.map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      icon: b.icon,
      earned: earnedMap.has(b.id),
      earnedAt: earnedMap.get(b.id) ?? null,
    })),
  });
}
