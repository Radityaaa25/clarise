"use client";

import { Search, Sparkles, MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const steps = [
  {
    icon: Search,
    title: "Pilih Topik",
    description: "Browse kategori dan pilih apa yang ingin dipelajari.",
  },
  {
    icon: Sparkles,
    title: "AI Kurasikan Materi",
    description:
      "AI mengumpulkan konten terbaik dari seluruh internet, disusun jadi learning path.",
  },
  {
    icon: MessageCircle,
    title: "Belajar & Tanya",
    description:
      "Pelajari materi, klik konsep apapun untuk penjelasan detail, tanya AI kapan saja.",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="how-it-works" className="px-6 py-24 bg-surface-soft">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center text-3xl font-black md:text-4xl text-ink">
          Cara Kerja <span className="text-primary">Clarise</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          Tiga langkah sederhana untuk mulai belajar.
        </p>

        <div ref={ref} className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative rounded-xl bg-canvas p-8 transition-all duration-500 hover:shadow-[0_2px_8px_rgba(12,31,61,0.08)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 font-heading text-6xl font-black text-primary/15">
                {i + 1}
              </span>

              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-body leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
