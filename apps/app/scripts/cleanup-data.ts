 
// Cleanup data inconsistency:
//  1. Hapus modul kosong (0 slide) yang merupakan duplikat title dengan
//     modul lain di course yang sama → orphan dari proses generate ulang.
//  2. Sync field Course.totalModules dengan jumlah modul aktual.
//
// Dry-run default. Pakai --apply untuk eksekusi.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const apply = process.argv.includes("--apply");

async function main() {
  console.log(
    `\n${apply ? "🛠  APPLY MODE" : "🔍 DRY-RUN MODE"} — cleanup data\n`,
  );

  // ─── Step 1: cari modul kosong yang punya twin (title sama di course yang sama) ───
  const allModules = await prisma.module.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      courseId: true,
      course: { select: { slug: true } },
      _count: { select: { slides: true } },
    },
  });

  // Group by (courseId, normalizedTitle)
  const byTitle = new Map<string, typeof allModules>();
  for (const m of allModules) {
    const k = `${m.courseId}|${m.title.toLowerCase().trim()}`;
    if (!byTitle.has(k)) byTitle.set(k, []);
    byTitle.get(k)!.push(m);
  }

  const toDelete: typeof allModules = [];
  for (const arr of byTitle.values()) {
    if (arr.length < 2) continue;
    const empty = arr.filter((m) => m._count.slides === 0);
    const withSlides = arr.filter((m) => m._count.slides > 0);
    // Hapus yang kosong jika ada twin yang punya slide.
    if (empty.length > 0 && withSlides.length > 0) {
      toDelete.push(...empty);
    }
  }

  console.log(`  Modul orphan (kosong + duplikat title): ${toDelete.length}`);
  for (const m of toDelete) {
    console.log(`    ❌ [${m.course.slug}] "${m.title}" (id=${m.id}, slug=${m.slug})`);
  }

  if (apply && toDelete.length > 0) {
    const r = await prisma.module.deleteMany({
      where: { id: { in: toDelete.map((m) => m.id) } },
    });
    console.log(`    ✅ Deleted ${r.count} module.`);
  }

  // ─── Step 2: sync totalModules ───
  console.log("\n  Sinkronisasi Course.totalModules...");
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      totalModules: true,
      _count: { select: { modules: true } },
    },
  });
  const mismatches = courses.filter(
    (c) => c.totalModules !== c._count.modules,
  );
  console.log(`  Mismatch: ${mismatches.length}`);
  for (const c of mismatches) {
    console.log(
      `    ${apply ? "✅" : "•"} ${c.slug}: ${c.totalModules} → ${c._count.modules}`,
    );
    if (apply) {
      await prisma.course.update({
        where: { id: c.id },
        data: { totalModules: c._count.modules },
      });
    }
  }

  // Re-audit setelah delete (di apply mode)
  if (apply && toDelete.length > 0) {
    // Sync sekali lagi setelah hapus modul kosong, kalau hapusnya bikin
    // count berubah lagi.
    const post = await prisma.course.findMany({
      select: {
        id: true,
        slug: true,
        totalModules: true,
        _count: { select: { modules: true } },
      },
    });
    for (const c of post) {
      if (c.totalModules !== c._count.modules) {
        await prisma.course.update({
          where: { id: c.id },
          data: { totalModules: c._count.modules },
        });
        console.log(
          `    ✅ Post-delete sync ${c.slug}: ${c.totalModules} → ${c._count.modules}`,
        );
      }
    }
  }

  console.log(
    `\n========== ${apply ? "APPLY" : "DRY-RUN"} SELESAI ==========\n`,
  );
  if (!apply) {
    console.log(
      "  Run: node --env-file=.env.local --import tsx scripts/cleanup-data.ts --apply\n",
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
