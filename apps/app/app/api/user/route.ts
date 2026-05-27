import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { xpToNextLevel } from "@/lib/gamification";

const updateUserSchema = z
  .object({
    name: z.string().max(100).optional(),
    dailyHours: z.number().min(1).max(24).optional(),
    learningGoal: z.string().max(200).optional(),
    aiPreferences: z.any().optional(),
  })
  .strict();

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      role: true,
      xp: true,
      level: true,
      currentStreak: true,
      longestStreak: true,
      onboardingCompleted: true,
      lastActiveDate: true,
      subscription: { select: { plan: true, status: true, endDate: true } },
    },
  });

  // Upsert if not found
  if (!user) {
    const clerk = await currentUser();
    if (!clerk) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    user = await prisma.user.create({
      data: {
        clerkId,
        email: clerk.emailAddresses[0]?.emailAddress ?? "",
        name: `${clerk.firstName ?? ""} ${clerk.lastName ?? ""}`.trim() || null,
        imageUrl: clerk.imageUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        role: true,
        xp: true,
        level: true,
        currentStreak: true,
        longestStreak: true,
        onboardingCompleted: true,
        lastActiveDate: true,
        subscription: { select: { plan: true, status: true, endDate: true } },
      },
    });
  }

  // Record LOGIN activity if first request today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!user.lastActiveDate || new Date(user.lastActiveDate) < today) {
    await prisma.userActivity.create({
      data: { userId: user.id, type: "LOGIN" },
    });
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    role: user.role,
    xp: user.xp,
    level: user.level,
    xpToNextLevel: xpToNextLevel(user.xp),
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    onboardingCompleted: user.onboardingCompleted,
    subscription: user.subscription ?? { plan: "FREE", status: "ACTIVE", endDate: null },
  });
}

export async function PATCH(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const result = updateUserSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await prisma.user.update({
    where: { clerkId },
    data: result.data,
  });

  return NextResponse.json({ success: true });
}
