import { prisma } from "./prisma";
import type { Badge } from "@prisma/client";

const LEVEL_THRESHOLDS = [
  0, 100, 300, 700, 1500, 2500, 4000, 6000, 9000, 15000,
];

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= (LEVEL_THRESHOLDS[i] ?? 0)) return i + 1;
  }
  return 1;
}

export function xpToNextLevel(xp: number): number {
  const level = calculateLevel(xp);
  if (level >= LEVEL_THRESHOLDS.length) return 0;
  return (LEVEL_THRESHOLDS[level] ?? 0) - xp;
}

export async function awardXP(userId: string, amount: number) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { xp: { increment: amount } },
    select: { xp: true, level: true },
  });

  const newLevel = calculateLevel(user.xp);
  const leveledUp = newLevel > user.level;

  if (leveledUp) {
    await prisma.user.update({
      where: { id: userId },
      data: { level: newLevel },
    });
  }

  return { newXp: user.xp, newLevel, leveledUp };
}

export async function updateStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      lastActiveDate: true,
      currentStreak: true,
      longestStreak: true,
      streakProtectionUsed: true,
    },
  });
  if (!user)
    return { currentStreak: 0, streakKept: false, protectionUsed: false };

  const now = new Date();
  const today = startOfDay(now);
  const lastActive = user.lastActiveDate
    ? startOfDay(user.lastActiveDate)
    : null;

  if (lastActive && lastActive.getTime() === today.getTime()) {
    return {
      currentStreak: user.currentStreak,
      streakKept: true,
      protectionUsed: false,
    };
  }

  let newStreak = user.currentStreak;
  let protectionUsed = false;

  if (lastActive) {
    const diffDays = Math.floor(
      (today.getTime() - lastActive.getTime()) / 86400000,
    );
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      if (user.streakProtectionUsed < 1 && newStreak > 0) {
        protectionUsed = true;
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }
  } else {
    newStreak = 1;
  }

  const longestStreak = Math.max(user.longestStreak, newStreak);

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: newStreak,
      longestStreak,
      lastActiveDate: now,
      ...(protectionUsed ? { streakProtectionUsed: { increment: 1 } } : {}),
    },
  });

  return { currentStreak: newStreak, streakKept: true, protectionUsed };
}

export async function evaluateBadges(userId: string): Promise<Badge[]> {
  const [
    user,
    progressCount,
    completedCourses,
    aiChatCount,
    ratingCount,
    createdPublicCourse,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        subscription: { select: { plan: true, status: true } },
      },
    }),
    prisma.userProgress.count({
      where: { userId, completedAt: { not: null } },
    }),
    getCompletedCourseCount(userId),
    prisma.aiChatHistory.count({ where: { userId } }),
    prisma.courseRating.count({ where: { userId } }),
    prisma.course.count({
      where: { authorId: userId, visibility: "PUBLIC", isPublished: true },
    }),
  ]);

  if (!user) return [];

  const existingBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badge: { select: { condition: true } } },
  });
  const earned = new Set(existingBadges.map((b) => b.badge.condition));

  const conditions: Record<string, boolean> = {
    MODULE_COMPLETE_1: progressCount >= 1,
    COURSE_COMPLETE_5: completedCourses >= 5,
    STREAK_7: user.currentStreak >= 7,
    STREAK_30: user.currentStreak >= 30,
    AI_CHAT_50: aiChatCount >= 50,
    COURSE_ALL_MODULES: completedCourses >= 1,
    RATING_10: ratingCount >= 10,
    PREMIUM_ACTIVE:
      user.subscription?.plan !== "FREE" &&
      user.subscription?.status === "ACTIVE",
    QUIZ_PERFECT: false, // future
    COURSE_CREATED_PUBLIC: createdPublicCourse >= 1,
  };

  const newBadges: Badge[] = [];
  const allBadges = await prisma.badge.findMany();

  for (const badge of allBadges) {
    if (earned.has(badge.condition)) continue;
    if (conditions[badge.condition]) {
      await prisma.userBadge.create({ data: { userId, badgeId: badge.id } });
      newBadges.push(badge);
    }
  }

  return newBadges;
}

async function getCompletedCourseCount(userId: string): Promise<number> {
  const courses = await prisma.course.findMany({
    where: { progress: { some: { userId, completedAt: { not: null } } } },
    select: { id: true, totalModules: true },
  });

  let count = 0;
  for (const course of courses) {
    const completed = await prisma.userProgress.count({
      where: { userId, courseId: course.id, completedAt: { not: null } },
    });
    if (completed >= course.totalModules && course.totalModules > 0) count++;
  }
  return count;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
