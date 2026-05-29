"use client";

import { useEffect, useState } from "react";
import { Sparkles, BookOpen, Crown, X } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

/**
 * Welcome popup yang muncul sekali saat user pertama kali masuk dashboard.
 *
 * State source of truth: `user.welcomePopupShown` (dari API /api/user).
 * - Kalau false → tampilkan popup
 * - User klik close / CTA → POST /api/user/welcome-popup-seen → mutate user
 *   data → next render `welcomePopupShown=true` → popup tidak tampil lagi
 *
 * Idempotent di server side — endpoint POST aman dipanggil berulang.
 */
export function WelcomePopup() {
  const { user, isLoading, mutate } = useUser();
  const [isClosing, setIsClosing] = useState(false);
  const [forceHide, setForceHide] = useState(false);

  // Lock scroll background saat popup terbuka
  useEffect(() => {
    if (!user || user.welcomePopupShown || forceHide) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [user, forceHide]);

  if (isLoading || !user) return null;
  if (user.welcomePopupShown) return null;
  if (forceHide) return null;

  const dismiss = async () => {
    setIsClosing(true);
    // Optimistic — sembunyikan instant supaya gak nunggu network
    setTimeout(() => setForceHide(true), 200);
    try {
      await fetch("/api/user/welcome-popup-seen", { method: "POST" });
      mutate(); // Refresh user data
    } catch (err) {
      console.error("Failed to mark welcome popup seen:", err);
      // Even kalau gagal, popup tetap closed di session ini
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Tutup welcome popup"
        onClick={dismiss}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
      />

      {/* Popup */}
      <div
        className={`relative w-full max-w-lg bg-canvas dark:bg-void-elevated border border-hairline rounded-2xl shadow-2xl overflow-hidden transition-transform duration-200 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
      >
        {/* Decorative gradient header */}
        <div className="relative h-32 bg-gradient-to-br from-core-blue via-sky to-spark overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles
              className="w-16 h-16 text-white drop-shadow-lg"
              aria-hidden="true"
            />
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Tutup"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <h2
              id="welcome-popup-title"
              className="text-2xl md:text-3xl font-black font-heading text-ink dark:text-frost"
            >
              Selamat datang di Clarise! 🎉
            </h2>
            <p className="text-body dark:text-frost/80 text-sm md:text-base">
              Hai{user.name ? `, ${user.name.split(" ")[0]}` : ""}! Sebagai
              pengguna baru, kamu berhak mengklaim{" "}
              <span className="font-bold text-core-blue">2 kursus GRATIS</span>
              .
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-canvas-soft dark:bg-void/40 border border-hairline">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-core-blue/10 text-core-blue flex items-center justify-center">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-ink dark:text-frost">
                  Pilih maksimal 2 kursus
                </p>
                <p className="text-body dark:text-frost/70">
                  Bisa 2 kursus gratis, atau 1 gratis + 1 Premium.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-canvas-soft dark:bg-void/40 border border-hairline">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-spark/10 text-spark flex items-center justify-center">
                <Crown className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-ink dark:text-frost">
                  Akses 1 kursus Premium gratis
                </p>
                <p className="text-body dark:text-frost/70">
                  Coba dulu materi premium tanpa berlangganan.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={dismiss}
              className="flex-1 px-4 py-2.5 rounded-xl border border-hairline bg-canvas dark:bg-void-elevated text-ink dark:text-frost font-bold text-sm hover:bg-canvas-soft dark:hover:bg-void/60 transition-colors"
            >
              Nanti dulu
            </button>
            <Link
              href="/explore"
              onClick={dismiss}
              className="flex-1 px-4 py-2.5 rounded-xl bg-core-blue text-white font-bold text-sm text-center hover:bg-core-blue/90 transition-colors"
            >
              Pilih Kursus Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
