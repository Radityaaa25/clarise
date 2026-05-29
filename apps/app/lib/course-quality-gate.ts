/**
 * course-quality-gate.ts — Validasi kualitas kursus sebelum disimpan ke DB.
 *
 * Berjalan SETELAH enhancer, SEBELUM simpan ke database.
 * Menghasilkan score 0-100 dan action (publish / flag_for_review / reject).
 */

import { COURSE_QUALITY_STANDARDS } from "./course-template";
import type {
  AiGeneratedCourse,
  QualityGateResult,
} from "@/types";

// ──────────────────────────────────────────────
// Utility: hitung kata dalam string
// ──────────────────────────────────────────────

function countWords(text: string): number {
  if (!text) return 0;
  return text
    .replace(/```[\s\S]*?```/g, "") // hapus code blocks
    .replace(/[#*_\->`|[\]()]/g, "") // hapus markdown symbols
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

// ──────────────────────────────────────────────
// 2A. Structural Validation
// ──────────────────────────────────────────────

function validateStructure(course: AiGeneratedCourse): string[] {
  const issues: string[] = [];

  if (!course.title || typeof course.title !== "string") {
    issues.push("Course title kosong atau bukan string");
  }
  if (!course.modules || !Array.isArray(course.modules)) {
    issues.push("Field 'modules' tidak ada atau bukan array");
    return issues; // tidak bisa lanjut validasi modul
  }
  if (course.modules.length === 0) {
    issues.push("Course tidak memiliki modul");
    return issues;
  }

  for (let i = 0; i < course.modules.length; i++) {
    const mod = course.modules[i]!;
    const modLabel = `Modul ${i + 1} ("${mod.title || "tanpa judul"}")`;

    if (!mod.title) issues.push(`${modLabel}: title kosong`);
    if (!mod.slug) issues.push(`${modLabel}: slug kosong`);
    if (typeof mod.order !== "number")
      issues.push(`${modLabel}: order bukan number`);

    if (!Array.isArray(mod.slides)) {
      issues.push(`${modLabel}: field 'slides' bukan array`);
      continue;
    }

    for (let j = 0; j < mod.slides.length; j++) {
      const slide = mod.slides[j]!;
      const slideLabel = `${modLabel} > Slide ${j + 1}`;

      if (!slide.title) issues.push(`${slideLabel}: title kosong`);
      if (!slide.type) issues.push(`${slideLabel}: type kosong`);
      if (!slide.content && slide.type !== "quiz") {
        issues.push(`${slideLabel}: content kosong`);
      }

      // Validasi challenge structure
      if (slide.type === "challenge" && slide.challenge) {
        const c = slide.challenge;
        if (!c.instruction)
          issues.push(`${slideLabel}: challenge.instruction kosong`);
        if (!c.inputType)
          issues.push(`${slideLabel}: challenge.inputType kosong`);
        if (!Array.isArray(c.expectedConcepts) || c.expectedConcepts.length < 1)
          issues.push(`${slideLabel}: challenge.expectedConcepts kurang`);
        if (!c.evaluationCriteria)
          issues.push(`${slideLabel}: challenge.evaluationCriteria kosong`);
      }
    }

    if (!Array.isArray(mod.quizBank)) {
      issues.push(`${modLabel}: field 'quizBank' bukan array`);
    }
  }

  return issues;
}

// ──────────────────────────────────────────────
// 2B. Quantity Validation
// ──────────────────────────────────────────────

function validateQuantity(course: AiGeneratedCourse): string[] {
  const issues: string[] = [];
  const standards = COURSE_QUALITY_STANDARDS;

  for (let i = 0; i < course.modules.length; i++) {
    const mod = course.modules[i]!;
    const modLabel = `Modul ${i + 1} ("${mod.title || ""}")`;
    const slides = mod.slides || [];

    // Jumlah slide minimum
    if (slides.length < standards.minSlidesPerModule.free) {
      issues.push(
        `${modLabel}: hanya ${slides.length} slide, minimum ${standards.minSlidesPerModule.free}`,
      );
    }

    // Harus ada challenge
    const hasChallenge = slides.some((s) => s.type === "challenge");
    if (!hasChallenge) {
      issues.push(`${modLabel}: tidak ada slide type "challenge"`);
    }

    // Harus ada quiz
    const hasQuiz = slides.some((s) => s.type === "quiz");
    if (!hasQuiz) {
      issues.push(`${modLabel}: tidak ada slide type "quiz"`);
    }

    // QuizBank minimum
    const quizBank = mod.quizBank || [];
    if (quizBank.length < standards.minQuizQuestions) {
      issues.push(
        `${modLabel}: quizBank hanya ${quizBank.length} soal, minimum ${standards.minQuizQuestions}`,
      );
    }
  }

  return issues;
}

// ──────────────────────────────────────────────
// 2C. Content Quality Scoring
// ──────────────────────────────────────────────

function scoreContentQuality(course: AiGeneratedCourse): {
  score: number;
  details: Record<string, number>;
  suggestions: string[];
} {
  const standards = COURSE_QUALITY_STANDARDS;
  const suggestions: string[] = [];
  const modules = course.modules || [];

  if (modules.length === 0) {
    return { score: 0, details: {}, suggestions: ["Course tidak ada modul"] };
  }

  // +20 poin: semua slide >= 150 kata
  let allSlidesAboveMinWords = true;
  let shortSlideCount = 0;
  for (const mod of modules) {
    for (const slide of mod.slides || []) {
      if (slide.type === "quiz" || slide.type === "challenge") continue;
      if (countWords(slide.content) < standards.minWordsPerSlide) {
        allSlidesAboveMinWords = false;
        shortSlideCount++;
      }
    }
  }
  const slideWordsScore = allSlidesAboveMinWords ? 20 : Math.max(0, 20 - shortSlideCount * 2);
  if (!allSlidesAboveMinWords) {
    suggestions.push(
      `${shortSlideCount} slide memiliki kurang dari ${standards.minWordsPerSlide} kata. Tambahkan penjelasan dan contoh.`,
    );
  }

  // +20 poin: setiap modul punya challenge dengan expectedConcepts >= 3
  let challengeScore = 20;
  for (const mod of modules) {
    const challengeSlide = (mod.slides || []).find(
      (s) => s.type === "challenge",
    );
    if (!challengeSlide?.challenge) {
      challengeScore -= Math.floor(20 / modules.length);
      suggestions.push(
        `Modul "${mod.title}": tidak ada challenge, atau challenge tidak memiliki structure yang lengkap.`,
      );
    } else if (
      (challengeSlide.challenge.expectedConcepts?.length || 0) < 3
    ) {
      challengeScore -= Math.floor(10 / modules.length);
      suggestions.push(
        `Modul "${mod.title}": challenge hanya punya ${challengeSlide.challenge.expectedConcepts?.length || 0} expected concepts, disarankan minimal 3.`,
      );
    }
  }
  challengeScore = Math.max(0, challengeScore);

  // +20 poin: setiap modul punya quiz dengan quizBank >= 10 soal
  let quizScore = 20;
  for (const mod of modules) {
    const quizBank = mod.quizBank || [];
    if (quizBank.length < standards.minQuizQuestions) {
      quizScore -= Math.floor(20 / modules.length);
      suggestions.push(
        `Modul "${mod.title}": quizBank hanya ${quizBank.length} soal, minimum ${standards.minQuizQuestions}.`,
      );
    }
  }
  quizScore = Math.max(0, quizScore);

  // +20 poin: ada slide type "casestudy" atau "example" di setiap modul
  let caseStudyScore = 20;
  for (const mod of modules) {
    const hasCaseOrExample = (mod.slides || []).some(
      (s) => s.type === "casestudy" || s.type === "example",
    );
    if (!hasCaseOrExample) {
      caseStudyScore -= Math.floor(20 / modules.length);
      suggestions.push(
        `Modul "${mod.title}": tidak ada slide "casestudy" atau "example". Tambahkan contoh implementasi nyata.`,
      );
    }
  }
  caseStudyScore = Math.max(0, caseStudyScore);

  // +10 poin: challenge punya tepat 3 hints
  let hintsScore = 10;
  for (const mod of modules) {
    const challengeSlide = (mod.slides || []).find(
      (s) => s.type === "challenge",
    );
    if (
      challengeSlide?.challenge &&
      (challengeSlide.challenge.hints?.length || 0) !== standards.challenge.maxHints
    ) {
      hintsScore -= Math.floor(10 / modules.length);
    }
  }
  hintsScore = Math.max(0, hintsScore);

  // +10 poin: semua soal quiz punya explanation >= 50 kata
  let explanationScore = 10;
  let shortExplanations = 0;
  for (const mod of modules) {
    for (const q of mod.quizBank || []) {
      if (countWords(q.explanation || "") < 50) {
        shortExplanations++;
      }
    }
  }
  if (shortExplanations > 0) {
    const penalty = Math.min(10, shortExplanations);
    explanationScore = Math.max(0, 10 - penalty);
    suggestions.push(
      `${shortExplanations} soal quiz punya penjelasan kurang dari 50 kata. Lengkapi penjelasan agar user paham.`,
    );
  }

  const totalScore =
    slideWordsScore +
    challengeScore +
    quizScore +
    caseStudyScore +
    hintsScore +
    explanationScore;

  return {
    score: Math.min(100, Math.max(0, totalScore)),
    details: {
      slideWords: slideWordsScore,
      challenge: challengeScore,
      quiz: quizScore,
      caseStudy: caseStudyScore,
      hints: hintsScore,
      explanation: explanationScore,
    },
    suggestions,
  };
}

// ──────────────────────────────────────────────
// 2D + 2E. Main Validation Function
// ──────────────────────────────────────────────

export function validateCourseQuality(
  course: AiGeneratedCourse,
): QualityGateResult {
  // Structural validation
  const structuralIssues = validateStructure(course);
  if (structuralIssues.length > 5) {
    // terlalu banyak masalah struktur → langsung reject
    return {
      isValid: false,
      score: 0,
      action: "reject",
      issues: structuralIssues,
      suggestions: [
        "Output AI memiliki banyak masalah struktural. Coba generate ulang dengan topik yang lebih spesifik.",
      ],
    };
  }

  // Quantity validation
  const quantityIssues = validateQuantity(course);

  // Content quality scoring
  const { score, suggestions } = scoreContentQuality(course);

  // Combine all issues
  const allIssues = [...structuralIssues, ...quantityIssues];

  // Determine action based on score
  const thresholds = COURSE_QUALITY_STANDARDS.qualityScoreThreshold;
  let action: "publish" | "flag_for_review" | "reject";

  if (score >= thresholds.flagForReview) {
    action = "publish";
  } else if (score >= thresholds.reject) {
    action = "flag_for_review";
  } else {
    action = "reject";
  }

  // Jika ada masalah kuantitas kritis, turunkan action
  if (quantityIssues.length > 0 && action === "publish") {
    action = "flag_for_review";
  }

  return {
    isValid: action !== "reject",
    score,
    action,
    issues: allIssues,
    suggestions,
  };
}
