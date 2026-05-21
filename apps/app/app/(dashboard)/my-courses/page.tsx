"use client";

import { BookOpen, Star, Clock, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

// Placeholder — will be replaced with real data from API
const enrolledCourse = { slug: "javascript-dasar", title: "JavaScript Dasar", description: "Pelajari dasar-dasar bahasa pemrograman paling populer di dunia." };

export default function MyCoursesPage() {
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

        {enrolledCourse ? (
          <Link href={`/course/${enrolledCourse.slug}`} className="block rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold font-heading text-ink dark:text-white mb-2">{enrolledCourse.title}</h3>
            <p className="text-muted dark:text-frost/80 mb-4">{enrolledCourse.description}</p>
            <div className="flex items-center text-core-blue font-bold text-sm">
              Lanjutkan Belajar <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        ) : (
          <div className="rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-soft mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink dark:text-white mb-2">
              Belum ada kursus aktif
            </h3>
            <p className="text-muted mb-2">
              Kamu belum mengambil kursus apapun.
            </p>
            <p className="text-sm text-muted-soft mb-6">
              Pengguna gratis hanya dapat mengambil <strong className="text-ink dark:text-white">1 kursus</strong>. Upgrade ke Premium untuk akses unlimited!
            </p>
            <div className="flex justify-center gap-3">
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
      <section className="rounded-xl border border-spark/20 bg-spark/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-spark/10">
            <Lock className="h-5 w-5 text-spark" />
          </div>
          <div>
            <h3 className="font-bold text-ink dark:text-white mb-1">Batasan Akun Gratis</h3>
            <p className="text-sm text-muted leading-relaxed">
              Dengan akun gratis, kamu hanya bisa mengambil <strong>1 kursus aktif</strong> dan tidak bisa berpindah ke kursus lain.
              Upgrade ke <strong className="text-spark">Premium</strong> untuk mendapatkan akses unlimited, AI Course Generator, dan fitur eksklusif lainnya.
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
    </div>
  );
}
