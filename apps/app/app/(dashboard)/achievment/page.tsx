"use client";

import { Trophy, Zap, Flame, Target, Lock, Star } from "lucide-react";

// Placeholder data
const xpData = { current: 0, nextLevel: 100, level: 1 };

const badges = [
  {
    name: "Petualang Baru",
    description: "Selesaikan kursus pertamamu",
    icon: "🚀",
    earned: false,
  },
  {
    name: "Streak 7 Hari",
    description: "Belajar 7 hari berturut-turut",
    icon: "🔥",
    earned: false,
  },
  {
    name: "Pemahaman Mendalam",
    description: "Jawab 10 pertanyaan ke AI Tutor",
    icon: "🧠",
    earned: false,
  },
  {
    name: "Speed Learner",
    description: "Selesaikan 1 modul dalam 1 hari",
    icon: "⚡",
    earned: false,
  },
  {
    name: "Kurator Konten",
    description: "Buat kursus pertamamu (Premium)",
    icon: "✨",
    earned: false,
  },
  {
    name: "Bintang 5",
    description: "Berikan rating pertamamu",
    icon: "⭐",
    earned: false,
  },
  {
    name: "Konsisten",
    description: "Belajar 30 hari berturut-turut",
    icon: "💎",
    earned: false,
  },
  {
    name: "Guru Sejati",
    description: "Selesaikan 10 kursus",
    icon: "🎓",
    earned: false,
  },
];

export default function AchievementPage() {
  const xpPercentage = (xpData.current / xpData.nextLevel) * 100;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black font-heading text-ink dark:text-white mb-2">
          Pencapaian
        </h1>
        <p className="text-muted dark:text-frost/80">
          Pantau progresmu, kumpulkan lencana, dan jaga streak belajarmu!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
        {/* XP & Level Card */}
        <div className="md:col-span-2 rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-spark/10">
              <Zap className="h-6 w-6 text-spark" />
            </div>
            <div>
              <div className="text-sm text-muted dark:text-frost/80">Level {xpData.level}</div>
              <div className="text-2xl font-black font-heading text-ink dark:text-white">
                {xpData.current} XP
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted dark:text-frost/80">
              <span>Progres ke Level {xpData.level + 1}</span>
              <span>
                {xpData.current}/{xpData.nextLevel} XP
              </span>
            </div>
            <div className="h-3 w-full bg-surface-soft rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-spark to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 flex flex-col items-center justify-center text-center transition-colors">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error/10 mb-3">
            <Flame className="h-7 w-7 text-error" />
          </div>
          <div className="text-3xl font-black font-heading text-ink dark:text-white">0</div>
          <div className="text-sm text-muted dark:text-frost/80">Hari Streak</div>
        </div>
      </div>

      {/* Badges Grid */}
      <section>
        <h2 className="text-xl font-bold font-heading text-ink dark:text-white mb-5">
          Lencana
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className={`relative rounded-xl border p-4 md:p-5 text-center transition-all duration-300 flex flex-col items-center justify-center ${
                badge.earned
                  ? "border-spark/30 bg-spark/5 dark:bg-spark/10 shadow-md"
                  : "border-hairline bg-canvas dark:bg-void-elevated opacity-60 grayscale"
              }`}
            >
              {!badge.earned && (
                <div className="absolute top-2 right-2">
                  <Lock className="h-3.5 w-3.5 text-muted-soft" />
                </div>
              )}
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">
                {badge.icon}
              </div>
              <h4 className="text-xs md:text-sm font-bold text-ink dark:text-white mb-1 leading-tight">
                {badge.name}
              </h4>
              <p className="text-[10px] md:text-xs text-muted dark:text-frost/70 leading-relaxed line-clamp-2 md:line-clamp-none">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
