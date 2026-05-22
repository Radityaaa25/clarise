import { ArrowRight, Sparkles, BookOpen, Trophy, Play, Search, GraduationCap, CheckCircle2 } from "lucide-react";
import { AppPreview } from "@/components/sections/app-preview";
import { ArrowButton } from "@/components/ui/arrow-button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-void overflow-hidden transition-colors relative">
      {/* ── GLOBAL AURORA BACKGROUND ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-core-blue/30 dark:bg-core-blue/40 blur-[100px] animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-sky/30 dark:bg-sky/40 blur-[90px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-500/30 dark:bg-indigo-500/40 blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="fade-in-up relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-core-blue/20 dark:border-core-blue/40 bg-core-blue/5 dark:bg-core-blue/10 px-4 py-1.5 text-sm font-bold text-core-blue dark:text-sky mb-8">
          <Sparkles size={16} />
          <span>Learn anything. Understand everything.</span>
        </div>

        <h1 className="fade-in-up delay-100 text-5xl md:text-7xl font-black font-heading text-ink dark:text-white mb-6 max-w-4xl leading-tight tracking-tight">
          Tingkatkan Skill Kamu dengan <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-blue to-sky">
            AI-Powered
          </span>{" "}
          Precision
        </h1>

        <p className="fade-in-up delay-200 text-body dark:text-frost/80 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
          Experience a personalized learning journey yang menyesuaikan dengan
          gaya belajarmu. Kumpulkan pencapaian, pertahankan streak, dan level up
          karirmu sekarang.
        </p>

        <div className="fade-in-up delay-200 flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-sm md:text-base text-ink/80 dark:text-frost/80 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-core-blue dark:text-sky" />
            <span>Explained, not just watched</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-core-blue dark:text-sky" />
            <span>Your learning, your pace</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-core-blue dark:text-sky" />
            <span>Clarity guaranteed</span>
          </div>
        </div>

        <div className="fade-in-up delay-300 flex flex-col sm:flex-row items-center gap-4">
          {/* Mulai Gratis — split arrow animation */}
          <ArrowButton
            href={`${process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.my.id"}/sign-up`}>
            Mulai Gratis
          </ArrowButton>
          {/* Pelajari Lebih Lanjut — simple outline, no arrow */}
          <a href="#features" className="btn-outline-capsule px-8 py-3.5">
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      {/* ── APP PREVIEW SECTION ── */}
      <section className="relative px-4 pb-24 z-10">
        <AppPreview />
      </section>

      {/* ── FEATURES SECTION (Asymmetrical Grid) ── */}
      <section id="features" className="fade-in-up py-24 px-6 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-core-blue/20 bg-core-blue/5 px-4 py-1.5 text-sm font-bold text-core-blue dark:text-sky mb-4">
              <span>Keunggulan Kami</span>
            </div>
            <h2 className="text-3xl font-black md:text-5xl font-heading text-ink dark:text-white">
              Kenapa Memilih Clarise?
            </h2>
            <p className="mt-4 text-body dark:text-frost/80 text-lg max-w-2xl mx-auto">
              Dibangun dengan teknologi terbaru untuk memberikan pengalaman
              belajar yang super interaktif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Top Card */}
            <div className="col-span-1 md:col-span-12 rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-void-elevated p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-core-blue/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
              <div className="relative z-10 max-w-2xl">
                <div className="mb-6 inline-flex rounded-2xl bg-core-blue/10 p-4">
                  <Play className="h-8 w-8 text-core-blue" />
                </div>
                <h3 className="text-3xl font-bold font-heading text-ink dark:text-white mb-4">
                  Personalized Path
                </h3>
                <p className="text-body dark:text-frost/70 text-lg leading-relaxed">
                  Konten adaptif yang menyesuaikan dengan kecepatan dan gaya
                  belajarmu secara real-time. Whether you are a fast learner or
                  need more time, Clarise menyiapkan kurikulum khusus untukmu.
                </p>
              </div>
            </div>

            {/* Two Small Cards */}
            <div className="col-span-1 md:col-span-6 rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-void-elevated p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="mb-6 inline-flex rounded-2xl bg-sky/10 p-4">
                <BookOpen className="h-7 w-7 text-sky" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-3">
                Structured Courses
              </h3>
              <p className="text-body dark:text-frost/70 leading-relaxed">
                Jalur belajar terstruktur dari beginner hingga advanced,
                dikurasi dari ribuan sumber berkualitas tinggi oleh AI kami.
              </p>
            </div>

            <div className="col-span-1 md:col-span-6 rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-void-elevated p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="mb-6 inline-flex rounded-2xl bg-indigo-500/10 p-4">
                <Trophy className="h-7 w-7 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-3">
                Gamified Progress
              </h3>
              <p className="text-body dark:text-frost/70 leading-relaxed">
                Dapatkan XP, kumpulkan badge, dan pertahankan streak harianmu.
                Learning has never been this addictive and rewarding.
              </p>
            </div>

            {/* Giant Horizontal Card */}
            <div className="col-span-1 md:col-span-12 rounded-3xl border border-core-blue/20 bg-core-blue text-white p-8 md:p-12 shadow-xl hover:shadow-2xl hover:shadow-core-blue/20 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mb-20" />
              <div className="relative z-10 max-w-xl">
                <div className="mb-6 inline-flex rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Your Personal AI Tutor
                </h3>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Dapatkan bantuan instan saat kamu kebingungan. Hover kode
                  untuk melihat penjelasan, atau tanyakan apapun ke AI Tutor
                  yang siap membantumu 24/7 dengan konteks yang akurat.
                </p>
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.my.id"}/sign-up`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-core-blue transition-all hover:bg-white/90">
                  Try AI Tutor
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="relative z-10 w-full md:w-[400px] h-[250px] bg-void rounded-2xl border border-white/20 p-4 flex flex-col shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-white/50 ml-2 font-mono">
                    Clarise AI
                  </span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-sky">User: What does this line do?</div>
                  <div className="text-white/80 bg-white/5 p-2 rounded">
                    <span className="text-core-blue font-bold">AI:</span> This
                    const declaration uses a closure to maintain state...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="px-6 py-24 relative z-10 transition-colors">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black md:text-5xl font-heading text-ink dark:text-white">
              How It Works
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-core-blue/0 via-core-blue/30 to-core-blue/0" />

            {[
              {
                step: "01",
                icon: Search,
                title: "Choose a Topic",
                desc: "Pilih dari kategori yang sudah dikurasi, or generate a custom course with AI.",
              },
              {
                step: "02",
                icon: BookOpen,
                title: "Learn Interactively",
                desc: "Pelajari materi, tonton video, and ask the AI Tutor questions anytime.",
              },
              {
                step: "03",
                icon: GraduationCap,
                title: "Earn Certificates",
                desc: "Selesaikan modul, kumpulkan XP, and prove your knowledge with exclusive badges.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative text-center flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-void border-2 border-core-blue/20 flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-core-blue/5">
                  <item.icon className="h-10 w-10 text-core-blue" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-sky text-white flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-heading text-ink dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-body dark:text-frost/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER (Massive Glow) ── */}
      <section className="fade-in-up relative py-32 px-6 overflow-hidden flex flex-col items-center justify-center text-center z-10 transition-colors">
        {/* Massive Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-core-blue/15 dark:bg-core-blue/25 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />

        <h2 className="text-4xl md:text-6xl font-black font-heading text-ink dark:text-white mb-6 max-w-3xl leading-tight">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-body dark:text-frost/80 text-lg mb-10 max-w-xl">
          Gabung bersama ribuan pembelajar lainnya yang sudah memperbarui skill
          mereka dengan Clarise.
        </p>

        <ArrowButton
          href={`${process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.my.id"}/sign-up`}
          className="px-16 py-3 text-[15px]">
          Mulai Gratis Sekarang
        </ArrowButton>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 bg-white/50 dark:bg-void/80 backdrop-blur-xl border-t border-hairline px-6 pt-12 md:pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
            <div className="col-span-1 md:col-span-4 flex flex-col">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/logoLM.png"
                  alt="Clarise Logo"
                  width={120}
                  height={40}
                  className="w-[100px] md:w-[120px] h-auto -mt-10 dark:hidden"
                />
                <Image
                  src="/logoDM.png"
                  alt="Clarise Logo"
                  width={120}
                  height={40}
                  className="w-[100px] md:w-[120px] h-auto -mt-10 hidden dark:block"
                />
              </Link>
              <p className="text-body dark:text-white/60 leading-relaxed mb-6 -mt-14">
                Learn anything. Understand everything.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h4 className="font-bold text-ink dark:text-white mb-4">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-body dark:text-white/60">
                <li>
                  <a
                    href="#features"
                    className="hover:text-ink dark:hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-ink dark:hover:text-white transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-ink dark:hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h4 className="font-bold text-ink dark:text-white mb-4">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-body dark:text-white/60">
                <li>
                  <a
                    href="#"
                    className="hover:text-ink dark:hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-ink dark:hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-ink dark:hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-4 lg:col-span-3">
              <h4 className="font-bold text-ink dark:text-white mb-4">
                Support
              </h4>
              <p className="text-sm text-body dark:text-white/60 mb-4">
                Need help? We are here for you.
              </p>
              <a
                href="#"
                className="text-sm font-bold text-core-blue dark:text-sky hover:text-ink dark:hover:text-white transition-colors">
                support@clarise.com
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-hairline text-center md:text-left">
            <p className="text-sm text-body dark:text-white/40">
              &copy; {new Date().getFullYear()} Clarise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
