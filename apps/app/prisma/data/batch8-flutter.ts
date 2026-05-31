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

export const flutterCourse: CourseData = {
  title: "Belajar Flutter — Mobile app dengan Dart",
  slug: "belajar-flutter",
  description: "Bangun aplikasi mobile multi-platform sekelas profesional. Kuasai ekosistem Flutter, pelajari bahasa pemrograman Dart dari nol, pahami konsep Widget, hingga integrasi state management sederhana yang akan mengubahmu menjadi Mobile Developer idaman industri.",
  difficulty: Difficulty.INTERMEDIATE,
  isPremium: true,
  language: "id",
  isPublished: true,
  totalModules: 3,
  modules: [
    {
      title: "Fondasi Flutter & Dart Dasar",
      slug: "fondasi-flutter-dart",
      order: 1,
      xpReward: 120,
      sources: [
        {
          type: "YOUTUBE",
          title: "Flutter Tutorial for Beginners - Full Course",
          url: "https://www.youtube.com/watch?v=1gDhl4leEzA",
        },
        {
          type: "DOCUMENTATION",
          title: "Dokumentasi Resmi Flutter",
          url: "https://docs.flutter.dev/get-started/install",
        },
        {
          type: "DOCUMENTATION",
          title: "Belajar Dart (Bahasa Pemrograman)",
          url: "https://dart.dev/language",
        },
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Apa itu Flutter?",
            content: `Dahulu kala, jika sebuah perusahaan ingin membuat aplikasi *mobile*, mereka harus merekrut dua tim berbeda: satu tim Android (Java/Kotlin) dan satu tim iOS (Swift/Objective-C). Biayanya sangat mahal dan lambat.

Kemudian hadirlah **Flutter**, sebuah *framework open-source* ciptaan **Google**. 

Flutter memungkinkan kamu membangun aplikasi yang berjalan di **Android, iOS, Web, Windows, Mac, dan Linux** HANYA DENGAN SATU KODE SUMBER (*single codebase*). Berbeda dengan *framework hybrid* lawas yang me-render *webview* (HTML di dalam app), Flutter menggambar tampilannya sendiri langsung ke kanvas grafis perangkat (menggunakan *engine* Skia/Impeller). Hasilnya? Performa aplikasi secepat aplikasi Native!

Keunggulan utama Flutter:
1. **Hot Reload**: Kamu bisa melihat perubahan kode secara instan dalam hitungan milidetik tanpa perlu *restart* aplikasi. Ini sangat meningkatkan kecepatan development.
2. **Beautiful UI**: Flutter hadir dengan koleksi desain *Material* (Google) dan *Cupertino* (Apple) yang sudah sangat indah *out-of-the-box*.
3. **Performa Tinggi**: Dikompilasi langsung ke kode mesin (ARM atau Intel).`,
            keyTakeaway: "Flutter adalah UI Toolkit ciptaan Google untuk membuat aplikasi lintas platform native-compiled hanya menggunakan satu codebase (basis kode)."
          },
          {
            slideNumber: 2,
            type: "lesson",
            title: "Mengenal Dart: Bahasa di Balik Flutter",
            content: `Kamu tidak menulis Flutter dengan JavaScript, Python, atau Java. Kamu menulis Flutter menggunakan bahasa pemrograman **Dart** (yang juga dibuat oleh Google).

Mengapa Dart? 
Google memilih Dart karena bahasa ini dapat **dikompilasi ganda (dual-compilation)**:
- Saat masa *Development*, Dart menggunakan JIT (*Just In Time*) compilation. Ini yang membuat fitur *Hot Reload* yang super cepat itu mungkin.
- Saat rilis ke *Production*, Dart dikompilasi AOT (*Ahead Of Time*) menjadi kode bahasa mesin murni (ARM/x86), sehingga aplikasinya berjalan dengan sangat kencang tanpa hambatan (smooth 60fps - 120fps).

**Sintaks Dart Sangat Ramah!**
Jika kamu pernah belajar JavaScript, Java, atau C++, Dart akan terasa seperti rumah sendiri.

\`\`\`dart
// Contoh kode Dart sederhana
void main() {
  String nama = "Raditya";
  int umur = 25;
  bool isDeveloper = true;

  if (isDeveloper) {
    print("Halo $nama, semangat coding mobile apps!");
  }
}
\`\`\`
Dart memiliki tipe data statis (*strongly typed*), tetapi juga mendukung *type inference* (seperti TypeScript). Kamu bisa menggunakan kata kunci \`var\` atau \`final\` jika tidak ingin repot mendefinisikan tipe data secara eksplisit.`,
            keyTakeaway: "Dart adalah bahasa utama Flutter. Ia memiliki kemampuan kompilasi ganda: JIT untuk hot-reload cepat di saat coding, dan AOT untuk performa maksimal di versi rilis."
          },
          {
            slideNumber: 3,
            type: "lesson",
            title: "Everything is a Widget",
            content: `Mantra yang wajib kamu hafal sebelum masuk ke ekosistem Flutter adalah: **"Everything is a Widget"** (Segalanya adalah Widget).

Dalam pengembangan web HTML, kita memiliki elemen seperti \`<div>\`, \`<p>\`, \`<button>\`. Dalam Flutter, padanannya disebut **Widget**.
Bahkan hal-hal yang di teknologi lain dianggap "properti/atribut" (seperti Padding atau perataan ke tengah), di Flutter itu adalah **Widget** tersendiri!

Contoh ekstrem:
Jika kamu ingin menempatkan teks di tengah layar dengan margin 16px. Struktur komponenmu (Widget Tree) akan seperti ini:
- \`Center\` (Widget perata tengah)
  - \`Padding\` (Widget pemberi jarak)
    - \`Text\` (Widget penampil teks)

Sintaksnya terlihat seperti ini:
\`\`\`dart
Center(
  child: Padding(
    padding: EdgeInsets.all(16.0),
    child: Text('Halo Dunia!'),
  ),
)
\`\`\`

Arsitektur "semuanya berlapis" ini awalnya terasa *verbose* (panjang), tetapi pada praktiknya ia memberikan fleksibilitas tanpa batas. Kamu mengarang (*compose*) UI layaknya merakit balok-balok kecil. Konsep *Child* (satu anak) dan *Children* (banyak anak) sangat kental di struktur kode Flutter.`,
            keyTakeaway: "Di Flutter, tidak ada file CSS atau HTML. Tampilan, styling, margin, dan posisi, semuanya diimplementasikan menggunakan class-class Dart yang disebut Widget."
          },
          {
            slideNumber: 4,
            type: "example",
            title: "Stateless vs Stateful Widget",
            content: `Ada dua kasta utama untuk membuat komponen (Widget) buatanmu sendiri di Flutter: **Stateless** dan **Stateful**.

**1. StatelessWidget**
Gunakan ini untuk bagian layar yang bersifat "statis". Datanya tidak akan pernah berubah sejak komponen ini digambar di layar.

\`\`\`dart
class LabelNama extends StatelessWidget {
  final String nama;
  
  // Constructor
  LabelNama(this.nama);

  @override
  Widget build(BuildContext context) {
    return Text(
      nama, 
      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)
    );
  }
}
\`\`\`
*Catatan: \`build\` adalah fungsi wajib di mana kamu mereturn susunan UI kamu.*

**2. StatefulWidget**
Gunakan ini jika tampilan komponen bisa berubah merespons tindakan *user* (misal form input, counter angka, tombol like). StatefulWidget memiliki "memori internal" yang disebut **State**.

Jika kamu memanggil fungsi sakti \`setState(() { ... })\`, Flutter akan langsung menggambar ulang layar komponen tersebut dengan data yang baru. Kita akan mempraktikkan StatefulWidget secara spesifik pada slide-slide berikutnya.`,
            keyTakeaway: "Gunakan StatelessWidget untuk UI statis. Gunakan StatefulWidget untuk UI interaktif yang tampilannya bisa berubah-ubah di tengah jalan."
          },
          {
            slideNumber: 5,
            type: "example",
            title: "Layouting Dasar: Column & Row",
            content: `Karena Flutter tidak punya CSS Flexbox, bagaimana kita menyusun tata letak (layout) secara vertikal atau horizontal?

Flutter memiliki dua pahlawan utama untuk urusan ini: **Column** dan **Row**.

**Column (Susun Vertikal - dari Atas ke Bawah):**
\`\`\`dart
Column(
  mainAxisAlignment: MainAxisAlignment.center, // Ratakan ke tengah vertikal
  crossAxisAlignment: CrossAxisAlignment.start, // Ratakan ke kiri horizontal
  children: [
    Icon(Icons.person, size: 50, color: Colors.blue),
    Text("Budi Santoso", style: TextStyle(fontSize: 20)),
    Text("Software Engineer", style: TextStyle(color: Colors.grey)),
  ],
)
\`\`\`

**Row (Susun Horizontal - dari Kiri ke Kanan):**
\`\`\`dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween, // Ujung ke ujung
  children: [
    Text("Total Harga:"),
    Text("Rp 100.000", style: TextStyle(fontWeight: FontWeight.bold)),
  ],
)
\`\`\`

Parameter \`children: []\` menerima daftar *List* yang berisi banyak widget. Ini mirip sekali dengan *flex-direction* di web development. Di dunia Flutter modern, 90% masalah layouting diselesaikan hanya dengan menyusun kombinasi berlipat dari \`Column\` dan \`Row\`.`,
            keyTakeaway: "Gunakan Column untuk daftar vertikal dan Row untuk daftar horizontal. Keduanya menggunakan properti mainAxisAlignment dan crossAxisAlignment untuk mengatur perataan posisi."
          },
          {
            slideNumber: 6,
            type: "lesson",
            title: "Scaffold: Kerangka Dasar Aplikasi",
            content: `Membuat halaman kosong berwarna putih dengan tulisan di pojok tentu tidak terlihat seperti aplikasi profesional.

Untuk mendapatkan kerangka dasar sebuah layar (ada App Bar/Header di atas, kanvas utama di tengah, dan Floating Button di pojok kanan bawah), Flutter menyediakan *Super-Widget* yang dinamakan **Scaffold**.

\`\`\`dart
class HalamanBeranda extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Aplikasi Pertamaku"),
        backgroundColor: Colors.indigo,
      ),
      body: Center(
        child: Text("Selamat datang di dunia Flutter!"),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("Tombol dipencet!");
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
\`\`\`

Melihat kode di atas, kamu hanya perlu mengisi "slot-slot" yang disediakan oleh objek Scaffold. 
- Slot \`appBar\`
- Slot \`body\` (untuk isi layar utama)
- Slot \`floatingActionButton\` (opsional, untuk aksi melayang)
- Slot \`bottomNavigationBar\` (opsional, untuk tab menu di bawah layar)

Dengan Scaffold, kamu dijamin mendapatkan struktur halaman Material Design yang sesuai standar secara instan!`,
            keyTakeaway: "Scaffold adalah kanvas/kerangka dasar untuk merakit satu halaman penuh. Ia memiliki slot siap pakai untuk Header (appBar), Kanvas utama (body), hingga tombol layang."
          },
          {
            slideNumber: 7,
            type: "challenge",
            title: "Challenge: Analisa StatefulWidget",
            content: `Mari kita lihat penerapan \`StatefulWidget\` untuk kasus paling klasik dalam sejarah Flutter: **Aplikasi Counter** (Aplikasi Penghitung).

Di bawah ini adalah potongan logika (State) dari StatefulWidget. Tugasmu adalah memperbaiki letak fungsi penting Flutter agar tampilan angka bisa diperbarui di layar!`,
            challenge: {
              instruction: "Lengkapi fungsi incrementCounter agar angka yang bertambah BISA TERLIHAT PERUBAHANNYA di layar. Clue: gunakan setState.",
              inputType: "code",
              inputPlaceholder: "void incrementCounter() {\n  // tulis kodenya\n}",
              starterCode: "class CounterState extends State<CounterApp> {\n  int angka = 0;\n\n  void _incrementCounter() {\n    // PERBAIKI DISINI:\n    // Tambah angka sebesar 1 dan pastikan layar ter-update!\n    angka = angka + 1;\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Text('Angka saat ini: $angka');\n  }\n}",
              expectedConcepts: [
                "Pemanggilan fungsi setState",
                "Penambahan nilai variabel state di dalam blok setState"
              ],
              evaluationCriteria: "AI Evaluator: Periksa fungsi _incrementCounter. Wajib ada pemanggilan `setState(() { ... })`. Mutasi variabel `angka = angka + 1` (atau `angka++`) harus berada di DALAM blok `setState` atau tepat sebelumnya, tetapi `setState` HARUS dipanggil agar komponen memicu re-render. Format kurung kurawal pada setState penting diperhatikan.",
              hints: [
                "Sama seperti di React, kita tidak bisa sekadar mengubah nilai variabel. Kita harus 'memberi tahu' framework bahwa ada perubahan data.",
                "Bungkus logika `angka = angka + 1;` ke dalam struktur `setState(() { ... });`"
              ],
              sampleAnswer: "class CounterState extends State<CounterApp> {\n  int angka = 0;\n\n  void _incrementCounter() {\n    setState(() {\n      angka++;\n    });\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Text('Angka saat ini: $angka');\n  }\n}",
              followUpQuestion: "Kenapa kita harus membungkus perubahan data di dalam `setState`?"
            }
          },
          {
            slideNumber: 8,
            type: "lesson",
            title: "Pembahasan: Pentingnya setState",
            content: `Jawaban terbaik untuk *challenge* tadi adalah:

\`\`\`dart
  void _incrementCounter() {
    setState(() {
      angka++;
    });
  }
\`\`\`

Bagi kamu yang pernah belajar React (\`useState\`), konsep ini sangat identik. Variabel \`angka\` memang bisa berubah nilainya jika tidak dimasukkan ke dalam \`setState\`. Tapi, Flutter **TIDAK AKAN TAHU** bahwa data tersebut sudah berubah, sehingga method \`build()\` tidak dieksekusi ulang. Akibatnya, yang tampil di layar HP pengguna tetap "Angka saat ini: 0" meskipun secara diam-diam variabel aslinya sudah bernilai 1.

Pemanggilan \`setState\` adalah "Lonceng Alarm" bagi *engine* Flutter.
Ia berteriak: *"Hei Flutter! Ada state yang berubah nih. Tolong jalanin lagi fungsi build() dari atas ke bawah untuk menggambar ulang UI yang baru ya!"*

**Catatan Kinerja:**
Jangan khawatir masalah performa saat memanggil \`setState\`. Algoritma internal Flutter sangat efisien dan pintar. Ia akan memeriksa perbandingan grafis yang berubah secara spesifik, sehingga operasi ini nyaris memakan waktu nol koma sekian milidetik (*super fast*).`,
            keyTakeaway: "Variabel state yang mengalami mutasi wajib dibungkus/ditrigger menggunakan fungsi setState(() {}) untuk memastikan antarmuka dirender ulang dengan data terbaru."
          },
          {
            slideNumber: 9,
            type: "lesson",
            title: "Arsitektur File: lib/main.dart",
            content: `Saat pertama kali kamu membuat proyek Flutter (\`flutter create nama_proyek\`), kamu mungkin kaget melihat betapa banyaknya file dan folder yang di-generate. Ada folder \`android\`, \`ios\`, \`web\`, \`macos\`, dll.

Jangan panik! 
Tugas utama kamu sebagai *developer* Flutter HANYALAH fokus pada SATU folder: **folder \`lib\`**.

Folder \`lib\` (Library) adalah tempat tinggal kode Dart utamamu. Semua antarmuka, logika bisnis, dan model data akan ditulis di sini.
Dan di dalam folder \`lib\` tersebut, ada satu file suci yang menjadi jantung aplikasi: **\`main.dart\`**.

Di dalam \`main.dart\`, selalu ada fungsi bernama \`main()\`.
\`\`\`dart
void main() {
  runApp(const MyApp());
}
\`\`\`
Fungsi \`main()\` adalah titik awal (entry point) aplikasi. Saat pengguna menekan ikon aplikasi di HP mereka, sistem operasi akan mencari dan mengeksekusi fungsi \`main()\` ini, yang kemudian memerintahkan Flutter untuk mulai menggambar komponen \`MyApp\` ke layar (*runApp*).`,
            keyTakeaway: "Abaikan folder platform (android/ios) saat baru belajar. Fokuslah 100% pada kode Dart di dalam folder 'lib', dan pahami bahwa segalanya bermula dari fungsi main() di main.dart."
          },
          {
            slideNumber: 10,
            type: "example",
            title: "Struktur Lengkap main.dart Bawaan",
            content: `Mari kita bedah arsitektur kode bawaan yang sering kamu lihat saat pertama membuat proyek Flutter. Biasanya bentuknya seperti ini:

\`\`\`dart
import 'package:flutter/material.dart';

// 1. ENTRY POINT
void main() {
  runApp(const AplikasiKu());
}

// 2. ROOT WIDGET (Stateless)
class AplikasiKu extends StatelessWidget {
  const AplikasiKu({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const HalamanUtama(), // Memanggil layar pertama
    );
  }
}

// 3. LAYAR UTAMA (Stateful)
class HalamanUtama extends StatefulWidget {
  const HalamanUtama({super.key});
  
  @override
  State<HalamanUtama> createState() => _HalamanUtamaState();
}

class _HalamanUtamaState extends State<HalamanUtama> {
  // Logika state & build berada di sini...
}
\`\`\`

**Pola Arsitektur Utama:**
- Selalu ada \`MaterialApp\` di puncak pohon (Root).
- \`MaterialApp\` bertugas mengatur Tema Aplikasi (warna, font) dan Navigasi (Routing).
- Setelah \`MaterialApp\`, barulah kita memanggil halaman-halaman spesifik (berbasis \`Scaffold\`).`,
            keyTakeaway: "Struktur standar aplikasi Flutter berlapis tiga lapis inti: Fungsi main(), Root Widget pembungkus konfigurasi (MaterialApp), dan Halaman Layar sesungguhnya (Scaffold)."
          },
          {
            slideNumber: 11,
            type: "lesson",
            title: "Package Manager: pubspec.yaml",
            content: `Dalam pengembangan modern, kita tidak membuat semua fitur dari nol (seperti koneksi ke kamera, mengambil lokasi GPS, atau *fetching* HTTP). Kita menggunakan pustaka (*library* / *package*) buatan *developer* lain.

Di dunia Node/JavaScript, kita mengenal \`package.json\` dan NPM.
Di dunia Flutter/Dart, kita mengenal **\`pubspec.yaml\`** dan ekosistem **pub.dev**.

File \`pubspec.yaml\` terletak di root proyekmu. Ini adalah file terpenting kedua setelah \`main.dart\`.

\`\`\`yaml
name: my_app
description: A new Flutter project.

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  # Tambahkan package di bawah sini:
  http: ^1.1.0
  google_fonts: ^6.1.0
\`\`\`

Setiap kali kamu mengedit file ini (misalnya menambahkan *package* \`http\`), kamu harus menjalankan perintah \`flutter pub get\` di terminal (atau menekan tombol *Get Packages* di VSCode) untuk mengunduh pustaka tersebut dari server ke laptopmu.
Pusat direktori tempat kamu bisa mencari ribuan pustaka gratis adalah di situs web **https://pub.dev**.`,
            keyTakeaway: "pubspec.yaml adalah nyawa konfigurasi proyekmu. Tempat mengatur versi framework, menambahkan font custom, mendaftarkan gambar aset (asset), dan meng-install package eksternal."
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Material vs Cupertino",
            content: `Kamu mungkin sadar bahwa kode bawaan Flutter selalu memiliki impor di paling atas:
\`import 'package:flutter/material.dart';\`

Mengapa \`material\`? 
Itu karena Google telah mengemas desain sistem standar Android (yaitu **Material Design**) langsung ke dalam framework Flutter. Tombol, animasi sentuhan (*ripple*), bentuk bayangan, hingga ukuran font otomatis mengikuti standar Android.

Namun, bagaimana jika klienmu ingin aplikasi yang bernuansa murni ala Apple (iOS)?
Flutter memiliki solusinya! Alih-alih \`material.dart\`, kamu bisa mengimpor:
\`import 'package:flutter/cupertino.dart';\`

**Cupertino** adalah sebutan untuk bahasa desain khas iOS Apple.
- Jika di Material kita pakai \`Scaffold\`, di Cupertino kita pakai \`CupertinoPageScaffold\`.
- Jika di Material ada \`ElevatedButton\`, di Cupertino ada \`CupertinoButton\`.
- Jika di Material ada \`AlertDialog\`, di Cupertino ada \`CupertinoAlertDialog\`.

Banyak aplikasi besar justru mencampur keduanya: Menggunakan tombol Material di *app* versi Android, dan merender tombol Cupertino jika *app*-nya dijalankan di iPhone! (Ini disebut teknik *Platform Adaptive*).`,
            keyTakeaway: "Flutter memiliki dua bahasa desain built-in: Material (Android/Google) dan Cupertino (iOS/Apple). Walaupun 90% developer lebih suka memakai Material untuk semua platform karena kemudahannya."
          },
          {
            slideNumber: 13,
            type: "challenge",
            title: "Challenge: Modifikasi Tema MaterialApp",
            content: `Uji kepekaanmu terhadap struktur file utama aplikasi Flutter.
Di root \`MaterialApp\`, kita bisa mengendalikan tema (warna dasar, mode terang/gelap) secara terpusat.`,
            challenge: {
              instruction: "Lengkapi properti `theme` dan `darkTheme` di dalam `MaterialApp`. Set `themeMode` agar otomatis merender mode gelap (ThemeMode.dark).",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const MyApp());\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Aplikasi Gelap',\n      // TULIS 3 PROPERTI DI BAWAH INI UNTUK MENGAKTIFKAN DARK MODE SEUTUHNYA:\n      // 1. theme: gunakan ThemeData.light()\n      // 2. darkTheme: gunakan ThemeData.dark()\n      // 3. themeMode: gunakan ThemeMode.dark\n      \n      home: const Scaffold(\n        body: Center(child: Text('Halo Dunia!'))\n      ),\n    );\n  }\n}",
              expectedConcepts: ["theme: ThemeData.light()", "darkTheme: ThemeData.dark()", "themeMode: ThemeMode.dark"],
              evaluationCriteria: "Evaluasi apakah di dalam konstruktor MaterialApp terdapat 3 parameter ini: `theme`, `darkTheme`, dan `themeMode` yang nilainya sesuai instruksi.",
              hints: ["Penulisannya seperti ini:\n`theme: ThemeData.light(),`\n`darkTheme: ThemeData.dark(),`\n`themeMode: ThemeMode.dark,`"],
              sampleAnswer: "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const MyApp());\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Aplikasi Gelap',\n      theme: ThemeData.light(),\n      darkTheme: ThemeData.dark(),\n      themeMode: ThemeMode.dark,\n      home: const Scaffold(\n        body: Center(child: Text('Halo Dunia!'))\n      ),\n    );\n  }\n}",
              followUpQuestion: "Apa yang terjadi jika kita menyetel `themeMode: ThemeMode.system` alih-alih `ThemeMode.dark`?"
            }
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Rangkuman Fundamental Modul 1",
            content: `Selesai! Kamu baru saja menyerap esensi arsitektur *Mobile Development* modern dengan Flutter.

1. **Dart** adalah fondasinya. Berbasis class, kuat akan tipe data, mendukung JIT dan AOT, cocok untuk performa level Native.
2. **"Everything is a Widget"** adalah hukum absolut. Dari warna background, margin, hingga aplikasi seutuhnya... semuanya dibentuk dari blok-blok kecil.
3. **Column & Row** adalah teman terbaikmu sehari-hari untuk mendesain *layout* di HP yang berbentuk kotak memanjang.
4. **Scaffold & MaterialApp** menyelamatkanmu dari merangkai arsitektur dan navigasi halaman dari nol.
5. **Stateful vs Stateless** mendefinisikan sifat UI kamu: Apakah ia diam (seperti poster) atau berinteraksi secara hidup (seperti *game*/form)? Dan jangan lupakan lonceng andalanmu: \`setState\`.

Di dunia nyata, membangun aplikasi seperti Grab, Gojek, atau Twitter di Flutter hanya memerlukan pengulangan konsep ini dipadukan dengan teknik *Fetching API* dan pengelolaan folder (*state management* kompleks). 

Sekarang, siapkan dirimu untuk Ujian Validasi Modul. Jawab dengan hati-hati, nilai kelulusannya minimal 80!`,
            keyTakeaway: "Dasar Flutter itu sederhana: Belajar cara kerja Widget bersarang, pahami layouting vertikal/horizontal, dan kendalikan State untuk komponen interaktif."
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Ujian Pemahaman Flutter",
            content: "Mari kita evaluasi pemahamanmu tentang Flutter, Dart, Widget Tree, dan state. Semoga beruntung menaklukkan tantangan Premium ini!",
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
    {
      title: "Navigasi & State Management Lanjutan",
      slug: "navigasi-state-management-lanjutan",
      order: 2,
      xpReward: 150,
      sources: [
        { type: "YOUTUBE", title: "Flutter Navigation & State Management", url: "https://www.youtube.com/watch?v=1gDhl4leEzA" },
        { type: "DOCUMENTATION", title: "Flutter Navigation", url: "https://docs.flutter.dev/ui/navigation" },
        { type: "DOCUMENTATION", title: "State Management", url: "https://docs.flutter.dev/data-and-backend/state-mgmt/intro" }
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Konsep Stack Navigasi",
            content: `Aplikasi mobile modern jarang sekali hanya memiliki satu layar. Kita butuh berpindah dari Beranda -> Profil -> Pengaturan.

Di Flutter, sistem perpindahan layar (Navigasi) bekerja mirip dengan **Tumpukan Piring (Stack)**.
Bayangkan kamu punya piring kosong di atas meja (Layar Beranda). Saat kamu menekan tombol "Buka Profil", Flutter akan mengambil piring baru (Layar Profil) dan **menumpuknya** di atas piring Beranda.

Proses menumpuk layar baru disebut **\`push\`**.
Sedangkan proses mengambil piring teratas untuk membuangnya (sehingga layar kembali ke Beranda) disebut **\`pop\`**.

Itulah mengapa animasi default di Android atau iOS selalu terlihat seperti layar baru "meluncur" menutupi layar lama!`,
            keyTakeaway: "Navigasi layar di Flutter menganut prinsip LIFO (Last In, First Out) layaknya tumpukan kartu. Layar baru ditumpuk di atas layar lama."
          },
          {
            slideNumber: 2,
            type: "example",
            title: "Kode Push dan Pop",
            content: `Kita menggunakan class bawaan **\`Navigator\`** untuk mengatur lalu lintas layar ini.

\`\`\`dart
// 1. MENDORONG LAYAR BARU KE ATAS TUMPUKAN
ElevatedButton(
  child: const Text('Buka Halaman Detail'),
  onPressed: () {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const DetailScreen()),
    );
  },
);

// 2. MEMBUANG LAYAR TERATAS (KEMBALI)
ElevatedButton(
  child: const Text('Kembali ke Beranda'),
  onPressed: () {
    Navigator.pop(context);
  },
);
\`\`\`
Catatan: \`MaterialPageRoute\` secara otomatis menangani transisi animasi spesifik OS (geser dari kanan untuk iOS, atau memudar dari bawah untuk Android).`,
            keyTakeaway: "Gunakan Navigator.push() untuk membuka layar baru, dan Navigator.pop() untuk kembali ke layar sebelumnya."
          },
          {
            slideNumber: 3,
            type: "lesson",
            title: "Mengirim Data Antar Layar",
            content: `Seringkali, kita tidak sekadar pindah layar. Kita perlu "membawa" data.
Misal: Dari layar Daftar Produk, kita klik Produk A. Layar Detail Produk harus tahu bahwa ia harus menampilkan info Produk A, bukan Produk B.

Caranya sangat mudah di Flutter. Kita cukup melempar data tersebut melalui **Constructor** (Parameter Kelas) dari Widget yang menjadi tujuan!

\`\`\`dart
// Layar Tujuan (menerima data)
class DetailScreen extends StatelessWidget {
  final String namaProduk;

  // Constructor wajib menerima namaProduk
  const DetailScreen({super.key, required this.namaProduk});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(namaProduk)),
    );
  }
}
\`\`\`
Maka, saat memanggil \`push\`, kita wajib mengisinya: \`builder: (context) => DetailScreen(namaProduk: 'Laptop Gaming')\`.`,
            keyTakeaway: "Data dikirim ke layar tujuan dengan cara melewatkannya sebagai argumen pada Constructor class tujuan tersebut."
          },
          {
            slideNumber: 4,
            type: "example",
            title: "Mengembalikan Data (Return Result)",
            content: `Skenario sebaliknya: Kamu sedang di layar Pembayaran, lalu menekan tombol "Pilih Diskon". Aplikasi membuka Layar Daftar Diskon. Saat pengguna memilih "Diskon 50%", layar tersebut harus ditutup dan mengirim teks "Diskon 50%" kembali ke Layar Pembayaran.

Bagaimana caranya?
Karena \`Navigator.push\` adalah operasi **asinkron** (menunggu sampai layar masa depan ditutup), kita bisa menggunakan kata kunci \`await\`.

\`\`\`dart
// Di Layar Pertama (Menunggu hasil)
final hasil = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => LayarDiskon()),
);
print("Pengguna memilih: $hasil");

// Di Layar Kedua (Mengirim hasil saat ditutup)
ElevatedButton(
  onPressed: () {
    // Kita mengirim teks "Diskon 50%" ke dalam fungsi pop!
    Navigator.pop(context, 'Diskon 50%');
  },
  child: Text('Pilih Ini'),
);
\`\`\`
Sangat elegan!`,
            keyTakeaway: "Navigator.pop() bisa menerima argumen kedua berupa data hasil (result). Data tersebut akan ditangkap oleh Navigator.push() di layar pemanggil jika menggunakan await."
          },
          {
            slideNumber: 5,
            type: "challenge",
            title: "Challenge: Operasi Navigasi Mundur",
            content: "Kamu adalah programmer yang bertugas membuat tombol batal pada sebuah aplikasi form pendaftaran.",
            challenge: {
              instruction: "Lengkapi fungsi onPressed agar ia membuang layar saat ini dan kembali ke layar sebelumnya menggunakan fungsi pop dari Navigator.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "import 'package:flutter/material.dart';\n\nclass FormScreen extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return ElevatedButton(\n      child: const Text('Batal & Kembali'),\n      onPressed: () {\n        // Panggil fungsi untuk membuang layar saat ini\n        // Ingat untuk menyertakan context\n        \n      },\n    );\n  }\n}",
              expectedConcepts: ["Navigator.pop", "context"],
              evaluationCriteria: "Evaluasi penulisan sintaks Navigator.pop(context)",
              hints: [
                "Gunakan class `Navigator`",
                "Panggil metode `.pop()` dan berikan `context` ke dalamnya."
              ],
              sampleAnswer: "import 'package:flutter/material.dart';\n\nclass FormScreen extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return ElevatedButton(\n      child: const Text('Batal & Kembali'),\n      onPressed: () {\n        Navigator.pop(context);\n      },\n    );\n  }\n}",
              followUpQuestion: "Kenapa kita butuh objek 'context' saat memanggil fungsi dari Navigator?"
            }
          },
          {
            slideNumber: 6,
            type: "lesson",
            title: "Batas Kemampuan setState",
            content: `Sejauh ini, kita mengatur state lokal dengan menggunakan \`setState()\`.

Namun, apa jadinya jika kamu punya data "Keranjang Belanja"?
- Angka di icon keranjang (Layar A) harus *update*.
- Total harga di halaman detail keranjang (Layar B) harus *update*.
- Tombol "Tambah" di halaman produk (Layar C) harus merespons.

Jika kamu menggunakan \`setState\`, kamu akan terpaksa melempar data keranjang ini naik turun antar *constructor* ke semua layar. Kode akan menjadi mengerikan dan kusut seperti benang basah! Masalah ini disebut *Prop Drilling*.`,
            keyTakeaway: "setState sangat hebat untuk state lokal (misal: buka tutup modal, centang checkbox). Tapi ia gagal total jika digunakan untuk berbagi state lintas layar."
          },
          {
            slideNumber: 7,
            type: "lesson",
            title: "State Management Eksternal",
            content: `Untuk menyelesaikan masalah prop drilling keranjang belanja, komunitas Flutter menciptakan alat **State Management Global**.

Ide utamanya: Kita tidak lagi menyimpan state di dalam UI (Widget). Kita menaruh kotak brankas data (*State*) secara "melayang" di luar layar. 
Layar mana pun (A, B, atau C) bebas "berlangganan" ke kotak brankas tersebut. Jika kotak brankas berubah isinya, maka secara otomatis Layar A, B, dan C yang sedang mendengarkannya akan me-render ulang tampilannya sendiri.

Ada banyak sekali *library* State Management di ekosistem Flutter:
1. **Provider**: Resmi direkomendasikan Google (Ramah Pemula).
2. **Riverpod**: Evolusi dari Provider yang lebih kebal *bug*.
3. **BLoC (Business Logic Component)**: Standar industri raksasa untuk perusahaan besar, menggunakan konsep *stream* data.
4. **GetX**: Sangat mudah dipakai layaknya sihir, meski kurang disukai oleh kaum *purist* arsitektur.`,
            keyTakeaway: "State Management seperti Provider/Riverpod bertugas memisahkan logika bisnis dari UI, dan mendistribusikan data ke berbagai layar tanpa perlu lempar-menangkap melalui constructor."
          },
          {
            slideNumber: 8,
            type: "lesson",
            title: "Pengenalan Provider (State Management)",
            content: `Mari kita ambil contoh library paling direkomendasikan Google: **Provider**.

Inti dari Provider adalah class bernama **\`ChangeNotifier\`**. 
Ini adalah kerangka dasar (blueprint) dari "kotak brankas" kita.

\`\`\`dart
import 'package:flutter/material.dart';

// 1. Buat Brankas (Model)
class CartModel extends ChangeNotifier {
  int totalBarang = 0;

  // 2. Fungsi untuk mengubah data
  void tambahBarang() {
    totalBarang++;
    
    // 3. TERIAKKAN KE SEMUA WIDGET BAHWA DATA BERUBAH!
    notifyListeners(); 
  }
}
\`\`\`

Perhatikan fungsi \`notifyListeners()\`. Ini sama persis fungsinya dengan \`setState\`, tapi skalanya global! Saat fungsi ini dipanggil, semua komponen di layar manapun yang sedang "berlangganan" ke \`CartModel\` akan otomatis di-render ulang oleh Flutter.`,
            keyTakeaway: "Dalam Provider, State (Data) dibungkus ke dalam class turunan ChangeNotifier. Pemanggilan notifyListeners() adalah kunci untuk me-render ulang seluruh widget pendengar secara masal."
          },
          {
            slideNumber: 9,
            type: "example",
            title: "Injeksi Provider ke Aplikasi",
            content: `Setelah membuat \`CartModel\`, kita harus menempatkan brankas tersebut di posisi tertinggi aplikasi agar bisa diakses oleh layar manapun di bawahnya.

Biasanya kita membungkus \`MaterialApp\` (di \`main.dart\`) dengan widget \`ChangeNotifierProvider\`.

\`\`\`dart
void main() {
  runApp(
    // BUNGKUS APLIKASI DENGAN PROVIDER
    ChangeNotifierProvider(
      create: (context) => CartModel(), // Instansiasi brankas
      child: const MyApp(),
    ),
  );
}
\`\`\`

Dengan kode sakti ini, **SEMUA WIDGET** yang ada di dalam \`MyApp\` (termasuk layar-layar yang bersarang sangat dalam) kini memiliki akses sakti teleportasi langsung ke \`CartModel\` tanpa perlu mengoper variabel lewat konstruktor lagi!`,
            keyTakeaway: "Bungkus root widget (MaterialApp) menggunakan ChangeNotifierProvider agar state model yang kamu buat bisa diakses dari layar atau widget mana saja."
          },
          {
            slideNumber: 10,
            type: "lesson",
            title: "Membaca Data dari Provider",
            content: `Ada dua cara paling umum bagi sebuah komponen (Widget) untuk mengambil dan membaca data dari Provider:

**1. Provider.of<T>(context)**
\`\`\`dart
Widget build(BuildContext context) {
  // Watch (Pantau terus data ini)
  final cart = Provider.of<CartModel>(context);
  return Text('Total: \${cart.totalBarang}');
}
\`\`\`

**2. Consumer<T>**
Widget khusus yang hanya akan merender ulang bagian kecil dari UI (lebih hemat memori).
\`\`\`dart
Widget build(BuildContext context) {
  return Consumer<CartModel>(
    builder: (context, cart, child) {
      return Text('Total: \${cart.totalBarang}');
    },
  );
}
\`\`\`
*(Tip: \`T\` di sini adalah nama Model yang kamu daftarkan, misalnya \`CartModel\`)*`,
            keyTakeaway: "Gunakan widget Consumer atau syntax Provider.of(context) untuk berlangganan dan menampilkan nilai data secara real-time dari class State Management (Model) kamu."
          },
          {
            slideNumber: 11,
            type: "challenge",
            title: "Challenge: Panggil Aksi Provider",
            content: `Membaca data sudah, sekarang bagaimana memodifikasi/menjalankan fungsi dari Provider?

Satu aturan penting:
Jika kamu memanggil Provider HANYA untuk mengeksekusi fungsinya (seperti klik tombol) namun kamu **TIDAK** butuh data visual untuk ditampilkan ulang, kamu wajib menyetel argumen **\`listen: false\`**. Jika tidak, aplikasimu akan boros memori!`,
            challenge: {
              instruction: "Lengkapi fungsi onPressed pada tombol ini agar memanggil metode `tambahBarang()` dari `CartModel` tanpa mendengarkan perubahan state secara aktif (listen: false).",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "ElevatedButton(\n  child: const Text('Beli'),\n  onPressed: () {\n    // Tulis pemanggilan Provider di sini:\n    // Clue: Provider.of<CartModel>(context, ...).tambahBarang();\n    \n  },\n);",
              expectedConcepts: ["Provider.of<CartModel>", "listen: false", "tambahBarang()"],
              evaluationCriteria: "Evaluasi apakah kode menggunakan `Provider.of<CartModel>(context, listen: false).tambahBarang();`",
              hints: ["Gunakan parameter `listen: false` di dalam fungsi `Provider.of`.", "Kode benarnya adalah: `Provider.of<CartModel>(context, listen: false).tambahBarang();`"],
              sampleAnswer: "ElevatedButton(\n  child: const Text('Beli'),\n  onPressed: () {\n    Provider.of<CartModel>(context, listen: false).tambahBarang();\n  },\n);",
              followUpQuestion: "Kenapa tombol yang hanya berfungsi sebagai 'Pemicu Aksi' disarankan menggunakan listen: false?"
            }
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Navigasi Modern: Named Routes",
            content: `Seiring besarnya aplikasi, memanggil \`Navigator.push\` dengan \`MaterialPageRoute\` berulang kali di berbagai tombol akan menjadi kotor dan merepotkan.

Flutter menyediakan fitur keren bernama **Named Routes** (Rute Berbasis Nama). Kita menginisiasi *String* pendek (seperti \`'/profil'\`) untuk mewakili sebuah layar, mirip URL di web!

**Langkah 1: Daftarkan di \`MaterialApp\`**
\`\`\`dart
MaterialApp(
  initialRoute: '/', // Rute awal saat aplikasi dibuka
  routes: {
    '/': (context) => LayarBeranda(),
    '/profil': (context) => LayarProfil(),
    '/pengaturan': (context) => LayarPengaturan(),
  },
)
\`\`\`

**Langkah 2: Panggil Rutenya!**
Alih-alih menulis kode yang panjang, kamu kini cukup memanggil:
\`\`\`dart
// BERSIH SEKALI!
Navigator.pushNamed(context, '/profil');
\`\`\`
Bahkan argumen data juga bisa dioper ke sana (lewat parameter \`arguments\`).`,
            keyTakeaway: "Gunakan Named Routes di dalam objek MaterialApp agar navigasi antar halaman menjadi lebih rapi layaknya mengelola URL path pada sebuah website."
          },
          {
            slideNumber: 13,
            type: "example",
            title: "Studi Kasus: Membaca Argumen Named Route",
            content: `Lalu bagaimana kita mengambil data yang dioper lewat Named Route? (Misalnya kita mengklik id barang \`42\`).

\`\`\`dart
// 1. Memanggil Rute dan melempar argumen String
Navigator.pushNamed(context, '/detail', arguments: "42");

// 2. Di layar tujuan (/detail), tangkap nilainya
class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Trik sihir menangkap data rute:
    final idBarang = ModalRoute.of(context)!.settings.arguments as String;

    return Scaffold(
      appBar: AppBar(title: Text('Detail Barang \$idBarang')),
    );
  }
}
\`\`\`

Perhatikan fungsi \`ModalRoute.of(context)!.settings.arguments\`. 
Ini adalah pahlawan tanpa tanda jasa yang bertugas mengekstrak benda apapun yang kamu bawa (bisa berupa *String*, *Integer*, maupun *Class Model* rumit) dari layar sebelumnya ke layar saat ini.`,
            keyTakeaway: "Untuk menangkap data yang dikirim melalui Navigator.pushNamed, andalkan fungsi bawaan ModalRoute.of(context)!.settings.arguments dan casting ke tipe data aslinya."
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Rangkuman Modul 2",
            content: `Pemahaman tentang perpindahan layar adalah titik di mana aplikasimu mulai terasa seperti aplikasi nyata.

1. **Stack**: Sistem navigasi menggunakan prinsip tumpukan piring. Push untuk menumpuk layar maju, Pop untuk membuang dan mundur.
2. **Kirim & Kembalikan Data**: Gunakan \`arguments\` pada \`pushNamed\`, dan lempar nilai di \`pop(context, nilai)\`.
3. **Named Routes**: Mengelola rute menggunakan *String* di dalam blok \`MaterialApp\` agar kode sangat rapi.
4. **Keterbatasan setState**: \`setState\` sangat andal di dalam widget lokal, tapi gagal total jika menata data (seperti profil user/keranjang belanja) yang melintas berulang kali ke berbagai layar.
5. **State Global**: Gunakan *Provider* (\`ChangeNotifier\`, \`notifyListeners()\`) sebagai kotak data ajaib. Ambil datanya dengan \`Consumer\`!

Di Modul terakhir, kita akan menembus batas perangkat lokal dan menghubungkan aplikasimu dengan jaringan internet global menggunakan API!`,
            keyTakeaway: "Navigasi rapi dan State Management terstruktur (Provider) adalah dua pilar penyangga aplikasi berskala produksi. Keduanya sangat mutlak untuk dikuasai di ekosistem Flutter."
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Ujian Validasi Modul 2",
            content: "Buktikan kamu menguasai seni memindahkan layar, Named Routes, dan pengelolaan state global menggunakan pola Provider di Flutter.",
            quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
          }
        ],
        quizBank: []
      }
    },
    {
      title: "Networking, API & Penyimpanan Lokal",
      slug: "networking-api-penyimpanan-lokal",
      order: 3,
      xpReward: 200,
      sources: [
        { type: "YOUTUBE", title: "Flutter Networking, API & SharedPreferences", url: "https://www.youtube.com/watch?v=1gDhl4leEzA" },
        { type: "DOCUMENTATION", title: "Fetch data from the internet", url: "https://docs.flutter.dev/cookbook/networking/fetch-data" },
        { type: "DOCUMENTATION", title: "Asynchronous programming", url: "https://dart.dev/codelabs/async-await" }
      ],
      contentObject: {
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Asynchronous Dart (Future)",
            content: `Sebelum kita menembak API ke internet, kita wajib memahami sifat alamiah koneksi jaringan: **Itu Membutuhkan Waktu**.

Aplikasi tidak boleh *freeze* (membeku) selama menunggu server membalas pesan. Di sinilah konsep **Asynchronous** bahasa Dart bekerja.
Dart menggunakan tipe data **\`Future<T>\`**. 

\`Future\` adalah janji (*promise*) bahwa di masa depan nanti, kotak ini akan berisi sebuah data bertipe \`T\`. Selama \`Future\` belum selesai, aplikasi tetap bisa bergerak menjalankan kode lain.

Untuk mengendalikan aliran waktu ini, Dart menggunakan kata kunci **\`async\`** pada fungsi, dan **\`await\`** sebelum memanggil pekerjaan yang memakan waktu.
\`await\` menginstruksikan sistem: "Berhentilah di baris ini dan kerjakan tugas lain sampai tugas ini selesai, barulah lanjutkan eksekusi ke baris bawahnya."`,
            keyTakeaway: "Operasi internet wajib menggunakan Future. Fungsi yang menangani operasi tersebut harus ditandai sebagai async, dan eksekusinya ditunggu menggunakan kata kunci await."
          },
          {
            slideNumber: 2,
            type: "lesson",
            title: "Persiapan HTTP Request",
            content: `Flutter tidak memiliki fungsi bawaan yang canggih untuk mengambil data dari web. Kita wajib menambahkan *library* eksternal. Yang paling standar adalah *package* \`http\`.

Di dunia nyata, kamu akan menambahkan dependensi ini di file \`pubspec.yaml\`:
\`\`\`yaml
dependencies:
  http: ^1.1.0
\`\`\`

Lalu di file Dart-mu, impor dengan *alias* agar fungsinya terorganisir:
\`\`\`dart
import 'package:http/http.dart' as http;
\`\`\`

Ada banyak metode REST API yang bisa kita gunakan:
- \`http.get()\`: Untuk mengambil data bacaan (seperti daftar artikel).
- \`http.post()\`: Untuk mengirim data baru (seperti form register).
- \`http.put()\`: Untuk memperbarui data.
- \`http.delete()\`: Untuk menghapus data.`,
            keyTakeaway: "Library 'http' adalah standar wajib untuk menghubungkan aplikasi Flutter-mu ke server backend. Selalu berikan alias 'as http' saat melakukan import agar namespace tidak bentrok."
          },
          {
            slideNumber: 3,
            type: "example",
            title: "Parsing JSON (Serialization)",
            content: `Perhatikan baik-baik, ini adalah rintangan tersulit di Flutter!
Saat data tiba dari internet, formatnya adalah teks mentah (String JSON). Dart tidak bisa membaca String JSON secara langsung.

Kita harus mengonversinya menjadi *Class Dart* (Objek) agar bisa dikelola dengan aman (tipe-datanya jelas).

\`\`\`dart
import 'dart:convert'; // Wajib diimpor untuk mendecode JSON
import 'package:http/http.dart' as http;

Future<void> fetchUser() async {
  // 1. Ambil URL (Wajib di-parse jadi Uri)
  final url = Uri.parse('https://jsonplaceholder.typicode.com/users/1');
  
  // 2. Tembak API
  final response = await http.get(url);

  // 3. Cek Status Code (200 artinya Sukses)
  if (response.statusCode == 200) {
    // 4. Konversi String Mentah jadi Map (Dictionary Dart)
    final Map<String, dynamic> dataJson = jsonDecode(response.body);
    
    // 5. Cetak ke console
    print("Nama User: \${dataJson['name']}");
  } else {
    throw Exception('Gagal memuat data');
  }
}
\`\`\`
Fungsi \`jsonDecode\` dari \`dart:convert\` adalah pahlawan yang mengubah teks kaku menjadi Map dinamis!`,
            keyTakeaway: "Response jaringan (response.body) adalah teks mentah. Kamu WAJIB menggunakan fungsi jsonDecode() untuk merakitnya menjadi format Map (Key-Value) yang dimengerti bahasa Dart."
          },
          {
            slideNumber: 4,
            type: "challenge",
            title: "Challenge: Mengirim HTTP Get",
            content: "Seorang developer kebingungan mengapa aplikasi Flutter-nya tidak bisa mengambil data dari API GitHub. Terdapat dua kesalahan yang ia lakukan.",
            challenge: {
              instruction: "Perbaiki kode berikut: Gunakan Uri.parse untuk format URL, dan tambahkan kata kunci 'await' pada operasi asinkron.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "import 'package:http/http.dart' as http;\n\nFuture<void> cekGithub() async {\n  final stringUrl = 'https://api.github.com/users';\n  \n  // ERROR 1: URL masih berbentuk string mentah, ubah dengan Uri.parse()\n  final myUrl = stringUrl;\n  \n  // ERROR 2: http.get butuh waktu. Tambahkan penahan asinkron\n  final response = http.get(myUrl);\n  \n  print('Selesai!');\n}",
              expectedConcepts: ["Uri.parse", "await"],
              evaluationCriteria: "Evaluasi penggunaan Uri.parse pada stringUrl dan kata kunci await sebelum http.get",
              hints: [
                "Ganti `stringUrl` menjadi `Uri.parse(stringUrl)`",
                "Tambahkan kata kunci `await` tepat sebelum fungsi `http.get`"
              ],
              sampleAnswer: "import 'package:http/http.dart' as http;\n\nFuture<void> cekGithub() async {\n  final stringUrl = 'https://api.github.com/users';\n  final myUrl = Uri.parse(stringUrl);\n  final response = await http.get(myUrl);\n  \n  print('Selesai!');\n}",
              followUpQuestion: "Apa tipe data kembalian dari http.get jika kita tidak menggunakan kata kunci await?"
            }
          },
          {
            slideNumber: 5,
            type: "lesson",
            title: "FutureBuilder: Senjata Rahasia Flutter",
            content: `Di React, kamu harus mengatur \`useState(loading)\` dan \`useState(data)\` secara manual. Di Flutter, ada dewa penyelamat bernama **\`FutureBuilder\`**!

Widget ini akan mendengarkan fungsi asinkron (Future) milikmu secara otomatis, lalu membangun antarmuka berbeda berdasarkan status jaringannya:
1. Status *Waiting*: Menampilkan ikon *loading*.
2. Status *Error*: Menampilkan pesan kegagalan server.
3. Status *Done/Data*: Menampilkan daftar UI berisi data.

Ini membuat kode fetching datamu 10x lebih bersih karena tidak perlu menyimpan status loading secara manual ke dalam \`setState\`.`,
            keyTakeaway: "FutureBuilder adalah widget khusus yang bisa merender ulang layar secara ajaib sesuai dengan siklus hidup operasi asinkron (Menunggu -> Error/Sukses)."
          },
          {
            slideNumber: 6,
            type: "example",
            title: "Membangun UI dengan FutureBuilder",
            content: `Begini betapa cantiknya struktur *FutureBuilder* di dalam fungsi \`build()\`:

\`\`\`dart
// Diasumsikan fetchArtikel() mengembalikan Future<String>
FutureBuilder<String>(
  future: fetchArtikel(), // Hubungkan fungsi fetch di sini
  builder: (context, snapshot) {
    // 1. Kondisi Loading
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const CircularProgressIndicator(); 
    } 
    // 2. Kondisi Error
    else if (snapshot.hasError) {
      return Text('Gagal: \${snapshot.error}');
    } 
    // 3. Kondisi Sukses
    else if (snapshot.hasData) {
      return Text('Isi Artikel: \${snapshot.data}');
    }
    
    // Fallback UI
    return const Text('Tidak ada data');
  },
)
\`\`\`
Widget ini memastikan pengguna tidak akan pernah menatap layar putih kosong!`,
            keyTakeaway: "Selalu manfaatkan parameter 'snapshot' di dalam FutureBuilder untuk memeriksa state jaringan (waiting) dan mengolah keberadaan error (hasError) atau data sukses (hasData)."
          },
          {
            slideNumber: 7,
            type: "lesson",
            title: "Penyimpanan Lokal (Shared Preferences)",
            content: `Bagaimana caramu menyimpan status "Apakah User sudah login?" atau menyimpan Token JWT? Kamu tidak mungkin menembak API setiap kali aplikasi baru dibuka, bukan?

Kita butuh menyimpan data ringan itu secara permanen di dalam memori internal HP pengguna.
*Package* standar yang paling sering digunakan adalah **\`shared_preferences\`**.

Ini bekerja seperti brankas Key-Value sederhana (mirip *LocalStorage* di browser web).

\`\`\`dart
import 'package:shared_preferences/shared_preferences.dart';

// MENYIMPAN DATA (Async)
Future<void> simpanSesi() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setBool('isLoggedIn', true); // Kunci: isLoggedIn
}

// MEMBACA DATA (Async)
Future<void> cekSesi() async {
  final prefs = await SharedPreferences.getInstance();
  // Jika tidak ada data, kembalikan false sebagai default
  final bool status = prefs.getBool('isLoggedIn') ?? false; 
  print("Status Login: $status");
}
\`\`\`
Catatan: Jangan gunakan alat ini untuk menyimpan data sangat rahasia (seperti password mentah), karena sistem ini bisa dijebol pada *device* yang sudah di-root/jailbreak. Gunakan *Flutter Secure Storage* untuk keamanan ekstra.`,
            keyTakeaway: "Shared Preferences adalah solusi termudah dan tercepat untuk menyimpan data konfigurasi lokal berukuran kecil (pengaturan tema, token, status onboarding)."
          },
          {
            slideNumber: 8,
            type: "lesson",
            title: "Handling Timeout & Error di API",
            content: `Dunia nyata jaringan internet tidak selalu mulus. Pengguna bisa saja berada di terowongan (*no signal*) atau server API sedang *down*.
Oleh karena itu, kode *fetch* yang baik tidak hanya menggunakan blok \`try-catch\`, tetapi juga mengimplementasikan batasan waktu (*timeout*).

Jika kita tidak memberlakukan batas waktu, aplikasi bisa "nge-hang" dan loading *progress bar* akan berputar abis-abisan tanpa akhir.

\`\`\`dart
import 'package:http/http.dart' as http;
import 'dart:async'; // Butuh untuk TimeoutException

Future<void> fetchAman() async {
  try {
    // Kita panggil .timeout() tepat setelah eksekusi .get()
    final response = await http.get(Uri.parse('https://api.example.com/data'))
        .timeout(const Duration(seconds: 10)); // Batas waktu 10 detik
        
    if (response.statusCode == 200) {
      print("Sukses Data: \${response.body}");
    } else {
      print("Gagal dengan kode: \${response.statusCode}");
    }
  } on TimeoutException catch (e) {
    print('Jaringan terlalu lambat. Timeout: $e');
  } catch (e) {
    print('Gagal tersambung ke jaringan: $e');
  }
}
\`\`\`
Perhatikan penggunaan klausa \`on Exception catch\`. Ini memungkinkan kita mendeteksi *spesifik* jenis kegagalan jaringan yang terjadi untuk memberikan peringatan yang relevan ke *User*.`,
            keyTakeaway: "Panggilan HTTP di ponsel wajib memiliki penanganan Timeout. Jangan biarkan aplikasi menunggu server yang tidak responsif selama-lamanya."
          },
          {
            slideNumber: 9,
            type: "example",
            title: "Retry Mechanism (Mekanisme Ulang)",
            content: `Ketika terjadi *TimeoutException*, apa reaksi aplikasi yang paling elegan? 
Memberikan *user* sebuah tombol "Coba Lagi" (Retry) di layar.

Dalam konteks *FutureBuilder*, mekanisme Retry sangatlah mudah.
Kita hanya perlu menaruh fungsi *fetch* tersebut di dalam variabel lokal, dan memanggil \`setState\` untuk menimpa variabel tersebut saat tombol "Coba Lagi" ditekan.

\`\`\`dart
class LayarBerita extends StatefulWidget { ... }

class _LayarBeritaState extends State<LayarBerita> {
  // 1. Simpan Future di variabel State
  late Future<List<Berita>> _futureBerita;

  @override
  void initState() {
    super.initState();
    _futureBerita = ambilDataDariAPI(); // Dipanggil pertama kali
  }

  // 2. Fungsi Retry
  void _cobaLagi() {
    setState(() {
      _futureBerita = ambilDataDariAPI(); // Memaksa re-fetch!
    });
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _futureBerita, // Masukkan variabel state ke FutureBuilder
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          // 3. Tampilkan Tombol Retry
          return Column(
            children: [
              Text('Gagal Memuat Jaringan.'),
              ElevatedButton(onPressed: _cobaLagi, child: Text('Coba Lagi'))
            ]
          );
        }
        // ... (Kondisi Sukses & Loading)
      }
    );
  }
}
\`\`\`
Sangat bersih dan deklaratif, bukan?`,
            keyTakeaway: "Dengan menyimpan Future di dalam variabel State (bukan langsung di parameter fungsi build), kita bisa memperbarui (retry) pemanggilan API hanya bermodalkan setState."
          },
          {
            slideNumber: 10,
            type: "lesson",
            title: "Local Storage Lanjutan (JSON Encoding)",
            content: `Kita sudah belajar menggunakan \`shared_preferences\` untuk menyimpan \`getBool\` dan \`setBool\`.
Bagaimana jika kita butuh menyimpan data rumit (seperti Objek Profil *User* berisikan nama, umur, alamat) ke memori lokal?

*Shared Preferences* tidak mendukung penyimpanan objek kustom. Ia hanya menerima *String*, *Int*, *Double*, atau *Bool*.
Oleh karena itu, **kita harus mengubah objek Dart kita menjadi teks JSON panjang (String)** sebelum menyimpannya ke memori perangkat.

\`\`\`dart
import 'dart:convert'; // Untuk jsonEncode
import 'package:shared_preferences/shared_preferences.dart';

Future<void> simpanProfilUser() async {
  final Map<String, dynamic> user = {
    'nama': 'Raditya',
    'umur': 22,
    'premium': true
  };
  
  // 1. Ubah Map (Objek) menjadi format String (JSON mentah)
  String dataString = jsonEncode(user);
  
  // 2. Simpan String tersebut ke Memori
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('profil_user', dataString);
}
\`\`\``,
            keyTakeaway: "Shared Preferences hanya mendukung penyimpanan data primitif. Jika ingin menyimpan data Map atau List beranak, kamu wajib merubahnya (jsonEncode) menjadi String."
          },
          {
            slideNumber: 11,
            type: "challenge",
            title: "Challenge: Mengubah Teks jadi Objek (Local Storage)",
            content: `Kamu adalah programmer senior yang diminta membaca data dari memori (berkebalikan dari materi sebelumnya).`,
            challenge: {
              instruction: "Lengkapi fungsi di bawah ini. Baca 'profil_user' dari memory, ubah jsonString tersebut KEMBALI menjadi tipe Objek/Map, lalu panggil fungsi print() yang mencetak properti 'nama'.",
              inputType: "code",
              inputPlaceholder: "...",
              starterCode: "import 'dart:convert';\nimport 'package:shared_preferences/shared_preferences.dart';\n\nFuture<void> bacaProfilUser() async {\n  final prefs = await SharedPreferences.getInstance();\n  // 1. Baca data dari memori (berupa teks)\n  String? dataString = prefs.getString('profil_user');\n  \n  if (dataString != null) {\n    // 2. TULIS KODEMU DI SINI\n    // Trik: Gunakan jsonDecode(dataString) untuk mengubahnya ke Map\n    \n    // 3. TULIS KODEMU DI SINI\n    // Trik: Cetak nilainya: print(objekKamu['nama'])\n    \n  }\n}",
              expectedConcepts: ["jsonDecode", "print"],
              evaluationCriteria: "Evaluasi apakah peserta memanggil fungsi jsonDecode(dataString) dan melakukan print atas indeks ['nama'].",
              hints: ["Tulis Map<String, dynamic> data = jsonDecode(dataString);", "Untuk print, panggil print(data['nama']);"],
              sampleAnswer: "import 'dart:convert';\nimport 'package:shared_preferences/shared_preferences.dart';\n\nFuture<void> bacaProfilUser() async {\n  final prefs = await SharedPreferences.getInstance();\n  String? dataString = prefs.getString('profil_user');\n  \n  if (dataString != null) {\n    Map<String, dynamic> data = jsonDecode(dataString);\n    print(data['nama']);\n  }\n}",
              followUpQuestion: "Kenapa kita harus menggunakan tanda tanya (`String?`) pada fungsi getString?"
            }
          },
          {
            slideNumber: 12,
            type: "lesson",
            title: "Estetika Loading: Skeleton Shimmer",
            content: `Secara default, saat menunggu respons API (di fase \`ConnectionState.waiting\`), developer biasanya menampilkan \`CircularProgressIndicator()\` (Logo loading yang muter-muter).

Walau fungsional, ini dirasa kuno di tahun 2026. Aplikasi besar seperti YouTube, Facebook, dan Netflix menggunakan **Skeleton Loading (Shimmer Effect)**. Yaitu kerangka kotak-kotak abu-abu yang berkedip-kedip menyerupai bentuk asli layout kontennya.

Di ekosistem pub.dev Flutter, package **\`shimmer\`** adalah bintang utama untuk hal ini.

Cara kerjanya (setelah menginstall package \`shimmer\`):
\`\`\`dart
import 'package:shimmer/shimmer.dart';

Widget renderSkeletonList() {
  return Shimmer.fromColors(
    baseColor: Colors.grey[300]!, // Warna dasar abu-abu
    highlightColor: Colors.grey[100]!, // Warna putih kerlap-kerlip
    child: ListView.builder(
      itemCount: 5,
      itemBuilder: (_, __) => Padding(
        padding: const EdgeInsets.all(8.0),
        child: Container(
          height: 80,
          color: Colors.white, // Penting: Ini bukan warna latar, melainkan template bentuk!
        ),
      ),
    ),
  );
}
\`\`\``,
            keyTakeaway: "Tinggalkan CircularProgressIndicator untuk pemuatan data layar penuh. Implementasikan package 'shimmer' di kondisi 'waiting' milik FutureBuilder agar aplikasi terlihat berkelas dunia."
          },
          {
            slideNumber: 13,
            type: "example",
            title: "Menyelaraskan Semuanya (Final Architecture)",
            content: `Ini adalah gambaran utuh dari semua fitur terbaik yang telah kita pelajari di Modul 3 jika dirangkai menjadi satu arsitektur production-ready:

1. **Service Layer (api_service.dart)**: File terpisah yang HANYA berisi fungsi HTTP Get/Post, Parsing JSON menjadi Object Dart, dan membuang error (*throw exception*).
2. **State Layer (Provider/Riverpod)**: Model yang mengeksekusi metode Service API tadi, lalu membungkus hasilnya atau menampung pesan *Error*-nya, dan memanggil \`notifyListeners()\`.
3. **UI Layer (screen.dart)**: HANYA berfokus merender UI. Ia berlangganan ke State lewat \`Consumer\`. Jika nilai dari state adalah \`isLoading\`, maka merender Skeleton Shimmer. Jika ada \`isError\`, maka merender layar peringatan + tombol Retry. Jika sukses, maka me-render List Card data yang cantik.
4. **Cache Layer (shared_preferences)**: UI / State juga mengecek \`shared_preferences\` untuk mengambil *Token Akses* pengguna sebelum Service diizinkan menembak API (Authorization Bearer).

Pemisahan tanggung jawab (Separation of Concern) ini adalah jantung dari kode bebas *bug* dan mudah di-*maintenance* oleh ratusan *developer* yang bekerja di tim yang sama.`,
            keyTakeaway: "Jangan mencampur aduk pemanggilan API mentah, logika parsing JSON, dan kode styling UI di dalam satu file. Pisahkan menjadi lapisan Service, State, dan View (UI)."
          },
          {
            slideNumber: 14,
            type: "lesson",
            title: "Selamat Lulus dari Flutter Academy!",
            content: `Pencapaian yang menakjubkan. Kurikulum Dasar Flutter telah tuntas kamu lalui!

**The Grand Recap:**
1. **Everything is a Widget**: UI bukan ditulis di XML atau HTML, melainkan dirakit layaknya pohon keluarga dari berbagai fungsi bersarang.
2. **Stateless vs Stateful**: Gunakan Stateless untuk visual statis, dan Stateful (dengan \`setState\`) jika ada animasi atau data yang berubah di layar.
3. **Navigasi Stack**: Berpindah aplikasi ibarat menumpuk dan membongkar kartu menggunakan Navigator.
4. **Asinkron & API**: Waktu tunggu internet dikuasai dengan \`async/await\`, \`timeout\`, String diubah jadi Objek via \`jsonDecode\`, dan di-render elegan menggunakan \`FutureBuilder\` dengan efek *Shimmer*.
5. **Arsitektur Rapi**: Jangan gabungkan logika bisnis, jaringan API HTTP, dan UI *styling* di dalam file yang sama.

Di luar sana, industri sangat membutuhkan *Flutter Developer* karena kecepatan produksinya yang mampu merilis aplikasi iOS dan Android secara bersamaan. *Stay curious, and keep fluttering!*`,
            keyTakeaway: "Flutter bukan sekadar framework, ia adalah sebuah mesin render mandiri. Menguasai Dart dan pola Widget akan membuka karier cemerlangmu di dunia Mobile App Development."
          },
          {
            slideNumber: 15,
            type: "quiz",
            title: "Grand Final Quiz: Flutter Expert",
            content: "Ujian Validasi Terakhir! Networking, FutureBuilder, Navigasi, Timeout, Shimmer dan JSON parsing akan diuji habis-habisan.",
            quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
          }
        ],
        quizBank: []
      }
    }
  ]
};
