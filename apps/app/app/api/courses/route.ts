import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Difficulty, Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty") as Difficulty | null;
  const search = searchParams.get("search")?.slice(0, 100);
  const cursor = searchParams.get("cursor");
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 24);

  const where: Prisma.CourseWhereInput = {
    visibility: "PUBLIC",
    isPublished: true,
  };

  if (category) {
    where.category = { slug: category };
  }
  if (difficulty && Object.values(Difficulty).includes(difficulty)) {
    where.difficulty = difficulty;
  }
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        difficulty: true,
        totalModules: true,
        isPremium: true,
        rating: true,
        ratingCount: true,
        category: { select: { name: true, slug: true, icon: true } },
      },
    }),
    prisma.course.count({ where }),
  ]);

  const hasMore = courses.length > limit;
  const items = hasMore ? courses.slice(0, limit) : courses;
  const nextCursor =
    hasMore && items.length > 0 ? items[items.length - 1]!.id : null;

  return NextResponse.json({ courses: items, nextCursor, total });
}
