import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const readSchema = z.object({ notificationIds: z.array(z.string()).min(1).max(50) }).strict();

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId }, select: { id: true } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const parsed = readSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  // Only mark notifications that belong to this user
  await prisma.notification.updateMany({
    where: { id: { in: parsed.data.notificationIds }, userId: user.id },
    data: { isRead: true },
  });

  return NextResponse.json({ success: true });
}
