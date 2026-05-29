"use client";

import React, { useState } from "react";
import { CheckCircle2, Zap, X, Loader2 } from "lucide-react";

export default function AppPricingPage() {
  const [showModal, setShowModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleRedeem = async () => {
    setIsRedeeming(true);
    setMessage(null);
    try {
      const res = await fetch("/api/voucher/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal klaim voucher");

      setMessage({
        type: "success",
        text: "Voucher berhasil diklaim! Status Premium aktif.",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-core-blue dark:text-sky mb-6">
          <Zap className="h-4 w-4" />
          <span>Langganan Clarise</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-heading text-ink dark:text-white mb-4">
          Tingkatkan level belajarmu.
        </h1>
        <p className="text-body dark:text-frost/80 text-lg">
          Dapatkan akses tak terbatas ke semua materi premium dan AI mentoring
          eksklusif.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Free Tier */}
        <div className="rounded-3xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-8 flex flex-col transition-colors hover:-translate-y-1 hover:shadow-lg duration-300">
          <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">
            Free
          </h3>
          <p className="text-body dark:text-frost/60 mb-6">
            Paket saat ini. Cocok buat belajar dasar.
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
                className="flex gap-3 items-start text-ink dark:text-frost/90 font-medium"
              >
                <CheckCircle2 className="h-5 w-5 text-muted-soft shrink-0 mt-0.5" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            disabled
            className="w-full py-4 rounded-full border border-hairline bg-surface-soft dark:bg-white/5 font-bold text-muted dark:text-white/50 text-center cursor-not-allowed"
          >
            Paket Aktif
          </button>
        </div>

        {/* Premium Bulanan */}
        <div className="rounded-3xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-8 flex flex-col transition-colors hover:-translate-y-1 hover:shadow-lg duration-300">
          <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">
            Premium Bulanan
          </h3>
          <p className="text-body dark:text-frost/60 mb-6">
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
                className="flex gap-3 items-start text-ink dark:text-frost/90 font-medium"
              >
                <CheckCircle2 className="h-5 w-5 text-core-blue dark:text-sky shrink-0 mt-0.5" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-4 rounded-full border border-core-blue text-core-blue dark:text-sky dark:border-sky font-bold text-center hover:bg-core-blue/10 dark:hover:bg-sky/10 transition-all"
          >
            Langganan Bulanan
          </button>
        </div>

        {/* Premium Tahunan */}
        <div className="rounded-3xl border border-core-blue/50 bg-gradient-to-b from-core-blue/5 to-transparent dark:from-core-blue/10 dark:to-void-elevated p-8 flex flex-col relative overflow-hidden shadow-lg shadow-core-blue/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-core-blue/20 duration-300 md:scale-105 z-10">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-core-blue to-sky" />
          <div className="absolute top-4 right-4 bg-reward/10 text-reward dark:text-reward text-xs font-bold px-3 py-1 rounded-full border border-reward/30">
            HEMAT ~37%
          </div>
          <h3 className="text-2xl font-bold font-heading text-ink dark:text-white mb-2">
            Premium Tahunan
          </h3>
          <p className="text-body dark:text-frost/60 mb-6">
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
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-4 rounded-full bg-core-blue text-white font-bold text-center hover:bg-core-blue/90 transition-all shadow-md shadow-core-blue/20"
          >
            Paling Hemat
          </button>
        </div>
      </div>

      {/* Checkout / Voucher Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-canvas dark:bg-void-elevated rounded-2xl w-full max-w-md border border-hairline shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-hairline flex justify-between items-center">
              <h2 className="text-xl font-bold text-ink dark:text-white">
                Checkout Premium
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted hover:text-ink dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-ink dark:text-frost">
                  Punya Kode Voucher / Trial?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) =>
                      setVoucherCode(e.target.value.toUpperCase())
                    }
                    placeholder="Masukkan kode..."
                    className="flex-1 bg-surface-soft dark:bg-black/20 border border-hairline rounded-lg px-4 py-2 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-core-blue"
                  />
                  <button
                    onClick={handleRedeem}
                    disabled={isRedeeming || !voucherCode.trim()}
                    className="bg-core-blue text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 hover:bg-core-blue/90 transition-colors"
                  >
                    {isRedeeming ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Klaim"
                    )}
                  </button>
                </div>
                {message && (
                  <p
                    className={`text-sm mt-2 ${message.type === "error" ? "text-danger" : "text-success"}`}
                  >
                    {message.text}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-hairline"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-canvas dark:bg-void-elevated px-2 text-muted">
                    atau
                  </span>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-ink dark:bg-white text-canvas dark:text-ink font-bold hover:opacity-90 transition-opacity">
                Lanjut Pembayaran (Duitku)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
