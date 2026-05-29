import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/user/welcome-popup-seen
 *
 * Dipanggil saat user menutup welcome popup di dashboard. Idempotent —
 * aman dipanggil berulang kali; tidak ada side-effect kalau sudah pernah
 * di-mark sebelumnya.
 */
export async function POST() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, welcomePopupShown: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.welcomePopupShown) {
    // Already marked — no-op
    return NextResponse.json({ success: true, alreadyShown: true });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { welcomePopupShown: true },
  });

  return NextResponse.json({ success: true });
}
