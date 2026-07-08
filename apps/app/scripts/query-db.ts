import { prisma } from "./_seed-helpers";

async function main() {
  // Query 1: Ringkasan per kategori
  const result1 = await prisma.$queryRaw`
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
  
  console.log("\n=== QUERY 1: Ringkasan Per Kategori ===");
  console.table(result1);
  
  // Query 2: Detail kursus dan jumlah modulnya
  const result2 = await prisma.$queryRaw`
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
  
  console.log("\n=== QUERY 2: Detail Kursus ===");
  console.table(result2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
