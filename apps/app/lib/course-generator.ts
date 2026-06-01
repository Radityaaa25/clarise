/**
 * course-generator.ts — Generasi course dua fase (outline → isi per-slide).
 *
 * Fase 1: 1 call membuat blueprint (struktur, fokus tiap slide, challenge, quiz).
 * Fase 2: tiap slide konten di-generate dalam call terpisah secara PARALEL —
 *         tiap slide dapat anggaran token penuh + perhatian model penuh, jadi
 *         isinya jauh lebih dalam daripada menjejalkan seluruh course dalam
 *         satu call yang ke-truncate. Paralelisme memanfaatkan pool API key
 *         Groq (lihat lib/groq.ts — getGroqApiKey memilih key acak per call).
 */

import { getGroqApiKey } from "./groq";
import {
  buildOutlineSystemPrompt,
  buildOutlineUserPrompt,
  buildSlideContentSystemPrompt,
  buildSlideContentUserPrompt,
} from "./course-template";
import type { AiGeneratedCourse, SlideContent } from "@/types";
import { enrichSources } from "./source-search";

const CONTENT_SLIDE_TYPES = ["lesson", "example", "casestudy", "summary"];

async function groqJson(
  system: string,
  user: string,
  maxTokens: number,
  temperature: number,
): Promise<{ text: string; tokens: number }> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getGroqApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature,
      max_tokens: maxTokens,
    }),
  });
  if (!res.ok) throw new Error(`Groq API error: ${res.status}`);
  const data = await res.json();
  return {
    text: data.choices?.[0]?.message?.content || "",
    tokens: data.usage?.total_tokens || 0,
  };
}

// Jalankan fn paralel dengan batas konkurensi (hindari burst ke 1 key).
async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    out.push(...(await Promise.all(items.slice(i, i + limit).map(fn))));
  }
  return out;
}

export async function generateCourseTwoPhase(
  input: {
    topic: string;
    difficulty: string;
    targetModules: number;
    language: string;
  },
  userProfile: { learningGoal?: string; currentLevel?: string },
): Promise<{ course: AiGeneratedCourse; totalTokens: number }> {
  let totalTokens = 0;

  // ─── Fase 1: outline ───
  const outlineRes = await groqJson(
    buildOutlineSystemPrompt(),
    buildOutlineUserPrompt(input, userProfile),
    5000,
    0.7,
  );
  totalTokens += outlineRes.tokens;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = JSON.parse(outlineRes.text) as any;

  if (!course?.title || !Array.isArray(course?.modules)) {
    throw new Error("Outline tidak lengkap");
  }

  // ─── Fase 2: isi tiap slide konten (paralel) ───
  for (const mod of course.modules) {
    const slides: SlideContent[] = Array.isArray(mod.slides) ? mod.slides : [];
    const contentSlides = slides.filter((s) =>
      CONTENT_SLIDE_TYPES.includes(s.type),
    );

    await mapLimit(contentSlides, 8, async (slide) => {
      const idx = slides.indexOf(slide);
      try {
        const r = await groqJson(
          buildSlideContentSystemPrompt(),
          buildSlideContentUserPrompt({
            courseTitle: course.title,
            moduleTitle: mod.title,
            difficulty: input.difficulty,
            language: input.language,
            slideType: slide.type,
            slideTitle: slide.title,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            focus: (slide as any).focus || slide.title,
            prevTitle: slides[idx - 1]?.title,
            nextTitle: slides[idx + 1]?.title,
          }),
          1800,
          0.6,
        );
        totalTokens += r.tokens;
        const parsed = JSON.parse(r.text);
        if (parsed.content) slide.content = parsed.content;
        if (parsed.codeExample) slide.codeExample = parsed.codeExample;
        if (parsed.keyTakeaway) slide.keyTakeaway = parsed.keyTakeaway;
      } catch {
        // Slide yang gagal dibiarkan apa adanya — course-enhancer akan
        // mengisi/memperluasnya sebagai jaring pengaman.
      }
    });

    // Tambahkan challenge slide + quiz slide dari field level-modul.
    if (mod.challenge) {
      const c = mod.challenge;
      slides.push({
        slideNumber: slides.length + 1,
        type: "challenge",
        title: c.title || "Tantangan",
        content: c.content || "",
        challenge: {
          instruction: c.instruction || "",
          inputType: c.inputType || "text",
          inputPlaceholder: c.inputPlaceholder || "",
          starterCode: c.starterCode || "",
          expectedConcepts: c.expectedConcepts || [],
          evaluationCriteria: c.evaluationCriteria || "",
          hints: c.hints || [],
          sampleAnswer: c.sampleAnswer || "",
          followUpQuestion: c.followUpQuestion || "",
        },
      });
    }
    slides.push({
      slideNumber: slides.length + 1,
      type: "quiz",
      title: "Quiz",
      content: "",
    });

    slides.forEach((s, i) => (s.slideNumber = i + 1));
    mod.slides = slides;
    mod.quizBank = Array.isArray(mod.quizBank) ? mod.quizBank : [];

    // Verifikasi & perkaya sumber referensi dengan API nyata (YouTube Data API
    // + filter domain). Mengganti URL karangan LLM dengan yang valid.
    mod.sources = await enrichSources(
      course.title,
      mod.title,
      Array.isArray(mod.sources) ? mod.sources : [],
    );
  }

  return { course: course as AiGeneratedCourse, totalTokens };
}
