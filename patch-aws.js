const fs = require('fs');
let content = fs.readFileSync('apps/app/scripts/seed-devops-aws-premium.ts', 'utf-8');
const summaryParts = content.split('          {\n            type: "summary",');

if (summaryParts.length === 5) {
  // Modul 2 needs 4 slides (currently 6 slides: 4 lessons, 1 challenge, 1 summary, 1 quiz = 7 slides. We need to add 3 to make it 10)
  const m2Slides = `          {
            type: "lesson",
            title: "Auto Scaling Groups (ASG)",
            body: \`Bagaimana jika aplikasimu mendadak viral dan traffic naik 100x lipat? Jika kamu menggunakan satu EC2 instance, servermu pasti akan crash (Down).

Di AWS, kita menggunakan **Auto Scaling Groups (ASG)** untuk menangani hal ini secara otomatis.

### Cara Kerja ASG:
1. **Minimum Size**: Kamu atur misal minimal selalu ada 2 server yang berjalan.
2. **Maximum Size**: Kamu atur batas maksimal server, misal 10 server (agar tagihan tidak jebol).
3. **Scaling Policy**: Kamu atur kondisi, contoh "Jika rata-rata CPU > 70% selama 5 menit, tambah 1 server baru."

ASG akan secara otomatis memantau metrik (melalui CloudWatch) dan **me-launch** EC2 instance baru jika dibutuhkan (Scale Out), serta **menghapus** EC2 instance jika traffic sudah sepi (Scale In).\`,
            keyTakeaway: "Auto Scaling Groups (ASG) memastikan aplikasimu selalu memiliki jumlah EC2 instance yang tepat untuk melayani beban traffic secara dinamis dan efisien secara biaya.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon EC2 Auto Scaling", url: "https://aws.amazon.com/ec2/autoscaling/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS Elastic Beanstalk (PaaS)",
            body: \`Membuat EC2, mengatur Load Balancer, lalu menghubungkannya ke Auto Scaling Group bisa menjadi hal yang sangat rumit dan memakan waktu bagi developer yang hanya ingin men-deploy kodenya.

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

Ini adalah cara tercepat bagi developer pemula untuk men-deploy aplikasi skalabel ke AWS tanpa perlu mendalami DevOps secara mendalam.\`,
            keyTakeaway: "Elastic Beanstalk mengotomatiskan pembuatan dan konfigurasi infrastruktur (EC2, ALB, ASG), memungkinkan developer fokus pada penulisan kode.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Elastic Beanstalk", url: "https://aws.amazon.com/elasticbeanstalk/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS Fargate: Serverless Container",
            body: \`Jika kamu menggunakan Docker, menjalankan container di atas EC2 (disebut Amazon ECS dengan EC2) berarti kamu tetap harus merawat OS di dalam EC2 tersebut (patching, security update).

Bagaimana jika kamu hanya ingin menjalankan Container tanpa harus mengurus server virtual sama sekali?
Gunakan **AWS Fargate**.

Fargate adalah *Serverless Compute Engine* untuk container.
Kamu hanya menentukan:
- Image Docker yang akan dijalankan
- Berapa banyak CPU yang dibutuhkan (misal 1 vCPU)
- Berapa banyak RAM yang dibutuhkan (misal 2GB)

Fargate akan mengurus eksekusi containernya. Kamu tidak perlu tahu di server mana container itu berjalan, dan kamu hanya membayar per detik saat container itu hidup. Sangat cocok untuk *microservices* dan pekerjaan *batch processing*.\`,
            keyTakeaway: "AWS Fargate memungkinkan kamu menjalankan Docker container secara serverless tanpa perlu memanajemen underlying EC2 instances.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Fargate", url: "https://aws.amazon.com/fargate/" }
            ]
          },
`;
  summaryParts[1] = m2Slides + '          {\n            type: "summary",' + summaryParts[1];

  // Modul 3 needs 3 slides
  const m3Slides = `          {
            type: "lesson",
            title: "Amazon Aurora: RDBMS Skala Enterprise",
            body: \`Selain menggunakan engine standar MySQL dan PostgreSQL di RDS, AWS juga memiliki database engine buatan mereka sendiri: **Amazon Aurora**.

Aurora adalah database relational yang kompatibel penuh dengan MySQL dan PostgreSQL, namun memiliki arsitektur storage terdistribusi.

**Kelebihan Aurora:**
- **Performa Tinggi**: 5x lebih cepat dari MySQL standar, 3x lebih cepat dari PostgreSQL standar.
- **Auto-Scaling Storage**: Storage Aurora akan membesar otomatis seiring pertumbuhan datamu, hingga 128TB. Kamu tidak perlu memprediksi dan mem-provisioning storage di awal.
- **Replikasi Super Cepat**: Memiliki arsitektur storage yang terpisah dari komputasi, sehingga membuat Read Replica hanya memakan waktu milidetik.
- **Aurora Serverless**: Varian Aurora yang dapat mati saat tidak ada request dan menyala instan saat ada query masuk. Cocok untuk environment testing atau aplikasi yang tidak stabil traffic-nya.\`,
            keyTakeaway: "Amazon Aurora adalah opsi premium di RDS untuk MySQL/PostgreSQL yang menawarkan performa level enterprise, storage auto-scaling, dan fitur Serverless.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon Aurora", url: "https://aws.amazon.com/rds/aurora/" }
            ]
          },
          {
            type: "lesson",
            title: "Amazon ElastiCache: In-Memory Data Store",
            body: \`Saat aplikasimu (misalnya toko online) memiliki jutaan traffic, query ke database (RDS) akan memakan waktu dan membuat server CPU RDS memuncak tinggi 100%.

Solusinya adalah melakukan **Caching** untuk data yang sering diakses (seperti halaman produk atau session pengguna). Di AWS, layanan caching terkelola adalah **Amazon ElastiCache**.

ElastiCache mendukung dua engine open-source terpopuler:
1. **Redis**: In-memory data store sangat cepat yang mensupport tipe data kompleks (Lists, Sets, Hashes) dan persistensi ke disk.
2. **Memcached**: Sistem caching object memori terdistribusi murni. Lebih simpel, digunakan murni sebagai cache.

**Cara Kerja:**
1. User me-request halaman produk.
2. Aplikasi mengecek ElastiCache (Redis).
3. Jika ada (Cache Hit), kembalikan data dalam <1 milidetik.
4. Jika tidak ada (Cache Miss), query ke RDS (memakan waktu 50ms), lalu simpan hasilnya ke Redis, kemudian kembalikan ke user.\`,
            keyTakeaway: "ElastiCache (Redis/Memcached) digunakan untuk meningkatkan performa aplikasi dengan menyimpan data yang sering diakses ke dalam memori berkecepatan tinggi.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon ElastiCache", url: "https://aws.amazon.com/elasticache/" }
            ]
          },
          {
            type: "lesson",
            title: "S3 Object Lock & Versioning",
            body: \`Amazon S3 sangat populer untuk menyimpan file, namun bagaimana jika terjadi insiden human error (developer salah menghapus file) atau serangan ransomware?

Dua fitur terpenting S3 untuk proteksi data:

### 1. S3 Versioning
Jika fitur ini diaktifkan, setiap kali ada orang me-replace (menimpa) file \`dokumen.pdf\` dengan versi baru, S3 tidak akan menghapus versi lama. S3 akan menyimpan kedua versi tersebut. Jika ternyata versi baru corrupt, kamu bisa dengan mudah me-restore versi sebelumnya.

### 2. S3 Object Lock (WORM)
Fitur *Write-Once-Read-Many (WORM)*. S3 Object Lock bisa memblokir file agar **TIDAK BISA** dihapus atau diubah oleh siapapun, *bahkan oleh root account AWS sekalipun*, untuk jangka waktu tertentu (misalnya selama 5 tahun).
Sangat penting untuk kepatuhan regulasi (seperti data perbankan) dan mencegah data dari kehancuran akibat hacker.\`,
            keyTakeaway: "Gunakan S3 Versioning untuk melindungi file dari modifikasi/penghapusan tidak sengaja. Gunakan Object Lock untuk memastikan file tidak bisa dihapus oleh siapapun.",
            sources: [
              { type: "DOCUMENTATION", title: "Protecting Data in S3", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html" }
            ]
          },
`;
  summaryParts[2] = m3Slides + '          {\n            type: "summary",' + summaryParts[2];

  // Modul 4 needs 3 slides
  const m4Slides = `          {
            type: "lesson",
            title: "Amazon CloudFront: Content Delivery Network (CDN)",
            body: \`Misalkan kamu memiliki bucket S3 di region *us-east-1* (Amerika Serikat) berisi video tutorial. Jika user dari Indonesia mendownload video tersebut, prosesnya akan sangat lambat karena data harus melintasi samudra Pasifik.

Untuk mempercepat, kita menggunakan **Amazon CloudFront** (layanan CDN AWS).

### Cara Kerja CloudFront:
1. CloudFront memiliki ratusan **Edge Locations** yang tersebar di seluruh dunia (termasuk di Jakarta).
2. Saat user dari Indonesia me-request video, request tidak langsung pergi ke Amerika. Request pergi ke Edge Location di Jakarta.
3. Jika video belum ada di Jakarta (Cache Miss), Edge akan mengambilnya dari S3 Amerika (Origin) lalu menyimpannya di Jakarta (Caching).
4. Ketika user lain dari Indonesia me-request video yang sama, Edge akan langsung mengirimkan video yang ada di Jakarta (Cache Hit). Hasilnya: kecepatan download 10x lebih instan!

CloudFront juga bisa digunakan di depan Application Load Balancer dan API Gateway, bukan hanya S3.\`,
            keyTakeaway: "Amazon CloudFront (CDN) mempercepat akses ke file statis dan dinamis dengan cara men-cache konten tersebut di Edge Locations yang dekat dengan lokasi geografis pengguna akhir.",
            sources: [
              { type: "DOCUMENTATION", title: "Amazon CloudFront", url: "https://aws.amazon.com/cloudfront/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS CloudTrail: Audit & Governance",
            body: \`Dalam tim perusahaan berskala menengah hingga besar, masalah klasik yang sering terjadi adalah: *"Siapa yang menghapus database produksi kemarin jam 3 pagi?!"*

Di AWS, setiap klik di Management Console, setiap command di CLI, dan setiap panggilan API akan tercatat secara permanen di **AWS CloudTrail**.

CloudTrail bertindak layaknya "kamera CCTV" untuk seluruh akun AWS-mu. Log CloudTrail merekam informasi penting:
- **Siapa** (Identitas IAM user/role)
- **Kapan** (Timestamp)
- **Apa** (Aksi apa yang dilakukan, misal \`DeleteDBInstance\`)
- **Dari mana** (IP address asal)

Best practice keamanan: Simpan log CloudTrail di sebuah S3 bucket sentral yang terisolasi dan pasang **S3 Object Lock** agar log tersebut tidak bisa dihapus oleh pihak manapun.\`,
            keyTakeaway: "AWS CloudTrail merekam seluruh aktivitas API pada akun AWS (Siapa melakukan apa dan kapan), esensial untuk keperluan audit, keamanan, dan troubleshooting.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS CloudTrail", url: "https://aws.amazon.com/cloudtrail/" }
            ]
          },
          {
            type: "lesson",
            title: "AWS Systems Manager (SSM) Parameter Store & Secrets Manager",
            body: \`Di mana kita harus menyimpan kredensial (username & password database) dan *environment variables* aplikasi? 

Menyimpannya dalam plain text di kode (GitHub) sangat terlarang.

AWS menawarkan dua solusi utama:

### 1. Systems Manager (SSM) Parameter Store
Layanan gratis untuk menyimpan konfigurasi teks (misal URL frontend) dan password (yang otomatis dienkripsi dengan KMS).
Kamu dapat memanggil API \`GetParameter\` dari kode aplikasimu.

### 2. AWS Secrets Manager
Layanan premium berbayar. Selain untuk menyimpan rahasia dengan aman, fitur unggulan Secrets Manager adalah **Automatic Rotation**.
Fitur ini dapat mengubah password database secara otomatis setiap 30 hari tanpa campur tangan manusia dan tanpa menghentikan aplikasimu (Zero Downtime).

**Pilih mana?** Jika butuh penyimpanan konfigurasi simpel dan gratis, gunakan Parameter Store. Jika butuh rotasi password otomatis untuk compliance perusahaan tinggi, gunakan Secrets Manager.\`,
            keyTakeaway: "Gunakan SSM Parameter Store untuk konfigurasi umum dan Secrets Manager untuk rotasi password otomatis yang lebih canggih dan memenuhi kepatuhan keamanan enterprise.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS Secrets Manager", url: "https://aws.amazon.com/secrets-manager/" }
            ]
          },
`;
  summaryParts[3] = m4Slides + '          {\n            type: "summary",' + summaryParts[3];
  
  const newContent = summaryParts.join('          {\n            type: "summary",');
  fs.writeFileSync('apps/app/scripts/seed-devops-aws-premium.ts', newContent);
  console.log('AWS premium updated!');
} else {
  console.log('summaryParts length = ' + summaryParts.length);
}
