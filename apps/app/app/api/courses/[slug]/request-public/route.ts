import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { validateCourseQuality } from "@/lib/course-quality-gate";
import type { AiGeneratedCourse } from "@/types";

// User mengajukan course PRIVATE miliknya untuk jadi PUBLIK.
// Harus LOLOS seleksi AI (quality gate) dulu, baru masuk antrean review admin.
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      difficulty: true,
      authorId: true,
      visibility: true,
      publishStatus: true,
      modules: {
        orderBy: { order: "asc" },
        select: {
          title: true,
          slug: true,
          order: true,
          slides: {
            orderBy: { order: "asc" },
            select: { title: true, order: true, content: true },
          },
        },
      },
    },
  });
  if (!course)
    return NextResponse.json({ error: "Course not found" }, { status: 404 });

  // Ownership: hanya pembuat course yang boleh mengajukan.
  if (course.authorId !== user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (course.visibility === "PUBLIC")
    return NextResponse.json(
      { error: "Kursus ini sudah publik" },
      { status: 400 },
    );
  if (course.publishStatus === "PENDING")
    return NextResponse.json(
      { error: "Pengajuan sebelumnya masih menunggu review admin" },
      { status: 400 },
    );

  // Rekonstruksi bentuk AiGeneratedCourse dari record DB untuk seleksi AI.
  const aiCourse: AiGeneratedCourse = {
    title: course.title,
    slug: course.slug,
    description: course.description ?? "",
    difficulty: course.difficulty,
    modules: course.modules.map((m) => {
      const slides = m.slides.map((s) => {
        const c = (s.content ?? {}) as Record<string, unknown>;
        return {
          slideNumber: s.order,
          type: (c.type as string) ?? "lesson",
          title: s.title,
          content: typeof c.body === "string" ? (c.body as string) : "",
          challenge: c.challenge,
        };
      });
      const quizSlide = m.slides.find(
        (s) => (s.content as Record<string, unknown>)?.type === "quiz",
      );
      const quizBank =
        ((quizSlide?.content as Record<string, unknown>)?.quizBank as unknown[]) ??
        [];
      return { title: m.title, slug: m.slug, order: m.order, slides, quizBank };
    }),
  } as unknown as AiGeneratedCourse;

  // Seleksi AI / quality gate.
  const quality = validateCourseQuality(aiCourse);
  if (quality.action === "reject") {
    return NextResponse.json(
      {
        error:
          "Kursus belum lolos seleksi kualitas untuk dipublikasikan. Perbaiki dulu lalu ajukan lagi.",
        qualityScore: quality.score,
        suggestions: quality.suggestions.slice(0, 5),
      },
      { status: 422 },
    );
  }

  // Lolos AI → set PENDING + notifikasi admin untuk review manual.
  await prisma.course.update({
    where: { id: course.id },
    data: { publishStatus: "PENDING" },
  });

  try {
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
    });
    if (admins.length > 0) {
      await prisma.notification.createMany({
        data: admins.map((a) => ({
          userId: a.id,
          type: "ANNOUNCEMENT" as const,
          title: "Permintaan publikasi kursus",
          body: `Kursus "${course.title}" (skor AI: ${quality.score}) diajukan untuk dipublikasikan. Mohon direview.`,
        })),
      });
    }
  } catch (err) {
    console.error("[REQUEST_PUBLIC] notify admins failed:", err);
  }

  return NextResponse.json({
    success: true,
    status: "PENDING",
    qualityScore: quality.score,
    message:
      "Kursus lolos seleksi AI dan telah diajukan. Menunggu persetujuan admin sebelum tampil publik.",
  });
}
