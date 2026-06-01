import { createCourse, prisma, type ModuleInput } from "./_seed-helpers";

// Premium → quizBank dikosongkan (kuis digenerate AI on-the-fly).
// Sengaja TIDAK menyetel field quizBank agar frontend memanggil /api/ai/generate-quiz.
const quiz = (title = "Kuis: Uji Pemahamanmu"): import("./_seed-helpers").SlideInput => ({
  type: "quiz",
  title,
  body: "Validasi pemahamanmu sebelum lanjut. Soal akan disusun khusus untukmu.",
});

const MOD1: ModuleInput = {
  title: "Menemukan Product-Market Fit",
  slug: "menemukan-product-market-fit",
  xpReward: 80,
  slides: [
    {
      type: "lesson",
      title: "Apa Itu Product-Market Fit (dan Kenapa Ini Segalanya)",
      keyTakeaway:
        "Product-Market Fit adalah saat pasar menarik produkmu keluar dari tanganmu, bukan kamu yang mendorongnya.",
      body: `Banyak bisnis mati bukan karena produknya jelek, tapi karena memaksakan produk yang sebenarnya tidak terlalu dibutuhkan pasar. **Product-Market Fit (PMF)** adalah titik ketika produkmu benar-benar cocok dengan kebutuhan sebuah pasar — sampai-sampai pasar "menarik" produk itu keluar dari tanganmu, bukan kamu yang capek mendorongnya.

Marc Andreessen, investor legendaris, menggambarkannya begini: sebelum PMF, kamu merasa seperti mendorong batu ke atas bukit — penjualan seret, pelanggan cuek, semua butuh perjuangan. Setelah PMF, terasa seperti batu menggelinding sendiri — pelanggan datang lebih cepat dari yang bisa kamu layani, server kewalahan, stok habis terus.

Analogi warung: kamu tahu warungmu punya PMF ketika orang rela antre dan kecewa kalau kehabisan — bukan ketika kamu harus rajin nyebar brosur tiap hari agar ada yang mampir.

Kenapa ini "segalanya"? Karena semua hal lain — iklan, tim, pendanaan — hanya memperbesar apa yang sudah ada. Kalau kamu menuang bensin (iklan) ke mesin yang belum menyala (belum PMF), kamu cuma membakar uang lebih cepat. Maka sebelum scaling, pastikan dulu mesinnya menyala. Bagaimana cara tahu mesinmu belum menyala?`,
      sources: [
        {
          type: "DOCUMENTATION",
          title: "Product–Market Fit — Wikipedia",
          url: "https://en.wikipedia.org/wiki/Product-market_fit",
        },
        {
          type: "YOUTUBE",
          title: "Dr. Indrawan Nugroho — Strategi Bisnis & Inovasi",
          url: "https://www.youtube.com/@drindrawannugroho",
        },
      ],
    },
    {
      type: "lesson",
      title: "Tanda-Tanda Kamu BELUM Punya Product-Market Fit",
      keyTakeaway:
        "Penjualan yang selalu butuh 'dipaksa' dan pelanggan yang tak kembali adalah sinyal belum PMF.",
      body: `Sebelum mengejar pertumbuhan, kamu harus jujur menilai: apakah produkmu sudah benar-benar dibutuhkan? Ada beberapa sinyal jelas bahwa kamu **belum** mencapai PMF, dan mengenalinya menyelamatkanmu dari membakar uang sia-sia.

**1. Penjualan selalu butuh "dipaksa".** Setiap transaksi terjadi hanya karena kamu memberi diskon besar, mengejar-ngejar di chat, atau membujuk panjang. Begitu promosi berhenti, penjualan ikut mati.

**2. Pelanggan tidak kembali.** Banyak yang coba sekali, tapi sedikit yang beli lagi. Ember-mu bocor: berapa pun air (pelanggan baru) yang kamu tuang, habis lagi.

**3. Tidak ada yang merekomendasikan.** Tak ada pelanggan yang dengan sukarela cerita ke temannya. Word of mouth nol.

**4. Kamu kesulitan menjelaskan "untuk siapa ini".** Saat ditanya target pasarmu, jawabanmu "ya untuk semua orang" — pertanda kamu belum menemukan kelompok yang benar-benar terbantu.

Kalau kamu mengenali tanda-tanda ini, jangan panik — itu normal dan justru berharga. Artinya kamu belum boleh menginjak gas pertumbuhan; tugasmu masih memperbaiki produk atau menemukan pasar yang lebih tepat. Lalu, seperti apa rasanya kalau sudah PMF?`,
    },
    {
      type: "lesson",
      title: "Tanda-Tanda Kamu SUDAH Punya Product-Market Fit",
      keyTakeaway:
        "PMF terasa dari tarikan organik: pelanggan kembali, merekomendasikan, dan kecewa kalau kehilangan produkmu.",
      body: `Kebalikan dari tanda-tanda sebelumnya, PMF punya "rasa" yang khas. Begitu kamu mengalaminya, kamu biasanya tahu — karena hidupmu sebagai pemilik bisnis berubah dari "mengejar" jadi "melayani permintaan".

**1. Pelanggan kembali tanpa diminta.** Repeat order terjadi organik, tanpa harus terus-menerus didiskon. Mereka kembali karena memang butuh dan puas.

**2. Pertumbuhan dari mulut ke mulut.** Pelanggan baru datang sambil bilang "dapat rekomendasi dari teman". Ini sinyal PMF terkuat karena orang tak akan mempertaruhkan reputasinya merekomendasikan produk biasa-biasa saja.

**3. Mereka kecewa kalau kehilanganmu.** Kalau produkmu hilang besok, sebagian pelanggan akan benar-benar bingung mencari pengganti. Ada kekosongan yang kamu isi.

**4. Masalahmu berubah.** Dari "bagaimana cari pelanggan?" menjadi "bagaimana melayani semua permintaan ini?". Stok cepat habis, antrean panjang, tim kewalahan.

Penting dipahami: PMF bukan tombol on/off, melainkan spektrum. Kamu bisa punya PMF "lemah" (ada tarikan tapi tipis) hingga "kuat" (kewalahan permintaan). Tujuanmu memperkuatnya terus. Tapi semua ini terdengar subjektif — adakah cara mengukurnya dengan lebih pasti?`,
    },
    {
      type: "example",
      title: "Mengukur PMF: Tes 40% Sean Ellis",
      keyTakeaway:
        "Jika ≥40% pelanggan akan 'sangat kecewa' kehilangan produkmu, kamu kemungkinan sudah punya PMF.",
      body: `PMF terasa subjektif, tapi ada cara mengukurnya yang populer dan sederhana: **Tes 40% dari Sean Ellis**. Caranya, tanyakan ke pelanggan yang sudah memakai produkmu beberapa kali:

> "Bagaimana perasaanmu jika produk ini tidak ada lagi besok?"
> a) Sangat kecewa  b) Agak kecewa  c) Tidak masalah

Aturannya: **jika ≥40% pelanggan menjawab "sangat kecewa", kamu kemungkinan besar sudah punya PMF.** Di bawah itu, produkmu masih "nice to have", bukan "must have".

Contoh nyata UMKM: sebuah jasa katering sehat menyebar survei ke 50 pelanggan tetapnya. Hasilnya, 24 orang (48%) menjawab "sangat kecewa" — sinyal kuat bahwa mereka mengisi kebutuhan nyata, bukan sekadar tren.

Yang lebih berharga dari angkanya adalah **alasannya**. Tanyakan ke kelompok "sangat kecewa": "Apa manfaat utama produk ini bagimu?" Jawaban mereka memberitahumu fitur/nilai inti yang harus kamu pertahankan dan perkuat. Lalu tanyakan ke kelompok "agak kecewa": "Apa yang harus diperbaiki agar kamu jadi sangat kecewa kehilangan kami?" — itu peta perbaikanmu.

Catatan: tes ini paling akurat untuk pelanggan yang sudah merasakan produk, bukan calon pelanggan. Angka penjualan tinggi bisa menipu; sinyal sebenarnya ada pada apakah orang akan merindukanmu. Tapi survei saja tak cukup — kamu perlu menggali lebih dalam lewat wawancara.`,
    },
    {
      type: "example",
      title: "Wawancara Pelanggan yang Benar (The Mom Test)",
      keyTakeaway:
        "Tanyakan tentang masa lalu & perilaku nyata, bukan minta opini atau pujian.",
      body: `Wawancara pelanggan adalah tambang emas — tapi hanya jika dilakukan dengan benar. Kesalahan terbesar pemula: bertanya hal yang membuat orang berbohong demi menyenangkanmu. "Mom Test" (oleh Rob Fitzgerald) adalah aturan agar pertanyaanmu jujur bahkan jika ditanyakan ke ibumu sendiri.

**Aturan 1: Jangan tanya opini tentang idemu.** "Menurutmu ide bisnisku bagus nggak?" hanya menghasilkan pujian sopan yang tak berguna. Orang tidak enak menyakitimu.

**Aturan 2: Tanyakan masa lalu, bukan masa depan.** "Apakah kamu akan beli ini?" adalah ramalan (sering meleset). Ganti dengan "Kapan terakhir kamu menghadapi masalah ini? Apa yang kamu lakukan? Berapa biayanya?" — fakta perilaku nyata jauh lebih dapat dipercaya.

**Aturan 3: Gali angka & konsekuensi.** "Masalah ini bikin repot ya?" → terlalu lembut. Tanyakan "Berapa jam/uang yang hilang gara-gara ini?" Kalau jawabannya "ah, nggak seberapa", berarti masalah itu mungkin tak layak dibayar.

Contoh: alih-alih "Mau nggak pakai aplikasi pencatat utang warung?", tanyakan "Bagaimana cara kamu mencatat utang pelanggan sekarang? Pernah rugi gara-gara lupa catat? Berapa kira-kira?" Jawaban konkret ini memberitahumu apakah masalahnya nyata dan besar. Kadang, data dari wawancara memaksamu mengubah arah total — dan itu tidak apa-apa.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Kekuatan Pivot (Ganti Arah)",
      keyTakeaway:
        "Pivot bukan kegagalan — ia keputusan cerdas mengikuti tarikan pasar yang sebenarnya.",
      body: `Banyak bisnis besar sebenarnya lahir dari **pivot** — perubahan arah setelah menyadari produk awal mereka bukan yang sebenarnya diinginkan pasar. Kita pakai pola ini sebagai pelajaran.

**Situasi.** Sebuah startup membuat aplikasi check-in lokasi (semacam "saya sedang di sini"). Fitur itu biasa saja dan sepi peminat. Tapi tim memperhatikan satu hal: pengguna ternyata paling sering memakai dan membagikan **fitur foto** di dalam aplikasi.

**Sinyal.** Daripada keras kepala mempertahankan ide awal, mereka mengamati ke mana perhatian pengguna mengalir secara alami. Tarikan organik ada di foto, bukan di check-in.

**Keputusan.** Mereka membuang sebagian besar fitur dan fokus total pada berbagi foto. Produk itu kemudian dikenal sebagai Instagram.

**Pelajaran yang counterintuitive:** sering kali PMF bukan ditemukan dengan memaksakan ide awal, tapi dengan **rendah hati mengikuti ke mana pelanggan benar-benar tertarik**. Ego pendiri adalah musuh terbesar PMF.

Untuk konteks UMKM: seorang penjual kue yang awalnya jualan kue ulang tahun rumit, menyadari pelanggan justru terus memesan "kue loyang sederhana untuk arisan". Ia pivot fokus ke situ, dan omzetnya naik. Diskusi: bagaimana kamu bisa membedakan antara "harus pivot" versus "harus lebih sabar"? Tidak ada jawaban tunggal — tapi sinyal retensi membantu.`,
    },
    {
      type: "lesson",
      title: "Membaca Sinyal yang Benar: Retensi vs Sekadar Penjualan",
      keyTakeaway:
        "Retensi (pelanggan kembali) adalah bukti PMF; penjualan sekali bisa menipu.",
      body: `Salah satu jebakan paling berbahaya: mengira penjualan tinggi = PMF. Padahal **penjualan pertama mengukur kekuatan pemasaran/janjimu, sedangkan pembelian kedua dan seterusnya mengukur kualitas produkmu.** Yang membuktikan PMF adalah yang kedua: retensi.

Bayangkan dua warung. Warung A viral karena promo gila-gilaan, ramai sebulan, lalu sepi total karena rasanya biasa. Warung B tumbuh pelan tapi 70% pembeli kembali tiap minggu. Warung B punya PMF; Warung A hanya punya momen.

**Cara sederhana melacak retensi UMKM:**
- Catat pelanggan (nama/nomor) dan tandai siapa yang beli lagi dalam 30 hari.
- Hitung: dari 100 pembeli bulan lalu, berapa yang kembali bulan ini?
- Kalau angkanya naik atau stabil tinggi → produkmu lengket. Kalau terus turun → ada kebocoran yang harus diperbaiki sebelum scaling.

Metafora "ember bocor" penting di sini: menuang lebih banyak air (iklan) ke ember bocor (retensi rendah) hanya memboroskan air. Tambal dulu embernya.

Maka, sebelum belanja iklan besar, tanyakan: apakah pelangganku kembali? Jika belum, perbaikan produk/pengalaman lebih mendesak daripada akuisisi. Sekarang waktunya kamu mempraktikkan cara berpikir ini lewat sebuah tantangan.`,
    },
    {
      type: "challenge",
      title: "Challenge: Rancang Eksperimen Validasi PMF",
      body: `Saatnya berpikir seperti seorang founder. Kamu punya sebuah ide bisnis (boleh ide nyata milikmu, atau contoh: "jasa meal-prep makanan sehat mingguan untuk pekerja kantoran sibuk di kota besar").

Tantanganmu: rancang **rencana eksperimen validasi PMF** yang murah dan cepat, SEBELUM kamu memproduksi besar-besaran. Jangan menebak — rancang cara membuktikan.`,
      challenge: {
        instruction:
          "Tuliskan rencana validasi PMF untuk sebuah ide bisnis (idemu sendiri atau contoh meal-prep di atas). Jawabanmu HARUS mencakup: (1) hipotesis — siapa target spesifik & masalah apa yang kamu duga, (2) cara termurah menguji permintaan SEBELUM produksi penuh (mis. pre-order, landing page, wawancara), (3) metrik konkret yang menandakan ada PMF (mis. target retensi, hasil Tes 40%, jumlah pre-order), dan (4) apa keputusanmu jika hasilnya gagal.",
        inputType: "essay",
        inputPlaceholder:
          "Contoh: Hipotesis: pekerja kantoran usia 25-35 di Jakarta kesulitan makan sehat karena sibuk... Cara uji termurah: ... Metrik PMF: ... Jika gagal: ...",
        starterCode: "",
        expectedConcepts: [
          "Hipotesis target & masalah yang spesifik (bukan 'semua orang')",
          "Metode uji murah sebelum produksi penuh (pre-order/landing page/wawancara ala Mom Test)",
          "Metrik PMF konkret & terukur (retensi, Tes 40%, jumlah pre-order)",
          "Kriteria keputusan jika gagal (pivot atau perbaiki)",
        ],
        evaluationCriteria:
          "Nilai apakah jawaban: (1) menyebut target SPESIFIK & masalah jelas — tolak jika 'untuk semua orang'; (2) mengusulkan metode validasi MURAH sebelum produksi penuh (pre-order, landing page, wawancara perilaku) — bukan langsung produksi massal; (3) menetapkan metrik PMF yang TERUKUR (angka retensi, persentase Tes 40%, jumlah pre-order minimal), bukan sekadar 'kalau laku'; (4) menyatakan keputusan jika gagal. Beri skor 70-85 jika 3 dari 4 poin terpenuhi dengan baik. Beri skor penuh (90-100) jika keempatnya jelas, terukur, dan realistis. Abaikan gaya bahasa; fokus pada logika validasi. Jika user hanya menjelaskan produknya tanpa rencana uji, skor < 50.",
        hints: [
          "Mulai dari 'siapa persisnya' yang paling menderita karena masalah ini — makin sempit makin baik.",
          "Cara termurah membuktikan permintaan biasanya membuat orang 'membayar' atau 'berkomitmen' sebelum produk jadi (pre-order/DP/waiting list).",
          "Tentukan ANGKA lebih dulu: 'PMF jika ≥X pre-order dalam 1 minggu' atau '≥40% bilang sangat kecewa'. Tanpa angka, kamu tak bisa menyimpulkan.",
        ],
        sampleAnswer:
          "Hipotesis: pekerja kantoran 25-35 th di Jakarta yang sibuk kesulitan makan sehat & bosan delivery tidak sehat. Uji termurah: bikin landing page + form pre-order paket 5 hari (DP 50%), promosikan ke 3 grup komunitas kantor selama 1 minggu, dan wawancara 10 calon (Mom Test: 'minggu lalu makan siang apa? berapa kali jajan tidak sehat? kenapa?'). Metrik PMF: minimal 20 pre-order berbayar dalam 1 minggu DAN dari pembeli pertama, ≥40% menjawab 'sangat kecewa' jika layanan hilang setelah 2 minggu uji. Jika gagal (<20 pre-order): wawancara ulang untuk cari segmen/masalah yang lebih tajam (pivot), bukan menambah promosi.",
        followUpQuestion:
          "Jika kamu mendapat 20 pre-order tapi retensi minggu kedua hanya 10%, apa artinya dan apa langkah berikutnya?",
      },
    },
    {
      type: "lesson",
      title: "Pembahasan Challenge & Kesalahan Umum",
      keyTakeaway:
        "Validasi yang baik membuat orang berkomitmen nyata sebelum produk jadi, dan punya angka penentu sejak awal.",
      body: `Mari bahas kunci dari challenge tadi dan kesalahan yang paling sering muncul.

**Kesalahan 1: Target "semua orang".** Jawaban seperti "produk ini untuk siapa saja yang ingin sehat" hampir selalu gagal. Pasar yang terlalu luas mustahil divalidasi dan dilayani dengan baik di awal. Validasi butuh target sempit dan spesifik.

**Kesalahan 2: Validasi pakai opini, bukan komitmen.** Bertanya "mau nggak beli?" menghasilkan jawaban sopan yang menyesatkan. Validasi sejati membuat orang **mengeluarkan sesuatu yang berharga**: uang (pre-order/DP), waktu (mendaftar waiting list), atau data. Komitmen nyata = sinyal jujur.

**Kesalahan 3: Tidak menetapkan angka lebih dulu.** Tanpa garis "PMF jika ≥20 pre-order", kamu akan menipu diri sendiri — 5 pre-order bisa terasa "lumayan" padahal tidak cukup. Tetapkan ambang batas SEBELUM eksperimen agar penilaianmu objektif.

**Kesalahan 4: Menganggap gagal = bisnis jelek.** Eksperimen yang "gagal" itu murah dan berharga — ia menyelamatkanmu dari kegagalan mahal (produksi massal yang tak laku). Hasil negatif tetap kemenangan informasi.

Soal follow-up tadi (20 pre-order tapi retensi 10%): artinya kamu punya daya tarik awal (janji/pemasaran bagus) tapi **produknya belum cukup baik** untuk membuat orang kembali — ember bocor. Fokus berikutnya: perbaiki produk/pengalaman, bukan menambah pre-order. Sekarang, bagaimana cara membangun versi awal produk dengan cepat dan murah?`,
    },
    {
      type: "lesson",
      title: "Minimum Viable Product (MVP) yang Benar",
      keyTakeaway:
        "MVP bukan produk setengah jadi yang jelek, tapi versi terkecil yang sudah memberi nilai nyata.",
      body: `MVP (Minimum Viable Product) sering disalahpahami sebagai "produk murahan setengah jadi". Padahal definisi yang benar: **versi terkecil dari produkmu yang sudah benar-benar menyelesaikan masalah inti pelanggan** — cukup untuk belajar, tanpa membangun semuanya.

Analogi terkenal: kalau tujuanmu membantu orang berpindah dari A ke B, MVP-nya bukan "satu roda mobil" (tak berguna, tak bisa dipakai). MVP-nya adalah **sepeda** — sederhana, tapi sudah memenuhi fungsi inti (berpindah). Dari sepeda kamu bisa berkembang ke motor, lalu mobil, sambil terus belajar dari pengguna.

Untuk UMKM, MVP bisa sangat sederhana:
- Mau buka restoran? MVP-nya berjualan dari dapur rumah/PO dulu, bukan langsung sewa ruko.
- Mau bikin aplikasi kursus? MVP-nya kelas via grup WhatsApp + Google Form dulu.
- Mau jual produk skincare? MVP-nya satu produk hero, bukan langsung 12 varian.

Prinsipnya: bangun **sesedikit mungkin** untuk menguji asumsi terbesarmu. Setiap fitur tambahan yang belum terbukti dibutuhkan adalah risiko dan biaya. Pertanyaan pemandu: "Apa hal terkecil yang bisa kubuat agar pelanggan mendapat nilai nyata dan aku mendapat pelajaran nyata?" Menariknya, MVP terbaik kadang tidak butuh produk jadi sama sekali.`,
    },
    {
      type: "example",
      title: "Membangun MVP Tanpa Coding / Tanpa Produksi",
      keyTakeaway:
        "Kamu bisa menguji permintaan dengan 'fasad' — layanan manual di balik layar sebelum sistem dibangun.",
      body: `Salah satu teknik MVP paling kuat adalah **"Wizard of Oz"**: dari luar tampak seperti produk/sistem otomatis, padahal di belakang layar kamu mengerjakannya manual. Tujuannya menguji apakah orang mau memakainya, sebelum repot membangun sistemnya.

**Contoh 1 — Toko online "palsu" dulu.** Sebelum produksi stok, buat katalog di Instagram/landing page. Saat ada yang pesan, kamu kulakan/buat satuan secara manual. Kamu menguji permintaan nyata tanpa risiko stok.

**Contoh 2 — Aplikasi yang dijalankan manusia.** Sebuah layanan "personal shopper via chat" bisa diuji tanpa aplikasi: pelanggan chat WhatsApp, dan kamu (manusia) yang mencarikan & membelikan barang. Kalau banyak yang mau bayar, baru bangun aplikasinya.

**Contoh 3 — Pre-sell sebelum produksi.** Jual produk yang belum ada via pre-order dengan tanggal kirim jelas. Uang masuk = validasi terkuat. Jika sepi, kamu hanya rugi waktu bikin materi promosi, bukan modal produksi.

Keuntungan besar pendekatan ini: **kamu belajar dari uang dan perilaku nyata, bukan tebakan**, dengan biaya nyaris nol. Banyak bisnis sukses dimulai dari operasi manual yang "tidak scalable" di awal — justru karena itu mereka belajar cepat. Tapi MVP hanyalah titik awal; kekuatan sebenarnya ada pada seberapa cepat kamu memperbaikinya.`,
    },
    {
      type: "lesson",
      title: "Iterasi Cepat: Siklus Build–Measure–Learn",
      keyTakeaway:
        "Kecepatan belajar (bukan kesempurnaan) adalah keunggulan kompetitif utama bisnis baru.",
      body: `Setelah punya MVP, mesin pertumbuhanmu yang sebenarnya adalah **kecepatan iterasi**. Kerangka klasiknya (dari Lean Startup) adalah lingkaran **Build → Measure → Learn**:

1. **Build** — buat versi/perubahan terkecil yang bisa diuji.
2. **Measure** — ukur respons nyata pelanggan dengan data (retensi, repeat order, feedback).
3. **Learn** — tarik pelajaran, putuskan: lanjut, perbaiki, atau pivot. Lalu ulangi.

Yang menentukan pemenang sering bukan siapa yang punya ide paling brilian di awal, tapi **siapa yang berputar di lingkaran ini paling cepat**. Bisnis yang menyelesaikan 10 putaran belajar dalam sebulan akan jauh meninggalkan yang baru sekali putaran.

Contoh warung kopi: minggu 1 coba menu baru (build), catat berapa yang pesan & kembali (measure), simpulkan menu mana yang dipertahankan (learn). Minggu 2 ulangi dengan kemasan baru. Pelan-pelan, warung itu "dipahat" oleh data pelanggan menjadi versi terbaiknya.

Bahaya yang harus dihindari: **terlalu lama menyempurnakan dalam diam**. Membangun 6 bulan tanpa memperlihatkan ke pelanggan = 6 bulan tanpa belajar. Lebih baik produk "cukup baik" yang cepat diuji daripada produk "sempurna" yang terlambat dan ternyata salah arah. Mari lihat bagaimana prinsip ini bekerja dalam sebuah kisah nyata.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Dari MVP 'Jelek' ke Produk yang Dicintai",
      keyTakeaway:
        "Memulai dengan operasi manual yang tidak sempurna sering lebih cepat menuju PMF daripada menunggu sempurna.",
      body: `Mari pelajari pola yang berulang pada banyak bisnis sukses, kita rangkai sebagai satu narasi pembelajaran.

**Situasi.** Seorang pendiri ingin membangun layanan langganan sayur organik. Godaannya: langsung bikin aplikasi mewah, gudang besar, dan armada pengiriman. Itu butuh ratusan juta dan berbulan-bulan.

**Pendekatan MVP.** Ia memilih jalan "memalukan": menerima pesanan lewat Google Form, membeli sayur di pasar pagi secara manual, mengemas di rumah, dan mengantar sendiri dengan motor ke 15 pelanggan pertama.

**Apa yang dipelajari (yang tak akan ia dapat dari rencana di atas kertas):** pelanggan ternyata tidak terlalu peduli "organik", tapi sangat peduli "praktis & terjadwal pasti tiap Senin pagi". Keluhan terbesar bukan harga, tapi sayur layu saat tiba siang hari. Data ini mengubah seluruh fokusnya: ketepatan jadwal & kesegaran, bukan label organik.

**Hasil.** Setelah retensi 15 pelanggan itu kuat (mereka "sangat kecewa" jika layanan hilang), barulah ia berinvestasi memperbesar. Mesinnya sudah menyala sebelum diberi bensin.

**Pelajaran counterintuitive:** operasi manual yang "tidak scalable" dan terasa memalukan justru menjadi mesin belajar tercepat menuju PMF. Kesempurnaan di awal sering menyembunyikan kebenaran yang hanya bisa diungkap oleh pelanggan nyata. Mari rangkum semua ini.`,
    },
    {
      type: "summary",
      title: "Kristalisasi: Menemukan Product-Market Fit",
      keyTakeaway:
        "PMF didapat dengan jujur membaca tarikan pasar, mengukur retensi, dan beriterasi cepat — bukan dengan menebak.",
      body: `Mari padatkan modul ini menjadi inti yang harus melekat:

**Tiga insight terpenting:**
1. **PMF adalah tarikan, bukan dorongan.** Sebelum scaling, pastikan pasar menarik produkmu (pelanggan kembali & merekomendasikan), bukan kamu yang terus mendorong dengan promosi. Iklan ke produk tanpa PMF = membakar uang lebih cepat.
2. **Ukur, jangan menebak.** Gunakan Tes 40%, lacak retensi, dan wawancara ala Mom Test (tanya perilaku & angka masa lalu, bukan opini masa depan). Penjualan pertama menipu; pembelian kedua jujur.
3. **Menang dengan kecepatan belajar.** Bangun MVP terkecil yang memberi nilai nyata (bahkan manual/Wizard of Oz), lalu putar Build–Measure–Learn secepat mungkin.

**Yang sering disalahpahami:** orang mengira PMF dicari dengan menyempurnakan produk dalam diam, lalu meluncurkan dengan megah. Justru sebaliknya — PMF ditemukan dengan rendah hati mengikuti ke mana pelanggan benar-benar tertarik, bahkan jika itu berarti pivot dari ide awalmu.

**Aplikasi langsung:** ambil ide/bisnismu sekarang, tuliskan satu eksperimen validasi termurah yang bisa kamu jalankan minggu ini, lengkap dengan angka penentu keberhasilannya.

Setelah mesinmu menyala (PMF), barulah pantas menginjak gas. Di modul berikutnya, kita bahas cara membangun mesin yang secara sistematis mendatangkan dan mempertahankan pelanggan. Tapi dulu — buktikan pemahamanmu lewat kuis!`,
    },
    quiz(),
  ],
};

const MOD2: ModuleInput = {
  title: "Mesin Akuisisi & Retensi Pelanggan",
  slug: "mesin-akuisisi-retensi-pelanggan",
  xpReward: 80,
  slides: [
    {
      type: "lesson",
      title: "Funnel: Memahami Perjalanan Pelanggan",
      keyTakeaway:
        "Pelanggan melewati tahapan dari kenal → tertarik → beli → loyal; tugasmu memperlancar tiap tahap.",
      body: `Pertumbuhan terasa misterius sampai kamu memecahnya menjadi sebuah **funnel** (corong): perjalanan bertahap yang dilewati orang dari pertama mengenalmu sampai menjadi pelanggan setia.

Bayangkan corong sungguhan: banyak orang masuk di atas (sadar kamu ada), tapi makin ke bawah makin menyempit (yang akhirnya membeli lebih sedikit). Tahap umumnya: **Sadar → Tertarik → Mempertimbangkan → Membeli → Kembali lagi**.

Kekuatan cara pandang ini: kamu bisa menemukan **di tahap mana kamu "bocor"**. Misal, banyak yang lihat tokomu (sadar) dan klik (tertarik), tapi sedikit yang checkout (beli). Berarti masalahnya bukan di promosi — melainkan di halaman/proses pembelian. Tanpa funnel, kamu akan salah menambah iklan padahal kebocorannya ada di tempat lain.

Analogi warung: ada yang lewat (sadar), berhenti melihat menu (tertarik), masuk (mempertimbangkan), pesan (beli), lalu jadi langganan (loyal). Kalau banyak yang berhenti melihat menu tapi pergi, mungkin menunya membingungkan atau harganya tak jelas — itu titik bocornya.

Memetakan funnel mengubah "kenapa sepi ya?" yang membingungkan menjadi pertanyaan spesifik yang bisa diperbaiki. Untuk mengukurnya, kita butuh kerangka metrik yang rapi.`,
      sources: [
        {
          type: "DOCUMENTATION",
          title: "Purchase Funnel — Wikipedia",
          url: "https://en.wikipedia.org/wiki/Purchase_funnel",
        },
        {
          type: "YOUTUBE",
          title: "Raymond Chin — Strategi Bisnis",
          url: "https://www.youtube.com/@RaymondChins",
        },
      ],
    },
    {
      type: "lesson",
      title: "AARRR: Metrik 'Bajak Laut' untuk Pertumbuhan",
      keyTakeaway:
        "Acquisition, Activation, Retention, Referral, Revenue — lima tahap yang wajib kamu ukur.",
      body: `Kerangka paling populer untuk mengukur funnel adalah **AARRR** (dijuluki "metrik bajak laut" karena bunyinya seperti "Arrr!"). Lima tahapnya:

1. **Acquisition (Akuisisi)** — bagaimana orang menemukanmu? (iklan, rekomendasi, pencarian)
2. **Activation (Aktivasi)** — apakah pengalaman pertama mereka memuaskan? ("momen aha")
3. **Retention (Retensi)** — apakah mereka kembali lagi?
4. **Referral (Rujukan)** — apakah mereka merekomendasikan ke orang lain?
5. **Revenue (Pendapatan)** — apakah dan berapa mereka membayar?

Kenapa urutan ini cerdas? Karena ia memaksamu **tidak loncat ke akuisisi besar terlalu cepat**. Banyak pemula membakar uang di Acquisition padahal Activation dan Retention-nya bocor — sama seperti modul sebelumnya: menuang air ke ember bocor.

Urutan sehat memperbaikinya: pastikan dulu pengalaman pertama memuaskan (Activation) dan orang kembali (Retention), baru perbesar Acquisition. Dengan begitu setiap rupiah iklan menghasilkan pelanggan yang bertahan, bukan sekadar mampir.

Untuk UMKM, kamu tak perlu tools mahal — cukup catat sederhana: berapa orang baru minggu ini (A), berapa yang puas di pembelian pertama (A), berapa yang beli lagi (R), berapa yang bawa teman (R), dan total pendapatan (R). Mari kita bedah tahap paling atas dulu: akuisisi.`,
    },
    {
      type: "lesson",
      title: "Akuisisi: Dari Mana Pelanggan Datang",
      keyTakeaway:
        "Fokus pada 1-2 channel yang benar-benar bekerja, jangan tipis-tipis di semua tempat.",
      body: `Akuisisi adalah seni mendatangkan orang baru. Godaan terbesar pemula: mencoba **semua channel sekaligus** — Instagram, TikTok, marketplace, iklan, sebar brosur — sampai energi habis dan tak ada satu pun yang dikerjakan serius.

Prinsip yang lebih sehat: **temukan 1-2 channel yang paling cocok dengan pelangganmu, lalu kuasai sampai dalam.** Channel yang tepat tergantung di mana pelangganmu menghabiskan waktu dan bagaimana mereka mengambil keputusan.

Tiga kategori channel:
- **Organik** (gratis tapi lambat): konten media sosial, SEO, word of mouth. Bagus untuk jangka panjang.
- **Berbayar** (cepat tapi butuh modal): iklan IG/TikTok/Google. Bagus untuk menguji & menskala cepat — TAPI hanya setelah retensi sehat.
- **Komunitas & kemitraan**: titip jual, kolaborasi, masuk komunitas relevan. Sering paling murah & efektif untuk UMKM.

Cara memilih: tanyakan ke 10 pelanggan terbaikmu, "dari mana kamu pertama tahu kami?" Channel yang paling sering disebut adalah yang patut kamu perkuat. Jangan menebak — ikuti data.

Satu peringatan: channel berubah. Yang murah hari ini bisa mahal besok. Maka bangun juga aset yang kamu miliki sendiri (database pelanggan, grup, konten) agar tak sepenuhnya bergantung pada satu platform. Salah satu channel organik terkuat adalah konten — mari kita dalami.`,
    },
    {
      type: "example",
      title: "Konten yang Menarik Pelanggan (Bukan Sekadar Jualan)",
      keyTakeaway:
        "Konten yang membantu/menghibur menarik orang; konten yang cuma jualan diabaikan.",
      body: `Media sosial dipenuhi bisnis yang berteriak "BELI! BELI!" dan diabaikan. Konten yang berhasil menarik pelanggan justru yang **memberi nilai lebih dulu** — membantu, mengedukasi, atau menghibur — sebelum meminta.

Rumus sederhana yang terbukti: **bagi 80/20**. 80% konten memberi (tips, cerita, hiburan yang relevan), 20% menjual langsung. Orang mengikutimu karena 80% itu, lalu percaya saat 20% jualan muncul.

Contoh konkret per jenis usaha:
- **Toko bahan kue:** video "3 kesalahan bikin brownies bantet" → menarik calon pembeli yang relevan, menutup dengan "bahan-bahannya ada di toko kami".
- **Jasa servis AC:** "cara cek AC bocor sendiri di rumah" → membangun kepercayaan sebagai ahli; yang malas/tak bisa akan memanggilmu.
- **Katering sehat:** "menu sahur 5 menit anti ribet" → relevan dengan target, menunjukkan keahlian.

Perhatikan polanya: konten itu menyelesaikan masalah kecil gratis, sehingga calon pelanggan berpikir "kalau yang gratis aja membantu, apalagi yang berbayar". Ini membangun otoritas dan kepercayaan — dua bahan bakar penjualan.

Konsistensi mengalahkan kesempurnaan: lebih baik posting sederhana 4x seminggu secara rutin daripada satu video megah sebulan sekali. Tapi menarik orang saja tidak cukup — kamu harus tahu apakah biayanya sepadan. Di sinilah angka berbicara.`,
    },
    {
      type: "example",
      title: "Menghitung CAC & LTV (Unit Economics)",
      keyTakeaway:
        "Bisnis sehat: nilai seumur hidup pelanggan (LTV) jauh lebih besar dari biaya mendapatkannya (CAC).",
      body: `Dua angka ini memisahkan bisnis yang tumbuh sehat dari yang diam-diam bangkrut: **CAC** dan **LTV**.

**CAC (Customer Acquisition Cost)** = biaya rata-rata mendapatkan satu pelanggan baru.
Rumus: total biaya pemasaran ÷ jumlah pelanggan baru.
Contoh: belanja iklan Rp1.000.000 menghasilkan 50 pelanggan → CAC = Rp20.000.

**LTV (Lifetime Value)** = total keuntungan dari satu pelanggan selama ia berlangganan denganmu.
Rumus sederhana: rata-rata profit per transaksi × jumlah transaksi seumur hidup.
Contoh: pelanggan kopi beli 2x/minggu, profit Rp8.000/gelas, bertahan rata-rata 6 bulan → 2 × 4 × 6 = 48 transaksi × Rp8.000 = **LTV Rp384.000**.

**Aturan emas:** LTV harus jauh lebih besar dari CAC. Patokan sehat **LTV : CAC ≥ 3 : 1**. Pada contoh di atas (Rp384.000 : Rp20.000 = 19:1) sangat sehat — artinya boleh agresif beriklan.

Kalau CAC > LTV, kamu **rugi tiap menambah pelanggan** — makin laris makin cepat bangkrut. Banyak bisnis "ramai tapi merugi" terjebak di sini karena tak pernah menghitung.

Insight penting: cara tercepat memperbaiki rasio bukan selalu menurunkan CAC, tapi **menaikkan LTV** (membuat orang beli lebih sering/lebih lama) — yang membawa kita kembali ke pentingnya retensi. Tapi sebelum itu, channel mana yang sebaiknya dipilih? Mari belajar dari kasus nyata.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Memilih Channel yang Tepat",
      keyTakeaway:
        "Channel terbaik bukan yang paling ramai, tapi yang menghasilkan pelanggan ber-LTV tinggi dengan CAC rendah.",
      body: `Mari pelajari dilema nyata seorang pemilik UMKM, sebut saja Budi, yang menjual madu murni premium.

**Situasi.** Budi punya budget iklan terbatas Rp2 juta/bulan dan bingung memilih channel: TikTok (lagi ramai), iklan Instagram, atau titip di komunitas pencinta gaya hidup sehat.

**Eksperimen.** Alih-alih menebak, Budi membagi budget untuk menguji tiga channel selama sebulan, dan mencatat tiap pelanggan datang dari mana + apakah mereka beli lagi.

**Hasil yang mengejutkan:**
- TikTok: banyak views & pesanan pertama (CAC murah Rp15.000), TAPI hampir tak ada yang beli lagi — pembeli impulsif yang tak benar-benar butuh.
- Iklan IG: CAC sedang (Rp40.000), retensi sedang.
- Komunitas sehat: CAC paling mahal per akuisisi awal (Rp60.000), TAPI retensi sangat tinggi — mereka beli rutin tiap bulan (LTV besar).

**Keputusan.** Walau CAC-nya paling mahal, Budi menggandakan investasi di **komunitas**, karena LTV-nya membuat rasio LTV:CAC jauh paling sehat. Channel yang "terlihat murah" (TikTok) ternyata paling boros karena pelanggannya tak bertahan.

**Pelajaran counterintuitive:** channel terbaik bukan yang CAC-nya termurah atau yang paling viral, melainkan yang mendatangkan **pelanggan yang bertahan**. Kamu hanya bisa tahu ini dengan mengukur, bukan mengikuti tren. Setelah orang masuk, momen paling kritis menentukan apakah mereka bertahan: aktivasi.`,
    },
    {
      type: "lesson",
      title: "Aktivasi: Menciptakan 'Momen Aha' Pertama",
      keyTakeaway:
        "Pengalaman pertama yang memuaskan menentukan apakah pelanggan kembali atau hilang selamanya.",
      body: `Akuisisi membawa orang masuk, tapi **aktivasi** menentukan apakah mereka bertahan. Aktivasi adalah momen pertama pelanggan benar-benar merasakan nilai produkmu — sering disebut **"momen aha"**: titik ketika mereka berpikir "oh, ini gunanya, ini yang aku cari!".

Kalau momen aha tak terjadi di pengalaman pertama, sebagian besar pelanggan baru akan pergi diam-diam dan tak pernah kembali — berapa pun bagusnya produkmu sebenarnya.

Tugasmu: identifikasi apa momen aha-mu, lalu **antar pelanggan ke sana secepat mungkin**. Contoh:
- **Aplikasi pesan-antar:** momen aha = pesanan pertama tiba tepat waktu & rapi. Maka pengalaman order pertama harus mulus tanpa kebingungan.
- **Warung kopi:** momen aha = tegukan pertama yang "wah, enak". Maka jangan kecewakan pelanggan baru dengan antrean kacau atau pesanan salah.
- **Kelas online:** momen aha = menyelesaikan satu pelajaran dan merasa "aku bisa!". Maka pelajaran pertama harus mudah dituntaskan, bukan langsung berat.

Cara memperbaiki aktivasi: amati pelanggan baru. Di titik mana mereka bingung, ragu, atau menyerah? Hilangkan gesekan (friction) di sana. Sering kali memperbaiki 30 detik pertama pengalaman pelanggan berdampak lebih besar daripada menambah iklan. Sekarang, mari kamu praktikkan merangkai semuanya dalam sebuah tantangan.`,
    },
    {
      type: "challenge",
      title: "Challenge: Rancang Funnel & Hitung Unit Economics",
      body: `Waktunya berpikir seperti growth strategist. Ambil sebuah bisnis (milikmu, atau contoh: "kedai kopi susu kekinian dekat kampus"). Kamu diminta merancang strategi pertumbuhan yang berdasarkan angka, bukan tebakan.`,
      challenge: {
        instruction:
          "Untuk sebuah bisnis (pilihanmu atau contoh kedai kopi), buatlah: (1) peta funnel singkat (tahap Sadar → ... → Loyal) dan tebak di tahap mana paling mungkin 'bocor'; (2) pilih 1 channel akuisisi utama beserta ALASAN kenapa cocok dengan pelangganmu; (3) hitung contoh CAC dan LTV dengan angka asumsi yang kamu sebutkan sendiri, lalu simpulkan rasio LTV:CAC sehat atau tidak; (4) sebutkan 1 ide konkret menaikkan retensi/LTV.",
        inputType: "essay",
        inputPlaceholder:
          "Funnel: Sadar (lihat di IG) → Tertarik → ... Channel utama: ... karena ... CAC: Rp.../pelanggan (dari ...). LTV: ... Rasio: ... Ide retensi: ...",
        starterCode: "",
        expectedConcepts: [
          "Peta funnel & identifikasi titik bocor",
          "Pemilihan channel akuisisi dengan alasan berbasis pelanggan",
          "Perhitungan CAC & LTV dengan angka + kesimpulan rasio (idealnya ≥3:1)",
          "Ide konkret menaikkan retensi/LTV",
        ],
        evaluationCriteria:
          "Nilai apakah jawaban: (1) memetakan funnel bertahap & menebak titik bocor yang masuk akal; (2) memilih channel dengan alasan terkait di mana pelanggan berada/berperilaku (bukan 'karena lagi viral' tanpa alasan); (3) MENGHITUNG CAC & LTV dengan angka konkret (boleh asumsi, asalkan logikanya benar: CAC = biaya/pelanggan; LTV = profit per transaksi × frekuensi × durasi) lalu menyimpulkan rasio LTV:CAC dan apakah sehat (patokan ≥3:1); (4) memberi ide retensi/LTV konkret. Beri 70-85 jika 3 dari 4 baik. Beri 90-100 jika perhitungan CAC/LTV benar secara logika DAN keempat poin lengkap. Abaikan gaya bahasa; fokus pada penalaran angka & strategi. Jika tidak ada perhitungan angka sama sekali, skor < 55.",
        hints: [
          "Funnel minimal: Sadar → Tertarik → Beli → Kembali. Di mana orang paling banyak 'hilang'? Itu titik bocormu.",
          "LTV = (profit per transaksi) × (berapa kali beli per bulan) × (berapa bulan bertahan). CAC = total biaya pemasaran ÷ jumlah pelanggan baru.",
          "Rasio sehat LTV:CAC ≥ 3:1. Jika rasiomu < 1, kamu rugi tiap menambah pelanggan — perbaiki retensi/LTV dulu sebelum beriklan lebih besar.",
        ],
        sampleAnswer:
          "Kedai kopi dekat kampus. Funnel: Sadar (lewat depan kedai/IG) → Tertarik (lihat menu & promo) → Beli (gelas pertama) → Kembali. Titik bocor: dari 'sadar' ke 'beli' karena banyak yang ragu coba kedai baru. Channel utama: konten IG/TikTok lokal kampus + endorse mahasiswa, karena target ada di sana & dipengaruhi teman. CAC: belanja promo Rp500.000 → 50 pembeli baru → CAC Rp10.000. LTV: profit Rp6.000/gelas × 3 gelas/minggu × 4 minggu × 4 bulan = Rp288.000. Rasio LTV:CAC = 28:1 → sangat sehat, boleh agresif promosi. Ide retensi: kartu stempel 'beli 10 gratis 1' agar mahasiswa kembali rutin.",
        followUpQuestion:
          "Jika CAC-mu tiba-tiba naik 3x lipat karena iklan makin mahal, dua hal apa yang bisa kamu lakukan agar bisnis tetap sehat?",
      },
    },
    {
      type: "lesson",
      title: "Pembahasan Challenge & Kesalahan Umum",
      keyTakeaway:
        "Keputusan pertumbuhan harus berbasis angka unit economics, bukan sekadar 'ramai' atau 'viral'.",
      body: `Mari bedah tantangan tadi dan jebakan yang paling sering muncul.

**Kesalahan 1: Mengejar viral tanpa retensi.** Banyak yang memilih channel "karena lagi ramai" tanpa memikirkan apakah pelanggannya bertahan. Ingat kasus Budi: channel viral bisa mendatangkan pembeli sekali pakai yang justru memboroskan. Selalu kaitkan channel dengan LTV.

**Kesalahan 2: Tidak pernah menghitung.** "Pokoknya jualan aja, nanti juga untung" adalah resep bisnis ramai-tapi-rugi. Tanpa CAC & LTV, kamu buta apakah setiap pelanggan baru menambah untung atau menambah lubang.

**Kesalahan 3: Salah menafsir LTV.** LTV bukan total penjualan, tapi total **profit** (penjualan dikurangi biaya). Pelanggan yang beli banyak tapi marginnya tipis bisa ber-LTV rendah.

**Kesalahan 4: Menambal di tempat yang salah.** Kalau funnel bocor di "beli" (banyak tertarik tapi tak checkout), menambah iklan di "sadar" hanya membuang uang. Perbaiki dulu titik bocor sebenarnya.

Soal follow-up (CAC naik 3x): dua langkah sehat — (a) **naikkan LTV** lewat retensi/upsell agar rasio tetap sehat meski CAC naik; (b) **geser ke channel ber-CAC lebih rendah** seperti referral & organik, mengurangi ketergantungan pada iklan berbayar. Yang kedua membawa kita ke senjata pertumbuhan paling efisien: membuat pelanggan mendatangkan pelanggan. Tapi fondasinya tetap retensi — mari perdalam.`,
    },
    {
      type: "lesson",
      title: "Retensi: Kunci Pertumbuhan Berkelanjutan",
      keyTakeaway:
        "Mempertahankan pelanggan lama jauh lebih murah dan lebih untung daripada terus mencari yang baru.",
      body: `Kalau hanya boleh fokus pada satu metrik pertumbuhan, banyak ahli memilih **retensi**. Alasannya kuat: mempertahankan pelanggan lama jauh lebih murah daripada mendapatkan yang baru (sering dikutip 5x lebih murah), dan pelanggan lama cenderung belanja lebih banyak seiring waktu.

Retensi adalah **fondasi yang membuat semua metrik lain bekerja**. Retensi tinggi berarti: LTV naik (rasio LTV:CAC membaik), basis pelanggan menumpuk (bukan sekadar berputar), dan referral lebih mungkin terjadi (orang puas yang bertahan akan merekomendasikan).

Kembali ke metafora ember bocor dari modul 1: akuisisi adalah keran yang mengisi, retensi adalah seberapa rapat embernya. Bisnis dengan ember rapat (retensi tinggi) akan terus terisi penuh meski kerannya kecil. Bisnis dengan ember bocor harus membuka keran besar-besaran (iklan mahal) hanya untuk bertahan di tempat.

Cara meningkatkan retensi:
- **Konsistensi kualitas** — alasan nomor satu orang berhenti adalah kekecewaan berulang.
- **Komunikasi & perhatian** — follow up, ucapan terima kasih, ingat preferensi mereka.
- **Memberi alasan untuk kembali** — program loyalitas, menu/produk baru, langganan.

Bisnis berbasis langganan (subscription) cerdas karena retensinya terbangun dalam model. Bagaimana caranya membuat pelanggan secara alami terus kembali? Mari lihat mekanismenya.`,
    },
    {
      type: "example",
      title: "Program Loyalitas & 'Habit Loop'",
      keyTakeaway:
        "Buat kebiasaan: pemicu → tindakan → imbalan, agar kembali jadi otomatis.",
      body: `Cara paling ampuh menaikkan retensi adalah menjadikan produkmu sebuah **kebiasaan**. Psikolog menjelaskan kebiasaan lewat "habit loop": **Pemicu → Tindakan → Imbalan**, yang berulang sampai otomatis.

- **Pemicu (trigger):** sesuatu yang mengingatkan pelanggan akan produkmu. Notifikasi, jadwal rutin ("kopi pagi"), atau email "sudah waktunya isi ulang".
- **Tindakan:** pembelian/penggunaan yang dibuat semudah mungkin (sekali klik, langganan otomatis).
- **Imbalan:** kepuasan + bonus yang memperkuat ("dapat poin!", "gratis 1 setelah 10").

**Program loyalitas** memanfaatkan ini secara konkret:
- **Kartu stempel** ("beli 10 gratis 1") — sederhana, terbukti membuat orang kembali untuk menyelesaikan koleksi (efek "tujuan hampir tercapai").
- **Sistem poin & tier** — makin loyal makin banyak manfaat, menciptakan rasa status.
- **Langganan** — imbalan + kenyamanan otomatis, retensi terkuat.

Trik psikologis nyata: kartu stempel yang dimulai dengan **2 stempel gratis** ("beli 8 dari 10, 2 kami hadiahkan") membuat orang lebih bersemangat menyelesaikannya daripada kartu kosong 10 — walau jumlah pembelian yang diperlukan sama. Rasa "sudah mulai" memotivasi.

Kunci: imbalan harus terasa berharga & tujuannya tampak bisa dicapai. Loyalitas yang terlalu sulit dicapai malah mengecewakan. Setelah pelanggan loyal, mereka bisa menjadi aset pertumbuhan paling kuat: tenaga penjualmu.`,
    },
    {
      type: "lesson",
      title: "Referral: Menjadikan Pelanggan Tenaga Penjual",
      keyTakeaway:
        "Referral menggabungkan CAC rendah dengan kepercayaan tinggi — mesin pertumbuhan paling efisien.",
      body: `Referral (rujukan) adalah mesin pertumbuhan paling didambakan karena dua alasan: **CAC-nya sangat rendah** (pelanggan yang memasarkan untukmu) dan **tingkat kepercayaannya tinggi** (rekomendasi teman jauh lebih dipercaya daripada iklan).

Tapi referral jarang terjadi sendiri dalam jumlah besar — kamu perlu **mendorongnya dengan sengaja**. Dua bahan utamanya:

**1. Produk yang layak dibicarakan.** Tak ada yang merekomendasikan produk biasa-biasa saja. Referral dimulai dari pengalaman yang melampaui ekspektasi (kembali ke pentingnya kualitas & momen aha). Tanpa ini, program referral apa pun akan datar.

**2. Sistem & insentif yang memudahkan.** Buat berbagi jadi gampang dan menguntungkan kedua pihak:
- **Insentif dua arah:** "ajak teman, kalian berdua dapat diskon/saldo". Ini terasa adil dan memberi alasan kuat untuk mengajak.
- **Permudah secara teknis:** kode referral, link siap-bagi, atau cukup "tunjukkan postingan ini".
- **Minta di momen puncak kepuasan:** ajak mereka merekomendasikan tepat setelah pengalaman yang memuaskan (paket baru tiba, masalah terselesaikan), bukan sembarang waktu.

Contoh UMKM: warung memberi "diskon 20% untuk kamu dan temanmu di kunjungan berikutnya kalau ajak teman baru". Murah, dan mendatangkan pelanggan yang sudah hangat karena diajak orang terpercaya.

Ketika referral berputar — pelanggan baru menjadi perujuk berikutnya — kamu mendapatkan sesuatu yang dahsyat: growth loop. Mari lihat contohnya.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Growth Loop yang Berputar Sendiri",
      keyTakeaway:
        "Growth loop terbaik membuat output (pelanggan baru) menjadi input untuk pertumbuhan berikutnya.",
      body: `Funnel adalah garis lurus (orang masuk, sebagian keluar di ujung). **Growth loop** lebih kuat: ia melingkar — hasil dari satu putaran menjadi bahan bakar putaran berikutnya. Mari pelajari polanya lewat narasi.

**Situasi.** Sebuah aplikasi berbagi file gratis butuh tumbuh tanpa budget iklan besar.

**Loop yang dirancang:** Pengguna A menyimpan file → ingin membagikannya → mengundang Pengguna B untuk mengakses → B melihat manfaatnya → B mendaftar & mulai membagikan ke C, D, E → dst. Setiap pengguna baru secara alami menghasilkan pengguna baru lainnya. Pertumbuhan menjadi **berputar sendiri**, bukan bergantung pada iklan terus-menerus.

**Kenapa ini ampuh:** pada funnel biasa, kamu harus terus membayar untuk mengisi bagian atas. Pada growth loop, **setiap pelanggan yang puas memperbesar bagian atas funnel berikutnya secara gratis**.

**Untuk UMKM, growth loop bisa sederhana:**
- Pelanggan puas → posting foto produk + tag → temannya lihat → tertarik beli → posting lagi → dst. (Dorong dengan: "tag kami, dapat diskon berikutnya".)
- Pelanggan katering puas → bawa ke acara kantor → rekan kerja cicipi → pesan untuk acaranya sendiri → dst.

**Pelajaran:** rancang produk & insentif agar setiap pelanggan secara alami mendatangkan pelanggan berikutnya. Loop yang berputar mengalahkan funnel yang harus terus dibayar. Mari rangkum mesin pertumbuhan ini.`,
    },
    {
      type: "summary",
      title: "Kristalisasi: Mesin Akuisisi & Retensi",
      keyTakeaway:
        "Pertumbuhan sehat = funnel yang terukur (AARRR), unit economics positif (LTV>CAC), dengan retensi & referral sebagai inti.",
      body: `Mari padatkan modul ini:

**Tiga insight terpenting:**
1. **Ukur funnel dengan AARRR & perbaiki titik bocor yang benar.** Jangan menambah iklan (Acquisition) kalau kebocoranmu ada di Activation atau Retention. Diagnosa dulu, baru obati.
2. **Keputusan berbasis unit economics.** Hitung CAC & LTV. Bisnis sehat punya LTV:CAC ≥ 3:1. Channel terbaik bukan yang termurah/terviral, tapi yang mendatangkan pelanggan yang bertahan.
3. **Retensi & referral adalah mesin paling efisien.** Mempertahankan lebih murah daripada mengakuisisi; pelanggan puas yang bertahan akan merekomendasikan, menciptakan growth loop yang berputar sendiri.

**Yang sering disalahpahami:** pertumbuhan dikira soal "iklan sebanyak-banyaknya". Padahal iklan hanya memperbesar mesin yang sudah ada. Tanpa retensi yang sehat, menambah akuisisi hanya mempercepat kebocoran uang.

**Aplikasi langsung:** untuk bisnismu, hitung CAC & LTV kasarnya minggu ini, lalu pilih SATU perbaikan retensi (mis. kartu loyalitas atau follow-up pelanggan) untuk dijalankan.

Kamu kini bisa mendatangkan dan mempertahankan pelanggan. Tapi pertumbuhan menghadirkan tantangan baru: bagaimana melayani permintaan yang membesar tanpa bisnis (dan dirimu) ambruk? Itulah inti modul terakhir — skalabilitas. Uji dulu pemahamanmu lewat kuis!`,
    },
    quiz(),
  ],
};

const MOD3: ModuleInput = {
  title: "Skalabilitas Operasional & Keuangan yang Sehat",
  slug: "skalabilitas-operasional-keuangan-sehat",
  xpReward: 80,
  slides: [
    {
      type: "lesson",
      title: "Apa Itu Bisnis yang Skalabel",
      keyTakeaway:
        "Bisnis skalabel bisa melayani jauh lebih banyak pelanggan tanpa biaya & kerumitan ikut naik sebanding.",
      body: `Pertumbuhan permintaan terdengar seperti kabar baik — sampai bisnismu (dan dirimu) kewalahan dan kualitas anjlok. Di sinilah konsep **skalabilitas** menjadi penentu: kemampuan melayani jauh lebih banyak pelanggan **tanpa** biaya dan kerumitan ikut naik sebanding.

Bandingkan dua model:
- **Tidak skalabel:** konsultan yang menjual jam-nya sendiri. Mau melayani 2x lebih banyak klien? Harus kerja 2x lebih lama — mustahil melampaui batas waktunya. Pendapatan terikat pada tenaganya sendiri.
- **Skalabel:** konsultan yang sama mengemas ilmunya jadi kelas online. Sekali dibuat, bisa dijual ke 10 atau 10.000 orang dengan biaya tambahan nyaris nol.

Bukan berarti bisnis jasa/fisik tak bisa skalabel — kuncinya adalah **memutus ketergantungan pertumbuhan pada tenaga & waktu pribadimu**. Warung yang resep & prosesnya hanya ada "di kepala pemilik" tidak skalabel: buka cabang = kekacauan. Warung dengan resep terstandar & SOP jelas bisa direplikasi.

Pertanyaan diagnostik: "Kalau pesanan tiba-tiba 5x lipat besok, apa yang akan patah duluan?" Jawabannya menunjukkan hambatan skalabilitasmu — entah itu kamu sendiri (semua bergantung padamu), proses (tak ada sistem), atau arus kas (tak sanggup beli bahan).

Tiga pilar skalabilitas yang akan kita bahas: **sistem, tim, dan keuangan**. Mulai dari yang paling membebaskan: sistem.`,
      sources: [
        {
          type: "DOCUMENTATION",
          title: "Scalability — Wikipedia",
          url: "https://en.wikipedia.org/wiki/Scalability",
        },
        {
          type: "YOUTUBE",
          title: "Dr. Indrawan Nugroho — Manajemen & Skala Bisnis",
          url: "https://www.youtube.com/@drindrawannugroho",
        },
      ],
    },
    {
      type: "lesson",
      title: "Sistem & SOP: Bisnis yang Jalan Tanpa Kamu",
      keyTakeaway:
        "SOP mengubah pengetahuan di kepalamu menjadi proses yang bisa diulang siapa pun secara konsisten.",
      body: `Hambatan skalabilitas nomor satu pada UMKM adalah: **terlalu banyak hal yang hanya ada di kepala pemilik.** Resep, cara melayani komplain, standar kerapian — semua bergantung pada satu orang. Akibatnya pemilik tak bisa cuti, tak bisa delegasi, dan tak bisa buka cabang tanpa kualitas berantakan.

Solusinya adalah **SOP (Standard Operating Procedure)**: panduan tertulis langkah demi langkah untuk tugas yang berulang. SOP mengubah "ilmu di kepala" menjadi "proses yang bisa diulang siapa pun".

Analogi paling jelas: **waralaba**. Kenapa burger di gerai cabang mana pun rasanya sama? Karena setiap langkah — suhu, durasi, takaran — distandarkan dalam SOP. Mereka tidak mengandalkan "bakat" tiap karyawan, tapi sistem yang membuat hasil konsisten meski karyawannya berganti.

Manfaat SOP untuk skalabilitas:
- **Konsistensi kualitas** meski dikerjakan orang berbeda.
- **Pelatihan karyawan baru cepat** — tinggal ikuti panduan, bukan magang berbulan-bulan.
- **Pemilik bebas** dari pekerjaan operasional harian untuk fokus pada strategi.
- **Replikasi** (cabang/franchise) jadi mungkin.

Tanda kamu butuh SOP: kamu menjawab pertanyaan yang sama berulang kali, atau kualitas turun saat kamu tidak ada. Jangan tunggu sempurna — SOP adalah dokumen hidup yang terus diperbaiki. Bagaimana membuat yang pertama?`,
    },
    {
      type: "example",
      title: "Membuat SOP Pertamamu (Praktis)",
      keyTakeaway:
        "Mulai dari satu tugas paling sering/paling kritis; rekam caramu mengerjakannya, lalu rapikan jadi langkah.",
      body: `SOP terdengar formal dan menakutkan, padahal bisa sangat sederhana. Jangan mulai dengan membuat "buku manual perusahaan" — mulai dari **satu tugas** yang paling sering dilakukan atau paling kritikal.

**Langkah praktis membuat SOP pertama:**
1. **Pilih satu tugas berulang.** Misal: "cara menyiapkan & mengemas pesanan online".
2. **Kerjakan sambil mencatat/merekam.** Lain kali kamu melakukannya, rekam video HP atau tulis tiap langkah persis seperti yang kamu lakukan. Ini cara tercepat — kamu sudah ahli, tinggal "mendokumentasikan diri".
3. **Rapikan jadi langkah berurutan + checklist.** Sertakan detail yang sering salah: takaran, suhu, kalimat baku saat membalas pelanggan, standar foto.
4. **Uji ke orang lain.** Minta orang yang belum pernah melakukannya mengikuti SOP-mu. Di mana mereka bingung? Perbaiki di titik itu. SOP yang baik bisa diikuti tanpa bertanya.

Contoh format ringkas SOP "Kemas Pesanan":
- [ ] Cek pesanan & alamat di sistem
- [ ] Bungkus dengan bubble wrap 2 lapis (item pecah belah)
- [ ] Sertakan kartu ucapan terima kasih
- [ ] Foto paket sebelum kirim (bukti)
- [ ] Update resi ke pelanggan dengan template pesan baku

Mulai dari 1 SOP, lalu tambah seiring waktu. Dalam beberapa bulan, kamu punya "otak bisnis" yang hidup di dokumen, bukan di kepalamu. SOP memungkinkan langkah berikutnya: melepas pekerjaan ke orang lain.`,
    },
    {
      type: "lesson",
      title: "Delegasi & Membangun Tim Awal",
      keyTakeaway:
        "Delegasikan dulu tugas yang berulang & bernilai rendah agar kamu fokus pada yang hanya bisa kamu lakukan.",
      body: `Banyak pemilik UMKM terjebak menjadi "karyawan tersibuk di perusahaannya sendiri" — mengerjakan semua, dari produksi sampai balas chat, sampai tak ada waktu memikirkan pertumbuhan. Skalabilitas menuntut keberanian **delegasi**.

Halangan terbesar delegasi adalah perasaan "tak ada yang bisa sebaik aku". Mungkin benar di awal — tapi itulah gunanya SOP: ia menaikkan kualitas orang lain mendekati standarmu.

**Apa yang didelegasikan lebih dulu?** Gunakan prinsip ini: lepaskan tugas yang **sering berulang dan bernilai rendah** (mengemas, posting rutin, balas chat standar), agar waktumu tersisa untuk yang **hanya bisa kamu lakukan & bernilai tinggi** (strategi, hubungan kunci, inovasi produk).

**Cara delegasi yang benar (bukan sekadar melempar tugas):**
- Beri SOP + contoh hasil yang diharapkan, bukan cuma perintah.
- Delegasikan **hasil**, bukan micromanage tiap langkah. Sepakati standar & tenggat, beri ruang cara.
- Terima bahwa di awal hasilnya 80% sebaik kamu — itu sudah kemenangan, karena membebaskan 100% waktumu untuk hal lain.

Tim awal tak harus karyawan penuh waktu. Bisa freelancer, paruh waktu, atau bagi tugas dengan partner. Yang penting: mulai melepas, agar bisnis tak lagi terbatas oleh dua tanganmu. Tapi menambah orang & kapasitas butuh uang — dan di sinilah banyak bisnis tumbuh justru tersandung. Mari bicara nyawa bisnis: arus kas.`,
    },
    {
      type: "example",
      title: "Arus Kas (Cash Flow): Nyawa Bisnis",
      keyTakeaway:
        "Arus kas adalah uang yang benar-benar masuk-keluar; bisnis mati karena kehabisan kas, bukan karena tak untung.",
      body: `Ada pepatah penting: **"Revenue is vanity, profit is sanity, but cash is king."** (Omzet itu gengsi, laba itu logika, tapi kas adalah raja.) Banyak bisnis yang "di atas kertas untung" tetap bangkrut karena satu hal: **kehabisan uang tunai pada waktu yang salah.**

**Arus kas** adalah aliran uang yang benar-benar masuk dan keluar dari kantong bisnismu, beserta **waktunya**. Ini berbeda dari laba. Kamu bisa mencatat laba besar tapi kasnya kosong — misalnya karena uangmu "tersangkut" di stok yang belum laku atau di tagihan pelanggan yang belum dibayar.

**Contoh jebakan waktu:**
- Kamu dapat pesanan besar Rp50 juta (untung Rp15 juta!). Tapi kamu harus beli bahan Rp35 juta **sekarang**, sedangkan pelanggan baru bayar **60 hari lagi**. Selama 60 hari itu, dari mana uang untuk gaji & sewa? Kalau tak ada simpanan, bisnis "untung" ini bisa mati kehabisan napas.

**Prinsip menjaga arus kas sehat:**
- **Percepat uang masuk:** minta DP, tawarkan diskon untuk bayar cepat, hindari kasbon menumpuk.
- **Perlambat uang keluar (secara wajar):** negosiasi tempo ke supplier, jangan beli aset besar dari kas operasional.
- **Jaga "dana darurat"** minimal beberapa bulan biaya tetap. Ini bantalan saat ada guncangan.
- **Pisahkan uang bisnis & pribadi** — mencampurnya adalah penyebab nomor satu UMKM kehilangan kendali kas.

Memahami beda laba vs kas menyelamatkan banyak bisnis. Mari lihat kasusnya secara nyata.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Untung di Atas Kertas, Bangkrut di Kenyataan",
      keyTakeaway:
        "Pertumbuhan cepat tanpa manajemen kas bisa mempercepat kebangkrutan — disebut 'overtrading'.",
      body: `Mari pelajari pola berbahaya yang dikenal sebagai **overtrading** — tumbuh terlalu cepat sampai kehabisan kas — lewat narasi UMKM.

**Situasi.** Rina punya usaha konveksi kecil. Produknya laris, pesanan terus berdatangan, bahkan dari perusahaan besar. Di buku, labanya tumbuh tiap bulan. Semua terlihat seperti kisah sukses.

**Akar masalah (timing kas).** Klien korporat membayar dengan tempo 60-90 hari. Sementara itu, Rina harus membayar tunai untuk kain, gaji penjahit, dan listrik **setiap minggu**. Makin besar pesanan yang ia terima, makin besar uang tunai yang harus ia keluarkan di depan — sebelum pembayaran klien masuk.

**Titik patah.** Suatu bulan, tiga pesanan besar datang bersamaan. Rina kegirangan dan menerima semuanya. Ia menghabiskan seluruh tabungan + berutang untuk beli bahan. Lalu satu klien telat bayar. Tiba-tiba ia tak punya uang untuk gaji penjahit. Penjahit berhenti, pesanan molor, reputasi rusak, denda keterlambatan datang. Bisnis yang "untung dan laris" itu ambruk — bukan karena rugi, tapi karena **kehabisan kas di saat kritis.**

**Pelajaran counterintuitive:** menerima SEMUA pesanan besar bisa menjadi keputusan yang membunuh. Pertumbuhan harus diimbangi kemampuan kas mendanainya. Rina seharusnya: menolak/menjadwal ulang sebagian pesanan, meminta DP besar di muka, atau mengamankan pendanaan modal kerja **sebelum** menerima.

Ini menunjukkan kenapa memahami angka — margin, titik impas, kas — sama pentingnya dengan menjual. Mari rapikan angka-angka itu.`,
    },
    {
      type: "lesson",
      title: "Margin, Harga, dan Titik Impas (BEP)",
      keyTakeaway:
        "Kenali biaya tetap vs variabel dan hitung BEP agar tahu kapan kamu benar-benar mulai untung.",
      body: `Untuk membuat keputusan skala yang sehat, kamu harus menguasai beberapa angka dasar:

**Biaya tetap vs variabel.**
- **Biaya tetap:** keluar berapa pun penjualanmu — sewa, gaji bulanan, langganan. 
- **Biaya variabel:** naik-turun mengikuti penjualan — bahan baku, kemasan, ongkos per unit.

**Margin (keuntungan per unit)** = harga jual − biaya variabel per unit. Ini uang yang tersisa dari tiap penjualan untuk menutup biaya tetap & menjadi laba.

**Titik Impas / Break-Even Point (BEP)** = berapa unit yang harus terjual agar tidak rugi (menutup semua biaya tetap).
Rumus: **BEP (unit) = Biaya Tetap ÷ Margin per unit.**

**Contoh:** Sebuah kedai punya biaya tetap Rp6.000.000/bulan (sewa+gaji). Tiap gelas dijual Rp20.000, biaya variabel (bahan+cup) Rp8.000 → margin Rp12.000.
BEP = 6.000.000 ÷ 12.000 = **500 gelas/bulan** (≈17 gelas/hari) hanya untuk balik modal. Gelas ke-501 dan seterusnya barulah laba.

Kenapa ini krusial untuk skalabilitas? Karena setiap keputusan besar (sewa tempat lebih besar, tambah karyawan) **menaikkan biaya tetap**, yang berarti menaikkan BEP. Sebelum menambah biaya tetap, tanyakan: "apakah aku yakin bisa menjual cukup untuk menutup BEP baru?" Banyak bisnis yang scaling ambruk karena menaikkan biaya tetap melampaui kemampuan penjualannya.

Sekarang, mari uji kemampuanmu mendiagnosis kesehatan sebuah bisnis.`,
    },
    {
      type: "challenge",
      title: "Challenge: Diagnosa Kesehatan & Keputusan Skala",
      body: `Saatnya menjadi penasihat bisnis. Sebuah UMKM datang kepadamu dengan data, dan ingin tahu apakah ia layak ekspansi. Gunakan semua yang kamu pelajari: BEP, arus kas, dan skalabilitas.`,
      challenge: {
        instruction:
          "Sebuah kedai jus punya data: biaya tetap Rp9.000.000/bulan; harga jual Rp15.000/cup; biaya variabel Rp6.000/cup; saat ini terjual rata-rata 1.200 cup/bulan. Pemilik ingin menyewa tempat kedua (menambah biaya tetap Rp7.000.000/bulan) dan yakin cabang baru bisa jual 600 cup/bulan di awal. Tugasmu: (1) hitung margin per cup & BEP kondisi SEKARANG, simpulkan sehat atau tidak; (2) hitung BEP BARU setelah ekspansi (total biaya tetap), dan apakah proyeksi total penjualan menutupinya; (3) beri rekomendasi: lanjut ekspansi, tunda, atau syarat apa yang harus dipenuhi dulu — sertakan pertimbangan ARUS KAS.",
        inputType: "math",
        inputPlaceholder:
          "Margin = ... ; BEP sekarang = ... cup ; status: ... ; BEP baru = ... cup ; proyeksi penjualan total = ... ; rekomendasi: ...",
        starterCode: "",
        expectedConcepts: [
          "Margin per unit = harga - biaya variabel (Rp9.000)",
          "BEP = biaya tetap / margin (sekarang 1.000 cup; baru ~1.778 cup)",
          "Membandingkan BEP dengan proyeksi penjualan (1.200 sekarang; 1.800 setelah ekspansi)",
          "Pertimbangan arus kas / risiko sebelum menambah biaya tetap",
        ],
        evaluationCriteria:
          "Periksa perhitungan: margin = 15.000 - 6.000 = Rp9.000. BEP sekarang = 9.000.000 / 9.000 = 1.000 cup → penjualan 1.200 > 1.000, jadi SEHAT (untung ~200 cup × 9.000 = Rp1.800.000/bln). BEP baru = (9.000.000 + 7.000.000) / 9.000 = 16.000.000/9.000 ≈ 1.778 cup. Proyeksi total = 1.200 + 600 = 1.800 cup > 1.778 → secara BEP nyaris impas/untung tipis (margin aman sangat tipis ~22 cup). Rekomendasi yang baik: ekspansi BERISIKO karena margin keamanan tipis & cabang baru belum terbukti; sebaiknya tunda atau syaratkan (uji permintaan lokasi baru dulu, siapkan dana modal kerja untuk arus kas, atau cari biaya tetap lebih rendah). Beri 90-100 jika perhitungan margin & kedua BEP benar DAN rekomendasi mempertimbangkan tipisnya margin keamanan + arus kas. Beri 70-85 jika perhitungan benar tapi rekomendasi dangkal. Jika BEP salah hitung, skor < 60. Toleransi pembulatan wajar.",
        hints: [
          "Margin per cup = harga jual - biaya variabel. BEP (unit) = biaya tetap ÷ margin.",
          "Setelah ekspansi, biaya tetap dijumlahkan dulu (9 jt + 7 jt) baru dibagi margin. Bandingkan dengan proyeksi penjualan TOTAL (lama + baru).",
          "Lihat 'margin keamanan': seberapa jauh proyeksi penjualan di ATAS BEP. Kalau cuma lewat tipis, satu bulan sepi bisa bikin rugi — kaitkan dengan risiko arus kas.",
        ],
        sampleAnswer:
          "Margin = 15.000 - 6.000 = Rp9.000/cup. BEP sekarang = 9.000.000 / 9.000 = 1.000 cup. Penjualan 1.200 > 1.000 → SEHAT, laba ≈ 200 × 9.000 = Rp1.800.000/bln. BEP baru = (9.000.000+7.000.000)/9.000 = 1.778 cup. Proyeksi total = 1.200 + 600 = 1.800 cup, hanya 22 cup di atas BEP → margin keamanan sangat tipis. Rekomendasi: TUNDA / bersyarat. Risiko: cabang baru belum terbukti (600 cuma asumsi), dan menambah Rp7 jt biaya tetap menaikkan BEP drastis; satu bulan sepi langsung rugi. Syarat sebelum lanjut: uji permintaan lokasi baru (pop-up/PO dulu), siapkan dana modal kerja 3-6 bulan untuk arus kas, atau cari tempat dengan biaya tetap lebih rendah agar BEP lebih aman.",
        followUpQuestion:
          "Jika pemilik tetap ingin ekspansi, satu cara apa yang bisa menurunkan risiko biaya tetapnya di awal?",
      },
    },
    {
      type: "lesson",
      title: "Pembahasan Challenge & Kesalahan Umum",
      keyTakeaway:
        "Menambah biaya tetap menaikkan BEP; ekspansi aman butuh margin keamanan & bantalan arus kas.",
      body: `Mari bedah tantangan tadi dan kesalahan yang sering terjadi.

**Perhitungan yang benar:** margin Rp9.000/cup. BEP sekarang 1.000 cup (penjualan 1.200 → sehat). BEP baru melonjak ke ~1.778 cup karena biaya tetap naik jadi Rp16 juta. Proyeksi total 1.800 cup hanya **22 cup di atas BEP** — margin keamanan tipis berbahaya.

**Kesalahan 1: Hanya melihat "cabang baru untung atau tidak".** Yang benar dilihat adalah kesehatan TOTAL bisnis setelah biaya tetap gabungan. Cabang baru menyeret seluruh angka.

**Kesalahan 2: Memperlakukan proyeksi sebagai kepastian.** "600 cup/bulan" adalah asumsi optimis pemilik untuk lokasi yang belum terbukti. Keputusan sehat memberi bobot pada risiko meleset.

**Kesalahan 3: Lupa arus kas.** Bahkan jika secara BEP untung tipis, biaya sewa + gaji cabang baru harus dibayar di muka sebelum penjualan stabil. Tanpa bantalan kas, untung tipis tetap bisa membuat bisnis tersedak.

**Kesalahan 4: Menganggap "menolak ekspansi" = gagal.** Kesabaran sering merupakan keputusan bisnis terbaik. Tumbuh terlalu cepat tanpa fondasi adalah penyebab umum kehancuran.

Soal follow-up (menurunkan risiko biaya tetap): jawaban bagus mencakup membuat biaya **lebih variabel daripada tetap** — misal sewa tempat lebih kecil/bagi tempat, sistem bagi hasil dengan karyawan, menguji lokasi via pop-up/PO sebelum sewa jangka panjang, atau model "asset-light". Ini membawa kita pada cara scaling yang aman secara umum.`,
    },
    {
      type: "lesson",
      title: "Kapan & Bagaimana Scaling dengan Aman",
      keyTakeaway:
        "Scale hanya setelah PMF terbukti, sistem siap, dan kas kuat — perbesar bertahap, bukan lompat besar.",
      body: `Menggabungkan semua modul, kita bisa merumuskan kapan sebuah bisnis **siap** menginjak gas:

**Tiga lampu hijau sebelum scaling:**
1. **PMF terbukti (Modul 1):** retensi sehat, pelanggan kembali & merekomendasikan. Jangan perbesar mesin yang belum menyala.
2. **Mesin pertumbuhan & unit economics positif (Modul 2):** LTV > CAC dengan rasio sehat. Menambah skala harus menambah untung, bukan memperbesar kerugian.
3. **Fondasi operasional & kas siap (Modul 3):** ada SOP, sebagian tugas terdelegasi, dan bantalan kas cukup untuk mendanai pertumbuhan.

**Cara scaling yang aman — bertahap, bukan melompat:**
- **Perbesar dalam langkah yang bisa dibalik.** Uji lokasi baru dengan pop-up sebelum sewa 2 tahun. Tambah satu karyawan dan stabilkan sebelum menambah lima.
- **Selesaikan satu hambatan dalam satu waktu.** Saat menskala, sesuatu akan jadi "leher botol" (produksi, layanan, atau kas). Identifikasi & perbaiki satu per satu.
- **Jaga kualitas saat tumbuh.** Pelanggan tak peduli kamu sedang sibuk berkembang; kualitas yang turun saat scaling menghancurkan reputasi yang susah payah dibangun.
- **Tumbuh dari kekuatan, bukan keputusasaan.** Scaling untuk "mengejar" masalah arus kas biasanya memperburuknya.

Skala yang sehat itu membosankan: terukur, bertahap, berbasis bukti. Tapi justru itu yang bertahan. Untuk membantumu menskala tanpa menambah beban manusia, manfaatkan otomasi.`,
    },
    {
      type: "example",
      title: "Otomasi & Tools untuk UMKM (Tanpa Ribet)",
      keyTakeaway:
        "Otomatiskan tugas berulang bernilai rendah agar kapasitas naik tanpa menambah beban kerja.",
      body: `Salah satu cara paling hemat untuk menskala adalah **otomasi**: membiarkan sistem/tools mengerjakan tugas berulang, sehingga kapasitasmu naik tanpa harus selalu menambah orang.

Kamu tak perlu sistem mahal. Banyak tools terjangkau/gratis yang berdampak besar untuk UMKM:
- **Balas chat otomatis (auto-reply & FAQ):** menjawab pertanyaan berulang ("jam buka?", "ongkir?") tanpa kamu ketik manual tiap kali.
- **Katalog & pemesanan otomatis:** link order, marketplace, atau form yang mengumpulkan pesanan rapi tanpa salah catat.
- **Pencatatan keuangan & stok:** aplikasi kasir/pembukuan sederhana yang otomatis merangkum penjualan & mengingatkan stok menipis — krusial untuk menjaga arus kas & menghindari kehabisan bahan.
- **Penjadwalan konten:** menjadwalkan posting sekaligus untuk seminggu, menjaga konsistensi (Modul 2) tanpa kerja harian.

Prinsip memilih apa yang diotomasi: **target tugas yang berulang, memakan waktu, dan rentan kesalahan manusia.** Itulah kandidat terbaik. Tugas yang butuh sentuhan personal & penilaian (menangani komplain sensitif, keputusan strategis) sebaiknya tetap manusiawi.

Hati-hati jebakan: jangan otomatiskan proses yang **masih kacau**. Otomasi memperbanyak apa yang ada — kalau prosesnya buruk, kamu hanya memperbanyak keburukan lebih cepat. Rapikan & buat SOP-nya dulu, baru otomatiskan. Selain efisiensi, scaling juga menuntut kewaspadaan terhadap risiko.`,
    },
    {
      type: "lesson",
      title: "Mengelola Risiko & Ketergantungan",
      keyTakeaway:
        "Jangan bergantung pada satu pelanggan, satu supplier, atau satu platform — sebar risikonya.",
      body: `Bisnis yang tumbuh sering diam-diam membangun **ketergantungan berbahaya** yang bisa meruntuhkannya dalam semalam. Bagian dari skalabilitas yang sehat adalah menyadari dan menyebar risiko ini.

**Tiga ketergantungan yang paling sering mematikan:**
1. **Satu pelanggan besar.** Jika 70% omzetmu dari satu klien, kamu sebenarnya "karyawan" yang sangat rapuh — kehilangan klien itu = bisnis runtuh. Aturan umum: usahakan tak ada satu pelanggan menyumbang terlalu besar (mis. >30%) dari pendapatan.
2. **Satu supplier.** Kalau hanya satu pemasok bahan kunci, kenaikan harga mendadak atau ia tutup bisa melumpuhkanmu. Punyai alternatif/cadangan.
3. **Satu platform.** Bisnis yang 100% bergantung pada satu marketplace/media sosial berisiko: perubahan algoritma, kenaikan biaya, atau pemblokiran akun bisa menghapus akses ke pelanggan dalam sehari. Inilah kenapa membangun **aset yang kamu miliki sendiri** (database pelanggan, nomor WA, email) sangat penting.

**Risiko lain yang perlu dijaga:** ketergantungan pada dirimu sendiri (kalau kamu sakit, bisnis berhenti?) — kembali ke pentingnya SOP & delegasi.

Mindset-nya bukan paranoid, tapi **antifragile**: bangun bisnis yang tidak hancur hanya karena satu titik gagal. Tanyakan rutin: "Apa satu hal yang, jika hilang besok, akan menghancurkan bisnisku?" — lalu kurangi ketergantungan itu. Sebagai penutup pembelajaran, mari lihat apa yang terjadi saat semua peringatan ini diabaikan.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Scaling Terlalu Cepat",
      keyTakeaway:
        "Ekspansi agresif tanpa fondasi (sistem, kas, kualitas) sering mempercepat kehancuran, bukan kesuksesan.",
      body: `Mari pelajari pola kehancuran yang berulang pada banyak bisnis yang sempat naik daun — kita rangkai sebagai pelajaran.

**Situasi.** Sebuah brand makanan kekinian viral. Satu gerai selalu antre, media sosial ramai. Tergoda momentum, pemilik membuka 15 cabang dalam setahun, mengambil pinjaman besar untuk sewa lokasi premium dan stok.

**Apa yang retak:**
1. **Sistem belum siap.** Resep & standar masih bergantung pada pemilik. Cabang-cabang baru kualitasnya tidak konsisten — ada yang enak, ada yang mengecewakan. Reputasi mulai terkikis.
2. **Arus kas tertekan.** 15 sewa premium + gaji ratusan karyawan = biaya tetap raksasa (BEP melonjak). Saat tren mulai mereda dan antrean menyusut, banyak cabang tak menutup BEP.
3. **Ketergantungan pada tren.** Bisnis dibangun di atas momentum viral, bukan retensi sejati. Ketika "kekinian" pindah ke hal lain, pelanggan tak kembali.

**Akhir.** Cabang-cabang tutup satu per satu, beban utang menggunung, dan brand yang sempat dipuja kolaps — bukan karena produknya buruk, tapi karena **menskala lebih cepat daripada fondasinya**.

**Pelajaran counterintuitive:** momentum & viralitas adalah godaan paling berbahaya bagi pengusaha. Pertumbuhan terbaik justru sering yang **sengaja diperlambat** sampai sistem, kas, dan kualitas siap menopangnya. "Tumbuh secepat yang bisa kamu pertahankan", bukan "secepat yang kamu bisa". Mari kita kunci semua pelajaran ini.`,
    },
    {
      type: "summary",
      title: "Kristalisasi: Skalabilitas yang Sehat",
      keyTakeaway:
        "Skala aman = sistem (SOP+delegasi) + keuangan sehat (kas & BEP) + risiko tersebar, dilakukan bertahap di atas PMF.",
      body: `Mari padatkan modul terakhir ini sekaligus menutup seluruh kursus.

**Tiga insight terpenting:**
1. **Skalabilitas lahir dari sistem, bukan kerja lebih keras.** SOP mengeluarkan "bisnis dari kepalamu", delegasi membebaskan waktumu, otomasi menaikkan kapasitas. Tanpa ini, pertumbuhan hanya membuatmu makin terjebak.
2. **Kas adalah raja.** Bisnis mati karena kehabisan uang tunai, bukan karena tak untung. Pahami beda laba vs kas, hitung BEP sebelum menambah biaya tetap, dan jaga bantalan kas.
3. **Tumbuh secepat yang bisa kamu pertahankan.** Scale hanya setelah PMF terbukti, unit economics positif, dan fondasi siap. Perbesar bertahap dalam langkah yang bisa dibalik, dan sebar ketergantungan agar tak runtuh oleh satu titik gagal.

**Yang sering disalahpahami:** scaling dikira soal "secepat & sebesar mungkin". Padahal kasus demi kasus menunjukkan bahwa menskala lebih cepat daripada fondasi adalah penyebab umum kehancuran — bahkan untuk produk yang dicintai.

**Benang merah seluruh kursus:** bangun produk yang benar-benar dibutuhkan (PMF) → buat mesin yang mendatangkan & mempertahankan pelanggan secara untung (akuisisi & retensi) → topang dengan sistem & keuangan yang sehat (skalabilitas). Tiga lapis inilah yang membedakan bisnis yang sekadar "ramai sesaat" dari yang "bertumbuh dan bertahan".

**Aksi langsung:** pilih satu hambatan terbesar bisnismu saat ini — apakah di PMF, pertumbuhan, atau fondasi? Mulai perbaiki dari situ. Selamat, kamu telah menyelesaikan kerangka berpikir pertumbuhan bisnis yang utuh! Buktikan penguasaanmu di kuis terakhir.`,
    },
    quiz(),
  ],
};

async function main() {
  await createCourse({
    title: "Strategi Pertumbuhan & Skalabilitas Bisnis",
    slug: "strategi-pertumbuhan-skalabilitas-bisnis",
    description:
      "Setelah punya produk, bagaimana menumbuhkannya secara sehat dan tahan banting? Pelajari menemukan Product-Market Fit, membangun mesin akuisisi & retensi pelanggan, hingga skalabilitas operasional dan keuangan — lengkap dengan tantangan interaktif.",
    categorySlug: "bisnis-kewirausahaan",
    difficulty: "INTERMEDIATE",
    isPremium: true,
    modules: [MOD1, MOD2, MOD3],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
