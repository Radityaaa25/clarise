import Link from "next/link";
import { Ghost, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Halaman Tidak Ditemukan",
  description: "Halaman yang Anda cari tidak dapat ditemukan.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas relative overflow-hidden">
      {/* Aesthetic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-core-blue/15 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-sky/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        <div className="w-24 h-24 mb-8 rounded-full bg-red-500/10 flex items-center justify-center animate-bounce">
          <Ghost className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-6xl sm:text-7xl font-black text-ink dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white mb-6">
          Wah, Anda Tersesat! 👻
        </h2>
        
        <p className="text-lg text-ink/70 dark:text-white/70 mb-10 leading-relaxed max-w-xl mx-auto">
          Halaman yang Anda tuju sepertinya sudah dihapus, dipindahkan, atau memang tidak pernah ada. Jangan khawatir, mari kembali ke jalan yang benar!
        </p>

        <Link 
          href="/" 
          className="px-8 py-4 rounded-xl bg-core-blue text-white font-bold hover:bg-core-blue/90 transition-all shadow-lg shadow-core-blue/20 flex items-center gap-2 hover:-translate-y-1"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Beranda Utama
        </Link>
      </div>
    </div>
  );
}
