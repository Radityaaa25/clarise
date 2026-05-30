/* eslint-disable */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n========== AUDIT 1: Empty modules (0 slides) ==========");
  const emptyModules = await prisma.module.findMany({
    where: { slides: { none: {} } },
    select: {
      id: true,
      title: true,
      slug: true,
      course: { select: { slug: true, title: true } },
    },
  });
  console.log(`  Total: ${emptyModules.length}`);
  for (const m of emptyModules) {
    console.log(`  ⚠️  [${m.course.slug}] "${m.title}" (slug: ${m.slug}, id: ${m.id})`);
  }

  console.log("\n========== AUDIT 2: Module dengan slug duplikat di course yang sama ==========");
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
  const dupKey = new Map<string, typeof allModules>();
  for (const m of allModules) {
    const key = `${m.courseId}|${m.slug}`;
    if (!dupKey.has(key)) dupKey.set(key, []);
    dupKey.get(key)!.push(m);
  }
  let dupCount = 0;
  for (const [key, arr] of dupKey) {
    if (arr.length > 1) {
      dupCount++;
      const first = arr[0]!;
      console.log(`  ⚠️  Duplikat: course ${first.course.slug} → slug "${first.slug}"`);
      for (const m of arr) {
        console.log(`     - id=${m.id} title="${m.title}" slides=${m._count.slides}`);
      }
    }
  }
  if (dupCount === 0) console.log("  ✅ Tidak ada duplikat slug.");

  console.log("\n========== AUDIT 3: Module dengan title sama di course yang sama ==========");
  const titleKey = new Map<string, typeof allModules>();
  for (const m of allModules) {
    const key = `${m.courseId}|${m.title.toLowerCase().trim()}`;
    if (!titleKey.has(key)) titleKey.set(key, []);
    titleKey.get(key)!.push(m);
  }
  let titleDup = 0;
  for (const [key, arr] of titleKey) {
    if (arr.length > 1) {
      titleDup++;
      const first = arr[0]!;
      console.log(`  ⚠️  Title sama: course ${first.course.slug} → "${first.title}"`);
      for (const m of arr) {
        console.log(`     - id=${m.id} slug=${m.slug} slides=${m._count.slides}`);
      }
    }
  }
  if (titleDup === 0) console.log("  ✅ Tidak ada title duplikat.");

  console.log("\n========== AUDIT 4: totalModules vs aktual ==========");
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      totalModules: true,
      _count: { select: { modules: true } },
    },
  });
  for (const c of courses) {
    if (c.totalModules !== c._count.modules) {
      console.log(
        `  ⚠️  ${c.slug}: totalModules=${c.totalModules} tapi aktual=${c._count.modules}`,
      );
    }
  }

  console.log("\n========== AUDIT 5: Slide tanpa source di course publish ==========");
  const slidesNoSource = await prisma.slide.findMany({
    where: {
      sources: { none: {} },
      module: { course: { isPublished: true } },
    },
    select: {
      title: true,
      content: true,
      module: {
        select: { title: true, course: { select: { slug: true } } },
      },
    },
  });
  console.log(`  Slide tanpa source: ${slidesNoSource.length}`);
  // Group by course
  const byCourse: Record<string, number> = {};
  for (const s of slidesNoSource) {
    const k = s.module.course.slug;
    byCourse[k] = (byCourse[k] || 0) + 1;
  }
  for (const [slug, count] of Object.entries(byCourse)) {
    console.log(`     ${slug}: ${count} slide`);
  }
  // Sample beberapa untuk lihat tipenya (kuis/challenge biasanya gak punya source)
  if (slidesNoSource.length > 0) {
    console.log(`  Sample 3 slide tanpa source:`);
    for (const s of slidesNoSource.slice(0, 3)) {
      const t = (s.content as any)?.type || "?";
      console.log(`     [${t}] ${s.module.course.slug} → ${s.module.title} → "${s.title}"`);
    }
  }

  console.log("\n========== AUDIT 6: UserProgress orphan (course/module sudah dihapus) ==========");
  const orphanProgress = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*)::bigint AS count
    FROM "UserProgress" up
    LEFT JOIN "Module" m ON up."moduleId" = m.id
    LEFT JOIN "Course" c ON up."courseId" = c.id
    WHERE m.id IS NULL OR c.id IS NULL
  `;
  console.log(`  Orphan UserProgress: ${orphanProgress[0]?.count || 0}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
