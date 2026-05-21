"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { ArrowButton } from "@/components/ui/arrow-button"

interface EnrollModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  courseName: string
  isFreeUser: boolean
  hasReachedLimit: boolean
  isLoading?: boolean
}

export function EnrollModal({
  isOpen,
  onClose,
  onConfirm,
  courseName,
  isFreeUser,
  hasReachedLimit,
  isLoading = false
}: EnrollModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0C1F3D]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative bg-white dark:bg-void-elevated rounded-2xl p-8 max-w-md w-full shadow-[0_24px_60px_rgba(12,31,61,0.2)] animate-in zoom-in-95 fade-in duration-250 ease-out"
        role="dialog"
      >
        {isFreeUser && hasReachedLimit ? (
          /* Condition 2: Block */
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-spark/10 text-spark rounded-full flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <div className="inline-block px-3 py-1 bg-spark text-white text-[11px] font-bold rounded-full mb-3 uppercase tracking-wider">
              Premium
            </div>
            <h3 className="text-2xl font-bold text-ink dark:text-white mb-2">Batas kursus tercapai</h3>
            <p className="text-body dark:text-white/70 mb-8">
              Kamu sudah memiliki 1 kursus aktif. Upgrade ke Premium untuk mengambil kursus tanpa batas.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <a 
                href="/pricing"
                className="flex w-full items-center justify-center rounded-full bg-sky px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-sky/90 hover:shadow-[0_4px_14px_0_rgba(77,184,255,0.39)] hover:-translate-y-0.5"
              >
                Lihat Paket Premium
              </a>
              <button 
                onClick={onClose}
                className="btn-outline w-full justify-center"
              >
                Nanti saja
              </button>
            </div>
          </div>
        ) : (
          /* Condition 1: Confirm */
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-ink dark:text-white mb-2">Mulai kursus ini?</h3>
            <p className="text-body dark:text-white/70 mb-8">
              Kamu akan mengambil <strong className="text-ink dark:text-white">{courseName}</strong>. 
              {isFreeUser && " Sebagai pengguna gratis, kamu hanya bisa mengambil 1 kursus aktif."}
            </p>
            <div className="flex flex-col gap-3 w-full">
              <ArrowButton 
                onClick={onConfirm}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Memproses..." : "Ya, Ambil Kursus"}
              </ArrowButton>
              <button 
                onClick={onClose}
                disabled={isLoading}
                className="text-body dark:text-white/70 font-bold hover:text-ink dark:text-white:text-white py-2 border border-black/10 dark:border-white/10 rounded-lg disabled:opacity-50"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
