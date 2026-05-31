import { PrismaClient, Difficulty } from "@prisma/client";
import { batch5Courses } from "./data/batch5-pemrograman";
import { reactDariNolCourse } from "./data/batch6-react";

const prisma = new PrismaClient();

async function main() {
  // Categories
  await Promise.all([
    prisma.category.upsert({
      where: { slug: "pemrograman" },
      update: {},
      create: { name: "Pemrograman", slug: "pemrograman", icon: "💻", description: "Belajar coding dan pengembangan software", order: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "matematika" },
      update: {},
      create: { name: "Matematika", slug: "matematika", icon: "📐", description: "Logika, aljabar, kalkulus, dan statistik", order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "sains" },
      update: {},
      create: { name: "Sains", slug: "sains", icon: "🔬", description: "Fisika, kimia, biologi, dan ilmu alam", order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "desain" },
      update: {},
      create: { name: "Desain", slug: "desain", icon: "🎨", description: "UI/UX, grafis, dan desain produk", order: 4 },
    }),
    prisma.category.upsert({
      where: { slug: "bahasa" },
      update: {},
      create: { name: "Bahasa", slug: "bahasa", icon: "🌐", description: "Bahasa Inggris, Jepang, dan linguistik", order: 5 },
    }),
    prisma.category.upsert({
      where: { slug: "data-science" },
      update: {},
      create: { name: "Data Science", slug: "data-science", icon: "📊", description: "Analisis data, machine learning, dan AI", order: 6 },
    }),
  ]);


  // Categories sudah di-upsert. Kursus dikelola via batch seed functions.


  // Badges
  const badgesData = [
    { name: "First Step", description: "Selesaikan 1 modul pertama", icon: "🏅", condition: "MODULE_COMPLETE_1" },
    { name: "Bookworm", description: "Selesaikan 5 course", icon: "📚", condition: "COURSE_COMPLETE_5" },
    { name: "On Fire", description: "Streak 7 hari berturut-turut", icon: "🔥", condition: "STREAK_7" },
    { name: "Unstoppable", description: "Streak 30 hari berturut-turut", icon: "⚡", condition: "STREAK_30" },
    { name: "AI Explorer", description: "Tanya AI sebanyak 50 kali", icon: "🧠", condition: "AI_CHAT_50" },
    { name: "Completionist", description: "Selesaikan semua modul dalam 1 course", icon: "🏆", condition: "COURSE_ALL_MODULES" },
    { name: "Reviewer", description: "Berikan rating pada 10 course", icon: "⭐", condition: "RATING_10" },
    { name: "Pro Exclusive", description: "Badge khusus subscriber Premium", icon: "👑", condition: "PREMIUM_ACTIVE" },
    { name: "Perfect Score", description: "Jawab semua quiz dengan benar", icon: "🎯", condition: "QUIZ_PERFECT" },
    { name: "Course Creator", description: "Buat 1 kursus yang di-publish public", icon: "🌟", condition: "COURSE_CREATED_PUBLIC" },
  ];

  for (const badge of badgesData) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  // Vouchers
  const now = new Date();
  await prisma.voucher.upsert({
    where: { code: "EARLYBIRD" },
    update: {},
    create: {
      code: "EARLYBIRD",
      type: "TRIAL",
      trialDays: 30,
      maxUses: 200,
      usedCount: 0,
      expiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.voucher.upsert({
    where: { code: "CLARISEBETA" },
    update: {},
    create: {
      code: "CLARISEBETA",
      type: "TRIAL",
      trialDays: 30,
      maxUses: 30,
      usedCount: 0,
      expiresAt: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
    },
  });

  // Call Batch 4
  await seedBatch4(prisma);

  // Call Batch 5
  await seedBatch5(prisma);

  // Call Batch 6
  await seedBatch6(prisma);

  console.log("✅ Seed completed successfully");
}

async function seedBatch4(prisma: PrismaClient) {
  console.log("Sedang melakukan seeding Batch 4: Pemrograman (TypeScript & JavaScript)...");
  
  const catPemrograman = await prisma.category.findUnique({ where: { slug: "pemrograman" } });
  if (!catPemrograman) return;

  const courses = [
    {
      title: "Dasar TypeScript — Type safety untuk JavaScript",
      slug: "dasar-typescript",
      description: "Pelajari TypeScript untuk membuat kode JavaScript yang bebas bug, lebih mudah dibaca, dan standar industri modern.",
      categoryId: catPemrograman.id,
      difficulty: Difficulty.BEGINNER,
      isPremium: false,
      language: "id",
      isPublished: true,
      totalModules: 2,
      modules: [
        {
          title: "Pengenalan TypeScript & Basic Types",
          slug: "pengenalan-typescript",
          order: 1,
          xpReward: 30,
          content: JSON.stringify({
            slides: [
              { slideNumber: 1, type: "lesson", title: "Apa itu TypeScript?", content: "TypeScript adalah 'superset' dari JavaScript. Artinya, semua kode JavaScript valid adalah kode TypeScript yang valid. Namun, TypeScript menambahkan fitur **Type System** secara statis.\n\nBayangkan kamu sedang memesan kopi. Di JavaScript, pelayan tidak mencatat pesananmu dan hanya mengandalkan ingatan. Saat kamu minta Kopi Susu, mungkin yang datang Kopi Hitam. Di TypeScript, pelayan mencatat pesananmu secara ketat (Type Safety). Jika barista membuat kopi yang salah, sistem akan langsung menolak sebelum kopi itu disajikan ke kamu.\n\nItulah mengapa TypeScript sangat populer: ia menemukan bug *sebelum* program dijalankan!", keyTakeaway: "TypeScript menemukan error saat kamu menulis kode (compile-time), bukan saat kode dijalankan (runtime)." },
              { slideNumber: 2, type: "example", title: "JavaScript vs TypeScript", content: "Perhatikan contoh klasik berikut.\n\n**JavaScript:**\n```javascript\nfunction sapa(nama) {\n  return 'Halo, ' + nama.toUpperCase();\n}\n\n// Kita tidak sengaja memasukkan angka\nsapa(123); // RUNTIME ERROR! 123.toUpperCase is not a function\n```\n\n**TypeScript:**\n```typescript\nfunction sapa(nama: string) {\n  return 'Halo, ' + nama.toUpperCase();\n}\n\nsapa(123); // ERROR SEBELUM DIJALANKAN: Argument of type 'number' is not assignable to parameter of type 'string'\n```", keyTakeaway: "Mendefinisikan tipe data (misal: string) mencegah kita memasukkan data yang salah." },
              { slideNumber: 3, type: "lesson", title: "Basic Types (Tipe Data Dasar)", content: "TypeScript memiliki tipe data dasar yang sering digunakan:\n\n1. **`string`**: Untuk teks. Contoh: `'Budi'`, `\"Halo\"`\n2. **`number`**: Untuk angka (baik bulat maupun desimal). Contoh: `42`, `3.14`\n3. **`boolean`**: Untuk benar atau salah. Contoh: `true`, `false`\n\nJika kamu mencoba memasukkan teks ke dalam variabel angka, TypeScript akan langsung ngomel (memberi peringatan merah di editor kode).", keyTakeaway: "Gunakan : string, : number, dan : boolean untuk menjaga konsistensi data." },
              { slideNumber: 4, type: "example", title: "Type Inference (Tebakan Otomatis)", content: "Kamu tidak selalu harus menulis tipe data secara eksplisit. TypeScript cukup pintar untuk menebak (Type Inference).\n\n```typescript\nlet kota = 'Jakarta';\n// TypeScript otomatis tahu bahwa 'kota' adalah string.\n\nkota = 100;\n// ERROR! Type 'number' is not assignable to type 'string'.\n```\n\n**Kapan harus menulis eksplisit?**\nBiasanya, kita menulis tipe eksplisit pada parameter fungsi atau variabel kosong yang akan diisi nanti.", keyTakeaway: "Biarkan TypeScript menebak tipe data jika nilainya langsung diisi (Type Inference)." },
              { slideNumber: 5, type: "lesson", title: "Tipe Data Any & Unknown", content: "Kadang kita mendapatkan data dari API yang bentuknya tidak jelas. Di sinilah ada tipe `any` dan `unknown`.\n\n- **`any`**: Mematikan semua pengecekan tipe. (Ibarat bilang ke satpam, \"Biarkan saja siapa pun masuk\"). Jangan gunakan ini kecuali terpaksa!\n- **`unknown`**: Lebih aman dari `any`. Memaksa kita untuk mengecek tipe data terlebih dahulu sebelum menggunakannya.\n\nAnalogi: `any` adalah masuk rumah tanpa kunci, `unknown` adalah paket misterius yang harus dibuka dulu untuk tahu isinya.", keyTakeaway: "Hindari 'any'. Gunakan 'unknown' jika tipe data belum pasti." },
              { slideNumber: 6, type: "example", title: "Menggunakan Unknown", content: "Bagaimana cara aman menangani `unknown`?\n\n```typescript\nlet data: unknown = getDataMisterius();\n\n// data.toUpperCase(); // ERROR! Karena kita belum tahu 'data' itu apa.\n\nif (typeof data === 'string') {\n  console.log(data.toUpperCase()); // AMAN! TypeScript tahu ini pasti string.\n}\n```\nProses pengecekan di dalam `if` ini disebut sebagai **Type Narrowing**.", keyTakeaway: "Gunakan Type Narrowing (seperti typeof) untuk memastikan tipe data unknown." },
              { slideNumber: 7, type: "casestudy", title: "Studi Kasus: Kalkulator Diskon", content: "Mari kita buat fungsi diskon yang aman dari bug tipe data.\n\n```typescript\nfunction hitungDiskon(harga: number, diskonPersen: number): number {\n  return harga - (harga * diskonPersen / 100);\n}\n\n// Pemanggilan yang benar\nconst total = hitungDiskon(50000, 10);\n\n// TypeScript akan mencegah ini:\n// hitungDiskon(\"50000\", 10); // Error pada harga\n// hitungDiskon(50000); // Error: Butuh 2 parameter\n```\nDengan TypeScript, fungsi menjadi terdokumentasi dengan sendirinya.", keyTakeaway: "Tipe data pada fungsi memastikan argumen yang masuk sesuai ekspektasi." },
              { slideNumber: 8, type: "challenge", title: "Challenge: Perbaiki Fungsi Cuaca", content: "Berikut adalah fungsi cuaca yang masih menggunakan JavaScript murni. Ubah menjadi TypeScript agar aman!", challenge: { instruction: "Tambahkan tipe data eksplisit pada parameter 'suhu' (angka) dan 'lokasi' (teks). Fungsi ini harus mengembalikan (return) sebuah teks (string).", inputType: "code", inputPlaceholder: "function cekCuaca(suhu, lokasi) { ... }", starterCode: "function cekCuaca(suhu, lokasi) {\n  return `Suhu di ${lokasi} adalah ${suhu} derajat.`;\n}", expectedConcepts: ["Parameter suhu bertipe number", "Parameter lokasi bertipe string", "Return type fungsi adalah string"], evaluationCriteria: "Pastikan user menambahkan ': number' pada parameter suhu, ': string' pada parameter lokasi, dan secara opsional ': string' pada return type fungsi.", hints: ["Cek kembali slide ke-2 tentang cara memberi tipe data pada parameter", "Jangan lupa titik dua ':' sebelum nama tipe"], sampleAnswer: "function cekCuaca(suhu: number, lokasi: string): string {\n  return `Suhu di ${lokasi} adalah ${suhu} derajat.`;\n}", followUpQuestion: "Apa yang terjadi jika suhu tidak diberikan tipe data?" } },
              { slideNumber: 9, type: "lesson", title: "Pembahasan Challenge", content: "Jawaban yang tepat adalah:\n```typescript\nfunction cekCuaca(suhu: number, lokasi: string): string {\n  return `Suhu di ${lokasi} adalah ${suhu} derajat.`;\n}\n```\n\n**Kesalahan Umum:**\n- Menggunakan huruf kapital seperti `String` atau `Number`. Di TypeScript, selalu gunakan huruf kecil `string` dan `number` untuk tipe primitif.\n- Lupa menambahkan return type. Meskipun TypeScript bisa melakukan *Type Inference* untuk return fungsi, menuliskannya secara eksplisit `(): string` sangat disarankan.", keyTakeaway: "Gunakan tipe primitif huruf kecil (string, number, boolean)." },
              { slideNumber: 10, type: "quiz", title: "Kuis: Uji Pemahamanmu", content: "Mari uji pemahamanmu mengenai Basic Types di TypeScript!", quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 } }
            ],
            quizBank: [
              { id: "q1", question: "Apa keuntungan utama menggunakan TypeScript dibandingkan JavaScript?", options: [{ id: "a", text: "Kodenya berjalan lebih cepat di browser" }, { id: "b", text: "Menemukan error tipe data sebelum kode dijalankan" }, { id: "c", text: "Ukurannya lebih kecil" }, { id: "d", text: "Tidak butuh server" }], correctAnswer: "b", explanation: "TypeScript mengecek tipe data pada compile-time, sehingga error dapat ditemukan sebelum runtime.", difficulty: "easy" },
              { id: "q2", question: "Tipe data apa yang digunakan untuk menyatakan 'benar' atau 'salah' di TypeScript?", options: [{ id: "a", text: "bool" }, { id: "b", text: "Boolean" }, { id: "c", text: "boolean" }, { id: "d", text: "truthy" }], correctAnswer: "c", explanation: "Di TypeScript, tipe data primitif ditulis dengan huruf kecil, yaitu 'boolean'.", difficulty: "easy" },
              { id: "q3", question: "Bagaimana cara memberi tipe data 'angka' pada variabel 'umur'?", options: [{ id: "a", text: "let umur: number = 25;" }, { id: "b", text: "let umur: Number = 25;" }, { id: "c", text: "let umur = number(25);" }, { id: "d", text: "let umur as number = 25;" }], correctAnswer: "a", explanation: "Sintaks yang benar adalah let namaVariabel: tipeData = nilai.", difficulty: "easy" },
              { id: "q4", question: "Apa yang dimaksud dengan Type Inference?", options: [{ id: "a", text: "Kemampuan TS menebak tipe data secara otomatis" }, { id: "b", text: "Proses mengubah JS menjadi TS" }, { id: "c", text: "Pengecekan error pada saat runtime" }, { id: "d", text: "Error karena tipe data tidak cocok" }], correctAnswer: "a", explanation: "Type Inference adalah fitur di mana TypeScript otomatis menyimpulkan tipe data dari nilai yang diberikan.", difficulty: "medium" },
              { id: "q5", question: "Mengapa tipe 'any' sebaiknya dihindari?", options: [{ id: "a", text: "Karena any akan menyebabkan runtime error" }, { id: "b", text: "Karena any lebih lambat" }, { id: "c", text: "Karena any mematikan pengecekan tipe statis TypeScript" }, { id: "d", text: "Karena any memakan banyak memori" }], correctAnswer: "c", explanation: "Menggunakan 'any' sama saja dengan menulis JavaScript biasa tanpa keamanan type checking.", difficulty: "medium" },
              { id: "q6", question: "Jika ada variabel dengan nilai 'undefined', apa yang akan dilakukan Type Inference?", options: [{ id: "a", text: "Menebaknya sebagai 'any'" }, { id: "b", text: "Menebaknya sebagai 'undefined'" }, { id: "c", text: "Error seketika" }, { id: "d", text: "Menebaknya sebagai 'unknown'" }], correctAnswer: "a", explanation: "Variabel yang diinisialisasi tanpa nilai (atau undefined) akan dianggap 'any' secara implisit jika tidak ada pengecekan ketat (strict).", difficulty: "medium" },
              { id: "q7", question: "Apa tipe pengembalian (return type) yang benar untuk fungsi yang tidak mengembalikan nilai apapun?", options: [{ id: "a", text: "null" }, { id: "b", text: "undefined" }, { id: "c", text: "void" }, { id: "d", text: "empty" }], correctAnswer: "c", explanation: "Fungsi yang tidak melakukan 'return' apapun memiliki tipe pengembalian 'void'.", difficulty: "medium" },
              { id: "q8", question: "Manakah penulisan fungsi TypeScript yang benar?", options: [{ id: "a", text: "function add(a, b): number" }, { id: "b", text: "function add(a: number, b: number): number" }, { id: "c", text: "function add(a: Number, b: Number) -> Number" }, { id: "d", text: "function add(): number(a, b)" }], correctAnswer: "b", explanation: "Setiap parameter harus didefinisikan tipe datanya menggunakan titik dua.", difficulty: "hard" },
              { id: "q9", question: "Apa perbedaan 'any' dan 'unknown'?", options: [{ id: "a", text: "Tidak ada perbedaan" }, { id: "b", text: "'unknown' lebih aman karena memaksa type checking sebelum operasi" }, { id: "c", text: "'any' lebih aman" }, { id: "d", text: "'unknown' hanya untuk fungsi" }], correctAnswer: "b", explanation: "Unknown memaksa developer melakukan type narrowing sebelum memanipulasi data.", difficulty: "hard" },
              { id: "q10", question: "Bagaimana cara melakukan Type Narrowing pada nilai bertipe unknown yang kita yakini adalah string?", options: [{ id: "a", text: "if (typeof val === 'string')" }, { id: "b", text: "if (val.isString())" }, { id: "c", text: "if (val == string)" }, { id: "d", text: "if (String(val))" }], correctAnswer: "a", explanation: "typeof operator digunakan dalam if statement untuk memvalidasi tipe primitif di TypeScript.", difficulty: "hard" }
            ]
          })
        },
        {
          title: "Object, Array, dan Interfaces",
          slug: "object-array-interfaces",
          order: 2,
          xpReward: 35,
          content: JSON.stringify({
            slides: [
              { slideNumber: 1, type: "lesson", title: "Tipe Data Array", content: "Di TypeScript, jika kamu membuat daftar (Array), kamu harus menentukan apa isi array tersebut.\n\n```typescript\n// Array berisi teks\nlet daftarBelanja: string[] = ['Apel', 'Beras', 'Susu'];\n\n// Array berisi angka\nlet nilaiUjian: number[] = [90, 85, 100];\n\ndaftarBelanja.push(10); // ERROR! Tidak bisa memasukkan angka ke array teks.\n```\nDengan begini, kita tidak akan pernah salah memasukkan data asing ke dalam daftar.", keyTakeaway: "Gunakan tipe[] untuk mendefinisikan array, contohnya string[] atau number[]." },
              { slideNumber: 2, type: "lesson", title: "Tipe Data Objek", content: "Bagaimana dengan objek yang memiliki banyak properti?\n\n```typescript\nlet user: { nama: string, umur: number } = {\n  nama: 'Budi',\n  umur: 25\n};\n\n// Error jika mencoba mengakses properti yang tidak ada:\n// console.log(user.alamat);\n```\nMenulis tipe objek langsung seperti di atas cukup merepotkan jika objeknya sangat besar atau dipakai berulang kali.", keyTakeaway: "Objek TypeScript secara ketat mengecek properti yang ada di dalamnya." },
              { slideNumber: 3, type: "example", title: "Memperkenalkan Interface", content: "Untuk membuat definisi objek yang bisa dipakai berulang kali, kita gunakan **Interface**.\n\n```typescript\ninterface User {\n  nama: string;\n  umur: number;\n  pekerjaan: string;\n}\n\nlet admin: User = {\n  nama: 'Budi',\n  umur: 25,\n  pekerjaan: 'Developer'\n};\n\n// Letak salah sedikit saja, misal 'Nama' (huruf besar), TS akan komplain!\n```\nInterface ini ibarat 'cetakan' atau 'KTP' bagi objek.", keyTakeaway: "Interface adalah cetak biru (blueprint) untuk bentuk suatu objek." },
              { slideNumber: 4, type: "casestudy", title: "Optional Properties (Properti Opsional)", content: "Terkadang tidak semua data selalu ada. Misalnya nomor HP itu opsional. Kita bisa menggunakan tanda tanya `?`.\n\n```typescript\ninterface Profil {\n  username: string;\n  bio?: string; // Boleh ada, boleh tidak\n}\n\nlet orang1: Profil = { username: 'andi99' }; // Valid\nlet orang2: Profil = { username: 'sari', bio: 'Pecinta Kucing' }; // Valid\n```\nJika kamu mencoba memanggil `orang1.bio.toUpperCase()`, TypeScript akan mencegahmu karena `bio` bisa saja `undefined`!", keyTakeaway: "Tambahkan tanda tanya (?) pada nama properti untuk membuatnya opsional." },
              { slideNumber: 5, type: "lesson", title: "Type Aliases (Alias Tipe)", content: "Selain Interface, ada juga **Type Aliases**.\n\n```typescript\ntype ID = string | number; // Bisa string ATAU number\n\nlet userId: ID = 101;\nuserId = \"A-101\"; // Keduanya valid\n```\nTanda `|` disebut **Union Type**, sangat berguna jika sebuah nilai bisa memiliki lebih dari satu jenis tipe.\nType Aliases biasanya digunakan untuk hal-hal yang bukan sekadar objek sederhana.", keyTakeaway: "Type Alias berguna untuk membuat Union Type dan nama tipe yang fleksibel." },
              { slideNumber: 6, type: "example", title: "Interface vs Type", content: "Kapan pakai Interface, kapan pakai Type?\n\n- Gunakan **Interface** saat mendefinisikan bentuk sebuah objek/data struktural (seperti data dari database).\n- Gunakan **Type** saat kamu butuh fleksibilitas fungsi, tipe primitif (seperti `type ID = string`), atau gabungan (Union).\n\nNamun, di TypeScript modern, keduanya hampir identik dan sering bisa saling menggantikan.", keyTakeaway: "Pilih Interface untuk objek standar, dan Type untuk kasus yang membutuhkan Union." },
              { slideNumber: 7, type: "casestudy", title: "Studi Kasus: Keranjang Belanja", content: "Mari kita modelkan keranjang belanja E-Commerce!\n\n```typescript\ninterface Produk {\n  id: number;\n  nama: string;\n  harga: number;\n}\n\ninterface Keranjang {\n  items: Produk[]; // Array dari interface Produk\n  totalHarga: number;\n}\n\nconst keranjangSaya: Keranjang = {\n  items: [{ id: 1, nama: \"Laptop\", harga: 5000 }],\n  totalHarga: 5000\n};\n```\nStruktur bersarang (nested) sangat mudah dibuat dengan TypeScript.", keyTakeaway: "Kita bisa menggunakan interface di dalam interface lain (Nested)." },
              { slideNumber: 8, type: "challenge", title: "Challenge: Buat Model Mahasiswa", content: "Perusahaan kampus memintamu membuat sistem pencatatan mahasiswa.", challenge: { instruction: "Buatlah sebuah 'interface' bernama 'Mahasiswa' yang memiliki properti 'nama' (string), 'nim' (number), dan properti opsional 'jurusan' (string).", inputType: "code", inputPlaceholder: "interface Mahasiswa { ... }", starterCode: "", expectedConcepts: ["Deklarasi interface Mahasiswa", "Properti nama: string", "Properti nim: number", "Properti jurusan opsional dengan tanda tanya (?)"], evaluationCriteria: "Pastikan menggunakan sintaks 'interface', properti wajib harus persis tipenya, dan jurusan harus menggunakan '?' sebelum ':'.", hints: ["Ingat kembali cara pakai 'interface' di slide sebelumnya", "Gunakan tanda '?' sebelum titik dua untuk properti opsional"], sampleAnswer: "interface Mahasiswa {\n  nama: string;\n  nim: number;\n  jurusan?: string;\n}", followUpQuestion: "Bagaimana cara membuat array yang berisi kumpulan Mahasiswa?" } },
              { slideNumber: 9, type: "lesson", title: "Pembahasan Challenge", content: "Model Mahasiswa yang benar:\n```typescript\ninterface Mahasiswa {\n  nama: string;\n  nim: number;\n  jurusan?: string;\n}\n```\nJika kamu ingin membuat data banyak mahasiswa, cukup gunakan array dari interface ini: `let data: Mahasiswa[] = [...]`.", keyTakeaway: "Interface dengan opsional properti membuat model data lebih realistis." },
              { slideNumber: 10, type: "quiz", title: "Kuis Akhir", content: "Kuis modul Object & Array TypeScript.", quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 } }
            ],
            quizBank: [
              { id: "q11", question: "Bagaimana cara membuat array yang hanya boleh berisi angka?", options: [{ id: "a", text: "let arr: array<number>" }, { id: "b", text: "let arr: number[]" }, { id: "c", text: "let arr = [number]" }, { id: "d", text: "let arr: Array[number]" }], correctAnswer: "b", explanation: "Sintaks yang umum untuk array bertipe adalah tipe[], contohnya number[].", difficulty: "easy" },
              { id: "q12", question: "Keyword apa yang digunakan untuk membuat kerangka/blueprint sebuah objek?", options: [{ id: "a", text: "class" }, { id: "b", text: "struct" }, { id: "c", text: "interface" }, { id: "d", text: "object" }], correctAnswer: "c", explanation: "Interface adalah keyword standar di TypeScript untuk mendefinisikan bentuk (shape) objek.", difficulty: "easy" },
              { id: "q13", question: "Apa fungsi dari tanda tanya (?) pada definisi interface?", options: [{ id: "a", text: "Menandakan tipe data belum diketahui" }, { id: "b", text: "Membuat properti menjadi opsional (boleh tidak diisi)" }, { id: "c", text: "Untuk melakukan kondisi ternary" }, { id: "d", text: "Tidak ada fungsi" }], correctAnswer: "b", explanation: "Tanda tanya (?) di akhir nama properti dalam interface membuatnya menjadi opsional.", difficulty: "easy" },
              { id: "q14", question: "Apa arti dari tipe `string | number`?", options: [{ id: "a", text: "Variabel harus berupa string DAN number bersamaan" }, { id: "b", text: "Variabel bisa bertipe string ATAU number" }, { id: "c", text: "Variabel akan dikonversi dari string ke number" }, { id: "d", text: "Error sintaks" }], correctAnswer: "b", explanation: "Simbol pipe (|) menandakan Union Type, artinya bisa menerima salah satu dari tipe tersebut.", difficulty: "medium" },
              { id: "q15", question: "Perbedaan paling mencolok antara 'Interface' dan 'Type' di TypeScript adalah?", options: [{ id: "a", text: "Interface bisa melakukan Declaration Merging, Type tidak bisa" }, { id: "b", text: "Type lebih cepat dikompilasi" }, { id: "c", text: "Interface hanya untuk array" }, { id: "d", text: "Keduanya 100% identik tanpa beda" }], correctAnswer: "a", explanation: "Interface mendukung 'declaration merging' (mendeklarasikan interface bernama sama berulang kali akan menggabungkannya).", difficulty: "medium" },
              { id: "q16", question: "Bagaimana cara mendefinisikan tipe objek di dalam array? (Array of Objects)", options: [{ id: "a", text: "User[]" }, { id: "b", text: "Array<User>" }, { id: "c", text: "Semua jawaban benar" }, { id: "d", text: "User[Array]" }], correctAnswer: "c", explanation: "Di TypeScript, `User[]` dan `Array<User>` adalah dua cara valid yang bermakna sama.", difficulty: "medium" },
              { id: "q17", question: "Jika ada `interface A { x: string }` dan `interface B { y: number }`, bagaimana cara menggabungkannya dengan Type?", options: [{ id: "a", text: "type C = A + B" }, { id: "b", text: "type C = A & B" }, { id: "c", text: "type C = A | B" }, { id: "d", text: "type C = merge(A, B)" }], correctAnswer: "b", explanation: "Operator '&' digunakan untuk membuat Intersection Type, yang menggabungkan semua properti.", difficulty: "hard" },
              { id: "q18", question: "Apa yang terjadi jika kita tidak mengisi properti yang WAJIB (tidak opsional) saat membuat objek dari Interface?", options: [{ id: "a", text: "TypeScript otomatis mengisinya dengan undefined" }, { id: "b", text: "Sistem akan diam saja" }, { id: "c", text: "TypeScript memberikan error Compile-time" }, { id: "d", text: "Error baru muncul saat kode di-run" }], correctAnswer: "c", explanation: "TypeScript ketat terhadap aturan struktural, jika properti wajib absen, akan langsung merah (error saat nulis kode).", difficulty: "hard" },
              { id: "q19", question: "Dapatkah kita menambahkan properti baru ke interface yang sama di file yang terpisah?", options: [{ id: "a", text: "Ya, karena Declaration Merging" }, { id: "b", text: "Tidak, akan muncul error duplikasi" }, { id: "c", text: "Hanya jika menggunakan Type" }, { id: "d", text: "Ya, tapi harus menonaktifkan strict mode" }], correctAnswer: "a", explanation: "Fitur Declaration Merging pada interface memungkinkan interface dengan nama yang sama saling menggabungkan propertinya secara otomatis.", difficulty: "hard" },
              { id: "q20", question: "Apa arti dari tipe `ReadonlyArray<string>`?", options: [{ id: "a", text: "Array yang isinya bisa diubah tapi panjangnya tetap" }, { id: "b", text: "Array string yang tidak bisa diubah (dimodifikasi) sama sekali" }, { id: "c", text: "Sama saja dengan string[]" }, { id: "d", text: "Array yang hanya berisi string kosong" }], correctAnswer: "b", explanation: "ReadonlyArray mencegah mutasi array seperti .push() atau .pop() di TypeScript.", difficulty: "hard" }
            ]
          })
        }
      ]
    },
    {
      title: "JavaScript Menengah — ES6+, Async/Await, dan DOM",
      slug: "javascript-menengah",
      description: "Tingkatkan level JavaScript-mu. Pelajari fitur modern, operasi asinkron, dan manipulasi elemen web secara profesional.",
      categoryId: catPemrograman.id,
      difficulty: Difficulty.INTERMEDIATE,
      isPremium: true,
      language: "id",
      isPublished: true,
      totalModules: 1, // Disederhanakan 1 modul panjang untuk contoh implementasi yang padat
      modules: [
        {
          title: "Modern ES6+ dan Asynchronous",
          slug: "modern-es6-async",
          order: 1,
          xpReward: 50,
          content: JSON.stringify({
            slides: [
              { slideNumber: 1, type: "lesson", title: "Mengenal ES6+", content: "ES6 (ECMAScript 2015) adalah revolusi terbesar dalam JavaScript. Ia membawa fitur modern seperti `let`, `const`, Arrow Function, dan Destructuring.\n\nSebelum ES6, developer menggunakan `var` yang sering menimbulkan bug karena masalah \"Hoisting\" (variabel bocor ke luar scope). Sekarang, `let` dan `const` mengunci variabel di dalam blok (*block-scoped*).\n\nAturan Emas:\n1. Selalu gunakan `const` secara default.\n2. Jika nilainya akan berubah, gunakan `let`.", keyTakeaway: "Gunakan 'const' untuk nilai tetap, 'let' untuk yang berubah. Tinggalkan 'var'." },
              { slideNumber: 2, type: "example", title: "Arrow Function", content: "Arrow function membuat penulisan fungsi lebih ringkas.\n\n**Klasik:**\n```javascript\nfunction tambah(a, b) {\n  return a + b;\n}\n```\n\n**Arrow Function:**\n```javascript\nconst tambah = (a, b) => a + b;\n```\nSelain ringkas, Arrow Function tidak mengikat konteks `this` sendiri, sangat berguna di React atau UI Framework.", keyTakeaway: "Arrow function (() => {}) lebih pendek dan mempertahankan konteks 'this' dari luarnya." },
              { slideNumber: 3, type: "lesson", title: "Destructuring (Bongkar Muat)", content: "Destructuring memungkinkan kita mengekstrak nilai dari objek atau array dengan satu baris kode.\n\n```javascript\nconst user = { nama: 'Budi', umur: 25, kota: 'Jakarta' };\n\n// Cara lama:\n// const nama = user.nama;\n// const kota = user.kota;\n\n// Destructuring:\nconst { nama, kota } = user;\nconsole.log(nama); // Budi\n```\nSangat elegan dan memperpendek kode, sering dipakai saat menerima data dari API.", keyTakeaway: "Gunakan tanda {} untuk mengambil properti objek secara langsung." },
              { slideNumber: 4, type: "example", title: "Spread Operator (...)", content: "Spread operator (`...`) menyebarkan isi array atau objek. Analogi: seperti mengeluarkan semua barang dari dalam koper.\n\n```javascript\nconst buah1 = ['Apel', 'Jeruk'];\nconst buah2 = ['Mangga', ...buah1];\n// buah2 = ['Mangga', 'Apel', 'Jeruk']\n\nconst profil = { nama: 'Andi' };\nconst update = { ...profil, umur: 20 };\n// update = { nama: 'Andi', umur: 20 }\n```", keyTakeaway: "Titik tiga (...) menyalin atau menggabungkan isi array/objek dengan mudah." },
              { slideNumber: 5, type: "lesson", title: "Masuk ke Asynchronous JS", content: "JavaScript adalah *Single-Threaded* (hanya punya satu tangan). Jika tangan ini disuruh men-download file 1GB, seluruh layar web akan *freeze* (macet) sampai selesai.\n\nUntuk menghindari itu, JavaScript menggunakan konsep Asynchronous (Asinkron). Pekerjaan berat dilempar ke 'belakang layar' sambil JS mengerjakan hal lain.\n\nPekerjaan asinkron yang sering dijumpai:\n- Mengambil data dari API (Fetch)\n- Membaca file dari database\n- Menunggu waktu (setTimeout)", keyTakeaway: "Asynchronous mencegah web membeku saat menunggu proses yang lama." },
              { slideNumber: 6, type: "lesson", title: "Memahami Promise", content: "Promise adalah 'Janji'. Saat kamu memesan gofood, driver berjanji akan mengantarkan makanan. Selama menunggu (Pending), kamu bisa main game. Saat selesai, bisa sukses (Resolved) atau gagal misal restoran tutup (Rejected).\n\n```javascript\nconst pesanan = new Promise((resolve, reject) => {\n  let sukses = true;\n  if(sukses) resolve(\"Nasi Goreng Datang!\");\n  else reject(\"Restoran Tutup\");\n});\n```", keyTakeaway: "Promise memiliki 3 state: Pending, Resolved (sukses), dan Rejected (gagal)." },
              { slideNumber: 7, type: "example", title: "Async / Await (Modern Promise)", content: "Membaca rentetan `.then().catch()` di Promise bisa membingungkan. ES8 mengenalkan `async / await` untuk membaca kode asinkron seolah-olah itu sinkron!\n\n```javascript\n// Cara Async/Await\nasync function ambilData() {\n  try {\n    const response = await fetch('https://api.user.com');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.log(\"Gagal ambil data:\", error);\n  }\n}\n```\nKata kunci `await` menghentikan sementara fungsi tersebut sampai datanya tiba.", keyTakeaway: "Gunakan blok try-catch bersama async-await untuk mengambil data dari internet." },
              { slideNumber: 8, type: "casestudy", title: "Studi Kasus: Menarik Daftar User", content: "Misal kita ingin mengambil daftar nama dari endpoint publik `https://jsonplaceholder.typicode.com/users`.\n\n```javascript\nasync function fetchUsers() {\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users');\n    const users = await res.json();\n    \n    // Tampilkan hanya namanya\n    users.forEach(user => console.log(user.name));\n  } catch(e) {\n    console.error(e);\n  }\n}\n```", keyTakeaway: "Fungsi fetch() selalu mengembalikan Promise, jadi wajib di-'await'." },
              { slideNumber: 9, type: "challenge", title: "Challenge: Buat Fungsi Fetch Cuaca", content: "Perusahaan memintamu membuat fungsi untuk mengambil data cuaca dari API.", challenge: { instruction: "Buatlah arrow function bernama `getWeather` yang bersifat asinkron (async). Di dalamnya gunakan `await fetch('https://api.cuaca.com')`, ubah menjadi JSON dengan `await res.json()`, lalu kembalikan (return) hasil JSON tersebut.", inputType: "code", inputPlaceholder: "const getWeather = async () => { ... }", starterCode: "", expectedConcepts: ["Deklarasi Arrow function dengan keyword async", "Menggunakan await fetch", "Menggunakan await response.json()", "Mengembalikan data"], evaluationCriteria: "AI Evaluator: Periksa apakah user mendefinisikan arrow function 'const getWeather = async () =>'. Pastikan ada penggunaan 'await fetch()' dan penguraian '.json()'. User harus mereturn hasil akhirnya. Tidak perlu blok try-catch jika instruksi tidak meminta secara spesifik, tapi berikan pujian jika user memakainya.", hints: ["Gunakan 'const namaFungsi = async () => {}'", "Jangan lupa return di baris terakhir"], sampleAnswer: "const getWeather = async () => {\n  const res = await fetch('https://api.cuaca.com');\n  const data = await res.json();\n  return data;\n};", followUpQuestion: "Bagaimana cara memanggil (eksekusi) fungsi getWeather ini?" } },
              { slideNumber: 10, type: "lesson", title: "Manipulasi DOM Dasar", content: "DOM (Document Object Model) adalah representasi HTML di dalam JavaScript. Dengan JS, kita bisa mengubah web secara dinamis.\n\n```javascript\n// Memilih elemen\nconst tombol = document.getElementById('btn-submit');\nconst teks = document.querySelector('.deskripsi');\n\n// Mengubah isi\nteks.innerText = \"Teks telah diubah oleh JavaScript!\";\n\n// Mengubah gaya (CSS)\nteks.style.color = \"red\";\n```", keyTakeaway: "Gunakan document.querySelector() untuk menarget elemen HTML dari JavaScript." },
              { slideNumber: 11, type: "example", title: "Event Listener", content: "Event Listener membuat elemen merespon klik, ketikan, atau scroll.\n\n```javascript\nconst tombol = document.querySelector('#tombol');\n\ntombol.addEventListener('click', () => {\n  alert('Tombol berhasil ditekan!');\n  tombol.style.backgroundColor = 'green';\n});\n```\nIni adalah pondasi dari semua interaktivitas web modern sebelum adanya React/Vue.", keyTakeaway: "addEventListener adalah telinga yang mendengarkan aksi user (klik, ketik)." },
              { slideNumber: 12, type: "lesson", title: "Map, Filter, dan Reduce", content: "Ini adalah 'Holy Trinity' manipulasi array di JavaScript ES6.\n\n1. **`.map()`**: Mengubah setiap item di array.\n2. **`.filter()`**: Membuang item yang tidak memenuhi syarat.\n3. **`.reduce()`**: Menggabungkan seluruh item menjadi satu nilai total.\n\n```javascript\nconst harga = [10, 20, 30];\n// Map: Kali 2 = [20, 40, 60]\n// Filter: Yang di atas 15 = [20, 30]\n// Reduce: Jumlahkan semua = 60\n```", keyTakeaway: "Gunakan method fungsional bawaan array (map, filter, reduce) daripada for-loop panjang." },
              { slideNumber: 13, type: "casestudy", title: "Kasus: Filter Produk Tersedia", content: "Kamu punya data dari API, tapi hanya ingin menampilkan yang stoknya masih ada.\n\n```javascript\nconst produk = [\n  { nama: 'Laptop', stok: 5 },\n  { nama: 'Mouse', stok: 0 },\n  { nama: 'Keyboard', stok: 2 }\n];\n\nconst tersedia = produk.filter(p => p.stok > 0);\nconsole.log(tersedia);\n// Output: Laptop dan Keyboard saja\n```", keyTakeaway: ".filter() menghasilkan array baru yang lebih pendek berdasarkan kondisi." },
              { slideNumber: 14, type: "lesson", title: "Optional Chaining (?)", content: "Pernah dapat error `Cannot read properties of undefined`? Gunakan ES11 Optional Chaining.\n\n```javascript\nconst user = { nama: 'Budi' };\n\n// Jika kita paksa akses alamat kota (padahal alamat tidak ada):\n// console.log(user.alamat.kota); // ERROR CRASH!\n\n// Dengan Optional Chaining (?.)\nconsole.log(user.alamat?.kota); // Output: undefined (Tidak crash!)\n```\nSangat menyelamatkan nyawa saat bekerja dengan data API bersarang.", keyTakeaway: "Gunakan tanda ?. untuk mengakses properti yang 'mungkin' tidak ada agar tidak crash." },
              { slideNumber: 15, type: "quiz", title: "Kuis JavaScript Menengah", content: "Kuis akhir modul JS Asinkron & Modern.", quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 } }
            ],
            quizBank: [
              { id: "q1", question: "Manakah cara penulisan Arrow Function yang tepat?", options: [{ id: "a", text: "const fn = function() => {}" }, { id: "b", text: "const fn = () => {}" }, { id: "c", text: "arrow fn() {}" }, { id: "d", text: "function() => {}" }], correctAnswer: "b", explanation: "Penulisan arrow function menggunakan `() => {}`.", difficulty: "easy" },
              { id: "q2", question: "Apa hasil dari const [a, b] = [10, 20]; ?", options: [{ id: "a", text: "a=10, b=20" }, { id: "b", text: "Error" }, { id: "c", text: "a=20, b=10" }, { id: "d", text: "Keduanya bernilai 10,20" }], correctAnswer: "a", explanation: "Ini disebut Array Destructuring, memetakan posisi array ke variabel.", difficulty: "easy" },
              { id: "q3", question: "Method apa yang digunakan untuk menggabungkan seluruh angka di array menjadi satu jumlah total?", options: [{ id: "a", text: ".map()" }, { id: "b", text: ".filter()" }, { id: "c", text: ".reduce()" }, { id: "d", text: ".concat()" }], correctAnswer: "c", explanation: ".reduce() digunakan untuk 'mengurangi' array menjadi satu nilai akumulatif.", difficulty: "medium" },
              { id: "q4", question: "Keyword apa yang HANYA BISA digunakan di dalam fungsi yang diawali 'async'?", options: [{ id: "a", text: "wait" }, { id: "b", text: "await" }, { id: "c", text: "then" }, { id: "d", text: "promise" }], correctAnswer: "b", explanation: "Keyword 'await' secara eksklusif hanya dapat beroperasi di dalam fungsi 'async'.", difficulty: "easy" },
              { id: "q5", question: "Fungsi fetch() mengembalikan tipe data apa?", options: [{ id: "a", text: "JSON" }, { id: "b", text: "String" }, { id: "c", text: "Promise" }, { id: "d", text: "Array" }], correctAnswer: "c", explanation: "Fetch API bersifat asinkron dan selalu mereturn object Promise.", difficulty: "medium" },
              { id: "q6", question: "Apa peran dari Optional Chaining ( ?. ) ?", options: [{ id: "a", text: "Mengecek apakah variabel adalah boolean" }, { id: "b", text: "Mencegah error saat mengakses properti dari undefined/null" }, { id: "c", text: "Menggantikan if else sepenuhnya" }, { id: "d", text: "Untuk melakukan perulangan array" }], correctAnswer: "b", explanation: "Jika objek sebelum tanda ?. bernilai nullish, ia langsung mereturn undefined tanpa trigger error.", difficulty: "medium" },
              { id: "q7", question: "Bagaimana cara mengambil elemen HTML dengan ID 'judul' ?", options: [{ id: "a", text: "document.querySelector('.judul')" }, { id: "b", text: "document.getElementById('judul')" }, { id: "c", text: "document.html('#judul')" }, { id: "d", text: "Semua salah" }], correctAnswer: "b", explanation: "getElementById adalah method bawaan untuk menarget ID. (querySelector('#judul') juga bisa).", difficulty: "easy" },
              { id: "q8", question: "Apa perbedaan sifat 'this' pada regular function dan arrow function?", options: [{ id: "a", text: "Keduanya sama persis" }, { id: "b", text: "Arrow function tidak memiliki 'this' sendiri, ia mengambil dari scope luarnya (lexical scoping)" }, { id: "c", text: "Regular function mengambil lexical scoping" }, { id: "d", text: "Arrow function 'this'-nya selalu mengacu pada window" }], correctAnswer: "b", explanation: "Arrow function menggunakan lexical this bind, sangat berguna untuk callback dalam class.", difficulty: "hard" },
              { id: "q9", question: "Promise yang gagal (dibatalkan) akan masuk ke state?", options: [{ id: "a", text: "Pending" }, { id: "b", text: "Resolved" }, { id: "c", text: "Rejected" }, { id: "d", text: "Error" }], correctAnswer: "c", explanation: "Tiga state promise: Pending, Fulfilled (Resolved), dan Rejected.", difficulty: "medium" },
              { id: "q10", question: "Apakah Map dan Filter memodifikasi array aslinya (Mutate)?", options: [{ id: "a", text: "Ya, mengubah aslinya" }, { id: "b", text: "Hanya Map yang mengubah" }, { id: "c", text: "Tidak, keduanya mereturn array BARU" }, { id: "d", text: "Tergantung panjang array" }], correctAnswer: "c", explanation: "Map, filter, dan method functional lainnya didesain untuk Immutable (tidak mengubah array original).", difficulty: "hard" }
            ]
          })
        }
      ]
    }
  ];

  for (const c of courses) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        title: c.title,
        slug: c.slug,
        description: c.description,
        categoryId: c.categoryId,
        difficulty: c.difficulty,
        isPremium: c.isPremium,
        language: c.language,
        isPublished: c.isPublished,
        totalModules: c.totalModules,
        visibility: "PUBLIC"
      }
    });

    for (const m of c.modules) {
      await prisma.module.upsert({
        where: { courseId_slug: { courseId: course.id, slug: m.slug } },
        update: {},
        create: {
          title: m.title,
          slug: m.slug,
          courseId: course.id,
          order: m.order,
          xpReward: m.xpReward,
          content: m.content
        }
      });
    }
  }

  console.log("✅ Batch 4 (Dasar TypeScript & JavaScript Menengah) berhasil ditambahkan.");
}

async function seedBatch5(prisma: PrismaClient) {
  console.log("Sedang melakukan seeding Batch 5: Pemrograman (Rust Dasar + TypeScript Lanjutan)...");

  const catPemrograman = await prisma.category.findUnique({
    where: { slug: "pemrograman" },
  });
  if (!catPemrograman) {
    console.warn("⚠️  Kategori 'pemrograman' tidak ditemukan, skip Batch 5.");
    return;
  }

  for (const c of batch5Courses) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        // Update meta-fields tapi jangan ubah relasi
        title: c.title,
        description: c.description,
        difficulty: c.difficulty,
        isPremium: c.isPremium,
        language: c.language,
        isPublished: c.isPublished,
        totalModules: c.totalModules,
      },
      create: {
        title: c.title,
        slug: c.slug,
        description: c.description,
        categoryId: catPemrograman.id,
        difficulty: c.difficulty,
        isPremium: c.isPremium,
        language: c.language,
        isPublished: c.isPublished,
        totalModules: c.totalModules,
        visibility: "PUBLIC",
      },
    });

    for (const m of c.modules) {
      // Upsert module
      const moduleRow = await prisma.module.upsert({
        where: { courseId_slug: { courseId: course.id, slug: m.slug } },
        update: {
          title: m.title,
          order: m.order,
          xpReward: m.xpReward,
          content: JSON.stringify(m.contentObject),
        },
        create: {
          title: m.title,
          slug: m.slug,
          courseId: course.id,
          order: m.order,
          xpReward: m.xpReward,
          content: JSON.stringify(m.contentObject),
        },
      });

      // Bersihin slide lama supaya seed idempotent (kalau di-rerun, gak duplikat).
      await prisma.slide.deleteMany({ where: { moduleId: moduleRow.id } });

      // Create Slide rows dari array slides — frontend baca dari sini, BUKAN
      // dari module.content. Mapping:
      //   data.content (markdown body)  → slide.content.body
      //   data.type ("casestudy"/"summary") → "lesson" (frontend cuma render
      //                                       body untuk lesson/example)
      for (const slide of m.contentObject.slides) {
        const s = slide as Record<string, unknown>;
        const rawType = String(s.type || "lesson");
        // Frontend cuma render body untuk: text|markdown|lesson|example.
        // Map casestudy & summary ke lesson supaya konten tetap kelihatan.
        const renderType =
          rawType === "casestudy" || rawType === "summary"
            ? "lesson"
            : rawType;

        const slideContent: Record<string, unknown> = {
          type: renderType,
          // Field "content" di data → "body" di slide.content (sesuai
          // existing schema yang dibaca frontend).
          body: typeof s.content === "string" ? s.content : "",
        };

        if (typeof s.keyTakeaway === "string") {
          slideContent.keyTakeaway = s.keyTakeaway;
        }
        if (typeof s.codeExample === "string") {
          slideContent.codeExample = s.codeExample;
        }
        if (typeof s.language === "string") {
          slideContent.language = s.language;
        }
        if (Array.isArray(s.tooltips)) {
          slideContent.tooltips = s.tooltips;
        }
        if (typeof s.explanation === "string") {
          slideContent.explanation = s.explanation;
        }
        if (s.challenge && typeof s.challenge === "object") {
          slideContent.challenge = s.challenge;
        }
        // Quiz slide: simpan quizBank di slide.content juga (selaras dgn
        // existing data) walau frontend kuis sekarang fetch dari API.
        if (renderType === "quiz") {
          slideContent.quizBank = m.contentObject.quizBank;
        }

        await prisma.slide.create({
          data: {
            moduleId: moduleRow.id,
            title: typeof s.title === "string" ? s.title : "Untitled",
            order: typeof s.slideNumber === "number" ? s.slideNumber : 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content: slideContent as any,
            // Lampirkan sumber referensi (video + dokumentasi + artikel) ke
            // slide konten. Slide quiz tidak diberi sumber (tidak relevan).
            ...(m.sources && m.sources.length > 0 && renderType !== "quiz"
              ? {
                  sources: {
                    create: m.sources.map((src) => ({
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      type: src.type as any,
                      title: src.title,
                      url: src.url,
                    })),
                  },
                }
              : {}),
          },
        });
      }
    }
  }

  console.log(
    `✅ Batch 5 berhasil ditambahkan (${batch5Courses.length} course, ${batch5Courses.reduce(
      (acc, c) => acc + c.modules.reduce((a, m) => a + m.contentObject.slides.length, 0),
      0,
    )} slide).`,
  );
}

async function seedBatch6(prisma: PrismaClient) {
  console.log("Sedang melakukan seeding Batch 6: Web Development (React dari Nol)...");

  const catWebDev = await prisma.category.upsert({
    where: { slug: "web-development" },
    update: {},
    create: { name: "Web Development", slug: "web-development", icon: "🌐", description: "Pengembangan website frontend dan backend", order: 7 },
  });

  const courses = [reactDariNolCourse];

  for (const c of courses) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        description: c.description,
        difficulty: c.difficulty,
        isPremium: c.isPremium,
        language: c.language,
        isPublished: c.isPublished,
        totalModules: c.totalModules,
      },
      create: {
        title: c.title,
        slug: c.slug,
        description: c.description,
        categoryId: catWebDev.id,
        difficulty: c.difficulty,
        isPremium: c.isPremium,
        language: c.language,
        isPublished: c.isPublished,
        totalModules: c.totalModules,
        visibility: "PUBLIC",
      },
    });

    for (const m of c.modules) {
      const moduleRow = await prisma.module.upsert({
        where: { courseId_slug: { courseId: course.id, slug: m.slug } },
        update: {
          title: m.title,
          order: m.order,
          xpReward: m.xpReward,
          content: JSON.stringify(m.contentObject),
        },
        create: {
          title: m.title,
          slug: m.slug,
          courseId: course.id,
          order: m.order,
          xpReward: m.xpReward,
          content: JSON.stringify(m.contentObject),
        },
      });

      await prisma.slide.deleteMany({ where: { moduleId: moduleRow.id } });

      for (const slide of m.contentObject.slides) {
        const s = slide as Record<string, unknown>;
        const rawType = String(s.type || "lesson");
        const renderType =
          rawType === "casestudy" || rawType === "summary"
            ? "lesson"
            : rawType;

        const slideContent: Record<string, unknown> = {
          type: renderType,
          body: typeof s.content === "string" ? s.content : "",
        };

        if (typeof s.keyTakeaway === "string") slideContent.keyTakeaway = s.keyTakeaway;
        if (typeof s.codeExample === "string") slideContent.codeExample = s.codeExample;
        if (typeof s.language === "string") slideContent.language = s.language;
        if (Array.isArray(s.tooltips)) slideContent.tooltips = s.tooltips;
        if (typeof s.explanation === "string") slideContent.explanation = s.explanation;
        if (s.challenge && typeof s.challenge === "object") slideContent.challenge = s.challenge;
        
        if (renderType === "quiz") {
          slideContent.quizBank = m.contentObject.quizBank;
        }

        await prisma.slide.create({
          data: {
            moduleId: moduleRow.id,
            title: typeof s.title === "string" ? s.title : "Untitled",
            order: typeof s.slideNumber === "number" ? s.slideNumber : 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content: slideContent as any,
            ...(m.sources && m.sources.length > 0 && renderType !== "quiz"
              ? {
                  sources: {
                    create: m.sources.map((src) => ({
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      type: src.type as any,
                      title: src.title,
                      url: src.url,
                    })),
                  },
                }
              : {}),
          },
        });
      }
    }
  }

  console.log("✅ Batch 6 berhasil ditambahkan.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
