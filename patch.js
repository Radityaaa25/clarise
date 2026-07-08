const fs = require('fs');
let content = fs.readFileSync('apps/app/scripts/seed-devops-docker-premium.ts', 'utf-8');
const summaryParts = content.split('          {\n            type: "summary",');

if (summaryParts.length === 5) {
  // Modul 3 needs 3 slides
  const m3Slides = `          {
            type: "lesson",
            title: "Best Practice Dockerfile: .dockerignore",
            body: \`Salah satu kesalahan terbesar pemula adalah meng-copy seluruh folder secara membabi buta menggunakan perintah:
COPY . .

Ini sangat berbahaya karena kamu bisa tanpa sengaja memasukkan:
- Folder \\\`node_modules\\\` lokal (yang dikompilasi untuk OS komputermu, bukan Linux container)
- File \\\`.env\\\` yang berisi password rahasia production
- Folder \\\`.git\\\` yang ukurannya bisa ratusan MB

Solusinya adalah file **.dockerignore**. \`,
            keyTakeaway: "Gunakan .dockerignore untuk menghindari file lokal yang tidak perlu masuk ke dalam Docker Image.",
            sources: [
              { type: "DOCUMENTATION", title: "Dockerignore file", url: "https://docs.docker.com/engine/reference/builder/#dockerignore-file" }
            ]
          },
          {
            type: "lesson",
            title: "Mengenal Alpine Linux",
            body: \`Jika kamu perhatikan, hampir semua tutorial menggunakan image dengan akhiran \\\`-alpine\\\` (misal \\\`node:20-alpine\\\`). Alpine Linux adalah distribusi Linux super ringan yang dirancang khusus untuk container.

Ukuran base image Alpine hanya sekitar 5 MB, dibandingkan Ubuntu yang berukuran >70 MB. Ini sangat menghemat waktu download, upload, dan mengurangi celah keamanan.\`,
            keyTakeaway: "Alpine Linux adalah standar industri untuk base image container karena ukurannya yang super kecil.",
            sources: [
              { type: "DOCUMENTATION", title: "Alpine Linux", url: "https://alpinelinux.org/about/" }
            ]
          },
          {
            type: "lesson",
            title: "Security Scanning pada Image",
            body: \`Docker Image terdiri dari berbagai lapisan sistem operasi dan library pihak ketiga. Bagaimana jika library tersebut memiliki celah keamanan (CVE)?

Kamu dapat menggunakan alat seperti **Trivy** atau **Docker Scout** untuk memindai imagemu:
docker scout cves myapp:latest

Ini akan menampilkan daftar kerentanan yang perlu kamu perbaiki dengan memperbarui base image.\`,
            keyTakeaway: "Lakukan pemindaian kerentanan (vulnerability scanning) pada image sebelum di-deploy ke production.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Scout", url: "https://docs.docker.com/scout/" }
            ]
          },
`;
  summaryParts[3] = m3Slides + '          {\n            type: "summary",' + summaryParts[3];

  // Modul 4 needs 4 slides + challenge
  const m4Slides = `          {
            type: "lesson",
            title: "Blue-Green Deployment",
            body: \`Blue-Green deployment adalah strategi rilis perangkat lunak yang sangat populer di ekosistem container.

Ide utamanya:
1. Environment **Blue** adalah versi aplikasi saat ini yang sedang berjalan dan menerima traffic user.
2. Saat ada rilis versi baru, kita jalankan di environment **Green** (identik, tapi belum ada traffic user).
3. Kita test environment Green secara internal. Jika aman, kita perintahkan Load Balancer untuk mengalihkan 100% traffic dari Blue ke Green secara instan!

Jika ternyata Green bermasalah di production, kita tinggal kembalikan router ke Blue dalam hitungan detik. Tidak ada downtime.\`,
            keyTakeaway: "Blue-Green Deployment mengurangi resiko downtime saat rilis versi baru dengan menyiapkan environment pengganti sebelum mengalihkan traffic.",
            sources: [
              { type: "ARTICLE", title: "Blue-Green Deployment", url: "https://aws.amazon.com/quickstart/architecture/blue-green-deployment/" }
            ]
          },
          {
            type: "lesson",
            title: "Monitoring Docker Containers",
            body: \`Di server production, menjalankan container saja tidak cukup. Kamu harus tahu kondisinya.

Apakah CPU-nya overload? Apakah RAM-nya bocor (memory leak)?
Kamu bisa melihat statistik dasar menggunakan:
docker stats

Namun untuk enterprise, standar industrinya adalah menggunakan **Prometheus** (untuk mengambil metrik) dan **Grafana** (untuk membuat dashboard visual yang indah). Kamu bisa melihat grafik lonjakan CPU container secara real-time di Grafana.\`,
            keyTakeaway: "Gunakan \`docker stats\` untuk cek ringkas, dan Prometheus + Grafana untuk visualisasi enterprise.",
            sources: [
              { type: "DOCUMENTATION", title: "Prometheus Monitoring", url: "https://prometheus.io/docs/introduction/overview/" }
            ]
          },
          {
            type: "lesson",
            title: "Logging di Production (ELK Stack)",
            body: \`Saat kamu memiliki 10 server dan 50 container, kamu tidak mungkin melakukan \`docker logs\` satu per satu untuk mencari error.

Kamu butuh **Centralized Logging**. Konsepnya adalah semua log dari setiap container dikirim (forward) ke satu server log terpusat.
Stack paling populer adalah **ELK** (Elasticsearch, Logstash, Kibana) atau **EFK** (Elasticsearch, Fluentd, Kibana).

Dengan setup ini, kamu cukup buka dashboard Kibana, ketik "error payment", dan sistem akan mencari error tersebut di semua container di seluruh servermu secara instan.\`,
            keyTakeaway: "Centralized logging seperti ELK Stack adalah kewajiban jika kamu memiliki banyak container yang berjalan di banyak server.",
            sources: [
              { type: "ARTICLE", title: "Centralized Logging with Docker", url: "https://docs.docker.com/config/containers/logging/" }
            ]
          },
          {
            type: "challenge",
            title: "AI Challenge: Mendesain Pipeline CI/CD",
            body: \`Saatnya menguji pemahamanmu tentang flow DevOps!\`,
            challenge: {
              instruction: "Tuliskan sebuah urutan langkah pipeline CI/CD yang ideal dari mulai kode di-push hingga rilis ke server production menggunakan strategi Blue-Green Deployment.",
              inputType: "text",
              inputPlaceholder: "1. Git Push...",
              starterCode: "1. Git Push ke branch main\\n",
              expectedConcepts: [
                "Unit Test dijalankan",
                "Build Docker Image",
                "Push Image ke Registry",
                "Pull Image di server",
                "Jalankan versi baru (Green)",
                "Alihkan traffic ke Green"
              ],
              evaluationCriteria: "Menilai pemahaman flow CI/CD mulai dari testing, build image, push ke registry rahasia, pull di production, hingga konsep memutar load balancer (Blue-Green).",
              hints: [
                "Jangan lupa ada tahap Testing sebelum Build.",
                "Image tidak di-push langsung ke server, melainkan ke Registry."
              ],
              sampleAnswer: "1. Git Push ke branch main\\n2. Runner CI menjalankan Unit Tests\\n3. Jika lolos, Runner melakukan Docker Build\\n4. Runner mem-push Image ke Private ECR\\n5. Runner men-trigger deployment di server production\\n6. Server pull Image baru dan jalankan sebagai Green Environment\\n7. Load Balancer diarahkan ke Green\\n8. Blue dimatikan."
            }
          },
`;
  summaryParts[4] = m4Slides + '          {\n            type: "summary",' + summaryParts[4];
  
  const newContent = summaryParts.join('          {\n            type: "summary",');
  fs.writeFileSync('apps/app/scripts/seed-devops-docker-premium.ts', newContent);
  console.log('Docker premium updated!');
} else {
  console.log('summaryParts length = ' + summaryParts.length);
}
