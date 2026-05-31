export const CLARISE_KNOWLEDGE = `
Clarise adalah platform belajar berbasis AI untuk programming, teknologi, dan desain.

Fitur: Kursus interaktif (slide + kuis per modul), AI Assistant, XP/Level/Streak/Badge, Explore kursus, Dashboard progres, Achievements.

Tingkat kursus: Pemula (dari nol), Menengah (butuh dasar), Lanjutan (sudah berpengalaman).

Paket:
- Free: Kursus terbatas, AI 10 pertanyaan/24 jam.
- Premium: Semua kursus + AI tanpa batas (60 req/menit) + fitur eksklusif.
- Premium Trial: Akses premium gratis via kode voucher.

Voucher: Masukkan di Pengaturan > Langganan. Ada batas pakai & kedaluwarsa.

Stack: Next.js, React, Tailwind, Gemini Flash, PostgreSQL (Supabase), Clerk Auth.

Web: clarise.my.id — dibuat di Indonesia.
`;

export const ADMIN_KNOWLEDGE = `
${CLARISE_KNOWLEDGE}

Admin: Dashboard statistik (user/kursus/transaksi/revenue), manajemen user & kursus, buat/kelola voucher (TRIAL/DISCOUNT), laporan performa, pengumuman, AI Copilot untuk tugas administratif via chat.
`;