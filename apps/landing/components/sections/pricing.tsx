"use client";

import { Check } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const plans = [
  {
    name: "Free",
    badge: "Gratis Selamanya",
    badgeClass: "bg-surface-card text-ink",
    price: "Rp 0",
    period: "",
    features: ["2 course", "10x tanya AI/hari", "XP & badge basic"],
    cta: "Mulai Gratis",
    ctaClass: "border border-primary text-primary hover:bg-surface-card",
    featured: false,
  },
  {
    name: "Premium",
    badge: "Paling Populer",
    badgeClass: "bg-reward text-on-primary",
    price: "Rp 49.000",
    period: "/bulan",
    features: ["Semua course", "AI unlimited", "Sertifikat resmi", "Download PDF", "Reward eksklusif"],
    cta: "Coba Premium",
    ctaClass: "bg-primary text-on-primary hover:bg-primary-active",
    featured: true,
  },
];

export function Pricing() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="pricing" className="px-6 py-24 bg-surface-soft">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center text-3xl font-black md:text-4xl text-ink">
          Mulai gratis, upgrade kapan saja.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          Pilih paket yang sesuai kebutuhanmu.
        </p>

        <div ref={ref} className="mt-16 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl bg-canvas p-8 transition-all duration-500 ${
                plan.featured
                  ? "border-2 border-primary shadow-[0_8px_40px_rgba(26,127,204,0.12)] scale-[1.02]"
                  : "border border-hairline"
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${plan.badgeClass}`}>
                {plan.badge}
              </span>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black text-ink">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-body">
                    <Check className="h-4 w-4 text-success shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.com"}
                className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-bold transition-colors ${plan.ctaClass}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
