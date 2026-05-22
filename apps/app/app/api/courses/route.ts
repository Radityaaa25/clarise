import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Difficulty } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    // Protect route as per LIST.md
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty") as Difficulty | null;
    const search = searchParams.get("search");

    const whereClause: any = {
      isPublished: true,
      isPrivate: false, // Don't show private courses in explore
    };

    if (category) {
      whereClause.categoryId = category;
    }

    if (difficulty) {
      whereClause.difficulty = difficulty;
    }

    if (search) {
      whereClause.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      include: {
        category: true,
        author: {
          select: { name: true, imageUrl: true }
        },
        _count: {
          select: { modules: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Fetch courses error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
