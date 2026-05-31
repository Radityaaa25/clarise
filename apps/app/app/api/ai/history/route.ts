import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
    
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const url = new URL(req.url);
    const courseId = url.searchParams.get("courseId") || undefined;

    const history = await prisma.aiChatHistory.findFirst({
      where: { 
        userId: user.id, 
        ...(courseId ? { courseId } : {}) 
      },
      orderBy: { updatedAt: "desc" },
      select: { messages: true },
    });

    if (!history || !history.messages) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: history.messages });
  } catch (error) {
    console.error("[AI_HISTORY_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
