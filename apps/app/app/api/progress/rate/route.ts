import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { moduleId, rating } = body;

    if (!moduleId || rating === undefined || rating < 1 || rating > 5) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });

    if (!progress) {
      return new NextResponse("Progress not found", { status: 404 });
    }

    const updatedProgress = await prisma.userProgress.update({
      where: {
        id: progress.id,
      },
      data: {
        rating,
      },
    });

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error("[PROGRESS_RATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
