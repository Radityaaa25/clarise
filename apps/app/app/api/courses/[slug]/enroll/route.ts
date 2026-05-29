import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;

  // Wave 1: parallel — user dan course independen
  // Course query embed first module supaya hemat 1 round-trip ekstra.
  const [user, course] = await Promise.all([
    prisma.user.findUnique({
      where: { clerkId },
      select: { id: true, subscription: { select: { plan: true } } },
    }),
    prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        isPremium: true,
        visibility: true,
        authorId: true,
        modules: {
          take: 1,
          orderBy: { order: "asc" },
          select: { id: true },
        },
      },
    }),
  ]);

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!course)
    return NextResponse.json({ error: "Course not found" }, { status: 404 });

  // 1. Private course validation
  if (course.visibility === "PRIVATE" && course.authorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const firstModule = course.modules[0];
  if (!firstModule) {
    return NextResponse.json(
      { error: "Course has no modules" },
      { status: 400 },
    );
  }

  // 2. Free tier limit validation — hanya jalankan untuk free user
  const isFreeUser = user.subscription?.plan === "FREE" || !user.subscription;
  if (isFreeUser) {
    const activeCourses = await prisma.userProgress.findMany({
      where: { userId: user.id },
      distinct: ["courseId"],
      select: {
        courseId: true,
        course: { select: { isPremium: true } },
      },
    });

    const alreadyEnrolled = activeCourses.some(
      (c) => c.courseId === course.id,
    );
    if (!alreadyEnrolled) {
      // Rule 1: Max 2 courses total
      if (activeCourses.length >= 2) {
        return NextResponse.json(
          {
            error:
              "Batas 2 kursus gratis tercapai. Yuk upgrade ke Premium untuk akses tanpa batas!",
          },
          { status: 403 },
        );
      }

      // Rule 2: Max 1 Premium course
      if (course.isPremium) {
        const premiumEnrolledCount = activeCourses.filter(
          (c) => c.course.isPremium,
        ).length;
        if (premiumEnrolledCount >= 1) {
          return NextResponse.json(
            {
              error:
                "Anda sudah mengambil 1 kursus Premium gratis. Upgrade untuk membuka kursus Premium lainnya!",
            },
            { status: 403 },
          );
        }
      }
    }
  }

  // Atomic upsert — kalau progress sudah ada, no-op. Hemat 1 round-trip
  // dibanding pola findUnique + create.
  await prisma.userProgress.upsert({
    where: {
      userId_moduleId: { userId: user.id, moduleId: firstModule.id },
    },
    update: {}, // tidak menyentuh progress yang sudah ada
    create: {
      userId: user.id,
      moduleId: firstModule.id,
      courseId: course.id,
      completedAt: null,
      activeSlide: 0,
    },
  });

  return NextResponse.json({ success: true, enrolled: true });
}
