"use client";

import React, { useState, use } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Star,
  MessageSquare,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AIChatFAB } from "@/components/ai/ai-chat-fab";

import useSWR from "swr";
import { useUserProgress } from "@/hooks/use-user-progress";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Tooltip = { token: string; explanation: string; sourceUrl?: string };

// Code block with hover tooltips
function CodeBlockWithTooltips({
  code,
  language,
  tooltips,
}: {
  code: string;
  language: string;
  tooltips?: Tooltip[];
}) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  if (!tooltips || tooltips.length === 0) {
    return (
      <pre className="rounded-xl bg-[#0d1117] border border-white/10 p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="text-[#e6edf3] font-mono">{code}</code>
      </pre>
    );
  }

  // Split code into parts, highlighting tokens with tooltips
  const renderCode = () => {
    const lines = code.split("\n");
    return lines.map((line, lineIdx) => {
      let parts: React.ReactNode[] = [];
      let remaining = line;
      let partKey = 0;

      // Sort tooltips by position in line (longest match first to avoid partial matches)
      const sortedTooltips = [...tooltips].sort(
        (a, b) => b.token.length - a.token.length,
      );

      while (remaining.length > 0) {
        let earliestMatch: { index: number; tooltip: Tooltip } | null = null;

        for (const tooltip of sortedTooltips) {
          const idx = remaining.indexOf(tooltip.token);
          if (
            idx !== -1 &&
            (earliestMatch === null || idx < earliestMatch.index)
          ) {
            earliestMatch = { index: idx, tooltip };
          }
        }

        if (earliestMatch) {
          // Text before the match
          if (earliestMatch.index > 0) {
            parts.push(
              <span key={`${lineIdx}-${partKey++}`} className="text-[#e6edf3]">
                {remaining.slice(0, earliestMatch.index)}
              </span>,
            );
          }

          // The matched token (interactive)
          const token = earliestMatch.tooltip.token;
          const explanation = earliestMatch.tooltip.explanation;
          parts.push(
            <span
              key={`${lineIdx}-${partKey++}`}
              className={`relative inline-block cursor-pointer border-b-2 border-dashed border-sky/50 transition-colors ${activeTooltip === `${lineIdx}-${token}` ? "bg-sky/20 text-white border-sky" : "text-sky hover:text-white hover:bg-sky/10"}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTooltip(
                  activeTooltip === `${lineIdx}-${token}`
                    ? null
                    : `${lineIdx}-${token}`,
                );
              }}
            >
              {token}
            </span>,
          );

          remaining = remaining.slice(earliestMatch.index + token.length);
        } else {
          parts.push(
            <span key={`${lineIdx}-${partKey++}`} className="text-[#e6edf3]">
              {remaining}
            </span>,
          );
          remaining = "";
        }
      }

      return (
        <div key={lineIdx} className="flex">
          <span className="select-none w-8 text-right pr-4 text-[#484f58] text-xs leading-relaxed shrink-0">
            {lineIdx + 1}
          </span>
          <span className="font-mono">{parts}</span>
        </div>
      );
    });
  };

  return (
    <div className="rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
        <span className="text-xs text-[#484f58] font-medium uppercase">
          {language}
        </span>
        <span className="text-[10px] text-sky/60">
          klik token → lihat penjelasan
        </span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{renderCode()}</code>
      </pre>

      {/* Explanation Bubble Outside */}
      {activeTooltip &&
        (() => {
          const [activeLineIdx, activeToken] = activeTooltip.split("-", 2);
          const tooltipData = tooltips.find((t) => t.token === activeToken);
          if (!tooltipData) return null;

          return (
            <div className="border-t border-white/10 bg-[#161b22] p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded bg-sky/20 text-sky font-mono text-xs font-bold mb-2">
                    {tooltipData.token}
                  </span>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    {tooltipData.explanation}
                  </p>
                  {tooltipData.sourceUrl && (
                    <a
                      href={tooltipData.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-sky hover:text-white hover:underline transition-colors"
                    >
                      Baca dokumentasi lengkap &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}

// Source badge
function SourceBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    DOCUMENTATION: "bg-core-blue/10 text-core-blue",
    ARTICLE: "bg-success/10 text-success",
    YOUTUBE: "bg-error/10 text-error",
    BOOK: "bg-spark/10 text-spark",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors[type] || "bg-muted/10 text-muted"}`}
    >
      {type === "YOUTUBE"
        ? "YouTube"
        : type.charAt(0) + type.slice(1).toLowerCase()}
    </span>
  );
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [showChat, setShowChat] = useState(false);

  // State for mocked quiz
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // New Quiz Modal state
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Challenge state
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [isGradingChallenge, setIsGradingChallenge] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState<any>(null);
  const [challengeAttempts, setChallengeAttempts] = useState<number>(0);
  const [showChallengeAnswer, setShowChallengeAnswer] =
    useState<boolean>(false);

  // New Challenge dynamic state
  const [isGeneratingChallenge, setIsGeneratingChallenge] = useState(false);
  const [challengeData, setChallengeData] = useState<any>(null);
  const [showChallengeHint, setShowChallengeHint] = useState(0);

  // Rating state
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState<boolean>(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState<boolean>(false);

  const { data: courseData, isLoading: isCourseLoading } = useSWR(
    `/api/courses/${slug}`,
    fetcher,
  );
  const { markComplete, progress } = useUserProgress(courseData?.id || "");
  const [isMarking, setIsMarking] = useState(false);

  // Derive completed modules from progress data directly if available, otherwise from courseData (initial state)
  const completedModules =
    progress?.completedModules || courseData?.userProgress || [];

  const activeModule = courseData?.modules?.[activeModuleIdx];
  const isFreeCourse = courseData ? !courseData.isPremium : false;
  const slides = (activeModule?.slides || []).filter((s: any) => {
    if (isFreeCourse && s.content?.type === "challenge") return false;
    return true;
  });
  const activeSlide = slides[activeSlideIdx];
  const totalSlides = slides.length;

  if (isCourseLoading) {
    return (
      <div className="min-h-screen bg-canvas dark:bg-void text-body dark:text-white/70 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-core-blue" />
      </div>
    );
  }

  if (!courseData || courseData.error) {
    return (
      <div className="min-h-screen bg-canvas dark:bg-void text-body dark:text-white/70 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-muted-soft mx-auto mb-4" />
          <h2 className="text-xl font-bold text-ink dark:text-white mb-2">
            Kursus tidak ditemukan
          </h2>
          <Link href="/explore" className="text-core-blue hover:underline">
            Kembali ke Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas dark:bg-void text-body dark:text-white/70 flex">
      {/* Sidebar — Module List */}
      <aside className="hidden lg:flex w-[300px] shrink-0 border-r border-hairline bg-canvas dark:bg-void flex-col h-screen sticky top-0">
        {/* Course header */}
        <div className="p-5 border-b border-hairline">
          <Link
            href="/explore"
            className="text-sm text-muted hover:text-core-blue transition-colors mb-3 block"
          >
            ← Kembali
          </Link>
          <h2 className="text-lg font-bold font-heading text-ink dark:text-white leading-tight">
            {courseData.title}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-spark text-sm">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="font-medium">{courseData.rating}</span>
            </div>
            <span className="text-xs text-muted">
              ({courseData.ratingCount} rating)
            </span>
          </div>
        </div>

        {/* Module list */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {courseData.modules?.map((mod: any, idx: number) => {
            const isCompleted = completedModules.includes(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModuleIdx(idx);
                  setActiveSlideIdx(0);
                  setSelectedAnswer(null);
                  setIsQuizSubmitted(false);
                }}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-all ${
                  idx === activeModuleIdx
                    ? "bg-core-blue/10 text-core-blue dark:text-sky font-medium"
                    : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-muted-soft" />
                )}
                <div>
                  <div className="leading-tight">{mod.title}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {mod.slides?.length || 0} slide
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content — Slide Viewer */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 md:px-6 border-b border-hairline bg-canvas/80 dark:bg-void/80 backdrop-blur-md">
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/explore"
              className="lg:hidden flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-muted hover:text-ink dark:hover:text-white transition-colors" />
            </Link>
            <div className="text-sm font-medium text-ink dark:text-white truncate">
              {activeModule?.title}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted">
              Slide {activeSlideIdx + 1} / {totalSlides || 1}
            </span>
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 flex">
          <div
            className={`flex-1 transition-all duration-300 ${showChat ? "lg:mr-[360px]" : ""}`}
          >
            {activeSlide ? (
              <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
                {/* Slide Title */}
                <h1 className="text-3xl font-black font-heading text-ink dark:text-white">
                  {activeSlide.title}
                </h1>

                {/* Slide Body */}
                {(activeSlide.content.type === "text" ||
                  activeSlide.content.type === "markdown") &&
                  activeSlide.content.body && (
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-core-blue hover:prose-a:text-core-blue/80 prose-img:rounded-xl">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {activeSlide.content.body}
                      </ReactMarkdown>
                    </div>
                  )}

                {activeSlide.content.type === "code" &&
                  activeSlide.content.body && (
                    <div className="space-y-6">
                      {activeSlide.content.explanation && (
                        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-core-blue hover:prose-a:text-core-blue/80 prose-img:rounded-xl">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {activeSlide.content.explanation}
                          </ReactMarkdown>
                        </div>
                      )}
                      <CodeBlockWithTooltips
                        code={activeSlide.content.body}
                        language={activeSlide.content.language || "javascript"}
                        tooltips={activeSlide.content.tooltips}
                      />
                    </div>
                  )}

                {/* Quiz Content Placeholder */}
                {activeSlide.content.type === "quiz" && (
                  <div className="space-y-6">
                    <div className="bg-sky/5 dark:bg-sky/10 border border-sky/20 rounded-xl p-6 md:p-8 text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky/20 text-sky mb-4">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-ink dark:text-white mb-2 text-xl">
                        Validasi Pemahaman
                      </h3>
                      <p className="text-body dark:text-white/70 mb-6 max-w-md mx-auto">
                        Uji pemahamanmu tentang materi di modul ini dengan
                        menjawab pertanyaan kuis yang di-generate oleh AI secara
                        khusus untukmu.
                      </p>
                      <button
                        onClick={async () => {
                          setShowQuizModal(true);
                          setIsGeneratingQuiz(true);
                          setQuizData([]);
                          setQuizAnswers([]);
                          setShowQuizResult(false);
                          try {
                            const res = await fetch("/api/ai/generate-quiz", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                moduleId: activeModule.id,
                              }),
                            });
                            const data = await res.json();
                            if (data.questions) setQuizData(data.questions);
                          } catch (e) {
                            toast.error("Gagal memuat kuis.");
                          } finally {
                            setIsGeneratingQuiz(false);
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-sky px-8 py-3 text-sm font-bold text-white hover:bg-sky/90 transition-colors shadow-sm"
                      >
                        Mulai Kuis
                      </button>
                    </div>
                  </div>
                )}

                {/* Challenge Content */}
                {activeSlide.content.type === "challenge" && (
                  <div className="space-y-6">
                    <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">
                          ✨
                        </span>
                        <span className="text-sm font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                          Tantangan AI
                        </span>
                      </div>

                      {!challengeData && !isGeneratingChallenge && (
                        <div className="text-center py-8">
                          <p className="text-body dark:text-white/70 mb-6">
                            Tantangan untuk modul ini siap di-generate secara
                            khusus untukmu oleh AI.
                          </p>
                          <button
                            onClick={async () => {
                              setIsGeneratingChallenge(true);
                              setChallengeAnswer("");
                              setChallengeFeedback(null);
                              setChallengeAttempts(0);
                              setShowChallengeHint(0);
                              try {
                                const res = await fetch(
                                  "/api/ai/generate-challenge-spec",
                                  {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      moduleId: activeModule.id,
                                    }),
                                  },
                                );
                                const data = await res.json();
                                if (!res.ok || !data.challenge) {
                                  throw new Error(
                                    "Gagal memuat format tantangan dari server",
                                  );
                                }
                                setChallengeData(data);
                                if (data?.challenge?.starterCode) {
                                  setChallengeAnswer(
                                    data.challenge.starterCode,
                                  );
                                }
                              } catch (e) {
                                toast.error("Gagal memuat tantangan.");
                              } finally {
                                setIsGeneratingChallenge(false);
                              }
                            }}
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-sm font-bold text-white hover:bg-emerald-600 transition-colors shadow-sm"
                          >
                            Generate Tantangan
                          </button>
                        </div>
                      )}

                      {isGeneratingChallenge && (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-4" />
                          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
                            Menyiapkan tantangan khusus...
                          </p>
                        </div>
                      )}

                      {challengeData && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                          <div className="prose prose-sm dark:prose-invert max-w-none bg-canvas dark:bg-void-elevated p-4 rounded-xl border border-hairline">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {challengeData.content || ""}
                            </ReactMarkdown>
                          </div>

                          <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                            <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                              Instruksi:
                            </h4>
                            <p className="text-sm text-emerald-900 dark:text-emerald-100">
                              {challengeData.challenge?.instruction || ""}
                            </p>
                          </div>

                          <div className="space-y-4">
                            <textarea
                              value={challengeAnswer}
                              onChange={(e) =>
                                setChallengeAnswer(e.target.value)
                              }
                              placeholder={
                                challengeData.challenge.inputPlaceholder ||
                                "Ketik jawaban kamu di sini..."
                              }
                              className={`w-full h-48 rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-4 text-sm text-ink dark:text-white placeholder:text-muted-soft focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none transition-all ${challengeData.challenge.inputType === "code" ? "font-mono" : ""}`}
                              disabled={
                                isGradingChallenge ||
                                challengeFeedback?.isCorrect
                              }
                            />

                            <div className="flex items-center justify-between">
                              {challengeData.challenge.hints &&
                              challengeData.challenge.hints.length > 0 &&
                              !challengeFeedback?.isCorrect ? (
                                <button
                                  onClick={() =>
                                    setShowChallengeHint(
                                      Math.min(
                                        showChallengeHint + 1,
                                        challengeData.challenge.hints.length,
                                      ),
                                    )
                                  }
                                  disabled={
                                    showChallengeHint >=
                                    challengeData.challenge.hints.length
                                  }
                                  className="text-xs font-bold text-amber-500 hover:text-amber-600 disabled:opacity-50 transition-colors"
                                >
                                  💡 Butuh Bantuan? ({showChallengeHint}/
                                  {challengeData.challenge.hints.length})
                                </button>
                              ) : (
                                <div />
                              )}

                              {!challengeFeedback?.isCorrect && (
                                <button
                                  onClick={async () => {
                                    if (!challengeAnswer.trim()) return;
                                    setIsGradingChallenge(true);
                                    setChallengeFeedback(null);
                                    try {
                                      const res = await fetch(
                                        "/api/ai/grade-challenge",
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            courseName: courseData.title,
                                            instruction:
                                              challengeData.challenge
                                                ?.instruction || "",
                                            expectedConcepts:
                                              challengeData.challenge
                                                .expectedConcepts || [],
                                            evaluationCriteria:
                                              challengeData.challenge
                                                .evaluationCriteria || "",
                                            answer: challengeAnswer,
                                            courseId: courseData.id,
                                            moduleId: activeModule.id,
                                          }),
                                        },
                                      );
                                      const data = await res.json();
                                      setChallengeFeedback(data);
                                      if (data.isCorrect) {
                                        // Auto-mark module complete logic could go here if needed
                                      } else {
                                        setChallengeAttempts(
                                          (prev) => prev + 1,
                                        );
                                      }
                                    } catch (e) {
                                      toast.error("Gagal memvalidasi jawaban.");
                                    } finally {
                                      setIsGradingChallenge(false);
                                    }
                                  }}
                                  disabled={
                                    !challengeAnswer.trim() ||
                                    isGradingChallenge
                                  }
                                  className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                  {isGradingChallenge ? (
                                    <>
                                      <Loader2 className="h-4 w-4 animate-spin" />{" "}
                                      Memeriksa...
                                    </>
                                  ) : (
                                    "Cek Jawaban"
                                  )}
                                </button>
                              )}
                            </div>

                            {showChallengeHint > 0 && (
                              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-sm text-amber-900 dark:text-amber-200">
                                <ul className="list-disc list-inside space-y-1">
                                  {challengeData.challenge.hints
                                    .slice(0, showChallengeHint)
                                    .map((hint: string, i: number) => (
                                      <li key={i}>{hint}</li>
                                    ))}
                                </ul>
                              </div>
                            )}

                            {challengeFeedback && (
                              <div
                                className={`p-4 md:p-6 rounded-xl border ${challengeFeedback.isCorrect ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${challengeFeedback.isCorrect ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
                                  >
                                    {challengeFeedback.isCorrect ? (
                                      <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                      <span className="font-bold text-lg">
                                        ⚠️
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <h4
                                      className={`font-bold ${challengeFeedback.isCorrect ? "text-emerald-900 dark:text-emerald-100" : "text-red-900 dark:text-red-100"}`}
                                    >
                                      {challengeFeedback.isCorrect
                                        ? "Luar Biasa!"
                                        : "Belum Tepat, Coba Lagi!"}
                                    </h4>
                                    <div
                                      className={`text-sm font-bold ${challengeFeedback.isCorrect ? "text-emerald-600" : "text-red-600"}`}
                                    >
                                      Score: {challengeFeedback.score}/100
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="prose prose-sm dark:prose-invert max-w-none text-sm opacity-90">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {challengeFeedback.feedback}
                                    </ReactMarkdown>
                                  </div>

                                  {challengeFeedback.whatIsGood && (
                                    <div className="bg-canvas dark:bg-void-elevated p-3 rounded-lg border border-hairline">
                                      <p className="text-xs font-bold text-emerald-500 mb-1 uppercase tracking-wider">
                                        👍 Yang Sudah Bagus:
                                      </p>
                                      <p className="text-sm text-body dark:text-white/80">
                                        {challengeFeedback.whatIsGood}
                                      </p>
                                    </div>
                                  )}

                                  {challengeFeedback.whatNeedsImprovement && (
                                    <div className="bg-canvas dark:bg-void-elevated p-3 rounded-lg border border-hairline">
                                      <p className="text-xs font-bold text-red-500 mb-1 uppercase tracking-wider">
                                        🔧 Perlu Diperbaiki:
                                      </p>
                                      <p className="text-sm text-body dark:text-white/80">
                                        {challengeFeedback.whatNeedsImprovement}
                                      </p>
                                    </div>
                                  )}

                                  {challengeFeedback.hint &&
                                    !challengeFeedback.isCorrect && (
                                      <div className="bg-sky/10 border border-sky/20 p-3 rounded-lg">
                                        <p className="text-xs font-bold text-sky mb-1 uppercase tracking-wider">
                                          💡 Petunjuk:
                                        </p>
                                        <p className="text-sm text-sky">
                                          {challengeFeedback.hint}
                                        </p>
                                      </div>
                                    )}

                                  {!challengeFeedback.isCorrect &&
                                    challengeAttempts >= 2 &&
                                    challengeData.challenge.sampleAnswer && (
                                      <div className="mt-4 pt-4 border-t border-red-500/20">
                                        {!showChallengeAnswer ? (
                                          <button
                                            onClick={() =>
                                              setShowChallengeAnswer(true)
                                            }
                                            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                            Lihat Contoh Jawaban
                                          </button>
                                        ) : (
                                          <div className="bg-canvas dark:bg-void-elevated p-4 rounded-lg border border-hairline mt-2 animate-in fade-in duration-300">
                                            <p className="text-xs font-bold text-muted-soft mb-2 uppercase tracking-wider">
                                              Referensi Jawaban:
                                            </p>
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                              <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                              >
                                                {
                                                  challengeData.challenge
                                                    .sampleAnswer
                                                }
                                              </ReactMarkdown>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sources */}
                {activeSlide.sources && activeSlide.sources.length > 0 && (
                  <div className="border-t border-hairline pt-6 space-y-3">
                    <h3 className="text-sm font-bold text-ink dark:text-white">
                      Sumber Referensi
                    </h3>
                    <div className="space-y-2">
                      {activeSlide.sources.map(
                        (
                          src: { type: string; title: string; url: string },
                          i: number,
                        ) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-lg border border-hairline bg-surface-soft dark:bg-void-elevated p-3 hover:border-core-blue/30 transition-colors group"
                          >
                            <SourceBadge type={src.type} />
                            <span className="text-sm text-body dark:text-white/70 group-hover:text-core-blue dark:group-hover:text-sky transition-colors truncate">
                              {src.title}
                            </span>
                          </a>
                        ),
                      )}

                      {/* YouTube Embed */}
                      {activeSlide.sources
                        .filter((s: { type: string }) => s.type === "YOUTUBE")
                        .map(
                          (src: { url: string; title: string }, i: number) => {
                            let embedUrl = "";
                            const videoId = src.url.match(
                              /(?:v=|youtu\.be\/|embed\/)([^&?]+)/,
                            )?.[1];
                            const listId =
                              src.url.match(/[?&]list=([^&]+)/)?.[1];

                            if (videoId && listId) {
                              embedUrl = `https://www.youtube.com/embed/${videoId}?list=${listId}`;
                            } else if (listId) {
                              embedUrl = `https://www.youtube.com/embed/videoseries?list=${listId}`;
                            } else if (videoId) {
                              embedUrl = `https://www.youtube.com/embed/${videoId}`;
                            } else {
                              return null;
                            }

                            return (
                              <div
                                key={`yt-${i}`}
                                className="mt-4 rounded-xl overflow-hidden border border-hairline aspect-video"
                              >
                                <iframe
                                  src={embedUrl}
                                  title={src.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full h-full"
                                />
                              </div>
                            );
                          },
                        )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-muted-soft mx-auto mb-4" />
                  <p className="text-muted">
                    Modul ini belum memiliki konten slide.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* AI Chat Panel */}
          {showChat && (
            <div className="hidden lg:flex fixed top-14 right-0 bottom-0 w-[360px] border-l border-hairline bg-canvas dark:bg-void flex-col z-10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline">
                <MessageSquare className="h-4 w-4 text-core-blue" />
                <span className="text-sm font-bold text-ink dark:text-white">
                  Clarise AI Tutor
                </span>
                <span className="ml-auto text-[10px] text-muted bg-surface-soft dark:bg-void-elevated px-2 py-0.5 rounded-full">
                  Konteks: {activeModule?.title}
                </span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div className="bg-surface-soft dark:bg-void-elevated rounded-xl rounded-tl-none p-4 text-sm text-body dark:text-white/70 border border-hairline">
                  Hai! 👋 Saya AI Tutor untuk modul{" "}
                  <strong>"{activeModule?.title}"</strong>. Ada yang ingin kamu
                  tanyakan tentang materi ini?
                </div>
              </div>
              <div className="p-4 border-t border-hairline">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tanya sesuatu tentang materi ini..."
                    className="flex-1 h-10 rounded-lg border border-hairline bg-surface-soft dark:bg-void-elevated px-4 text-sm text-ink dark:text-white placeholder:text-muted-soft focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
                  />
                  <button className="h-10 w-10 rounded-full bg-core-blue text-white flex items-center justify-center hover:bg-core-blue/90 transition-colors shrink-0 shadow-sm">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-soft mt-2 text-center">
                  AI hanya menjawab seputar materi kursus ini.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="sticky bottom-0 flex items-center justify-between h-16 px-6 border-t border-hairline bg-canvas/80 dark:bg-void/80 backdrop-blur-md">
          <button
            onClick={() => {
              setActiveSlideIdx(Math.max(0, activeSlideIdx - 1));
              setChallengeAnswer("");
              setChallengeFeedback(null);
              setChallengeAttempts(0);
              setShowChallengeAnswer(false);
            }}
            disabled={activeSlideIdx === 0}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          {/* Slide dots */}
          <div className="flex gap-1.5">
            {slides.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveSlideIdx(idx);
                  setChallengeAnswer("");
                  setChallengeFeedback(null);
                  setChallengeAttempts(0);
                  setShowChallengeAnswer(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeSlideIdx
                    ? "w-6 bg-core-blue"
                    : "w-2 bg-muted-soft/50 hover:bg-muted"
                }`}
              />
            ))}
          </div>
          {activeSlideIdx < totalSlides - 1 ? (
            <button
              onClick={() => {
                setActiveSlideIdx(activeSlideIdx + 1);
                setChallengeAnswer("");
                setChallengeFeedback(null);
                setChallengeAttempts(0);
                setShowChallengeAnswer(false);
              }}
              className="flex items-center gap-2 rounded-full bg-core-blue px-4 py-2 text-sm font-bold text-white hover:bg-core-blue/90 transition-colors shadow-sm"
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : activeSlide?.content?.type === "quiz" ? (
            <button
              onClick={() => setShowQuizModal(true)}
              className="flex items-center gap-2 rounded-full bg-sky px-6 py-2 text-sm font-bold text-white hover:bg-sky/90 transition-colors shadow-sm"
            >
              Buka Kuis
            </button>
          ) : activeSlide?.content?.type === "challenge" &&
            !challengeFeedback?.isCorrect ? (
            <button
              disabled
              className="flex items-center gap-2 rounded-full bg-muted-soft px-6 py-2.5 text-sm font-bold text-muted cursor-not-allowed"
            >
              <CheckCircle2 className="h-4 w-4" />
              Selesaikan Tantangan
            </button>
          ) : progress?.completedModules?.includes(activeModule?.id) ? (
            <button
              disabled
              className="flex items-center gap-2 rounded-full bg-muted-soft px-6 py-2.5 text-sm font-bold text-muted cursor-not-allowed"
            >
              <CheckCircle2 className="h-4 w-4" />
              Selesai
            </button>
          ) : (
            <button
              className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-bold text-white transition-colors shadow-sm ${
                activeSlide?.content?.type === "quiz" &&
                isQuizSubmitted &&
                selectedAnswer !==
                  activeSlide?.content?.questions?.[0]?.correctAnswer
                  ? "bg-red-500 hover:bg-red-600" // Jika salah, tombol jadi error
                  : "bg-emerald-500 hover:bg-emerald-600" // Jika benar atau bukan kuis, tombol success
              } ${isMarking ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isMarking}
              onClick={async () => {
                if (
                  activeSlide?.content?.type === "quiz" &&
                  isQuizSubmitted &&
                  selectedAnswer !==
                    activeSlide?.content?.questions?.[0]?.correctAnswer
                ) {
                  // Reset quiz if wrong
                  setIsQuizSubmitted(false);
                  setSelectedAnswer(null);
                } else {
                  try {
                    setIsMarking(true);
                    await markComplete(activeModule.id);
                    setShowSuccessModal(true);
                  } catch (e) {
                    toast.error("Gagal menyimpan progres.");
                  } finally {
                    setIsMarking(false);
                  }
                }
              }}
            >
              {activeSlide?.content?.type === "quiz" &&
              isQuizSubmitted &&
              selectedAnswer !==
                activeSlide?.content?.questions?.[0]?.correctAnswer ? (
                <>Coba Lagi</>
              ) : isMarking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Tandai Selesai
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0C1F3D]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative bg-white dark:bg-void-elevated rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_24px_60px_rgba(12,31,61,0.2)] animate-in zoom-in-95 fade-in duration-300 ease-out">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">
              Luar Biasa!
            </h3>
            <p className="text-body dark:text-white/70 mb-6 text-sm">
              Kamu telah berhasil menyelesaikan modul{" "}
              <strong>{activeModule?.title}</strong>. Lanjutkan progres
              belajarmu untuk meraih badge!
            </p>

            <div className="mb-8">
              {!isRatingSubmitted ? (
                <>
                  <p className="text-sm font-bold text-ink dark:text-white mb-3">
                    Seberapa bermanfaat materi ini?
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        disabled={isSubmittingRating}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={async () => {
                          setRating(star);
                          setIsSubmittingRating(true);
                          try {
                            await fetch("/api/progress/rate", {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                moduleId: activeModule?.id,
                                rating: star,
                              }),
                            });
                            setIsRatingSubmitted(true);
                          } catch (error) {
                            console.error("Failed to submit rating", error);
                          } finally {
                            setIsSubmittingRating(false);
                          }
                        }}
                        className={`transition-all ${isSubmittingRating ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
                      >
                        <Star
                          className={`h-8 w-8 ${
                            (hoverRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-transparent text-muted-soft dark:text-white/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 animate-in zoom-in duration-300">
                  <span className="text-2xl mb-2">⭐</span>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    Terima kasih atas penilaianmu!
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <button
                disabled={!isRatingSubmitted}
                onClick={() => {
                  setShowSuccessModal(false);
                  setRating(0);
                  setIsRatingSubmitted(false);
                  // Lanjut ke modul berikutnya jika ada
                  if (
                    activeModuleIdx <
                    (courseData?.modules?.length || 0) - 1
                  ) {
                    setActiveModuleIdx(activeModuleIdx + 1);
                    setActiveSlideIdx(0);
                    setSelectedAnswer(null);
                    setIsQuizSubmitted(false);
                    setChallengeAnswer("");
                    setChallengeFeedback(null);
                    setChallengeAttempts(0);
                    setShowChallengeAnswer(false);
                  }
                }}
                className={`flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all ${
                  isRatingSubmitted
                    ? "bg-core-blue hover:bg-core-blue/90 hover:shadow-[0_4px_14px_0_rgba(26,127,204,0.39)] hover:-translate-y-0.5"
                    : "bg-muted-soft cursor-not-allowed"
                }`}
              >
                Lanjut Modul Berikutnya
              </button>
              <Link
                href="/explore"
                className="btn-outline w-full justify-center"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Fullscreen Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-[200] bg-canvas dark:bg-void flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between px-6 h-16 border-b border-hairline bg-surface-soft dark:bg-void-elevated shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky text-white font-bold text-sm">
                Q
              </span>
              <span className="font-bold text-ink dark:text-white truncate max-w-[200px] md:max-w-none">
                Ujian: {activeModule?.title}
              </span>
            </div>
            {!showQuizResult && (
              <button
                onClick={() => {
                  toast("Yakin ingin keluar?", {
                    description:
                      "Progres kuis akan hilang dan soal akan diacak ulang saat kamu kembali.",
                    action: {
                      label: "Keluar",
                      onClick: () => setShowQuizModal(false),
                    },
                    cancel: {
                      label: "Batal",
                      onClick: () => {},
                    },
                  });
                }}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Keluar Ujian
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-12">
            <div className="max-w-3xl mx-auto">
              {isGeneratingQuiz ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-sky mb-6" />
                  <h3 className="text-2xl font-bold text-ink dark:text-white mb-2">
                    Meracik Soal...
                  </h3>
                  <p className="text-muted">
                    AI sedang membuatkan soal kuis khusus untukmu agar tidak
                    bisa curang.
                  </p>
                </div>
              ) : showQuizResult ? (
                <div className="text-center py-10">
                  <div
                    className={`inline-flex h-24 w-24 items-center justify-center rounded-full mb-6 ${quizScore >= 80 ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"}`}
                  >
                    <Trophy className="h-12 w-12" />
                  </div>
                  <h3 className="text-3xl font-bold text-ink dark:text-white mb-2">
                    Skor Kuis: {quizScore} / 100
                  </h3>
                  <p className="text-body dark:text-white/70 mb-8">
                    {quizScore >= 80
                      ? "Luar biasa! Kamu sudah sangat memahami materi ini."
                      : "Jangan menyerah! Pelajari lagi materinya dan coba lagi."}
                  </p>
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    {quizScore < 100 && (
                      <button
                        onClick={async () => {
                          setIsGeneratingQuiz(true);
                          setQuizData([]);
                          setQuizAnswers([]);
                          setShowQuizResult(false);
                          try {
                            const res = await fetch("/api/ai/generate-quiz", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                moduleId: activeModule.id,
                              }),
                            });
                            const data = await res.json();
                            if (data.questions) setQuizData(data.questions);
                          } catch (e) {
                            toast.error("Gagal memuat kuis.");
                          } finally {
                            setIsGeneratingQuiz(false);
                          }
                        }}
                        className="btn-outline"
                      >
                        Coba Lagi (Soal Baru)
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        setShowQuizModal(false);
                        if (quizScore >= 80) {
                          try {
                            setIsMarking(true);
                            await markComplete(activeModule.id);
                            setShowSuccessModal(true);
                          } catch (e) {
                          } finally {
                            setIsMarking(false);
                          }
                        }
                      }}
                      className="rounded-full bg-core-blue px-8 py-3 text-sm font-bold text-white hover:bg-core-blue/90"
                    >
                      {quizScore >= 80
                        ? "Selesai & Lanjut"
                        : "Kembali ke Materi"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {quizData.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="bg-canvas dark:bg-void-elevated rounded-xl border border-hairline p-5 md:p-8 shadow-sm"
                    >
                      <div className="flex items-start gap-3 mb-6">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-surface-soft dark:bg-white/5 text-sm font-bold text-muted mt-1">
                          {qIdx + 1}
                        </span>
                        <h3 className="font-bold text-ink dark:text-white text-base md:text-lg leading-relaxed flex-1">
                          {q.question}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {q.options.map((opt: string, oIdx: number) => {
                          const isSelected = quizAnswers[qIdx] === oIdx;
                          return (
                            <label
                              key={oIdx}
                              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? "border-sky bg-sky/5 shadow-[0_0_0_2px_rgba(14,165,233,0.2)]" : "border-hairline hover:border-sky/40"}`}
                            >
                              <div className="pt-0.5">
                                <input
                                  type="radio"
                                  name={`quiz-${qIdx}`}
                                  className="w-5 h-5 text-sky cursor-pointer"
                                  checked={isSelected}
                                  onChange={() => {
                                    const newAns = [...quizAnswers];
                                    newAns[qIdx] = oIdx;
                                    setQuizAnswers(newAns);
                                  }}
                                />
                              </div>
                              <span className="text-body dark:text-white/80 font-medium leading-relaxed">
                                {opt}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-hairline flex justify-end">
                    <button
                      disabled={
                        quizAnswers.filter((a) => a !== undefined).length <
                          quizData.length || quizData.length === 0
                      }
                      onClick={() => {
                        let correctCount = 0;
                        quizData.forEach((q, idx) => {
                          if (quizAnswers[idx] === q.correctAnswer)
                            correctCount++;
                        });
                        setQuizScore(
                          Math.round((correctCount / quizData.length) * 100),
                        );
                        setShowQuizResult(true);
                      }}
                      className="rounded-full bg-sky px-10 py-4 text-base font-bold text-white hover:bg-sky/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md w-full md:w-auto"
                    >
                      Kumpulkan Jawaban
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hide Chat FAB if modal is open */}
      {!showQuizModal && <AIChatFAB />}
    </div>
  );
}
