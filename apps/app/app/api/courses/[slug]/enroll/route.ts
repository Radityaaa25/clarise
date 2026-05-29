import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isSubscriptionActive } from "@/lib/subscription";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, subscription: { select: { plan: true } } },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const course = await prisma.course.findUnique({
    where: { slug },
    select: { id: true, isPremium: true, visibility: true, authorId: true },
  });

  if (!course)
    return NextResponse.json({ error: "Course not found" }, { status: 404 });

  // 1. Private course validation
  if (course.visibility === "PRIVATE" && course.authorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Premium course validation
  if (course.isPremium && !(await isSubscriptionActive(user.id))) {
    return NextResponse.json({ error: "Premium required" }, { status: 403 });
  }

  // 3. Free tier limit validation
  const isFreeUser = user.subscription?.plan === "FREE" || !user.subscription;
  if (isFreeUser && !course.isPremium) {
    const activeCourses = await prisma.userProgress.findMany({
      where: { userId: user.id },
      distinct: ["courseId"],
      select: { courseId: true },
    });
    // Jika belum enroll kursus ini, cek limit
    const alreadyEnrolled = activeCourses.some((c) => c.courseId === course.id);
    if (!alreadyEnrolled && activeCourses.length >= 1) {
      return NextResponse.json(
        { error: "Free tier limit reached" },
        { status: 403 },
      );
    }
  }

  // Get the first module of this course
  const firstModule = await prisma.module.findFirst({
    where: { courseId: course.id },
    orderBy: { order: "asc" },
    select: { id: true },
  });

  if (!firstModule) {
    return NextResponse.json(
      { error: "Course has no modules" },
      { status: 400 },
    );
  }

  // Check if progress already exists
  const existingProgress = await prisma.userProgress.findUnique({
    where: { userId_moduleId: { userId: user.id, moduleId: firstModule.id } },
  });

  if (!existingProgress) {
    // Enroll the user by creating an initial progress record (completedAt: null)
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        moduleId: firstModule.id,
        courseId: course.id,
        completedAt: null,
        activeSlide: 0,
      },
    });
  }

  return NextResponse.json({ success: true, enrolled: true });
}
