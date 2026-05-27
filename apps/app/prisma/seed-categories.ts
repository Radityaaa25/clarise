import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Pemrograman', slug: 'pemrograman', icon: 'Code', description: 'Pelajari bahasa pemrograman, web, mobile, hingga DevOps.', order: 1 },
  { name: 'Matematika', slug: 'matematika', icon: 'Calculator', description: 'Kuasai ilmu pasti dari dasar hingga tingkat lanjut.', order: 2 },
  { name: 'Sains', slug: 'sains', icon: 'FlaskConical', description: 'Eksplorasi ilmu fisika, kimia, biologi, dan alam.', order: 3 },
  { name: 'Bahasa', slug: 'bahasa', icon: 'Languages', description: 'Pelajari berbagai bahasa dari seluruh dunia.', order: 4 },
  { name: 'Desain', slug: 'desain', icon: 'Palette', description: 'Kembangkan kreativitas melalui desain grafis dan UI/UX.', order: 5 },
  { name: 'Bisnis & Kewirausahaan', slug: 'bisnis-kewirausahaan', icon: 'Briefcase', description: 'Strategi bisnis, manajemen, dan marketing modern.', order: 6 },
  { name: 'Keuangan & Akuntansi', slug: 'keuangan-akuntansi', icon: 'Landmark', description: 'Kelola uang, investasi, dan pahami akuntansi.', order: 7 },
  { name: 'Hukum & Pemerintahan', slug: 'hukum-pemerintahan', icon: 'Scale', description: 'Pelajari sistem hukum dan administrasi negara.', order: 8 },
  { name: 'Sejarah & Humaniora', slug: 'sejarah-humaniora', icon: 'BookOpen', description: 'Pahami masa lalu dan budaya umat manusia.', order: 9 },
  { name: 'Kesehatan & Kebugaran', slug: 'kesehatan-kebugaran', icon: 'Activity', description: 'Pola hidup sehat, medis, dan olahraga.', order: 10 },
  { name: 'Persiapan Akademik', slug: 'persiapan-akademik', icon: 'GraduationCap', description: 'Persiapan tes CPNS, UTBK, TOEFL, dan LPDP.', order: 11 },
  { name: 'Seni & Musik', slug: 'seni-musik', icon: 'Music', description: 'Eksplorasi bakat seni, musik, dan pertunjukan.', order: 12 },
  { name: 'Teknik & Rekayasa', slug: 'teknik-rekayasa', icon: 'Wrench', description: 'Ilmu teknik sipil, elektro, dan industri.', order: 13 },
  { name: 'Pertanian & Lingkungan', slug: 'pertanian-lingkungan', icon: 'Leaf', description: 'Budidaya tanaman, perikanan, dan ekologi.', order: 14 },
  { name: 'Pariwisata & Perhotelan', slug: 'pariwisata-perhotelan', icon: 'Plane', description: 'Manajemen hospitality dan pariwisata modern.', order: 15 },
  { name: 'Pengembangan Diri', slug: 'pengembangan-diri', icon: 'Brain', description: 'Tingkatkan produktivitas dan skill komunikasi.', order: 16 },
];

async function main() {
  console.log('Seeding categories...');
  
  for (const cat of categories) {
    const existingCat = await prisma.category.findUnique({
      where: { slug: cat.slug }
    });
    
    if (existingCat) {
      console.log(`Category ${cat.name} already exists. Skipping.`);
      continue;
    }
    
    await prisma.category.create({
      data: cat,
    });
    console.log(`Created category: ${cat.name}`);
  }
  
  console.log('Category seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
