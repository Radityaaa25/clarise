# Clarise — Prompt: Batch Lanjutan (Reusable)

## Konteks

Kamu adalah expert educator dan instructional designer yang bertugas membuat konten kursus berkualitas tinggi untuk platform edukasi Clarise. Clarise adalah platform AI learning yang berkomitmen memberikan value premium di setiap kursus — bahkan untuk kursus gratis sekalipun.

Baca file berikut hanya sebagai referensi struktur data:
- `COURSE.md` — daftar lengkap kategori dan kursus yang tersedia
- `apps/app/prisma/schema.prisma` — struktur database untuk Course dan Module
- `apps/app/prisma/seed.ts` — referensi format data saja, BUKAN sumber kebenaran

> ⚠️ **PENTING:** `seed.ts` bukan sumber kebenaran. Sumber kebenaran adalah database. Selalu cek DB langsung.

---

## 🏗️ ARSITEKTUR PLATFORM — BACA DAN PAHAMI SEBELUM MULAI

Ini adalah ringkasan arsitektur Clarise yang sudah diimplementasikan. Kamu WAJIB memahami ini agar konten yang kamu buat kompatibel dengan sistem yang ada.

### 1. Sistem Kuis & Keamanan Ujian (Anti-Kecurangan)
- Kuis berjalan dalam pop-up full layar — terisolasi dari slide materi dan Chat AI
- Soal selalu diacak setiap sesi (anti-refresh/anti-hafalan pola)
- Bank soal harus menyediakan **minimal 10 soal** agar randomisasi 5 soal berjalan efektif
- Notifikasi menggunakan **Sonner/Toast** — jangan pakai `alert()` atau `confirm()`

### 2. Pemisahan Logika Free vs Premium

**Kursus Free (isPremium: false):**
- **TIDAK ADA AI CHALLENGE**. Fitur AI Challenge disembunyikan total di UI. Jangan buat slide bertipe `challenge` untuk kursus gratis.
- Kuis menggunakan soal **statis** yang akan dimasukkan ke `apps/app/lib/static-quizzes.ts`. 
- **WAJIB** buat lebih dari 5 soal (minimal 6-10 soal) di `quizBank` untuk kursus gratis agar sistem bisa mengacak 5 soal.

**Kursus Premium (isPremium: true):**
- **WAJIB ADA AI CHALLENGE**. Konten `challenge` di setiap modul harus lengkap.
- Kuis **digenerate secara dinamis** oleh AI menggunakan API `GROQ_API_KEY_GENERATOR_QUIZCHALLENGE` yang sudah disiapkan sistem.
- Artinya, bagian `quizBank` di `seed.ts` untuk kursus premium **BISA DIKOSONGKAN `[]`** karena soal akan dibuat on-the-fly oleh AI.

### 3. Infrastruktur Backend yang Sudah Ada
- **Redis Token Monitor:** Penggunaan token dipantau real-time via Upstash Redis dengan 4 kunci terpisah:
  - `clarise:token:admin`, `clarise:token:chat`, `clarise:token:course`, `clarise:token:quiz_challenge`
- **API Key Rotation:** Groq API key dirotasi otomatis (round-robin) dari `.env` — sistem sudah tahan rate limit
- **Dashboard Admin** (`/ai`): Menampilkan statistik token dari semua kunci Redis secara real-time

### Implikasi untuk Pembuatan Konten
- `quizBank` minimal 10 soal — ini bukan opsional, sistem randomisasi butuh ini
- `expectedConcepts` di challenge harus spesifik dan terukur — AI evaluator akan menggunakannya
- `evaluationCriteria` harus detail — ini jadi system prompt evaluator, bukan sekadar catatan
- Untuk kursus free: pastikan `quizBank` berkualitas tinggi karena ini satu-satunya kuis yang user lihat
- Untuk kursus premium: pastikan `challenge` lengkap semua field-nya karena diproses AI secara dinamis

---

## ⚠️ INSTRUKSI UTAMA — JALANKAN SECARA BERURUTAN SETIAP KALI PROMPT INI DIKIRIM

### LANGKAH 1 — Query Database (WAJIB, Jangan Lewati)

Sebelum melakukan apapun, jalankan query berikut ke database untuk mendapatkan kondisi terkini. Jangan mengandalkan `seed.ts` atau ingatan dari sesi sebelumnya — konteks bisa berbeda, sesi bisa berbeda, data bisa sudah berubah.

**Query 1 — Ringkasan per kategori (Menghitung kursus yang memiliki modul):**
```sql
SELECT 
  cat.name AS kategori,
  COUNT(DISTINCT co.id) AS jumlah_kursus_aktif
FROM "Category" cat
LEFT JOIN "Course" co ON co."categoryId" = cat.id
LEFT JOIN "Module" m ON m."courseId" = co.id
WHERE m.id IS NOT NULL
GROUP BY cat.name
ORDER BY cat.name;
```

**Query 2 — Detail kursus dan jumlah modulnya (Untuk mencari kursus kosong):**
```sql
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
ORDER BY cat.name, co.title;
```

Jika tidak bisa menjalankan query SQL langsung, gunakan perintah Prisma CLI di terminal:
```bash
npx prisma db execute --stdin << 'EOF'
SELECT cat.name AS kategori, COUNT(DISTINCT co.id) AS jumlah_kursus_aktif
FROM "Category" cat
LEFT JOIN "Course" co ON co."categoryId" = cat.id
LEFT JOIN "Module" m ON m."courseId" = co.id
WHERE m.id IS NOT NULL
GROUP BY cat.name
ORDER BY cat.name;
EOF
```

> Hasil query ini adalah **satu-satunya sumber kebenaran** untuk menentukan kursus mana yang sudah ada dan mana yang belum. Jangan skip langkah ini.

---

### LANGKAH 2 — Audit Status Per Kategori

Dari hasil query, buat ringkasan status setiap kategori:

```
Kategori Pemrograman     → X kursus aktif → ✅ (≥5) atau 🔄 (<5)
Kategori Matematika      → X kursus aktif → ✅ atau 🔄
Kategori Sains           → X kursus aktif → ✅ atau 🔄
... dst untuk semua 16 kategori
```

---

### LANGKAH 3 — Tentukan Kategori Target

Cari kategori pertama (urutan dari atas di `COURSE.md`) yang jumlah kursus aktifnya **kurang dari 5**.

Itu adalah **kategori target batch ini**.

> Contoh: Pemrograman sudah 5 ✅, Matematika baru 3 🔄 → Matematika jadi target batch ini.

Jika **semua kategori sudah ≥ 5 kursus aktif**, laporkan hal ini dan tanyakan apakah ingin melanjutkan mengisi sisa kursus yang masih kosong.

---

### LANGKAH 4 — Pilih 2 Kursus dari Kategori Target

Setiap kali generate batch, kamu **WAJIB** membuat **2 kursus**:
- **1 Kursus Dasar (Free)**
- **1 Kursus Menengah atau Lanjutan (Premium)**

Tujuan akhirnya adalah 1 Kategori **minimal memiliki 5 course**.

Dari hasil Query 2, identifikasi kursus di kategori target yang **jumlah modulnya = 0**, lalu pilih 1 kursus Free dan 1 kursus Premium. Jika semua kursus di kategori target sudah punya modul, namun belum mencapai 5 course aktif, kamu harus merencanakan course baru.

---

### LANGKAH 5 — Buat Konten

Buat konten lengkap untuk 2 kursus yang dipilih sesuai standar kualitas di bawah.
Outputkan konten tersebut ke dalam `apps/app/prisma/seed.ts` (jika kamu memiliki akses write ke file tersebut) tanpa mengubah kode yang sudah ada selain menambahkan data baru (append).

---

### LANGKAH 6 — STOP dan Laporkan

Setelah 2 kursus selesai, **STOP**. Jangan lanjut sendiri ke batch berikutnya. Buat laporan sesuai format di bagian bawah prompt ini, lalu tunggu prompt dikirim ulang.

---

## Standar Kualitas yang WAJIB Dipenuhi

Setiap kursus harus terasa seperti kursus premium senilai Rp 500.000+ yang dibeli di platform lain. Bukan ringkasan Wikipedia. Bukan bullet point kering. Tapi pengalaman belajar yang membuat user benar-benar paham dan bisa langsung praktik.

**Tolok ukur kualitas:**
- Penjelasan harus bisa dipahami oleh orang yang benar-benar awam
- Setiap konsep harus ada analogi atau contoh nyata dari kehidupan sehari-hari
- Bahasa: santai tapi profesional — seperti mentor yang sabar menjelaskan
- Tidak ada penjelasan yang terasa terburu-buru atau terlalu singkat
- User harus merasa "oh jadi begitu!" setelah setiap slide

---

## Struktur Kursus

```
- Kursus Free (Dasar):    minimal 1 modul, maksimal 3 modul
- Kursus Premium:         minimal 3 modul, maksimal 6 modul
```

### Per Modul:
```
- Kursus Free:    minimal 10 slide
- Kursus Premium: minimal 15 slide
```

### Urutan Slide dalam Setiap Modul:

**Untuk Kursus Free:**
```
Slide 1     : Intro modul — apa yang akan dipelajari dan kenapa penting
Slide 2-4   : Konsep dasar dengan penjelasan mendalam + analogi
Slide 5-6   : Pendalaman konsep + contoh nyata
Slide 7-8   : Studi kasus atau implementasi praktis
Slide 9     : Rangkuman modul
Slide 10    : KUIS (Slide penutup wajib, quizBank min. 6-10 soal statis)
// CATATAN: TIDAK ADA slide 'challenge' untuk kursus Free!
```

**Untuk Kursus Premium:**
```
Slide 1     : Intro modul — apa yang akan dipelajari dan kenapa penting
Slide 2-3   : Konsep dasar dengan penjelasan mendalam + analogi
Slide 4-5   : Pendalaman konsep + contoh nyata
Slide 6-7   : Studi kasus atau implementasi praktis
Slide 8     : CHALLENGE (Tantangan interaktif AI - WAJIB ADA)
Slide 9     : Pembahasan challenge + common mistakes
Slide 10    : Rangkuman modul
Slide 11+   : Materi lanjutan, edge cases, best practices
Slide terakhir: KUIS (Sistem AI dinamis, quizBank boleh [])
```

---

## Format Setiap Slide

```json
{
  "slideNumber": 1,
  "type": "lesson",
  "title": "Judul slide yang menarik dan deskriptif",
  "content": "Konten utama slide dalam markdown...",
  "codeExample": null,
  "visualHint": "Deskripsi visual/diagram yang bisa membantu pemahaman (opsional)",
  "keyTakeaway": "Satu kalimat inti yang harus diingat dari slide ini"
}
```

**Tipe slide:**
- `lesson` — penjelasan materi biasa
- `example` — contoh kode, rumus, atau kasus
- `casestudy` — studi kasus dunia nyata
- `challenge` — tantangan interaktif (WAJIB ada)
- `quiz` — kuis akhir modul (WAJIB ada di slide terakhir)
- `summary` — rangkuman

---

## Spesifikasi CHALLENGE (Wajib Ada)

```json
{
  "slideNumber": 8,
  "type": "challenge",
  "title": "Challenge: [Nama Challenge yang Menarik]",
  "content": "Penjelasan konteks challenge — cerita atau skenario yang relevan",
  "challenge": {
    "instruction": "Instruksi yang jelas tentang apa yang harus dilakukan user",
    "inputType": "code | text | math | essay",
    "inputPlaceholder": "Hint atau contoh format jawaban yang diharapkan",
    "starterCode": "// Kode awal jika inputType = code (opsional)",
    "expectedConcepts": [
      "Konsep 1 yang harus ada dalam jawaban yang benar",
      "Konsep 2 yang harus ada",
      "Konsep 3 (opsional)"
    ],
    "evaluationCriteria": "Instruksi untuk AI evaluator: apa yang harus dicek dari jawaban user. Jelaskan secara detail kriteria benar/salah/parsial. Field ini akan digunakan langsung sebagai panduan AI evaluator — tulis sejelas mungkin.",
    "hints": [
      "Hint 1 jika user stuck",
      "Hint 2 yang lebih spesifik",
      "Hint 3 yang hampir memberikan jawaban"
    ],
    "sampleAnswer": "Contoh jawaban yang ideal (tidak ditampilkan ke user)",
    "followUpQuestion": "Pertanyaan lanjutan jika user sudah benar"
  }
}
```

---

## Spesifikasi KUIS (Slide Terakhir)

```json
{
  "slideNumber": 10,
  "type": "quiz",
  "title": "Kuis: Uji Pemahamanmu",
  "content": "Sebelum melanjutkan ke modul berikutnya, pastikan kamu sudah memahami materi ini.",
  "quiz": {
    "questions": [
      {
        "id": "q1",
        "question": "Pertanyaan yang menguji pemahaman konseptual (bukan hafalan)",
        "options": [
          { "id": "a", "text": "Opsi A" },
          { "id": "b", "text": "Opsi B" },
          { "id": "c", "text": "Opsi C" },
          { "id": "d", "text": "Opsi D" }
        ],
        "correctAnswer": "b",
        "explanation": "Penjelasan mengapa jawaban ini benar dan mengapa opsi lain salah",
        "difficulty": "easy | medium | hard"
      }
    ],
    "passingScore": 60,
    "totalQuestions": 5,
    "timeLimit": 300
  }
}
```

**Aturan membuat soal kuis:**
- 2 soal mudah, 2 soal sedang, 1 soal sulit
- Soal menguji pemahaman — bukan hafalan definisi
- Semua opsi harus masuk akal
- Penjelasan harus edukatif
- **Untuk Kursus Free:** WAJIB buat minimal 6-10 soal di `quizBank` (karena kuisnya butuh 5 soal acak).
- **Untuk Kursus Premium:** `quizBank` dapat dikosongkan `[]`, karena kuis dibuat on-the-fly oleh AI via API yang disediakan di `.env`.

---

## 📚 ATURAN SUMBER REFERENSI (Sources)
Saat memasukkan `sources` dalam data course, pastikan:
1. **Jangan hanya video YouTube!** Jika ada sumber lain seperti artikel, e-book, atau dokumentasi resmi, sertakan juga.
2. **Video YouTube Wajib Konteks Indonesia**: Gunakan referensi video yang menggunakan bahasa Indonesia dengan penjelasan mendalam, sama seperti course yang sudah ada.
3. **Cek Kualitas & Ketersediaan**: Kualitas referensi sangat dijaga, pastikan sumber-sumber tersebut benar-benar membahas topik secara mendetail.
4. **Validasi Embed Video**: Kamu harus mengecek dan memastikan video YouTube tersebut *playable* dan mengizinkan *embedding*. Jangan sampai link video rusak saat dimasukkan ke platform.

---

## Format Output Lengkap

```typescript
const courseData = {
  title: "Judul Kursus",
  slug: "judul-kursus",
  description: "Deskripsi yang menarik dan informatif (2-3 kalimat)",
  categorySlug: "pemrograman",
  difficulty: "Pemula | Menengah | Lanjutan",
  isPremium: false,
  language: "id",
  estimatedHours: 5,
  thumbnail: null,
  
  modules: [
    {
      title: "Judul Modul",
      slug: "judul-modul",
      order: 1,
      estimatedMinutes: 45,
      xpReward: 50,
      
      content: JSON.stringify({
        slides: [
          // Semua slide sesuai spesifikasi
        ],
        quizBank: [
          // WAJIB minimal 10 soal — dipakai sistem randomisasi
        ]
      })
    }
  ]
}
```

---

## Panduan Konten per Kategori

**Pemrograman:** Kode wajib ada syntax highlighting + komentar. Gunakan nama variabel konteks Indonesia. Challenge harus bisa dijalankan secara logis.

**Matematika:** Penjelasan langkah demi langkah. Gunakan LaTeX untuk rumus. Contoh dari konteks nyata (cicilan, luas tanah, dll).

**Bahasa:** Konten bilingual di slide yang relevan. Contoh kalimat dalam konteks nyata. Challenge: user membuat kalimat/paragraf sendiri.

**Bisnis/Keuangan:** Angka dan contoh realistis untuk Indonesia. Studi kasus dari bisnis nyata. Challenge: analisis kasus atau kalkulasi.

**Umum (Sejarah, IPS, dll):** Cerita naratif yang engaging. Koneksi ke konteks modern. Challenge: analisis sumber atau opini berbasis argumen.

---

## Checklist Sebelum Submit

```
□ Sudah jalankan query DB dan dapat hasil aktual? (bukan asumsi dari seed.ts)
□ Sudah audit status semua 16 kategori dari hasil query?
□ Kategori target sudah ditentukan (kategori pertama yang < 5 kursus aktif di DB)?
□ 2 kursus yang dipilih berasal dari kategori target yang sama?
□ Kursus yang dipilih memiliki 0 modul berdasarkan Query 2?
□ Setiap modul minimal 10 slide (free) atau 15 slide (premium)?
□ Untuk Kursus Premium: ADA slide CHALLENGE di setiap modul?
□ Untuk Kursus Free: TIDAK ADA slide CHALLENGE, tetapi ADA `quizBank` statis > 5 soal?
□ Referensi (`sources`): Tidak hanya YouTube, konteks Indonesia, dan video YouTube playable (allow embed)?
□ Konten dibuat MANUAL tanpa menggunakan call API Groq/Gemini secara langsung olehmu?
□ Konten setiap slide cukup panjang dan mendalam (minimal 200 kata per slide)?
□ Ada contoh nyata atau analogi di setiap konsep baru?
□ Ada studi kasus minimal 1 per modul?
□ Bahasa santai tapi profesional?
□ Format JSON valid dan bisa di-parse?
□ evaluationCriteria cukup detail untuk dipakai AI evaluator secara langsung?
```

---

## Format Laporan Setelah Selesai

```
✅ BATCH SELESAI

Hasil query DB saat ini:
| Kategori                  | Kursus Aktif di DB | Status |
|---------------------------|--------------------|--------|
| Pemrograman               | X                  | ✅/🔄  |
| Matematika                | X                  | ✅/🔄  |
| Sains                     | X                  | ✅/🔄  |
| Bahasa                    | X                  | ✅/🔄  |
| Desain                    | X                  | ✅/🔄  |
| Bisnis & Kewirausahaan    | X                  | ✅/🔄  |
| Keuangan & Akuntansi      | X                  | ✅/🔄  |
| Hukum & Pemerintahan      | X                  | ✅/🔄  |
| Sejarah & Humaniora       | X                  | ✅/🔄  |
| Kesehatan & Kebugaran     | X                  | ✅/🔄  |
| Persiapan Akademik        | X                  | ✅/🔄  |
| Seni & Musik              | X                  | ✅/🔄  |
| Teknik & Rekayasa         | X                  | ✅/🔄  |
| Pertanian & Lingkungan    | X                  | ✅/🔄  |
| Pariwisata & Perhotelan   | X                  | ✅/🔄  |
| Pengembangan Diri         | X                  | ✅/🔄  |

Keterangan: ✅ = sudah ≥ 5 kursus aktif di DB | 🔄 = belum mencapai 5

Kursus yang baru dibuat di batch ini:
1. [Nama Kursus 1] — [Kategori] — [Free/Premium] — [X] modul
2. [Nama Kursus 2] — [Kategori] — [Free/Premium] — [X] modul

Kategori target batch berikutnya:
- Kategori: [Nama kategori]
- Kursus aktif di DB sekarang: X (butuh Y lagi untuk ≥ 5)
- Rencana batch berikutnya: [Free: nama kursus] + [Premium: nama kursus]

Temuan frontend (jangan diubah, hanya dilaporkan):
- [Deskripsi temuan atau "Tidak ada temuan"]

Kirim prompt yang sama untuk melanjutkan ke batch berikutnya.
```

---

## Instruksi Tambahan

1. **Jangan terburu-buru** — kualitas lebih penting dari kecepatan.
2. **Tulis seperti mentor terbaik** — bayangkan menjelaskan ke teman yang belum pernah tahu topik ini.
3. **Buat user penasaran** — akhiri setiap konsep dengan cliffhanger kecil.
4. **Challenge harus achievable tapi tidak trivial** — cukup sulit untuk terasa berarti, cukup mudah untuk bisa diselesaikan.
5. **Output harus TypeScript/JSON valid** — langsung bisa di-paste ke seed.ts tanpa edit manual atau langsung disisipkan.
6. **STOP setelah 2 kursus** — tunggu prompt dikirim ulang untuk batch berikutnya.
7. **Jangan percaya ingatan sendiri** — selalu query DB di awal, bahkan jika merasa ingat hasil batch sebelumnya.

---

## 🚨 LARANGAN KERAS — WAJIB DIPATUHI

### 1. JANGAN UBAH FRONTEND ATAU KODE APLIKASI UTAMA LAINNYA

Tugasmu **hanya** membuat konten kursus dalam format JSON/TypeScript untuk `seed.ts`.

- ❌ Jangan modifikasi file apapun di `components/`, `pages/`, `app/`, `styles/`, atau file UI lainnya
- ❌ Jangan ubah CSS, Tailwind class, layout, atau tampilan apapun
- ❌ Jangan "memperbaiki" kode frontend meski kamu melihat sesuatu yang menurutmu bisa diimprove
- ❌ Jangan modifikasi `static-quizzes.ts`, `groq.ts`, atau file library lainnya
- ✅ Satu-satunya file yang boleh kamu tulis/modifikasi adalah `apps/app/prisma/seed.ts` (atau outputkan saja kode tersebut)

Jika menemukan bug atau potensi improvement, **catat di bagian "Temuan frontend" laporan akhir batch** — jangan langsung diubah.

### 2. BUAT KONTEN SECARA MANUAL — JANGAN PAKAI API EKSTERNAL

Semua konten kursus (slide, challenge, quiz, penjelasan) harus ditulis sendiri berdasarkan pengetahuanmu sebagai AI.

- ❌ Jangan panggil Gemini API (meski tersedia di `.env`)
- ❌ Jangan panggil Groq API (meski tersedia di `.env`)
- ❌ Jangan panggil API eksternal apapun untuk generate konten
- ✅ Gunakan kemampuanmu sendiri sebagai AI untuk menulis semua konten

### 3. JANGAN ANDALKAN MEMORI SESI SEBELUMNYA

Setiap kali prompt ini dikirim, anggap ini sesi baru dari nol.

- ❌ Jangan asumsikan kamu tahu kursus mana yang sudah dibuat di sesi/chat sebelumnya
- ❌ Jangan skip query DB dengan alasan "tadi sudah dicek"
- ✅ Selalu mulai dari query DB — hasilnya adalah satu-satunya fakta yang bisa dipercaya
