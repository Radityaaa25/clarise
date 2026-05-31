"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Apakah Clarise gratis?",
    a: "Ya! Clarise punya tier gratis dengan akses ke banyak kursus dasar, kuis, dan AI Tutor. Untuk fitur premium seperti AI Course Generator dan kursus tingkat lanjut, tersedia paket berlangganan.",
  },
  {
    q: "Apa itu AI Tutor di Clarise?",
    a: "AI Tutor adalah asisten belajar pintar yang bisa kamu tanya kapan saja saat belajar. Ia memahami konteks materi yang sedang kamu pelajari dan memberi penjelasan yang mudah dipahami.",
  },
  {
    q: "Apa bedanya kursus gratis dan premium?",
    a: "Kursus gratis cocok untuk membangun fondasi dengan materi dasar dan kuis statis. Kursus premium menghadirkan materi lebih dalam, tantangan interaktif yang dinilai AI, serta kemampuan membuat kursus kustom sesuai kebutuhanmu.",
  },
  {
    q: "Bisakah saya membuat kursus sendiri?",
    a: "Bisa. Dengan fitur AI Course Builder (premium), cukup ketik topik yang ingin kamu pelajari dan Clarise akan menyusun kursus terstruktur lengkap dengan modul, materi, dan kuis.",
  },
  {
    q: "Apakah ada sertifikat atau bukti penyelesaian?",
    a: "Ya. Setiap modul yang selesai memberi XP, dan kamu mengumpulkan badge eksklusif serta menaikkan level sebagai bukti perjalanan belajarmu.",
  },
  {
    q: "Di perangkat apa saja Clarise bisa diakses?",
    a: "Clarise berbasis web dan dioptimalkan untuk desktop maupun mobile, jadi kamu bisa belajar kapan saja lewat browser di HP, tablet, atau laptop.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-hairline bg-white dark:bg-void-elevated overflow-hidden transition-colors">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
      >
        <span className="font-bold text-ink dark:text-white text-[15px] md:text-base">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-core-blue transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 md:px-6 pb-5 text-body dark:text-frost/80 leading-relaxed">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="px-6 py-24 relative z-10 transition-colors">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-core-blue/20 bg-core-blue/5 dark:bg-core-blue/10 px-4 py-1.5 text-sm font-bold text-core-blue dark:text-sky mb-4">
            FAQ
          </div>
          <h2 className="text-3xl font-black md:text-5xl font-heading text-ink dark:text-white">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
