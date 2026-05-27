import { PrismaClient, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "pemrograman" },
      update: {},
      create: { name: "Pemrograman", slug: "pemrograman", icon: "💻", description: "Belajar coding dan pengembangan software", order: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "matematika" },
      update: {},
      create: { name: "Matematika", slug: "matematika", icon: "📐", description: "Logika, aljabar, kalkulus, dan statistik", order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "sains" },
      update: {},
      create: { name: "Sains", slug: "sains", icon: "🔬", description: "Fisika, kimia, biologi, dan ilmu alam", order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "desain" },
      update: {},
      create: { name: "Desain", slug: "desain", icon: "🎨", description: "UI/UX, grafis, dan desain produk", order: 4 },
    }),
    prisma.category.upsert({
      where: { slug: "bahasa" },
      update: {},
      create: { name: "Bahasa", slug: "bahasa", icon: "🌐", description: "Bahasa Inggris, Jepang, dan linguistik", order: 5 },
    }),
    prisma.category.upsert({
      where: { slug: "data-science" },
      update: {},
      create: { name: "Data Science", slug: "data-science", icon: "📊", description: "Analisis data, machine learning, dan AI", order: 6 },
    }),
  ]);

  const [pemrograman, matematika, sains, desain, bahasa, dataScience] = categories;

  // Courses (6 courses, 1 per category)
  const coursesData = [
    { title: "Dasar-Dasar Python", slug: "dasar-python", description: "Pelajari fundamental Python dari nol hingga mahir membuat program sederhana.", categoryId: pemrograman.id, difficulty: Difficulty.BEGINNER, isPremium: false, isPublished: true },
    { title: "Aljabar Linear untuk Pemula", slug: "aljabar-linear", description: "Memahami vektor, matriks, dan transformasi linear.", categoryId: matematika.id, difficulty: Difficulty.BEGINNER, isPremium: false, isPublished: true },
    { title: "Fisika Mekanika Dasar", slug: "fisika-mekanika", description: "Hukum Newton, energi, dan momentum dalam kehidupan sehari-hari.", categoryId: sains.id, difficulty: Difficulty.BEGINNER, isPremium: false, isPublished: true },
    { title: "UI/UX Design Fundamentals", slug: "uiux-fundamentals", description: "Prinsip desain antarmuka dan pengalaman pengguna yang baik.", categoryId: desain.id, difficulty: Difficulty.BEGINNER, isPremium: true, isPublished: true },
    { title: "English for Tech Professionals", slug: "english-tech", description: "Bahasa Inggris praktis untuk dunia teknologi dan karir global.", categoryId: bahasa.id, difficulty: Difficulty.INTERMEDIATE, isPremium: true, isPublished: true },
    { title: "Pengantar Data Science", slug: "pengantar-data-science", description: "Eksplorasi data, visualisasi, dan dasar machine learning dengan Python.", categoryId: dataScience.id, difficulty: Difficulty.BEGINNER, isPremium: false, isPublished: true },
  ];

  const courses = await Promise.all(
    coursesData.map((c) =>
      prisma.course.upsert({
        where: { slug: c.slug },
        update: {},
        create: { ...c, totalModules: 3, visibility: "PUBLIC" },
      })
    )
  );

  // Modules (3 per course)
  const moduleTemplates = [
    ["Pengenalan & Setup", "Konsep Dasar", "Latihan Praktik"],
    ["Pendahuluan", "Teori Inti", "Studi Kasus"],
    ["Fondasi", "Pendalaman Materi", "Proyek Mini"],
    ["Prinsip Dasar", "Tools & Workflow", "Hands-on Project"],
    ["Vocabulary & Grammar", "Reading & Writing", "Speaking Practice"],
    ["Data Exploration", "Visualisasi Data", "Model Pertama"],
  ];

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i]!;
    const titles = moduleTemplates[i]!;
    for (let j = 0; j < titles.length; j++) {
      const slug = `${course.slug}-m${j + 1}`;
      await prisma.module.upsert({
        where: { courseId_slug: { courseId: course.id, slug } },
        update: {},
        create: {
          title: titles[j]!,
          slug,
          courseId: course.id,
          order: j + 1,
          xpReward: 20,
          content: `# ${titles[j]!}\n\nKonten modul ini akan segera tersedia. Silakan cek kembali nanti.`,
        },
      });
    }
  }

  // Badges
  const badgesData = [
    { name: "First Step", description: "Selesaikan 1 modul pertama", icon: "🏅", condition: "MODULE_COMPLETE_1" },
    { name: "Bookworm", description: "Selesaikan 5 course", icon: "📚", condition: "COURSE_COMPLETE_5" },
    { name: "On Fire", description: "Streak 7 hari berturut-turut", icon: "🔥", condition: "STREAK_7" },
    { name: "Unstoppable", description: "Streak 30 hari berturut-turut", icon: "⚡", condition: "STREAK_30" },
    { name: "AI Explorer", description: "Tanya AI sebanyak 50 kali", icon: "🧠", condition: "AI_CHAT_50" },
    { name: "Completionist", description: "Selesaikan semua modul dalam 1 course", icon: "🏆", condition: "COURSE_ALL_MODULES" },
    { name: "Reviewer", description: "Berikan rating pada 10 course", icon: "⭐", condition: "RATING_10" },
    { name: "Pro Exclusive", description: "Badge khusus subscriber Premium", icon: "👑", condition: "PREMIUM_ACTIVE" },
    { name: "Perfect Score", description: "Jawab semua quiz dengan benar", icon: "🎯", condition: "QUIZ_PERFECT" },
    { name: "Course Creator", description: "Buat 1 kursus yang di-publish public", icon: "🌟", condition: "COURSE_CREATED_PUBLIC" },
  ];

  for (const badge of badgesData) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  // Vouchers
  const now = new Date();
  await prisma.voucher.upsert({
    where: { code: "EARLYBIRD" },
    update: {},
    create: {
      code: "EARLYBIRD",
      type: "TRIAL",
      trialDays: 30,
      maxUses: 200,
      usedCount: 0,
      expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.voucher.upsert({
    where: { code: "CLARISEBETA" },
    update: {},
    create: {
      code: "CLARISEBETA",
      type: "TRIAL",
      trialDays: 30,
      maxUses: 30,
      usedCount: 0,
      expiresAt: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
    },
  });

  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
