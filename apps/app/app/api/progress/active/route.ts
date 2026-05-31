import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Get courses where user has progress
  const progressRecords = await prisma.userProgress.findMany({
    where: { userId: user.id },
    distinct: ["courseId"],
    select: { courseId: true },
  });

  const courseIds = progressRecords.map((p) => p.courseId);

  if (courseIds.length === 0) {
    return NextResponse.json({ activeCourses: [] });
  }

  // Get the courses with progress percent
  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds } },
    select: {
      id: true,
      title: true,
      slug: true,
      category: { select: { name: true } },
      totalModules: true,
      progress: {
        where: { userId: user.id, completedAt: { not: null } },
        select: { id: true },
      },
    },
  });

  const activeCourses = courses.map((course) => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    categoryName: course.category.name,
    progressPercent:
      course.totalModules > 0
        ? Math.round((course.progress.length / course.totalModules) * 100)
        : 0,
  }));

  return NextResponse.json({ activeCourses });
}
