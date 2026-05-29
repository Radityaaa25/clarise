import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Target,
  Globe,
  Heart,
  BookOpen,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-canvas dark:bg-void relative overflow-hidden transition-colors selection:bg-core-blue/30 pb-32">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-core-blue/10 dark:bg-core-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky/10 dark:bg-sky/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* --- MINIMALIST NAV --- */}
      <nav className="absolute top-0 inset-x-0 p-6 z-50 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink dark:text-frost/60 dark:hover:text-white transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Beranda
        </Link>
      </nav>

      {/* --- HERO SPLIT SECTION --- */}
      <section className="relative pt-32 md:pt-48 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 fade-in-up delay-100 mb-24">
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-core-blue/10 dark:bg-sky/10 text-core-blue dark:text-sky text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Cerita Clarise
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-ink dark:text-white tracking-tight leading-[1.2] mb-6">
            Membangun Jembatan <br className="hidden lg:block" />
            Menuju{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-blue to-sky">
              Potensi Anda.
            </span>
          </h1>
          <p className="text-lg text-body dark:text-frost/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Clarise tidak didirikan sekadar untuk menjadi platform kursus. Kami
            hadir karena sebuah keyakinan sederhana:{" "}
            <strong>Setiap orang belajar dengan cara yang unik.</strong> Kami
            menyatukan teknologi AI tercanggih dengan empati pengajaran untuk
            menciptakan tutor pribadi yang tak kenal lelah.
          </p>
        </div>

        {/* Right: Friendly Abstract Illustration */}
        <div className="flex-1 w-full max-w-md lg:max-w-none relative flex justify-center">
          <div className="relative w-full aspect-square max-w-[400px]">
            {/* Soft decorative shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-core-blue/20 to-sky/20 rounded-[3rem] rotate-6 animate-pulse" />
            <div className="absolute inset-0 bg-white dark:bg-void-elevated rounded-[3rem] -rotate-3 border border-black/5 dark:border-white/10 shadow-xl flex items-center justify-center overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky/30 blur-2xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-core-blue/30 blur-2xl rounded-full" />

              <div className="grid grid-cols-2 gap-4 p-8 w-full h-full relative z-10">
                <div className="bg-surface-soft dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2">
                  <Users className="w-8 h-8 text-core-blue" />
                  <span className="text-xs font-bold text-ink dark:text-white">
                    Komunitas
                  </span>
                </div>
                <div className="bg-surface-soft dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 translate-y-6">
                  <Target className="w-8 h-8 text-spark" />
                  <span className="text-xs font-bold text-ink dark:text-white">
                    Fokus
                  </span>
                </div>
                <div className="bg-surface-soft dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 -translate-y-4">
                  <BookOpen className="w-8 h-8 text-sky" />
                  <span className="text-xs font-bold text-ink dark:text-white">
                    Belajar
                  </span>
                </div>
                <div className="bg-surface-soft dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 translate-y-2">
                  <Globe className="w-8 h-8 text-core-blue" />
                  <span className="text-xs font-bold text-ink dark:text-white">
                    Akses Global
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="relative px-6 max-w-7xl mx-auto fade-in-up delay-300">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink dark:text-white mb-4">
            Nilai Inti Clarise
          </h2>
          <p className="text-body dark:text-frost/60 max-w-2xl mx-auto">
            Prinsip yang membimbing setiap keputusan dan baris kode yang kami
            tulis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-void-elevated border border-hairline dark:border-white/5 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-core-blue/10 flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-core-blue" />
            </div>
            <h3 className="text-xl font-bold text-ink dark:text-white mb-3">
              Empati dalam Edukasi
            </h3>
            <p className="text-body dark:text-frost/70">
              AI kami tidak sekadar memberi jawaban, tetapi dirancang untuk
              memahami kesulitan belajar dan membimbing dengan sabar layaknya
              tutor manusia terbaik.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-void-elevated border border-hairline dark:border-white/5 text-center translate-y-0 md:translate-y-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-sky/10 flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-sky" />
            </div>
            <h3 className="text-xl font-bold text-ink dark:text-white mb-3">
              Akses Tanpa Batas
            </h3>
            <p className="text-body dark:text-frost/70">
              Pendidikan premium tidak boleh menjadi hak istimewa segelintir
              orang. Kami menembus batasan geografis dan finansial melalui
              teknologi.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-void-elevated border border-hairline dark:border-white/5 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-spark/10 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-spark" />
            </div>
            <h3 className="text-xl font-bold text-ink dark:text-white mb-3">
              Inovasi Berkelanjutan
            </h3>
            <p className="text-body dark:text-frost/70">
              Kami tidak pernah berhenti bereksperimen. AI berkembang sangat
              cepat, dan kami pastikan pelajar Clarise selalu mendapatkan
              teknologi terdepan.
            </p>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative px-6 max-w-4xl mx-auto mt-32 mb-16 fade-in-up delay-500 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-ink dark:text-white mb-8">
          Siap Memulai Perjalanan Anda?
        </h2>
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/sign-up`}
          className="inline-flex items-center justify-center h-16 px-10 rounded-full bg-core-blue text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-core-blue/30"
        >
          Dapatkan Clarise Secara Gratis
        </Link>
      </section>
    </main>
  );
}
