 
// Script sementara untuk inspeksi DB.
// Run: pnpm tsx scripts/inspect-db.ts
// Hapus setelah investigasi selesai.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n========== CATEGORIES ==========");
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      _count: { select: { courses: true } },
    },
    orderBy: { order: "asc" },
  });
  for (const c of categories) {
    console.log(
      `  • [${c.slug.padEnd(18)}] ${c.name} → ${c._count.courses} course`,
    );
  }

  console.log("\n========== COURSES (semua) ==========");
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      isPremium: true,
      isPublished: true,
      isAiGenerated: true,
      isUserGenerated: true,
      visibility: true,
      language: true,
      category: { select: { slug: true } },
      _count: { select: { modules: true } },
    },
    orderBy: [{ category: { order: "asc" } }, { title: "asc" }],
  });

  for (const c of courses) {
    const tier = c.isPremium ? "💎 PREMIUM" : "🆓 FREE   ";
    const pub = c.isPublished ? "PUB" : "DRF";
    const gen = c.isAiGenerated ? "AI " : c.isUserGenerated ? "USR" : "SEED";
    console.log(
      `  ${tier} [${pub}] [${gen}] (${c.category.slug}/${c.language}) ${c.slug.padEnd(35)} — ${c.title}  [${c._count.modules} mod]`,
    );
  }

  console.log(`\n  Total: ${courses.length} course`);
  console.log(
    `  Free published: ${courses.filter((c) => !c.isPremium && c.isPublished).length}`,
  );
  console.log(
    `  Premium published: ${courses.filter((c) => c.isPremium && c.isPublished).length}`,
  );

  console.log("\n========== ENGLISH / BAHASA INGGRIS COURSES ==========");
  const englishCourses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: "Inggris", mode: "insensitive" } },
        { title: { contains: "English", mode: "insensitive" } },
        { slug: { contains: "english", mode: "insensitive" } },
        { slug: { contains: "inggris", mode: "insensitive" } },
        { category: { slug: "bahasa" } },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      isPremium: true,
      modules: {
        select: {
          id: true,
          title: true,
          slides: {
            select: {
              id: true,
              title: true,
              sources: {
                where: { type: "YOUTUBE" },
                select: { id: true, title: true, url: true },
              },
            },
          },
        },
      },
    },
  });

  for (const c of englishCourses) {
    console.log(
      `\n  📘 ${c.title} (${c.slug}) — ${c.isPremium ? "PREMIUM" : "FREE"}`,
    );
    let totalYt = 0;
    for (const m of c.modules) {
      const ytSources = m.slides.flatMap((s) => s.sources);
      totalYt += ytSources.length;
      if (ytSources.length > 0) {
        console.log(`    └ Modul: ${m.title}`);
        for (const src of ytSources) {
          console.log(`        🎬 ${src.title}`);
          console.log(`           ${src.url}`);
        }
      }
    }
    console.log(`    Total YouTube source: ${totalYt}`);
  }

  console.log("\n========== SEMUA YOUTUBE SOURCE (cek availability manual) ==========");
  const ytSources = await prisma.source.findMany({
    where: { type: "YOUTUBE" },
    select: {
      id: true,
      title: true,
      url: true,
      slide: {
        select: {
          title: true,
          module: {
            select: {
              title: true,
              course: { select: { slug: true, title: true } },
            },
          },
        },
      },
    },
  });

  console.log(`  Total YouTube source di DB: ${ytSources.length}`);
  // Group by course
  const byCourse: Record<string, typeof ytSources> = {};
  for (const s of ytSources) {
    const key = s.slide?.module?.course?.slug || "?";
    if (!byCourse[key]) byCourse[key] = [];
    byCourse[key].push(s);
  }
  for (const [slug, arr] of Object.entries(byCourse)) {
    console.log(`\n  📦 ${slug} (${arr.length} video)`);
    for (const s of arr.slice(0, 5)) {
      const videoId =
        s.url.match(/(?:v=|youtu\.be\/|embed\/)([^&?]+)/)?.[1] || "?";
      console.log(`     - ${s.title} → ${videoId}`);
    }
    if (arr.length > 5) console.log(`     ... +${arr.length - 5} lagi`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
