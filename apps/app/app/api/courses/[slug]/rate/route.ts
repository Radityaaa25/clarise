import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { awardXP } from "@/lib/gamification";

const rateSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().max(1000).optional(),
}).strict();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = rateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { rating, review } = parsed.data;
    const { slug } = await params;

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const course = await prisma.course.findUnique({
      where: { slug },
      select: { id: true, totalModules: true }
    });
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    // Validate progress >= 50%
    const completedModules = await prisma.userProgress.count({
      where: { userId: user.id, courseId: course.id, completedAt: { not: null } }
    });

    const progressPercent = course.totalModules > 0 
      ? (completedModules / course.totalModules) * 100 
      : 0;

    if (progressPercent < 50) {
      return NextResponse.json({ 
        error: "Selesaikan minimal 50% modul untuk memberikan ulasan." 
      }, { status: 403 });
    }

    // Upsert rating
    const existingRating = await prisma.courseRating.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: course.id } }
    });

    // Sanitasi review text sederhana (strip html)
    const sanitizedReview = review ? review.replace(/<[^>]*>?/gm, '') : undefined;

    await prisma.courseRating.upsert({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
      create: {
        userId: user.id,
        courseId: course.id,
        rating,
        review: sanitizedReview,
      },
      update: {
        rating,
        review: sanitizedReview,
      }
    });

    // Update aggregate
    const allRatings = await prisma.courseRating.aggregate({
      where: { courseId: course.id },
      _avg: { rating: true },
      _count: { rating: true }
    });

    const avg = allRatings._avg.rating || 0;
    const count = allRatings._count.rating || 0;

    await prisma.course.update({
      where: { id: course.id },
      data: {
        rating: avg,
        ratingCount: count
      }
    });

    let xpEarned = 0;
    if (!existingRating) {
      // First time rating -> award XP
      const xpResult = await awardXP(user.id, 15); // +15 XP for rating
      xpEarned = 15;
    }

    return NextResponse.json({ 
      success: true, 
      avgRating: avg, 
      ratingCount: count,
      xpEarned 
    });

  } catch (error: any) {
    console.error("[COURSE_RATE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
