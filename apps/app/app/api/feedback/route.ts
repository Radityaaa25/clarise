import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const feedbackSchema = z
  .object({
    rating: z.number().int().min(1).max(5),
    message: z.string().max(1000).optional(),
  })
  .strict();

// GET — feedback milik user yang sedang login (untuk prefill form).
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const feedback = await prisma.appFeedback.findUnique({
    where: { userId: user.id },
    select: { rating: true, message: true, updatedAt: true },
  });

  return NextResponse.json({ feedback });
}

// POST — kirim/perbarui kritik-saran + rating app (1 per user, upsert).
export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Input tidak valid" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, name: true, learningGoal: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const message = parsed.data.message?.trim() || null;

  await prisma.appFeedback.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      rating: parsed.data.rating,
      message,
      authorName: user.name,
      authorRole: user.learningGoal,
    },
    update: {
      rating: parsed.data.rating,
      message,
      authorName: user.name,
      authorRole: user.learningGoal,
    },
  });

  return NextResponse.json({ success: true });
}
