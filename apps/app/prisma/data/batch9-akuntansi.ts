export const akuntansiCourses = [
  {
    title: "Akuntansi Dasar — Debit, kredit, dan jurnal",
    slug: "akuntansi-dasar-debit-kredit-jurnal",
    description: "Kuasai bahasa bisnis dari nol. Pahami persamaan dasar, debit-kredit, dan cara membuat jurnal umum dengan studi kasus nyata.",
    categorySlug: "keuangan-akuntansi",
    difficulty: "BEGINNER",
    isPremium: false,
    language: "id",
    estimatedHours: 4,
    thumbnail: null,
    modules: [
      {
        title: "Pengantar Akuntansi & Persamaan Dasar",
        slug: "pengantar-akuntansi-persamaan-dasar",
        order: 1,
        estimatedMinutes: 45,
        xpReward: 50,
        sources: [
          { type: "DOCUMENTATION", title: "Prinsip Dasar Akuntansi", url: "https://id.wikipedia.org/wiki/Akuntansi" }
        ],
        contentObject: {
          slides: [
            {
              slideNumber: 1,
              type: "lesson",
              title: "Akuntansi: Bahasa Bisnis Dunia",
              content: "Pernahkah kamu bertanya-tanya bagaimana seorang investor tahu apakah sebuah perusahaan untung atau rugi hanya dengan melihat selembar kertas? Jawabannya ada pada **Akuntansi**.\n\nAkuntansi sering disebut sebagai *\"The Language of Business\"* (Bahasa Bisnis). Sama seperti bahasa Indonesia yang kita gunakan untuk berkomunikasi sehari-hari, akuntansi adalah cara perusahaan menceritakan kondisi keuangan mereka kepada pemilik, bank, atau investor.\n\nDi modul ini, kita tidak akan langsung dihadapkan pada angka-angka ribet. Kita akan membangun pondasi berpikir layaknya seorang akuntan. Jika pondasinya kuat, materi serumit apapun ke depannya akan terasa seperti permainan *puzzle* yang seru!",
              keyTakeaway: "Akuntansi adalah sistem informasi (bahasa) yang digunakan untuk mencatat, mengklasifikasikan, dan merangkum transaksi bisnis agar bisa dipahami oleh pengambil keputusan."
            },
            {
              slideNumber: 2,
              type: "lesson",
              title: "Tiga Pilar Utama: Harta, Utang, Modal",
              content: "Dalam dunia akuntansi, segala sesuatu yang dimiliki oleh sebuah bisnis bisa dikategorikan ke dalam tiga ember utama:\n\n1. **HARTA (Aset)**\nSemua kekayaan yang dimiliki bisnis. Bisa berupa wujud nyata (uang tunai, mesin kopi, ruko, laptop) maupun tidak berwujud (hak paten).\n2. **UTANG (Kewajiban / Liabilitas)**\nKewajiban finansial bisnis kepada pihak luar. Misalnya meminjam uang dari bank, atau membeli biji kopi tapi janjinya bayar bulan depan (utang usaha).\n3. **MODAL (Ekuitas)**\nHak murni pemilik atas harta bisnis setelah dikurangi semua utang. Ini adalah \"uang dingin\" dari kantong pemilik yang disetorkan ke bisnis.\n\n**Analogi:** Jika kamu punya rumah seharga Rp 500 juta (Harta), tapi KPR di bank masih sisa Rp 300 juta (Utang), maka nilai murni kepemilikanmu (Modal) atas rumah itu sebenarnya hanyalah Rp 200 juta.",
              keyTakeaway: "Harta adalah apa yang bisnis MILIKI. Utang adalah apa yang bisnis PINJAM dari pihak luar. Modal adalah apa yang BENAR-BENAR MILIK pendiri bisnis."
            },
            {
              slideNumber: 3,
              type: "example",
              title: "Persamaan Dasar Akuntansi",
              content: "Dari tiga pilar di slide sebelumnya, lahirlah rumus legendaris yang menjadi jantung dari seluruh ilmu akuntansi di seluruh penjuru bumi:\n\n### **HARTA = UTANG + MODAL**\n\nRumus ini tidak boleh dilanggar. Sisi kiri (Harta) harus **SELALU SAMA** nilainya dengan sisi kanan (Utang + Modal). Mengapa?\n\nKarena setiap harta yang dimiliki oleh bisnis (sisi Kiri), *pasti* berasal dari suatu sumber pendanaan (sisi Kanan). Sumber pendanaannya hanya ada dua kemungkinan: uang pinjaman orang lain (Utang) atau uang milik sendiri (Modal).\n\nJika total Harta bisnis adalah Rp 100 Juta, dan total Modal sendiri adalah Rp 70 Juta, maka pasti bisnis tersebut memiliki Utang sebesar Rp 30 Juta. Sesederhana itu!",
              keyTakeaway: "Harta = Utang + Modal. Rumus ini adalah hukum gravitasi dalam akuntansi, tidak pernah meleset dan selalu wajib seimbang (balance)."
            },
            {
              slideNumber: 4,
              type: "lesson",
              title: "Analogi Timbangan Emas",
              content: "Bayangkan sebuah timbangan emas zaman dahulu yang memiliki dua piringan di sisi kiri dan kanan.\n\n- **Piringan Kiri:** Tempat kamu menaruh **Harta** (uang tunai, barang dagangan, peralatan).\n- **Piringan Kanan:** Tempat kamu menaruh asal mula Harta tersebut, yaitu **Utang** dan **Modal**.\n\nSetiap kali terjadi transaksi, timbangan ini akan bergerak. \nJika kamu melempar batu (harta) seberat 5 kg ke piringan kiri, maka timbangan akan miring. Agar kembali lurus sejajar (*balance*), kamu harus menaruh batu seberat 5 kg juga di piringan kanan (apakah itu dicatat sebagai tambahan utang, atau tambahan modal).\n\nAtau alternatifnya, kamu mengambil batu lama 5 kg dari piringan kiri (kas berkurang), lalu menaruh batu baru 5 kg di piringan kiri (dapat mesin baru). Timbangannya tetap lurus!",
              keyTakeaway: "Setiap transaksi bisnis yang sah akan berdampak pada setidaknya dua hal yang berbeda agar timbangan Harta = Utang + Modal tetap dalam posisi lurus (seimbang)."
            },
            {
              slideNumber: 5,
              type: "casestudy",
              title: "Contoh Nyata 1: Setoran Awal Buka Kedai Kopi",
              content: "Mari kita lihat bagaimana timbangan ini bekerja di dunia nyata. \nKamu, si Budi, memutuskan untuk membuka kedai \"Kopi Senja\". Kamu mengambil uang tabungan pribadimu sebesar **Rp 50.000.000** dan menyetorkannya ke rekening khusus atas nama bisnis Kopi Senja.\n\nBagaimana persamaan dasarnya?\n* Bisnis \"Kopi Senja\" sekarang memiliki uang tunai (**Harta/Kas**) bertambah Rp 50.000.000.\n* Uang ini berasal dari setoran si Budi (**Modal**) bertambah Rp 50.000.000.\n\n```\n  HARTA (Kas)   =  UTANG   +  MODAL\n+ 50.000.000    =  0       +  50.000.000\n```\n\nTotal Sisi Kiri = Rp 50.000.000\nTotal Sisi Kanan = Rp 50.000.000\n**SEIMBANG!**",
              keyTakeaway: "Uang pemilik yang disetorkan untuk memulai bisnis akan mencatat penambahan Harta (berupa uang Kas) sekaligus penambahan Modal pemilik."
            },
            {
              slideNumber: 6,
              type: "casestudy",
              title: "Contoh Nyata 2: Membeli Mesin Kopi dengan Utang",
              content: "Kedai Kopi Senja butuh mesin espresso, tapi uang tunai sayang untuk dihabiskan semua. Kamu memutuskan membeli mesin espresso seharga **Rp 30.000.000** ke toko mesin. Kamu bayar Rp 0 rupiah dulu, dan berjanji akan mencicil bulan depan.\n\nBagaimana persamaan dasarnya?\n* Bisnis mendapat barang wujud baru berupa Mesin (**Harta/Peralatan**) bertambah Rp 30.000.000.\n* Karena belum dibayar pakai Kas, maka muncul tagihan dari supplier (**Utang**) bertambah Rp 30.000.000.\n\n```\n  HARTA (Kas 50jt + Peralatan 30jt) = UTANG (30jt) + MODAL (50jt)\n                80.000.000          =       80.000.000\n```\n\nKiri dan Kanan sama-sama bernilai Rp 80 Juta. **SEIMBANG!**",
              keyTakeaway: "Membeli barang secara kredit (ngutang) akan menambah nilai Harta perusahaan, tapi di saat bersamaan beban Utang perusahaan di sisi kanan juga bertambah."
            },
            {
              slideNumber: 7,
              type: "casestudy",
              title: "Contoh Nyata 3: Membeli Biji Kopi Secara Tunai",
              content: "Toko sudah siap, sekarang butuh biji kopi untuk diseduh. Kamu membeli 10 kg biji kopi seharga **Rp 2.000.000** dan kali ini kamu bayar **TUNAI** dari kas bisnis Kopi Senja.\n\nBagaimana persamaan dasarnya?\n* Bisnis mendapat barang baru berupa Biji Kopi (**Harta/Perlengkapan**) bertambah Rp 2.000.000.\n* Karena dibayar tunai, maka uang tunai bisnis (**Harta/Kas**) BERKURANG Rp 2.000.000.\n\nPerhatikan, transaksi ini HANYA berdampak pada sisi HARTA (kiri).\nKas (-2.000.000) dan Perlengkapan (+2.000.000).\n\n```\nHARTA (Kas 48jt + Perlengkapan 2jt + Peralatan 30jt) = UTANG(30jt) + MODAL(50jt)\n                               80.000.000            =      80.000.000\n```\nTimbangan tetap sejajar di angka 80 Juta!",
              keyTakeaway: "Tidak semua transaksi mengubah kiri dan kanan. Membeli barang secara tunai hanya memutar posisi Harta: Kas (berkurang) berubah wujud menjadi Barang/Perlengkapan (bertambah)."
            },
            {
              slideNumber: 8,
              type: "lesson",
              title: "Pendapatan dan Beban (Rahasia Ekspansi Modal)",
              content: "Dalam perjalanannya, bisnis beroperasi untuk mencari untung. Di mana posisi \"Penjualan\" (Pendapatan) dan \"Bayar Listrik\" (Beban) di rumus HARTA = UTANG + MODAL?\n\nJawabannya: Mereka bersembunyi di dalam **MODAL**.\n\n1. **PENDAPATAN** (Misal: Jual kopi laku 50 ribu tunai).\nUang tunai (Harta/Kas) bertambah 50 ribu. Karena bisnis untung, kekayaan pemilik ikut naik! Jadi, **Modal bertambah 50 ribu**.\n\n2. **BEBAN** (Misal: Bayar listrik 20 ribu tunai).\nUang tunai (Harta/Kas) berkurang 20 ribu. Karena uang bisnis hangus untuk operasional, kekayaan pemilik tergerus. Jadi, **Modal berkurang 20 ribu**.\n\n*Laba (Pendapatan dikurangi Beban) pada akhirnya akan selalu bermuara sebagai penambah Modal bisnis.*",
              keyTakeaway: "Setiap sen pendapatan akan menambah Modal perusahaan. Sebaliknya, setiap sen pengeluaran beban (listrik, air, gaji) akan mengurangi Modal perusahaan."
            },
            {
              slideNumber: 9,
              type: "lesson",
              title: "Rangkuman Modul 1",
              content: "Selamat! Kamu telah menguasai fondasi berpikir paling absolut dalam dunia akuntansi.\n\n1. **Akuntansi** adalah bahasa untuk mengkomunikasikan pergerakan nilai bisnis.\n2. Bisnis memiliki entitas sendiri, terpisah dari kantong pribadi pemiliknya.\n3. Rumus absolut alam semesta bisnis: **HARTA = UTANG + MODAL**.\n4. Harta = Kas, Perlengkapan, Mesin, Gedung, Tanah.\n5. Utang = Pinjaman Bank, Hutang ke Supplier.\n6. Modal = Setoran awal pemilik + (Pendapatan bisnis - Beban bisnis).\n7. Setiap rupiah yang bergerak dari/ke bisnis pasti akan memberikan minimal **dua dampak** agar timbangan persamaan dasar selalu seimbang sempurna (*Balance*).",
              keyTakeaway: "Dengan memahami Persamaan Dasar Akuntansi, kamu sudah bisa membaca logika di balik berdirinya perusahaan skala kecil hingga konglomerasi besar."
            },
            {
              slideNumber: 10,
              type: "quiz",
              title: "Ujian Validasi Modul 1",
              content: "Waktunya menguji logikamu! Ingat rumus Harta = Utang + Modal. Jangan terburu-buru, bayangkan timbangan emasnya.",
              quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
            }
          ],
          quizBank: [
            {
              id: "q1_1",
              question: "Persamaan dasar akuntansi yang paling tepat dan absolut adalah...",
              options: [
                { id: "a", text: "Harta = Modal - Utang" },
                { id: "b", text: "Utang = Harta + Modal" },
                { id: "c", text: "Harta = Utang + Modal" },
                { id: "d", text: "Modal = Harta + Pendapatan" }
              ],
              correctAnswer: "c",
              explanation: "Harta = Utang + Modal. Sisi kiri (kekayaan) harus didanai dari pihak luar (Utang) atau dari dana internal (Modal).",
              difficulty: "easy"
            },
            {
              id: "q1_2",
              question: "Sebuah perusahaan memiliki Kas Rp 10 juta, Mesin Rp 20 juta, dan meminjam dari Bank Rp 15 juta. Berapakah Modal yang dimiliki pemilik?",
              options: [
                { id: "a", text: "Rp 15 Juta" },
                { id: "b", text: "Rp 45 Juta" },
                { id: "c", text: "Rp 30 Juta" },
                { id: "d", text: "Rp 5 Juta" }
              ],
              correctAnswer: "a",
              explanation: "Total Harta (Kas + Mesin) = 30 juta. Utang = 15 juta. Karena Harta = Utang + Modal, maka 30 = 15 + Modal. Modal = 30 - 15 = 15 Juta.",
              difficulty: "medium"
            },
            {
              id: "q1_3",
              question: "Jika pemilik mengambil uang tunai dari kas bisnis untuk keperluan pribadinya (jalan-jalan keluarga), dampak pada persamaan dasar akuntansi adalah...",
              options: [
                { id: "a", text: "Harta (Kas) berkurang, Utang bertambah" },
                { id: "b", text: "Harta (Kas) berkurang, Modal berkurang" },
                { id: "c", text: "Harta (Kas) berkurang, Pendapatan berkurang" },
                { id: "d", text: "Utang berkurang, Modal bertambah" }
              ],
              correctAnswer: "b",
              explanation: "Pengambilan pribadi (Prive) akan menguras kekayaan perusahaan (Kas berkurang), yang secara otomatis memotong hak pemilik di perusahaan tersebut (Modal berkurang).",
              difficulty: "medium"
            },
            {
              id: "q1_4",
              question: "Membeli laptop untuk operasional kantor seharga Rp 10 Juta dan dibayar secara tunai. Bagaimana efeknya terhadap total nilai Harta perusahaan?",
              options: [
                { id: "a", text: "Total Harta bertambah Rp 10 Juta" },
                { id: "b", text: "Total Harta berkurang Rp 10 Juta" },
                { id: "c", text: "Total Harta tidak berubah" },
                { id: "d", text: "Modal bertambah Rp 10 Juta" }
              ],
              correctAnswer: "c",
              explanation: "Harta berupa 'Peralatan' bertambah 10 Juta, tapi Harta berupa 'Kas' berkurang 10 Juta. +10 dan -10 = 0. Jadi Total Harta secara nominal tidak berubah, hanya berganti wujud.",
              difficulty: "hard"
            },
            {
              id: "q1_5",
              question: "Transaksi manakah di bawah ini yang akan mengakibatkan Harta bertambah dan Utang bertambah?",
              options: [
                { id: "a", text: "Membayar hutang ke bank" },
                { id: "b", text: "Menerima setoran modal dari investor" },
                { id: "c", text: "Membeli kendaraan secara kredit (cicilan)" },
                { id: "d", text: "Membayar tagihan listrik bulanan" }
              ],
              correctAnswer: "c",
              explanation: "Membeli kendaraan akan menambah Harta (Kendaraan). Karena dicicil/kredit, maka Utang perusahaan juga bertambah. Timbangan kiri dan kanan naik bersamaan.",
              difficulty: "medium"
            },
            {
              id: "q1_6",
              question: "Sesuatu yang dimiliki perusahaan dan berwujud secara fisik maupun non-fisik yang bernilai ekonomis disebut...",
              options: [
                { id: "a", text: "Ekuitas" },
                { id: "b", text: "Liabilitas" },
                { id: "c", text: "Pendapatan" },
                { id: "d", text: "Harta (Aset)" }
              ],
              correctAnswer: "d",
              explanation: "Harta atau Aset adalah istilah akuntansi untuk sumber daya ekonomis (bernilai uang) yang dikuasai perusahaan.",
              difficulty: "easy"
            },
            {
              id: "q1_7",
              question: "Perusahaan berhasil menjual jasa pijat dan menerima uang tunai Rp 500 ribu. Bagaimana analisis persamaannya?",
              options: [
                { id: "a", text: "Kas bertambah, Utang bertambah" },
                { id: "b", text: "Kas bertambah, Modal bertambah (dari Pendapatan)" },
                { id: "c", text: "Kas bertambah, Beban berkurang" },
                { id: "d", text: "Piutang bertambah, Kas berkurang" }
              ],
              correctAnswer: "b",
              explanation: "Menerima uang tunai berarti Harta (Kas) bertambah. Ini bersumber dari penjualan (Pendapatan), dan setiap pendapatan akan menambah Modal perusahaan.",
              difficulty: "easy"
            }
          ]
        }
      },
      {
        title: "Sistem Debit-Kredit & Jurnal Umum",
        slug: "sistem-debit-kredit-jurnal-umum",
        order: 2,
        estimatedMinutes: 50,
        xpReward: 50,
        sources: [
          { type: "DOCUMENTATION", title: "Aturan Debit dan Kredit", url: "https://id.wikipedia.org/wiki/Debit_dan_kredit" }
        ],
        contentObject: {
          slides: [
            {
              slideNumber: 1,
              type: "lesson",
              title: "Misteri Debit & Kredit",
              content: "Jika kamu pernah punya tabungan di Bank, kamu pasti familier dengan SMS: *\"Dana masuk ke rekening Anda sebesar Rp 1 Jt (KREDIT)\"*. Hal ini membuat banyak orang awam berpikir: KREDIT = UANG MASUK.\n\nNamun, saat mereka belajar akuntansi, **Kas masuk malah dicatat di DEBIT!** Mengapa terbalik?\n\n**Kebenaran mengejutkan:**\nDari sudut pandang Bank, uang tabunganmu adalah **UTANG** bagi mereka (karena mereka harus mengembalikan uang itu kepadamu nanti). Saat uangmu masuk, utang Bank kepadamu bertambah. Aturan akuntansi menyatakan utang bertambah dicatat di Kredit. Itulah kenapa SMS bank menulisnya KREDIT!\n\nMulai detik ini, **BUANG jauh-jauh anggapan bahwa Debit itu Uang Masuk dan Kredit itu Uang Keluar.** Itu mitos besar!",
              keyTakeaway: "Dalam akuntansi, Debit dan Kredit hanyalah petunjuk 'Kiri' dan 'Kanan'. Tidak selamanya Debit itu bermakna positif, dan Kredit bermakna negatif."
            },
            {
              slideNumber: 2,
              type: "lesson",
              title: "Rumus Baku Kiri dan Kanan",
              content: "Secara harfiah dalam bahasa latin kuno (Debere & Credere):\n- **DEBIT** artinya: \"Sisi KIRI\"\n- **KREDIT** artinya: \"Sisi KANAN\"\n\nMari kita ingat kembali persamaan dasar kita:\n**HARTA (Kiri) = UTANG + MODAL (Kanan)**\n\nKarena Harta letaknya di sisi Kiri persamaan, maka sifat normal Harta adalah memihak Kiri (Debit). \n- Jika **Harta bertambah**, catat di **DEBIT**.\n- Jika **Harta berkurang**, catat di kebalikannya (**KREDIT**).\n\nKarena Utang dan Modal letaknya di sisi Kanan persamaan, maka sifat normal mereka adalah memihak Kanan (Kredit).\n- Jika **Utang/Modal bertambah**, catat di **KREDIT**.\n- Jika **Utang/Modal berkurang**, catat di kebalikannya (**DEBIT**).",
              keyTakeaway: "Harta bertambah di Debit. Utang & Modal bertambah di Kredit. Jika berkurang, tinggal taruh di posisi lawannya."
            },
            {
              slideNumber: 3,
              type: "lesson",
              title: "Bagaimana dengan Pendapatan dan Beban?",
              content: "Di Modul 1 kita sepakat bahwa Pendapatan dan Beban itu numpang hidup di dalam MODAL.\n\n1. **Pendapatan** menambah Modal.\nKarena sifat normal Modal adalah Kanan (Kredit), maka setiap **Pendapatan Bertambah** harus dicatat di **KREDIT**.\n*(Sangat jarang pendapatan berkurang, kalaupun berkurang catat di Debit).*\n\n2. **Beban** mengurangi Modal.\nKarena Beban bersifat melawan Modal (menguranginya), sifat normal Beban adalah musuh dari Modal, yaitu Kiri (Debit). \nMaka setiap **Beban Bertambah** (bayar listrik, bayar air) selalu dicatat di **DEBIT**.",
              keyTakeaway: "Ingat siklus saldo normal (bertambah di mana): Harta (Debit), Beban (Debit), Utang (Kredit), Modal (Kredit), Pendapatan (Kredit). Jembatan keledai: Ha-Be (Debit), U-Mo-Pe (Kredit)."
            },
            {
              slideNumber: 4,
              type: "casestudy",
              title: "Menulis Jurnal Umum",
              content: "Buku Jurnal adalah kitab sejarah harian perusahaan. Setiap pergerakan uang dicatat di sini menggunakan sistem \"Double-Entry\" (ada yang di-Debit dan ada yang di-Kredit).\n\n**Syarat menulis jurnal:**\n1. Tulisan Debit di baris pertama, posisinya rata kiri.\n2. Tulisan Kredit di baris kedua, posisinya menjorok ke kanan sedikit (di-indent/tab).\n3. Total angka Debit WAJIB sama dengan total angka Kredit.\n\nMari kita berlatih!\n**Transaksi:** Tanggal 1 Mei, pemilik menyetor uang tunai Rp 10 Juta sebagai modal usaha.\n**Analisa:** Kas (Harta) bertambah di Debit. Modal bertambah di Kredit.\n\n**Penulisan Jurnal Umum:**\n```text\n(Tgl 1 Mei)\nKas                    Rp 10.000.000\n      Modal Pemilik                  Rp 10.000.000\n```\n*(Perhatikan bagaimana tulisan 'Modal' dan angkanya digeser ke kanan sebagai penanda Kredit).*",
              keyTakeaway: "Jurnal Umum mewajibkan setiap baris transaksi memiliki sisi Debit di atas/kiri dan sisi Kredit di bawah/bergeser ke kanan, dengan jumlah angka yang seimbang."
            },
            {
              slideNumber: 5,
              type: "casestudy",
              title: "Kasus: Beli Barang Ngutang",
              content: "**Transaksi:** \nTanggal 5 Mei, perusahaan membeli Mesin Sablon seharga Rp 15 Juta. Namun, perusahaan baru bayar DP tunai Rp 5 Juta, dan sisa Rp 10 Juta akan dicicil bulan depan.\n\n**Analisa Logika:**\n1. Perusahaan dapat Mesin (Harta/Peralatan) bertambah Rp 15 Juta -> **Debit**.\n2. Uang Tunai di laci (Harta/Kas) berkurang Rp 5 Juta -> **Kredit**.\n3. Punya tagihan ke supplier (Utang) bertambah Rp 10 Juta -> **Kredit**.\n\n**Penulisan Jurnal Umum:**\n```text\n(Tgl 5 Mei)\nPeralatan Mesin        Rp 15.000.000\n      Kas                            Rp  5.000.000\n      Utang Usaha                    Rp 10.000.000\n```\nCoba totalkan. Total Debit (15 jt). Total Kredit (5 jt + 10 jt = 15 jt). **BALANCE!**",
              keyTakeaway: "Satu transaksi jurnal bisa melibatkan 3 baris akun atau lebih (disebut Jurnal Majemuk), asalkan hasil akhir total nilai Debit dan Kreditnya sama."
            },
            {
              slideNumber: 6,
              type: "casestudy",
              title: "Kasus: Mendapat Uang dari Penjualan",
              content: "**Transaksi:**\nTanggal 10 Mei, jasa sablon baju berhasil diselesaikan dan klien membayar lunas secara tunai sebesar Rp 2 Juta.\n\n**Analisa Logika:**\n1. Uang masuk laci (Harta/Kas) bertambah Rp 2 Juta -> **Debit**.\n2. Hasil keringat sendiri (Pendapatan Jasa) bertambah Rp 2 Juta. (Ingat rumus U-Mo-Pe bertambah di Kanan) -> **Kredit**.\n\n**Penulisan Jurnal Umum:**\n```text\n(Tgl 10 Mei)\nKas                    Rp 2.000.000\n      Pendapatan Jasa                Rp 2.000.000\n```\nSangat simpel! Uang di tangan kita naik (Debit), dan omzet usaha (Kredit) ikut terekam kebesaran nilainya.",
              keyTakeaway: "Saat kita menerima uang hasil jualan secara tunai, debit selalu 'Kas' dan kredit selalu 'Pendapatan'."
            },
            {
              slideNumber: 7,
              type: "casestudy",
              title: "Kasus: Membayar Biaya Listrik",
              content: "**Transaksi:**\nTanggal 25 Mei, datang tagihan PLN. Perusahaan harus membayar biaya listrik bulan ini sebesar Rp 500 Ribu, dibayar secara tunai.\n\n**Analisa Logika:**\n1. Tagihan operasional (Beban Listrik) bertambah Rp 500 Ribu. (Ingat rumus Ha-Be bertambah di Kiri) -> **Debit**.\n2. Uang keluar dari laci (Harta/Kas) berkurang Rp 500 Ribu. (Harta berkurang pindah ke Kanan) -> **Kredit**.\n\n**Penulisan Jurnal Umum:**\n```text\n(Tgl 25 Mei)\nBeban Listrik          Rp 500.000\n      Kas                            Rp 500.000\n```\nSeluruh biaya operasional rutin (gaji karyawan, air, telepon, sewa ruko) akan selalu dicatat di posisi Debit!",
              keyTakeaway: "Timbulnya Beban (Pengeluaran Rutin) selalu di-Debit, dan karena membayarnya pakai uang tunai, maka Kas selalu di-Kredit."
            },
            {
              slideNumber: 8,
              type: "casestudy",
              title: "Kasus: Menerima Tagihan tapi Belum Dibayar",
              content: "Bagaimana jika tagihan listrik datang, tapi bos bilang \"Nanti aja bayarnya bulan depan\"?\n\n**Transaksi:**\nTanggal 28 Mei, tagihan air PDAM Rp 300 Ribu diterima, namun belum dibayar hingga bulan depan.\n\n**Analisa Logika:**\n1. Tagihan air (Beban Air) sudah sah terjadi dan menjadi tanggungan bulan ini -> **Debit**.\n2. Karena belum dibayar, uang Kas KITA TIDAK BERKURANG. Sebagai gantinya, timbul kewajiban (Utang Biaya) yang bertambah -> **Kredit**.\n\n**Penulisan Jurnal Umum:**\n```text\n(Tgl 28 Mei)\nBeban Air              Rp 300.000\n      Utang Biaya                    Rp 300.000\n```\nAkuntansi mewajibkan kita mencatat biaya saat ia *terjadi/ditagihkan*, bukan menunggu sampai dompet kita keluar uang. Ini disebut sistem *Accrual Basis*.",
              keyTakeaway: "Jika ada biaya operasional namun menunggak bayar, debitkan Bebannya, dan kreditkan akun Utang Biaya/Beban YMH (Yang Masih Harus Dibayar)."
            },
            {
              slideNumber: 9,
              type: "lesson",
              title: "Rangkuman Modul 2",
              content: "Fondasi penjurnalanmu kini sudah matang! Mari kita ingat kembali mantra sakti akuntansi:\n\n- **Ha-Be** (Harta dan Beban): Saldo normalnya **DEBIT**. (Jika nambah taruh Debit, jika kurang taruh Kredit).\n- **U-Mo-Pe** (Utang, Modal, Pendapatan): Saldo normalnya **KREDIT**. (Jika nambah taruh Kredit, jika kurang taruh Debit).\n- Jurnal Umum mewajibkan penulisan akun Debit berada di baris pertama dan merapat ke margin kiri.\n- Akun Kredit berada di baris di bawahnya, dan hurufnya wajib digeser (indent/tab) ke arah kanan.\n- Syarat mutlak: Total rupiah nilai Debit dan Kredit dalam satu transaksi harus sama (*Balance*).",
              keyTakeaway: "Dengan berpegang teguh pada pola saldo normal 'Ha-Be' dan 'U-Mo-Pe', kamu tidak akan pernah salah dalam menentukan mana yang harus di-Debit dan mana yang harus di-Kredit."
            },
            {
              slideNumber: 10,
              type: "quiz",
              title: "Ujian Validasi Modul 2",
              content: "Pusatkan konsentrasimu! Gunakan mantra Ha-Be dan U-Mo-Pe di pikiranmu untuk memecahkan soal jurnal umum berikut ini.",
              quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
            }
          ],
          quizBank: [
            {
              id: "q2_1",
              question: "Manakah kelompok akun yang memiliki saldo normal (akan bertambah jika dicatat) di posisi Debit?",
              options: [
                { id: "a", text: "Harta dan Modal" },
                { id: "b", text: "Utang dan Pendapatan" },
                { id: "c", text: "Harta dan Beban" },
                { id: "d", text: "Modal dan Beban" }
              ],
              correctAnswer: "c",
              explanation: "Harta dan Beban (Ha-Be) memiliki saldo normal Debit. Sedangkan Utang, Modal, dan Pendapatan bersaldo normal Kredit.",
              difficulty: "easy"
            },
            {
              id: "q2_2",
              question: "Didi menyetorkan uang tunai sebesar Rp 20 Juta sebagai modal awal perusahaannya. Jurnal yang benar adalah...",
              options: [
                { id: "a", text: "Debit: Kas, Kredit: Modal" },
                { id: "b", text: "Debit: Modal, Kredit: Kas" },
                { id: "c", text: "Debit: Kas, Kredit: Pendapatan" },
                { id: "d", text: "Debit: Utang, Kredit: Kas" }
              ],
              correctAnswer: "a",
              explanation: "Uang tunai (Kas) bertambah, maka di-Debit. Sumbernya dari setoran Didi (Modal), modal bertambah di-Kredit.",
              difficulty: "medium"
            },
            {
              id: "q2_3",
              question: "Perusahaan telah menyelesaikan jasa potong rambut klien, namun klien berjanji akan membayar minggu depan sebesar Rp 1 Juta. Jurnalnya adalah...",
              options: [
                { id: "a", text: "Kas (D) Rp 1 Jt, Pendapatan (K) Rp 1 Jt" },
                { id: "b", text: "Piutang Usaha (D) Rp 1 Jt, Pendapatan (K) Rp 1 Jt" },
                { id: "c", text: "Piutang Usaha (D) Rp 1 Jt, Kas (K) Rp 1 Jt" },
                { id: "d", text: "Pendapatan (D) Rp 1 Jt, Utang (K) Rp 1 Jt" }
              ],
              correctAnswer: "b",
              explanation: "Karena klien belum bayar, kita punya hak tagih (Piutang Usaha). Piutang adalah Harta, maka bertambah di Debit. Omzet kita tetap diakui sebagai Pendapatan di Kredit.",
              difficulty: "hard"
            },
            {
              id: "q2_4",
              question: "Sebuah akun tertulis menjorok (indent) ke arah kanan pada pencatatan Jurnal Umum. Apa makna posisi ini?",
              options: [
                { id: "a", text: "Menandakan akun tersebut diletakkan di sisi Debit" },
                { id: "b", text: "Menandakan akun tersebut dihapus" },
                { id: "c", text: "Menandakan akun tersebut merupakan utang" },
                { id: "d", text: "Menandakan akun tersebut diletakkan di sisi Kredit" }
              ],
              correctAnswer: "d",
              explanation: "Dalam format standar Jurnal Umum internasional, akun yang di-Kredit penulisannya wajib digeser menjorok ke kanan sebagai pembeda visual yang tegas.",
              difficulty: "easy"
            },
            {
              id: "q2_5",
              question: "Membeli perlengkapan kebersihan secara tunai seharga Rp 200 Ribu. Akun apa yang harus di-Kredit?",
              options: [
                { id: "a", text: "Beban Kebersihan" },
                { id: "b", text: "Perlengkapan" },
                { id: "c", text: "Kas" },
                { id: "d", text: "Utang Usaha" }
              ],
              correctAnswer: "c",
              explanation: "Membeli secara tunai berarti mengeluarkan uang. Uang (Kas) berkurang. Kas adalah Harta, jika berkurang harus dicatat di Kredit.",
              difficulty: "medium"
            },
            {
              id: "q2_6",
              question: "Mengapa ketika kita menerima uang di rekening Bank BCA kita, SMS dari BCA menyebutkan 'KREDIT'?",
              options: [
                { id: "a", text: "Karena bagi bank, uang kita adalah utang yang harus mereka catat di sisi Kredit" },
                { id: "b", text: "Karena uang masuk selalu di-Kredit dalam ilmu ekonomi" },
                { id: "c", text: "Karena menggunakan sistem akuntansi Eropa, bukan Amerika" },
                { id: "d", text: "Karena SMS tersebut ditujukan agar kita segera berhutang ke bank" }
              ],
              correctAnswer: "a",
              explanation: "Uang tabungan nasabah adalah dana titipan (Utang) bagi pihak Bank. Saat saldo nasabah naik, utang bank bertambah (Kredit).",
              difficulty: "medium"
            },
            {
              id: "q2_7",
              question: "Perusahaan mengambil cicilan utang bank secara tunai bulan ini. Manakah jurnal yang benar?",
              options: [
                { id: "a", text: "Debit: Kas, Kredit: Utang Bank" },
                { id: "b", text: "Debit: Beban Bank, Kredit: Kas" },
                { id: "c", text: "Debit: Utang Bank, Kredit: Kas" },
                { id: "d", text: "Debit: Beban Bank, Kredit: Utang" }
              ],
              correctAnswer: "c",
              explanation: "Membayar cicilan artinya Utang Bank berkurang (Utang berkurang ditaruh di Debit). Dan karena dibayar pakai uang, maka Kas berkurang (Kas berkurang ditaruh di Kredit).",
              difficulty: "hard"
            }
          ]
        }
      }
    ]
  },
  {
    title: "Akuntansi Keuangan — Laporan keuangan dan neraca",
    slug: "akuntansi-keuangan-laporan-neraca",
    description: "Naikkan level analisismu. Kuasai cara menyusun dan membaca 4 pilar laporan keuangan layaknya CFO profesional.",
    categorySlug: "keuangan-akuntansi",
    difficulty: "INTERMEDIATE",
    isPremium: true,
    language: "id",
    estimatedHours: 8,
    thumbnail: null,
    modules: [
      {
        title: "Neraca (Balance Sheet) & Laba Rugi (Income Statement)",
        slug: "neraca-laporan-laba-rugi",
        order: 1,
        estimatedMinutes: 60,
        xpReward: 100,
        sources: [
          { type: "DOCUMENTATION", title: "Laporan Keuangan", url: "https://id.wikipedia.org/wiki/Laporan_keuangan" }
        ],
        contentObject: {
          slides: [
            {
              slideNumber: 1,
              type: "lesson",
              title: "Muara dari Semua Transaksi",
              content: "Jika jurnal umum adalah \"buku harian\" perusahaan, maka Laporan Keuangan adalah \"Rapor Akhir Semester\". \nInvestor atau Bank tidak punya waktu untuk membaca ribuan halaman jurnal harianmu. Mereka hanya ingin melihat hasil akhirnya: Apakah perusahaan ini sehat, sakit, atau hampir mati?\n\nRapor ini terbagi menjadi 4 pilar utama:\n1. **Laporan Laba/Rugi** (Apakah kita untung?)\n2. **Neraca / Posisi Keuangan** (Seberapa kaya kita hari ini?)\n3. **Laporan Perubahan Modal** (Ke mana larinya keuntungan itu?)\n4. **Laporan Arus Kas** (Dari mana uang tunai datang, dan ke mana perginya?)\n\nDi modul ini, kita akan membongkar dua pilar yang paling sering diminta oleh investor: Laba/Rugi dan Neraca.",
              keyTakeaway: "Laporan keuangan adalah ringkasan eksekutif dari seluruh aktivitas bisnis, digunakan untuk mengukur kinerja dan kesehatan finansial."
            },
            {
              slideNumber: 2,
              type: "lesson",
              title: "1. Laporan Laba/Rugi (Income Statement)",
              content: "Laporan Laba/Rugi layaknya video rekaman prestasi selama **satu periode waktu tertentu** (misalnya dari 1 Januari hingga 31 Desember).\nLaporan ini hanya peduli pada dua hal: **Pendapatan** dan **Beban**.\n\n- **Pendapatan (Revenue)**: Uang yang kamu hasilkan dari aktivitas bisnismu.\n- **Beban (Expenses)**: Biaya yang hangus kamu korbankan untuk menghasilkan pendapatan tersebut.\n\nRumus sakti:\n**LABA = PENDAPATAN - BEBAN**\n\nJika Pendapatan > Beban = Laba Bersih (Untung).\nJika Pendapatan < Beban = Rugi Bersih (Rugi).\nSangat intuitif, bukan?",
              keyTakeaway: "Laporan Laba/Rugi hanya memuat akun Pendapatan dan Beban untuk menentukan apakah bisnis mencetak untung atau buntung dalam suatu periode."
            },
            {
              slideNumber: 3,
              type: "lesson",
              title: "Gross Profit vs Net Profit",
              content: "Dalam laporan Laba/Rugi perusahaan dagang, laba sering dibagi menjadi dua tingkat agar lebih transparan:\n\n1. **Laba Kotor (Gross Profit)**\nDihitung dari *Pendapatan Penjualan* dikurangi *Harga Pokok Penjualan (HPP)*.\nHPP adalah harga beli asli barang daganganmu.\n*Contoh:* Jual kopi harganya 50rb. Harga biji kopi, susu, cup totalnya 20rb. Laba kotor = 30rb.\n\n2. **Laba Bersih (Net Profit)**\nLaba Kotor tadi kemudian dikurangi lagi dengan semua biaya operasional lain (gaji barista, sewa ruko, listrik, air, biaya marketing).\n*Contoh:* Laba kotor 30rb. Gaji & sewa dihitung-hitung makan porsi 15rb. Laba bersih = 15rb.\n\nInvestor sangat kritis pada Laba Kotor. Jika dari Laba Kotor saja sudah minus (jual lebih murah dari modal bahan baku), maka bisnis itu tidak mungkin bisa hidup!",
              keyTakeaway: "Laba kotor mengukur margin keuntungan produk murni. Laba bersih mengukur untung yang sesungguhnya masuk ke kantong setelah dipotong operasional."
            },
            {
              slideNumber: 4,
              type: "casestudy",
              title: "Studi Kasus: Membuat Laporan Laba/Rugi",
              content: "PT Senja Makmur memiliki data berikut selama bulan Mei 2026:\n- Penjualan Jasa: Rp 100.000.000\n- Beban Gaji: Rp 30.000.000\n- Beban Sewa Kantor: Rp 15.000.000\n- Beban Listrik & Internet: Rp 5.000.000\n- Beban Bunga Bank: Rp 2.000.000\n\nMari kita susun Laba/Ruginya:\n```text\nPT SENJA MAKMUR\nLAPORAN LABA/RUGI\nUntuk Bulan yang Berakhir 31 Mei 2026\n\nPendapatan Jasa                 Rp 100.000.000\nBeban Operasional:\n  - Beban Gaji       (30.000.000)\n  - Beban Sewa       (15.000.000)\n  - Beban Listrik    ( 5.000.000)\nTotal Beban Operasional        (Rp  50.000.000)\n-----------------------------------------------\nLaba Operasi                    Rp  50.000.000\n\nPendapatan/Beban di Luar Operasi:\n  - Beban Bunga      ( 2.000.000)\n-----------------------------------------------\nLABA BERSIH                     Rp  48.000.000\n```\n*(Tanda kurung dalam akuntansi berarti angka minus/pengurang)*",
              keyTakeaway: "Pemisahan Laba Operasi dan Laba Bersih penting untuk melihat apakah bisnis inti kita sehat, terlepas dari utang bank (Beban Bunga) yang membebaninya."
            },
            {
              slideNumber: 5,
              type: "lesson",
              title: "2. Neraca (Balance Sheet)",
              content: "Jika Laba/Rugi adalah *video rekaman* 1 tahun, maka **Neraca adalah sebuah *Foto Snapshot***. Neraca memotret kondisi kekayaan perusahaan pada SATU DETIK TERTENTU (misalnya tepat pukul 23:59 tanggal 31 Desember).\n\nNeraca berisi 3 komponen dari Modul 1 sebelumnya: **HARTA, UTANG, dan MODAL**.\nNeraca dinamakan \"Balance Sheet\" karena ia secara visual menampilkan wujud fisik dari rumus *Harta = Utang + Modal*.\n\nFormat standarnya dibagi dua (seperti huruf T):\n- **Kolom Kiri (Aktiva):** Daftar seluruh Harta.\n- **Kolom Kanan (Pasiva):** Daftar seluruh Utang dan Modal.\n\nTotal ujung bawah dari Kolom Kiri WAJIB sama persis (balance) dengan ujung bawah Kolom Kanan. Jika selisih 1 rupiah saja, maka ada yang salah dalam pencatatan jurnalmu!",
              keyTakeaway: "Neraca memotret nilai Harta, Utang, dan Modal pada satu titik waktu (tanggal spesifik), dan posisinya wajib seimbang antara kiri dan kanan."
            },
            {
              slideNumber: 6,
              type: "lesson",
              title: "Klasifikasi Harta (Aktiva)",
              content: "Di dalam Neraca, Harta tidak ditulis sembarangan. Ia harus diurutkan berdasarkan **Tingkat Likuiditas** (Seberapa cepat benda itu bisa diubah menjadi uang tunai nyata).\n\n1. **Harta Lancar (Current Assets)**\nBisa cair jadi uang tunai dalam kurun waktu kurang dari 1 tahun.\nContoh urutan: Kas (paling cair) -> Deposito -> Piutang (tagihan ke pelanggan) -> Persediaan Barang Dagangan -> Perlengkapan (tinta, kertas).\n\n2. **Harta Tetap (Fixed Assets / Non-Current)**\nAset jangka panjang yang dipakai untuk operasional dan tidak niat dijual dalam 1 tahun.\nContoh: Tanah, Gedung, Kendaraan, Mesin.\n\n3. **Harta Tak Berwujud (Intangible Assets)**\nTidak ada fisik tapi bernilai uang.\nContoh: Hak Paten, Merek Dagang (Brand Value), Franchise, Hak Cipta.",
              keyTakeaway: "Harta dalam neraca selalu disusun dari yang paling cepat cair (Uang Tunai) hingga yang paling sulit/lama dijual (Gedung/Tanah)."
            },
            {
              slideNumber: 7,
              type: "lesson",
              title: "Klasifikasi Utang (Liabilitas)",
              content: "Sama seperti Harta, Utang di kolom kanan juga diurutkan berdasarkan seberapa cepat tenggat waktu kita harus membayarnya (Jatuh Tempo).\n\n1. **Utang Jangka Pendek (Current Liabilities)**\nUtang yang wajib dilunasi dalam kurun waktu kurang dari 1 tahun.\nContoh: Utang Usaha (ke supplier), Utang Gaji Karyawan, Utang Pajak.\n\n2. **Utang Jangka Panjang (Long-Term Liabilities)**\nUtang yang jatuh temponya masih lama (lebih dari 1 tahun).\nContoh: Utang Obligasi, Utang Hipotek/KPR Gedung, Pinjaman Investasi Bank tenor 5 tahun.\n\nKenapa pemisahan ini sangat kritis bagi investor?\nKarena jika Harta Lancar lebih KECIL daripada Utang Jangka Pendek, artinya perusahaan itu dalam bahaya kebangkrutan bulan depan! Mereka tidak punya cukup uang cepat untuk melunasi utang yang segera ditagih.",
              keyTakeaway: "Pemisahan klasifikasi Jangka Pendek dan Panjang memudahkan pembaca neraca untuk menganalisis risiko gagal bayar suatu perusahaan dalam waktu dekat."
            },
            {
              slideNumber: 8,
              type: "challenge",
              title: "Challenge: Mengurai Neraca & Laba Rugi",
              content: "Mari uji pemahamanmu. Kamu ditugaskan merapikan daftar akun yang berantakan dari sebuah startup dan harus mengelompokkannya dengan benar ke Laporan Keuangan.",
              challenge: {
                instruction: "Tentukan di laporan mana akun 'Pendapatan Jasa' dan 'Piutang Usaha' akan ditampilkan. Jawab dengan format: [Nama Akun] = [Nama Laporan].",
                inputType: "text",
                inputPlaceholder: "Pendapatan Jasa = ..., Piutang Usaha = ...",
                expectedConcepts: [
                  "Pendapatan Jasa masuk Laba Rugi",
                  "Piutang Usaha masuk Neraca"
                ],
                evaluationCriteria: "Evaluasi apakah jawaban secara tegas menyatakan bahwa Pendapatan Jasa merupakan bagian dari Laporan Laba Rugi (Income Statement), dan Piutang Usaha adalah Harta sehingga masuk ke dalam Neraca (Balance Sheet). Berikan feedback jika salah satu tertukar.",
                hints: [
                  "Ingat, Laba Rugi hanya berisi Pendapatan dan Beban.",
                  "Piutang (tagihan pelanggan) adalah hak tagih perusahaan, yang berarti bagian dari Harta."
                ],
                sampleAnswer: "Pendapatan Jasa = Laporan Laba Rugi, Piutang Usaha = Neraca",
                followUpQuestion: "Di sisi mana Piutang Usaha diletakkan dalam Neraca? Aktiva atau Pasiva?"
              }
            },
            {
              slideNumber: 9,
              type: "lesson",
              title: "Pembahasan Challenge: Tempat yang Tepat",
              content: "Mari kita bahas posisi setiap akun:\n\n- **Pendapatan Jasa** adalah hasil keringat operasional periode ini. Maka tempat yang tepat adalah **Laporan Laba/Rugi**, untuk dicocokkan dengan Beban agar ketahuan Laba bersihnya.\n- **Piutang Usaha** adalah uang kita yang masih nyangkut di tangan klien (hak tagih). Secara hukum itu adalah kekayaan kita, alias **Harta (Aktiva)**. Karena dia harta, maka tempatnya mutlak di **Neraca**, khususnya di kelompok Harta Lancar.\n\nKesalahan paling umum pemula adalah menganggap semua uang masuk = Laba. Padahal, Piutang belum berupa uang masuk, tapi sudah diakui sebagai Harta. Akuntansi mendidik kita untuk sangat disiplin membedakan 'Hak' dan 'Uang Tunai Real'.",
              keyTakeaway: "Akun Pendapatan dan Beban HANYA muncul di Laba/Rugi. Akun Harta, Utang, dan Modal HANYA muncul di Neraca."
            },
            {
              slideNumber: 10,
              type: "lesson",
              title: "Jembatan Rahasia: Laba Bersih ke Neraca",
              content: "Jika Neraca dan Laba/Rugi adalah dua dokumen terpisah, bagaimana mereka saling berhubungan?\nInilah kepingan puzzle yang menyatukan seluruh ilmu akuntansi:\n\n**Laba Bersih dari Laporan Laba/Rugi akan disuntikkan langsung masuk ke dalam Neraca di bagian MODAL!**\n\nSiklusnya begini:\n1. Hitung Laba/Rugi dulu. (Misal untung Rp 10 Juta).\n2. Uang Rp 10 Juta itu adalah hak pemilik. Maka, pos \"Modal Pemilik\" (di Neraca sisi Kanan) akan menggemuk sebesar Rp 10 Juta.\n3. Karena Modal menggemuk, maka sisi Kiri Neraca (biasanya berupa Kas atau Piutang) pasti juga menggemuk. Hasil akhirnya? Neraca akan kembali seimbang sempurna!\n\nTanpa menyambungkan Laba Bersih ke dalam Modal, Neraca perusahaanmu tidak akan pernah *Balance* sampai kiamat.",
              keyTakeaway: "Laporan Laba/Rugi selalu dikerjakan lebih dulu, karena hasil Laba/Ruginya akan ditransfer menjadi komponen penambah/pengurang Modal di dalam Neraca."
            },
            {
              slideNumber: 11,
              type: "casestudy",
              title: "Studi Kasus: Menyusun Neraca Sederhana",
              content: "Setelah Laba Bersih PT Senja Makmur dihitung (Rp 48 Juta), mari susun Neracanya di akhir bulan:\n\n```text\nNERACA PT SENJA MAKMUR per 31 Mei 2026\n\nAKTIVA (HARTA)                    PASIVA (UTANG & MODAL)\n--------------------------------------------------------\nHarta Lancar:                     Utang Jangka Pendek:\n- Kas                Rp 50jt      - Utang Usaha        Rp 20jt\n- Piutang            Rp 30jt      - Utang Bank (Cepat) Rp 10jt\nHarta Tetap:                      Modal:\n- Peralatan/Mesin    Rp 40jt      - Modal Awal Budi    Rp 42jt\n                                  - Laba Bulan Ini     Rp 48jt\n\nTOTAL AKTIVA        Rp 120jt      TOTAL PASIVA        Rp 120jt\n```\nPerhatikan! Angka Laba Rp 48jt menempel indah di bawah Modal Awal, membuat total Pasiva menjadi persis 120jt, sama tegak lurus dengan total Aktiva 120jt.",
              keyTakeaway: "Neraca membagi Harta di kiri (Aktiva) dan pendanaannya di kanan (Pasiva). Laba bersih bulan/tahun berjalan selalu mejeng di porsi Modal."
            },
            {
              slideNumber: 12,
              type: "lesson",
              title: "Akumulasi Penyusutan (Depresiasi)",
              content: "Saat perusahaan punya Mesin Kopi (Harta Tetap) senilai Rp 40jt, apakah 5 tahun lagi harganya tetap Rp 40jt? Tentu tidak! Mesin aus, tua, dan rusak.\nInilah konsep **Penyusutan (Depresiasi)**.\n\nNilai harta tetap (kecuali Tanah) harus diturunkan perlahan-lahan setiap bulannya.\nPenurunan nilai ini akan dicatat sebagai **Beban Penyusutan** (masuk Laba Rugi) dan **Akumulasi Penyusutan** (pengurang Harta di Neraca).\n\n```text\nHarta Tetap:\n- Peralatan/Mesin               Rp 40.000.000\n- Akumulasi Penyusutan Mesin   (Rp  8.000.000) -\n  Nilai Buku Mesin              Rp 32.000.000\n```\nInvestor sangat menyukai laporan yang jujur memotong nilai hartanya melalui penyusutan, bukan laporan yang pura-pura asetnya utuh padahal sudah jadi besi tua.",
              keyTakeaway: "Depresiasi adalah cara akuntansi membebankan harga beli aset berumur panjang secara cicil (bertahap) selama masa manfaatnya."
            },
            {
              slideNumber: 13,
              type: "example",
              title: "Window Dressing: Ilusi Neraca",
              content: "Pernah dengar kasus perusahaan bangkrut tiba-tiba padahal laporan neracanya bagus? Itu biasanya karena manipulasi legal yang disebut *Window Dressing*.\n\nContoh taktik yang sering dilakukan menjelang tutup buku 31 Desember:\n- **Jual aset bayar utang kilat:** Perusahaan mencairkan deposito untuk melunasi utang bank pada tanggal 30 Desember. Utang tampak kecil di Neraca (terlihat sehat). Tanggal 2 Januari, mereka meminjam kembali dari bank.\n- **Diskon obral akhir tahun:** Memaksa distributor memborong barang pakai kredit, sehingga Pendapatan dan Piutang melambung tinggi sesaat.\n\nSebagai analis, kamu harus membandingkan Neraca tahun ini dengan tahun lalu, serta kuartal sebelumnya untuk mendeteksi pergerakan angka yang aneh dan drastis.",
              keyTakeaway: "Angka Neraca di akhir tahun bisa 'dipercantik' (Window Dressing) oleh manajemen. Waspadai perubahan drastis di akhir tahun yang kembali normal di awal tahun berikutnya."
            },
            {
              slideNumber: 14,
              type: "lesson",
              title: "Rangkuman Modul 1",
              content: "Kamu telah membedah dua pilar paling sakral dalam Laporan Keuangan:\n\n1. **Laporan Laba/Rugi** = Pertarungan antara Pendapatan vs Beban selama suatu rentang waktu (misal 1 tahun). Menghasilkan Net Profit (Laba Bersih).\n2. **Neraca (Balance Sheet)** = Foto rontgen kekayaan perusahaan di satu detik/tanggal spesifik. \n3. **Aktiva (Kiri)** di Neraca adalah Harta Lancar dan Tetap.\n4. **Pasiva (Kanan)** adalah asal muasal Aktiva itu didanai (Utang Jangka Pendek, Jangka Panjang, dan Modal).\n5. Kunci rahasianya: **Laba Bersih akan dikirim masuk sebagai penambah Modal di dalam Neraca** agar kedua sisi timbangan kembali seimbang sempurna.\n\nDi modul berikutnya, kita akan membahas Laporan Arus Kas (Cash Flow) – laporan penentu nafas hidup perusahaan yang sebenarnya!",
              keyTakeaway: "Membaca Laba Rugi memberitahumu kecepatan mobil melaju (performa laba), sedangkan membaca Neraca memberitahumu berapa sisa bensin dan kekuatan mesin mobil tersebut (kesehatan aset)."
            },
            {
              slideNumber: 15,
              type: "quiz",
              title: "Ujian Validasi Modul 1",
              content: "Mari uji ketajaman analisamu terhadap Neraca dan Laba Rugi. Jawablah soal-soal AI di kuis ini dengan logika dan pemahaman utuhmu.",
              quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
            }
          ],
          quizBank: []
        }
      },
      {
        title: "Laporan Arus Kas & Perubahan Modal",
        slug: "laporan-arus-kas-perubahan-modal",
        order: 2,
        estimatedMinutes: 60,
        xpReward: 100,
        sources: [
          { type: "DOCUMENTATION", title: "Laporan Arus Kas", url: "https://id.wikipedia.org/wiki/Laporan_arus_kas" }
        ],
        contentObject: {
          slides: [
            {
              slideNumber: 1,
              type: "lesson",
              title: "Ilusi Laba Bersih",
              content: "Pernahkah kamu melihat perusahaan startup atau pabrik raksasa melaporkan **LABA TRILIUNAN**, tetapi bulan depannya mereka menunggak bayar gaji karyawan dan bangkrut?\n\nBagaimana bisa untung tapi tidak punya uang?\nJawabannya kembali ke konsep *Accrual Basis* di modul sebelumnya: Laba dicatat saat \"hak tagih\" (Penjualan) terjadi, bukan saat uangnya diterima!\n\nJika kamu berhasil menjual traktor senilai Rp 10 Miliar, tapi pembelinya baru akan bayar tunai 3 tahun lagi (berupa Piutang), maka di Laporan Laba/Rugi kamu langsung terlihat untung besar HARI INI. Tapi di rekening bankmu, saldonya NOL RUPIAH. Kamu tidak bisa membayar gaji pakai \"Laba Bersih di atas kertas\".\n\nItulah mengapa kita butuh laporan pelengkap yang brutal kejujurannya: **Laporan Arus Kas (Cash Flow Statement)**.",
              keyTakeaway: "Laba bersih seringkali hanya berupa angka di atas kertas (Piutang). Laporan Arus Kas adalah penelusuran nyata ke mana perginya uang tunai yang sesungguhnya."
            },
            {
              slideNumber: 2,
              type: "lesson",
              title: "3. Laporan Arus Kas (Cash Flow)",
              content: "Jika Neraca adalah Harta dan Laba/Rugi adalah Untung, maka Arus Kas ibarat **rekening koran** perusahaan yang dirapikan.\n\nLaporan ini memotong semua omong kosong akuntansi akrual dan hanya peduli pada: \n**\"Berapa banyak uang tunai fisik yang masuk, dan berapa banyak uang tunai yang keluar?\"**\n\nArus Kas dibagi menjadi 3 aktivitas sakral:\n1. **Aktivitas Operasi (Operating)** - Uang dari bisnis inti.\n2. **Aktivitas Investasi (Investing)** - Uang dari jual beli aset besar (Gedung, Mesin).\n3. **Aktivitas Pendanaan (Financing)** - Uang dari utang bank atau suntikan investor.\n\nKesehatan finansial mutlak bergantung pada laporan ini. *\"Cash is King!\"*",
              keyTakeaway: "Laporan Arus Kas memilah mutasi uang tunai perusahaan menjadi tiga laci: Operasi (bisnis inti), Investasi (jual-beli aset tetap), dan Pendanaan (utang/modal investor)."
            },
            {
              slideNumber: 3,
              type: "casestudy",
              title: "1. Arus Kas dari Aktivitas Operasi",
              content: "Ini adalah indikator paling krusial. Uang di bagian ini berasal murni dari keringat bisnis itu sendiri.\n\n- **Arus Masuk:** Uang tunai riil yang dibayar pelanggan atas produk/jasamu.\n- **Arus Keluar:** Uang tunai yang kamu bayarkan ke *supplier* bahan baku, gaji karyawan riil, dan bayar listrik.\n\nJika perusahaan mencatat Laba Bersih tinggi tapi Arus Kas Operasinya minus berbulan-bulan, itu adalah **BENDERA MERAH (Red Flag)** bagi investor. Artinya perusahaan itu gagal menagih hutang pelanggannya atau uangnya mengendap di gudang menjadi barang mati yang tidak laku.\n\nSebuah bisnis yang sehat secara fundamental HARUS memiliki Arus Kas Operasi bernilai Positif.",
              keyTakeaway: "Arus Kas Operasi yang positif membuktikan bahwa bisnis inti perusahaan mampu menghasilkan uang tunai yang cukup untuk menghidupi dirinya sendiri tanpa perlu mengemis utang."
            },
            {
              slideNumber: 4,
              type: "lesson",
              title: "2. Arus Kas dari Aktivitas Investasi",
              content: "Aktivitas Investasi merekam pergerakan uang tunai yang berhubungan dengan Aset Jangka Panjang (Harta Tetap).\n\n- **Arus Keluar (Minus):** Perusahaan membeli Tanah, membangun Pabrik baru, atau memborong Mesin Kopi baru secara tunai.\n- **Arus Masuk (Plus):** Perusahaan menjual mobil bekas operasionalnya atau menjual gedung lamanya secara tunai.\n\nSeringkali, Arus Kas Investasi ini bernilai Minus/Negatif yang sangat besar. Apakah buruk? \n**BELUM TENTU!** \nJika minusnya karena perusahaan membangun banyak pabrik baru (ekspansi agresif) demi merajai pasar masa depan, maka minus di investasi adalah kabar gembira bagi investor. Tapi jika uangnya dibelikan kapal pesiar atas nama direktur, itu masalah!",
              keyTakeaway: "Arus Kas Investasi yang negatif wajar terjadi pada perusahaan yang sedang bertumbuh (growing) karena mereka terus menyedot uang tunai untuk membeli aset modal jangka panjang."
            },
            {
              slideNumber: 5,
              type: "casestudy",
              title: "3. Arus Kas dari Aktivitas Pendanaan",
              content: "Dari mana uang untuk mendanai \"Aktivitas Investasi\" (beli pabrik baru) tadi? Jawabannya seringkali datang dari **Aktivitas Pendanaan (Financing)**.\n\nAktivitas Pendanaan merekam transaksi dengan pemegang saham dan kreditur jangka panjang.\n\n- **Arus Masuk (Plus):** Perusahaan menerima utang Rp 10 Miliar dari BCA, atau suntikan modal segar dari investor baru, atau hasil IPO di bursa saham.\n- **Arus Keluar (Minus):** Perusahaan mengembalikan/melunasi pokok utang BCA, membayar Dividen tunai ke pemegang saham, atau membeli kembali sahamnya (*Buyback*).\n\nJika startup terus-terusan hidup (kas operasinya minus, kas investasinya minus) tapi di akhir bulan rekening banknya masih hijau, itu murni karena kas pendanaannya surplus berkat uang bakar (*burn rate*) investor venture capital!",
              keyTakeaway: "Aktivitas Pendanaan adalah urat nadi eksternal. Perusahaan mendapat uang dari berhutang atau disuntik modal, dan mengeluarkan uang untuk melunasi utang atau membagikan dividen."
            },
            {
              slideNumber: 6,
              type: "lesson",
              title: "Hubungan Arus Kas dengan Neraca",
              content: "Perhatikan keajaiban sinkronisasi akuntansi ini:\n\nHasil akhir dari Laporan Arus Kas (misalnya: Total penambahan kas bersih tahun ini = Rp 250 Juta), ditambah dengan Saldo Kas di 1 Januari, maka hasilnya **WAJIB SAMA PERSIS** dengan angka saldo akun \"Kas\" yang tercetak di bagian Harta Lancar pada Neraca per 31 Desember.\n\nSiklus detektif akuntansi:\n1. Lihat nilai Kas di Neraca hari ini (Misal: 5 Miliar). Kok bisa gede banget?\n2. Buka Laporan Arus Kas untuk mencari tahu dari mana 5 Miliar itu datang.\n3. Oh, ternyata dari Operasi (0 Miliar) dan Pendanaan (5 Miliar dari Utang).\n4. Kesimpulan: Perusahaan ini bukan kaya karena jago jualan, tapi kaya karena baru dapat pinjaman bank! Awas!",
              keyTakeaway: "Laporan Arus Kas adalah jembatan transparan yang menjelaskan mutasi terperinci atas satu angka tunggal di Neraca, yaitu saldo KAS."
            },
            {
              slideNumber: 7,
              type: "lesson",
              title: "4. Laporan Perubahan Modal",
              content: "Laporan ke-empat (terakhir) adalah pelengkap yang disebut **Laporan Perubahan Modal (Statement of Changes in Equity)**.\n\nLaporan ini ditujukan khusus untuk Pemilik/Pemegang Saham. Isinya hanya menjawab pertanyaan: *\"Sejak awal tahun sampai akhir tahun, nilai kekayaan bersih saya di bisnis ini naik atau turun berapa banyak, dan gara-gara apa?\"*\n\nRumus Laporan Perubahan Modal sangat sederhana:\n1. **Modal Awal** (1 Januari)\n2. Ditambah: **Laba Bersih** (diambil dari Laba Rugi) ATAU Dikurangi: **Rugi Bersih**.\n3. Ditambah: Setoran Modal Baru Pemilik di tengah tahun (jika ada).\n4. Dikurangi: Pengambilan pribadi (Prive) / Dividen tunai yang ditarik pemilik.\n5. = **Modal Akhir** (31 Desember).",
              keyTakeaway: "Laporan Perubahan Modal melacak naik turunnya hak paten kepemilikan owner, dipengaruhi oleh profitabilitas bisnis dan penarikan uang (dividen) oleh owner itu sendiri."
            },
            {
              slideNumber: 8,
              type: "challenge",
              title: "Challenge: Mengurai Teka-Teki Kas",
              content: "Kamu sedang mewawancarai calon CFO (Direktur Keuangan) dan menyodorkan satu laporan Arus Kas padanya.",
              challenge: {
                instruction: "Baca kondisi ini: 'Kas dari Operasi Minus Rp 5 Miliar. Kas dari Investasi Minus Rp 1 Miliar. Kas dari Pendanaan Surplus (Plus) Rp 10 Miliar. Uang kas akhir berlimpah.' Analisis apakah bisnis ini sehat atau bergantung pada pihak luar?",
                inputType: "essay",
                inputPlaceholder: "Tulis hasil analisismu...",
                expectedConcepts: [
                  "Bisnis operasional rugi/minus",
                  "Bergantung pada utang/investor (Pendanaan Plus)",
                  "Tidak sehat dalam jangka panjang"
                ],
                evaluationCriteria: "Evaluasi apakah peserta mampu menjelaskan bahwa operasional bisnis (core business) berdarah-darah (minus 5M) dan uang tunai yang terlihat banyak HANYA berasal dari suntikan utang/investor (pendanaan plus 10M). Bisnis ini bergantung pada dana eksternal dan berbahaya jika tidak segera mencetak laba tunai.",
                hints: [
                  "Dari mana datangnya mayoritas uang tunai? Operasi atau Pendanaan?",
                  "Apakah operasi bisnisnya menghasilkan uang tunai?"
                ],
                sampleAnswer: "Bisnis ini tidak sehat secara operasional karena arus kas operasinya minus 5 Miliar (tekor terus). Uang kas yang melimpah semata-mata karena disuntik oleh investor atau bank (pendanaan 10 Miliar). Jika kran pendanaan diputus besok, perusahaan ini akan mati karena bisnis utamanya gagal mencetak kas.",
                followUpQuestion: "Apa saranmu agar Arus Kas Operasinya bisa kembali positif?"
              }
            },
            {
              slideNumber: 9,
              type: "lesson",
              title: "Pembahasan Challenge",
              content: "Analisis arus kas adalah senjata paling mematikan seorang investor kawakan.\n\nJika kamu menemukan perusahaan dengan **Operasi (-), Investasi (-), dan Pendanaan (+)**, itu adalah profil klasik dari startup bakar uang atau perusahaan yang bergantung hidup dari utang baru untuk menutup utang lama (Skema Ponzi versi korporat). Mereka *survive* hanya karena terus menerus berhutang.\n\nProfil perusahaan idaman (Sapi Perah / Cash Cow) adalah: **Operasi (+ besar), Investasi (- secukupnya), Pendanaan (-)**.\nOperasi positif berarti jago jualan tunai. Investasi minus berarti mereka rutin upgrade pabrik. Pendanaan minus berarti mereka sanggup membayar dividen ke kita dan sanggup melunasi hutang-hutang bank mereka tanpa perlu berhutang lagi!",
              keyTakeaway: "Laba bisa dimanipulasi dengan trik jurnal pengakuan akuntansi (akrual). Namun, uang tunai di bank tidak bisa berbohong. Arus Kas adalah serum kebenaran bisnis."
            },
            {
              slideNumber: 10,
              type: "lesson",
              title: "Free Cash Flow (FCF)",
              content: "Pernah dengar istilah di Wall Street: *\"We look for companies with strong Free Cash Flow\"*?\n\n**Free Cash Flow (Kas Bebas)** adalah sisa uang tunai yang murni bebas digunakan pemilik sesuka hati setelah semua kewajiban operasional perusahaan dan perbaikan alat pabrik diselesaikan.\n\nRumus mudahnya:\n**FCF = Arus Kas Operasi dikurangi Belanja Modal (Capital Expenditure / Pembelian Harta Tetap)**.\n\nJika sebuah minimarket menghasilkan kas operasi 100 Juta, tapi chiller/kulkas dan bangunannya rusak parah butuh renovasi 120 Juta, maka FCF-nya minus 20 Juta! Bos minimarket itu tidak bisa membagikan keuntungan untuk dirinya sendiri sepeser pun bulan ini.",
              keyTakeaway: "Free Cash Flow (FCF) adalah ukuran mutlak seberapa leluasa sebuah perusahaan sanggup mendanai pemegang sahamnya, berekspansi ke lini bisnis baru, atau melunasi sisa utang."
            },
            {
              slideNumber: 11,
              type: "example",
              title: "Catatan Atas Laporan Keuangan (CALK)",
              content: "Tunggu, masih ada komponen ke-lima yang sering dilupakan: **CALK (Notes to Financial Statements)**.\n\nKeempat laporan angka (Laba/Rugi, Neraca, Arus Kas, Perubahan Modal) seringkali terlalu kaku. Bagaimana jika perusahaan sedang digugat di pengadilan senilai triliunan rupiah tapi belum ada putusan inkrah? Tentu belum bisa dimasukkan ke jurnal Neraca. Di sinilah CALK bertindak.\n\nCALK adalah dokumen TEKS (bukan sekadar angka tabel) tebal beratus halaman yang menceritakan kebijakan akuntansi, risiko bisnis tersembunyi, skandal, piutang macet yang disembunyikan, dan perjanjian utang. \n\n*Warren Buffett menghabiskan 80% waktunya membaca CALK, bukan tabel Neracanya.*",
              keyTakeaway: "Catatan Atas Laporan Keuangan (CALK) mengungkap narasi dan risiko di balik angka-angka tabel. Bencana terbesar sering disembunyikan dalam 'klausul huruf kecil' di dokumen ini."
            },
            {
              slideNumber: 12,
              type: "casestudy",
              title: "Studi Kasus: Siklus Lengkap Laporan",
              content: "Mari kita rangkai aliran data dari modul 1 dan 2 menjadi satu nafas:\n\n1. **Jurnal Umum** dibuat setiap hari berdasarkan kuitansi (transaksi riil).\n2. Di akhir bulan, dipilah mana yang **Pendapatan & Beban**. Lahirlah **Laporan Laba/Rugi**.\n3. Di Laba/Rugi, muncul **Laba Bersih** Rp 50 Juta.\n4. Laba Rp 50 Juta itu di-oper ke **Laporan Perubahan Modal**. Modal awal Budi (100 Juta) + Laba (50 Juta) = Modal Akhir (150 Juta).\n5. Angka Modal Akhir (150 Juta) dimasukkan ke bagian Pasiva pada **Neraca**. Neraca berhasil SEIMBANG (Total Harta = Total Utang + Modal 150 Juta).\n6. Di Neraca ada saldo Kas Rp 70 Juta. Untuk membuktikan Rp 70 Juta itu halal dan nyata dari mana asalnya, dibuatlah **Laporan Arus Kas**.\n\nSemuanya saling terkait tanpa cacat cela. Ini mahakarya sistem penemuan Luca Pacioli dari abad ke-15!",
              keyTakeaway: "Keempat laporan keuangan bukanlah dokumen terpisah, melainkan serangkaian domino yang nilainya saling mengalir untuk menciptakan satu sistem cek-dan-ricek yang sempurna."
            },
            {
              slideNumber: 13,
              type: "lesson",
              title: "Laporan Keuangan Diaudit (Audited)",
              content: "Bagi perusahaan Publik (Tbk), laporan keuangan yang mereka rilis ke publik wajib stempel **Audited** (Telah Diaudit).\n\nArtinya, sebuah firma akuntan publik independen (Pihak Ketiga) yang digaji bukan untuk membuat laporan, melainkan untuk menjadi **Polisi Pemeriksa**, telah mengobrak-abrik buku jurnal perusahaan, menelepon bank untuk verifikasi saldo kas asli, dan mengecek fisik barang di gudang.\n\nJika auditor puas dan tidak menemukan penipuan material, mereka akan memberikan Opini: **Wajar Tanpa Pengecualian (Unqualified Opinion)**.\nOpini ini adalah tiket emas yang meyakinkan para investor bahwa angka di Neraca dan Laba Rugi 99% bisa dipercaya.",
              keyTakeaway: "Jangan sembarangan berinvestasi atau memberi kredit besar hanya berdasarkan laporan internal. Mintalah Laporan Keuangan Audited dengan opini Wajar Tanpa Pengecualian."
            },
            {
              slideNumber: 14,
              type: "lesson",
              title: "Rangkuman Modul 2",
              content: "Laporan Keuangan adalah kompas utama di lautan bisnis:\n\n1. **Laba Bersih sering berbohong** karena sistem akrual. Uang belum diterima tapi laba sudah dicatat.\n2. **Laporan Arus Kas** (Operasi, Investasi, Pendanaan) membedah tuntas aliran uang tunai nyata. Bebas ilusi.\n3. Arus Kas **Operasi** adalah jantung kehidupan perusahaan. Jika minus terus menerus, kematian sudah dekat.\n4. **Laporan Perubahan Modal** melacak pembengkakan/penyusutan kekayaan hak sang pemilik.\n5. **CALK** adalah dokumen deskriptif yang membongkar rahasia, asumsi, dan risiko di balik angka.\n6. Seluruh laporan ini merangkai **Siklus Akuntansi** yang ujungnya saling mengunci keseimbangan Neraca.",
              keyTakeaway: "Gabungan Laba/Rugi yang positif dan Arus Kas Operasi yang positif adalah konfirmasi absolut dari bisnis yang berumur panjang."
            },
            {
              slideNumber: 15,
              type: "quiz",
              title: "Ujian Validasi Modul 2",
              content: "Kamu telah membedah anatomi aliran kas. Bersiaplah untuk menjawab rentetan tes dari AI mengenai Cash Flow dan siklus laporan.",
              quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
            }
          ],
          quizBank: []
        }
      },
      {
        title: "Analisis Rasio Keuangan",
        slug: "analisis-rasio-keuangan",
        order: 3,
        estimatedMinutes: 60,
        xpReward: 100,
        sources: [
          { type: "DOCUMENTATION", title: "Rasio Keuangan", url: "https://id.wikipedia.org/wiki/Rasio_keuangan" }
        ],
        contentObject: {
          slides: [
            {
              slideNumber: 1,
              type: "lesson",
              title: "Membaca di Antara Angka",
              content: "Jika Laporan Keuangan adalah \"hasil tes darah\" di laboratorium, maka **Rasio Keuangan** adalah diagnosa dokter spesialis yang membacanya.\n\nAngka absolut di Neraca seringkali tidak ada artinya jika berdiri sendiri.\nContoh: Perusahaan A punya utang Rp 1 Miliar. Perusahaan B punya utang Rp 10 Miliar. Siapa yang lebih berisiko bangkrut?\nJawab: Tergantung! Jika Perusahaan A hanya punya aset 1,5 Miliar, sedangkan Perusahaan B punya aset 100 Miliar, maka Perusahaan A jauh lebih berisiko meski utangnya lebih kecil secara nominal.\n\nDi sinilah kita menggunakan **Rasio (Perbandingan)**. Kita membandingkan satu angka dengan angka lainnya untuk menemukan persentase kesehatan yang objektif.",
              keyTakeaway: "Rasio keuangan mengubah angka mentah nominal menjadi persentase dan indeks ukur baku, sehingga perusahaan kecil dan raksasa bisa dibandingkan secara *apple-to-apple*."
            },
            {
              slideNumber: 2,
              type: "lesson",
              title: "4 Kuadran Rasio Keuangan",
              content: "Dalam dunia investasi saham dan kredit perbankan, rasio keuangan dikelompokkan menjadi 4 keluarga besar:\n\n1. **Rasio Likuiditas (Liquidity):** Mampukah kamu membayar utang jatuh tempo bulan depan tanpa harus jual ginjal perusahaan?\n2. **Rasio Solvabilitas / Leverage:** Seberapa besar hidupmu bergantung pada belas kasihan bank (utang jangka panjang)?\n3. **Rasio Profitabilitas (Profitability):** Seberapa jago kamu mencetak keuntungan dari setiap rupiah modal yang ditanamkan?\n4. **Rasio Efisiensi / Aktivitas (Efficiency):** Seberapa gesit manajemenmu mengubah stok barang di gudang menjadi uang tunai nyata?\n\nMari kita bedah satu per satu rumus paling mematikan dari tiap kuadran.",
              keyTakeaway: "Keempat keluarga rasio ini mengukur 4 pilar bisnis yang berbeda: kemampuan bayar jarak dekat, jarak jauh, daya cetak laba, dan kecepatan perputaran aset."
            },
            {
              slideNumber: 3,
              type: "casestudy",
              title: "1. Rasio Likuiditas: Current Ratio",
              content: "**Current Ratio (Rasio Lancar)** adalah tes kebangkrutan paling dasar.\nRumusnya: **Current Ratio = Harta Lancar / Utang Jangka Pendek**\n\n*Studi Kasus:*\nToko Kue A memiliki Uang Kas + Piutang (Harta Lancar) = Rp 100 Juta.\nNamun, bulan depan mereka ditagih supplier (Utang Pendek) = Rp 120 Juta.\nCurrent Ratio = 100 / 120 = **0,83 kali**.\n\n*Apa artinya?* Toko ini tidak punya cukup uang untuk membayar tagihan. Untuk setiap Rp 1 utang, mereka hanya punya kekayaan cair Rp 0,83. Toko ini berisiko kolaps bulan depan jika tidak disuntik pinjaman baru!\n\nBatas aman (Rule of Thumb) yang disukai bank adalah Current Ratio di atas **1,5x**.",
              keyTakeaway: "Current Ratio < 1 adalah bendera merah raksasa. Perusahaan kekurangan darah segar (uang cair) untuk melunasi tagihan jangka pendeknya."
            },
            {
              slideNumber: 4,
              type: "lesson",
              title: "1. Rasio Likuiditas: Quick Ratio",
              content: "Namun tunggu, bagaimana jika dari \"Harta Lancar 100 Juta\" milik Toko Kue tadi, ternyata 80 Jutanya adalah *stok tepung dan gula* di gudang (Persediaan)?\n\nApakah tepung bisa dipakai membayar utang ke bank besok pagi? Tentu TIDAK! Tepung butuh waktu untuk dibuat kue lalu dijual.\nDi sinilah **Quick Ratio (Rasio Cepat)** alias *Acid-Test Ratio* bertindak lebih sadis.\n\nRumus: **(Harta Lancar - Persediaan Barang) / Utang Jangka Pendek**\nQuick Ratio = (100 Juta - 80 Juta) / 120 Juta = 20 / 120 = **0,16 kali**.\n\n*Wow!* Ternyata kesehatan kas toko ini jauh lebih hancur dari kelihatannya. Quick ratio mengeliminasi stok barang karena stok sangat sulit diuangkan dalam 1 malam saat krisis terjadi.",
              keyTakeaway: "Quick Ratio adalah tes likuiditas yang lebih keras. Ia mengasumsikan stok barang di gudang bernilai nol karena tidak bisa sekejap diubah jadi uang tunai."
            },
            {
              slideNumber: 5,
              type: "casestudy",
              title: "2. Rasio Solvabilitas: Debt to Equity Ratio (DER)",
              content: "Jika likuiditas bicara jangka pendek, **Solvabilitas** bicara ancaman jangka panjang. Rajanya adalah **Debt to Equity Ratio (DER)**.\n\nRumus: **Total Utang / Total Modal**\nMaksudnya: Untuk setiap Rp 1 uang pemilik (Modal), berapa banyak utang yang membayanginya?\n\n*Studi Kasus:*\nPT Infrastruktur punya total Utang 80 Miliar dan Modal sendiri 20 Miliar.\nDER = 80 / 20 = **4,0 (atau 400%)**.\n\nPerusahaan ini sangat beracun! Mereka dikendalikan oleh kreditur. Saat badai ekonomi datang (misal: krisis 1998 atau pandemi), bunga dari utang 80 Miliar ini akan mencekik laba operasi mereka sampai mati. Investor Warren Buffett sangat menghindari perusahaan dengan DER di atas 1,0 (100%).",
              keyTakeaway: "DER (Rasio Utang terhadap Modal) mengukur seberapa nekat manajemen bermain dengan utang. DER > 1 berarti perusahaan lebih banyak dibiayai utang ketimbang uang sendiri."
            },
            {
              slideNumber: 6,
              type: "lesson",
              title: "3. Rasio Profitabilitas: Net Profit Margin (NPM)",
              content: "Sekarang mari kita ukur mesin pencetak uang. \n**Net Profit Margin (Margin Laba Bersih)** mengukur daya tahan bisnismu dari perang harga.\n\nRumus: **(Laba Bersih / Total Pendapatan) x 100%**\n\nBerapa persen sih sisa keuntungan yang berhasil diselamatkan setelah dipotong gaji, listrik, dan pajak?\n*Contoh 1:* Jualan beras 100 Juta, Laba bersih cuma 2 Juta. NPM = **2%**. (Tipis sekali, jika harga kulakan beras naik sedikit saja, langsung rugi).\n*Contoh 2:* Jualan software (SaaS) 100 Juta, Laba bersih 60 Juta. NPM = **60%**. (Sangat kebal krisis, margin raksasa).\n\nPerusahaan dengan NPM tebal (seperti Apple atau Microsoft) punya *\"Moat\"* atau parit pertahanan monopoli yang sangat kuat.",
              keyTakeaway: "Net Profit Margin mencerminkan efisiensi operasional dan kekuatan monopoli *brand*. Semakin tebal marginnya, semakin kebal perusahaan itu dari krisis bahan baku."
            },
            {
              slideNumber: 7,
              type: "casestudy",
              title: "3. Rasio Profitabilitas: Return on Equity (ROE)",
              content: "Ini adalah rasio dewa. Metrik tunggal yang paling diintai oleh investor kelas kakap.\n**Return on Equity (ROE)** mengukur tingkat imbal hasil murni atas modal yang ditanam pemilik.\n\nRumus: **(Laba Bersih / Total Modal) x 100%**\n\n*Logika Investor:* \"Jika saya deposito di Bank, setahun dapat bunga 6%. Kalau saya suntikkan modal (Equity) Rp 1 Miliar ke perusahaanmu, berapa persen Laba yang bisa kamu hasilkan (Return) untuk saya?\"\n\nJika perusahaan hanya menghasilkan ROE 4%, investor akan kabur! Lebih baik uangnya ditaruh di deposito yang tanpa risiko dapat 6%.\nPerusahaan berkinerja istimewa biasanya mencetak ROE konsisten di atas **15%** setiap tahunnya.",
              keyTakeaway: "ROE (Return on Equity) adalah jawaban mutlak dari pertanyaan: Seberapa pintar direktur memutar uang pemegang saham menjadi keuntungan baru?"
            },
            {
              slideNumber: 8,
              type: "challenge",
              title: "Challenge: Mendiagnosa Penyakit Rasio",
              content: "Kamu adalah analis kredit di bank. Ada perusahaan yang mengajukan pinjaman Rp 5 Miliar kepadamu. Kamu disodori hasil perhitungan 2 rasio utama mereka.",
              challenge: {
                instruction: "Data perusahaan: Current Ratio = 0,6x. ROE = 35%. Apakah kamu akan menyetujui pinjaman ini? Jelaskan analisismu secara komprehensif dari dua sisi (likuiditas dan profitabilitas).",
                inputType: "essay",
                inputPlaceholder: "Menurut saya...",
                expectedConcepts: [
                  "Current Ratio jelek (ancaman gagal bayar jangka pendek)",
                  "ROE bagus (sangat profit)",
                  "Kesimpulan: Tidak setuju pinjaman (berisiko) ATAU Setuju dengan syarat perbaikan kas/jaminan"
                ],
                evaluationCriteria: "Evaluasi apakah peserta menyoroti bahwa ROE 35% memang brilian (profitabilitas tinggi), NAMUN Current Ratio 0,6x menunjukkan krisis kas parah. Perusahaan ini mungkin sangat profit 'di atas kertas', tapi uang tunainya nyangkut di gudang/piutang sehingga berisiko gagal bayar utang bulan depan. Berikan nilai benar jika kesimpulannya logis dan didasarkan pada perdebatan dua rasio yang kontradiktif ini.",
                hints: [
                  "Apa artinya Current Ratio di bawah 1?",
                  "Apakah laba (ROE tinggi) pasti selalu berbentuk uang tunai?",
                  "Sebagai bankir, prioritas pertamamu adalah kelancaran bayar utang, bukan seberapa tinggi laba perusahaan."
                ],
                sampleAnswer: "Meskipun ROE-nya sangat menggiurkan (35%), saya akan MENOLAK pinjaman ini. Current Ratio 0,6x adalah tanda bahaya kebangkrutan likuiditas. Artinya, perusahaan tidak punya cukup aset cair untuk membayar kewajiban jangka pendeknya. Sangat mungkin laba 35% itu semua masih tersendat berbentuk Piutang (belum dibayar pelanggan). Jika mereka bangkrut bulan depan karena gagal bayar utang supplier, laba tinggi di kertas tidak ada gunanya bagi bank.",
                followUpQuestion: "Apa yang menyebabkan sebuah perusahaan bisa memiliki ROE tinggi (laba besar) tapi Current Ratio rendah (kas tipis)?"
              }
            },
            {
              slideNumber: 9,
              type: "lesson",
              title: "Pembahasan Challenge",
              content: "Sangat menarik bukan? Sebuah perusahaan bisa terlihat seperti juara dunia di mata *pemegang saham* (karena ROE 35% mencetak untung banyak), tetapi terlihat seperti gelandangan di mata *bankir* (Current Ratio 0,6 karena kehabisan kas untuk bayar listrik besok).\n\nIni mengingatkan kita pada pelajaran Arus Kas: **Laba tidak sama dengan Uang Tunai**.\n\nSebagai seorang bankir, prioritas nomor satu adalah LIKUIDITAS. Kamu tidak peduli perusahaan itu untung ratusan miliar, selama mereka bisa membayar cicilan bulanan dengan tertib. Pinjaman harus ditolak (atau distruktur ulang) sampai mereka membenahi manajemen modal kerjanya (misal: menagih utang pelanggan yang macet secara agresif).",
              keyTakeaway: "Setiap pihak yang berkepentingan punya rasio favoritnya sendiri. Investor fokus pada rasio Profitabilitas (ROE, NPM), sedangkan Bankir sangat paranoid pada rasio Likuiditas dan Solvabilitas."
            },
            {
              slideNumber: 10,
              type: "lesson",
              title: "4. Rasio Efisiensi: Inventory Turnover",
              content: "Terakhir, kita masuk ke keluarga Rasio Efisiensi (Aktivitas).\n**Inventory Turnover (Perputaran Persediaan)** mengukur seberapa cepat barang di gudang terjual dan diganti baru dalam setahun.\n\nRumus: **Harga Pokok Penjualan (HPP) / Rata-rata Persediaan**\n\n*Contoh:* Supermarket A punya perputaran 12x setahun. Artinya setiap 1 bulan sekali, gudang mereka kosong dan diisi ulang barang baru. Perputarannya sangat cepat! (Uang cepat kembali).\nDealer Mobil Mewah mungkin perputarannya cuma 2x setahun. Mobil diam di showroom 6 bulan baru terjual.\n\nJika Inventory Turnover perusahaanmu tiba-tiba menurun tajam dari 10x menjadi 3x, artinya barangmu **tidak laku** dan menumpuk berdebu di gudang. Ini adalah awal dari kebangkrutan.",
              keyTakeaway: "Inventory Turnover mengukur kecepatan perputaran stok. Barang yang terlalu lama mengendap di gudang adalah 'uang mati' yang bisa busuk, kedaluwarsa, atau ketinggalan tren."
            },
            {
              slideNumber: 11,
              type: "casestudy",
              title: "4. Rasio Efisiensi: AR Turnover",
              content: "**Account Receivable (AR) Turnover** atau Perputaran Piutang mengukur seberapa galak bagian *Debt Collector* (Penagih Utang) perusahaanmu.\n\nRumus: **Penjualan Kredit / Rata-rata Piutang**\n\nSebuah perusahaan yang hebat bukan cuma jago *menjual* secara ngutang, tapi juga jago *menagih* utang itu kembali jadi uang tunai.\nJika AR Turnover-mu sangat rendah, artinya pelangganmu menunggak bayar berbulan-bulan. Laba di Laporan Laba Rugi membengkak indah, tapi tidak pernah berubah wujud menjadi Kas di Neraca.\n\nInilah jawaban dari skenario Challenge kita tadi: Perusahaan ber-ROE 35% tapi Current Ratio-nya hancur pasti karena AR Turnover mereka amat sangat buruk!",
              keyTakeaway: "AR Turnover mengukur efisiensi penagihan kas. Piutang yang tak kunjung ditagih lama-lama akan menjadi 'Piutang Tak Tertagih' yang harus dihapus dan menghancurkan laba."
            },
            {
              slideNumber: 12,
              type: "lesson",
              title: "Analisis DuPont: Membedah ROE",
              content: "Model DuPont adalah teknik dewa dari analis Wall Street untuk membongkar jeroan ROE. \nMereka tidak mau dibodohi oleh ROE tinggi yang dihasilkan lewat utang gila-gilaan.\n\nRumus DuPont memecah ROE menjadi 3 komponen perkalian:\n**ROE = (Net Profit Margin) x (Asset Turnover) x (Equity Multiplier)**\n\n1. *Net Margin:* Efisiensi operasi (Untung dari penjualan bersih)\n2. *Asset Turnover:* Efisiensi pemakaian aset (Laku terjual berapa kali)\n3. *Equity Multiplier:* Seberapa banyak utang (leverage) yang dipakai.\n\nJika ROE sebuah perusahaan melonjak dari 15% ke 30%, analis DuPont akan membedahnya. Jika naiknya karena 'Equity Multiplier' yang naik drastis, artinya direktur diam-diam berhutang gila-gilaan untuk memoles laba semu. Ini manipulasi yang sangat berbahaya!",
              keyTakeaway: "Analisis DuPont membongkar kedok di balik tingginya ROE: Apakah perusahaan itu benar-benar efisien (margin/turnover tinggi), ataukah mereka cuma menumpuk bom waktu berupa utang (multiplier tinggi)?"
            },
            {
              slideNumber: 13,
              type: "example",
              title: "Kelemahan Analisis Rasio",
              content: "Meskipun rasio keuangan sangat kuat, jangan pernah menelannya mentah-mentah bak kitab suci. \nRasio keuangan hanyalah alat bantu historis yang melihat masa lalu, bukan bola kristal masa depan.\n\n**Jebakan Analisis Rasio:**\n1. **Perbedaan Industri:** Kamu tidak bisa membandingkan DER Perbankan dengan DER Toko Kue. (Bank memang industri yang hidup dari utang simpanan nasabah, jadi wajar DER-nya tembus 10x).\n2. **Inflasi:** Neraca mencatat Harta Tetap (seperti tanah) menggunakan *Harga Beli Masa Lalu*. Tanah yang dibeli tahun 1990 senilai Rp 10 Juta, di Neraca 2026 angkanya tetap Rp 10 Juta! Ini membuat Rasio ROA dan ROE bisa menjadi terdistorsi.\n3. **Kreativitas Akuntansi:** Manajemen bisa memajukan/memundurkan pengakuan pendapatan (Window Dressing) untuk memanipulasi rasio Current Ratio di akhir tahun.",
              keyTakeaway: "Rasio keuangan itu seperti skor pertandingan babak pertama. Sangat berguna sebagai evaluasi, tetapi tidak bisa menjamin kemenangan mutlak di babak kedua tanpa memahami konteks industrinya."
            },
            {
              slideNumber: 14,
              type: "lesson",
              title: "Rangkuman Modul 3",
              content: "Selamat! Pemahamanmu kini setara dengan analis riset pemula di firma investasi:\n\n- **Likuiditas (Current & Quick Ratio)**: Detektor oksigen (kas). Bisa bayar utang bulan depan nggak?\n- **Solvabilitas (DER)**: Detektor bom waktu. Berapa banyak bisnis didikte oleh rentenir/kreditur jangka panjang?\n- **Profitabilitas (NPM & ROE)**: Mesin turbo kekayaan. Seberapa sadis perusahaan memeras keringat aset dan modal pemegang saham menjadi uang sisa bersih.\n- **Efisiensi (Inventory & AR Turnover)**: Detektor kelincahan. Seberapa galak jualan di gudang dan seberapa ganas *debt collector* menagih piutang.\n\nJangan pernah membaca satu rasio sendirian. Rasio harus selalu dibandingkan secara runut waktu (tahun lalu vs tahun ini) dan dibandingkan bersilang (kompetitor A vs kompetitor B di industri yang sama).",
              keyTakeaway: "Akuntansi adalah bahasanya, Laporan Keuangan adalah bukunya, dan Analisis Rasio adalah kacamata untuk memahami pesan rahasia di dalam buku tersebut."
            },
            {
              slideNumber: 15,
              type: "quiz",
              title: "Ujian Akhir Spesialis Akuntansi",
              content: "Buktikan kapabilitasmu! AI kami akan menguji penguasaan lintas-modulmu, mulai dari Jurnal Debit-Kredit, Arus Kas, hingga Analisis DuPont. Mari berjuang!",
              quiz: { questions: [], passingScore: 80, totalQuestions: 5, timeLimit: 300 }
            }
          ],
          quizBank: []
        }
      }
    ]
  }
];
