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
  totalModules: 3,
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
    },{
      title: "State Management & Hooks Lanjutan",
      slug: "state-management-hooks-lanjutan",
      order: 2,
      xpReward: 150,
      sources: [
        { type: "YOUTUBE", title: "React State Management & Hooks Lanjutan", url: "https://www.youtube.com/watch?v=5kHyviqjhCk" },
        { type: "DOCUMENTATION", title: "React Hooks Documentation", url: "https://react.dev/reference/react" },
        { type: "DOCUMENTATION", title: "Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects" }
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Siklus Hidup Komponen (Lifecycle)",
            content: `Sebelum masuk ke Hooks tingkat lanjut, kita harus memahami bahwa komponen React memiliki "Siklus Hidup" (Lifecycle) layaknya makhluk hidup.
            
Siklus ini terdiri dari 3 fase utama:
1. **Mounting (Lahir)**: Saat komponen pertama kali dimasukkan ke dalam DOM layar. Di fase ini, UI awal digambar.
2. **Updating (Tumbuh)**: Saat komponen di-*render* ulang karena ada perubahan \`state\` atau \`props\`.
3. **Unmounting (Mati)**: Saat komponen dihapus dari DOM (misal, pengguna pindah ke halaman lain).

Pada era *Class Component* lawas, developer menggunakan metode seperti \`componentDidMount\` atau \`componentWillUnmount\` untuk merespons fase-fase ini. Namun, di era *Functional Component* modern, kita menangani semua fase tersebut hanya dengan satu senjata pamungkas: **\`useEffect\`**.`,
            keyTakeaway: "Setiap komponen React lahir (mount), hidup/berubah (update), dan akhirnya mati (unmount). Siklus ini mengendalikan kapan efek samping harus dijalankan."
          },
          {
            slideNumber: 2,
            type: "lesson",
            title: "Apa itu Efek Samping (Side Effects)?",
            content: `Fungsi komponen React sejatinya dirancang untuk menjadi murni (*pure*). Artinya, tugas utamanya HANYA menerima data (props/state) dan mereturn JSX (UI).

Lalu, di mana kita boleh menaruh kode untuk mengambil data dari internet (Fetch API), mengubah \`document.title\`, atau mengatur \`setInterval\`? 
Semua hal yang "menyentuh" dunia di luar komponen React disebut sebagai **Efek Samping (Side Effects)**.

Jika kamu melakukan *fetch API* langsung di dalam badan utama fungsi komponen, komponenmu akan kacau balau karena *fetch* tersebut akan dipanggil berulang-ulang tanpa henti setiap kali React me-*render* ulang layar.

Oleh karena itu, React menyediakan semacam "ruang isolasi" khusus untuk mengeksekusi kode efek samping ini agar aman dan terkontrol. Ruang isolasi tersebut bernama **\`useEffect\`**.`,
            keyTakeaway: "Efek samping adalah operasi apa pun yang mempengaruhi dunia di luar komponen yang sedang dirender (seperti HTTP request, manipulasi DOM manual, timer). Gunakan useEffect untuk menanganinya."
          },
          {
            slideNumber: 3,
            type: "example",
            title: "Anatomi useEffect & Dependency Array",
            content: `Mari kita lihat anatomi dasar dari hook \`useEffect\`:

\`\`\`jsx
import { useEffect } from 'react';

function KomponenKu() {
  useEffect(() => {
    // 1. Logika efek samping dieksekusi di sini
    console.log("Komponen baru saja di-mount!");
  }, []); // 2. Dependency Array
}
\`\`\`

**Rahasia Terbesar useEffect ada pada Parameter Keduanya (Dependency Array):**
- **Tanpa array sama sekali**: \`useEffect(() => { ... })\` -> Berjalan setiap kali komponen dirender ulang (SANGAT BERBAHAYA, bisa bikin Infinite Loop).
- **Array kosong**: \`useEffect(() => { ... }, [])\` -> Berjalan **HANYA SEKALI** saat komponen pertama kali di-mount (Lahir). Sangat cocok untuk fetch data awal.
- **Array berisi variabel**: \`useEffect(() => { ... }, [angka, nama])\` -> Berjalan saat pertama kali di-mount, DAN akan berjalan lagi HANYA JIKA nilai variabel \`angka\` atau \`nama\` berubah.`,
            keyTakeaway: "Kendalikan kapan efek dijalankan menggunakan Dependency Array (parameter kedua useEffect). Array kosong [] memastikan kode di dalamnya hanya berjalan 1 kali."
          },
          {
            slideNumber: 4,
            type: "example",
            title: "Cleanup Function: Menghindari Memory Leak",
            content: `Bagaimana jika efek yang kita buat bersifat terus-menerus, seperti mengatur \`setInterval\` atau berlangganan (*subscribe*) ke layanan chat? 

Jika pengguna berpindah halaman (komponen di-Unmount) namun timer tersebut tidak pernah dihentikan, timer itu akan terus berjalan selamanya di latar belakang browser, memakan memori, dan memicu *Memory Leak* (kebocoran memori)!

Untuk mencegahnya, \`useEffect\` bisa mereturn sebuah fungsi pembersihan (*Cleanup Function*):

\`\`\`jsx
useEffect(() => {
  // 1. Mulai sesuatu (misal: Timer)
  const timerId = setInterval(() => {
    console.log("Detak jantung aplikasi...");
  }, 1000);

  // 2. Fungsi pembersihan (Cleanup)
  return () => {
    // Kode ini akan dipanggil otomatis oleh React SEBELUM komponen hancur
    clearInterval(timerId);
    console.log("Timer dimatikan!");
  };
}, []);
\`\`\`
Pola \`return () => {}\` di dalam \`useEffect\` ini setara dengan asuransi keamanan aplikasimu.`,
            keyTakeaway: "Jika efekmu menciptakan sesuatu yang terus berjalan (timer, event listener), WAJIB kembalikan Cleanup Function untuk membersihkannya saat komponen unmount."
          },
          {
            slideNumber: 5,
            type: "lesson",
            title: "Misteri Strict Mode (Kenapa Efek Jalan 2x?)",
            content: `Saat kamu mencoba menjalankan \`useEffect\` dengan \`console.log\` di mode *development* (saat di komputermu), kamu mungkin akan panik melihat pesan log tercetak **Dua Kali** padahal dependency array-nya kosong \`[]\`.

Apakah ini *bug*? BUKAN!
Ini adalah fitur sengaja dari **React Strict Mode**. 

Sejak React 18, React sengaja me-*mount*, meng-*unmount*, lalu me-*mount* ulang komponenmu secara instan dalam hitungan milidetik saat *development*. Tujuannya sangat mulia: **React sedang mengetes apakah *Cleanup Function* yang kamu tulis sudah benar**.

Jika kamu tidak menulis *Cleanup Function* untuk efek yang membutuhkan pembersihan, aplikasi akan rusak ganda di lingkungan pengembangan, sehingga kamu bisa menyadarinya lebih awal. 

**Jangan panik!** Perilaku ganda ini HANYA terjadi di *development*. Saat aplikasimu di-build dan di-deploy ke produksi (Production), komponen hanya akan di-mount satu kali secara normal.`,
            keyTakeaway: "React Strict Mode secara sengaja menjalankan useEffect 2x saat development untuk mendeteksi potensi bug Memory Leak. Ini normal dan aman."
          },
          {
            slideNumber: 6,
            type: "lesson",
            title: "Aturan Baku React Hooks",
            content: `Sebelum kita berlatih, kamu harus menghafal **Dua Hukum Tertinggi Hooks**:

1. **Hanya Panggil Hooks di Tingkat Teratas (Top Level)**
   Kamu **TIDAK BOLEH** memanggil \`useState\` atau \`useEffect\` di dalam *loops*, *conditions* (\`if\`), atau fungsi bersarang. React sangat bergantung pada URUTAN pemanggilan hooks. Jika kamu menyembunyikannya di balik \`if\`, urutan itu bisa berantakan dan aplikasimu akan seketika *crash*.

   \`\`\`jsx
   // SALAH (DI DALAM IF)
   if (isUserLoggedIn) {
     useEffect(() => { ... }); 
   }

   // BENAR
   useEffect(() => {
     if (isUserLoggedIn) { ... }
   }, [isUserLoggedIn]);
   \`\`\`

2. **Hanya Panggil Hooks dari Fungsi React**
   Jangan memanggil Hooks dari fungsi JavaScript biasa. Panggil mereka hanya dari dalam *Functional Component* React, atau dari dalam *Custom Hooks* buatanmu sendiri.`,
            keyTakeaway: "Hukum Mutlak: Hooks harus dipanggil di urutan paling atas fungsi komponen. Jangan pernah memasukkannya ke dalam if, loop, atau switch."
          },
          {
            slideNumber: 7,
            type: "challenge",
            title: "Challenge: Sinkronisasi Judul Halaman",
            content: `Mari kita praktikkan kekuatan \`useEffect\`.
            
Salah satu penggunaan paling dasar dari efek samping adalah mengubah \`document.title\` (judul tab browser yang terlihat di atas) agar tersinkronisasi dengan state yang ada di komponen.`,
            challenge: {
              instruction: "Gunakan useEffect untuk mengubah nilai `document.title` setiap kali tombol diklik (state `count` berubah). Judul tab harus menjadi 'Diklik N kali'.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "import { useState, useEffect } from 'react';\n\nexport default function PageTitle() {\n  const [count, setCount] = useState(0);\n  \n  // Tambahkan useEffect disini\n  // Ganti document.title dengan string literal `Diklik ${count} kali`\n\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Klik: {count}\n    </button>\n  );\n}",
              expectedConcepts: ["useEffect", "document.title", "[count]"],
              evaluationCriteria: "Evaluasi apakah useEffect menggunakan dependency array [count] dan mengubah document.title di dalamnya.",
              hints: [
                "Pastikan efek tersebut memiliki dependency array: `[count]`",
                "Di dalam fungsi efek, tulis `document.title = ...`"
              ],
              sampleAnswer: "import { useState, useEffect } from 'react';\n\nexport default function PageTitle() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Diklik ${count} kali`;\n  }, [count]);\n\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Klik: {count}\n    </button>\n  );\n}",
              followUpQuestion: "Apa yang terjadi jika kita mengosongkan dependency array menjadi [] di kode tersebut?"
            }
          },
          {
            slideNumber: 8,
            type: "lesson",
            title: "Mengenal Custom Hooks",
            content: `Setelah kita memahami \`useState\` dan \`useEffect\`, ada satu kekuatan super lagi yang dimiliki oleh React Hooks: **Custom Hooks**.

Custom Hooks pada dasarnya adalah fungsi JavaScript biasa, tetapi ia memiliki kemampuan spesial: **Bisa memanggil hooks lain di dalamnya**.

Mengapa kita butuh Custom Hooks?
Bayangkan kamu memiliki tiga komponen berbeda (misalnya: Header, Sidebar, dan Footer) yang semuanya butuh mendeteksi apakah pengguna sedang *online* atau *offline*. Daripada kamu menulis ulang \`useEffect\` untuk mendengarkan *event* \`window.addEventListener('online')\` di ketiga komponen tersebut (yang melanggar prinsip DRY - *Don't Repeat Yourself*), kamu bisa mengekstrak logika tersebut ke dalam satu fungsi Custom Hook bernama \`useOnlineStatus\`.`,
            keyTakeaway: "Custom Hooks digunakan untuk membagikan (share) logika stateful antar komponen, bukan membagikan statenya. Setiap komponen yang memanggil hook akan mendapatkan state yang terisolasi."
          },
          {
            slideNumber: 9,
            type: "example",
            title: "Praktik Membuat: useWindowSize",
            content: `Mari kita buat Custom Hook paling populer di dunia *frontend*: \`useWindowSize\`. Hook ini berguna jika kamu ingin membuat komponen merespons perubahan ukuran layar (misal merender versi mobile vs desktop) langsung dari *state* JavaScript.

\`\`\`jsx
import { useState, useEffect } from 'react';

// 1. Deklarasi fungsi dengan awalan "use"
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler saat ukuran window berubah
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Tambahkan event listener
    window.addEventListener("resize", handleResize);
    
    // Panggil sekali saat pertama load
    handleResize();
    
    // Jangan lupa CLEANUP!
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Array kosong = hanya mount & unmount

  return windowSize;
}
\`\`\`

Cara pakainya di komponen sangat elegan:
\`\`\`jsx
function TampilanResponsif() {
  const size = useWindowSize(); // 💥 Magic!
  
  return (
    <div>
      Lebar layar saat ini: {size.width}px. 
      {size.width < 768 ? "Mode Mobile" : "Mode Desktop"}
    </div>
  );
}
\`\`\``,
            keyTakeaway: "Custom Hooks menyembunyikan logika kompleks dan mengembalikan (return) nilai yang siap pakai. Komponen yang memakainya menjadi sangat bersih dan rapi."
          },
          {
            slideNumber: 10,
            type: "lesson",
            title: "Aturan Wajib Custom Hooks",
            content: `Meskipun Custom Hooks itu fungsinya bebas, ada satu aturan emas (Golden Rule) yang ditegakkan dengan ketat oleh linter React: **NAMA FUNGSI WAJIB DIAWALI DENGAN KATA \`use\`**.

Contoh yang Benar: \`useFetch\`, \`useAuth\`, \`useMediaQuery\`.
Contoh yang Salah: \`getFetch\`, \`fetchData\`, \`authStatus\`.

Mengapa ini sangat krusial?
1. **Validasi Aturan Hooks**: React linter hanya bisa mengecek apakah kamu melanggar aturan hooks (seperti memanggil hook di dalam *if* atau *loop*) JIKA fungsimu berawalan \`use\`. Jika kamu menamainya \`ambilData\`, React akan menganggapnya sebagai fungsi biasa dan membiarkan *bug* siluman lewat.
2. **Keterbacaan**: Membaca nama \`use...\` langsung memberitahu *developer* lain bahwa fungsi tersebut adalah komponen *stateful* yang memiliki efek samping.`,
            keyTakeaway: "Selalu, selalu, dan selalu berikan awalan 'use' (huruf kecil) pada Custom Hook buatanmu. Tanpa awalan ini, aplikasi React-mu kehilangan lapisan pengamanan deteksi bug otomatis."
          },
          {
            slideNumber: 11,
            type: "lesson",
            title: "Optimalisasi: Mengenal useCallback",
            content: `Di React tingkat lanjut, ada situasi di mana *re-render* yang berlebihan mulai membuat aplikasimu terasa lemot.
Setiap kali komponen me-*render* ulang (misal karena ada ketikan di input), **semua fungsi yang ada di dalam komponen itu akan dideklarasikan ulang (diciptakan kembali di memori)**.

Dalam banyak kasus, ini sangat cepat dan tidak masalah. Tetapi jika fungsi itu dioper sebagai *Props* ke komponen *Child* yang berat, komponen *Child* akan mengira fungsinya baru, lalu ia akan ikut me-*render* ulang dirinya sendiri secara sia-sia!

Di sinilah **\`useCallback\`** datang sebagai pahlawan.

\`useCallback\` akan **Mengingat (Memoize)** fungsimu. React tidak akan mendeklarasikan ulang fungsi tersebut selama *dependency array*-nya tidak berubah.

\`\`\`jsx
import { useCallback, useState } from 'react';

function Parent() {
  const [teks, setTeks] = useState("");
  const [data, setData] = useState([]);

  // Fungsi ini tidak akan diciptakan ulang setiap kali 'teks' diketik!
  const hapusData = useCallback((id) => {
    setData(prev => prev.filter(item => item.id !== id));
  }, []); // Dependensi kosong, fungsi ini "abadi"

  return (
    <>
      <input onChange={(e) => setTeks(e.target.value)} />
      {/* ChildComponent yang berat akan aman dari re-render palsu */}
      <ChildComponent yangBerat={true} onHapus={hapusData} />
    </>
  );
}
\`\`\``,
            keyTakeaway: "Gunakan useCallback HANYA ketika kamu perlu mengoper fungsi ke komponen anak (Child) yang teroptimasi, untuk mencegah anak tersebut re-render secara tidak perlu."
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Optimalisasi: Mengenal useMemo",
            content: `Jika \`useCallback\` digunakan untuk mengingat FUNGSI, maka **\`useMemo\`** digunakan untuk mengingat **HASIL NILAI (Value) DARI SEBUAH KALKULASI BERAT**.

Kapan kamu harus menggunakannya?
Bayangkan kamu punya fungsi untuk memfilter atau mengurutkan (sorting) 10.000 data tabel. Jika kamu menaruh fungsi itu langsung di komponen, setiap kali ada perubahan kecil (seperti menekan tombol centang/checkbox yang tidak berhubungan dengan tabel), React akan mengalkulasi ulang 10.000 data tersebut! Aplikasi akan nge-*lag*.

\`\`\`jsx
import { useMemo, useState } from 'react';

function TabelBanyakData({ daftarBarang }) {
  const [modeGelap, setModeGelap] = useState(false);

  // ❌ BURUK: Dieksekusi ulang setiap kali toggle modeGelap diklik!
  // const barangTermahal = daftarBarang.filter(b => b.harga > 1000000).sort(...);

  // ✅ BAIK: Hasil kalkulasi diingat. 
  // Hanya dihitung ulang JIKA 'daftarBarang' sungguhan berubah mutasinya.
  const barangTermahal = useMemo(() => {
    console.log("Kalkulasi berat berjalan...");
    return daftarBarang
             .filter(b => b.harga > 1000000)
             .sort((a,b) => b.harga - a.harga);
  }, [daftarBarang]);

  return (
    <div className={modeGelap ? 'dark' : 'light'}>
      <button onClick={() => setModeGelap(!modeGelap)}>Toggle Theme</button>
      {/* Render barangTermahal di sini */}
    </div>
  );
}
\`\`\``,
            keyTakeaway: "Jangan gunakan useMemo untuk segalanya karena useMemo sendiri memakan sedikit memori. Gunakan hanya pada operasi komputasi yang berat (seperti sorting array besar atau filter data kompleks)."
          },
          {
            slideNumber: 13,
            type: "challenge",
            title: "Challenge: Perbaiki Render Berulang",
            content: "Berikut ini ada kode komponen yang sangat lambat karena melakukan operasi matematika berat di setiap karakter yang pengguna ketik. Perbaiki performanya menggunakan \`useMemo\`!",
            challenge: {
              instruction: "Bungkus logika `hitungFaktorial` di dalam `useMemo` agar ia hanya dihitung ulang ketika nilai variabel `angkaTarget` berubah, bukan saat pengguna mengetik di `input teksLain`.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "import { useState, useMemo } from 'react';\n\nfunction hitungBerat(n) {\n  console.log('Menghitung...');\n  for(let i=0; i<1000000000; i++){}\n  return n * 2;\n}\n\nexport default function App() {\n  const [angkaTarget, setAngkaTarget] = useState(10);\n  const [teksLain, setTeksLain] = useState('');\n\n  // PERBAIKI BARIS INI DENGAN USEMEMO:\n  const hasil = hitungBerat(angkaTarget);\n\n  return (\n    <div>\n      <input value={teksLain} onChange={e => setTeksLain(e.target.value)} />\n      <button onClick={() => setAngkaTarget(a => a + 1)}>Tambah Angka</button>\n      <p>Hasil Kalkulasi: {hasil}</p>\n    </div>\n  );\n}",
              expectedConcepts: ["useMemo", "hitungBerat", "[angkaTarget]"],
              evaluationCriteria: "Pastikan pengguna menggunakan sintaks `useMemo(() => hitungBerat(angkaTarget), [angkaTarget])`",
              hints: ["Pola useMemo: `const hasil = useMemo(() => panggilFungsi(), [dependensi]);`", "Dependensinya harus array `[angkaTarget]` agar hanya re-render saat angka di-klik."],
              sampleAnswer: "import { useState, useMemo } from 'react';\n\nfunction hitungBerat(n) {\n  console.log('Menghitung...');\n  for(let i=0; i<1000000000; i++){}\n  return n * 2;\n}\n\nexport default function App() {\n  const [angkaTarget, setAngkaTarget] = useState(10);\n  const [teksLain, setTeksLain] = useState('');\n\n  const hasil = useMemo(() => hitungBerat(angkaTarget), [angkaTarget]);\n\n  return (\n    <div>\n      <input value={teksLain} onChange={e => setTeksLain(e.target.value)} />\n      <button onClick={() => setAngkaTarget(a => a + 1)}>Tambah Angka</button>\n      <p>Hasil Kalkulasi: {hasil}</p>\n    </div>\n  );\n}",
              followUpQuestion: "Kenapa teks input terasa nge-lag sebelum di-fix dengan useMemo?"
            }
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Rangkuman Modul 2",
            content: `Luar biasa! Kamu baru saja mempelajari senjata-senjata andalan developer React level *Senior*.
            
Mari kita rangkum materi Modul 2 ini:
1. **useEffect**: Ruang khusus untuk *Side Effects* (seperti fetch API, timer, event listener). Jangan lupa fungsi *Cleanup* di parameter balikan.
2. **Dependency Array**: Rem tangan dari *useEffect*. Array kosong = jalan sekali di awal. Array berisi state = jalan saat state itu berubah.
3. **Custom Hooks**: Cara terbaik me-*refactor* logika *stateful* menjadi fungsi modular yang berawalan \`use\`.
4. **useCallback**: Mengunci / menghafal **Fungsi** agar tidak dibuat ulang di memori setiap kali komponen render.
5. **useMemo**: Mengunci / menghafal **Nilai (Hasil)** dari operasi komputasi berat agar tidak memakan CPU sia-sia.

Dengan menguasai *Hooks* ini, kodemu tidak hanya akan berfungsi dengan benar, tetapi juga melesat dengan sangat cepat (*performant*).`,
            keyTakeaway: "Kuasai Dependency Array dan Aturan Top-Level Hooks, maka 90% bug misterius di React akan terhindari. Gunakan useCallback dan useMemo dengan bijak untuk optimasi."
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Ujian Validasi Modul 2",
            content: "Uji insting React-mu! Buktikan bahwa kamu memahami siklus hidup, side effect, dan aturan baku Hooks. Harus tembus skor 80!",
            quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
          }
        ],
        quizBank: []
      }
    },
    {
      title: "Routing & Data Fetching",
      slug: "routing-data-fetching-react",
      order: 3,
      xpReward: 200,
      sources: [
        { type: "YOUTUBE", title: "React Router Dasar & Fetch API", url: "https://www.youtube.com/watch?v=5kHyviqjhCk" },
        { type: "DOCUMENTATION", title: "React Router", url: "https://reactrouter.com/" },
        { type: "DOCUMENTATION", title: "Fetching Data", url: "https://react.dev/reference/react/useEffect#fetching-data-with-effects" }
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Fetching Data di Dunia React",
            content: `Aplikasi modern nyaris tidak berguna tanpa data dinamis dari server (API). 

Di React SPA (Single Page Application) tradisional, pengambilan data dilakukan di *client-side* (di browser pengguna) menggunakan kombinasi **\`useEffect\`** dan **\`useState\`**. 

Alurnya selalu seperti ini:
1. Komponen di-mount (tampil di layar).
2. Tampilkan UI Kosong atau UI *Loading*.
3. \`useEffect\` berjalan dan memicu HTTP Request (misal fungsi \`fetch()\`).
4. Data dari server tiba (sebagai Promise).
5. Data tersebut dimasukkan ke dalam fungsi *Setter State* (seperti \`setData(hasil)\`).
6. Perubahan *State* memaksa komponen untuk di-render ulang.
7. Komponen kini me-render UI asli dengan data yang lengkap!`,
            keyTakeaway: "Di React tradisional, render UI selalu mendahului fetching data. UI akan ter-update secara otomatis saat data telah selesai di-fetch dan masuk ke dalam State."
          },
          {
            slideNumber: 2,
            type: "example",
            title: "Implementasi Dasar Fetch",
            content: `Mari kita lihat kode nyatanya. Kita akan menggunakan API publik dari \`JSONPlaceholder\`.

\`\`\`jsx
import { useState, useEffect } from 'react';

function DaftarUser() {
  const [users, setUsers] = useState([]); // State untuk wadah data

  useEffect(() => {
    // Ingat, fetch adalah proses asinkron (Promise)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json()) // Ubah ke JSON
      .then(data => {
        setUsers(data); // Simpan hasil ke State
      });
  }, []); // Array kosong = ambil data cuma sekali pas komponen muncul

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`
Sederhana, bukan? \`useEffect\` memanggil jaringan, lalu hasilnya "ditanam" ke dalam \`useState\`.`,
            keyTakeaway: "Selalu gunakan dependency array kosong [] saat melakukan initial data fetch agar permintaan ke API tidak dipanggil berulang-ulang tanpa henti (infinite loop)."
          },
          {
            slideNumber: 3,
            type: "lesson",
            title: "Tiga Serangkai State: Data, Loading, Error",
            content: `Kode di slide sebelumnya berfungsi, tapi di dunia nyata, itu adalah praktik yang **buruk**. Mengapa? Karena koneksi internet pengguna bisa lambat atau bahkan gagal.

Aplikasi yang solid harus memiliki **Tiga Serangkai State**:
1. \`State Data\`: Untuk menampung isi konten.
2. \`State Loading\`: Boolean (\`true\` / \`false\`) untuk menampilkan spinner pemuatan.
3. \`State Error\`: String untuk menampilkan pesan kesalahan jika server *down*.

Dengan tiga state ini, UX (Pengalaman Pengguna) aplikasimu akan naik level. Pengguna tahu bahwa aplikasi sedang bekerja, bukan sekadar layar kosong atau *hang*.`,
            keyTakeaway: "Developer profesional selalu memikirkan skenario terburuk (jaringan lambat atau server mati) dengan menyiapkan Loading State dan Error State."
          },
          {
            slideNumber: 4,
            type: "example",
            title: "Menulis Kode Tiga Serangkai State",
            content: `Beginilah wujud komponen fetching yang standar industri:

\`\`\`jsx
function PostLengkap() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true); // Mulai loading
    
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setIsLoading(false); // Matikan loading jika sukses
      })
      .catch(err => {
        setError(err.message); // Tangkap error
        setIsLoading(false); // Tetap matikan loading meski error
      });
  }, []);

  // UI Cabang (Conditional Rendering)
  if (isLoading) return <p>Sedang memuat data dari server...</p>;
  if (error) return <p style={{color: 'red'}}>Waduh: {error}</p>;

  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
\`\`\`
Pola di atas disebut *Conditional Rendering*. Komponen akan menghentikan proses render utama (List HTML) dan me-return elemen *Loading* atau *Error* terlebih dahulu sesuai kondisinya.`,
            keyTakeaway: "Gunakan Conditional Rendering (if-return di tengah komponen) untuk memblokir render komponen utama selama data masih dimuat atau terjadi error."
          },
          {
            slideNumber: 5,
            type: "challenge",
            title: "Challenge: Mengambil Data Kucing",
            content: "Terapkan ilmu Tiga Serangkai State untuk mengambil fakta unik tentang Kucing dari API publik.",
            challenge: {
              instruction: "Lengkapi kode di dalam `useEffect`. Matikan status loading HANYA JIKA proses fetch sukses (di blok `.then()`). Abaikan blok `.catch()` untuk latihan ini.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "import { useState, useEffect } from 'react';\n\nexport default function CatFact() {\n  const [fact, setFact] = useState('');\n  const [isLoading, setIsLoading] = useState(true);\n  \n  useEffect(() => {\n    // Lengkapi fetch di bawah ini:\n    fetch('https://catfact.ninja/fact')\n      .then(r => r.json())\n      .then(data => {\n        // 1. Simpan data.fact ke state fact\n        // 2. Ubah state isLoading menjadi false\n        \n      });\n  }, []);\n\n  if (isLoading) return <h2>Memuat fakta kucing...</h2>;\n  return <h2>Tahukah kamu? {fact}</h2>;\n}",
              expectedConcepts: ["setFact", "setIsLoading(false)"],
              evaluationCriteria: "Evaluasi pengisian setFact(data.fact) dan pemanggilan setIsLoading(false) di dalam blok then data",
              hints: [
                "Gunakan fungsi setFact() dan masukkan data.fact ke dalamnya.",
                "Panggil setIsLoading(false) segera setelahnya."
              ],
              sampleAnswer: "import { useState, useEffect } from 'react';\n\nexport default function CatFact() {\n  const [fact, setFact] = useState('');\n  const [isLoading, setIsLoading] = useState(true);\n  \n  useEffect(() => {\n    fetch('https://catfact.ninja/fact')\n      .then(r => r.json())\n      .then(data => {\n        setFact(data.fact);\n        setIsLoading(false);\n      });\n  }, []);\n\n  if (isLoading) return <h2>Memuat fakta kucing...</h2>;\n  return <h2>Tahukah kamu? {fact}</h2>;\n}",
              followUpQuestion: "Kenapa kita menaruh `setIsLoading(false)` di dalam `.then` dan tidak di luarnya?"
            }
          },
          {
            slideNumber: 6,
            type: "lesson",
            title: "Konsep SPA & React Router",
            content: `Sampai di titik ini, kita sudah bisa menampilkan komponen dan memompa data ke dalamnya. Namun, bagaimana jika pengguna ingin berpindah dari halaman "Beranda" ke halaman "Profil"?

Dalam arsitektur website tradisional (*Multi Page Application*), menekan tautan \`<a href="/profil">\` akan membuat browser membuang seluruh layar, memuat file HTML baru, mengeksekusi ulang seluruh CSS & JS dari nol, memicu layar berkedip sesaat (*white screen flash*). Ini SANGAT lambat.

Aplikasi React modern menganut **Single Page Application (SPA)**.
Artinya, kita secara fisik hanya memiliki SATU file \`index.html\`. Saat pengguna berpindah halaman, kita hanya mencegah *browser* melakukan proses *refresh*, lalu kita secara ajaib "menghapus" komponen Beranda dari layar dan "menggambar" komponen Profil sebagai gantinya. Semuanya ditangani oleh JavaScript, instan tanpa layar berkedip!

Untuk mengatur pergantian komponen rumit ini berdasarkan rute URL (\`/beranda\` vs \`/profil\`), kita menggunakan pustaka tambahan yang sangat populer bernama **React Router** (atau *App Router* jika kamu menggunakan *framework* tingkat lanjut seperti Next.js).`,
            keyTakeaway: "Di aplikasi React, perpindahan layar adalah ilusi JavaScript. Browser sebenarnya tidak pernah me-refresh dokumen HTML, itulah yang membuat SPA terasa secepat kilat seperti aplikasi asli (Native App)."
          },
          {
            slideNumber: 7,
            type: "example",
            title: "Navigasi ala React Router",
            content: `Satu aturan krusial yang HARUS kamu ingat di dunia SPA: **Jangan pernah menggunakan tag \`<a>\` HTML standar untuk navigasi internal aplikasi!**

Jika kamu memakai \`<a href="/profil">\`, browser tetap akan memaksa melakukan perilaku bawaan *refresh* layar putih. Seluruh State aplikasi akan mati dan hangus!

Sebagai gantinya, pustaka *Router* akan selalu menyediakan komponen khusus (biasanya bernama \`<Link>\`) yang akan membajak klik tersebut secara elegan.

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Menu Navigasi yang aman (TIDAK BOLEH PAKAI <a href>) */}
      <nav>
        <Link to="/">Beranda</Link>
        <Link to="/profil">Profil</Link>
      </nav>

      {/* Mesin yang mengatur Komponen apa yang muncul */}
      <Routes>
        <Route path="/" element={<HalamanBeranda />} />
        <Route path="/profil" element={<HalamanProfil />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`
Mulai saat ini, hindari kebiasaan menekan *Reload Browser*!`,
            keyTakeaway: "Tinggalkan tag <a> konvensional. Gunakan komponen <Link> untuk navigasi mulus tanpa kehilangan memori State aplikasi."
          },
          {
            slideNumber: 8,
            type: "lesson",
            title: "Tantangan Asynchronous: Loading & Error",
            content: `Mengambil data dari internet tidak terjadi secara instan. Bisa memakan waktu 100 milidetik, bisa 5 detik, atau bahkan gagal sama sekali karena koneksi internet terputus.

Sebagai developer yang baik, kita tidak boleh membiarkan pengguna melihat layar kosong saat data sedang dalam perjalanan, apalagi membiarkan aplikasi nge-*crash* (hang) jika server sedang bermasalah.

Dalam React tradisional, kita menangani ini dengan menambah 2 buah *State* tambahan di samping State data utama:
1. **Loading State**: Bertipe boolean (\`true\`/\`false\`) untuk menandai apakah kita sedang menunggu data.
2. **Error State**: Bertipe string atau objek untuk menyimpan pesan kesalahan jika request gagal.

Pola ini sangat sering ditemui di industri sehingga disebut sebagai **Pola Fetching 3-State** (Data, Loading, Error).`,
            keyTakeaway: "Data dari API bersifat Asynchronous. Selalu antisipasi delay jaringan dan potensi kegagalan dengan memikirkan status 'Loading' dan status 'Error'."
          },
          {
            slideNumber: 9,
            type: "example",
            title: "Praktik Pola 3-State",
            content: `Berikut adalah cetak biru standar pengambilan data yang profesional di React murni:

\`\`\`jsx
import { useState, useEffect } from 'react';

function ProfilPengguna() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading awal = true
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Jalankan operasi ambil data saat komponen tampil
    fetch('https://api.github.com/users/octocat')
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil data dari server");
        return res.json();
      })
      .then(hasilData => {
        setData(hasilData);
        setIsLoading(false); // Matikan loading setelah sukses
      })
      .catch(err => {
        setErrorMsg(err.message);
        setIsLoading(false); // Matikan loading juga saat error
      });
  }, []);

  // Early Return Pattern! (Sangat elegan)
  if (isLoading) return <h2>⏳ Sedang Memuat Data...</h2>;
  if (errorMsg) return <h2 style={{color: 'red'}}>❌ Error: {errorMsg}</h2>;

  // Jika kode sampai sini, dijamin 'data' sudah tersedia
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
}
\`\`\``,
            keyTakeaway: "Gunakan pola 'Early Return' dalam komponenmu. Tulis pengecekan if(loading) dan if(error) di atas, sehingga kode JSX utama di bawahnya bebas dari kondisi yang berantakan."
          },
          {
            slideNumber: 10,
            type: "challenge",
            title: "Challenge: Perbaiki UI Data Kosong",
            content: "Ada satu celah dalam Pola 3-State kita. Bagaimana jika request ke API berhasil, tapi API mereturn array kosong `[]` (Misal, tidak ada data produk)? Kita tidak boleh membiarkan layar menjadi putih kosong tanpa informasi bagi pengguna.",
            challenge: {
              instruction: "Lengkapi komponen di bawah ini dengan pola Early Return. Tambahkan pengkondisian untuk mengecek apakah state `produk` kosong (panjang array 0). Jika kosong, return teks `Tidak ada produk yang ditemukan`.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "function DaftarProduk({ isLoading, errorMsg, produk }) {\n  if (isLoading) return <h2>Loading...</h2>;\n  if (errorMsg) return <h2>Error: {errorMsg}</h2>;\n\n  // TULIS EARLY RETURN UNTUK PRODUK KOSONG DI SINI:\n\n\n  return (\n    <ul>\n      {produk.map(p => <li key={p.id}>{p.nama}</li>)}\n    </ul>\n  );\n}",
              expectedConcepts: ["if(produk.length === 0)", "return <JSX>"],
              evaluationCriteria: "Pastikan pengguna memeriksa `produk.length === 0` dan mereturn teks yang diminta. Penggunaan operator `!produk.length` juga diperbolehkan.",
              hints: ["Gunakan properti `.length` pada array. Jika sama dengan 0, return sebuah tag header atau p."],
              sampleAnswer: "function DaftarProduk({ isLoading, errorMsg, produk }) {\n  if (isLoading) return <h2>Loading...</h2>;\n  if (errorMsg) return <h2>Error: {errorMsg}</h2>;\n\n  if (produk.length === 0) return <h2>Tidak ada produk yang ditemukan</h2>;\n\n  return (\n    <ul>\n      {produk.map(p => <li key={p.id}>{p.nama}</li>)}\n    </ul>\n  );\n}",
              followUpQuestion: "Kenapa mengecek length sangat penting daripada langsung merender `.map`?"
            }
          },
          {
            slideNumber: 11,
            type: "lesson",
            title: "Dynamic Routing (Rute Dinamis)",
            content: `Setelah data didapatkan, tantangan berikutnya di dunia SPA adalah Navigasi Lanjutan: **Rute Dinamis**.

Bayangkan Tokopedia memiliki jutaan produk. Mustahil developer mereka mendaftarkan rute (Route) satu per satu secara manual seperti ini:
- \`<Route path="/produk/sepatu-adidas" />\`
- \`<Route path="/produk/laptop-asus" />\`

Solusinya adalah menggunakan Rute Dinamis berparameter. Di React Router, kita menandai parameter dinamis menggunakan titik dua ( \`:\` ).
Contohnya: \`<Route path="/produk/:idProduk" />\`.

Apapun yang diketik pengguna setelah \`/produk/\` (seperti \`/produk/123\` atau \`/produk/abc\`) akan dianggap sebagai halaman detail, dan nilai \`123\` tersebut akan disimpan ke dalam variabel \`idProduk\` yang bisa dibaca oleh komponenmu.`,
            keyTakeaway: "Tanda titik dua ( : ) pada deklarasi Route menandakan bahwa bagian path tersebut bersifat dinamis dan nilainya bisa ditangkap oleh komponen sebagai variabel."
          },
          {
            slideNumber: 12,
            type: "example",
            title: "Menangkap URL Params",
            content: `Untuk membaca parameter dinamis yang ada di *address bar* (URL) browser pengguna, React Router menyediakan Custom Hook bernama **\`useParams\`**.

Mari kita rangkai konsep Routing Dinamis ini bersama dengan Data Fetching yang baru saja kita pelajari:

\`\`\`jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Komponen Halaman Detail
function HalamanDetailProduk() {
  // Tangkap parameter 'idProduk' dari URL browser (misal: /produk/88)
  const params = useParams(); 
  const [data, setData] = useState(null);

  useEffect(() => {
    // Kita gunakan ID dari URL untuk fetch spesifik 1 produk!
    fetch(\`https://api.toko.com/products/\${params.idProduk}\`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [params.idProduk]); // ← Dependensi ini PENTING!

  if (!data) return <p>Loading detail...</p>;
  
  return (
    <div>
      <h1>{data.namaBarang}</h1>
      <p>Harga: Rp {data.harga}</p>
    </div>
  );
}
\`\`\`

Perhatikan bagaimana kita menaruh \`params.idProduk\` di dalam **Dependency Array** \`useEffect\`. Ini memastikan bahwa jika pengguna melompat dari URL produk A ke produk B, komponen akan mengambil ulang data produk B tanpa harus merefresh halaman!`,
            keyTakeaway: "Kombinasi `useParams()` dari React Router dan `useEffect` adalah resep standar untuk membangun halaman Detail di aplikasi Single Page Application."
          },
          {
            slideNumber: 13,
            type: "lesson",
            title: "Masa Depan React: Mengapa Next.js?",
            content: `Sampai di sini, kamu telah menamatkan seluruh kurikulum utama pengembangan Web Frontend SPA menggunakan React murni (sering disebut *Client Side Rendering* / CSR). 
Namun, SPA Murni memiliki kelemahan telak:
1. **SEO yang Buruk**: Karena HTML awal yang dikirim dari server hanya sebuah \`<div>\` kosong, robot Google (Crawler) kesulitan membaca isi konten aplikasimu.
2. **Initial Load yang Lambat**: Pengguna dengan *smartphone* lambat harus menunggu ukuran file Javascript (bundle) React selesai di-download baru halaman bisa muncul.

Untuk mengatasi ini, pencipta React (Facebook) sangat menyarankan agar proyek baru skala besar beralih ke ranah **SSR (Server Side Rendering)** menggunakan kerangka kerja (Framework) berbasis React.

Sang Raja Framework tersebut saat ini adalah **Next.js**.
Di Next.js, kamu tetap menulis komponen menggunakan fungsi-fungsi React (useState, JSX, Component). Namun Next.js melakukan "sihir" dengan me-render komponenmu di Server *Backend* (Node.js) terlebih dahulu, sehingga pengguna langsung disuguhi halaman HTML utuh secepat kilat.`,
            keyTakeaway: "React Murni adalah Pustaka (Library). Next.js adalah Kerangka Kerja (Framework). Pelajari React murni untuk fondasi berpikir, gunakan Next.js di dunia profesional."
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Tamat! React Foundation Clear",
            content: `Selamat! Kamu telah menyelesaikan Kurikulum React Premium Clarise.

Mari kita *flashback* ilmu yang telah tertanam di otakmu:
1. **Komponen & JSX**: Kita berpikir dalam arsitektur balok mandiri Lego, dan menuliskannya dalam format perpaduan HTML-Javascript yang elegan.
2. **Props & State**: Kita mengirim data mengalir turun dari *Parent* ke *Child* (Props), dan kita memberikan ingatan memori yang bisa dimutasi secara interaktif (State).
3. **Immutability**: Kita mematuhi aturan ketat untuk tidak merusak variabel sumber secara langsung, menggunakan \`setState\` dengan teknik *Spread Operator* pada *Array/Object*.
4. **Side Effects (useEffect)**: Kita menaklukkan operasi asinkron dunia nyata, menghubungkan React dengan API luar angkasa dengan aman berbekal *Cleanup* dan *Dependency Array*.
5. **SPA Concept**: Kita memahami bahwa *reload* browser adalah musuh, dan navigasi harus dijalankan secara dinamis dengan \`<Link>\` dan \`useParams\`.

Pemahaman solid mengenai konsep reaktif ini akan membantumu menaklukkan ekosistem modern apa pun.`,
            keyTakeaway: "Framework datang dan pergi, namun filosofi State-UI React telah mengubah dunia Front-End selamanya. Selamat berkarya sebagai React Developer!"
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Grand Final Quiz: React Expert",
            content: "Ini adalah ujian tersulit di kurikulum dasar. Data Fetching, Router, Lifecycle, dan Hooks tingkat lanjut digabungkan menjadi satu. Buktikan kamu layak menyandang gelar React Developer!",
            quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
          }
        ],
        quizBank: []
      }
    }
  ]
};
