import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Difficulty } from "@prisma/client";

const GOAL_TO_CATEGORY: Record<string, string> = {
  Pemrograman: "pemrograman",
  Matematika: "matematika",
  Sains: "sains",
  Desain: "desain",
  Bahasa: "bahasa",
  "Data Science": "data-science",
};

const LEVEL_MAP: Record<string, Difficulty> = {
  Pemula: "BEGINNER",
  Menengah: "INTERMEDIATE",
  Lanjutan: "ADVANCED",
};

const onboardingSchema = z
  .object({
    learningGoal: z.enum(["Pemrograman", "Matematika", "Sains", "Desain", "Bahasa", "Data Science"]),
    currentLevel: z.enum(["Pemula", "Menengah", "Lanjutan"]),
    dailyHours: z.number().min(1).max(12),
  })
  .strict();

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { learningGoal, currentLevel, dailyHours } = parsed.data;
  const difficulty = LEVEL_MAP[currentLevel];
  const categorySlug = GOAL_TO_CATEGORY[learningGoal];

  await prisma.user.update({
    where: { clerkId },
    data: {
      learningGoal,
      currentLevel: difficulty,
      dailyHours,
      onboardingCompleted: true,
    },
  });

  // Recommend courses
  const recommendedCourses = await prisma.course.findMany({
    where: {
      visibility: "PUBLIC",
      isPublished: true,
      difficulty,
      category: { slug: categorySlug },
    },
    orderBy: { rating: "desc" },
    take: 3,
    select: { id: true, title: true, slug: true, description: true, difficulty: true },
  });

  return NextResponse.json({ success: true, recommendedCourses });
}
