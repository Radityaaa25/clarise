import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: {
        id: true,
        xp: true,
        level: true,
        currentStreak: true,
        longestStreak: true,
        badges: {
          include: {
            badge: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ achievements: user });
  } catch (error) {
    console.error("Fetch achievements error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
