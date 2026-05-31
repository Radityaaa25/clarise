/* eslint-disable */
// Lengkapi sumber referensi (video + dokumentasi + artikel) untuk course lama
// yang sebelumnya cuma punya 1 sumber YouTube per slide.
//
// Prinsip: prioritas video Bahasa Indonesia (Programmer Zaman Now dll); kalau
// tidak ada yang bagus, pakai video luar yang sudah diverifikasi & bisa diplay.
// Semua URL di config ini SUDAH diverifikasi (oEmbed untuk YouTube, HTTP 200
// untuk web) pada 2026-05-31.
//
// Dry-run default. Pakai --apply untuk eksekusi.
//
// Idempotent: untuk tiap slide konten (non-quiz), hapus source lama lalu
// buat ulang trio sumber. Slide quiz dibersihkan dari source.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const apply = process.argv.includes("--apply");

type Src = { type: string; title: string; url: string };

// Konfigurasi sumber per course slug.
const CONFIG: Record<string, Src[]> = {
  "dasar-html-css": [
    {
      type: "YOUTUBE",
      title: "Tutorial HTML & CSS Dasar (Bahasa Indonesia)",
      url: "https://www.youtube.com/watch?v=HGTJBPNC-Gw",
    },
    {
      type: "DOCUMENTATION",
      title: "MDN Web Docs — HTML",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      type: "ARTICLE",
      title: "W3Schools — HTML Tutorial",
      url: "https://www.w3schools.com/html/",
    },
  ],
  "belajar-javascript-dasar": [
    {
      type: "YOUTUBE",
      title: "Tutorial JavaScript — Programmer Zaman Now (Bahasa Indonesia)",
      url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH8SS0Gsj9_a0cC0jypFEoSg",
    },
    {
      type: "DOCUMENTATION",
      title: "MDN Web Docs — JavaScript Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    },
    {
      type: "ARTICLE",
      title: "The Modern JavaScript Tutorial — javascript.info",
      url: "https://javascript.info/",
    },
  ],
  "belajar-golang-dasar": [
    {
      type: "YOUTUBE",
      title: "Tutorial GoLang — Programmer Zaman Now (Bahasa Indonesia)",
      url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH-0i9dzMzLw6FKVrFWv3QvQ",
    },
    {
      type: "DOCUMENTATION",
      title: "Go Documentation — go.dev",
      url: "https://go.dev/doc/",
    },
    {
      type: "ARTICLE",
      title: "Dasar Pemrograman Golang — Noval Agung (Bahasa Indonesia)",
      url: "https://dasarpemrogramangolang.novalagung.com",
    },
  ],
  "dasar-typescript": [
    {
      type: "YOUTUBE",
      title: "Tutorial TypeScript — Programmer Zaman Now (Bahasa Indonesia)",
      url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH9jIdygiF4vTIs4Xpo_cHhC",
    },
    {
      type: "DOCUMENTATION",
      title: "TypeScript Handbook — The Basics",
      url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    },
    {
      type: "ARTICLE",
      title: "W3Schools — TypeScript Tutorial",
      url: "https://www.w3schools.com/typescript/",
    },
  ],
  "bahasa-korea-dasar-topik-1-lengkap": [
    {
      type: "YOUTUBE",
      title: "Cara Membaca Huruf Korea (Hangul) — Bahasa Indonesia",
      url: "https://www.youtube.com/watch?v=s5aobqyEaMQ",
    },
    {
      type: "DOCUMENTATION",
      title: "How to Study Korean — Panduan Lengkap",
      url: "https://www.howtostudykorean.com/",
    },
    {
      type: "ARTICLE",
      title: "Hangul — Wikipedia Bahasa Indonesia",
      url: "https://id.wikipedia.org/wiki/Hangul",
    },
  ],
  "belajar-nextjs-16-dasar": [
    {
      type: "YOUTUBE",
      title: "Tutorial NextJS Indonesia — Prawito Hudoro (Bahasa Indonesia)",
      url: "https://www.youtube.com/playlist?list=PLU4DS8KR-LJ3-zouYHHknPq1G5VTB8PRf",
    },
    {
      type: "DOCUMENTATION",
      title: "Next.js Official Documentation",
      url: "https://nextjs.org/docs",
    },
    {
      type: "ARTICLE",
      title: "Tutorial Next.js — SantriKoding (Bahasa Indonesia)",
      url: "https://santrikoding.com/kategori/next-js",
    },
  ],
  "javascript-menengah": [
    {
      type: "YOUTUBE",
      title: "Tutorial JavaScript — Programmer Zaman Now (Bahasa Indonesia)",
      url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH8SS0Gsj9_a0cC0jypFEoSg",
    },
    {
      type: "DOCUMENTATION",
      title: "MDN Web Docs — JavaScript Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    },
    {
      type: "ARTICLE",
      title: "The Modern JavaScript Tutorial — javascript.info",
      url: "https://javascript.info/",
    },
  ],
  "digital-marketing": [
    {
      type: "YOUTUBE",
      title: "Tutorial Digital Marketing (Bahasa Indonesia)",
      url: "https://www.youtube.com/watch?v=bixR-KIJKYM",
    },
    {
      type: "DOCUMENTATION",
      title: "HubSpot Academy — Digital Marketing Courses",
      url: "https://academy.hubspot.com/",
    },
    {
      type: "ARTICLE",
      title: "Blog Niagahoster — Digital Marketing (Bahasa Indonesia)",
      url: "https://www.niagahoster.co.id/blog/",
    },
  ],
  "bahasa-inggris-komprehensif-mastery": [
    {
      type: "YOUTUBE",
      title: "16 Tenses Bahasa Inggris — Penjelasan Lengkap (Bahasa Indonesia)",
      url: "https://www.youtube.com/playlist?list=PLBFS4qvL7---nna36ayKaKHPX013FYx1Q",
    },
    {
      type: "DOCUMENTATION",
      title: "16 Tenses dalam Bahasa Inggris — English Academy",
      url: "https://www.english-academy.id/blog/16-tenses-dalam-bahasa-inggris-dan-contohnya",
    },
    {
      type: "ARTICLE",
      title: "16 Tenses Bahasa Inggris & Contohnya — Ruangguru",
      url: "https://www.ruangguru.com/blog/16-tenses-bahasa-inggris",
    },
  ],
};

async function main() {
  console.log(`\n${apply ? "🛠  APPLY" : "🔍 DRY-RUN"} — enrich sources\n`);

  let totalSlides = 0;
  let totalSourcesCreated = 0;

  for (const [slug, sources] of Object.entries(CONFIG)) {
    const course = await prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        modules: {
          select: {
            slides: { select: { id: true, content: true } },
          },
        },
      },
    });
    if (!course) {
      console.log(`  ⚠️  ${slug} tidak ditemukan, skip.`);
      continue;
    }

    const allSlides = course.modules.flatMap((m) => m.slides);
    const contentSlides = allSlides.filter(
      (s) => (s.content as any)?.type !== "quiz",
    );
    const quizSlides = allSlides.filter(
      (s) => (s.content as any)?.type === "quiz",
    );

    console.log(
      `  📦 ${slug} — "${course.title}": ${contentSlides.length} slide konten (+ ${quizSlides.length} quiz)`,
    );
    console.log(
      `     Akan dipasang: ${sources.map((s) => s.type).join(" + ")}`,
    );
    totalSlides += contentSlides.length;
    totalSourcesCreated += contentSlides.length * sources.length;

    if (apply) {
      // Hapus semua source lama di seluruh slide course ini (idempotent).
      const allSlideIds = allSlides.map((s) => s.id);
      await prisma.source.deleteMany({
        where: { slideId: { in: allSlideIds } },
      });

      // Buat ulang trio sumber hanya untuk slide konten (non-quiz).
      for (const slide of contentSlides) {
        await prisma.source.createMany({
          data: sources.map((src) => ({
            slideId: slide.id,
            type: src.type as any,
            title: src.title,
            url: src.url,
          })),
        });
      }
    }
  }

  console.log(
    `\n========== ${apply ? "APPLY" : "DRY-RUN"} SELESAI ==========`,
  );
  console.log(`  Course: ${Object.keys(CONFIG).length}`);
  console.log(`  Slide konten: ${totalSlides}`);
  console.log(
    `  Source ${apply ? "dibuat" : "akan dibuat"}: ${totalSourcesCreated}`,
  );
  if (!apply) {
    console.log(
      `\n  Eksekusi: node --env-file=.env.local --import tsx scripts/enrich-sources.ts --apply\n`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
