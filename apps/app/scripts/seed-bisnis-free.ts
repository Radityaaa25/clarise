import { createCourse, prisma } from "./_seed-helpers";

async function main() {
  await createCourse({
    title: "Membangun Merek (Branding) untuk Pemula",
    slug: "membangun-merek-branding-pemula",
    description:
      "Pelajari cara membuat bisnismu diingat dan dipercaya — bukan dengan logo mahal, tapi dengan janji yang konsisten kamu tepati. Cocok untuk UMKM dan pemula yang baru memulai usaha.",
    categorySlug: "bisnis-kewirausahaan",
    difficulty: "BEGINNER",
    isPremium: false,
    modules: [
      {
        title: "Dasar Branding yang Bikin Bisnismu Diingat",
        slug: "dasar-branding-bikin-diingat",
        xpReward: 50,
        slides: [
          {
            type: "lesson",
            title: "Brand Itu Bukan Sekadar Logo",
            keyTakeaway:
              "Brand adalah kesan yang muncul di kepala orang saat mendengar namamu — logo cuma pemicunya.",
            body: `Kalau ditanya "apa itu brand?", kebanyakan pemula langsung menjawab "logo" atau "nama". Padahal logo hanyalah ujung dari gunung es. **Brand adalah kesan total yang muncul di kepala seseorang ketika mendengar namamu** — gabungan dari rasa, pelayanan, cara kamu membalas chat, sampai aroma tokomu.

Coba uji sendiri: begitu dengar "Indomie", apa yang muncul? Bukan logonya, tapi rasa, harga terjangkau, dan kenangan masak tengah malam. Itulah brand. Logo cuma pemicu yang menarik semua kesan itu keluar.

Kenapa ini penting buat pemula? Karena kamu sering merasa "belum bisa branding, kan belum punya budget desain". Salah besar. Kamu sudah membangun brand sejak transaksi pertama — dari cepatnya kamu membalas pesan, rapinya bungkus, sampai ramahnya caramu minta maaf saat ada komplain.

Artinya, branding bukan soal modal besar, tapi soal **kesan yang kamu tinggalkan berulang kali**. Pertanyaannya sekarang: kesan apa yang ingin kamu tanam di kepala pelanggan? Sebelum menjawab itu, kita perlu paham satu hal: brand sebenarnya adalah sebuah janji.`,
            sources: [
              {
                type: "DOCUMENTATION",
                title: "Merek (Branding) — Wikipedia",
                url: "https://id.wikipedia.org/wiki/Merek",
              },
              {
                type: "YOUTUBE",
                title: "Raymond Chin — Bisnis & Branding",
                url: "https://www.youtube.com/@RaymondChins",
              },
            ],
          },
          {
            type: "lesson",
            title: "Brand = Janji yang Kamu Tepati",
            keyTakeaway:
              "Setiap brand kuat adalah sebuah janji yang ditepati secara konsisten.",
            body: `Cara paling sederhana memahami brand: anggap ia sebagai **janji**. Setiap merek besar diam-diam berjanji sesuatu kepada pelanggannya, lalu menepatinya berulang kali sampai dipercaya.

Aqua berjanji "air bersih yang aman", dan menepatinya konsisten sampai orang menyebut semua air kemasan dengan "Aqua". J&T berjanji "paket sampai", McD berjanji "rasa yang sama di mana pun gerainya". Janji yang ditepati = kepercayaan; kepercayaan = orang balik lagi tanpa berpikir panjang.

Sebaliknya, janji yang dilanggar menghancurkan brand lebih cepat daripada apa pun. Warung yang katanya "buka 24 jam" tapi sering tutup mendadak sedang merusak brand-nya sendiri, sekecil apa pun usahanya.

Untuk bisnismu, mulailah dengan satu janji yang spesifik dan bisa kamu tepati. "Selalu fresh hari ini", "balas chat di bawah 5 menit", atau "garansi tukar kalau tidak puas". Jangan janji muluk yang tak sanggup kamu pegang. Janji kecil yang ditepati 100 kali jauh lebih kuat daripada janji besar yang dilanggar sekali. Lalu, bagaimana janji itu kita kemas jadi nama dan tagline yang nempel di ingatan?`,
          },
          {
            type: "example",
            title: "Membongkar Nama & Tagline yang Nempel di Kepala",
            keyTakeaway:
              "Nama dan tagline yang baik mudah diucapkan, mudah diingat, dan menyiratkan manfaat.",
            body: `Mari bongkar kenapa beberapa nama begitu lengket. Ambil contoh warung kopi. "Kopi Kenangan" menang bukan karena unik secara teknis, tapi karena memicu **emosi dan cerita** — siapa sih yang tak punya kenangan dengan secangkir kopi?

Tiga ciri nama yang baik untuk pemula:
1. **Mudah diucapkan & ditulis.** Kalau pelanggan ragu mengeja namamu saat merekomendasikan ke teman, kamu kehilangan promosi gratis.
2. **Mudah diingat.** Pendek, berirama, atau punya asosiasi kuat. "Sambel Setan" langsung membayangkan pedas ekstrem.
3. **Menyiratkan manfaat atau rasa.** "Roti Lembut", "Cuci Kilat", "Ayam Geprek Bensu".

Tagline melengkapi nama dengan **menegaskan janji**. "Apa pun makanannya, minumnya Teh Botol Sosro" menanamkan kebiasaan. Tagline yang baik singkat, jelas manfaatnya, dan terasa manusiawi — bukan jargon korporat.

Latihan: tulis 3 calon nama untuk usahamu, lalu ucapkan keras-keras ke teman. Mana yang paling cepat mereka ingat keesokan harinya? Itu kandidat terkuatmu. Setelah nama dan janji jelas, kita perlu menemukan tempat berdiri yang belum diisi pesaing — namanya positioning.`,
          },
          {
            type: "lesson",
            title: "Positioning: Menemukan Sudut yang Belum Diisi",
            keyTakeaway:
              "Positioning adalah memilih satu hal yang kamu kuasai, lalu menjadi nomor satu di benak untuk hal itu.",
            body: `Di pasar yang ramai, mencoba menjadi "yang terbaik untuk semua orang" sama dengan menjadi tidak istimewa bagi siapa pun. Di sinilah **positioning** berperan: memilih satu sudut spesifik dan menjadikan dirimu pilihan nomor satu untuk sudut itu.

Bayangkan ada 10 warung mie ayam di satu jalan. Bersaing soal "mie ayam enak" akan melelahkan karena semua mengklaim hal yang sama. Tapi kalau kamu memposisikan diri sebagai "mie ayam pedas level neraka untuk pemberani", kamu langsung punya tempat sendiri di kepala orang. Sebagian orang memang tak suka pedas — dan itu justru bagus, karena kamu tidak menyasar semua orang.

Positioning yang kuat sering lahir dari menjawab: "Aku adalah pilihan terbaik untuk [siapa] yang ingin [apa] tanpa harus [pengorbanan]." Contoh: "pilihan terbaik untuk anak kos yang ingin makan kenyang tanpa bikin kantong jebol."

Semakin spesifik posisimu, semakin mudah orang merekomendasikanmu ("kalau mau yang pedas banget, ke sana"). Keberanian untuk **tidak menyasar semua orang** adalah inti positioning. Nah, setelah tahu posisimu, bagaimana cara "berbicara" agar terasa konsisten?`,
          },
          {
            type: "example",
            title: "Membangun Suara Merek (Brand Voice)",
            keyTakeaway:
              "Brand voice adalah gaya bicaramu yang konsisten — bikin pelanggan merasa mengenal 'sosok' di balik bisnis.",
            body: `Brand voice adalah **kepribadian bisnismu saat berbicara**: lewat caption, balasan chat, sampai tulisan di kemasan. Brand voice yang konsisten membuat pelanggan merasa sedang berinteraksi dengan sosok yang mereka kenal, bukan mesin.

Lihat perbedaannya. Sebuah bank menulis: "Mohon maaf atas ketidaknyamanan yang ditimbulkan." Sementara brand kopi anak muda menulis: "Duh, maaf banget ya ges, pesananmu sempet nyangkut. Udah kita kebut nih!" Dua-duanya minta maaf, tapi terasa seperti dua orang yang sangat berbeda. Keduanya bisa benar — yang penting **cocok dengan siapa pelangganmu**.

Cara menemukan voice-mu: bayangkan brand-mu sebagai satu orang. Dia ramah atau tegas? Santai atau formal? Suka bercanda atau serius? Tuliskan 3 kata sifat (misal: "hangat, jujur, sedikit jenaka"), lalu jadikan itu patokan setiap kali menulis apa pun.

Kuncinya konsistensi. Jangan formal kaku di caption tapi tiba-tiba super gaul saat membalas komplain. Suara yang berubah-ubah membuat pelanggan bingung "ini bisnis yang sama bukan, ya?". Konsistensi inilah yang akan kita lihat dampaknya pada sebuah brand lokal nyata.`,
          },
          {
            type: "casestudy",
            title: "Studi Kasus: Pelajaran Branding dari Kopi Lokal",
            keyTakeaway:
              "Brand lokal menang dengan menjual cerita & pengalaman, bukan sekadar produk.",
            body: `Mari pelajari pola yang membuat banyak brand kopi lokal Indonesia meledak dalam beberapa tahun terakhir (kita pakai sebagai bahan pembelajaran, bukan promosi).

**Situasi.** Pasar kopi sudah penuh, dari warung kopi tubruk Rp3.000 sampai kafe impor mahal. Sulit menang dengan sekadar "kopi enak".

**Sudut yang diambil.** Brand-brand ini memposisikan diri di tengah: kopi berkualitas dengan harga terjangkau anak muda, dipesan lewat aplikasi, diambil cepat. Namanya pun memicu emosi dan cerita, bukan sekadar deskripsi.

**Pengalaman, bukan cuma produk.** Kemasan yang Instagramable, nama menu yang playful, dan promo yang konsisten membuat membeli kopi terasa seperti bagian dari gaya hidup — bukan sekadar transaksi.

**Pelajaran yang sering mengejutkan:** yang dijual bukan cuma kopi, tapi **perasaan dan identitas**. Orang rela antre dan membayar lebih karena membeli "menjadi bagian dari sesuatu yang kekinian".

Untuk UMKM, intinya bukan meniru skalanya, tapi menirukan caranya: bungkus produkmu dengan cerita dan pengalaman kecil yang konsisten. Renungkan: cerita atau pengalaman kecil apa yang bisa kamu tempelkan ke produkmu hari ini? Selanjutnya kita rapikan sisi visual agar semua kesan tadi tampak menyatu.`,
          },
          {
            type: "lesson",
            title: "Konsistensi Visual ala UMKM (Tanpa Budget Besar)",
            keyTakeaway:
              "Cukup kunci 2 warna, 1 font, dan 1 gaya foto agar brand-mu terlihat profesional.",
            body: `Kamu tidak butuh desainer mahal untuk terlihat profesional. Yang dibutuhkan hanya **konsistensi** pada beberapa elemen sederhana, dipakai berulang sampai orang otomatis mengenalinya sebagai "milikmu".

Tiga elemen yang cukup untuk pemula:
1. **Warna (pilih 2).** Satu warna utama, satu pendukung. Pakai di logo, kemasan, dan feed. Otak manusia mengenali warna lebih cepat daripada tulisan — itu sebabnya kita kenal merek tertentu dari warna saja.
2. **Font (pilih 1, maksimal 2).** Satu font untuk judul, satu untuk teks biasa. Jangan ganti-ganti font tiap postingan; itu membuat brand terlihat berantakan.
3. **Gaya foto.** Selalu foto dengan latar dan pencahayaan serupa (misal: selalu di atas meja kayu dekat jendela). Konsistensi ini bikin feed-mu rapi tanpa biaya.

Analogi: seragam sekolah. Kamu mengenali anak sekolah tertentu dari jauh hanya lewat warna seragamnya — padahal mereka tak menulis nama sekolahnya. Begitulah cara warna dan gaya visual bekerja untuk brand-mu.

Tools gratis seperti Canva sudah lebih dari cukup. Simpan template-mu, lalu pakai ulang. Konsisten itu membosankan untuk dibuat, tapi justru di situlah kekuatannya. Setelah terlihat rapi, kita perlu satu bahan terakhir agar orang berani membeli: kepercayaan.`,
          },
          {
            type: "lesson",
            title: "Membangun Kepercayaan: Testimoni & Bukti Sosial",
            keyTakeaway:
              "Orang lebih percaya kata pelanggan lain daripada klaim penjual — kumpulkan dan tunjukkan buktinya.",
            body: `Pelanggan baru hampir selalu ragu: "Ini beneran bagus, atau cuma jualan?" Cara tercepat mengusir keraguan itu bukan dengan memuji diri sendiri, tapi dengan menunjukkan **bukti sosial** — bukti bahwa orang lain sudah mencoba dan puas.

Ini fenomena psikologis sederhana: kita cenderung mengikuti tindakan orang banyak. Warung yang antre terlihat lebih menggoda daripada yang sepi, walau belum tentu lebih enak. Maka tugasmu adalah membuat "antrean" itu terlihat.

Cara praktis untuk UMKM:
- **Screenshot chat pujian pelanggan** (minta izin), lalu pajang di story/feed.
- **Foto pelanggan menikmati produk** (dengan izin) lebih meyakinkan daripada foto produk sendirian.
- **Angka sederhana:** "Sudah 500+ porsi terjual bulan ini" memberi rasa aman.
- **Tanggapi ulasan**, termasuk yang negatif, dengan tenang dan solutif. Cara kamu menangani komplain sering lebih meyakinkan calon pelanggan daripada pujian.

Mintalah testimoni secara aktif — kebanyakan pelanggan puas tidak akan menulis ulasan kecuali diminta. Cukup tanya, "Boleh minta tolong ceritakan pengalamanmu tadi?" setelah mereka puas. Bukti sosial yang dikumpulkan pelan-pelan ini menjadi aset brand yang menumpuk. Mari kita rangkai semuanya.`,
          },
          {
            type: "summary",
            title: "Merangkai Semuanya Jadi Merek yang Utuh",
            keyTakeaway:
              "Branding pemula = janji yang jelas + positioning spesifik + suara & visual konsisten + bukti yang dipupuk.",
            body: `Mari kristalkan perjalanan kita. Tiga insight terpenting dari modul ini:

1. **Brand adalah janji, bukan logo.** Ia hidup di kepala pelanggan melalui kesan yang kamu tinggalkan berulang kali. Maka mulai dari janji spesifik yang sanggup kamu tepati setiap hari.
2. **Positioning butuh keberanian menolak.** Dengan tidak menyasar semua orang, kamu justru menjadi pilihan nomor satu bagi kelompok tertentu — dan mereka yang akan merekomendasikanmu.
3. **Konsistensi mengalahkan kemewahan.** Dua warna, satu font, satu gaya foto, dan satu suara yang dipakai terus-menerus membuat UMKM tampak profesional tanpa budget besar.

**Satu hal yang sering disalahpahami:** branding dikira pekerjaan sekali jadi ("bikin logo, selesai"). Padahal branding adalah hasil dari ribuan interaksi kecil yang konsisten — cara membalas chat, membungkus pesanan, sampai menangani komplain.

**Aksi langsung hari ini:** tulis satu kalimat janji brand-mu, pilih dua warna, dan minta satu testimoni dari pelanggan terakhirmu. Tiga langkah kecil ini sudah membuatmu selangkah di depan mayoritas pesaing yang masih sibuk memikirkan logo.

Di modul-modul lanjutan, kamu akan belajar mengubah merek yang sudah dikenal ini menjadi mesin yang menarik pelanggan secara berulang. Tapi sebelum itu — pastikan dulu pemahamanmu lewat kuis berikut!`,
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahaman Branding-mu",
            body: "Sebelum lanjut, pastikan kamu sudah paham dasar branding lewat kuis singkat ini.",
            quizBank: [
              {
                id: "q1",
                question:
                  "Menurut modul ini, apa definisi 'brand' yang paling tepat?",
                options: [
                  { id: "a", text: "Logo dan nama perusahaan" },
                  {
                    id: "b",
                    text: "Kesan total yang muncul di kepala orang saat mendengar namamu",
                  },
                  { id: "c", text: "Warna dan font yang dipakai" },
                  { id: "d", text: "Jumlah pengikut di media sosial" },
                ],
                correctAnswer: "b",
                explanation:
                  "Logo, warna, dan followers hanyalah bagian/pemicu. Brand adalah keseluruhan kesan (rasa, layanan, pengalaman) yang tertanam di benak pelanggan.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question:
                  "Sebuah warung memasang tulisan 'Buka 24 Jam' tapi sering tutup mendadak. Dalam kerangka 'brand = janji', apa yang terjadi?",
                options: [
                  { id: "a", text: "Brand-nya menguat karena fleksibel" },
                  {
                    id: "b",
                    text: "Brand-nya rusak karena janji dilanggar berulang",
                  },
                  { id: "c", text: "Tidak berpengaruh pada brand" },
                  { id: "d", text: "Justru menarik karena bikin penasaran" },
                ],
                correctAnswer: "b",
                explanation:
                  "Janji yang dilanggar menghancurkan kepercayaan. Konsistensi menepati janji (sekecil apa pun) adalah fondasi brand yang kuat.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question:
                  "Manakah ciri nama brand yang BAIK untuk pemula menurut modul?",
                options: [
                  { id: "a", text: "Sepanjang dan se-formal mungkin" },
                  { id: "b", text: "Sulit dieja agar terkesan eksklusif" },
                  {
                    id: "c",
                    text: "Mudah diucapkan, mudah diingat, dan menyiratkan manfaat",
                  },
                  { id: "d", text: "Menggunakan istilah teknis yang rumit" },
                ],
                correctAnswer: "c",
                explanation:
                  "Nama yang sulit dieja menghambat rekomendasi mulut ke mulut. Nama yang mudah & menyiratkan manfaat memudahkan orang mengingat dan menyebarkannya.",
                difficulty: "easy",
              },
              {
                id: "q4",
                question:
                  "Di jalan dengan 10 warung mie ayam, strategi positioning paling efektif adalah...",
                options: [
                  { id: "a", text: "Mengklaim 'mie ayam paling enak'" },
                  {
                    id: "b",
                    text: "Memilih sudut spesifik, mis. 'mie ayam pedas level neraka'",
                  },
                  { id: "c", text: "Menjual harga termurah terus-menerus" },
                  { id: "d", text: "Menyalin menu warung tetangga" },
                ],
                correctAnswer: "b",
                explanation:
                  "Klaim 'paling enak' diucapkan semua orang sehingga tidak membedakan. Sudut spesifik menciptakan tempat sendiri di benak dan memudahkan rekomendasi.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question:
                  "Mengapa positioning yang spesifik justru disebut sebagai kekuatan, walau 'menolak' sebagian orang?",
                options: [
                  {
                    id: "a",
                    text: "Karena makin sedikit pelanggan makin baik",
                  },
                  {
                    id: "b",
                    text: "Karena menjadi pilihan nomor satu bagi kelompok tertentu lebih kuat daripada nomor sepuluh bagi semua orang",
                  },
                  { id: "c", text: "Karena pelanggan suka ditolak" },
                  { id: "d", text: "Karena bisa menaikkan harga seenaknya" },
                ],
                correctAnswer: "b",
                explanation:
                  "Fokus pada kelompok spesifik membuatmu mudah diingat & direkomendasikan oleh kelompok itu, alih-alih tenggelam mencoba menyenangkan semua orang.",
                difficulty: "medium",
              },
              {
                id: "q6",
                question:
                  "Sebuah bisnis kadang membalas chat dengan sangat formal, kadang sangat gaul. Apa masalah utamanya?",
                options: [
                  { id: "a", text: "Tidak ada masalah, justru fleksibel" },
                  {
                    id: "b",
                    text: "Brand voice tidak konsisten sehingga membingungkan pelanggan",
                  },
                  { id: "c", text: "Terlalu banyak pelanggan" },
                  { id: "d", text: "Font-nya salah" },
                ],
                correctAnswer: "b",
                explanation:
                  "Brand voice yang berubah-ubah membuat pelanggan merasa berhadapan dengan 'sosok' berbeda-beda, menurunkan rasa kenal dan percaya.",
                difficulty: "medium",
              },
              {
                id: "q7",
                question:
                  "Untuk UMKM tanpa budget desain, kombinasi minimum agar terlihat profesional & konsisten adalah...",
                options: [
                  { id: "a", text: "5 warna, 4 font, gaya foto bebas" },
                  {
                    id: "b",
                    text: "2 warna, 1-2 font, dan 1 gaya foto yang dipakai konsisten",
                  },
                  { id: "c", text: "Ganti tema visual setiap minggu" },
                  { id: "d", text: "Menyalin visual brand besar persis" },
                ],
                correctAnswer: "b",
                explanation:
                  "Sedikit elemen yang dipakai konsisten justru lebih mudah dikenali. Terlalu banyak variasi membuat brand terlihat berantakan.",
                difficulty: "medium",
              },
              {
                id: "q8",
                question:
                  "Mengapa 'bukti sosial' (testimoni, antrean, foto pelanggan) sangat ampuh meyakinkan calon pembeli?",
                options: [
                  {
                    id: "a",
                    text: "Karena manusia cenderung mengikuti tindakan orang banyak",
                  },
                  { id: "b", text: "Karena bukti sosial selalu gratis" },
                  { id: "c", text: "Karena pelanggan tidak bisa membaca" },
                  { id: "d", text: "Karena menggantikan kebutuhan akan kualitas" },
                ],
                correctAnswer: "a",
                explanation:
                  "Bukti sosial bekerja karena kecenderungan psikologis mengikuti orang banyak — warung yang antre terasa lebih meyakinkan. Bukti dari pelanggan lain lebih dipercaya daripada klaim penjual.",
                difficulty: "hard",
              },
              {
                id: "q9",
                question:
                  "Cara menangani ulasan NEGATIF yang paling sesuai dengan membangun brand adalah...",
                options: [
                  { id: "a", text: "Dihapus atau diabaikan" },
                  { id: "b", text: "Dibalas dengan emosi agar terlihat tegas" },
                  {
                    id: "c",
                    text: "Ditanggapi tenang dan solutif, karena calon pelanggan ikut menilai caramu menanganinya",
                  },
                  { id: "d", text: "Diadukan agar akunnya diblokir" },
                ],
                correctAnswer: "c",
                explanation:
                  "Cara menangani komplain sering lebih meyakinkan calon pelanggan daripada pujian. Tanggapan tenang & solutif menunjukkan brand yang bertanggung jawab.",
                difficulty: "hard",
              },
              {
                id: "q10",
                question:
                  "Pernyataan mana yang PALING tepat tentang branding bagi pemula?",
                options: [
                  {
                    id: "a",
                    text: "Branding adalah pekerjaan sekali jadi: bikin logo, selesai",
                  },
                  {
                    id: "b",
                    text: "Branding butuh modal besar sebelum bisa dimulai",
                  },
                  {
                    id: "c",
                    text: "Branding adalah hasil ribuan interaksi kecil yang konsisten",
                  },
                  { id: "d", text: "Branding hanya relevan untuk perusahaan besar" },
                ],
                correctAnswer: "c",
                explanation:
                  "Branding bukan proyek sekali jadi atau soal modal besar. Ia dibangun dari konsistensi interaksi kecil sehari-hari — relevan bahkan untuk usaha terkecil.",
                difficulty: "easy",
              },
            ],
          },
        ],
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
