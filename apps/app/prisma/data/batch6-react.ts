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

export const reactDariNolCourse: CourseData = {
  title: "Belajar React dari Nol — Komponen, state, dan props",
  slug: "belajar-react-dari-nol",
  description:
    "Kuasai library frontend paling populer di dunia. Pelajari cara berpikir ala React, membangun antarmuka interaktif dengan komponen, dan mengelola state seperti engineer profesional. Cocok untuk pemula yang ingin terjun ke dunia Web Development modern.",
  difficulty: Difficulty.INTERMEDIATE,
  isPremium: true,
  language: "id",
  isPublished: true,
  totalModules: 1,
  modules: [
    {
      title: "Fondasi React — Berpikir dalam Komponen",
      slug: "fondasi-react-komponen",
      order: 1,
      xpReward: 100,
      sources: [
        {
          type: "YOUTUBE",
          title: "Tutorial React JS untuk Pemula — Web Programming UNPAS",
          url: "https://www.youtube.com/watch?v=5kHyviqjhCk",
        },
        {
          type: "DOCUMENTATION",
          title: "Dokumentasi Resmi React — Mulai Cepat",
          url: "https://react.dev/learn",
        },
        {
          type: "ARTICLE",
          title: "Berpikir ala React (Thinking in React)",
          url: "https://react.dev/learn/thinking-in-react",
        },
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Selamat Datang di Era Komponen",
            content: `Pernahkah kamu merasa frustrasi saat membangun aplikasi web dengan HTML, CSS, dan JavaScript mentah? Mengatur manipulasi DOM (*Document Object Model*) menggunakan \`document.getElementById\` lalu menambahkan *event listener* satu per satu menjadi sangat melelahkan ketika skala aplikasimu membesar. Semuanya menjadi kacau bak benang kusut.

Inilah masalah utama yang dipecahkan oleh **React**, sebuah *library* (bukan *framework*) buatan Facebook (Meta) yang kini menjadi standar industri web development global.

React memperkenalkan **paradigma deklaratif**. Artinya, alih-alih kamu yang harus memberi tahu *browser* langkah-demi-langkah cara mengubah tampilan (pendekatan imperatif), kamu cukup memberi tahu React: *"Hei React, saat data ini berubah, tolong pastikan tampilan antarmukanya menjadi seperti ini."* React akan mengurus sisanya di belakang layar menggunakan algoritma efisien yang disebut *Virtual DOM*.

Selain deklaratif, React juga sangat populer karena arsitektur **berbasis komponen (Component-Based)**. Kamu tidak lagi melihat sebuah halaman web sebagai satu kesatuan dokumen raksasa, melainkan sebagai susunan balok-balok mandiri yang bisa digabungkan, dipisahkan, dan digunakan ulang (*reusable*).

Di modul pertama ini, kita akan membongkar tuntas cara berpikir ala React, mulai dari konsep komponen, bagaimana data mengalir, hingga bagaimana komponen bisa memiliki "ingatan" sendiri. Siapkan dirimu, karena cara kamu melihat UI web akan berubah drastis setelah ini!`,
            keyTakeaway:
              "React menggunakan pendekatan deklaratif dan berbasis komponen. Kamu cukup mengatur bagaimana tampilan seharusnya terlihat berdasarkan data terkini, dan React akan mengurus manipulasi DOM secara efisien.",
          },
          {
            slideNumber: 2,
            type: "lesson",
            title: "JSX: HTML di dalam JavaScript?",
            content: `Saat pertama kali melihat kode React, banyak pemula yang merasa kaget atau bahkan merasa itu adalah sebuah "dosa" pemrograman. Mengapa? Karena di React, kamu akan menemukan sintaks yang terlihat persis seperti HTML ditulis langsung di dalam file JavaScript. Ini disebut **JSX (JavaScript XML)**.

\`\`\`jsx
const elemen = <h1>Halo, Dunia!</h1>;
\`\`\`

JSX bukanlah *string* dan juga bukan HTML sejati. Ini adalah ekstensi sintaksis untuk JavaScript. Meta merancang JSX karena mereka menyadari bahwa dalam membangun UI, logika (JavaScript) dan struktur (HTML) sangat berkaitan erat. Mengubah satu bagian sering kali mengharuskan kita mengubah bagian yang lain. Daripada memisahkannya di file berbeda secara paksa (seperti memisahkan \`script.js\` dan \`index.html\`), React menyatukannya dalam satu unit yang disebut komponen.

Namun penting untuk dipahami: **Browser tidak mengerti JSX**.
Kode JSX yang kamu tulis akan dikompilasi oleh alat seperti Babel atau SWC menjadi panggilan fungsi JavaScript murni. Contoh di atas sebenarnya akan diterjemahkan menjadi:

\`\`\`javascript
const elemen = React.createElement('h1', null, 'Halo, Dunia!');
\`\`\`

Dengan JSX, kamu bisa menyematkan ekspresi JavaScript apa pun langsung di dalam struktur UI menggunakan kurung kurawal \`{}\`. Mulai dari variabel, operasi matematika, hingga fungsi.

\`\`\`jsx
const nama = "Budi";
const elemen = <h1>Halo, {nama}! Waktu saat ini: {new Date().toLocaleTimeString()}</h1>;
\`\`\`

Hal ini membuat JSX sangat *powerful* dan dinamis dibandingkan template HTML statis biasa.`,
            keyTakeaway:
              "JSX adalah ekstensi sintaks JavaScript yang memungkinkan penulisan struktur UI mirip HTML di dalam logika JS. Ia akan dikompilasi menjadi JavaScript murni sebelum dibaca browser.",
          },
          {
            slideNumber: 3,
            type: "lesson",
            title: "Analogi Komponen: Bermain Balok Lego",
            content: `Cara termudah untuk memahami arsitektur komponen React adalah dengan membayangkan sekotak balok **Lego**.

Bayangkan kamu sedang membangun sebuah mobil dari Lego. Kamu tidak mencetak mobil itu langsung sebagai satu kesatuan plastik besar. Sebaliknya, mobil itu terdiri dari bagian-bagian kecil: empat roda, kaca depan, setir, kursi, dan pintu. Setiap bagian (balok) memiliki bentuk spesifik, warna spesifik, dan fungsi spesifik. 

Dalam React, *balok Lego* ini disebut **Komponen (Component)**.
Saat kamu melihat aplikasi raksasa seperti Twitter atau Facebook, secara visual tampilannya bisa dipecah menjadi bagian-bagian kecil:
1. Komponen Navigasi Atas (*Header* / *Navbar*)
2. Komponen Daftar Feed (*FeedList*)
3. Komponen Postingan Tunggal (*PostItem*)
4. Komponen Tombol Like (*LikeButton*)

Setiap komponen bertanggung jawab hanya pada satu hal (Prinsip *Single Responsibility*). Sebuah tombol hanya fokus pada bentuk tombol dan efek saat diklik. Sebuah *Feed* hanya fokus untuk me-looping daftar konten. 

Keuntungan terbesar dari pendekatan Lego ini adalah **Reusability** (dapat digunakan kembali). Jika kamu sudah membuat komponen \`<LikeButton />\`, kamu bisa meletakkan tombol itu di halaman profil, di halaman feed, di pop-up galeri, tanpa perlu menulis ulang logika tombol tersebut dari nol. Cukup panggil komponennya!

Di React, UI bukanlah halaman dokumen, UI adalah sekumpulan komponen bersarang (*nested components*) yang membentuk sebuah *Component Tree* (pohon komponen).`,
            keyTakeaway:
              "Komponen di React berfungsi seperti balok Lego—bagian-bagian kecil yang mandiri, spesifik, dan dapat dirakit ulang untuk membangun aplikasi UI yang kompleks.",
          },
          {
            slideNumber: 4,
            type: "example",
            title: "Membuat Komponen Pertamamu",
            content: `Secara teknis, membuat komponen di React versi modern sangatlah mudah. Komponen hanyalah sebuah **Fungsi JavaScript biasa** yang mengembalikan JSX.

Mari kita buat komponen sederhana bernama \`TombolSapa\`:

\`\`\`jsx
// Komponen TombolSapa
function TombolSapa() {
  return (
    <button className="btn-primary">
      Sapa Pengguna
    </button>
  );
}
\`\`\`

**Aturan Emas Komponen React:**
1. **Nama komponen WAJIB diawali dengan huruf kapital**. Ini adalah cara React membedakan antara elemen HTML bawaan (seperti \`<div>\`, \`<button>\`) dengan komponen buatanmu (seperti \`<TombolSapa />\`).
2. **Harus mengembalikan hanya SATU elemen parent**. Kamu tidak bisa mengembalikan dua elemen yang sejajar secara langsung. Jika kamu punya dua div, kamu harus membungkusnya dalam satu elemen besar (misal \`<div>\` pembungkus) atau menggunakan *React Fragment* (\`<></>\`).

Contoh yang SALAH (akan error):
\`\`\`jsx
function Header() {
  return (
    <h1>Judul</h1>
    <p>Deskripsi</p>
  ); // ERROR! Mengembalikan dua elemen sejajar
}
\`\`\`

Contoh yang BENAR:
\`\`\`jsx
function Header() {
  return (
    <>
      <h1>Judul</h1>
      <p>Deskripsi</p>
    </>
  ); // OK! Dibungkus dengan Fragment
}
\`\`\`

Setelah kamu membuat komponen \`Header\`, kamu bisa merendernya (memanggilnya) layaknya tag HTML biasa di mana saja: \`<Header />\`.`,
            keyTakeaway:
              "Komponen React adalah fungsi JavaScript berawalan huruf kapital yang mengembalikan elemen JSX (dan hanya boleh mereturn 1 elemen induk/root).",
          },
          {
            slideNumber: 5,
            type: "example",
            title: "Props: Mengirim Data Antar Komponen",
            content: `Komponen kita sebelumnya (\`<TombolSapa />\`) masih bersifat statis. Bagaimana jika kita ingin membuat komponen profil pengguna (\`KartuProfil\`) yang menampilkan nama dan pekerjaan yang berbeda-beda untuk setiap pengguna? Di sinilah kita menggunakan **Props** (singkatan dari *Properties*).

Props adalah cara sebuah komponen induk (*Parent*) mengirimkan data ke komponen anak (*Child*). Kamu bisa menganggap Props mirip dengan parameter pada fungsi JavaScript biasa.

Mari kita lihat contohnya:

\`\`\`jsx
// Child Component
function KartuProfil(props) {
  return (
    <div className="kartu">
      <h2>Nama: {props.nama}</h2>
      <p>Pekerjaan: {props.pekerjaan}</p>
    </div>
  );
}

// Parent Component
function App() {
  return (
    <div className="aplikasi">
      <KartuProfil nama="Raditya" pekerjaan="Software Engineer" />
      <KartuProfil nama="Budi" pekerjaan="Desainer UI/UX" />
    </div>
  );
}
\`\`\`

Pada contoh di atas, komponen \`App\` mengirimkan atribut \`nama\` dan \`pekerjaan\` ke komponen \`KartuProfil\`. Di dalam \`KartuProfil\`, kita menangkap data tersebut melalui parameter \`props\`, yang berbentuk objek JavaScript.

**Gaya Modern (Object Destructuring):**
Umumnya, developer React lebih suka menggunakan teknik destrukturisasi agar kode lebih bersih, tanpa perlu menulis kata \`props.\` berulang kali:

\`\`\`jsx
function KartuProfil({ nama, pekerjaan }) {
  return (
    <div className="kartu">
      <h2>Nama: {nama}</h2>
      <p>Pekerjaan: {pekerjaan}</p>
    </div>
  );
}
\`\`\`

**Aturan Penting Props:** Props bersifat *Read-Only* (hanya baca). Sebuah komponen anak **dilarang keras** mengubah nilai props yang ia terima. Aliran data di React selalu bergerak satu arah ke bawah (*one-way data flow*).`,
            keyTakeaway:
              "Props adalah parameter yang dikirim dari parent ke child. Props berbentuk objek dan bersifat read-only. Data selalu mengalir dari atas ke bawah.",
          },
          {
            slideNumber: 6,
            type: "example",
            title: "State: Mengingat Data Internal",
            content: `Props sangat berguna untuk data statis yang dikirim dari luar, tetapi bagaimana jika komponen perlu merespons perubahan interaksi pengguna? Misalnya, komponen *Counter* yang angkanya bertambah ketika diklik. Props tidak bisa digunakan di sini karena props bersifat *read-only*. 

Kita membutuhkan sesuatu untuk "mengingat" kondisi saat ini. Di React, ingatan internal sebuah komponen disebut **State**. 

Untuk menggunakan state di *Functional Component*, kita menggunakan fitur bawaan React yang disebut **Hooks**, secara spesifik: \`useState\`.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // Deklarasi state "angka" dengan nilai awal 0
  // setAngka adalah fungsi untuk mengubah nilai "angka"
  const [angka, setAngka] = useState(0);

  return (
    <div>
      <p>Anda telah mengklik {angka} kali</p>
      <button onClick={() => setAngka(angka + 1)}>
        Klik Saya
      </button>
    </div>
  );
}
\`\`\`

**Anatomi \`useState\`:**
Pemanggilan \`useState(0)\` mengembalikan sebuah array dengan dua elemen, yang kemudian kita "bongkar" (destructure):
1. \`angka\`: Variabel state saat ini (nilainya 0 saat pertama kali jalan).
2. \`setAngka\`: Sebuah **fungsi (*setter*)** yang harus kamu panggil jika ingin memperbarui state.

**Kenapa tidak menggunakan variabel biasa seperti \`let angka = 0\`?**
Jika kamu menggunakan variabel biasa, mengubah variabel tidak akan memberitahu React untuk menggambar ulang (render) tampilan di layar. Dengan menggunakan fungsi *setter* (misal \`setAngka\`), kamu secara harfiah memberi sinyal ke React: *"Hei, dataku berubah! Tolong render ulang komponen ini dengan data terbaru."*`,
            keyTakeaway:
              "State adalah memori internal komponen yang bisa berubah seiring waktu. Setiap kali state diubah (menggunakan fungsi setter dari useState), React akan otomatis me-render ulang komponen tersebut.",
          },
          {
            slideNumber: 7,
            type: "example",
            title: "Event Handling di React",
            content: `Menangani klik, ketikan *keyboard*, atau *submit* form adalah bagian krusial dalam interaktivitas web. Di React, sintaks untuk event handling mirip dengan HTML biasa, tetapi dengan sedikit perbedaan format.

**Perbedaan Utama dengan HTML:**
1. Penamaan event di React menggunakan format *camelCase*, bukan huruf kecil semua. (Contoh: \`onClick\` bukan \`onclick\`, \`onChange\` bukan \`onchange\`).
2. Di React, kita *mem-passing* referensi fungsi, bukan string perintah.

Mari kita lihat contoh form *Input* yang bereaksi setiap kali pengguna mengetik:

\`\`\`jsx
import { useState } from 'react';

function FormPencarian() {
  const [kataKunci, setKataKunci] = useState('');

  // Fungsi handler standar
  function handleKetik(event) {
    // event.target.value mengambil isi inputan
    setKataKunci(event.target.value);
  }

  return (
    <div>
      <input 
        type="text" 
        value={kataKunci} 
        onChange={handleKetik} 
        placeholder="Cari sesuatu..." 
      />
      <p>Kamu mencari: {kataKunci}</p>
    </div>
  );
}
\`\`\`

**Jebakan Batman (Common Mistake):**
Pemula sering melakukan kesalahan saat mem-passing fungsi ke event.
❌ SALAH: \`<button onClick={handleKetik()}>Klik</button>\`
Jika kamu menggunakan tanda kurung \`()\`, fungsi tersebut akan **langsung dieksekusi** saat komponen dirender, dan saat diklik malah tidak terjadi apa-apa.

✅ BENAR: \`<button onClick={handleKetik}>Klik</button>\`
Tanpa kurung. Kita hanya "memberikan" nama fungsinya agar dipanggil **nanti** saat event benar-benar terjadi.`,
            keyTakeaway:
              "Event di React ditulis menggunakan camelCase. Selalu oper REFERENSI fungsinya (tanpa tanda kurung pemanggilan) ke dalam event handler agar tidak tereksekusi prematur saat render.",
          },
          {
            slideNumber: 8,
            type: "challenge",
            title: "Challenge: Buat Tombol Like Bersyarat",
            content: `Sekarang saatnya kamu yang beraksi! Buktikan bahwa kamu sudah memahami konsep \`useState\` dan *event handling* JSX.

Tugas kamu adalah membuat komponen bernama \`TombolLike\`.
1. Komponen ini memiliki *state* bertipe *boolean* bernama \`isLiked\` dengan nilai awal \`false\`.
2. Jika belum di-like (\`false\`), tombol harus menampilkan teks: **"Beri Like"**.
3. Jika sudah di-like (\`true\`), tombol harus menampilkan teks: **"Sudah Di-like!"**.
4. Ketika tombol diklik, state \`isLiked\` harus berganti (dari false ke true, atau true ke false/toggle).

Gunakan kondisional rendering (misal *ternary operator*) di dalam JSX untuk mengubah teks tombol secara dinamis.`,
            challenge: {
              instruction: "Tulis komponen React bernama `TombolLike` yang memenuhi kriteria di atas menggunakan `useState` dan event `onClick`.",
              inputType: "code",
              inputPlaceholder: "import { useState } from 'react';\n\nexport default function TombolLike() {\n  // tulis kodemu di sini\n}",
              starterCode: "import { useState } from 'react';\n\nexport default function TombolLike() {\n  // inisiasi state isLiked di sini\n\n  return (\n    <button>\n      {/* logika kondisional teks di sini */}\n    </button>\n  );\n}",
              expectedConcepts: [
                "Import dan pemanggilan `useState` dengan initial value false",
                "Destructuring nilai state dan fungsi setter (contoh: const [isLiked, setIsLiked] = useState(false))",
                "Penambahan atribut `onClick` pada elemen button",
                "Logika toggle state di dalam onClick (contoh: setIsLiked(!isLiked))",
                "Kondisional rendering teks dengan ternary operator (isLiked ? 'Sudah Di-like!' : 'Beri Like')"
              ],
              evaluationCriteria: "AI Evaluator: Pastikan pengguna mendeklarasikan komponen `TombolLike` dan memanggil hook `useState(false)`. Pada tag `<button>`, wajib ada event `onClick` yang merubah nilai state menjadi kebalikannya (toggle). Di dalam tag button, teks harus dirender dengan kondisi: jika true maka 'Sudah Di-like!', jika false maka 'Beri Like'. Cek ketepatan penulisan camelCase pada `onClick`. Jika instruksi benar namun teks sedikit *typo*, anggap benar sebagian.",
              hints: [
                "Gunakan `const [isLiked, setIsLiked] = useState(false);` untuk membuat state.",
                "Untuk men-toggle state (membalik nilai boolean), kamu bisa menggunakan operator NOT (!). Contoh: `setIsLiked(!isLiked)`",
                "Di JSX, gunakan operator ternary `{kondisi ? 'Teks Benar' : 'Teks Salah'}` di antara tag pembuka dan penutup button."
              ],
              sampleAnswer: "import { useState } from 'react';\n\nexport default function TombolLike() {\n  const [isLiked, setIsLiked] = useState(false);\n\n  return (\n    <button onClick={() => setIsLiked(!isLiked)}>\n      {isLiked ? 'Sudah Di-like!' : 'Beri Like'}\n    </button>\n  );\n}",
              followUpQuestion: "Apa yang akan terjadi jika kita memanggil `setIsLiked(!isLiked)` secara langsung di dalam bodi komponen, bukan di dalam blok fungsi onClick?"
            }
          },
          {
            slideNumber: 9,
            type: "lesson",
            title: "Pembahasan: Tombol Like Bersyarat",
            content: `Solusi yang paling tepat dan bersih untuk *challenge* tadi adalah menggunakan *arrow function* di dalam event handler:

\`\`\`jsx
import { useState } from 'react';

export default function TombolLike() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <button onClick={() => setIsLiked(!isLiked)}>
      {isLiked ? 'Sudah Di-like!' : 'Beri Like'}
    </button>
  );
}
\`\`\`

**Mengapa ini elegan?**
1. **Toggle Logika Pendek**: Ekspresi \`!isLiked\` membalik logika dari apa pun state saat ini. True menjadi false, false menjadi true. Ini menghemat penulisan IF-ELSE panjang.
2. **Kondisional Teks**: Di React, kita sangat sering menggunakan *ternary operator* \`kondisi ? "A" : "B"\` langsung di dalam JSX. Ini membuat JSX tetap bersih dan deklaratif tanpa harus menugaskan teks ke variabel di atas.
3. **Inline Function Handler**: Karena fungsi perubahannya sangat pendek (hanya satu baris), kita menggunakan *arrow function inline* \`() => setIsLiked(...)\`. Namun ingat, jika logikamu rumit atau mengambil data dari API, pisahkan menjadi fungsi tersendiri di atas \`return\`.

Jika kamu menjawab *follow-up question*: **"Apa yang terjadi jika dipanggil langsung di bodi komponen?"** 
Jawabannya adalah **Infinite Loop (Error Maksimum Update Depth)**. Memanggil *setter state* langsung saat render akan memicu render ulang. Render ulang memanggil kode itu lagi, memicu *setter state* lagi, render lagi... begitu seterusnya sampai aplikasi crash. Selalu amankan *setter state* di dalam event (*onClick* dll) atau di dalam *effect*!`,
            keyTakeaway:
              "Di React, seringlah memanfaatkan operator ternary untuk teks atau styling yang bergantung pada kondisi. Hindari memanggil state setter tanpa terbungkus event handler.",
          },
          {
            slideNumber: 10,
            type: "lesson",
            title: "Rangkuman Tengah Perjalanan",
            content: `Sampai di sini, kamu telah menaklukkan tiga pilar utama React. Mari kita rangkum fondasi penting ini sebelum masuk ke materi lanjutan.

1. **Komponen adalah Fungsi**: Bayangkan komponen sebagai mesin pabrik. Komponen menerima bahan baku (Props) dari luar, bisa memiliki mesin cadangan internal (State), dan memproduksi hasil akhir berupa tampilan web (JSX).
2. **Props vs State**: 
   - *Props*: Diberikan dari komponen Parent. Tidak boleh diubah (*Read-Only*). Berfungsi layaknya argumen konfigurasi.
   - *State*: Diciptakan sendiri oleh komponen tersebut. Bisa diubah menggunakan *setter*. Mengubah state berarti meminta React merender ulang layar.
3. **Satu Arah (One-Way Data Flow)**: Data di React selalu bergerak turun dari induk ke anak. Jika anak perlu mengirim data kembali ke induk, ia harus "memanggil" fungsi callback yang dipassing melalui props.
4. **Deklaratif Bukan Imperatif**: Kita mendeskripsikan *State* dan mencocokkan *State* dengan *Tampilan*. Kita tidak menulis "sembunyikan elemen A jika diklik lalu munculkan elemen B", kita menulis "Jika State True tampilkan A, Jika False tampilkan B".

Memahami pilar ini sudah mengcover 70% aktivitas harian seorang frontend engineer di dunia kerja. Semua abstraksi rumit lainnya bermula dari konsep *Component, Props, dan State*.`,
            keyTakeaway:
              "Props adalah data eksternal (immutable), State adalah data internal (mutable). Perubahan State memicu re-render. Ini adalah mantra React yang harus dihafal.",
          },
          {
            slideNumber: 11,
            type: "lesson",
            title: "Edge Cases: State itu Asynchronous (Tidak Langsung Berubah!)",
            content: `Saatnya masuk ke ranah engineer *mid-level*. Ada satu sifat dari \`useState\` yang sering membuat pemula kebingungan hingga menangis di malam hari: **State Updates are Asynchronous** (pembaruan state di-batch dan tidak langsung berefek seketika).

Perhatikan kode ini:
\`\`\`jsx
function Counter() {
  const [angka, setAngka] = useState(0);

  function klikTigaKali() {
    setAngka(angka + 1); // asumsi awal = 0 + 1
    setAngka(angka + 1); // asumsi awal = 0 + 1
    setAngka(angka + 1); // asumsi awal = 0 + 1
    console.log(angka);  // Tebak hasilnya apa?
  }

  //... return JSX ...
}
\`\`\`

Ketika tombol diklik memicu \`klikTigaKali\`, apakah hasilnya 3? **Bukan! Hasilnya tetap 1**. Dan \`console.log(angka)\` akan mencetak **0**!

Mengapa? Karena di dalam satu siklus render, nilai variabel \`angka\` "dibekukan" layaknya sebuah *snapshot* foto. Saat kamu memanggil \`setAngka\`, React hanya **menjadwalkan** perubahan tersebut untuk render *berikutnya*. Jadi di baris ketiga, variabel \`angka\` nilainya masih 0 dari *snapshot* saat ini.

**Solusinya? (Updater Function)**
Jika *state* kamu bergantung pada *state* persis sebelumnya, kamu harus mengirim **Fungsi Updater**, bukan nilai absolut:

\`\`\`jsx
function klikTigaKaliBenar() {
  setAngka(prev => prev + 1); // prev (previous state) akurat!
  setAngka(prev => prev + 1);
  setAngka(prev => prev + 1);
}
// Hasilnya: 3.
\`\`\`

Selalu gunakan *updater function* \`(prev => ...)\` jika state barumu adalah hasil perhitungan dari state lamamu.`,
            keyTakeaway:
              "Pembaruan state tidak terjadi seketika di baris selanjutnya (ter-batch). Gunakan 'Updater Function' callback jika perubahan bergantung langsung pada nilai state sebelumnya.",
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Best Practices: Komponen Murni (Pure Components)",
            content: `Di React, sangat dianjurkan untuk menulis komponen yang **Murni (Pure)**. Dalam ilmu komputer, fungsi murni (*pure function*) adalah fungsi yang memiliki dua karakteristik:
1. **Tidak mengubah benda lain di luarnya** sebelum dipanggil (tidak bermutasi secara eksternal).
2. **Dengan input yang sama, pasti menghasilkan output yang sama**.

Bagaimana penerapannya di React?
Jika kamu memberikan Props *A*, komponen harus selalu memproduksi JSX *A*. Jika kamu me-render komponen tanpa mengubah datanya, tampilannya tidak boleh tiba-tiba berbeda di layar.

**Contoh Komponen TIDAK MURNI (Buruk):**
\`\`\`jsx
let penandaDiLuar = 0; // Global Variable Mutasi!

function Buruk() {
  penandaDiLuar = penandaDiLuar + 1; // ❌ Efek samping (Side effect)
  return <div>Render ke-{penandaDiLuar}</div>;
}
\`\`\`
Komponen ini sangat rapuh. Jika React me-render komponen ini dua kali, layarnya akan menampilkan hasil yang berbeda. Di *Strict Mode* React (biasanya hidup saat mode Development), React akan dengan sengaja memanggil komponen dua kali untuk mengekspos bug mutasi semacam ini.

**Praktik Terbaik:**
1. Jaga komponen tetap *Pure*. Logika merender tampilan (JSX) murni harus bergantung pada *Props* dan *State*.
2. Jika butuh mengubah sesuatu di luar (*Side Effects*), seperti mengambil data dari API, mengubah judul dokumen, atau mengatur *timer*, JANGAN taruh langsung di bodi komponen. Gunakan *event handler* (seperti \`onClick\`) atau **Hooks \`useEffect\`** (yang akan dipelajari di modul berikutnya).`,
            keyTakeaway:
              "Jauhkan efek samping (side effects) dan mutasi variabel eksternal dari dalam logika render (bodi) komponen. Jaga komponenmu tetap murni berdasarkan props dan state saja.",
          },
          {
            slideNumber: 13,
            type: "example",
            title: "Styling Dasar: Inline dan Kelas CSS",
            content: `Walaupun komponen React adalah JavaScript, tampilannya harus tetap bisa dipercantik menggunakan CSS. Ada beberapa cara memberikan gaya pada React. 

**1. Menggunakan Class Name (Paling Umum)**
Di HTML standar, kamu menggunakan atribut \`class\`. Tapi di JSX, karena \`class\` adalah kata kunci khusus JavaScript (reserved keyword), kamu **wajib** menggunakan \`className\`:

\`\`\`jsx
// CSS File: .tombol-merah { background: red; color: white; }

function TombolError() {
  return <button className="tombol-merah">Hapus Data</button>;
}
\`\`\`

**2. Menggunakan Inline Styles**
Berbeda dengan HTML yang menampung string (contoh: \`style="color: red;"\`), di React *inline styles* dikirimkan dalam bentuk **Objek JavaScript**. Properti CSS yang memiliki tanda hubung (*kebab-case* seperti \`background-color\`) wajib diubah menjadi *camelCase* (\`backgroundColor\`).

\`\`\`jsx
function Peringatan() {
  // Objek styling
  const stylePeringatan = {
    backgroundColor: 'yellow',
    fontWeight: 'bold',
    marginTop: '10px' // Harus camelCase!
  };

  return <div style={stylePeringatan}>Awas Ada Anjing Galak!</div>;
}
\`\`\`
*(Perhatikan bahwa jika kamu menulisnya langsung di dalam elemen, kamu memerlukan dua pasang kurung kurawal \`style={{ color: 'red' }}\`—satu untuk JSX expression, satu untuk penanda objek JS).*

Dalam proyek nyata, developer sering menggunakan pendekatan styling canggih seperti *CSS Modules*, *Tailwind CSS*, atau *Styled Components* untuk mengelola skala desain. Namun, dasarnya selalu bermuara ke \`className\` atau \`style\`.`,
            keyTakeaway:
              "Di JSX, gunakan 'className' pengganti 'class'. Untuk styling inline, oper sebuah objek JavaScript dan ubah nama properti CSS (misal font-size) menjadi camelCase (fontSize).",
          },
          {
            slideNumber: 14,
            type: "example",
            title: "Studi Kasus: Form Interaktif Multi-State",
            content: `Mari kita terapkan semua yang sudah kita pelajari (*Component, Props, State, Events*) dalam sebuah aplikasi dunia nyata: Form Komentar sederhana.

\`\`\`jsx
import { useState } from 'react';

// Komponen Child: menampilkan daftar komentar via Props
function DaftarKomentar({ data }) {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <strong>{item.nama}</strong>: {item.teks}
        </li>
      ))}
    </ul>
  );
}

// Komponen Parent: Mengelola logika dan State
export default function FormDiskusi() {
  // Multi-state management
  const [nama, setNama] = useState('');
  const [teks, setTeks] = useState('');
  const [komentarList, setKomentarList] = useState([]);

  // Handler saat form disubmit
  function handleSubmit(e) {
    e.preventDefault(); // Mencegah page reload
    if(!nama || !teks) return alert("Isi lengkap!");
    
    const komentarBaru = { nama, teks };
    
    // Konsep Immutability Array! 
    // Kita buat array baru (copy list lama + item baru)
    setKomentarList([...komentarList, komentarBaru]);
    
    // Kosongkan form setelah submit
    setNama('');
    setTeks('');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Form Diskusi</h3>
      
      {/* Me-render child component dan melempar state sebagai props */}
      <DaftarKomentar data={komentarList} />

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input 
          placeholder="Nama Anda"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <br/><br/>
        <textarea 
          placeholder="Tulis Komentar..."
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
        />
        <br/><br/>
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}
\`\`\`

**Poin Kunci dari Kasus Ini:**
1. State dari Parent (\`komentarList\`) dikirim ke Child (\`<DaftarKomentar>\`) sebagai Props. Ini adalah implementasi sejati dari pola komponen.
2. Form Input dikendalikan oleh React (*Controlled Components*). Nilai input mengambil dari state \`value={nama}\`, bukan berjalan bebas di DOM browser.
3. Menambahkan data ke array state wajib mematuhi aturan Immutabilitas (*Jangan mengubah array asal dengan \`push\`, buatlah array baru menggunakan spread operator \`...\`*).`,
            keyTakeaway:
              "React unggul dalam mengelola data flow aplikasi. Kuasai cara memecah UI menjadi Parent-Child, serta cara mengupdate state array (immutability), dan kamu bisa membangun UI serumit apa pun.",
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Uji Pemahaman: React Fundamentals",
            content: "Buktikan penguasaanmu terhadap konsep Komponen, JSX, Props, dan State di React. Jawab pertanyaan-pertanyaan ini dengan logis dan tembus ambang batas nilai 80 untuk lulus modul ini!",
            // quizBank sengaja dikosongkan karena ini adalah Course Premium. API GROQ akan men-generate kuis on-the-fly.
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
    },
  ],
};
