"use client";

import { useState } from "react";
import {
  Sparkles,
  Lock,
  ArrowRight,
  Wand2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

import { useUser } from "@/hooks/use-user";

export default function GenerateCoursePage() {
  const { user } = useUser();
  const isPremium =
    user?.subscription?.plan && user.subscription.plan !== "FREE";

  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isPremium) {
    return (
      <div className="max-w-2xl mx-auto mt-16 text-center space-y-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-spark/10 mx-auto">
          <Lock className="h-10 w-10 text-spark" />
        </div>
        <div>
          <h1 className="text-3xl font-black font-heading text-ink dark:text-white mb-3">
            Fitur Premium
          </h1>
          <p className="text-lg text-muted dark:text-white/90 leading-relaxed">
            AI Course Generator hanya tersedia untuk pengguna Premium. Buat
            kursus khusus dari topik apapun, di-generate oleh AI dari berbagai
            sumber terpercaya.
          </p>
        </div>
        <div className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-8 text-left space-y-4">
          <h3 className="font-bold text-ink dark:text-white">
            Yang kamu dapatkan:
          </h3>
          <ul className="space-y-3">
            {[
              "Buat kursus dari topik apapun dengan prompt",
              "AI generate materi lengkap dengan sumber referensi",
              "Kursus tersimpan secara pribadi (private)",
              "Konten slide interaktif dengan code tooltips",
              "50 pesan AI Tutor per jam (vs 5 untuk gratis)",
              "Akses unlimited kursus",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-body dark:text-white/90"
              >
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-lg bg-spark px-8 py-3.5 text-base font-bold text-white hover:bg-spark/90 transition-colors shadow-lg shadow-spark/20"
        >
          Upgrade ke Premium
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 h-full flex flex-col justify-center min-h-[60vh]">
      {/* Header / Greeting */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-spark/10 mb-2">
          <Sparkles className="h-8 w-8 text-spark" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-heading text-ink dark:text-white">
          Hai {user?.firstName || "Teman"}, mau belajar apa hari ini?
        </h1>
        <p className="text-lg text-muted dark:text-white/80 max-w-xl mx-auto">
          Tulis apa pun yang ingin kamu kuasai, biar AI Clarise yang meracik
          materi kursus terstruktur khusus buatmu.
        </p>
      </div>

      {/* Input Form */}
      <div className="relative">
        <div className="rounded-2xl border border-hairline bg-canvas dark:bg-void-elevated p-2 shadow-sm focus-within:ring-2 focus-within:ring-spark/30 focus-within:border-spark transition-all">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: Ajarkan saya dasar-dasar bahasa pemrograman Python dari nol..."
            className="w-full h-32 resize-none bg-transparent p-4 text-base text-ink dark:text-white placeholder:text-muted-soft dark:placeholder:text-white/40 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (topic && !isGenerating) setIsGenerating(true);
              }
            }}
          />
          <div className="flex items-center justify-between p-2">
            <div className="text-xs text-muted-soft dark:text-white/50 px-2 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Pribadi
            </div>
            <button
              disabled={!topic || isGenerating}
              onClick={() => setIsGenerating(true)}
              className="flex items-center gap-2 rounded-xl bg-spark px-6 py-2.5 text-sm font-bold text-white hover:bg-spark/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-spark/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="pt-4">
        <p className="text-xs font-bold text-muted dark:text-white/60 mb-3 text-center uppercase tracking-wider">
          Saran Topik
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Cara membuat website portofolio dengan React",
            "Dasar-dasar Machine Learning pakai Python",
            "Teknik Digital Marketing untuk jualan online",
            "Cara public speaking yang percaya diri",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setTopic(suggestion)}
              className="px-4 py-2 rounded-full text-sm bg-surface-soft dark:bg-white/5 text-body dark:text-white/80 hover:bg-surface-strong dark:hover:bg-white/10 border border-hairline transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
