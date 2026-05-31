import { Difficulty } from "@prisma/client";

export type CourseData = {
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  isPremium: boolean;
  language: string;
  isPublished: boolean;
  totalModules: number;
  modules: Array<{
    title: string;
    slug: string;
    order: number;
    xpReward: number;
    sources?: Array<{ type: string; title: string; url: string }>;
    contentObject: {
      slides: Array<Record<string, unknown>>;
      quizBank: Array<Record<string, unknown>>;
    };
  }>;
};

export const tailwindCourse: CourseData = {
  title: "Belajar Tailwind CSS — Styling modern tanpa nulis CSS manual",
  slug: "belajar-tailwind-css",
  description: "Tinggalkan cara lama menulis CSS tradisional. Pelajari framework utility-first yang mempercepat proses pengembangan UI hingga 10x lipat. Dari dasar layouting, responsive design, hingga dark mode.",
  difficulty: Difficulty.INTERMEDIATE,
  isPremium: true,
  language: "id",
  isPublished: true,
  totalModules: 3,
  modules: [
    {
      title: "Fondasi Utility-First Tailwind CSS",
      slug: "fondasi-utility-first-tailwind",
      order: 1,
      xpReward: 100,
      sources: [
        {
          type: "YOUTUBE",
          title: "Tailwind CSS Tutorial Indonesia - Web Programming UNPAS",
          url: "https://www.youtube.com/watch?v=z3slaXqmkT0",
        },
        {
          type: "DOCUMENTATION",
          title: "Dokumentasi Resmi Tailwind CSS",
          url: "https://tailwindcss.com/docs/utility-first",
        },
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Masa Kelam CSS Tradisional",
            content: `Sebelum Tailwind CSS hadir, siklus men-styling website terasa seperti lingkaran setan. Kamu membuat elemen HTML, memikirkan nama *class* yang unik (seperti \`.card-wrapper-inner\`), lalu berpindah ke file CSS, menulis properti, kembali ke HTML, melihat hasilnya, dan mengulangi proses itu ribuan kali.

Masalah utama CSS Tradisional (dan BEM):
1. **Numbness of Naming**: Kehabisan ide untuk memberikan nama *class* yang bermakna.
2. **Context Switching**: Lelah berpindah-pindah antara file \`.html\` / \`.jsx\` dan \`.css\`.
3. **Bloated CSS**: File CSS terus membengkak karena setiap kali ada desain baru, kamu menulis kode CSS baru alih-alih menggunakan ulang yang lama.
4. **Dead Code**: Takut menghapus CSS lama karena tidak tahu apakah masih dipakai di halaman lain.

Tailwind CSS datang dengan pendekatan yang radikal namun brilian: **Utility-First**. Alih-alih menulis CSS baru, Tailwind menyediakan ratusan *class* kecil (utilities) bawaan seperti \`flex\`, \`pt-4\`, \`text-center\`, yang langsung kamu aplikasikan di dalam HTML-mu.`,
            keyTakeaway: "CSS tradisional membuang waktu dalam penamaan class dan perpindahan file. Tailwind menyelesaikan ini dengan menyediakan class utilitas yang siap pakai langsung di HTML."
          },
          {
            slideNumber: 2,
            type: "lesson",
            title: "Paradigma Utility-First",
            content: `Apa itu *Utility-First*? 

Bayangkan kamu sedang mendeskripsikan sebuah tombol ke temanmu. Kamu berkata: *"Tolong buat tombol ini latar birunya agak terang, sudutnya melengkung, teksnya putih, tebal, dan ada ruang kosong di sekeliling teksnya."*

Dalam CSS Tradisional, kamu menulis:
\`\`\`css
.btn-primary {
  background-color: #3b82f6;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
}
\`\`\`
Lalu di HTML: \`<button class="btn-primary">\`

Dalam **Tailwind CSS**, instruksi bahasamu langsung diterjemahkan menjadi *class* di HTML:
\`\`\`html
<button class="bg-blue-500 rounded-lg text-white font-semibold py-2 px-4">
\`\`\`

**Apakah ini sama dengan Inline Styles (\`style="..."\`)?**
TIDAK! Inline styles tidak bisa melakukan:
- *Media Queries* (Responsive Design)
- *Pseudo-classes* (Hover, Focus, Active)
- Mematuhi *Design System* (Warna dan ukuran di Tailwind sudah terstandarisasi, inline style bebas dan sering tidak konsisten).`,
            keyTakeaway: "Utility-First berarti membangun komponen menggunakan class-class kecil yang spesifik (seperti bg-blue-500, pt-4) langsung pada markup, menjamin konsistensi sistem desain."
          },
          {
            slideNumber: 3,
            type: "example",
            title: "Margin & Padding (Spacing)",
            content: `Tailwind menggunakan sistem spacing yang proporsional. Secara bawaan, 1 unit di Tailwind setara dengan **0.25rem** (atau 4px pada ukuran font default).

**Sintaks Dasar Spacing:**
- **\`p\`** untuk Padding
- **\`m\`** untuk Margin

Lalu diikuti oleh arah (opsional):
- **\`t\`** (top), **\`b\`** (bottom), **\`l\`** (left), **\`r\`** (right)
- **\`x\`** (kiri & kanan / sumbu X), **\`y\`** (atas & bawah / sumbu Y)

Dan terakhir, ukurannya (0, 1, 2, 4, 8, dll).

**Contoh Praktis:**
- \`p-4\` = padding di semua sisi sebesar 1rem (16px).
- \`mt-8\` = margin-top sebesar 2rem (32px).
- \`px-6\` = padding kiri dan kanan sebesar 1.5rem (24px).
- \`my-2\` = margin atas dan bawah sebesar 0.5rem (8px).

\`\`\`html
<!-- Contoh Penggunaan -->
<div class="p-6 mt-4">
  <p class="mb-2 px-4">Teks ini memiliki margin bawah 8px dan padding horizontal 16px.</p>
</div>
\`\`\`

Ukuran ini memastikan seluruh elemen di website-mu memiliki jarak yang konsisten dan enak dipandang (tidak ada margin sembarangan seperti 13px atau 17px).`,
            keyTakeaway: "Sistem spacing Tailwind sangat konsisten. Formatnya: (tipe)(arah)-(ukuran). Contoh: mt-4 berarti margin-top 16px."
          },
          {
            slideNumber: 4,
            type: "example",
            title: "Warna & Tipografi",
            content: `Tailwind dilengkapi dengan palet warna yang sangat kaya dan *font sizing* yang rapi.

**Warna:**
Sintaks warna biasanya menggabungkan *properti* + *nama warna* + *shade* (kecerahan dari 50 hingga 900).
- Teks: \`text-red-500\`, \`text-gray-900\`
- Latar Belakang: \`bg-blue-600\`, \`bg-teal-100\`
- Border: \`border-green-400\`

**Tipografi (Ukuran & Ketebalan):**
- Ukuran Teks: \`text-xs\`, \`text-sm\`, \`text-base\`, \`text-lg\`, \`text-xl\`, \`text-2xl\`, hingga \`text-9xl\`.
- Ketebalan (*Weight*): \`font-light\`, \`font-normal\`, \`font-semibold\`, \`font-bold\`, \`font-extrabold\`.
- Format Teks: \`italic\`, \`underline\`, \`uppercase\`, \`capitalize\`.

\`\`\`html
<!-- Contoh Kombinasi Desain -->
<div class="bg-indigo-900 p-8">
  <h1 class="text-4xl font-extrabold text-white mb-4">
    Selamat Datang!
  </h1>
  <p class="text-lg text-indigo-200 leading-relaxed">
    Belajar Tailwind CSS membuat hidup lebih indah.
  </p>
</div>
\`\`\`
Pada kode di atas, kita menciptakan sebuah *hero section* sederhana hanya dalam beberapa detik tanpa perlu membuka file CSS sama sekali!`,
            keyTakeaway: "Pengaturan teks dan warna dilakukan lewat class yang deskriptif. Shade warna berkisar dari 50 (sangat terang) hingga 900 (sangat gelap)."
          },
          {
            slideNumber: 5,
            type: "example",
            title: "Layouting Sakti: Flexbox",
            content: `Mengatur *layout* adalah hal tersulit di era CSS jadul. Dengan Tailwind, menggunakan Flexbox menjadi sangat semantik dan intuitif.

Kamu cukup menambahkan class \`flex\` pada *container*.

**Utility Flexbox Penting:**
- \`flex-col\` (Menyusun elemen secara vertikal ke bawah).
- \`items-center\` (Merapikan elemen di sumbu silang / vertikal agar ke tengah).
- \`justify-center\` (Merapikan elemen di sumbu utama / horizontal ke tengah).
- \`justify-between\` (Mendorong elemen agar berada di ujung kiri dan kanan secara maksimal).
- \`gap-4\` (Memberikan jarak antar elemen sejauh 16px tanpa menggunakan margin manual!).

**Contoh Kasus: Membuat Navbar Sederhana**
\`\`\`html
<nav class="flex justify-between items-center bg-white p-4 shadow-md">
  <!-- Logo di kiri -->
  <div class="font-bold text-xl text-blue-600">BrandKu</div>
  
  <!-- Menu di kanan -->
  <ul class="flex gap-6 text-gray-600 font-medium">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</nav>
\`\`\`
Hanya dengan \`flex justify-between items-center\`, kita sudah memisahkan Logo dan Menu ke ujung yang berlawanan dan membuatnya sejajar secara vertikal. Sempurna!`,
            keyTakeaway: "Class 'flex' mengubah elemen menjadi flex container. Gunakan 'justify-*' untuk sumbu X, 'items-*' untuk sumbu Y, dan 'gap-*' untuk jarak antar elemen."
          },
          {
            slideNumber: 6,
            type: "lesson",
            title: "State Modifiers: Hover & Focus",
            content: `Bagaimana jika kita ingin tombol berubah warna saat di-hover oleh kursor mouse? Di sinilah kehebatan sistem *Modifiers* bawaan Tailwind.

Kamu bisa menambahkan *prefix* (awalan) \`hover:\` atau \`focus:\` di depan *utility* apa pun!

**Contoh Hover:**
\`\`\`html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Simpan Data
</button>
\`\`\`
Saat normal, latar tombol berwarna \`bg-blue-500\`. Saat kursor diarahkan ke tombol, latarnya otomatis berubah menjadi \`bg-blue-700\`.

**Contoh Focus (Penting untuk Aksesibilitas Form):**
\`\`\`html
<input 
  type="text" 
  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded p-2"
  placeholder="Ketik namamu..."
/>
\`\`\`
Input di atas akan menampilkan cincin biru (*ring*) yang cantik saat pengguna mengkliknya (sedang dalam status aktif / *focus*).

Modifiers ini tidak terbatas pada warna. Kamu bisa melakukan \`hover:scale-105\` untuk membesarkan elemen saat di-hover, atau \`hover:font-bold\` untuk menebalkan teks.`,
            keyTakeaway: "Prefix seperti 'hover:' dan 'focus:' memungkinkan kamu memberikan gaya dinamis tanpa perlu menulis pseudo-classes di file CSS."
          },
          {
            slideNumber: 7,
            type: "lesson",
            title: "Responsive Design tanpa Pusing",
            content: `Membangun website yang tampak bagus di HP, Tablet, dan Desktop sering kali membuat sakit kepala jika harus menulis \`@media (min-width: ...)\` berulang kali. Tailwind memecahkan ini dengan *Responsive Modifiers*.

Pendekatan Tailwind adalah **Mobile-First**. Artinya, *class* tanpa prefix apa pun adalah untuk layar HP (terkecil). Kemudian, kamu menimpanya untuk layar yang lebih besar menggunakan prefix:
- \`sm:\` (Tablet kecil, >= 640px)
- \`md:\` (Tablet besar, >= 768px)
- \`lg:\` (Laptop, >= 1024px)
- \`xl:\` (Desktop besar, >= 1280px)

**Contoh Kasus:**
Kita ingin sebuah *container* memiliki *background* merah di HP, hijau di Tablet, dan biru di Laptop.
\`\`\`html
<div class="bg-red-500 md:bg-green-500 lg:bg-blue-500 p-8 text-white">
  Ubah ukuran layarmu untuk melihat sihir warna ini!
</div>
\`\`\`

**Contoh Grid Responsive:**
Di HP tampil 1 kolom, di laptop tampil 3 kolom.
\`\`\`html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div class="bg-gray-200 p-4">Kartu 1</div>
  <div class="bg-gray-200 p-4">Kartu 2</div>
  <div class="bg-gray-200 p-4">Kartu 3</div>
</div>
\`\`\`
Sangat mudah dan deklaratif! Kamu bisa membaca *intent* atau niat desain dari kodenya secara langsung.`,
            keyTakeaway: "Gunakan pendekatan Mobile-First. Tulis desain default untuk HP, lalu gunakan modifier seperti md: dan lg: untuk mengatur desain pada layar yang lebih lebar."
          },
          {
            slideNumber: 8,
            type: "challenge",
            title: "Challenge: Buat Profil Responsive",
            content: `Buktikan bahwa kamu sudah menguasai Flexbox, Spacing, dan Responsive Design Tailwind!

**Tugasmu:**
Buat sebuah Card Profil dengan komponen React yang memiliki struktur kelas Tailwind sebagai berikut:
1. Container paling luar (\`div\` utama) harus memiliki background putih (\`bg-white\`), sudut melengkung (\`rounded-xl\`), dan bayangan (\`shadow-lg\`).
2. Gunakan Flexbox untuk memosisikan elemen. Pada layar HP (default), elemen disusun ke bawah secara vertikal. Pada layar tablet ke atas (\`md:\`), susun elemen menyamping ke kanan (horizontal).
3. Di dalam Flexbox tersebut, ada sebuah gambar (anggap saja div bulat \`w-24 h-24 rounded-full bg-gray-300\`) dan sebuah container teks.
4. Jangan lupa berikan jarak (\`gap\`) yang sesuai antar elemen.

Ini adalah struktur Card yang sangat umum kamu temui di dunia nyata!`,
            challenge: {
              instruction: "Lengkapi class Tailwind pada komponen `ProfileCard` di bawah agar responsif: vertikal di layar kecil, dan horizontal di layar `md` ke atas.",
              inputType: "code",
              inputPlaceholder: "export default function ProfileCard() {\n  return (\n    // tulis kodemu di sini\n  )\n}",
              starterCode: "export default function ProfileCard() {\n  return (\n    // Tambahkan class flex, responsivitas (md:flex-row dll), shadow, dll\n    <div className=\"bg-white rounded-xl shadow-lg p-6 flex\">\n      <div className=\"w-24 h-24 rounded-full bg-blue-300 shrink-0\"></div>\n      <div>\n        <h2 className=\"text-xl font-bold\">Raditya</h2>\n        <p className=\"text-gray-500\">Software Engineer</p>\n      </div>\n    </div>\n  );\n}",
              expectedConcepts: [
                "Menggunakan flex-col untuk default mobile",
                "Menggunakan md:flex-row untuk layout horizontal di layar medium",
                "Menggunakan items-center agar vertikal alignmentnya di tengah",
                "Menggunakan gap-4 atau gap-6 untuk jarak"
              ],
              evaluationCriteria: "AI Evaluator: Periksa className pada div pembungkus utama. Harus mengandung `flex`, `flex-col`, `md:flex-row` (atau `md:flex-row` dengan asumsi default flex-col ditambahkan), dan properti alignment seperti `items-center` serta `gap-*`. Pastikan desain tersebut memvalidasi konsep mobile-first flexbox. Abaikan tipe gambar/div buatan.",
              hints: [
                "Class awal div utama harusnya seperti ini: `className=\"bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6\"`",
                "Ingat, flex default di Tailwind adalah flex-row. Untuk mobile-first vertical, kamu WAJIB tambahkan `flex-col`. Baru di `md:` kamu timpa dengan `md:flex-row`."
              ],
              sampleAnswer: "export default function ProfileCard() {\n  return (\n    <div className=\"bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6\">\n      <div className=\"w-24 h-24 rounded-full bg-blue-300 shrink-0\"></div>\n      <div className=\"text-center md:text-left\">\n        <h2 className=\"text-xl font-bold\">Raditya</h2>\n        <p className=\"text-gray-500\">Software Engineer</p>\n      </div>\n    </div>\n  );\n}",
              followUpQuestion: "Kenapa di layar HP teks profil lebih baik dibuat rata tengah (`text-center`), sedangkan di layar laptop rata kiri (`md:text-left`)?"
            }
          },
          {
            slideNumber: 9,
            type: "lesson",
            title: "Dark Mode: Semudah Membalikkan Telapak Tangan",
            content: `Mode Gelap (*Dark Mode*) saat ini adalah fitur wajib bagi website modern. Jika menggunakan CSS biasa, kamu harus menulis puluhan variabel CSS khusus untuk *theme dark*. Dengan Tailwind, ini semudah menambahkan awalan \`dark:\`!

**Konsep:**
Sama seperti *Responsive Modifiers*, kamu mendesain untuk mode Terang (Light Mode) terlebih dahulu sebagai *default*. Kemudian kamu menimpanya untuk mode Gelap menggunakan prefix \`dark:\`.

\`\`\`html
<div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
  <h1 class="text-gray-900 dark:text-white text-2xl font-bold">
    Halo Dunia Malam!
  </h1>
  <p class="text-gray-600 dark:text-gray-400 mt-4">
    Teks ini akan menyesuaikan warnanya secara otomatis berdasarkan preferensi sistem operasimu.
  </p>
</div>
\`\`\`

Agar ini berfungsi, di file \`tailwind.config.ts\`, fitur dark mode biasanya diaktifkan menggunakan *class* strategy:
\`\`\`javascript
module.exports = {
  darkMode: 'class', // Menggunakan class "dark" di tag <html>
  // ...
}
\`\`\`
Saat pengguna mengklik tombol "Switch Mode", JavaScript di websitemu hanya perlu menempelkan class \`dark\` ke tag \`<html>\` atau \`<body>\`, dan seluruh *utility* \`dark:\` di aplikasi akan langsung aktif!`,
            keyTakeaway: "Gunakan prefix 'dark:' untuk memberikan gaya spesifik saat tema Gelap aktif. Pendekatan defaultnya selalu desain mode terang terlebih dahulu."
          },
          {
            slideNumber: 10,
            type: "lesson",
            title: "Mitos Kode Berantakan (Ugly HTML)",
            content: `Salah satu kritik terbesar terhadap Tailwind CSS dari developer yang belum terbiasa adalah: *"Kodenya terlihat berantakan! HTML saya penuh dengan class yang panjang banget!"*

Hal itu memang benar. Kode HTML akan terlihat lebih padat. **Namun, itu adalah pertukaran (trade-off) yang disengaja**. 

**Kenapa ini bukan masalah di era modern?**
Di era React, Vue, dan Svelte, kita tidak lagi membangun HTML statis mentah. Kita membangun **Komponen**.

Jika kamu memiliki tombol dengan 10 class Tailwind, kamu TIDAK perlu menulis ulang 10 class tersebut di 50 halaman berbeda. Kamu merangkumnya dalam satu file komponen React \`<Button />\`.

\`\`\`jsx
// file: Button.jsx
export default function Button({ children }) {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all">
      {children}
    </button>
  );
}

// file: Home.jsx
import Button from './Button';

export default function Home() {
  return <Button>Submit</Button>; // Sangat bersih!
}
\`\`\`

Kompleksitas class dikurung di dalam definisi komponen. Halaman utamamu tetap bersih, dan *Styling*-mu aman karena tertutup isolasi komponen.`,
            keyTakeaway: "Jangan takut HTML terlihat padat. Ekstraksi kompleksitas class Tailwind ke dalam komponen reusable (React/Vue), sehingga pemeliharaan kode tetap terpusat di satu tempat."
          },
          {
            slideNumber: 11,
            type: "lesson",
            title: "Instalasi: CLI vs Play CDN",
            content: `Ada beberapa cara menggunakan Tailwind di proyekmu. 
            
1. **Play CDN (Untuk Belajar/Prototipe)**
   Ini adalah cara tercepat. Kamu cukup menempelkan satu baris script di HTML:
   \`<script src="https://cdn.tailwindcss.com"></script>\`
   Ini sangat ajaib karena script tersebut akan membaca semua class Tailwind yang kamu tulis di HTML secara *real-time* di browser. Namun, **jangan pernah gunakan ini di Production** karena ukurannya besar dan lambat.

2. **Tailwind CLI (Untuk Production)**
   Ini adalah standar industri. Tailwind CLI akan memindai (scan) kodemu, mencari class apa saja yang sungguhan kamu pakai, dan **hanya** menghasilkan CSS untuk class tersebut.
   Hasilnya? File CSS akhirnya sangat kecil, biasanya di bawah 10KB (terkompresi)!
   
   Prosesnya:
   \`npm install -D tailwindcss\` -> \`npx tailwindcss init\` -> konfigurasi path file di \`tailwind.config.js\` -> jalankan *build process*.`,
            keyTakeaway: "Untuk belajar, Play CDN sangat praktis. Untuk proyek sungguhan yang dideploy ke publik, wajib menggunakan Tailwind CLI atau integrasi bundler (seperti Vite/Next.js) agar CSS yang dihasilkan berukuran sangat kecil."
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Integrasi Tailwind di React (JSX)",
            content: `Menggunakan Tailwind di dalam ekosistem React sedikit berbeda dengan HTML biasa, terutama karena aturan penulisan JSX.

Perbedaan Utama:
Di HTML murni, kamu menggunakan atribut \`class\`.
Di React (JSX), kata \`class\` dilarang karena itu adalah kata kunci bawaan JavaScript. Kamu **WAJIB** menggantinya dengan \`className\`.

\`\`\`jsx
// SALAH (di React)
<div class="bg-red-500 text-white p-4">Error</div>

// BENAR
<div className="bg-red-500 text-white p-4">Error</div>
\`\`\`

Selain itu, karena di React kita bisa menggunakan variabel JavaScript, kita bisa memanipulasi *string* class Tailwind secara dinamis!
\`\`\`jsx
// Menggabungkan class dinamis
function Alert({ isError, text }) {
  return (
    <div className={\`p-4 rounded-md text-white \${isError ? 'bg-red-500' : 'bg-green-500'}\`}>
      {text}
    </div>
  );
}
\`\`\``,
            keyTakeaway: "Di JSX/React, selalu gunakan className. Manfaatkan fitur Template Literals JavaScript ( \` \` ) untuk merender class Tailwind secara dinamis berdasarkan State atau Props."
          },
          {
            slideNumber: 13,
            type: "example",
            title: "Library Bantuan: clsx & tailwind-merge",
            content: `Saat membuat komponen React tingkat lanjut, memanipulasi string class secara manual seringkali memicu *bug*.
Contoh masalah (Konflik Class):
\`<button className="bg-blue-500 bg-red-500">\` -> Class mana yang menang? Di CSS biasa, yang ditulis terakhir di file CSS yang menang, bukan yang terakhir di HTML!

Di industri profesional, developer selalu menggunakan kombinasi library **\`clsx\`** dan **\`tailwind-merge\`** (biasa disingkat menjadi fungsi \`cn\`).

- **\`clsx\`**: Membantu menggabungkan string secara kondisional dengan sintaks yang rapi.
- **\`tailwind-merge\`**: Cerdas! Ia tahu jika ada konflik (misal \`p-4\` vs \`p-2\`) dan otomatis menghapus class yang kalah, meniru perilaku CSS *Cascading*.

\`\`\`tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi utilitas ajaib yang ada di tiap proyek modern
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cara pakainya:
function Button({ className, isPrimary }) {
  return (
    <button className={cn(
      "px-4 py-2 rounded font-bold text-white", // Class dasar (Base)
      isPrimary ? "bg-blue-600" : "bg-gray-500", // Kondisional (clsx)
      className // Timpaan dari luar yang aman dari konflik (twMerge)
    )}>
      Klik Saya
    </button>
  );
}
\`\`\``,
            keyTakeaway: "Jika kamu menggunakan Tailwind bersama React di proyek kompleks, utility 'cn' (kombinasi clsx + tailwind-merge) adalah standar emas untuk menghindari konflik class."
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Rangkuman Modul",
            content: `Selamat! Kamu telah mempelajari fondasi revolusioner dari Tailwind CSS. 
            
Mari kita rangkum hal terpenting:
1. **Utility-First**: Berpikir dalam balok kecil (utilities), bukan membuat class khusus baru. Ini mempercepat workflow development UI hingga berkali-kali lipat.
2. **Sistem Terpadu**: Spacing, warna, dan tipografi Tailwind memaksa kamu mematuhi *Design System* bawaan, sehingga website terlihat profesional tanpa usaha ekstra.
3. **Modifiers**: Fitur terkuat Tailwind. Kamu bisa mengatur status hover (\`hover:\`), state fokus (\`focus:\`), layar mobile ke desktop (\`md:\`, \`lg:\`), hingga tema (\`dark:\`).
4. **Isolasi via Komponen**: Atasi masalah HTML kotor dengan merangkum class-class Tailwind ke dalam *Functional Component* milik React. Gunakan trik \`cn()\` untuk menghindari konflik string class.
5. **CLI vs CDN**: Pastikan menggunakan metode CLI (via bundler seperti Next.js/Vite) untuk Production agar file CSS yang dihasilkan super kecil.

Dengan menguasai Tailwind CSS, kamu tidak hanya belajar framework CSS, tetapi kamu belajar *best-practice* desain antarmuka modern. Siap untuk kuis? Buktikan pengetahuanmu di slide berikutnya!`,
            keyTakeaway: "Tailwind CSS bukan hanya alat mempercepat penulisan CSS, melainkan sebuah metode yang menerapkan konsistensi, maintenance mudah, dan efisiensi melalui arsitektur berbasis komponen."
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Ujian Pemahaman Tailwind CSS",
            content: "Uji pengetahuanmu tentang utility-first, responsive modifiers, dan dark mode. Buktikan kamu siap menjadi Frontend Ninja!",
            quiz: {
              questions: [],
              passingScore: 80,
              totalQuestions: 5,
              timeLimit: 300
            }
          }
        ],
        quizBank: [],
      },
    },{
      title: "Advanced Layout & Komponen Interaktif",
      slug: "advanced-layout-komponen-interaktif",
      order: 2,
      xpReward: 150,
      sources: [
        { type: "YOUTUBE", title: "Tailwind CSS - Advanced Layout", url: "https://www.youtube.com/watch?v=z3slaXqmkT0" },
        { type: "DOCUMENTATION", title: "Tailwind CSS Grid", url: "https://tailwindcss.com/docs/grid-template-columns" },
        { type: "DOCUMENTATION", title: "Transitions & Animation", url: "https://tailwindcss.com/docs/transition-property" }
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "CSS Grid vs Flexbox",
            content: `Di modul pertama, kita sudah membahas betapa saktinya **Flexbox** (\`flex\`) untuk menyusun elemen secara vertikal atau horizontal. Namun, Flexbox punya satu kelemahan: ia dirancang untuk layout satu dimensi (satu baris atau satu kolom saja pada satu waktu).

Bagaimana jika kamu ingin membangun struktur galeri foto 2D seperti Instagram, atau layout gaya **Bento Box** seperti di dashboard Apple? 
Menggunakan Flexbox akan sangat merepotkan karena kamu harus membuat banyak *wrapper* tambahan.

Di sinilah **CSS Grid** masuk sebagai pahlawan sesungguhnya untuk layout dua dimensi (baris DAN kolom sekaligus). Dan beruntungnya, Tailwind CSS membungkus kerumitan CSS Grid menjadi sangat sederhana.`,
            keyTakeaway: "Gunakan Flexbox untuk menyusun deretan elemen secara 1D (menu navigasi, daftar isi). Gunakan Grid untuk menyusun tata letak 2D kompleks (galeri, dashboard, bento UI)."
          },
          {
            slideNumber: 2,
            type: "lesson",
            title: "Anatomi Tailwind Grid",
            content: `Membuat Grid di Tailwind semudah menambahkan class \`grid\` pada sebuah *container*. 

Setelah *container* menjadi Grid, kamu menentukan jumlah kolom menggunakan properti **\`grid-cols-{n}\`**.

\`\`\`html
<div class="grid grid-cols-3 gap-4">
  <div class="bg-red-500">1</div>
  <div class="bg-blue-500">2</div>
  <div class="bg-green-500">3</div>
  <div class="bg-yellow-500">4</div>
  <div class="bg-purple-500">5</div>
  <div class="bg-pink-500">6</div>
</div>
\`\`\`

Pada contoh di atas, kita memesan **3 kolom** rata dengan jarak (\`gap\`) sebesar 16px. Karena ada 6 elemen di dalamnya, maka secara otomatis elemen 1, 2, 3 akan menempati baris pertama, lalu elemen 4, 5, 6 akan *wrap* (turun) membentuk baris kedua. Sempurna tanpa perlu mengatur baris manual!`,
            keyTakeaway: "Class 'grid' mengaktifkan mode grid. Class 'grid-cols-X' membagi container menjadi X kolom yang sama besar."
          },
          {
            slideNumber: 3,
            type: "example",
            title: "Grid Responsif Kelas Dewa",
            content: `Kehebatan Grid akan sangat terasa ketika dipadukan dengan *Responsive Modifiers* Tailwind.

Bayangkan kamu memiliki daftar 12 produk jualan. Di layar HP yang sempit, kamu ingin produk tampil 1 per baris (memanjang ke bawah). Di tablet tampil 2 per baris, dan di monitor raksasa tampil 4 per baris.

Dengan CSS kuno, kamu butuh ratusan baris Media Query. Di Tailwind? Cukup satu baris:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Isi dengan 12 buah Kartu Produk di sini -->
  <CardProduk />
  <CardProduk />
</div>
\`\`\`

Seketika, aplikasimu beradaptasi pada segala perangkat dengan presisi luar biasa.`,
            keyTakeaway: "Gunakan penggabungan grid-cols-1 md:grid-cols-2 lg:grid-cols-4 untuk membuat galeri otomatis yang responsif sesuai lebar layar pengguna."
          },
          {
            slideNumber: 4,
            type: "example",
            title: "Bento Grid: Meretas Dimensi",
            content: `Pernahkah kamu melihat *Bento Box* UI (desain kotak-kotak tidak beraturan) yang sering dipakai oleh Apple? Rahasia membuatnya adalah membiarkan satu elemen "memakan" lebih dari satu kolom atau baris!

Di Tailwind, gunakan **\`col-span-{n}\`** untuk melebarkan elemen secara horizontal, dan **\`row-span-{n}\`** untuk meninggikan elemen secara vertikal.

\`\`\`html
<div class="grid grid-cols-4 grid-rows-2 gap-4 h-64">
  <!-- Memakan 2 kolom dan 2 baris (Kotak Raksasa di kiri) -->
  <div class="col-span-2 row-span-2 bg-blue-500 rounded-xl">Hero</div>
  
  <!-- Kotak standar -->
  <div class="bg-green-500 rounded-xl">Info 1</div>
  <div class="bg-yellow-500 rounded-xl">Info 2</div>
  
  <!-- Memakan 2 kolom mendatar di kanan bawah -->
  <div class="col-span-2 bg-purple-500 rounded-xl">Banner Bawah</div>
</div>
\`\`\`
Hanya dengan beberapa instruksi pendek, kamu berhasil menciptakan tata letak majalah modern!`,
            keyTakeaway: "Properti col-span dan row-span digunakan pada anak-anak grid (grid item) agar mereka bisa meluas menempati ruang lebih besar dari slot aslinya."
          },
          {
            slideNumber: 5,
            type: "challenge",
            title: "Challenge: Rakit Bento Box",
            content: `Sekarang saatnya kamu membuat Bento Grid-mu sendiri. 
Bos desainmu meminta sebuah Dashboard ringkas yang berisi 3 kotak, dengan struktur sebagai berikut:
- Harus berupa grid dengan total 3 kolom (\`grid-cols-3\`).
- Kotak "Statistik Utama" (Warna Merah) harus menempati 2 kolom penuh.
- Sisanya (Kotak Biru dan Hijau) masing-masing menempati 1 kolom.`,
            challenge: {
              instruction: "Lengkapi class pada container dan kotak merah agar membentuk grid bento sesuai instruksi.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "export default function Bento() {\n  return (\n    // 1. Lengkapi container ini dengan grid, grid-cols-3, dan gap-4\n    <div className=\"...\">\n      {/* 2. Jadikan kotak merah ini meluas 2 kolom (col-span-2) */}\n      <div className=\"bg-red-200 p-10 rounded-xl\">\n        Statistik Utama (Besar)\n      </div>\n      \n      <div className=\"bg-blue-200 p-10 rounded-xl\">A</div>\n      <div className=\"bg-green-200 p-10 rounded-xl\">B</div>\n    </div>\n  );\n}",
              expectedConcepts: ["grid", "grid-cols-3", "col-span-2"],
              evaluationCriteria: "Evaluasi apakah div luar memiliki class grid dan grid-cols-3, dan div merah memiliki col-span-2.",
              hints: [
                "Class untuk div paling luar: `grid grid-cols-3 gap-4`",
                "Class untuk div merah: cukup tambahkan `col-span-2` di sebelahnya."
              ],
              sampleAnswer: "export default function Bento() {\n  return (\n    <div className=\"grid grid-cols-3 gap-4\">\n      <div className=\"col-span-2 bg-red-200 p-10 rounded-xl\">\n        Statistik Utama (Besar)\n      </div>\n      \n      <div className=\"bg-blue-200 p-10 rounded-xl\">A</div>\n      <div className=\"bg-green-200 p-10 rounded-xl\">B</div>\n    </div>\n  );\n}",
              followUpQuestion: "Kenapa kotak biru dan hijau otomatis turun ke bawah jika kotak merah diberi col-span-3?"
            }
          },
          {
            slideNumber: 6,
            type: "lesson",
            title: "Transisi Mulus (Transitions)",
            content: `Antarmuka yang kaku (*snap*) saat di-hover akan terasa murahan. UI modern yang *premium* selalu memiliki pergerakan transisi yang halus seperti mentega.

Alih-alih repot menulis \`transition: all 0.3s ease-in-out\` di file CSS, Tailwind menawarkannya secara instan lewat utility **\`transition-all\`**.

Syarat terjadinya animasi transisi di Tailwind:
1. Elemen harus memiliki class \`transition\` atau \`transition-all\`.
2. Kamu harus menentukan durasinya, misal \`duration-300\` (berarti 300 milidetik).
3. Harus ada *trigger* (pemicu) perubahan nilai, contohnya dari efek \`hover:\`.

\`\`\`html
<!-- Tombol Murahan (Kaku) -->
<button class="bg-blue-500 hover:bg-blue-700 text-white p-2">Kaku</button>

<!-- Tombol Premium (Mulus) -->
<button class="transition-all duration-300 bg-blue-500 hover:bg-blue-700 hover:scale-105 text-white p-2">
  Premium
</button>
\`\`\`
Pada tombol premium, perubahan warna ke biru gelap dan perubahan ukuran (membesar 5% via \`scale-105\`) akan teranimasi secara mulus selama 0.3 detik.`,
            keyTakeaway: "Tambahkan class 'transition-all' beserta 'duration-300' ke setiap tombol dan kartu (card) agar terasa lebih responsif dan premium saat berinteraksi dengan mouse."
          },
          {
            slideNumber: 7,
            type: "example",
            title: "Animasi Keyframe Bawaan (Pulse & Spin)",
            content: `Terkadang transisi hover saja tidak cukup. Bagaimana jika aplikasi sedang mengambil data dari server? Kita butuh memutar ikon *loading*, atau menampilkan efek kerangka (*skeleton screen*) yang berkedip-kedip halus.

Tailwind memiliki utility \`animate\` *built-in* untuk menyelesaikannya:

**1. animate-spin**
Cocok untuk me-rotasi ikon SVG loading.
\`\`\`html
<svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">...</svg>
Memproses...
\`\`\`

**2. animate-pulse**
Cocok untuk membuat *Skeleton Loading* tiruan saat data belum muncul. Ia akan mengubah kepekatan warna secara berkala (*fade in out*).
\`\`\`html
<div class="animate-pulse flex space-x-4">
  <div class="rounded-full bg-slate-200 h-10 w-10"></div>
  <div class="h-10 bg-slate-200 rounded w-full"></div>
</div>
\`\`\`

**3. animate-bounce**
Membuat elemen memantul-mantul naik turun secara tak terhingga. Sangat pas untuk panah indikator "Scroll ke Bawah".`,
            keyTakeaway: "Gunakan animate-spin untuk indikator loading putar, dan animate-pulse untuk membuat skeleton UI placeholder."
          },
          {
            slideNumber: 8,
            type: "lesson",
            title: "Positioning & Z-Index",
            content: `Selain Flexbox dan Grid yang mengatur tatanan dokumen secara alami (*normal flow*), terkadang kita butuh elemen yang "melayang" di atas elemen lain secara paksa. Contohnya: *Tooltip*, *Popup/Modal*, atau *Header* yang menempel terus di atas layar saat di-scroll (*Sticky Header*).

Di Tailwind, properti posisi ini sangat lugas:
- \`relative\`: Elemen tetap pada tempat asalnya, tapi ia menjadi "jangkar" (acuan posisi) bagi elemen anak di dalamnya yang bersifat absolute.
- \`absolute\`: Elemen keluar dari *normal flow*, dan diposisikan bebas mengacu pada elemen induk (parent) terdekat yang memiliki \`relative\`.
- \`fixed\`: Mirip absolute, tapi acuannya HANYA layar *browser* (viewport). Ia akan tetap di situ walaupun halaman di-scroll turun.
- \`sticky\`: Campuran relative dan fixed. Ia normal sampai kita men-scroll melewatinya, lalu ia akan menempel di layar.

Untuk memindahkan koordinat elemen \`absolute/fixed\`, gunakan \`top-0\`, \`right-0\`, \`bottom-0\`, \`left-0\` (bisa diberi angka, misal \`top-4\`).

**Z-Index (Tumpukan Elemen):**
Jika ada dua elemen melayang yang bertabrakan, siapa yang menutupi siapa? Gunakan \`z-10\`, \`z-20\`, \`z-30\`, hingga \`z-50\`. Semakin tinggi angkanya, semakin ia tampil di lapisan teratas mendekati mata pengguna.`,
            keyTakeaway: "Ingat aturan emas: Selalu berikan class 'relative' pada elemen Parent, jika kamu ingin mengatur posisi elemen Child menggunakan 'absolute' di dalamnya."
          },
          {
            slideNumber: 9,
            type: "example",
            title: "Studi Kasus: Membuat Popup/Modal",
            content: `Mari kita terapkan *Positioning* dan *Z-Index* untuk membuat sebuah *Popup/Modal* layar penuh yang menutupi seluruh website, persis seperti *overlay* konfirmasi saat kamu ingin menghapus data.

\`\`\`html
<!-- Layar Gelap Penutup Background (Overlay) -->
<div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
  
  <!-- Kotak Putih Modal (Layer Teratas) -->
  <div class="relative bg-white rounded-xl shadow-2xl p-8 w-96 z-50">
    
    <!-- Tombol Silang (X) di pojok kanan atas -->
    <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500">
      <svg class="w-6 h-6">...</svg> <!-- Ikon X -->
    </button>
    
    <h2 class="text-2xl font-bold mb-4">Hapus Akun?</h2>
    <p class="text-gray-600 mb-6">Tindakan ini tidak bisa dibatalkan.</p>
    
    <div class="flex justify-end gap-3">
      <button class="px-4 py-2 bg-gray-200 rounded">Batal</button>
      <button class="px-4 py-2 bg-red-600 text-white rounded">Hapus</button>
    </div>
    
  </div>
</div>
\`\`\`

**Bedah Kode:**
- \`fixed inset-0\`: \`inset-0\` adalah singkatan jenius dari Tailwind untuk gabungan \`top-0 right-0 bottom-0 left-0\`. Ini membuat layarnya merentang menutupi 100% viewport!
- \`z-40\` vs \`z-50\`: *Overlay* hitam ada di \`z-40\`, sedangkan kotak putih ada di lapisan \`z-50\` agar tidak tertutup warna gelap.
- \`absolute top-4 right-4\`: Tombol 'X' diatur *absolute* agar selalu nempel presisi di pojok kanan atas dari kotak putih (\`relative\`).`,
            keyTakeaway: "Utility 'inset-0' dipadukan dengan 'fixed' adalah jurus andalan nomor satu untuk membuat modal, backdrop, atau popup fullscreen di Tailwind."
          },
          {
            slideNumber: 10,
            type: "lesson",
            title: "Tipografi Lanjutan: Truncate & Line Clamp",
            content: `Menampilkan teks dinamis (seperti judul artikel atau deskripsi dari *Database*) berpotensi merusak layout jika teksnya terlampau panjang. 

Dalam desain UI yang rapi, kita harus secara elegan "memotong" teks tersebut dengan menambahkan elipsis (titik-titik \`...\`) di bagian akhir kalimat yang tidak muat. Tailwind menyediakan utilitas mutakhir untuk masalah klise ini:

**1. Truncate (Potong di 1 Baris)**
Jika teks hanya boleh memakan SATU baris saja, langsung gunakan class \`truncate\`.
\`\`\`html
<div class="w-64"> <!-- Lebar dibatasi 64 -->
  <p class="truncate font-bold">
    Ini adalah judul artikel yang sangat panjang sekali dan pasti akan terpotong secara elegan.
  </p>
</div>
\`\`\`

**2. Line Clamp (Potong di N Baris)**
Bagaimana jika kita butuh deskripsi tersebut tampil di tepat 2 atau 3 baris paragraf?
Gunakan utilitas canggih \`line-clamp-*\`.
\`\`\`html
<p class="line-clamp-3 text-gray-500">
  Paragraf ini akan dirender secara normal hingga baris ketiga. Jika di baris keempat masih ada sisa teks, Tailwind CSS menggunakan sihir Webkit untuk memotong teks tersebut dan menampilkan tiga titik elipsis di ujung karakter terakhir baris ketiga. Sangat memanjakan mata dan menjaga kekakuan tinggi layout card milikmu!
</p>
\`\`\``,
            keyTakeaway: "Gunakan 'truncate' untuk teks satu baris seperti Judul atau Nama. Gunakan 'line-clamp-2' atau 'line-clamp-3' untuk paragraf deskripsi/sinopsis yang multi-baris."
          },
          {
            slideNumber: 11,
            type: "example",
            title: "Studi Kasus: Card Artikel Berita",
            content: `Mari kita gabungkan Flexbox, Image Aspect Ratio, dan Line Clamp untuk membangun *Card Artikel* ala Portal Berita modern:

\`\`\`html
<article class="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow max-w-sm">
  
  <!-- Gambar Thumbnail -->
  <div class="aspect-video w-full relative">
    <img 
      src="berita-tech.jpg" 
      class="object-cover w-full h-full" 
      alt="Ilustrasi berita"
    />
    <!-- Label Kategori (Badge Mengambang) -->
    <span class="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
      Teknologi
    </span>
  </div>

  <!-- Konten Teks -->
  <div class="p-5 flex flex-col flex-1">
    <h3 class="text-xl font-bold text-gray-900 line-clamp-2 mb-2">
      Apple Umumkan Headset AR Terbarunya dengan Harga Sensasional
    </h3>
    <p class="text-gray-600 line-clamp-3 mb-4 flex-1">
      Produk kacamata masa depan ini diklaim akan mengubah cara kita berinteraksi dengan dunia maya. Dibekali chipset terkuat dan resolusi retina...
    </p>
    
    <!-- Bagian Kaki (Footer) -->
    <div class="flex items-center justify-between text-sm text-gray-500 mt-auto">
      <span>Oleh: Reporter 1</span>
      <span>12 Mei 2026</span>
    </div>
  </div>
</article>
\`\`\`
**Bedah Trik (Perhatikan baik-baik!):**
- \`aspect-video\`: Mengunci rasio kotak gambar ke format 16:9 secara otomatis!
- \`object-cover\`: Memastikan gambar memenuhi kotak tanpa merubah bentuk wajah asli gambarnya (tidak *gepeng*).
- \`mt-auto\`: (Margin Top Auto) Trik flexbox jenius agar *Footer* (tanggal & nama) selalu terdorong paksa jatuh ke paling bawah Card, menempel di lantai, sehingga tinggi Card tetap seragam walau deskripsinya pendek!`,
            keyTakeaway: "Padukan 'aspect-video' dan 'object-cover' untuk menjamin foto thumbnail selalu proporsional dan tidak pernah penyok."
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Transform & Skala (Transforms)",
            content: `Apakah kamu pernah melihat elemen yang sengaja diputar, dimiringkan, atau digeser posisinya secara asimetris dari kordinat aslinya? Itu adalah CSS Transforms.

Di Tailwind, utilitas ini sangat gampang diterapkan. Kamu tidak perlu lagi menulis \`transform: translateX(10px) rotate(45deg)\`.

- **Geser (Translate)**: \`translate-x-4\` (geser ke kanan), \`-translate-y-2\` (geser ke atas/minus).
- **Putar (Rotate)**: \`rotate-45\` (putar 45 derajat searah jarum jam), \`-rotate-90\` (berlawanan jarum jam).
- **Skala (Scale)**: \`scale-110\` (membesar 110%), \`scale-90\` (mengecil 90%).

Contoh gabungan:
\`\`\`html
<div class="hover:translate-x-4 hover:scale-105 hover:-rotate-6 transition duration-300">
  Kartu Bermain (Play Card)
</div>
\`\`\`
Saat kartu di-hover, ia akan meluncur ke kanan (\`translate-x\`), membesar 5% (\`scale\`), dan sedikit miring ke kiri (\`-rotate\`), semuanya dikerjakan sekaligus dengan mulus oleh \`transition\`.`,
            keyTakeaway: "Gunakan properti transform negatif dengan menambahkan tanda minus di depan nama class, contoh: '-rotate-45' atau '-translate-y-4'."
          },
          {
            slideNumber: 13,
            type: "challenge",
            title: "Challenge: Buat Tombol Interaktif",
            content: `Uji instingmu dalam merangkai Transforms dan Transition!

Buatlah sebuah tombol React sederhana yang ketika pengguna mengarahkan kursor (hover) ke atasnya:
1. Tombol itu membesar sedikit (105%).
2. Tombol itu bergeser naik (ke atas) sedikit.
3. Transisinya harus mulus, tidak patah-patah!`,
            challenge: {
              instruction: "Lengkapi atribut className pada tombol di bawah ini. Tambahkan transisi dasar, lalu atur agar saat hover, skala menjadi 105 dan posisi y bergeser ke atas sebanyak nilai utilitas 2.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "export default function TombolTerbang() {\n  return (\n    <button className=\"bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg /* TULIS JAWABANMU DISINI */ \">\n      Terbang ke Angkasa!\n    </button>\n  );\n}",
              expectedConcepts: ["transition-all", "hover:scale-105", "hover:-translate-y-2"],
              evaluationCriteria: "Evaluasi apakah tombol memiliki class transition-all (atau sekadar transition), hover:scale-105, dan hover:-translate-y-2. Tanda minus pada translate y wajib ada karena digeser naik.",
              hints: ["Untuk membuat elemen mulus tambahkan `transition-all`", "Naik ke atas berarti sumbu Y bernilai negatif: `hover:-translate-y-2`"],
              sampleAnswer: "export default function TombolTerbang() {\n  return (\n    <button className=\"bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:scale-105 hover:-translate-y-2\">\n      Terbang ke Angkasa!\n    </button>\n  );\n}",
              followUpQuestion: "Kenapa pergeseran ke arah atas di CSS dilambangkan dengan nilai Y negatif, bukannya positif?"
            }
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Rangkuman Modul 2",
            content: `Luar biasa! Kamu baru saja meng-*upgrade* skill styling-mu ke level mahir.

Intisari dari Modul 2:
1. **Grid System**: Rahasia mutlak dari layout dashboard modern. Ingat selalu kombinasi \`grid\`, \`grid-cols\`, dan manipulasi ukuran via \`col-span\`.
2. **Positioning (Absolute/Fixed)**: Sangat krusial untuk membuat layer pop-up, tooltip, atau sticky header. Ingat rumus "Parent Relative, Child Absolute".
3. **Tipografi Ekstrem**: Utilitas \`line-clamp\` dan \`truncate\` menjaga keutuhan struktur layout (card) dari data dinamis yang terlalu panjang.
4. **Micro-Interactions**: Rahasia UI "mahal" ada pada *transition*, *transform*, dan animasi *keyframe* seperti *pulse* dan *spin*.

Di modul terakhir, kita akan belajar teknik *Under the Hood*: bagaimana cara membongkar mesin Tailwind dan mengustomisasi tema bawaannya agar sesuai dengan warna dan font *Brand* perusahaanmu!`,
            keyTakeaway: "CSS Grid, Absolute Positioning, dan Animasi Transisi adalah kombinasi maut untuk menciptakan antarmuka yang sangat kompleks namun tetap indah dipandang."
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Ujian Validasi Modul 2",
            content: "Mari uji pemahaman logis-mu mengenai Grid, Z-Index, Line-Clamp, dan aturan animasi transisi di Tailwind CSS.",
            quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
          }
        ],
        quizBank: []
      }
    },
    {
      title: "Optimasi & Konfigurasi",
      slug: "optimasi-konfigurasi-tailwind",
      order: 3,
      xpReward: 200,
      sources: [
        { type: "YOUTUBE", title: "Tailwind CSS - Optimasi & Konfigurasi", url: "https://www.youtube.com/watch?v=z3slaXqmkT0" },
        { type: "DOCUMENTATION", title: "Configuration", url: "https://tailwindcss.com/docs/configuration" }
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Filosofi tailwind.config.ts",
            content: `Sebagai *Framework*, Tailwind tidak memaksamu untuk tunduk pada desain miliknya selamanya. Tailwind hanyalah sebuah mesin pembuat *class*. Kamu adalah pilotnya.

File konfigurasi (biasanya bernama \`tailwind.config.js\` atau \`tailwind.config.ts\`) adalah pusat komando utamamu. Di file ini, kamu bisa:
1. Menambah warna *Brand* perusahaan.
2. Mengganti jenis *Font*.
3. Menambahkan ukuran *breakpoint* baru (selain sm, md, lg).
4. Mendaftarkan *Plugin* eksternal.

Tanpa konfigurasi, kamu hanya bisa menggunakan warna baku (seperti \`red-500\`, \`blue-600\`). Tapi di proyek komersial, bosmu akan memberikan warna *Hex Code* spesifik (misalnya hijau Gojek \`#00AA13\` atau biru BCA \`#0066AE\`). Di sinilah file *config* beraksi.`,
            keyTakeaway: "tailwind.config.ts adalah tempat di mana kamu mengubah identitas default Tailwind agar selaras dengan panduan gaya (Style Guide) proyek perusahaanmu."
          },
          {
            slideNumber: 2,
            type: "example",
            title: "Extend vs Override: Jangan Sampai Tertukar!",
            content: `Saat kamu ingin menambahkan warna kustom, ada DUA tempat di dalam file konfigurasi untuk menaruhnya: Di dalam blok \`theme\` langsung, atau di dalam sub-blok \`extend\`.

**Kesalahan Fatal (Override):**
\`\`\`js
module.exports = {
  theme: {
    colors: { // Ini menghapus SEMUA warna bawaan Tailwind!
      'brand-gojek': '#00AA13',
    }
  }
}
\`\`\`
Jika kamu melakukan hal di atas, class \`bg-red-500\` tidak akan bisa digunakan lagi. Aplikasimu akan hancur berantakan.

**Cara yang Benar (Extend):**
\`\`\`js
module.exports = {
  theme: {
    extend: { // Ini menambahkan warna baru TANPA merusak yang lama
      colors: {
        'brand-gojek': '#00AA13',
      }
    }
  }
}
\`\`\`
Kini, kamu bisa menggunakan \`bg-brand-gojek\` DAN tetap bisa menggunakan \`bg-red-500\` untuk pesan error.`,
            keyTakeaway: "Selalu masukkan kustomisasi warna, font, dan ukuran ke dalam objek `extend`. Objek ini menggabungkan konfigurasi barumu dengan nilai bawaan pabrik."
          },
          {
            slideNumber: 3,
            type: "challenge",
            title: "Challenge: Misi Penyelamatan Config",
            content: "Seorang *Junior Developer* tidak sengaja menghapus semua warna Tailwind karena salah menempatkan kode konfigurasi. Bisakah kamu memperbaikinya?",
            challenge: {
              instruction: "Pindahkan blok `colors` ke dalam properti `extend` agar warna bawaan Tailwind selamat.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\"./src/**/*.{js,jsx,ts,tsx}\"],\n  theme: {\n    // BANTUAN: Bungkus colors di dalam objek extend:\n    colors: {\n      'neon-pink': '#ff00ff',\n    }\n  },\n  plugins: [],\n}",
              expectedConcepts: ["extend:"],
              evaluationCriteria: "Evaluasi apakah property colors dimasukkan ke dalam objek extend. Property theme harus mengandung extend, dan extend mengandung colors.",
              hints: [
                "Struktur yang benar: `theme: { extend: { colors: { ... } } }`"
              ],
              sampleAnswer: "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\"./src/**/*.{js,jsx,ts,tsx}\"],\n  theme: {\n    extend: {\n      colors: {\n        'neon-pink': '#ff00ff',\n      }\n    }\n  },\n  plugins: [],\n}",
              followUpQuestion: "Kenapa Tailwind mendesain sistemnya agar blok `theme` langsung akan me-replace bawaan?"
            }
          },
          {
            slideNumber: 4,
            type: "lesson",
            title: "Menanam Custom Font Family",
            content: `Sama seperti warna, kamu juga wajib mengonfigurasi *Font* di file \`tailwind.config.ts\`.

Biasanya, kamu mengimpor Google Font (seperti Inter atau Roboto) melalui file CSS utama. Lalu, kamu mendaftarkannya di Tailwind agar bisa dipanggil lewat *utility class* seperti \`font-sans\` atau nama buatanmu sendiri \`font-brand\`.

\`\`\`js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Mengubah font default Tailwind (sans) menjadi Inter
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        // Membuat utility baru class "font-robot"
        robot: ['"Roboto Mono"', 'monospace'],
      }
    }
  }
}
\`\`\`
Pada contoh di atas, kita memasukkan *Font* 'Inter' di urutan terdepan array. Jika gagal diload, Tailwind otomatis mundur (fallback) menggunakan font *sans-serif* bawaan OS pengguna berkat bantuan \`defaultTheme.fontFamily.sans\`.`,
            keyTakeaway: "Kustomisasi FontFamily wajib menyediakan array font fallback. Menimpa kunci `sans` akan mengubah font utama seluruh website secara instan."
          },
          {
            slideNumber: 5,
            type: "lesson",
            title: "Bahaya Dinamisme: Kapan Tailwind Gagal Beraksi?",
            content: `Ini adalah *jebakan* yang memakan ribuan korban di React + Tailwind.

Mungkin kamu tergoda membuat komponen tombol dinamis seperti ini:
\`\`\`jsx
// SALAH DAN BERBAHAYA
function Button({ colorName }) {
  // Jika colorName = "red", hasilnya "bg-red-500"
  return <button className={\`bg-\${colorName}-500\`}>Klik Saya</button>;
}
\`\`\`

**INI TIDAK AKAN BEKERJA DI PRODUCTION!**

**Alasannya:**
Compiler Tailwind memindai seluruh *file* kodemu menggunakan *Regular Expression* (RegEx) kasar untuk mencari *string* kata yang utuh. Ia mencari tulisan mentah \`"bg-red-500"\`.
Karena kamu memecahnya menjadi string literal \`bg-\${...}-500\`, compiler tidak menemukan tulisan "bg-red-500", sehingga *class* CSS tersebut TIDAK AKAN DISERTAKAN pada saat *build*. Tombolmu akan transparan!`,
            keyTakeaway: "Jangan pernah menggunakan penggabungan string (concatenation) untuk merakit nama class Tailwind. Tuliskan nama class secara utuh dan eksplisit agar terdeteksi oleh compiler JIT."
          },
          {
            slideNumber: 6,
            type: "example",
            title: "Pola Penulisan Dinamis yang Benar",
            content: `Lalu, bagaimana cara membuat komponen React yang warnanya bisa diubah-ubah lewat *props*?

**Solusinya: Gunakan *Mapping Object* atau tulis *class* secara utuh.**

\`\`\`jsx
// CARA YANG BENAR
const colorMap = {
  success: 'bg-green-500 hover:bg-green-600',
  danger: 'bg-red-500 hover:bg-red-600',
  warning: 'bg-yellow-500 hover:bg-yellow-600'
};

function AlertButton({ variant }) {
  // variant misal: "danger"
  // Maka akan mengambil string "bg-red-500 hover:bg-red-600" utuh!
  return (
    <button className={\`px-4 py-2 text-white \${colorMap[variant]}\`}>
      Proses Aksi
    </button>
  );
}
\`\`\`
Dengan pola ini, file JavaScript-mu tetap mengandung string utuh \`bg-green-500\` dll, sehingga Tailwind bisa memindai dan me-render CSS-nya dengan sempurna. (Pustaka seperti \`class-variance-authority\` atau \`clsx\` sangat populer untuk menangani masalah kompleks ini).`,
            keyTakeaway: "Gunakan kamus/mapping obyek JavaScript yang memuat string class Tailwind utuh untuk memproses pewarnaan dinamis di komponen."
          },
          {
            slideNumber: 7,
            type: "lesson",
            title: "Plugin Resmi Tailwind",
            content: `Ada kalanya filosofi *Utility-First* menjadi bumerang.
Contoh: Bagaimana jika aplikasimu menarik artikel blog berformat Markdown atau HTML dari *database* luar? Kamu tidak bisa menempelkan class \`text-xl font-bold mb-4\` di dalam tag \`<h1>\` HTML mentah hasil *database* tersebut!

Untuk skenario ekstrim ini, Tailwind menyediakan **Plugin Resmi**.

1. **@tailwindcss/typography**
   Menyediakan satu *magic class* bernama \`prose\`. Cukup bungkus artikel HTML-mu dengan \`<article class="prose">\`, maka Tailwind otomatis memberikan *styling* tipografi elegan (heading, paragraf, list, quote) pada semua anak HTML di dalamnya secara ajaib tanpa class utility tambahan!

2. **@tailwindcss/forms**
   Secara default, elemen *form* di browser (input, checkbox, radio) memiliki gaya *native* yang kuno. Plugin ini meresetnya sehingga sangat mudah ditimpa dengan utility Tailwind (misal cincin fokus biru yang rapi).`,
            keyTakeaway: "Jangan memaksakan penulisan utility class untuk dokumen kaya/HTML mentah dari luar. Gunakan plugin '@tailwindcss/typography' (class prose) sebagai peretas instan styling artikel."
          },
          {
            slideNumber: 8,
            type: "lesson",
            title: "Trik Rahasia: Arbitrary Values (Nilai Bebas)",
            content: `Sehebat-hebatnya Tailwind menyediakan palet warna dan ukuran, terkadang klien atau desainer memaksamu menggunakan warna spesifik (contoh: *hex code* \`#ff49db\`) yang tidak ada di dalam *class* bawaan Tailwind.

Dulu, kamu harus membuka file konfigurasi untuk menambahkannya secara manual.
Sekarang, dengan fitur **Arbitrary Values** (Nilai Bebas JIT Compiler), kamu cukup mengapit nilai *custom* tersebut menggunakan kurung siku \`[]\` langsung di HTML!

**Sintaks:** \`namaUtility-[nilaiSpesifik]\`

- Warna Latar: \`bg-[#ff49db]\`
- Ukuran Teks: \`text-[14px]\`
- Margin/Padding: \`mt-[17px]\` atau \`p-[5vh]\`
- Grid: \`grid-cols-[200px_minmax(900px,_1fr)_100px]\`

Tailwind akan membaca *string* dalam kurung siku tersebut dan seketika menciptakan *class* CSS berukuran/warna akurat *on-the-fly* (saat build).`,
            keyTakeaway: "Kurung siku [] adalah jalan pintas (shortcut) untuk menginjeksi nilai spesifik (seperti hex color atau satuan rem/px absolut) tanpa perlu repot memperbarui file konfigurasi utama."
          },
          {
            slideNumber: 9,
            type: "example",
            title: "Studi Kasus Arbitrary Values",
            content: `Mari kita lihat bagaimana *Arbitrary Values* menolong kita dalam menghadapi desain yang unik dan tidak simetris:

\`\`\`html
<!-- Contoh Penggunaan Tepat Guna -->
<div class="relative bg-white p-[23px] max-w-[420px] rounded-[18px]">
  
  <!-- Gambar Latar Belakang Custom dari URL Eksternal -->
  <div class="h-[150px] bg-[url('https://picsum.photos/400/150')] bg-cover"></div>
  
  <!-- Bayangan Spesifik dari Desainer -->
  <button class="bg-[#1DA1F2] shadow-[0_4px_10px_rgba(29,161,242,0.5)] text-white mt-[12px] px-4 py-2 rounded-full">
    Share ke Twitter
  </button>
  
</div>
\`\`\`

**Kapan Sebaiknya MENGHINDARI Arbitrary Values?**
Walaupun sangat sakti, jangan gunakan kurung siku untuk *semua hal*!
Jika kamu melihat timmu menggunakan \`text-[16px]\` di 50 file berbeda alih-alih menggunakan utility standar \`text-base\`, itu artinya timmu merusak *Design System* aplikasi.
Gunakan nilai bebas ini HANYA untuk "kasus pengecualian (*edge-cases*)" sesekali saja.`,
            keyTakeaway: "Arbitrary Values (kurung siku) adalah alat penyelamat untuk edge-cases. Jangan gunakan secara massal karena dapat merusak konsistensi Spacing dan Typography dari framework asal."
          },
          {
            slideNumber: 10,
            type: "lesson",
            title: "Dark Mode Lanjutan (Sistem vs Manual)",
            content: `Di Modul 1 kita sudah menyinggung \`dark:\` modifier. Namun, bagaimana sebenarnya browser menentukan untuk merender *Dark Mode* atau *Light Mode*?

Tailwind menawarkan 2 strategi (*strategy*) di file \`tailwind.config.ts\`:

**1. Strategy: 'media' (Otomatis)**
Jika kamu tidak mengonfigurasi apa-apa, Tailwind akan membaca setelan OS (Sistem Operasi) perangkat pengguna lewat *media query* CSS \`@media (prefers-color-scheme: dark)\`. Jika HP iPhone/Android pengguna sedang dalam mode gelap, website akan otomatis gelap. *Kekurangannya: Pengguna tidak bisa mengubahnya secara manual via tombol di websitemu.*

**2. Strategy: 'class' (Manual/Bebas)**
Ini adalah pendekatan modern (*Best Practice*). Kamu mendeklarasikan \`darkMode: 'class'\` di file konfigurasi.
- Tailwind tidak akan lagi patuh pada OS secara membabi-buta.
- Mode Gelap HANYA aktif jika tag \`<html>\` (atau *parent* tertinggi) memiliki class bernama \`"dark"\`.
- Kamu bisa membuat tombol React yang menyuntikkan (toggle) class \`"dark"\` ke tag \`<html>\`. Ini memberi pengguna 100% kendali untuk men-switch tema secara manual (bahkan menyimpannya ke *localStorage* browser).`,
            keyTakeaway: "Aktifkan darkMode: 'class' di tailwind.config.ts. Ini memungkinkan pembuatan tombol 'Toggle Theme' interaktif berbasis JavaScript yang sangat disukai pengguna modern."
          },
          {
            slideNumber: 11,
            type: "challenge",
            title: "Challenge: Tombol Bebas Bersyarat",
            content: `Buktikan kemampuanmu meramu warna bebas (Arbitrary Value), State Modifier (Hover), dan Tema Gelap (Dark Mode) sekaligus dalam satu elemen.

**Tugasmu:** Lengkapi komponen tombol ini agar sesuai spesifikasi berikut:
1. Saat mode terang normal, tombol memiliki warna latar spesifik ` + "`#00f5d4`" + `.
2. Saat mode terang di-hover, warna latarnya berubah sedikit menjadi ` + "`#00bbf9`" + `.
3. Saat mode gelap (dark mode), tombol tersebut harus berwarna latar ` + "`#f15bb5`" + `.
4. Jangan lupa tambahkan transisi mulus!`,
            challenge: {
              instruction: "Kombinasikan class Arbitrary Values (`bg-[#...]`) dengan prefix `hover:` dan `dark:` pada tombol di bawah ini.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "export default function TombolCyber() {\n  return (\n    <button className=\"text-white font-bold py-3 px-6 rounded transition-all /* TULIS DISINI */ \">\n      Aktivasi Mode Cyber\n    </button>\n  );\n}",
              expectedConcepts: ["bg-[#00f5d4]", "hover:bg-[#00bbf9]", "dark:bg-[#f15bb5]"],
              evaluationCriteria: "Evaluasi apakah class mengandung ketiga utilitas spesifik yang diminta dengan kurung siku yang benar.",
              hints: ["Tulis secara berurutan: `bg-[#00f5d4] hover:bg-[#00bbf9] dark:bg-[#f15bb5]`"],
              sampleAnswer: "export default function TombolCyber() {\n  return (\n    <button className=\"text-white font-bold py-3 px-6 rounded transition-all bg-[#00f5d4] hover:bg-[#00bbf9] dark:bg-[#f15bb5]\">\n      Aktivasi Mode Cyber\n    </button>\n  );\n}",
              followUpQuestion: "Kenapa kurung siku sangat rawan membuat aplikasi crash jika kamu salah ketik sintaks (misal ada spasi di dalamnya)?"
            }
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Extending The Theme (Kustomisasi Sistem)",
            content: `Langkah pemungkas untuk menguasai Tailwind adalah kemampuan mengendalikan \`tailwind.config.js\` (atau \`.ts\`).

Di dalam file tersebut ada blok objek penting bernama \`theme\`, dan di dalamnya ada **\`extend\`**.

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3fbaeb',
          DEFAULT: '#0fa9e6', // Ini akan menjadi 'bg-brand'
          dark: '#0c87b8',
        }
      },
      fontFamily: {
        utama: ['"Inter"', 'sans-serif'], // 'font-utama'
      }
    }
  }
}
\`\`\`

**Mengapa harus ditaruh di dalam blok \`extend\`?**
Jika kamu menaruh properti \`colors\` di luar blok \`extend\` (langsung di bawah \`theme\`), Tailwind akan **MENGHAPUS SEMUA WARNA BAWAANNYA** (merah, biru, hijau standar) dan hanya menyisakan warnamu!
Dengan menaruhnya di dalam \`extend\`, kamu **menambahkan** warnamu ke dalam koleksi warna standar Tailwind dengan aman.`,
            keyTakeaway: "Selalu suntikkan warna brand, ukuran jarak custom, atau font perusahaanmu ke dalam blok 'extend' agar utility standar Tailwind tidak tertimpa dan hilang."
          },
          {
            slideNumber: 13,
            type: "example",
            title: "Menerapkan Font Kustom (Google Fonts)",
            content: `Pola standar mengaplikasikan font (misal 'Poppins') ke seluruh website React + Tailwind.

1. Import Font-nya di Global CSS (contoh \`globals.css\`):
\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

2. Daftarkan di konfigurasi (\`tailwind.config.js\`):
\`\`\`javascript
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      }
    }
  }
\`\`\`
*Catatan Penting*: Menimpa nama famili \`sans\` (yang ada di dalam extend) adalah trik pamungkas! Tailwind secara *default* membungkus seluruh website dengan utility \`font-sans\`. Dengan menimpa \`sans\` dengan Poppins, otomatis 100% teks di websitemu berubah menjadi Poppins tanpa kamu perlu menulis class \`font-poppins\` di HTML lagi. Luar biasa rapi!`,
            keyTakeaway: "Timpa/extend properti 'fontFamily.sans' di file konfigurasi jika kamu ingin mengubah Font utama (default) secara global ke seluruh website aplikasimu."
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Selamat! Engkau Lulus dari Tailwind Academy",
            content: `Sungguh perjalanan panjang yang indah. Dari sekadar class aneh di HTML, hingga menjadi mahakarya *Front-End Architecture*.

**The Grand Recap:**
1. **Utility-First**: Berhentilah menamai *class* secara semantik. Fokus pada apa yang *browser* gambar, dan komponen React yang mengurus reusability-nya.
2. **Responsive & Mode Gelap**: Semua dilakukan *inline* lewat prefix \`md:\`, \`lg:\`, dan \`dark:\`.
3. **Layout 2D (Grid)**: Buat Bento Box tanpa keringat dengan \`grid\` dan \`col-span\`.
4. **Konfigurasi Pro**: Kuasai \`extend\` untuk memasukkan warna Brand, ubah \`font-sans\`, atau gunakan *Arbitrary Value* \`[]\` untuk solusi tembak cepat (on-the-fly) anti ribet.
5. **Plugins Ekosistem**: Jangan memaksakan utility class untuk artikel HTML mentah. Gunakan plugin resmi \`@tailwindcss/typography\` (class prose) sebagai peretas instan.

Framework CSS akan silih berganti di masa depan, namun revolusi yang dibawa Tailwind CSS ini akan tertanam di sejarah web. Mari kita ke Ujian Akhir, tunjukkan kemampuan aslimu!`,
            keyTakeaway: "Kamu kini tidak hanya bisa men-styling web, tetapi kamu bisa melakukannya 10x lebih cepat, responsif, stabil, dan tersentralisasi lewat konfigurasi."
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Grand Final Quiz: Tailwind Expert",
            content: "Konfigurasi, dynamic classes, plugin, dan arbitrary values menantimu. Buktikan bahwa kamu tidak akan melakukan kesalahan konyol di production environment!",
            quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
          }
        ],
        quizBank: []
      }
    }
  ]
};
