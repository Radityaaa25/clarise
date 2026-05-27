import { PrismaClient, Difficulty } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars (since this is a standalone script)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY is not set in .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const generatorModel = genAI.getGenerativeModel({
  model: 'gemini-flash-latest',
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.5,
    responseMimeType: 'application/json',
  },
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);
}

// ──────────────────────────────────────────────
// DATA KURSUS (Sebagian untuk contoh awal - bisa ditambah sesuai kebutuhan)
// ──────────────────────────────────────────────
const COURSES_TO_SEED = [
  // Kategori: Pemrograman
  { title: 'Dasar HTML & CSS', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'Dasar JavaScript', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'JavaScript Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar React dari Nol', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'React Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar Next.js', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  
  // Kategori: Matematika
  { title: 'Aritmatika Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'matematika' },
  { title: 'Aljabar Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'matematika' },
  { title: 'Aljabar Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  
  // Kategori: Bahasa
  { title: 'Bahasa Inggris Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Inggris Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  
  // Kategori: Pengembangan Diri
  { title: 'Manajemen Waktu', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pengembangan-diri' },
  { title: 'Deep Work', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Komunikasi Efektif', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pengembangan-diri' },
  // Catatan: Tambahkan 280 judul kursus di sini nantinya.
];

// Helper to delay execution (rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateCourseContent(topic: string, difficultyLabel: string) {
  const prompt = `Kamu adalah pembuat kursus edukasi profesional.
TUGAS: Buat sebuah kursus lengkap tentang topik "${topic}" dengan tingkat kesulitan "${difficultyLabel}".

ATURAN WAJIB:
1. Buat tepat 5 modul, masing-masing modul memiliki 3-5 slide (bab kecil).
2. Setiap slide berisi penjelasan Markdown yang detail, edukatif, dan praktis (minimal 200 kata per slide).
3. PRIORITASKAN sumber referensi dari Indonesia (website, artikel, YouTube Indonesia). Gunakan referensi global (Inggris) HANYA untuk melengkapi.
4. Setiap slide HARUS memiliki minimal 1 sumber referensi valid.

FORMAT OUTPUT HARUS BERUPA JSON KETAT SEPERTI INI (TANPA TEKS LAIN):
{
  "description": "Deskripsi singkat kursus ini (1-2 kalimat)",
  "modules": [
    {
      "title": "Judul Modul",
      "order": 1,
      "slides": [
        {
          "title": "Judul Slide",
          "order": 1,
          "content": "Konten slide format Markdown...",
          "sources": [
            { "title": "Nama Referensi", "url": "https://...", "type": "ARTICLE | YOUTUBE | DOCUMENTATION" }
          ]
        }
      ]
    }
  ]
}`;

  console.log(`[Gemini] Mengirim permintaan untuk topik: ${topic}...`);
  const result = await generatorModel.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text);
}

async function main() {
  console.log('🚀 Memulai Auto-Seeder Clarise...');
  
  // Ambil author admin pertama sebagai creator
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });
  const authorId = admin ? admin.id : null;

  for (let i = 0; i < COURSES_TO_SEED.length; i++) {
    const course = COURSES_TO_SEED[i];
    if (!course) continue;
    const diffLabel = course.difficulty === 'BEGINNER' ? 'Pemula' : course.difficulty === 'INTERMEDIATE' ? 'Menengah' : 'Lanjutan';
    const baseSlug = slugify(course.title);
    
    // Cek apakah kursus sudah ada (Resumeable)
    const existingCourse = await prisma.course.findFirst({
      where: { title: course.title }
    });
    
    if (existingCourse) {
      console.log(`✅ [Skip] Kursus '${course.title}' sudah ada di database.`);
      continue;
    }
    
    // Cari Kategori ID
    const category = await prisma.category.findUnique({
      where: { slug: course.categorySlug }
    });
    
    if (!category) {
      console.error(`❌ [Error] Kategori '${course.categorySlug}' tidak ditemukan untuk kursus '${course.title}'.`);
      continue;
    }

    try {
      console.log(`\n⏳ [Processing ${i+1}/${COURSES_TO_SEED.length}] Membuat '${course.title}'...`);
      const aiData = await generateCourseContent(course.title, diffLabel);
      
      let courseSlug = baseSlug;
      let slugCounter = 1;
      while (await prisma.course.findUnique({ where: { slug: courseSlug } })) {
        courseSlug = `${baseSlug}-${slugCounter++}`;
      }

      await prisma.$transaction(async (tx) => {
        const newCourse = await tx.course.create({
          data: {
            title: course.title,
            slug: courseSlug,
            description: aiData.description,
            categoryId: category.id,
            difficulty: course.difficulty as Difficulty,
            isPremium: course.isPremium,
            isAiGenerated: true,
            isUserGenerated: false,
            isPublished: true,
            visibility: 'PUBLIC',
            totalModules: aiData.modules.length,
            authorId,
          }
        });

        for (const mod of aiData.modules) {
          const modSlug = slugify(mod.title) || `mod-${mod.order}`;
          const newMod = await tx.module.create({
            data: {
              title: mod.title,
              slug: modSlug,
              courseId: newCourse.id,
              order: mod.order,
              xpReward: 20
            }
          });

          for (const slide of mod.slides) {
            const newSlide = await tx.slide.create({
              data: {
                title: slide.title,
                moduleId: newMod.id,
                order: slide.order,
                content: { type: 'markdown', body: slide.content }
              }
            });

            if (slide.sources && Array.isArray(slide.sources)) {
              for (const src of slide.sources) {
                await tx.source.create({
                  data: {
                    slideId: newSlide.id,
                    title: src.title || 'Referensi',
                    url: src.url || '#',
                    type: ['DOCUMENTATION', 'ARTICLE', 'YOUTUBE', 'BOOK'].includes(src.type) ? src.type : 'OTHER'
                  }
                });
              }
            }
          }
        }
      });
      console.log(`✅ [Success] Kursus '${course.title}' berhasil disimpan.`);
      
      // Delay 10 detik agar aman dari rate limit
      console.log('⏳ Menunggu 10 detik sebelum kursus berikutnya...');
      await delay(10000);
      
    } catch (err: any) {
      console.error(`❌ [Error] Gagal men-generate '${course.title}':`, err.message || err);
      console.log('⏳ Menunggu 15 detik sebelum mencoba kursus berikutnya...');
      await delay(15000); // Backoff if error
    }
  }
  
  console.log('\n🎉 Auto-Seeder Selesai!');
}

main().finally(async () => await prisma.$disconnect());
