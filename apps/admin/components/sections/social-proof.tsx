"use client";

import { useInView } from "@/hooks/use-in-view";

const stats = [
  { value: "10.000+", label: "Pelajar" },
  { value: "500+", label: "Materi" },
  { value: "50+", label: "Kategori" },
];

export function SocialProof() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="px-6 py-24 bg-surface-card">
      <div
        ref={ref}
        className={`mx-auto max-w-[1100px] grid grid-cols-1 gap-8 md:grid-cols-3 text-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-5xl font-black text-ink">{stat.value}</p>
            <p className="mt-2 text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
