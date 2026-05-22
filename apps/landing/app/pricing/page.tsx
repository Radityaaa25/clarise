"use client";

import { CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink dark:bg-void dark:text-frost font-body overflow-hidden pt-32 pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-core-blue/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-core-blue dark:text-sky mb-8 backdrop-blur-md">
            <Zap className="h-4 w-4" />
            <span>Pricing Plan</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-ink dark:text-white mb-6">
            Investasi buat masa depan.
          </h1>
          <p className="text-lg text-body dark:text-frost/60 leading-relaxed">
            Pilih plan yang paling cocok buat lo. Mulai dari gratis buat nyobain, sampai premium buat akses tak terbatas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-8 backdrop-blur-md flex flex-col shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">Free</h3>
            <p className="text-body dark:text-frost/50 mb-6">Cocok buat yang mau nyobain dulu.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-ink dark:text-white">Rp 0</span>
              <span className="text-body dark:text-frost/50">/selamanya</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["1 course aktif (Level Dasar)", "10x tanya AI per hari", "XP, Level & Streak basic", "Public course visibility"].map((feature, i) => (
                <li key={i} className="flex gap-3 items-start text-ink dark:text-frost/80 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-black/20 dark:text-frost/30 shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.my.id"}/sign-up`} className="w-full py-4 rounded-xl border border-black/20 dark:border-white/20 font-bold text-ink dark:text-white text-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              Mulai Gratis
            </a>
          </motion.div>

          {/* Premium Bulanan Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-8 backdrop-blur-md flex flex-col shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">Premium Bulanan</h3>
            <p className="text-body dark:text-frost/50 mb-6">Akses penuh ke semua fitur Clarise secara fleksibel.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-ink dark:text-white">Rp 79k</span>
              <span className="text-body dark:text-frost/50">/bulan</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["Unlimited course (Semua Level)", "AI Unlimited & Buat kursus AI", "Sertifikat & Download PDF", "Streak protection (1x/bulan)", "Pro badges & Priority support"].map((feature, i) => (
                <li key={i} className="flex gap-3 items-start text-ink dark:text-frost/80 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-core-blue dark:text-sky shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/coming-soon" className="w-full py-4 rounded-xl border border-core-blue text-core-blue dark:text-sky font-bold text-center hover:bg-core-blue/10 dark:hover:bg-sky/10 transition-colors block">
              Langganan Bulanan
            </Link>
          </motion.div>

          {/* Premium Tahunan Tier */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-core-blue/50 bg-gradient-to-b from-core-blue/10 to-transparent dark:from-core-blue/20 dark:to-void p-8 backdrop-blur-md flex flex-col relative overflow-hidden shadow-2xl shadow-core-blue/20 md:scale-[1.02] hover:-translate-y-2 transition-transform duration-300 z-10"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-core-blue to-sky" />
            <div className="absolute top-4 right-4 bg-reward/10 dark:bg-reward/20 text-reward dark:text-reward text-xs font-bold px-3 py-1 rounded-full border border-reward/30">
              HEMAT ~37%
            </div>
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">Premium Tahunan</h3>
            <p className="text-body dark:text-frost/50 mb-6">Investasi belajar terbaik dengan harga paling hemat.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-ink dark:text-white">Rp 599k</span>
              <span className="text-body dark:text-frost/50">/tahun</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["Semua fitur Premium Bulanan", "Hemat lebih dari Rp 340.000", "AI Recommendations khusus", "Clarise Wrapped Detailed Report", "Investasi belajar terbaik"].map((feature, i) => (
                <li key={i} className="flex gap-3 items-start text-ink dark:text-frost/90 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-reward shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/coming-soon" className="w-full py-4 rounded-xl bg-core-blue text-white font-bold text-center hover:bg-core-blue/90 transition-all shadow-lg shadow-core-blue/20 hover:scale-[1.02] active:scale-95 block">
              Paling Hemat
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
