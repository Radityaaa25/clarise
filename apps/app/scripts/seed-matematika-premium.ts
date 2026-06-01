import { createCourse, prisma, type ModuleInput } from "./_seed-helpers";

// Premium → quiz TANPA quizBank (AI generate dinamis).
const quiz = (): import("./_seed-helpers").SlideInput => ({
  type: "quiz",
  title: "Kuis: Uji Pemahamanmu",
  body: "Validasi pemahamanmu sebelum lanjut. Soal akan disusun khusus untukmu.",
});

const MOD1: ModuleInput = {
  title: "Membaca Data: Mean, Median, dan Modus",
  slug: "ukuran-pemusatan-data",
  xpReward: 80,
  slides: [
    {
      type: "lesson",
      title: "Kenapa 'Rata-rata' Sering Menipu",
      keyTakeaway:
        "Satu angka rata-rata bisa menyembunyikan kenyataan; kita butuh cara membaca data yang lebih jujur.",
      body: `Pernah dengar "gaji rata-rata di perusahaan itu Rp15 juta", lalu kamu masuk dan ternyata kebanyakan orang digaji Rp6 juta? Kamu tidak ditipu angkanya — kamu ditipu oleh cara angka itu dibaca. Inilah kenapa statistika dasar adalah keterampilan bertahan hidup di era data.

Setiap hari kita dibanjiri klaim berbasis angka: "rata-rata pelanggan puas", "mayoritas memilih A", "biasanya begini". Tanpa kemampuan membaca data, kita gampang digiring oleh angka yang dipilih untuk meyakinkan, bukan untuk menjelaskan.

Di modul ini kita belajar tiga "ukuran pemusatan" — tiga cara meringkas segunung data menjadi satu angka yang mewakili: **mean (rata-rata), median (nilai tengah), dan modus (yang paling sering)**. Ketiganya menjawab pertanyaan "angka mana yang paling mewakili kumpulan ini?" — tapi dengan cara berbeda, dan kadang memberi jawaban yang sangat berbeda pula.

Memahami kapan memakai yang mana akan mengubahmu dari konsumen angka yang pasif menjadi pembaca data yang kritis — orang yang bertanya "rata-rata yang mana, nih?" saat orang lain mengangguk percaya. Mari mulai dari yang paling familiar: mean.`,
      sources: [
        {
          type: "DOCUMENTATION",
          title: "Statistika — Wikipedia Bahasa Indonesia",
          url: "https://id.wikipedia.org/wiki/Statistika",
        },
        {
          type: "YOUTUBE",
          title: "Kok Bisa? / Jendela Sains — Statistika (channel Indonesia)",
          url: "https://www.youtube.com/@kokbisa",
        },
      ],
    },
    {
      type: "lesson",
      title: "Mean: Rata-rata yang Kita Kenal",
      keyTakeaway:
        "Mean = jumlah semua nilai dibagi banyaknya data. Ia memperhitungkan setiap angka.",
      body: `Mean (rata-rata hitung) adalah ukuran pemusatan yang paling sering dipakai. Rumusnya sederhana: **jumlahkan semua nilai, lalu bagi dengan banyaknya data.**

Mean = (jumlah semua nilai) ÷ (banyak data)

Contoh: nilai ulangan 5 siswa adalah 70, 80, 90, 60, 100. Jumlahnya 400, banyak data 5, jadi mean = 400 ÷ 5 = 80.

Analogi yang bagus: mean adalah "pemerataan". Bayangkan 5 anak punya jumlah permen berbeda, lalu semua permen dikumpulkan dan dibagi rata. Jumlah yang diterima tiap anak setelah pemerataan itulah mean. Itu sebabnya mean memperhitungkan SETIAP nilai — setiap permen ikut dihitung ulang.

Justru di situlah letak kekuatan sekaligus kelemahannya. Karena mean memakai semua nilai, satu angka ekstrem (sangat besar atau sangat kecil) bisa menariknya jauh dari kenyataan kebanyakan orang. Bayangkan kalau satu anak membawa 1.000 permen — pemerataannya jadi tidak mewakili anak-anak lain.

Mean sangat berguna saat data relatif seragam tanpa nilai ekstrem. Tapi begitu ada "pencilan", kita butuh ukuran lain yang lebih tahan banting. Sebelum ke sana, mari pastikan dulu kita lancar menghitung mean.`,
    },
    {
      type: "example",
      title: "Latihan Menghitung Mean",
      keyTakeaway:
        "Mean berguna untuk data seragam, tapi 'menggeser' saat ada nilai ekstrem.",
      body: `Mari berlatih dengan kasus nyata.

**Kasus 1 — penjualan harian warung (seragam).** Senin–Jumat terjual: 20, 22, 19, 21, 18 porsi.
Jumlah = 100. Banyak data = 5. Mean = 100 ÷ 5 = 20 porsi/hari.
Di sini mean 20 sangat mewakili — semua hari memang dekat 20.

**Kasus 2 — sama, tapi ada hari ekstrem.** Misal Sabtu ada pesanan kantor besar: 20, 22, 19, 21, 18, 100.
Jumlah = 200. Banyak data = 6. Mean = 200 ÷ 6 ≈ 33,3 porsi/hari.
Perhatikan: sekarang mean (33,3) lebih tinggi dari HAMPIR SEMUA hari biasa! Tidak ada satu pun hari kerja yang mencapai 33 porsi. Satu hari ekstrem (100) "menyeret" rata-rata ke atas.

Inilah pelajaran kuncinya: **mean bisa menjadi angka yang tidak diwakili oleh satu data pun.** Kalau kamu melaporkan "rata-rata penjualan kita 33 porsi" ke bos, ia bisa salah paham menganggap setiap hari laris, padahal hanya satu hari yang istimewa.

Pertanyaan retoris: kalau mean bisa menyesatkan begini, ukuran apa yang lebih jujur menggambarkan "hari biasa"? Jawabannya adalah median.`,
    },
    {
      type: "lesson",
      title: "Median: Sang Nilai Tengah yang Tahan Banting",
      keyTakeaway:
        "Median adalah nilai yang berada tepat di tengah saat data diurutkan — kebal terhadap nilai ekstrem.",
      body: `Median adalah nilai yang berada **tepat di tengah** ketika semua data diurutkan dari kecil ke besar. Ia membagi data menjadi dua bagian sama banyak: separuh di bawahnya, separuh di atasnya.

**Cara mencari median:**
1. Urutkan data dari terkecil ke terbesar.
2. Kalau jumlah data ganjil → median = nilai paling tengah.
3. Kalau genap → median = rata-rata dua nilai tengah.

Contoh ganjil: 18, 19, 20, 21, 22 → nilai tengah (posisi ke-3) = 20. Median = 20.

Contoh genap: 18, 19, 20, 21, 22, 100 → dua nilai tengah adalah 20 dan 21 → median = (20 + 21) ÷ 2 = 20,5.

Lihat keajaibannya: pada data dengan pencilan 100 tadi, mean melonjak ke 33,3 tapi **median tetap 20,5** — sangat dekat dengan hari-hari biasa! Median tidak peduli seberapa ekstrem nilai tertinggi; ia hanya peduli posisi tengah. Itulah kenapa median disebut "tahan banting" (robust) terhadap outlier.

Analogi: bayangkan kamu mengantre. Median adalah orang yang persis di tengah barisan — tidak peduli orang paling depan itu raksasa atau orang paling belakang itu kerdil, posisi tengah tetap sama.

Karena sifat ini, median sering jauh lebih jujur untuk data yang "miring" seperti gaji, harga rumah, atau kekayaan. Mari buktikan dengan kasus gaji.`,
    },
    {
      type: "example",
      title: "Mean vs Median: Kasus Gaji yang Menyesatkan",
      keyTakeaway:
        "Untuk data dengan pencilan besar (gaji, harga), median lebih mewakili daripada mean.",
      body: `Sebuah tim kecil punya 5 orang dengan gaji bulanan (juta rupiah): 6, 6, 7, 8, dan 1 bos dengan 53.

**Hitung mean:** (6 + 6 + 7 + 8 + 53) ÷ 5 = 80 ÷ 5 = 16 juta.
Kalau perusahaan beriklan "gaji rata-rata Rp16 juta", secara teknis benar — tapi sangat menyesatkan. Tak ada satu pun karyawan biasa yang mendapat 16 juta; mereka di kisaran 6–8 juta. Angka 16 juta "ditarik" oleh gaji bos (53).

**Hitung median:** urutkan → 6, 6, 7, 8, 53. Nilai tengah (posisi ke-3) = 7 juta.
Median 7 juta jauh lebih mewakili pengalaman karyawan biasa.

Inilah kenapa lembaga statistik serius (misalnya soal pendapatan penduduk) lebih sering melaporkan **median** ketimbang mean: karena distribusi pendapatan selalu miring oleh segelintir orang super kaya.

Pelajaran yang sering mengejutkan: ketika seseorang menyebut "rata-rata", langkah kritismu adalah bertanya — "mean atau median? Apakah ada nilai ekstrem yang menggeser angka ini?" Pertanyaan sederhana ini melindungimu dari banyak klaim yang menyesatkan, baik di iklan lowongan kerja maupun di berita.

Tapi mean dan median sama-sama belum menjawab satu pertanyaan: nilai apa yang PALING SERING muncul? Untuk itu kita butuh modus.`,
    },
    {
      type: "lesson",
      title: "Modus: Sang Juara Frekuensi",
      keyTakeaway:
        "Modus adalah nilai yang paling sering muncul — satu-satunya ukuran yang cocok untuk data kategori.",
      body: `Modus adalah nilai yang **paling sering muncul** dalam sekumpulan data. Kalau mean soal "pemerataan" dan median soal "posisi tengah", modus soal "popularitas".

Contoh: ukuran sepatu yang terjual di toko hari ini: 39, 40, 40, 41, 40, 42, 39. Angka 40 muncul tiga kali (terbanyak). Maka modus = 40.

Modus punya keistimewaan yang tidak dimiliki mean dan median: **ia satu-satunya yang bisa dipakai untuk data non-angka (kategori).** Kamu tidak bisa menghitung "mean warna favorit" atau "median rasa es krim" — tapi kamu bisa menemukan modusnya: warna atau rasa yang paling banyak dipilih.

Karena itu modus sangat berharga untuk keputusan praktis:
- Toko sepatu memesan stok terbanyak untuk ukuran 40 (modus) — bukan untuk "rata-rata ukuran 40,3" yang tak ada sepatunya.
- Warung menyetok menu yang paling laku (modus pesanan).
- Survei menemukan jawaban paling populer.

Catatan: data bisa punya lebih dari satu modus (bimodal) atau tanpa modus sama sekali (semua nilai muncul sama banyak). Ini bukan kelemahan, justru informasi: data bimodal sering menandakan ada DUA kelompok berbeda yang tercampur.

Sekarang kita punya tiga alat. Tapi memilih alat yang salah bisa berakibat fatal — seperti yang akan kita lihat pada studi kasus berikut.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Klaim 'Rata-rata' di Dunia Nyata",
      keyTakeaway:
        "Pemilihan ukuran pemusatan bisa dipakai untuk menyesatkan — atau mencerahkan.",
      body: `Mari bedah sebuah skenario yang mirip kejadian nyata.

**Situasi.** Sebuah bootcamp coding beriklan: "Lulusan kami bergaji rata-rata Rp25 juta/bulan!" Angka itu menarik ribuan pendaftar. Tapi seorang calon yang kritis menyelidiki datanya.

**Yang ditemukan.** Dari 100 lulusan: 95 orang bekerja dengan gaji 5–9 juta, 4 orang menganggur (0), dan 1 orang kebetulan diterima di perusahaan teknologi luar negeri dengan gaji setara Rp400 juta/bulan.

**Membongkar angkanya:**
- **Mean** ditarik habis-habisan oleh satu outlier Rp400 juta, menghasilkan angka ~Rp25 juta yang dipakai di iklan. Secara teknis benar, secara jujur menyesatkan.
- **Median** (nilai tengah dari 100 data) jatuh di sekitar Rp7 juta — gambaran realistis pengalaman lulusan biasa.
- **Modus** ada di kisaran Rp6 juta — gaji yang paling sering diterima.

**Pelajaran counterintuitive:** angka yang sama (data lulusan) bisa "diceritakan" sangat berbeda tergantung ukuran yang dipilih. Iklan memilih mean karena paling besar. Pembaca cerdas menuntut median/modus untuk gambaran jujur.

Ini bukan soal matematika rumit — ini soal **literasi**. Diskusi: kalau kamu jadi calon murid, pertanyaan tajam apa yang akan kamu ajukan ke bootcamp itu sebelum mendaftar? Sekarang giliranmu mempraktikkan penilaian ini.`,
    },
    {
      type: "challenge",
      title: "Challenge: Pilih Ukuran yang Jujur",
      body: `Saatnya berpikir seperti analis data yang jujur. Kamu diberi sebuah dataset dan harus memutuskan ukuran pemusatan mana yang paling tepat, lengkap dengan alasannya.`,
      challenge: {
        instruction:
          "Sebuah agen properti punya data harga 7 rumah terjual bulan ini (dalam juta rupiah): 400, 450, 420, 430, 410, 440, dan 5.000 (satu vila mewah). (1) Hitung mean dan median dari data ini. (2) Jelaskan mengapa keduanya sangat berbeda. (3) Jika kamu menasihati pembeli rumah biasa tentang 'harga khas di area ini', ukuran mana yang kamu pakai dan KENAPA?",
        inputType: "math",
        inputPlaceholder:
          "Mean = ... ; Median = ... ; Alasan beda: ... ; Ukuran untuk pembeli: ... karena ...",
        starterCode: "",
        expectedConcepts: [
          "Perhitungan mean (jumlah ÷ 7) dengan benar",
          "Perhitungan median (urutkan, ambil nilai tengah ke-4)",
          "Penjelasan pengaruh outlier 5.000 terhadap mean",
          "Rekomendasi median untuk 'harga khas' beserta alasannya",
        ],
        evaluationCriteria:
          "Periksa: (1) MEAN = (400+450+420+430+410+440+5000)/7 = 7550/7 ≈ 1.078,6 juta. (2) MEDIAN: urut → 400,410,420,430,440,450,5000; nilai tengah (ke-4) = 430 juta. (3) Harus menjelaskan bahwa outlier 5.000 (vila) menarik mean naik drastis sehingga mean ~1.078 juta tidak mewakili rumah biasa. (4) Untuk 'harga khas' harus memilih MEDIAN (430 juta) dengan alasan tahan terhadap outlier/lebih mewakili. Beri 90-100 jika mean & median benar DAN memilih median dengan alasan tepat. Beri 70-85 jika perhitungan benar tapi alasan dangkal, atau salah kecil pada mean tapi median & penalaran benar. Jika memilih mean untuk harga khas, atau median salah, skor < 55. Toleransi pembulatan wajar.",
        hints: [
          "Mean: jumlahkan ketujuh angka lalu bagi 7. Median: urutkan dulu, lalu ambil angka yang persis di tengah (data ke-4 dari 7).",
          "Bandingkan: apakah mean dekat dengan kebanyakan rumah (400-450) atau jauh di atasnya? Apa penyebabnya?",
          "Untuk 'harga khas yang mewakili rumah biasa', ukuran yang tidak terganggu oleh satu vila ekstrem adalah pilihan paling jujur.",
        ],
        sampleAnswer:
          "Mean = (400+450+420+430+410+440+5000)/7 = 7550/7 ≈ 1.078,6 juta. Median: urut 400,410,420,430,440,450,5000 → nilai tengah ke-4 = 430 juta. Keduanya beda jauh karena satu vila 5.000 juta (outlier) menarik mean naik drastis, padahal 6 rumah lain di kisaran 400-450. Untuk menasihati pembeli biasa soal 'harga khas', aku pakai MEDIAN (430 juta) karena tahan terhadap outlier dan benar-benar mewakili mayoritas rumah; memakai mean (~1.078 juta) akan menyesatkan seolah rumah di sana sangat mahal.",
        followUpQuestion:
          "Jika agen itu justru INGIN membuat area terlihat 'mewah & mahal' di iklan, ukuran mana yang akan ia pilih, dan apakah itu etis?",
      },
    },
    {
      type: "lesson",
      title: "Pembahasan Challenge & Kesalahan Umum",
      keyTakeaway:
        "Pilih ukuran sesuai bentuk data: ada-tidaknya outlier menentukan mean atau median.",
      body: `Mari bedah tantangan tadi dan kesalahan yang paling sering muncul.

**Jawaban benar:** mean ≈ 1.078,6 juta, median = 430 juta. Bedanya jauh karena vila 5.000 juta menarik mean ke atas, sementara median (nilai tengah) tak terpengaruh. Untuk "harga khas", median jelas lebih jujur.

**Kesalahan 1: Lupa mengurutkan sebelum cari median.** Banyak yang mengambil "angka tengah dalam daftar asli" (430 kebetulan benar di sini, tapi sering salah kalau tak diurutkan). Median SELALU butuh pengurutan dulu.

**Kesalahan 2: Menganggap mean selalu 'paling benar'.** Mean bukan jahat — ia tepat untuk data seragam. Yang salah adalah memakainya membabi buta pada data ber-outlier. Alat yang tepat tergantung bentuk data.

**Kesalahan 3: Tidak memeriksa adanya outlier.** Sebelum memilih ukuran, lihat dulu datanya: ada nilai yang jauh menyendiri? Kalau ya, waspadai mean.

**Soal follow-up (etika):** kalau agen ingin terlihat mewah, ia akan memilih **mean** (~1.078 juta) karena terlihat tinggi. Secara teknis bukan kebohongan, tapi secara etika **menyesatkan** karena sengaja memilih ukuran yang tidak mewakili demi kesan tertentu. Inilah kenapa literasi statistik penting: angka tidak berbohong, tapi orang bisa memilih angka mana yang ditampilkan.

Lalu, adakah panduan praktis kapan memakai masing-masing ukuran? Ada, dan itu sederhana.`,
    },
    {
      type: "lesson",
      title: "Panduan Praktis: Kapan Pakai yang Mana",
      keyTakeaway:
        "Mean untuk data seragam, median untuk data miring/ber-outlier, modus untuk data kategori.",
      body: `Setelah memahami ketiganya, inilah panduan ringkas yang bisa kamu pakai seumur hidup:

**Pakai MEAN ketika:**
- Data relatif seragam, tanpa nilai ekstrem.
- Kamu butuh memperhitungkan setiap nilai (mis. menghitung total/anggaran: total = mean × banyak data).
Contoh: rata-rata tinggi badan siswa satu kelas, rata-rata nilai ulangan yang nilainya berdekatan.

**Pakai MEDIAN ketika:**
- Data miring atau punya outlier besar.
- Kamu ingin gambaran "yang khas/biasa".
Contoh: gaji, harga rumah, kekayaan, waktu tunggu — semua cenderung punya ekor panjang.

**Pakai MODUS ketika:**
- Data berupa kategori (warna, merek, ukuran, pilihan).
- Kamu peduli "yang paling populer/sering".
Contoh: ukuran baju paling laku, menu favorit, jawaban survei terbanyak.

Trik cepat: **lihat dulu sebaran datanya.** Kalau ada angka yang "menyendiri jauh", curigai mean dan beralih ke median. Kalau datanya bukan angka, otomatis modus.

Satu lagi: tidak ada larangan melaporkan ketiganya sekaligus. Justru analis yang baik sering menyajikan mean DAN median berdampingan, karena perbedaan keduanya sendiri adalah informasi berharga — ia memberi tahu seberapa miring datanya. Mari lihat ketiganya bekerja bersama.`,
    },
    {
      type: "example",
      title: "Tiga Ukuran Bekerja Bersama",
      keyTakeaway:
        "Membandingkan mean dan median langsung memberi tahu arah kemiringan data.",
      body: `Mari hitung ketiganya sekaligus untuk satu data dan baca maknanya.

**Data: jumlah transaksi harian sebuah UMKM selama 9 hari:** 12, 15, 14, 13, 15, 16, 15, 14, 80.
(Hari ke-9 ada bazar besar = 80 transaksi.)

**Mean:** jumlah = 194; banyak data = 9; mean = 194 ÷ 9 ≈ 21,6 transaksi.
**Median:** urutkan → 12, 13, 14, 14, 15, 15, 15, 16, 80. Nilai tengah (ke-5) = 15 transaksi.
**Modus:** nilai yang paling sering = 15 (muncul 3 kali).

**Membaca hasilnya:**
- Median (15) dan modus (15) sepakat: hari biasa sekitar 15 transaksi. Ini gambaran jujur.
- Mean (21,6) jauh lebih tinggi — sinyal bahwa ada outlier yang menariknya (hari bazar 80).

Inilah trik membaca cepat: **kalau mean jauh lebih besar dari median, datanya miring ke kanan (ada nilai besar yang menarik).** Kalau mean jauh lebih kecil dari median, miring ke kiri. Kalau mean ≈ median, datanya relatif simetris.

Jadi tanpa melihat grafik pun, sekadar membandingkan mean dan median sudah memberitahumu bentuk datanya. Untuk laporan ke pemilik UMKM: "hari biasa sekitar 15 transaksi (median), dengan satu hari bazar luar biasa 80." Jauh lebih informatif daripada cuma "rata-rata 21,6".

Tapi outlier seperti angka 80 ini — apakah selalu "pengganggu" yang harus diwaspadai? Mari pahami perannya lebih dalam.`,
    },
    {
      type: "lesson",
      title: "Memahami Outlier (Pencilan)",
      keyTakeaway:
        "Outlier bukan sekadar pengganggu — kadang justru informasi paling penting.",
      body: `Outlier (pencilan) adalah nilai yang jauh berbeda dari kumpulan data lainnya. Kita sudah lihat bagaimana ia menyeret mean. Tapi penting dipahami: **outlier tidak selalu kesalahan yang harus dibuang.**

Ada dua jenis outlier:

**1. Outlier karena kesalahan.** Salah input data, alat rusak, atau salah ketik. Contoh: tinggi badan tercatat "1750 cm" (jelas typo untuk 175 cm). Ini wajar dibersihkan/diperbaiki sebelum analisis.

**2. Outlier yang nyata dan bermakna.** Hari bazar dengan 80 transaksi itu BENAR terjadi — ia bukan kesalahan. Membuangnya begitu saja malah menghilangkan informasi penting (ternyata bazar sangat efektif!).

Maka aturannya: **jangan otomatis membuang outlier.** Selidiki dulu: apakah ini error atau fenomena nyata? Kalau nyata, ia mungkin justru temuan paling berharga — pelanggan terbesarmu, hari paling laris, atau anomali yang menandakan peluang/masalah.

Strategi pelaporan yang baik:
- Gunakan median untuk menggambarkan "kondisi khas".
- TAPI sebutkan outlier-nya secara terpisah, jangan disembunyikan: "hari biasa 15 transaksi; saat bazar melonjak ke 80."

Dengan begitu kamu jujur dua kali: jujur tentang kondisi normal, dan jujur tentang yang luar biasa. Analis pemula membuang outlier; analis bijak menginterogasinya. Mari kita lihat bagaimana semua ini dipakai untuk membaca klaim di sekitarmu.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Membaca Berita & Iklan Secara Kritis",
      keyTakeaway:
        "Literasi statistik dasar melindungimu dari klaim angka yang menyesatkan setiap hari.",
      body: `Statistika dasar bukan cuma untuk ujian — ia tameng harian melawan manipulasi angka. Mari latih mata kritis dengan beberapa klaim umum.

**Klaim 1: "Pengguna kami menghemat rata-rata Rp2 juta/tahun!"** Pertanyaan kritis: mean atau median? Mungkin segelintir pengguna berat menghemat sangat banyak sehingga menyeret mean, sementara pengguna biasa menghemat jauh lebih sedikit. Tanya: "berapa median penghematannya?"

**Klaim 2: "9 dari 10 dokter merekomendasikan."** Pertanyaan kritis: 10 dokter dari mana? Dipilih bagaimana? Sampel kecil dan tidak acak bisa diatur hasilnya. Ukuran & cara pengambilan sampel menentukan kredibilitas.

**Klaim 3: "Penjualan naik 200%!"** Naik dari berapa? Dari 1 menjadi 3 unit juga "naik 200%". Persentase tanpa angka dasar (baseline) sering mengesankan padahal kecil.

**Pola yang berulang:** angka-angka ini jarang bohong secara teknis, tapi sering **memilih cara penyajian yang paling meyakinkan**. Senjatamu cukup beberapa pertanyaan: "Mean atau median? Sampelnya berapa dan bagaimana diambil? Naik dari angka dasar berapa?"

Pelajaran besarnya: orang yang melek statistik dasar tidak mudah dibodohi — bukan karena ia jago hitung, tapi karena ia tahu pertanyaan apa yang harus diajukan. Kemampuan ini bernilai jauh lebih mahal daripada harga kursus mana pun. Mari rangkum modul ini.`,
    },
    {
      type: "summary",
      title: "Rangkuman: Membaca Pusat Data",
      keyTakeaway:
        "Mean, median, modus menjawab pertanyaan berbeda; memilih yang tepat adalah inti literasi data.",
      body: `Mari padatkan modul pertama ini.

**Tiga insight terpenting:**
1. **Tiga ukuran, tiga pertanyaan berbeda.** Mean = "kalau diratakan"; Median = "yang di tengah/khas"; Modus = "yang paling sering/populer". Memberi data yang sama ke tiga ukuran bisa menghasilkan tiga cerita berbeda.
2. **Outlier adalah penentu.** Pada data dengan nilai ekstrem (gaji, harga), mean menyesatkan dan median lebih jujur. Trik cepat: kalau mean jauh ≠ median, datamu miring oleh outlier.
3. **Literasi > perhitungan.** Nilai sebenarnya bukan menghitung mean (kalkulator bisa), tapi tahu KAPAN memakai yang mana dan pertanyaan kritis apa yang diajukan saat melihat klaim angka.

**Yang sering disalahpahami:** orang mengira "rata-rata" selalu berarti mean dan selalu mewakili. Padahal kata "rata-rata" itu ambigu, dan tidak ada satu angka yang selalu jujur untuk semua data.

**Aplikasi langsung:** minggu ini, saat kamu melihat klaim berbasis "rata-rata" (di iklan, berita, atau media sosial), berhentilah sejenak dan tanyakan: mean atau median? Adakah outlier yang menggesernya? Kebiasaan kecil ini akan menajamkan pikiranmu.

Kita sudah bisa menemukan pusat data. Tapi pusat saja belum cukup — dua kelompok bisa punya rata-rata sama persis namun sangat berbeda. Untuk memahaminya, kita perlu mengukur SEBARAN, topik modul berikutnya. Buktikan dulu pemahamanmu lewat kuis!`,
    },
    quiz(),
  ],
};

const MOD2: ModuleInput = {
  title: "Sebaran Data: Seberapa Menyebar?",
  slug: "sebaran-data",
  xpReward: 80,
  slides: [
    {
      type: "lesson",
      title: "Dua Kelas, Rata-rata Sama, Cerita Beda",
      keyTakeaway:
        "Pusat data saja tidak cukup; sebaran (dispersi) mengungkap apa yang disembunyikan rata-rata.",
      body: `Bayangkan dua kelas yang sama-sama punya nilai rata-rata ujian 70.
- Kelas A: nilainya 68, 70, 71, 69, 72 — semua dekat 70.
- Kelas B: nilainya 40, 100, 50, 95, 65 — naik turun liar, tapi rata-ratanya juga 70.

Kalau kamu hanya melihat "rata-rata 70", kedua kelas tampak identik. Padahal kenyataannya jauh berbeda! Kelas A homogen dan stabil; Kelas B penuh kesenjangan — ada yang sangat pintar, ada yang sangat tertinggal. Seorang guru yang cuma melihat rata-rata akan salah mengambil tindakan.

Inilah pelajaran besar modul ini: **ukuran pemusatan (mean/median) memberitahu PUSAT data, tapi tidak memberitahu seberapa MENYEBAR data itu.** Dua hal yang sama sekali berbeda.

Sebaran (dispersi) menjawab pertanyaan: "Seberapa jauh data berpencar dari pusatnya?" Jawabannya krusial di mana-mana:
- Investasi: dua produk bisa punya return rata-rata sama, tapi yang satu jauh lebih berisiko (lebih menyebar).
- Kualitas produk: rata-rata berat keripik 100 gram, tapi apakah konsisten atau ada yang 70 ada yang 130?
- Layanan: waktu tunggu rata-rata 10 menit terdengar oke, tapi kalau kadang 2 menit kadang 40 menit, pengalaman pelanggan buruk.

Di modul ini kita belajar mengukur sebaran: dari yang sederhana (range) sampai yang powerful (standar deviasi). Mari mulai dari yang paling mudah.`,
      sources: [
        {
          type: "DOCUMENTATION",
          title: "Simpangan baku — Wikipedia Bahasa Indonesia",
          url: "https://id.wikipedia.org/wiki/Simpangan_baku",
        },
        {
          type: "YOUTUBE",
          title: "Jendela Sains — Statistika & Data (channel Indonesia)",
          url: "https://www.youtube.com/@jendelasains",
        },
      ],
    },
    {
      type: "lesson",
      title: "Range: Ukuran Sebaran Paling Sederhana",
      keyTakeaway:
        "Range = nilai tertinggi − terendah. Cepat dihitung, tapi sangat sensitif outlier.",
      body: `Cara paling sederhana mengukur sebaran adalah **range (jangkauan)**: selisih antara nilai tertinggi dan terendah.

Range = nilai maksimum − nilai minimum

Kembali ke dua kelas tadi:
- Kelas A: max 72, min 68 → range = 72 − 68 = 4. Sempit = data rapat.
- Kelas B: max 100, min 40 → range = 100 − 40 = 60. Lebar = data menyebar jauh.

Hanya dengan satu angka, range langsung mengungkap perbedaan yang disembunyikan oleh "rata-rata 70". Kelas B punya range 15 kali lebih lebar — bukti adanya kesenjangan besar.

Kelebihan range: sangat cepat dan intuitif. Kamu bisa hitung di kepala. Berguna untuk gambaran kasar: rentang suhu harian, rentang harga di pasar, rentang waktu tempuh.

Tapi range punya kelemahan serius: **ia hanya melihat dua nilai ekstrem dan mengabaikan semua data di tengah.** Satu outlier langsung meledakkan range. Contoh: gaji 6, 6, 7, 8, 53 (juta) punya range 53 − 6 = 47 — kesan sebaran sangat besar, padahal 4 dari 5 orang sebenarnya rapat di 6–8.

Jadi range bagus untuk gambaran cepat, tapi mudah menyesatkan kalau ada pencilan. Kita butuh ukuran yang lebih "tahan banting" dan melihat lebih banyak data. Untuk itu kita pakai kuartil.`,
    },
    {
      type: "example",
      title: "Latihan Range & Keterbatasannya",
      keyTakeaway:
        "Range cocok untuk gambaran cepat, tapi tak menggambarkan bagaimana data tersebar di dalamnya.",
      body: `Mari berlatih dan melihat kapan range cukup, kapan tidak.

**Kasus cocok — suhu kota seminggu (Celcius):** 30, 31, 29, 32, 30, 31, 33.
Max 33, min 29 → range = 4 derajat. Range 4 derajat di sini informatif: suhu cukup stabil, beda terjauh cuma 4 derajat. Untuk keperluan "perlu bawa jaket atau tidak", range sudah memadai.

**Kasus menyesatkan — durasi pengiriman (hari) sebuah toko online:** 2, 2, 3, 2, 3, 2, 14.
Max 14, min 2 → range = 12 hari. Kesannya pengiriman tak menentu (rentang 12 hari!). Padahal 6 dari 7 paket sampai dalam 2–3 hari; hanya 1 paket bermasalah 14 hari. Range melebih-lebihkan ketidakpastian karena hanya melihat si 14.

Pelajaran: **range mengukur "selebar apa", bukan "bagaimana isinya tersebar".** Dua data bisa punya range sama tapi sebaran sangat berbeda — satu menumpuk di tengah, satu tersebar merata.

Contoh ekstrem: data {0, 50, 50, 50, 100} dan {0, 1, 50, 99, 100} sama-sama range 100, tapi yang pertama menumpuk di tengah sedangkan yang kedua menyebar ke ujung. Range tak bisa membedakannya.

Karena itu kita perlu cara melihat sebaran di BAGIAN DALAM data, bukan cuma ujung-ujungnya. Solusinya: membagi data menjadi empat bagian — kuartil.`,
    },
    {
      type: "lesson",
      title: "Kuartil & IQR: Melihat Sebaran 'Tengah'",
      keyTakeaway:
        "IQR mengukur sebaran 50% data tengah, sehingga tahan terhadap outlier.",
      body: `Kalau median membagi data menjadi DUA bagian, **kuartil** membaginya menjadi EMPAT bagian sama banyak. Ada tiga titik pembagi:
- **Q1 (kuartil bawah):** memisahkan 25% data terendah.
- **Q2 (median):** titik tengah, 50%.
- **Q3 (kuartil atas):** memisahkan 25% data tertinggi.

Dari sini lahir ukuran sebaran yang sangat berguna: **IQR (Interquartile Range) = Q3 − Q1.** IQR mengukur rentang **50% data yang berada di tengah** — mengabaikan 25% terendah dan 25% tertinggi.

Kenapa ini hebat? Karena dengan membuang 25% ujung di kedua sisi, **IQR otomatis kebal terhadap outlier.** Si pencilan ekstrem ada di luar Q1–Q3, jadi tidak mempengaruhi IQR. Ini seperti median, tapi untuk sebaran.

Analogi: bayangkan menilai "harga khas makanan di food court". Range akan terganggu oleh satu steak mahal dan satu air putih murah. IQR fokus pada 50% menu tengah — gambaran harga yang benar-benar khas.

Kegunaan praktis IQR:
- Membandingkan konsistensi: IQR kecil = data rapat/konsisten; IQR besar = menyebar.
- Mendeteksi outlier secara objektif (akan kita bahas: aturan 1,5 × IQR).
- Dasar dari grafik boxplot yang sering dipakai analis.

Sekarang mari hitung kuartil dengan tangan agar konsepnya benar-benar melekat.`,
    },
    {
      type: "example",
      title: "Menghitung Kuartil Langkah demi Langkah",
      keyTakeaway:
        "Urutkan data, temukan median, lalu cari median dari tiap separuh untuk Q1 dan Q3.",
      body: `Mari hitung kuartil dari data nilai 8 siswa: 60, 70, 75, 80, 85, 90, 95, 100.

**Langkah 1 — pastikan terurut.** (sudah terurut dari kecil ke besar.)

**Langkah 2 — cari Q2 (median).** Data genap (8 angka), dua tengah adalah 80 dan 85. Q2 = (80 + 85) ÷ 2 = 82,5.

**Langkah 3 — cari Q1 (median dari separuh BAWAH).** Separuh bawah: 60, 70, 75, 80. Dua tengahnya 70 dan 75. Q1 = (70 + 75) ÷ 2 = 72,5.

**Langkah 4 — cari Q3 (median dari separuh ATAS).** Separuh atas: 85, 90, 95, 100. Dua tengahnya 90 dan 95. Q3 = (90 + 95) ÷ 2 = 92,5.

**Langkah 5 — hitung IQR.** IQR = Q3 − Q1 = 92,5 − 72,5 = 20.

Cara membacanya: 50% siswa tengah punya nilai antara 72,5 dan 92,5 — rentang 20 poin. Ini gambaran sebaran "inti" kelas, tanpa terganggu nilai terendah/tertinggi.

Bandingkan dua kelas: kalau Kelas X punya IQR 8 dan Kelas Y punya IQR 30, kita tahu Kelas X jauh lebih homogen di bagian tengahnya — meski rata-ratanya mungkin sama.

Catatan: ada beberapa metode kecil yang sedikit berbeda dalam menentukan posisi kuartil, tapi idenya sama. Yang penting kamu paham KONSEPnya: membagi empat, lalu mengukur rentang tengah.

IQR bagus, tapi masih ada satu ukuran sebaran yang paling powerful dan paling banyak dipakai di sains & keuangan: standar deviasi.`,
    },
    {
      type: "lesson",
      title: "Standar Deviasi: Sang Raja Ukuran Sebaran",
      keyTakeaway:
        "Standar deviasi mengukur rata-rata jarak setiap data dari mean — makin besar, makin menyebar.",
      body: `Standar deviasi (simpangan baku) adalah ukuran sebaran paling penting dalam statistika. Idenya elegan: **rata-rata seberapa jauh setiap data menyimpang dari mean.**

Mari pahami intuisinya tanpa terjebak rumus. Langkahnya:
1. Hitung mean (pusat data).
2. Untuk tiap data, ukur jaraknya dari mean (selisihnya).
3. Rata-ratakan jarak-jarak itu (dengan dikuadratkan dulu agar tak saling meniadakan, lalu diakarkan).

Hasilnya satu angka yang menjawab: "rata-rata, data menyimpang sejauh ini dari pusatnya."
- **Standar deviasi kecil** → data menggerombol rapat di sekitar mean (konsisten/stabil).
- **Standar deviasi besar** → data tersebar jauh dari mean (bervariasi/tak menentu).

Kembali ke dua kelas (rata-rata sama 70):
- Kelas A (68–72): tiap nilai sangat dekat 70 → standar deviasi KECIL (sekitar 1,4).
- Kelas B (40–100): nilai jauh dari 70 → standar deviasi BESAR (sekitar 23).

Angka standar deviasi langsung menangkap perbedaan yang tak terlihat dari mean.

Kenapa standar deviasi mengalahkan range/IQR untuk banyak keperluan? Karena ia **memperhitungkan SETIAP data**, bukan cuma ujung atau kuartil. Itu sebabnya sains, keuangan, dan kontrol kualitas mengandalkannya.

Kamu tidak perlu menghitungnya manual untuk paham maknanya — yang penting saat melihat "standar deviasi = X", kamu bisa membaca: makin besar X, makin tak konsisten datanya. Mari lihat kekuatan konsep ini pada keputusan nyata: investasi.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Risiko Investasi = Sebaran",
      keyTakeaway:
        "Return rata-rata sama belum tentu sama amannya; standar deviasi mengukur risikonya.",
      body: `Inilah salah satu penerapan sebaran paling bernilai: mengukur risiko investasi. Konsepnya sederhana — **risiko = seberapa tak menentu (menyebar) hasilnya.**

**Situasi.** Budi membandingkan dua reksa dana, masing-masing dengan return rata-rata tahunan 10% selama 5 tahun terakhir:
- Reksa Dana A: return per tahun = 9%, 11%, 10%, 10%, 10%. Sangat stabil.
- Reksa Dana B: return per tahun = −15%, 35%, −5%, 25%, 0%. Naik-turun liar.

**Rata-rata keduanya sama: 10%.** Kalau Budi hanya melihat rata-rata, ia akan menganggap keduanya identik. Tapi pengalamannya akan sangat berbeda!

- Reksa Dana A punya standar deviasi KECIL → tiap tahun hasilnya dekat 10%, tidur nyenyak.
- Reksa Dana B punya standar deviasi BESAR → ada tahun rugi 15%, ada tahun untung 35%. Jantungan.

**Pelajaran counterintuitive:** dua investasi dengan "rata-rata return sama" bisa punya tingkat risiko yang jauh berbeda. Di dunia keuangan, standar deviasi return secara harfiah dipakai sebagai ukuran risiko (volatilitas). Investor yang cuma melihat rata-rata return tanpa melihat sebarannya sedang menutup mata terhadap risiko.

Pilihan mana yang lebih baik? Tergantung profil Budi: kalau ia butuh uang itu tahun depan, A jauh lebih aman. Kalau ia investasi jangka sangat panjang dan tahan gejolak, B bisa dipertimbangkan.

Inti yang harus melekat: **selalu tanyakan sebaran, bukan cuma rata-rata.** Sekarang giliranmu menerapkannya.`,
    },
    {
      type: "challenge",
      title: "Challenge: Bandingkan Konsistensi Dua Data",
      body: `Saatnya berpikir seperti analis. Kamu harus membandingkan dua kumpulan data dan menyimpulkan mana yang lebih konsisten — menggunakan ukuran sebaran, bukan sekadar rata-rata.`,
      challenge: {
        instruction:
          "Dua karyawan call center dinilai dari waktu penyelesaian (menit) untuk 5 panggilan. Adi: 8, 9, 8, 7, 8. Bima: 2, 14, 5, 12, 7. (1) Hitung mean waktu masing-masing. (2) Hitung range masing-masing. (3) Berdasarkan sebaran (range/variasi), siapa yang lebih KONSISTEN, dan mengapa konsistensi itu penting untuk layanan pelanggan meskipun rata-ratanya mungkin mirip?",
        inputType: "math",
        inputPlaceholder:
          "Mean Adi = ... ; Mean Bima = ... ; Range Adi = ... ; Range Bima = ... ; Lebih konsisten: ... karena ...",
        starterCode: "",
        expectedConcepts: [
          "Perhitungan mean kedua data (Adi = 8; Bima = 8)",
          "Perhitungan range (Adi = 2; Bima = 12)",
          "Kesimpulan Adi lebih konsisten karena sebaran jauh lebih kecil",
          "Alasan kenapa konsistensi/sebaran penting walau mean sama",
        ],
        evaluationCriteria:
          "Periksa: (1) MEAN Adi = (8+9+8+7+8)/5 = 40/5 = 8; MEAN Bima = (2+14+5+12+7)/5 = 40/5 = 8 — keduanya SAMA. (2) RANGE Adi = 9−7 = 2; RANGE Bima = 14−2 = 12. (3) Harus menyimpulkan ADI lebih konsisten karena range/sebarannya jauh lebih kecil (2 vs 12) meski mean sama. (4) Alasan: konsistensi penting karena pengalaman pelanggan lebih dapat diprediksi; Bima kadang sangat cepat kadang sangat lama (12 menit) → tak bisa diandalkan, walau rata-ratanya sama. Beri 90-100 jika mean & range benar untuk keduanya DAN menyimpulkan Adi lebih konsisten dengan alasan tepat (menyinggung sebaran/prediktabilitas). Beri 70-85 jika perhitungan benar tapi alasan dangkal. Jika menyimpulkan dari mean saja (menganggap sama saja) atau range salah, skor < 55.",
        hints: [
          "Hitung dulu mean keduanya — kamu akan menemukan keduanya sama (8). Ini justru intinya: mean tidak cukup.",
          "Range = nilai tertinggi − terendah. Bandingkan range Adi vs Bima untuk melihat siapa yang lebih 'menyebar'.",
          "Konsisten = sebaran kecil. Pikirkan: pelanggan Bima kadang dilayani 2 menit, kadang 14 menit. Apakah layanan seperti itu bisa diandalkan?",
        ],
        sampleAnswer:
          "Mean Adi = (8+9+8+7+8)/5 = 8 menit. Mean Bima = (2+14+5+12+7)/5 = 8 menit — SAMA. Range Adi = 9−7 = 2 menit. Range Bima = 14−2 = 12 menit. Adi jauh lebih KONSISTEN karena sebarannya kecil (range 2 vs 12), meski rata-ratanya identik. Konsistensi penting untuk layanan pelanggan karena pengalaman jadi dapat diprediksi: pelanggan Adi selalu dilayani ~8 menit, sementara pelanggan Bima bisa kebagian 2 menit (beruntung) atau 14 menit (kecewa). Rata-rata yang sama menyembunyikan fakta bahwa layanan Bima tidak bisa diandalkan.",
        followUpQuestion:
          "Jika kamu manajer, apakah kamu akan menilai keduanya sama berdasarkan rata-rata? Apa yang kamu lakukan terhadap data Bima?",
      },
    },
    {
      type: "lesson",
      title: "Pembahasan Challenge & Kesalahan Umum",
      keyTakeaway:
        "Rata-rata identik bisa menyembunyikan perbedaan besar; selalu periksa sebaran.",
      body: `Mari bedah tantangan tadi dan kesalahan yang sering terjadi.

**Jawaban benar:** mean Adi = mean Bima = 8 menit. Range Adi = 2, range Bima = 12. Adi jauh lebih konsisten. Inti pelajaran: dua data dengan mean identik bisa sangat berbeda dalam keandalan.

**Kesalahan 1: Berhenti di mean.** Banyak yang melihat "rata-rata sama 8 menit" lalu menyimpulkan keduanya sama baik. Inilah jebakan yang justru ingin dihancurkan modul ini. Mean tanpa sebaran = setengah cerita.

**Kesalahan 2: Salah hitung range.** Lupa mengurutkan atau salah ambil min/max. Pastikan range = tertinggi − terendah.

**Kesalahan 3: Menganggap "variasi" selalu buruk.** Untuk layanan/kualitas, konsistensi memang penting. Tapi konteks lain (mis. eksplorasi ide) variasi bisa berharga. Yang penting: SADAR akan sebaran dan menafsirkannya sesuai konteks.

**Soal follow-up:** sebagai manajer, menilai keduanya sama berdasarkan rata-rata adalah kesalahan. Data Bima (sangat bervariasi) perlu diselidiki: kenapa kadang 2 menit kadang 14? Mungkin ada jenis panggilan sulit yang tak ia kuasai, atau ia terburu-buru di panggilan cepat. Sebaran besar adalah SINYAL untuk menggali, bukan untuk dihukum buta.

Statistik sebaran mengubah "semua tampak sama" menjadi "ada yang perlu diperhatikan di sini". Kini mari kita lihat cara MEMVISUALKAN sebaran agar mudah dibaca sekilas: boxplot.`,
    },
    {
      type: "lesson",
      title: "Membaca Boxplot (Diagram Kotak Garis)",
      keyTakeaway:
        "Boxplot meringkas sebaran data (kuartil, median, outlier) dalam satu gambar ringkas.",
      body: `Boxplot adalah cara visual yang ringkas untuk melihat sebaran data sekilas. Sekali kamu bisa membacanya, kamu bisa memahami sekumpulan data dalam dua detik. Mari pahami bagian-bagiannya (bayangkan gambar kotak dengan garis menjulur ke kiri-kanan):

- **Kotak (box):** membentang dari Q1 ke Q3. Lebar kotak = IQR = rentang 50% data tengah. Kotak sempit = data rapat; kotak lebar = menyebar.
- **Garis di dalam kotak:** median (Q2). Posisinya menunjukkan kemiringan: kalau median dekat sisi kiri kotak, data condong ke nilai kecil.
- **"Kumis" (whiskers):** garis menjulur dari kotak ke nilai terendah & tertinggi yang masih "wajar".
- **Titik di luar kumis:** outlier — nilai yang dianggap pencilan.

Kekuatan boxplot: kamu bisa **membandingkan banyak kelompok berdampingan** dengan mudah. Misal boxplot nilai 3 kelas bersebelahan langsung menunjukkan kelas mana yang medianya tertinggi, mana yang paling menyebar, dan mana yang punya outlier.

Contoh membaca: kalau boxplot Toko A punya kotak sempit di kisaran tinggi, sementara Toko B punya kotak lebar dengan banyak outlier rendah — kamu langsung tahu Toko A lebih konsisten dan unggul, tanpa menghitung apa pun.

Boxplot adalah bahasa visual standar analis data. Kamu mungkin akan sering melihatnya di laporan dan dashboard. Memahaminya membuatmu bisa "membaca" data orang lain dengan cepat. Salah satu kegunaan praktis terbesarnya adalah mendeteksi outlier secara objektif — mari kita pelajari aturannya.`,
    },
    {
      type: "example",
      title: "Mendeteksi Outlier dengan Aturan 1,5 × IQR",
      keyTakeaway:
        "Aturan objektif: data di luar Q1 − 1,5·IQR atau Q3 + 1,5·IQR dianggap outlier.",
      body: `Tadi kita bilang outlier itu "nilai yang jauh menyendiri" — tapi seberapa jauh baru disebut outlier? Statistika punya aturan objektif yang populer: **aturan 1,5 × IQR.**

Caranya:
1. Hitung Q1, Q3, dan IQR (= Q3 − Q1).
2. Hitung batas bawah = Q1 − (1,5 × IQR).
3. Hitung batas atas = Q3 + (1,5 × IQR).
4. Data apa pun di LUAR rentang [batas bawah, batas atas] dianggap outlier.

**Contoh.** Data dengan Q1 = 72,5 dan Q3 = 92,5 (dari latihan sebelumnya). IQR = 20.
- Batas bawah = 72,5 − (1,5 × 20) = 72,5 − 30 = 42,5.
- Batas atas = 92,5 + (1,5 × 20) = 92,5 + 30 = 122,5.
Jadi nilai di bawah 42,5 atau di atas 122,5 adalah outlier. Nilai 60–100 semuanya aman (bukan outlier).

Kenapa aturan ini berguna? Karena ia **objektif dan konsisten** — bukan "perasaan" bahwa suatu angka terlalu besar. Dengan ambang yang jelas, kamu bisa menyaring outlier secara otomatis, misalnya untuk:
- Mendeteksi transaksi mencurigakan (jumlah jauh di luar normal).
- Menemukan data error (input salah).
- Menyoroti kejadian luar biasa (hari penjualan rekor).

Angka 1,5 itu konvensi yang terbukti praktis (kadang dipakai 3 untuk outlier ekstrem). Yang penting: kamu sekarang punya cara MENGUKUR keanehan, bukan sekadar menebaknya.

Terakhir, mari kenali satu pola sebaran yang muncul di mana-mana di alam dan akan sangat berguna dipahami: distribusi normal.`,
    },
    {
      type: "lesson",
      title: "Distribusi Normal: Si Kurva Lonceng",
      keyTakeaway:
        "Banyak fenomena alami berbentuk kurva lonceng; sekitar 68% data berada dalam 1 standar deviasi dari mean.",
      body: `Kalau kamu mengumpulkan banyak data alami — tinggi badan orang, berat bayi lahir, nilai ujian dari populasi besar — dan menggambar grafiknya, sering muncul bentuk yang sama: **kurva lonceng (distribusi normal).** Paling banyak data menumpuk di tengah (dekat mean), lalu makin sedikit saat menjauh ke kedua sisi.

Distribusi normal punya sifat indah yang disebut **aturan 68–95–99,7**:
- Sekitar **68%** data berada dalam jarak 1 standar deviasi dari mean.
- Sekitar **95%** dalam 2 standar deviasi.
- Sekitar **99,7%** dalam 3 standar deviasi.

Mari maknai dengan contoh. Misal tinggi badan pria dewasa di suatu daerah punya mean 168 cm dan standar deviasi 6 cm. Maka:
- ~68% pria tingginya antara 162 dan 174 cm (168 ± 6).
- ~95% antara 156 dan 180 cm (168 ± 12).
- Pria 186 cm (3 SD di atas) sangat langka (~0,15% teratas).

Kenapa ini powerful? Karena begitu kamu tahu mean dan standar deviasi sebuah data yang berdistribusi normal, kamu bisa **memperkirakan posisi dan kelangkaan** nilai apa pun — tanpa melihat seluruh datanya. Inilah dasar dari banyak hal: skor standar (z-score), kontrol kualitas, nilai ujian terstandar, sampai analisis ilmiah.

Tidak semua data normal (ingat: gaji itu miring, bukan lonceng). Tapi mengenali kapan data berbentuk lonceng membuka banyak alat analisis yang kuat. Mari lihat penerapannya pada kasus nyata sebelum merangkum.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Standar Deviasi di Kontrol Kualitas",
      keyTakeaway:
        "Bisnis memakai sebaran untuk menjaga konsistensi produk — sebaran kecil = kualitas terjaga.",
      body: `Mari lihat bagaimana sebaran menyelamatkan (atau menghancurkan) sebuah bisnis nyata.

**Situasi.** Sebuah pabrik keripik menjual kemasan bertuliskan "berat bersih 100 gram". Mesin pengisi tidak pernah sempurna persis 100 gram tiap bungkus — selalu ada variasi. Yang dikontrol bukan cuma rata-ratanya, tapi SEBARANnya.

**Skenario A (sebaran kecil / mesin bagus):** berat tiap bungkus 99–101 gram, standar deviasi ~0,5 gram. Hampir semua bungkus dekat 100 gram. Pelanggan puas, dan pabrik tak rugi karena tak perlu "melebihkan" isi.

**Skenario B (sebaran besar / mesin bermasalah):** berat berkisar 90–115 gram, standar deviasi ~7 gram. Masalah dobel: sebagian bungkus kurang dari 100 gram (bisa kena komplain/denda karena di bawah klaim label), DAN sebagian over 110 gram (pabrik rugi karena memberi gratis 10% produk). Rata-ratanya mungkin tetap 100, tapi sebaran besar ini merugikan dari dua sisi.

**Pelajaran counterintuitive:** menjaga rata-rata 100 gram saja TIDAK cukup. Justru **mengecilkan standar deviasi (sebaran)** yang menentukan kualitas, kepuasan, dan keuntungan. Itulah kenapa metode kontrol kualitas industri (seperti Six Sigma) secara harfiah obsesif menurunkan variasi — namanya pun merujuk pada standar deviasi (sigma).

Untuk UMKM: ini berlaku juga. Pelanggan menghargai KONSISTENSI — rasa kopi yang sama tiap hari, ukuran porsi yang sama, waktu layanan yang stabil. Mengelola sebaran adalah mengelola janji kualitasmu. Mari rangkum.`,
    },
    {
      type: "summary",
      title: "Rangkuman: Mengukur Sebaran Data",
      keyTakeaway:
        "Sebaran melengkapi pusat data; bersama-sama mereka menceritakan kisah data yang utuh.",
      body: `Mari padatkan modul kedua ini.

**Tiga insight terpenting:**
1. **Pusat tanpa sebaran = setengah cerita.** Dua data dengan mean/median sama bisa sangat berbeda. Selalu tanyakan "seberapa menyebar?", bukan cuma "berapa rata-ratanya?".
2. **Pilih ukuran sebaran sesuai kebutuhan.** Range = cepat tapi sensitif outlier. IQR = tahan outlier, fokus 50% tengah. Standar deviasi = paling lengkap (pakai semua data), raja untuk sains & keuangan.
3. **Sebaran punya makna nyata.** Risiko investasi, kualitas produk, keandalan layanan — semua adalah soal sebaran. Mengecilkan sebaran sering = menaikkan kualitas & kepercayaan.

**Yang sering disalahpahami:** orang fokus mati-matian pada rata-rata dan mengabaikan variasi. Padahal di banyak keputusan nyata (investasi, kualitas, layanan), variasi justru lebih menentukan daripada rata-rata.

**Bonus alat:** aturan 1,5 × IQR untuk mendeteksi outlier objektif, boxplot untuk membaca sebaran sekilas, dan aturan 68–95–99,7 untuk data berdistribusi normal.

**Aplikasi langsung:** lain kali kamu mengevaluasi pilihan (vendor, investasi, kebiasaan) yang "rata-ratanya bagus", periksa juga konsistensinya. Yang stabil sering lebih berharga daripada yang kadang hebat kadang buruk.

Kita sudah bisa membaca pusat DAN sebaran data masa lalu. Tapi bagaimana memprediksi yang belum terjadi? Bagaimana mengukur ketidakpastian masa depan? Itulah dunia peluang — modul terakhir kita. Uji dulu pemahamanmu lewat kuis!`,
    },
    quiz(),
  ],
};

const MOD3: ModuleInput = {
  title: "Peluang: Mengukur Ketidakpastian",
  slug: "peluang-ketidakpastian",
  xpReward: 80,
  slides: [
    {
      type: "lesson",
      title: "Kenapa Otak Kita Payah Menebak Peluang",
      keyTakeaway:
        "Intuisi sering keliru soal peluang; itulah mengapa kita perlu mengukurnya, bukan merasakannya.",
      body: `Manusia punya bakat alami yang buruk dalam menilai peluang. Kita takut naik pesawat (sangat aman) tapi santai naik motor tanpa helm (jauh lebih berbahaya). Kita merasa "sudah lama nggak menang, pasti sebentar lagi hoki" padahal undian tak punya ingatan. Otak kita dirancang untuk cerita dan pola, bukan untuk angka ketidakpastian.

Inilah kenapa peluang (probabilitas) adalah salah satu cabang matematika paling berharga sekaligus paling sering disalahpahami. Ia memberi kita alat untuk **mengukur ketidakpastian secara objektif** — menggantikan "perasaan" dengan angka yang bisa diuji.

Di mana peluang berperan dalam hidup nyata?
- Keputusan: haruskah bawa payung (peluang hujan 80%)? Beli asuransi? Ambil risiko bisnis ini?
- Kesehatan: apa arti "tes positif" sebenarnya? (jawabannya akan mengejutkanmu).
- Uang: kenapa kasino & judi SELALU menang dalam jangka panjang? Kenapa lotre itu "pajak bagi yang tak paham matematika"?
- Membaca berita: "risiko meningkat 2x lipat" — dari angka sekecil apa?

Tujuan modul ini bukan membuatmu jago berjudi (justru sebaliknya — kamu akan paham kenapa judi itu kalah secara matematis). Tujuannya membuatmu mengambil keputusan lebih baik di dunia yang penuh ketidakpastian, dan kebal terhadap manipulasi berbasis ketakutan/harapan.

Mari mulai dari fondasinya: apa sebenarnya "peluang" itu, dan bagaimana mengukurnya dari 0 sampai 1?`,
      sources: [
        {
          type: "DOCUMENTATION",
          title: "Peluang (matematika) — Wikipedia Bahasa Indonesia",
          url: "https://id.wikipedia.org/wiki/Peluang_(matematika)",
        },
        {
          type: "YOUTUBE",
          title: "Kok Bisa? — Probabilitas & Logika (channel Indonesia)",
          url: "https://www.youtube.com/@kokbisa",
        },
      ],
    },
    {
      type: "lesson",
      title: "Mengukur Peluang: Skala 0 sampai 1",
      keyTakeaway:
        "Peluang = (hasil yang diinginkan) ÷ (semua hasil yang mungkin), bernilai antara 0 dan 1.",
      body: `Peluang selalu berupa angka antara **0 dan 1**:
- Peluang 0 = mustahil (tidak akan pernah terjadi).
- Peluang 1 = pasti terjadi.
- Peluang 0,5 = fifty-fifty (sama besar terjadi atau tidak).

Sering juga ditulis sebagai persen (0,25 = 25%) atau pecahan (1/4).

Rumus dasar untuk kejadian yang hasilnya setara (adil):
Peluang = (banyak hasil yang diinginkan) ÷ (banyak semua hasil yang mungkin)

**Contoh koin.** Lempar koin adil. Hasil yang mungkin: {gambar, angka} = 2 hasil. Peluang muncul "gambar" = 1 ÷ 2 = 0,5 (50%).

**Contoh dadu.** Lempar dadu 6 sisi. Hasil mungkin: {1,2,3,4,5,6} = 6 hasil. Peluang muncul angka 4 = 1 ÷ 6 ≈ 0,167 (16,7%). Peluang muncul angka genap (2,4,6 = 3 hasil) = 3 ÷ 6 = 0,5 (50%).

Kunci memahami: identifikasi dulu **ruang sampel** (semua hasil yang mungkin), lalu hitung berapa di antaranya yang "kita inginkan". Itu saja.

Satu aturan penting: **jumlah peluang semua kemungkinan selalu = 1.** Pada dadu, peluang tiap angka 1/6, dan 6 × (1/6) = 1. Ini masuk akal: pasti SALAH SATU hasil terjadi.

Memahami skala 0–1 ini membuatmu bisa menerjemahkan "kemungkinan" yang kabur menjadi angka yang bisa dibandingkan. Mari berlatih dengan kasus sehari-hari.`,
    },
    {
      type: "example",
      title: "Latihan Peluang Sederhana",
      keyTakeaway:
        "Selalu mulai dengan menghitung ruang sampel, lalu hasil yang diinginkan.",
      body: `Mari berlatih menghitung peluang langkah demi langkah.

**Kasus 1 — kartu nama di toples.** Ada 20 kupon undian, 4 di antaranya berhadiah. Kamu ambil satu acak. Peluang dapat hadiah = 4 ÷ 20 = 0,2 = 20%.

**Kasus 2 — warna kelereng.** Kantong berisi 5 merah, 3 biru, 2 hijau (total 10). Peluang ambil biru = 3 ÷ 10 = 0,3 = 30%. Peluang ambil merah = 5 ÷ 10 = 0,5 = 50%.

**Kasus 3 — sedikit lebih rumit.** Dari kantong yang sama, peluang ambil "bukan hijau"? Bukan hijau = merah atau biru = 5 + 3 = 8 dari 10 = 0,8 = 80%.

Perhatikan kasus 3: kita bisa menghitungnya dengan dua cara. Cara langsung (8/10) seperti di atas, ATAU lewat "kebalikan": peluang hijau = 2/10 = 0,2, jadi peluang BUKAN hijau = 1 − 0,2 = 0,8. Keduanya sama! Trik kedua ini (lewat kebalikan) sering jauh lebih mudah, dan akan kita bahas khusus di slide berikutnya.

**Tips menghindari kesalahan:** selalu pastikan kamu menghitung ruang sampel dengan benar. Pada kantong kelereng, totalnya 10 (bukan 3 jenis warna). Salah menentukan "semua hasil yang mungkin" adalah sumber kesalahan peluang nomor satu.

Latihan: kalau dadu dilempar, berapa peluang muncul angka lebih dari 4? (Jawab: angka 5 dan 6 = 2 hasil, jadi 2/6 ≈ 33%.)

Sekarang mari pelajari trik "kebalikan" yang akan sering menyelamatkanmu dari perhitungan rumit.`,
    },
    {
      type: "lesson",
      title: "Peluang Teoretis vs Empiris (Hukum Bilangan Besar)",
      keyTakeaway:
        "Makin banyak percobaan, hasil nyata (empiris) makin mendekati peluang teoretis.",
      body: `Sejauh ini kita menghitung peluang dari atas kertas: peluang koin "gambar" = 1/2. Ini disebut **peluang teoretis** — dihitung dari ruang sampel yang adil. Tapi kalau kamu melempar koin 10 kali, kamu mungkin dapat 7 gambar dan 3 angka (70%), bukan persis 50%. Apakah teorinya salah?

Tidak. Di sinilah bedanya **peluang empiris** (dari percobaan nyata) dan **teoretis** (dari hitungan). Pada jumlah percobaan sedikit, hasil nyata bisa menyimpang jauh dari teori. Tapi ada hukum indah yang menyatukannya: **Hukum Bilangan Besar** — semakin banyak percobaan diulang, hasil empiris akan semakin mendekati peluang teoretis.

Lempar koin 10 kali, bisa saja 70% gambar. Lempar 1.000 kali, hasilnya akan sangat dekat 50%. Lempar 1.000.000 kali, hampir persis 50%. Penyimpangan acak "tercuci" oleh banyaknya percobaan.

Ini punya konsekuensi besar di dunia nyata:
- **Kasino & asuransi** mengandalkan hukum ini. Mereka tak peduli hasil satu permainan/satu nasabah; dalam jutaan transaksi, hasilnya pasti mendekati nilai harapan yang menguntungkan mereka.
- **Survei** butuh sampel cukup besar agar mewakili — sampel kecil mudah meleset (ingat klaim "9 dari 10 dokter").

Pelajaran penting: jangan menyimpulkan dari sedikit percobaan. "Saya coba 3 kali gagal, berarti peluangnya buruk" adalah kesimpulan prematur. Peluang sejati hanya terlihat dalam jumlah besar.

Setelah paham bahwa teori cocok dengan kenyataan dalam jangka panjang, kita siap memakai trik-trik mempercepat hitungan — dimulai dari komplemen.`,
    },
    {
      type: "lesson",
      title: "Peluang Komplemen: Trik 'Kebalikan'",
      keyTakeaway:
        "Peluang sesuatu TIDAK terjadi = 1 − peluang ia terjadi. Sering jauh lebih mudah dihitung.",
      body: `Salah satu trik paling berguna dalam peluang adalah **komplemen**: peluang sebuah kejadian TIDAK terjadi.

Aturannya sederhana namun kuat:
Peluang (tidak terjadi) = 1 − Peluang (terjadi)

Kenapa ini berlaku? Karena sesuatu itu pasti terjadi ATAU tidak terjadi — tak ada pilihan ketiga. Jadi kedua peluangnya harus berjumlah 1.

**Contoh sederhana.** Peluang hujan besok 70% (0,7). Maka peluang TIDAK hujan = 1 − 0,7 = 0,3 = 30%. Tak perlu menghitung ulang dari awal.

**Kekuatan sebenarnya muncul pada masalah rumit.** Pertanyaan: "Lempar dadu 2 kali, berapa peluang muncul SETIDAKNYA satu angka 6?" Menghitung langsung itu ribet (ada banyak kombinasi: 6 di lemparan pertama, atau kedua, atau keduanya). Tapi lewat komplemen jadi gampang:
- Peluang TIDAK dapat 6 sama sekali = (5/6) × (5/6) = 25/36 ≈ 0,694.
- Maka peluang setidaknya satu 6 = 1 − 0,694 = 0,306 ≈ 31%.

Aturan praktisnya: **kapan pun kamu melihat kata "setidaknya satu" atau "minimal satu", pikirkan komplemen.** Menghitung "tidak ada sama sekali" lalu menguranginya dari 1 hampir selalu lebih mudah daripada menjumlahkan semua kemungkinan "ada".

Trik ini terlihat sederhana, tapi ia menyelamatkan banyak orang dari perhitungan berlembar-lembar. Para profesional menggunakannya terus-menerus. Sekarang, bagaimana menggabungkan peluang beberapa kejadian sekaligus?`,
    },
    {
      type: "example",
      title: "Menggabungkan Peluang: 'DAN' vs 'ATAU'",
      keyTakeaway:
        "Kejadian berurutan independen: kalikan (DAN). Pilihan saling lepas: jumlahkan (ATAU).",
      body: `Saat ada lebih dari satu kejadian, dua kata kunci menentukan operasinya: "DAN" (kali) atau "ATAU" (tambah).

**Aturan "DAN" (perkalian) — untuk kejadian independen berurutan.**
Kalau dua kejadian harus terjadi BERSAMA/berurutan dan saling bebas, kalikan peluangnya.
Contoh: peluang lempar koin "gambar" DAN dadu "angka 6" = (1/2) × (1/6) = 1/12 ≈ 8,3%.
Intuisi: tiap syarat tambahan mempersempit kemungkinan, jadi peluang mengecil (perkalian pecahan menghasilkan angka lebih kecil).

**Aturan "ATAU" (penjumlahan) — untuk kejadian saling lepas.**
Kalau kita puas dengan salah SATU dari beberapa hasil yang tak bisa terjadi bersamaan, jumlahkan.
Contoh: peluang dadu muncul "1 ATAU 6" = (1/6) + (1/6) = 2/6 ≈ 33%.
Intuisi: tiap pilihan tambahan memperbesar kesempatan, jadi peluang membesar.

**Hati-hati: "saling lepas".** Aturan tambah sederhana hanya berlaku kalau kejadiannya tak bisa terjadi bersamaan. Pada satu lemparan dadu, "1" dan "6" tak mungkin muncul bareng → boleh langsung dijumlahkan. Tapi "angka genap ATAU angka >3" punya tumpang tindih (4 dan 6 masuk keduanya), jadi tak boleh dijumlahkan mentah-mentah.

**Trik membaca soal:** cari kata "DAN/lalu/kemudian/keduanya" → biasanya kali. Cari kata "ATAU/salah satu" → biasanya tambah. Tapi selalu cek apakah kejadiannya independen (untuk DAN) dan saling lepas (untuk ATAU).

Mari terapkan pada kasus nyata yang sering bikin orang salah: undian berhadiah.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Matematika di Balik Undian Berhadiah",
      keyTakeaway:
        "Peluang membantu menilai apakah sebuah 'kesempatan' sebenarnya sepadan atau tidak.",
      body: `Mari pakai peluang untuk membongkar daya tarik undian — sesuatu yang sangat relevan dengan dompetmu.

**Situasi.** Sebuah minimarket mengadakan undian: setiap belanja Rp50.000 dapat 1 kupon. Hadiah utama 1 motor. Total kupon yang beredar diperkirakan 100.000 lembar.

**Peluang menang dengan 1 kupon** = 1 ÷ 100.000 = 0,00001 = 0,001%. Sangat kecil.

**"Tapi kalau aku belanja banyak biar dapat 10 kupon?"** Peluang naik jadi 10 ÷ 100.000 = 0,0001 = 0,01%. Tetap sangat kecil — kamu menghabiskan Rp500.000 untuk menaikkan peluang dari 0,001% ke 0,01%.

**Cara berpikir yang lebih sehat (nilai harapan, akan kita bahas):** untuk "membeli" peluang menang motor, kamu mengeluarkan uang nyata yang pasti hilang, demi peluang menang yang nyaris nol. Secara matematis, hampir selalu kamu rugi.

**Tapi kenapa undian tetap menggoda?** Karena otak kita (ingat slide pertama) buruk membayangkan angka sekecil 0,001%. Kita membayangkan "menang itu mungkin" dan mengabaikan betapa kecilnya. Penyelenggara memanfaatkan bias ini.

**Pelajaran counterintuitive:** undian bukan dilarang untuk diikuti — kalau kamu memang akan belanja di sana, kuponnya bonus gratis. Yang keliru adalah belanja BERLEBIHAN demi kupon, atau menganggap "pasti ada yang menang, kenapa bukan aku?". Ya, pasti ada pemenang — tapi peluang ITU kamu tetap 0,001%.

Inti: peluang mengubah "siapa tahu hoki" menjadi penilaian dingin "apakah ini sepadan?". Sekarang giliranmu menghitung sebuah skenario.`,
    },
    {
      type: "challenge",
      title: "Challenge: Hitung Peluang Skenario Nyata",
      body: `Saatnya menerapkan aturan peluang pada situasi nyata. Hitung dengan langkah jelas, jangan menebak.`,
      challenge: {
        instruction:
          "Sebuah kantong berisi 8 permen rasa cokelat dan 2 permen rasa mint (total 10). (1) Berapa peluang mengambil 1 permen acak dan mendapat MINT? (2) Berapa peluang mendapat COKELAT (gunakan aturan komplemen dari jawaban nomor 1)? (3) Jika kamu mengambil 2 permen BERTURUT-TURUT TANPA dikembalikan, berapa peluang KEDUANYA mint? Tunjukkan perhitunganmu.",
        inputType: "math",
        inputPlaceholder:
          "1) P(mint) = ... ; 2) P(cokelat) = 1 − ... = ... ; 3) P(2 mint) = ... × ... = ...",
        starterCode: "",
        expectedConcepts: [
          "P(mint) = 2/10 = 0,2",
          "Aturan komplemen: P(cokelat) = 1 − 0,2 = 0,8",
          "Peluang bersyarat tanpa pengembalian: (2/10) × (1/9)",
          "Hasil akhir P(2 mint) = 2/90 ≈ 0,022",
        ],
        evaluationCriteria:
          "Periksa: (1) P(mint) = 2/10 = 0,2 (20%). (2) P(cokelat) lewat komplemen = 1 − 0,2 = 0,8 (80%) — atau 8/10, harus terlihat memakai ide komplemen. (3) TANPA pengembalian: ambilan pertama mint = 2/10; setelah 1 mint diambil, tersisa 1 mint dari 9 permen, jadi ambilan kedua = 1/9. P(2 mint) = (2/10) × (1/9) = 2/90 ≈ 0,022 (2,2%). Poin kunci yang sering salah: pada nomor 3, banyak yang memakai 2/10 × 2/10 (seolah dikembalikan) — itu SALAH karena soal menyebut tanpa pengembalian sehingga ruang sampel & jumlah mint berubah. Beri 90-100 jika ketiga benar termasuk perubahan menjadi 1/9 di nomor 3. Beri 70-85 jika nomor 1 & 2 benar tapi nomor 3 keliru memakai 2/10 (lupa tanpa pengembalian). Jika nomor 1 salah, skor < 50.",
        hints: [
          "Nomor 1: peluang = (jumlah mint) ÷ (total permen). Total ada 10.",
          "Nomor 2: pakai komplemen — peluang cokelat = 1 − peluang mint. Jauh lebih cepat daripada menghitung ulang.",
          "Nomor 3 KUNCI: setelah mengambil 1 mint dan TIDAK mengembalikannya, sekarang tinggal berapa mint dan berapa total permen? Hitung ulang untuk ambilan kedua, lalu kalikan (aturan DAN).",
        ],
        sampleAnswer:
          "1) P(mint) = 2/10 = 0,2 = 20%. 2) Dengan komplemen, P(cokelat) = 1 − P(mint) = 1 − 0,2 = 0,8 = 80% (cek: 8/10 = 0,8, cocok). 3) Tanpa pengembalian: ambilan pertama mint = 2/10. Setelah 1 mint diambil, tersisa 1 mint dari 9 permen total, jadi ambilan kedua mint = 1/9. Karena keduanya harus terjadi (DAN), kalikan: P(2 mint) = (2/10) × (1/9) = 2/90 ≈ 0,022 = 2,2%. (Catatan: kalau dikembalikan, jawabannya 2/10 × 2/10 = 0,04; tapi soal ini tanpa pengembalian.)",
        followUpQuestion:
          "Bagaimana jawaban nomor 3 berubah jika permen pertama DIKEMBALIKAN sebelum mengambil yang kedua? Kenapa berbeda?",
      },
    },
    {
      type: "lesson",
      title: "Pembahasan Challenge & Jebakan 'Gambler's Fallacy'",
      keyTakeaway:
        "Peristiwa independen tak punya ingatan; 'sudah lama tak keluar' tidak menaikkan peluang.",
      body: `Mari bedah tantangan tadi dan satu kesalahan berpikir paling terkenal.

**Jawaban benar:** (1) P(mint) = 2/10 = 0,2. (2) P(cokelat) = 1 − 0,2 = 0,8. (3) Tanpa pengembalian: (2/10) × (1/9) = 2/90 ≈ 0,022.

**Kesalahan utama nomor 3: lupa "tanpa pengembalian".** Banyak yang menjawab (2/10) × (2/10). Padahal setelah satu mint diambil dan tak dikembalikan, kondisi berubah: tinggal 1 mint dari 9. Ini namanya **peluang bersyarat** — peluang kejadian kedua bergantung pada hasil pertama. Soal follow-up menegaskan: KALAU dikembalikan, barulah (2/10) × (2/10) = 0,04, karena kondisi kembali seperti semula.

**Jebakan berpikir terbesar — Gambler's Fallacy.** Ini keyakinan keliru bahwa "kalau sudah lama tak terjadi, sebentar lagi pasti terjadi". Contoh: koin keluar "angka" 5 kali berturut-turut, lalu orang yakin "pasti gambar sekarang!". SALAH. Koin tak punya ingatan — peluang gambar di lemparan ke-6 tetap 50%, persis seperti lemparan pertama. Hasil lalu tidak mempengaruhi kejadian independen berikutnya.

Ini menjelaskan kenapa strategi judi "tunggu nomor yang lama tak keluar" tidak bekerja, dan kenapa orang kehilangan banyak uang mengejar pola yang sebenarnya acak.

**Kebalikannya juga keliru** (Hot Hand): "lagi hoki, pasti menang lagi". Untuk kejadian independen murni, tidak ada momentum.

Memahami independensi melindungimu dari pola palsu. Tapi tidak semua kejadian independen — kadang informasi baru mengubah peluang secara dramatis, seperti pada tes medis.`,
    },
    {
      type: "lesson",
      title: "Peluang Bersyarat: Saat Informasi Mengubah Segalanya",
      keyTakeaway:
        "Peluang bersyarat memperbarui keyakinan kita ketika ada informasi baru.",
      body: `Peluang bersyarat adalah peluang sebuah kejadian TERJADI DENGAN SYARAT kita sudah tahu informasi lain. Konsep ini mengubah cara kita berpikir, karena informasi baru bisa menggeser peluang secara drastis.

Contoh sederhana: peluang acak seseorang adalah dokter mungkin 0,3%. Tapi kalau aku beri tahu "orang ini memakai jas putih dan stetoskop di rumah sakit", peluangnya melonjak. Informasi tambahan ("syarat") memperbarui peluang.

Notasi umumnya P(A | B) dibaca "peluang A, JIKA diketahui B".

Penerapan sehari-hari yang penting:
- **Cuaca:** peluang hujan secara umum mungkin 20%. Tapi peluang hujan JIKA langit sudah mendung gelap jauh lebih tinggi.
- **Diagnosis:** dokter terus memperbarui dugaan penyakit setiap kali ada hasil tes baru.
- **Spam filter:** email diklasifikasi berdasarkan peluang spam JIKA mengandung kata-kata tertentu.

Inti pemikiran bersyarat: **peluang bukan angka tetap — ia diperbarui saat kita belajar lebih banyak.** Orang yang berpikir probabilistik tidak berkata "aku yakin/tidak yakin", tapi "berdasarkan info yang kupunya sekarang, peluangnya sekian; kalau ada info baru, akan kusesuaikan".

Di sinilah muncul salah satu hasil paling mengejutkan dan kontra-intuitif dalam seluruh matematika — sesuatu yang bahkan sering salah dijawab oleh para dokter sendiri. Mari kita lihat pada kasus tes medis, dan ini akan mengubah cara kamu membaca hasil tes selamanya.`,
    },
    {
      type: "example",
      title: "Kejutan Tes Medis (Mengapa 'Positif' Belum Tentu Sakit)",
      keyTakeaway:
        "Untuk penyakit langka, hasil tes positif sering lebih mungkin false positive daripada sakit sungguhan.",
      body: `Ini contoh peluang bersyarat paling terkenal dan mengejutkan. Siapkan diri — hasilnya melawan intuisi.

**Situasi.** Sebuah penyakit langka diidap 1 dari 1.000 orang (0,1%). Ada tes dengan akurasi 99%: artinya jika kamu sakit, 99% kemungkinan tes positif; jika kamu sehat, tes salah memberi "positif" hanya 1% (false positive).

Pertanyaan: **kamu dites dan hasilnya POSITIF. Berapa peluang kamu BENAR-BENAR sakit?** Kebanyakan orang (bahkan dokter) menjawab "99%". Mari hitung — jawabannya akan mengejutkan.

Bayangkan 100.000 orang dites:
- Yang benar sakit: 0,1% × 100.000 = 100 orang. Dari mereka, 99% positif = **99 positif benar**.
- Yang sehat: 99.900 orang. Dari mereka, 1% false positive = **999 positif palsu**.
- Total yang hasilnya positif = 99 + 999 = 1.098 orang.

Maka peluang benar-benar sakit JIKA positif = 99 ÷ 1.098 ≈ **9%**. Bukan 99%!

Kenapa? Karena penyakitnya **sangat langka**, jumlah orang sehat begitu banyak sehingga 1% kesalahan dari mereka (999 orang) jauh melampaui 99 kasus asli. "Positif" lebih sering berarti false positive.

**Pelajaran besar:** untuk kejadian langka, kamu HARUS memperhitungkan seberapa langka (base rate) — bukan cuma akurasi tes. Mengabaikan base rate disebut "base rate fallacy", dan ia menyesatkan keputusan medis, hukum, sampai keamanan.

Ini sebabnya tes positif untuk penyakit langka biasanya diikuti tes konfirmasi. Satu pengukuran probabilistik bisa menyelamatkan dari kepanikan yang tak perlu. Terakhir, mari pahami konsep yang mengikat semuanya untuk keputusan: nilai harapan.`,
    },
    {
      type: "lesson",
      title: "Nilai Harapan: Kenapa Kasino Selalu Menang",
      keyTakeaway:
        "Nilai harapan = rata-rata hasil jika diulang banyak kali; ia memandu keputusan jangka panjang.",
      body: `Nilai harapan (expected value) adalah alat pamungkas untuk keputusan di bawah ketidakpastian. Ia menjawab: "kalau aku mengulang keputusan ini ribuan kali, rata-rata aku untung atau rugi berapa?"

Cara menghitung: kalikan tiap hasil dengan peluangnya, lalu jumlahkan semua.
Nilai harapan = Σ (nilai hasil × peluang hasil)

**Contoh judi sederhana.** Permainan: bayar Rp10.000 untuk lempar dadu. Kalau keluar 6, kamu dapat Rp50.000; selain itu, hangus.
- Peluang menang (keluar 6) = 1/6; hasil bersih = +Rp40.000 (dapat 50rb − bayar 10rb).
- Peluang kalah = 5/6; hasil bersih = −Rp10.000.
- Nilai harapan = (1/6 × 40.000) + (5/6 × −10.000) = 6.667 − 8.333 = **−Rp1.667 per permainan.**

Artinya: setiap kali main, rata-rata kamu RUGI Rp1.667. Sekali-dua kali kamu mungkin menang, tapi dalam jangka panjang, kekalahan pasti datang. **Inilah rahasia kasino, lotre, dan judi: nilai harapan pemain SELALU negatif** — itu by design, supaya rumah untung. "Pemenang" yang sesekali ada justru iklan yang menutupi kerugian mayoritas.

Kekuatan nilai harapan: ia memisahkan keputusan baik dari hasil baik. Kamu bisa membuat keputusan benar (nilai harapan positif) tapi kalah sekali; atau keputusan buruk (judi) tapi kebetulan menang. Yang bijak fokus pada nilai harapan, bukan hasil sesaat.

Konsep ini dipakai di mana-mana: asuransi (perusahaan menjual polis dengan nilai harapan menguntungkan mereka), investasi, sampai keputusan bisnis. Mari rangkum seluruh perjalanan kita.`,
    },
    {
      type: "casestudy",
      title: "Studi Kasus: Asuransi & Nilai Harapan",
      keyTakeaway:
        "Asuransi 'merugikan' secara nilai harapan, tapi rasional untuk risiko yang tak sanggup ditanggung.",
      body: `Kalau nilai harapan judi negatif berarti jangan ikut, apakah asuransi — yang juga "rata-rata merugikan pembeli" — juga harus dihindari? Jawabannya: TIDAK, dan ini pelajaran halus yang penting.

**Hitungan dasar.** Perusahaan asuransi menetapkan premi agar mereka untung. Artinya, secara nilai harapan, rata-rata pembeli membayar lebih banyak daripada yang ia terima. Persis seperti kasino, nilai harapan pembeli sedikit negatif. Lalu kenapa membeli asuransi tetap rasional?

**Kuncinya: ukuran kerugian, bukan cuma peluang.** Ada perbedaan besar antara:
- Kerugian yang **sanggup** kamu tanggung (kehilangan Rp1.667 di permainan dadu — tak masalah diulang).
- Kerugian yang **menghancurkan** (rumah terbakar, sakit kritis ratusan juta, kecelakaan besar) — peluangnya kecil, tapi kalau terjadi, hidupmu bisa hancur total.

Asuransi adalah memindahkan risiko **bencana yang tak sanggup kamu tanggung** ke perusahaan, dengan membayar biaya kecil yang pasti (premi). Kamu rela "rugi sedikit secara nilai harapan" untuk menghindari kemungkinan kecil "rugi total yang menghancurkan".

**Pelajaran counterintuitive:** nilai harapan bukan satu-satunya pertimbangan. Untuk kerugian katastrofik, menghindari kehancuran lebih penting daripada mengoptimalkan rata-rata. Inilah kenapa asuransi rumah/jiwa/kesehatan masuk akal, tapi "asuransi" untuk barang murah (extended warranty HP murah) sering tidak — karena kerugiannya sanggup kamu tanggung sendiri.

Cara berpikir ini — menimbang peluang DAN besarnya dampak — adalah puncak literasi probabilistik. Mari kunci semuanya dalam rangkuman.`,
    },
    {
      type: "summary",
      title: "Rangkuman: Berpikir Probabilistik",
      keyTakeaway:
        "Peluang mengubah ketidakpastian dari sumber kecemasan/manipulasi menjadi keputusan yang terukur.",
      body: `Mari padatkan modul terakhir ini sekaligus menutup seluruh kursus.

**Tiga insight terpenting:**
1. **Ukur, jangan rasakan.** Peluang (0–1) menggantikan intuisi yang sering keliru dengan angka objektif. Hitung ruang sampel, pakai komplemen untuk "setidaknya satu", kali untuk "DAN", tambah untuk "ATAU saling lepas".
2. **Informasi & base rate mengubah peluang.** Kejadian independen tak punya ingatan (lawan Gambler's Fallacy). Tapi informasi baru memperbarui peluang (bersyarat) — dan untuk kejadian langka, base rate sangat menentukan (kejutan tes medis).
3. **Nilai harapan memandu keputusan.** Pikirkan "kalau diulang ribuan kali, untung atau rugi?". Ini menjelaskan kenapa judi merugikan, sekaligus kenapa asuransi rasional untuk risiko yang menghancurkan.

**Yang sering disalahpahami:** orang menyamakan "keputusan baik" dengan "hasil baik". Padahal kamu bisa memutuskan benar tapi kalah sekali, atau memutuskan buruk tapi kebetulan menang. Fokuslah pada proses (peluang & nilai harapan), bukan hasil tunggal.

**Benang merah seluruh kursus Statistika ini:** baca PUSAT data dengan jujur (mean/median/modus), pahami SEBARAN-nya (range/IQR/standar deviasi), lalu ukur KETIDAKPASTIAN masa depan (peluang & nilai harapan). Bersama, ketiganya membuatmu menjadi pembaca data yang kritis dan pengambil keputusan yang lebih baik — kebal terhadap angka yang menyesatkan.

**Aplikasi langsung:** lain kali kamu menghadapi klaim angka, taruhan, atau keputusan berisiko, terapkan satu pertanyaan dari kursus ini. Itu sudah cukup membuatmu unggul dari kebanyakan orang. Selamat, kamu telah menyelesaikan fondasi berpikir statistik! Buktikan penguasaanmu di kuis terakhir.`,
    },
    quiz(),
  ],
};

async function main() {
  await createCourse({
    title: "Statistika Dasar untuk Analisis Data Sehari-hari",
    slug: "statistika-dasar-analisis-data",
    description:
      "Belajar membaca dan menafsirkan data seperti analis: dari mean/median/modus, sebaran & standar deviasi, hingga peluang. Penuh contoh nyata Indonesia dan tantangan interaktif agar kamu tak mudah ditipu angka.",
    categorySlug: "matematika",
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
