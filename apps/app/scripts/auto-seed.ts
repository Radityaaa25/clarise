import { PrismaClient, Difficulty } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars (since this is a standalone script)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();
const apiKey = process.env.GEMINI_API_KEY_ADMIN || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY_ADMIN or GEMINI_API_KEY is not set in .env.local');
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
// FULL COURSE CATALOG — 280 Kursus, 16 Kategori
// 🟢 BEGINNER = Gratis | 🟡 INTERMEDIATE = Predmium | 🔴 ADVANCED = Premium
// ──────────────────────────────────────────────
const COURSES_TO_SEED = [
  // ═══════════════════════════════════════════════
  // 1. PEMROGRAMAN (47 kursus)
  // ═══════════════════════════════════════════════
  // Web Development
  { title: 'Dasar HTML & CSS', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'Dasar JavaScript', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'JavaScript Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar React dari Nol', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'React Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar Next.js', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Next.js Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Dasar TypeScript', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'TypeScript Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar Tailwind CSS', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar Vue.js', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Fullstack dengan TRPC', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  // Backend Development
  { title: 'Dasar Node.js', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'Express.js', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar Laravel', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Laravel Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar NestJS', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Dasar Python untuk Web', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'FastAPI Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar GraphQL', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Microservices Architecture', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  // Mobile Development
  { title: 'Dasar React Native', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'React Native Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'React Native Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar Flutter', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Flutter Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  // Database
  { title: 'Dasar SQL', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'PostgreSQL Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Database Design', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'MongoDB', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar Prisma ORM', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Redis', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  // DevOps & Tools
  { title: 'Dasar Git & GitHub', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'Git Lanjutan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Dasar Docker', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Docker & Kubernetes', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'CI/CD dengan GitHub Actions', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'AWS untuk Developer', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Linux untuk Developer', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  // Data Science & AI
  { title: 'Dasar Python', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'Python untuk Data Science', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Machine Learning dengan Python', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Deep Learning', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Belajar SQL untuk Analisis Data', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Computer Vision', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Natural Language Processing', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Prompt Engineering', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  // Keamanan Siber
  { title: 'Dasar Keamanan Web', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pemrograman' },
  { title: 'Ethical Hacking Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Web Application Security', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pemrograman' },
  { title: 'Kriptografi Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pemrograman' },

  // ═══════════════════════════════════════════════
  // 2. MATEMATIKA (13 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Aritmatika Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'matematika' },
  { title: 'Aljabar Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'matematika' },
  { title: 'Aljabar Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  { title: 'Geometri Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'matematika' },
  { title: 'Geometri Lanjutan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  { title: 'Statistika Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  { title: 'Statistika Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'matematika' },
  { title: 'Probabilitas', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  { title: 'Kalkulus Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  { title: 'Kalkulus Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'matematika' },
  { title: 'Aljabar Linear', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  { title: 'Matematika Diskrit', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'matematika' },
  { title: 'Matematika untuk Machine Learning', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'matematika' },
  { title: 'Matematika Keuangan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },
  { title: 'Riset Operasi', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'matematika' },
  { title: 'Statistika untuk Bisnis', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'matematika' },

  // ═══════════════════════════════════════════════
  // 3. SAINS (21 kursus)
  // ═══════════════════════════════════════════════
  // Fisika
  { title: 'Fisika Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  { title: 'Fisika Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Fisika Modern', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'sains' },
  { title: 'Fisika untuk Teknik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Astronomi Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  // Kimia
  { title: 'Kimia Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  { title: 'Kimia Organik Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Kimia Analitik', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'sains' },
  { title: 'Kimia Fisika', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Kimia dalam Kehidupan', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  // Biologi
  { title: 'Biologi Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  { title: 'Biologi Molekuler', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Bioteknologi', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'sains' },
  { title: 'Ekologi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Anatomi Manusia Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  { title: 'Mikrobiologi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  // IPA
  { title: 'IPA SD', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  { title: 'IPA SMP', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  { title: 'IPA Terpadu SMA', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Sains Lingkungan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  // Lainnya
  { title: 'Geografi Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },
  { title: 'Geografi Fisik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Meteorologi Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sains' },
  { title: 'Ilmu Gizi Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sains' },

  // ═══════════════════════════════════════════════
  // 4. BAHASA (26 kursus)
  // ═══════════════════════════════════════════════
  // Bahasa Indonesia
  { title: 'Bahasa Indonesia Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Menulis Profesional', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Public Speaking', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Penulisan Kreatif', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Jurnalistik Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  // Bahasa Inggris
  { title: 'Bahasa Inggris Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Inggris Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Bahasa Inggris Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bahasa' },
  { title: 'English Conversation', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Business English', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Academic Writing', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bahasa' },
  // Bahasa Asing
  { title: 'Bahasa Arab Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Arab Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Bahasa Jepang Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Jepang Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Bahasa Korea Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Korea Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Bahasa Mandarin Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Mandarin Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },
  { title: 'Bahasa Jerman Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Prancis Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Spanyol Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bahasa' },
  { title: 'Bahasa Belanda Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bahasa' },

  // ═══════════════════════════════════════════════
  // 5. DESAIN (26 kursus)
  // ═══════════════════════════════════════════════
  // Desain Grafis
  { title: 'Dasar Desain Grafis', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'desain' },
  { title: 'Adobe Photoshop', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Adobe Illustrator', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Adobe InDesign', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },
  { title: 'Canva untuk Profesional', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Figma Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },
  { title: 'Desain Logo', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Desain Poster & Flyer', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Motion Graphics', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },
  // UI/UX Design
  { title: 'Dasar UI Design', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'desain' },
  { title: 'UX Research', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Figma untuk UI Design', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Design System', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },
  { title: 'Mobile UI Design', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },
  { title: 'Prototipe Interaktif', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  // Ilustrasi & Seni Digital
  { title: 'Menggambar Digital Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'desain' },
  { title: 'Ilustrasi Karakter', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Concept Art', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },
  { title: 'Komik & Webtoon', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Procreate', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  // Fotografi & Videografi
  { title: 'Fotografi Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'desain' },
  { title: 'Fotografi Produk', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Fotografi Portrait', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Videografi Dasar', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },
  { title: 'Video Editing', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'desain' },
  { title: 'Color Grading', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'desain' },

  // ═══════════════════════════════════════════════
  // 6. BISNIS & KEWIRAUSAHAAN (21 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Dasar Kewirausahaan', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Validasi Ide Bisnis', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Business Model Canvas', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Startup Fundraising', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'UMKM Digital', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Scaling Bisnis', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Franchise & Waralaba', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Dasar Manajemen', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Manajemen Proyek', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Agile & Scrum', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Manajemen Strategis', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Manajemen SDM', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Manajemen Operasional', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Kepemimpinan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Dasar Marketing', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Digital Marketing', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Social Media Marketing', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Performance Marketing', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Email Marketing', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Growth Hacking', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Brand Building', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Copywriting', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },
  { title: 'Marketing Analytics', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'bisnis-kewirausahaan' },

  // ═══════════════════════════════════════════════
  // 7. KEUANGAN & AKUNTANSI (20 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Akuntansi Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'keuangan-akuntansi' },
  { title: 'Akuntansi Keuangan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Akuntansi Manajerial', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Akuntansi Biaya', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Perpajakan Indonesia', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Audit Dasar', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Akuntansi untuk UMKM', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Literasi Keuangan Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'keuangan-akuntansi' },
  { title: 'Investasi untuk Pemula', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Investasi Saham', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Investasi Properti', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Perencanaan Keuangan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Asuransi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Kripto Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Microsoft Excel Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'keuangan-akuntansi' },
  { title: 'Excel Menengah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Excel Lanjutan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Google Sheets', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },
  { title: 'Power BI Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'keuangan-akuntansi' },

  // ═══════════════════════════════════════════════
  // 8. HUKUM & PEMERINTAHAN (16 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Pengantar Ilmu Hukum', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hukum Perdata', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hukum Bisnis', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hukum Ketenagakerjaan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hukum Perlindungan Konsumen', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hak Kekayaan Intelektual', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hukum Pajak', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hukum Teknologi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Sistem Pemerintahan Indonesia', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'hukum-pemerintahan' },
  { title: 'Otonomi Daerah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Administrasi Publik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Kebijakan Publik', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hukum Tata Negara', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Hubungan Internasional Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Persiapan CPNS', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },
  { title: 'Persiapan BUMN', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'hukum-pemerintahan' },

  // ═══════════════════════════════════════════════
  // 9. SEJARAH & HUMANIORA (18 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Sejarah Indonesia Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sejarah-humaniora' },
  { title: 'Sejarah Indonesia Modern', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Sejarah Dunia', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Sejarah Islam', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Filsafat Sejarah', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Sejarah Perang Dunia', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sejarah-humaniora' },
  { title: 'IPS SD', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sejarah-humaniora' },
  { title: 'IPS SMP', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sejarah-humaniora' },
  { title: 'Sosiologi Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Antropologi Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Psikologi Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Psikologi Sosial', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Ekonomi Makro', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Ekonomi Mikro', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Filsafat Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'sejarah-humaniora' },
  { title: 'Etika Profesi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Filsafat Ilmu', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },
  { title: 'Etika Digital', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'sejarah-humaniora' },

  // ═══════════════════════════════════════════════
  // 10. KESEHATAN & KEBUGARAN (11 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Kesehatan Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Gizi dan Nutrisi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Kesehatan Mental', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Pertolongan Pertama P3K', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Kesehatan Reproduksi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Farmakologi Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Olahraga untuk Pemula', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Program Latihan Gym', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Yoga Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Nutrisi untuk Olahraga', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'kesehatan-kebugaran' },
  { title: 'Personal Trainer Dasar', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'kesehatan-kebugaran' },

  // ═══════════════════════════════════════════════
  // 11. PERSIAPAN AKADEMIK (11 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Persiapan UTBK SNBT', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Matematika Dasar UTBK', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Bahasa Indonesia UTBK', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Bahasa Inggris UTBK', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Penalaran Umum', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Persiapan Beasiswa LPDP', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Cara Belajar Efektif', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'persiapan-akademik' },
  { title: 'Menulis Karya Ilmiah', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Riset dan Metodologi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Presentasi Akademik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },
  { title: 'Berpikir Kritis', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'persiapan-akademik' },

  // ═══════════════════════════════════════════════
  // 12. SENI & MUSIK (7 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Teori Musik Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'seni-musik' },
  { title: 'Gitar Akustik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'seni-musik' },
  { title: 'Piano Keyboard Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'seni-musik' },
  { title: 'Produksi Musik Digital', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'seni-musik' },
  { title: 'Vokal dan Olah Suara', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'seni-musik' },
  { title: 'Akting Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'seni-musik' },
  { title: 'Public Speaking dan MC', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'seni-musik' },
  { title: 'Penulisan Skenario', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'seni-musik' },

  // ═══════════════════════════════════════════════
  // 13. TEKNIK & REKAYASA (12 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Dasar Konstruksi Bangunan', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'teknik-rekayasa' },
  { title: 'AutoCAD Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'AutoCAD Lanjutan 3D', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'SketchUp', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'BIM dengan Revit', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'Elektronika Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'teknik-rekayasa' },
  { title: 'Arduino untuk Pemula', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'Internet of Things IoT', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'Raspberry Pi', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'Dasar Teknik Industri', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'teknik-rekayasa' },
  { title: 'Lean Manufacturing', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'Six Sigma Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'teknik-rekayasa' },
  { title: 'Supply Chain Management', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'teknik-rekayasa' },

  // ═══════════════════════════════════════════════
  // 14. PERTANIAN & LINGKUNGAN (10 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Pertanian Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pertanian-lingkungan' },
  { title: 'Pertanian Organik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pertanian-lingkungan' },
  { title: 'Hidroponik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pertanian-lingkungan' },
  { title: 'Agribisnis', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pertanian-lingkungan' },
  { title: 'Peternakan Dasar', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pertanian-lingkungan' },
  { title: 'Budidaya Ikan Aquaculture', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pertanian-lingkungan' },
  { title: 'Lingkungan Hidup Dasar', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pertanian-lingkungan' },
  { title: 'Energi Terbarukan', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pertanian-lingkungan' },
  { title: 'Manajemen Lingkungan', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pertanian-lingkungan' },

  // ═══════════════════════════════════════════════
  // 15. PARIWISATA & PERHOTELAN (6 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Dasar Pariwisata', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pariwisata-perhotelan' },
  { title: 'Manajemen Hotel', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pariwisata-perhotelan' },
  { title: 'Pemandu Wisata', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pariwisata-perhotelan' },
  { title: 'Kuliner dan F&B', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pariwisata-perhotelan' },
  { title: 'Revenue Management Hospitality', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pariwisata-perhotelan' },
  { title: 'Ekowisata', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pariwisata-perhotelan' },

  // ═══════════════════════════════════════════════
  // 16. PENGEMBANGAN DIRI (15 kursus)
  // ═══════════════════════════════════════════════
  { title: 'Manajemen Waktu', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pengembangan-diri' },
  { title: 'Getting Things Done GTD', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Deep Work', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Kebiasaan Atomic', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Mindfulness', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pengembangan-diri' },
  { title: 'Membangun CV yang Menarik', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pengembangan-diri' },
  { title: 'Persiapan Interview Kerja', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'LinkedIn dan Personal Branding', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Negosiasi Gaji', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Freelancing dan Remote Work', difficulty: 'ADVANCED', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Networking Profesional', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Komunikasi Efektif', difficulty: 'BEGINNER', isPremium: false, categorySlug: 'pengembangan-diri' },
  { title: 'Kecerdasan Emosional', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Resolusi Konflik', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
  { title: 'Storytelling', difficulty: 'INTERMEDIATE', isPremium: true, categorySlug: 'pengembangan-diri' },
];

// Helper to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Smart retry: parse retry-after from 429 error message
function parseRetryAfterMs(errMsg: string): number {
  const match = errMsg.match(/retry[^:]*:\s*([\d.]+)s/i);
  if (match && match[1]) {
    return Math.ceil(parseFloat(match[1]) * 1000) + 5000; // add 5s buffer
  }
  return 70000; // default 70 seconds
}

async function generateCourseContent(topic: string, difficultyLabel: string, retries = 3): Promise<any> {
  const prompt = `Kamu adalah pembuat kursus edukasi profesional Indonesia.
TUGAS: Buat sebuah kursus lengkap tentang topik "${topic}" dengan tingkat kesulitan "${difficultyLabel}".

ATURAN WAJIB:
1. Buat tepat 5 modul, masing-masing modul memiliki 3-5 slide (bab kecil).
2. Setiap slide berisi penjelasan Markdown yang detail, edukatif, dan praktis (minimal 200 kata per slide).
3. PRIORITASKAN sumber referensi dari Indonesia. Gunakan referensi global (Inggris) HANYA untuk melengkapi.
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

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Gemini] Mengirim permintaan untuk topik: ${topic}... (attempt ${attempt}/${retries})`);
      const result = await generatorModel.generateContent(prompt);
      const text = result.response.text();
      return JSON.parse(text);
    } catch (err: any) {
      const errMsg: string = err.message || String(err);
      const isRateLimit = errMsg.includes('429') || errMsg.includes('Too Many Requests') || errMsg.includes('quota');

      if (isRateLimit && attempt < retries) {
        const waitMs = parseRetryAfterMs(errMsg);
        const waitSec = Math.round(waitMs / 1000);
        console.warn(`⚠️  Rate limit terkena untuk '${topic}'. Menunggu ${waitSec} detik lalu retry...`);
        await delay(waitMs);
        continue;
      }
      throw err;
    }
  }
}

async function main() {
  console.log('🚀 Memulai Auto-Seeder Clarise...');
  console.log(`📚 Total kursus yang akan di-generate: ${COURSES_TO_SEED.length}`);
  
  // Ambil author admin pertama sebagai creator
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });
  const authorId = admin ? admin.id : null;
  console.log(authorId ? `👤 Author: ${admin?.name || admin?.email}` : '⚠️  Tidak ada admin ditemukan, authorId = null');

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (let i = 0; i < COURSES_TO_SEED.length; i++) {
    const course = COURSES_TO_SEED[i];
    if (!course) continue;
    const diffLabel = course.difficulty === 'BEGINNER' ? 'Pemula' : course.difficulty === 'INTERMEDIATE' ? 'Menengah' : 'Lanjutan';
    const baseSlug = slugify(course.title);
    
    // Cek apakah kursus sudah ada (Resumeable — aman dijalankan ulang)
    const existingCourse = await prisma.course.findFirst({
      where: { title: course.title }
    });
    
    if (existingCourse) {
      console.log(`✅ [Skip ${i+1}/${COURSES_TO_SEED.length}] '${course.title}' sudah ada.`);
      skipCount++;
      continue;
    }
    
    // Cari Kategori ID
    const category = await prisma.category.findUnique({
      where: { slug: course.categorySlug }
    });
    
    if (!category) {
      console.error(`❌ [Error ${i+1}/${COURSES_TO_SEED.length}] Kategori '${course.categorySlug}' tidak ditemukan untuk '${course.title}'.`);
      console.error(`   → Jalankan: npx tsx prisma/seed-categories.ts terlebih dahulu!`);
      failCount++;
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
      
      console.log(`✅ [Success ${i+1}/${COURSES_TO_SEED.length}] Kursus '${course.title}' berhasil disimpan.`);
      successCount++;
      
      // Delay 15 detik antar kursus agar aman dari rate limit
      if (i < COURSES_TO_SEED.length - 1) {
        console.log('⏳ Menunggu 15 detik sebelum kursus berikutnya...');
        await delay(15000);
      }
      
    } catch (err: any) {
      console.error(`❌ [Fail ${i+1}/${COURSES_TO_SEED.length}] Gagal men-generate '${course.title}':`, err.message || err);
      failCount++;
      console.log('⏳ Menunggu 20 detik sebelum lanjut...');
      await delay(20000);
    }
  }
  
  console.log('\n════════════════════════════════════════');
  console.log('🎉 Auto-Seeder Selesai!');
  console.log(`✅ Berhasil : ${successCount} kursus`);
  console.log(`⏭️  Dilewati : ${skipCount} kursus (sudah ada)`);
  console.log(`❌ Gagal    : ${failCount} kursus`);
  console.log('════════════════════════════════════════');
  console.log('💡 Script ini RESUMEABLE — aman dijalankan ulang. Kursus yang sudah ada akan di-skip otomatis.');
}

main().finally(async () => await prisma.$disconnect());
