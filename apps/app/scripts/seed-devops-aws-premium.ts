import { createCourse, prisma } from "./_seed-helpers";

async function main() {
  await createCourse({
    title: "AWS untuk Developer — Cloud Computing Fundamental",
    slug: "aws-untuk-developer",
    description:
      "Kuasai Amazon Web Services dari nol hingga production-ready. Pelajari IAM, EC2, Lambda, S3, RDS, DynamoDB, VPC, dan arsitektur cloud modern. Dilengkapi challenge interaktif dan studi kasus nyata dari industri Indonesia.",
    categorySlug: "devops-tools",
    difficulty: "ADVANCED",
    isPremium: true,
    modules: [
      // ============================================================
      // MODUL 1: Fondasi AWS & IAM
      // ============================================================
      {
        title: "Fondasi AWS & Identity Access Management (IAM)",
        slug: "fondasi-aws-dan-iam",
        xpReward: 75,
        slides: [
          {
            type: "lesson",
            title: "Selamat Datang di Dunia AWS!",
            body: `Amazon Web Services (AWS) adalah platform cloud computing terbesar di dunia — digunakan oleh jutaan pelanggan mulai dari startup satu orang hingga perusahaan Fortune 500 seperti Netflix, Airbnb, dan NASA. Di Indonesia, perusahaan seperti Halodoc, Tiket.com, dan Bukalapak mengandalkan AWS untuk menjalankan operasional mereka.

Dalam kursus ini, kamu akan belajar menggunakan AWS secara hands-on — bukan sekadar teori. Kamu akan memahami bagaimana membangun infrastruktur cloud yang aman, scalable, dan cost-efficient menggunakan layanan-layanan inti AWS.

### Apa yang Akan Kamu Pelajari di Kursus Ini?

**Modul 1 — Fondasi & IAM:** Memahami arsitektur global AWS, navigasi Console, dan mengelola akses dengan Identity and Access Management (IAM) — fondasi keamanan di AWS.

**Modul 2 — Komputasi (EC2 & Lambda):** Menjalankan server virtual dengan EC2 dan membangun aplikasi serverless dengan Lambda — dua paradigma komputasi yang saling melengkapi.

**Modul 3 — Storage & Database (S3, RDS, DynamoDB):** Menyimpan file dengan S3, mengelola database relasional dengan RDS, dan memahami database NoSQL dengan DynamoDB.

**Modul 4 — Jaringan & Arsitektur (VPC, Route 53, CloudFront):** Membangun jaringan privat virtual, mengelola domain, dan merancang arsitektur yang mengikuti AWS Well-Architected Framework.

### Prasyarat
Sebelum mulai, pastikan kamu sudah memahami konsep dasar cloud computing (IaaS, PaaS, SaaS). Jika belum, ambil kursus gratis "Pengantar Cloud Computing" terlebih dahulu. Kamu juga perlu membuat akun AWS — tenang, AWS Free Tier memberikan akses gratis selama 12 bulan untuk banyak layanan.

Mari kita mulai dari fondasi terpenting: memahami bagaimana AWS dibangun dan bagaimana mengelola keamanan akses.`,
            keyTakeaway: "AWS adalah cloud provider terbesar dunia dengan 200+ layanan. Kursus ini mencakup IAM, EC2, Lambda, S3, RDS, DynamoDB, VPC, dan arsitektur cloud modern.",
            sources: [
              { type: "DOCUMENTATION", title: "Apa itu AWS? — Amazon Web Services", url: "https://aws.amazon.com/what-is-aws/" },
              { type: "DOCUMENTATION", title: "AWS Free Tier — Mulai Gratis", url: "https://aws.amazon.com/free/" },
              { type: "YOUTUBE", title: "AWS re:Invent — Introduction to AWS", url: "https://www.youtube.com/watch?v=Z3SYDTMP3ME" },
              { type: "ARTICLE", title: "AWS Cloud Practitioner Essentials — AWS Skill Builder", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials" },
            ],
          },
          {
            type: "lesson",
            title: "Infrastruktur Global AWS: Region, AZ & Edge Location",
            body: `Salah satu kekuatan terbesar AWS adalah **infrastruktur globalnya**. AWS memiliki jaringan data center yang tersebar di seluruh dunia, dirancang untuk memberikan latensi rendah, ketersediaan tinggi, dan ketahanan terhadap bencana. Memahami infrastruktur ini sangat penting karena akan memengaruhi keputusan arsitekturmu.

### Region — Lokasi Geografis Data Center

**Region** adalah area geografis yang berisi kumpulan data center AWS. Setiap region bersifat independen — data di region ap-southeast-1 (Singapura) tidak secara otomatis direplikasi ke region us-east-1 (Virginia). Pada tahun 2024, AWS memiliki **33+ region** di seluruh dunia.

**Region terdekat untuk Indonesia:**
- **ap-southeast-1** (Singapura) — paling dekat, latensi ~20-40ms dari Jakarta
- **ap-southeast-3** (Jakarta) — region lokal AWS di Indonesia!
- **ap-northeast-1** (Tokyo) — alternatif untuk Asia Pasifik

**Cara memilih region:**
1. **Latensi** — pilih region terdekat dengan pengguna targetmu
2. **Compliance** — beberapa regulasi mengharuskan data disimpan di negara tertentu
3. **Ketersediaan layanan** — tidak semua layanan AWS tersedia di semua region
4. **Harga** — harga bervariasi antar region (us-east-1 biasanya paling murah)

### Availability Zone (AZ) — Data Center dalam Region

Setiap region terdiri dari minimal **2-3 Availability Zone** (AZ). Setiap AZ adalah satu atau lebih data center fisik yang terpisah dengan daya, jaringan, dan konektivitas sendiri, tapi terhubung satu sama lain melalui jaringan berkecepatan tinggi.

Mengapa ini penting? Jika kamu mendistribusikan aplikasimu di beberapa AZ (misalnya AZ-a dan AZ-b di Singapura), dan salah satu AZ mengalami gangguan (kebakaran, banjir, padamnya listrik), aplikasimu tetap berjalan dari AZ lain. Ini adalah fondasi dari **high availability** di AWS.

### Edge Location — Titik Distribusi Konten

AWS memiliki **400+ edge location** di seluruh dunia yang digunakan oleh layanan seperti **CloudFront** (CDN) dan **Route 53** (DNS). Edge location menyimpan salinan kontenmu lebih dekat dengan pengguna akhir, sehingga waktu loading lebih cepat.

Bayangkan: pengguna di Surabaya mengakses website-mu. Alih-alih request harus pergi ke server di Singapura, CloudFront menyimpan salinan konten statis di edge location terdekat — mungkin di Jakarta atau bahkan Surabaya sendiri.`,
            keyTakeaway: "AWS tersebar di 33+ Region, setiap region punya 2-3+ Availability Zone. Pilih region berdasarkan latensi, compliance, ketersediaan layanan, dan harga.",
          },
          {
            type: "lesson",
            title: "AWS Management Console: Pusat Kendali Cloud-mu",
            body: `**AWS Management Console** adalah antarmuka web (GUI) yang menjadi pintu masuk utama untuk mengakses dan mengelola semua layanan AWS. Anggap ini sebagai "dashboard utama" yang menghubungkanmu ke 200+ layanan AWS.

### Mengakses Console

Buka **console.aws.amazon.com** di browser, lalu login dengan akun AWS-mu. Saat pertama kali masuk, kamu akan melihat halaman beranda dengan beberapa elemen penting:

**1. Navigation Bar (Atas)**
- **Region selector** — dropdown di kanan atas untuk memilih region aktif. SANGAT PENTING: pastikan kamu selalu sadar di region mana kamu bekerja. Kesalahan umum pemula adalah membuat resource di region yang salah lalu bingung kenapa tidak bisa menemukannya.
- **Account menu** — informasi akun, billing, dan pengaturan keamanan
- **Search bar** — cara tercepat menemukan layanan (ketik "EC2", "S3", "Lambda", dll.)

**2. Favorit & Recently Visited**
Console menyimpan layanan yang baru kamu kunjungi dan memungkinkanmu menandai layanan favorit agar mudah diakses. Untuk pemula, pin layanan-layanan ini: EC2, S3, IAM, Lambda, VPC, dan CloudWatch.

**3. AWS Health Dashboard**
Menampilkan status kesehatan seluruh layanan AWS di region-mu. Berguna untuk mengecek apakah ada gangguan yang sedang terjadi.

### Selain Console: CLI dan SDK

Meskipun Console cocok untuk eksplorasi dan konfigurasi manual, developer profesional biasanya menggunakan **AWS CLI** (Command Line Interface) dan **AWS SDK** (Software Development Kit) untuk otomasi:

- **AWS CLI** — tool command-line untuk mengontrol AWS dari terminal. Contoh: \`aws s3 ls\` untuk melihat daftar bucket S3. Sangat berguna untuk scripting dan otomasi.
- **AWS SDK** — library untuk berinteraksi dengan AWS dari kode program (Python/boto3, JavaScript/aws-sdk, Go, Java, dll). Ini yang dipakai aplikasimu untuk mengakses layanan AWS secara programmatic.
- **AWS CloudShell** — terminal berbasis browser yang sudah terinstal AWS CLI. Tidak perlu install apapun di komputer lokalmu.

### Tips Navigasi Console
1. Selalu cek region di kanan atas sebelum melakukan apapun
2. Gunakan search bar — jauh lebih cepat daripada navigasi menu
3. Buka beberapa layanan di tab browser berbeda untuk multitasking
4. Bookmark halaman yang sering dikunjungi (misalnya EC2 instances list)`,
            keyTakeaway: "AWS Console adalah GUI utama untuk mengelola AWS. Selalu perhatikan region selector, gunakan search bar, dan kenali juga AWS CLI untuk otomasi.",
          },
          {
            type: "lesson",
            title: "IAM: Gerbang Keamanan AWS",
            body: `**IAM (Identity and Access Management)** adalah layanan AWS yang mengatur siapa yang boleh mengakses apa di akun AWS-mu. Ini adalah layanan pertama yang HARUS kamu kuasai sebelum menyentuh layanan lain — karena tanpa IAM yang benar, akun AWS-mu rentan terhadap penyalahgunaan.

### Kenapa IAM Penting?

Bayangkan akun AWS-mu seperti sebuah gedung perkantoran besar. IAM adalah **sistem keamanan gedung** — kartu akses, CCTV, dan satpam yang menentukan:
- **Siapa** yang boleh masuk (authentication/autentikasi)
- **Ruangan mana** yang boleh diakses (authorization/otorisasi)
- **Apa yang boleh dilakukan** di dalam ruangan itu (permissions/izin)

Tanpa IAM, semua orang yang punya kunci utama (root account) bisa melakukan apa saja — termasuk menghapus seluruh infrastruktur, mengakses data sensitif, atau memodifikasi billing. Ini adalah resep bencana.

### Komponen Utama IAM

**1. Root User**
Ini adalah akun pertama yang dibuat saat kamu mendaftar AWS. Root user memiliki akses penuh ke SEMUA layanan dan resource. Aturan emas: **JANGAN gunakan root user untuk pekerjaan sehari-hari**. Root user hanya untuk:
- Setup awal akun
- Mengaktifkan MFA (Multi-Factor Authentication) di root user
- Membuat IAM user pertama untuk admin

**2. IAM User**
Identitas spesifik untuk seseorang atau aplikasi yang perlu mengakses AWS. Setiap IAM user punya kredensial unik sendiri — username/password untuk Console, atau access key untuk CLI/API.

**3. IAM Group**
Kumpulan IAM users. Alih-alih memberikan izin ke setiap user satu per satu, kamu buat group (misalnya "Developers", "Admins", "ReadOnly") dan lampirkan izin ke group. Semua user dalam group otomatis mewarisi izin tersebut.

**4. IAM Policy**
Dokumen JSON yang mendefinisikan izin spesifik — apa yang boleh dan tidak boleh dilakukan. Policy dilampirkan ke user, group, atau role.

**5. IAM Role**
Identitas sementara yang bisa "dipakai" oleh user, aplikasi, atau layanan AWS. Berbeda dengan user yang punya kredensial permanen, role memberikan kredensial sementara yang otomatis kedaluwarsa. Sangat penting untuk keamanan.

IAM adalah layanan **global** — tidak terikat pada region tertentu. User, group, role, dan policy yang kamu buat berlaku di semua region.`,
            keyTakeaway: "IAM mengatur authentication dan authorization di AWS. Lima komponen utama: Root User (jangan dipakai sehari-hari), IAM User, Group, Policy, dan Role.",
            sources: [
              { type: "DOCUMENTATION", title: "What is IAM? — AWS Documentation", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html" },
              { type: "YOUTUBE", title: "AWS — What is IAM? AWS Identity and Access Management", url: "https://www.youtube.com/watch?v=Ul6FW4UANGc" },
            ],
          },
          {
            type: "lesson",
            title: "IAM Policy: Menulis Aturan Izin dalam JSON",
            body: `IAM Policy adalah inti dari sistem otorisasi AWS. Setiap aksi yang dilakukan di AWS — meluncurkan EC2 instance, mengupload file ke S3, membuat database RDS — dikendalikan oleh policy. Mari kita pahami cara kerja dan cara membaca policy.

### Struktur IAM Policy

Setiap policy ditulis dalam format **JSON** dengan struktur berikut:

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nama-bucket/*"
    }
  ]
}
\`\`\`

**Penjelasan setiap elemen:**

- **Version** — selalu "2012-10-17" (ini versi bahasa policy, bukan tanggal buatnya)
- **Statement** — array berisi satu atau lebih aturan izin
- **Effect** — "Allow" (izinkan) atau "Deny" (tolak)
- **Action** — aksi spesifik yang diizinkan/ditolak (format: \`service:action\`)
- **Resource** — resource AWS spesifik yang berlaku (menggunakan ARN)

### Contoh Policy Nyata

**1. Read-only access ke satu bucket S3:**
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::data-produk",
        "arn:aws:s3:::data-produk/*"
      ]
    }
  ]
}
\`\`\`
Policy ini mengizinkan membaca objek dan melihat daftar file di bucket "data-produk", tapi TIDAK mengizinkan mengupload, menghapus, atau memodifikasi.

**2. Full EC2 access tapi hanya di region tertentu:**
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:*",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-southeast-1"
        }
      }
    }
  ]
}
\`\`\`

### Prinsip Least Privilege

Aturan emas dalam menulis IAM policy: **berikan izin seminimal mungkin yang dibutuhkan untuk menyelesaikan tugas**. Jangan pernah memberikan \`"Action": "*"\` dan \`"Resource": "*"\` kecuali untuk admin account. Ini disebut **Principle of Least Privilege** — dan ini adalah fondasi keamanan cloud yang baik.

### AWS Managed Policies vs Custom Policies

AWS menyediakan ratusan **managed policy** yang siap pakai — misalnya \`AmazonS3ReadOnlyAccess\`, \`AmazonEC2FullAccess\`, \`AdministratorAccess\`. Ini cocok untuk memulai, tapi untuk production, sebaiknya buat **custom policy** yang lebih spesifik sesuai kebutuhanmu.`,
            keyTakeaway: "IAM Policy adalah dokumen JSON yang mendefinisikan Effect (Allow/Deny), Action (aksi), dan Resource (target). Selalu terapkan Principle of Least Privilege.",
          },
          {
            type: "lesson",
            title: "IAM Roles: Identitas Sementara untuk Layanan & Aplikasi",
            body: `**IAM Role** adalah salah satu konsep terpenting di AWS yang sering membingungkan pemula. Tapi begitu kamu paham, role akan menjadi alat keamanan favoritmu. Mari kita bedah secara mendalam.

### Role vs User: Apa Bedanya?

**IAM User** = identitas permanen dengan kredensial tetap (password atau access key). Seperti KTP — identitasmu tidak berubah.

**IAM Role** = identitas sementara yang bisa "dipakai" (assume) oleh siapa saja yang diizinkan. Seperti seragam kerja — kamu pakai saat bekerja, lepas saat selesai. Kredensialnya sementara dan otomatis kedaluwarsa.

### Kapan Menggunakan Role?

**1. Layanan AWS yang Perlu Akses ke Layanan Lain**
Contoh paling umum: EC2 instance yang perlu mengakses S3. Alih-alih menyimpan access key di dalam EC2 (BERBAHAYA — kalau instance di-hack, access key bocor), kamu membuat **EC2 Instance Role** dan melampirkannya ke instance. EC2 secara otomatis mendapat kredensial sementara yang dirotasi setiap beberapa jam.

**2. Cross-Account Access**
Kamu punya dua akun AWS: satu untuk development, satu untuk production. Developer perlu sesekali melihat log di production tanpa memiliki user di akun production. Solusi: buat role di akun production yang bisa di-assume oleh user di akun development.

**3. Federated Access**
Karyawan login menggunakan sistem SSO perusahaan (misalnya Okta atau Active Directory), lalu "assume" role di AWS tanpa perlu IAM user terpisah.

**4. Lambda Execution Role**
Setiap Lambda function WAJIB punya execution role yang menentukan layanan AWS mana yang boleh diakses. Tanpa role, Lambda tidak bisa melakukan apa-apa.

### Cara Kerja Role (Assume Role Flow)

1. Admin membuat IAM Role dengan trust policy (siapa yang boleh assume) dan permission policy (apa yang boleh dilakukan)
2. Entitas yang diizinkan (user, service, atau akun lain) memanggil \`sts:AssumeRole\`
3. AWS STS (Security Token Service) memberikan **kredensial sementara**: access key, secret key, dan session token
4. Kredensial ini valid untuk durasi tertentu (default 1 jam, bisa disesuaikan)
5. Setelah expired, entitas harus assume role lagi untuk mendapat kredensial baru

### Best Practice: Selalu Gunakan Role, Bukan Access Key

Untuk aplikasi yang berjalan di AWS (EC2, Lambda, ECS), **SELALU** gunakan IAM Role — jangan pernah hardcode access key. Access key yang bocor adalah salah satu penyebab utama pelanggaran keamanan di cloud. Dengan role, kredensialnya otomatis dirotasi dan tidak pernah tersimpan di kode.`,
            keyTakeaway: "IAM Role memberikan kredensial sementara yang otomatis dirotasi — selalu gunakan Role (bukan hardcode access key) untuk aplikasi yang berjalan di AWS.",
            sources: [
              { type: "DOCUMENTATION", title: "IAM Roles — AWS Documentation", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html" },
              { type: "YOUTUBE", title: "Amazon Web Services — IAM Best Practices", url: "https://www.youtube.com/watch?v=a9__D53WsUs" },
            ],
          },
          {
            type: "lesson",
            title: "Multi-Factor Authentication & IAM Best Practices",
            body: `Sebelum kita masuk ke challenge, mari kita tutup topik IAM dengan best practices yang WAJIB kamu terapkan. Ini bukan saran — ini adalah standar keamanan minimum yang diharapkan di industri.

### Multi-Factor Authentication (MFA)

MFA menambahkan lapisan keamanan ekstra di atas password. Dengan MFA, login membutuhkan dua hal:
1. **Something you know** — password
2. **Something you have** — kode dari device fisik atau aplikasi

**Aktifkan MFA di Root User — INI WAJIB.** Tanpa MFA, siapa pun yang mendapat password root bisa mengambil alih seluruh akun AWS-mu. AWS mendukung beberapa jenis MFA: Virtual MFA device (Google Authenticator, Authy), Hardware TOTP token, dan FIDO2 security key (YubiKey).

### 10 IAM Best Practices dari AWS

**1. Jangan gunakan root user untuk tugas sehari-hari.** Buat IAM user admin terpisah, aktifkan MFA di root, lalu simpan kredensial root di tempat aman.

**2. Aktifkan MFA untuk semua user yang punya akses Console.** Bukan hanya root — semua IAM user yang login via browser harus punya MFA.

**3. Terapkan Principle of Least Privilege.** Mulai dengan nol izin, tambahkan izin sesuai kebutuhan spesifik. Jangan pernah memberikan \`AdministratorAccess\` ke semua orang.

**4. Gunakan IAM Groups untuk mengelola izin.** Jangan lampirkan policy langsung ke user — selalu melalui group. Ini memudahkan manajemen saat tim bertambah.

**5. Rotasi access key secara berkala.** Jika kamu HARUS menggunakan access key (untuk CI/CD atau aplikasi di luar AWS), rotasi setiap 90 hari.

**6. Gunakan IAM Role untuk aplikasi di AWS.** Sudah kita bahas — jangan hardcode access key di EC2, Lambda, atau ECS.

**7. Monitor aktivitas dengan CloudTrail.** AWS CloudTrail mencatat SEMUA API call di akun AWS-mu. Aktifkan ini dari hari pertama.

**8. Gunakan policy conditions untuk pembatasan ekstra.** Batasi akses berdasarkan IP, region, waktu, atau MFA status.

**9. Review izin secara berkala.** Gunakan IAM Access Analyzer untuk menemukan resource yang dibagikan ke luar akun secara tidak sengaja.

**10. Gunakan AWS Organizations untuk multi-akun.** Pisahkan workload production, development, dan staging ke akun berbeda. Ini memberikan isolasi keamanan terkuat.

### IAM Security Status

Di dashboard IAM Console, ada checklist "Security Status" yang menunjukkan apakah kamu sudah menerapkan best practices dasar: MFA di root, password policy, dll. Pastikan semua item di checklist ini hijau sebelum kamu melanjutkan.`,
            keyTakeaway: "MFA WAJIB diaktifkan di root user. 10 best practices IAM: least privilege, gunakan groups, role untuk apps, rotasi keys, monitor dengan CloudTrail.",
          },
          // CHALLENGE
          {
            type: "challenge",
            title: "Challenge: Merancang Kebijakan IAM untuk Tim Startup",
            body: `Kamu adalah Cloud Engineer di sebuah startup fintech bernama "DompetKu". Tim terdiri dari 3 kelompok: **Backend Developer** (3 orang), **Data Analyst** (2 orang), dan **CTO** (1 orang). Startup ini menggunakan EC2 untuk backend API, S3 untuk menyimpan dokumen KYC nasabah, RDS untuk database transaksi, dan Lambda untuk notifikasi.

Tugasmu adalah merancang struktur IAM (groups, policies) yang mengikuti Principle of Least Privilege. Setiap grup hanya boleh mengakses resource yang benar-benar mereka butuhkan.`,
            challenge: {
              instruction: "Rancang struktur IAM untuk startup DompetKu. Tentukan: (1) IAM Groups apa saja yang dibuat, (2) Policy/izin apa yang diberikan ke setiap group, dan (3) Jelaskan mengapa CTO TIDAK seharusnya menggunakan AdministratorAccess sehari-hari. Tulis jawabanmu dalam format terstruktur.",
              inputType: "text",
              inputPlaceholder: "Contoh:\n\nGroup 1: BackendDevs\n- Izin: EC2 (start/stop/describe), RDS (read-only)...\n- Alasan: ...\n\nGroup 2: ...",
              starterCode: "",
              expectedConcepts: [
                "Membuat minimal 3 IAM Groups terpisah (Backend, Data, Admin)",
                "Menerapkan Principle of Least Privilege — Data Analyst tidak perlu akses EC2",
                "CTO menggunakan role terpisah untuk admin tasks, bukan AdministratorAccess permanen",
                "S3 bucket KYC harus dibatasi aksesnya hanya ke yang membutuhkan",
              ],
              evaluationCriteria: "Evaluasi jawaban berdasarkan: (1) Apakah ada minimal 3 IAM Groups yang logis? (2) Apakah setiap group punya izin yang sesuai dengan tugasnya — Backend Devs butuh EC2+RDS tapi TIDAK S3 KYC, Data Analyst butuh S3+RDS read-only tapi TIDAK EC2? (3) Apakah ada penjelasan mengapa CTO tidak pakai AdministratorAccess permanen (seharusnya pakai role admin yang di-assume saat dibutuhkan)? (4) Apakah S3 bucket KYC (data sensitif nasabah) aksesnya dibatasi? Jawaban parsial (2 dari 4 poin) = cukup. Jawaban lengkap (4 dari 4) = sangat baik.",
              hints: [
                "Pikirkan: apa yang TIDAK boleh diakses oleh setiap grup? Data Analyst perlu akses apa saja?",
                "CTO bisa punya IAM user biasa untuk sehari-hari, lalu assume admin role hanya saat butuh — ini lebih aman daripada admin access 24/7",
                "S3 bucket KYC berisi data pribadi nasabah — siapa saja yang benar-benar PERLU mengaksesnya?",
              ],
              sampleAnswer: "Group 1: BackendDevs — EC2 (full), RDS (read/write), Lambda (full), S3 (HANYA bucket assets, BUKAN KYC). Group 2: DataAnalysts — S3 KYC (read-only, dengan enkripsi), RDS (read-only), Athena/QuickSight. Group 3: AdminRole — Role (bukan user) dengan AdministratorAccess yang hanya di-assume saat dibutuhkan, dengan MFA required. CTO sehari-hari pakai IAM user biasa dengan izin terbatas, assume AdminRole hanya untuk tugas admin. Ini mengurangi risiko jika kredensial CTO bocor.",
              followUpQuestion: "Bagaimana jika ada developer baru yang join tim backend — apa langkah IAM yang perlu dilakukan?",
            },
          },
          {
            type: "lesson",
            title: "Pembahasan Challenge: Desain IAM yang Aman",
            body: `Mari kita bahas solusi ideal untuk challenge merancang IAM di startup DompetKu. Ini bukan satu-satunya jawaban yang benar, tapi mencerminkan best practices yang digunakan di industri.

### Solusi: 3 Groups + 1 Admin Role

**Group 1: BackendDevelopers**
Izin yang diberikan:
- EC2: Full access (start, stop, terminate, describe instances) — mereka perlu mengelola server API
- RDS: Read/Write — mereka perlu mengakses dan menulis ke database transaksi
- Lambda: Full access — untuk mengelola fungsi notifikasi
- S3: Akses HANYA ke bucket \`dompetku-assets\` (gambar, file statis) — BUKAN bucket KYC
- CloudWatch Logs: Read — untuk debugging

Yang TIDAK diberikan: Akses ke S3 bucket KYC, IAM management, billing

**Group 2: DataAnalysts**
Izin yang diberikan:
- S3 bucket KYC: Read-only — untuk analisis data nasabah
- RDS: Read-only — untuk query data transaksi (TIDAK bisa modify)
- Athena/QuickSight: Full access — untuk menjalankan analisis dan membuat dashboard

Yang TIDAK diberikan: EC2 (mereka tidak perlu mengelola server), Lambda, S3 bucket selain KYC

**Group 3 (Role): AdminRole**
Ini adalah **IAM Role**, bukan group biasa:
- AdministratorAccess — full access ke seluruh akun
- Trust policy: hanya CTO yang boleh assume role ini
- **Condition: MFA required** — CTO harus memasukkan kode MFA sebelum bisa assume admin role

CTO sehari-hari menggunakan IAM user biasa dengan izin read-only ke sebagian besar layanan. Saat perlu melakukan tugas admin (membuat resource baru, mengubah policy, mengelola billing), CTO assume AdminRole — yang membutuhkan MFA.

### Mengapa Ini Lebih Aman?

Jika kredensial CTO bocor (laptop dicuri, password phishing), penyerang hanya mendapat akses read-only — mereka tidak bisa menghapus database atau mengubah konfigurasi karena AdminRole membutuhkan MFA device fisik yang tidak mereka miliki.

### Common Mistakes

1. **Memberikan AdministratorAccess ke semua developer** — ini membuat setiap developer bisa menghapus seluruh infrastruktur
2. **Memberikan S3 \`s3:*\` tanpa membatasi bucket** — developer bisa mengakses data KYC sensitif
3. **Tidak memisahkan read dan write** — Data Analyst seharusnya hanya bisa membaca, bukan memodifikasi data`,
            keyTakeaway: "Desain IAM yang baik: pisahkan groups berdasarkan peran, batasi akses ke resource sensitif, dan gunakan admin role dengan MFA — bukan admin user permanen.",
          },
          {
            type: "lesson",
            title: "Auto Scaling Groups (ASG)",
            body: `Bagaimana jika aplikasimu mendadak viral dan traffic naik 100x lipat? Jika kamu menggunakan satu EC2 instance, servermu pasti akan crash (Down).

Di AWS, kita menggunakan **Auto Scaling Groups (ASG)** untuk menangani hal ini secara otomatis.

### Cara Kerja ASG:
1. **Minimum Size**: Kamu atur misal minimal selalu ada 2 server yang berjalan.
2. **Maximum Size**: Kamu atur batas maksimal server, misal 10 server (agar tagihan tidak jebol).
3. **Scaling Policy**: Kamu atur kondisi, contoh "Jika rata-rata CPU > 70% selama 5 menit, tambah 1 server baru."

ASG akan secara otomatis memantau metrik (melalui CloudWatch) dan **me-launch** EC2 instance baru jika dibutuhkan (Scale Out), serta **menghapus** EC2 instance jika traffic sudah sepi (Scale In).`,
            keyTakeaway: "Auto Scaling Groups (ASG) memastikan aplikasimu selalu memiliki jumlah EC2 instance yang tepat untuk melayani beban traffic secara dinamis dan efisien secara biaya.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon EC2 Auto Scaling", url: "https://aws.amazon.com/ec2/autoscaling/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS Elastic Beanstalk (PaaS)",
            body: `Membuat EC2, mengatur Load Balancer, lalu menghubungkannya ke Auto Scaling Group bisa menjadi hal yang sangat rumit dan memakan waktu bagi developer yang hanya ingin men-deploy kodenya.

AWS mengerti hal ini dan menciptakan **Elastic Beanstalk**.

Elastic Beanstalk adalah layanan *Platform as a Service (PaaS)* yang mengatur seluruh infrastruktur di belakang layar. Kamu hanya perlu:
1. Pilih platform (Node.js, Python, Java, Docker, dll).
2. Upload kodemu (berupa file zip).
3. Klik "Deploy".

Elastic Beanstalk akan secara otomatis:
- Mem-provisioning EC2 instances
- Mengatur Load Balancer
- Membuat Auto Scaling Group
- Mengkonfigurasi environment variables dan monitoring

Ini adalah cara tercepat bagi developer pemula untuk men-deploy aplikasi skalabel ke AWS tanpa perlu mendalami DevOps secara mendalam.`,
            keyTakeaway: "Elastic Beanstalk mengotomatiskan pembuatan dan konfigurasi infrastruktur (EC2, ALB, ASG), memungkinkan developer fokus pada penulisan kode.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Elastic Beanstalk", url: "https://aws.amazon.com/elasticbeanstalk/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS Fargate: Serverless Container",
            body: `Jika kamu menggunakan Docker, menjalankan container di atas EC2 (disebut Amazon ECS dengan EC2) berarti kamu tetap harus merawat OS di dalam EC2 tersebut (patching, security update).

Bagaimana jika kamu hanya ingin menjalankan Container tanpa harus mengurus server virtual sama sekali?
Gunakan **AWS Fargate**.

Fargate adalah *Serverless Compute Engine* untuk container.
Kamu hanya menentukan:
- Image Docker yang akan dijalankan
- Berapa banyak CPU yang dibutuhkan (misal 1 vCPU)
- Berapa banyak RAM yang dibutuhkan (misal 2GB)

Fargate akan mengurus eksekusi containernya. Kamu tidak perlu tahu di server mana container itu berjalan, dan kamu hanya membayar per detik saat container itu hidup. Sangat cocok untuk *microservices* dan pekerjaan *batch processing*.`,
            keyTakeaway: "AWS Fargate memungkinkan kamu menjalankan Docker container secara serverless tanpa perlu memanajemen underlying EC2 instances.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Fargate", url: "https://aws.amazon.com/fargate/" }
            ]
          },
          {
            type: "summary",
            title: "Rangkuman: Fondasi AWS & IAM",
            body: `Selamat! Kamu sudah menyelesaikan modul pertama dan punya fondasi yang sangat kuat untuk perjalanan AWS-mu. Mari rekapitulasi:

### Infrastruktur Global AWS
- AWS terdiri dari **33+ Region**, masing-masing punya **2-3+ Availability Zone**
- Region terdekat untuk Indonesia: **ap-southeast-3 (Jakarta)** dan **ap-southeast-1 (Singapura)**
- **400+ Edge Location** untuk CDN (CloudFront) dan DNS (Route 53)
- Pilih region berdasarkan: latensi, compliance, ketersediaan layanan, harga

### AWS Management Console
- GUI utama di console.aws.amazon.com
- Selalu perhatikan **region selector** di kanan atas
- Alternatif: AWS CLI (command line), AWS SDK (programmatic), CloudShell (browser terminal)

### IAM — Identity and Access Management
- **Root User**: akses penuh, JANGAN dipakai sehari-hari, WAJIB MFA
- **IAM User**: identitas per individu/aplikasi
- **IAM Group**: kumpulan user dengan izin yang sama
- **IAM Policy**: dokumen JSON (Effect, Action, Resource)
- **IAM Role**: identitas sementara — SELALU gunakan untuk aplikasi di AWS

### IAM Best Practices
1. Aktifkan MFA di root dan semua user Console
2. Principle of Least Privilege — mulai dari nol izin
3. Gunakan Groups, bukan policy langsung ke user
4. Role untuk aplikasi, bukan access key
5. Monitor dengan CloudTrail
6. Rotasi access key setiap 90 hari
7. Review izin berkala dengan Access Analyzer

### Ke Modul Selanjutnya
Di modul berikutnya, kamu akan belajar dua paradigma komputasi di AWS: **EC2** (server virtual tradisional) dan **Lambda** (serverless). Kamu akan memahami kapan menggunakan masing-masing dan bagaimana mereka saling melengkapi.`,
            keyTakeaway: "Fondasi AWS = memahami infrastruktur global (Region/AZ/Edge) + menguasai IAM (User/Group/Policy/Role) dengan menerapkan best practices keamanan.",
          },
          {
            type: "lesson",
            title: "AWS Free Tier: Belajar Tanpa Bayar",
            body: `Salah satu hal terbaik tentang AWS untuk pemula adalah **Free Tier** — program yang memungkinkanmu menggunakan banyak layanan AWS secara gratis. Ini bukan trial terbatas — beberapa layanan bahkan gratis selamanya.

### 3 Jenis Free Tier

**1. 12-Month Free (Gratis 12 Bulan)**
Berlaku selama 12 bulan sejak akun dibuat. Ini yang paling banyak digunakan untuk belajar:
- **EC2**: 750 jam/bulan t2.micro atau t3.micro (cukup untuk 1 instance 24/7)
- **S3**: 5 GB penyimpanan + 20.000 GET request + 2.000 PUT request
- **RDS**: 750 jam/bulan db.t2.micro atau db.t3.micro (Single-AZ)
- **CloudFront**: 1 TB transfer data keluar

**2. Always Free (Gratis Selamanya)**
Tidak ada batas waktu — selama kamu tidak melebihi kuota:
- **Lambda**: 1 juta request + 400.000 GB-seconds per bulan (SANGAT besar untuk belajar)
- **DynamoDB**: 25 GB storage + 25 read/write capacity units
- **SNS**: 1 juta publish + 100.000 HTTP delivery
- **CloudWatch**: 10 custom metrics + 10 alarms

**3. Short-Term Free Trials**
Trial singkat untuk layanan tertentu:
- **SageMaker**: 250 jam/bulan selama 2 bulan pertama
- **Redshift**: 2 bulan trial
- **GuardDuty**: 30 hari trial

### Tips Menghindari Tagihan Tidak Terduga

1. **Set billing alert** — di Billing Console, buat alarm jika pengeluaran melebihi $1 (ya, satu dolar!)
2. **Cek Free Tier usage dashboard** — di Billing > Free Tier, kamu bisa melihat berapa persen kuota yang sudah terpakai
3. **Matikan resource yang tidak dipakai** — EC2 instance yang berjalan terus tetap dihitung jam-nya
4. **Hati-hati dengan Elastic IP** — IP publik yang dialokasikan tapi TIDAK dipasang ke instance justru dikenai biaya
5. **Jangan upgrade instance type** — pastikan tetap di t2.micro/t3.micro

AWS Free Tier sangat besar nilainya — kalau dihitung, kamu mendapat layanan senilai ratusan dolar per bulan secara gratis. Manfaatkan ini untuk belajar tanpa takut tagihan membengkak.`,
            keyTakeaway: "AWS Free Tier punya 3 jenis: 12-Month Free, Always Free, dan Short-Term Trials. Set billing alert sejak hari pertama untuk menghindari tagihan tak terduga.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Free Tier — Detail Lengkap", url: "https://aws.amazon.com/free/" },
              { type: "YOUTUBE", title: "AWS — AWS Free Tier Overview", url: "https://www.youtube.com/watch?v=fPe0IPJDxZ8" },
            ],
          },
          {
            type: "lesson",
            title: "AWS CLI: Mengendalikan Cloud dari Terminal",
            body: `**AWS CLI (Command Line Interface)** adalah tool yang memungkinkanmu mengontrol seluruh layanan AWS dari terminal — tanpa perlu membuka browser. Ini adalah skill wajib bagi developer karena memungkinkan otomasi, scripting, dan efisiensi yang tidak mungkin dicapai melalui Console GUI.

### Instalasi AWS CLI

AWS CLI tersedia untuk Windows, macOS, dan Linux. Cara termudah:

\`\`\`bash
# macOS (via Homebrew)
brew install awscli

# Windows (download installer)
# Kunjungi: https://aws.amazon.com/cli/

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

### Konfigurasi Pertama

Setelah install, jalankan:
\`\`\`bash
aws configure
\`\`\`
Kamu akan diminta memasukkan:
- **AWS Access Key ID** — dari IAM user
- **AWS Secret Access Key** — dari IAM user
- **Default region** — misalnya \`ap-southeast-1\`
- **Default output format** — pilih \`json\`

### Perintah Dasar yang Wajib Dikuasai

\`\`\`bash
# Melihat identitas yang sedang digunakan
aws sts get-caller-identity

# S3: melihat daftar bucket
aws s3 ls

# S3: upload file
aws s3 cp foto.jpg s3://nama-bucket/foto.jpg

# EC2: melihat daftar instances
aws ec2 describe-instances

# EC2: start instance
aws ec2 start-instances --instance-ids i-1234567890abcdef0

# Lambda: melihat daftar functions
aws lambda list-functions

# IAM: melihat daftar users
aws iam list-users
\`\`\`

### AWS CloudShell: CLI Tanpa Install

Jika kamu tidak mau repot install CLI di komputer lokal, AWS menyediakan **CloudShell** — terminal yang langsung bisa diakses dari browser di Console. CloudShell sudah pre-installed dengan AWS CLI, Python, Node.js, dan tools lainnya. Kamu bisa mengaksesnya dengan mengklik ikon terminal di navigation bar Console.

### Mengapa CLI Lebih Baik dari Console untuk Production?

Console (GUI) bagus untuk eksplorasi dan belajar, tapi untuk production, CLI dan scripting jauh lebih baik karena bisa diulang (repeatable), bisa di-version control (simpan script di Git), bisa diotomasi (CI/CD pipeline), dan mengurangi human error dari klik manual yang salah.`,
            keyTakeaway: "AWS CLI memungkinkan kontrol AWS dari terminal — wajib dikuasai untuk otomasi dan production. Gunakan CloudShell jika tidak mau install lokal.",
          },
          {
            type: "lesson",
            title: "Model Harga AWS: Pay-As-You-Go & Cara Menghemat",
            body: `Memahami bagaimana AWS mengenakan biaya adalah skill yang sama pentingnya dengan skill teknis. Banyak developer dan perusahaan mengalami "bill shock" — tagihan yang jauh lebih besar dari yang diharapkan — karena tidak memahami model harga AWS.

### Prinsip Dasar: Pay-As-You-Go

AWS menggunakan model bayar sesuai pemakaian. Kamu tidak membayar biaya langganan tetap — kamu membayar berdasarkan berapa banyak resource yang kamu gunakan. Tapi "pemakaian" dihitung berbeda untuk setiap layanan:

**EC2 (Komputasi):**
- Dihitung per detik (minimum 60 detik) saat instance dalam status "running"
- Instance yang di-stop TIDAK dikenakan biaya komputasi (tapi EBS storage tetap dihitung)
- Harga berbeda berdasarkan instance type, region, dan OS

**S3 (Penyimpanan):**
- Dihitung per GB data yang disimpan per bulan
- Plus biaya per request (PUT, GET, LIST, dll.)
- Plus biaya transfer data keluar (data masuk biasanya gratis)

**Lambda (Serverless):**
- Dihitung per request + durasi eksekusi (per 1ms)
- 1 juta request pertama per bulan gratis (Always Free)

**RDS (Database):**
- Mirip EC2 — per jam berdasarkan instance type
- Plus biaya storage per GB
- Plus biaya I/O (untuk beberapa engine)

### 4 Cara Menghemat di AWS

**1. Reserved Instances (RI)**
Komitmen 1 atau 3 tahun untuk EC2/RDS dengan diskon hingga **72%** dibanding harga on-demand. Cocok untuk workload yang stabil dan bisa diprediksi.

**2. Spot Instances**
Gunakan kapasitas EC2 yang tidak terpakai dengan diskon hingga **90%**. Tapi AWS bisa merebut kembali instance-mu dengan pemberitahuan 2 menit. Cocok untuk batch processing, CI/CD, atau workload yang bisa di-interrupt.

**3. Savings Plans**
Komitmen pengeluaran per jam (misalnya $10/jam) selama 1-3 tahun, berlaku untuk EC2, Fargate, dan Lambda. Lebih fleksibel dari RI.

**4. Right-sizing**
Gunakan AWS Cost Explorer dan Compute Optimizer untuk menemukan instance yang over-provisioned. Banyak perusahaan membayar untuk instance yang terlalu besar — downgrade ke size yang tepat bisa menghemat 30-50%.

### Tools Monitoring Biaya
- **AWS Cost Explorer** — visualisasi dan analisis spending
- **AWS Budgets** — set budget dan terima alert saat mendekati batas
- **Cost Anomaly Detection** — AI yang mendeteksi spending yang tidak biasa`,
            keyTakeaway: "AWS menggunakan pay-as-you-go. Hemat biaya dengan Reserved Instances (diskon 72%), Spot Instances (diskon 90%), Savings Plans, dan right-sizing resource.",
          },
          {
            type: "lesson",
            title: "Keamanan Berlapis di AWS: Defense in Depth",
            body: `Keamanan di AWS bukan satu lapisan — ini adalah strategi **defense in depth** (pertahanan berlapis) di mana setiap lapisan memberikan perlindungan tambahan. Jika satu lapisan ditembus, lapisan berikutnya masih melindungi.

### Shared Responsibility Model

Ini adalah konsep terpenting yang harus kamu pahami: keamanan di AWS adalah **tanggung jawab bersama** antara AWS dan kamu.

**AWS bertanggung jawab atas "Security OF the Cloud":**
- Keamanan fisik data center (biometrik, CCTV, satpam 24/7)
- Hardware (server, storage, networking equipment)
- Software infrastruktur (hypervisor, managed services internals)
- Compliance dan sertifikasi (ISO 27001, SOC 2, PCI DSS)

**Kamu bertanggung jawab atas "Security IN the Cloud":**
- Konfigurasi IAM (users, groups, policies, roles)
- Konfigurasi Security Groups dan NACLs
- Enkripsi data (at rest dan in transit)
- Patching OS dan aplikasi di EC2
- Konfigurasi S3 bucket policies (jangan biarkan publik!)
- Network configuration (VPC, subnet, routing)

### Lapisan-lapisan Keamanan di AWS

**Lapisan 1: Akun & Identitas (IAM)**
- MFA wajib, least privilege, role untuk services
- AWS Organizations untuk isolasi multi-akun

**Lapisan 2: Jaringan (VPC)**
- Virtual Private Cloud untuk isolasi jaringan
- Security Groups (stateful firewall per instance)
- Network ACLs (stateless firewall per subnet)
- Private subnet untuk resource yang tidak perlu akses internet

**Lapisan 3: Enkripsi**
- **At rest**: AWS KMS (Key Management Service) untuk mengenkripsi data di S3, RDS, EBS
- **In transit**: TLS/SSL untuk mengenkripsi data yang bergerak antar layanan

**Lapisan 4: Monitoring & Deteksi**
- **CloudTrail**: mencatat SEMUA API call — siapa melakukan apa, kapan, dari mana
- **GuardDuty**: deteksi ancaman otomatis menggunakan machine learning
- **Config**: memantau perubahan konfigurasi resource
- **SecurityHub**: dashboard terpusat untuk temuan keamanan

**Lapisan 5: Respons Insiden**
- AWS Systems Manager untuk patch management otomatis
- Lambda untuk otomasi respons (misalnya: auto-revoke public S3 bucket)
- SNS untuk notifikasi real-time

Ingat: keamanan terbaik adalah yang berlapis. Jangan bergantung pada satu mekanisme saja. Kombinasikan IAM + VPC + enkripsi + monitoring untuk perlindungan yang komprehensif.`,
            keyTakeaway: "Keamanan AWS menggunakan Shared Responsibility Model dan defense in depth: IAM → VPC → Enkripsi → Monitoring → Respons Insiden.",
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang AWS & IAM",
            body: "Pastikan kamu sudah memahami infrastruktur global AWS, IAM (Users, Groups, Policies, Roles), best practices keamanan, dan model harga AWS sebelum melanjutkan ke modul komputasi.",
            quizBank: [
              {
                id: "q1",
                question: "Apa fungsi utama dari Availability Zone (AZ) di AWS?",
                options: [
                  { id: "a", text: "Menyediakan isolasi jaringan antar akun AWS" },
                  { id: "b", text: "Memberikan high availability dengan data center terpisah dalam satu Region" },
                  { id: "c", text: "Menyimpan cache konten statis lebih dekat ke pengguna" },
                  { id: "d", text: "Mengelola akses user melalui IAM policy" },
                ],
                correctAnswer: "b",
                explanation: "Availability Zone adalah satu atau lebih data center fisik yang terpisah dalam satu Region AWS. Setiap AZ punya daya, jaringan, dan konektivitas sendiri. Mendistribusikan resource di beberapa AZ memberikan high availability — jika satu AZ gagal, aplikasi tetap berjalan dari AZ lain.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Apa perbedaan utama antara IAM User dan IAM Role?",
                options: [
                  { id: "a", text: "IAM User untuk manusia, IAM Role untuk mesin/aplikasi" },
                  { id: "b", text: "IAM User punya kredensial permanen, IAM Role punya kredensial sementara yang otomatis kedaluwarsa" },
                  { id: "c", text: "Tidak ada perbedaan — keduanya sama saja" },
                  { id: "d", text: "IAM Role hanya bisa digunakan oleh layanan AWS, bukan oleh manusia" },
                ],
                correctAnswer: "b",
                explanation: "IAM User memiliki kredensial permanen (password atau access key) yang tidak berubah sampai dirotasi manual. IAM Role memberikan kredensial sementara melalui AWS STS yang otomatis kedaluwarsa (default 1 jam). Role lebih aman karena mengurangi risiko kebocoran kredensial jangka panjang.",
                difficulty: "medium",
              },
              {
                id: "q3",
                question: "Apa yang dimaksud dengan Principle of Least Privilege di IAM?",
                options: [
                  { id: "a", text: "Memberikan akses AdministratorAccess ke semua user agar tidak ada yang terhalang" },
                  { id: "b", text: "Memberikan izin seminimal mungkin yang dibutuhkan untuk menyelesaikan tugas" },
                  { id: "c", text: "Membatasi jumlah user yang bisa login ke AWS Console" },
                  { id: "d", text: "Privilege hanya diberikan ke root user" },
                ],
                correctAnswer: "b",
                explanation: "Least Privilege adalah prinsip keamanan inti di AWS: mulai dari nol izin, lalu tambahkan hanya izin spesifik yang benar-benar dibutuhkan. Misalnya, seorang developer backend cukup diberi akses ke EC2 dan RDS, bukan akses ke billing atau IAM management.",
                difficulty: "easy",
              },
              {
                id: "q4",
                question: "Mengapa MFA (Multi-Factor Authentication) wajib diaktifkan untuk root user AWS?",
                options: [
                  { id: "a", text: "Karena root user bisa menghapus seluruh akun AWS" },
                  { id: "b", text: "Karena root user memiliki akses tak terbatas ke semua layanan dan resource, jadi jika password bocor, penyerang bisa mengambil alih akun sepenuhnya" },
                  { id: "c", text: "Karena AWS mewajibkan MFA untuk semua layanan" },
                  { id: "d", text: "Karena tanpa MFA, root user tidak bisa membuat IAM user baru" },
                ],
                correctAnswer: "b",
                explanation: "Root user memiliki akses penuh tak terbatas (full unrestricted access) ke seluruh akun AWS. Tanpa MFA, siapapun yang mendapatkan password root bisa mengakses Console, mengubah billing, menghapus resource, atau bahkan menutup akun. MFA menambahkan lapisan keamanan kedua berupa kode dari device fisik.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question: "Manakah skenario yang PALING TEPAT untuk menggunakan IAM Role?",
                options: [
                  { id: "a", text: "Seorang developer login ke AWS Console setiap hari" },
                  { id: "b", text: "EC2 instance perlu mengakses S3 bucket untuk membaca file konfigurasi" },
                  { id: "c", text: "Membuat bucket S3 baru untuk penyimpanan data" },
                  { id: "d", text: "Menambahkan user baru ke IAM Group" },
                ],
                correctAnswer: "b",
                explanation: "EC2 instance yang perlu mengakses S3 adalah use case klasik IAM Role. Dengan membuat EC2 Instance Role dan melampirkannya ke instance, EC2 mendapatkan kredensial sementara yang otomatis dirotasi — tanpa perlu menyimpan access key di dalam instance (yang berisiko bocor).",
                difficulty: "medium",
              },
            ],
          },
        ],
      },

      // ============================================================
      // MODUL 2: Komputasi Cloud — EC2 & Lambda
      // ============================================================
      {
        title: "Komputasi Cloud: EC2 & Lambda",
        slug: "komputasi-cloud-ec2-lambda",
        xpReward: 80,
        slides: [
          {
            type: "lesson",
            title: "Dua Paradigma Komputasi di AWS",
            body: `Di modul sebelumnya, kamu sudah memahami fondasi AWS dan IAM. Sekarang saatnya masuk ke jantung cloud computing: **komputasi** — kemampuan untuk menjalankan kode dan memproses data.

AWS menyediakan dua pendekatan komputasi yang fundamentally berbeda:

**1. Amazon EC2 (Elastic Compute Cloud)** — Server virtual tradisional. Kamu menyewa mesin virtual, install OS, konfigurasi software, dan mengelola semuanya sendiri. Fleksibilitas maksimal, tapi tanggung jawab juga maksimal.

**2. AWS Lambda** — Serverless computing. Kamu cukup upload kode (function), dan AWS yang mengurus semuanya — server, OS, scaling, patching. Kamu bahkan tidak tahu ada server di belakangnya.

### Analoginya: Mobil Pribadi vs Ojek Online

**EC2 = Mobil Pribadi.** Kamu beli (sewa) mobilnya, kamu yang nyetir, kamu yang isi bensin, kamu yang servis, kamu yang parkir. Kamu bisa pergi kemana saja, kapan saja, dan bisa modifikasi mobil sesukamu. Tapi kalau lagi tidak dipakai, mobil tetap ada dan kamu tetap bayar asuransi dan parkir.

**Lambda = Ojek Online.** Kamu cukup buka app, pesan, sampai tujuan, bayar — selesai. Kamu tidak perlu tahu siapa drivernya, mobilnya apa, bensinnya berapa. Kamu hanya bayar untuk perjalanan yang benar-benar kamu lakukan. Tapi kamu tidak bisa modifikasi mobilnya atau minta driver berhenti di 10 tempat sekaligus.

### Dalam Modul Ini

Kamu akan mempelajari keduanya secara mendalam:
- Cara kerja EC2: instance types, AMI, security groups, auto scaling
- Cara kerja Lambda: functions, triggers, execution model
- Kapan harus menggunakan EC2 vs Lambda
- Bagaimana keduanya saling melengkapi dalam arsitektur modern

Kebanyakan aplikasi modern menggunakan kombinasi keduanya — EC2 untuk workload utama yang butuh kontrol penuh, Lambda untuk event-driven tasks dan microservices. Mari kita mulai dengan EC2.`,
            keyTakeaway: "EC2 = server virtual (kontrol penuh, kamu kelola semua). Lambda = serverless (upload kode, AWS kelola sisanya). Kebanyakan arsitektur modern menggunakan kombinasi keduanya.",
            sources: [
              { type: "DOCUMENTATION", title: "What is Amazon EC2? — AWS Docs", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html" },
              { type: "DOCUMENTATION", title: "What is AWS Lambda? — AWS Docs", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html" },
              { type: "YOUTUBE", title: "AWS — Amazon EC2 Basics & Instances Tutorial", url: "https://www.youtube.com/watch?v=iHX-jtKIVNA" },
              { type: "YOUTUBE", title: "AWS — AWS Lambda Tutorial for Beginners", url: "https://www.youtube.com/watch?v=97q30JjEq9Y" },
            ],
          },
          {
            type: "lesson",
            title: "Amazon EC2: Server Virtual di Cloud",
            body: `**Amazon EC2 (Elastic Compute Cloud)** adalah layanan yang memungkinkanmu menjalankan server virtual (disebut **instance**) di cloud AWS. Ini adalah layanan AWS yang paling fundamental — hampir semua yang kamu kenal berjalan di atas EC2 dalam satu atau lain bentuk.

### Apa Itu EC2 Instance?

EC2 instance adalah mesin virtual yang berjalan di atas hardware fisik AWS. Kamu bisa memilih spesifikasi (CPU, RAM, storage, network), sistem operasi (Amazon Linux, Ubuntu, Windows), dan software yang diinstall. Setelah diluncurkan, kamu bisa mengaksesnya melalui SSH (Linux) atau RDP (Windows).

### Komponen Utama EC2

**1. Instance** — mesin virtual itu sendiri. Kamu bisa launch, stop, start, reboot, dan terminate instance.

**2. AMI (Amazon Machine Image)** — template yang berisi OS + software yang sudah dikonfigurasi. Saat meluncurkan instance, kamu memilih AMI sebagai "cetak biru". AWS menyediakan AMI untuk Amazon Linux, Ubuntu, Windows, dll. Kamu juga bisa membuat AMI kustom dari instance-mu sendiri.

**3. Instance Type** — menentukan spesifikasi hardware virtual (CPU, RAM, network, storage). Contoh: \`t3.micro\` (1 vCPU, 1 GB RAM), \`m5.large\` (2 vCPU, 8 GB RAM), \`c5.4xlarge\` (16 vCPU, 32 GB RAM, optimized for compute).

**4. EBS (Elastic Block Store)** — hard disk virtual yang dipasang ke instance. Data di EBS tetap ada meskipun instance di-stop (persistent storage). Kamu bisa memilih tipe EBS: gp3 (general purpose SSD), io2 (high performance), st1 (throughput optimized HDD).

**5. Security Group** — firewall virtual yang mengontrol traffic masuk (inbound) dan keluar (outbound) dari instance. Ini adalah lapisan keamanan pertama di level network.

**6. Key Pair** — pasangan kunci enkripsi (public + private) untuk autentikasi SSH. AWS menyimpan public key, kamu menyimpan private key. JANGAN pernah membagikan private key.

### Lifecycle EC2 Instance

Instance punya beberapa status:
- **Running** — instance aktif, kamu membayar biaya komputasi + storage
- **Stopped** — instance mati, kamu TIDAK membayar komputasi tapi TETAP bayar EBS storage
- **Terminated** — instance dihapus permanen, EBS juga bisa dihapus (tergantung konfigurasi)

Penting: **Stop ≠ Terminate**. Stop itu seperti mematikan komputer (datanya masih ada), Terminate itu seperti membuang komputer ke tempat sampah.`,
            keyTakeaway: "EC2 instance = server virtual dengan komponen: AMI (template OS), Instance Type (spesifikasi), EBS (disk), Security Group (firewall), dan Key Pair (SSH auth).",
          },
          {
            type: "lesson",
            title: "Instance Types: Memilih Spesifikasi yang Tepat",
            body: `Memilih instance type yang tepat sangat krusial — terlalu kecil menyebabkan performa buruk, terlalu besar membuang uang. AWS menawarkan ratusan instance type yang dikelompokkan dalam beberapa family berdasarkan use case.

### Cara Membaca Nama Instance Type

Contoh: **m5.xlarge**
- **m** = family (General Purpose)
- **5** = generation (semakin besar = semakin baru dan efisien)
- **xlarge** = size (semakin besar = semakin banyak resource)

### Instance Families

**T-series (Burstable)** — \`t3.micro\`, \`t3.small\`, \`t3.medium\`
Cocok untuk workload ringan dengan spike sesekali. Menggunakan sistem "CPU credits" — saat idle, kamu mengumpulkan credit; saat busy, kamu menggunakan credit. Hemat biaya untuk development, staging, dan website kecil. **t3.micro termasuk Free Tier.**

**M-series (General Purpose)** — \`m5.large\`, \`m5.xlarge\`
Keseimbangan antara compute, memory, dan network. Cocok untuk web server, application server, dan database menengah. Ini adalah "default choice" jika kamu tidak yakin family mana yang cocok.

**C-series (Compute Optimized)** — \`c5.large\`, \`c5.2xlarge\`
Prosesor performa tinggi. Cocok untuk batch processing, encoding video, scientific modeling, game server, dan machine learning inference.

**R-series (Memory Optimized)** — \`r5.large\`, \`r5.2xlarge\`
RAM besar. Cocok untuk database in-memory (Redis, Memcached), real-time analytics, dan processing dataset besar.

**G/P-series (GPU)** — \`g4dn.xlarge\`, \`p3.2xlarge\`
Dilengkapi GPU (NVIDIA). Cocok untuk machine learning training, rendering 3D, video transcoding.

**I-series (Storage Optimized)** — \`i3.large\`
Storage lokal super cepat (NVMe SSD). Cocok untuk database NoSQL seperti Cassandra, data warehousing.

### Tips Memilih Instance Type

1. **Mulai kecil, scale up jika perlu** — lebih baik mulai dari t3.small lalu upgrade, daripada mulai dari m5.2xlarge yang ternyata berlebihan
2. **Gunakan CloudWatch** untuk monitor CPU, memory, dan network — jika utilisasi CPU rata-rata di bawah 20%, instance-mu terlalu besar
3. **Untuk belajar dan development**, t3.micro (Free Tier) sudah lebih dari cukup
4. **Untuk production web server** dengan trafik menengah, m5.large biasanya pilihan yang baik
5. **AWS Compute Optimizer** bisa memberikan rekomendasi right-sizing berdasarkan pola penggunaan aktualmu`,
            keyTakeaway: "Instance type menentukan spesifikasi EC2. Family utama: T (burstable/hemat), M (general purpose), C (compute), R (memory), G/P (GPU). Mulai kecil, scale up sesuai kebutuhan.",
          },
          {
            type: "example",
            title: "Hands-On: Meluncurkan EC2 Instance Pertamamu",
            body: `Mari kita simulasikan langkah-langkah meluncurkan EC2 instance pertama melalui AWS Console. Kamu bisa mempraktikkan ini langsung di akun AWS Free Tier-mu.

### Langkah 1: Buka EC2 Dashboard
Di Console, ketik "EC2" di search bar, klik layanan EC2. Kamu akan melihat EC2 Dashboard dengan ringkasan resource yang sedang berjalan.

### Langkah 2: Launch Instance
Klik tombol **"Launch Instance"** (biasanya berwarna oranye). Ini membuka wizard pembuatan instance.

### Langkah 3: Name and Tags
Beri nama instance-mu, misalnya "web-server-test". Tags membantu mengorganisir resource saat akunmu semakin besar.

### Langkah 4: Pilih AMI
Pilih **Amazon Linux 2023** (Free Tier eligible). Ini adalah OS Linux yang dioptimasi untuk AWS — ringan, aman, dan di-maintain langsung oleh AWS.

### Langkah 5: Pilih Instance Type
Pilih **t3.micro** (atau t2.micro tergantung region) — ini termasuk Free Tier sehingga gratis selama 750 jam/bulan.

### Langkah 6: Key Pair
Klik "Create new key pair". Beri nama misalnya "my-first-key", pilih format .pem (untuk macOS/Linux) atau .ppk (untuk Windows/PuTTY). **Download dan simpan file ini dengan aman — kamu tidak bisa mendownloadnya lagi!**

### Langkah 7: Network Settings
Biarkan default VPC. Di Security Group, pastikan ada rule:
- **SSH (port 22)** — Source: My IP (JANGAN "Anywhere" untuk production!)
- **HTTP (port 80)** — Source: Anywhere (jika ingin akses web)

### Langkah 8: Storage
Default 8 GB gp3 sudah cukup untuk belajar. Di production, sesuaikan dengan kebutuhan.

### Langkah 9: Launch!
Klik "Launch Instance". Dalam 1-2 menit, instance-mu akan running.

### Langkah 10: Koneksi SSH

\`\`\`bash
# Ubah permission key file (macOS/Linux)
chmod 400 my-first-key.pem

# SSH ke instance (ganti IP dengan public IP instance-mu)
ssh -i my-first-key.pem ec2-user@54.123.45.67
\`\`\`

Selamat! Kamu sekarang terhubung ke server virtual di cloud. Kamu bisa install web server (\`sudo yum install nginx\`), deploy aplikasi, atau bereksperimen sesukamu. Jangan lupa **stop atau terminate** instance setelah selesai agar tidak dikenakan biaya berlebih.`,
            keyTakeaway: "Meluncurkan EC2 membutuhkan: AMI (OS), Instance Type (t3.micro Free Tier), Key Pair (SSH auth), Security Group (firewall rules), dan EBS storage.",
          },
          {
            type: "lesson",
            title: "Security Groups: Firewall Virtual untuk EC2",
            body: `**Security Group** adalah firewall virtual yang mengontrol traffic jaringan masuk (inbound) dan keluar (outbound) dari EC2 instance. Ini adalah lapisan keamanan paling dasar dan paling penting di AWS — konfigurasi yang salah bisa membuka instance-mu ke seluruh internet.

### Cara Kerja Security Groups

Security Group bekerja di level **instance** — setiap instance harus punya minimal satu security group. Rules dalam security group menentukan traffic mana yang diizinkan masuk dan keluar.

**Prinsip Default:**
- **Semua inbound traffic DITOLAK** secara default (kecuali ada rule yang mengizinkan)
- **Semua outbound traffic DIIZINKAN** secara default

Ini berarti: jika kamu tidak menambahkan inbound rule apapun, tidak ada seorang pun yang bisa mengakses instance-mu dari luar — bahkan kamu sendiri.

### Komponen Rule

Setiap rule terdiri dari:
- **Type/Protocol** — SSH (TCP 22), HTTP (TCP 80), HTTPS (TCP 443), Custom TCP/UDP
- **Port Range** — port spesifik atau range (misalnya 3000-3100)
- **Source/Destination** — dari mana traffic berasal atau kemana tujuannya

### Contoh Konfigurasi Security Group

**Untuk Web Server:**
\`\`\`
Inbound Rules:
- SSH (22)      → Source: My IP (hanya IP kantormu)
- HTTP (80)     → Source: 0.0.0.0/0 (siapa saja)
- HTTPS (443)   → Source: 0.0.0.0/0 (siapa saja)

Outbound Rules:
- All traffic   → Destination: 0.0.0.0/0 (default)
\`\`\`

**Untuk Database Server (private):**
\`\`\`
Inbound Rules:
- PostgreSQL (5432) → Source: sg-webserver (HANYA dari web server security group)

Outbound Rules:
- All traffic → Destination: 0.0.0.0/0
\`\`\`

### Fitur Penting: Stateful

Security Groups bersifat **stateful** — artinya jika kamu mengizinkan request masuk, response-nya otomatis diizinkan keluar tanpa perlu rule outbound terpisah. Contoh: jika ada inbound rule SSH (port 22), respons SSH otomatis bisa keluar.

### Best Practices Security Group

1. **JANGAN buka SSH (port 22) ke 0.0.0.0/0** — ini membuka server ke seluruh internet. Batasi ke IP kantormu atau gunakan AWS Systems Manager Session Manager sebagai alternatif SSH.
2. **Pisahkan security group berdasarkan fungsi** — buat SG terpisah untuk web, app, dan database tier
3. **Gunakan security group ID sebagai source** (bukan IP) — ini memungkinkan referensi antar resource secara dinamis
4. **Review security groups secara berkala** — hapus rules yang tidak lagi dibutuhkan`,
            keyTakeaway: "Security Groups = firewall stateful di level instance. Default: semua inbound ditolak, semua outbound diizinkan. JANGAN buka SSH ke 0.0.0.0/0!",
          },
          {
            type: "lesson",
            title: "Auto Scaling & Elastic Load Balancing: Skalabilitas Otomatis",
            body: `Salah satu keunggulan terbesar cloud dibanding on-premise adalah kemampuan untuk **scale secara otomatis** — menambah atau mengurangi server berdasarkan beban kerja aktual. AWS menyediakan dua layanan yang bekerja bersama untuk ini: **Auto Scaling Group** dan **Elastic Load Balancer**.

### Auto Scaling Group (ASG)

ASG secara otomatis mengelola jumlah EC2 instance berdasarkan kondisi yang kamu tentukan. Kamu mendefinisikan:

- **Minimum capacity** — jumlah instance minimum yang selalu berjalan (misalnya: 2)
- **Desired capacity** — jumlah instance ideal saat kondisi normal (misalnya: 2)
- **Maximum capacity** — batas atas instance saat trafik puncak (misalnya: 10)

**Scaling Policies:**
- **Target Tracking** — "Jaga CPU utilization di 60%". ASG otomatis menambah instance jika CPU naik di atas 60% dan mengurangi jika turun di bawahnya.
- **Step Scaling** — "Jika CPU > 70% tambah 2 instance, jika CPU > 90% tambah 4 instance"
- **Scheduled Scaling** — "Setiap hari Jumat jam 18:00 (menjelang weekend sale), tambah instance menjadi 6"

### Elastic Load Balancer (ELB)

ELB mendistribusikan traffic masuk ke beberapa EC2 instance secara merata. Ini memastikan tidak ada satu instance yang kewalahan sementara instance lain menganggur.

**Jenis Load Balancer:**
- **Application Load Balancer (ALB)** — bekerja di Layer 7 (HTTP/HTTPS). Bisa routing berdasarkan URL path, host header, dan query string. Paling umum digunakan untuk web application.
- **Network Load Balancer (NLB)** — bekerja di Layer 4 (TCP/UDP). Ultra-low latency, cocok untuk game server, streaming, dan koneksi WebSocket.
- **Gateway Load Balancer (GWLB)** — untuk appliance virtual (firewall, IDS/IPS pihak ketiga).

### ASG + ELB = Arsitektur yang Tangguh

Kombinasi keduanya menciptakan arsitektur yang:
1. **Self-healing** — jika instance gagal health check, ASG otomatis mengganti dengan instance baru
2. **Auto-scaling** — menambah kapasitas saat trafik tinggi, mengurangi saat rendah
3. **Cost-efficient** — kamu hanya bayar untuk instance yang benar-benar berjalan
4. **Highly available** — ELB mendistribusikan traffic ke instance di beberapa AZ

Bayangkan toko online saat flash sale: trafik naik 10x lipat → ASG menambah instance → ELB mendistribusikan traffic → flash sale selesai → ASG mengurangi instance → biayamu kembali normal. Semua terjadi secara otomatis tanpa intervensi manual.`,
            keyTakeaway: "Auto Scaling otomatis menambah/kurangi EC2 berdasarkan beban. ELB mendistribusikan traffic ke banyak instance. Kombinasi keduanya = arsitektur self-healing dan cost-efficient.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon EC2 Auto Scaling — AWS Docs", url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html" },
              { type: "DOCUMENTATION", title: "Elastic Load Balancing — AWS Docs", url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html" },
            ],
          },
          {
            type: "lesson",
            title: "AWS Lambda: Serverless Computing Tanpa Repot",
            body: `Sekarang kita beralih ke paradigma komputasi yang berbeda total: **serverless**. AWS Lambda memungkinkanmu menjalankan kode tanpa memikirkan server sama sekali — tidak perlu provisioning, patching, atau scaling manual.

### Apa Itu AWS Lambda?

Lambda adalah layanan yang menjalankan kode (disebut **function**) sebagai respons terhadap **event** (peristiwa). Kamu upload kode-mu, tentukan event apa yang memicunya, dan Lambda mengeksekusi kode itu secara otomatis. Kamu membayar hanya untuk waktu eksekusi — diukur per milidetik.

### Cara Kerja Lambda

1. **Kamu menulis function** — misalnya function Python yang meresize gambar
2. **Kamu menentukan trigger** — misalnya "jalankan function ini setiap kali ada file baru di S3 bucket"
3. **Event terjadi** — seseorang mengupload gambar ke S3
4. **Lambda mengeksekusi function-mu** — gambar di-resize secara otomatis
5. **Lambda berhenti** — setelah function selesai, tidak ada resource yang berjalan (dan tidak ada biaya)

### Bahasa yang Didukung
Lambda mendukung: Python, Node.js, Java, Go, C# (.NET), Ruby, dan custom runtime (bisa bahasa apa saja via container image).

### Contoh Use Cases Lambda

**1. API Backend**
Lambda + API Gateway = REST API tanpa server. Setiap request HTTP memicu function Lambda terpisah. Sangat populer untuk microservices.

**2. File Processing**
File diupload ke S3 → Lambda memproses (resize gambar, convert video, extract text dari PDF) → hasil disimpan ke S3 lain.

**3. Scheduled Tasks (Cron Jobs)**
EventBridge (CloudWatch Events) memicu Lambda setiap jam/hari untuk menjalankan tugas terjadwal — kirim email digest, bersihkan data expired, generate report.

**4. Real-time Stream Processing**
Data dari Kinesis/DynamoDB Stream → Lambda memproses setiap record secara real-time → simpan ke database atau kirim notifikasi.

### Batasan Lambda

Lambda bukan solusi untuk segalanya. Ada beberapa batasan penting:
- **Timeout maksimal**: 15 menit. Jika function-mu butuh waktu lebih lama, Lambda bukan pilihan yang tepat.
- **Memory**: 128 MB - 10 GB. CPU dialokasikan proporsional dengan memory.
- **Package size**: 50 MB (zip) atau 10 GB (container image).
- **Cold start**: function yang jarang dipanggil mungkin mengalami delay 100ms-beberapa detik saat pertama kali dijalankan karena Lambda perlu menyiapkan execution environment.
- **Stateless**: setiap eksekusi Lambda bersifat independen. Jangan simpan state di memory — gunakan DynamoDB, S3, atau ElastiCache.`,
            keyTakeaway: "Lambda menjalankan kode sebagai respons terhadap event — tanpa server. Bayar per milidetik eksekusi. Batasan: max 15 menit timeout, stateless, dan ada cold start.",
          },
          // CHALLENGE
          {
            type: "challenge",
            title: "Challenge: Merancang Arsitektur Komputasi untuk Toko Online",
            body: `Kamu diminta merancang arsitektur komputasi untuk startup toko online "SepatuKu" yang menjual sepatu custom. Aplikasi ini punya beberapa komponen: website (frontend + backend API), fitur upload gambar sepatu custom dari pelanggan (yang perlu di-resize ke 3 ukuran: thumbnail, medium, dan full), dan pengiriman email konfirmasi pesanan setiap ada transaksi baru.

Website mendapat trafik harian sekitar 5.000 pengunjung, tapi saat ada promo bisa melonjak hingga 50.000 pengunjung. Tentukan: komponen mana yang harus pakai EC2, mana yang pakai Lambda, dan jelaskan alasannya.`,
            challenge: {
              instruction: "Rancang arsitektur komputasi SepatuKu. Untuk setiap komponen (website/API, image processing, email), tentukan apakah sebaiknya pakai EC2 atau Lambda, dan jelaskan alasannya berdasarkan karakteristik workload. Sertakan juga bagaimana kamu menangani lonjakan trafik saat promo.",
              inputType: "text",
              inputPlaceholder: "Contoh:\n\n1. Website & Backend API:\n   - Pilihan: EC2 dengan Auto Scaling\n   - Alasan: ...\n\n2. Image Processing:\n   - Pilihan: Lambda\n   - Alasan: ...",
              starterCode: "",
              expectedConcepts: [
                "Website/API menggunakan EC2 + Auto Scaling + ELB untuk menangani trafik fluktuatif",
                "Image processing menggunakan Lambda karena event-driven dan durasi singkat",
                "Email notification menggunakan Lambda + SES karena bersifat async dan tidak perlu server 24/7",
                "Penjelasan mengapa masing-masing komponen cocok dengan layanan yang dipilih",
              ],
              evaluationCriteria: "Evaluasi: (1) Apakah website/API menggunakan EC2 + ASG + ELB? Ini workload utama yang butuh availability 24/7 dan auto-scaling untuk promo. Lambda juga bisa tapi EC2+ASG lebih tradisional. (2) Apakah image resize menggunakan Lambda? Ini event-driven (trigger: upload ke S3), durasi singkat (<15 menit), dan tidak perlu server idle. (3) Apakah email menggunakan Lambda? Ini triggered by event (pesanan baru), singkat, dan async. (4) Apakah ada penjelasan tentang scaling strategy saat promo? Jawaban 3/4 poin = baik. 4/4 = sangat baik.",
              hints: [
                "Pikirkan: apakah komponen ini harus berjalan 24/7, atau hanya saat ada event tertentu?",
                "Image processing dipicu oleh upload file — ini adalah event. Apakah perlu server yang berjalan terus menunggu upload?",
                "Untuk trafik 5.000 → 50.000 saat promo, bagaimana caranya agar website tidak crash?",
              ],
              sampleAnswer: "1. Website & API: EC2 (t3.medium) + Auto Scaling Group (min 2, max 8) + ALB. Alasan: workload utama 24/7, butuh availability tinggi. ASG menangani lonjakan saat promo (scaling policy: CPU > 60% → tambah instance). 2. Image Processing: Lambda (trigger: S3 PutObject event). Alasan: event-driven, durasi singkat (~5 detik per resize), tidak perlu server idle. Lambda auto-scale tanpa konfigurasi. 3. Email Konfirmasi: Lambda (trigger: SQS queue dari API) + Amazon SES. Alasan: async, tidak butuh server 24/7, jarang terjadi (hanya saat ada pesanan baru).",
              followUpQuestion: "Jika SepatuKu berkembang dan mulai menjual 10.000 pesanan per hari, apakah arsitektur ini masih cocok atau perlu diubah?",
            },
          },
          {
            type: "lesson",
            title: "Pembahasan Challenge: Arsitektur Hybrid EC2 + Lambda",
            body: `Mari kita bahas solusi arsitektur komputasi untuk toko online SepatuKu. Kunci dari challenge ini adalah memahami kapan menggunakan EC2 (always-on workload) dan Lambda (event-driven workload).

### Komponen 1: Website & Backend API → EC2 + ASG + ALB

**Pilihan: EC2 dengan Auto Scaling Group dan Application Load Balancer**

Mengapa EC2 dan bukan Lambda?
- Website harus **available 24/7** — bukan event-driven
- Backend API mungkin punya **state** (session, WebSocket connections)
- Trafik dasar 5.000 pengunjung/hari → butuh minimal 2 instance untuk high availability
- Saat promo (50.000 pengunjung), ASG auto-scale hingga 6-8 instance

Konfigurasi:
- Instance type: t3.medium (2 vCPU, 4 GB RAM) — cukup untuk Next.js/Express
- ASG: min=2, desired=2, max=8
- Scaling policy: Target tracking CPU 60%
- ALB: distribusi traffic di 2+ AZ
- ALB health check: HTTP 200 di endpoint /health

### Komponen 2: Image Resizing → Lambda

**Pilihan: Lambda dengan trigger S3 PutObject**

Mengapa Lambda?
- Ini **event-driven** — hanya perlu berjalan saat ada gambar baru diupload
- Durasi pendek — resize 3 ukuran gambar memakan waktu ~3-10 detik
- Tidak perlu server yang idle 24/7 menunggu upload
- Lambda **auto-scale** secara otomatis — jika 100 orang upload bersamaan, Lambda menjalankan 100 function secara paralel

Flow:
1. User upload gambar → disimpan ke S3 bucket \`sepatu-uploads\`
2. S3 trigger → Lambda function dipanggil
3. Lambda resize ke 3 ukuran (thumbnail 150x150, medium 600x600, full 1200x1200)
4. Hasil disimpan ke S3 bucket \`sepatu-processed\`

### Komponen 3: Email Konfirmasi → Lambda + SES

**Pilihan: Lambda dengan trigger SQS + Amazon SES (Simple Email Service)**

Mengapa Lambda?
- Email dikirim hanya saat ada **pesanan baru** — bukan terus-menerus
- Proses singkat — compose email + kirim via SES memakan waktu <1 detik
- Menggunakan SQS sebagai buffer agar jika Lambda gagal, pesan tidak hilang

### Arsitektur Lengkap

Inilah kekuatan cloud: kamu tidak harus memilih satu pendekatan. Gunakan **EC2 untuk workload utama** yang butuh availability konstan, dan **Lambda untuk task-task pendukung** yang bersifat event-driven dan intermittent. Arsitektur hybrid ini memberikan keseimbangan antara performa, biaya, dan kemudahan pengelolaan.`,
            keyTakeaway: "Arsitektur modern menggabungkan EC2 (workload 24/7) dan Lambda (event-driven). Gunakan masing-masing sesuai karakteristik workload — bukan one-size-fits-all.",
          },
          {
            type: "lesson",
            title: "API Gateway + Lambda: REST API Tanpa Server",
            body: `Salah satu use case Lambda yang paling populer adalah membangun **REST API tanpa server** menggunakan kombinasi **API Gateway + Lambda**. Ini adalah arsitektur yang digunakan oleh banyak startup dan perusahaan modern.

### Apa Itu Amazon API Gateway?

API Gateway adalah layanan yang memungkinkanmu membuat, mempublikasikan, dan mengelola REST API atau WebSocket API. Ia bertindak sebagai "pintu depan" yang menerima request HTTP dari client, meneruskannya ke backend (Lambda, EC2, atau layanan lain), dan mengembalikan response.

### Bagaimana API Gateway + Lambda Bekerja?

\`\`\`
Client → API Gateway → Lambda Function → Response
  |          |              |
  |    [URL routing]   [Business logic]
  |    [Auth/rate limit]  [DB access]
  |    [CORS headers]    [Return JSON]
\`\`\`

1. Client mengirim HTTP request (misalnya \`GET /api/products\`)
2. API Gateway menerima request, memvalidasi, dan meneruskan ke Lambda
3. Lambda mengeksekusi business logic (query database, process data)
4. Lambda mengembalikan response (JSON)
5. API Gateway meneruskan response ke client

### Contoh Lambda Function (Node.js)

\`\`\`javascript
export const handler = async (event) => {
  const { httpMethod, path, queryStringParameters } = event;
  
  if (httpMethod === 'GET' && path === '/api/products') {
    // Query database
    const products = await getProductsFromDB();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products }),
    };
  }
  
  return { statusCode: 404, body: 'Not Found' };
};
\`\`\`

### Keunggulan API Gateway + Lambda

1. **Zero server management** — tidak perlu provisioning, patching, atau monitoring server
2. **Auto-scaling otomatis** — dari 0 request hingga jutaan request per detik
3. **Pay-per-request** — tidak ada biaya saat tidak ada traffic (sempurna untuk MVP)
4. **Built-in features** — API Gateway menyediakan throttling, caching, CORS, authentication, dan request validation secara gratis
5. **Integrasi AWS** — mudah terhubung ke DynamoDB, S3, SQS, SNS

### Kapan TIDAK Cocok?

- Aplikasi yang butuh **WebSocket connections yang persist** (meskipun API Gateway mendukung WebSocket, ada batasan)
- Workload yang butuh **execution time > 29 detik** (batas timeout API Gateway untuk integrasi Lambda)
- Aplikasi yang butuh **shared state** antar request (Lambda stateless)
- Biaya bisa lebih mahal jika volume request sangat tinggi dan konstan (>100 juta request/bulan, hitung dulu perbandingan biaya vs EC2)`,
            keyTakeaway: "API Gateway + Lambda = REST API serverless. Auto-scale dari 0 ke jutaan request, bayar per request. Cocok untuk MVP dan microservices.",
          },
          {
            type: "lesson",
            title: "EC2 vs Lambda: Kapan Menggunakan Masing-masing?",
            body: `Sekarang kamu sudah memahami keduanya. Pertanyaan terpenting: kapan harus pilih EC2 dan kapan Lambda? Mari kita buat framework pengambilan keputusan yang jelas.

### Pilih EC2 Jika:

**1. Workload berjalan terus-menerus (24/7)**
Website utama, API gateway yang melayani traffic konstan, game server yang selalu online.

**2. Execution time panjang**
Proses yang membutuhkan lebih dari 15 menit — batch processing besar, training ML model, rendering video.

**3. Butuh kontrol penuh atas environment**
Custom OS configuration, spesifik kernel tuning, GPU computing, atau software yang butuh instalasi khusus.

**4. Stateful application**
Aplikasi yang menyimpan state di memory lokal — database server, in-memory cache, WebSocket server.

**5. Biaya lebih hemat di high traffic konstan**
Jika kamu punya jutaan request per jam secara konsisten, EC2 (apalagi Reserved Instance) biasanya lebih murah daripada Lambda.

### Pilih Lambda Jika:

**1. Event-driven workload**
File di-upload → proses. Pesan masuk ke queue → kirim notifikasi. Database berubah → sync data.

**2. Traffic yang tidak terprediksi atau sporadis**
API yang kadang 0 request, kadang 10.000 request. Cron jobs yang berjalan sekali sehari selama 30 detik.

**3. Microservices kecil**
Function yang melakukan satu tugas spesifik: resize gambar, validate input, send email, generate PDF.

**4. Ingin zero operational overhead**
Tidak mau repot dengan patching, monitoring, atau server management.

**5. Budget terbatas dan trafik rendah**
Lambda gratis untuk 1 juta request pertama per bulan. Cocok untuk side project atau MVP.

### Perbandingan Biaya: Contoh Nyata

**Skenario: API yang menerima 1 juta request per bulan, setiap request 200ms, 128 MB memory**

Lambda:
- Request: 1M x $0.0000002 = $0.20
- Duration: 1M x 200ms x 128MB = 25.600 GB-seconds x $0.0000166667 = $0.43
- **Total: ~$0.63/bulan** (bahkan lebih murah karena 1M request pertama gratis!)

EC2 (t3.micro, on-demand):
- 24/7 running: 730 jam x $0.0104 = **$7.59/bulan**
- Plus EBS storage: ~$0.80/bulan
- **Total: ~$8.39/bulan**

Untuk 1 juta request/bulan, Lambda **13x lebih murah** dari EC2. Tapi saat request naik ke 100 juta/bulan, perhitungan berubah dan EC2 bisa lebih hemat.`,
            keyTakeaway: "EC2 untuk workload 24/7, long-running, stateful, dan high-constant-traffic. Lambda untuk event-driven, sporadis, microservices, dan budget rendah.",
          },
          {
            type: "lesson",
            title: "Amazon Aurora: RDBMS Skala Enterprise",
            body: `Selain menggunakan engine standar MySQL dan PostgreSQL di RDS, AWS juga memiliki database engine buatan mereka sendiri: **Amazon Aurora**.

Aurora adalah database relational yang kompatibel penuh dengan MySQL dan PostgreSQL, namun memiliki arsitektur storage terdistribusi.

**Kelebihan Aurora:**
- **Performa Tinggi**: 5x lebih cepat dari MySQL standar, 3x lebih cepat dari PostgreSQL standar.
- **Auto-Scaling Storage**: Storage Aurora akan membesar otomatis seiring pertumbuhan datamu, hingga 128TB. Kamu tidak perlu memprediksi dan mem-provisioning storage di awal.
- **Replikasi Super Cepat**: Memiliki arsitektur storage yang terpisah dari komputasi, sehingga membuat Read Replica hanya memakan waktu milidetik.
- **Aurora Serverless**: Varian Aurora yang dapat mati saat tidak ada request dan menyala instan saat ada query masuk. Cocok untuk environment testing atau aplikasi yang tidak stabil traffic-nya.`,
            keyTakeaway: "Amazon Aurora adalah opsi premium di RDS untuk MySQL/PostgreSQL yang menawarkan performa level enterprise, storage auto-scaling, dan fitur Serverless.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon Aurora", url: "https://aws.amazon.com/rds/aurora/" }
            ]
          },
          {
            type: "lesson",
            title: "Amazon ElastiCache: In-Memory Data Store",
            body: `Saat aplikasimu (misalnya toko online) memiliki jutaan traffic, query ke database (RDS) akan memakan waktu dan membuat server CPU RDS memuncak tinggi 100%.

Solusinya adalah melakukan **Caching** untuk data yang sering diakses (seperti halaman produk atau session pengguna). Di AWS, layanan caching terkelola adalah **Amazon ElastiCache**.

ElastiCache mendukung dua engine open-source terpopuler:
1. **Redis**: In-memory data store sangat cepat yang mensupport tipe data kompleks (Lists, Sets, Hashes) dan persistensi ke disk.
2. **Memcached**: Sistem caching object memori terdistribusi murni. Lebih simpel, digunakan murni sebagai cache.

**Cara Kerja:**
1. User me-request halaman produk.
2. Aplikasi mengecek ElastiCache (Redis).
3. Jika ada (Cache Hit), kembalikan data dalam <1 milidetik.
4. Jika tidak ada (Cache Miss), query ke RDS (memakan waktu 50ms), lalu simpan hasilnya ke Redis, kemudian kembalikan ke user.`,
            keyTakeaway: "ElastiCache (Redis/Memcached) digunakan untuk meningkatkan performa aplikasi dengan menyimpan data yang sering diakses ke dalam memori berkecepatan tinggi.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon ElastiCache", url: "https://aws.amazon.com/elasticache/" }
            ]
          },
          {
            type: "lesson",
            title: "S3 Object Lock & Versioning",
            body: `Amazon S3 sangat populer untuk menyimpan file, namun bagaimana jika terjadi insiden human error (developer salah menghapus file) atau serangan ransomware?

Dua fitur terpenting S3 untuk proteksi data:

### 1. S3 Versioning
Jika fitur ini diaktifkan, setiap kali ada orang me-replace (menimpa) file "dokumen.pdf" dengan versi baru, S3 tidak akan menghapus versi lama. S3 akan menyimpan kedua versi tersebut. Jika ternyata versi baru corrupt, kamu bisa dengan mudah me-restore versi sebelumnya.

### 2. S3 Object Lock (WORM)
Fitur *Write-Once-Read-Many (WORM)*. S3 Object Lock bisa memblokir file agar **TIDAK BISA** dihapus atau diubah oleh siapapun, *bahkan oleh root account AWS sekalipun*, untuk jangka waktu tertentu (misalnya selama 5 tahun).
Sangat penting untuk kepatuhan regulasi (seperti data perbankan) dan mencegah data dari kehancuran akibat hacker.`,
            keyTakeaway: "Gunakan S3 Versioning untuk melindungi file dari modifikasi/penghapusan tidak sengaja. Gunakan Object Lock untuk memastikan file tidak bisa dihapus oleh siapapun.",
            sources: [
              { type: "DOCUMENTATION", title: "Protecting Data in S3", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html" }
            ]
          },
          {
            type: "lesson",
            title: "Amazon ECS: Container Orchestration di AWS",
            body: `**Amazon Elastic Container Service (ECS)** adalah layanan orkestrasi container terkelola yang memungkinkanmu menjalankan aplikasi Docker di AWS tanpa perlu mengelola server cluster Kubernetes sendiri.

### ECS vs EC2 vs Lambda

ECS mengisi celah antara EC2 dan Lambda:

- **EC2**: Kamu kelola server virtual sendiri — fleksibel tapi banyak pekerjaan operasional.
- **Lambda**: Kamu upload kode, AWS kelola sisanya — sederhana tapi ada batasan (15 menit timeout, package size limit).
- **ECS**: Kamu tentukan container Docker (image, CPU, RAM), AWS menjalankannya — lebih fleksibel dari Lambda tanpa repot mengelola server seperti EC2.

### Dua Mode Launch ECS

**ECS dengan Fargate (Serverless):**
Kamu tinggal tentukan image Docker, CPU (misal 0.5 vCPU), dan RAM (misal 2 GB). AWS Fargate menjalankan container tanpa kamu harus menyentuh server. Kamu tidak perlu memilih instance type atau mengelola cluster. Ini yang paling populer dan recommended untuk kebanyakan use case.

**ECS dengan EC2 (Kontrol Penuh):**
Kamu mengelola cluster EC2 instances tempat container berjalan. Kamu bisa optimasi biaya dengan Reserved Instances atau Spot Instances. Cocok untuk workload besar yang berjalan 24/7 dan butuh kontrol lebih atas resource.

### Use Cases ECS

1. **Microservices** — deploy 10+ container yang saling berkomunikasi, masing-masing dengan resource terisolasi
2. **Batch Processing** — jalankan job processing dalam container, matikan setelah selesai (biaya efisien)
3. **Web Application** — deploy Next.js, Django, atau Rails dalam container dengan ALB di depan
4. **CI/CD Pipeline** — jalankan build dan test dalam container yang reproducible

### ECS vs EKS (Kubernetes)

ECS adalah solusi container AWS native — lebih sederhana, lebih terintegrasi dengan layanan AWS lain (ALB, CloudWatch, IAM). EKS adalah managed Kubernetes — cocok jika kamu sudah punya investasi di ekosistem Kubernetes atau butuh portabilitas antar cloud. Untuk pemula, ECS+Fargate adalah pilihan paling mudah.`,
            keyTakeaway: "ECS adalah container orchestration terkelola — Fargate (serverless) untuk kemudahan, EC2 mode untuk kontrol lebih. Cocok untuk deploy microservices, web apps, dan batch processing.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon ECS — AWS Docs", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html" },
              { type: "YOUTUBE", title: "AWS — ECS Fargate Tutorial for Beginners", url: "https://www.youtube.com/watch?v=9BCP7k7sZqM" },
            ],
          },
          {
            type: "lesson",
            title: "AWS Batch: Komputasi Batch untuk Skala Besar",
            body: `Beberapa workload tidak berjalan terus-menerus — mereka dijalankan secara periodik atau berdasarkan antrian. Contoh: merender 10.000 video, memproses file log harian, menjalankan simulasi ilmiah. Untuk workload seperti ini, **AWS Batch** adalah solusi yang tepat.

### Apa Itu AWS Batch?

AWS Batch adalah layanan komputasi batch yang mengatur dan menjalankan ribuan job komputasi secara paralel. Kamu mendefinisikan job (script atau container), AWS Batch mengurus provisioning resource, scheduling, dan retry jika gagal.

### Cara Kerja AWS Batch

1. **Buat Job Definition** — definisikan container atau script yang akan dijalankan (mirip Dockerfile: image, command, environment variables, resource requirements)
2. **Buat Job Queue** — antrian tempat job dikirim. Kamu bisa punya queue prioritas berbeda (misalnya: High Priority Queue, Normal Queue)
3. **Buat Compute Environment** — tentukan resource komputasi (EC2 on-demand, Spot, atau Fargate). AWS Batch otomatis provision dan terminate instance sesuai jumlah job
4. **Submit Job** — kirim job ke queue, AWS Batch menjalankannya di compute environment yang tersedia

### Keunggulan AWS Batch

**Fully Managed:** Kamu tidak perlu mengelola cluster batch server sendiri. AWS Batch otomatis scale up/down resource berdasarkan jumlah job di queue.

**Spot Instance Integration:** AWS Batch bisa menggunakan Spot Instances yang diskonnya hingga 90% untuk job yang fault-tolerant. Jika Spot instance direbut, job di-retry secara otomatis.

**Cost Optimization:** Tidak ada resource idle — saat tidak ada job, tidak ada instance yang berjalan (dan tidak ada biaya). Bandingkan dengan cluster batch tradisional yang harus selalu running.

### Use Cases AWS Batch

1. **Rendering** — render frame 3D animasi, setiap frame adalah job independen yang bisa diproses paralel
2. **Genomics** — memproses data DNA sequencing, setiap batch data diproses independen
3. **Financial Modeling** — menjalankan simulasi Monte Carlo untuk risk analysis ribuan skenario
4. **Image/Video Processing** — transcode 10.000 video dari format A ke format B secara paralel

### AWS Batch vs Lambda

Jika job-mu butuh waktu lebih dari 15 menit, butuh GPU, atau membutuhkan banyak memory (>10 GB), Lambda tidak akan cukup. AWS Batch (dengan EC2) bisa menangani job yang berlangsung berjam-jam dengan resource besar.`,
            keyTakeaway: "AWS Batch mengelola komputasi batch — auto-scale resource, integrasi Spot Instances (diskon 90%), dan tidak ada biaya idle. Cocok untuk rendering, data processing, dan simulasi skala besar.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Batch — AWS Docs", url: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html" },
            ],
          },
          {
            type: "summary",
            title: "Rangkuman: Komputasi Cloud dengan EC2 & Lambda",
            body: `Modul ini membekalimu dengan pemahaman mendalam tentang dua paradigma komputasi utama di AWS.

### Amazon EC2
- Server virtual (instance) dengan kontrol penuh
- Komponen: AMI, Instance Type, EBS, Security Group, Key Pair
- Instance families: T (burstable), M (general), C (compute), R (memory), G/P (GPU)
- Auto Scaling Group + ELB = skalabilitas otomatis + distribusi traffic
- **Cocok untuk**: workload 24/7, long-running, stateful, high constant traffic

### AWS Lambda
- Serverless computing — upload function, jalankan saat ada event
- Bayar per request + durasi eksekusi (per millisecond)
- Trigger: S3, API Gateway, SQS, EventBridge, DynamoDB Streams, dll
- Auto-scale dari 0 ke ribuan concurrent executions
- Batasan: 15 min timeout, stateless, cold start
- **Cocok untuk**: event-driven, microservices, sporadis, budget terbatas

### API Gateway + Lambda
- REST API tanpa server — auto-scale, pay-per-request
- Sempurna untuk MVP, microservices, dan backend sederhana

### Arsitektur Hybrid
- Kebanyakan aplikasi modern menggabungkan EC2 dan Lambda
- EC2 untuk core workload, Lambda untuk supporting tasks

### Di Modul Selanjutnya
Kamu akan belajar menyimpan data di AWS: **S3** untuk file/objek, **RDS** untuk database relasional, dan **DynamoDB** untuk database NoSQL. Ini melengkapi pilar ketiga dari arsitektur cloud: **storage dan database**.`,
            keyTakeaway: "EC2 = kontrol penuh atas server virtual. Lambda = serverless event-driven. Arsitektur modern menggunakan hybrid keduanya sesuai karakteristik workload.",
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang EC2 & Lambda",
            body: "Pastikan kamu memahami perbedaan EC2 dan Lambda, kapan menggunakan masing-masing, serta konsep Auto Scaling, ELB, dan Security Groups.",
            quizBank: [
              {
                id: "q1",
                question: "Kapan kamu sebaiknya memilih AWS Lambda daripada EC2?",
                options: [
                  { id: "a", text: "Saat aplikasi butuh server yang berjalan 24/7 tanpa henti" },
                  { id: "b", text: "Saat workload bersifat event-driven, durasi singkat, dan traffic tidak bisa diprediksi" },
                  { id: "c", text: "Saat butuh kontrol penuh atas OS dan konfigurasi kernel" },
                  { id: "d", text: "Saat aplikasi menyimpan state di memory lokal" },
                ],
                correctAnswer: "b",
                explanation: "Lambda unggul untuk workload event-driven (S3 upload, API call, SQS message), durasi pendek (<15 menit), dan traffic yang fluktuatif. Lambda auto-scale dari 0 ke ribuan concurrent executions dan bayar per request — sangat hemat untuk traffic sporadis.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Apa fungsi Security Group di AWS?",
                options: [
                  { id: "a", text: "Mendistribusikan traffic ke beberapa EC2 instance" },
                  { id: "b", text: "Firewall virtual yang mengontrol traffic inbound dan outbound di level instance" },
                  { id: "c", text: "Mengatur scaling otomatis EC2 instance" },
                  { id: "d", text: "Menyediakan IP address statis untuk EC2 instance" },
                ],
                correctAnswer: "b",
                explanation: "Security Group adalah firewall stateful yang bekerja di level instance. Default-nya: semua inbound ditolak, semua outbound diizinkan. Kamu menambahkan rule untuk mengizinkan traffic spesifik (misalnya HTTP port 80 dari 0.0.0.0/0). Bersifat stateful — response otomatis diizinkan tanpa rule outbound terpisah.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question: "Apa peran Elastic Load Balancer (ELB) dalam arsitektur Auto Scaling?",
                options: [
                  { id: "a", text: "Menggantikan fungsi DNS Route 53" },
                  { id: "b", text: "Mendistribusikan traffic masuk secara merata ke semua EC2 instance di Auto Scaling Group" },
                  { id: "c", text: "Mengurangi biaya dengan mematikan instance yang tidak terpakai" },
                  { id: "d", text: "Menyediakan penyimpanan bersama untuk semua EC2 instance" },
                ],
                correctAnswer: "b",
                explanation: "ELB (terutama ALB) mendistribusikan traffic HTTP/HTTPS ke target group (EC2 instances) di dalam Auto Scaling Group. ELB juga melakukan health check — jika instance tidak sehat, ASG akan menggantinya. Kombinasi ASG + ELB = arsitektur yang scalable, self-healing, dan highly available.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question: "Instance type mana yang PALING COCOK untuk server web general purpose dengan trafik menengah?",
                options: [
                  { id: "a", text: "t3.micro — karena termasuk Free Tier" },
                  { id: "b", text: "m5.large — general purpose dengan keseimbangan compute dan memory" },
                  { id: "c", text: "c5.2xlarge — compute optimized" },
                  { id: "d", text: "r5.large — memory optimized" },
                ],
                correctAnswer: "b",
                explanation: "M-series (General Purpose) seperti m5.large memberikan keseimbangan antara CPU, memory, dan network — cocok untuk web server dan application server general. t3.micro cukup untuk development/learning, c5 untuk compute-heavy, r5 untuk memory-heavy workload. Pilih family yang sesuai dengan karakteristik workload.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question: "Apa yang terjadi jika sebuah Lambda function membutuhkan waktu eksekusi lebih dari 15 menit?",
                options: [
                  { id: "a", text: "Lambda otomatis memperpanjang timeout hingga 30 menit" },
                  { id: "b", text: "Function akan timeout dan gagal — Lambda memiliki batas maksimal 15 menit" },
                  { id: "c", text: "Lambda membagi function menjadi beberapa bagian yang dieksekusi paralel" },
                  { id: "d", text: "AWS mengirim notifikasi untuk meminta konfirmasi perpanjangan" },
                ],
                correctAnswer: "b",
                explanation: "Lambda memiliki batas timeout maksimal 900 detik (15 menit). Jika function butuh waktu lebih lama, Lambda bukan pilihan yang tepat. Alternatif: gunakan EC2, ECS (container), atau Step Functions untuk workflow yang lebih panjang. Ini adalah batasan fundamental arsitektur serverless.",
                difficulty: "hard",
              },
            ],
          },
        ],
      },

      // ============================================================
      // MODUL 3: Storage & Database — S3, RDS, DynamoDB
      // ============================================================
      {
        title: "Penyimpanan & Database: S3, RDS & DynamoDB",
        slug: "storage-database-s3-rds-dynamodb",
        xpReward: 85,
        slides: [
          {
            type: "lesson",
            title: "Menyimpan Data di Cloud: 3 Pendekatan Berbeda",
            body: `Setiap aplikasi membutuhkan tempat untuk menyimpan data — foto pengguna, data transaksi, log aktivitas, file dokumen. Di AWS, ada tiga layanan penyimpanan utama yang masing-masing dirancang untuk kebutuhan berbeda.

### 3 Layanan Storage & Database Utama

**1. Amazon S3 (Simple Storage Service)** — Object storage. Menyimpan file (gambar, video, dokumen, backup) sebagai objek di dalam "bucket". Praktis tidak ada batasan kapasitas — kamu bisa menyimpan dari 1 byte hingga exabyte data. Ini layanan storage paling populer di AWS.

**2. Amazon RDS (Relational Database Service)** — Database relasional terkelola. Menjalankan database SQL tradisional (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server) tanpa perlu install atau maintain database engine sendiri. AWS mengurus patching, backup, dan high availability.

**3. Amazon DynamoDB** — Database NoSQL fully managed. Database key-value dan dokumen dengan performa single-digit millisecond di skala apapun. Tidak perlu provisioning server — benar-benar serverless.

### Analogi: Gudang, Lemari Arsip, dan Sticky Notes

- **S3 = Gudang besar.** Kamu bisa menyimpan apa saja di sini — kardus (file), perabotan (data backup), arsip lama. Mudah diakses tapi tidak terstruktur — kamu cari barang berdasarkan label di kardus.

- **RDS = Lemari arsip terorganisir.** Data tersusun rapi dalam folder yang saling terhubung (tabel dengan relasi). Cocok untuk data yang butuh integritas dan konsistensi tinggi — transaksi keuangan, data pelanggan, inventory.

- **DynamoDB = Sticky notes super cepat.** Setiap data adalah pasangan key-value yang bisa diambil dalam hitungan milidetik. Sangat cepat tapi kurang cocok untuk query kompleks yang melibatkan banyak tabel.

### Kapan Menggunakan Masing-masing?

Ini bukan pilihan "salah satu" — kebanyakan aplikasi menggunakan kombinasi ketiganya. Contoh e-commerce:
- **S3**: menyimpan foto produk, invoice PDF, dan backup database
- **RDS**: menyimpan data pelanggan, pesanan, dan inventory (butuh JOIN antar tabel)
- **DynamoDB**: menyimpan session data, shopping cart, dan real-time analytics (butuh kecepatan tinggi)

Di modul ini, kamu akan mempelajari ketiga layanan secara mendalam — fitur, cara kerja, pricing, dan best practices.`,
            keyTakeaway: "S3 = object storage (file/media), RDS = database relasional terkelola (data terstruktur), DynamoDB = NoSQL serverless (key-value ultra cepat). Kebanyakan app pakai kombinasi ketiganya.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon S3 — AWS Docs", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" },
              { type: "DOCUMENTATION", title: "Amazon RDS — AWS Docs", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" },
              { type: "DOCUMENTATION", title: "Amazon DynamoDB — AWS Docs", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" },
              { type: "YOUTUBE", title: "AWS — Amazon S3 Tutorial For Beginners", url: "https://www.youtube.com/watch?v=tfU0JEZjcsg" },
            ],
          },
          {
            type: "lesson",
            title: "Amazon S3: Object Storage Tak Terbatas",
            body: `**Amazon S3 (Simple Storage Service)** adalah layanan object storage AWS yang menyimpan data sebagai objek di dalam container yang disebut **bucket**. S3 adalah salah satu layanan AWS pertama (diluncurkan 2006) dan tetap menjadi yang paling banyak digunakan — menyimpan lebih dari 100 triliun objek pada tahun 2023.

### Konsep Dasar S3

**Bucket** — container tingkat atas untuk menyimpan objek. Nama bucket harus **unik secara global** di seluruh AWS (tidak boleh ada dua bucket dengan nama yang sama di dunia). Bucket dibuat di region tertentu.

**Object** — file yang disimpan di bucket. Setiap objek terdiri dari: data (file itu sendiri, maksimal 5 TB per objek), key (nama/path objek, misalnya \`images/produk/sepatu-01.jpg\`), metadata (informasi tambahan: content type, custom tags), dan version ID (jika versioning diaktifkan).

**Prefix** — S3 tidak punya folder sungguhan, tapi menggunakan prefix (bagian awal dari key) untuk mensimulasikan struktur folder. \`images/produk/sepatu-01.jpg\` → prefix-nya adalah \`images/produk/\`.

### Fitur Penting S3

**1. Durability & Availability**
S3 Standard menjamin durability **99.999999999%** (11 nines!) — artinya jika kamu menyimpan 10 juta objek, secara statistik kamu bisa kehilangan 1 objek setiap 10.000 tahun. Data otomatis direplikasi ke minimal 3 Availability Zone dalam satu region.

**2. Versioning**
Saat diaktifkan, S3 menyimpan setiap versi objek. Jika kamu mengupload file dengan key yang sama, versi lama tidak dihapus — tersimpan sebagai versi sebelumnya. Sangat berguna untuk backup dan protection terhadap penghapusan tidak sengaja.

**3. Lifecycle Policies**
Otomasi perpindahan objek antar storage class berdasarkan usia. Contoh: "Setelah 30 hari, pindahkan ke S3 Infrequent Access. Setelah 365 hari, pindahkan ke Glacier. Setelah 7 tahun, hapus."

**4. Server-Side Encryption**
S3 bisa mengenkripsi semua objek secara otomatis menggunakan AWS-managed keys (SSE-S3), customer-managed keys (SSE-KMS), atau customer-provided keys (SSE-C).

**5. Pre-signed URLs**
Generate URL sementara yang memberikan akses terbatas waktu ke objek privat. Contoh: "Berikan URL untuk download invoice.pdf yang valid selama 1 jam." Setelah 1 jam, URL tersebut expired dan tidak bisa digunakan lagi.`,
            keyTakeaway: "S3 menyimpan objek di bucket. Durability 99.999999999%, versioning untuk proteksi, lifecycle policies untuk optimasi biaya, dan pre-signed URLs untuk akses sementara.",
          },
          {
            type: "lesson",
            title: "S3 Storage Classes: Optimasi Biaya Penyimpanan",
            body: `S3 menawarkan beberapa **storage class** (kelas penyimpanan) dengan trade-off antara biaya, kecepatan akses, dan durability. Memilih storage class yang tepat bisa menghemat biaya penyimpanan hingga 90%.

### S3 Standard
- **Use case**: Data yang sering diakses — website assets, gambar produk, file aplikasi
- **Durability**: 99.999999999% (11 nines)
- **Availability**: 99.99%
- **Biaya storage**: ~$0.023 per GB/bulan (us-east-1)
- **Biaya retrieval**: Gratis

### S3 Intelligent-Tiering
- **Use case**: Data dengan pola akses yang tidak bisa diprediksi
- **Cara kerja**: Otomatis memindahkan objek antar tier berdasarkan pola akses. Objek yang tidak diakses 30 hari dipindah ke tier infrequent. Yang tidak diakses 90 hari ke archive tier.
- **Biaya**: Sama dengan Standard untuk frequent access, lebih murah untuk infrequent. Ada biaya monitoring kecil per objek.
- **Keuntungan**: Set and forget — tidak perlu mengelola lifecycle rules sendiri

### S3 Standard-IA (Infrequent Access)
- **Use case**: Data yang jarang diakses tapi butuh respons cepat saat dibutuhkan — backup, disaster recovery
- **Biaya storage**: ~$0.0125 per GB/bulan (46% lebih murah dari Standard)
- **Biaya retrieval**: Ada biaya per GB saat mengambil data
- **Minimum storage duration**: 30 hari (dikenakan biaya minimum 30 hari meski dihapus lebih cepat)

### S3 One Zone-IA
- **Use case**: Data infrequent access yang bisa di-recreate jika hilang (thumbnail yang bisa digenerate ulang)
- **Biaya**: 20% lebih murah dari Standard-IA
- **Trade-off**: Data hanya disimpan di 1 Availability Zone (bukan 3). Risiko kehilangan data jika AZ mengalami kegagalan.

### S3 Glacier Instant Retrieval
- **Use case**: Archive data yang sangat jarang diakses (1x per kuartal) tapi butuh akses instan saat dibutuhkan
- **Biaya storage**: ~$0.004 per GB/bulan (82% lebih murah dari Standard)

### S3 Glacier Flexible Retrieval
- **Use case**: Long-term archive — log lama, data compliance yang harus disimpan bertahun-tahun
- **Biaya storage**: ~$0.0036 per GB/bulan
- **Retrieval time**: 1-5 menit (Expedited), 3-5 jam (Standard), 5-12 jam (Bulk)

### S3 Glacier Deep Archive
- **Use case**: Archive jangka sangat panjang (7-10 tahun, compliance regulasi)
- **Biaya storage**: ~$0.00099 per GB/bulan (paling murah!)
- **Retrieval time**: 12-48 jam
- **Cocok untuk**: Data yang disimpan karena hukum/regulasi tapi hampir tidak pernah diakses

### Tips Optimasi Biaya S3
Gunakan **Lifecycle Policies** untuk otomasi perpindahan storage class. Contoh: foto produk yang berusia > 6 bulan otomatis pindah ke IA, backup database > 1 tahun ke Glacier.`,
            keyTakeaway: "S3 punya 7 storage class dari Standard (mahal, cepat) hingga Glacier Deep Archive (sangat murah, lambat). Gunakan Lifecycle Policies untuk optimasi biaya otomatis.",
          },
          {
            type: "lesson",
            title: "Amazon RDS: Database Relasional Terkelola",
            body: `**Amazon RDS (Relational Database Service)** memungkinkanmu menjalankan database relasional di cloud tanpa beban mengelola hardware, patching, backup, dan high availability. Kamu fokus pada schema dan query — AWS mengurus sisanya.

### Engine Database yang Didukung

RDS mendukung 6 engine database populer:
1. **PostgreSQL** — database open-source paling canggih, populer di startup modern
2. **MySQL** — database open-source paling banyak digunakan di dunia
3. **MariaDB** — fork dari MySQL yang dikembangkan oleh pembuat asli MySQL
4. **Oracle** — database enterprise, populer di korporasi besar
5. **SQL Server** — database Microsoft, populer di ekosistem .NET
6. **Amazon Aurora** — database buatan AWS yang kompatibel dengan MySQL dan PostgreSQL, 3-5x lebih cepat dari MySQL standard

### Apa yang RDS Kelola untuk Kamu?

**Automated Backups**: RDS secara otomatis membuat backup database harian dan menyimpan transaction log setiap 5 menit. Kamu bisa melakukan **point-in-time recovery** — mengembalikan database ke detik tertentu dalam 35 hari terakhir.

**Patching**: RDS menerapkan patch keamanan dan minor version update secara otomatis di maintenance window yang kamu tentukan (misalnya Minggu dini hari).

**Multi-AZ Deployment**: Untuk high availability, RDS bisa membuat replica di AZ yang berbeda. Jika AZ utama gagal, RDS otomatis melakukan **failover** ke replica — biasanya dalam 60-120 detik.

**Read Replicas**: Untuk workload read-heavy (banyak query SELECT), kamu bisa membuat hingga 5 read replica yang mendistribusikan beban baca. Aplikasimu mengarahkan query SELECT ke read replica dan query INSERT/UPDATE/DELETE ke primary instance.

### Contoh: Membuat RDS PostgreSQL

Di Console:
1. Buka RDS → Create Database
2. Engine: PostgreSQL 15
3. Template: Free Tier (db.t3.micro, 20 GB storage)
4. DB identifier: \`clarise-db\`
5. Master username/password
6. VPC: default VPC
7. Public access: No (JANGAN buat database publik!)
8. Create

Setelah 5-10 menit, database siap digunakan. Kamu mendapat **endpoint** (hostname) yang bisa dipakai untuk koneksi.

### RDS vs Self-managed Database di EC2

Mengapa tidak install PostgreSQL langsung di EC2? Bisa saja, tapi kamu harus mengurus sendiri: backup, patching, monitoring, replication, failover, dan security updates. RDS mengotomasi semua itu. Trade-off-nya: RDS sedikit lebih mahal dan kamu tidak punya akses SSH ke server database.`,
            keyTakeaway: "RDS mengelola database relasional (PostgreSQL, MySQL, Aurora, dll) dengan automated backup, patching, Multi-AZ failover, dan read replicas — kamu fokus pada data dan query.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon RDS Features — AWS Docs", url: "https://aws.amazon.com/rds/features/" },
              { type: "YOUTUBE", title: "Amazon Web Services — RDS Tutorial", url: "https://www.youtube.com/watch?v=a9__D53WsUs" },
            ],
          },
          {
            type: "lesson",
            title: "Amazon DynamoDB: Database NoSQL Serverless",
            body: `**Amazon DynamoDB** adalah database NoSQL fully managed yang memberikan performa single-digit millisecond di skala apapun. Ini adalah database "serverless" sejati — tidak ada server yang perlu di-provisioning, di-patching, atau di-manage. Kamu cukup buat tabel dan mulai baca/tulis data.

### Key Concepts DynamoDB

**Table** — kumpulan data (mirip tabel di database relasional, tapi tanpa schema yang kaku).

**Item** — satu record/baris di tabel (mirip row di SQL). Setiap item bisa punya atribut yang berbeda-beda (schema-less).

**Primary Key** — identifier unik untuk setiap item. Ada dua jenis:
- **Partition Key** — satu atribut yang digunakan sebagai key (misalnya userId)
- **Composite Key** — partition key + sort key (misalnya userId + timestamp)

**Atribut** — data field dalam item (mirip kolom, tapi tidak perlu didefinisikan di awal).

### Contoh Data di DynamoDB

\`\`\`json
// Tabel: UserSessions
{
  "userId": "user-123",          // Partition Key
  "sessionId": "sess-abc-456",   // Sort Key
  "loginTime": "2024-01-15T10:30:00Z",
  "device": "iPhone 15",
  "ipAddress": "103.155.200.45",
  "cartItems": [
    { "productId": "shoe-001", "qty": 2 },
    { "productId": "bag-003", "qty": 1 }
  ]
}
\`\`\`

Perhatikan: \`cartItems\` adalah array nested — DynamoDB mendukung tipe data kompleks (list, map, set) yang tidak umum di database relasional.

### Kapan Menggunakan DynamoDB vs RDS?

**Gunakan DynamoDB jika:**
- Butuh latensi sangat rendah (<10ms) di skala besar
- Data model sederhana (key-value atau document)
- Tidak butuh JOIN antar tabel
- Traffic sangat fluktuatif (DynamoDB auto-scale sempurna)
- Contoh: session store, shopping cart, gaming leaderboard, IoT data

**Gunakan RDS jika:**
- Data model kompleks dengan banyak relasi (JOIN)
- Butuh transaksi ACID yang kompleks (multi-table transactions)
- Tim sudah familiar dengan SQL
- Contoh: financial transactions, inventory, user management

### Pricing DynamoDB

DynamoDB punya dua capacity mode:
- **On-Demand** — bayar per request. Cocok untuk traffic yang tidak terprediksi. $1.25 per 1 juta write request, $0.25 per 1 juta read request.
- **Provisioned** — tentukan read/write capacity upfront. Lebih murah untuk traffic yang stabil dan terprediksi.

DynamoDB Free Tier (Always Free): 25 GB storage + 25 write capacity units + 25 read capacity units. Cukup untuk aplikasi kecil dan belajar.`,
            keyTakeaway: "DynamoDB = NoSQL serverless dengan latensi <10ms di skala apapun. Cocok untuk key-value data (session, cart, leaderboard). Gunakan RDS untuk data relasional yang butuh JOIN.",
          },
          {
            type: "lesson",
            title: "S3 Static Website Hosting: Website Tanpa Server",
            body: `Salah satu fitur S3 yang sangat berguna adalah kemampuan untuk meng-hosting website statis langsung dari bucket. Ini sempurna untuk landing page, dokumentasi, portfolio, atau single-page application (SPA) yang tidak memerlukan server backend.

### Cara Kerja S3 Static Hosting

S3 bisa dikonfigurasi untuk melayani file HTML, CSS, JavaScript, dan gambar sebagai website. Kamu cukup upload file-file website ke bucket, aktifkan static hosting, dan S3 akan melayani halaman web langsung ke browser pengunjung.

### Langkah Setup

**1. Buat Bucket dengan nama domain**
Buat bucket dengan nama yang sama dengan domain (misalnya \`www.sepatuku.com\`).

**2. Upload file website**
Upload \`index.html\`, \`style.css\`, \`app.js\`, dan semua asset ke bucket.

**3. Aktifkan Static Website Hosting**
Di bucket Properties → Static website hosting → Enable. Tentukan index document (\`index.html\`) dan error document (\`404.html\`).

**4. Set Bucket Policy untuk Public Access**
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::www.sepatuku.com/*"
    }
  ]
}
\`\`\`

**5. (Opsional tapi sangat disarankan) Tambahkan CloudFront**
Untuk HTTPS, caching global, dan performa optimal, pasang CloudFront CDN di depan S3 bucket. CloudFront juga mendukung custom domain dengan SSL certificate gratis dari ACM (AWS Certificate Manager).

### Keuntungan S3 Static Hosting

- **Sangat murah** — hosting website statis di S3 hanya beberapa sen per bulan
- **Scalable** — S3 bisa menangani jutaan request tanpa konfigurasi tambahan
- **Durable** — 99.999999999% durability
- **Tidak ada server** — tidak perlu maintain web server (Nginx, Apache)
- **Dengan CloudFront** — website jadi cepat di seluruh dunia

### Batasan

- **Hanya static content** — tidak bisa menjalankan server-side code (PHP, Node.js, Python)
- **Tidak ada database** — semua data harus sudah ada di file atau diambil via API (fetch dari Lambda/API Gateway)
- **Custom domain butuh Route 53 atau DNS external**

Untuk website modern yang dibangun dengan framework seperti Next.js (static export), React, Vue, atau Astro, S3 + CloudFront adalah solusi hosting yang sangat cost-effective dan performant.`,
            keyTakeaway: "S3 bisa hosting website statis (HTML/CSS/JS) dengan biaya sangat murah. Kombinasikan dengan CloudFront untuk HTTPS, CDN global, dan performa optimal.",
          },
          // CHALLENGE
          {
            type: "challenge",
            title: "Challenge: Merancang Strategi Storage untuk Aplikasi Media Sosial",
            body: `Kamu diminta merancang strategi penyimpanan data untuk aplikasi media sosial "FotoKu" yang memungkinkan pengguna mengupload foto, menambahkan caption, dan berinteraksi (like, komentar). Aplikasi ini punya 100.000 pengguna aktif bulanan dan menerima rata-rata 5.000 upload foto per hari. Setiap foto berukuran rata-rata 3 MB. Caption, komentar, dan data profil pengguna harus bisa di-query dengan cepat. Foto yang berusia lebih dari 2 tahun jarang diakses.`,
            challenge: {
              instruction: "Tentukan layanan AWS mana (S3, RDS, DynamoDB) yang paling tepat untuk menyimpan: (1) file foto pengguna, (2) data profil pengguna dan relasi follow, (3) data feed/timeline (siapa posting apa), dan (4) foto lama yang jarang diakses. Jelaskan alasan untuk setiap keputusan dan sebutkan fitur AWS spesifik yang akan kamu gunakan (misalnya storage class, lifecycle policy, dll).",
              inputType: "text",
              inputPlaceholder: "Contoh:\n\n1. File foto → S3 Standard\n   Alasan: ...\n   Fitur: pre-signed URL untuk upload\n\n2. Data profil → RDS PostgreSQL\n   Alasan: ...",
              starterCode: "",
              expectedConcepts: [
                "Foto di S3 Standard dengan lifecycle policy untuk pindah ke S3-IA atau Glacier setelah 2 tahun",
                "Data profil dan relasi follow di RDS karena butuh JOIN dan relasi antar tabel",
                "Feed/timeline di DynamoDB karena butuh read yang sangat cepat dan data model key-value (userId + timestamp)",
                "Pre-signed URL untuk upload foto langsung ke S3 dari client",
              ],
              evaluationCriteria: "Evaluasi: (1) Foto di S3 — benar. Apakah menyebut lifecycle policy untuk foto lama? (2) Profil+Follow di RDS — benar karena butuh relasi/JOIN. Apakah menyebut engine (PostgreSQL/MySQL)? (3) Feed/timeline di DynamoDB — benar karena key-value, read-heavy, low latency. Apakah menyebut composite key (userId + timestamp)? (4) Apakah ada strategi untuk foto lama (lifecycle ke S3-IA/Glacier)? Jawaban 3/4 = baik. 4/4 = sangat baik.",
              hints: [
                "Foto = file besar yang perlu disimpan durably → layanan storage mana yang cocok?",
                "Relasi follow (user A follows user B) adalah relasi many-to-many — database model mana yang menangani ini dengan baik?",
                "Feed timeline butuh query: 'ambil 20 post terbaru dari user X' → ini pattern key-value dengan sort key timestamp",
              ],
              sampleAnswer: "1. Foto → S3 Standard. Pre-signed URL agar client upload langsung ke S3 (bypass server). Lambda trigger untuk resize ke 3 ukuran. Lifecycle policy: setelah 2 tahun pindah ke S3-IA (hemat 46%). 2. Profil+Follow → RDS PostgreSQL. Tabel Users, Follows (userId, followedId, createdAt). Butuh JOIN untuk 'tampilkan mutual friends' dan relasi many-to-many. 3. Feed/timeline → DynamoDB. Partition key: userId, sort key: timestamp. Query cepat: 'ambil 20 post terbaru dari user X'. On-demand capacity untuk handle spike. 4. Foto >2 tahun → S3 Lifecycle ke S3-IA lalu Glacier setelah 5 tahun.",
              followUpQuestion: "Jika FotoKu berkembang menjadi 10 juta pengguna, bagian mana dari arsitektur ini yang perlu di-scale pertama kali?",
            },
          },
          {
            type: "lesson",
            title: "Pembahasan Challenge: Arsitektur Storage FotoKu",
            body: `Mari kita bahas solusi optimal untuk strategi penyimpanan data aplikasi media sosial FotoKu.

### 1. File Foto → Amazon S3 Standard

**Mengapa S3?** Foto adalah file statis yang perlu disimpan dengan durability tinggi. S3 Standard menawarkan 99.999999999% durability dan bisa menyimpan file berukuran hingga 5 TB per objek.

**Fitur yang digunakan:**
- **Pre-signed URL**: Client (mobile app) mendapat URL dari backend untuk upload foto langsung ke S3. Ini menghindari bottleneck — foto tidak melewati server aplikasi, tapi langsung masuk ke S3.
- **Lambda trigger**: Saat foto baru masuk, Lambda otomatis membuat 3 versi (thumbnail, medium, full).
- **CloudFront CDN**: Distribusi foto ke edge location terdekat pengguna — foto load lebih cepat.

### 2. Data Profil & Relasi Follow → Amazon RDS (PostgreSQL)

**Mengapa RDS dan bukan DynamoDB?** Data profil punya relasi kompleks. Pertimbangkan: "Tampilkan teman yang juga di-follow oleh temanmu" (mutual friends). Query ini membutuhkan **JOIN** antar tabel Users dan Follows — ini adalah kekuatan utama database relasional.

**Schema contoh:**
\`\`\`
Users: id, username, displayName, bio, avatarUrl, createdAt
Follows: followerId, followedId, createdAt
Posts: id, userId, caption, s3Key, createdAt
Comments: id, postId, userId, text, createdAt
Likes: postId, userId, createdAt
\`\`\`

### 3. Feed/Timeline → Amazon DynamoDB

**Mengapa DynamoDB?** Feed adalah use case klasik DynamoDB:
- Query pattern sangat spesifik: "Ambil 20 post terbaru dari user X"
- **Partition key**: userId, **Sort key**: timestamp (descending)
- Read-heavy (user scroll feed jauh lebih sering daripada posting)
- Butuh latensi <10ms untuk pengalaman scrolling yang smooth

### 4. Foto Lama → S3 Lifecycle Policy

**Strategi tiering:**
- 0-2 tahun: S3 Standard (sering diakses)
- 2-5 tahun: S3 Standard-IA (jarang diakses tapi perlu respons cepat)
- 5+ tahun: S3 Glacier Instant Retrieval (sangat jarang diakses)

Lifecycle policy ini berjalan otomatis — tidak perlu intervensi manual. Penghematan bisa mencapai 60-80% untuk foto lama.

Arsitektur ini menunjukkan prinsip penting: **gunakan layanan yang tepat untuk jenis data yang tepat**. Tidak ada satu database yang sempurna untuk semua use case — kekuatan cloud adalah kemampuan mengkombinasikan layanan spesialis.`,
            keyTakeaway: "Gunakan layanan yang tepat untuk data yang tepat: S3 untuk file, RDS untuk data relasional, DynamoDB untuk data key-value. Lifecycle policies untuk optimasi biaya penyimpanan.",
          },
          {
            type: "lesson",
            title: "Amazon ElastiCache: Caching untuk Performa Maksimal",
            body: `Meskipun RDS dan DynamoDB sudah cepat, ada kalanya kamu butuh latensi yang lebih rendah lagi — sub-millisecond. Di sinilah **Amazon ElastiCache** berperan — layanan caching in-memory yang menyimpan data yang sering diakses di RAM untuk akses ultra-cepat.

### Apa Itu Caching?

Bayangkan kamu seorang barista di coffee shop. Setiap kali pelanggan memesan latte, kamu harus:
1. Ambil biji kopi dari gudang (database)
2. Giling, seduh, buat latte (query processing)
3. Sajikan ke pelanggan

Jika 80% pelanggan memesan latte, bukankah lebih efisien menyiapkan beberapa latte di meja depan (cache)? Pelanggan langsung dapat tanpa menunggu proses pembuatan. Ini adalah prinsip caching.

### 2 Engine ElastiCache

**Redis** — data structure store yang mendukung string, list, set, hash, sorted set, dan banyak tipe data lainnya. Mendukung persistensi, replication, dan clustering. Pilihan terbaik untuk kebanyakan use case.

**Memcached** — key-value cache yang lebih sederhana dan ringan. Cocok jika kamu hanya butuh caching sederhana tanpa fitur data structure yang kompleks.

### Use Cases ElastiCache

**1. Database Query Cache**
Hasil query yang sering diulang (misalnya "top 10 produk terlaris") disimpan di cache. Saat user request, cek cache dulu — jika ada (cache hit), kembalikan langsung. Jika tidak (cache miss), query ke database, simpan hasilnya di cache, lalu kembalikan.

**2. Session Store**
Data session user (login status, shopping cart) disimpan di Redis — sangat cepat dan bisa diakses dari semua instance EC2 di belakang load balancer.

**3. Leaderboard & Real-time Analytics**
Redis Sorted Set sangat cocok untuk leaderboard game — tambah skor, ambil top 100, semua dalam sub-millisecond.

**4. Rate Limiting**
Implementasi rate limiting (misalnya "max 100 request per menit per user") menggunakan Redis counter dengan TTL.

### Strategi Caching

**Cache-Aside (Lazy Loading):**
1. App cek cache → data ada? Return
2. Data tidak ada → query database
3. Simpan hasil ke cache dengan TTL (time-to-live)
4. Return data ke user

**Write-Through:**
1. App menulis ke database DAN cache secara bersamaan
2. Data di cache selalu up-to-date
3. Trade-off: setiap write jadi lebih lambat

**TTL (Time-To-Live):**
Setiap data di cache punya umur — misalnya 5 menit. Setelah expired, data dihapus otomatis dan request berikutnya akan query database lagi. TTL mencegah data stale (kadaluarsa) di cache.`,
            keyTakeaway: "ElastiCache (Redis/Memcached) menyimpan data di RAM untuk akses sub-millisecond. Gunakan untuk query cache, session store, leaderboard, dan rate limiting.",
          },
          {
            type: "lesson",
            title: "Best Practices Storage & Database di AWS",
            body: `Sebelum menutup modul ini, mari kita kompilasi best practices yang akan menghemat biayamu dan melindungi datamu di production.

### S3 Best Practices

**1. Jangan pernah buat bucket publik kecuali benar-benar diperlukan.** S3 bucket yang salah konfigurasi adalah penyebab kebocoran data nomor 1 di cloud. Gunakan AWS Config rule \`s3-bucket-public-read-prohibited\` untuk deteksi otomatis.

**2. Aktifkan versioning di bucket penting.** Ini melindungi dari penghapusan tidak sengaja dan memungkinkan rollback. Kombinasikan dengan MFA Delete untuk perlindungan ekstra — bahkan root user harus memasukkan MFA sebelum bisa menghapus versi objek.

**3. Enkripsi semua bucket.** Aktifkan default encryption (SSE-S3 minimal) agar semua objek baru otomatis terenkripsi. Ini gratis dan tidak ada alasan untuk tidak mengaktifkannya.

**4. Gunakan Lifecycle Policies.** Pindahkan data yang jarang diakses ke storage class yang lebih murah secara otomatis. Review dan optimasi secara berkala menggunakan S3 Storage Lens.

**5. Pre-signed URL untuk upload/download.** Jangan pernah memberikan akses langsung ke bucket dari client. Gunakan pre-signed URL dengan expiration time yang pendek.

### RDS Best Practices

**1. Aktifkan Multi-AZ untuk production.** Biaya 2x lipat tapi memberikan automatic failover jika AZ utama gagal. Untuk development, Single-AZ sudah cukup.

**2. Jangan buat RDS publicly accessible.** Database harus berada di private subnet dan hanya bisa diakses dari security group tertentu (misalnya dari EC2 web server).

**3. Automated Backup dengan retention 7-35 hari.** Ini default-nya 7 hari — naikkan ke 14-30 hari untuk production.

**4. Read Replicas untuk workload read-heavy.** Jika 80% query adalah SELECT, buat 1-2 read replica untuk mendistribusikan beban.

**5. Monitor Performance Insights.** Fitur gratis yang menunjukkan query mana yang paling lambat dan consuming resources.

### DynamoDB Best Practices

**1. Desain partition key dengan hati-hati.** Partition key yang buruk (misalnya hanya ada 3 nilai unik) menyebabkan "hot partition" — semua traffic terkonsentrasi di satu partisi. Pilih key dengan cardinality tinggi (misalnya userId).

**2. Gunakan On-Demand untuk traffic tidak terprediksi, Provisioned untuk traffic stabil.** On-Demand lebih mahal per request, tapi tidak perlu capacity planning.

**3. Aktifkan DynamoDB Streams untuk event-driven processing.** Setiap perubahan data bisa memicu Lambda — cocok untuk sync data, notifikasi, atau audit trail.

**4. Gunakan DynamoDB Accelerator (DAX) untuk caching di depan DynamoDB.** Jika DynamoDB sudah cepat (single-digit ms), DAX membuatnya 10x lebih cepat (microseconds).`,
            keyTakeaway: "S3: jangan public, aktifkan versioning & encryption, gunakan lifecycle policies. RDS: Multi-AZ untuk production, private subnet. DynamoDB: desain partition key dengan baik.",
          },
          {
            type: "lesson",
            title: "Amazon CloudFront: Content Delivery Network (CDN)",
            body: `Misalkan kamu memiliki bucket S3 di region *us-east-1* (Amerika Serikat) berisi video tutorial. Jika user dari Indonesia mendownload video tersebut, prosesnya akan sangat lambat karena data harus melintasi samudra Pasifik.

Untuk mempercepat, kita menggunakan **Amazon CloudFront** (layanan CDN AWS).

### Cara Kerja CloudFront:
1. CloudFront memiliki ratusan **Edge Locations** yang tersebar di seluruh dunia (termasuk di Jakarta).
2. Saat user dari Indonesia me-request video, request tidak langsung pergi ke Amerika. Request pergi ke Edge Location di Jakarta.
3. Jika video belum ada di Jakarta (Cache Miss), Edge akan mengambilnya dari S3 Amerika (Origin) lalu menyimpannya di Jakarta (Caching).
4. Ketika user lain dari Indonesia me-request video yang sama, Edge akan langsung mengirimkan video yang ada di Jakarta (Cache Hit). Hasilnya: kecepatan download 10x lebih instan!

CloudFront juga bisa digunakan di depan Application Load Balancer dan API Gateway, bukan hanya S3.`,
            keyTakeaway: "Amazon CloudFront (CDN) mempercepat akses ke file statis dan dinamis dengan cara men-cache konten tersebut di Edge Locations yang dekat dengan lokasi geografis pengguna akhir.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon CloudFront", url: "https://aws.amazon.com/cloudfront/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS CloudTrail: Audit & Governance",
            body: `Dalam tim perusahaan berskala menengah hingga besar, masalah klasik yang sering terjadi adalah: *"Siapa yang menghapus database produksi kemarin jam 3 pagi?!"*

Di AWS, setiap klik di Management Console, setiap command di CLI, dan setiap panggilan API akan tercatat secara permanen di **AWS CloudTrail**.

CloudTrail bertindak layaknya "kamera CCTV" untuk seluruh akun AWS-mu. Log CloudTrail merekam informasi penting:
- **Siapa** (Identitas IAM user/role)
- **Kapan** (Timestamp)
- **Apa** (Aksi apa yang dilakukan, misal "DeleteDBInstance")
- **Dari mana** (IP address asal)

Best practice keamanan: Simpan log CloudTrail di sebuah S3 bucket sentral yang terisolasi dan pasang **S3 Object Lock** agar log tersebut tidak bisa dihapus oleh pihak manapun.`,
            keyTakeaway: "AWS CloudTrail merekam seluruh aktivitas API pada akun AWS (Siapa melakukan apa dan kapan), esensial untuk keperluan audit, keamanan, dan troubleshooting.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS CloudTrail", url: "https://aws.amazon.com/cloudtrail/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS Systems Manager (SSM) Parameter Store & Secrets Manager",
            body: `Di mana kita harus menyimpan kredensial (username & password database) dan *environment variables* aplikasi? 

Menyimpannya dalam plain text di kode (GitHub) sangat terlarang.

AWS menawarkan dua solusi utama:

### 1. Systems Manager (SSM) Parameter Store
Layanan gratis untuk menyimpan konfigurasi teks (misal URL frontend) dan password (yang otomatis dienkripsi dengan KMS).
Kamu dapat memanggil API "GetParameter" dari kode aplikasimu.

### 2. AWS Secrets Manager
Layanan premium berbayar. Selain untuk menyimpan rahasia dengan aman, fitur unggulan Secrets Manager adalah **Automatic Rotation**.
Fitur ini dapat mengubah password database secara otomatis setiap 30 hari tanpa campur tangan manusia dan tanpa menghentikan aplikasimu (Zero Downtime).

**Pilih mana?** Jika butuh penyimpanan konfigurasi simpel dan gratis, gunakan Parameter Store. Jika butuh rotasi password otomatis untuk compliance perusahaan tinggi, gunakan Secrets Manager.`,
            keyTakeaway: "Gunakan SSM Parameter Store untuk konfigurasi umum dan Secrets Manager untuk rotasi password otomatis yang lebih canggih dan memenuhi kepatuhan keamanan enterprise.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Secrets Manager", url: "https://aws.amazon.com/secrets-manager/" }
            ]
          },
          {
            type: "lesson",
            title: "S3 Event Notifications: Respons Otomatis terhadap Perubahan Data",
            body: `S3 bukan hanya tempat penyimpanan pasif — ia bisa menjadi **sumber event** yang memicu alur kerja otomatis. Fitur **S3 Event Notifications** memungkinkanmu mendeteksi perubahan di bucket (file baru diupload, file dihapus, file direstore) dan mengirim notifikasi ke berbagai target.

### Event yang Bisa Dipantau

- **s3:ObjectCreated:*** — setiap kali objek baru dibuat (upload, multipart upload, copy)
- **s3:ObjectRemoved:*** — setiap kali objek dihapus
- **s3:ObjectRestore:*** — ketika objek dari Glacier di-restore
- **s3:ObjectTagging:*** — ketika tag objek diubah
- **s3:LifecycleExpiration:*** — ketika lifecycle policy menghapus objek

### Target Notifikasi

Event dari S3 bisa dikirim ke beberapa target:

**1. AWS Lambda** — trigger function untuk memproses file. Contoh: saat gambar diupload ke S3, Lambda otomatis membuat thumbnail, kompresi, dan watermark.

**2. Amazon SQS** — kirim pesan ke antrian untuk diproses oleh worker. Cocok untuk workload yang butuh antrian dan retry logic.

**3. Amazon SNS** — kirim notifikasi ke email, SMS, atau HTTP endpoint. Cocok untuk alert dan monitoring.

**4. Amazon EventBridge** — kirim event ke bus event untuk routing yang lebih kompleks dan filtering.

### Contoh Arsitektur Real-time

\`\`\`
User upload foto → S3 bucket (uploads/)
  → Event Notification (ObjectCreated)
  → Lambda function
    → Resize ke 3 ukuran (thumb, medium, full)
    → Simpan ke S3 bucket (processed/)
    → Update database (DynamoDB) dengan metadata foto
    → Kirim notifikasi (SNS) ke user: "Foto berhasil diproses"
\`\`\`

### Filtering dengan Prefix dan Suffix

Kamu bisa filter event hanya untuk path tertentu. Contoh:
- Prefix: \`images/\` — hanya file di folder \`images/\` yang trigger notifikasi
- Suffix: \`.jpg\` — hanya file .jpg yang trigger

Ini mencegah notifikasi yang tidak diinginkan dan menghemat biaya. Misalnya, kamu hanya ingin memproses file dari folder \`incoming/\` yang berekstensi \`.csv\`.

### Best Practices

1. **Gunakan SQS sebagai buffer** jika Lambda perlu processing yang lebih lama — SQS akan hold message sampai siap diproses
2. **Set notifikasi dengan prefix filter** untuk menghindari infinite loop (misalnya: jangan trigger notifikasi untuk folder output)
3. **Konfigurasi dead-letter queue** untuk menangani event yang gagal diproses
4. **Test dengan sample file kecil** sebelum production`,
            keyTakeaway: "S3 Event Notifications mengirim notifikasi saat ada perubahan di bucket — trigger Lambda, SQS, SNS, atau EventBridge. Filter dengan prefix/suffix untuk presisi. Contoh: auto-resize gambar saat upload.",
            sources: [
              { type: "DOCUMENTATION", title: "S3 Event Notifications — AWS Docs", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html" },
            ],
          },
          {
            type: "lesson",
            title: "RDS Proxy: Manajemen Koneksi Database untuk Aplikasi Serverless",
            body: `Saat menggunakan Lambda untuk mengakses RDS, ada masalah klasik: **connection exhaustion**. Lambda bisa scale ke ribuan concurrent executions, dan jika setiap execution membuka koneksi database sendiri, database akan kehabisan koneksi (max_connections). **RDS Proxy** adalah solusinya.

### Masalah: Lambda + RDS = Connection Storm

Database relasional memiliki jumlah koneksi maksimal yang terbatas. Misalnya, db.t3.micro memiliki max_connections = ~80. Jika Lambda mendapat 500 concurrent requests, dan masing-masing membuka koneksi ke RDS, database akan kewalahan — koneksi ditolak, aplikasi error.

### Solusi: RDS Proxy

**RDS Proxy** adalah proxy database yang berada di antara aplikasi (Lambda/EC2) dan RDS. Ia mengelola **connection pooling** — memelihara kumpulan koneksi yang sudah jadi ke database dan membagikannya ke banyak client.

### Cara Kerja

\`\`\`
Lambda (100 concurrent)
  ↓
RDS Proxy (pool: 10 koneksi)
  ↓
RDS PostgreSQL (max_connections: 80)
\`\`\`

1. Lambda membutuhkan koneksi database
2. RDS Proxy memberikan koneksi dari pool yang sudah ada (tidak perlu buka koneksi baru)
3. Setelah Lambda selesai, koneksi dikembalikan ke pool (bukan ditutup)
4. Koneksi berikutnya bisa langsung menggunakan koneksi yang sudah hangat

Hasilnya: 100 Lambda concurrent hanya butuh 5-10 koneksi database — mengurangi beban RDS secara drastis.

### Keuntungan Tambahan

**IAM Authentication:** RDS Proxy mendukung autentikasi IAM — Lambda bisa mengakses database tanpa password. Cukup dengan IAM role, lebih aman karena tidak ada kredensial yang disimpan di code.

**Failover Minimized:** Saat RDS melakukan failover (misalnya ke Multi-AZ standby), aplikasi biasanya mengalami downtime beberapa menit. Dengan RDS Proxy, failover terjadi secara transparan — koneksi proxy tetap aktif, aplikasi tidak sadar terjadi failover.

**Connection Multiplexing:** Banyak koneksi client dipetakan ke sedikit koneksi database — mengurangi memory usage di database.

### Kapan Menggunakan RDS Proxy?

1. **Lambda + RDS di production** — wajib! Tanpa proxy, Lambda akan overload database
2. **Aplikasi dengan banyak concurrent users** — web apps, mobile backends
3. **Workload dengan koneksi database yang sering buka-tutup** — serverless dan container apps
4. **Butuh IAM auth untuk database** — tanpa password management

RDS Proxy adalah komponen kecil yang dampaknya sangat besar untuk arsitektur serverless. Jangan lewatkan ini saat deploy Lambda + RDS ke production.`,
            keyTakeaway: "RDS Proxy menyediakan connection pooling untuk Lambda + RDS — mencegah connection exhaustion, mendukung IAM authentication, dan membuat failover transparan. Wajib untuk production.",
            sources: [
              { type: "DOCUMENTATION", title: "RDS Proxy — AWS Docs", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html" },
              { type: "YOUTUBE", title: "AWS re:Invent — Using RDS Proxy with AWS Lambda", url: "https://www.youtube.com/watch?v=OukH4Hn2jTY" },
            ],
          },
          {
            type: "summary",
            title: "Rangkuman: Storage & Database di AWS",
            body: `Modul ini melengkapi pilar ketiga arsitektur cloud: **penyimpanan dan database**. Berikut ringkasan lengkapnya:

### Amazon S3 (Object Storage)
- Menyimpan file/objek di bucket — kapasitas praktis tak terbatas
- 7 storage class: dari Standard (cepat, mahal) hingga Glacier Deep Archive (lambat, sangat murah)
- Fitur kunci: Versioning, Lifecycle Policies, Pre-signed URL, Server-Side Encryption
- Durability: 99.999999999% (11 nines)
- Bisa hosting website statis + CloudFront CDN

### Amazon RDS (Relational Database)
- Database SQL terkelola: PostgreSQL, MySQL, Aurora, Oracle, SQL Server
- Fitur: Automated Backup, Multi-AZ Failover, Read Replicas, Patching otomatis
- Cocok untuk: data relasional, transaksi ACID, query kompleks dengan JOIN

### Amazon DynamoDB (NoSQL Database)
- Database key-value serverless — latensi <10ms di skala apapun
- Tidak perlu provisioning server
- Cocok untuk: session store, leaderboard, feed timeline, IoT data
- Free Tier: 25 GB + 25 RCU/WCU (Always Free)

### Amazon ElastiCache (In-Memory Cache)
- Redis atau Memcached untuk caching sub-millisecond
- Use case: query cache, session store, rate limiting, leaderboard

### Prinsip Utama
- Gunakan layanan yang tepat untuk jenis data yang tepat
- S3 untuk file, RDS untuk relasional, DynamoDB untuk key-value
- Lifecycle policies dan storage tiering untuk optimasi biaya

Di modul terakhir, kamu akan mempelajari **jaringan, keamanan, dan arsitektur AWS** — VPC, Route 53, CloudFront, dan AWS Well-Architected Framework.`,
            keyTakeaway: "S3 = file storage (11 nines durability), RDS = database relasional terkelola, DynamoDB = NoSQL serverless (<10ms), ElastiCache = caching sub-millisecond.",
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang S3, RDS & DynamoDB",
            body: "Pastikan kamu memahami perbedaan S3, RDS, dan DynamoDB, kapan menggunakan masing-masing, storage classes S3, dan best practices database di AWS.",
            quizBank: [
              {
                id: "q1",
                question: "Apa keuntungan utama Amazon S3 dibandingkan penyimpanan di EC2 instance?",
                options: [
                  { id: "a", text: "S3 lebih murah untuk semua use case" },
                  { id: "b", text: "S3 menawarkan durability 99.999999999% (11 nines) dengan replikasi otomatis ke minimal 3 AZ" },
                  { id: "c", text: "S3 bisa menjalankan code Python langsung di bucket" },
                  { id: "d", text: "S3 tidak punya batasan kapasitas tapi kecepatannya lebih lambat" },
                ],
                correctAnswer: "b",
                explanation: "S3 menyediakan durability 11 nines melalui replikasi otomatis data ke minimal 3 Availability Zone dalam satu Region. Artinya jika kamu menyimpan 10 juta objek, secara statistik hanya 1 yang mungkin hilang setiap 10.000 tahun. EC2 instance storage (EBS) hanya replikasi dalam satu AZ saja.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Storage class S3 mana yang PALING TEPAT untuk data backup yang jarang diakses tapi harus tersedia dalam 1-5 menit saat dibutuhkan?",
                options: [
                  { id: "a", text: "S3 Standard" },
                  { id: "b", text: "S3 Glacier Flexible Retrieval" },
                  { id: "c", text: "S3 Intelligent-Tiering" },
                  { id: "d", text: "S3 One Zone-IA" },
                ],
                correctAnswer: "b",
                explanation: "S3 Glacier Flexible Retrieval dirancang untuk archive data yang sangat jarang diakses. Biaya penyimpanannya ~$0.0036/GB/bulan (84% lebih murah dari Standard), dan data bisa diambil dalam 1-5 menit (Expedited retrieval) atau 3-5 jam (Standard). Cocok untuk backup yang mungkin diperlukan saat disaster recovery.",
                difficulty: "medium",
              },
              {
                id: "q3",
                question: "Dalam arsitektur e-commerce, kapan sebaiknya menggunakan DynamoDB daripada RDS?",
                options: [
                  { id: "a", text: "Saat data memiliki relasi kompleks dengan banyak JOIN antar tabel" },
                  { id: "b", text: "Saat butuh latensi sangat rendah (<10ms) untuk key-value lookup seperti session store atau shopping cart" },
                  { id: "c", text: "Saat perlu menjalankan query SQL yang kompleks" },
                  { id: "d", text: "Saat data harus memiliki integrity constraint (foreign key)" },
                ],
                correctAnswer: "b",
                explanation: "DynamoDB unggul untuk use case key-value yang membutuhkan latensi konsisten di bawah 10ms di skala apapun. Contoh: session store, shopping cart, leaderboard game, dan IoT data. RDS lebih cocok untuk data relasional yang butuh JOIN, transaksi ACID kompleks, dan foreign key constraints.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question: "Apa fungsi fitur Multi-AZ di Amazon RDS?",
                options: [
                  { id: "a", text: "Membuat database bisa diakses dari banyak region sekaligus" },
                  { id: "b", text: "Menyediakan standby replica di Availability Zone berbeda untuk automatic failover jika AZ utama gagal" },
                  { id: "c", text: "Mendistribusikan query read ke beberapa instance secara otomatis" },
                  { id: "d", text: "Membagi data menjadi beberapa shard untuk performa lebih baik" },
                ],
                correctAnswer: "b",
                explanation: "Multi-AZ RDS secara otomatis membuat dan mengelola synchronous standby replica di Availability Zone yang berbeda. Jika AZ utama mengalami kegagalan, RDS melakukan automatic failover ke standby replica — biasanya dalam 60-120 detik. Ini memberikan high availability tanpa perubahan aplikasi.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question: "Apa yang terjadi jika S3 versioning diaktifkan lalu seseorang mengupload file dengan key yang sama?",
                options: [
                  { id: "a", text: "File baru menimpa file lama — versi lama hilang permanen" },
                  { id: "b", text: "S3 menyimpan kedua versi — versi lama bisa di-restore kapan saja" },
                  { id: "c", text: "Upload akan gagal dengan error 'key already exists'" },
                  { id: "d", text: "S3 otomatis mengganti nama file baru dengan suffix timestamp" },
                ],
                correctAnswer: "b",
                explanation: "Dengan versioning aktif, S3 tidak pernah menimpa objek. Saat upload file dengan key yang sama, S3 memberi version ID baru dan mempertahankan versi lama. Ini melindungi dari penghapusan tidak sengaja dan memungkinkan rollback ke versi sebelumnya. Versioning bisa dikombinasikan dengan MFA Delete untuk proteksi ekstra.",
                difficulty: "easy",
              },
            ],
          },
        ],
      },

      // ============================================================
      // MODUL 4: Jaringan, Keamanan & Arsitektur AWS
      // ============================================================
      {
        title: "Jaringan, Keamanan & Arsitektur AWS",
        slug: "jaringan-keamanan-arsitektur-aws",
        xpReward: 90,
        slides: [
          {
            type: "lesson",
            title: "Membangun Jaringan Cloud yang Aman",
            body: `Di modul-modul sebelumnya, kamu sudah belajar komputasi (EC2, Lambda) dan penyimpanan (S3, RDS, DynamoDB). Sekarang saatnya menghubungkan semuanya dengan **jaringan yang aman dan terstruktur** — serta merancang arsitektur yang mengikuti standar industri.

### Mengapa Jaringan Penting di Cloud?

Di dunia fisik, jaringan komputer dibangun dengan kabel, switch, router, dan firewall fisik. Di cloud, semua itu divirtualisasikan — tapi prinsipnya tetap sama. Tanpa konfigurasi jaringan yang benar, resource cloud-mu bisa:
- **Terlalu terbuka** — database bisa diakses dari internet (kebocoran data!)
- **Terlalu tertutup** — aplikasi tidak bisa berkomunikasi satu sama lain
- **Lambat** — traffic mengambil jalur yang tidak efisien

AWS **Virtual Private Cloud (VPC)** adalah fondasi jaringan di AWS. Setiap resource yang kamu buat (EC2, RDS, Lambda, ElastiCache) berjalan di dalam VPC. Memahami VPC adalah kunci untuk membangun arsitektur yang aman.

### Apa yang Akan Kamu Pelajari

**1. Amazon VPC** — jaringan privat virtualmu di AWS. Seperti membangun gedung kantor dengan ruangan-ruangan (subnet) yang terhubung.

**2. Subnet, Route Table, Internet Gateway** — komponen yang menentukan bagaimana traffic mengalir di dalam dan keluar VPC.

**3. Security Groups vs NACLs** — dua lapisan firewall yang bekerja di level berbeda.

**4. Route 53** — layanan DNS managed yang menghubungkan domain ke resource AWS.

**5. CloudFront** — CDN global untuk mempercepat delivery konten.

**6. AWS Well-Architected Framework** — panduan resmi AWS untuk merancang arsitektur yang baik.

Setelah modul ini, kamu akan bisa merancang arsitektur AWS end-to-end yang aman, scalable, reliable, dan cost-efficient — siap untuk production.`,
            keyTakeaway: "Jaringan adalah fondasi keamanan cloud. VPC, Subnet, Security Groups, dan NACLs menentukan bagaimana resource berkomunikasi dan siapa yang bisa mengaksesnya.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon VPC — AWS Docs", url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" },
              { type: "DOCUMENTATION", title: "AWS Well-Architected Framework", url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html" },
              { type: "YOUTUBE", title: "AWS — AWS VPC Beginner to Pro", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" },
              { type: "YOUTUBE", title: "AWS Architecture Tutorial — AWS for Beginners", url: "https://www.youtube.com/watch?v=QbipcgIdSJc" },
            ],
          },
          {
            type: "lesson",
            title: "Amazon VPC: Jaringan Privat Virtual di Cloud",
            body: `**Amazon VPC (Virtual Private Cloud)** adalah jaringan virtual terisolasi yang kamu definisikan di dalam AWS cloud. Setiap VPC sepenuhnya milikmu — resource di VPC-mu tidak bisa diakses dari VPC lain kecuali kamu secara eksplisit mengizinkannya.

### Analogi: VPC = Gedung Kantor Pribadi

Bayangkan VPC sebagai **gedung kantor pribadimu**:
- **VPC** = gedung itu sendiri (dengan alamat dan pagar pembatas)
- **Subnet** = lantai/ruangan di gedung (setiap ruangan punya fungsi berbeda)
- **Route Table** = denah koridor yang menentukan jalur dari ruangan ke ruangan atau ke pintu keluar
- **Internet Gateway** = pintu utama gedung yang terhubung ke jalan raya (internet)
- **NAT Gateway** = pintu belakang yang memungkinkan orang di dalam keluar, tapi orang di luar tidak bisa masuk
- **Security Group** = satpam di pintu setiap ruangan
- **NACL** = satpam di pintu setiap lantai

### CIDR Block — Menentukan Ukuran VPC

Saat membuat VPC, kamu menentukan **CIDR block** — rentang IP address yang tersedia. Contoh: \`10.0.0.0/16\` memberikanmu 65.536 IP address. Semakin kecil angka setelah \`/\`, semakin banyak IP yang tersedia.

**Rekomendasi:** Gunakan \`/16\` untuk production VPC (65.536 IP — lebih dari cukup untuk kebanyakan use case).

### Subnet — Membagi VPC Menjadi Segmen

Subnet adalah subdivisi dari VPC. Setiap subnet berada di **satu Availability Zone** dan memiliki CIDR block sendiri (subset dari VPC CIDR).

**Public Subnet** — subnet yang punya route ke Internet Gateway. Resource di sini bisa menerima traffic dari internet. Contoh: web server, load balancer.

**Private Subnet** — subnet yang TIDAK punya route ke Internet Gateway. Resource di sini tidak bisa diakses langsung dari internet. Contoh: database, backend server, cache.

### Best Practice: Multi-AZ Subnet

Selalu buat subnet di minimal 2 Availability Zone untuk high availability:

\`\`\`
VPC: 10.0.0.0/16

Public Subnet A:  10.0.1.0/24 (AZ ap-southeast-1a)
Public Subnet B:  10.0.2.0/24 (AZ ap-southeast-1b)
Private Subnet A: 10.0.3.0/24 (AZ ap-southeast-1a)
Private Subnet B: 10.0.4.0/24 (AZ ap-southeast-1b)
\`\`\`

Dengan setup ini, jika AZ-a mengalami kegagalan, resource di AZ-b masih berjalan normal. ALB mendistribusikan traffic ke subnet di kedua AZ.`,
            keyTakeaway: "VPC = jaringan privat virtual. Bagi menjadi public subnet (web server, load balancer) dan private subnet (database, cache). Selalu deploy di minimal 2 AZ.",
          },
          {
            type: "lesson",
            title: "Route Tables, Internet Gateway & NAT Gateway",
            body: `Setelah membuat VPC dan subnet, kamu perlu menentukan **bagaimana traffic mengalir** — dari subnet ke internet, dari subnet ke subnet, atau dari subnet ke layanan AWS lainnya. Ini diatur oleh **Route Tables**, **Internet Gateway**, dan **NAT Gateway**.

### Internet Gateway (IGW)

Internet Gateway adalah komponen yang menghubungkan VPC ke internet. Tanpa IGW, tidak ada resource di VPC yang bisa berkomunikasi dengan internet — baik masuk maupun keluar.

Setiap VPC hanya bisa punya **satu Internet Gateway**. IGW bersifat horizontally scaled, redundant, dan highly available — kamu tidak perlu khawatir tentang kapasitas atau failover-nya.

### Route Table — Peta Jalur Traffic

Route table berisi **rules (routes)** yang menentukan kemana traffic diarahkan berdasarkan tujuan IP. Setiap subnet diasosiasikan dengan satu route table.

**Route table untuk Public Subnet:**
\`\`\`
Destination       Target
10.0.0.0/16       local        (traffic internal VPC)
0.0.0.0/0         igw-xxxxx    (semua traffic lain → Internet Gateway)
\`\`\`

**Route table untuk Private Subnet:**
\`\`\`
Destination       Target
10.0.0.0/16       local        (traffic internal VPC)
0.0.0.0/0         nat-xxxxx    (semua traffic lain → NAT Gateway)
\`\`\`

Perhatikan perbedaannya: public subnet mengarahkan traffic ke IGW (bisa menerima dan mengirim ke internet), sedangkan private subnet mengarahkan ke NAT Gateway (hanya bisa mengirim ke internet, tidak bisa menerima).

### NAT Gateway — Akses Internet Satu Arah

**NAT (Network Address Translation) Gateway** memungkinkan resource di **private subnet** untuk mengakses internet (misalnya untuk download update, memanggil API eksternal), tapi **mencegah** internet untuk mengakses resource tersebut.

Analogi: NAT Gateway seperti **pintu belakang kantor** — karyawan bisa keluar untuk membeli makan siang, tapi orang luar tidak bisa masuk melalui pintu ini.

**Kapan butuh NAT Gateway?**
- EC2 di private subnet perlu download package dari internet (\`yum update\`, \`apt install\`)
- Lambda di VPC perlu memanggil API eksternal
- RDS perlu mengambil patch dari internet

**Biaya NAT Gateway:**
NAT Gateway termasuk layanan AWS yang relatif mahal: ~$0.045/jam (~$32/bulan) plus biaya data processing. Untuk development, pertimbangkan NAT Instance (EC2 kecil yang dikonfigurasi sebagai NAT) sebagai alternatif lebih murah, meskipun tidak se-reliable NAT Gateway.

### VPC Endpoints — Akses Layanan AWS Tanpa Internet

Untuk mengakses layanan AWS (S3, DynamoDB, dll) dari private subnet, kamu sebenarnya **tidak perlu** NAT Gateway. Gunakan **VPC Endpoint** — koneksi privat langsung dari VPC ke layanan AWS tanpa melewati internet publik. Ini lebih aman dan lebih murah.`,
            keyTakeaway: "IGW menghubungkan VPC ke internet. Public subnet route ke IGW, private subnet route ke NAT Gateway. Gunakan VPC Endpoints untuk akses layanan AWS tanpa melewati internet.",
          },
          {
            type: "lesson",
            title: "Security Groups vs NACLs: Dua Lapisan Firewall",
            body: `AWS menyediakan dua mekanisme firewall yang bekerja di level berbeda: **Security Groups** (di level instance) dan **Network ACLs** (di level subnet). Memahami perbedaan keduanya penting untuk merancang keamanan berlapis.

### Security Groups (SG) — Firewall Per Instance

Security Groups sudah kita bahas di modul EC2. Berikut ringkasannya:
- Bekerja di **level instance** (setiap EC2, RDS, Lambda bisa punya SG sendiri)
- **Stateful** — jika request masuk diizinkan, response otomatis diizinkan keluar
- Default: **deny all inbound, allow all outbound**
- Hanya mendukung **allow rules** — tidak bisa secara eksplisit deny traffic tertentu
- Bisa referensi SG lain sebagai source (misalnya: "izinkan traffic dari sg-webserver")

### Network ACLs (NACLs) — Firewall Per Subnet

NACLs bekerja di level yang lebih tinggi — di pintu masuk/keluar **subnet**. Semua traffic yang masuk atau keluar subnet harus melewati NACL.

- Bekerja di **level subnet** (semua resource di subnet terkena)
- **Stateless** — inbound dan outbound rules dievaluasi secara independen. Jika kamu mengizinkan inbound HTTP, kamu juga harus secara eksplisit mengizinkan outbound response (ephemeral ports 1024-65535).
- Default: **allow all inbound dan outbound**
- Mendukung **allow DAN deny rules** — bisa secara eksplisit memblokir IP tertentu
- Rules dievaluasi berdasarkan **nomor urut** (lowest number first)

### Perbandingan SG vs NACL

| Aspek | Security Group | Network ACL |
|-------|---------------|-------------|
| Level | Instance | Subnet |
| Stateful/less | Stateful | Stateless |
| Rules | Allow only | Allow dan Deny |
| Default | Deny all inbound | Allow all |
| Evaluasi | Semua rules | Berdasarkan urutan nomor |

### Kapan Menggunakan Apa?

**Security Groups** — gunakan untuk 90% kebutuhan firewall. Ini yang paling sering dipakai dan paling mudah dikelola. Buat SG terpisah untuk setiap tier: web, app, database.

**NACLs** — gunakan sebagai **lapisan pertahanan tambahan** atau untuk memblokir IP/range tertentu yang diketahui berbahaya. NACLs adalah satu-satunya cara untuk secara eksplisit **deny** traffic tertentu.

### Contoh Defense in Depth

\`\`\`
Internet → NACL (subnet level: block known bad IPs)
         → Security Group (instance level: allow only HTTP/HTTPS)
         → EC2 instance (application level: input validation)
\`\`\`

Setiap lapisan menambah keamanan. Jika satu lapisan gagal, lapisan lain masih melindungi.`,
            keyTakeaway: "Security Groups = firewall stateful di level instance (allow only). NACLs = firewall stateless di level subnet (allow & deny). Gunakan keduanya untuk defense in depth.",
          },
          {
            type: "lesson",
            title: "Route 53 & CloudFront: DNS & CDN Global",
            body: `Dua layanan AWS yang menyempurnakan arsitektur: **Route 53** untuk mengelola domain/DNS, dan **CloudFront** untuk mempercepat delivery konten secara global.

### Amazon Route 53 — DNS Managed Service

Route 53 adalah layanan DNS (Domain Name System) yang menerjemahkan nama domain (clarise.my.id) menjadi IP address. Nama "Route 53" merujuk pada port 53 — port standar untuk DNS.

**Fitur Utama:**
- **Domain Registration** — beli domain langsung dari AWS (.com, .id, .io, dll)
- **DNS Hosting** — kelola DNS records (A, AAAA, CNAME, MX, TXT, dll)
- **Health Checks** — monitor kesehatan endpoint dan otomatis failover jika ada masalah
- **Routing Policies** — kontrol bagaimana traffic diarahkan

**Routing Policies:**
- **Simple** — satu domain, satu target. Paling dasar.
- **Weighted** — bagi traffic berdasarkan bobot. Misalnya: 90% ke server baru, 10% ke server lama (canary deployment).
- **Latency-based** — arahkan user ke region dengan latensi terendah.
- **Failover** — primary target aktif, secondary jika primary gagal health check.
- **Geolocation** — arahkan berdasarkan lokasi geografis user. User dari Indonesia → server Singapura. User dari Eropa → server Frankfurt.

### Amazon CloudFront — CDN Global

CloudFront adalah **Content Delivery Network** yang menyimpan salinan kontenmu di 400+ edge location di seluruh dunia. Saat user mengakses website-mu, konten disajikan dari edge location terdekat — bukan dari server origin.

**Cara Kerja:**
1. User di Jakarta mengakses website-mu
2. Request pergi ke CloudFront edge location terdekat (Jakarta)
3. Jika konten ada di cache (cache hit) → langsung disajikan (ultra-cepat!)
4. Jika konten tidak ada (cache miss) → CloudFront mengambil dari origin (S3/EC2/ALB), menyimpan di cache, lalu menyajikan

**Keuntungan CloudFront:**
- **Kecepatan** — latensi lebih rendah karena konten lebih dekat ke user
- **HTTPS gratis** — SSL/TLS certificate gratis dari AWS Certificate Manager (ACM)
- **DDoS protection** — integrasi dengan AWS Shield untuk perlindungan DDoS
- **Custom domain** — gunakan domain sendiri (cdn.clarise.my.id)
- **Cache behavior** — kontrol granular: cache static assets selama 24 jam, jangan cache API responses

### Arsitektur Lengkap dengan Route 53 + CloudFront

\`\`\`
User → Route 53 (DNS resolve)
     → CloudFront (edge cache)
     → ALB (load balancer)
     → EC2 Auto Scaling Group (app servers)
     → RDS/DynamoDB (database)
     → S3 (static assets via CloudFront)
\`\`\`

Ini adalah arsitektur standar yang digunakan oleh ribuan aplikasi production di AWS — scalable, reliable, dan secure.`,
            keyTakeaway: "Route 53 = DNS managed (domain, health checks, routing policies). CloudFront = CDN global (400+ edge locations, HTTPS gratis, DDoS protection). Keduanya menyempurnakan arsitektur.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon Route 53 — AWS Docs", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html" },
              { type: "DOCUMENTATION", title: "Amazon CloudFront — AWS Docs", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html" },
            ],
          },
          {
            type: "lesson",
            title: "AWS Well-Architected Framework: Panduan Arsitektur Terbaik",
            body: `**AWS Well-Architected Framework** adalah panduan resmi dari AWS untuk merancang arsitektur cloud yang berkualitas tinggi. Framework ini dibangun dari pengalaman bertahun-tahun membantu ribuan pelanggan merancang workload di cloud. Memahami framework ini membedakan developer biasa dari cloud architect.

### 6 Pilar Well-Architected Framework

**1. Operational Excellence (Keunggulan Operasional)**
Bagaimana kamu menjalankan dan memantau sistem untuk memberikan value bisnis, serta terus meningkatkan proses dan prosedur.
- Automate everything — Infrastructure as Code (CloudFormation, CDK)
- Make frequent, small, reversible changes
- Anticipate failure — test recovery procedures

**2. Security (Keamanan)**
Bagaimana melindungi data, sistem, dan aset dengan memanfaatkan teknologi cloud.
- Implement strong identity foundation (IAM)
- Enable traceability (CloudTrail, CloudWatch)
- Apply security at all layers (VPC, SG, NACL, encryption)
- Automate security best practices

**3. Reliability (Keandalan)**
Kemampuan sistem untuk pulih dari gangguan dan memenuhi permintaan yang berfluktuasi.
- Test recovery procedures
- Scale horizontally (Auto Scaling, multiple AZ)
- Stop guessing capacity

**4. Performance Efficiency (Efisiensi Performa)**
Menggunakan resource komputasi secara efisien dan mempertahankan efisiensi seiring perubahan kebutuhan.
- Use serverless architectures (Lambda) where appropriate
- Go global in minutes (multi-region deployment)
- Experiment more often (easy to try new instance types)

**5. Cost Optimization (Optimasi Biaya)**
Menghindari pengeluaran yang tidak perlu.
- Implement Cloud Financial Management
- Adopt a consumption model (pay for what you use)
- Measure overall efficiency
- Analyze and attribute expenditure

**6. Sustainability (Keberlanjutan)**
Meminimalkan dampak lingkungan dari operasi cloud.
- Understand your impact
- Maximize utilization (right-sizing)
- Use managed services (lebih efisien dari self-managed)

### AWS Well-Architected Tool

AWS menyediakan **Well-Architected Tool** gratis di Console yang membantu kamu mengevaluasi arsitektur berdasarkan 6 pilar ini. Tool ini memberikan pertanyaan-pertanyaan dan rekomendasi perbaikan spesifik. Sangat berguna untuk melakukan review arsitektur sebelum launch ke production.`,
            keyTakeaway: "Well-Architected Framework punya 6 pilar: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, dan Sustainability.",
          },
          // CHALLENGE
          {
            type: "challenge",
            title: "Challenge: Merancang Arsitektur VPC untuk E-Commerce",
            body: `Kamu adalah Cloud Architect di startup e-commerce "TokoAja" yang akan launch dalam 2 minggu. Aplikasi terdiri dari: frontend Next.js, backend API Node.js, database PostgreSQL, dan Redis untuk caching. Pengguna target: seluruh Indonesia (fokus Jawa dan Sumatera). Estimasi trafik: 10.000 pengguna harian, bisa naik 5x saat promo bulanan. Budget menengah. Keamanan data pelanggan sangat penting.`,
            challenge: {
              instruction: "Rancang arsitektur VPC untuk TokoAja yang mencakup: (1) Struktur VPC — CIDR, subnet (public & private), di berapa AZ, (2) Penempatan setiap komponen di subnet mana, (3) Keamanan jaringan — Security Groups dan routing, dan (4) Alasan pemilihan region AWS. Gambarkan arsitekturnya secara tekstual.",
              inputType: "text",
              inputPlaceholder: "Contoh:\n\nRegion: ap-southeast-1 (Singapura)\nVPC CIDR: 10.0.0.0/16\n\nSubnet:\n- Public Subnet A (AZ-a): 10.0.1.0/24 → ALB, NAT GW\n- Private Subnet A (AZ-a): 10.0.3.0/24 → EC2, Redis\n...",
              starterCode: "",
              expectedConcepts: [
                "VPC dengan public dan private subnets di minimal 2 AZ untuk high availability",
                "Frontend/ALB di public subnet, backend EC2 dan database di private subnet",
                "Security Groups terpisah untuk ALB, EC2 app, RDS, dan ElastiCache",
                "Region ap-southeast-1 atau ap-southeast-3 untuk latensi rendah ke Indonesia",
              ],
              evaluationCriteria: "Evaluasi: (1) Apakah ada pemisahan public/private subnet? Public untuk ALB, private untuk EC2/RDS/Redis — ini WAJIB. (2) Apakah minimal 2 AZ untuk HA? (3) Apakah Security Groups terpisah per tier? SG-ALB: allow 80/443 from anywhere. SG-App: allow dari SG-ALB saja. SG-DB: allow 5432 dari SG-App saja. SG-Redis: allow 6379 dari SG-App saja. (4) Apakah memilih region yang dekat Indonesia (ap-southeast-1 atau ap-southeast-3)? 3/4 = baik. 4/4 = sangat baik.",
              hints: [
                "Database dan cache TIDAK boleh ada di public subnet — ini risiko keamanan besar",
                "ALB (Application Load Balancer) harus di public subnet agar bisa menerima traffic dari internet",
                "Setiap tier (web, app, db) sebaiknya punya Security Group sendiri yang hanya mengizinkan traffic dari tier sebelumnya",
              ],
              sampleAnswer: "Region: ap-southeast-1 (Singapura) — dekat Indonesia, layanan lengkap. VPC: 10.0.0.0/16. Public Subnet A (AZ-a): 10.0.1.0/24 → ALB + NAT GW. Public Subnet B (AZ-b): 10.0.2.0/24 → ALB. Private Subnet A (AZ-a): 10.0.10.0/24 → EC2 App. Private Subnet B (AZ-b): 10.0.11.0/24 → EC2 App. Private Subnet C (AZ-a): 10.0.20.0/24 → RDS Primary + ElastiCache. Private Subnet D (AZ-b): 10.0.21.0/24 → RDS Standby. SG-ALB: inbound 80/443 from 0.0.0.0/0. SG-App: inbound 3000 from SG-ALB only. SG-DB: inbound 5432 from SG-App only. SG-Redis: inbound 6379 from SG-App only. RDS Multi-AZ enabled. Auto Scaling: min=2, max=10, target CPU 60%.",
              followUpQuestion: "Jika TokoAja berkembang ke pasar internasional (ASEAN), apa yang perlu diubah dari arsitektur ini?",
            },
          },
          {
            type: "lesson",
            title: "Pembahasan Challenge: Arsitektur VPC TokoAja",
            body: `Mari kita bahas arsitektur VPC yang optimal untuk e-commerce TokoAja. Ini adalah arsitektur 3-tier (web, app, data) yang menjadi standar industri untuk aplikasi web modern.

### Region: ap-southeast-1 (Singapura)

Mengapa Singapura? Region ini menawarkan latensi ~20-40ms dari Jawa/Sumatera, memiliki layanan AWS terlengkap di Asia Tenggara, dan sudah digunakan oleh banyak perusahaan Indonesia. Alternatif: ap-southeast-3 (Jakarta) jika latensi ke pengguna Indonesia yang sangat rendah menjadi prioritas utama.

### VPC & Subnet Design

\`\`\`
VPC: 10.0.0.0/16 (65.536 IP addresses)

┌─── AZ ap-southeast-1a ───┐  ┌─── AZ ap-southeast-1b ───┐
│                           │  │                           │
│ Public Subnet A           │  │ Public Subnet B           │
│ 10.0.1.0/24               │  │ 10.0.2.0/24               │
│ → ALB, NAT Gateway        │  │ → ALB                     │
│                           │  │                           │
│ Private App Subnet A      │  │ Private App Subnet B      │
│ 10.0.10.0/24              │  │ 10.0.11.0/24              │
│ → EC2 (Node.js backend)   │  │ → EC2 (Node.js backend)   │
│                           │  │                           │
│ Private Data Subnet A     │  │ Private Data Subnet B     │
│ 10.0.20.0/24              │  │ 10.0.21.0/24              │
│ → RDS Primary, Redis      │  │ → RDS Standby             │
└───────────────────────────┘  └───────────────────────────┘
\`\`\`

### Traffic Flow

\`\`\`
Internet → Route 53 (DNS)
         → CloudFront (CDN, cache static assets)
         → ALB (di public subnet, HTTPS termination)
         → EC2 App (di private subnet, business logic)
         → RDS/Redis (di private subnet, data layer)
\`\`\`

### Security Groups

**SG-ALB**: Inbound HTTP(80) + HTTPS(443) from 0.0.0.0/0. Outbound ke SG-App port 3000.
**SG-App**: Inbound port 3000 from SG-ALB ONLY. Outbound ke SG-DB port 5432 dan SG-Redis port 6379.
**SG-DB**: Inbound port 5432 from SG-App ONLY. No direct internet access.
**SG-Redis**: Inbound port 6379 from SG-App ONLY. No direct internet access.

Setiap tier hanya menerima traffic dari tier sebelumnya — ini adalah prinsip **least privilege** di level jaringan. Jika web tier dikompromis, penyerang masih tidak bisa langsung mengakses database karena SG-DB hanya mengizinkan traffic dari SG-App.

Arsitektur ini memberikan: high availability (2 AZ), keamanan berlapis (SG per tier + private subnet), skalabilitas (ASG + ALB), dan performa global (CloudFront CDN).`,
            keyTakeaway: "Arsitektur 3-tier: ALB di public subnet, App di private subnet, DB di private subnet. Security Groups per tier — setiap tier hanya menerima traffic dari tier sebelumnya.",
          },
          {
            type: "lesson",
            title: "AWS CloudWatch: Monitoring & Observabilitas",
            body: `**Amazon CloudWatch** adalah layanan monitoring dan observabilitas yang mengumpulkan dan memvisualisasikan data operasional dari seluruh resource AWS-mu. Tanpa monitoring yang baik, kamu buta terhadap apa yang terjadi di infrastrukturmu.

### Komponen CloudWatch

**1. Metrics — Data Numerik**
CloudWatch secara otomatis mengumpulkan metrics dari layanan AWS:
- **EC2**: CPU utilization, network in/out, disk read/write, status checks
- **RDS**: DB connections, read/write IOPS, free storage space
- **Lambda**: invocations, duration, errors, throttles
- **ALB**: request count, latency, HTTP 5xx count
- **S3**: number of objects, bucket size

Kamu juga bisa mengirim **custom metrics** dari aplikasimu — misalnya: jumlah pesanan per menit, queue depth, atau response time dari API tertentu.

**2. Alarms — Pemberitahuan Otomatis**
Alarm memicu aksi saat metric melewati threshold yang kamu tentukan:
- "Jika CPU > 80% selama 5 menit, kirim email ke tim ops via SNS"
- "Jika HTTP 5xx > 10 per menit, trigger Auto Scaling untuk tambah instance"
- "Jika RDS free storage < 10%, kirim notifikasi segera"

**3. Logs — Catatan Aktivitas**
CloudWatch Logs mengumpulkan dan menyimpan log dari:
- EC2 instances (via CloudWatch Agent)
- Lambda functions (otomatis)
- API Gateway (access logs)
- VPC Flow Logs (traffic logs)

Kamu bisa search, filter, dan analisis log secara real-time. **Log Insights** menyediakan query language untuk analisis log yang kompleks.

**4. Dashboards — Visualisasi Terpusat**
Buat dashboard kustom yang menampilkan metrics, logs, dan alarms paling penting di satu layar. Sangat berguna untuk monitoring operasional sehari-hari.

### Setup Monitoring Minimum untuk Production

1. **CPU Alarm**: jika EC2 CPU > 70% selama 5 menit → SNS notification
2. **Error Rate Alarm**: jika ALB 5xx error rate > 1% → SNS notification
3. **Database Storage Alarm**: jika RDS free storage < 20% → SNS notification
4. **Billing Alarm**: jika estimated charges > $X → email notification
5. **Lambda Error Alarm**: jika Lambda error count > 0 → SNS notification
6. **Dashboard**: EC2 CPU + RDS connections + Lambda invocations + ALB request count

Monitoring bukan "nice-to-have" — ini **wajib** untuk production. Tanpa monitoring, kamu baru tahu ada masalah saat user mengeluh. Dengan monitoring, kamu bisa mendeteksi dan memperbaiki masalah SEBELUM berdampak ke user.`,
            keyTakeaway: "CloudWatch = monitoring & observabilitas. 4 komponen: Metrics (data), Alarms (notifikasi), Logs (catatan), Dashboards (visualisasi). Wajib untuk production.",
          },
          {
            type: "lesson",
            title: "Infrastructure as Code: CloudFormation & CDK",
            body: `Membuat resource AWS melalui Console (GUI) bagus untuk belajar, tapi untuk production, kamu harus menggunakan **Infrastructure as Code (IaC)** — mendefinisikan seluruh infrastruktur dalam kode yang bisa di-version control, di-review, dan di-deploy secara otomatis.

### Mengapa Infrastructure as Code?

**1. Repeatable** — deploy infrastruktur yang identik di environment berbeda (dev, staging, production) dengan satu command.

**2. Version Controlled** — simpan template di Git. Siapa mengubah apa, kapan, dan kenapa — semua tercatat.

**3. Reviewable** — tim bisa review perubahan infrastruktur sebelum di-deploy, sama seperti code review.

**4. Self-documenting** — template ADALAH dokumentasi. Tidak perlu dokumen terpisah yang bisa outdated.

**5. Disaster Recovery** — jika region hancur, deploy ulang seluruh infrastruktur di region lain dari template.

### AWS CloudFormation — IaC dengan Template

CloudFormation menggunakan template YAML/JSON untuk mendefinisikan resource AWS. Kamu menulis template, CloudFormation membuat semua resource sesuai spesifikasi.

\`\`\`yaml
# cloudformation-example.yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t3.micro
      ImageId: ami-0abcdef1234567890
      SecurityGroupIds:
        - !Ref WebServerSG
  
  WebServerSG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Web server security group
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
\`\`\`

### AWS CDK — IaC dengan Bahasa Pemrograman

**AWS CDK (Cloud Development Kit)** memungkinkanmu mendefinisikan infrastruktur menggunakan bahasa pemrograman favorit (TypeScript, Python, Java, Go, C#). Ini jauh lebih ekspresif dan developer-friendly dibanding YAML.

\`\`\`typescript
// cdk-example.ts
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cdk from 'aws-cdk-lib';

const vpc = new ec2.Vpc(this, 'TokoAjaVPC', {
  maxAzs: 2,
  natGateways: 1,
});

const instance = new ec2.Instance(this, 'WebServer', {
  vpc,
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.T3, ec2.InstanceSize.MICRO
  ),
  machineImage: ec2.MachineImage.latestAmazonLinux2023(),
});
\`\`\`

CDK "compile" kode TypeScript menjadi CloudFormation template, lalu deploy melalui CloudFormation. Jadi CDK = abstraksi di atas CloudFormation.

### Rekomendasi untuk Developer

Jika kamu developer yang terbiasa dengan TypeScript/Python, **CDK** adalah pilihan terbaik. Kamu bisa menggunakan IDE, autocomplete, dan tooling yang sudah familiar. CloudFormation YAML lebih cocok jika kamu sudah terbiasa dengan deklaratif template atau mengelola infrastruktur yang sudah ada dalam format ini.`,
            keyTakeaway: "Infrastructure as Code (IaC) = definisikan infrastruktur dalam kode. CloudFormation (YAML) dan CDK (TypeScript/Python) — repeatable, version-controlled, reviewable.",
          },
          {
            type: "casestudy",
            title: "Studi Kasus: Arsitektur AWS untuk Startup Indonesia",
            body: `Untuk menutup kursus ini, mari kita lihat bagaimana semua konsep yang sudah kamu pelajari bersatu dalam arsitektur nyata. Kita akan merancang arsitektur AWS lengkap untuk "KelasOnline" — platform kursus online mirip Clarise.

### Persyaratan KelasOnline

- 50.000 pengguna aktif bulanan, target 500.000 dalam setahun
- Fitur: streaming video kursus, kuis interaktif, forum diskusi, sertifikat digital
- Regulasi: data pengguna Indonesia harus diamankan
- Budget: startup early-stage (efisien tapi siap scale)

### Arsitektur yang Dirancang

**Region:** ap-southeast-1 (Singapura) — layanan lengkap, dekat Indonesia

**Networking (VPC):**
- VPC: 10.0.0.0/16
- 2 AZ (1a dan 1b) dengan public + private subnet di masing-masing
- NAT Gateway di public subnet untuk internet access dari private subnet
- VPC Endpoints untuk S3 dan DynamoDB (hemat biaya NAT)

**Compute:**
- ALB di public subnet — HTTPS termination, SSL dari ACM (gratis)
- EC2 Auto Scaling Group di private subnet — Next.js app (t3.medium, min 2, max 8)
- Lambda untuk: resize thumbnail, generate sertifikat PDF, kirim email notifikasi, process payment webhook

**Storage & Database:**
- S3: video kursus (S3 Standard → S3-IA setelah 6 bulan), gambar profil, sertifikat PDF
- RDS PostgreSQL Multi-AZ: data pengguna, kursus, enrollment, progress, sertifikat
- DynamoDB: session store, real-time quiz scores, forum activity feed
- ElastiCache Redis: cache hasil query populer (course listing, leaderboard), session store

**Content Delivery:**
- CloudFront: distribusi video kursus + static assets ke edge locations Indonesia
- Route 53: DNS management, health checks, failover

**Keamanan:**
- IAM: role terpisah untuk EC2, Lambda, dan CI/CD pipeline
- Security Groups: 4 tier (ALB → App → DB → Cache) — least privilege
- KMS: enkripsi RDS, S3, dan EBS
- CloudTrail: audit log semua API calls
- WAF: perlindungan dari SQL injection, XSS di level ALB

**Monitoring:**
- CloudWatch: metrics, alarms (CPU, error rate, latency), dashboards
- CloudWatch Logs: application logs, VPC Flow Logs
- Billing Alerts: notifikasi jika pengeluaran melebihi budget

**CI/CD:**
- GitHub → CodePipeline → CodeBuild → Deploy ke EC2 via CodeDeploy
- Atau: GitHub Actions → build Docker image → push ke ECR → deploy ke ECS

Arsitektur ini dimulai dengan biaya sekitar **$200-400/bulan** di awal dan bisa scale ke jutaan pengguna tanpa redesign fundamental. Ini adalah kekuatan merancang arsitektur yang benar sejak awal.`,
            keyTakeaway: "Arsitektur AWS production menggabungkan semua pilar: VPC (networking), EC2+Lambda (compute), S3+RDS+DynamoDB (storage), CloudFront (CDN), IAM+SG (security), CloudWatch (monitoring).",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Architecture Center — Reference Architectures", url: "https://aws.amazon.com/architecture/" },
              { type: "YOUTUBE", title: "Amazon Web Services — Well-Architected Labs", url: "https://www.youtube.com/watch?v=a9__D53WsUs" },
            ],
          },
          {
            type: "lesson",
            title: "AWS Transit Gateway: Hub Jaringan untuk Arsitektur Multi-VPC",
            body: `Semakin besar organisasi, semakin banyak VPC yang mereka miliki. Sebuah perusahaan bisa punya 10-50 VPC: development, staging, production, masing-masing tim. Bagaimana cara menghubungkan semuanya? Jawabannya adalah **AWS Transit Gateway**.

### Masalah: VPC Peering Tidak Scalable

AWS VPC Peering memungkinkan dua VPC terhubung langsung. Tapi VPC Peering bersifat **point-to-point** — untuk menghubungkan 10 VPC, kamu perlu membuat 45 koneksi peering (n*(n-1)/2). Ini tidak scalable dan sulit dikelola.

### Solusi: Transit Gateway (Hub-and-Spoke)

**AWS Transit Gateway** adalah router pusat (hub) yang menghubungkan semua VPC (spokes) dan jaringan on-premise melalui satu titik koneksi. Dengan Transit Gateway:

- Setiap VPC cukup terhubung ke Transit Gateway **sekali** — otomatis bisa berkomunikasi dengan semua VPC lain yang terhubung ke TG yang sama
- 10 VPC → 10 koneksi (bukan 45)
- 50 VPC → 50 koneksi (bukan 1.225!)

### Fitur Unggulan Transit Gateway

**1. Multi-Account Support**
Transit Gateway bisa digunakan di beberapa akun AWS. Kamu bisa memiliki TG di akun pusat (Network account), lalu VPC di akun berbeda (Dev, Prod) bisa attach ke TG yang sama. Ini adalah fondasi untuk **AWS Landing Zone** dan multi-account strategy.

**2. Route Tables Terisolasi**
Transit Gateway mendukung multiple route tables. Kamu bisa mengisolasi traffic: Production VPC bisa mengakses semua VPC, Development VPC hanya bisa mengakses VPC development lain. Ini memberikan kontrol keamanan granular.

**3. Integrasi VPN & Direct Connect**
Transit Gateway bisa terhubung ke:
- **VPN Site-to-Site** — koneksi ke kantor cabang via internet terenkripsi
- **AWS Direct Connect** — koneksi dedicated ke on-premise (lebih stabil, lebih cepat)
- **Peering antar Transit Gateway** — hubungkan VPC di region berbeda atau akun berbeda

### Contoh Arsitektur Multi-VPC

\`\`\`
                    ┌──────────────────┐
                    │  Transit Gateway  │
                    │    (us-east-1)    │
                    └────────┬─────────┘
                    ┌───────┼───────┐
                    │       │       │
              ┌─────┴──┐ ┌──┴────┐ ┌┴─────┐
              │Dev VPC │ │Stg   │ │Prod  │
              │        │ │VPC   │ │VPC   │
              └────────┘ └──────┘ └──────┘
                              │
                    ┌─────────┴─────────┐
                    │  VPN Connection   │
                    │  (Kantor Cabang)  │
                    └───────────────────┘
\`\`\`

Transit Gateway adalah komponen networking tingkat lanjut yang penting untuk dipahami saat kamu bekerja di perusahaan dengan banyak tim dan environment.`,
            keyTakeaway: "Transit Gateway adalah router pusat untuk menghubungkan banyak VPC dan jaringan on-premise. Menggantikan VPC Peering yang tidak scalable — dari 45 koneksi (10 VPC) jadi 10 koneksi.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Transit Gateway — AWS Docs", url: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html" },
              { type: "YOUTUBE", title: "AWS — Transit Gateway Overview", url: "https://www.youtube.com/watch?v=Z0o8e6eKj8k" },
            ],
          },
          {
            type: "lesson",
            title: "AWS WAF & Shield: Melindungi Aplikasi Web dari Serangan",
            body: `Keamanan aplikasi web tidak cukup hanya dengan IAM dan Security Groups. Serangan seperti SQL injection, Cross-Site Scripting (XSS), dan DDoS bisa menembus lapisan keamanan dasar. AWS menyediakan dua layanan untuk melindungi aplikasi webmu: **AWS WAF** dan **AWS Shield**.

### AWS WAF — Web Application Firewall

**AWS WAF (Web Application Firewall)** melindungi aplikasi web dari serangan umum di layer HTTP/HTTPS. WAF memonitor dan memfilter request HTTP yang masuk ke ALB, CloudFront, atau API Gateway.

**Cara Kerja:**
Kamu membuat **Web ACL** (Access Control List) yang berisi rules untuk mengizinkan, memblokir, atau menghitung (count) request berdasarkan kondisi tertentu:

- **IP Match** — blokir request dari IP address tertentu (misalnya IP dari negara yang tidak kamu layani)
- **String Match** — blokir request yang mengandung pola tertentu (misalnya \`DROP TABLE\` untuk SQL injection)
- **Rate-based Rule** — batasi jumlah request dari satu IP (misalnya max 2000 request per 5 menit) — ini sangat efektif untuk mencegah brute force attack
- **SQL Injection Match** — blokir request yang mengandung pola SQL injection
- **XSS Match** — blokir request yang mengandung Cross-Site Scripting payload
- **Managed Rules** — aturan siap pakai dari AWS dan pihak ketiga (misalnya OWASP Top 10, bot control, IP reputation lists)

**Contoh Rule:**
\`\`\`
Web ACL: "Protect-Portal"
Rule 1: Blokir SQL injection dari body request dan query string
Rule 2: Blokir XSS dari semua header dan parameter
Rule 3: Rate limit 3000 request per IP per 5 menit
Rule 4: Blokir IP dari negara yang tidak dilayani
\`\`\`

### AWS Shield — DDoS Protection

**AWS Shield** adalah layanan proteksi DDoS (Distributed Denial of Service) yang terintegrasi secara otomatis dengan CloudFront, Route 53, dan ALB.

**Shield Standard (Gratis):**
- Aktif secara otomatis untuk semua pelanggan AWS
- Melindungi dari serangan DDoS layer 3/4 yang umum (SYN flood, UDP flood)
- Deteksi dan mitigasi otomatis

**Shield Advanced ($3.000/bulan):**
- Proteksi DDoS tambahan untuk layer 7 (HTTP/HTTPS)
- DDoS cost protection — jika biaya AWS naik akibat serangan DDoS, AWS menggantinya
- Akses 24/7 ke AWS DDoS Response Team (DRT)
- Real-time visibility dan reporting
- Perlindungan untuk EC2, ELB, CloudFront, Route 53, Global Accelerator

### Arsitektur Proteksi Berlapis

\`\`\`
Internet → AWS Shield (DDoS protection)
         → AWS WAF (Web ACL: SQL injection, XSS filtering)
         → CloudFront (CDN + DDoS absorpsi)
         → ALB (load balancing)
         → EC2 Auto Scaling (app servers)
         → Security Groups (firewall instance level)
\`\`\`

Setiap lapisan memfilter traffic yang berbahaya. Shield menangani DDoS skala besar, WAF memfilter request berbahaya, CloudFront menyerap traffic spike, dan Security Groups membatasi akses ke resource sensitif.`,
            keyTakeaway: "WAF melindungi dari SQL injection, XSS, dan serangan HTTP lainnya di ALB/CloudFront. Shield memberikan proteksi DDoS (Standard gratis, Advanced $3k/bulan dengan support tim response).",
            sources: [
              { type: "DOCUMENTATION", title: "AWS WAF — AWS Docs", url: "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html" },
              { type: "DOCUMENTATION", title: "AWS Shield — AWS Docs", url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html" },
            ],
          },
          {
            type: "lesson",
            title: "AWS Site-to-Site VPN & Direct Connect: Hybrid Cloud Connectivity",
            body: `Tidak semua perusahaan bisa langsung pindah 100% ke cloud. Banyak perusahaan yang sudah punya data center sendiri (on-premise) dan ingin menghubungkannya dengan AWS secara aman. Di sinilah **VPN** dan **Direct Connect** berperan.

### AWS Site-to-Site VPN

VPN (Virtual Private Network) menghubungkan data center on-premise dengan VPC di AWS melalui **internet publik** dengan koneksi terenkripsi.

\`\`\`
On-Premise Data Center
    ┌──────────────────┐
    │    Customer GW    │─── Internet ───→ AWS
    └──────────────────┘       │       ┌──────────────┐
                               │       │  Virtual GW   │── VPC
                               └──────→│  (VGW)        │
                                        └──────────────┘
\`\`\`

**Komponen yang diperlukan:**
1. **Customer Gateway (CGW)** — representasi router on-premise di AWS
2. **Virtual Private Gateway (VGW)** — gerbang VPN di sisi AWS yang menempel ke VPC
3. **VPN Connection** — koneksi terenkripsi antara CGW dan VGW (menggunakan IPSec)
4. **Route Propagation** — route otomatis dari VGW ke Route Tables VPC

**Kelebihan:** Biaya rendah (hanya bayar per koneksi), setup cepat dalam hitungan jam.
**Kekurangan:** Koneksi melewati internet publik — latency dan bandwidth tidak terjamin.

### AWS Direct Connect

**Direct Connect** adalah koneksi **fisik dedicated** dari data center on-premise langsung ke AWS, tanpa melewati internet publik sama sekali.

\`\`\`
On-Premise Data Center
    ┌──────────────────┐
    │    Router        │─── Kabel Fiber Dedicated ──→ AWS Direct Connect Location
    └──────────────────┘                                    │
                                                      ┌─────┴──────┐
                                                      │ Direct      │── VPC
                                                      │ Connect GW  │
                                                      └────────────┘
\`\`\`

**Kelebihan:**
- **Bandwidth konsisten** — mulai dari 50 Mbps hingga 100 Gbps
- **Latency rendah** — karena tidak melewati internet
- **Koneksi stabil** — tidak terpengaruh gangguan ISP publik
- **Biaya lebih murah** untuk transfer data volume besar dibandingkan internet

**Kekurangan:** 
- Setup lebih kompleks (butuh colocation di Direct Connect location)
- Biaya awal tinggi (sewa serat optik)
- Butuh waktu berminggu-minggu untuk provisioning

### Kapan Menggunakan Mana?

| Skenario | Pilihan |
|----------|---------|
| Startup kecil, perlu koneksi cepat & murah | Site-to-Site VPN |
| Migrasi data besar (TB/PB) sekali waktu | AWS Snowball + Direct Connect |
| Aplikasi real-time dengan SLA ketat | Direct Connect |
| Hybrid cloud untuk DR (Disaster Recovery) | VPN + Direct Connect (redundan) |
| Regulatory compliance (OJK, GDPR) | Direct Connect |

Best practice: untuk production, gunakan **keduanya** sebagai redundant — VPN sebagai backup jika Direct Connect putus.`,
            keyTakeaway: "Site-to-Site VPN menghubungkan on-premise ke AWS via internet (murah, cepat setup). Direct Connect adalah koneksi fisik dedicated (bandwidth terjamin, latency rendah). Untuk production, gunakan keduanya secara redundant.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Site-to-Site VPN", url: "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html" },
              { type: "DOCUMENTATION", title: "AWS Direct Connect", url: "https://aws.amazon.com/directconnect/" },
            ],
          },
          {
            type: "lesson",
            title: "VPC Peering & VPC Endpoints: Koneksi Antar VPC Tanpa Internet",
            body: `Dalam arsitektur modern, perusahaan sering memiliki banyak VPC — misalnya VPC untuk production, staging, development, dan VPC terpisah untuk database atau microservices. Bagaimana cara menghubungkan VPC-VPC ini?

### VPC Peering: Menghubungkan Dua VPC

**VPC Peering** adalah koneksi jaringan langsung (direct network route) antara dua VPC. Traffic antar VPC tetap berada di dalam jaringan AWS — tidak melewati internet publik.

\`\`\`
VPC A (10.0.0.0/16) ←─── Peering Connection ───→ VPC B (172.16.0.0/16)
    │                                                    │
    ├─ EC2 App                                           ├─ RDS Database
    └─ ALB                                               └─ ElastiCache
\`\`\`

**Aturan Penting VPC Peering:**
1. **Tidak transitive** — jika VPC A ter-peering dengan VPC B, dan VPC B ter-peering dengan VPC C, maka VPC A TIDAK bisa otomatis berkomunikasi dengan VPC C. Kamu harus membuat peering terpisah A-C.
2. **CIDR tidak boleh overlap** — IP range kedua VPC harus berbeda, jika ada overlap maka peering gagal dibuat.
3. **Route Tables harus diupdate** — setelah peering dibuat, kamu harus menambahkan route ke Route Table masing-masing VPC yang mengarah ke Peering Connection.
4. **Cross-account & cross-region** — VPC Peering mendukung koneksi antar akun AWS dan antar Region berbeda.

### VPC Endpoints: Akses Layanan AWS Tanpa Internet

**VPC Endpoints** memungkinkan resource di VPC (EC2, Lambda) mengakses layanan AWS (S3, DynamoDB, SQS, SNS) **tanpa melalui Internet Gateway atau NAT Gateway**. Traffic tetap di dalam jaringan AWS.

Ada dua jenis VPC Endpoints:

#### 1. Gateway Endpoints (untuk S3 & DynamoDB)

\`\`\`
Private Subnet
    ┌──────┐
    │ EC2  │──→ Gateway Endpoint ──→ S3 Bucket
    └──────┘    (via Route Table)
\`\`\`

- Ditambahkan sebagai **target di Route Table** (seperti NAT Gateway atau IGW)
- **Gratis** — tidak ada biaya per GB
- Hanya untuk **S3** dan **DynamoDB**
- Regional — tidak bisa cross-region

#### 2. Interface Endpoints (untuk 100+ layanan AWS)

\`\`\`
Private Subnet
    ┌──────┐
    │ EC2  │──→ Interface Endpoint (ENI) ──→ SQS / SNS / ECS / dll
    └──────┘    (Private IP di subnet)
\`\`\`

- Menggunakan **AWS PrivateLink** — membuat Elastic Network Interface (ENI) dengan IP privat di subnetmu
- Mendukung 100+ layanan AWS: SQS, SNS, ECS, ECR, CloudWatch, Lambda, API Gateway, dll
- **Berbayar** — biaya per jam per AZ + biaya per GB data processed
- Bisa cross-account via PrivateLink

### Best Practice Arsitektur

1. **Gunakan VPC Endpoints untuk semua akses layanan AWS** — ini lebih aman dan hemat biaya (tidak perlu NAT Gateway untuk akses S3).
2. **VPC Peering untuk koneksi VPC-ke-VPC** dalam organisasi yang sama — ini adalah solusi paling sederhana dan aman.
3. **Untuk arsitektur multi-akun besar**, pertimbangkan **AWS Transit Gateway** (yang sudah kita bahas sebelumnya) — karena mendukung transitive routing dan ribuan VPC.`,
            keyTakeaway: "VPC Peering menghubungkan 2 VPC secara langsung (non-transitif, CIDR tidak boleh overlap). VPC Endpoints (Gateway untuk S3/DynamoDB gratis, Interface untuk 100+ layanan via PrivateLink) memungkinkan akses ke layanan AWS tanpa internet.",
            sources: [
              { type: "DOCUMENTATION", title: "VPC Peering — AWS Docs", url: "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html" },
              { type: "DOCUMENTATION", title: "VPC Endpoints — AWS Docs", url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html" },
            ],
          },
          {
            type: "summary",
            title: "Rangkuman: Jaringan, Keamanan & Arsitektur AWS",
            body: `Selamat! Kamu sudah menyelesaikan seluruh kursus AWS untuk Developer. Mari rekapitulasi modul terakhir dan seluruh kursus.

### Modul 4: Jaringan & Arsitektur

**Amazon VPC:** Jaringan privat virtual — bagi menjadi public subnet (ALB) dan private subnet (App, DB). Deploy di minimal 2 AZ.

**Route Tables, IGW, NAT GW:** IGW untuk akses internet, NAT GW untuk private subnet akses ke internet satu arah, VPC Endpoints untuk akses layanan AWS tanpa internet.

**Security Groups vs NACLs:** SG = firewall stateful per instance (allow only). NACL = firewall stateless per subnet (allow & deny). Gunakan keduanya.

**Route 53:** DNS managed — routing policies (simple, weighted, latency, failover, geolocation).

**CloudFront:** CDN global — 400+ edge locations, HTTPS gratis, DDoS protection.

**Well-Architected Framework:** 6 pilar — Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability.

**CloudWatch:** Monitoring — Metrics, Alarms, Logs, Dashboards.

**IaC:** CloudFormation (YAML) atau CDK (TypeScript/Python) untuk repeatable infrastructure.

### Ringkasan Seluruh Kursus

| Modul | Layanan Utama | Takeaway |
|-------|--------------|----------|
| 1. Fondasi & IAM | IAM, Console, CLI | Keamanan dimulai dari IAM yang benar |
| 2. Komputasi | EC2, Lambda | EC2 untuk 24/7, Lambda untuk event-driven |
| 3. Storage & DB | S3, RDS, DynamoDB | Layanan yang tepat untuk data yang tepat |
| 4. Jaringan | VPC, Route 53, CloudFront | Arsitektur 3-tier dengan defense in depth |

### Langkah Selanjutnya

1. **Praktik di AWS Free Tier** — buat akun, deploy EC2, buat S3 bucket, setup VPC
2. **Kejar sertifikasi** — AWS Cloud Practitioner (pemula) → Solutions Architect Associate
3. **Bangun proyek nyata** — deploy aplikasi Next.js di EC2 + RDS + S3 + CloudFront
4. **Pelajari lebih lanjut**: ECS/EKS (container), Step Functions (orchestration), SQS/SNS (messaging)

Kamu sekarang punya fondasi yang sangat kuat untuk membangun dan mengelola infrastruktur di AWS. Selamat dan terus belajar! 🚀`,
            keyTakeaway: "Kursus lengkap: IAM (keamanan) → EC2/Lambda (komputasi) → S3/RDS/DynamoDB (storage) → VPC/CloudFront (jaringan). Arsitektur 3-tier dengan defense in depth adalah standar industri.",
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang VPC, Route 53 & Arsitektur AWS",
            body: "Kuis akhir kursus ini menguji pemahamanmu tentang VPC, Security Groups vs NACLs, Route 53, CloudFront, Well-Architected Framework, dan arsitektur AWS secara keseluruhan.",
            quizBank: [
              {
                id: "q1",
                question: "Apa perbedaan utama antara Internet Gateway (IGW) dan NAT Gateway di VPC?",
                options: [
                  { id: "a", text: "IGW gratis, NAT Gateway berbayar" },
                  { id: "b", text: "IGW memungkinkan traffic dua arah (inbound & outbound) ke internet, NAT Gateway hanya outbound dari private subnet" },
                  { id: "c", text: "IGW untuk IPv4, NAT Gateway untuk IPv6" },
                  { id: "d", text: "IGW bekerja di level subnet, NAT Gateway di level instance" },
                ],
                correctAnswer: "b",
                explanation: "Internet Gateway (IGW) menghubungkan VPC ke internet dua arah — resource di public subnet bisa menerima koneksi dari internet dan mengirim ke internet. NAT Gateway hanya mengizinkan resource di private subnet untuk menginisiasi koneksi keluar (outbound) ke internet, tapi mencegah internet mengakses resource tersebut.",
                difficulty: "medium",
              },
              {
                id: "q2",
                question: "Apa perbedaan utama antara Security Group dan Network ACL (NACL)?",
                options: [
                  { id: "a", text: "Security Group stateless, NACL stateful" },
                  { id: "b", text: "Security Group stateful (allow only), NACL stateless (allow & deny)" },
                  { id: "c", text: "Tidak ada perbedaan — keduanya sama" },
                  { id: "d", text: "Security Group di level subnet, NACL di level instance" },
                ],
                correctAnswer: "b",
                explanation: "Security Groups bersifat stateful (response otomatis diizinkan) dan hanya mendukung allow rules — tidak bisa secara eksplisit menolak traffic. NACL bersifat stateless (inbound & outbound rules independen) dan mendukung allow & deny rules. SG di level instance, NACL di level subnet. Gunakan keduanya untuk defense in depth.",
                difficulty: "medium",
              },
              {
                id: "q3",
                question: "Routing policy Route 53 mana yang PALING TEPAT untuk canary deployment (mengarahkan 10% traffic ke server baru)?",
                options: [
                  { id: "a", text: "Latency-based routing" },
                  { id: "b", text: "Weighted routing" },
                  { id: "c", text: "Geolocation routing" },
                  { id: "d", text: "Simple routing" },
                ],
                correctAnswer: "b",
                explanation: "Weighted routing policy membagi traffic berdasarkan bobot (weight). Contoh: 90% ke server lama (weight 90), 10% ke server baru (weight 10) — ini adalah canary deployment. Latency-based mengarahkan ke region dengan latensi terendah, geolocation berdasarkan lokasi geografis, simple hanya ke satu target.",
                difficulty: "hard",
              },
              {
                id: "q4",
                question: "Apa manfaat utama menggunakan CloudFront di depan S3 bucket untuk website statis?",
                options: [
                  { id: "a", text: "Mengubah website statis menjadi dinamis" },
                  { id: "b", text: "Menyediakan HTTPS gratis, caching di edge locations, dan DDoS protection via AWS Shield" },
                  { id: "c", text: "Mengurangi biaya penyimpanan S3" },
                  { id: "d", text: "CloudFront bisa menjalankan PHP dan Node.js" },
                ],
                correctAnswer: "b",
                explanation: "CloudFront memberikan tiga keuntungan utama: (1) HTTPS gratis dari AWS Certificate Manager (ACM), (2) caching konten di 400+ edge locations global sehingga website lebih cepat, dan (3) proteksi DDoS otomatis dari AWS Shield. S3 tetap sebagai origin storage, CloudFront sebagai CDN di depannya.",
                difficulty: "easy",
              },
              {
                id: "q5",
                question: "Dalam AWS Well-Architected Framework, apa yang dimaksud dengan pilar 'Reliability'?",
                options: [
                  { id: "a", text: "Kemampuan sistem untuk pulih dari gangguan dan memenuhi permintaan yang berfluktuasi" },
                  { id: "b", text: "Mengoptimalkan biaya dengan memilih instance type yang tepat" },
                  { id: "c", text: "Meminimalkan dampak lingkungan dari operasi cloud" },
                  { id: "d", text: "Mengotomasi infrastruktur dengan Infrastructure as Code" },
                ],
                correctAnswer: "a",
                explanation: "Pilar Reliability berfokus pada kemampuan workload untuk pulih dari kegagalan infrastruktur atau service, dan memenuhi permintaan yang berubah-ubah. Praktik utamanya: test recovery procedures, scale horizontally (Auto Scaling + multi-AZ), dan stop guessing capacity. Operational Excellence (bukan Reliability) mencakup automation via IaC.",
                difficulty: "medium",
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
