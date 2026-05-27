// Pengetahuan dasar tentang platform Clarise untuk AI
// Dipakai oleh AI User (Clarise AI) dan Admin AI Copilot.
// TIDAK BOLEH mengandung data sensitif (API key, password, dsb).

export const CLARISE_KNOWLEDGE = `
## Tentang Clarise
Clarise adalah platform belajar (Learning Management System / LMS) berbasis AI yang dibuat untuk membantu siapa saja belajar programming, teknologi, desain, dan topik digital lainnya secara interaktif.

### Fitur Utama
- **Kursus Interaktif**: Materi dibagi menjadi modul-modul kecil dengan sistem slide, sehingga mudah dipahami. Setiap modul memiliki kuis validasi sebelum bisa ditandai selesai.
- **AI Assistant (Clarise AI)**: Asisten belajar cerdas yang bisa menjawab pertanyaan seputar materi, menjelaskan konsep, dan membantu debugging kode — semuanya dalam konteks kursus yang sedang dipelajari.
- **Gamifikasi**: Sistem XP (Experience Points), Level, Streak Harian, dan Badge untuk menjaga motivasi belajar.
- **Explore**: Halaman jelajah kursus dengan filter kategori, tingkat kesulitan, dan pencarian real-time.
- **Dashboard Personal**: Menampilkan progres belajar, kursus yang sedang diambil, streak, dan pencapaian terbaru.
- **Pencapaian (Achievements)**: Koleksi badge yang bisa diraih, progress XP menuju level berikutnya, dan kalender streak.

### Tingkat Kesulitan Kursus
- **Pemula (Beginner)**: Untuk yang baru mulai belajar, tidak perlu pengalaman sebelumnya.
- **Menengah (Intermediate)**: Membutuhkan pemahaman dasar dari topik terkait.
- **Lanjutan (Advanced)**: Untuk yang sudah berpengalaman dan ingin memperdalam keahlian.

### Paket Langganan
- **Free (Gratis)**: Akses terbatas ke kursus dan AI Assistant (10 pertanyaan per 24 jam).
- **Premium**: Akses penuh ke semua kursus termasuk kursus premium, AI Assistant tanpa batas (60 pertanyaan per menit), dan fitur eksklusif lainnya.
- **Premium Trial**: Akses premium gratis selama beberapa hari melalui kode voucher.

### Voucher
- Pengguna bisa memasukkan kode voucher di menu Pengaturan > Langganan untuk mendapatkan akses Premium Trial atau diskon.
- Kode voucher memiliki batas penggunaan dan tanggal kedaluwarsa.

### Teknologi
- Dibangun menggunakan Next.js, React, dan Tailwind CSS.
- AI menggunakan Google Gemini Flash Latest (Gemini 3.5).
- Database PostgreSQL via Supabase.
- Autentikasi melalui Clerk (mendukung login Google, GitHub, dll).

### Cara Menggunakan
1. Daftar akun atau login di halaman sign-up/sign-in.
2. Jelajahi kursus yang tersedia di halaman Explore.
3. Pilih kursus, baca materi modul, dan kerjakan kuis di akhir setiap modul.
4. Gunakan AI Assistant (tombol chat melayang di pojok kanan bawah) untuk bertanya kapan saja.
5. Pantau progres di Dashboard dan kumpulkan badge di halaman Pencapaian.

### Kontak & Info
- Website: clarise.com
- Dibuat oleh tim Clarise di Indonesia.
`;

export const ADMIN_KNOWLEDGE = `
${CLARISE_KNOWLEDGE}

## Fitur Khusus Admin
- **Dashboard Admin**: Menampilkan statistik platform (total user, kursus, transaksi, revenue).
- **Manajemen User**: Lihat, filter, dan kelola semua pengguna platform.
- **Manajemen Kursus**: Lihat dan kelola semua kursus yang ada.
- **Voucher Management**: Buat dan kelola kode voucher (TRIAL atau DISCOUNT) untuk promosi.
- **AI Copilot (Anda!)**: Asisten cerdas khusus Admin yang bisa membuat voucher, menarik statistik, dan membantu tugas administratif melalui perintah percakapan.
- **Laporan**: Analisis performa platform dan tren pengguna.
- **Pengumuman**: Buat dan kelola pengumuman untuk seluruh pengguna.
`;
