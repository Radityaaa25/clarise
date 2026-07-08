import { Star, Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

type Testimonial = {
  id: string;
  rating: number;
  message: string;
  authorName: string | null;
  authorRole: string | null;
};

type FeedbackData = {
  averageRating: number;
  totalRatings: number;
  testimonials: Testimonial[];
};

const FALLBACK: FeedbackData = {
  averageRating: 4.9,
  totalRatings: 0,
  testimonials: [
    {
      id: "f1",
      rating: 5,
      message:
        "Penjelasannya benar-benar mudah dipahami. AI Tutor-nya membantu banget tiap aku stuck di materi.",
      authorName: "Rizki Pratama",
      authorRole: "Mahasiswa Informatika",
    },
    {
      id: "f2",
      rating: 5,
      message:
        "Belajar coding jadi nggak membosankan karena ada XP, streak, dan badge. Bikin nagih!",
      authorName: "Dewi Lestari",
      authorRole: "Career Switcher",
    },
    {
      id: "f3",
      rating: 5,
      message:
        "Fitur generate course dengan AI luar biasa. Aku bisa belajar topik spesifik sesuai kebutuhan kerjaan.",
      authorName: "Andi Saputra",
      authorRole: "Frontend Developer",
    },
    {
      id: "f4",
      rating: 5,
      message:
        "Materinya terstruktur banget, cocok buat pemula kayak aku yang baru pertama kali belajar programming.",
      authorName: "Siti Rahmawati",
      authorRole: "Mahasiswa Sistem Informasi",
    },
    {
      id: "f5",
      rating: 5,
      message:
        "Gamifikasi XP dan streak-nya bikin semangat belajar tiap hari. Udah 2 bulan streak nggak putus!",
      authorName: "Budi Hartono",
      authorRole: "Software Engineer",
    },
    {
      id: "f6",
      rating: 5,
      message:
        "Kursus yang di-generate AI sesuai banget sama kebutuhan project kantor. Recommended banget!",
      authorName: "Maya Indah",
      authorRole: "UI/UX Designer",
    },
  ],
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex flex-col h-full">
      <Quote className="h-7 w-7 text-core-blue/30 mb-3 shrink-0" />
      <div className="flex items-center gap-1 mb-3 shrink-0">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-4 w-4 ${
              s <= t.rating
                ? "fill-warning text-warning"
                : "fill-transparent text-muted-soft"
            }`}
          />
        ))}
      </div>
      <p className="text-body dark:text-frost/80 leading-relaxed flex-1 min-h-0 text-sm md:text-base">
        &ldquo;{t.message}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-auto shrink-0 pt-4">
        <div className="h-10 w-10 rounded-full bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky flex items-center justify-center font-black font-heading shrink-0">
          {(t.authorName || "C").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-ink dark:text-white truncate text-sm">
            {t.authorName || "Pengguna Clarise"}
          </div>
          {t.authorRole && (
            <div className="text-xs text-muted truncate">
              {t.authorRole}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function UserRatings() {
  let data: FeedbackData = FALLBACK;

  try {
    const res = await fetch(`${APP_URL}/api/feedback/public`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.testimonials && json.testimonials.length > 0) {
        data = json;
      } else if (json.totalRatings > 0) {
        data = { ...FALLBACK, ...json, testimonials: FALLBACK.testimonials };
      }
    }
  } catch (error) {
    console.error("Failed to fetch testimonials", error);
  }

  const avg = data.averageRating || 4.9;

  const cards = data.testimonials.map((t) => (
    <div
      key={t.id}
      className="rounded-2xl border border-hairline bg-white dark:bg-void-elevated p-6 h-[280px]"
    >
      <TestimonialCard t={t} />
    </div>
  ));

  return (
    <section id="testimoni" className="relative z-10 transition-colors">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-core-blue/20 bg-core-blue/5 dark:bg-core-blue/10 px-4 py-1.5 text-sm font-bold text-core-blue dark:text-sky mb-4">
          Kata Mereka
        </div>
        <h2 className="text-3xl font-black md:text-5xl font-heading text-ink dark:text-white mb-4">
          Dipercaya Para Pembelajar
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-5 w-5 ${
                  s <= Math.round(avg)
                    ? "fill-warning text-warning"
                    : "fill-transparent text-muted-soft"
                }`}
              />
            ))}
          </div>
          <span className="text-body dark:text-frost/80 font-medium">
            <span className="font-black text-ink dark:text-white">
              {avg.toFixed(1)}
            </span>
            {data.totalRatings > 0 && (
              <> dari {data.totalRatings} penilaian</>
            )}
          </span>
        </div>
      </div>

      <Marquee items={cards} speed={28} />
    </section>
  );
}
