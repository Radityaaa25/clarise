"use client";

import { Check } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const plans = [
  {
    name: "Free",
    badge: "Selamanya",
    badgeClass: "bg-surface-card text-ink dark:bg-void dark:border dark:border-white/10 dark:text-white/70",
    price: "Rp 0",
    period: "",
    features: [
      "1 course aktif (Level Dasar)",
      "10x tanya AI per hari",
      "XP, Level & Streak basic",
      "Public course visibility"
    ],
    cta: "Mulai Gratis",
    ctaClass: "border border-primary text-primary hover:bg-surface-card dark:hover:bg-void",
    featured: false,
  },
  {
    name: "Premium Bulanan",
    badge: "Fleksibel",
    badgeClass: "bg-surface-card text-ink dark:bg-void dark:border dark:border-white/10 dark:text-white/70",
    price: "Rp 79.000",
    period: "/bulan",
    features: [
      "Unlimited course (Semua Level)",
      "AI Unlimited & Buat kursus AI",
      "Sertifikat & Download PDF",
      "Streak protection (1x/bulan)",
      "Pro badges & Priority support"
    ],
    cta: "Langganan Bulanan",
    ctaClass: "border border-primary text-primary hover:bg-surface-card dark:hover:bg-void",
    featured: false,
  },
  {
    name: "Premium Tahunan",
    badge: "Hemat ~37%",
    badgeClass: "bg-reward text-on-primary border border-reward",
    price: "Rp 599.000",
    period: "/tahun",
    features: [
      "Semua fitur Premium Bulanan",
      "Hemat lebih dari Rp 340.000",
      "AI Recommendations khusus",
      "Clarise Wrapped Detailed Report",
      "Investasi belajar terbaik"
    ],
    cta: "Paling Hemat",
    ctaClass: "bg-primary text-on-primary hover:bg-primary-active shadow-lg shadow-primary/25",
    featured: true,
  },
];

export function Pricing() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="pricing" className="px-6 py-24 bg-surface-soft dark:bg-void-elevated">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center text-3xl font-black md:text-4xl text-ink dark:text-white">
          Mulai gratis, upgrade kapan saja.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted dark:text-white/60">
          Pilih paket yang sesuai kebutuhan belajarmu. Tanpa biaya tersembunyi.
        </p>

        <div ref={ref} className="mt-16 grid gap-8 md:grid-cols-3 mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl bg-canvas dark:bg-void p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                plan.featured
                  ? "border-2 border-primary shadow-[0_8px_40px_rgba(26,127,204,0.12)] md:scale-[1.05] z-10"
                  : "border border-hairline dark:border-white/10"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${plan.badgeClass}`}>
                  {plan.badge}
                </span>
                
                <h3 className="mt-6 text-xl font-bold text-ink dark:text-white">{plan.name}</h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-black text-ink dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted dark:text-white/60">{plan.period}</span>}
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-body dark:text-white/80">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <a
                  href={process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.com"}
                  className={`block w-full rounded-xl py-3.5 text-center text-sm font-bold transition-all ${plan.ctaClass}`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
