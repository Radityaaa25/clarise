import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { xpToNextLevel, updateStreak, evaluateBadges } from "@/lib/gamification";
import { bootstrapUser, ensureFreeSubscription } from "@/lib/user-bootstrap";

const updateUserSchema = z
  .object({
    name: z.string().max(100).optional(),
    dailyHours: z.number().min(1).max(24).optional(),
    learningGoal: z.string().max(200).optional(),
    aiPreferences: z.any().optional(),
  })
  .strict();

const userSelect = {
  id: true,
  name: true,
  email: true,
  imageUrl: true,
  role: true,
  xp: true,
  level: true,
  currentStreak: true,
  longestStreak: true,
  onboardingCompleted: true,
  welcomePopupShown: true,
  lastActiveDate: true,
  subscription: { select: { plan: true, status: true, endDate: true } },
} as const;

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let user = await prisma.user.findUnique({
    where: { clerkId },
    select: userSelect,
  });

  // Fallback bootstrap kalau user belum ada di DB.
  // Skenario: webhook Clerk gagal/belum ke-deliver, user login pertama kali.
  // Kita pakai helper yang sama dengan webhook supaya welcome notif &
  // FREE subscription tetap dibuat di sini.
  if (!user) {
    const clerk = await currentUser();
    if (!clerk)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await bootstrapUser({
      clerkId,
      email: clerk.emailAddresses[0]?.emailAddress ?? "",
      name: `${clerk.firstName ?? ""} ${clerk.lastName ?? ""}`.trim() || null,
      imageUrl: clerk.imageUrl,
    });

    user = await prisma.user.findUnique({
      where: { clerkId },
      select: userSelect,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Failed to bootstrap user" },
        { status: 500 },
      );
    }
  } else if (!user.subscription) {
    // Self-heal untuk user lama yang dibuat sebelum bootstrap helper ada
    // dan belum punya subscription. Tidak menyentuh welcome notif di sini
    // — itu hanya untuk user yang baru dibuat di blok `if (!user)` di atas.
    await ensureFreeSubscription(user.id);
  }

  // Daily activity tracking — dijalankan kalau user belum aktif hari ini.
  // Tujuannya:
  // 1. Catat LOGIN activity (untuk analytics)
  // 2. Update streak (login harian counts as activity)
  // 3. Re-evaluate badges (mungkin sudah hit STREAK_7 / STREAK_30)
  //
  // Setelah updateStreak, kita re-fetch user agar response berisi streak terbaru.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActiveDay = user.lastActiveDate
    ? new Date(user.lastActiveDate)
    : null;
  if (lastActiveDay) lastActiveDay.setHours(0, 0, 0, 0);

  const wasActiveToday =
    lastActiveDay && lastActiveDay.getTime() === today.getTime();

  if (!wasActiveToday) {
    // Catat aktivitas login dan update streak secara paralel
    await Promise.all([
      prisma.userActivity.create({
        data: { userId: user.id, type: "LOGIN" },
      }),
      updateStreak(user.id),
    ]);

    // Streak mungkin baru saja naik → cek badge yang berhubungan
    await evaluateBadges(user.id);

    // Re-fetch user dengan streak terbaru
    const refreshed = await prisma.user.findUnique({
      where: { clerkId },
      select: userSelect,
    });
    if (refreshed) user = refreshed;
  }

  // Hitung jumlah modul yang sudah diselesaikan user (untuk stat dashboard)
  const completedModules = await prisma.userProgress.count({
    where: { userId: user.id, completedAt: { not: null } },
  });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    role: user.role,
    xp: user.xp,
    level: user.level,
    xpToNextLevel: xpToNextLevel(user.xp),
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    completedModules,
    onboardingCompleted: user.onboardingCompleted,
    welcomePopupShown: user.welcomePopupShown,
    subscription: user.subscription ?? {
      plan: "FREE",
      status: "ACTIVE",
      endDate: null,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const result = updateUserSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await prisma.user.update({
    where: { clerkId },
    data: result.data,
  });

  return NextResponse.json({ success: true });
}
