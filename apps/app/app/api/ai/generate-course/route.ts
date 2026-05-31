import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/ratelimit";
import { getGroqApiKey } from "@/lib/groq";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { stripHtml, detectPromptInjection } from "@/lib/sanitize";
import { checkFeatureAccess } from "@/lib/subscription";
import {
  buildCourseSystemPrompt,
  augmentUserCourseInput,
  COURSE_QUALITY_STANDARDS,
} from "@/lib/course-template";
import { validateCourseQuality } from "@/lib/course-quality-gate";
import { enhanceCourseContent } from "@/lib/course-enhancer";
import type { AiGeneratedCourse } from "@/types";

// Rate limiter: max 3 course generations per day per user
const generateRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24 h"),
  prefix: "clarise:ai:generate",
});

const inputSchema = z
  .object({
    topic: z.string().min(10, "Topik minimal 10 karakter").max(200).trim(),
    difficulty: z
      .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
      .default("BEGINNER"),
    language: z.string().max(5).default("id"),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE"),
    categoryId: z.string().min(1),
    moduleCount: z.number().min(1).max(3).default(1),
  })
  .strict();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 80);
}

// ──────────────────────────────────────────────
// Call Groq API dengan system prompt dari template
// ──────────────────────────────────────────────

async function callGroqGenerate(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<{ responseText: string; totalTokens: number }> {
  const groqResponse = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 8000,
      }),
    },
  );

  if (!groqResponse.ok) {
    const errText = await groqResponse.text();
    console.error("[AI_GENERATE] Groq Error:", errText);
    throw new Error(`Groq API error: ${groqResponse.status}`);
  }

  const groqData = await groqResponse.json();
  const responseText = groqData.choices?.[0]?.message?.content || "";
  const totalTokens = groqData.usage?.total_tokens || 0;

  return { responseText, totalTokens };
}

// ──────────────────────────────────────────────
// Parse dan validasi JSON output AI
// ──────────────────────────────────────────────

function parseAiResponse(responseText: string): AiGeneratedCourse {
  const courseData: AiGeneratedCourse = JSON.parse(responseText);

  if (
    !courseData.title ||
    !courseData.modules ||
    !Array.isArray(courseData.modules)
  ) {
    throw new Error("Data kursus tidak lengkap");
  }

  // Pastikan setiap modul punya field yang dibutuhkan
  for (let i = 0; i < courseData.modules.length; i++) {
    const mod = courseData.modules[i]!;
    if (!mod.slug) {
      mod.slug = slugify(mod.title || `module-${i + 1}`);
    }
    if (!mod.order) mod.order = i + 1;
    if (!Array.isArray(mod.slides)) mod.slides = [];
    if (!Array.isArray(mod.quizBank)) mod.quizBank = [];
  }

  if (!courseData.slug) {
    courseData.slug = slugify(courseData.title);
  }

  return courseData;
}

// ──────────────────────────────────────────────
// POST handler — Pipeline lengkap
// ──────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    // ─── STEP 1: Auth check ───
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        learningGoal: true,
        currentLevel: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ─── STEP 1b: Premium check ───
    const access = await checkFeatureAccess(user.id, "canCreateCourse");
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason || "Fitur ini hanya untuk pengguna Premium" },
        { status: 403 },
      );
    }

    // ─── STEP 2: Rate limit ───
    const { success: rateLimitOk, remaining } =
      await generateRatelimit.limit(clerkId);
    if (!rateLimitOk) {
      return NextResponse.json(
        {
          error:
            "Kamu sudah membuat 3 kursus hari ini. Coba lagi besok.",
        },
        { status: 429, headers: { "X-Generate-Remaining": "0" } },
      );
    }

    // ─── STEP 3: Input validation (Zod) ───
    const body = await req.json();
    const parsed = inputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: parsed.error.format() },
        { status: 400 },
      );
    }

    const { topic, difficulty, language, visibility, categoryId, moduleCount } =
      parsed.data;

    // ─── STEP 4: Input sanitization ───
    const sanitizedTopic = stripHtml(topic);
    if (detectPromptInjection(sanitizedTopic)) {
      return NextResponse.json(
        { error: "Topik tidak dapat diproses" },
        { status: 400 },
      );
    }

    // Validate category
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Kategori tidak ditemukan" },
        { status: 404 },
      );
    }

    // ─── STEP 5: Augment input ───
    const systemPrompt = buildCourseSystemPrompt();
    const userPrompt = augmentUserCourseInput(
      {
        topic: sanitizedTopic,
        difficulty,
        targetModules: moduleCount,
        language,
      },
      {
        learningGoal: user.learningGoal ?? undefined,
        currentLevel: user.currentLevel ?? undefined,
      },
    );

    // ─── STEP 6 + 7: Generate dengan retry ───
    const maxRetries = COURSE_QUALITY_STANDARDS.maxRetryGenerate;
    let courseData: AiGeneratedCourse | null = null;
    let totalTokensUsed = 0;
    let lastError: string | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const apiKey = getGroqApiKey();
        const retryInstruction =
          attempt > 0
            ? "\n\nPERHATIAN: Percobaan sebelumnya gagal. Pastikan output HANYA berupa JSON valid tanpa teks apapun di luar JSON. Pastikan setiap modul memiliki minimal 10 slide, termasuk slide challenge dan quiz. quizBank minimal 10 soal per modul."
            : "";

        const { responseText, totalTokens } = await callGroqGenerate(
          apiKey,
          systemPrompt,
          userPrompt + retryInstruction,
        );

        totalTokensUsed += totalTokens;

        // ─── STEP 7: Parse JSON ───
        courseData = parseAiResponse(responseText);

        // ─── STEP 8: Enhance ───
        const enhanceApiKey = getGroqApiKey();
        const { enhanced, enhancements } =
          await enhanceCourseContent(courseData, enhanceApiKey);
        courseData = enhanced;

        if (enhancements.length > 0) {
          console.log(
            `[AI_GENERATE] Enhancements (attempt ${attempt + 1}):`,
            enhancements,
          );
        }

        // ─── STEP 9: Quality gate ───
        const quality = validateCourseQuality(courseData);

        if (quality.action === "reject") {
          lastError = `Quality score: ${quality.score}. Issues: ${quality.issues.join("; ")}`;
          console.warn(
            `[AI_GENERATE] Attempt ${attempt + 1} rejected (score: ${quality.score}):`,
            quality.issues,
          );

          if (attempt < maxRetries) {
            courseData = null;
            continue; // retry
          }

          // Semua retry habis → return error ke user
          return NextResponse.json(
            {
              error:
                "Topik terlalu umum. Coba lebih spesifik, contoh: 'Belajar React untuk membuat aplikasi todo list'",
              qualityScore: quality.score,
            },
            { status: 422 },
          );
        }

        // ─── STEP 10: Save to DB ───
        const baseSlug = slugify(courseData.title);
        let courseSlug = baseSlug;
        let slugCounter = 1;
        while (
          await prisma.course.findUnique({
            where: { slug: courseSlug },
            select: { id: true },
          })
        ) {
          courseSlug = `${baseSlug}-${slugCounter}`;
          slugCounter++;
        }

        const isPublished = quality.action === "publish";

        const course = await prisma.$transaction(async (tx) => {
          const newCourse = await tx.course.create({
            data: {
              title: courseData!.title,
              slug: courseSlug,
              description: courseData!.description || null,
              categoryId: category.id,
              difficulty,
              language,
              visibility,
              isAiGenerated: true,
              isUserGenerated: true,
              isPublished,
              isPremium: false,
              authorId: user.id,
              totalModules: courseData!.modules.length,
            },
          });

          // Create modules, slides, and sources
          for (const mod of courseData!.modules) {
            const moduleSlug =
              slugify(mod.title) || `module-${mod.order}`;

            const newModule = await tx.module.create({
              data: {
                title: mod.title,
                slug: moduleSlug,
                courseId: newCourse.id,
                order: mod.order,
                xpReward: 20,
              },
            });

            // Slides
            if (Array.isArray(mod.slides)) {
              for (const slide of mod.slides) {
                await tx.slide.create({
                  data: {
                    title: slide.title,
                    moduleId: newModule.id,
                    order: slide.slideNumber || slide.slideNumber,
                    content: {
                      type: slide.type || "lesson",
                      body: slide.content || "",
                      ...(slide.codeExample
                        ? { codeExample: slide.codeExample }
                        : {}),
                      ...(slide.keyTakeaway
                        ? { keyTakeaway: slide.keyTakeaway }
                        : {}),
                      ...(slide.challenge
                        ? {
                            challenge: {
                              instruction:
                                slide.challenge.instruction,
                              inputType:
                                slide.challenge.inputType,
                              inputPlaceholder:
                                slide.challenge.inputPlaceholder,
                              starterCode:
                                slide.challenge.starterCode,
                              expectedConcepts:
                                slide.challenge.expectedConcepts,
                              evaluationCriteria:
                                slide.challenge.evaluationCriteria,
                              hints: slide.challenge.hints,
                              sampleAnswer:
                                slide.challenge.sampleAnswer,
                              followUpQuestion:
                                slide.challenge.followUpQuestion,
                            },
                          }
                        : {}),
                      ...(slide.quiz ? { quiz: slide.quiz } : {}),
                    } as unknown as Prisma.InputJsonValue,
                  },
                });
              }
            }

            // QuizBank sebagai slide terakhir (jika ada)
            if (Array.isArray(mod.quizBank) && mod.quizBank.length > 0) {
              // Cek apakah sudah ada quiz slide
              const hasQuizSlide = (mod.slides || []).some(
                (s) => s.type === "quiz",
              );
              if (!hasQuizSlide) {
                await tx.slide.create({
                  data: {
                    title: "Quiz",
                    moduleId: newModule.id,
                    order: (mod.slides?.length || 0) + 1,
                    content: {
                      type: "quiz",
                      body: "",
                      quizBank: mod.quizBank,
                    } as unknown as Prisma.InputJsonValue,
                  },
                });
              }
            }
          }

          return newCourse;
        });

        // ─── STEP 11: Post-save actions ───

        // Award XP
        await prisma.user.update({
          where: { id: user.id },
          data: { xp: { increment: 50 } },
        });

        // Record activity
        await prisma.userActivity.create({
          data: {
            userId: user.id,
            type: "COURSE_VIEW",
            metadata: {
              action: "generate_course",
              courseId: course.id,
              qualityScore: quality.score,
              qualityAction: quality.action,
            },
          },
        });

        // Token tracking
        if (totalTokensUsed > 0) {
          try {
            await redis.incrby("clarise:token:course", totalTokensUsed);
          } catch (err) {
            console.error("Failed to track tokens", err);
          }
        }

        // Notifikasi admin jika flagged
        if (quality.action === "flag_for_review") {
          try {
            const admins = await prisma.user.findMany({
              where: { role: "ADMIN" },
              select: { id: true },
            });
            for (const admin of admins) {
              await prisma.notification.create({
                data: {
                  userId: admin.id,
                  type: "ANNOUNCEMENT",
                  title: "Kursus AI perlu review",
                  body: `Kursus "${course.title}" (score: ${quality.score}) perlu di-review sebelum dipublikasikan.`,
                },
              });
            }
          } catch (err) {
            console.error("Failed to notify admins:", err);
          }
        }

        // Check badge "Course Creator"
        try {
          const badge = await prisma.badge.findUnique({
            where: { name: "Course Creator" },
          });
          if (badge) {
            const existing = await prisma.userBadge.findUnique({
              where: {
                userId_badgeId: { userId: user.id, badgeId: badge.id },
              },
            });
            if (!existing) {
              await prisma.userBadge.create({
                data: { userId: user.id, badgeId: badge.id },
              });
            }
          }
        } catch (err) {
          console.error("Failed to check badge:", err);
        }

        // ─── STEP 12: Response ───
        return NextResponse.json(
          {
            success: true,
            courseSlug: course.slug,
            qualityScore: quality.score,
            status: quality.action === "publish" ? "published" : "pending_review",
            message:
              quality.action === "publish"
                ? "Kursus berhasil dibuat dan dipublikasikan!"
                : "Kursus berhasil dibuat! Akan di-review oleh admin sebelum dipublikasikan.",
          },
          {
            status: 201,
            headers: {
              "X-Generate-Remaining": remaining.toString(),
            },
          },
        );
      } catch (parseErr) {
        lastError =
          parseErr instanceof Error ? parseErr.message : String(parseErr);
        console.error(
          `[AI_GENERATE] Attempt ${attempt + 1} error:`,
          lastError,
        );

        if (attempt >= maxRetries) {
          return NextResponse.json(
            {
              error:
                "Terjadi kesalahan saat membuat kursus. Silakan coba lagi.",
            },
            { status: 502 },
          );
        }
        // retry
      }
    }

    // Fallback (shouldn't reach here)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat kursus. Silakan coba lagi." },
      { status: 500 },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[AI_GENERATE_COURSE]", message);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat kursus" },
      { status: 500 },
    );
  }
}
