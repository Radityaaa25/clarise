/* eslint-disable */
// Audit: ambil semua Category beserta jumlah course aktif (>=1 modul).
// Urutan output mengikuti urutan kategori di COURSE.md (parent → sub).
// Run: node --env-file=.env.local --import tsx scripts/audit-categories.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Urutan canonical sesuai COURSE.md (top-down).
// Kategori = parent (huruf besar) atau sub-category (slug DB).
const COURSE_MD_ORDER: string[] = [
  // 1. Pemrograman
  "pemrograman",
  "web-development",
  "backend-development",
  "mobile-development",
  "database",
  "devops-tools",
  "data-science-ai",
  "keamanan-siber-etis",
  // 2. Matematika
  "matematika",
  "matematika-dasar",
  "matematika-terapan",
  // 3. Sains
  "sains",
  "fisika",
  "kimia",
  "biologi",
  "ipa-sains-terapan",
  // 4. Bahasa
  "bahasa",
  "bahasa-indonesia",
  "bahasa-inggris",
  "bahasa-asing-lainnya",
  // 5. Desain
  "desain",
  "desain-grafis",
  "ui-ux-design",
  "ilustrasi-seni-digital",
  "fotografi-videografi",
  // 6. Bisnis & Kewirausahaan
  "bisnis-kewirausahaan",
  "kewirausahaan",
  "manajemen",
  "pemasaran",
  "marketing",
  // 7. Keuangan & Akuntansi
  "keuangan-akuntansi",
  "akuntansi",
  "keuangan-pribadi",
  "excel-tools-keuangan",
  // 8. Hukum & Pemerintahan
  "hukum-pemerintahan",
  "hukum",
  "pemerintahan-kebijakan",
  "ujian-seleksi",
  // 9. Sejarah & Humaniora
  "sejarah-humaniora",
  "sejarah",
  "ilmu-sosial",
  "filsafat-etika",
  // 10. Kesehatan & Kebugaran
  "kesehatan-kebugaran",
  "kesehatan",
  "kebugaran-olahraga",
  // 11. Persiapan Akademik
  "persiapan-akademik",
  "ujian-masuk",
  "keterampilan-akademik",
  // 12. Seni & Musik
  "seni-musik",
  "musik",
  "seni-pertunjukan",
  // 13. Teknik & Rekayasa
  "teknik-rekayasa",
  "teknik-sipil-arsitektur",
  "teknik-elektro-elektronika",
  "teknik-industri",
  // 14. Pertanian & Lingkungan
  "pertanian-lingkungan",
  "pertanian",
  "lingkungan",
  // 15. Pariwisata & Perhotelan
  "pariwisata-perhotelan",
  // 16. Pengembangan Diri
  "pengembangan-diri",
  "produktivitas",
  "karir-profesionalisme",
  "komunikasi",
  // misc
  "web3-blockchain",
  "fotografi",
];

async function main() {
  // Ambil Category + count course yang punya minimal 1 modul.
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      courses: {
        where: { modules: { some: {} } },
        select: { slug: true, title: true, isPremium: true, difficulty: true },
      },
    },
  });

  const map = new Map(categories.map((c) => [c.slug, c]));

  console.log("\n========== AUDIT KATEGORI (urutan COURSE.md) ==========\n");
  console.log(
    `${"Kategori".padEnd(32)} ${"Slug".padEnd(28)} Course aktif  Status`,
  );
  console.log("─".repeat(80));

  let firstUnder5: typeof categories[number] | null = null;

  for (const slug of COURSE_MD_ORDER) {
    const c = map.get(slug);
    if (!c) {
      console.log(
        `${"(MISSING)".padEnd(32)} ${slug.padEnd(28)}     -          ⚠️  Tidak ada di DB`,
      );
      continue;
    }
    const count = c.courses.length;
    const status = count >= 5 ? "✅" : "🔄";
    console.log(
      `${c.name.padEnd(32)} ${c.slug.padEnd(28)}     ${String(count).padStart(2)}          ${status}`,
    );
    if (count < 5 && !firstUnder5) {
      firstUnder5 = c;
    }
  }

  // Show kategori DB yang tidak masuk daftar canonical (orphan).
  const knownSlugs = new Set(COURSE_MD_ORDER);
  const orphans = categories.filter((c) => !knownSlugs.has(c.slug));
  if (orphans.length > 0) {
    console.log("\n  Kategori DB yang tidak ada di urutan canonical:");
    for (const c of orphans) {
      console.log(`    • ${c.slug.padEnd(28)} (${c.courses.length} course)`);
    }
  }

  console.log("\n========== KATEGORI TARGET ==========\n");
  if (firstUnder5) {
    console.log(`  🎯 ${firstUnder5.name} (slug: ${firstUnder5.slug})`);
    console.log(`  Course aktif: ${firstUnder5.courses.length} (butuh ${5 - firstUnder5.courses.length} lagi)`);
    console.log("  Course yang sudah ada:");
    for (const co of firstUnder5.courses) {
      const tier = co.isPremium ? "💎" : "🆓";
      console.log(`    ${tier} ${co.slug} — "${co.title}" (${co.difficulty})`);
    }
  } else {
    console.log("  ✅ Semua kategori sudah ≥ 5 course aktif.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
