import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const GOAL_TO_CATEGORY: Record<string, string> = {
  Pemrograman: "pemrograman",
  Matematika: "matematika",
  Sains: "sains",
  Desain: "desain",
  Bahasa: "bahasa",
  "Data Science": "data-science",
};


const onboardingSchema = z
  .object({
    learningGoal: z.string(),
    currentLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
    dailyHours: z.string(),
  })
  .strict();

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { learningGoal, currentLevel, dailyHours } = parsed.data;
  // Fallback to "lainnya" if no direct map
  const categorySlug = GOAL_TO_CATEGORY[learningGoal] || "lainnya";

  let hoursInt = 1;
  if (dailyHours === "15m") hoursInt = 0;
  else if (dailyHours === "30m") hoursInt = 1;
  else if (dailyHours === "1h") hoursInt = 1;
  else if (dailyHours === "2h+") hoursInt = 2;

  await prisma.user.update({
    where: { clerkId },
    data: {
      learningGoal,
      currentLevel,
      dailyHours: hoursInt,
      onboardingCompleted: true,
    },
  });

  // Recommend courses
  const recommendedCourses = await prisma.course.findMany({
    where: {
      visibility: "PUBLIC",
      isPublished: true,
      difficulty: currentLevel,
      category: { slug: categorySlug },
    },
    orderBy: { rating: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      difficulty: true,
    },
  });

  return NextResponse.json({ success: true, recommendedCourses });
}
