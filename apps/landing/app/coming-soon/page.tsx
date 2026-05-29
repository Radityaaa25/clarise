import { ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/arrow-button";

export const metadata = {
  title: "Coming Soon - Clarise",
  description: "Fitur premium Clarise sedang dalam tahap pengembangan.",
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas relative overflow-hidden">
      {/* Background gradients for aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-core-blue/15 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-sky/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        <div className="w-20 h-20 mb-8 rounded-full bg-core-blue/10 flex items-center justify-center">
          <Construction className="w-10 h-10 text-core-blue" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-ink dark:text-white mb-6">
          Fitur Premium Sedang{" "}
          <span className="text-core-blue">Dikembangkan!</span>
        </h1>

        <p className="text-lg text-ink/70 dark:text-white/70 mb-10 leading-relaxed max-w-xl mx-auto">
          Terima kasih atas antusiasme Anda! Kami sedang meracik sistem
          pembayaran dan fitur-fitur premium eksklusif agar pengalaman belajar
          Anda nantinya menjadi lebih sempurna. Pantau terus pembaruannya!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border-2 border-border font-bold text-ink dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <ArrowButton
            href={`${process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.my.id"}/sign-up`}
            className="px-8 py-3"
          >
            Coba Versi Gratis
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}
