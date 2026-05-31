// Konten course untuk seed batch 5: Pemrograman.
// File ini cuma berisi data, gak ada side effect.
// Diimpor oleh prisma/seed.ts via seedBatch5().

import { Difficulty } from "@prisma/client";
import { tsLanjutanModule1 } from "./ts-lanjutan-module-1";
import { tsLanjutanModule2 } from "./ts-lanjutan-module-2";
import { tsLanjutanModule3 } from "./ts-lanjutan-module-3";

export type Batch5Course = {
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

// ──────────────────────────────────────────────────────────────────────────
// Course 1 — Belajar Rust Dasar (Free)
// ──────────────────────────────────────────────────────────────────────────

const rustDasarSlides = [
  {
    slideNumber: 1,
    type: "lesson",
    title: "Selamat Datang di Dunia Rust",
    content: `Selamat datang di Rust—bahasa pemrograman yang lahir dari Mozilla Research tahun 2010 dan dengan cepat berkembang menjadi salah satu bahasa paling dicintai developer dunia. Selama 8 tahun berturut-turut (2016–2023), Rust dinobatkan sebagai *most loved programming language* di Stack Overflow Developer Survey.

**Kenapa Rust begitu istimewa?** Bahasa ini menyelesaikan masalah klasik yang menghantui programmer C/C++ selama puluhan tahun: **bug memori**. Di C/C++, kamu bisa secara tidak sengaja mengakses memori yang sudah dibebaskan (use-after-free), membaca data yang belum diinisialisasi, atau menyebabkan buffer overflow. Bug-bug ini sering jadi celah keamanan kritis—bahkan di software sebesar Windows dan Chrome.

Rust mencegah semua itu **di compile-time**, sebelum kodemu pernah dijalankan. Yang lebih mengejutkan: Rust melakukan ini **tanpa garbage collector** seperti yang dipakai Java atau Go. Artinya, kamu mendapat keamanan plus performa secepat C++—kombinasi yang dulu dianggap mustahil.

**Siapa yang pakai Rust?** Discord (engine bot real-time), Cloudflare (workers edge), AWS (Firecracker untuk Lambda), Microsoft (sebagian Windows), Mozilla (Firefox), Linux Kernel (driver baru), Dropbox (storage layer). Rust sedang menjadi pilihan default untuk software sistem modern.

Di modul ini, kamu akan belajar fondasi Rust dari nol—mulai sintaks dasar, variabel, fungsi, hingga konsep paling unik di dunia pemrograman: **ownership dan borrowing**. Siap?`,
    keyTakeaway:
      "Rust adalah bahasa sistem modern yang menggabungkan keamanan memori dan performa C++—tanpa garbage collector.",
  },
  {
    slideNumber: 2,
    type: "example",
    title: "Hello World Pertama: Cetak ke Layar",
    content: `Mari mulai dengan ritual klasik—cetak teks pertama ke layar.

\`\`\`rust
fn main() {
    println!("Halo, Rust!");
}
\`\`\`

Mari bedah baris per baris:

**\`fn main()\`** adalah deklarasi fungsi bernama \`main\`. Setiap program Rust yang dapat dijalankan **wajib** punya fungsi ini—\`main\` adalah pintu masuk eksekusi. Saat kamu menjalankan program, sistem operasi langsung memanggil \`main\` lebih dulu, baru kode lain.

**\`println!\`** adalah sebuah *macro*, bukan fungsi biasa. Tanda \`!\` di akhir adalah penanda macro di Rust—itu cara compiler membedakan macro dari pemanggilan fungsi. Macro lebih fleksibel: bisa menerima jumlah argumen yang berubah-ubah dan bisa menghasilkan kode lain di compile-time. Kamu akan sering melihat \`!\` di Rust—ingat, itu artinya macro.

**Cara menjalankan**: simpan kode di file \`main.rs\`, lalu pakai salah satu cara:
- \`rustc main.rs\` → menghasilkan executable \`main\`.
- \`cargo run\` → kalau kamu pakai Cargo, project manager resmi Rust.

Cargo adalah alat yang akan kamu pakai 99% waktu—dia menangani dependencies, build, test, formatting, semua dalam satu tool. Dunia Rust tidak terpisahkan dari Cargo.

**Tips kecil**: kalau kamu mau cetak nilai variabel, pakai \`{}\` sebagai placeholder: \`println!("Halo, {}!", nama);\`. Sintaks ini mirip dengan f-string Python tapi lebih ketat secara tipe.`,
    keyTakeaway:
      "Setiap program Rust dimulai dari fungsi `main`, dan `println!` (dengan tanda `!`) adalah macro untuk mencetak ke layar.",
  },
  {
    slideNumber: 3,
    type: "lesson",
    title: "Variabel: Default Tidak Bisa Diubah",
    content: `Salah satu hal paling unik di Rust adalah **variabel default-nya immutable** (tidak bisa diubah). Ini berbeda dari kebanyakan bahasa lain seperti JavaScript, Python, atau Java di mana variabel bebas diubah-ubah.

\`\`\`rust
fn main() {
    let nama = "Budi";   // immutable
    nama = "Sari";        // ❌ ERROR! cannot assign twice
}
\`\`\`

Untuk membuat variabel yang **bisa** diubah, kamu harus eksplisit pakai keyword \`mut\`:

\`\`\`rust
fn main() {
    let mut nama = "Budi";
    nama = "Sari";          // ✅ OK
    println!("{}", nama);   // Output: Sari
}
\`\`\`

**Kenapa default-nya immutable?** Karena bug paling umum dalam pemrograman adalah **mutasi tak sengaja**—kamu mengubah nilai variabel di tempat yang seharusnya tidak. Dengan immutable default, Rust memaksamu untuk berpikir: *"Apakah saya benar-benar perlu mengubah ini?"*. Kalau iya, tambahkan \`mut\`. Kalau tidak, biarkan saja—dan compiler akan menangkap kesalahan jika kamu tidak sengaja menulisinya ulang.

Filosofi ini disebut **'safety by default'**: pilihan paling aman adalah pilihan default. Kalau kamu butuh fleksibilitas lebih, kamu harus minta secara eksplisit. Pendekatan ini mengurangi bug secara dramatis dalam kode skala besar.

**Untuk konstanta yang nilainya benar-benar tetap selamanya**, pakai \`const\`:
\`\`\`rust
const PI: f64 = 3.14159;
const MAKSIMAL_USER: u32 = 1000;
\`\`\`
\`const\` butuh tipe eksplisit, harus diketahui di compile-time, dan otomatis di-inline ke setiap tempat yang memakainya.`,
    keyTakeaway:
      "Variabel Rust default immutable—pakai `mut` saat memang ingin diubah, biar bug akibat mutasi tak sengaja hilang.",
  },
  {
    slideNumber: 4,
    type: "example",
    title: "Tipe Data Dasar Rust",
    content: `Rust adalah bahasa **statically-typed**: setiap nilai punya tipe yang jelas, dan compiler akan menolak kode yang mencampur tipe yang tidak kompatibel. Kenalan dengan tipe-tipe primitif Rust:

\`\`\`rust
fn main() {
    let umur: i32 = 25;            // integer 32-bit signed
    let tinggi: f64 = 175.5;       // float 64-bit (default)
    let aktif: bool = true;        // boolean
    let inisial: char = 'B';       // karakter unicode (4 byte)
    let nama: &str = "Budi";       // string slice (literal)
}
\`\`\`

**Integer**: Rust punya banyak varian—\`i8\`, \`i16\`, \`i32\`, \`i64\`, \`i128\` untuk signed; \`u8\`, \`u16\`, \`u32\`, \`u64\`, \`u128\` untuk unsigned. Default-nya \`i32\`. Pakai \`u32\` saat kamu yakin nilainya tidak akan negatif (misal: jumlah pengunjung, ukuran file).

**Float**: ada \`f32\` (presisi tunggal) dan \`f64\` (presisi ganda, default).

**Char**: berbeda dari bahasa C, \`char\` di Rust adalah **4 byte** dan bisa menampung karakter Unicode penuh—termasuk emoji 🦀, aksara Jepang, atau simbol matematika.

**String**: ada dua tipe utama. \`&str\` (string slice, immutable, biasanya untuk literal seperti \`"Halo"\`) dan \`String\` (heap-allocated, growable, bisa dimodifikasi). Bedanya akan jelas saat kita masuk ke ownership—\`String\` punya pemilik, \`&str\` cuma meminjam.

**Type Inference**: kamu tidak selalu wajib menulis tipe. Rust pintar menebak:
\`\`\`rust
let umur = 25;      // otomatis i32
let pi = 3.14;      // otomatis f64
\`\`\`
Tapi menulis tipe eksplisit di parameter fungsi atau struct field adalah praktik baik—membuat kode lebih self-documenting.`,
    keyTakeaway:
      "Rust statically-typed; tipe primitif: integer (i32 default), float (f64 default), bool, char (4 byte unicode), &str dan String.",
  },
  {
    slideNumber: 5,
    type: "example",
    title: "Fungsi: Building Block Rust",
    content: `Fungsi adalah unit kode yang dapat dipanggil ulang. Di Rust, fungsi didefinisikan dengan keyword \`fn\`:

\`\`\`rust
fn sapa(nama: &str) -> String {
    format!("Halo, {}!", nama)
}

fn main() {
    let pesan = sapa("Budi");
    println!("{}", pesan);  // Output: Halo, Budi!
}
\`\`\`

Mari bedah:

**Parameter wajib bertipe eksplisit**. Rust tidak menerima parameter tanpa tipe. \`fn sapa(nama)\` akan langsung ditolak. Kamu harus tulis \`nama: &str\`. Aturan ini menghilangkan ambiguitas dan membuat kode lebih self-documenting.

**Return type pakai \`->\`**. Tanda panah \`->\` menunjukkan tipe yang akan dikembalikan fungsi. Kalau fungsi tidak return apa-apa, kamu bisa lewatkan ini (Rust menganggap return type-nya \`()\`, sebuah unit type kosong).

**Last expression sebagai return**. Perhatikan baris \`format!("Halo, {}!", nama)\` **tanpa semicolon di akhir**—itu sengaja. Di Rust, ekspresi terakhir tanpa \`;\` otomatis menjadi nilai return. Kalau kamu tambahkan \`;\`, baris itu jadi statement (yang return \`()\`), dan compiler akan mengeluh karena tipe return mismatch.

Kamu juga bisa pakai \`return\` eksplisit:
\`\`\`rust
fn sapa(nama: &str) -> String {
    return format!("Halo, {}!", nama);  // tetap valid
}
\`\`\`

Tapi gaya idiomatis Rust pakai ekspresi terakhir—lebih ringkas, lebih natural. Compiler memperlakukan keduanya sama. Pakai \`return\` eksplisit cuma kalau kamu butuh keluar dari fungsi lebih awal (early return) di tengah-tengah.`,
    keyTakeaway:
      "Fungsi Rust ditulis dengan `fn`; parameter wajib bertipe eksplisit, dan ekspresi terakhir tanpa `;` jadi nilai return.",
  },
  {
    slideNumber: 6,
    type: "lesson",
    title: "Konsep Inti: Ownership",
    content: `Sekarang kita masuk ke bagian paling unik dari Rust: **ownership**. Ini adalah sistem yang membuat Rust bisa mengelola memori secara aman **tanpa garbage collector**.

**Aturan ownership ada tiga**:
1. Setiap nilai punya **satu pemilik (owner)**.
2. Hanya boleh ada **satu owner** dalam satu waktu.
3. Saat owner keluar dari scope, nilai otomatis **dibebaskan** (dropped).

**Analogi sederhana**: bayangkan kamu punya buku fisik. Buku itu cuma bisa dipegang satu orang dalam satu waktu. Kalau kamu kasih buku itu ke teman, kamu sendiri **tidak lagi punya buku itu**—buku sudah pindah tangan. Kalau temanmu pindah rumah dan tidak ada lagi yang ingat di mana bukunya, buku itu otomatis "hilang" dari sistem (= dibebaskan dari memori).

\`\`\`rust
fn main() {
    let buku = String::from("Rust untuk Pemula");
    let teman = buku;  // ownership pindah ke 'teman'

    // println!("{}", buku);  // ❌ ERROR! 'buku' sudah tidak valid
    println!("{}", teman);    // ✅ OK
}  // di sini 'teman' keluar scope, memori dibebaskan otomatis
\`\`\`

**Kenapa ini penting?** Di C++, kamu harus manual \`malloc\`/\`free\`—gampang lupa dan jadi *memory leak*. Di Java/Python, ada GC yang otomatis tapi membuat program lebih lambat dengan pause-pause yang tidak bisa diprediksi (di game atau real-time system, ini fatal).

Rust pakai cara ketiga: **compile-time tracking**. Compiler tahu kapan setiap nilai 'mati', dan otomatis menyisipkan kode pembersihan di tempat yang tepat. Hasilnya: cepat seperti C, aman seperti Java—tanpa overhead runtime sama sekali.

Kalau kamu paham ownership, kamu paham 80% Rust. Selamat datang di pikiran-pemilik.`,
    keyTakeaway:
      "Ownership: setiap nilai punya satu pemilik, dan saat pemilik keluar dari scope, memori otomatis dibebaskan—tanpa GC.",
  },
  {
    slideNumber: 7,
    type: "example",
    title: "Move dan Borrow",
    content: `Saat kamu memberikan nilai ke variabel atau fungsi lain, secara default Rust melakukan **move**—ownership berpindah, dan variabel asli tidak lagi valid.

\`\`\`rust
fn main() {
    let s = String::from("halo");
    let s2 = s;             // s di-move ke s2
    // println!("{}", s);    // ❌ ERROR—s sudah tidak valid
    println!("{}", s2);     // ✅ OK
}
\`\`\`

Tapi kalau kamu cuma ingin **memakai** nilai tanpa mengambil ownership, gunakan **borrow** dengan tanda \`&\`:

\`\`\`rust
fn cetak(teks: &String) {
    println!("{}", teks);  // pinjem aja, tidak move
}

fn main() {
    let s = String::from("halo");
    cetak(&s);          // pinjamkan s
    cetak(&s);          // bisa dipinjam berulang kali
    println!("{}", s);  // ✅ s masih valid
}
\`\`\`

**Aturan borrowing yang ketat** (dijaga compiler):
- Boleh punya **banyak immutable borrow** (\`&T\`) bersamaan.
- ATAU **satu mutable borrow** (\`&mut T\`) saja.
- **Tidak boleh keduanya bersamaan**.

Kenapa aturan ini ada? Untuk mencegah *data race*—kondisi di mana dua thread mengakses dan mengubah data bersamaan tanpa sinkronisasi. Bug semacam ini di bahasa lain bisa membuat developer pusing berhari-hari karena susah direproduksi. Rust menjamin **fearless concurrency**: kalau kodemu compile, kamu bebas dari data race. Selesai.

**Tipe-tipe Copy** seperti \`i32\`, \`bool\`, \`f64\` tidak di-move melainkan di-*copy* karena ukurannya kecil dan disimpan di stack. Hanya tipe yang menyimpan data di heap (seperti \`String\`, \`Vec<T>\`) yang punya semantik move. Aturan ini akan jelas saat kamu mulai menulis program kompleks.`,
    keyTakeaway:
      "Saat kamu meminjam dengan `&`, kamu pakai data tanpa memilikinya—pemilik aslinya tetap punya kontrol penuh.",
  },
  {
    slideNumber: 8,
    type: "challenge",
    title: "Challenge: Hitung Total Belanja",
    content: `Kamu sedang membuat aplikasi kasir untuk warung kopi. Pelanggan check-out dengan beberapa item, dan kasir butuh menghitung total harga dengan cepat.

Tugas kamu: tulis sebuah fungsi \`hitung_total\` yang menerima daftar harga (sebagai slice integer) dan mengembalikan total semua harga. Pakai konsep yang baru kamu pelajari—function signature, parameter slice borrow, dan iteration.`,
    challenge: {
      instruction:
        'Tulis fungsi Rust bernama `hitung_total` yang menerima parameter `harga: &[i32]` (slice array integer) dan mengembalikan `i32` berisi total semua elemen. Tip: gunakan `.iter().sum()` atau loop manual.',
      inputType: "code",
      inputPlaceholder: "fn hitung_total(harga: &[i32]) -> i32 { ... }",
      starterCode:
        "fn hitung_total(harga: &[i32]) -> i32 {\n    // Tulis kode kamu di sini\n    0\n}",
      expectedConcepts: [
        "Fungsi `hitung_total` dengan signature yang tepat",
        "Parameter `&[i32]` (slice borrow, bukan Vec)",
        "Return value `i32` berisi total semua elemen",
        "Penggunaan iteration (`.iter().sum()` atau loop manual)",
      ],
      evaluationCriteria:
        "AI Evaluator: periksa apakah user mendefinisikan fungsi dengan signature `fn hitung_total(harga: &[i32]) -> i32`. Pastikan ada logika yang menjumlahkan semua elemen—boleh pakai `harga.iter().sum()` (idiomatis) atau loop manual `let mut total = 0; for h in harga { total += h; } total` (juga benar). Jawaban benar jika fungsi return total yang akurat. Jawaban parsial jika signature tepat tapi logika sum salah (misal user lupa accumulator atau lupa return). Jawaban salah jika signature beda jauh atau tidak menyentuh masalah penjumlahan. Berikan pujian jika user pakai gaya iterator (lebih idiomatis). Jangan terjebak ke variasi nama variabel atau gaya formatting—fokus ke benar-tidaknya algoritma.",
      hints: [
        "Method `.iter()` mengubah slice jadi iterator yang bisa kita olah satu per satu.",
        "Iterator punya method `.sum()` yang otomatis menjumlahkan semua elemen jadi satu nilai.",
        "Solusi ringkas: `harga.iter().sum()` tanpa semicolon di akhir—biar jadi nilai return otomatis.",
      ],
      sampleAnswer:
        "fn hitung_total(harga: &[i32]) -> i32 {\n    harga.iter().sum()\n}",
      followUpQuestion:
        "Apa yang akan terjadi jika kita ganti `&[i32]` dengan `Vec<i32>`?",
    },
  },
  {
    slideNumber: 9,
    type: "lesson",
    title: "Pembahasan: Anatomi Solusi",
    content: `Solusi paling idiomatis dari challenge tadi adalah:

\`\`\`rust
fn hitung_total(harga: &[i32]) -> i32 {
    harga.iter().sum()
}
\`\`\`

Mari bedah kenapa solusi ini elegan:

**Parameter \`&[i32]\` (slice borrow)**: Kita pakai slice, bukan \`Vec<i32>\`. Kenapa? Karena fungsi ini cuma butuh **membaca** array—tidak perlu memilikinya. Dengan slice borrow, fungsi bisa menerima berbagai input: \`Vec<i32>\`, array statis \`[i32; 5]\`, atau bahkan slice dari Vec lain. Inilah yang disebut **flexibility through borrowing**.

**\`.iter()\`** mengubah slice jadi *iterator*—objek yang bisa kita olah satu per satu. Iterator di Rust *lazy* (tidak dieksekusi sampai diminta), efisien, dan punya banyak method bawaan untuk transformasi data.

**\`.sum()\`** adalah salah satu method iterator yang otomatis menjumlahkan semua elemen jadi satu nilai. Method ini polymorphic—dia tahu cara menjumlah berbagai tipe numerik berkat fitur Rust bernama *traits* (akan kita pelajari nanti).

**Common mistakes yang sering muncul**:
- ❌ Pakai \`Vec<i32>\` sebagai parameter—tidak salah, tapi memaksa user fungsi untuk selalu menyediakan \`Vec\`. Slice lebih fleksibel.
- ❌ Pakai \`for h in harga { total += h; }\` tanpa deklarasi \`let mut total = 0;\` di awal. Atau lupa return \`total\` di akhir.
- ❌ Menulis \`harga.iter().sum();\` dengan semicolon—itu jadi statement, bukan ekspresi return. Hilangkan semicolon di akhir!

Di Rust, **gaya idiomatis** sering memakai iterator chain seperti ini—lebih ringkas, lebih cepat (compiler bisa optimasi lebih baik), dan lebih mudah dibaca setelah kamu terbiasa. Selamat, kamu baru saja menulis Rust seperti senior engineer.`,
    keyTakeaway:
      "Borrow data dengan `&` saat kamu cuma butuh baca; gaya iterator chain (`.iter().sum()`) adalah idiom Rust yang ringkas dan cepat.",
  },
  {
    slideNumber: 10,
    type: "quiz",
    title: "Kuis Akhir Modul: Uji Pemahaman Rust Dasar",
    content:
      "Saatnya cek seberapa paham kamu dengan dasar Rust. Sistem akan mengacak 5 soal dari bank kuis kami—lulus jika nilai ≥ 80.",
    quiz: {
      questions: [],
      passingScore: 80,
      totalQuestions: 5,
      timeLimit: 300,
    },
  },
];

const rustDasarQuizBank = [
  {
    id: "rust-q1",
    question: "Apa kegunaan macro `println!` di Rust?",
    options: [
      { id: "a", text: "Membuka koneksi internet" },
      { id: "b", text: "Mencetak teks ke layar (stdout)" },
      { id: "c", text: "Mendefinisikan variabel baru" },
      { id: "d", text: "Membuat loop infinite" },
    ],
    correctAnswer: "b",
    explanation:
      "`println!` adalah macro standar untuk mencetak teks ke standard output, dengan newline di akhir.",
    difficulty: "easy",
  },
  {
    id: "rust-q2",
    question: "Bagaimana cara mendeklarasikan variabel yang BISA diubah di Rust?",
    options: [
      { id: "a", text: "let x = 5" },
      { id: "b", text: "let mut x = 5" },
      { id: "c", text: "var x = 5" },
      { id: "d", text: "const x = 5" },
    ],
    correctAnswer: "b",
    explanation:
      "Tambahkan keyword `mut` setelah `let` untuk membuat variabel yang bisa diubah. Default Rust adalah immutable.",
    difficulty: "easy",
  },
  {
    id: "rust-q3",
    question: "Karakter apa yang menandai pemanggilan macro di Rust?",
    options: [
      { id: "a", text: "?" },
      { id: "b", text: "!" },
      { id: "c", text: "#" },
      { id: "d", text: "@" },
    ],
    correctAnswer: "b",
    explanation:
      "Tanda `!` di akhir nama membedakan macro dari fungsi biasa (contoh: `println!`, `vec!`, `format!`).",
    difficulty: "easy",
  },
  {
    id: "rust-q4",
    question:
      "Apa tipe data integer 32-bit signed default di Rust?",
    options: [
      { id: "a", text: "int" },
      { id: "b", text: "integer" },
      { id: "c", text: "i32" },
      { id: "d", text: "number" },
    ],
    correctAnswer: "c",
    explanation:
      "Rust pakai notasi eksplisit: `i32` untuk integer 32-bit signed (default jika kamu tidak menulis tipe).",
    difficulty: "easy",
  },
  {
    id: "rust-q5",
    question: "Apa yang dimaksud dengan ownership di Rust?",
    options: [
      { id: "a", text: "Hak akses file di sistem operasi" },
      {
        id: "b",
        text: "Setiap nilai punya satu pemilik, dan memori dibebaskan saat pemilik keluar dari scope",
      },
      { id: "c", text: "Sistem login multi-user" },
      { id: "d", text: "Cara enkripsi data privat" },
    ],
    correctAnswer: "b",
    explanation:
      "Ownership adalah sistem manajemen memori Rust: tiap nilai punya satu owner, dan memori otomatis dibersihkan saat owner keluar scope. Tanpa GC.",
    difficulty: "medium",
  },
  {
    id: "rust-q6",
    question: "Tanda apa yang dipakai untuk meminjam (borrow) sebuah nilai?",
    options: [
      { id: "a", text: "*" },
      { id: "b", text: "&" },
      { id: "c", text: "#" },
      { id: "d", text: "@" },
    ],
    correctAnswer: "b",
    explanation:
      "Tanda `&` digunakan untuk borrow (referensi). `&T` adalah immutable borrow, `&mut T` adalah mutable borrow.",
    difficulty: "medium",
  },
  {
    id: "rust-q7",
    question: "Bagaimana cara menulis return type pada fungsi Rust?",
    options: [
      { id: "a", text: "function name() returns Type {}" },
      { id: "b", text: "fn name() => Type {}" },
      { id: "c", text: "fn name() -> Type {}" },
      { id: "d", text: "fn name(): Type {}" },
    ],
    correctAnswer: "c",
    explanation:
      "Sintaks return type Rust pakai panah `->` setelah parameter: `fn name(...) -> Type { ... }`.",
    difficulty: "medium",
  },
  {
    id: "rust-q8",
    question:
      "Manakah yang BENAR tentang aturan borrowing di Rust?",
    options: [
      { id: "a", text: "Boleh punya banyak mutable borrow bersamaan" },
      { id: "b", text: "Tidak boleh ada mutable borrow sama sekali" },
      {
        id: "c",
        text: "Boleh banyak immutable borrow ATAU satu mutable borrow—tidak bisa keduanya bersamaan",
      },
      { id: "d", text: "Boleh bebas tanpa batasan" },
    ],
    correctAnswer: "c",
    explanation:
      "Aturan borrow checker: banyak immutable borrow OK, atau satu mutable borrow OK—tapi keduanya bersamaan tidak. Ini mencegah data race di compile-time.",
    difficulty: "medium",
  },
  {
    id: "rust-q9",
    question:
      "Apa yang terjadi jika sebuah `String` di-move ke variabel atau fungsi lain?",
    options: [
      { id: "a", text: "Variabel asli masih bisa dipakai seperti semula" },
      {
        id: "b",
        text: "Variabel asli jadi tidak valid—Rust mencegah double-free dengan move semantics",
      },
      { id: "c", text: "Rust otomatis menyalin (clone) dan keduanya valid" },
      { id: "d", text: "Selalu compile error tanpa pengecualian" },
    ],
    correctAnswer: "b",
    explanation:
      "Setelah move, variabel asli tidak valid. Compiler akan menolak penggunaan setelah move. Ini mencegah double-free bug yang umum di C/C++.",
    difficulty: "hard",
  },
  {
    id: "rust-q10",
    question:
      "Apa output dari kode ini: `let x = 5; let x = x + 1; let x = x * 2; println!(\"{}\", x);`",
    options: [
      { id: "a", text: "Compile error karena re-declare x" },
      { id: "b", text: "5" },
      { id: "c", text: "12" },
      { id: "d", text: "11" },
    ],
    correctAnswer: "c",
    explanation:
      "Ini disebut shadowing—Rust mengizinkan deklarasi ulang dengan `let`. x = 5, lalu shadow ke 6, lalu shadow ke 12. Berbeda dari `mut` karena setiap `let` membuat variabel baru.",
    difficulty: "hard",
  },
];

const rustDasarCourse: Batch5Course = {
  title: "Belajar Rust Dasar",
  slug: "belajar-rust-dasar",
  description:
    "Mulai perjalananmu menguasai Rust—bahasa sistem modern yang aman, cepat, dan paling dicintai developer dunia. Pelajari sintaks dasar hingga konsep ownership dari nol.",
  difficulty: Difficulty.BEGINNER,
  isPremium: false,
  language: "id",
  isPublished: true,
  totalModules: 1,
  modules: [
    {
      title: "Pondasi Rust — Memory Safety Tanpa Garbage Collector",
      slug: "pondasi-rust",
      order: 1,
      xpReward: 50,
      sources: [
        {
          type: "YOUTUBE",
          title: "Tutorial Rust — Programmer Zaman Now (Bahasa Indonesia)",
          url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH-eZEVNvpvKULzy460jbynw",
        },
        {
          type: "DOCUMENTATION",
          title: "The Rust Programming Language — Official Book",
          url: "https://doc.rust-lang.org/book/",
        },
        {
          type: "ARTICLE",
          title: "Dasar Pemrograman Rust — Noval Agung (Bahasa Indonesia)",
          url: "https://dasarpemrogramanrust.novalagung.com",
        },
      ],
      contentObject: {
        slides: rustDasarSlides,
        quizBank: rustDasarQuizBank,
      },
    },
  ],
};

// ──────────────────────────────────────────────────────────────────────────
// Course 2 — TypeScript Lanjutan (Premium)
// 3 modul × 15 slide, dengan challenge & quiz lengkap.
// Konten modul disimpan di file terpisah biar maintainable.
// ──────────────────────────────────────────────────────────────────────────

const typescriptLanjutanCourse: Batch5Course = {
  title: "TypeScript Lanjutan — Generics, Utility Types, Advanced Patterns",
  slug: "typescript-lanjutan",
  description:
    "Naik level dari TypeScript Dasar ke fitur paling powerful: generics, utility types, mapped types, conditional types, dan infer. Bekal wajib untuk membaca dan menulis kode TypeScript professional di startup teknologi besar.",
  difficulty: Difficulty.ADVANCED,
  isPremium: true,
  language: "id",
  isPublished: true,
  totalModules: 3,
  modules: [
    {
      title: tsLanjutanModule1.title,
      slug: tsLanjutanModule1.slug,
      order: tsLanjutanModule1.order,
      xpReward: tsLanjutanModule1.xpReward,
      sources: [
        {
          type: "YOUTUBE",
          title: "Tutorial TypeScript — Programmer Zaman Now (Bahasa Indonesia)",
          url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH9jIdygiF4vTIs4Xpo_cHhC",
        },
        {
          type: "DOCUMENTATION",
          title: "TypeScript Handbook — Generics",
          url: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        },
        {
          type: "ARTICLE",
          title: "TypeScript Generics Explained — Zero To Mastery",
          url: "https://zerotomastery.io/blog/typescript-generics-explained/",
        },
      ],
      contentObject: {
        slides: tsLanjutanModule1.slides,
        quizBank: tsLanjutanModule1.quizBank,
      },
    },
    {
      title: tsLanjutanModule2.title,
      slug: tsLanjutanModule2.slug,
      order: tsLanjutanModule2.order,
      xpReward: tsLanjutanModule2.xpReward,
      sources: [
        {
          type: "YOUTUBE",
          title: "Tutorial TypeScript — Programmer Zaman Now (Bahasa Indonesia)",
          url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH9jIdygiF4vTIs4Xpo_cHhC",
        },
        {
          type: "DOCUMENTATION",
          title: "TypeScript Handbook — Utility Types",
          url: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        },
        {
          type: "ARTICLE",
          title: "TypeScript Utility Types — W3Schools",
          url: "https://www.w3schools.com/typescript/typescript_utility_types.php",
        },
      ],
      contentObject: {
        slides: tsLanjutanModule2.slides,
        quizBank: tsLanjutanModule2.quizBank,
      },
    },
    {
      title: tsLanjutanModule3.title,
      slug: tsLanjutanModule3.slug,
      order: tsLanjutanModule3.order,
      xpReward: tsLanjutanModule3.xpReward,
      sources: [
        {
          type: "YOUTUBE",
          title: "Tutorial TypeScript — Programmer Zaman Now (Bahasa Indonesia)",
          url: "https://www.youtube.com/playlist?list=PL-CtdCApEFH9jIdygiF4vTIs4Xpo_cHhC",
        },
        {
          type: "DOCUMENTATION",
          title: "TypeScript Handbook — Mapped Types",
          url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
        },
        {
          type: "DOCUMENTATION",
          title: "TypeScript Handbook — Conditional & Template Literal Types",
          url: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
        },
      ],
      contentObject: {
        slides: tsLanjutanModule3.slides,
        quizBank: tsLanjutanModule3.quizBank,
      },
    },
  ],
};

export const batch5Courses: Batch5Course[] = [
  rustDasarCourse,
  typescriptLanjutanCourse,
];

// Re-export quiz bank Rust Dasar buat kebutuhan static-quizzes.ts.
export { rustDasarQuizBank };
