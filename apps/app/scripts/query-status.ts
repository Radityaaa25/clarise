import { prisma } from "./_seed-helpers";

async function main() {
  // Query 1 — Ringkasan per kategori
  console.log("\n=== QUERY 1: Ringkasan per kategori ===\n");
  const q1 = await prisma.$queryRaw<
    { kategori: string; jumlah_kursus_aktif: bigint }[]
  >`
    SELECT 
      cat.name AS kategori,
      COUNT(DISTINCT co.id) AS jumlah_kursus_aktif
    FROM "Category" cat
    LEFT JOIN "Course" co ON co."categoryId" = cat.id
    LEFT JOIN "Module" m ON m."courseId" = co.id
    WHERE m.id IS NOT NULL
    GROUP BY cat.name
    ORDER BY cat.name
  `;
  for (const row of q1) {
    console.log(`${row.kategori}: ${row.jumlah_kursus_aktif}`);
  }

  // Query 2 — Detail kursus dan jumlah modul
  console.log("\n=== QUERY 2: Detail kursus ===\n");
  const q2 = await prisma.$queryRaw<
    {
      kategori: string;
      judul_kursus: string;
      isPremium: boolean;
      difficulty: string;
      jumlah_modul: bigint;
    }[]
  >`
    SELECT 
      cat.name AS kategori,
      co.title AS judul_kursus,
      co."isPremium",
      co.difficulty,
      COUNT(m.id) AS jumlah_modul
    FROM "Course" co
    JOIN "Category" cat ON co."categoryId" = cat.id
    LEFT JOIN "Module" m ON m."courseId" = co.id
    GROUP BY cat.name, co.title, co."isPremium", co.difficulty
    ORDER BY cat.name, co.title
  `;
  for (const row of q2) {
    const status = Number(row.jumlah_modul) === 0 ? "❌ KOSONG" : `${row.jumlah_modul} modul`;
    console.log(
      `[${row.kategori}] ${row.judul_kursus} — ${row.isPremium ? "Premium" : "Free"} (${row.difficulty}) — ${status}`
    );
  }

  // Query 3 — Cek category slugs
  console.log("\n=== QUERY 3: Category slugs ===\n");
  const cats = await prisma.category.findMany({
    select: { name: true, slug: true },
    orderBy: { name: "asc" },
  });
  for (const c of cats) {
    console.log(`${c.name} → slug: "${c.slug}"`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
