"use client";

import { useState } from "react";
import {
  Search,
  BookOpen,
  Star,
  Filter,
  Sparkles,
  MoreHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EnrollModal } from "@/components/course/enroll-modal";
import { useCourses } from "@/hooks/use-courses";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import useSWR, { preload } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function difficultyBadge(difficulty: string) {
  const map: Record<string, { label: string; classes: string }> = {
    BEGINNER: { label: "Pemula", classes: "bg-success/10 text-success" },
    INTERMEDIATE: { label: "Menengah", classes: "bg-warning/10 text-warning" },
    ADVANCED: { label: "Mahir", classes: "bg-error/10 text-error" },
  };
  const d = map[difficulty] || map.BEGINNER!;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${d!.classes}`}
    >
      {d!.label}
    </span>
  );
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch courses via SWR
  const {
    courses,
    nextCursor,
    isLoading: isCoursesLoading,
  } = useCourses({
    category: activeCategory !== "all" ? activeCategory : null,
    search: debouncedSearch || null,
    limit: 12,
  });

  // Fetch Categories dynamically
  const { data: catData } = useSWR("/api/categories", fetcher);
  const allCategories = catData?.categories || [];

  // Derived arrays
  const categoriesList = [
    { name: "Semua", slug: "all" },
    ...allCategories.map((c: any) => ({ name: c.name, slug: c.slug })),
  ];

  // Pisahkan kategori teratas (top 4) dan sisanya
  const topCategories = categoriesList.slice(0, 5); // 1 Semua + 4 kategori teratas
  const restCategories = categoriesList.slice(5);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const filteredRestCategories = restCategories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  // Enroll Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch active courses to check limit
  const { data: progressData, mutate: mutateActiveCourses } = useSWR(
    "/api/progress/active",
    fetcher,
  );
  const activeCourses = progressData?.activeCourses || [];

  // User State
  const { user } = useUser();
  const isFreeUser = user?.subscription?.plan === "FREE" || !user?.subscription;
  const hasReachedLimit = activeCourses.length >= 2; // Free tier: max 2 kursus (1 free + 1 premium, atau 2 free)

  const handleCourseClick = (e: React.MouseEvent, course: any) => {
    e.preventDefault();
    const isEnrolled = activeCourses.some((c: any) => c.slug === course.slug);
    if (isEnrolled) {
      router.push(`/course/${course.slug}`);
      return;
    }
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleConfirmEnroll = async () => {
    setIsLoading(true);
    try {
      if (selectedCourse) {
        const res = await fetch(`/api/courses/${selectedCourse.slug}/enroll`, {
          method: "POST",
        });
        const data = await res.json();

        if (res.ok && data.success) {
          // Preload course detail ke SWR cache sebelum navigasi.
          // Saat course page mount, useSWR langsung dapat cache hit
          // (atau subscribe ke fetch yang sedang in-flight) — hemat
          // satu round-trip dari perspektif user.
          preload(`/api/courses/${selectedCourse.slug}`, fetcher);

          // Fire-and-forget — refresh active courses tidak perlu di-await
          // sebelum navigasi. SWR akan revalidate di background.
          mutateActiveCourses();

          router.push(`/course/${selectedCourse.slug}`);
          // Jangan matikan isLoading agar tombol tetap bertuliskan 'Memproses...'
          // sampai navigasi selesai.
        } else {
          console.error("Enrollment failed:", data.error);
          toast.error(data.error || "Gagal mengambil kursus");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Terjadi kesalahan saat mengambil kursus");
      setIsLoading(false);
    }
  };

  const filteredCourses = courses || [];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-black font-heading text-ink dark:text-white mb-2">
            Jelajahi Kursus
          </h1>
          <p className="text-muted text-sm md:text-base">
            Temukan materi yang sesuai dengan tujuan belajarmu.
          </p>
        </div>

        {/* Create AI Course Button */}
        {!isFreeUser && (
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-spark to-core-blue hover:from-spark/90 hover:to-core-blue/90 text-white px-5 h-11 rounded-xl font-bold shadow-lg shadow-spark/20 transition-all hover:-translate-y-0.5 shrink-0 w-full md:w-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span className="hidden sm:inline">Buat Kursus dengan AI</span>
            <span className="sm:hidden">Buat dengan AI</span>
          </Link>
        )}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Cari kursus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 rounded-xl border border-hairline bg-canvas dark:bg-void-elevated pl-10 pr-4 text-sm text-ink dark:text-white placeholder:text-muted-soft focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Pills (Mobile horizontal scroll) */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:pb-0">
        <div className="flex gap-2 w-max sm:w-auto">
          {topCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap border ${
                activeCategory === cat.slug
                  ? "bg-core-blue text-white border-core-blue shadow-md shadow-core-blue/30"
                  : "bg-surface-soft dark:bg-void-elevated text-sky dark:text-sky border-hairline dark:border-white/10 hover:text-core-blue dark:hover:text-sky hover:border-core-blue dark:hover:border-sky hover:shadow-[0_0_10px_rgba(26,127,204,0.35)] dark:hover:shadow-[0_0_10px_rgba(77,184,255,0.35)]"
              }`}
            >
              {cat.name}
            </button>
          ))}

          {restCategories.length > 0 && (
            <button
              onClick={() => setShowCategoryModal(true)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap border bg-surface-soft dark:bg-void-elevated text-sky dark:text-sky border-hairline dark:border-white/10 hover:text-core-blue dark:hover:text-sky hover:border-core-blue flex items-center gap-2"
            >
              <MoreHorizontal className="w-4 h-4" /> Lainnya
            </button>
          )}
        </div>
      </div>

      {/* Course Grid (1 col on mobile) */}
      {isCoursesLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-core-blue" />
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course: any) => {
            const isEnrolled = activeCourses.some((c: any) => c.slug === course.slug);
            return (
              <button
                key={course.slug}
                onClick={(e) => handleCourseClick(e, course)}
                className="group rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative text-left flex flex-col w-full h-full"
              >
                {course.isPremium && !isEnrolled && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-spark/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-spark">
                      Premium
                    </span>
                  </div>
                )}
                {isEnrolled && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-core-blue/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-core-blue">
                      Telah Diambil
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-muted bg-surface-soft dark:bg-white/5 px-2 py-0.5 rounded-full capitalize">
                    {typeof course.category === "object"
                      ? course.category.name
                      : course.category}
                  </span>
                  {difficultyBadge(course.difficulty)}
                </div>
                <h3 className="text-lg font-bold text-ink dark:text-white mb-2 group-hover:text-core-blue dark:group-hover:text-sky transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm mt-auto">
                  <div className="flex items-center gap-1 text-muted">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.totalModules || 0} modul</span>
                  </div>
                  {isEnrolled ? (
                    <div className="flex items-center gap-1 text-core-blue font-bold">
                      <span>Lanjutkan</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-spark">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">
                        {course.rating?.toFixed(1) || "5.0"}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-12 text-center">
          <Search className="h-12 w-12 text-muted-soft mx-auto mb-4" />
          <h3 className="text-lg font-bold text-ink dark:text-white mb-2">
            Tidak ditemukan
          </h3>
          <p className="text-muted">
            Coba ubah kata kunci atau kategori pencarianmu.
          </p>
        </div>
      )}

      {/* Load More Button (If has cursor) */}
      {!isCoursesLoading && nextCursor && (
        <div className="flex justify-center pt-4">
          <button className="px-6 py-2.5 rounded-full border border-hairline bg-canvas dark:bg-void-elevated text-sm font-bold text-ink dark:text-white hover:border-core-blue hover:text-core-blue transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      )}

      {/* Enroll Modal */}
      <EnrollModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmEnroll}
        courseName={selectedCourse?.title || ""}
        isFreeUser={isFreeUser}
        hasReachedLimit={hasReachedLimit}
        isPremiumCourse={selectedCourse?.isPremium || false}
        isLoading={isLoading}
      />

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-canvas dark:bg-void rounded-2xl shadow-2xl border border-hairline w-full max-w-lg max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-hairline flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold font-heading text-ink dark:text-white">
                Semua Kategori
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="p-2 rounded-full hover:bg-surface-soft dark:hover:bg-white/5 text-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-4 border-b border-hairline shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Cari kategori... (Contoh: Web Development)"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full h-11 rounded-xl border border-hairline bg-surface-soft dark:bg-void-elevated pl-10 pr-4 text-sm text-ink dark:text-white placeholder:text-muted focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
              {filteredRestCategories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {filteredRestCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setActiveCategory(cat.slug);
                        setShowCategoryModal(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                        activeCategory === cat.slug
                          ? "bg-core-blue text-white border-core-blue shadow-md shadow-core-blue/30"
                          : "bg-surface-soft dark:bg-void-elevated text-sky dark:text-sky border-hairline hover:border-core-blue hover:text-core-blue"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-muted">
                  Kategori tidak ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
