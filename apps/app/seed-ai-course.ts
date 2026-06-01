import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "cmpm4pdtd0002ql6cc8lwtmro"; // admin clarise
  const categoryId = "cmpmwj1ab0005qlmkptcd5bwy"; // Bisnis & Kewirausahaan

  // Mock AI Generated Course - Kualitas Premium sesuai course-template.ts
  const aiCourseData = {
    title: "Dasar Kewirausahaan: Mindset Memulai Usaha",
    slug: "dasar-kewirausahaan-mindset-memulai-usaha-seed",
    description: "Kursus ini akan membongkar mitos bahwa modal adalah segalanya dalam bisnis, dan menggantinya dengan kerangka berpikir eksekusi nyata.",
    difficulty: "BEGINNER",
    modules: [
      {
        title: "Membangun Mindset Pengusaha Tangguh",
        slug: "membangun-mindset-pengusaha",
        order: 1,
        slides: [
          {
            slideNumber: 1,
            type: "lesson",
            title: "Ilusi Modal Besar",
            content: "Pernahkah kamu berpikir untuk mulai berbisnis, tapi langsung menyerah karena merasa tidak punya modal puluhan juta rupiah? Ini adalah ilusi terbesar yang menjebak 90% calon pengusaha di Indonesia. Kenyataannya, modal finansial hanyalah bahan bakar, sementara ide yang tervalidasi adalah mesinnya. Jika mesinmu rusak, sebanyak apa pun bahan bakarmu, mobil tetap tidak akan jalan. \n\nDi dunia nyata, banyak startup raksasa bermula dari hal yang sangat sederhana. Masalah utama bukan pada dompet, melainkan pada keengganan kita untuk memulai dari skala mikro. Pengusaha tangguh tidak menunggu kondisi sempurna; mereka melihat apa yang ada di tangan mereka hari ini dan bertanya, 'Apa yang bisa saya ciptakan dengan ini?'. Konsep ini disebut sebagai efek *Bricolage* (menggunakan apa saja yang ada). \n\nDi akhir modul ini, kamu tidak akan lagi melihat ketiadaan modal sebagai halangan, melainkan sebagai sebuah filter yang akan menyaring pengusaha sejati dari mereka yang hanya sekadar berkhayal. Tapi tunggu dulu, jika bukan modal yang menjadi penentu utama kesuksesan, lalu apa rahasia sebenarnya yang membedakan bisnis yang laku keras dengan yang bangkrut dalam sebulan?",
            keyTakeaway: "Modal uang bukan penentu utama, melainkan kemampuan mengeksekusi ide dengan sumber daya seadanya."
          },
          {
            slideNumber: 2,
            type: "lesson",
            title: "Validasi Ide Ala Tukang Gorengan",
            content: "Mari kita amati seorang pedagang gorengan di pinggir jalan. Apakah beliau menyewa konsultan bisnis senilai ratusan juta untuk riset pasar sebelum berjualan? Tentu tidak. Beliau memotong pisang, menggorengnya, dan meletakkannya di gerobak. Jika dalam tiga hari pisang gorengnya selalu habis sebelum jam 9 pagi, beliau tahu persis bahwa produknya divalidasi oleh pasar. Ini yang kita sebut sebagai *Minimum Viable Product* (MVP).\n\nSeringkali, calon pengusaha terjebak dalam *Analysis Paralysis*—mereka membuat rencana bisnis puluhan halaman, menyewa ruko mahal, dan mendesain logo berbulan-bulan, sebelum menyadari bahwa sebenarnya tidak ada satu pun orang yang mau membeli produk mereka. Pendekatan ala 'Tukang Gorengan' justru jauh lebih aman secara finansial. Kamu meluncurkan versi paling sederhana dari produkmu, menawarkan langsung ke tetangga atau teman grup WhatsApp, dan mengukur reaksi nyata mereka (bukan sekadar pujian).\n\nJangan pernah membangun solusi sebelum kamu benar-benar yakin ada masalah yang sedang kamu pecahkan. Uang pelanggan adalah satu-satunya bentuk validasi yang jujur. Sekarang kamu mungkin bertanya-tanya: kalau begitu, bagaimana cara kita meniru strategi Tukang Gorengan ini jika produk kita adalah layanan digital atau aplikasi?",
            keyTakeaway: "Gunakan pendekatan MVP: jual versi paling sederhana dari produkmu secepat mungkin untuk melihat apakah ada pembeli nyata."
          },
          {
            slideNumber: 3,
            type: "example",
            title: "Studi Kasus Jasa Titip (Jastip)",
            content: "Misalkan kamu punya ide membuat aplikasi canggih untuk membelikan barang-barang dari luar kota. Alih-alih membayar programmer 50 juta untuk membuat aplikasinya, kamu bisa memvalidasi ide ini dengan cara yang sangat tradisional: Jasa Titip (Jastip) via Instagram Story. \n\nKamu cukup memposting foto barang yang sedang viral di kota lain, lalu menulis: 'Open Jastip, slot terbatas untuk 10 orang pertama. Transfer ke rekening BCA...'. Jika ada 10 orang yang transfer dalam waktu 1 jam, selamat! Ide bisnismu valid. Orang-orang bersedia membayar untuk kenyamanan yang kamu tawarkan. Jika tidak ada yang peduli, kamu baru saja menghemat waktu 6 bulan dan uang puluhan juta yang seharusnya terbuang untuk membangun aplikasi yang tidak dibutuhkan pasar.\n\nJebakan umum yang sering terjadi di sini adalah calon pengusaha tertipu oleh 'Validasi Palsu'. Validasi palsu adalah ketika kamu bertanya kepada ibu atau sahabatmu, 'Eh, kalau aku bikin layanan ini, kamu mau pakai gak?' Mereka pasti menjawab iya demi menjaga perasaanmu. Padahal, pujian tidak akan membayar tagihan server. Hanya transfer bank yang bisa. Tapi, bagaimana jika skenario ini kita balik untuk menguji insting bisnismu secara langsung?",
            keyTakeaway: "Validasi asli berasal dari transaksi finansial nyata, bukan sekadar pujian dari orang terdekat."
          },
          {
            slideNumber: 4,
            type: "casestudy",
            title: "Misteri Warung Sebelah Kampus",
            content: "Bayangkan ada dua warung makan yang bersebelahan tepat di depan kampus ternama di Yogyakarta. Warung A menjual Ayam Geprek dengan desain interior kekinian, AC dingin, dan harga Rp 25.000 per porsi. Warung B hanya berbentuk tenda sederhana tanpa AC, menjual Nasi Telur Kecap seharga Rp 10.000, namun antreannya mengular hingga ke jalan raya. Apa yang sebenarnya terjadi?\n\nPendekatan: Warung A berasumsi bahwa mahasiswa menginginkan kenyamanan dan tempat nongkrong yang *aesthetic*. Sementara Warung B memahami inti dari masalah target pasarnya: mahasiswa di tanggal tua butuh makanan mengenyangkan, murah, dan cepat disajikan. Warung B memecahkan masalah kelaparan darurat, sedangkan Warung A mencoba menjual gaya hidup.\n\nHasil: Warung A bangkrut dalam 3 bulan karena biaya operasional (listrik AC, sewa tempat mahal) tidak sebanding dengan omzet. Warung B bertahan hingga belasan tahun dan membuka cabang. Pelajaran yang mengejutkan di sini adalah, nilai sebuah bisnis tidak ditentukan dari seberapa canggih produkmu, melainkan dari seberapa akurat produk tersebut menjawab rasa sakit (*pain point*) spesifik pelangganmu. Mari kita uji apakah kamu bisa mengaplikasikan prinsip ini pada bisnismu sendiri.",
            keyTakeaway: "Bisnis yang sukses adalah bisnis yang paling akurat memecahkan penderitaan pelanggannya, bukan yang paling terlihat mewah."
          },
          {
            slideNumber: 5,
            type: "challenge",
            title: "Tantangan Validasi Pertama",
            content: "Kamu baru saja lulus kuliah dan memiliki sisa uang tabungan Rp 500.000. Kamu melihat banyak teman kosmu yang selalu kehabisan galon air minum di tengah malam, sementara warung sudah tutup. Kamu berniat membuat bisnis 'Langganan Air Galon Darurat 24 Jam' khusus untuk penghuni kos di area tersebut.\n\nTugasmu: Susunlah satu langkah EKSEKUSI PALING PERTAMA yang akan kamu lakukan besok pagi untuk memvalidasi apakah teman-teman kosmu benar-benar mau membayar layanan ini, TANPA harus membeli stok 50 galon air terlebih dahulu. Gunakan prinsip MVP dan Bricolage yang telah kita bahas. \n\nPastikan solusimu melibatkan cara yang spesifik untuk mendapatkan jawaban 'Ya, saya akan beli' dari mereka sebelum kamu mengeluarkan sepeser pun uang. Tuliskan rencanamu di kolom bawah ini.",
            challenge: {
              instruction: "Susun 1 langkah validasi ide bisnis tanpa modal besar menggunakan prinsip MVP.",
              inputType: "essay",
              inputPlaceholder: "Contoh: Besok pagi saya akan menempel poster di lobi kos berisi tulisan...",
              expectedConcepts: ["MVP", "Validasi pasar", "Minim modal", "Testing ide"],
              evaluationCriteria: "Evaluasi apakah: (1) Jawaban user tidak memerlukan pembelian stok dalam jumlah besar, (2) User menggunakan medium sederhana (kertas, WA, door-to-door) untuk menawarkan layanan, (3) User mewajibkan adanya komitmen nyata (misal: pre-order atau pendaftaran berbayar awal) dari pelanggan. Jawaban parsial yang hanya menggunakan WA tapi belum meminta komitmen tetap mendapat skor 60. Jika user masih mengusulkan membeli stok galon terlebih dahulu, berikan skor 20 dan minta mereka memikirkan ulang konsep 'tanpa modal'.",
              hints: [
                "Bagaimana caramu memberi tahu mereka tentang layanan ini secara gratis?",
                "Apa yang bisa kamu tawarkan agar mereka setuju berlangganan sebelum kamu membeli galon airnya?",
                "Coba gunakan sistem pre-order melalui grup WhatsApp kos."
              ],
              sampleAnswer: "Saya akan mengirim pesan broadcast ke grup WhatsApp kos berisi penawaran: 'Siapa yang mau ikut langganan galon darurat 24 jam? Biaya langganan Rp 10.000/bulan (di luar harga air). Jika ada 10 orang yang transfer komitmen awal hari ini, layanan akan aktif mulai besok.' Jika tidak ada yang transfer, ide ini batal.",
              followUpQuestion: "Luar biasa! Sekarang jika sudah ada 10 orang yang setuju, bagaimana strategi pengiriman galonnya di tengah malam agar kamu tidak kelelahan?"
            }
          },
          {
            slideNumber: 6,
            type: "summary",
            title: "Kristalisasi Mindset",
            content: "Membangun bisnis bukanlah tentang siapa yang punya uang paling banyak, melainkan siapa yang paling cepat belajar dari kegagalan murah. Mari kita rangkum tiga insight terpenting yang telah kamu dapatkan di modul pertama ini:\n\n1. **Efek Bricolage:** Mulailah dengan apa yang ada di tanganmu hari ini, jangan menunggu investor atau pinjaman bank.\n2. **Prinsip Tukang Gorengan:** Luncurkan versi paling jelek dari produkmu secepat mungkin untuk menguji pasar yang nyata.\n3. **Validasi Finansial:** Pujian adalah kebohongan manis, satu-satunya validasi ide yang sejati adalah ketika pelanggan rela mentransfer uang mereka.\n\nSatu hal yang sering disalahpahami oleh pemula adalah anggapan bahwa ide itu bernilai mahal. Faktanya, ide bernilai nol rupiah. Eksekusilah yang bernilai jutaan. Kamu bisa menerapkan ini besok pagi: ambil satu ide bisnis tergilamu, dan pikirkan bagaimana cara mengetesnya hanya dengan modal WhatsApp dan kuota internet. Jika di modul ini kita belajar mengubah *mindset*, di modul berikutnya kita akan membedah anatomi finansial bisnis. Mengapa warung ramai bisa bangkrut karena arus kas yang berantakan? Bersiaplah untuk realita pahit selanjutnya.",
            keyTakeaway: "Ide bernilai nol. Eksekusi yang divalidasi oleh pasar bernilai jutaan."
          }
        ],
        quizBank: [
          {
            id: "q1",
            question: "Seorang pemuda ingin membuka bisnis cuci sepatu. Alih-alih langsung menyewa ruko dan membeli mesin cuci khusus seharga puluhan juta, ia menawarkan jasa cuci sepatu secara gratis ke 5 teman terdekatnya, asalkan mereka mau memposting hasilnya di Instagram. Konsep apa yang sedang ia terapkan?",
            options: [
              { id: "a", "text": "Analysis Paralysis" },
              { id: "b", "text": "Efek Bricolage dan MVP" },
              { id: "c", "text": "Burn Rate Optimization" },
              { id: "d", "text": "Business Model Canvas" }
            ],
            correctAnswer: "b",
            explanation: "Ia menggunakan apa yang ada (Bricolage) yaitu teman terdekat, dan memberikan versi layanan dasar (MVP) tanpa investasi berat di awal. Pilihan A adalah kebalikan dari ini. Pilihan C dan D tidak relevan dengan situasi di atas.",
            difficulty: "easy"
          },
          {
            id: "q2",
            question: "Manakah dari pernyataan berikut yang merupakan bentuk 'Validasi Asli' dari sebuah ide bisnis?",
            options: [
              { id: "a", "text": "Ibu memuji kue buatanmu dan menyuruhmu menjualnya." },
              { id: "b", "text": "Postingan ide bisnismu di TikTok mendapatkan 1 juta views dan ribuan likes." },
              { id: "c", "text": "50 orang mengisi Google Form menyatakan tertarik dengan produkmu." },
              { id: "d", "text": "10 orang membayar uang muka (DP) untuk produk yang bahkan belum selesai dibuat." }
            ],
            correctAnswer: "d",
            explanation: "Satu-satunya validasi yang tidak bisa dipalsukan adalah komitmen finansial (uang). Likes, pujian, dan pengisian form hanyalah ketertarikan semu yang tidak menjamin mereka akan benar-benar membeli saat produk dirilis.",
            difficulty: "medium"
          }
        ]
      }
    ]
  };

  try {
    await prisma.$transaction(async (tx) => {
      // Create Course
      const newCourse = await tx.course.create({
        data: {
          title: aiCourseData.title,
          slug: aiCourseData.slug,
          description: aiCourseData.description,
          categoryId: categoryId,
          difficulty: "BEGINNER",
          language: "id",
          visibility: "PUBLIC",
          isAiGenerated: true,
          isUserGenerated: true,
          isPublished: true,
          isPremium: false,
          authorId: userId,
          totalModules: 1,
        },
      });

      console.log("Course Created:", newCourse.id);

      // Create Modules & Slides
      for (const mod of aiCourseData.modules) {
        const newModule = await tx.module.create({
          data: {
            title: mod.title,
            slug: mod.slug,
            courseId: newCourse.id,
            order: mod.order,
            xpReward: 20,
          },
        });

        console.log("  Module Created:", newModule.id);

        for (const slide of mod.slides) {
          await tx.slide.create({
            data: {
              title: slide.title,
              moduleId: newModule.id,
              order: slide.slideNumber,
              content: {
                type: slide.type,
                body: slide.content,
                ...(slide.keyTakeaway ? { keyTakeaway: slide.keyTakeaway } : {}),
                ...(slide.challenge ? { challenge: slide.challenge } : {}),
              } as unknown as Prisma.InputJsonValue,
            },
          });
        }
        
        // Quiz Slide
        await tx.slide.create({
          data: {
            title: "Quiz Modul",
            moduleId: newModule.id,
            order: mod.slides.length + 1,
            content: {
              type: "quiz",
              body: "Evaluasi pemahamanmu tentang modul ini.",
              quizBank: mod.quizBank,
            } as unknown as Prisma.InputJsonValue,
          },
        });
      }
    });
    console.log("Seeding Success!");
  } catch (error) {
    console.error("Seeding Failed:", error);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
