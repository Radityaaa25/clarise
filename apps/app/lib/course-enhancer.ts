/**
 * course-enhancer.ts — Post-processing untuk memperbaiki konten AI
 * yang tidak memenuhi standar kualitas.
 *
 * Berjalan SETELAH generate utama, SEBELUM quality gate.
 * Biaya: ~10-20% token tambahan, tapi kualitas jauh lebih konsisten.
 */

import { COURSE_QUALITY_STANDARDS } from "./course-template";
import type { AiGeneratedCourse, AiGeneratedModule, QuizQuestion } from "@/types";

// ──────────────────────────────────────────────
// Utility
// ──────────────────────────────────────────────

function countWords(text: string): number {
  if (!text) return 0;
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_\->`|[\]()]/g, "")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

interface GroqCallParams {
  apiKey: string;
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

async function callGroq(params: GroqCallParams): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: params.systemPrompt },
        { role: "user", content: params.userPrompt },
      ],
      temperature: params.temperature ?? 0.5,
      max_tokens: params.maxTokens ?? 2000,
      ...(params.jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    console.error("[ENHANCER] Groq error:", res.status);
    throw new Error(`Groq API error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// ──────────────────────────────────────────────
// 3A. Slide Content Expander
// ──────────────────────────────────────────────

async function expandShortSlides(
  mod: AiGeneratedModule,
  apiKey: string,
): Promise<{ expanded: number; apiCalls: number }> {
  const standards = COURSE_QUALITY_STANDARDS;
  let expanded = 0;
  let apiCalls = 0;

  // Kumpulkan slide yang terlalu pendek (bukan quiz/challenge), sort by shortest
  const shortSlides = (mod.slides || [])
    .map((slide, idx) => ({ slide, idx, words: countWords(slide.content) }))
    .filter(
      (s) =>
        s.slide.type !== "quiz" &&
        s.slide.type !== "challenge" &&
        s.words < standards.minWordsPerSlide,
    )
    .sort((a, b) => a.words - b.words)
    .slice(0, 3); // maks 3 slide per modul

  for (const { slide, idx } of shortSlides) {
    if (apiCalls >= 3) break; // cost control per modul

    try {
      const result = await callGroq({
        apiKey,
        systemPrompt: `Kamu adalah content enhancer untuk platform edukasi Clarise.
Tugas: Expand konten slide berikut agar lebih mendalam, minimal 150 kata.
Pertahankan bahasa, gaya, dan topik yang sama.
Tambahkan: analogi, contoh nyata (konteks Indonesia), dan penjelasan yang lebih detail.
Output HANYA konten slide yang sudah di-expand dalam Markdown — tanpa wrapper JSON.`,
        userPrompt: `Judul slide: "${slide.title}"
Modul: "${mod.title}"
Konten saat ini (${countWords(slide.content)} kata):
${slide.content}

Expand konten ini menjadi minimal 150 kata dengan tetap mempertahankan gaya dan topik.`,
        temperature: 0.6,
        maxTokens: 1500,
      });

      if (result && countWords(result) >= standards.minWordsPerSlide) {
        mod.slides[idx]!.content = result;
        expanded++;
      }
      apiCalls++;
    } catch (err) {
      console.error(`[ENHANCER] Failed to expand slide "${slide.title}":`, err);
    }
  }

  return { expanded, apiCalls };
}

// ──────────────────────────────────────────────
// 3B. Missing Challenge Handler
// ──────────────────────────────────────────────

async function addMissingChallenge(
  mod: AiGeneratedModule,
  apiKey: string,
): Promise<{ added: boolean; apiCalls: number }> {
  const hasChallenge = (mod.slides || []).some((s) => s.type === "challenge");
  if (hasChallenge) return { added: false, apiCalls: 0 };

  try {
    const result = await callGroq({
      apiKey,
      systemPrompt: `Kamu adalah pembuat challenge interaktif untuk platform edukasi Clarise.
Buat SATU challenge slide untuk modul yang diberikan.
Output HARUS berupa JSON valid dengan struktur:
{
  "slideNumber": number,
  "type": "challenge",
  "title": "Judul Challenge",
  "content": "Penjelasan dan konteks challenge minimal 150 kata",
  "challenge": {
    "instruction": "instruksi jelas",
    "inputType": "code" atau "text" atau "math" atau "essay",
    "inputPlaceholder": "hint jawaban",
    "starterCode": "kode awal jika inputType code (opsional)",
    "expectedConcepts": ["konsep1", "konsep2", "konsep3"],
    "evaluationCriteria": "kriteria evaluasi detail",
    "hints": ["hint samar", "hint lebih jelas", "hint spesifik"],
    "sampleAnswer": "jawaban contoh",
    "followUpQuestion": "pertanyaan lanjutan"
  }
}`,
      userPrompt: `Buat challenge untuk modul: "${mod.title}"
Topik-topik slide di modul ini: ${(mod.slides || []).map((s) => s.title).join(", ")}`,
      temperature: 0.5,
      maxTokens: 1500,
      jsonMode: true,
    });

    const challengeSlide = JSON.parse(result);

    // Insert sebelum slide rangkuman (atau di akhir)
    const summaryIdx = (mod.slides || []).findIndex(
      (s) => s.type === "summary",
    );
    const insertIdx = summaryIdx >= 0 ? summaryIdx : mod.slides.length;
    challengeSlide.slideNumber = insertIdx + 1;

    mod.slides.splice(insertIdx, 0, challengeSlide);

    // Re-number slides
    for (let i = 0; i < mod.slides.length; i++) {
      mod.slides[i]!.slideNumber = i + 1;
    }

    return { added: true, apiCalls: 1 };
  } catch (err) {
    console.error(
      `[ENHANCER] Failed to add challenge to "${mod.title}":`,
      err,
    );
    return { added: false, apiCalls: 1 };
  }
}

// ──────────────────────────────────────────────
// 3C. Quiz Bank Completer
// ──────────────────────────────────────────────

async function completeQuizBank(
  mod: AiGeneratedModule,
  apiKey: string,
): Promise<{ added: number; apiCalls: number }> {
  const standards = COURSE_QUALITY_STANDARDS;
  const quizBank = mod.quizBank || [];
  const needed = standards.minQuizQuestions - quizBank.length;

  if (needed <= 0) return { added: 0, apiCalls: 0 };

  try {
    const existingQuestions = quizBank
      .map((q) => q.question)
      .join("\n- ");

    const result = await callGroq({
      apiKey,
      systemPrompt: `Kamu adalah pembuat soal quiz untuk platform edukasi Clarise.
Buat soal quiz tambahan yang TIDAK duplikat dengan soal yang sudah ada.
Soal harus menguji pemahaman konseptual — bukan hafalan.
Setiap penjelasan harus minimal 50 kata.
Output HARUS berupa JSON valid: { "questions": [...] }
Format per soal:
{
  "id": "q<nomor>",
  "question": "pertanyaan",
  "options": [{"id": "a", "text": "..."}, {"id": "b", "text": "..."}, {"id": "c", "text": "..."}, {"id": "d", "text": "..."}],
  "correctAnswer": "a",
  "explanation": "penjelasan minimal 50 kata",
  "difficulty": "easy" | "medium" | "hard"
}`,
      userPrompt: `Modul: "${mod.title}"
Topik slide: ${(mod.slides || []).map((s) => s.title).join(", ")}
Soal yang sudah ada (JANGAN buat duplikat):
- ${existingQuestions || "(belum ada soal)"}

Buat tepat ${needed} soal baru. Komposisi: campuran easy, medium, hard.`,
      temperature: 0.5,
      maxTokens: 3000,
      jsonMode: true,
    });

    const parsed = JSON.parse(result);
    const newQuestions: QuizQuestion[] = parsed.questions || [];

    // Renumber IDs dan gabungkan
    const startId = quizBank.length + 1;
    for (let i = 0; i < newQuestions.length; i++) {
      newQuestions[i]!.id = `q${startId + i}`;
    }

    mod.quizBank = [...quizBank, ...newQuestions];
    return { added: newQuestions.length, apiCalls: 1 };
  } catch (err) {
    console.error(
      `[ENHANCER] Failed to complete quiz bank for "${mod.title}":`,
      err,
    );
    return { added: 0, apiCalls: 1 };
  }
}

// ──────────────────────────────────────────────
// 3D. Hints Generator
// ──────────────────────────────────────────────

async function completeHints(
  mod: AiGeneratedModule,
  apiKey: string,
): Promise<{ updated: boolean; apiCalls: number }> {
  const standards = COURSE_QUALITY_STANDARDS;
  const challengeSlide = (mod.slides || []).find(
    (s) => s.type === "challenge" && s.challenge,
  );

  if (!challengeSlide?.challenge) return { updated: false, apiCalls: 0 };

  const hints = challengeSlide.challenge.hints || [];
  if (hints.length >= standards.challenge.maxHints)
    return { updated: false, apiCalls: 0 };

  try {
    const needed = standards.challenge.maxHints - hints.length;
    const result = await callGroq({
      apiKey,
      systemPrompt: `Kamu adalah pembuat hints untuk challenge edukasi.
Buat hints yang terurut dari samar ke spesifik.
Output HARUS berupa JSON: { "hints": ["hint1", "hint2", ...] }
Hints TIDAK BOLEH memberikan jawaban langsung — hanya mengarahkan.`,
      userPrompt: `Challenge: "${challengeSlide.challenge.instruction}"
Hints yang sudah ada: ${JSON.stringify(hints)}
Buat tepat ${needed} hint tambahan yang lebih spesifik dari yang sudah ada.`,
      temperature: 0.4,
      maxTokens: 500,
      jsonMode: true,
    });

    const parsed = JSON.parse(result);
    const newHints: string[] = parsed.hints || [];
    challengeSlide.challenge.hints = [...hints, ...newHints].slice(
      0,
      standards.challenge.maxHints,
    );

    return { updated: true, apiCalls: 1 };
  } catch (err) {
    console.error(`[ENHANCER] Failed to generate hints for "${mod.title}":`, err);
    return { updated: false, apiCalls: 1 };
  }
}

// ──────────────────────────────────────────────
// 3E. Main Enhance Function (with Cost Control)
// ──────────────────────────────────────────────

export async function enhanceCourseContent(
  course: AiGeneratedCourse,
  apiKey: string,
): Promise<{
  enhanced: AiGeneratedCourse;
  totalApiCalls: number;
  enhancements: string[];
}> {
  let totalApiCalls = 0;
  const maxApiCalls = 5; // cost control: maks 5 API calls per session
  const enhancements: string[] = [];

  for (const mod of course.modules) {
    if (totalApiCalls >= maxApiCalls) {
      enhancements.push(
        `⚠️ Batas API calls tercapai (${maxApiCalls}). Beberapa modul mungkin belum sepenuhnya diperbaiki.`,
      );
      break;
    }

    // 3B. Missing challenge
    const challengeResult = await addMissingChallenge(mod, apiKey);
    totalApiCalls += challengeResult.apiCalls;
    if (challengeResult.added) {
      enhancements.push(`✅ Challenge ditambahkan ke modul "${mod.title}"`);
    }
    if (totalApiCalls >= maxApiCalls) break;

    // 3C. Quiz bank
    const quizResult = await completeQuizBank(mod, apiKey);
    totalApiCalls += quizResult.apiCalls;
    if (quizResult.added > 0) {
      enhancements.push(
        `✅ ${quizResult.added} soal quiz ditambahkan ke modul "${mod.title}"`,
      );
    }
    if (totalApiCalls >= maxApiCalls) break;

    // 3D. Hints
    const hintsResult = await completeHints(mod, apiKey);
    totalApiCalls += hintsResult.apiCalls;
    if (hintsResult.updated) {
      enhancements.push(`✅ Hints dilengkapi di modul "${mod.title}"`);
    }
    if (totalApiCalls >= maxApiCalls) break;

    // 3A. Expand short slides (bisa pakai banyak API calls)
    const expandResult = await expandShortSlides(mod, apiKey);
    totalApiCalls += expandResult.apiCalls;
    if (expandResult.expanded > 0) {
      enhancements.push(
        `✅ ${expandResult.expanded} slide di-expand di modul "${mod.title}"`,
      );
    }
  }

  return { enhanced: course, totalApiCalls, enhancements };
}
