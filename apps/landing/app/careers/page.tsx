import Link from "next/link";
import { ArrowLeft, Briefcase, Heart, Globe, Sparkles, Smile, Coffee, Map, BookOpen } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-canvas dark:bg-void relative overflow-hidden transition-colors selection:bg-core-blue/30 pb-32">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky/10 dark:bg-sky/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-core-blue/10 dark:bg-core-blue/20 rounded-full blur-[120px] pointer-events-none" />
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
      <section className="relative pt-32 md:pt-48 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 fade-in-up delay-100 mb-24">
        
        {/* Right: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/10 text-sky text-sm font-bold mb-6">
            <Briefcase className="w-4 h-4" />
            Karir di Clarise
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-ink dark:text-white tracking-tight leading-[1.2] mb-6">
            Jadilah Bagian dari <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-muted dark:from-white dark:to-white/50">
              Masa Depan Edukasi.
            </span>
          </h1>
          <p className="text-lg text-body dark:text-frost/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Kami adalah tim kecil yang hangat, suportif, dan terobsesi pada kualitas. Jika Anda suka memecahkan masalah rumit dan ingin karya Anda berdampak langsung pada ribuan pelajar, Anda berada di tempat yang tepat.
          </p>
        </div>

        {/* Left: Friendly Abstract Illustration */}
        <div className="flex-1 w-full max-w-md lg:max-w-none relative flex justify-center">
          <div className="relative w-full aspect-square max-w-[400px]">
            {/* Soft decorative shapes */}
            <div className="absolute inset-0 bg-gradient-to-tl from-sky/20 to-core-blue/20 rounded-[3rem] -rotate-6 animate-pulse" />
            <div className="absolute inset-0 bg-white dark:bg-void-elevated rounded-[3rem] rotate-3 border border-black/5 dark:border-white/10 shadow-xl flex items-center justify-center overflow-hidden">
              
              <div className="flex flex-col items-center text-center p-8 relative z-10">
                <div className="flex -space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-white dark:border-void-elevated bg-core-blue/20 flex items-center justify-center">
                    <Smile className="w-8 h-8 text-core-blue" />
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-white dark:border-void-elevated bg-sky/20 flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-sky" />
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-white dark:border-void-elevated bg-spark/20 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-spark" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-ink dark:text-white mb-2">Budaya Suportif</h3>
                <p className="text-sm text-body dark:text-frost/60">Lingkungan kerja yang mengutamakan kesejahteraan mental dan kreativitas Anda.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS GRID --- */}
      <section className="relative px-6 max-w-7xl mx-auto fade-in-up delay-300">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink dark:text-white mb-4">Mengapa Clarise?</h2>
          <p className="text-body dark:text-frost/60 max-w-2xl mx-auto">Kami merawat tim kami sama baiknya dengan kami merawat pengguna kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-white/[0.02] border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all text-center">
            <Map className="w-10 h-10 text-core-blue mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Kerja Fleksibel</h3>
            <p className="text-sm text-body dark:text-frost/70">WFA (Work From Anywhere). Bekerja dari kafe, rumah, atau pantai—pilihan Anda.</p>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-white/[0.02] border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all text-center">
            <Heart className="w-10 h-10 text-spark mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Asuransi Kesehatan</h3>
            <p className="text-sm text-body dark:text-frost/70">Perlindungan kesehatan penuh untuk Anda dan keluarga tercinta.</p>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-white/[0.02] border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all text-center">
            <Globe className="w-10 h-10 text-sky mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Jatah Cuti Melimpah</h3>
            <p className="text-sm text-body dark:text-frost/70">Istirahat itu penting. Kami tidak menghitung hari libur Anda.</p>
          </div>

          <div className="p-8 rounded-[2rem] bg-surface-soft dark:bg-white/[0.02] border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all text-center">
            <BookOpen className="w-10 h-10 text-core-blue mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Fasilitas Belajar</h3>
            <p className="text-sm text-body dark:text-frost/70">Buku, kursus, atau konferensi? Kami akan mendanai hasrat belajar Anda.</p>
          </div>

        </div>
      </section>

      {/* --- OPEN POSITIONS CTA --- */}
      <section className="relative px-6 max-w-4xl mx-auto mt-24 fade-in-up delay-500 text-center">
        <div className="p-12 rounded-[3rem] bg-gradient-to-br from-core-blue/10 to-sky/10 border border-core-blue/20">
          <h2 className="text-3xl font-bold text-ink dark:text-white mb-4">Mari Berbincang</h2>
          <p className="text-body dark:text-frost/70 mb-8 max-w-xl mx-auto">
            Kami mungkin belum membuka posisi yang spesifik saat ini, tetapi kami sangat suka mengobrol santai sambil minum kopi (virtual). Kirimkan profil Anda!
          </p>
          <a 
            href="mailto:helloclarise.official@gmail.com"
            className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-core-blue text-white font-bold hover:scale-105 transition-transform"
          >
            Kirimkan Sapaan
          </a>
        </div>
      </section>

    </main>
  );
}
