import { createCourse, prisma } from "./_seed-helpers";

async function main() {
  await createCourse({
    title: "Aljabar Dasar: Bahasa Rahasia Matematika",
    slug: "aljabar-dasar-bahasa-rahasia-matematika",
    description:
      "Takut lihat huruf 'x' di matematika? Kursus ini membongkar aljabar dari nol dengan analogi sehari-hari (belanja, pulsa, timbangan) sampai kamu bisa menyelesaikan persamaan dengan percaya diri.",
    categorySlug: "matematika",
    difficulty: "BEGINNER",
    isPremium: false,
    modules: [
      {
        title: "Mengenal Variabel & Persamaan Linear",
        slug: "variabel-persamaan-linear",
        xpReward: 50,
        slides: [
          {
            type: "lesson",
            title: "Kenapa Tiba-Tiba Ada Huruf di Matematika?",
            keyTakeaway:
              "Huruf dalam aljabar hanyalah 'kotak misterius' untuk angka yang belum kita ketahui.",
            body: `Banyak orang mulai takut matematika tepat di titik ini: angka yang tadinya jelas tiba-tiba diganti huruf seperti x atau y. Tenang — ini sebenarnya kabar baik, dan kita akan buktikan kenapa.

Bayangkan kamu menabung di celengan tertutup. Kamu tidak tahu persis isinya berapa, jadi kamu sebut saja isinya "x". Nah, **x itu cuma nama untuk angka yang belum kamu ketahui.** Tidak lebih menakutkan dari itu. Huruf dalam aljabar adalah "kotak misterius" — wadah sementara untuk sebuah nilai yang akan kita cari.

Kenapa ini berguna? Karena hidup penuh hal yang belum diketahui. "Berapa lama lagi sampai rumah?", "Berapa harga satuannya kalau beli 3 seharga Rp15.000?" Aljabar memberi kita cara menuliskan pertanyaan-pertanyaan itu secara rapi, lalu menyelesaikannya dengan langkah yang pasti — bukan menebak.

Contoh sederhana: kalau kamu punya 2 celengan berisi sama banyak (masing-masing x) plus uang tunai Rp3.000, dan totalnya Rp11.000, kamu bisa tulis: **2x + 3.000 = 11.000**. Sebentar lagi kamu akan bisa membuka "kotak misterius" itu dan tahu persis isinya. Tapi sebelum membukanya, kita perlu benar-benar paham apa itu variabel.`,
            sources: [
              {
                type: "DOCUMENTATION",
                title: "Aljabar — Wikipedia Bahasa Indonesia",
                url: "https://id.wikipedia.org/wiki/Aljabar",
              },
              {
                type: "YOUTUBE",
                title: "Jendela Sains — Matematika Dasar (channel Indonesia)",
                url: "https://www.youtube.com/@jendelasains",
              },
            ],
          },
          {
            type: "lesson",
            title: "Variabel & Konstanta: Mengenali Pemainnya",
            keyTakeaway:
              "Variabel bisa berubah nilainya; konstanta tetap. Mengenali keduanya kunci membaca persamaan.",
            body: `Sebelum menyelesaikan persamaan, kita harus kenal dulu "pemain" di dalamnya. Ada dua jenis utama: **variabel** dan **konstanta**.

**Variabel** adalah simbol (biasanya huruf seperti x, y, n) yang nilainya bisa berubah atau belum diketahui — si "kotak misterius" tadi. **Konstanta** adalah angka tetap yang nilainya sudah pasti, seperti 3, 7, atau 100.

Lihat bentuk **3x + 5**. Di sini:
- x adalah variabel (nilainya belum kita tahu).
- 3 adalah **koefisien** — angka yang menempel di depan variabel, artinya "3 kali x".
- 5 adalah konstanta (angka berdiri sendiri).

Analogi warung: anggap x adalah harga satu gorengan. Kalau kamu beli 3 gorengan lalu bayar parkir Rp5.000, total belanjamu adalah **3x + 5.000**. Koefisien 3 = jumlah gorengan, konstanta 5.000 = biaya tetap yang tak bergantung jumlah gorengan.

Satu hal penting: 3x berarti "3 dikali x", bukan "tiga puluh sekian". Dalam aljabar, dua simbol yang berdempetan berarti perkalian. Begitu juga xy berarti "x dikali y".

Memahami siapa variabel dan siapa konstanta membuatmu bisa "membaca" persamaan seperti membaca kalimat. Sekarang, bagaimana cara mengubah cerita sehari-hari menjadi persamaan seperti itu?`,
          },
          {
            type: "example",
            title: "Menerjemahkan Cerita Jadi Persamaan",
            keyTakeaway:
              "Keterampilan inti aljabar: menerjemahkan situasi nyata menjadi kalimat matematika.",
            body: `Kekuatan sejati aljabar muncul saat kita bisa menerjemahkan masalah nyata menjadi persamaan. Ini seperti menerjemahkan bahasa: dari "bahasa cerita" ke "bahasa matematika".

Kuncinya, kenali kata-kata yang jadi petunjuk:
- "jumlah", "total", "ditambah" → tanda tambah (+)
- "kurang", "sisa", "berkurang" → tanda kurang (−)
- "kali", "sebanyak", "per" → tanda kali (×)
- "adalah", "menjadi", "sama dengan" → tanda sama dengan (=)

**Contoh 1.** "Sebuah angka ditambah 7 hasilnya 20." Misalkan angka itu = x. Maka: **x + 7 = 20**.

**Contoh 2.** "Andi membeli 4 buku dengan harga sama, total Rp48.000." Misal harga satu buku = x. Maka: **4x = 48.000**.

**Contoh 3 (lebih nyata).** "Tarif ojek online: Rp3.000 per km ditambah biaya buka aplikasi Rp5.000. Total ongkos Rp23.000. Berapa km perjalanannya?" Misal jarak = x km. Maka: **3.000x + 5.000 = 23.000**.

Perhatikan polanya: kita selalu mulai dengan **"misalkan yang dicari = x"**, lalu menyusun ekspresinya mengikuti cerita. Langkah "memisalkan" ini adalah jembatan paling penting — banyak orang gagal bukan karena tak bisa hitung, tapi karena tak bisa menerjemahkan soal.

Sekarang persamaannya sudah tersusun. Bagaimana cara "membongkar" persamaan untuk menemukan nilai x? Rahasianya ada pada sebuah timbangan.`,
          },
          {
            type: "lesson",
            title: "Aturan Timbangan: Inti dari Semua Persamaan",
            keyTakeaway:
              "Persamaan seperti timbangan seimbang: apa pun yang kamu lakukan di satu sisi, lakukan sama di sisi lain.",
            body: `Inilah konsep paling penting dalam menyelesaikan persamaan — kalau kamu paham ini, sisanya jadi mudah. Bayangkan tanda sama dengan (=) sebagai **titik tengah sebuah timbangan**. Sisi kiri dan sisi kanan harus selalu **seimbang**.

Aturannya cuma satu: **apa pun yang kamu lakukan pada satu sisi, kamu HARUS melakukan hal yang sama persis pada sisi lainnya.** Kalau kamu menambah 5 di kiri, tambah 5 juga di kanan. Kalau kamu membagi 2 di kiri, bagi 2 juga di kanan. Dengan begitu timbangan tetap seimbang dan persamaan tetap benar.

Tujuan kita menyelesaikan persamaan adalah membuat variabel (x) "sendirian" di satu sisi. Caranya: kita lakukan operasi kebalikan untuk menghilangkan angka-angka yang menempel padanya.
- Lawan dari **tambah** adalah **kurang**.
- Lawan dari **kali** adalah **bagi**.

Contoh: pada **x + 5 = 12**, angka 5 menempel pada x lewat penjumlahan. Untuk menghilangkannya, kurangi 5 — tapi di KEDUA sisi: x + 5 − 5 = 12 − 5, sehingga **x = 7**.

Analogi nyata: kalau di timbangan kiri ada "kotak x + bandul 5 kg" dan kanan ada "bandul 12 kg", untuk tahu berat kotak, angkat bandul 5 kg dari kiri — dan angkat juga 5 kg dari kanan supaya tetap seimbang. Tersisa: kotak = 7 kg.

Prinsip "lakukan hal yang sama di kedua sisi" ini akan kita pakai berulang kali. Mari praktikkan langkah demi langkah.`,
          },
          {
            type: "example",
            title: "Menyelesaikan Persamaan Satu Langkah",
            keyTakeaway:
              "Gunakan operasi kebalikan di kedua sisi untuk membuat x sendirian.",
            body: `Mari selesaikan persamaan paling sederhana, yang cuma butuh satu langkah. Tujuan kita selalu sama: buat x sendirian.

**Kasus penjumlahan.** Selesaikan x + 8 = 20.
Angka 8 menempel lewat penjumlahan, jadi lawannya adalah pengurangan. Kurangi 8 di kedua sisi:
x + 8 − 8 = 20 − 8 → **x = 12**.
Cek: 12 + 8 = 20. Benar!

**Kasus pengurangan.** Selesaikan x − 4 = 9.
Lawan pengurangan adalah penjumlahan. Tambah 4 di kedua sisi:
x − 4 + 4 = 9 + 4 → **x = 13**.
Cek: 13 − 4 = 9. Benar!

**Kasus perkalian.** Selesaikan 5x = 35.
Di sini 5 menempel lewat perkalian (5 kali x). Lawannya adalah pembagian. Bagi 5 di kedua sisi:
5x ÷ 5 = 35 ÷ 5 → **x = 7**.
Cek: 5 × 7 = 35. Benar!

Perhatikan ritmenya: **identifikasi operasi yang menempel pada x → lakukan operasi kebalikannya di kedua sisi → cek jawaban dengan memasukkannya kembali.** Langkah "cek" itu jangan dilewati — ia memberimu kepastian 100% bahwa jawabanmu benar, tanpa perlu bertanya ke siapa pun.

Sekarang, bagaimana kalau ada lebih dari satu angka yang menempel pada x? Kita naik satu level.`,
          },
          {
            type: "example",
            title: "Persamaan Dua Langkah: Naik Satu Level",
            keyTakeaway:
              "Hilangkan dulu konstanta (tambah/kurang), baru koefisien (kali/bagi).",
            body: `Persamaan dua langkah punya dua angka yang menempel pada x, contohnya **2x + 3 = 11**. Di sini x dikali 2, lalu ditambah 3. Untuk membongkarnya, kita "kupas" seperti mengupas bawang: lapisan terluar dulu.

**Urutannya: bereskan penjumlahan/pengurangan dulu, baru perkalian/pembagian.**

Selesaikan 2x + 3 = 11:
- Langkah 1 — hilangkan +3 (kurangi 3 di kedua sisi): 2x + 3 − 3 = 11 − 3 → 2x = 8
- Langkah 2 — hilangkan ×2 (bagi 2 di kedua sisi): 2x ÷ 2 = 8 ÷ 2 → **x = 4**
- Cek: 2 × 4 + 3 = 8 + 3 = 11. Benar!

Mari pakai kasus ojek dari tadi: 3.000x + 5.000 = 23.000.
- Kurangi 5.000 di kedua sisi: 3.000x = 18.000
- Bagi 3.000 di kedua sisi: **x = 6**
Jadi jarak perjalanannya 6 km. Cek: 3.000 × 6 + 5.000 = 18.000 + 5.000 = 23.000. Pas!

Kenapa konstanta dulu, baru koefisien? Karena ini kebalikan dari urutan operasi saat membangunnya (kali dulu, baru tambah). Saat membongkar, kita berjalan mundur. Analogi: saat memakai sepatu kamu pakai kaus kaki dulu baru sepatu; saat melepas, kamu lepas sepatu dulu baru kaus kaki.

Dengan dua langkah ini, kamu sudah bisa menyelesaikan mayoritas persamaan linear yang muncul sehari-hari. Mari lihat satu kasus nyata yang lebih lengkap.`,
          },
          {
            type: "casestudy",
            title: "Studi Kasus: Memilih Paket Internet Termurah",
            keyTakeaway:
              "Aljabar membantu mengambil keputusan nyata dengan membandingkan dua pilihan secara adil.",
            body: `Mari pakai aljabar untuk masalah dompet yang sangat nyata: memilih paket internet.

**Situasi.** Sinta bingung memilih dua paket:
- Paket A: bayar Rp50.000/bulan, dapat kuota tetap.
- Paket B: gratis bulanan, tapi bayar Rp2.000 per GB yang dipakai.

Pertanyaannya: berapa GB pemakaian yang membuat kedua paket berbiaya **sama**? Ini titik penting untuk memutuskan paket mana lebih hemat.

**Menyusun persamaan.** Misalkan jumlah GB = x.
- Biaya Paket A = 50.000 (tetap, tak bergantung x).
- Biaya Paket B = 2.000x.
Kita cari saat keduanya sama: 2.000x = 50.000.

**Menyelesaikan.** Bagi 2.000 di kedua sisi: **x = 25**.

**Menafsirkan hasil (ini bagian terpenting).** Pada pemakaian 25 GB, kedua paket sama-sama Rp50.000. Artinya:
- Kalau Sinta biasa pakai **kurang dari 25 GB**, Paket B (per-GB) lebih hemat.
- Kalau ia pakai **lebih dari 25 GB**, Paket A (tetap) lebih hemat.

Inilah kekuatan aljabar: ia mengubah "kira-kira mana ya yang murah?" menjadi keputusan berbasis angka yang jelas. Pelajaran yang sering mengejutkan: jawaban "x = 25" saja tidak cukup — yang berharga adalah **menafsirkan** angka itu untuk mengambil keputusan.

Coba pikirkan: kalau Paket B harganya Rp1.500/GB (bukan Rp2.000), pada berapa GB keduanya jadi sama? Sebelum itu, mari hindari jebakan yang sering bikin jawaban salah.`,
          },
          {
            type: "lesson",
            title: "Kesalahan Umum & Cara Memeriksa Jawaban",
            keyTakeaway:
              "Selalu lakukan operasi di KEDUA sisi, dan cek jawaban dengan memasukkannya kembali.",
            body: `Sebagian besar kesalahan aljabar bukan karena soal sulit, tapi karena beberapa jebakan kecil yang berulang. Kalau kamu sadar akan jebakan ini, akurasimu langsung melonjak.

**Jebakan 1: Lupa melakukan operasi di KEDUA sisi.** Ini kesalahan nomor satu. Menulis 2x + 3 = 11 lalu langsung 2x = 11 (lupa menguranginya juga dari 11). Ingat timbangan: apa pun di kiri, lakukan juga di kanan. Selalu.

**Jebakan 2: Salah urutan.** Membagi 2 lebih dulu sebelum mengurangi 3 pada 2x + 3 = 11. Boleh saja sebenarnya, tapi harus konsisten membagi SEMUA suku. Lebih aman: kurangi konstanta dulu, baru bagi koefisien.

**Jebakan 3: Salah tanda.** "Memindahkan" angka ke ruas lain tapi lupa mengganti tandanya. Kalau bingung dengan trik "pindah ruas", kembali ke cara aman: lakukan operasi kebalikan di kedua sisi.

**Jebakan 4: Tergesa-gesa, tidak mengecek.** Ini yang paling disayangkan, karena gampang dihindari.

**Senjata pamungkas — substitusi balik.** Setelah dapat jawaban, masukkan kembali ke persamaan ASLI. Kalau kiri = kanan, jawabanmu pasti benar. Contoh: dapat x = 4 untuk 2x + 3 = 11? Cek: 2(4) + 3 = 11. Cocok! Dengan kebiasaan mengecek, kamu tak perlu lagi bertanya "jawabanku benar nggak ya?" — kamu bisa membuktikannya sendiri.

Kebiasaan memeriksa inilah yang membedakan orang yang "takut salah" dari orang yang percaya diri dengan jawabannya. Mari rangkum semua yang sudah kita pelajari.`,
          },
          {
            type: "summary",
            title: "Rangkuman: Kamu Sudah Bisa Berbahasa Aljabar",
            keyTakeaway:
              "Aljabar = menerjemahkan masalah jadi persamaan, lalu menyeimbangkan timbangan untuk menemukan x.",
            body: `Mari kristalkan perjalanan kita dari "takut huruf" menjadi "bisa menyelesaikan persamaan".

**Tiga hal terpenting yang harus melekat:**
1. **Variabel hanyalah kotak misterius.** Huruf seperti x adalah nama untuk angka yang belum diketahui — tidak perlu ditakuti. Konstanta itu angka tetap, koefisien itu angka pengali variabel.
2. **Persamaan adalah timbangan.** Apa pun yang kamu lakukan di satu sisi, lakukan sama persis di sisi lain. Untuk menyendirikan x, gunakan operasi kebalikan: lawan tambah adalah kurang, lawan kali adalah bagi.
3. **Bongkar dari luar ke dalam.** Pada persamaan dua langkah, hilangkan konstanta (tambah/kurang) dulu, baru koefisien (kali/bagi).

**Hal yang sering disalahpahami:** banyak yang mengira aljabar itu soal menghafal rumus. Padahal intinya cuma dua keterampilan: (a) **menerjemahkan** cerita jadi persamaan ("misalkan yang dicari = x"), dan (b) **menyeimbangkan** untuk menemukan nilainya. Sisanya latihan.

**Satu kebiasaan emas:** selalu cek jawaban dengan memasukkannya kembali ke persamaan asli. Ini mengubahmu dari penebak menjadi pembukti.

**Aplikasi langsung:** lain kali kamu menghadapi keputusan dengan angka — membandingkan harga paket, menghitung kembalian, membagi biaya patungan — coba tuliskan sebagai persamaan. Kamu akan terkejut betapa sering aljabar dasar menyelesaikan masalah dompet sehari-hari.

Selamat, kamu sudah menguasai fondasi aljabar! Sekarang buktikan pemahamanmu lewat kuis.`,
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahaman Aljabar Dasarmu",
            body: "Pastikan kamu sudah paham variabel dan persamaan linear lewat kuis singkat ini.",
            quizBank: [
              {
                id: "q1",
                question:
                  "Dalam aljabar, apa makna paling tepat dari sebuah variabel seperti 'x'?",
                options: [
                  { id: "a", text: "Angka yang selalu bernilai 10" },
                  { id: "b", text: "Nama/wadah untuk angka yang belum diketahui" },
                  { id: "c", text: "Tanda untuk perkalian" },
                  { id: "d", text: "Huruf yang tidak punya arti apa pun" },
                ],
                correctAnswer: "b",
                explanation:
                  "Variabel adalah simbol untuk nilai yang belum diketahui atau bisa berubah — ibarat 'kotak misterius'. Nilainya kita cari lewat penyelesaian persamaan.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Pada bentuk 7x + 4, manakah yang merupakan koefisien?",
                options: [
                  { id: "a", text: "x" },
                  { id: "b", text: "4" },
                  { id: "c", text: "7" },
                  { id: "d", text: "7x" },
                ],
                correctAnswer: "c",
                explanation:
                  "Koefisien adalah angka yang menempel/mengali variabel. Pada 7x, angka 7 mengali x, jadi 7 adalah koefisien. Angka 4 yang berdiri sendiri adalah konstanta.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question: "Berapakah nilai x dari persamaan x + 9 = 15?",
                options: [
                  { id: "a", text: "x = 6" },
                  { id: "b", text: "x = 24" },
                  { id: "c", text: "x = 9" },
                  { id: "d", text: "x = 15" },
                ],
                correctAnswer: "a",
                explanation:
                  "Kurangi 9 di kedua sisi: x + 9 − 9 = 15 − 9 → x = 6. Cek: 6 + 9 = 15. Benar.",
                difficulty: "easy",
              },
              {
                id: "q4",
                question:
                  "'Sebuah angka dikali 4 hasilnya 28.' Persamaan yang tepat dan nilai x-nya adalah...",
                options: [
                  { id: "a", text: "4 + x = 28, x = 24" },
                  { id: "b", text: "4x = 28, x = 7" },
                  { id: "c", text: "x ÷ 4 = 28, x = 112" },
                  { id: "d", text: "4x = 28, x = 24" },
                ],
                correctAnswer: "b",
                explanation:
                  "'Dikali 4' berarti 4x. Maka 4x = 28. Bagi 4 di kedua sisi: x = 7. Cek: 4 × 7 = 28. Benar.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question: "Berapakah nilai x dari persamaan 3x + 5 = 20?",
                options: [
                  { id: "a", text: "x = 5" },
                  { id: "b", text: "x = 8,3" },
                  { id: "c", text: "x = 25" },
                  { id: "d", text: "x = 15" },
                ],
                correctAnswer: "a",
                explanation:
                  "Kurangi 5 dulu: 3x = 15. Lalu bagi 3: x = 5. Cek: 3(5) + 5 = 20. Benar. Hilangkan konstanta dulu, baru koefisien.",
                difficulty: "medium",
              },
              {
                id: "q6",
                question:
                  "Mengapa saat menyelesaikan 2x + 3 = 11 kita mengurangi 3 di KEDUA sisi, bukan hanya di kiri?",
                options: [
                  { id: "a", text: "Karena aturan acak dalam matematika" },
                  {
                    id: "b",
                    text: "Agar persamaan tetap seimbang (seperti timbangan) sehingga tetap benar",
                  },
                  { id: "c", text: "Karena angka 3 selalu harus dihapus" },
                  { id: "d", text: "Supaya jawabannya menjadi lebih besar" },
                ],
                correctAnswer: "b",
                explanation:
                  "Tanda '=' berarti kedua sisi setara. Jika kita mengubah satu sisi tanpa mengubah sisi lain dengan cara sama, kesetaraan rusak dan persamaan jadi salah.",
                difficulty: "medium",
              },
              {
                id: "q7",
                question:
                  "Tarif parkir: Rp2.000 per jam + biaya masuk Rp3.000. Andi membayar Rp13.000. Berapa jam ia parkir?",
                options: [
                  { id: "a", text: "5 jam" },
                  { id: "b", text: "8 jam" },
                  { id: "c", text: "6,5 jam" },
                  { id: "d", text: "4 jam" },
                ],
                correctAnswer: "a",
                explanation:
                  "Misal jam = x: 2.000x + 3.000 = 13.000. Kurangi 3.000: 2.000x = 10.000. Bagi 2.000: x = 5. Cek: 2.000(5) + 3.000 = 13.000. Benar.",
                difficulty: "hard",
              },
              {
                id: "q8",
                question:
                  "Seseorang menyelesaikan 5x − 2 = 18 dan mendapat x = 3,2. Apa yang sebaiknya ia lakukan untuk MEMASTIKAN benar/salah?",
                options: [
                  { id: "a", text: "Bertanya ke teman" },
                  {
                    id: "b",
                    text: "Memasukkan x = 3,2 ke persamaan asli dan cek apakah kiri = kanan",
                  },
                  { id: "c", text: "Mengulang dari awal dengan angka berbeda" },
                  { id: "d", text: "Menerima saja karena sudah selesai" },
                ],
                correctAnswer: "b",
                explanation:
                  "Substitusi balik: 5(3,2) − 2 = 16 − 2 = 14, padahal seharusnya 18 → berarti SALAH. Yang benar: 5x = 20, x = 4. Mengecek dengan substitusi membuktikan jawaban tanpa perlu bertanya.",
                difficulty: "hard",
              },
              {
                id: "q9",
                question:
                  "Manakah penerjemahan yang BENAR dari 'sisa uang setelah belanja x adalah Rp4.000, jika uang awal Rp10.000'?",
                options: [
                  { id: "a", text: "10.000 + x = 4.000" },
                  { id: "b", text: "10.000 − x = 4.000" },
                  { id: "c", text: "x − 10.000 = 4.000" },
                  { id: "d", text: "10.000x = 4.000" },
                ],
                correctAnswer: "b",
                explanation:
                  "Uang awal dikurangi belanja (x) menghasilkan sisa: 10.000 − x = 4.000. Dari sini x = 6.000. Kata 'sisa setelah dikurangi' menandakan operasi pengurangan.",
                difficulty: "medium",
              },
              {
                id: "q10",
                question:
                  "Saat membongkar persamaan dua langkah seperti 4x + 6 = 26, mengapa kita mengurangi 6 DULU sebelum membagi 4?",
                options: [
                  { id: "a", text: "Karena 6 lebih kecil dari 4" },
                  {
                    id: "b",
                    text: "Karena kita membongkar dengan urutan terbalik dari saat membangunnya (kupas dari lapisan luar)",
                  },
                  { id: "c", text: "Karena pembagian selalu dilakukan terakhir" },
                  { id: "d", text: "Tidak ada alasan, hasilnya pasti sama saja" },
                ],
                correctAnswer: "b",
                explanation:
                  "Membangun: x dikali 4 LALU ditambah 6. Membongkar berjalan mundur: hilangkan +6 dulu (jadi 4x = 20), baru bagi 4 (x = 5). Seperti melepas sepatu sebelum kaus kaki.",
                difficulty: "hard",
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
