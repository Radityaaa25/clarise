"use client";

import { BookOpen, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MyCoursesPage() {
  const { user } = useUser();
  const { data: progressData, isLoading: isProgressLoading } = useSWR(
    "/api/progress/active",
    fetcher,
  );

  const activeCourses = progressData?.activeCourses || [];
  const isPremium =
    user?.subscription?.plan && user.subscription.plan !== "FREE";

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black font-heading text-ink dark:text-white mb-2">
          Kursus Saya
        </h1>
        <p className="text-muted">
          Kelola dan pantau progres kursus yang sedang kamu pelajari.
        </p>
      </div>

      {/* Active Course */}
      <section>
        <h2 className="text-xl font-bold font-heading text-ink dark:text-white mb-5">
          Kursus Aktif
        </h2>

        {isProgressLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-hairline bg-canvas dark:bg-void-elevated p-6 w-full flex flex-col"
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
            ))}
          </div>
        ) : activeCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCourses.map((course: any) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                className="block rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 hover:border-core-blue/50 transition-all flex flex-col h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] md:text-[12px] font-bold tracking-wide text-core-blue bg-core-blue/10 dark:bg-core-blue/20 px-2 py-0.5 rounded-full uppercase">
                    {course.categoryName}
                  </span>
                </div>
                <h3 className="text-[16px] md:text-[18px] font-bold text-ink dark:text-white mb-4 line-clamp-1">
                  {course.title}
                </h3>

                <div className="mt-auto space-y-2 mb-4">
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

                <div className="flex items-center justify-between text-core-blue font-bold text-sm">
                  Lanjutkan Belajar <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-soft mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink dark:text-white mb-2">
              Belum ada kursus aktif
            </h3>
            <p className="text-muted mb-2">
              Kamu belum mengambil kursus apapun.
            </p>
            {!isPremium && (
              <p className="text-sm text-muted-soft mb-6">
                Pengguna gratis hanya dapat mengakses kursus tingkat{" "}
                <strong>Dasar</strong>. Upgrade ke Premium untuk akses
                unlimited!
              </p>
            )}
            <div className="flex justify-center gap-3 mt-6">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-lg bg-core-blue px-6 py-3 text-sm font-bold text-white hover:bg-core-blue/90 transition-colors shadow-md shadow-core-blue/20"
              >
                Jelajahi Kursus
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Free Tier Notice */}
      {!isPremium && (
        <section className="rounded-xl border border-spark/20 bg-spark/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-spark/10">
              <Lock className="h-5 w-5 text-spark" />
            </div>
            <div>
              <h3 className="font-bold text-ink dark:text-white mb-1">
                Batasan Akun Gratis
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Dengan akun gratis, kamu hanya bisa mengakses kursus dengan
                tingkat kesulitan <strong>Dasar (BEGINNER)</strong>. Upgrade ke{" "}
                <strong className="text-spark">Premium</strong> untuk membuka
                semua kursus tingkat Menengah dan Lanjutan, AI Course Generator,
                dan fitur eksklusif lainnya.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-spark hover:text-spark/80 transition-colors"
              >
                Lihat Paket Premium <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
