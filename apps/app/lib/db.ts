import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export const getCachedCategories = unstable_cache(
  async () =>
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
        description: true,
        order: true,
      },
      orderBy: { order: "asc" },
    }),
  ["categories"],
  { revalidate: 3600 },
);

export const getCachedBadges = unstable_cache(
  async () =>
    prisma.badge.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        condition: true,
      },
    }),
  ["badges"],
  { revalidate: 86400 },
);

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      clerkId: true,
      email: true,
      name: true,
      imageUrl: true,
      role: true,
      xp: true,
      level: true,
      currentStreak: true,
      longestStreak: true,
      onboardingCompleted: true,
      lastActiveDate: true,
      learningGoal: true,
      dailyHours: true,
    },
  });
}

export async function getUserWithSubscription(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      clerkId: true,
      email: true,
      name: true,
      imageUrl: true,
      role: true,
      xp: true,
      level: true,
      currentStreak: true,
      longestStreak: true,
      onboardingCompleted: true,
      lastActiveDate: true,
      subscription: {
        select: { plan: true, status: true, startDate: true, endDate: true },
      },
    },
  });
}
