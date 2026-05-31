 
// Update YouTube source URL yang rusak (404) di DB.
// Dry-run default. Pakai `--apply` untuk eksekusi beneran.
//
// Run dry-run:  node --env-file=.env.local --import tsx scripts/fix-youtube-urls.ts
// Run apply:    node --env-file=.env.local --import tsx scripts/fix-youtube-urls.ts --apply

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mapping replacement (verified via oEmbed pada 2026-05-30).
// Setiap entry: untuk course `slug`, replace SEMUA Source bertipe YOUTUBE
// yang URL-nya match `oldVideoId` → ke videoId + title baru.
const REPLACEMENTS: Array<{
  courseSlug: string;
  oldVideoId: string;
  newVideoId: string;
  newTitle: string;
  authorNote: string;
}> = [
  {
    courseSlug: "belajar-javascript-dasar",
    oldVideoId: "RkpmscoaH80",
    newVideoId: "PkZNo7MFNFg",
    newTitle: "Learn JavaScript - Full Course for Beginners (FreeCodeCamp)",
    authorNote: "freeCodeCamp.org",
  },
  {
    courseSlug: "belajar-nextjs-16-dasar",
    oldVideoId: "KBsJbHMeO6E",
    newVideoId: "ZVnjOPwW4ZA",
    newTitle: "Next.js Tutorial for Beginners — App Router (Programming with Mosh)",
    authorNote: "Programming with Mosh",
  },
  {
    courseSlug: "belajar-golang-dasar",
    oldVideoId: "KBsJbHMeO6E",
    newVideoId: "yyUHQIec83I",
    newTitle: "Golang Tutorial for Beginners — Full Go Course (TechWorld with Nana)",
    authorNote: "TechWorld with Nana",
  },
  {
    courseSlug: "bahasa-inggris-komprehensif-mastery",
    oldVideoId: "1xEQGveU1m0",
    newVideoId: "mScixcyubUY",
    newTitle: "Learn English Tenses: How to learn ALL 12 tenses (engVid)",
    authorNote: "Learn English with Rebecca · engVid",
  },
];

const args = process.argv.slice(2);
const apply = args.includes("--apply");

async function main() {
  console.log(
    `\n${apply ? "🛠  APPLY MODE" : "🔍 DRY-RUN MODE"} — replacement YouTube URL\n`,
  );

  let totalToUpdate = 0;

  for (const r of REPLACEMENTS) {
    const course = await prisma.course.findUnique({
      where: { slug: r.courseSlug },
      select: { id: true, title: true },
    });
    if (!course) {
      console.log(`  ⚠️  Course "${r.courseSlug}" tidak ditemukan, skip.`);
      continue;
    }

    // Cari semua Source YouTube di slide course ini yang URL-nya mengandung
    // oldVideoId. Pakai relation filter slide → module → course.
    const sources = await prisma.source.findMany({
      where: {
        type: "YOUTUBE",
        url: { contains: r.oldVideoId },
        slide: {
          module: { courseId: course.id },
        },
      },
      select: { id: true, url: true, title: true },
    });

    console.log(
      `\n  📦 ${r.courseSlug} — "${course.title}"`,
    );
    console.log(`     OLD: ${r.oldVideoId}`);
    console.log(`     NEW: ${r.newVideoId} ("${r.newTitle}")`);
    console.log(`     Source row to update: ${sources.length}`);

    if (sources.length === 0) continue;
    totalToUpdate += sources.length;

    if (apply) {
      const newUrl = `https://www.youtube.com/watch?v=${r.newVideoId}`;
      const result = await prisma.source.updateMany({
        where: { id: { in: sources.map((s) => s.id) } },
        data: { url: newUrl, title: r.newTitle },
      });
      console.log(`     ✅ Updated ${result.count} row.`);
    }
  }

  console.log(
    `\n========== ${apply ? "APPLY" : "DRY-RUN"} SELESAI ==========`,
  );
  console.log(`  Total Source row ${apply ? "diupdate" : "akan diupdate"}: ${totalToUpdate}`);
  if (!apply) {
    console.log(
      `\n  Untuk eksekusi beneran, run dengan flag --apply:\n`,
    );
    console.log(
      `  node --env-file=.env.local --import tsx scripts/fix-youtube-urls.ts --apply\n`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
