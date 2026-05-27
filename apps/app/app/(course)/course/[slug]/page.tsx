"use client";

import React, { useState, use } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, BookOpen, Star, MessageSquare, Trophy } from "lucide-react";
import Link from "next/link";
import { AIChatFAB } from "@/components/ai/ai-chat-fab";

// Placeholder course data — will be replaced with real API
const courseData = {
  title: "JavaScript Dasar",
  slug: "javascript-dasar",
  description: "Pelajari dasar-dasar bahasa pemrograman paling populer di dunia.",
  difficulty: "BEGINNER",
  rating: 4.8,
  ratingCount: 24,
  modules: [
    {
      id: "m1",
      title: "Pengenalan JavaScript",
      slug: "pengenalan-javascript",
      order: 0,
      completed: false,
      slides: [
        {
          id: "s1",
          order: 0,
          title: "Apa itu JavaScript?",
          content: {
            type: "text",
            body: "JavaScript adalah bahasa pemrograman yang digunakan untuk membuat halaman web menjadi interaktif. Awalnya dibuat oleh Brendan Eich di Netscape pada tahun 1995, JavaScript kini menjadi salah satu bahasa pemrograman paling populer di dunia.\n\nJavaScript berjalan di browser (client-side) dan juga di server (melalui Node.js). Ini menjadikannya bahasa yang sangat versatile — kamu bisa membangun website, aplikasi mobile, API server, bahkan game menggunakannya.",
          },
          sources: [
            { type: "DOCUMENTATION", title: "MDN Web Docs — JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
            { type: "YOUTUBE", title: "JavaScript Crash Course - Traversy Media", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c" },
          ],
        },
        {
          id: "s2",
          order: 1,
          title: "Variabel dan Tipe Data",
          content: {
            type: "code",
            language: "javascript",
            body: "// Deklarasi variabel\nlet nama = \"Clarise\";\nconst umur = 25;\nvar aktif = true;\n\n// Tipe data dasar\nconsole.log(typeof nama);   // \"string\"\nconsole.log(typeof umur);   // \"number\"\nconsole.log(typeof aktif);  // \"boolean\"",
            tooltips: [
              { token: "let", explanation: "Keyword untuk mendeklarasikan variabel yang nilainya bisa diubah (mutable). Diperkenalkan di ES6.", sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
              { token: "const", explanation: "Keyword untuk mendeklarasikan variabel konstan yang nilainya tidak bisa diubah setelah ditetapkan.", sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" },
              { token: "var", explanation: "Cara lama mendeklarasikan variabel. Sebaiknya hindari karena scope-nya bersifat function-level, bukan block-level." },
              { token: "typeof", explanation: "Operator unary yang mengembalikan string yang menunjukkan tipe data dari operand-nya." },
              { token: "console.log", explanation: "Method untuk mencetak output ke konsol browser. Sangat berguna untuk debugging." },
            ],
          },
          sources: [
            { type: "DOCUMENTATION", title: "MDN — let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
          ],
        },
        {
          id: "s3",
          order: 2,
          title: "Fungsi",
          content: {
            type: "code",
            language: "javascript",
            body: "// Function declaration\nfunction sapa(nama) {\n  return `Halo, ${nama}!`;\n}\n\n// Arrow function (ES6)\nconst tambah = (a, b) => a + b;\n\nconsole.log(sapa(\"Radit\"));\nconsole.log(tambah(3, 5));",
            tooltips: [
              { token: "function", explanation: "Keyword untuk mendeklarasikan sebuah fungsi. Fungsi adalah blok kode yang dapat digunakan ulang (reusable)." },
              { token: "return", explanation: "Mengembalikan nilai dari sebuah fungsi. Setelah return dieksekusi, fungsi akan berhenti." },
              { token: "=>", explanation: "Arrow function — sintaks ringkas untuk menulis fungsi di ES6+. Tidak memiliki 'this' binding sendiri." },
            ],
          },
          sources: [
            { type: "DOCUMENTATION", title: "MDN — Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
          ],
        },
        {
          id: "s4",
          order: 3,
          title: "Kuis Validasi Modul 1",
          content: {
            type: "quiz",
            questions: [
              {
                question: "Apa kegunaan utama dari keyword 'const' di JavaScript?",
                options: [
                  "Mendeklarasikan variabel yang nilainya bisa diubah kapan saja",
                  "Mendeklarasikan variabel konstan yang nilainya tidak dapat diubah (reassigned)",
                  "Mendeklarasikan sebuah fungsi baru",
                  "Mencetak output ke konsol browser"
                ],
                correctAnswer: 1
              }
            ]
          }
        },
      ],
    },
    {
      id: "m2",
      title: "Kontrol Alur Program",
      slug: "kontrol-alur-program",
      order: 1,
      completed: false,
      slides: [],
    },
    {
      id: "m3",
      title: "Array dan Objek",
      slug: "array-dan-objek",
      order: 2,
      completed: false,
      slides: [],
    },
  ],
};

type Tooltip = { token: string; explanation: string; sourceUrl?: string };

// Code block with hover tooltips
function CodeBlockWithTooltips({ code, language, tooltips }: { code: string; language: string; tooltips?: Tooltip[] }) {
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
      const sortedTooltips = [...tooltips].sort((a, b) => b.token.length - a.token.length);

      while (remaining.length > 0) {
        let earliestMatch: { index: number; tooltip: Tooltip } | null = null;

        for (const tooltip of sortedTooltips) {
          const idx = remaining.indexOf(tooltip.token);
          if (idx !== -1 && (earliestMatch === null || idx < earliestMatch.index)) {
            earliestMatch = { index: idx, tooltip };
          }
        }

        if (earliestMatch) {
          // Text before the match
          if (earliestMatch.index > 0) {
            parts.push(
              <span key={`${lineIdx}-${partKey++}`} className="text-[#e6edf3]">
                {remaining.slice(0, earliestMatch.index)}
              </span>
            );
          }

          // The matched token (interactive)
          const token = earliestMatch.tooltip.token;
          const explanation = earliestMatch.tooltip.explanation;
          parts.push(
              <span
                key={`${lineIdx}-${partKey++}`}
                className={`relative inline-block cursor-help border-b-2 border-dashed border-sky/50 transition-colors ${activeTooltip === `${lineIdx}-${token}` ? "bg-sky/20 text-white border-sky" : "text-sky hover:text-white hover:bg-sky/10"}`}
                onMouseEnter={() => setActiveTooltip(`${lineIdx}-${token}`)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === `${lineIdx}-${token}` ? null : `${lineIdx}-${token}`)}
              >
                {token}
              </span>
          );

          remaining = remaining.slice(earliestMatch.index + token.length);
        } else {
          parts.push(
            <span key={`${lineIdx}-${partKey++}`} className="text-[#e6edf3]">
              {remaining}
            </span>
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
        <span className="text-xs text-[#484f58] font-medium uppercase">{language}</span>
        <span className="text-[10px] text-sky/60">hover token → lihat penjelasan</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{renderCode()}</code>
      </pre>

      {/* Explanation Bubble Outside */}
      {activeTooltip && (() => {
        const [activeLineIdx, activeToken] = activeTooltip.split("-", 2);
        const tooltipData = tooltips.find(t => t.token === activeToken);
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
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors[type] || "bg-muted/10 text-muted"}`}>
      {type === "YOUTUBE" ? "YouTube" : type.charAt(0) + type.slice(1).toLowerCase()}
    </span>
  );
}

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [showChat, setShowChat] = useState(false);
  
  // State for mocked quiz
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const activeModule = courseData.modules[activeModuleIdx];
  const slides = activeModule?.slides || [];
  const activeSlide = slides[activeSlideIdx];
  const totalSlides = slides.length;

  return (
    <div className="min-h-screen bg-canvas dark:bg-void text-body dark:text-white/70 flex">
      {/* Sidebar — Module List */}
      <aside className="hidden lg:flex w-[300px] shrink-0 border-r border-hairline bg-canvas dark:bg-void flex-col h-screen sticky top-0">
        {/* Course header */}
        <div className="p-5 border-b border-hairline">
          <Link href="/explore" className="text-sm text-muted hover:text-core-blue transition-colors mb-3 block">
            ← Kembali
          </Link>
          <h2 className="text-lg font-bold font-heading text-ink dark:text-white leading-tight">{courseData.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-spark text-sm">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="font-medium">{courseData.rating}</span>
            </div>
            <span className="text-xs text-muted">({courseData.ratingCount} rating)</span>
          </div>
        </div>

        {/* Module list */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {courseData.modules.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => { setActiveModuleIdx(idx); setActiveSlideIdx(0); setSelectedAnswer(null); setIsQuizSubmitted(false); }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-all ${
                idx === activeModuleIdx
                  ? "bg-core-blue/10 text-core-blue dark:text-sky font-medium"
                  : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated"
              }`}
            >
              {mod.completed ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-muted-soft" />
              )}
              <div>
                <div className="leading-tight">{mod.title}</div>
                <div className="text-xs text-muted mt-0.5">{mod.slides.length} slide</div>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content — Slide Viewer */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 md:px-6 border-b border-hairline bg-canvas/80 dark:bg-void/80 backdrop-blur-md">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/explore" className="lg:hidden flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
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
          <div className={`flex-1 transition-all duration-300 ${showChat ? "lg:mr-[360px]" : ""}`}>
            {activeSlide ? (
              <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
                {/* Slide Title */}
                <h1 className="text-3xl font-black font-heading text-ink dark:text-white">
                  {activeSlide.title}
                </h1>

                {/* Slide Body */}
                {activeSlide.content.type === "text" && activeSlide.content.body && (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {activeSlide.content.body.split("\n\n").map((para: string, i: number) => (
                      <p key={i} className="text-body dark:text-white/70 leading-relaxed">{para}</p>
                    ))}
                  </div>
                )}

                {activeSlide.content.type === "code" && activeSlide.content.body && (
                  <CodeBlockWithTooltips
                    code={activeSlide.content.body}
                    language={activeSlide.content.language || "javascript"}
                    tooltips={activeSlide.content.tooltips}
                  />
                )}

                {/* Quiz Content */}
                {activeSlide.content.type === "quiz" && (
                  <div className="space-y-6">
                    <div className="bg-sky/5 dark:bg-sky/10 border border-sky/20 rounded-xl p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky text-white text-xs font-bold">Q</span>
                        <span className="text-sm font-bold tracking-wider text-sky uppercase">Validasi Pemahaman</span>
                      </div>
                      
                      <h3 className="font-bold text-ink dark:text-white mb-6 text-lg md:text-xl">
                        {activeSlide?.content?.questions?.[0]?.question}
                      </h3>
                      
                      <div className="space-y-3">
                        {activeSlide?.content?.questions?.[0]?.options.map((opt: string, idx: number) => {
                          const isSelected = selectedAnswer === idx;
                          const isCorrect = idx === activeSlide?.content?.questions?.[0]?.correctAnswer;
                          
                          let labelClass = "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ";
                          if (isQuizSubmitted) {
                            if (isCorrect) {
                              labelClass += "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400";
                            } else if (isSelected) {
                              labelClass += "border-red-500 bg-red-50 text-red-900 dark:bg-red-500/10 dark:text-red-400";
                            } else {
                              labelClass += "border-hairline opacity-50";
                            }
                          } else {
                            if (isSelected) {
                              labelClass += "border-sky bg-sky/5";
                            } else {
                              labelClass += "border-hairline hover:border-sky/50 bg-canvas dark:bg-void-elevated";
                            }
                          }

                          return (
                            <label key={idx} className={labelClass}>
                              <input 
                                type="radio" 
                                name="quiz" 
                                className="w-4 h-4 text-sky"
                                checked={isSelected}
                                onChange={() => !isQuizSubmitted && setSelectedAnswer(idx)}
                                disabled={isQuizSubmitted}
                              />
                              <span className="text-body dark:text-white/80 font-medium">{opt}</span>
                              {isQuizSubmitted && isCorrect && (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-auto shrink-0" />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sources */}
                {activeSlide.sources && activeSlide.sources.length > 0 && (
                  <div className="border-t border-hairline pt-6 space-y-3">
                    <h3 className="text-sm font-bold text-ink dark:text-white">Sumber Referensi</h3>
                    <div className="space-y-2">
                      {activeSlide.sources.map((src: { type: string; title: string; url: string }, i: number) => (
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
                      ))}

                      {/* YouTube Embed */}
                      {activeSlide.sources
                        .filter((s: { type: string }) => s.type === "YOUTUBE")
                        .map((src: { url: string; title: string }, i: number) => {
                          const videoId = src.url.match(/(?:v=|youtu\.be\/)([^&]+)/)?.[1];
                          if (!videoId) return null;
                          return (
                            <div key={`yt-${i}`} className="mt-4 rounded-xl overflow-hidden border border-hairline aspect-video">
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={src.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-muted-soft mx-auto mb-4" />
                  <p className="text-muted">Modul ini belum memiliki konten slide.</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Chat Panel */}
          {showChat && (
            <div className="hidden lg:flex fixed top-14 right-0 bottom-0 w-[360px] border-l border-hairline bg-canvas dark:bg-void flex-col z-10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline">
                <MessageSquare className="h-4 w-4 text-core-blue" />
                <span className="text-sm font-bold text-ink dark:text-white">Clarise AI Tutor</span>
                <span className="ml-auto text-[10px] text-muted bg-surface-soft dark:bg-void-elevated px-2 py-0.5 rounded-full">
                  Konteks: {activeModule?.title}
                </span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div className="bg-surface-soft dark:bg-void-elevated rounded-xl rounded-tl-none p-4 text-sm text-body dark:text-white/70 border border-hairline">
                  Hai! 👋 Saya AI Tutor untuk modul <strong>"{activeModule?.title}"</strong>. Ada yang ingin kamu tanyakan tentang materi ini?
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
            onClick={() => setActiveSlideIdx(Math.max(0, activeSlideIdx - 1))}
            disabled={activeSlideIdx === 0}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          {/* Slide dots */}
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIdx(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeSlideIdx ? "w-6 bg-core-blue" : "w-2 bg-muted-soft/50 hover:bg-muted"
                }`}
              />
            ))}
          </div>

          {activeSlideIdx < totalSlides - 1 ? (
            <button
              onClick={() => {
                setActiveSlideIdx(activeSlideIdx + 1);
              }}
              className="flex items-center gap-2 rounded-full bg-core-blue px-4 py-2 text-sm font-bold text-white hover:bg-core-blue/90 transition-colors shadow-sm"
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : activeSlide?.content?.type === "quiz" && !isQuizSubmitted ? (
            <button 
              onClick={() => setIsQuizSubmitted(true)}
              disabled={selectedAnswer === null}
              className="flex items-center gap-2 rounded-full bg-sky px-6 py-2 text-sm font-bold text-white hover:bg-sky/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Jawab Kuis
            </button>
          ) : (
            <button 
              className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-bold text-white transition-colors shadow-sm ${
                activeSlide?.content?.type === "quiz" && isQuizSubmitted && selectedAnswer !== activeSlide?.content?.questions?.[0]?.correctAnswer
                  ? "bg-red-500 hover:bg-red-600" // Jika salah, tombol jadi error
                  : "bg-emerald-500 hover:bg-emerald-600" // Jika benar atau bukan kuis, tombol success
              }`}
              onClick={() => {
                if (activeSlide?.content?.type === "quiz" && isQuizSubmitted && selectedAnswer !== activeSlide?.content?.questions?.[0]?.correctAnswer) {
                  // Reset quiz if wrong
                  setIsQuizSubmitted(false);
                  setSelectedAnswer(null);
                } else {
                  // TODO: Real backend integration to mark complete
                  setShowSuccessModal(true);
                }
              }}
            >
              {activeSlide?.content?.type === "quiz" && isQuizSubmitted && selectedAnswer !== activeSlide?.content?.questions?.[0]?.correctAnswer ? (
                <>Coba Lagi</>
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
          <div className="absolute inset-0 bg-[#0C1F3D]/60 backdrop-blur-sm transition-opacity" onClick={() => setShowSuccessModal(false)} />
          <div className="relative bg-white dark:bg-void-elevated rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_24px_60px_rgba(12,31,61,0.2)] animate-in zoom-in-95 fade-in duration-300 ease-out">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">Luar Biasa!</h3>
            <p className="text-body dark:text-white/70 mb-8 text-sm">
              Kamu telah berhasil menyelesaikan modul <strong>{activeModule?.title}</strong>. Lanjutkan progres belajarmu untuk meraih badge!
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  // Lanjut ke modul berikutnya jika ada
                  if (activeModuleIdx < courseData.modules.length - 1) {
                    setActiveModuleIdx(activeModuleIdx + 1);
                    setActiveSlideIdx(0);
                    setSelectedAnswer(null);
                    setIsQuizSubmitted(false);
                  }
                }}
                className="flex w-full items-center justify-center rounded-full bg-core-blue px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-core-blue/90 hover:shadow-[0_4px_14px_0_rgba(26,127,204,0.39)] hover:-translate-y-0.5"
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

      <AIChatFAB />
    </div>
  );
}
