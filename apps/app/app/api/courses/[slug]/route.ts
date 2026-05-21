import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// GET /api/courses/[slug] — Get single course with modules and slides
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        category: { select: { name: true, slug: true } },
        modules: {
          orderBy: { order: "asc" },
          include: {
            slides: {
              orderBy: { order: "asc" },
              include: {
                sources: true,
              },
            },
          },
        },
        ratings: {
          select: {
            rating: true,
            review: true,
            createdAt: true,
            user: { select: { name: true, imageUrl: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check access: private courses only accessible by author
    if (course.isPrivate && course.authorId !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Get user progress for this course
    const userProgress = await prisma.userProgress.findMany({
      where: { userId, courseId: course.id },
      select: { moduleId: true, completedAt: true, activeSlide: true },
    });

    return NextResponse.json({
      course,
      userProgress,
    });
  } catch (error) {
    console.error("[GET /api/courses/[slug]]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
