import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { awardXP, updateStreak, evaluateBadges } from "@/lib/gamification";
import { isSubscriptionActive } from "@/lib/subscription";

const progressSchema = z
  .object({ moduleId: z.string(), courseId: z.string() })
  .strict();

export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const courseId = new URL(req.url).searchParams.get("courseId");
  if (!courseId)
    return NextResponse.json({ error: "courseId required" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const progress = await prisma.userProgress.findMany({
    where: { userId: user.id, courseId },
    select: { moduleId: true, completedAt: true },
  });

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { totalModules: true },
  });

  const completedModules = progress
    .filter((p) => p.completedAt)
    .map((p) => p.moduleId);

  return NextResponse.json({
    completedModules,
    progressPercent:
      course && course.totalModules > 0
        ? Math.round((completedModules.length / course.totalModules) * 100)
        : 0,
  });
}

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const result = progressSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { moduleId, courseId } = result.data;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Validate module belongs to course
  const mod = await prisma.module.findFirst({
    where: { id: moduleId, courseId },
    select: { id: true, xpReward: true },
  });
  if (!mod)
    return NextResponse.json({ error: "Module not found" }, { status: 404 });

  // Check course access
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      isPremium: true,
      visibility: true,
      authorId: true,
      totalModules: true,
    },
  });
  if (!course)
    return NextResponse.json({ error: "Course not found" }, { status: 404 });

  if (course.visibility === "PRIVATE" && course.authorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (course.isPremium && !(await isSubscriptionActive(user.id))) {
    return NextResponse.json({ error: "Premium required" }, { status: 403 });
  }

  // Check duplicate
  const existing = await prisma.userProgress.findUnique({
    where: { userId_moduleId: { userId: user.id, moduleId } },
    select: { completedAt: true },
  });
  if (existing?.completedAt) {
    return NextResponse.json({
      xpEarned: 0,
      newLevel: 0,
      leveledUp: false,
      badgesEarned: [],
    });
  }

  // Upsert progress
  await prisma.userProgress.upsert({
    where: { userId_moduleId: { userId: user.id, moduleId } },
    update: { completedAt: new Date() },
    create: { userId: user.id, moduleId, courseId, completedAt: new Date() },
  });

  // Check if course is now complete
  const completedCount = await prisma.userProgress.count({
    where: { userId: user.id, courseId, completedAt: { not: null } },
  });
  const courseComplete =
    completedCount >= course.totalModules && course.totalModules > 0;
  const xpAmount = mod.xpReward + (courseComplete ? 100 : 0);

  // Award XP, update streak, evaluate badges
  const [xpResult, , badges] = await Promise.all([
    awardXP(user.id, xpAmount),
    updateStreak(user.id),
    evaluateBadges(user.id),
  ]);

  // Record activity
  await prisma.userActivity.create({
    data: {
      userId: user.id,
      type: "MODULE_COMPLETE",
      metadata: { moduleId, courseId, xpAmount },
    },
  });

  return NextResponse.json({
    xpEarned: xpAmount,
    newLevel: xpResult.newLevel,
    leveledUp: xpResult.leveledUp,
    badgesEarned: badges.map((b) => ({ name: b.name, icon: b.icon })),
  });
}
