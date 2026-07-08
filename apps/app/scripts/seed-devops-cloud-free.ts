import { createCourse, prisma } from "./_seed-helpers";

async function main() {
  await createCourse({
    title: "Pengantar Cloud Computing — Konsep Dasar Komputasi Awan",
    slug: "pengantar-cloud-computing",
    description:
      "Pelajari konsep dasar cloud computing dari nol — mulai dari apa itu cloud, model layanan (IaaS, PaaS, SaaS), hingga model deployment. Cocok untuk siapa saja yang ingin memahami teknologi di balik layanan digital modern seperti Netflix, Gojek, dan Google Drive.",
    categorySlug: "devops-tools",
    difficulty: "BEGINNER",
    isPremium: false,
    modules: [
      // ============================================================
      // MODUL 1: Apa Itu Cloud Computing?
      // ============================================================
      {
        title: "Apa Itu Cloud Computing?",
        slug: "apa-itu-cloud-computing",
        xpReward: 50,
        slides: [
          // --- SLIDE 1: Intro ---
          {
            type: "lesson",
            title: "Selamat Datang di Dunia Cloud Computing!",
            body: `Bayangkan kamu punya sebuah bisnis kecil — toko online yang menjual keripik singkong. Bisnis mulai ramai, pesanan datang dari mana-mana. Kamu butuh komputer yang lebih kuat untuk mengelola data pesanan, menyimpan foto produk, dan menjalankan website tokomu. Tapi beli server sendiri? Mahal. Sewa ruang server? Ribet urusannya.

Di sinilah **cloud computing** hadir sebagai penyelamat. Alih-alih beli dan rawat server fisik sendiri, kamu cukup "menyewa" kapasitas komputasi dari penyedia layanan cloud melalui internet. Persis seperti menyewa rumah — kamu tinggal pakai, tanpa harus bangun dari nol.

Dalam modul ini, kamu akan mempelajari:

- **Apa sebenarnya cloud computing itu** — definisi yang mudah dipahami, bukan jargon teknis
- **Bagaimana cloud computing bekerja** — dari sisi infrastruktur hingga cara kamu mengaksesnya
- **Kenapa cloud computing penting** — mengapa hampir semua perusahaan teknologi modern menggunakannya
- **Komponen utama cloud** — server, storage, dan jaringan yang membentuk "awan" digital
- **Keuntungan dan risiko** — agar kamu bisa menilai kapan cloud cocok dan kapan tidak

Setelah menyelesaikan modul ini, kamu akan punya fondasi yang kuat untuk memahami bagaimana layanan-layanan digital yang kamu pakai sehari-hari (Google Drive, Netflix, Spotify, Grab) sebenarnya berjalan di balik layar. Kamu juga akan bisa menjelaskan cloud computing kepada teman atau rekan kerja dengan bahasa yang sederhana dan mudah dipahami.

Siap? Mari kita mulai perjalanan ke "awan" digital! ☁️`,
            keyTakeaway:
              "Cloud computing adalah cara menyewa sumber daya komputasi lewat internet, tanpa perlu memiliki infrastruktur fisik sendiri.",
            sources: [
              {
                type: "DOCUMENTATION",
                title: "What is Cloud Computing? — AWS",
                url: "https://aws.amazon.com/what-is-cloud-computing/",
              },
              {
                type: "ARTICLE",
                title: "Komputasi Awan — Wikipedia Indonesia",
                url: "https://id.wikipedia.org/wiki/Komputasi_awan",
              },
              {
                type: "YOUTUBE",
                title:
                  "Cloud Computing Tutorial for Beginners",
                url: "https://www.youtube.com/watch?v=M988_fsOSWo",
              },
              {
                type: "DOCUMENTATION",
                title: "What is Cloud Computing? — Google Cloud",
                url: "https://cloud.google.com/learn/what-is-cloud-computing",
              },
            ],
          },

          // --- SLIDE 2: Definisi Cloud Computing ---
          {
            type: "lesson",
            title: "Definisi Cloud Computing: Menyewa, Bukan Membeli",
            body: `**Cloud computing** (komputasi awan) adalah model penyediaan layanan komputasi — termasuk server, penyimpanan data, database, jaringan, perangkat lunak, dan lainnya — melalui internet (yang sering disebut "the cloud"). Alih-alih membeli dan memelihara perangkat keras sendiri, kamu membayar hanya untuk layanan yang kamu gunakan, mirip seperti membayar tagihan listrik.

### Analogi Sederhana: Cloud = PLN untuk Komputer

Coba pikirkan listrik di rumahmu. Apakah kamu perlu membangun pembangkit listrik sendiri untuk menyalakan lampu? Tentu tidak. Kamu cukup berlangganan ke PLN, colokkan kabel, dan bayar sesuai pemakaian. Cloud computing bekerja dengan prinsip yang sama persis.

Sebelum ada cloud computing, perusahaan harus:
- **Membeli server fisik** — harganya bisa puluhan hingga ratusan juta rupiah per unit
- **Menyewa ruang data center** — ruangan khusus dengan pendingin dan keamanan ekstra
- **Mempekerjakan tim IT khusus** — untuk merawat, memperbarui, dan memperbaiki server
- **Membayar listrik dan pendingin** — server butuh daya listrik yang besar dan ruangan bersuhu rendah

Dengan cloud computing, semua itu diurus oleh penyedia layanan cloud (cloud provider) seperti **Amazon Web Services (AWS)**, **Google Cloud Platform (GCP)**, atau **Microsoft Azure**. Kamu cukup pilih layanan yang kamu butuhkan, konfigurasi sesuai kebutuhan, dan mulai gunakan — semuanya melalui internet.

**Karakteristik utama cloud computing menurut NIST** (National Institute of Standards and Technology):
1. **On-demand self-service** — kamu bisa mengatur sendiri tanpa perlu menghubungi siapa pun
2. **Broad network access** — bisa diakses dari mana saja selama ada internet
3. **Resource pooling** — sumber daya dipakai bersama oleh banyak pengguna
4. **Rapid elasticity** — kapasitas bisa ditambah atau dikurangi secara cepat
5. **Measured service** — penggunaan diukur dan dibayar sesuai pemakaian`,
            keyTakeaway:
              "Cloud computing = menyewa sumber daya komputasi lewat internet dan membayar sesuai pemakaian, seperti berlangganan listrik ke PLN.",
          },

          // --- SLIDE 3: Sejarah Cloud Computing ---
          {
            type: "lesson",
            title: "Dari Mainframe ke Cloud: Perjalanan 60 Tahun Komputasi",
            body: `Cloud computing terasa seperti teknologi baru, tapi sebenarnya konsep ini sudah berkembang selama puluhan tahun. Mari kita telusuri perjalanannya agar kamu paham mengapa cloud computing menjadi standar industri saat ini.

### Era Mainframe (1950-1970an)
Komputer pertama berukuran seluas ruangan. Karena sangat mahal, satu komputer mainframe dipakai bersama oleh banyak pengguna melalui **terminal** — layar sederhana yang terhubung ke komputer pusat. Konsep "berbagi sumber daya komputasi" ini sebenarnya adalah cikal bakal cloud computing.

### Era Client-Server (1980-1990an)
Komputer menjadi lebih kecil dan terjangkau. Perusahaan mulai memiliki server sendiri di kantor. Tapi masalahnya tetap sama — server perlu dirawat, di-upgrade, dan membutuhkan ruang khusus. Kalau server rusak, seluruh operasi kantor bisa terhenti.

### Kelahiran Internet & Virtualisasi (1990-2000an)
Internet mulai tersebar luas, dan teknologi **virtualisasi** (menjalankan banyak "komputer virtual" di satu mesin fisik) menjadi matang. VMware didirikan tahun 1998 dan mengubah cara industri berpikir tentang server. Satu server fisik kini bisa menjalankan puluhan server virtual.

### AWS Memulai Revolusi (2006)
**Amazon Web Services** meluncurkan layanan cloud pertamanya: **S3** (Simple Storage Service) dan **EC2** (Elastic Compute Cloud) pada tahun 2006. Ini adalah momen yang mengubah segalanya. Tiba-tiba, startup kecil di garasi bisa mengakses infrastruktur yang sama kuatnya dengan perusahaan Fortune 500 — cukup dengan kartu kredit dan koneksi internet.

### Era Cloud Modern (2010-sekarang)
Google Cloud Platform diluncurkan tahun 2010, Microsoft Azure menyusul dengan pertumbuhan agresif. Kini hampir semua aplikasi yang kamu gunakan sehari-hari berjalan di cloud — dari Instagram, WhatsApp, Gojek, Tokopedia, hingga Netflix. Pandemi COVID-19 di tahun 2020 bahkan mempercepat adopsi cloud secara dramatis karena kebutuhan kerja dari rumah.

Fakta menarik: pada tahun 2024, **lebih dari 94% perusahaan di dunia** sudah menggunakan cloud computing dalam bentuk tertentu.`,
            keyTakeaway:
              "Cloud computing bukan teknologi baru — ia evolusi dari konsep berbagi sumber daya komputasi yang sudah ada sejak era mainframe tahun 1950an.",
          },

          // --- SLIDE 4: Komponen Utama Cloud ---
          {
            type: "lesson",
            title: "Komponen Utama Cloud: Server, Storage & Network",
            body: `Awan digital terdiri dari tiga komponen utama yang saling terhubung. Memahami ketiga komponen ini akan membantumu mengerti bagaimana layanan cloud bekerja secara keseluruhan.

### 1. Compute (Komputasi) — Otak dari Cloud

Ini adalah "kekuatan pemrosesan" yang menjalankan aplikasi dan software. Di dunia fisik, ini setara dengan prosesor (CPU) dan memori (RAM) di komputermu. Di cloud, kamu bisa menyewa kekuatan komputasi dalam berbagai bentuk:

- **Virtual Machine (VM)** — komputer virtual yang berjalan di atas server fisik milik cloud provider. Kamu bisa pilih berapa banyak CPU, RAM, dan kapasitas yang dibutuhkan.
- **Container** — versi lebih ringan dari VM, cocok untuk menjalankan aplikasi modern yang dikemas dalam unit-unit kecil.
- **Serverless** — kamu cukup kirim kode programmu, cloud yang mengurus semuanya. Tidak perlu tahu ada server di belakangnya.

### 2. Storage (Penyimpanan) — Gudang Data Digital

Semua data butuh tempat tinggal. Cloud menyediakan berbagai jenis penyimpanan:

- **Object Storage** — untuk menyimpan file seperti foto, video, dan dokumen. Contoh: Google Drive, iCloud, Amazon S3.
- **Block Storage** — seperti hard disk virtual yang dipasang ke server cloud. Cepat dan cocok untuk database.
- **File Storage** — sistem file tradisional yang bisa diakses bersama oleh banyak server.

Analogi sederhananya: object storage itu seperti lemari arsip (ambil file berdasarkan nama), block storage seperti hard disk eksternal (cepat tapi harus "dipasang"), dan file storage seperti folder bersama di kantor.

### 3. Network (Jaringan) — Jalan Tol Data

Jaringan menghubungkan semua komponen di atas dan memastikan data bisa berpindah dengan cepat dan aman:

- **Virtual Private Cloud (VPC)** — jaringan privat virtual yang kamu buat di dalam cloud
- **Load Balancer** — membagi beban trafik ke beberapa server agar tidak ada yang kewalahan
- **CDN (Content Delivery Network)** — menyimpan salinan konten di banyak lokasi agar pengguna mendapat akses yang cepat

Bayangkan kamu punya restoran online. Compute adalah koki yang memasak pesanan, storage adalah gudang bahan baku, dan network adalah kurir yang mengantar makanan. Tanpa salah satu, restoran tidak bisa beroperasi.`,
            keyTakeaway:
              "Cloud terdiri dari tiga pilar: Compute (pemrosesan), Storage (penyimpanan), dan Network (jaringan) — ketiganya saling terhubung untuk menjalankan layanan digital.",
          },

          // --- SLIDE 5: Keuntungan Cloud Computing ---
          {
            type: "lesson",
            title: "6 Keuntungan Cloud Computing yang Mengubah Segalanya",
            body: `Cloud computing bukan sekadar tren — ia mengubah cara perusahaan dan individu bekerja dengan teknologi. Berikut adalah enam keuntungan utama yang membuat cloud computing menjadi pilihan dominan di industri:

### 1. Hemat Biaya (Cost Efficiency)
Tidak perlu investasi awal untuk membeli server. Kamu membayar berdasarkan pemakaian — istilahnya **pay-as-you-go**. Ini seperti naik taksi online: kamu bayar per kilometer, bukan beli mobilnya. Sebuah startup bisa mulai dengan anggaran Rp 0 menggunakan **free tier** yang disediakan oleh AWS, Google Cloud, atau Azure.

### 2. Skalabilitas (Scalability)
Bayangkan kamu punya toko online dan tiba-tiba ada **flash sale**. Trafik naik 100x lipat dalam hitungan menit. Kalau pakai server sendiri, website pasti crash. Dengan cloud, kamu bisa menambah kapasitas secara otomatis (**auto-scaling**) saat dibutuhkan, dan menguranginya saat trafik kembali normal. Kamu hanya bayar untuk kapasitas yang benar-benar terpakai.

### 3. Akses Global (Global Reach)
Cloud provider memiliki data center di seluruh dunia. Artinya, aplikasimu bisa diakses dengan kecepatan tinggi dari Jakarta, Tokyo, New York, atau Lagos — tanpa kamu perlu membangun server di setiap kota. AWS misalnya punya **33+ region** dengan lebih dari 100 Availability Zone di seluruh dunia.

### 4. Kecepatan Deployment
Dulu, menyiapkan server baru bisa memakan waktu berminggu-minggu — pesan hardware, kirim ke data center, pasang, konfigurasi. Dengan cloud, kamu bisa meluncurkan server baru dalam **hitungan menit**, bahkan detik. Ini mempercepat inovasi secara drastis.

### 5. Keamanan Terkelola
Cloud provider seperti AWS menginvestasikan **miliaran dolar per tahun** untuk keamanan. Mereka memiliki tim keamanan khusus yang bekerja 24/7, memenuhi sertifikasi keamanan internasional (ISO 27001, SOC 2, PCI DSS), dan mengenkripsi data secara default. Untuk kebanyakan bisnis, keamanan di cloud justru **lebih baik** daripada keamanan server di kantor sendiri.

### 6. Fokus pada Bisnis, Bukan Infrastruktur
Dengan cloud, tim IT bisa fokus mengembangkan produk dan fitur baru, bukan sibuk merawat server. Ini adalah keuntungan yang sering diremehkan tapi dampaknya sangat besar — terutama untuk startup yang harus bergerak cepat dengan tim kecil.`,
            keyTakeaway:
              "Cloud computing menawarkan hemat biaya, skalabilitas, akses global, deployment cepat, keamanan terkelola, dan membebaskan tim untuk fokus pada inovasi.",
            sources: [
              {
                type: "DOCUMENTATION",
                title: "Six Advantages of Cloud Computing — AWS",
                url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
              },
              {
                type: "YOUTUBE",
                title: "Cloud Computing In 6 Minutes | What Is Cloud Computing?",
                url: "https://www.youtube.com/watch?v=M988_fsOSWo",
              },
            ],
          },

          // --- SLIDE 6: Risiko & Tantangan Cloud ---
          {
            type: "lesson",
            title: "Risiko & Tantangan Cloud Computing yang Harus Kamu Tahu",
            body: `Cloud computing memang luar biasa, tapi bukan berarti tanpa risiko. Seperti teknologi apapun, ada tantangan yang harus kamu pahami agar bisa membuat keputusan yang tepat.

### 1. Ketergantungan pada Internet
Cloud computing butuh koneksi internet. Tanpa internet, kamu tidak bisa mengakses data atau menjalankan aplikasi di cloud. Di Indonesia, meski infrastruktur internet sudah membaik, masih ada daerah dengan koneksi yang tidak stabil. Ini menjadi pertimbangan penting, terutama untuk bisnis yang membutuhkan ketersediaan 24/7.

### 2. Vendor Lock-in
Setelah kamu membangun aplikasi di satu cloud provider (misalnya AWS), pindah ke provider lain (misalnya Google Cloud) bisa jadi sangat rumit dan mahal. Ini disebut **vendor lock-in** — kamu "terkunci" pada satu vendor. Beberapa layanan seperti AWS Lambda atau Google BigQuery punya fitur spesifik yang tidak ada padanannya di provider lain.

**Solusi:** Gunakan teknologi standar terbuka seperti **Docker** dan **Kubernetes** yang bisa berjalan di mana saja, atau gunakan pendekatan **multi-cloud** (memakai lebih dari satu provider).

### 3. Keamanan & Privasi Data
Meskipun cloud provider menyediakan keamanan infrastruktur yang sangat baik, keamanan data tetap **tanggung jawab bersama** — disebut **Shared Responsibility Model**. Cloud provider mengamankan "awan"-nya (infrastruktur fisik, jaringan, hypervisor), tapi kamu bertanggung jawab mengamankan data, konfigurasi akses, dan aplikasi yang kamu taruh di atas awan tersebut. Banyak insiden kebocoran data terjadi bukan karena cloud-nya lemah, tapi karena pengguna salah mengkonfigurasi akses.

### 4. Biaya yang Tidak Terduga
Model pay-as-you-go memang fleksibel, tapi bisa menjadi bumerang kalau tidak dimonitor. Banyak cerita horor tentang tagihan cloud yang membengkak — dari developer yang lupa mematikan server tes, hingga konfigurasi auto-scaling yang salah sehingga meluncurkan ratusan server tanpa perlu. AWS bahkan menyediakan fitur **billing alerts** khusus untuk menghindari kejutan di akhir bulan.

### 5. Latensi (Latency)
Data harus melakukan perjalanan dari komputermu ke server cloud melalui internet. Untuk aplikasi yang membutuhkan respons super cepat (seperti game online atau trading saham), latensi ini bisa menjadi masalah. Solusinya adalah memilih region cloud yang dekat dengan pengguna dan menggunakan **CDN** (Content Delivery Network).`,
            keyTakeaway:
              "Cloud computing punya risiko seperti ketergantungan internet, vendor lock-in, dan biaya tak terduga — pahami risiko ini agar bisa mitigasi dengan tepat.",
          },

          // --- SLIDE 7: Studi Kasus ---
          {
            type: "casestudy",
            title: "Studi Kasus: Bagaimana Perusahaan Indonesia Menggunakan Cloud",
            body: `Cloud computing bukan hanya untuk perusahaan Silicon Valley. Banyak perusahaan Indonesia sudah mengadopsi cloud untuk mendukung operasional mereka. Mari kita lihat beberapa contoh nyata yang menunjukkan bagaimana cloud mengubah bisnis di Indonesia.

### Gojek — Dari Startup Kecil ke Super App

Gojek dimulai sebagai call center kecil dengan 20 pengemudi ojek di tahun 2010. Ketika meluncurkan aplikasi mobile tahun 2015, mereka menghadapi pertumbuhan pengguna yang eksplosif — dari ribuan menjadi jutaan dalam hitungan bulan. Tanpa cloud computing, Gojek tidak mungkin menangani pertumbuhan secepat itu. Mereka menggunakan **Google Cloud Platform** untuk menangani jutaan transaksi per hari, memproses data lokasi real-time, dan menjalankan algoritma matching driver-penumpang.

### Tokopedia — Menangani 1.5 Miliar Kunjungan Per Bulan

Tokopedia menggunakan **Google Cloud** untuk menangani trafik masif — terutama saat event penjualan besar seperti Waktu Indonesia Belanja (WIB). Selama event, trafik bisa melonjak hingga 10x lipat. Cloud auto-scaling memungkinkan mereka menambah kapasitas server secara otomatis saat trafik tinggi dan menguranginya saat normal, menghemat biaya infrastruktur secara signifikan.

### Halodoc — Telemedicine yang Menyelamatkan Nyawa

Selama pandemi COVID-19, Halodoc mengalami lonjakan pengguna hingga 10 kali lipat. Berkat infrastruktur cloud di **AWS**, mereka bisa melayani jutaan konsultasi kesehatan online tanpa downtime. Cloud memungkinkan mereka meluncurkan fitur baru (seperti tracking vaksin) dalam hitungan hari, bukan bulan.

### Pelajaran dari Ketiga Kasus Ini

Ketiga perusahaan di atas memiliki kesamaan: mereka semua memulai dengan skala kecil dan menggunakan cloud untuk **tumbuh dengan cepat tanpa terbebani oleh infrastruktur fisik**. Tanpa cloud, mereka harus memesan server berminggu-minggu sebelumnya, memprediksi trafik jauh-jauh hari (dan sering salah), serta mengeluarkan modal besar di awal.

Cloud computing meratakan playing field — startup garasi dengan budget Rp 500.000/bulan bisa mengakses infrastruktur yang sama dengan korporasi bernilai triliunan rupiah. Yang membedakan hanyalah skala penggunaan.`,
            keyTakeaway:
              "Gojek, Tokopedia, dan Halodoc membuktikan bahwa cloud memungkinkan perusahaan Indonesia tumbuh dari startup kecil menjadi raksasa teknologi tanpa terbebani infrastruktur fisik.",
            sources: [
              {
                type: "ARTICLE",
                title: "Google Cloud Customers — Gojek",
                url: "https://cloud.google.com/customers/gojek",
              },
              {
                type: "ARTICLE",
                title: "Google Cloud Customers — Tokopedia",
                url: "https://cloud.google.com/customers/tokopedia",
              },
            ],
          },

          // --- SLIDE 8: Cloud vs On-Premise ---
          {
            type: "lesson",
            title: "Cloud vs On-Premise: Mana yang Lebih Cocok?",
            body: `Salah satu pertanyaan paling sering ditanyakan adalah: "Apakah cloud selalu lebih baik daripada server sendiri (on-premise)?" Jawabannya: **tergantung**. Mari kita bandingkan keduanya secara jujur.

### Apa itu On-Premise?
**On-premise** berarti kamu membeli, memasang, dan merawat server fisik sendiri — biasanya di data center milik perusahaan atau di ruang server kantor. Semua kendali ada di tanganmu, tapi semua tanggung jawab juga ada di pundakmu.

### Perbandingan Head-to-Head

**Biaya Awal:**
- Cloud: **Rendah** — mulai dari gratis (free tier), bayar per pemakaian
- On-premise: **Tinggi** — beli server, UPS, AC, rak, dan ruang khusus

**Biaya Operasional:**
- Cloud: **Variabel** — bisa membengkak kalau tidak dimonitor
- On-premise: **Tetap** — gaji tim IT, listrik, maintenance sudah terprediksi

**Skalabilitas:**
- Cloud: **Sangat fleksibel** — tambah/kurangi kapasitas dalam menit
- On-premise: **Kaku** — butuh minggu hingga bulan untuk upgrade

**Keamanan:**
- Cloud: **Shared responsibility** — provider urus infrastruktur, kamu urus data
- On-premise: **Full control** — kamu urus semuanya, tapi juga tanggung jawab penuh

**Kapan Cloud Lebih Cocok:**
- Startup dan bisnis kecil yang butuh fleksibilitas
- Aplikasi dengan trafik yang fluktuatif (e-commerce saat flash sale)
- Tim yang ingin fokus ke produk, bukan infrastruktur
- Proyek yang butuh deployment cepat

**Kapan On-Premise Lebih Cocok:**
- Regulasi ketat yang mengharuskan data di server sendiri (misalnya: perbankan tertentu, militer)
- Beban kerja yang sangat stabil dan bisa diprediksi
- Perusahaan besar yang sudah punya investasi infrastruktur dan tim IT dedicated

**Solusi Tengah: Hybrid Cloud**
Banyak perusahaan menggunakan pendekatan **hybrid** — data sensitif di on-premise, workload fleksibel di cloud. Contohnya, bank bisa menyimpan data nasabah di server sendiri, tapi menjalankan website dan aplikasi mobile di cloud. Ini memberikan keseimbangan antara keamanan dan fleksibilitas.`,
            keyTakeaway:
              "Tidak ada jawaban mutlak — cloud cocok untuk fleksibilitas dan kecepatan, on-premise untuk kontrol penuh. Banyak perusahaan menggunakan hybrid sebagai jalan tengah.",
          },

          // --- SLIDE 9: Rangkuman ---
          {
            type: "summary",
            title: "Rangkuman: Fondasi Cloud Computing",
            body: `Selamat! Kamu sudah menyelesaikan modul pertama dan punya fondasi yang kuat tentang cloud computing. Mari kita rekapitulasi poin-poin penting yang sudah kita bahas:

### Definisi & Konsep Utama
Cloud computing adalah model penyediaan layanan komputasi melalui internet dengan prinsip **pay-as-you-go** — mirip berlangganan listrik ke PLN. Kamu tidak perlu membeli dan merawat server sendiri, cukup "menyewa" dari cloud provider.

### Perjalanan Sejarah
Dari mainframe tahun 1950an, era client-server tahun 1990an, hingga revolusi AWS tahun 2006 yang memungkinkan siapa saja mengakses infrastruktur kelas dunia. Pada tahun 2024, lebih dari 94% perusahaan sudah mengadopsi cloud.

### Tiga Pilar Cloud
1. **Compute** — kekuatan pemrosesan (VM, container, serverless)
2. **Storage** — penyimpanan data (object, block, file storage)
3. **Network** — jaringan yang menghubungkan semuanya (VPC, load balancer, CDN)

### Keuntungan Utama
Hemat biaya, skalabilitas, akses global, deployment cepat, keamanan terkelola, dan fokus pada inovasi.

### Risiko & Mitigasi
Ketergantungan internet, vendor lock-in, shared responsibility untuk keamanan, biaya yang bisa membengkak, dan latensi. Semua bisa dimitigasi dengan perencanaan yang baik.

### Studi Kasus Indonesia
Gojek (Google Cloud), Tokopedia (Google Cloud), dan Halodoc (AWS) membuktikan cloud computing memungkinkan pertumbuhan eksponensial.

### Cloud vs On-Premise
Tidak ada solusi yang sempurna untuk semua kasus. Cloud cocok untuk fleksibilitas, on-premise untuk kontrol penuh, dan hybrid menjadi pilihan populer bagi banyak perusahaan.

Di modul berikutnya, kita akan mendalami **model layanan cloud** — IaaS, PaaS, dan SaaS — serta model deployment (public, private, hybrid) yang menentukan bagaimana cloud diimplementasikan dalam berbagai skenario bisnis.`,
            keyTakeaway:
              "Cloud computing = menyewa komputasi lewat internet (pay-as-you-go), terdiri dari compute, storage, dan network, dengan keuntungan skalabilitas dan hemat biaya.",
          },

          // --- SLIDE 10: KUIS ---
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang Cloud Computing",
            body: "Sebelum melanjutkan ke modul berikutnya, pastikan kamu sudah memahami konsep dasar cloud computing. Kuis ini terdiri dari 5 soal acak dari bank soal — kamu butuh skor minimal 60% untuk lulus.",
            quizBank: [
              {
                id: "q1",
                question:
                  "Apa analogi yang paling tepat untuk menjelaskan model pembayaran cloud computing?",
                options: [
                  { id: "a", text: "Membeli rumah secara tunai" },
                  { id: "b", text: "Berlangganan listrik dan bayar sesuai pemakaian" },
                  { id: "c", text: "Menyewa gudang dengan kontrak 10 tahun" },
                  { id: "d", text: "Membeli franchise restoran" },
                ],
                correctAnswer: "b",
                explanation:
                  "Cloud computing menggunakan model pay-as-you-go, mirip berlangganan listrik — kamu bayar sesuai pemakaian, tanpa perlu membangun pembangkit sendiri. Membeli rumah (a) lebih mirip on-premise karena modal besar di awal.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question:
                  "Tahun berapa Amazon Web Services (AWS) meluncurkan layanan cloud pertamanya (S3 dan EC2)?",
                options: [
                  { id: "a", text: "2000" },
                  { id: "b", text: "2003" },
                  { id: "c", text: "2006" },
                  { id: "d", text: "2010" },
                ],
                correctAnswer: "c",
                explanation:
                  "AWS meluncurkan S3 (Simple Storage Service) dan EC2 (Elastic Compute Cloud) pada tahun 2006, menandai dimulainya era cloud computing modern yang bisa diakses publik secara luas.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question:
                  "Dalam konteks cloud computing, apa yang dimaksud dengan 'Shared Responsibility Model'?",
                options: [
                  { id: "a", text: "Biaya cloud dibagi rata antara semua pengguna" },
                  { id: "b", text: "Cloud provider bertanggung jawab atas infrastruktur, pengguna bertanggung jawab atas data dan konfigurasi" },
                  { id: "c", text: "Dua cloud provider berbagi tanggung jawab mengelola satu data center" },
                  { id: "d", text: "Tim developer dan tim ops berbagi tanggung jawab deployment" },
                ],
                correctAnswer: "b",
                explanation:
                  "Shared Responsibility Model berarti keamanan adalah tanggung jawab bersama: cloud provider mengamankan infrastruktur (hardware, jaringan, data center), sementara pengguna bertanggung jawab mengamankan data, konfigurasi akses, dan aplikasi mereka.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question:
                  "Manakah yang BUKAN termasuk tiga pilar utama (komponen) cloud computing?",
                options: [
                  { id: "a", text: "Compute (Komputasi)" },
                  { id: "b", text: "Storage (Penyimpanan)" },
                  { id: "c", text: "Blockchain" },
                  { id: "d", text: "Network (Jaringan)" },
                ],
                correctAnswer: "c",
                explanation:
                  "Tiga pilar utama cloud computing adalah Compute, Storage, dan Network. Blockchain adalah teknologi tersendiri yang memang bisa berjalan di atas cloud, tapi bukan komponen fundamental cloud.",
                difficulty: "easy",
              },
              {
                id: "q5",
                question:
                  "Apa keuntungan utama auto-scaling di cloud computing?",
                options: [
                  { id: "a", text: "Membuat website terlihat lebih bagus" },
                  { id: "b", text: "Menambah dan mengurangi kapasitas server secara otomatis sesuai trafik" },
                  { id: "c", text: "Mengurangi ukuran file gambar secara otomatis" },
                  { id: "d", text: "Memperbarui software secara otomatis" },
                ],
                correctAnswer: "b",
                explanation:
                  "Auto-scaling secara otomatis menambah server saat trafik tinggi (misalnya flash sale) dan menguranginya saat trafik rendah, sehingga kamu hanya bayar sesuai kebutuhan dan website tetap responsif.",
                difficulty: "easy",
              },
              {
                id: "q6",
                question:
                  "Apa yang dimaksud dengan vendor lock-in dalam cloud computing?",
                options: [
                  { id: "a", text: "Cloud provider mengunci akun pengguna yang tidak bayar" },
                  { id: "b", text: "Kesulitan berpindah dari satu cloud provider ke provider lain karena ketergantungan pada layanan spesifik" },
                  { id: "c", text: "Server cloud terkunci secara fisik di data center" },
                  { id: "d", text: "Data dienkripsi sehingga tidak bisa dibaca" },
                ],
                correctAnswer: "b",
                explanation:
                  "Vendor lock-in terjadi ketika kamu sangat bergantung pada layanan spesifik satu provider (misalnya AWS Lambda), sehingga migrasi ke provider lain menjadi mahal dan rumit. Solusinya adalah menggunakan teknologi standar terbuka seperti Docker dan Kubernetes.",
                difficulty: "medium",
              },
              {
                id: "q7",
                question:
                  "Seorang pengusaha UMKM ingin membuat toko online sederhana. Dia punya budget terbatas dan tidak punya tim IT. Pendekatan mana yang paling cocok?",
                options: [
                  { id: "a", text: "Membeli server fisik dan merawatnya sendiri" },
                  { id: "b", text: "Menggunakan cloud computing dengan free tier" },
                  { id: "c", text: "Membangun data center sendiri" },
                  { id: "d", text: "Menyewa ruang di co-location data center" },
                ],
                correctAnswer: "b",
                explanation:
                  "Untuk UMKM dengan budget terbatas dan tanpa tim IT, cloud computing dengan free tier (seperti AWS Free Tier atau Google Cloud Free Tier) adalah pilihan paling tepat. Tidak ada biaya awal, skalabel, dan tidak perlu keahlian mengelola hardware.",
                difficulty: "medium",
              },
              {
                id: "q8",
                question:
                  "Apa perbedaan utama antara object storage dan block storage di cloud?",
                options: [
                  { id: "a", text: "Object storage untuk file, block storage seperti hard disk virtual yang dipasang ke server" },
                  { id: "b", text: "Object storage lebih mahal, block storage gratis" },
                  { id: "c", text: "Object storage hanya untuk gambar, block storage untuk semua jenis file" },
                  { id: "d", text: "Tidak ada perbedaan, keduanya sama saja" },
                ],
                correctAnswer: "a",
                explanation:
                  "Object storage (seperti S3) menyimpan file sebagai objek yang diakses via URL/API — cocok untuk foto, video, dan backup. Block storage seperti hard disk virtual yang 'dipasang' ke server cloud — cepat dan cocok untuk database yang butuh akses I/O tinggi.",
                difficulty: "hard",
              },
              {
                id: "q9",
                question:
                  "Menurut NIST, manakah yang merupakan karakteristik utama cloud computing?",
                options: [
                  { id: "a", text: "Harus menggunakan sistem operasi Linux" },
                  { id: "b", text: "On-demand self-service dan rapid elasticity" },
                  { id: "c", text: "Hanya bisa diakses dari kantor" },
                  { id: "d", text: "Membutuhkan kontrak minimal 5 tahun" },
                ],
                correctAnswer: "b",
                explanation:
                  "NIST mendefinisikan 5 karakteristik cloud computing: on-demand self-service, broad network access, resource pooling, rapid elasticity, dan measured service. Cloud tidak terbatas pada Linux saja, bisa diakses dari mana saja, dan tidak memerlukan kontrak jangka panjang.",
                difficulty: "medium",
              },
              {
                id: "q10",
                question:
                  "Mengapa pendekatan hybrid cloud menjadi pilihan populer bagi banyak perusahaan?",
                options: [
                  { id: "a", text: "Karena hybrid cloud sepenuhnya gratis" },
                  { id: "b", text: "Karena menggabungkan kontrol on-premise untuk data sensitif dengan fleksibilitas cloud untuk workload lainnya" },
                  { id: "c", text: "Karena diwajibkan oleh undang-undang di semua negara" },
                  { id: "d", text: "Karena hybrid cloud lebih cepat daripada cloud murni" },
                ],
                correctAnswer: "b",
                explanation:
                  "Hybrid cloud populer karena memberikan keseimbangan — data sensitif (misalnya data nasabah bank) tetap di server on-premise dengan kontrol penuh, sementara workload yang butuh skalabilitas (seperti website dan mobile app) berjalan di cloud publik.",
                difficulty: "hard",
              },
            ],
          },
        ],
      },

      // ============================================================
      // MODUL 2: Model Layanan Cloud: IaaS, PaaS, SaaS
      // ============================================================
      {
        title: "Model Layanan Cloud: IaaS, PaaS, SaaS",
        slug: "model-layanan-cloud-iaas-paas-saas",
        xpReward: 60,
        slides: [
          // --- SLIDE 1: Intro ---
          {
            type: "lesson",
            title: "Mengenal Tiga Model Layanan Cloud",
            body: `Di modul sebelumnya, kamu sudah memahami apa itu cloud computing dan bagaimana cara kerjanya. Sekarang, pertanyaan penting berikutnya: **apa saja yang bisa kamu "sewa" dari cloud?**

Ternyata, cloud computing tidak hanya satu jenis layanan. Ada spektrum luas mulai dari menyewa infrastruktur mentah (server dan jaringan) hingga langsung menggunakan software siap pakai. Perbedaan ini dikelompokkan menjadi tiga model layanan utama yang dikenal sebagai:

1. **IaaS (Infrastructure as a Service)** — Menyewa infrastruktur dasar
2. **PaaS (Platform as a Service)** — Menyewa platform untuk membangun aplikasi
3. **SaaS (Software as a Service)** — Menggunakan software yang sudah jadi

### Analogi Pizza: Cara Termudah Memahami Perbedaannya

Bayangkan kamu ingin makan pizza:
- **On-premise** = Kamu buat semuanya sendiri: adonan, saus, topping, oven, bahkan kayu bakarnya
- **IaaS** = Kamu sewa dapur lengkap dengan oven, tapi kamu masak sendiri
- **PaaS** = Kamu tinggal taruh topping di atas adonan pizza yang sudah disiapkan, lalu masukkan ke oven yang sudah dipanaskan
- **SaaS** = Kamu pesan pizza delivery — tinggal makan langsung!

Dalam modul ini, kamu akan memahami:
- Apa itu IaaS, PaaS, dan SaaS secara mendalam
- Kapan harus menggunakan masing-masing model
- Contoh layanan nyata untuk setiap model
- Model deployment cloud: public, private, hybrid, dan multi-cloud
- Bagaimana memilih cloud provider yang tepat

Setelah modul ini, kamu akan bisa menentukan model layanan mana yang paling cocok untuk kebutuhanmu — entah sebagai developer, pengusaha, atau profesional IT.`,
            keyTakeaway:
              "Cloud computing memiliki 3 model layanan: IaaS (sewa infrastruktur), PaaS (sewa platform), dan SaaS (pakai software jadi) — masing-masing cocok untuk kebutuhan berbeda.",
            sources: [
              {
                type: "DOCUMENTATION",
                title: "Types of Cloud Computing — AWS",
                url: "https://aws.amazon.com/types-of-cloud-computing/",
              },
              {
                type: "ARTICLE",
                title: "IaaS vs PaaS vs SaaS — Microsoft Azure",
                url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-iaas",
              },
              {
                type: "YOUTUBE",
                title: "IaaS vs PaaS vs SaaS Explained",
                url: "https://www.youtube.com/watch?v=36zducUX16w",
              },
              {
                type: "DOCUMENTATION",
                title: "IaaS, PaaS, SaaS — Google Cloud",
                url: "https://cloud.google.com/learn/paas-vs-iaas-vs-saas",
              },
            ],
          },

          // --- SLIDE 2: IaaS ---
          {
            type: "lesson",
            title: "IaaS: Sewa Infrastruktur, Bangun Semaumu",
            body: `**IaaS (Infrastructure as a Service)** adalah model layanan cloud yang paling dasar. Kamu menyewa infrastruktur komputasi mentah — server virtual, jaringan, dan penyimpanan — dari cloud provider. Sisanya (sistem operasi, middleware, runtime, aplikasi, dan data) kamu kelola sendiri.

### Analoginya: Sewa Tanah Kosong

IaaS itu seperti menyewa tanah kosong di lokasi strategis. Tanahnya sudah siap (rata, ada akses jalan, ada listrik dan air), tapi kamu yang harus membangun rumah, mendesain interior, dan mengisi perabotannya sendiri. Kamu punya kebebasan penuh tapi juga tanggung jawab penuh atas bangunan yang kamu buat.

### Apa yang Kamu Dapat di IaaS?
- **Server virtual (VM)** — kamu pilih berapa CPU, RAM, dan disk yang dibutuhkan
- **Jaringan virtual** — buat subnet, firewall, load balancer sendiri
- **Penyimpanan** — block storage, object storage, file storage
- **IP publik** — alamat yang bisa diakses dari internet

### Apa yang Kamu Kelola Sendiri?
- Instalasi dan konfigurasi **sistem operasi** (Linux, Windows)
- Setup **web server** (Nginx, Apache)
- Instalasi **database** (PostgreSQL, MySQL)
- Konfigurasi **keamanan** (firewall rules, patch OS)
- **Deployment** dan maintenance aplikasi

### Contoh Layanan IaaS yang Populer
- **Amazon EC2** — mesin virtual dari AWS, paling populer di dunia
- **Google Compute Engine** — VM dari Google Cloud
- **Microsoft Azure Virtual Machines** — VM dari Azure
- **DigitalOcean Droplets** — VM sederhana dan murah, populer di kalangan startup Indonesia
- **Linode** — alternatif yang simpel dan developer-friendly

### Siapa yang Cocok Pakai IaaS?
IaaS cocok untuk tim yang punya keahlian teknis dan butuh kontrol penuh atas infrastruktur. Biasanya digunakan oleh perusahaan yang ingin memigrasikan server on-premise ke cloud tanpa mengubah arsitektur aplikasi (sering disebut **lift-and-shift**).`,
            keyTakeaway:
              "IaaS menyediakan infrastruktur mentah (server, jaringan, storage) — kamu punya kontrol penuh tapi juga harus mengelola semuanya dari OS hingga aplikasi.",
          },

          // --- SLIDE 3: PaaS ---
          {
            type: "lesson",
            title: "PaaS: Platform Siap Pakai untuk Developer",
            body: `**PaaS (Platform as a Service)** adalah model layanan cloud yang menyediakan platform lengkap untuk mengembangkan, menjalankan, dan mengelola aplikasi — tanpa perlu pusing mengurus infrastruktur di bawahnya.

### Analoginya: Sewa Ruko yang Sudah Siap

Jika IaaS seperti sewa tanah kosong, maka PaaS seperti sewa **ruko** yang sudah dibangun, ada listrik, air, AC, dan furniture dasar. Kamu tinggal bawa barang daganganmu, atur display toko, dan mulai jualan. Kamu tidak perlu tahu bagaimana sistem listrik di gedung bekerja — yang penting lampu nyala dan AC dingin.

### Apa yang Dikelola oleh PaaS Provider?
PaaS provider mengurus semua lapisan infrastruktur dan platform:
- **Hardware** (server, storage, network)
- **Sistem operasi** (patch, update, keamanan)
- **Runtime** (Node.js, Python, Java — sudah terinstall)
- **Middleware** (web server, database engine)
- **Development tools** (CI/CD, monitoring, logging)

### Apa yang Kamu Kelola?
Kamu hanya fokus pada dua hal:
- **Aplikasi** — kode program yang kamu tulis
- **Data** — data yang dihasilkan dan diproses oleh aplikasimu

### Contoh PaaS yang Populer
- **Heroku** — PaaS klasik yang sangat populer untuk prototype dan startup
- **Google App Engine** — PaaS dari Google Cloud
- **AWS Elastic Beanstalk** — PaaS dari AWS
- **Vercel** — PaaS modern untuk Next.js dan frontend framework (digunakan banyak developer Indonesia)
- **Railway** — PaaS simpel untuk deploy backend dan database
- **Supabase** — Backend-as-a-Service dengan PostgreSQL (yang digunakan oleh Clarise!)
- **Render** — alternatif Heroku yang populer setelah Heroku menghapus free tier

### Keuntungan Utama PaaS
1. **Developer productivity** — fokus menulis kode, bukan konfigurasi server
2. **Deployment cepat** — git push dan aplikasi langsung live
3. **Auto-scaling** — platform menangani penambahan kapasitas
4. **Built-in tools** — monitoring, logging, dan CI/CD sudah tersedia

### Kapan PaaS Cocok Digunakan?
PaaS sangat cocok untuk developer atau startup yang ingin membangun dan meluncurkan aplikasi dengan cepat tanpa beban mengelola infrastruktur. Ini pilihan ideal jika kamu fokus pada kecepatan iterasi produk.`,
            keyTakeaway:
              "PaaS menyediakan platform lengkap — OS, runtime, database sudah siap. Developer cukup fokus menulis kode dan data, sementara platform mengurus infrastruktur di bawahnya.",
          },

          // --- SLIDE 4: SaaS ---
          {
            type: "lesson",
            title: "SaaS: Software Siap Pakai Lewat Browser",
            body: `**SaaS (Software as a Service)** adalah model layanan cloud yang paling tinggi levelnya — kamu langsung menggunakan software yang sudah jadi melalui browser atau aplikasi. Tidak perlu install, tidak perlu konfigurasi, tidak perlu tahu ada server di belakangnya.

### Analoginya: Pesan Makanan di Restoran

Jika IaaS = sewa tanah, PaaS = sewa ruko, maka SaaS = **makan di restoran**. Kamu tinggal duduk, pilih menu, dan makan. Kamu tidak perlu tahu bagaimana masakan diolah, siapa kokinya, atau dari mana bahan bakunya. Yang penting makanannya enak dan kamu puas.

### Apa yang Dikelola oleh SaaS Provider?
**Semuanya.** SaaS provider mengelola seluruh stack dari A sampai Z:
- Hardware, jaringan, dan data center
- Sistem operasi dan middleware
- Aplikasi itu sendiri (fitur, UI, update)
- Keamanan dan compliance
- Backup dan disaster recovery

### Apa yang Kamu Lakukan?
Kamu hanya perlu:
- **Membuat akun** dan login
- **Menggunakan** software sesuai kebutuhan
- **Mengonfigurasi** preferensi (tema, notifikasi, dll)
- **Membayar** langganan (biasanya bulanan atau tahunan)

### Contoh SaaS yang Kamu Pakai Sehari-hari
Kemungkinan besar kamu sudah menggunakan puluhan SaaS tanpa sadar:
- **Google Workspace** (Gmail, Google Docs, Google Drive) — alat produktivitas
- **Microsoft 365** (Word, Excel, PowerPoint online) — office suite
- **Slack** dan **Discord** — komunikasi tim
- **Zoom** dan **Google Meet** — video conferencing
- **Spotify** dan **Netflix** — entertainment
- **Canva** — desain grafis
- **Notion** — catatan dan manajemen proyek
- **Shopify** — platform e-commerce siap pakai

### Keuntungan SaaS
1. **Tanpa instalasi** — buka browser, login, langsung pakai
2. **Update otomatis** — fitur baru datang tanpa kamu perlu download apapun
3. **Aksesibel** — bisa diakses dari perangkat apapun selama ada internet
4. **Model berlangganan** — biaya terprediksi dan biasanya ada plan gratis

### Kapan SaaS TIDAK Cocok?
SaaS kurang ideal jika kamu butuh kustomisasi mendalam atau harus menyimpan data di server sendiri karena regulasi. Kamu juga tidak punya kontrol atas kapan dan bagaimana software di-update.`,
            keyTakeaway:
              "SaaS adalah software siap pakai yang diakses lewat internet — kamu tinggal login dan gunakan. Gmail, Spotify, Canva, dan Notion adalah contoh SaaS yang kamu pakai sehari-hari.",
          },

          // --- SLIDE 5: Perbandingan IaaS vs PaaS vs SaaS ---
          {
            type: "example",
            title: "Perbandingan Lengkap: IaaS vs PaaS vs SaaS",
            body: `Sekarang kamu sudah memahami ketiga model secara individual. Mari kita bandingkan mereka secara langsung agar perbedaannya makin jelas.

### Tabel Perbandingan

**Yang kamu kelola vs yang provider kelola:**

Bayangkan sebuah tumpukan teknologi dari bawah ke atas:

1. Networking (Jaringan)
2. Storage (Penyimpanan)
3. Servers (Server Fisik)
4. Virtualization (Virtualisasi)
5. Operating System (Sistem Operasi)
6. Middleware
7. Runtime (Node.js, Python, Java)
8. Data (Data kamu)
9. Application (Aplikasi kamu)

Pada **On-Premise**: Kamu kelola semua 9 lapisan di atas.

Pada **IaaS**: Provider kelola lapisan 1-4 (networking, storage, servers, virtualization). Kamu kelola lapisan 5-9.

Pada **PaaS**: Provider kelola lapisan 1-7 (sampai runtime). Kamu cukup kelola lapisan 8-9 (data dan aplikasi).

Pada **SaaS**: Provider kelola SEMUA lapisan 1-9. Kamu tinggal pakai.

### Contoh Skenario Nyata

**Skenario: Membangun Aplikasi Web**

- **IaaS approach**: Sewa VM di AWS EC2, install Ubuntu, install Node.js, setup Nginx, deploy kode, konfigurasi SSL, monitoring manual.
  - Waktu setup: 1-3 hari
  - Fleksibilitas: sangat tinggi

- **PaaS approach**: Push kode ke Vercel atau Railway, platform otomatis build dan deploy, SSL otomatis, monitoring built-in.
  - Waktu setup: 5-30 menit
  - Fleksibilitas: sedang

- **SaaS approach**: Gunakan Shopify atau Wix untuk buat website tanpa coding.
  - Waktu setup: 1-2 jam
  - Fleksibilitas: rendah (terbatas fitur yang disediakan)

### Mana yang Paling Bagus?

Tidak ada yang "paling bagus" — semuanya tergantung konteks:

- **Butuh kontrol penuh?** Pilih IaaS
- **Developer yang ingin fokus koding?** Pilih PaaS
- **Non-teknis yang butuh solusi cepat?** Pilih SaaS

Banyak perusahaan bahkan menggunakan kombinasi ketiganya. Misalnya: Gojek mungkin pakai **IaaS** untuk backend core, **PaaS** untuk microservices tertentu, dan **SaaS** untuk email perusahaan (Google Workspace) dan komunikasi tim (Slack).`,
            keyTakeaway:
              "Semakin tinggi model layanan (IaaS → PaaS → SaaS), semakin sedikit yang kamu kelola sendiri, tapi juga semakin sedikit kontrol yang kamu punya.",
          },

          // --- SLIDE 6: Model Deployment ---
          {
            type: "lesson",
            title: "Model Deployment Cloud: Public, Private, Hybrid & Multi-Cloud",
            body: `Selain model layanan (IaaS/PaaS/SaaS), ada satu dimensi lagi yang penting: **bagaimana cloud di-deploy** (diimplementasikan). Ini menentukan siapa yang bisa mengakses cloud dan bagaimana infrastrukturnya dikelola.

### 1. Public Cloud — Untuk Semua Orang

Public cloud adalah model di mana infrastruktur cloud dimiliki dan dioperasikan oleh cloud provider, lalu dibagikan ke banyak pengguna (tenant) melalui internet. Ini model yang paling umum dan yang sudah kita bahas sejak awal.

**Karakteristik:**
- Infrastruktur di-share oleh banyak pengguna (multi-tenant)
- Diakses melalui internet publik
- Provider mengelola seluruh data center
- Bayar sesuai pemakaian

**Contoh:** AWS, Google Cloud, Microsoft Azure, DigitalOcean

**Cocok untuk:** Sebagian besar use case — startup, aplikasi web, mobile app, dan workload yang tidak memerlukan isolasi khusus.

### 2. Private Cloud — Eksklusif untuk Satu Organisasi

Private cloud adalah infrastruktur cloud yang didedikasikan untuk satu organisasi saja. Bisa di-hosting di data center milik perusahaan sendiri, atau di data center pihak ketiga tapi dengan isolasi penuh.

**Karakteristik:**
- Satu tenant (single-tenant) — hanya organisasi kamu yang menggunakannya
- Kontrol penuh atas keamanan, compliance, dan konfigurasi
- Biaya lebih tinggi karena tidak berbagi sumber daya

**Contoh:** VMware vSphere, OpenStack, AWS Outposts (hardware AWS di data center kamu)

**Cocok untuk:** Organisasi dengan regulasi ketat (perbankan, pemerintah, militer) yang memerlukan kontrol penuh atas data.

### 3. Hybrid Cloud — Kombinasi Terbaik

Hybrid cloud menggabungkan public cloud dan private cloud (atau on-premise), dengan konektivitas yang memungkinkan data dan aplikasi berpindah di antara keduanya.

**Contoh penggunaan:** Bank menyimpan data nasabah di private cloud (compliance), tapi menjalankan website dan mobile banking di public cloud (skalabilitas). Saat trafik mobile banking melonjak (misalnya hari gajian), kapasitas tambahan diambil dari public cloud — ini disebut **cloud bursting**.

### 4. Multi-Cloud — Menggunakan Banyak Provider

Multi-cloud adalah strategi menggunakan layanan dari dua atau lebih cloud provider secara bersamaan. Tujuannya biasanya untuk menghindari vendor lock-in dan memanfaatkan keunggulan masing-masing provider.

**Contoh:** Perusahaan pakai AWS untuk komputasi, Google Cloud untuk machine learning (karena unggul di AI/ML), dan Azure untuk integrasi dengan Microsoft Office.`,
            keyTakeaway:
              "Ada 4 model deployment cloud: Public (untuk umum), Private (eksklusif satu organisasi), Hybrid (gabungan keduanya), dan Multi-Cloud (pakai beberapa provider sekaligus).",
            sources: [
              {
                type: "DOCUMENTATION",
                title: "Cloud Deployment Models — AWS",
                url: "https://aws.amazon.com/types-of-cloud-computing/",
              },
              {
                type: "YOUTUBE",
                title: "Amazon Web Services — Cloud Concepts",
                url: "https://www.youtube.com/watch?v=a9__D53WsUs",
              },
            ],
          },

          // --- SLIDE 7: Studi Kasus Pemilihan Model ---
          {
            type: "casestudy",
            title: "Studi Kasus: Memilih Model Layanan yang Tepat",
            body: `Teori sudah kamu pahami. Sekarang saatnya latihan berpikir kritis dengan skenario nyata. Untuk setiap kasus di bawah, coba tentukan model layanan dan deployment mana yang paling cocok.

### Kasus 1: Startup E-commerce Baru

**Situasi:** Andi baru memulai bisnis sepatu online. Tim-nya hanya 3 orang (2 developer, 1 desainer). Budget terbatas, dan mereka ingin launch website dalam 2 minggu. Trafik awalnya belum pasti — bisa sepi, bisa tiba-tiba viral.

**Rekomendasi:** **PaaS + Public Cloud**

Mengapa? Dengan Vercel (untuk frontend Next.js) dan Railway/Supabase (untuk backend dan database), Andi bisa deploy dalam hitungan jam, bukan minggu. Public cloud cocok karena tidak ada data sensitif yang memerlukan isolasi khusus. PaaS memungkinkan tim kecilnya fokus membangun produk, bukan mengelola server.

### Kasus 2: Bank Digital

**Situasi:** Sebuah bank digital perlu menjalankan aplikasi mobile banking yang melayani 5 juta nasabah. Data nasabah harus diamankan sesuai regulasi OJK. Trafik melonjak setiap tanggal 25 (gajian).

**Rekomendasi:** **IaaS + Hybrid Cloud**

Mengapa? Data nasabah harus disimpan di private cloud atau on-premise sesuai regulasi. Tapi workload yang menghadapi nasabah (mobile app, chatbot, notifikasi) bisa di public cloud agar bisa auto-scale saat hari gajian. IaaS dipilih karena bank butuh kontrol granular atas keamanan dan konfigurasi jaringan.

### Kasus 3: Sekolah yang Butuh Email dan Dokumen

**Situasi:** Sebuah SMA ingin menyediakan email dan ruang penyimpanan dokumen untuk 1.000 siswa dan guru. Tidak ada tim IT di sekolah.

**Rekomendasi:** **SaaS + Public Cloud**

Mengapa? Google Workspace for Education (gratis untuk sekolah) menyediakan Gmail, Google Docs, dan Google Drive. Tidak perlu setup apapun — cukup daftar, buat akun untuk setiap siswa dan guru, dan langsung pakai. SaaS adalah satu-satunya pilihan realistis jika tidak ada tim IT.

### Pelajaran Utama

Tidak ada satu solusi yang cocok untuk semua kasus. Faktor-faktor yang menentukan pemilihan model:
1. **Budget** — berapa modal yang tersedia?
2. **Tim teknis** — apakah ada developer/IT yang kompeten?
3. **Regulasi** — apakah ada aturan soal penyimpanan data?
4. **Skalabilitas** — apakah trafik fluktuatif atau stabil?
5. **Kecepatan** — seberapa cepat harus launch?`,
            keyTakeaway:
              "Pemilihan model cloud tergantung pada 5 faktor: budget, keahlian tim, regulasi, kebutuhan skalabilitas, dan kecepatan deployment.",
          },

          // --- SLIDE 8: Provider Cloud Populer ---
          {
            type: "lesson",
            title: "Provider Cloud Populer: AWS, GCP, Azure & Lainnya",
            body: `Pasar cloud computing saat ini didominasi oleh tiga raksasa — sering disebut "Big Three" — yang menguasai lebih dari 60% pangsa pasar global. Mari kenali masing-masing dan juga alternatif yang populer di Indonesia.

### 1. Amazon Web Services (AWS) — Market Leader

AWS adalah cloud provider terbesar di dunia dengan pangsa pasar sekitar **31%** (2024). Diluncurkan tahun 2006, AWS punya layanan terlengkap — lebih dari **200 layanan** mulai dari komputasi, storage, AI/ML, IoT, hingga satellite data. AWS menjadi pilihan utama banyak perusahaan besar di Indonesia seperti Halodoc, Tiket.com, dan Bukalapak.

**Kelebihan:** Ekosistem terlengkap, komunitas terbesar, dokumentasi sangat detail, banyak sertifikasi profesional.

**Kelemahan:** Bisa rumit untuk pemula, harga bisa mahal tanpa optimasi, terlalu banyak layanan bisa membingungkan.

### 2. Microsoft Azure — Runner-up yang Kuat

Azure menguasai sekitar **24%** pangsa pasar. Keunggulan utamanya adalah integrasi yang sangat baik dengan produk Microsoft (Windows Server, Active Directory, Office 365). Banyak digunakan oleh korporasi besar yang sudah investasi di ekosistem Microsoft.

**Kelebihan:** Integrasi Microsoft terbaik, hybrid cloud (Azure Arc) sangat matang, populer di enterprise.

**Kelemahan:** Portal yang kompleks, harga bisa membingungkan.

### 3. Google Cloud Platform (GCP) — Kuat di AI/ML dan Data

GCP menguasai sekitar **11%** pangsa pasar, tapi tumbuh cepat. Keunggulannya ada di bidang big data dan machine learning — BigQuery (data warehouse) dan Vertex AI adalah produk andalannya. Di Indonesia, GCP digunakan oleh Gojek dan Tokopedia.

**Kelebihan:** Terbaik untuk AI/ML dan analytics, Kubernetes (K8s) lahir dari Google, harga kompetitif untuk compute.

**Kelemahan:** Ekosistem layanan tidak selengkap AWS, market share lebih kecil.

### Alternatif yang Populer di Indonesia

- **DigitalOcean** — simpel, murah, dan developer-friendly. Sangat populer di kalangan developer Indonesia
- **Alibaba Cloud** — alternatif dari Tiongkok dengan data center di Jakarta
- **Biznet Gio Cloud** — cloud provider lokal Indonesia
- **IDCloudHost** — provider lokal dengan harga terjangkau untuk UMKM

Untuk pemula yang ingin belajar cloud, rekomendasi terbaik adalah **AWS Free Tier** — gratis 12 bulan untuk banyak layanan dasar dan merupakan skill yang paling dicari di pasar kerja.`,
            keyTakeaway:
              "Tiga provider cloud terbesar: AWS (31%), Azure (24%), GCP (11%). Untuk belajar, mulai dari AWS Free Tier karena market share terbesar dan skill paling dicari di industri.",
            sources: [
              {
                type: "DOCUMENTATION",
                title: "AWS Free Tier — Amazon Web Services",
                url: "https://aws.amazon.com/free/",
              },
              {
                type: "ARTICLE",
                title: "Cloud Market Share — Statista",
                url: "https://www.statista.com/chart/18819/worldwide-market-share-of-leading-cloud-infrastructure-service-providers/",
              },
            ],
          },

          // --- SLIDE 9: Rangkuman ---
          {
            type: "summary",
            title: "Rangkuman: Model Layanan & Deployment Cloud",
            body: `Modul ini menyelesaikan pemahaman fundamentalmu tentang cloud computing. Berikut ringkasan dari semua yang sudah kamu pelajari:

### Model Layanan Cloud

**IaaS (Infrastructure as a Service):**
- Sewa infrastruktur dasar: VM, network, storage
- Kamu kelola: OS, runtime, middleware, aplikasi, data
- Contoh: AWS EC2, Google Compute Engine, DigitalOcean
- Cocok untuk: tim teknis yang butuh kontrol penuh

**PaaS (Platform as a Service):**
- Platform lengkap untuk membangun aplikasi
- Kamu kelola: aplikasi dan data saja
- Contoh: Vercel, Railway, Heroku, Supabase
- Cocok untuk: developer yang ingin fokus coding

**SaaS (Software as a Service):**
- Software siap pakai lewat browser
- Kamu tinggal pakai dan konfigurasi
- Contoh: Gmail, Slack, Canva, Notion
- Cocok untuk: non-teknis yang butuh solusi cepat

### Model Deployment Cloud

- **Public Cloud** — dipakai bersama oleh banyak pengguna, paling umum
- **Private Cloud** — eksklusif satu organisasi, untuk data sensitif
- **Hybrid Cloud** — gabungan public dan private, keseimbangan terbaik
- **Multi-Cloud** — pakai beberapa provider sekaligus

### Provider Cloud Utama

AWS (31%), Azure (24%), GCP (11%) mendominasi pasar. Untuk pemula, mulai dari AWS Free Tier.

### Faktor Pemilihan Model

Lima faktor utama: budget, keahlian tim, regulasi, skalabilitas, dan kecepatan deployment. Tidak ada solusi satu-untuk-semua.

Selamat! Kamu sudah menyelesaikan seluruh materi kursus Pengantar Cloud Computing. Kamu sekarang punya fondasi yang kuat untuk melanjutkan ke kursus yang lebih mendalam — seperti AWS untuk Developer — di mana kamu akan belajar menggunakan layanan cloud secara langsung dan praktis.`,
            keyTakeaway:
              "IaaS = sewa infrastruktur (kontrol penuh), PaaS = sewa platform (fokus coding), SaaS = pakai software jadi. Pilih berdasarkan budget, tim, regulasi, skalabilitas, dan kecepatan.",
          },

          // --- SLIDE 10: KUIS ---
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang Model Layanan Cloud",
            body: "Pastikan kamu sudah paham perbedaan IaaS, PaaS, SaaS, dan model deployment cloud sebelum melanjutkan. Kuis ini terdiri dari 5 soal acak — butuh skor minimal 60% untuk lulus.",
            quizBank: [
              {
                id: "q1",
                question:
                  "Dalam analogi pizza, model layanan mana yang setara dengan 'memesan pizza delivery dan langsung makan'?",
                options: [
                  { id: "a", text: "IaaS" },
                  { id: "b", text: "PaaS" },
                  { id: "c", text: "SaaS" },
                  { id: "d", text: "On-premise" },
                ],
                correctAnswer: "c",
                explanation:
                  "SaaS seperti pesan pizza delivery — kamu tinggal makan (pakai) tanpa perlu tahu cara masaknya. On-premise = masak sendiri dari awal, IaaS = sewa dapur, PaaS = adonan sudah disiapkan tinggal tambah topping.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question:
                  "Vercel, Railway, dan Heroku termasuk kategori model layanan cloud yang mana?",
                options: [
                  { id: "a", text: "IaaS — karena menyediakan server virtual" },
                  { id: "b", text: "PaaS — karena menyediakan platform lengkap untuk deploy aplikasi" },
                  { id: "c", text: "SaaS — karena menyediakan software siap pakai" },
                  { id: "d", text: "FaaS — karena menyediakan function as a service" },
                ],
                correctAnswer: "b",
                explanation:
                  "Vercel, Railway, dan Heroku adalah PaaS — mereka menyediakan platform lengkap (runtime, build tools, CI/CD, SSL) agar developer cukup push kode dan aplikasi langsung live, tanpa perlu mengelola server.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question:
                  "Sebuah bank digital harus menyimpan data nasabah di server sendiri sesuai regulasi OJK, tapi ingin mobile app-nya bisa auto-scale. Model deployment mana yang paling tepat?",
                options: [
                  { id: "a", text: "Public Cloud sepenuhnya" },
                  { id: "b", text: "Private Cloud sepenuhnya" },
                  { id: "c", text: "Hybrid Cloud" },
                  { id: "d", text: "On-premise tanpa cloud" },
                ],
                correctAnswer: "c",
                explanation:
                  "Hybrid Cloud paling cocok — data sensitif nasabah disimpan di private cloud/on-premise (compliance regulasi), sementara mobile app berjalan di public cloud (skalabilitas). Ini memberikan keseimbangan antara keamanan dan fleksibilitas.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question:
                  "Pada model IaaS, manakah yang BUKAN tanggung jawab kamu sebagai pengguna?",
                options: [
                  { id: "a", text: "Instalasi dan konfigurasi sistem operasi" },
                  { id: "b", text: "Pengelolaan hardware fisik di data center" },
                  { id: "c", text: "Setup web server dan database" },
                  { id: "d", text: "Konfigurasi firewall dan keamanan aplikasi" },
                ],
                correctAnswer: "b",
                explanation:
                  "Di IaaS, cloud provider yang mengelola hardware fisik (server, networking, storage fisik, pendingin data center). Kamu bertanggung jawab dari level OS ke atas: install OS, setup web server, database, firewall, dan deploy aplikasi.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question:
                  "Apa keuntungan utama strategi multi-cloud (menggunakan lebih dari satu cloud provider)?",
                options: [
                  { id: "a", text: "Lebih murah karena dapat diskon volume" },
                  { id: "b", text: "Menghindari vendor lock-in dan memanfaatkan keunggulan masing-masing provider" },
                  { id: "c", text: "Membuat aplikasi berjalan lebih cepat secara otomatis" },
                  { id: "d", text: "Tidak perlu membayar sama sekali" },
                ],
                correctAnswer: "b",
                explanation:
                  "Multi-cloud membantu menghindari ketergantungan pada satu vendor dan memungkinkan perusahaan memanfaatkan keunggulan spesifik tiap provider (misalnya GCP untuk AI, AWS untuk komputasi umum). Namun, mengelola multi-cloud lebih kompleks.",
                difficulty: "medium",
              },
              {
                id: "q6",
                question:
                  "Gmail, Google Docs, Canva, dan Spotify termasuk model layanan cloud yang mana?",
                options: [
                  { id: "a", text: "IaaS" },
                  { id: "b", text: "PaaS" },
                  { id: "c", text: "SaaS" },
                  { id: "d", text: "DaaS" },
                ],
                correctAnswer: "c",
                explanation:
                  "Gmail, Google Docs, Canva, dan Spotify adalah SaaS (Software as a Service) — software yang siap pakai langsung melalui browser atau aplikasi. Pengguna tidak perlu tahu infrastruktur di belakangnya.",
                difficulty: "easy",
              },
              {
                id: "q7",
                question:
                  "Cloud provider mana yang memiliki market share terbesar secara global pada tahun 2024?",
                options: [
                  { id: "a", text: "Google Cloud Platform (~11%)" },
                  { id: "b", text: "Microsoft Azure (~24%)" },
                  { id: "c", text: "Amazon Web Services (~31%)" },
                  { id: "d", text: "Alibaba Cloud (~5%)" },
                ],
                correctAnswer: "c",
                explanation:
                  "AWS memimpin dengan sekitar 31% market share global, diikuti Microsoft Azure (~24%) dan Google Cloud (~11%). AWS diluncurkan paling awal (2006) dan memiliki ekosistem layanan terlengkap.",
                difficulty: "easy",
              },
              {
                id: "q8",
                question:
                  "Seorang developer solo ingin membuat dan deploy web app Next.js dalam waktu sehari. Model layanan apa yang paling efisien?",
                options: [
                  { id: "a", text: "IaaS — sewa VM di AWS EC2 dan setup semuanya manual" },
                  { id: "b", text: "PaaS — deploy ke Vercel dengan git push" },
                  { id: "c", text: "SaaS — pakai website builder seperti Wix" },
                  { id: "d", text: "On-premise — beli server dan pasang di rumah" },
                ],
                correctAnswer: "b",
                explanation:
                  "PaaS seperti Vercel adalah pilihan paling efisien untuk developer solo — cukup git push dan aplikasi Next.js langsung live dengan SSL, CDN, dan auto-scaling. IaaS terlalu rumit untuk kebutuhan ini, SaaS terlalu terbatas untuk custom app.",
                difficulty: "medium",
              },
              {
                id: "q9",
                question:
                  "Apa yang dimaksud dengan 'cloud bursting' dalam konteks hybrid cloud?",
                options: [
                  { id: "a", text: "Server cloud meledak karena terlalu banyak data" },
                  { id: "b", text: "Overflow workload dari private cloud ke public cloud saat trafik melonjak" },
                  { id: "c", text: "Migrasi seluruh data dari cloud ke on-premise" },
                  { id: "d", text: "Menghapus semua data di cloud secara cepat" },
                ],
                correctAnswer: "b",
                explanation:
                  "Cloud bursting adalah strategi di mana workload yang biasanya berjalan di private cloud/on-premise 'meluap' ke public cloud saat trafik melonjak melebihi kapasitas normal. Setelah trafik kembali normal, workload kembali ke private cloud.",
                difficulty: "hard",
              },
              {
                id: "q10",
                question:
                  "Dalam tumpukan teknologi cloud, pada model PaaS, lapisan manakah yang TIDAK dikelola oleh provider?",
                options: [
                  { id: "a", text: "Sistem operasi dan runtime" },
                  { id: "b", text: "Networking dan storage" },
                  { id: "c", text: "Aplikasi dan data" },
                  { id: "d", text: "Middleware dan virtualisasi" },
                ],
                correctAnswer: "c",
                explanation:
                  "Pada PaaS, provider mengelola semua lapisan dari hardware hingga runtime (networking, storage, OS, middleware, runtime). Pengguna hanya mengelola aplikasi (kode) dan data. Ini yang membuat PaaS sangat efisien untuk developer.",
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
