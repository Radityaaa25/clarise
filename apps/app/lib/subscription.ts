import { prisma } from "./prisma";
import { redis } from "./ratelimit";
import type { SubscriptionPlan } from "@prisma/client";

export const PLAN_LIMITS = {
  FREE: {
    maxActiveCourses: 2,
    aiRequestsPerDay: 10,
    canCreateCourse: false,
    canDownloadPdf: false,
    canUseCertificate: false,
    streakProtection: 0,
    courseVisibility: ["PUBLIC"] as const,
    prioritySupport: false,
  },
  PREMIUM: {
    maxActiveCourses: Infinity,
    aiRequestsPerDay: Infinity,
    canCreateCourse: true,
    canDownloadPdf: true,
    canUseCertificate: true,
    streakProtection: 1,
    courseVisibility: ["PUBLIC", "PRIVATE"] as const,
    prioritySupport: true,
  },
  PREMIUM_YEARLY: {
    maxActiveCourses: Infinity,
    aiRequestsPerDay: Infinity,
    canCreateCourse: true,
    canDownloadPdf: true,
    canUseCertificate: true,
    streakProtection: 1,
    courseVisibility: ["PUBLIC", "PRIVATE"] as const,
    prioritySupport: true,
  },
  PREMIUM_TRIAL: {
    maxActiveCourses: Infinity,
    aiRequestsPerDay: Infinity,
    canCreateCourse: true,
    canDownloadPdf: true,
    canUseCertificate: true,
    streakProtection: 1,
    courseVisibility: ["PUBLIC", "PRIVATE"] as const,
    prioritySupport: true,
  },
} as const;

type PlanFeature = keyof (typeof PLAN_LIMITS)["FREE"];

const GRACE_PERIOD_DAYS = 3;

export async function getUserSubscription(userId: string) {
  const cacheKey = `sub:${userId}`;
  const cached =
    await redis.get<Awaited<ReturnType<typeof fetchSub>>>(cacheKey);
  if (cached) return cached;

  const sub = await fetchSub(userId);
  if (sub) await redis.set(cacheKey, sub, { ex: 300 });
  return sub;
}

async function fetchSub(userId: string) {
  return prisma.subscription.findUnique({
    where: { userId },
    select: { plan: true, status: true, startDate: true, endDate: true },
  });
}

export async function isSubscriptionActive(userId: string): Promise<boolean> {
  const sub = await getUserSubscription(userId);
  if (!sub) return false;
  if (sub.status === "ACTIVE") return true;
  if (sub.status === "EXPIRED" && sub.endDate) {
    const grace = new Date(sub.endDate);
    grace.setDate(grace.getDate() + GRACE_PERIOD_DAYS);
    return new Date() <= grace;
  }
  return false;
}

export async function checkFeatureAccess(
  userId: string,
  feature: PlanFeature,
): Promise<{ allowed: boolean; reason?: string }> {
  const sub = await getUserSubscription(userId);
  const plan: SubscriptionPlan =
    sub?.status === "ACTIVE" || (await isSubscriptionActive(userId))
      ? (sub?.plan ?? "FREE")
      : "FREE";

  const limits = PLAN_LIMITS[plan];
  const value = limits[feature];

  if (typeof value === "boolean") {
    return value
      ? { allowed: true }
      : { allowed: false, reason: "Fitur ini hanya untuk Premium" };
  }
  if (typeof value === "number" && value === 0) {
    return { allowed: false, reason: "Fitur ini hanya untuk Premium" };
  }
  return { allowed: true };
}

export function getPlanLimits(plan: SubscriptionPlan) {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.FREE;
}
