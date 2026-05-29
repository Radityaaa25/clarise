import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export function PremiumLockOverlay({
  title = "Konten Premium",
}: {
  title?: string;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Heavy Blur Backdrop */}
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md" />

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-6 border border-yellow-500/30">
          <Lock className="w-8 h-8 text-yellow-500" />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-zinc-400 mb-8">
          Materi ini khusus untuk member Premium. Perpanjang langganan atau
          upgrade sekarang untuk membuka akses.
        </p>

        <div className="w-full flex flex-col gap-3">
          <Link
            href="/pricing"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/20"
          >
            <Sparkles className="w-5 h-5" />
            Upgrade ke Premium
          </Link>
          <Link
            href="/explore"
            className="w-full py-4 rounded-xl font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
          >
            Kembali ke Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
