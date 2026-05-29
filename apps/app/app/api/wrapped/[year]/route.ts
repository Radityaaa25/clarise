import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isSubscriptionActive } from "@/lib/subscription";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ year: string }> },
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { year } = await params;
    const yearInt = parseInt(year, 10);
    if (isNaN(yearInt) || yearInt < 2024) {
      return NextResponse.json({ error: "Invalid year" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        xp: true,
        longestStreak: true,
      },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Determine if it's the season (Dec-Jan)
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-indexed (11 = Dec, 0 = Jan)
    // if (currentMonth !== 11 && currentMonth !== 0) {
    //   // Note: Uncomment this check in production if you strictly want to limit access.
    //   // return NextResponse.json({ error: "Clarise Wrapped hanya tersedia di bulan Desember - Januari." }, { status: 403 });
    // }

    const isPremium = await isSubscriptionActive(user.id);

    // Time boundaries for the requested year
    const startOfYear = new Date(Date.UTC(yearInt, 0, 1));
    const endOfYear = new Date(Date.UTC(yearInt, 11, 31, 23, 59, 59, 999));

    // Stats queries
    // 1. Total Courses Completed
    const completedCourses = await prisma.userProgress.findMany({
      where: {
        userId: user.id,
        completedAt: { gte: startOfYear, lte: endOfYear },
      },
      select: { courseId: true },
    });
    // Distinct course completions
    const uniqueCourses = new Set(completedCourses.map((c) => c.courseId));

    // 2. Total learning time (Approximation from UserActivity duration)
    const activities = await prisma.userActivity.aggregate({
      where: {
        userId: user.id,
        date: { gte: startOfYear, lte: endOfYear },
      },
      _sum: { duration: true }, // assuming duration is in minutes
    });
    const totalMinutesLearned = activities._sum.duration || 0;

    // 3. XP gained this year (Approximation from badges earned & modules completed)
    // For a real app, you might want an XpLog table. Here we use total XP as fallback for free tier.

    const basicStats = {
      year: yearInt,
      userName: user.name,
      totalCoursesCompleted: uniqueCourses.size,
      totalMinutesLearned,
      totalXp: user.xp,
      longestStreak: user.longestStreak,
      isPremium,
    };

    if (!isPremium) {
      return NextResponse.json({
        success: true,
        data: basicStats,
        message:
          "Upgrade ke Premium untuk melihat statistik penuh Clarise Wrapped!",
      });
    }

    // --- Premium Detailed Stats ---

    // Top Category
    const categoryProgress = await prisma.userProgress.findMany({
      where: {
        userId: user.id,
        completedAt: { gte: startOfYear, lte: endOfYear },
      },
      include: {
        course: { include: { category: true } },
      },
    });

    const categoryCount: Record<
      string,
      { count: number; name: string; icon: string | null }
    > = {};
    for (const p of categoryProgress) {
      const cat = p.course.category;
      if (!categoryCount[cat.id]) {
        categoryCount[cat.id] = { count: 0, name: cat.name, icon: cat.icon };
      }
      categoryCount[cat.id]!.count += 1;
    }

    const topCategory = Object.values(categoryCount).sort(
      (a, b) => b.count - a.count,
    )[0];

    // Badges Earned this year
    const badgesEarned = await prisma.userBadge.findMany({
      where: {
        userId: user.id,
        earnedAt: { gte: startOfYear, lte: endOfYear },
      },
      include: { badge: true },
    });

    const premiumStats = {
      ...basicStats,
      topCategory: topCategory ? topCategory.name : "Belum ada",
      topCategoryIcon: topCategory ? topCategory.icon : null,
      badgesEarnedCount: badgesEarned.length,
      topBadges: badgesEarned.slice(0, 3).map((b) => b.badge),
      shareableQuote: `Tahun ${yearInt} gue menghabiskan ${Math.round(totalMinutesLearned / 60)} jam belajar di Clarise. Rekor streak gue ${user.longestStreak} hari! 🔥 #ClariseWrapped`,
    };

    return NextResponse.json({
      success: true,
      data: premiumStats,
    });
  } catch (error: any) {
    console.error("[CLARISE_WRAPPED]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
