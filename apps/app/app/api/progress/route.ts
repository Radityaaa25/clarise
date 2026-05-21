import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// POST /api/progress — Mark module as complete or update active slide
export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get internal user
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: "User not found in database" }, { status: 404 });
    }

    const body = await req.json();
    const { moduleId, courseId, action, activeSlide } = body;

    if (!moduleId || !courseId) {
      return NextResponse.json({ error: "moduleId and courseId are required" }, { status: 400 });
    }

    // Free user: check if they already have an enrolled course
    if (user.role === "FREE") {
      const existingEnrollment = await prisma.userProgress.findFirst({
        where: {
          userId: user.id,
          courseId: { not: courseId },
        },
      });

      if (existingEnrollment) {
        return NextResponse.json(
          { error: "Akun gratis hanya bisa mengambil 1 kursus. Upgrade ke Premium untuk akses unlimited." },
          { status: 403 }
        );
      }
    }

    if (action === "complete") {
      // Mark module as complete
      const progress = await prisma.userProgress.upsert({
        where: {
          userId_moduleId: { userId: user.id, moduleId },
        },
        update: {
          completedAt: new Date(),
        },
        create: {
          userId: user.id,
          moduleId,
          courseId,
          completedAt: new Date(),
        },
      });

      // Award XP
      const module = await prisma.module.findUnique({ where: { id: moduleId } });
      if (module) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            xp: { increment: module.xpReward },
            lastActiveAt: new Date(),
          },
        });

        // Check level up (100 XP per level)
        const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (updatedUser) {
          const newLevel = Math.floor(updatedUser.xp / 100) + 1;
          if (newLevel > updatedUser.level) {
            await prisma.user.update({
              where: { id: user.id },
              data: { level: newLevel },
            });
          }
        }
      }

      return NextResponse.json({ progress, message: "Module marked as complete" });
    }

    if (action === "updateSlide" && typeof activeSlide === "number") {
      // Update active slide position
      const progress = await prisma.userProgress.upsert({
        where: {
          userId_moduleId: { userId: user.id, moduleId },
        },
        update: {
          activeSlide,
        },
        create: {
          userId: user.id,
          moduleId,
          courseId,
          activeSlide,
        },
      });

      // Update last active
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() },
      });

      return NextResponse.json({ progress });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[POST /api/progress]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/progress — Get user's progress across all courses
export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const progress = await prisma.userProgress.findMany({
      where: { userId: user.id },
      include: {
        course: {
          select: { title: true, slug: true, totalModules: true },
        },
        module: {
          select: { title: true, slug: true, order: true },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    return NextResponse.json({ progress, user: { xp: user.xp, level: user.level, streak: user.streak } });
  } catch (error) {
    console.error("[GET /api/progress]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
