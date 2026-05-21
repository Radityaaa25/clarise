"use client";
import { Trophy, Target, BookOpen, Flame } from "lucide-react";
import { ArrowButton } from "@/components/ui/arrow-button";

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
      {/* Hero Greeting Card */}
      <div className="rounded-2xl border border-hairline bg-canvas dark:bg-void-elevated p-5 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between transition-colors">
        <div>
          <h1 className="text-[22px] md:text-3xl font-black font-heading text-ink dark:text-white mb-2">
            Selamat datang kembali, Radit! 👋
          </h1>
          <p className="text-body dark:text-frost/80 text-[14px] md:text-[16px]">
            Kamu memiliki{" "}
            <span className="font-bold text-core-blue">1 kursus aktif</span>.
            Mari lanjutkan progres belajarmu hari ini.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <a href="/explore" className="ab w-full md:w-auto">
            <span className="ab-arrow" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <span className="ab-top" aria-hidden="true">Lanjutkan Belajar</span>
            <span className="ab-bot" aria-hidden="true">Lanjutkan Belajar</span>
            <span className="sr-only">Lanjutkan Belajar</span>
          </a>
        </div>
      </div>

      {/* Stats Grid (2x2 on mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          {
            label: "Total XP",
            value: "450",
            icon: Trophy,
            color: "text-spark",
            bg: "bg-spark/10",
          },
          {
            label: "Level",
            value: "5",
            icon: Target,
            color: "text-core-blue",
            bg: "bg-core-blue/10",
          },
          {
            label: "Modul Selesai",
            value: "12",
            icon: BookOpen,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Hari Streak",
            value: "3",
            icon: Flame,
            color: "text-error",
            bg: "bg-error/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-4 md:p-5 flex flex-col transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-3 md:mb-4`}
            >
              <stat.icon size={20} />
            </div>
            <div className="text-[24px] md:text-[28px] font-black font-heading text-ink dark:text-white leading-none mb-1">
              {stat.value}
            </div>
            <div className="text-[12px] md:text-[14px] text-body dark:text-frost/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning Section */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-[20px] md:text-2xl font-bold font-heading text-ink">
            Sedang Dipelajari
          </h2>
          <a
            href="/my-courses"
            className="text-[14px] font-bold text-core-blue hover:underline"
          >
            Lihat Semua
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Active Course Card (Full width on mobile) */}
          <div className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-5 md:p-6 w-full flex flex-col transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] md:text-[12px] font-bold tracking-wide text-core-blue bg-core-blue/10 dark:bg-core-blue/20 px-2 py-0.5 rounded-full uppercase">
                PEMROGRAMAN
              </span>
            </div>
            <h3 className="text-[16px] md:text-[18px] font-bold text-ink dark:text-white mb-4 line-clamp-1">
              React.js Modern
            </h3>

            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-[12px] md:text-[14px] text-body dark:text-frost/80 font-medium">
                <span>Progres</span>
                <span>60%</span>
              </div>
              <div className="h-2 md:h-2.5 w-full bg-slate rounded-full overflow-hidden">
                <div
                  className="h-full bg-core-blue rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
