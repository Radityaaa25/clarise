import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // In Next.js 15+ async params
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        category: true,
        author: {
          select: { name: true, imageUrl: true }
        },
        modules: {
          orderBy: { order: 'asc' },
          include: {
            slides: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ course });
  } catch (error) {
    console.error("Fetch course detail error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
