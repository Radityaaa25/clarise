import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const onboardingSchema = z.object({
  learningGoal: z.string().min(1),
  currentLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  dailyHours: z.number().min(1).max(24),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = onboardingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error }, { status: 400 });
    }

    const { learningGoal, currentLevel, dailyHours } = result.data;

    // Update user in database
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        learningGoal,
        currentLevel,
        dailyHours,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
