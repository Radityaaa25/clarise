"use client";

import { useState } from "react";
import { Search, BookOpen, Star, Filter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EnrollModal } from "@/components/course/enroll-modal";

// Placeholder data — will be replaced with real API calls
const categories = [
  { name: "Semua", slug: "all" },
  { name: "Pemrograman", slug: "pemrograman" },
  { name: "Matematika", slug: "matematika" },
  { name: "Sains", slug: "sains" },
  { name: "Bahasa", slug: "bahasa" },
  { name: "Desain", slug: "desain" },
  { name: "Bisnis", slug: "bisnis" },
];

const allCourses = [
  {
    title: "JavaScript Dasar",
    description: "Pelajari dasar-dasar bahasa pemrograman paling populer di dunia. Dari variabel hingga async/await.",
    difficulty: "BEGINNER",
    modules: 8,
    slug: "javascript-dasar",
    category: "pemrograman",
    rating: 4.8,
    isPremium: false,
  },
  {
    title: "React.js Modern",
    description: "Bangun antarmuka web modern dengan React hooks, context, dan server components.",
    difficulty: "INTERMEDIATE",
    modules: 12,
    slug: "reactjs-modern",
    category: "pemrograman",
    rating: 4.9,
    isPremium: false,
  },
  {
    title: "Python untuk Data Science",
    description: "Dari pandas hingga matplotlib. Kuasai analisis data dengan Python.",
    difficulty: "BEGINNER",
    modules: 10,
    slug: "python-data-science",
    category: "pemrograman",
    rating: 4.7,
    isPremium: true,
  },
  {
    title: "Aljabar Linear",
    description: "Vektor, matriks, transformasi linear — fondasi esensial untuk machine learning.",
    difficulty: "INTERMEDIATE",
    modules: 8,
    slug: "aljabar-linear",
    category: "matematika",
    rating: 4.5,
    isPremium: false,
  },
  {
    title: "Kalkulus I",
    description: "Limit, turunan, dan integral. Pengantar kalkulus untuk pemula.",
    difficulty: "BEGINNER",
    modules: 10,
    slug: "kalkulus-1",
    category: "matematika",
    rating: 4.6,
    isPremium: false,
  },
  {
    title: "Fisika Dasar",
    description: "Mekanika Newton, energi, dan gelombang. Fondasi fisika yang kokoh.",
    difficulty: "BEGINNER",
    modules: 9,
    slug: "fisika-dasar",
    category: "sains",
    rating: 4.4,
    isPremium: true,
  },
];

function difficultyBadge(difficulty: string) {
  const map: Record<string, { label: string; classes: string }> = {
    BEGINNER: { label: "Pemula", classes: "bg-success/10 text-success" },
    INTERMEDIATE: { label: "Menengah", classes: "bg-warning/10 text-warning" },
    ADVANCED: { label: "Mahir", classes: "bg-error/10 text-error" },
  };
  const d = map[difficulty] || map.BEGINNER!;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${d!.classes}`}>
      {d!.label}
    </span>
  );
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Enroll Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Mock User State (Replace with real data later)
  const isFreeUser = true;
  const hasReachedLimit = true; // Set to true to test block condition

  const handleCourseClick = (e: React.MouseEvent, course: any) => {
    e.preventDefault();
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleConfirmEnroll = () => {
    setIsLoading(true);
    // Mock API call delay
    setTimeout(() => {
      setIsLoading(false);
      setModalOpen(false);
      if (selectedCourse) {
        router.push(`/course/${selectedCourse.slug}`);
      }
    }, 1000);
  };

  const filteredCourses = allCourses.filter((c) => {
    const matchesCategory = activeCategory === "all" || c.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black font-heading text-ink dark:text-white mb-2">
          Jelajahi Kursus
        </h1>
        <p className="text-muted">
          Temukan materi yang sesuai dengan tujuan belajarmu.
        </p>
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
          {categories.map((cat) => (
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
        </div>
      </div>

      {/* Course Grid (1 col on mobile) */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <button
              key={course.slug}
              onClick={(e) => handleCourseClick(e, course)}
              className="group rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative text-left flex flex-col w-full h-full"
            >
              {course.isPremium && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-spark/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-spark">
                    Premium
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-muted bg-surface-soft dark:bg-white/5 px-2 py-0.5 rounded-full capitalize">
                  {course.category}
                </span>
                {difficultyBadge(course.difficulty)}
              </div>
              <h3 className="text-lg font-bold text-ink dark:text-white mb-2 group-hover:text-core-blue dark:group-hover:text-sky transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.modules} modul</span>
                </div>
                <div className="flex items-center gap-1 text-spark">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-12 text-center">
          <Search className="h-12 w-12 text-muted-soft mx-auto mb-4" />
          <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Tidak ditemukan</h3>
          <p className="text-muted">Coba ubah kata kunci atau kategori pencarianmu.</p>
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
        isLoading={isLoading}
      />
    </div>
  );
}
