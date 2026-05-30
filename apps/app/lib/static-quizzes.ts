// Static quiz bank untuk course gratis (free tier).
// Tidak boleh panggil AI/API untuk free course — kuis selalu di-random dari
// pool ini. Lookup berlapis: courseSlug → categorySlug → "default".
//
// Cara nambah soal baru:
//  1. Kalau soal khusus untuk satu course, pakai key = course.slug.
//  2. Kalau soal generik untuk semua course di kategori, pakai key = category.slug.
//  3. "default" dipakai kalau dua-duanya nggak ketemu.

export type StaticQuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export type StaticQuizLookup = {
  courseSlug?: string | null;
  categorySlug?: string | null;
};

// ──────────────────────────────────────────────────────────────────────────
// POOL — kunci bisa course slug ATAU category slug.
// ──────────────────────────────────────────────────────────────────────────
export const STATIC_QUIZ_POOL: Record<string, StaticQuizQuestion[]> = {
  // ───── COURSE SLUG: dasar-html-css (Web Development, Free) ─────
  "dasar-html-css": [
    {
      question: "Apa singkatan dari HTML?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Layout",
        "Hyper Tabular Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      question: "Tag manakah yang digunakan untuk membuat heading TERBESAR?",
      options: ["<h6>", "<h1>", "<head>", "<heading>"],
      correctAnswer: 1,
    },
    {
      question: "Atribut HTML mana yang dipakai untuk menampilkan tooltip teks saat hover?",
      options: ["alt", "title", "tooltip", "label"],
      correctAnswer: 1,
    },
    {
      question:
        "Bagaimana cara menambahkan komentar di HTML agar tidak ditampilkan ke user?",
      options: [
        "// ini komentar",
        "/* ini komentar */",
        "<!-- ini komentar -->",
        "# ini komentar",
      ],
      correctAnswer: 2,
    },
    {
      question: "Tag apa yang dipakai untuk membuat gambar di HTML?",
      options: ["<picture>", "<img>", "<image>", "<media>"],
      correctAnswer: 1,
    },
    {
      question:
        "Properti CSS mana yang digunakan untuk mengubah warna teks?",
      options: ["text-color", "font-color", "color", "fgcolor"],
      correctAnswer: 2,
    },
    {
      question: "Selector CSS untuk menargetkan elemen berdasarkan ID adalah?",
      options: ["#nama-id", ".nama-id", "*nama-id", "@nama-id"],
      correctAnswer: 0,
    },
    {
      question: "Apa fungsi properti CSS 'display: flex'?",
      options: [
        "Menyembunyikan elemen",
        "Mengaktifkan layout flexbox untuk mengatur child elements",
        "Membuat teks menjadi bold",
        "Menambahkan animasi",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Box model di CSS dari dalam ke luar urutannya adalah?",
      options: [
        "margin → border → padding → content",
        "content → padding → border → margin",
        "padding → content → margin → border",
        "border → margin → padding → content",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Unit CSS mana yang RELATIF terhadap ukuran font elemen induk (parent)?",
      options: ["px", "em", "vw", "cm"],
      correctAnswer: 1,
    },
    {
      question: "Apa fungsi tag <head> di HTML?",
      options: [
        "Menampilkan judul utama halaman",
        "Menyimpan metadata (title, link CSS, dsb) yang TIDAK terlihat user",
        "Membuat menu navigasi",
        "Tag untuk header visual halaman",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Manakah cara TERBAIK menyertakan file CSS eksternal di HTML?",
      options: [
        "<style src='style.css'>",
        "<link rel='stylesheet' href='style.css'>",
        "<css href='style.css'>",
        "<import css='style.css'>",
      ],
      correctAnswer: 1,
    },
  ],

  // ───── COURSE SLUG: belajar-javascript-dasar (Web Development, Free) ─────
  "belajar-javascript-dasar": [
    {
      question:
        "Cara TEPAT mendeklarasikan variabel yang nilainya tidak akan berubah di JS modern?",
      options: ["var nama", "let nama", "const nama", "static nama"],
      correctAnswer: 2,
    },
    {
      question: "Operator apa yang digunakan untuk perbandingan STRICT EQUAL?",
      options: ["==", "===", "!=", "="],
      correctAnswer: 1,
    },
    {
      question: "Apa output dari `typeof []` di JavaScript?",
      options: ["array", "object", "list", "undefined"],
      correctAnswer: 1,
    },
    {
      question:
        "Method apa yang dipakai untuk menambahkan elemen di AKHIR sebuah array?",
      options: [".pop()", ".push()", ".shift()", ".unshift()"],
      correctAnswer: 1,
    },
    {
      question: "Hasil dari `1 + '2'` di JavaScript adalah?",
      options: ["3", "12", "'12'", "Error"],
      correctAnswer: 2,
    },
    {
      question:
        "Manakah yang BUKAN tipe data primitif di JavaScript?",
      options: ["string", "number", "boolean", "object"],
      correctAnswer: 3,
    },
    {
      question: "Apa fungsi keyword 'return' dalam sebuah function?",
      options: [
        "Mengakhiri function dan mengirim nilai balik",
        "Mengulang eksekusi function",
        "Membuat function async",
        "Memanggil function lain",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Cara TEPAT membuat arrow function yang menerima 2 parameter?",
      options: [
        "(a, b) => a + b",
        "function (a, b) -> a + b",
        "[a, b] => a + b",
        "a, b => a + b",
      ],
      correctAnswer: 0,
    },
    {
      question: "Apa hasil dari `[1, 2, 3].length`?",
      options: ["1", "2", "3", "undefined"],
      correctAnswer: 2,
    },
    {
      question: "Method apa yang dipakai untuk memilih elemen DOM berdasarkan id?",
      options: [
        "document.querySelectorAll('id')",
        "document.getElementsByTagName(id)",
        "document.getElementById('id')",
        "document.findId('id')",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Method JSON yang mengubah object JS menjadi string JSON adalah?",
      options: ["JSON.parse()", "JSON.toString()", "JSON.stringify()", "JSON.encode()"],
      correctAnswer: 2,
    },
    {
      question:
        "Manakah cara yang BENAR untuk menulis komentar satu baris di JS?",
      options: ["<!-- komen -->", "# komen", "// komen", "** komen **"],
      correctAnswer: 2,
    },
  ],

  // ───── COURSE SLUG: belajar-golang-dasar (Backend Development, Free) ─────
  "belajar-golang-dasar": [
    {
      question: "Siapa yang awalnya mengembangkan bahasa Go (Golang)?",
      options: ["Microsoft", "Apple", "Google", "Mozilla"],
      correctAnswer: 2,
    },
    {
      question:
        "Manakah cara yang BENAR untuk mendeklarasikan variabel di Go dengan inisialisasi nilai?",
      options: [
        "var x = 5",
        "x := 5",
        "Keduanya valid",
        "let x = 5",
      ],
      correctAnswer: 2,
    },
    {
      question: "Apa fungsi dari keyword 'package main' di Go?",
      options: [
        "Menandai file ini sebagai library",
        "Menandai file ini sebagai entry point program executable",
        "Sekadar dokumentasi",
        "Mengimpor modul",
      ],
      correctAnswer: 1,
    },
    {
      question: "Function apa yang otomatis dieksekusi pertama kali oleh Go runtime?",
      options: ["start()", "run()", "init() saja", "main()"],
      correctAnswer: 3,
    },
    {
      question:
        "Apa ciri utama dari 'goroutine' di Go?",
      options: [
        "Sebuah class warisan dari thread Java",
        "Lightweight thread yang dieksekusi secara concurrent",
        "File konfigurasi runtime",
        "Tipe data baru di Go 1.21",
      ],
      correctAnswer: 1,
    },
    {
      question: "Operator apa untuk men-deklarasikan goroutine?",
      options: ["async", "go", "thread", "run"],
      correctAnswer: 1,
    },
    {
      question: "Apa fungsi dari 'channel' di Go?",
      options: [
        "Library HTTP",
        "Mekanisme komunikasi antar goroutine",
        "Sistem logging",
        "Database driver",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Manakah pernyataan yang BENAR tentang error handling di Go?",
      options: [
        "Go pakai try/catch seperti Java",
        "Go return nilai error sebagai value yang harus dicek manual",
        "Go otomatis menangani semua error",
        "Error di Go selalu fatal",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa hasil compile Go: file binary atau bytecode?",
      options: [
        "Bytecode (mirip Java JVM)",
        "Native binary executable",
        "Interpreter file",
        "Source code",
      ],
      correctAnswer: 1,
    },
    {
      question: "Manakah yang BUKAN fitur native bahasa Go?",
      options: [
        "Garbage collector",
        "Goroutine concurrency",
        "Class inheritance multilevel",
        "Interface implicit",
      ],
      correctAnswer: 2,
    },
    {
      question: "Apa kepanjangan dari 'gofmt'?",
      options: [
        "Go Format",
        "Go File Manager Tool",
        "Go Function Manager",
        "Global Function Format",
      ],
      correctAnswer: 0,
    },
  ],

  // ───── COURSE SLUG: bahasa-korea-dasar-topik-1-lengkap (Bahasa Asing, Free) ─────
  "bahasa-korea-dasar-topik-1-lengkap": [
    {
      question: "Apa nama alfabet/aksara resmi Bahasa Korea?",
      options: ["Hiragana", "Hanzi", "Hangul", "Hanja"],
      correctAnswer: 2,
    },
    {
      question: "Bagaimana cara mengucapkan 'Halo' (sapaan formal) dalam Bahasa Korea?",
      options: ["곤니찌와 (Konnichiwa)", "안녕하세요 (Annyeonghaseyo)", "你好 (Ni Hao)", "사랑해 (Saranghae)"],
      correctAnswer: 1,
    },
    {
      question: "Apa arti dari kata '감사합니다' (gamsahamnida)?",
      options: ["Maaf", "Terima kasih", "Selamat tinggal", "Apa kabar"],
      correctAnswer: 1,
    },
    {
      question:
        "Hangul terdiri dari berapa konsonan dan vokal dasar?",
      options: [
        "10 konsonan dan 10 vokal",
        "14 konsonan dan 10 vokal",
        "20 konsonan dan 14 vokal",
        "5 konsonan dan 5 vokal",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Karakter Hangul ditulis dengan menyusun konsonan dan vokal dalam satu blok yang disebut?",
      options: ["Stroke", "Suku kata (syllable block)", "Radikal", "Glyph"],
      correctAnswer: 1,
    },
    {
      question: "Bagaimana cara mengatakan 'Maaf' dalam Bahasa Korea (formal)?",
      options: [
        "안녕히 가세요 (Annyeonghi gaseyo)",
        "죄송합니다 (Joesonghamnida)",
        "괜찮아요 (Gwaenchanayo)",
        "사랑해요 (Saranghaeyo)",
      ],
      correctAnswer: 1,
    },
    {
      question: "Karakter '아' dibaca sebagai bunyi?",
      options: ["I", "A", "E", "O"],
      correctAnswer: 1,
    },
    {
      question: "Karakter '저' artinya?",
      options: ["Saya (formal)", "Kamu", "Mereka", "Kami"],
      correctAnswer: 0,
    },
    {
      question: "Penanda topik kalimat dalam Bahasa Korea adalah?",
      options: ["은/는 (eun/neun)", "을/를 (eul/reul)", "에 (e)", "도 (do)"],
      correctAnswer: 0,
    },
    {
      question:
        "Sistem urutan penulisan tanggal yang umum di Korea adalah?",
      options: [
        "Hari/Bulan/Tahun",
        "Bulan/Hari/Tahun",
        "Tahun/Bulan/Hari",
        "Tahun/Hari/Bulan",
      ],
      correctAnswer: 2,
    },
  ],

  // ───── COURSE SLUG: dasar-typescript (Pemrograman, Free) ─────
  "dasar-typescript": [
    {
      question:
        "Apa keuntungan utama menggunakan TypeScript dibandingkan JavaScript?",
      options: [
        "Kodenya berjalan lebih cepat di browser",
        "Menemukan error tipe data sebelum kode dijalankan",
        "Ukurannya lebih kecil",
        "Tidak butuh server",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Tipe data apa yang digunakan untuk menyatakan 'benar' atau 'salah' di TypeScript?",
      options: ["bool", "Boolean", "boolean", "truthy"],
      correctAnswer: 2,
    },
    {
      question:
        "Bagaimana cara memberi tipe data 'angka' pada variabel 'umur'?",
      options: [
        "let umur: number = 25;",
        "let umur: Number = 25;",
        "let umur = number(25);",
        "let umur as number = 25;",
      ],
      correctAnswer: 0,
    },
    {
      question: "Apa yang dimaksud dengan Type Inference?",
      options: [
        "Kemampuan TypeScript menebak tipe data secara otomatis",
        "Proses mengubah JavaScript menjadi TypeScript",
        "Pengecekan error pada saat runtime",
        "Error karena tipe data tidak cocok",
      ],
      correctAnswer: 0,
    },
    {
      question: "Mengapa tipe 'any' sebaiknya dihindari?",
      options: [
        "Karena 'any' menyebabkan runtime error",
        "Karena 'any' lebih lambat",
        "Karena 'any' mematikan pengecekan tipe statis TypeScript",
        "Karena 'any' memakan banyak memori",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Apa tipe pengembalian (return type) untuk fungsi yang tidak mengembalikan nilai apapun?",
      options: ["null", "undefined", "void", "empty"],
      correctAnswer: 2,
    },
    {
      question: "Bagaimana cara membuat array yang hanya boleh berisi angka?",
      options: [
        "let arr: array<number>",
        "let arr: number[]",
        "let arr = [number]",
        "let arr: Array[number]",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Keyword apa yang digunakan untuk membuat kerangka/blueprint sebuah objek?",
      options: ["class", "struct", "interface", "object"],
      correctAnswer: 2,
    },
    {
      question: "Apa fungsi dari tanda tanya (?) pada definisi interface?",
      options: [
        "Menandakan tipe data belum diketahui",
        "Membuat properti menjadi opsional (boleh tidak diisi)",
        "Untuk melakukan kondisi ternary",
        "Tidak ada fungsi",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa arti dari tipe `string | number`?",
      options: [
        "Variabel harus berupa string DAN number bersamaan",
        "Variabel bisa bertipe string ATAU number",
        "Variabel akan dikonversi dari string ke number",
        "Error sintaks",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Bagaimana cara mendefinisikan tipe objek di dalam array (Array of Objects)?",
      options: [
        "User[]",
        "Array<User>",
        "User[] dan Array<User> dua-duanya valid",
        "User[Array]",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Apa yang terjadi jika kita tidak mengisi properti yang WAJIB pada Interface?",
      options: [
        "TypeScript otomatis mengisinya dengan undefined",
        "Sistem akan diam saja",
        "TypeScript memberikan error compile-time",
        "Error baru muncul saat kode di-run",
      ],
      correctAnswer: 2,
    },
  ],

  // ───── CATEGORY SLUG: web-development ─────
  "web-development": [
    {
      question: "Apa peran utama HTML dalam pembangunan web?",
      options: [
        "Menambah interaktivitas",
        "Memberi struktur dan konten halaman",
        "Mengatur styling visual",
        "Mengelola server",
      ],
      correctAnswer: 1,
    },
    {
      question: "CSS singkatan dari?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Coded Stylesheet Specification",
      ],
      correctAnswer: 0,
    },
    {
      question: "JavaScript paling sering dipakai untuk?",
      options: [
        "Style halaman",
        "Membangun struktur halaman",
        "Menambahkan logika dan interaktivitas",
        "Membuat database",
      ],
      correctAnswer: 2,
    },
    {
      question: "Manakah HTTP method yang biasa dipakai untuk MENGIRIM data baru?",
      options: ["GET", "POST", "DELETE", "PATCH"],
      correctAnswer: 1,
    },
    {
      question: "Apa kepanjangan dari DOM?",
      options: [
        "Document Object Model",
        "Data Object Map",
        "Dynamic Object Method",
        "Distributed Object Model",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Mana framework/library JavaScript untuk membangun antarmuka?",
      options: ["Laravel", "Django", "React", "Spring Boot"],
      correctAnswer: 2,
    },
    {
      question: "Apa fungsi utama browser developer tools (DevTools)?",
      options: [
        "Mengupload file ke server",
        "Inspect element, network, dan debug JavaScript",
        "Membuat domain baru",
        "Mengganti DNS",
      ],
      correctAnswer: 1,
    },
    {
      question: "Status HTTP 200 menandakan?",
      options: ["Not Found", "Server Error", "Success", "Redirect"],
      correctAnswer: 2,
    },
    {
      question: "Properti CSS untuk membuat layout grid 2 dimensi adalah?",
      options: ["display: block", "display: inline", "display: grid", "display: table"],
      correctAnswer: 2,
    },
    {
      question: "Apa peran package.json di proyek Node.js modern?",
      options: [
        "Menyimpan password user",
        "Mendaftar dependency, script, dan metadata project",
        "Compile kode TypeScript",
        "Menjalankan server otomatis",
      ],
      correctAnswer: 1,
    },
  ],

  // ───── CATEGORY SLUG: backend-development ─────
  "backend-development": [
    {
      question: "Apa peran utama dari sebuah server backend?",
      options: [
        "Render UI ke browser",
        "Menerima request, memproses logika, dan kembalikan data",
        "Menyimpan file desain",
        "Hanya untuk hosting gambar",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa singkatan dari API?",
      options: [
        "Application Programming Interface",
        "Automated Process Indicator",
        "Async Process Integration",
        "Advanced Protocol Implementation",
      ],
      correctAnswer: 0,
    },
    {
      question: "REST API biasanya bertukar data dalam format?",
      options: ["XML / JSON", "MP4", "PDF", "ZIP"],
      correctAnswer: 0,
    },
    {
      question: "Manakah yang merupakan database RELASIONAL?",
      options: ["MongoDB", "Redis", "PostgreSQL", "Cassandra"],
      correctAnswer: 2,
    },
    {
      question: "Manakah HTTP method yang IDEMPOTEN?",
      options: ["POST", "GET", "PATCH (kadang)", "GET dan PUT keduanya idempoten"],
      correctAnswer: 3,
    },
    {
      question: "Apa kegunaan ORM (Object-Relational Mapping)?",
      options: [
        "Mengompresi gambar",
        "Mapping antara objek di kode dengan tabel database",
        "Mengatur DNS",
        "Generate UI otomatis",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa keuntungan menggunakan environment variable untuk credential?",
      options: [
        "Lebih cepat dibaca",
        "Memisahkan rahasia dari source code yang bisa public",
        "Tidak butuh database",
        "Mengurangi ukuran image Docker",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa fungsi 'middleware' di framework backend?",
      options: [
        "File konfigurasi build",
        "Fungsi yang dieksekusi sebelum/sesudah handler utama",
        "Style sheet untuk API",
        "Format database",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa peran 'JWT' dalam sistem otentikasi?",
      options: [
        "Mengompresi file",
        "Token signed yang menyimpan klaim user dan bisa diverifikasi",
        "Bahasa pemrograman backend",
        "Database NoSQL",
      ],
      correctAnswer: 1,
    },
    {
      question: "Manakah cara aman menyimpan password di database?",
      options: [
        "Plain-text",
        "Hash dengan algoritma seperti bcrypt/argon2",
        "Encrypted dengan password sama untuk semua user",
        "Reversed string",
      ],
      correctAnswer: 1,
    },
  ],

  // ───── CATEGORY SLUG: bahasa-inggris ─────
  "bahasa-inggris": [
    {
      question:
        "Choose the correct sentence in Simple Present Tense:",
      options: [
        "She go to school every day.",
        "She goes to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the past form of 'eat'?",
      options: ["eaten", "eated", "ate", "eats"],
      correctAnswer: 2,
    },
    {
      question: "Which sentence uses Present Continuous correctly?",
      options: [
        "I am studying English now.",
        "I studying English now.",
        "I studied English now.",
        "I am study English now.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Choose the correct article: 'I saw ___ elephant at the zoo.'",
      options: ["a", "an", "the", "—"],
      correctAnswer: 1,
    },
    {
      question:
        "Pilih kalimat dengan Present Perfect yang BENAR:",
      options: [
        "I have eat breakfast.",
        "I has eaten breakfast.",
        "I have eaten breakfast.",
        "I am eaten breakfast.",
      ],
      correctAnswer: 2,
    },
    {
      question: "Antonim dari kata 'happy' adalah?",
      options: ["sad", "smart", "tall", "cheap"],
      correctAnswer: 0,
    },
    {
      question: "Plural form yang BENAR dari 'child'?",
      options: ["childs", "childes", "children", "childen"],
      correctAnswer: 2,
    },
    {
      question: "Pilih preposisi yang TEPAT: 'She is good ___ math.'",
      options: ["in", "on", "at", "for"],
      correctAnswer: 2,
    },
    {
      question: "Modal verb 'must' berarti?",
      options: ["pilihan", "kemampuan", "keharusan", "kemungkinan kecil"],
      correctAnswer: 2,
    },
    {
      question:
        "Manakah penggunaan 'a' dan 'an' yang BENAR?",
      options: [
        "an university",
        "a apple",
        "an hour",
        "a egg",
      ],
      correctAnswer: 2,
    },
  ],

  // ───── CATEGORY SLUG: bahasa-asing-lainnya ─────
  "bahasa-asing-lainnya": [
    {
      question: "Bahasa Mandarin ditulis dengan sistem aksara?",
      options: ["Hangul", "Kanji", "Hanzi", "Hiragana"],
      correctAnswer: 2,
    },
    {
      question: "Bahasa Jepang punya 3 sistem tulisan utama, yaitu?",
      options: [
        "Hiragana, Katakana, Hanzi",
        "Hiragana, Katakana, Kanji",
        "Hangul, Hiragana, Romaji",
        "Hanzi, Pinyin, Katakana",
      ],
      correctAnswer: 1,
    },
    {
      question: "Sistem fonetik Latin untuk Bahasa Mandarin disebut?",
      options: ["Kana", "Pinyin", "Hangul", "Romaji"],
      correctAnswer: 1,
    },
    {
      question: "Bahasa Jepang umumnya menggunakan urutan kalimat?",
      options: [
        "Subjek-Verba-Objek (SVO)",
        "Subjek-Objek-Verba (SOV)",
        "Verba-Subjek-Objek (VSO)",
        "Tidak ada urutan tetap",
      ],
      correctAnswer: 1,
    },
    {
      question: "Aksara Hangul dipakai oleh bahasa apa?",
      options: ["Mandarin", "Jepang", "Korea", "Vietnam"],
      correctAnswer: 2,
    },
    {
      question:
        "Mana yang merupakan sapaan 'Halo' dalam Bahasa Mandarin?",
      options: ["你好 (Nǐ hǎo)", "안녕 (Annyeong)", "Bonjour", "こんにちは (Konnichiwa)"],
      correctAnswer: 0,
    },
    {
      question:
        "Kata 'Arigatou' dalam Bahasa Jepang berarti?",
      options: ["Maaf", "Terima kasih", "Selamat malam", "Permisi"],
      correctAnswer: 1,
    },
    {
      question:
        "Belajar bahasa baru paling efektif dilakukan dengan?",
      options: [
        "Hanya menghafal grammar",
        "Eksposur konsisten + praktik berbicara dan mendengar",
        "Belajar maraton 1 hari",
        "Hanya membaca buku tata bahasa",
      ],
      correctAnswer: 1,
    },
  ],

  // ───── CATEGORY SLUG: pemrograman ─────
  pemrograman: [
    {
      question: "Apa singkatan dari HTML?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Tabular Markup Language",
        "Hot Mail Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Properti CSS mana yang digunakan untuk mengubah warna latar belakang?",
      options: ["color", "background-color", "bgcolor", "background-image"],
      correctAnswer: 1,
    },
    {
      question: "Tag HTML mana yang digunakan untuk menyisipkan JavaScript?",
      options: ["<js>", "<scripting>", "<javascript>", "<script>"],
      correctAnswer: 3,
    },
    {
      question:
        "Di mana lokasi yang benar untuk merujuk style sheet eksternal (CSS)?",
      options: [
        "Di bagian <body>",
        "Di bagian <head>",
        "Di bagian akhir dokumen",
        "Bisa di mana saja",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa peran dari file package.json dalam proyek Node.js?",
      options: [
        "Menyimpan kode database",
        "Menyimpan konfigurasi dan daftar dependency",
        "Memulai server otomatis",
        "Mengkompilasi kode",
      ],
      correctAnswer: 1,
    },
    {
      question: "Framework mana yang merupakan framework CSS?",
      options: ["React", "Laravel", "Tailwind CSS", "Django"],
      correctAnswer: 2,
    },
    {
      question: "Apa kepanjangan dari DOM?",
      options: [
        "Document Object Model",
        "Data Object Model",
        "Document Oriented Model",
        "Digital Object Method",
      ],
      correctAnswer: 0,
    },
    {
      question: "Simbol mana yang digunakan untuk class selector di CSS?",
      options: ["#", ".", "*", "@"],
      correctAnswer: 1,
    },
    {
      question: "Apa itu React.js?",
      options: [
        "Framework PHP",
        "Library JavaScript untuk membangun UI",
        "Database relasional",
        "Sistem operasi",
      ],
      correctAnswer: 1,
    },
    {
      question: "Fungsi utama dari Git adalah?",
      options: [
        "Version control system",
        "Teks editor",
        "Compiler",
        "Hosting server",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Metode HTTP mana yang digunakan untuk mengirim data baru ke server?",
      options: ["GET", "POST", "DELETE", "OPTIONS"],
      correctAnswer: 1,
    },
    {
      question: "Status HTTP 404 menandakan apa?",
      options: [
        "Internal Server Error",
        "Unauthorized",
        "Not Found",
        "Bad Request",
      ],
      correctAnswer: 2,
    },
    {
      question: "Apa kegunaan dari JWT (JSON Web Token)?",
      options: [
        "Mengenkripsi database",
        "Otentikasi dan transmisi data secara aman",
        "Mengompresi gambar",
        "Load balancing",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Manakah metode keamanan yang TEPAT untuk melindungi password di database?",
      options: [
        "Menyimpan dalam plain-text",
        "Hashing dan salting",
        "Kompresi ZIP",
        "Mengenkripsi dengan password sendiri",
      ],
      correctAnswer: 1,
    },
    {
      question: "Apa itu API?",
      options: [
        "Application Programming Interface",
        "Advanced Program Integration",
        "Automated Process Indicator",
        "Application Process Information",
      ],
      correctAnswer: 0,
    },
  ],

  // ───── CATEGORY SLUG: matematika ─────
  matematika: [
    {
      question: "Hasil dari 2³ × 2² adalah?",
      options: ["32", "16", "10", "64"],
      correctAnswer: 0,
    },
    {
      question: "Manakah yang merupakan bilangan prima?",
      options: ["9", "15", "17", "21"],
      correctAnswer: 2,
    },
    {
      question: "Rumus luas lingkaran adalah?",
      options: ["2πr", "πr²", "πd", "πr"],
      correctAnswer: 1,
    },
    {
      question: "Apa hasil dari log₁₀(1000)?",
      options: ["1", "2", "3", "10"],
      correctAnswer: 2,
    },
    {
      question: "Berapa rata-rata (mean) dari 4, 8, 6, 2?",
      options: ["4", "5", "6", "20"],
      correctAnswer: 1,
    },
    {
      question:
        "Dalam aljabar, jika 2x + 3 = 11, berapa nilai x?",
      options: ["3", "4", "5", "8"],
      correctAnswer: 1,
    },
    {
      question: "Apa kepanjangan dari KPK dalam matematika?",
      options: [
        "Kelipatan Persekutuan Terkecil",
        "Komposisi Pemecahan Kalkulasi",
        "Kelompok Persamaan Kuadrat",
        "Konstanta Pemangkatan Konstan",
      ],
      correctAnswer: 0,
    },
    {
      question: "Hasil dari √144 adalah?",
      options: ["10", "11", "12", "14"],
      correctAnswer: 2,
    },
    {
      question:
        "Dalam statistika, ukuran yang menggambarkan persebaran data adalah?",
      options: ["Median", "Mean", "Standar deviasi", "Modus"],
      correctAnswer: 2,
    },
    {
      question:
        "Probabilitas mendapatkan angka 6 saat melempar satu dadu standar adalah?",
      options: ["1/2", "1/3", "1/6", "1/12"],
      correctAnswer: 2,
    },
  ],

  // ───── CATEGORY SLUG: sains ─────
  sains: [
    {
      question: "Atom terdiri dari?",
      options: [
        "Proton, neutron, dan elektron",
        "Proton dan elektron saja",
        "Hanya inti dan kulit",
        "Molekul kecil",
      ],
      correctAnswer: 0,
    },
    {
      question: "Hukum Newton ke-3 berbunyi?",
      options: [
        "F = m × a",
        "Setiap aksi ada reaksi yang sama besar dan berlawanan arah",
        "Benda diam akan tetap diam jika tidak ada gaya",
        "Energi tidak dapat diciptakan atau dimusnahkan",
      ],
      correctAnswer: 1,
    },
    {
      question: "Organel sel yang berfungsi sebagai 'pabrik energi' adalah?",
      options: [
        "Inti sel",
        "Mitokondria",
        "Ribosom",
        "Retikulum endoplasma",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Senyawa kimia dengan rumus H₂O adalah?",
      options: ["Hidrogen peroksida", "Air", "Asam klorida", "Karbon dioksida"],
      correctAnswer: 1,
    },
    {
      question: "Planet terbesar di tata surya kita adalah?",
      options: ["Bumi", "Mars", "Saturnus", "Jupiter"],
      correctAnswer: 3,
    },
    {
      question: "Proses tumbuhan memasak makanan disebut?",
      options: ["Respirasi", "Fotosintesis", "Transpirasi", "Osmosis"],
      correctAnswer: 1,
    },
    {
      question:
        "Satuan yang digunakan untuk mengukur intensitas suara adalah?",
      options: ["Hertz", "Watt", "Decibel", "Joule"],
      correctAnswer: 2,
    },
    {
      question: "Manakah yang merupakan sumber energi terbarukan?",
      options: ["Batu bara", "Gas alam", "Energi matahari", "Minyak bumi"],
      correctAnswer: 2,
    },
  ],

  // ───── CATEGORY SLUG: bahasa ─────
  bahasa: [
    {
      question:
        "Manakah kalimat dengan ejaan Bahasa Indonesia yang BENAR?",
      options: [
        "Saya pergi ke pasar untuk membeli apel.",
        "Saya pergi kepasar untuk membeli apel.",
        "Saya pergi ke-pasar untuk membeli apel.",
        "Saya pergi ke pasar untuk-membeli apel.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Apa antonim dari kata 'rajin'?",
      options: ["Pintar", "Malas", "Tekun", "Giat"],
      correctAnswer: 1,
    },
    {
      question:
        "What is the past tense of the irregular verb 'go'?",
      options: ["Goed", "Went", "Gone", "Going"],
      correctAnswer: 1,
    },
    {
      question:
        "Choose the correct sentence:",
      options: [
        "She don't like coffee.",
        "She doesn't likes coffee.",
        "She doesn't like coffee.",
        "She not like coffee.",
      ],
      correctAnswer: 2,
    },
    {
      question: "Apa arti kata 'beautiful' dalam Bahasa Indonesia?",
      options: ["Cantik / Indah", "Pintar", "Kuat", "Cepat"],
      correctAnswer: 0,
    },
    {
      question:
        "Which of these is a correct example of present continuous tense?",
      options: [
        "I go to school every day.",
        "I am going to school now.",
        "I went to school yesterday.",
        "I will go to school tomorrow.",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Kalimat 'Buku itu sedang dibaca oleh Andi' termasuk kalimat?",
      options: [
        "Aktif",
        "Pasif",
        "Imperatif",
        "Interogatif",
      ],
      correctAnswer: 1,
    },
    {
      question: "Choose the correct preposition: 'I am good ___ math.'",
      options: ["in", "at", "on", "for"],
      correctAnswer: 1,
    },
    {
      question:
        "What does 'frequently' mean?",
      options: [
        "Rarely (jarang)",
        "Often (sering)",
        "Never (tidak pernah)",
        "Always (selalu)",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Pilih sinonim yang TEPAT untuk kata 'cepat':",
      options: ["Lambat", "Pelan", "Lekas", "Diam"],
      correctAnswer: 2,
    },
  ],

  // ───── CATEGORY SLUG: desain ─────
  desain: [
    {
      question: "Apa yang dimaksud dengan 'kontras' dalam prinsip desain?",
      options: [
        "Pengulangan elemen yang sama",
        "Perbedaan antara dua elemen agar terlihat menonjol",
        "Penyusunan elemen secara simetris",
        "Penggunaan warna gelap saja",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Manakah yang termasuk warna primer dalam model RGB?",
      options: [
        "Merah, Kuning, Biru",
        "Merah, Hijau, Biru",
        "Cyan, Magenta, Yellow",
        "Hitam, Putih, Abu-abu",
      ],
      correctAnswer: 1,
    },
    {
      question: "Software apa yang umum digunakan untuk desain UI/UX?",
      options: ["Microsoft Word", "Figma", "Excel", "VS Code"],
      correctAnswer: 1,
    },
    {
      question: "Apa fungsi 'whitespace' dalam desain?",
      options: [
        "Memperbanyak elemen di layar",
        "Memberi ruang napas dan fokus pada konten",
        "Membuat halaman terlihat kosong",
        "Menambah ukuran file",
      ],
      correctAnswer: 1,
    },
    {
      question: "Format file apa yang TERBAIK untuk logo dengan resolusi tinggi?",
      options: ["JPG", "PNG", "SVG", "BMP"],
      correctAnswer: 2,
    },
    {
      question: "Apa kepanjangan dari UI dan UX?",
      options: [
        "User Interface dan User Experience",
        "Unique Identity dan User Extension",
        "User Index dan Universal Experience",
        "Unified Interface dan Unified Experience",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Prinsip desain yang berarti 'penyusunan elemen secara seimbang' adalah?",
      options: ["Hierarchy", "Balance", "Repetition", "Alignment"],
      correctAnswer: 1,
    },
    {
      question:
        "Tipografi yang umum dipakai untuk teks panjang dan mudah dibaca adalah?",
      options: ["Display font", "Script font", "Sans-serif", "Decorative"],
      correctAnswer: 2,
    },
  ],

  // ───── CATEGORY SLUG: data-science ─────
  "data-science": [
    {
      question:
        "Bahasa pemrograman apa yang paling sering digunakan dalam Data Science?",
      options: ["Python", "C#", "Ruby", "PHP"],
      correctAnswer: 0,
    },
    {
      question:
        "Library Python mana yang digunakan untuk manipulasi data tabular?",
      options: ["Matplotlib", "Pandas", "Flask", "PyGame"],
      correctAnswer: 1,
    },
    {
      question: "Apa fungsi dari Machine Learning?",
      options: [
        "Membuat komputer memahami HTML",
        "Membuat sistem belajar dari data tanpa diprogram eksplisit",
        "Memperbaiki hardware",
        "Mempercepat koneksi internet",
      ],
      correctAnswer: 1,
    },
    {
      question: "Manakah yang merupakan tipe Supervised Learning?",
      options: ["K-Means Clustering", "Regresi Linear", "PCA", "Apriori"],
      correctAnswer: 1,
    },
    {
      question: "Apa arti dari metrik Accuracy dalam Machine Learning?",
      options: [
        "Kecepatan model memproses data",
        "Persentase prediksi benar dari total prediksi",
        "Ukuran dataset",
        "Jumlah fitur yang digunakan",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Tools visualisasi mana yang merupakan library Python untuk membuat grafik?",
      options: ["Tableau", "Matplotlib", "Power BI", "Excel"],
      correctAnswer: 1,
    },
    {
      question:
        "Dalam pipeline Machine Learning, langkah 'train_test_split' digunakan untuk?",
      options: [
        "Membersihkan data",
        "Membagi data menjadi training set dan test set",
        "Membuat visualisasi",
        "Menyimpan model ke disk",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "AI Generatif (seperti ChatGPT) termasuk dalam kategori model apa?",
      options: [
        "Linear Regression",
        "Decision Tree",
        "Large Language Model (LLM)",
        "K-Nearest Neighbors",
      ],
      correctAnswer: 2,
    },
  ],

  // ───── DEFAULT (fallback paling akhir) ─────
  default: [
    {
      question: "Mengapa penting untuk terus belajar teknologi baru?",
      options: [
        "Agar terlihat pintar",
        "Teknologi berkembang cepat dan relevansi skill sangat penting",
        "Untuk menghabiskan waktu luang",
        "Tidak terlalu penting",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Metode pemecahan masalah dengan membaginya menjadi bagian kecil disebut?",
      options: ["Abstraksi", "Dekomposisi", "Algoritma", "Pengenalan Pola"],
      correctAnswer: 1,
    },
    {
      question: "Apa peran dari struktur data dalam pemrograman?",
      options: [
        "Menyimpan dan mengatur data secara efisien",
        "Mengganti fungsi CPU",
        "Menambah warna pada antarmuka",
        "Membuat kode menjadi lebih panjang",
      ],
      correctAnswer: 0,
    },
    {
      question: "Manakah yang merupakan contoh konsep pengulangan (loop)?",
      options: ["if-else", "for dan while", "switch-case", "try-catch"],
      correctAnswer: 1,
    },
    {
      question: "Apa yang dimaksud dengan 'Debugging'?",
      options: [
        "Menulis kode dari awal",
        "Mendesain user interface",
        "Proses mencari dan memperbaiki error pada kode",
        "Menghapus aplikasi",
      ],
      correctAnswer: 2,
    },
    {
      question: "Algoritma pada dasarnya adalah?",
      options: [
        "Sistem operasi baru",
        "Langkah-langkah logis untuk menyelesaikan masalah",
        "Komponen hardware",
        "Bahasa pemrograman rahasia",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Bagaimana cara programmer profesional memastikan kode mereka bekerja?",
      options: [
        "Dengan menulis unit test dan debugging menyeluruh",
        "Dengan menebak",
        "Menyalin kode dari internet",
        "Membiarkan user menemukan errornya",
      ],
      correctAnswer: 0,
    },
    {
      question: "Apa fungsi komentar (comments) dalam source code?",
      options: [
        "Membuat kode berjalan lebih cepat",
        "Menjelaskan logika kode agar mudah dibaca manusia",
        "Menambahkan fitur baru",
        "Menyembunyikan error dari compiler",
      ],
      correctAnswer: 1,
    },
    {
      question: "Open-source software berarti?",
      options: [
        "Software yang sangat mahal",
        "Source code tersedia publik untuk dilihat dan dimodifikasi",
        "Software yang tidak bisa diubah",
        "Software yang hanya berjalan di Windows",
      ],
      correctAnswer: 1,
    },
    {
      question: "Bagaimana praktik penulisan variabel yang baik?",
      options: [
        "Gunakan nama acak seperti a, b, c",
        "Gunakan nama yang deskriptif dan konsisten (contoh: userCount)",
        "Jangan pernah menggunakan variabel",
        "Campurkan semua bahasa",
      ],
      correctAnswer: 1,
    },
  ],
};

/**
 * Ambil 'count' soal random dari pool static.
 *
 * Lookup berlapis:
 *   1. courseSlug (paling spesifik) → dapat soal yang dirancang khusus
 *      untuk course tersebut.
 *   2. categorySlug → fallback ke pool kategori.
 *   3. "default" → fallback umum.
 *
 * Kalau pool yang ketemu jumlahnya kurang dari `count`, soal-soal dari
 * default akan ditambahkan supaya tetap dapat 'count' soal.
 *
 * @param lookup - identifier untuk mencari pool (courseSlug + categorySlug).
 * @param count - jumlah soal yang ingin dikembalikan (default 5).
 */
export function getRandomStaticQuizzes(
  lookup: StaticQuizLookup | string,
  count: number = 5,
): StaticQuizQuestion[] {
  // Backward-compat: kalau dipanggil dengan string, anggap itu category slug.
  const courseSlug =
    typeof lookup === "string" ? null : lookup.courseSlug ?? null;
  const categorySlug =
    typeof lookup === "string" ? lookup : lookup.categorySlug ?? null;

  const coursePool = courseSlug ? STATIC_QUIZ_POOL[courseSlug] : undefined;
  const categoryPool = categorySlug
    ? STATIC_QUIZ_POOL[categorySlug]
    : undefined;
  const defaultPool = STATIC_QUIZ_POOL["default"] || [];

  // Susun pool berlapis dengan dedup berdasarkan question text — hindari
  // soal duplikat ketika course pool digabung dengan kategori pool.
  const seen = new Set<string>();
  const merged: StaticQuizQuestion[] = [];

  const pushUnique = (questions?: StaticQuizQuestion[]) => {
    if (!questions) return;
    for (const q of questions) {
      const key = q.question.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(q);
    }
  };

  pushUnique(coursePool);
  if (merged.length < count) pushUnique(categoryPool);
  if (merged.length < count) pushUnique(defaultPool);

  // Kalau gabungan masih kurang juga (kasus ekstrem), kembalikan apa adanya.
  if (merged.length === 0) return [];

  // Shuffle (Fisher–Yates) lalu slice `count`.
  const shuffled = merged.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}
