import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const rateSchema = z
  .object({
    moduleId: z.string().min(1),
    rating: z.number().int().min(1).max(5),
  })
  .strict();

/**
 * Rating per-modul (skor 1-5) — disimpan di UserProgress.rating.
 *
 * Note: Ini berbeda dengan rating COURSE level di /api/courses/[slug]/rate
 * yang menentukan rating publik di explore page. Rating modul ini cuma untuk
 * tracking feedback granular per-modul.
 */
export async function PATCH(req: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = rateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 },
      );
    }

    const { moduleId, rating } = parsed.data;

    // PENTING: UserProgress.userId itu User.id (cuid), BUKAN clerkId.
    // Sebelumnya `auth().userId` (clerkId) langsung dipakai → query gak pernah
    // nemu, semua rating gagal silently. Sekarang convert dulu ke user.id.
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId,
        },
      },
    });

    if (!progress) {
      return NextResponse.json(
        { error: "Progress not found" },
        { status: 404 },
      );
    }

    const updatedProgress = await prisma.userProgress.update({
      where: { id: progress.id },
      data: { rating },
    });

    return NextResponse.json({ success: true, progress: updatedProgress });
  } catch (error) {
    console.error("[PROGRESS_RATE]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 },
    );
  }
}
