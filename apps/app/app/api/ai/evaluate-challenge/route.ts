import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/ratelimit";
import { getGroqApiKey } from "@/lib/groq";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { stripHtml, detectPromptInjection } from "@/lib/sanitize";
import {
  buildChallengeEvaluatorPrompt,
  COURSE_QUALITY_STANDARDS,
} from "@/lib/course-template";
import type { ChallengeData, ChallengeEvaluationResponse } from "@/types";

// Rate limiter: max 10 evaluasi per user per hari
const evaluateRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    COURSE_QUALITY_STANDARDS.challenge.maxSubmitsPerDay,
    "24 h",
  ),
  prefix: "clarise:ai:evaluate",
});

// ──────────────────────────────────────────────
// 5A. Input Validation
// ──────────────────────────────────────────────

const EvaluateChallengeSchema = z
  .object({
    moduleId: z.string().min(1),
    slideIndex: z.number().min(0),
    userAnswer: z
      .string()
      .min(1, "Jawaban tidak boleh kosong")
      .max(3000, "Jawaban terlalu panjang"),
    inputType: z.enum(["code", "text", "math", "essay"]),
  })
  .strict();

export async function POST(req: Request) {
  try {
    // ─── Auth check ───
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ─── Rate limit ───
    const { success: rateLimitOk } = await evaluateRatelimit.limit(
      `${clerkId}`,
    );
    if (!rateLimitOk) {
      return NextResponse.json(
        {
          error:
            "Kamu sudah mencapai batas evaluasi hari ini. Coba lagi besok.",
        },
        { status: 429 },
      );
    }

    // ─── Input validation ───
    const body = await req.json();
    const parsed = EvaluateChallengeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: parsed.error.format() },
        { status: 400 },
      );
    }

    const { moduleId, slideIndex, userAnswer, inputType } = parsed.data;

    // ─── 5B. Security: sanitasi & prompt injection check ───
    const sanitizedAnswer = stripHtml(userAnswer);
    // Kita TIDAK reject prompt injection di sini, tapi kita LOG saja.
    // System prompt evaluator sudah di-harden untuk mengabaikan injection.
    if (detectPromptInjection(sanitizedAnswer)) {
      console.warn(
        `[EVALUATE] Possible prompt injection detected from user ${user.id}`,
      );
    }

    // ─── 5B. IDOR prevention: validasi modul milik user ───
    const moduleData = await prisma.module.findUnique({
      where: { id: moduleId },
      select: {
        id: true,
        title: true,
        xpReward: true,
        courseId: true,
        slides: {
          orderBy: { order: "asc" },
          select: { id: true, content: true, order: true },
        },
        course: {
          select: {
            progress: {
              where: { userId: user.id },
              select: { id: true },
              take: 1,
            },
          },
        },
      },
    });

    if (!moduleData) {
      return NextResponse.json(
        { error: "Modul tidak ditemukan" },
        { status: 404 },
      );
    }

    // User harus punya progress di course ini (enrolled)
    if (!moduleData.course.progress || moduleData.course.progress.length === 0) {
      return NextResponse.json(
        { error: "Kamu belum mendaftar di kursus ini" },
        { status: 403 },
      );
    }

    // ─── Ambil challenge data dari DB ───
    const targetSlide = moduleData.slides[slideIndex];
    if (!targetSlide) {
      return NextResponse.json(
        { error: "Slide tidak ditemukan" },
        { status: 404 },
      );
    }

    const slideContent = targetSlide.content as Record<string, unknown>;
    if (!slideContent || slideContent.type !== "challenge" || !slideContent.challenge) {
      return NextResponse.json(
        { error: "Slide ini bukan challenge" },
        { status: 400 },
      );
    }

    const challenge = slideContent.challenge as ChallengeData;

    // Validasi input type
    const maxLength =
      COURSE_QUALITY_STANDARDS.challenge.maxInputLength[inputType];
    if (sanitizedAnswer.length > maxLength) {
      return NextResponse.json(
        {
          error: `Jawaban terlalu panjang untuk tipe ${inputType} (maks ${maxLength} karakter)`,
        },
        { status: 400 },
      );
    }

    // ─── 5C. Call Groq untuk evaluasi ───
    const evaluatorPrompt = buildChallengeEvaluatorPrompt({
      instruction: challenge.instruction,
      expectedConcepts: challenge.expectedConcepts || [],
      evaluationCriteria: challenge.evaluationCriteria || "",
      inputType: challenge.inputType || inputType,
    });

    const apiKey = getGroqApiKey();
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
            { role: "system", content: evaluatorPrompt },
            { role: "user", content: sanitizedAnswer },
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 500,
        }),
      },
    );

    if (!groqResponse.ok) {
      console.error(
        "[EVALUATE] Groq Error:",
        await groqResponse.text(),
      );
      return NextResponse.json(
        { error: "Gagal mengevaluasi jawaban. Silakan coba lagi." },
        { status: 502 },
      );
    }

    const groqData = await groqResponse.json();
    const responseText = groqData.choices?.[0]?.message?.content || "";

    // Token tracking
    const totalTokens = groqData.usage?.total_tokens || 0;
    if (totalTokens > 0) {
      try {
        await redis.incrby("clarise:token:evaluate", totalTokens);
      } catch (err) {
        console.error("Failed to track tokens", err);
      }
    }

    // ─── Parse evaluator response ───
    let evaluation: {
      isCorrect: boolean;
      score: number;
      feedback: string;
      whatIsGood: string;
      whatNeedsImprovement: string;
      hint: string | null;
    };

    try {
      evaluation = JSON.parse(responseText);
    } catch {
      console.error("[EVALUATE] Failed to parse evaluator JSON");
      return NextResponse.json(
        { error: "Gagal memproses hasil evaluasi. Silakan coba lagi." },
        { status: 502 },
      );
    }

    // ─── 5D. Response Processing ───
    let xpEarned: number | null = null;

    if (evaluation.isCorrect) {
      // Award XP
      xpEarned = moduleData.xpReward;
      await prisma.user.update({
        where: { id: user.id },
        data: { xp: { increment: xpEarned } },
      });

      // Track activity
      await prisma.userActivity.create({
        data: {
          userId: user.id,
          type: "MODULE_COMPLETE",
          metadata: {
            action: "challenge_complete",
            moduleId: moduleData.id,
            courseId: moduleData.courseId,
            score: evaluation.score,
          },
        },
      });
    }

    // JANGAN return sampleAnswer ke client
    const response: ChallengeEvaluationResponse = {
      isCorrect: evaluation.isCorrect,
      score: evaluation.score,
      feedback: evaluation.feedback,
      whatIsGood: evaluation.whatIsGood || "",
      whatNeedsImprovement: evaluation.whatNeedsImprovement || "",
      hint: evaluation.isCorrect ? null : (evaluation.hint || null),
      xpEarned,
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[EVALUATE_CHALLENGE]", message);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengevaluasi jawaban" },
      { status: 500 },
    );
  }
}
