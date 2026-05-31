import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isSubscriptionActive } from "@/lib/subscription";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Wave 1: parallel — course detail dan user lookup tidak saling tergantung.
  const [course, user] = await Promise.all([
    prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        difficulty: true,
        totalModules: true,
        isPremium: true,
        visibility: true,
        authorId: true,
        rating: true,
        ratingCount: true,
        language: true,
        category: { select: { name: true, slug: true, icon: true } },
        modules: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            slug: true,
            order: true,
            xpReward: true,
            slides: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                title: true,
                order: true,
                content: true,
                sources: {
                  select: {
                    id: true,
                    title: true,
                    url: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    }),
  ]);

  if (!course)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Private course: only creator can access
  if (course.visibility === "PRIVATE" && course.authorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Wave 2: parallel — premium check (cached di Redis) dan progress fetch.
  const needsPremiumCheck =
    course.isPremium || course.difficulty !== "BEGINNER";
  const [hasPremium, allUserProgress] = await Promise.all([
    needsPremiumCheck ? isSubscriptionActive(user.id) : Promise.resolve(true),
    prisma.userProgress.findMany({
      where: {
        userId: user.id,
        courseId: course.id,
      },
      select: { moduleId: true, completedAt: true },
    }),
  ]);

  const isEnrolled = allUserProgress.length > 0;
  const canAccess = isEnrolled || (needsPremiumCheck ? hasPremium : true);

  const completedProgress = allUserProgress.filter((p) => p.completedAt !== null);

  return NextResponse.json({
    ...course,
    canAccess,
    userProgress: completedProgress.map((p) => p.moduleId),
    progressPercent:
      course.totalModules > 0
        ? Math.round((completedProgress.length / course.totalModules) * 100)
        : 0,
  });
}
