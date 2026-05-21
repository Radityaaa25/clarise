"use client";
import { CheckCircle2, Zap } from "lucide-react";

export default function AppPricingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-core-blue dark:text-sky mb-6">
          <Zap className="h-4 w-4" />
          <span>Langganan Clarise</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-heading text-ink dark:text-white mb-4">
          Tingkatkan level belajarmu.
        </h1>
        <p className="text-body dark:text-frost/80 text-lg">
          Dapatkan akses tak terbatas ke semua materi premium dan AI mentoring eksklusif.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Free Tier */}
        <div className="rounded-3xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-8 flex flex-col transition-colors">
          <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">Basic</h3>
          <p className="text-body dark:text-frost/60 mb-6">Paket saat ini. Cocok buat belajar dasar.</p>
          <div className="mb-8">
            <span className="text-5xl font-black text-ink dark:text-white">Rp 0</span>
            <span className="text-body dark:text-frost/50">/selamanya</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {["Akses ke kursus dasar", "Standard AI assistance", "Community support", "Basic progress tracking"].map((feature, i) => (
              <li key={i} className="flex gap-3 items-center text-ink dark:text-frost/90 font-medium">
                <CheckCircle2 className="h-5 w-5 text-muted-soft" />
                {feature}
              </li>
            ))}
          </ul>
          <button disabled className="w-full py-4 rounded-full border border-hairline bg-surface-soft dark:bg-white/5 font-bold text-muted dark:text-white/50 text-center cursor-not-allowed">
            Paket Aktif
          </button>
        </div>

        {/* Premium Tier */}
        <div className="rounded-3xl border border-core-blue/50 bg-gradient-to-b from-core-blue/5 to-transparent dark:from-core-blue/10 dark:to-void-elevated p-8 flex flex-col relative overflow-hidden shadow-lg shadow-core-blue/10">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-core-blue to-sky" />
          <div className="absolute top-4 right-4 bg-core-blue/10 text-core-blue dark:text-sky text-xs font-bold px-3 py-1 rounded-full border border-core-blue/30">
            RECOMMENDED
          </div>
          <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">Pro</h3>
          <p className="text-body dark:text-frost/60 mb-6">Akses penuh ke semua fitur Clarise.</p>
          <div className="mb-8">
            <span className="text-5xl font-black text-ink dark:text-white">Rp 99k</span>
            <span className="text-body dark:text-frost/50">/bulan</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {["Akses SEMUA materi premium", "Unlimited AI mentoring", "Priority feedback", "Advanced analytics & roadmap", "Sertifikat kelulusan"].map((feature, i) => (
              <li key={i} className="flex gap-3 items-center text-ink dark:text-frost/90 font-medium">
                <CheckCircle2 className="h-5 w-5 text-core-blue dark:text-sky" />
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 rounded-full bg-core-blue text-white font-bold text-center hover:bg-core-blue/90 transition-all shadow-md shadow-core-blue/20">
            Upgrade ke Pro
          </button>
        </div>
      </div>
    </div>
  );
}
