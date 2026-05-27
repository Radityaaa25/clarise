"use client";

import { useState } from "react";
import { Sparkles, Lock, ArrowRight, BookOpen, Wand2, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

// Simulated premium check — will be replaced with real user data
const isPremium = false;

const categoryOptions = [
  "Pemrograman", "Matematika", "Sains", "Bahasa", "Desain",
  "Bisnis", "Musik", "Fotografi", "Marketing", "Lainnya",
];

const difficultyOptions = [
  { value: "BEGINNER", label: "Pemula" },
  { value: "INTERMEDIATE", label: "Menengah" },
  { value: "ADVANCED", label: "Mahir" },
];

export default function GenerateCoursePage() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("BEGINNER");
  const [moduleCount, setModuleCount] = useState(5);
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
            AI Course Generator hanya tersedia untuk pengguna Premium. Buat kursus khusus dari topik apapun, di-generate oleh AI dari berbagai sumber terpercaya.
          </p>
        </div>
        <div className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-8 text-left space-y-4">
          <h3 className="font-bold text-ink dark:text-white">Yang kamu dapatkan:</h3>
          <ul className="space-y-3">
            {[
              "Buat kursus dari topik apapun dengan prompt",
              "AI generate materi lengkap dengan sumber referensi",
              "Kursus tersimpan secara pribadi (private)",
              "Konten slide interaktif dengan code tooltips",
              "50 pesan AI Tutor per jam (vs 5 untuk gratis)",
              "Akses unlimited kursus",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-body dark:text-white/90">
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
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black font-heading text-ink dark:text-white mb-2 flex items-center gap-3">
          <Wand2 className="h-8 w-8 text-spark" />
          AI Course Generator
        </h1>
        <p className="text-muted dark:text-white/90">
          Deskripsikan topik yang ingin kamu pelajari, dan AI akan membuatkan kursus lengkap untukmu.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-8 space-y-6">
        {/* Topic */}
        <div>
          <label className="block text-sm font-bold text-ink dark:text-white mb-2">
            Topik Kursus <span className="text-error">*</span>
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: Belajar TypeScript untuk React Developer"
            className="w-full h-12 rounded-lg border border-hairline bg-surface-soft dark:bg-void px-4 text-sm text-ink dark:text-white placeholder:text-muted-soft focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
          />
          <p className="text-xs text-muted-soft dark:text-white/70 mt-1.5">Semakin spesifik topikmu, semakin baik hasilnya.</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-ink dark:text-white mb-2">Kategori</label>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-core-blue text-white shadow-sm"
                    : "bg-surface-soft dark:bg-void text-body dark:text-on-dark-soft hover:bg-surface-strong dark:hover:bg-white/10 border border-hairline"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-bold text-ink dark:text-white mb-2">Tingkat Kesulitan</label>
          <div className="flex gap-3">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all border ${
                  difficulty === opt.value
                    ? "border-core-blue bg-core-blue/10 text-core-blue dark:text-sky"
                    : "border-hairline bg-surface-soft dark:bg-void text-body dark:text-on-dark-soft hover:border-core-blue/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Module Count */}
        <div>
          <label className="block text-sm font-bold text-ink dark:text-white mb-2">
            Jumlah Modul: <span className="text-core-blue">{moduleCount}</span>
          </label>
          <input
            type="range"
            min={3}
            max={15}
            value={moduleCount}
            onChange={(e) => setModuleCount(Number(e.target.value))}
            className="w-full accent-core-blue"
          />
          <div className="flex justify-between text-xs text-muted-soft dark:text-white/70 mt-1">
            <span>3 modul</span>
            <span>15 modul</span>
          </div>
        </div>

        {/* Generate Button */}
        <button
          disabled={!topic || !category || isGenerating}
          onClick={() => setIsGenerating(true)}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-core-blue px-6 py-4 text-base font-bold text-white hover:bg-core-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-core-blue/20"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sedang generate kursus...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Kursus
            </>
          )}
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="rounded-lg border border-hairline bg-surface-soft dark:bg-void-elevated p-4">
        <p className="text-xs text-muted dark:text-white/90 leading-relaxed">
          🔒 <strong>Privasi:</strong> Kursus yang kamu buat akan tersimpan secara <strong>pribadi</strong> dan hanya bisa diakses oleh kamu sendiri. Tidak ada data pribadi yang dikirim ke pihak ketiga — hanya topik dan konteks materi yang diproses oleh AI.
        </p>
      </div>
    </div>
  );
}
