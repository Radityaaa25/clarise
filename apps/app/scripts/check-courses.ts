import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

if (fs.existsSync(".env.local")) {
  const envConfig = fs.readFileSync(".env.local", "utf-8");
  envConfig.split("\n").forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && match[1] && match[2]) {
      process.env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
    }
  });
}


const prisma = new PrismaClient();

async function main() {
  const result1 = await prisma.$queryRaw`
    SELECT 
      cat.name AS kategori,
      COUNT(DISTINCT co.id)::int AS jumlah_kursus_aktif
    FROM "Category" cat
    LEFT JOIN "Course" co ON co."categoryId" = cat.id
    LEFT JOIN "Module" m ON m."courseId" = co.id
    WHERE m.id IS NOT NULL
    GROUP BY cat.name
    ORDER BY cat.name;
  `;

  console.log("=== QUERY 1: Kategori & Jumlah Kursus Aktif ===");
  console.table(result1);

  const result2 = await prisma.$queryRaw`
    SELECT 
      cat.name AS kategori,
      co.title AS judul_kursus,
      co."isPremium",
      co.difficulty,
      COUNT(m.id)::int AS jumlah_modul
    FROM "Course" co
    JOIN "Category" cat ON co."categoryId" = cat.id
    LEFT JOIN "Module" m ON m."courseId" = co.id
    GROUP BY cat.name, co.title, co."isPremium", co.difficulty
    ORDER BY cat.name, co.title;
  `;

  console.log("\n=== QUERY 2: Detail Kursus & Jumlah Modul ===");
  console.table(result2);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
