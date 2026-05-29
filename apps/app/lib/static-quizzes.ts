export type StaticQuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

// Generic static questions pool categorized by keywords
export const STATIC_QUIZ_POOL: Record<string, StaticQuizQuestion[]> = {
  "web-development": [
    {
      question: "Apa singkatan dari HTML?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Tabular Markup Language",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Properti CSS mana yang digunakan untuk mengubah warna latar belakang?",
      options: ["color", "background-color", "bgcolor", "background"],
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
        "Memulai server",
        "Mengkompilasi kode",
      ],
      correctAnswer: 1,
    },
    {
      question: "Framework mana yang merupakan framework CSS?",
      options: ["React", "Laravel", "Tailwind", "Django"],
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
        "Library JavaScript untuk UI",
        "Database relasional",
        "Sistem operasi",
      ],
      correctAnswer: 1,
    },
    {
      question: "Fungsi utama dari git adalah?",
      options: [
        "Version control system",
        "Teks editor",
        "Compiler",
        "Hosting server",
      ],
      correctAnswer: 0,
    },
  ],
  "backend-development": [
    {
      question: "Apa kegunaan utama dari SQL?",
      options: [
        "Desain UI",
        "Manipulasi dan query database relasional",
        "Styling halaman web",
        "Animasi frontend",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Metode HTTP mana yang digunakan untuk mengirim data baru ke server?",
      options: ["GET", "POST", "DELETE", "OPTIONS"],
      correctAnswer: 1,
    },
    {
      question: "Apa itu REST API?",
      options: [
        "Gaya arsitektur untuk sistem terdistribusi",
        "Database NoSQL",
        "Framework frontend",
        "Bahasa pemrograman tingkat rendah",
      ],
      correctAnswer: 0,
    },
    {
      question: "Node.js menggunakan engine JavaScript apa?",
      options: ["SpiderMonkey", "Chakra", "V8", "JavaScriptCore"],
      correctAnswer: 2,
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
      question: "Manakah yang merupakan database NoSQL?",
      options: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
      correctAnswer: 2,
    },
    {
      question: "Apa kegunaan dari JWT (JSON Web Token)?",
      options: [
        "Mengenkripsi database",
        "Otentikasi dan transmisi data aman",
        "Mengompresi gambar",
        "Load balancing",
      ],
      correctAnswer: 1,
    },
    {
      question: "ORM merupakan singkatan dari?",
      options: [
        "Object-Relational Mapping",
        "Online Request Management",
        "Object Router Module",
        "Over-Rated Middleware",
      ],
      correctAnswer: 0,
    },
    {
      question: "Docker utamanya digunakan untuk?",
      options: [
        "Mendesain logo",
        "Containerization aplikasi",
        "Mengelola memori CPU",
        "Membuat antarmuka web",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Manakah metode keamanan untuk melindungi password di database?",
      options: [
        "Menyimpan dalam plain-text",
        "Hashing dan salting",
        "Kompresi ZIP",
        "Menghapusnya",
      ],
      correctAnswer: 1,
    },
  ],
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
      question: "Apa arti dari metrik Accuracy?",
      options: [
        "Kecepatan model memproses data",
        "Persentase prediksi benar dari total prediksi",
        "Ukuran dataset",
        "Jumlah fitur yang digunakan",
      ],
      correctAnswer: 1,
    },
  ],
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
 * Get random static questions based on course category
 * @param categorySlug The category slug of the course
 * @param count Number of questions to return (default 5)
 */
export function getRandomStaticQuizzes(
  categorySlug: string,
  count: number = 5,
): StaticQuizQuestion[] {
  let pool = STATIC_QUIZ_POOL[categorySlug];

  if (!pool || pool.length < count) {
    // Fallback to default + merge if needed to ensure enough questions
    pool = [...(pool || []), ...(STATIC_QUIZ_POOL["default"] || [])];
  }

  // Shuffle and slice
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
