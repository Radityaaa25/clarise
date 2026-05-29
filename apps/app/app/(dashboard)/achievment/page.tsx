"use client";

import { Zap, Flame, Lock } from "lucide-react";
import { useAchievements } from "@/hooks/use-achievements";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";

type Badge = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  earned: boolean;
  earnedAt: string | null;
};

export default function AchievementPage() {
  // Pakai 2 hook supaya data konsisten dengan dashboard:
  // - useUser() → xp, level, streak (sama source dengan dashboard)
  // - useAchievements() → badges + xpToNextLevel
  const { user, isLoading: isUserLoading } = useUser();
  const { achievements, isLoading: isBadgesLoading } = useAchievements();

  const badges: Badge[] = achievements;

  // Currently the API returns xpToNextLevel separately; combine for progress bar.
  // Fallback while loading.
  const xp = user?.xp ?? 0;
  const level = user?.level ?? 1;
  const xpToNext = user?.xpToNextLevel ?? 100;
  // xp progres dalam level saat ini = total xp di level - sisa ke level berikutnya
  // Tapi karena kita gak punya base level threshold di client, simplify dengan persentase
  // dari (xp / (xp + xpToNextLevel)) — untuk level max, xpToNextLevel=0 → 100%.
  const totalToReach = xp + xpToNext;
  const xpPercentage =
    xpToNext === 0 ? 100 : Math.min(100, Math.round((xp / totalToReach) * 100));

  const currentStreak = user?.currentStreak ?? 0;
  const longestStreak = user?.longestStreak ?? 0;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black font-heading text-ink dark:text-white mb-2">
          Pencapaian
        </h1>
        <p className="text-muted dark:text-frost/80 text-sm md:text-base">
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
              <div className="text-sm text-muted dark:text-frost/80">
                Level {isUserLoading ? "..." : level}
              </div>
              <div className="text-2xl font-black font-heading text-ink dark:text-white">
                {isUserLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <>{xp.toLocaleString()} XP</>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted dark:text-frost/80">
              <span>
                {xpToNext === 0
                  ? "Level Maksimum tercapai!"
                  : `Progres ke Level ${level + 1}`}
              </span>
              <span>
                {xpToNext === 0
                  ? "MAX"
                  : `${xpToNext.toLocaleString()} XP lagi`}
              </span>
            </div>
            <div className="h-3 w-full bg-surface-soft rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-spark to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
                aria-label={`${xpPercentage}% menuju level berikutnya`}
              />
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 flex flex-col items-center justify-center text-center transition-colors">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error/10 mb-3">
            <Flame className="h-7 w-7 text-error" />
          </div>
          <div className="text-3xl font-black font-heading text-ink dark:text-white">
            {isUserLoading ? "..." : currentStreak}
          </div>
          <div className="text-sm text-muted dark:text-frost/80">
            Hari Streak
          </div>
          {longestStreak > 0 && longestStreak !== currentStreak && (
            <div className="text-[11px] text-muted-soft mt-1">
              Rekor: {longestStreak} hari
            </div>
          )}
        </div>
      </div>

      {/* Badges Grid */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold font-heading text-ink dark:text-white">
            Lencana
          </h2>
          {!isBadgesLoading && badges.length > 0 && (
            <span className="text-xs text-muted dark:text-frost/70 font-bold">
              {badges.filter((b) => b.earned).length} / {badges.length} earned
            </span>
          )}
        </div>

        {isBadgesLoading ? (
          // Skeleton loading
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : badges.length === 0 ? (
          <div className="rounded-xl border border-hairline border-dashed p-8 text-center bg-canvas dark:bg-void-elevated">
            <p className="text-sm text-muted dark:text-frost/70">
              Belum ada lencana yang tersedia. Hubungi admin untuk seeding
              badge.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
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
                  {badge.icon || "🏆"}
                </div>
                <h4 className="text-xs md:text-sm font-bold text-ink dark:text-white mb-1 leading-tight">
                  {badge.name}
                </h4>
                <p className="text-[10px] md:text-xs text-muted dark:text-frost/70 leading-relaxed line-clamp-3">
                  {badge.description ?? ""}
                </p>
                {badge.earned && badge.earnedAt && (
                  <p className="text-[9px] text-spark font-bold mt-2">
                    {new Date(badge.earnedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
