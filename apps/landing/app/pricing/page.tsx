"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Zap,
  X,
  Ticket,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.my.id";

export default function PricingPage() {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherStatus, setVoucherStatus] = useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");
  const [voucherMessage, setVoucherMessage] = useState("");
  const [voucherTrialDays, setVoucherTrialDays] = useState(0);
  const [isVoucherEnabled, setIsVoucherEnabled] = useState(true);

  useEffect(() => {
    fetch(`${APP_URL}/api/settings/voucher-popup`)
      .then((res) => res.json())
      .then((data) => setIsVoucherEnabled(data.enabled))
      .catch(() => setIsVoucherEnabled(true));
  }, []);

  async function handleCheckVoucher() {
    if (!voucherCode.trim()) return;
    setVoucherStatus("loading");
    setVoucherMessage("");

    try {
      const res = await fetch(
        `${APP_URL}/api/voucher/check/${encodeURIComponent(voucherCode.trim().toUpperCase())}`,
      );
      const data = await res.json();

      if (res.ok && data.isValid) {
        setVoucherStatus("valid");
        setVoucherTrialDays(data.trialDays || 30);
        setVoucherMessage(
          `Kode valid! Kamu akan mendapatkan akses Premium gratis selama ${data.trialDays || 30} hari.`,
        );
      } else {
        setVoucherStatus("invalid");
        setVoucherMessage(
          data.error ||
            "Kode voucher tidak valid atau sudah habis masa berlakunya.",
        );
      }
    } catch {
      setVoucherStatus("invalid");
      setVoucherMessage("Gagal memverifikasi kode. Coba lagi nanti.");
    }
  }

  function handleRedeem() {
    // Redirect to app sign-up with voucher code pre-filled
    const code = voucherCode.trim().toUpperCase();
    window.location.href = `${APP_URL}/sign-up?voucher=${encodeURIComponent(code)}`;
  }

  function closeModal() {
    setShowVoucherModal(false);
    setVoucherCode("");
    setVoucherStatus("idle");
    setVoucherMessage("");
  }

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
            Pilih plan yang paling cocok buat lo. Mulai dari gratis buat
            nyobain, sampai premium buat akses tak terbatas.
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
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">
              Free
            </h3>
            <p className="text-body dark:text-frost/50 mb-6">
              Cocok buat yang mau nyobain dulu.
            </p>
            <div className="mb-8">
              <span className="text-5xl font-black text-ink dark:text-white">
                Rp 0
              </span>
              <span className="text-body dark:text-frost/50">/selamanya</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "1 course aktif (Level Dasar)",
                "10x tanya AI per hari",
                "XP, Level & Streak basic",
                "Public course visibility",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start text-ink dark:text-frost/80 font-medium"
                >
                  <CheckCircle2 className="h-5 w-5 text-black/20 dark:text-frost/30 shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={`${APP_URL}/sign-up`}
              className="w-full py-4 rounded-xl border border-black/20 dark:border-white/20 font-bold text-ink dark:text-white text-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              Mulai Gratis
            </a>
          </motion.div>

          {/* Premium Bulanan Tier — dengan Voucher Pop-up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-8 backdrop-blur-md flex flex-col shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">
              Premium Bulanan
            </h3>
            <p className="text-body dark:text-frost/50 mb-6">
              Akses penuh ke semua fitur Clarise secara fleksibel.
            </p>
            <div className="mb-8">
              <span className="text-5xl font-black text-ink dark:text-white">
                Rp 79k
              </span>
              <span className="text-body dark:text-frost/50">/bulan</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Unlimited course (Semua Level)",
                "AI Unlimited & Buat kursus AI",
                "Sertifikat & Download PDF",
                "Streak protection (1x/bulan)",
                "Pro badges & Priority support",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start text-ink dark:text-frost/80 font-medium"
                >
                  <CheckCircle2 className="h-5 w-5 text-core-blue dark:text-sky shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                if (isVoucherEnabled) {
                  setShowVoucherModal(true);
                } else {
                  window.location.href = `${APP_URL}/sign-up?plan=premium`;
                }
              }}
              className="w-full py-4 rounded-xl border border-core-blue text-core-blue dark:text-sky font-bold text-center hover:bg-core-blue/10 dark:hover:bg-sky/10 transition-colors cursor-pointer"
            >
              Langganan Bulanan
            </button>
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
            <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">
              Premium Tahunan
            </h3>
            <p className="text-body dark:text-frost/50 mb-6">
              Investasi belajar terbaik dengan harga paling hemat.
            </p>
            <div className="mb-8">
              <span className="text-5xl font-black text-ink dark:text-white">
                Rp 599k
              </span>
              <span className="text-body dark:text-frost/50">/tahun</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Semua fitur Premium Bulanan",
                "Hemat lebih dari Rp 340.000",
                "AI Recommendations khusus",
                "Clarise Wrapped Detailed Report",
                "Investasi belajar terbaik",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start text-ink dark:text-frost/90 font-medium"
                >
                  <CheckCircle2 className="h-5 w-5 text-reward shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/coming-soon"
              className="w-full py-4 rounded-xl bg-core-blue text-white font-bold text-center hover:bg-core-blue/90 transition-all shadow-lg shadow-core-blue/20 hover:scale-[1.02] active:scale-95 block"
            >
              Paling Hemat
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── VOUCHER MODAL ── */}
      <AnimatePresence>
        {showVoucherModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full max-w-md rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-void-elevated p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-body dark:text-frost/60"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-core-blue/10 dark:bg-core-blue/20 flex items-center justify-center">
                    <Ticket className="h-6 w-6 text-core-blue dark:text-sky" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-ink dark:text-white">
                      Punya Kode Voucher?
                    </h2>
                    <p className="text-sm text-body dark:text-frost/50">
                      Masukkan kode untuk akses Premium gratis
                    </p>
                  </div>
                </div>

                {/* Input */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => {
                        setVoucherCode(e.target.value.toUpperCase());
                        if (voucherStatus !== "idle") {
                          setVoucherStatus("idle");
                          setVoucherMessage("");
                        }
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleCheckVoucher()
                      }
                      placeholder="Contoh: EARLYBIRD"
                      maxLength={30}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-ink dark:text-white placeholder:text-muted-soft font-mono text-lg tracking-wider focus:outline-none focus:ring-2 focus:ring-core-blue/50 focus:border-core-blue transition-all"
                      disabled={voucherStatus === "loading"}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Status message */}
                <AnimatePresence mode="wait">
                  {voucherMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
                        voucherStatus === "valid"
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                          : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                      }`}
                    >
                      {voucherMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      window.location.href = `${APP_URL}/sign-up?plan=premium`;
                    }}
                    className="flex-1 py-3.5 rounded-xl border border-black/10 dark:border-white/10 font-bold text-body dark:text-frost/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    Tidak punya
                  </button>

                  {voucherStatus === "valid" ? (
                    <button
                      onClick={handleRedeem}
                      className="flex-1 py-3.5 rounded-xl bg-core-blue text-white font-bold hover:bg-core-blue/90 transition-all shadow-lg shadow-core-blue/20 flex items-center justify-center gap-2"
                    >
                      Daftar & Aktifkan
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckVoucher}
                      disabled={
                        !voucherCode.trim() || voucherStatus === "loading"
                      }
                      className="flex-1 py-3.5 rounded-xl bg-core-blue text-white font-bold hover:bg-core-blue/90 transition-all shadow-lg shadow-core-blue/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {voucherStatus === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Mengecek...
                        </>
                      ) : (
                        "Cek Kode"
                      )}
                    </button>
                  )}
                </div>

                {/* Footer hint */}
                <p className="mt-4 text-center text-xs text-muted dark:text-frost/30">
                  Kode voucher bisa didapatkan melalui event atau promosi
                  Clarise.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
