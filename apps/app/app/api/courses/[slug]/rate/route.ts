import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// POST /api/courses/[slug]/rate — Submit a course rating
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { slug } = await params;
    const body = await req.json();
    const { rating, review } = body;

    // Validate rating
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Validate review length
    if (review && typeof review === "string" && review.length > 500) {
      return NextResponse.json({ error: "Review max 500 characters" }, { status: 400 });
    }

    // Find the course
    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check user has completed at least 50% of modules
    const totalModules = await prisma.module.count({ where: { courseId: course.id } });
    const completedModules = await prisma.userProgress.count({
      where: {
        userId: user.id,
        courseId: course.id,
        completedAt: { not: null },
      },
    });

    if (totalModules > 0 && completedModules / totalModules < 0.5) {
      return NextResponse.json(
        { error: "Selesaikan minimal 50% modul sebelum memberikan rating." },
        { status: 403 }
      );
    }

    // Upsert rating (1 per user per course)
    await prisma.courseRating.upsert({
      where: {
        userId_courseId: { userId: user.id, courseId: course.id },
      },
      update: { rating, review: review || null },
      create: {
        userId: user.id,
        courseId: course.id,
        rating,
        review: review || null,
      },
    });

    // Recalculate course average rating
    const aggregation = await prisma.courseRating.aggregate({
      where: { courseId: course.id },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await prisma.course.update({
      where: { id: course.id },
      data: {
        rating: aggregation._avg.rating || 0,
        ratingCount: aggregation._count.rating || 0,
      },
    });

    return NextResponse.json({
      message: "Rating submitted successfully",
      averageRating: aggregation._avg.rating,
      totalRatings: aggregation._count.rating,
    });
  } catch (error) {
    console.error("[POST /api/courses/[slug]/rate]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
