import { PrismaClient, Prisma } from "@prisma/client";
import * as fs from "fs";

if (fs.existsSync(".env.local")) {
  const envConfig = fs.readFileSync(".env.local", "utf-8");
  envConfig.split("\n").forEach((line) => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m && m[1] && m[2])
      process.env[m[1].trim()] = m[2].trim().replace(/^['"](.*)['"]$/, "$1");
  });
}

const prisma = new PrismaClient();

// 4 slide konten baru (free course → tanpa challenge).
const NEW_SLIDES = [
  {
    order: 5,
    type: "lesson",
    title: "Menemukan Masalah yang Layak Dibayar",
    keyTakeaway:
      "Orang tidak membeli produk — mereka membayar untuk menyelesaikan masalahnya.",
    body: `Banyak pemula sibuk memikirkan "mau jual apa", padahal pertanyaan yang benar adalah "masalah siapa yang mau aku selesaikan?". Ada pepatah klasik di dunia bisnis: orang tidak benar-benar ingin membeli bor listrik — yang mereka inginkan adalah **lubang di tembok**. Bor cuma alat. Begitu juga usahamu: ia hanya laku kalau menyelesaikan masalah nyata yang bikin orang rela merogoh dompet.

Cara menemukannya gampang dan murah: dengarkan **keluhan yang berulang** di sekitarmu. Perhatikan grup WhatsApp komplek ("ada yang tahu tukang AC nggak?"), ulasan bintang 1 di marketplace, atau curhat teman kos ("males banget nyuci, mending bayar"). Keluhan yang muncul berulang-ulang dari banyak orang adalah sinyal pasar yang jujur — jauh lebih jujur daripada ide cemerlang yang muncul tengah malam.

Contohnya, laundry kiloan tumbuh subur di sekitar kampus bukan karena idenya keren, tapi karena ada masalah konkret: anak kos sibuk dan malas mencuci. Coba latihan kecil: tulis 5 keluhan yang kamu dengar minggu ini. Tapi hati-hati — tidak semua masalah layak dijadikan bisnis. Bagaimana membedakannya?`,
    sources: [
      {
        type: "DOCUMENTATION",
        title: "Kewirausahaan — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kewirausahaan",
      },
      {
        type: "YOUTUBE",
        title: "Raymond Chin — Edukasi Bisnis & Finansial",
        url: "https://www.youtube.com/@RaymondChins",
      },
    ],
  },
  {
    order: 6,
    type: "lesson",
    title: "Kebutuhan vs Keinginan: Mana yang Bikin Dompet Terbuka",
    keyTakeaway:
      "Kebutuhan mendesak dibayar cepat; keinginan beridentitas dibayar mahal. Pemula sebaiknya mulai dari kebutuhan.",
    body: `Setelah menemukan masalah, kamu perlu tahu apakah itu **kebutuhan** atau **keinginan** — karena keduanya berperilaku sangat berbeda di dompet pelanggan.

**Kebutuhan** adalah sesuatu yang harus dipenuhi sekarang. Token listrik habis tengah malam? Orang akan bayar berapa pun yang wajar, tanpa banyak pertimbangan. Tukang tambal ban di jalan sepi bisa pasang harga lebih tinggi karena kamu tidak punya pilihan. Ciri kebutuhan: urgensi tinggi, keputusan cepat, tawar-menawar rendah.

**Keinginan** adalah sesuatu yang membuat orang merasa lebih baik tentang dirinya. Kopi kekinian seharga Rp30.000 bukan soal haus — itu soal gaya hidup dan identitas. Margin-nya besar, tapi kamu harus pandai membangun merek dan cerita.

Untuk pemula dengan modal dan waktu terbatas, **mulailah dari kebutuhan dengan urgensi tinggi**. Kenapa? Karena validasinya cepat: orang yang benar-benar butuh akan langsung bayar, bukan cuma bilang "wah bagus tuh idenya". Contoh klasik: jasa fotokopi dan jilid dekat kampus yang panen saat musim ujian. Pertanyaannya sekarang: berapa modal minimal supaya kamu bisa mulai menguji ini?`,
  },
  {
    order: 7,
    type: "example",
    title: "Bootstrapping: Mulai dengan Modal Sekecil Mungkin",
    keyTakeaway:
      "Jangan beli aset mahal sebelum ada permintaan. Buktikan dulu, baru investasi.",
    body: `Bootstrapping artinya membangun usaha dari kantong sendiri dan diputar dari hasil penjualan — tanpa utang besar atau investor. Untuk pemula, ini bukan kekurangan, justru **pelindung**: kamu dipaksa membuktikan ide laku sebelum membakar banyak uang.

Mari pakai angka nyata. Misal kamu mau jualan risoles:
- Modal bahan untuk 50 pcs: ± Rp150.000
- Harga jual: Rp3.000/pcs → 50 pcs = Rp150.000

Batch pertama hanya untuk **balik modal dan menguji rasa**. Profit baru datang dari batch kedua dan seterusnya, setelah kamu tahu orang mau beli lagi. Perhatikan: kamu tidak perlu beli freezer, gerobak, atau sewa kios dulu. Itu semua **aset mahal yang membunuh pemula**.

Prinsip emasnya: jangan beli aset sebelum ada permintaan. Butuh tempat? Pakai dapur rumah. Butuh stok? Sistem pre-order (uang masuk dulu, baru produksi). Butuh alat mahal? Sewa atau pinjam. Analoginya: jangan beli gerobak bakso mahal sebelum tahu baksomu benar-benar laku di gang itu. Lalu, bagaimana kalau usahamu sudah jalan dan kamu ingin naik kelas?`,
  },
  {
    order: 8,
    type: "casestudy",
    title: "Studi Kasus: Dari Titip Jual ke Brand Sendiri",
    keyTakeaway:
      "Data pelanggan sering lebih berharga daripada stok barang.",
    body: `Bayangkan Sinta, mahasiswi yang ingin jualan hijab tapi modalnya pas-pasan. Banyak orang menyarankan dia langsung kulakan 200 pcs supaya harga per unit murah. Untungnya, Sinta memilih jalan yang lebih sabar.

**Tahap 1 — Pre-order tanpa stok.** Sinta memajang foto katalog dari supplier dan hanya membeli setelah ada yang pesan + bayar DP. Risiko stok menumpuk = nol. Modal tertahan = minimal.

**Tahap 2 — Mengumpulkan data, bukan cuma uang.** Setiap transaksi, Sinta mencatat: warna apa yang paling laku, ukuran favorit, dan keluhan ("bahannya panas", "maunya yang polos"). Setelah 3 bulan, dia punya sesuatu yang jauh lebih berharga dari uang: **peta selera 100+ pelanggan setia**.

**Tahap 3 — Produksi brand sendiri.** Berbekal data itu, Sinta memesan produksi dengan bahan dan warna yang sudah pasti diminati. Hasilnya nyaris tanpa stok mati, karena dia memproduksi apa yang sudah terbukti dicari.

Pelajaran yang sering mengejutkan pemula: di awal, **data pelanggan lebih berharga daripada stok barang**. Stok bisa basi; pemahaman tentang pelanggan justru makin bernilai seiring waktu.

Coba renungkan: apa risiko terbesar jika Sinta langsung produksi massal 200 pcs di hari pertama?`,
  },
];

const QUIZ_BANK = [
  {
    id: "q1",
    question:
      "Seorang pemula bingung 'mau jualan apa'. Menurut prinsip di modul ini, pertanyaan mana yang lebih tepat dia ajukan lebih dulu?",
    options: [
      { id: "a", text: "Produk apa yang paling untung dijual?" },
      { id: "b", text: "Masalah siapa yang ingin aku selesaikan?" },
      { id: "c", text: "Berapa modal yang harus aku pinjam?" },
      { id: "d", text: "Kompetitor sudah jualan apa saja?" },
    ],
    correctAnswer: "b",
    explanation:
      "Bisnis bertahan karena menyelesaikan masalah nyata. Fokus pada masalah pelanggan (bukan produk) memastikan ada orang yang benar-benar rela membayar. Opsi lain penting, tetapi datang setelah masalah jelas.",
    difficulty: "easy",
  },
  {
    id: "q2",
    question:
      "Analogi 'orang tidak ingin bor, mereka ingin lubang di tembok' paling tepat mengajarkan bahwa...",
    options: [
      { id: "a", text: "Produk fisik selalu kalah dari jasa" },
      { id: "b", text: "Pelanggan membeli hasil/solusi, bukan sekadar produk" },
      { id: "c", text: "Bor adalah bisnis yang buruk" },
      { id: "d", text: "Harga murah selalu menang" },
    ],
    correctAnswer: "b",
    explanation:
      "Inti analogi: orang membayar untuk hasil akhir (lubang/solusi), bukan alatnya. Maka rancang penawaran berdasarkan hasil yang diinginkan pelanggan.",
    difficulty: "easy",
  },
  {
    id: "q3",
    question:
      "Token listrik habis tengah malam dan orang langsung membeli berapa pun harga wajarnya. Ini contoh dari...",
    options: [
      { id: "a", text: "Keinginan beridentitas" },
      { id: "b", text: "Kebutuhan dengan urgensi tinggi" },
      { id: "c", text: "Pembelian impulsif karena gengsi" },
      { id: "d", text: "Strategi branding" },
    ],
    correctAnswer: "b",
    explanation:
      "Urgensi tinggi + keputusan cepat + tawar-menawar rendah adalah ciri kebutuhan mendesak. Inilah kenapa pemula disarankan mulai dari kebutuhan: validasinya cepat.",
    difficulty: "easy",
  },
  {
    id: "q4",
    question:
      "Mengapa kursus ini menyarankan pemula memulai dari 'kebutuhan' ketimbang 'keinginan'?",
    options: [
      { id: "a", text: "Karena kebutuhan selalu bermargin lebih besar" },
      { id: "b", text: "Karena keinginan tidak pernah laku" },
      {
        id: "c",
        text: "Karena kebutuhan lebih cepat divalidasi — orang yang butuh langsung membayar",
      },
      { id: "d", text: "Karena kebutuhan tidak butuh pemasaran sama sekali" },
    ],
    correctAnswer: "c",
    explanation:
      "Keinginan (mis. kopi kekinian) bisa bermargin besar tapi butuh branding kuat. Untuk pemula bermodal terbatas, kebutuhan lebih cepat membuktikan ada uang nyata yang mengalir.",
    difficulty: "medium",
  },
  {
    id: "q5",
    question:
      "Kamu menjual risoles: modal 50 pcs = Rp150.000, harga jual Rp3.000/pcs. Apa makna paling tepat dari batch pertama?",
    options: [
      { id: "a", text: "Langsung untung Rp150.000" },
      {
        id: "b",
        text: "Sebagian besar untuk balik modal & menguji apakah rasanya laku",
      },
      { id: "c", text: "Rugi karena harga terlalu murah" },
      { id: "d", text: "Wajib beli freezer dulu agar awet" },
    ],
    correctAnswer: "b",
    explanation:
      "50 × Rp3.000 = Rp150.000 = persis modal. Batch pertama untuk balik modal dan validasi rasa/permintaan. Profit datang dari batch berikutnya setelah terbukti laku.",
    difficulty: "medium",
  },
  {
    id: "q6",
    question:
      "Prinsip bootstrapping 'jangan beli aset mahal sebelum ada permintaan' paling baik dipraktikkan dengan...",
    options: [
      { id: "a", text: "Pinjam KUR besar untuk beli gerobak premium" },
      { id: "b", text: "Sistem pre-order: uang masuk dulu, baru produksi" },
      { id: "c", text: "Sewa kios paling ramai dari hari pertama" },
      { id: "d", text: "Beli stok sebanyak mungkin agar harga satuan murah" },
    ],
    correctAnswer: "b",
    explanation:
      "Pre-order membalik arus kas: permintaan terbukti dulu sebelum keluar modal. Ini melindungi pemula dari aset mahal dan stok mati.",
    difficulty: "medium",
  },
  {
    id: "q7",
    question:
      "Dalam studi kasus Sinta, mengapa mencatat warna/ukuran favorit pelanggan disebut lebih berharga daripada menumpuk stok?",
    options: [
      { id: "a", text: "Karena data bisa dijual ke kompetitor" },
      {
        id: "b",
        text: "Karena data selera memandu produksi yang pasti diminati, sehingga minim stok mati",
      },
      { id: "c", text: "Karena stok barang tidak pernah penting" },
      { id: "d", text: "Karena pelanggan suka diawasi" },
    ],
    correctAnswer: "b",
    explanation:
      "Stok bisa basi/mati; pemahaman selera pelanggan justru memandu keputusan produksi berikutnya sehingga lebih efisien dan bernilai jangka panjang.",
    difficulty: "hard",
  },
  {
    id: "q8",
    question:
      "Mana yang PALING merupakan sinyal pasar jujur bahwa sebuah masalah layak dijadikan bisnis?",
    options: [
      { id: "a", text: "Ide brilian yang muncul tengah malam" },
      { id: "b", text: "Pujian teman bahwa idemu keren" },
      {
        id: "c",
        text: "Keluhan yang sama muncul berulang dari banyak orang",
      },
      { id: "d", text: "Tren yang sedang viral minggu ini" },
    ],
    correctAnswer: "c",
    explanation:
      "Keluhan berulang dari banyak orang menandakan masalah nyata dan tersebar. Pujian dan ide tengah malam belum tentu berarti orang mau membayar.",
    difficulty: "medium",
  },
  {
    id: "q9",
    question:
      "Bahaya terbesar jika Sinta langsung produksi massal 200 pcs di hari pertama adalah...",
    options: [
      { id: "a", text: "Harga satuan jadi terlalu murah" },
      {
        id: "b",
        text: "Modal terkunci di stok yang belum tentu sesuai selera pasar (risiko stok mati)",
      },
      { id: "c", text: "Pelanggan jadi terlalu banyak" },
      { id: "d", text: "Tidak ada bahaya sama sekali" },
    ],
    correctAnswer: "b",
    explanation:
      "Tanpa data permintaan, produksi massal mengunci modal pada barang yang mungkin tidak laku — inti kesalahan yang dihindari lewat pre-order & pengumpulan data.",
    difficulty: "hard",
  },
  {
    id: "q10",
    question:
      "Seorang teman berkata: 'Aku nggak mulai usaha karena belum punya modal puluhan juta.' Respons yang paling sesuai mindset modul ini adalah...",
    options: [
      {
        id: "a",
        text: "Benar, tanpa modal besar mustahil memulai usaha",
      },
      {
        id: "b",
        text: "Mulai kecil dengan bootstrapping & pre-order untuk menguji permintaan dulu",
      },
      { id: "c", text: "Pinjam sebanyak-banyaknya agar langsung besar" },
      { id: "d", text: "Tunggu sampai punya investor" },
    ],
    correctAnswer: "b",
    explanation:
      "Modal besar bukan syarat awal. Bootstrapping & pre-order memungkinkan memulai dengan risiko kecil sambil membuktikan permintaan — inti dari 'Ilusi Modal Besar'.",
    difficulty: "easy",
  },
];

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: { contains: "Kewirausahaan" } },
    select: {
      id: true,
      title: true,
      modules: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          slides: {
            orderBy: { order: "asc" },
            select: { id: true, title: true, order: true, content: true },
          },
        },
      },
    },
  });
  if (!course || !course.modules[0]) throw new Error("Course/module tidak ditemukan");

  const mod = course.modules[0];
  const slides = mod.slides;
  const findByType = (t: string) =>
    slides.find((s) => (s.content as Record<string, unknown>)?.type === t);

  const challenge = findByType("challenge");
  const summary = findByType("summary");
  const quiz = findByType("quiz");

  // Idempotent: skip kalau slide baru sudah ada.
  const already = slides.some((s) => s.title === NEW_SLIDES[0]!.title);
  if (already) {
    console.log("Slide perbaikan sudah ada — skip pembuatan, hanya pastikan quiz.");
  } else {
    // 1. Geser challenge→9, summary→10, quiz→11 (order tidak unik, aman).
    if (challenge)
      await prisma.slide.update({ where: { id: challenge.id }, data: { order: 9 } });
    if (summary)
      await prisma.slide.update({ where: { id: summary.id }, data: { order: 10 } });
    if (quiz)
      await prisma.slide.update({ where: { id: quiz.id }, data: { order: 11 } });

    // 2. Buat 4 slide konten baru (order 5-8) + sources.
    for (const s of NEW_SLIDES) {
      await prisma.slide.create({
        data: {
          title: s.title,
          moduleId: mod.id,
          order: s.order,
          content: {
            type: s.type,
            body: s.body,
            keyTakeaway: s.keyTakeaway,
          } as unknown as Prisma.InputJsonValue,
          ...(s.sources
            ? {
                sources: {
                  create: s.sources.map((src) => ({
                    type: src.type as Prisma.SourceCreateWithoutSlideInput["type"],
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

  // 3. Pastikan quizBank quiz ≥10 (replace dengan 10 soal berkualitas).
  if (quiz) {
    const qc = quiz.content as Record<string, unknown>;
    await prisma.slide.update({
      where: { id: quiz.id },
      data: {
        content: {
          ...qc,
          type: "quiz",
          body: (qc?.body as string) || "",
          quizBank: QUIZ_BANK,
        } as unknown as Prisma.InputJsonValue,
      },
    });
  }

  // 4. Update totalModules tetap; report jumlah slide akhir.
  const finalCount = await prisma.slide.count({ where: { moduleId: mod.id } });
  console.log(`SELESAI. Modul kini punya ${finalCount} slide.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
