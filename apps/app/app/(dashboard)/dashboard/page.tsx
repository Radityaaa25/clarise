"use client";
import { Trophy, Target, BookOpen, Flame } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import useSWR from "swr";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { user, isLoading: isUserLoading } = useUser();
  const { data: progressData, isLoading: isProgressLoading } = useSWR(
    "/api/progress/active",
    fetcher,
  );

  const activeCourses = progressData?.activeCourses || [];

  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
      {/* Hero Greeting Card */}
      <div className="rounded-2xl border border-hairline bg-canvas dark:bg-void-elevated p-5 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between transition-colors">
        <div>
          <h1 className="text-[22px] md:text-3xl font-black font-heading text-ink dark:text-white mb-2">
            Selamat datang kembali
            {user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
          </h1>
          <p className="text-body dark:text-frost/80 text-[14px] md:text-[16px]">
            Kamu memiliki{" "}
            <span className="font-bold text-core-blue">
              {isProgressLoading ? "..." : activeCourses.length} kursus aktif
            </span>
            . Mari lanjutkan progres belajarmu hari ini.
          </p>
        </div>
        <div className="w-full md:w-auto">
          {activeCourses.length > 0 ? (
            <Link
              href={`/course/${activeCourses[0].slug}`}
              className="ab w-full md:w-auto"
            >
              <span className="ab-arrow" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="ab-top" aria-hidden="true">
                Lanjutkan Belajar
              </span>
              <span className="ab-bot" aria-hidden="true">
                Lanjutkan Belajar
              </span>
              <span className="sr-only">Lanjutkan Belajar</span>
            </Link>
          ) : (
            <Link href="/explore" className="ab w-full md:w-auto">
              <span className="ab-arrow" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="ab-top" aria-hidden="true">
                Cari Kursus Baru
              </span>
              <span className="ab-bot" aria-hidden="true">
                Cari Kursus Baru
              </span>
              <span className="sr-only">Cari Kursus Baru</span>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid (2x2 on mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          {
            label: "Total XP",
            value: isUserLoading ? "..." : user?.xp || "0",
            icon: Trophy,
            color: "text-spark",
            bg: "bg-spark/10",
          },
          {
            label: "Level",
            value: isUserLoading ? "..." : user?.level || "1",
            icon: Target,
            color: "text-core-blue",
            bg: "bg-core-blue/10",
          },
          {
            label: "Modul Selesai",
            value: isUserLoading ? "..." : user?.completedModules || "0", // Need to fetch completed modules count, but for now we can rely on activeCourses calculation or leave 0 until we add it to user API
            icon: BookOpen,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Hari Streak",
            value: isUserLoading ? "..." : user?.currentStreak || "0",
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
          <Link
            href="/my-courses"
            className="text-[14px] font-bold text-core-blue hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {isProgressLoading ? (
            // Skeleton loader
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-5 md:p-6 w-full flex flex-col"
              >
                <Skeleton className="h-4 w-24 mb-3 rounded-full" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <div className="mt-auto space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
              </div>
            ))
          ) : activeCourses.length > 0 ? (
            activeCourses.map((course: any) => (
              <Link key={course.id} href={`/course/${course.slug}`}>
                <div className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-5 md:p-6 w-full flex flex-col transition-colors hover:border-core-blue/50 cursor-pointer h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] md:text-[12px] font-bold tracking-wide text-core-blue bg-core-blue/10 dark:bg-core-blue/20 px-2 py-0.5 rounded-full uppercase">
                      {course.categoryName}
                    </span>
                  </div>
                  <h3 className="text-[16px] md:text-[18px] font-bold text-ink dark:text-white mb-4 line-clamp-1">
                    {course.title}
                  </h3>

                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[12px] md:text-[14px] text-body dark:text-frost/80 font-medium">
                      <span>Progres</span>
                      <span>{course.progressPercent}%</span>
                    </div>
                    <div className="h-2 md:h-2.5 w-full bg-slate rounded-full overflow-hidden">
                      <div
                        className="h-full bg-core-blue rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-hairline border-dashed p-8 text-center bg-canvas dark:bg-void-elevated">
              <BookOpen className="w-12 h-12 text-slate mx-auto mb-3" />
              <h3 className="text-lg font-bold text-ink dark:text-white mb-2">
                Belum ada kursus aktif
              </h3>
              <p className="text-body dark:text-frost/80 mb-4 text-sm max-w-md mx-auto">
                Kamu belum memulai kursus apapun. Yuk eksplorasi katalog kursus
                dan mulai belajar hari ini!
              </p>
              <Link
                href="/explore"
                className="text-core-blue font-bold hover:underline"
              >
                Jelajahi Kursus &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
