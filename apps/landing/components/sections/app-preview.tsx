"use client"

import Image from "next/image"

const features = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    fileLM: "/DashboardLM.webp",
    fileDM: "/DashboardDM.webp", 
    desc: "Pantau progress, XP, dan pertahankan learning streak harianmu dengan mudah. Ringkasan performa divisualisasikan dengan elegan.",
    badge: "Overview"
  },
  { 
    id: "explore", 
    label: "Explore", 
    fileLM: "/ExploreLM.webp",
    fileDM: "/ExploreDM.webp", 
    desc: "Temukan ratusan kursus dari berbagai kategori. Discover your next skill dengan modul pembelajaran terstruktur yang disesuaikan.",
    badge: "Library"
  },
  { 
    id: "mycourse", 
    label: "My Courses", 
    fileLM: "/MyCourseLM.webp",
    fileDM: "/MyCourseDM.webp", 
    desc: "Kelola dan lanjutkan kursus aktifmu kapan saja. Seamless learning experience yang membuat kamu selalu ingin kembali.",
    badge: "Learning"
  },
  { 
    id: "streak", 
    label: "Achievements", 
    fileLM: "/AchievmentLM.webp",
    fileDM: "/AchievmentDM.webp", 
    desc: "Kumpulkan berbagai badge eksklusif dan tingkatkan levelmu. Gamified for you agar perjalanan belajarmu tidak pernah membosankan.",
    badge: "Gamification"
  },
  { 
    id: "create", 
    label: "AI Course Builder", 
    fileLM: "/CreateCourseLM.webp",
    fileDM: "/CreateCourseDm.webp", 
    desc: "Buat kursus kustom secara instan dengan bantuan AI. Your personal course creator yang memahami materi spesifik keinginanmu.",
    badge: "Premium"
  },
]

export function AppPreview() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-24">
      {features.map((feature, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div key={feature.id} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}>
            
            {/* Text Content */}
            <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-core-blue/20 bg-core-blue/5 dark:bg-core-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-core-blue dark:text-sky">
                {feature.badge}
              </div>
              <h3 className="text-3xl md:text-4xl font-black font-heading text-ink dark:text-white">
                {feature.label}
              </h3>
              <p className="text-body dark:text-frost/80 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                {feature.desc}
              </p>
            </div>

            {/* Image Container */}
            <div className="flex-1 w-full max-w-[800px] relative group">
              {/* Glow background behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-core-blue/10 to-sky/10 dark:from-core-blue/20 dark:to-sky/20 rounded-2xl md:rounded-[32px] blur-3xl group-hover:blur-[60px] transition-all duration-700 -z-10" />
              
              <div className="rounded-2xl md:rounded-[32px] border border-hairline bg-canvas dark:bg-void-elevated p-2 md:p-3 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className="w-full overflow-hidden rounded-xl md:rounded-[20px] border border-hairline bg-slate-50 dark:bg-void relative">
                  <Image
                    src={feature.fileLM}
                    alt={feature.label}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain dark:hidden"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <Image
                    src={feature.fileDM}
                    alt={`${feature.label} Dark`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain hidden dark:block"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  )
}
