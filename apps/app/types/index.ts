import { Prisma } from "@prisma/client";

export type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true };
}>;

export type CourseWithModules = Prisma.CourseGetPayload<{
  include: { modules: true; category: true };
}>;

export type ModuleWithProgress = Prisma.ModuleGetPayload<{
  include: { progress: true };
}>;

export type UserBadgeWithBadge = Prisma.UserBadgeGetPayload<{
  include: { badge: true };
}>;

export type AiChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// ──────────────────────────────────────────────
// Course Quality System Types
// ──────────────────────────────────────────────

export type SlideType =
  | "lesson"
  | "example"
  | "casestudy"
  | "challenge"
  | "quiz"
  | "summary";

export type ChallengeInputType = "code" | "text" | "math" | "essay";

export interface ChallengeData {
  instruction: string;
  inputType: ChallengeInputType;
  inputPlaceholder: string;
  starterCode?: string;
  expectedConcepts: string[];
  evaluationCriteria: string;
  hints: string[];
  /** TIDAK BOLEH dikirim ke client */
  sampleAnswer: string;
  followUpQuestion: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface SlideContent {
  slideNumber: number;
  type: SlideType;
  title: string;
  content: string;
  codeExample?: string;
  visualHint?: string;
  keyTakeaway?: string;
  /** Hanya jika type === "challenge" */
  challenge?: ChallengeData;
  /** Hanya jika type === "quiz" */
  quiz?: {
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit: number;
  };
}

export interface ModuleContent {
  slides: SlideContent[];
  quizBank: QuizQuestion[];
}

export interface QualityGateResult {
  isValid: boolean;
  score: number;
  action: "publish" | "flag_for_review" | "reject";
  issues: string[];
  suggestions: string[];
}

export interface CourseGenerateRequest {
  topic: string;
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
  targetModules: number;
  visibility: "PUBLIC" | "PRIVATE";
}

export interface CourseGenerateResponse {
  success: boolean;
  courseSlug?: string;
  qualityScore?: number;
  status?: "published" | "pending_review";
  message: string;
}

export interface ChallengeEvaluationResponse {
  isCorrect: boolean;
  score: number;
  feedback: string;
  whatIsGood: string;
  whatNeedsImprovement: string;
  hint: string | null;
  xpEarned: number | null;
}

/** Struktur modul mentah dari output AI generate */
export interface AiGeneratedModule {
  title: string;
  slug: string;
  order: number;
  slides: SlideContent[];
  quizBank: QuizQuestion[];
}

/** Struktur course mentah dari output AI generate */
export interface AiGeneratedCourse {
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  modules: AiGeneratedModule[];
}
