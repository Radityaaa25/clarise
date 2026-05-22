import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const progressSchema = z.object({
  moduleId: z.string(),
  courseId: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const progress = await prisma.userProgress.findMany({
      where: {
        userId: user.id,
        ...(courseId ? { courseId } : {})
      }
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Fetch progress error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = progressSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error }, { status: 400 });
    }

    const { moduleId, courseId } = result.data;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, xp: true }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { xpReward: true }
    });

    if (!module) return NextResponse.json({ error: "Module not found" }, { status: 404 });

    // Upsert progress
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId
        }
      },
      update: {
        completedAt: new Date(),
      },
      create: {
        userId: user.id,
        moduleId,
        courseId,
        completedAt: new Date(),
      }
    });

    // Add XP to user (simplified, without transaction for now)
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        xp: { increment: module.xpReward }
      }
    });

    // Also record UserActivity
    await prisma.userActivity.create({
      data: {
        userId: user.id,
        type: "MODULE_COMPLETE",
        metadata: { moduleId, courseId, xpEarned: module.xpReward }
      }
    });

    return NextResponse.json({ success: true, progress, xpEarned: module.xpReward });
  } catch (error) {
    console.error("Update progress error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
