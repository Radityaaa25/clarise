import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Server,
  Trash2,
  Mail,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-canvas dark:bg-void relative overflow-hidden transition-colors selection:bg-core-blue/30 pb-32">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky/10 dark:bg-sky/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-core-blue/10 dark:bg-core-blue/20 rounded-full blur-[120px] pointer-events-none" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-core-blue/10 dark:bg-white/5 text-core-blue dark:text-white text-sm font-bold mb-6 border border-core-blue/20 dark:border-white/10">
            <ShieldCheck className="w-4 h-4" />
            Keamanan Data Anda
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-ink dark:text-white tracking-tight leading-[1.2] mb-6">
            Kami Melindungi <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-blue to-sky">
              Privasi Anda.
            </span>
          </h1>
          <p className="text-lg text-body dark:text-frost/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Di Clarise, data Anda bukanlah komoditas untuk dijual. Kami
            menggunakannya secara eksklusif untuk satu tujuan:{" "}
            <strong>Menjadikan AI Tutor Anda lebih cerdas dan personal.</strong>
          </p>
        </div>

        {/* Right: Security Graphic */}
        <div className="flex-1 w-full max-w-md lg:max-w-none relative flex justify-center">
          <div className="relative w-full aspect-square max-w-[400px]">
            {/* Soft decorative shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-core-blue/20 to-sky/20 rounded-full animate-pulse blur-xl" />
            <div className="absolute inset-8 bg-white dark:bg-void-elevated rounded-[3rem] border border-black/5 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 relative z-10 overflow-hidden">
              <div className="w-24 h-24 bg-core-blue/10 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-12 h-12 text-core-blue" />
              </div>
              <h3 className="font-bold text-ink dark:text-white mb-2 text-xl">
                Enkripsi Berlapis
              </h3>
              <p className="text-sm text-center text-body dark:text-frost/60">
                Setiap percakapan Anda dengan AI diamankan menggunakan protokol
                standar industri tertinggi.
              </p>
              {/* Decorative elements */}
              <div className="absolute -right-4 top-1/4 w-12 h-12 bg-sky/20 rounded-full blur-md" />
              <div className="absolute -left-4 bottom-1/4 w-12 h-12 bg-spark/20 rounded-full blur-md" />
            </div>
          </div>
        </div>
      </section>

      {/* --- DATA LIFECYCLE GRID --- */}
      <section className="relative px-6 max-w-7xl mx-auto fade-in-up delay-300 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink dark:text-white mb-4">
            Siklus Hidup Data
          </h2>
          <p className="text-body dark:text-frost/60 max-w-2xl mx-auto">
            Kami transparan tentang apa yang kami kumpulkan dan ke mana perginya
            data tersebut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-white/[0.02] border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all text-center group">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-core-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Database className="w-8 h-8 text-core-blue" />
            </div>
            <h3 className="text-xl font-bold text-ink dark:text-white mb-3">
              1. Pengumpulan
            </h3>
            <p className="text-body dark:text-frost/70 text-sm">
              Kami hanya menyimpan informasi mendasar: Email Anda untuk login,
              dan riwayat belajar/kuis untuk menyesuaikan tingkat kesulitan
              materi.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-white/[0.02] border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all text-center group relative md:-translate-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-sky/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Server className="w-8 h-8 text-sky" />
            </div>
            <h3 className="text-xl font-bold text-ink dark:text-white mb-3">
              2. Pemrosesan
            </h3>
            <p className="text-body dark:text-frost/70 text-sm">
              Pertanyaan Anda ke AI diproses secara anonim. Identitas asli Anda
              dilucuti sebelum dikirim ke mesin kecerdasan buatan, memastikan
              kerahasiaan absolut.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-white/[0.02] border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all text-center group">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-error/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trash2 className="w-8 h-8 text-error" />
            </div>
            <h3 className="text-xl font-bold text-ink dark:text-white mb-3">
              3. Penghapusan
            </h3>
            <p className="text-body dark:text-frost/70 text-sm">
              Anda memegang kendali penuh. Jika Anda menghapus akun, seluruh
              data dan riwayat Anda akan musnah secara permanen dari server kami
              dalam 30 hari.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTACT SUPPORT SECTION --- */}
      <section className="relative px-6 max-w-4xl mx-auto fade-in-up delay-500 text-center">
        <div className="p-12 rounded-[3rem] bg-gradient-to-br from-white to-surface-soft dark:from-void-elevated dark:to-void border border-black/5 dark:border-white/5 shadow-xl">
          <div className="w-16 h-16 mx-auto bg-core-blue rounded-full flex items-center justify-center mb-6 shadow-lg shadow-core-blue/30">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-ink dark:text-white mb-4">
            Punya Pertanyaan Spesifik?
          </h2>
          <p className="text-body dark:text-frost/70 mb-8 max-w-lg mx-auto">
            Tim kepatuhan dan privasi data kami selalu bersedia mendengarkan
            Anda. Hubungi kami kapan saja.
          </p>
          <a
            href="mailto:helloclarise.official@gmail.com"
            className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold hover:scale-105 transition-transform"
          >
            Hubungi Tim Privasi
          </a>
        </div>
      </section>
    </main>
  );
}
