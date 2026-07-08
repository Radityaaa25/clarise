import { createCourse, prisma } from "./_seed-helpers";

async function main() {
  await createCourse({
    title: "Docker & Containerization — Dari Dasar hingga Production",
    slug: "docker-containerization",
    description:
      "Kuasai Docker dari nol hingga production-ready. Pelajari container, images, volumes, networking, Docker Compose, multi-stage builds, dan best practices deployment. Dilengkapi hands-on challenges dan studi kasus real-world.",
    categorySlug: "devops-tools",
    difficulty: "INTERMEDIATE",
    isPremium: true,
    modules: [
      // ============================================================
      // MODUL 1: Dasar Docker & Containerization
      // ============================================================
      {
        title: "Dasar Docker & Containerization",
        slug: "dasar-docker-containerization",
        xpReward: 80,
        slides: [
          {
            type: "lesson",
            title: "Selamat Datang di Dunia Docker!",
            body: `"It works on my machine!" - kalimat yang paling sering bikin frustasi developer dan ops team. Kamu develop aplikasi di laptop, jalan lancar. Deploy ke server production, error. Kenapa? Karena environment berbeda - versi Node.js beda, library system beda, konfigurasi beda.

**Docker** menyelesaikan masalah ini dengan **containerization** - cara mengemas aplikasi beserta semua dependency-nya ke dalam satu paket portable yang bisa jalan di mana saja.

### Analogi: Container = Kontainer Barang

Bayangkan pengiriman barang via kapal cargo. Dulu, barang dikemas satu-satu sehingga susah dimuat dan dibongkar. Lalu muncul **container standar** - kotak besi ukuran seragam yang bisa dimuat di kapal, truk, atau kereta tanpa ubah isinya.

Docker container persis seperti itu: kemasan standar untuk aplikasi yang bisa jalan di laptop, server, atau cloud tanpa modifikasi.

### Container vs Virtual Machine

**Virtual Machine (VM):**
- Virtualisasi hardware - setiap VM punya OS lengkap sendiri
- Berat - butuh beberapa GB RAM per VM
- Boot lambat - puluhan detik hingga beberapa menit

**Container:**
- Virtualisasi OS-level - container share kernel dengan host
- Ringan - hanya butuh MB RAM per container
- Start instant - hitungan detik bahkan milidetik

Analogi: VM seperti punya 5 rumah terpisah (setiap rumah punya fondasi, dinding, atap sendiri). Container seperti punya 5 kamar di satu rumah (share fondasi dan dinding, tapi setiap kamar punya kunci sendiri dan tetap independen).

### Kenapa Docker Menjadi Standar Industri?

**1. Konsistensi Environment** - "Works on my machine" bukan masalah lagi. Container berisi SEMUA yang dibutuhkan - runtime, library, config. Developer, tester, dan production server semua pakai environment yang identik.

**2. Kecepatan Deployment** - Container start dalam detik. Scaling dari 2 ke 20 instance bisa dilakukan dalam hitungan menit.

**3. Efisiensi Resource** - Satu server bisa menjalankan ratusan container (vs puluhan VM). Resource sharing lebih efisien.

**4. DevOps & CI/CD Integration** - Build sekali, test di staging, deploy ke production dengan image yang sama persis.

**5. Microservices Architecture** - Setiap service bisa di-containerize, di-deploy, dan di-scale secara independen.

Perusahaan seperti Netflix menjalankan ribuan container setiap detiknya. Gojek, Tokopedia, dan startup Indonesia lainnya sudah mengadopsi Docker di production mereka.`,
            keyTakeaway:
              "Docker mengemas aplikasi beserta semua dependency ke dalam container yang portable dan konsisten. Container lebih ringan dari VM (share kernel, start dalam detik). Solusi utama untuk 'works on my machine' problem.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Overview", url: "https://docs.docker.com/get-started/docker-overview/" },
              { type: "ARTICLE", title: "What is Docker? - AWS", url: "https://aws.amazon.com/docker/" },
              { type: "YOUTUBE", title: "Docker Tutorial for Beginners - FreeCodeCamp", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo" },
              { type: "DOCUMENTATION", title: "Get Started with Docker", url: "https://docs.docker.com/get-started/" },
            ],
          },
          {
            type: "lesson",
            title: "Arsitektur Docker: Image, Container & Registry",
            body: `Sebelum hands-on, kamu perlu memahami 3 konsep fundamental Docker: **Image**, **Container**, dan **Registry**.

### Docker Image: Template Read-Only

**Image** adalah template read-only yang berisi aplikasi dan semua dependency-nya. Seperti blueprint rumah - image bukan sesuatu yang dijalankan, melainkan cetakan untuk membuat container.

Image terdiri dari **layers** yang stacked satu di atas yang lain. Setiap layer adalah hasil dari satu instruksi di Dockerfile. Kalau 2 image share layer yang sama, layer itu hanya disimpan sekali di disk - tidak ada duplikasi.

Contoh struktur layers image Node.js:
- Layer 1: Alpine Linux 3.18 (base OS)
- Layer 2: Install Node.js 20
- Layer 3: Set WORKDIR /app
- Layer 4: Copy package.json dan npm install
- Layer 5: Copy source code aplikasi

Image naming convention - nama:tag:
- node:20 = image Node.js versi 20 (official)
- nginx:alpine = image Nginx berbasis Alpine Linux (~23 MB)
- postgres:15.2 = image PostgreSQL versi 15.2 (spesifik)
- mycompany/backend:v1.5.0 = image custom dari organisasi

### Docker Container: Running Instance

**Container** adalah running instance dari image. Kalau image adalah blueprint, container adalah bangunan yang sudah jadi. Satu image bisa spawn puluhan atau ratusan container.

Karakteristik container:
- **Isolated** - setiap container punya filesystem, network, dan process space sendiri
- **Ephemeral by default** - data di dalam container hilang saat container di-delete
- **Lightweight** - container share kernel OS dengan host, overhead minimal

Lifecycle container: Created -> Running -> Paused -> Stopped -> Deleted

Penting: stop tidak sama dengan delete. Saat kamu stop container, container masih ada tapi tidak running. Data di filesystem container masih tersimpan. Baru kalau di-delete benar-benar hilang.

### Docker Registry: Tempat Menyimpan Image

**Registry** adalah tempat menyimpan dan mendistribusikan image. Seperti GitHub untuk code, tapi untuk Docker images.

**Docker Hub** (hub.docker.com): Registry publik terbesar. Jutaan image gratis tersedia - semua official images ada di sini.

**Private Registry untuk production:**
- AWS ECR (Elastic Container Registry)
- Google Artifact Registry
- Azure Container Registry
- Harbor (open-source, self-hosted)

### Docker Daemon & Docker Client

**Docker Daemon** (dockerd): background service yang manage semua containers, images, networks, volumes.

**Docker Client** (docker): CLI yang kamu gunakan. Saat kamu jalankan perintah docker, client mengirim command ke daemon lewat REST API.

Arsitektur: Kamu -> docker CLI -> Docker Daemon -> Containers/Images`,
            keyTakeaway:
              "3 konsep fundamental: Image (template read-only dengan layers), Container (running instance dari image, ephemeral), Registry (store dan distribute images). Docker Daemon manage semuanya, Docker Client adalah CLI.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Architecture", url: "https://docs.docker.com/get-started/docker-overview/#docker-architecture" },
              { type: "ARTICLE", title: "Understanding Docker Images and Containers", url: "https://www.digitalocean.com/community/tutorials/the-docker-ecosystem-an-introduction-to-common-components" },
            ],
          },
          {
            type: "example",
            title: "Hands-On: Menjalankan Container Pertamamu",
            body: `Mari langsung hands-on! Kamu akan menjalankan container pertamamu - web server NGINX - dalam hitungan detik.

### Prerequisites

Install Docker Desktop dari docker.com (Windows, macOS, Linux). Cek instalasi:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

### Langkah 1: Pull Image

\`\`\`bash
docker pull nginx:alpine
\`\`\`

Docker download image nginx:alpine dari Docker Hub. Alpine adalah distro Linux super kecil (~5 MB), sehingga image nginx:alpine hanya ~23 MB.

### Langkah 2: Jalankan Container

\`\`\`bash
docker run -d -p 8080:80 --name my-nginx nginx:alpine
\`\`\`

Breakdown setiap flag:
- -d = detached mode (background, tidak block terminal)
- -p 8080:80 = map port 8080 host ke port 80 container
- --name my-nginx = nama container agar mudah dikenali
- nginx:alpine = image yang digunakan

### Langkah 3: Verifikasi

\`\`\`bash
docker ps
\`\`\`

Output menampilkan container ID, image, status, ports, dan nama.

### Langkah 4: Akses Web Server

Buka browser, akses http://localhost:8080 - kamu akan lihat halaman "Welcome to nginx!" yang berjalan di dalam container!

### Langkah 5: Lihat Logs

\`\`\`bash
docker logs my-nginx
docker logs -f my-nginx   # follow real-time
\`\`\`

### Langkah 6: Masuk ke Dalam Container

\`\`\`bash
docker exec -it my-nginx sh
ls /usr/share/nginx/html
exit
\`\`\`

### Langkah 7: Stop dan Hapus

\`\`\`bash
docker stop my-nginx
docker rm my-nginx
\`\`\`

Dalam 7 langkah ini kamu sudah menguasai basic container lifecycle: pull, run, verify, access, exec, stop, remove. Workflow yang sama berlaku untuk container apapun di production.`,
            keyTakeaway:
              "Basic workflow: docker pull -> docker run -d -p -> docker ps -> docker logs -> docker exec -it -> docker stop + rm. Dalam hitungan detik NGINX sudah berjalan tanpa install apapun di laptop.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Run Reference", url: "https://docs.docker.com/engine/reference/commandline/run/" },
              { type: "YOUTUBE", title: "Docker in 100 Seconds", url: "https://www.youtube.com/watch?v=Gjnup-PuquQ" },
            ],
          },
          {
            type: "lesson",
            title: "Dockerfile: Resep untuk Membuat Image-mu Sendiri",
            body: `Menjalankan image yang sudah jadi itu mudah. Tapi bagaimana cara membuat image untuk **aplikasimu sendiri**? Jawabannya adalah **Dockerfile** - file text berisi instruksi step-by-step untuk build image.

### Contoh Dockerfile untuk Aplikasi Node.js

\`\`\`dockerfile
# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files DULU (untuk layer caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm ci --only=production

# 5. Copy source code
COPY . .

# 6. Dokumentasi port
EXPOSE 3000

# 7. Command saat container start
CMD ["node", "index.js"]
\`\`\`

### Penjelasan Setiap Instruksi

**FROM** - Base image fondasi. Alpine = distro Linux minimal, node:20-alpine hanya ~120 MB vs node:20 yang ~900 MB.

**WORKDIR** - Set working directory. Semua instruksi setelah ini dijalankan di path ini.

**COPY** - Salin file dari host ke container. COPY . . = salin semua dari current dir host ke current dir container.

**ADD** - Mirip COPY tapi bisa otomatis extract tar.gz. Gunakan COPY untuk case sederhana.

**RUN** - Jalankan command saat build image. Setiap RUN buat layer baru.

**ENV** - Set environment variable:
\`\`\`dockerfile
ENV NODE_ENV=production
ENV PORT=3000
\`\`\`

**EXPOSE** - Dokumentasi port container. TIDAK auto-publish port! Kamu tetap perlu -p saat docker run.

**CMD** - Command default saat container start. Hanya boleh 1 CMD.

**ENTRYPOINT** - Mirip CMD tapi tidak bisa di-override saat runtime.

### .dockerignore: Jangan Copy File yang Tidak Perlu

Buat file .dockerignore di direktori yang sama dengan Dockerfile:

\`\`\`
node_modules
.git
*.log
.env
dist
.DS_Store
\`\`\`

Tanpa .dockerignore, COPY . . akan menyalin node_modules dari host (yang mungkin di-compile untuk OS berbeda) ke dalam image. Ini **salah** dan bisa menyebabkan crash.

### Layer Caching: Kenapa Urutan Instruksi Penting

Docker cache setiap layer. Kalau layer tidak berubah, Docker reuse cache tanpa re-execute instruksi itu.

**Buruk** (npm install diulang setiap kali ada perubahan code):
\`\`\`dockerfile
COPY . .
RUN npm install
\`\`\`

**Baik** (npm install hanya diulang kalau package.json berubah):
\`\`\`dockerfile
COPY package*.json ./
RUN npm install
COPY . .
\`\`\`

Dengan urutan yang benar, developer yang sering push code akan build image dalam hitungan detik (cache hit), bukan menit.`,
            keyTakeaway:
              "Dockerfile = resep build image. Instruksi: FROM (base), WORKDIR, COPY, RUN (install/build), ENV, EXPOSE (dokumentasi), CMD (command saat start). .dockerignore untuk exclude node_modules. Taruh COPY package.json dulu sebelum source code untuk maximize layer cache.",
            sources: [
              { type: "DOCUMENTATION", title: "Dockerfile Reference", url: "https://docs.docker.com/engine/reference/builder/" },
              { type: "ARTICLE", title: "Dockerfile Best Practices", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" },
            ],
          },

          {
            type: "example",
            title: "Hands-On: Build & Run Aplikasi Node.js di Container",
            body: `Mari praktikkan Dockerfile dengan membuat dan containerize aplikasi Node.js Express sederhana.

### Struktur Project

\`\`\`
my-app/
  index.js
  package.json
  Dockerfile
  .dockerignore
\`\`\`

### Kode Aplikasi

**index.js:**
\`\`\`javascript
const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker!',
    hostname: os.hostname(),  // Container ID akan muncul di sini!
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
\`\`\`

**package.json:**
\`\`\`json
{
  "name": "docker-demo",
  "version": "1.0.0",
  "dependencies": { "express": "^4.18.2" }
}
\`\`\`

**Dockerfile:**
\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
\`\`\`

**.dockerignore:**
\`\`\`
node_modules
npm-debug.log
.git
.env
\`\`\`

### Build Image

\`\`\`bash
docker build -t myapp:v1.0 .
\`\`\`

Kamu akan lihat setiap layer diproses satu per satu. Build pertama mungkin 1-2 menit. Ubah index.js lalu build lagi - layer npm install akan di-cache, hanya COPY source code yang diulang. Build selesai dalam hitungan detik!

### Run Container

\`\`\`bash
docker run -d -p 3000:3000 -e NODE_ENV=production --name myapp myapp:v1.0
curl http://localhost:3000
\`\`\`

Response akan menampilkan hostname berisi container ID - setiap container punya identitas unik!

### Scale Horizontal

\`\`\`bash
docker run -d -p 3001:3000 --name myapp-2 myapp:v1.0
docker run -d -p 3002:3000 --name myapp-3 myapp:v1.0
docker ps  # 3 containers dari 1 image
\`\`\`

Ini adalah foundation dari horizontal scaling - satu image, banyak instances. Di production, load balancer yang distribute traffic ke semua instances.`,
            keyTakeaway:
              "Workflow containerize app: Dockerfile -> docker build -t -> docker run -d -p. Layer caching buat rebuild cepat. Scale horizontal dengan run multiple containers dari image yang sama. Hostname di response = container ID.",
          },
          {
            type: "lesson",
            title: "Docker Volumes: Menyimpan Data Secara Permanen",
            body: `Container bersifat **ephemeral** - data di dalam container hilang saat container di-delete. Ini masalah serius untuk database atau file upload. Solusinya: **Docker Volumes**.

### Masalah: Data Hilang Saat Container Dihapus

Setiap container punya writable layer di atas image layers. Saat container di-delete, writable layer dan semua data di dalamnya ikut terhapus.

Contoh masalah nyata:
\`\`\`bash
docker run -d --name pg postgres:15
# Insert banyak data ke database...
docker rm -f pg  # DATA HILANG SELAMANYA!
\`\`\`

### 3 Jenis Storage di Docker

**1. Named Volumes (Direkomendasikan untuk Production)**

Docker yang manage storage ini. Data disimpan di /var/lib/docker/volumes/ (Linux). Persist meskipun container di-delete.

\`\`\`bash
docker volume create pgdata

docker run -d --name pg \\
  -v pgdata:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:15

docker rm -f pg   # Hapus container...

docker run -d --name pg-new \\
  -v pgdata:/var/lib/postgresql/data \\  # Mount volume yang sama
  -e POSTGRES_PASSWORD=secret \\
  postgres:15
# DATA MASIH ADA!
\`\`\`

**2. Bind Mounts (Terbaik untuk Development)**

Mount direktori dari host ke container. Perubahan file di host langsung terlihat di container - perfect untuk hot reload.

\`\`\`bash
docker run -d -p 3000:3000 \\
  -v $(pwd):/app \\
  node:20-alpine \\
  sh -c "npm install && npm run dev"
\`\`\`

**3. tmpfs Mounts (In-Memory)**

Storage sementara di RAM. Sangat cepat tapi hilang saat container stop. Untuk temp files atau data sensitif yang tidak boleh ke disk.

### Named Volume vs Bind Mount

| Aspek | Named Volume | Bind Mount |
|-------|-------------|------------|
| Use case | Database, production data | Source code development |
| Dikelola oleh | Docker | Developer (path manual) |
| Portability | Tinggi (sama di semua OS) | Rendah (path berbeda per OS) |

**Rule of thumb:** Named volumes untuk data yang perlu persist di production. Bind mounts untuk source code saat development.

### Volume Commands

\`\`\`bash
docker volume ls                 # List semua volumes
docker volume inspect pgdata     # Detail volume
docker volume rm pgdata          # Hapus volume
docker volume prune              # Hapus semua yang tidak dipakai
\`\`\`

### Backup Volume

\`\`\`bash
# Backup: copy data dari volume ke host
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine \\
  tar czf /backup/pgdata-backup.tar.gz -C /data .
\`\`\`

Volumes adalah yang membuat Docker praktis untuk stateful applications seperti database.`,
            keyTakeaway:
              "Container filesystem ephemeral - data hilang saat delete. Named volumes untuk production (Docker manage, persist permanen). Bind mounts untuk development (source code sync). Data di volume tetap ada meskipun container di-delete.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Volumes", url: "https://docs.docker.com/storage/volumes/" },
              { type: "DOCUMENTATION", title: "Manage Data in Docker", url: "https://docs.docker.com/storage/" },
            ],
          },
          {
            type: "lesson",
            title: "Docker Networking: Menghubungkan Containers",
            body: `Container tidak hidup sendiri - web app butuh connect ke database, backend butuh connect ke cache. **Docker Networking** memungkinkan containers saling berkomunikasi dengan aman.

### Default Networks

Saat Docker terinstall, ada 3 network default:

**bridge** - Default untuk standalone containers. Containers bisa connect ke internet tapi tidak bisa reach satu sama lain by name.

**host** - Container share network dengan host langsung. Performance tinggi tapi tanpa isolasi.

**none** - Container tidak punya network sama sekali.

### Custom Bridge Networks: Cara yang Benar

Default bridge network tidak support DNS resolution by container name. Custom bridge network menyelesaikan ini.

\`\`\`bash
docker network create myapp-network

docker run -d --name postgres \\
  --network myapp-network \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:15

docker run -d --name backend \\
  --network myapp-network \\
  -p 5000:5000 \\
  myapp:v1.0
\`\`\`

Di dalam container backend, kamu bisa connect ke database dengan hostname "postgres" (nama container):

\`\`\`javascript
const db = new Pool({
  host: process.env.DB_HOST,  // "postgres" - container name!
  port: 5432,
  ...
});
\`\`\`

Docker otomatis resolve nama container ke IP address yang benar!

### Internal vs External Communication

**Internal** (antar container): gunakan nama container sebagai hostname. Tidak perlu publish port (-p).

**External** (dari browser/user): perlu publish port dengan -p.

Best practice security: **minimize published ports**. Hanya publish port service yang benar-benar perlu diakses dari luar. Database dan cache cukup internal saja.

### Network Commands

\`\`\`bash
docker network ls
docker network inspect myapp-network
docker network connect myapp-network container-name
docker network rm myapp-network
\`\`\`

### Multi-Network Architecture

Containers bisa attach ke lebih dari satu network untuk isolasi berlapis:

\`\`\`bash
docker network create frontend-net
docker network create backend-net

# Load balancer: hanya di frontend
docker run --name nginx --network frontend-net -p 80:80 nginx

# App: di kedua network (jembatan)
docker run --name app --network frontend-net myapp
docker network connect backend-net app

# Database: hanya di backend (tidak bisa diakses dari internet)
docker run --name db --network backend-net postgres:15
\`\`\`

Nginx bisa reach app, app bisa reach database, tapi nginx TIDAK bisa langsung reach database. Ini adalah network segmentation mirip VPC private subnet di cloud.`,
            keyTakeaway:
              "Custom bridge networks support DNS resolution - containers reach satu sama lain by container name. Internal communication tidak butuh -p. Multi-network untuk isolasi (public vs private tier). Minimize published ports untuk security.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Networking Overview", url: "https://docs.docker.com/network/" },
              { type: "ARTICLE", title: "Container Networking Tutorial", url: "https://docs.docker.com/network/network-tutorial-standalone/" },
            ],
          },
          {
            type: "lesson",
            title: "Environment Variables & Configuration Management",
            body: `Aplikasi production harus bisa berjalan di berbagai environment (dev, staging, prod) dengan konfigurasi berbeda - tapi **image yang sama persis**. Ini dicapai dengan **environment variables**.

### Kenapa Environment Variables?

**Cara buruk - hardcode di source code:**
\`\`\`javascript
const db = new Pool({ host: 'localhost', password: 'dev123' });
// MASALAH: Harus edit code untuk ganti environment!
\`\`\`

**Cara benar - inject saat runtime:**
\`\`\`javascript
const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASS,
});
\`\`\`

\`\`\`bash
# Development
docker run -e DB_HOST=localhost -e DB_PASS=dev123 myapp

# Production
docker run -e DB_HOST=prod.db.internal -e DB_PASS=ultrasecret myapp
\`\`\`

Satu image, dua environment, konfigurasi berbeda via env vars. Image portable!

### 3 Cara Inject Environment Variables

**1. Inline dengan -e (untuk sedikit vars):**
\`\`\`bash
docker run -d -e NODE_ENV=production -e PORT=3000 -e DB_HOST=db myapp:v1.0
\`\`\`

**2. Dari file --env-file (untuk banyak vars):**
\`\`\`bash
docker run -d --env-file .env myapp:v1.0
\`\`\`

Isi .env file:
\`\`\`
NODE_ENV=production
PORT=3000
DB_HOST=db
JWT_SECRET=myjwtsecret
\`\`\`

**3. Default di Dockerfile ENV (untuk nilai default):**
\`\`\`dockerfile
ENV NODE_ENV=development
ENV PORT=3000
\`\`\`

Values dari -e saat docker run akan override values dari Dockerfile.

### Secrets Management: Jangan Expose di Env Vars Biasa!

Masalah dengan env vars biasa:
\`\`\`bash
docker inspect myapp-container
# Output JSON berisi semua env vars termasuk passwords!
# Siapa pun yang bisa docker inspect bisa lihat credentials!
\`\`\`

Solusi yang aman:
1. **Docker Secrets** (untuk Docker Swarm): mount secret sebagai file di /run/secrets/
2. **AWS Secrets Manager** atau **HashiCorp Vault** untuk production cloud
3. **Secret Files via Volume**: mount file secret sebagai read-only volume

\`\`\`bash
# Mount file secret dari host (permission 600)
docker run -v /run/secrets/db_pass:/run/secrets/db_pass:ro myapp
# App baca dari file, bukan env var
\`\`\`

### 12-Factor App: Prinsip Config yang Benar

Semua konfigurasi yang berbeda per environment (DB connection, API keys, feature flags) harus via env vars. Tidak ada konfigurasi yang di-hardcode di code atau baked ke image.

Image yang sama harus bisa di-deploy di development, staging, production hanya dengan env vars yang berbeda.`,
            keyTakeaway:
              "Inject config via env vars (-e, --env-file) bukan hardcode. Image yang sama bisa jalan di semua environments. Jangan simpan secrets di plain env vars - gunakan Docker Secrets atau secret manager. Follow 12-Factor App principles.",
          },

          {
            type: "lesson",
            title: "Docker Logs, Debugging & Resource Management",
            body: `Saat container bermasalah, Docker menyediakan berbagai tools untuk investigate dan troubleshoot.

### Docker Logs: Melihat Output Container

Aplikasi di container harus menulis output ke stdout dan stderr (bukan ke file!). Docker otomatis capture ini.

\`\`\`bash
docker logs myapp                    # Semua logs
docker logs -f myapp                 # Follow real-time
docker logs --tail 100 myapp         # 100 baris terakhir
docker logs -t myapp                 # Tambahkan timestamps
\`\`\`

### Docker Exec: Masuk ke Dalam Container

\`\`\`bash
docker exec -it myapp sh             # Buka shell interaktif
docker exec myapp ls /app            # Jalankan command sekali
docker exec myapp ps aux             # Lihat processes
docker exec myapp env                # Lihat environment variables
\`\`\`

Kalau container crash dan tidak bisa exec, debug dengan override command:
\`\`\`bash
docker run -it --entrypoint sh myapp:v1.0
\`\`\`

### Docker Inspect: Metadata Lengkap

\`\`\`bash
docker inspect myapp                               # Full JSON
docker inspect --format '{{.NetworkSettings.IPAddress}}' myapp
docker inspect --format '{{.State.Status}}' myapp
\`\`\`

### Docker Stats: Monitor Resource Usage

\`\`\`bash
docker stats              # Real-time semua containers
docker stats myapp        # Specific container
docker stats --no-stream  # Snapshot sekali
\`\`\`

Output: CPU %, Memory usage/limit, Network I/O, Block I/O.

### Common Debugging Scenarios

**Container langsung exit:**
\`\`\`bash
docker ps -a              # Lihat container yang exit + exit code
docker logs container-name  # Lihat error message
\`\`\`
Exit code 137 = OOM Killed. Exit code 1 = Application error.

**Tidak bisa connect ke container:**
\`\`\`bash
docker inspect myapp | grep Ports
docker exec -it myapp sh
netstat -tuln | grep 3000  # Apakah app listening?
\`\`\`

**Container running tapi app error:**
\`\`\`bash
docker exec -it myapp sh
ps aux                   # Proses apa yang berjalan?
curl localhost:3000      # Test dari inside container
\`\`\`

### Resource Limits

Tanpa limits, satu container bisa makan semua CPU dan RAM host.

\`\`\`bash
docker run -d \\
  --memory="512m" \\     # Max 512 MB RAM
  --cpus="1.5" \\        # Max 1.5 CPU cores
  myapp:v1.0
\`\`\`

Resource limits sangat penting di production untuk mencegah satu container bermasalah membawa down seluruh sistem.`,
            keyTakeaway:
              "Debug toolkit: docker logs (output app), docker exec -it (shell access), docker inspect (metadata), docker stats (resource usage). Log ke stdout/stderr. Set --memory dan --cpus limits di production.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Logging", url: "https://docs.docker.com/config/containers/logging/" },
              { type: "DOCUMENTATION", title: "Runtime Resource Constraints", url: "https://docs.docker.com/config/containers/resource_constraints/" },
            ],
          },
          {
            type: "lesson",
            title: "Docker Hub & Image Optimization",
            body: `Image yang kamu build perlu disimpan di registry agar bisa di-share ke tim, CI/CD pipeline, atau server production.

### Push ke Docker Hub

\`\`\`bash
# Step 1: Login
docker login

# Step 2: Tag image dengan username/repo:tag
docker tag myapp:v1.0 yourusername/myapp:v1.0
docker tag myapp:v1.0 yourusername/myapp:latest

# Step 3: Push
docker push yourusername/myapp:v1.0
docker push yourusername/myapp:latest
\`\`\`

### Image Tagging Strategy

Jangan pakai latest di production! latest bisa berubah kapan saja. Selalu gunakan specific version tag.

\`\`\`bash
myapp:1.0.0              # Semantic versioning
myapp:sha-a3f5e9c        # Git commit hash (immutable!)
myapp:2024-01-15         # Date-based
myapp:prod-1.0.0         # Environment + version
\`\`\`

### Private Registries untuk Production

**AWS ECR:**
\`\`\`bash
aws ecr get-login-password --region ap-southeast-1 | \\
  docker login --username AWS --password-stdin \\
  123456789.dkr.ecr.ap-southeast-1.amazonaws.com

docker tag myapp:v1.0 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/myapp:v1.0
docker push 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/myapp:v1.0
\`\`\`

### Optimasi Ukuran Image

**1. Gunakan Alpine atau slim base images:**
- node:20-alpine = ~120 MB vs node:20 = ~900 MB
- python:3.11-slim = ~150 MB vs python:3.11 = ~900 MB

**2. Gabungkan RUN commands untuk kurangi layers:**
\`\`\`dockerfile
# Buruk - 4 layers
RUN apt-get update
RUN apt-get install -y curl wget vim

# Baik - 1 layer, cleanup di layer yang sama
RUN apt-get update && apt-get install -y curl wget vim \\
    && rm -rf /var/lib/apt/lists/*
\`\`\`

**3. .dockerignore yang komprehensif:**
\`\`\`
node_modules
.git
*.test.js
.env*
coverage
docs
README.md
\`\`\`

### Image Security Scanning

\`\`\`bash
docker scout quickview myapp:v1.0     # Quick overview
docker scout cves myapp:v1.0          # Detail CVEs

# Trivy - open source scanner yang populer
trivy image myapp:v1.0
trivy image --severity CRITICAL,HIGH myapp:v1.0
\`\`\`

Integrate scanning ke CI/CD - kalau ada critical CVE, fail the build sebelum sampai ke production.`,
            keyTakeaway:
              "Push image: docker login -> docker tag -> docker push. Gunakan specific version tags (bukan latest) di production. Private registries (ECR, GCR) untuk production. Optimize size dengan Alpine base, gabung RUN commands. Scan CVE di CI/CD.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Hub Quickstart", url: "https://docs.docker.com/docker-hub/" },
              { type: "ARTICLE", title: "Amazon ECR Documentation", url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html" },
            ],
          },
          {
            type: "casestudy",
            title: "Studi Kasus: Containerizing Full-Stack App (Node.js + PostgreSQL + Redis)",
            body: `Mari lihat contoh nyata: containerize aplikasi e-commerce full-stack dengan backend API, database, dan cache.

### Arsitektur: 3 Containers

1. **API** - Node.js/Express backend (port 5000 dipublish)
2. **Database** - PostgreSQL (port TIDAK dipublish - internal only)
3. **Cache** - Redis (port TIDAK dipublish - internal only)

### Setup Step by Step

\`\`\`bash
# 1. Buat isolated network
docker network create ecommerce-net

# 2. Buat persistent volumes
docker volume create pg-data
docker volume create redis-data

# 3. Jalankan PostgreSQL
docker run -d \\
  --name postgres \\
  --network ecommerce-net \\
  -v pg-data:/var/lib/postgresql/data \\
  -e POSTGRES_DB=ecommerce \\
  -e POSTGRES_USER=app \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:15-alpine

# 4. Jalankan Redis
docker run -d \\
  --name redis \\
  --network ecommerce-net \\
  -v redis-data:/data \\
  redis:alpine redis-server --appendonly yes

# 5. Build dan jalankan API
docker build -t ecommerce-api:v1.0 ./api

docker run -d \\
  --name api \\
  --network ecommerce-net \\
  -p 5000:5000 \\
  -e DB_HOST=postgres \\
  -e DB_NAME=ecommerce \\
  -e DB_USER=app \\
  -e DB_PASS=secret \\
  -e REDIS_HOST=redis \\
  -e NODE_ENV=production \\
  ecommerce-api:v1.0
\`\`\`

### Koneksi dari Kode API

\`\`\`javascript
const db = new Pool({
  host: process.env.DB_HOST,    // "postgres" - container name!
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: 5432
});

const cache = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,   // "redis" - container name!
    port: 6379
  }
});
\`\`\`

Container names di custom network otomatis jadi DNS hostname!

### Key Lessons

1. **Hanya API yang publish port (-p 5000:5000)**: Postgres dan Redis tidak perlu diakses dari luar. Security jauh lebih baik.

2. **Container names = hostnames**: Tidak perlu tahu IP address, cukup pakai nama container.

3. **Volumes untuk kedua databases**: Data persist saat containers di-update atau di-restart.

4. **Startup order matters**: API harus start setelah postgres ready. Tambahkan retry logic di aplikasi atau gunakan wait-for-it script.

Setup manual ini sudah berfungsi, tapi ribet untuk maintain. Di Modul 2, kamu akan belajar **Docker Compose** yang otomasi semua steps ini dengan satu file YAML dan satu command: docker compose up.`,
            keyTakeaway:
              "Pattern full-stack: Custom network + named volumes + env vars. Hanya service yang perlu diakses dari luar yang publish port. Container names jadi hostname di custom network. Startup order harus diperhatikan.",
          },
          {
            type: "challenge",
            title: "Challenge: Containerize Aplikasi Python Flask dengan Redis Counter",
            body: `Saatnya praktik mandiri! Kamu akan containerize aplikasi Python Flask yang menggunakan Redis untuk menyimpan visit counter.

**Aplikasi yang harus di-containerize:**

app.py:
\`\`\`python
from flask import Flask, jsonify
import redis, os

app = Flask(__name__)
r = redis.Redis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=int(os.getenv('REDIS_PORT', 6379)),
    decode_responses=True
)

@app.route('/count')
def count():
    visits = r.incr('visit_counter')
    return jsonify({'visits': visits, 'host': os.uname().nodename})

@app.route('/reset', methods=['POST'])
def reset():
    r.delete('visit_counter')
    return jsonify({'message': 'counter reset'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
\`\`\`

requirements.txt:
\`\`\`
flask==3.0.0
redis==5.0.1
\`\`\`

**Tugas kamu:**
1. Buat Dockerfile untuk Flask app ini
2. Buat .dockerignore yang appropriate
3. Build image flask-counter:v1.0
4. Setup custom network flask-net
5. Run Redis container dengan named volume redis-counter-data
6. Run Flask container yang terhubung ke Redis
7. Jelaskan: kenapa counter TIDAK reset saat Flask di-restart, tapi RESET saat Redis di-hapus tanpa volume?`,
            challenge: {
              instruction:
                "Tulis solusi lengkap: (1) Dockerfile untuk Flask app, (2) Isi .dockerignore, (3) Semua docker commands untuk network, volume, Redis container, Flask container, dan test, (4) Penjelasan konseptual tentang persistence.",
              inputType: "text",
              inputPlaceholder:
                "# 1. Dockerfile\nFROM python:...\n\n# 2. .dockerignore\n...\n\n# 3. Commands\ndocker network create...\n\n# 4. Penjelasan\n...",
              starterCode: "",
              expectedConcepts: [
                "Dockerfile dengan FROM python:3.11-slim, COPY requirements.txt dulu, RUN pip install, COPY app.py, CMD python app.py",
                "Custom network (docker network create flask-net)",
                "Named volume untuk Redis (docker volume create + -v redis-counter-data:/data)",
                "Redis container di flask-net dengan volume",
                "Flask container di flask-net dengan -e REDIS_HOST=redis (nama container Redis)",
                "Penjelasan: counter persist karena data ada di Redis (di volume), bukan di Flask container",
              ],
              evaluationCriteria:
                "Evaluasi: (1) Dockerfile valid - FROM python, COPY requirements dulu (caching), RUN pip install, COPY app.py, EXPOSE 5000, CMD. (2) .dockerignore exclude .env, __pycache__, *.pyc. (3) Custom network dibuat sebelum containers. (4) Redis volume dibuat dan di-mount ke /data. (5) Flask run dengan REDIS_HOST=redis. (6) Penjelasan tepat: data di volume tetap ada meskipun container dihapus karena volume independent dari container lifecycle. Nilai: 5/6 = baik, 6/6 = excellent.",
              hints: [
                "python:3.11-slim lebih compatible dari alpine untuk Flask karena beberapa deps butuh C compiler.",
                "Redis default simpan data di /data - mount volume kesini untuk persistence.",
                "Flask container perlu REDIS_HOST=redis, dimana 'redis' adalah nama container Redis.",
              ],
              sampleAnswer:
                "Dockerfile: FROM python:3.11-slim, WORKDIR /app, COPY requirements.txt ., RUN pip install --no-cache-dir -r requirements.txt, COPY app.py ., EXPOSE 5000, CMD [python, app.py]. .dockerignore: __pycache__, *.pyc, .env, .git. Commands: docker network create flask-net; docker volume create redis-counter-data; docker run -d --name redis --network flask-net -v redis-counter-data:/data redis:alpine; docker build -t flask-counter:v1.0 .; docker run -d --name flask --network flask-net -p 5000:5000 -e REDIS_HOST=redis flask-counter:v1.0. Penjelasan: Data counter ada di Redis, di volume. Flask restart tidak affect Redis yang masih running. Redis di-hapus tanpa volume = data hilang. Dengan volume, Redis baru mount data yang sama dan counter terestore.",
              followUpQuestion:
                "Bagaimana cara menjalankan 3 instance Flask yang semuanya terhubung ke Redis yang sama?",
            },
          },
          {
            type: "lesson",
            title: "Pembahasan Challenge: Flask Counter + Redis",
            body: `Mari bahas solusi lengkap dan jelaskan kenapa setiap keputusan diambil.

### Dockerfile yang Optimal

\`\`\`dockerfile
FROM python:3.11-slim

# Buat non-root user untuk security
RUN useradd -m -u 1000 appuser

WORKDIR /app

# Copy dan install dependencies DULU (layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY app.py .

# Switch ke non-root user
USER appuser

EXPOSE 5000
CMD ["python", "app.py"]
\`\`\`

**Kenapa python:3.11-slim?** Alpine bisa conflict dengan beberapa Python packages yang butuh C compiler. slim (Debian-based) lebih compatible.

**Kenapa COPY requirements.txt terpisah?** Layer caching: kalau kamu sering ubah app.py tapi jarang ubah requirements.txt, layer pip install akan di-cache. Build jauh lebih cepat.

### .dockerignore

\`\`\`
__pycache__
*.pyc
*.pyo
.env
.env.*
.git
tests/
\`\`\`

### Semua Commands Lengkap

\`\`\`bash
docker build -t flask-counter:v1.0 .
docker network create flask-net
docker volume create redis-counter-data

# Redis dengan appendonly untuk durability
docker run -d \\
  --name redis \\
  --network flask-net \\
  -v redis-counter-data:/data \\
  redis:alpine redis-server --appendonly yes

# Flask
docker run -d \\
  --name flask \\
  --network flask-net \\
  -p 5000:5000 \\
  -e REDIS_HOST=redis \\
  flask-counter:v1.0

# Test
curl http://localhost:5000/count   # visits: 1
curl http://localhost:5000/count   # visits: 2

# Restart Flask - counter tetap ada!
docker restart flask
curl http://localhost:5000/count   # visits: 3 (lanjut dari 2!)
\`\`\`

### Penjelasan Persistence

**Saat Flask restart:** Flask container baru connect ke Redis yang masih running. Redis masih punya data counter. Counter lanjut dari nilai terakhir.

**Saat Redis di-delete dengan volume:**
\`\`\`bash
docker rm -f redis
docker run -d --name redis --network flask-net -v redis-counter-data:/data redis:alpine
\`\`\`
Volume redis-counter-data masih ada di host. Redis baru di-start dan mount volume yang sama. Redis load data dari file AOF saat startup. Counter value terestore!

**Saat Redis di-delete TANPA volume (volume juga di-hapus):**
\`\`\`bash
docker volume rm redis-counter-data  # Hapus volume!
docker run -d --name redis --network flask-net redis:alpine  # Tanpa -v
\`\`\`
Volume dihapus, data hilang permanent. Redis baru tidak punya data. Counter reset ke 0.

**Kesimpulan fundamental:** Data persistence bergantung pada volume, bukan container. Container adalah proses sementara. Volume adalah data permanen yang hidup di luar container lifecycle.

Prinsip ini - **stateless containers + stateful volumes** - adalah mindset yang harus selalu kamu pegang saat bekerja dengan Docker.`,
            keyTakeaway:
              "Data di volume persist independent dari container lifecycle. Flask restart tidak affect Redis. Redis container bisa diganti tapi data tetap ada kalau volume di-mount. Prinsip: stateless containers + stateful volumes.",
          },
          {
            type: "summary",
            title: "Rangkuman Modul 1: Fondasi Docker yang Solid",
            body: `Selamat menyelesaikan Modul 1! Kamu sudah menguasai semua fondasi Docker. Berikut recap lengkap:

### Container vs VM
- Container: share kernel, ringan (MB), start detik, ephemeral
- VM: full OS, berat (GB), boot menit, isolated penuh
- Container untuk microservices dan CI/CD, VM untuk full OS isolation

### Arsitektur Docker
- **Image**: Template read-only berlapis (layers), dibuat dari Dockerfile
- **Container**: Running instance dari image, ephemeral
- **Registry**: Docker Hub (publik) atau private (ECR, GCR, Harbor)
- **Daemon**: Background service yang manage segalanya
- **Client**: CLI untuk communicate dengan daemon

### Dockerfile
- FROM: Base image (gunakan Alpine untuk ukuran kecil)
- WORKDIR: Set working directory
- COPY: Copy files (taruh package.json DULU untuk cache)
- RUN: Execute command saat build (install deps)
- ENV: Default environment variables
- EXPOSE: Dokumentasi port
- CMD: Command saat container start

### Storage
- Ephemeral layer: hilang saat container delete
- **Named volumes**: Persistent, Docker-managed, untuk production
- **Bind mounts**: Mount dari host, untuk development hot-reload

### Networking
- Custom bridge networks: Support DNS by container name
- Internal: containers communicate by name, tidak butuh -p
- External: publish port dengan -p untuk akses dari luar

### Commands Penting
\`\`\`bash
docker pull         # Download image
docker build -t     # Build image dari Dockerfile
docker run -d -p    # Run container background + port mapping
docker ps / ps -a   # List containers (running / semua)
docker logs -f      # Stream logs
docker exec -it sh  # Shell access
docker inspect      # Metadata JSON
docker stop/rm      # Stop dan hapus
docker volume ls    # List volumes
\`\`\`

### Di Modul 2
Kamu akan belajar **Docker Compose** - orchestrate seluruh stack (app + DB + cache + nginx) dengan satu file YAML. Tidak perlu lagi jalankan 10 docker commands manual.`,
            keyTakeaway:
              "Docker fundamentals: Image (template) -> Container (running instance). Volumes untuk persistence, custom networks untuk inter-container comm, Dockerfile untuk build, env vars untuk config. Debug dengan logs, exec, inspect, stats.",
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang Docker Fundamentals",
            body: "Test pemahamanmu tentang image, container, Dockerfile, volumes, networking, dan debugging sebelum lanjut ke Docker Compose.",
          },
        ],
      },

      // ============================================================
      // MODUL 2: Docker Compose
      // ============================================================
      {
        title: "Docker Compose & Multi-Container Applications",
        slug: "docker-compose-multi-container",
        xpReward: 85,
        slides: [
          {
            type: "lesson",
            title: "Docker Compose: Orchestrate Multi-Container Apps",
            body: `Di Modul 1, untuk menjalankan stack sederhana (app + database + cache) kamu harus jalankan 8+ docker commands manual. Ribet, error-prone, dan susah di-share ke tim.

**Docker Compose** menyelesaikan ini. Kamu describe seluruh environment di satu file docker-compose.yml, lalu satu command untuk segalanya.

### Apa Itu Docker Compose?

Tool untuk define dan run multi-container Docker applications. Satu file YAML, satu command: docker compose up - seluruh stack berjalan dengan konfigurasi yang benar.

\`\`\`bash
docker compose up -d    # Start seluruh stack (background)
docker compose down     # Stop dan hapus containers + networks
\`\`\`

Developer baru clone repo dan jalankan docker compose up - environment langsung identik dengan milikmu.

### Struktur docker-compose.yml

\`\`\`yaml
version: '3.9'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"

  api:
    build: ./backend
    environment:
      DB_HOST: db
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`

Docker Compose otomatis membuat: satu default network untuk semua services + semua volumes yang didefinisikan.

Semua services dalam satu Compose file bisa reach satu sama lain **by service name** - bukan container name!

### Filosofi: Infrastructure as Code

docker-compose.yml adalah Infrastructure as Code untuk local environment. Commit ke Git bersama source code. Tidak ada lagi setup environment yang dokumentasinya outdated atau hilang.`,
            keyTakeaway:
              "Docker Compose orchestrate multi-container apps dari satu file YAML. docker compose up (start all), docker compose down (stop all). Services reach satu sama lain by service name. Infrastructure as Code - commit ke Git.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Compose Overview", url: "https://docs.docker.com/compose/" },
              { type: "DOCUMENTATION", title: "Compose File Reference", url: "https://docs.docker.com/compose/compose-file/" },
              { type: "YOUTUBE", title: "Docker Compose Tutorial", url: "https://www.youtube.com/watch?v=SXwC9fSwct8" },
            ],
          },
          {
            type: "lesson",
            title: "Menulis docker-compose.yml yang Komprehensif",
            body: `Mari pelajari semua fitur penting docker-compose.yml yang sering dipakai di production.

### Services: Build vs Image

\`\`\`yaml
services:
  # Dari public image
  database:
    image: postgres:15-alpine
    restart: unless-stopped

  # Build dari Dockerfile lokal
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    image: myapp-api:latest    # Optional: tag setelah build
\`\`\`

### Ports, Networks, Volumes

\`\`\`yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    networks:
      - frontend

  api:
    build: ./api
    networks:
      - frontend
      - backend

  database:
    image: postgres:15
    networks:
      - backend    # Tidak bisa diakses dari nginx!
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

networks:
  frontend:
  backend:

volumes:
  pgdata:
\`\`\`

### Environment Variables

\`\`\`yaml
services:
  api:
    environment:
      NODE_ENV: production
      PORT: 5000
      DB_PASSWORD: mysecret   # Atau gunakan referensi ke .env
    env_file:
      - .env          # Load semua vars dari file
      - .env.local    # Override dengan local file (gitignored)
\`\`\`

File .env di root project:
\`\`\`
DB_PASSWORD=supersecret
JWT_SECRET=myjwtsecret
\`\`\`

Docker Compose auto-load .env file di current directory. Gitignore .env!

### depends_on dengan Health Checks

\`\`\`yaml
services:
  api:
    depends_on:
      database:
        condition: service_healthy   # Tunggu sampai benar-benar siap
      redis:
        condition: service_started

  database:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
\`\`\`

Dengan condition: service_healthy, API benar-benar tunggu sampai database menerima koneksi - bukan hanya sampai container started.

### Restart Policies

\`\`\`yaml
restart: "no"              # Default
restart: always            # Selalu restart
restart: on-failure        # Hanya restart kalau error
restart: unless-stopped    # Restart kecuali di-stop manual (recommended production)
\`\`\``,
            keyTakeaway:
              "docker-compose.yml: services (build/image), ports (publish), networks (isolasi), volumes (named + bind), environment (.env file), depends_on dengan health checks (tunggu DB siap), restart policy.",
            sources: [
              { type: "DOCUMENTATION", title: "Compose File Reference v3", url: "https://docs.docker.com/compose/compose-file/compose-file-v3/" },
              { type: "ARTICLE", title: "Docker Compose Best Practices", url: "https://docs.docker.com/compose/production/" },
            ],
          },
          {
            type: "example",
            title: "Hands-On: Development Environment dengan Docker Compose",
            body: `Mari buat development environment lengkap untuk full-stack app dengan hot-reload menggunakan Docker Compose.

### Struktur Project

\`\`\`
myapp/
  frontend/   (Next.js / React)
  backend/    (Node.js / Express)
  docker-compose.yml
  .env
\`\`\`

### Dockerfile.dev untuk Backend (Hot Reload)

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install      # Install semua deps termasuk devDeps
COPY . .
CMD ["npx", "nodemon", "src/index.js"]
\`\`\`

### docker-compose.yml untuk Development

\`\`\`yaml
version: '3.9'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src     # Bind mount - hot reload!
      - /app/node_modules           # Anonymous volume - cegah override
    stdin_open: true

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "5000:5000"
    volumes:
      - ./backend/src:/app/src    # Bind mount - hot reload!
      - /app/node_modules
    environment:
      NODE_ENV: development
      DB_HOST: db
      DB_PASS: devpassword
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"    # Expose ke host untuk DB GUI (TablePlus, DBeaver)
    environment:
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: devpassword
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev -d myapp_dev"]
      interval: 5s
      retries: 5

  cache:
    image: redis:alpine
    ports:
      - "6379:6379"    # Expose ke host untuk debugging

volumes:
  pgdata:
\`\`\`

### Menjalankan

\`\`\`bash
docker compose up           # Start + attach (lihat semua logs)
docker compose up -d        # Background

\`\`\`bash
# Pagi - start
docker compose up -d

# Debugging
docker compose logs -f backend    # Follow logs backend saja

# Akses database
docker compose exec db psql -U dev -d myapp_dev

# Install package baru
docker compose exec backend npm install axios
docker compose restart backend

# Sore - stop
docker compose down
\`\`\`

Tips: Bind mount node_modules dengan anonymous volume (/app/node_modules) mencegah node_modules dari host di-overwrite ke container - ini penting karena native modules kompilasi per OS.`,
            keyTakeaway:
              "Dev environment dengan Compose: Bind mounts untuk hot-reload (./src:/app/src), anonymous volume untuk node_modules (/app/node_modules), expose DB port untuk GUI tools, health checks. docker compose up untuk start semua.",
          },
          {
            type: "lesson",
            title: "Docker Compose Commands yang Wajib Dikuasai",
            body: `Docker Compose punya banyak commands yang membantu pengelolaan stack.

### Start & Stop

\`\`\`bash
docker compose up              # Start + attach ke terminal
docker compose up -d           # Start detached (background)
docker compose up --build      # Rebuild images sebelum start
docker compose up api          # Start service tertentu saja
docker compose up -d --scale api=3  # Scale api ke 3 instances

docker compose stop            # Stop services (tidak hapus containers)
docker compose start           # Start containers yang di-stop
docker compose restart api     # Restart service tertentu

docker compose down            # Stop + hapus containers + networks
docker compose down -v         # + hapus volumes (HATI-HATI: data hilang!)
docker compose down --rmi all  # + hapus images
\`\`\`

### Monitoring & Debugging

\`\`\`bash
docker compose ps              # Status semua services
docker compose logs            # Logs semua services
docker compose logs -f         # Follow real-time
docker compose logs -f api     # Follow service tertentu
docker compose logs --tail 50 backend
docker compose top             # Processes di setiap container
docker compose stats           # Resource usage real-time
\`\`\`

### Interaksi dengan Service

\`\`\`bash
docker compose exec api sh                     # Shell ke service yang running
docker compose exec db psql -U postgres        # PostgreSQL CLI
docker compose exec cache redis-cli            # Redis CLI

docker compose run --rm api npm test           # One-off task (buat container baru)
docker compose run --rm api node scripts/seed.js
\`\`\`

Perbedaan exec vs run:
- exec: jalankan command di container yang **sedang running**
- run: buat container **baru** dari service, jalankan command, hapus (--rm)

### Build & Config

\`\`\`bash
docker compose build           # Build semua images
docker compose build api       # Build service tertentu
docker compose build --no-cache api  # Force rebuild tanpa cache
docker compose config          # Validate dan tampilkan merged config
\`\`\`

### Lifecycle Patterns Umum

**Development workflow:**
\`\`\`bash
git pull origin main
docker compose build      # Rebuild kalau ada perubahan Dockerfile
docker compose up -d
docker compose exec backend npm run migrate
docker compose logs -f backend frontend
\`\`\`

**Reset environment:**
\`\`\`bash
docker compose down -v     # Hapus containers + volumes
docker compose up --build  # Fresh start
\`\`\`

**Update single service tanpa downtime:**
\`\`\`bash
docker compose build api
docker compose up -d --no-deps api  # Update hanya api
\`\`\``,
            keyTakeaway:
              "Commands penting: up -d (start background), down -v (stop + hapus volumes), logs -f (stream logs), exec (command di running container), run --rm (one-off tasks), up --build (rebuild). scale untuk horizontal scaling.",
          },
          {
            type: "lesson",
            title: "Scaling, Profiles & Override Files",
            body: `Fitur lanjutan Docker Compose untuk manage environments berbeda dan scale services.

### Horizontal Scaling

\`\`\`bash
docker compose up -d --scale api=3
\`\`\`

Tapi ada masalah: port conflict! Kalau api define ports: "5000:5000", tidak bisa ada 3 container bind ke port 5000 yang sama.

**Solusi: Load Balancer di Depan**

\`\`\`yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"      # Hanya nginx yang publish port
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf

  api:
    build: ./api
    expose:
      - "5000"       # TIDAK publish ke host - hanya expose ke nginx
    environment:
      DB_HOST: db
\`\`\`

nginx.conf dengan upstream balancing akan otomatis balance ke semua api instances. Compose DNS resolution return semua IPs dari containers dengan nama service yang sama.

### Compose Profiles

\`\`\`yaml
services:
  api:
    build: ./api
    # Tanpa profile = selalu start

  db:
    image: postgres:15

  pgadmin:
    image: dpage/pgadmin4
    profiles:
      - tools          # Hanya start kalau profile "tools" aktif

  prometheus:
    image: prom/prometheus
    profiles:
      - monitoring
\`\`\`

\`\`\`bash
docker compose up -d                           # Hanya api + db
docker compose --profile tools up -d          # + pgadmin
docker compose --profile tools --profile monitoring up -d
\`\`\`

Profiles berguna untuk: optional development tools, monitoring stack, test services.

### Override Files untuk Environments Berbeda

**docker-compose.yml (base):**
\`\`\`yaml
services:
  api:
    build: ./api
    environment:
      DB_HOST: db
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
\`\`\`

**docker-compose.dev.yml (development overrides):**
\`\`\`yaml
services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile.dev
    volumes:
      - ./api/src:/app/src    # Bind mount untuk hot reload
    ports:
      - "5000:5000"
  db:
    ports:
      - "5432:5432"           # Expose ke host untuk DB GUI
\`\`\`

\`\`\`bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
\`\`\`

Share base config, override per environment. Tidak ada duplikasi.`,
            keyTakeaway:
              "Scale dengan --scale service=N + load balancer (jangan publish port individual). Profiles untuk conditional services (tools, monitoring). Override files untuk dev vs prod config sambil share base.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Compose Profiles", url: "https://docs.docker.com/compose/profiles/" },
              { type: "YOUTUBE", title: "Docker Compose in Production", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo" }
            ],
          },
          {
            type: "challenge",
            title: "Challenge: Migrasi 3 Commands Manual ke Docker Compose",
            body: `Sebuah startup punya 3 docker commands yang dijalankan manual setiap kali deploy:

\`\`\`bash
docker network create my-net

docker run -d --name db --network my-net -e POSTGRES_PASSWORD=secret postgres:15

docker run -d --name app --network my-net -p 8080:8080 -e DB_HOST=db -e DB_PASS=secret myapp:latest
\`\`\`

Tugasmu: Konversi 3 commands manual di atas menjadi satu file docker-compose.yml yang elegan dan best-practice.`,
            challenge: {
              instruction: "Tuliskan isi file docker-compose.yml yang setara dengan commands di atas.",
              inputType: "text",
              inputPlaceholder: "version: '3.8'\nservices:\n  ...",
              starterCode: "version: '3.8'\n",
              expectedConcepts: [
                "Mendefinisikan services db dan app",
                "Mapping ports untuk app",
                "Environment variables untuk db dan app",
                "TIDAK perlu explicit network (compose akan buat default network secara otomatis)"
              ],
              evaluationCriteria: "Evaluasi: (1) Format YAML valid. (2) Service db menggunakan image postgres:15 dan env POSTGRES_PASSWORD. (3) Service app menggunakan image myapp:latest, ports 8080:8080, env DB_HOST=db dan DB_PASS=secret. (4) Poin plus jika tidak menggunakan networks block (karena default network sudah cukup).",
              hints: [
                "Kamu tidak perlu mendefinisikan custom network di Compose, karena Compose otomatis membuat network default untuk semua services.",
                "Gunakan key 'environment' untuk passing -e."
              ],
              sampleAnswer: "version: '3.8'\nservices:\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: secret\n\n  app:\n    image: myapp:latest\n    ports:\n      - \"8080:8080\"\n    environment:\n      DB_HOST: db\n      DB_PASS: secret\n    depends_on:\n      - db"
            }
          },
          {
            type: "lesson",
            title: "Pembahasan Challenge: Migrasi ke Docker Compose",
            body: `Solusi yang paling elegan untuk challenge ini memanfaatkan fakta bahwa Docker Compose **otomatis membuat default network** untuk aplikasimu.

Kamu TIDAK perlu mendefinisikan network secara manual kecuali kamu butuh isolasi multi-network.

### Solusi Terbaik

\`\`\`yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    # Best practice: tambahkan volume untuk persistence (opsional di challenge, tapi wajib di real-world)
    volumes:
      - pgdata:/var/lib/postgresql/data

  app:
    image: myapp:latest
    ports:
      - "8080:8080"
    environment:
      DB_HOST: db
      DB_PASS: secret
    depends_on:
      - db

volumes:
  pgdata:
\`\`\`

**Kunci Pemahaman:**
1. **Networking Otomatis**: Docker Compose menaruh \`db\` dan \`app\` dalam network yang sama. Oleh karena itu, \`DB_HOST=db\` langsung bekerja!
2. **depends_on**: Menambahkan \`depends_on\` memastikan \`db\` di-start sebelum \`app\`.
3. **Persistensi**: Meskipun tidak diminta di command bash awal, developer berpengalaman akan selalu menambahkan volume untuk database di Compose.`,
            keyTakeaway: "Docker Compose menyederhanakan workflow. Ia otomatis menangani pembuatan network, sehingga container bisa saling berkomunikasi via nama service secara default."
          },
          {
            type: "lesson",
            title: "Docker Compose Networking: Service Discovery & Custom Networks",
            body: `Salah satu keajaiban Docker Compose adalah **service discovery otomatis**. Kamu tidak perlu repot mencari IP address container — cukup panggil nama service-nya.

### Default Network: Satu Network untuk Semua

Saat kamu menjalankan \`docker compose up\`, Compose secara otomatis membuat network bernama \`<project>_default\` dan menghubungkan semua service ke network tersebut.

\`\`\`yaml
services:
  api:
    image: myapp:latest
    # otomatis terdaftar di network default
    
  db:
    image: postgres:15
    # bisa diakses dari service api dengan hostname "db"

  redis:
    image: redis:7-alpine
    # bisa diakses dengan hostname "redis"
\`\`\`

Dengan network default ini, \`api\` bisa mengakses \`db\` dengan koneksi string:
\`postgresql://user:password@db:5432/mydb\`

### Custom Networks: Isolasi & Keamanan

Terkadang kamu perlu **memisahkan** service ke network berbeda untuk keamanan:

\`\`\`yaml
services:
  api:
    image: myapp:latest
    networks:
      - frontend
      - backend

  db:
    image: postgres:15
    networks:
      - backend  # DB hanya di backend network, tidak bisa diakses dari luar

  nginx:
    image: nginx:alpine
    networks:
      - frontend  # Nginx hanya di frontend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
\`\`\`

**Manfaat Custom Networks:**
1. **Isolasi keamanan** — database tidak terekspos ke service yang tidak berhak
2. **Organisasi** — logical separation antara layer aplikasi
3. **Bisa cross-project** — service dari dua compose file berbeda bisa bergabung di network yang sama

### External Networks: Menghubungkan Dua Proyek Compose

\`\`\`yaml
services:
  api:
    networks:
      - shared-network

networks:
  shared-network:
    external: true  # Network sudah dibuat di luar (oleh proyek lain)
\`\`\`

Ini berguna jika kamu punya compose file terpisah untuk monitoring (Prometheus + Grafana) dan ingin menghubungkannya ke aplikasimu tanpa menggabungkan semua service dalam satu file.

### Tips Networking
- Compose memberi nama container dengan format \`<project>_<service>_<index>\`
- Gunakan \`docker compose ps\` untuk melihat status network
- Untuk debugging, masuk ke container via \`docker compose exec api sh\` lalu coba \`ping db\``,
            keyTakeaway: "Docker Compose menyediakan service discovery otomatis — panggil service berdasarkan nama. Custom networks memberikan isolasi keamanan. External networks menghubungkan dua proyek Compose terpisah.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Compose Networking", url: "https://docs.docker.com/compose/networking/" }
            ]
          },
          {
            type: "lesson",
            title: "Environment Variables & File-based Configuration di Compose",
            body: `Aplikasi yang baik tidak pernah meng-hardcode konfigurasi. Environment variables adalah cara standar untuk mengelola konfigurasi yang berbeda antara development, staging, dan production.

Docker Compose menyediakan beberapa cara untuk mengelola environment variables:

### 1. Inline Environment Variables

Paling sederhana — tulis langsung di compose file:

\`\`\`yaml
services:
  app:
    image: myapp:latest
    environment:
      NODE_ENV: production
      DB_HOST: db
      DB_PORT: "5432"
      DB_NAME: myapp_prod
\`\`\`

### 2. File .env di Root Project

Buat file \`.env\` di folder yang sama dengan \`docker-compose.yml\`:

\`\`\`bash
# .env file
APP_VERSION=1.5.0
DB_PORT=5432
REDIS_PORT=6379
LOG_LEVEL=debug
\`\`\`

Kemudian gunakan variable substitution di compose file:

\`\`\`yaml
services:
  app:
    image: myapp:\${APP_VERSION:-latest}
    environment:
      DB_PORT: \${DB_PORT:-5432}
      LOG_LEVEL: \${LOG_LEVEL:-info}
\`\`\`

**Format \${VAR:-default}** — jika \`VAR\` tidak diset, gunakan nilai default. Ini membuat compose file tetap bisa jalan meskipun file .env tidak ada.

### 3. File env_file

Jika variabel environment terlalu banyak, pisahkan ke file terpisah:

\`\`\`yaml
services:
  db:
    image: postgres:15
    env_file:
      - ./config/db.env
\`\`\`

Isi file \`db.env\`:
\`\`\`
POSTGRES_USER=admin
POSTGRES_PASSWORD=supersecret
POSTGRES_DB=mydb
\`\`\`

### 4. File .env untuk Different Environments

Kamu bisa membuat beberapa file .env untuk environment berbeda:

\`\`\`
.env.development    # NODE_ENV=development, LOG_LEVEL=debug
.env.staging        # NODE_ENV=staging, LOG_LEVEL=info  
.env.production     # NODE_ENV=production, LOG_LEVEL=error
\`\`\`

Lalu pilih environment dengan \`--env-file\`:

\`\`\`bash
docker compose --env-file .env.production up -d
\`\`\`

### Best Practices

1. **Jangan commit .env production ke Git** — tambahkan \`.env.production\` ke \`.gitignore\`
2. **Sediakan file example** — \`.env.example\` yang berisi variabel tanpa nilai rahasia
3. **Gunakan default value** — \${VAR:-default} agar compose file tetap berfungsi tanpa .env
4. **Untuk rahasia (password, API key)**, jangan gunakan .env di production — gunakan Docker Secrets (akan dibahas di Modul 4)`,
            keyTakeaway: "Docker Compose mendukung environment variables via inline, file .env, dan env_file. Gunakan variable substitution (${VAR:-default}) untuk fleksibilitas. Jangan commit .env production ke Git.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Compose Environment Variables", url: "https://docs.docker.com/compose/environment-variables/" }
            ]
          },
          {
            type: "summary",
            title: "Rangkuman Modul 2: Orchestration Lokal dengan Compose",
            body: `Di modul ini, kita mengubah cara pandang dari "satu container" menjadi "satu aplikasi utuh".

### Point Penting Docker Compose
- **Satu file untuk semua**: \`docker-compose.yml\` mendefinisikan semua services, network, dan volumes yang dibutuhkan aplikasi.
- **Infrastructure as Code**: Konfigurasi environment yang dulunya bash script panjang sekarang jadi YAML yang deklaratif dan bisa di-version control.
- **Networking by default**: Semua services dalam compose file bisa saling memanggil via nama servicenya (misal \`db\`, \`cache\`, \`api\`).
- **Commands**: 
  - \`docker compose up -d\` -> Jalankan semua di background
  - \`docker compose down\` -> Matikan dan bersihkan
  - \`docker compose logs -f\` -> Pantau log real-time
- **Scaling & Profiles**: Bisa melakukan horizontal scaling (\`--scale\`) dan menyalakan sebagian service berdasarkan \`profiles\`.

Modul selanjutnya kita akan membawa aplikasi Docker ini dari environment lokal ke lingkungan **Production** dengan CI/CD dan praktek deployment yang aman!`,
            keyTakeaway: "Compose adalah standar industri untuk local development orchestration. Satu command 'docker compose up' harus cukup untuk menyalakan seluruh stack projectmu."
          },
          {
            type: "lesson",
            title: "Docker Compose Profiles",
            body: `Docker Compose Profiles memungkinkan kamu mendefinisikan lingkungan yang berbeda dalam satu file \`docker-compose.yml\`. Misalnya, kamu punya service \`debug-tools\` yang hanya mau dijalankan saat debugging.

### Menambahkan Profiles
Kamu bisa menambahkan flag \`profiles\` ke dalam service:

\`\`\`yaml
services:
  app:
    image: myapp:latest
  debug-tools:
    image: adminer
    profiles:
      - debug
\`\`\`

Jika kamu jalankan \`docker compose up\`, service \`debug-tools\` TIDAK akan dijalankan.

Untuk menjalankannya, gunakan:
\`\`\`bash
docker compose --profile debug up
\`\`\`
Ini sangat berguna untuk mengatur service opsional seperti testing databases, UI admin, atau monitoring stack.`,
            keyTakeaway: "Gunakan Profiles untuk mengontrol service mana yang dijalankan berdasarkan environment atau konteks tanpa perlu memisahkan file YAML.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Compose Profiles", url: "https://docs.docker.com/compose/profiles/" },
              { type: "YOUTUBE", title: "Docker Compose Profiles Tutorial", url: "https://www.youtube.com/watch?v=QQ_3A4ED2LQ" }
            ]
          },
          {
            type: "lesson",
            title: "Docker Compose Overrides",
            body: `Bagaimana jika tim developer memiliki preferensi lokal yang berbeda, tapi tidak boleh mengubah \`docker-compose.yml\` utama? Gunakan **Overrides**.

Secara default, jika ada file bernama \`docker-compose.override.yml\` di folder yang sama, Docker Compose akan menggabungkannya secara otomatis saat kamu menjalankan \`docker compose up\`.

### docker-compose.yml (Base)
\`\`\`yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
\`\`\`

### docker-compose.override.yml (Lokal)
\`\`\`yaml
services:
  web:
    ports:
      - "8080:80" # Override port lokal
    environment:
      - DEBUG=true
\`\`\`

Sekarang \`web\` akan berjalan di port 8080 di lokalmu. Kamu bisa mengabaikan (gitignore) file override ini agar konfigurasi lokal tidak masuk ke repositori.`,
            keyTakeaway: "Gunakan docker-compose.override.yml untuk menimpa konfigurasi service di mesin lokalmu tanpa mengotori file konfigurasi utama.",
            sources: [
              { type: "DOCUMENTATION", title: "Multiple Compose Files", url: "https://docs.docker.com/compose/multiple-compose-files/" },
              { type: "YOUTUBE", title: "Docker Compose Override Tutorial", url: "https://www.youtube.com/watch?v=QQ_3A4ED2LQ" }
            ]
          },
          {
            type: "lesson",
            title: "Docker Compose Watch (Sinkronisasi Kode Instan)",
            body: `Docker Compose Watch adalah fitur baru yang revolusioner untuk development. Menggunakan \`bind mounts\` kadang bisa lambat atau bermasalah di macOS/Windows. \`Watch\` menyinkronkan file secara otomatis ke dalam container tanpa perlu me-restart container secara penuh!

### Cara Menggunakan Watch

Tambahkan konfigurasi \`watch\` ke servicemu:

\`\`\`yaml
services:
  frontend:
    build: ./frontend
    develop:
      watch:
        - action: sync
          path: ./frontend/src
          target: /app/src
          ignore:
            - node_modules/
        - action: rebuild
          path: ./frontend/package.json
\`\`\`

Jalankan dengan perintah:
\`\`\`bash
docker compose up --watch
\`\`\`

Sekarang, setiap perubahan di \`./frontend/src\` akan langsung di-sync ke dalam container (seperti live-reload). Namun, jika kamu mengubah \`package.json\`, Compose akan otomatis me-rebuild image!`,
            keyTakeaway: "Docker Compose Watch adalah fitur modern pengganti bind mounts kompleks yang memberikan pengalaman live-reload terbaik saat development.",
            sources: [
              { type: "DOCUMENTATION", title: "Use Compose Watch", url: "https://docs.docker.com/compose/file-watch/" },
              { type: "YOUTUBE", title: "Docker Compose Watch in Action", url: "https://www.youtube.com/watch?v=QQ_3A4ED2LQ" }
            ]
          },
          {
            type: "lesson",
            title: "Security Best Practices di Docker Compose",
            body: `Saat menggunakan Docker Compose, jangan lupakan keamanan! Berikut beberapa praktik terbaik:

### 1. Jangan Hardcode Secrets
Jangan pernah menyimpan password langsung di \`docker-compose.yml\`. Gunakan file \`.env\`.
\`\`\`yaml
# BURUK
environment:
  DB_PASS: "supersecret123"

# BAIK
environment:
  DB_PASS: \${DB_PASS}
\`\`\`

### 2. Gunakan Secrets Management (Docker Secrets)
Untuk produksi (Swarm mode), gunakan fitur \`secrets\`:
\`\`\`yaml
services:
  db:
    image: postgres
    secrets:
      - db_password
secrets:
  db_password:
    file: ./db_password.txt
\`\`\`

### 3. Batasi Resource (CPU & RAM)
Cegah satu service memonopoli resource mesin lokalmu:
\`\`\`yaml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
\`\`\`
Menerapkan batasan ini mencegah crash tak terduga pada host akibat memory leak di dalam container.`,
            keyTakeaway: "Amankan secrets dengan file .env, gunakan Docker secrets untuk produksi, dan batasi resource usage (CPU/RAM) agar host tetap stabil.",
            sources: [
              { type: "ARTICLE", title: "Docker Compose Security", url: "https://docs.docker.com/compose/production/" },
              { type: "YOUTUBE", title: "Docker Compose Security Practices", url: "https://www.youtube.com/watch?v=QQ_3A4ED2LQ" }
            ]
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahaman Docker Compose",
            body: "Mari uji pemahamanmu tentang syntax, command, dan best practice Docker Compose."
          }
        ]
      },

      // ============================================================
      // MODUL 3: Multi-Stage Builds & Optimasi
      // ============================================================
      {
        title: "Multi-Stage Builds & Optimasi Image",
        slug: "multi-stage-builds-optimasi",
        xpReward: 90,
        slides: [
          {
            type: "lesson",
            title: "Mengapa Ukuran Image Penting?",
            body: `Sejauh ini, kita membuat Docker image dengan pendekatan standar: \`FROM node:20\`, lalu \`npm install\`, \`COPY source code\`, dan \`CMD start\`.

Namun, pendekatan ini seringkali menghasilkan ukuran image yang sangat besar (bisa lebih dari 1GB) karena:
1. **Tooling Lengkap**: Base image seperti \`node:20\` atau \`python:3\` berisi banyak tools pengembangan (compilers, git, dll) yang tidak dibutuhkan saat aplikasi dijalankan.
2. **Dependencies Dev**: Folder \`node_modules\` bisa jadi memuat dependencies untuk testing dan linting.
3. **Layer Accumulation**: Setiap instruksi \`RUN\`, \`COPY\`, atau \`ADD\` di Dockerfile menambah sebuah "layer" baru ke dalam image.

### Masalah Image Besar di Production
- **Waktu Deploy Lebih Lama**: Membutuhkan waktu yang signifikan untuk menarik (pull) image 1GB+ ke server production setiap kali deploy.
- **Biaya Storage**: Registry seperti AWS ECR atau Docker Hub akan memakan biaya storage yang besar.
- **Surface Area Serangan Lebih Luas**: Semakin banyak paket dan tools di dalam image (seperti \`wget\`, \`curl\`, bash), semakin besar celah bagi hacker/attacker untuk mengeksploitasinya.

Di modul ini, kita akan mempelajari teknik paling powerful di Docker: **Multi-Stage Builds**.`,
            keyTakeaway: "Image yang besar lambat saat deploy, memakan biaya storage, dan memiliki risiko keamanan (attack surface) yang lebih tinggi.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Best Practices — Image Size", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" }
            ]
          },
          {
            type: "lesson",
            title: "Konsep Multi-Stage Builds",
            body: `**Multi-Stage Build** adalah pola pembuatan Dockerfile dimana kita memisahkan proses "Build" dan "Runtime" ke dalam beberapa tahapan (stages).

Daripada menggunakan satu blok \`FROM\`, kita menggunakan beberapa blok \`FROM\`. Stage terakhir adalah image final yang akan disimpan. Kita bisa menyalin (copy) artifact (seperti file binary, atau hasil build) dari stage sebelumnya ke stage final.

### Keuntungan Utama
1. **Tidak Ada Build Tools di Production**: Compiler dan dev-dependencies tertinggal di stage pertama.
2. **Ukuran Image Sangat Kecil**: Image final hanya berisi hal yang mutlak diperlukan untuk menjalankan aplikasi.
3. **Dockerfile Tetap Satu**: Tidak perlu memisahkan Dockerfile.build dan Dockerfile.prod. Semuanya terpusat.

### Anatomi Dasar Multi-Stage Build

\`\`\`dockerfile
# Stage 1: Build (Kita beri nama alias "builder")
FROM golang:1.20 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp main.go

# Stage 2: Runtime (Image final)
FROM alpine:latest
WORKDIR /root/
# Hanya copy file binary dari stage "builder"
COPY --from=builder /app/myapp .
CMD ["./myapp"]
\`\`\`

Dengan cara ini, image Go yang asalnya 800MB (karena ada golang SDK) bisa menyusut drastis menjadi hanya sekitar **10-15MB** (karena Alpine + binary saja)!`,
            keyTakeaway: "Multi-stage builds memisahkan tahapan compile/build dengan tahapan runtime, memungkinkan kita menyalin hanya file hasil kompilasi ke dalam image final yang bersih dan kecil.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Multi-Stage Builds Overview", url: "https://docs.docker.com/build/building/multi-stage/" }
            ]
          },
          {
            type: "lesson",
            title: "Multi-Stage Build pada Node.js/React",
            body: `Implementasi Multi-Stage Build sangat populer untuk aplikasi berbasis JavaScript modern seperti React, Vue, atau Angular.

Aplikasi frontend biasanya membutuhkan Node.js (ratusan MB) untuk proses \`npm run build\` yang menghasilkan file statis HTML, CSS, dan JS. Namun, untuk **menjalankannya** di production, kita sama sekali tidak butuh Node.js! Kita hanya butuh web server statis seperti **Nginx** (sekitar 20MB).

### Contoh: Dockerfile untuk React App

\`\`\`dockerfile
# ---------------------------------------------------
# STAGE 1: Build Frontend (Menggunakan Node.js)
# ---------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (memanfaatkan cache layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code dan build
COPY . .
RUN npm run build
# Hasilnya ada di folder /app/build/ (atau /app/dist/)

# ---------------------------------------------------
# STAGE 2: Runtime Server (Menggunakan Nginx)
# ---------------------------------------------------
FROM nginx:alpine

# (Opsional) Copy custom konfigurasi nginx jika ada
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Salin HANYA file statis hasil build dari stage "builder"
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

**Hasil:** Image final tidak lagi mengandung source code React, folder \`node_modules\`, ataupun NodeJS. Image ini sangat ringan dan aman, langsung melayani file statis via Nginx.`,
            keyTakeaway: "Untuk frontend apps (React/Vue/Angular), gunakan Node.js di stage pertama untuk build, lalu pindahkan hasil statisnya ke stage kedua yang menggunakan Nginx.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Multi-Stage Builds", url: "https://docs.docker.com/build/building/multi-stage/" },
              { type: "YOUTUBE", title: "Docker Multi-Stage Build Tutorial", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo" }
            ]
          },
          {
            type: "challenge",
            title: "Challenge: Optimasi Image Backend Node.js",
            body: `Berbeda dengan React yang di-serve statis via Nginx, Backend Node.js (seperti Express atau NestJS) tetap membutuhkan \`Node.js\` runtime di production.

Namun, kita tetap bisa menggunakan Multi-Stage Build untuk **membuang devDependencies** dan tools kompilasi TypeScript.

\`\`\`json
// package.json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/express": "^4.17.17"
  }
}
\`\`\`

Tugasmu: Tuliskan instruksi Dockerfile Multi-Stage yang optimal untuk aplikasi backend TypeScript di atas.`,
            challenge: {
              instruction: "Tulis Multi-Stage Dockerfile untuk backend Node.js (TypeScript). Stage 1 untuk build (install semua deps, compile tsc). Stage 2 untuk runtime (hanya install deps production, copy hasil compile).",
              inputType: "text",
              inputPlaceholder: "FROM node:20-alpine AS builder\n...",
              starterCode: "FROM node:20-alpine AS builder\nWORKDIR /app\n",
              expectedConcepts: [
                "Ada dua stage (AS builder dan final stage)",
                "Stage 1 menjalankan npm ci dan tsc/build",
                "Stage 2 menjalankan npm ci --only=production (atau omit devDeps)",
                "Stage 2 mengambil copy --from=builder HANYA folder hasil build (misal /app/dist)"
              ],
              evaluationCriteria: "Evaluasi: (1) Minimal ada 2 instruksi FROM. (2) Stage builder melakukan kompilasi TS. (3) Stage final hanya menginstall production dependency (tanpa typescript). (4) Stage final mengcopy direktori /dist dari builder.",
              hints: [
                "Di stage final, kamu tetap butuh FROM node:20-alpine karena ini aplikasi backend Node.js, bukan web statis Nginx.",
                "Kamu butuh COPY package.json dan menjalankan npm install --omit=dev di stage final agar hanya package Express yang terinstall."
              ],
              sampleAnswer: "FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY --from=builder /app/dist ./dist\nCMD [\"node\", \"dist/index.js\"]"
            }
          },
          {
            type: "lesson",
            title: "Pembahasan Challenge & Best Practices",
            body: `Solusi yang paling optimal untuk backend Node.js (TypeScript) melibatkan sedikit trik:

\`\`\`dockerfile
# STAGE 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci            # Install ALL dependencies (termasuk TypeScript)
COPY . .
RUN npm run build     # Compile .ts menjadi .js (muncul folder /dist)

# STAGE 2: Production
FROM node:20-alpine
WORKDIR /app

# Kita hanya install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Kita copy hasil compile dari stage builder
COPY --from=builder /app/dist ./dist

# Best Practice Security: Jangan run sebagai root!
USER node

EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

### 3 Best Practice Tambahan
1. **Gunakan Alpine**: Base \`alpine\` selalu lebih kecil dan lebih aman karena mengurangi library OS yang tidak dipakai.
2. **USER node**: Secara default, Docker menjalankan aplikasi sebagai user \`root\`. Ini berbahaya jika ada celah eksploitasi. Selalu gunakan non-root user. Image Node resmi sudah menyediakan user \`node\`.
3. **Layer Caching**: Selalu pisahkan \`COPY package*.json\` dan \`RUN npm ci\` sebelum mengcopy seluruh source code (\`COPY . .\`). Ini akan menghemat waktu build secara drastis saat kodemu berubah tapi dependenciesnya tidak.`,
            keyTakeaway: "Backend Multi-Stage: Stage pertama untuk kompilasi (TS ke JS), Stage kedua murni Node runtime dengan production dependencies (tanpa devDeps), dan dijalankan dengan user non-root.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Best Practices — Multi-Stage", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#use-multi-stage-builds" }
            ]
          },
          {
            type: "lesson",
            title: "Best Practice Dockerfile: .dockerignore",
            body: `Salah satu kesalahan terbesar pemula adalah meng-copy seluruh folder secara membabi buta menggunakan perintah:
COPY . .

Ini sangat berbahaya karena kamu bisa tanpa sengaja memasukkan:
- Folder \`node_modules\` lokal (yang dikompilasi untuk OS komputermu, bukan Linux container)
- File \`.env\` yang berisi password rahasia production
- Folder \`.git\` yang ukurannya bisa ratusan MB

Solusinya adalah file **.dockerignore**. `,
            keyTakeaway: "Gunakan .dockerignore untuk menghindari file lokal yang tidak perlu masuk ke dalam Docker Image.",
            sources: [
              { type: "DOCUMENTATION", title: "Dockerignore file", url: "https://docs.docker.com/engine/reference/builder/#dockerignore-file" }
            ]
          },
          {
            type: "lesson",
            title: "Mengenal Alpine Linux",
            body: `Jika kamu perhatikan, hampir semua tutorial menggunakan image dengan akhiran \`-alpine\` (misal \`node:20-alpine\`). Alpine Linux adalah distribusi Linux super ringan yang dirancang khusus untuk container.

Ukuran base image Alpine hanya sekitar 5 MB, dibandingkan Ubuntu yang berukuran >70 MB. Ini sangat menghemat waktu download, upload, dan mengurangi celah keamanan.`,
            keyTakeaway: "Alpine Linux adalah standar industri untuk base image container karena ukurannya yang super kecil.",
            sources: [
              { type: "DOCUMENTATION", title: "Alpine Linux", url: "https://alpinelinux.org/about/" }
            ]
          },
          {
            type: "lesson",
            title: "Security Scanning pada Image",
            body: `Docker Image terdiri dari berbagai lapisan sistem operasi dan library pihak ketiga. Bagaimana jika library tersebut memiliki celah keamanan (CVE)?

Kamu dapat menggunakan alat seperti **Trivy** atau **Docker Scout** untuk memindai imagemu:
docker scout cves myapp:latest

Ini akan menampilkan daftar kerentanan yang perlu kamu perbaiki dengan memperbarui base image.`,
            keyTakeaway: "Lakukan pemindaian kerentanan (vulnerability scanning) pada image sebelum di-deploy ke production.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Scout", url: "https://docs.docker.com/scout/" }
            ]
          },
          {
            type: "lesson",
            title: "HEALTHCHECK: Container yang Sehat Itu Dipantau",
            body: `Salah satu fitur Docker yang sering dilewatkan pemula adalah **HEALTHCHECK**. Fitur ini memungkinkan Docker untuk secara otomatis mengecek apakah aplikasi di dalam container berjalan dengan benar — bukan sekadar apakah prosesnya hidup.

### Tanpa HEALTHCHECK — "Buta" terhadap Kondisi Aplikasi

Bayangkan kamu menjalankan container web server. Proses Nginx berjalan (\`docker ps\` menunjukkan status "Up"), tapi aplikasi sebenarnya sedang dalam keadaan error (misal: database disconnect, port tidak listen). Docker tidak tahu!

Dengan HEALTHCHECK, Docker secara periodik menjalankan perintah di dalam container. Jika perintah gagal beberapa kali berturut-turut, container ditandai sebagai "unhealthy".

### Sintaks Dasar

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=40s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "server.js"]
\`\`\`

Penjelasan setiap parameter:
- **--interval=30s**: Docker akan menjalankan health check setiap 30 detik.
- **--timeout=5s**: Jika perintah health check tidak selesai dalam 5 detik, dianggap gagal.
- **--retries=3**: Setelah 3 kali gagal berturut-turut, container baru dianggap "unhealthy".
- **--start-period=40s**: Docker memberi waktu 40 detik pertama untuk startup aplikasi (app mungkin butuh koneksi database). Selama periode ini, kegagalan health check tidak dihitung.
- **CMD**: Perintah yang dijalankan. \`wget --spider\` mengecek apakah URL merespons tanpa mendownload kontennya.

### Cek Status di Docker ps

Jika HEALTHCHECK ditambahkan, kolom STATUS akan menampilkan informasi kesehatan:
\`\`\`
CONTAINER ID   IMAGE        STATUS
abc123         myapp:latest Up 2 minutes (healthy)
def456         myapp:latest Up 5 minutes (unhealthy)
\`\`\`

### Best Practice Endpoint Health

Aplikasi production harus memiliki endpoint \`/health\` atau \`/healthz\` yang tidak hanya mengembalikan 200 OK, tetapi juga memverifikasi koneksi ke dependency:
- Cek koneksi database (PostgreSQL/MySQL)
- Cek koneksi Redis/Cache
- Cek disk space
- Return 200 kalau semua OK, return 503 jika ada yang error

Dengan HEALTHCHECK, orchestrator seperti Docker Swarm atau Kubernetes tahu kapan harus merestart container secara otomatis tanpa campur tangan manusia. Ini adalah fondasi **self-healing infrastructure**.`,
            keyTakeaway: "HEALTHCHECK memungkinkan Docker mengecek kesehatan aplikasi secara berkala, bukan hanya status proses. Tambahkan endpoint /health di aplikasi dan HEALTHCHECK di Dockerfile untuk self-healing infrastructure.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker HEALTHCHECK", url: "https://docs.docker.com/reference/dockerfile/#healthcheck" }
            ]
          },
          {
            type: "lesson",
            title: "Resource Constraints: Membatasi Memori & CPU Container",
            body: `Bayangkan satu container aplikasi yang memory leak — perlahan tapi pasti, ia memakan seluruh RAM server. Akibatnya, semua container lain di server yang sama ikut crash terkena "noisy neighbor" effect. Di sinilah **Resource Constraints** menjadi penting.

Docker secara default memberikan akses **unlimited** CPU dan RAM ke setiap container. Ini sangat berbahaya di environment multi-tenant (satu server menjalankan banyak container). Kamu WAJIB membatasi resource agar satu container tidak memonopoli seluruh server.

### Membatasi Memory — Parameter \`--memory\`

\`\`\`bash
docker run -d --name myapp \\
  --memory="512m" \\
  --memory-swap="1g" \\
  myapp:latest
\`\`\`

- **--memory (atau -m)**: Batas keras memory. Jika container melebihi 512 MB, kernel Linux akan membunuh container tersebut (OOM: Out Of Memory).
- **--memory-swap**: Batas total memory + swap (default: 2x memory). Dengan nilai 1g, container bisa menggunakan 512 MB RAM + 512 MB swap. Jika kamu tidak ingin menggunakan swap sama sekali, setel ke angka yang sama dengan \`--memory\`.

### Membatasi CPU — Parameter \`--cpus\`

\`\`\`bash
docker run -d --name myapp \\
  --cpus="1.5" \\
  myapp:latest
\`\`\`

Container ini dijamin tidak akan menggunakan lebih dari 1.5 core CPU, meskipun server memiliki 16 core. Ini penting untuk aplikasi yang melakukan komputasi berat (video encoding, data processing, dll).

### Konfigurasi di Docker Compose

Di \`docker-compose.yml\`, resource constraints ditulis dalam format yang jauh lebih rapi:

\`\`\`yaml
services:
  api:
    image: myapp:latest
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: "512M"
        reservations:
          cpus: "0.25"
          memory: "128M"
\`\`\`

**Perbedaan \`limits\` vs \`reservations\`:**
- **limits**: Batas maksimum — container tidak boleh melebihi ini.
- **reservations**: Jaminan minimum — Docker menjamin container akan mendapatkan setidaknya resource ini. Jika server sibuk, container priority rendah tidak boleh mengambil resource yang sudah di-reserve untuk container lain.

### Mengapa Ini Penting di Production?

Tanpa resource constraints, satu container yang bermasalah bisa menjatuhkan seluruh server:
- Satu container Node.js dengan memory leak → habiskan RAM server → OOM kill → semua container mati.
- Satu container Python dengan infinite loop → pakai 100% CPU → server collapse → semua aplikasi lambat.

Di perusahaan, DevOps Engineer selalu menetapkan resource limits before deployment. Ini adalah standard operational practice yang membedakan setup amatir dari setup professional.`,
            keyTakeaway: "Selalu batasi memory (--memory) dan CPU (--cpus) setiap container — baik di CLI Docker maupun Docker Compose. Ini mencegah 'noisy neighbor' effect di environment multi-tenant.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Resource Constraints", url: "https://docs.docker.com/config/containers/resource_constraints/" }
            ]
          },
          {
            type: "lesson",
            title: "Docker BuildKit: Build Engine Modern & Caching Optimal",
            body: `Sejak Docker 18.09, Docker menyertakan build engine baru bernama **BuildKit**. BuildKit adalah versi modern dari builder klasik Docker — lebih cepat, lebih aman, dan memberikan kontrol lebih terhadap proses build.

### Mengaktifkan BuildKit

BuildKit sudah menjadi default di Docker versi terbaru. Namun, jika kamu menggunakan versi lama, aktifkan dengan:

\`\`\`bash
export DOCKER_BUILDKIT=1
docker build .
\`\`\`

### Fitur Unggulan BuildKit

**1. Concurrent Build (Build Paralel)**
Builder klasik memproses instruksi Dockerfile secara sekuensial satu per satu. BuildKit bisa memproses beberapa instruksi secara paralel jika tidak ada dependensi — mempercepat build hingga 2-3x lipat.

**2. Improved Cache Invalidation**
BuildKit menggunakan content-based hashing, bukan modification timestamp. Ini berarti cache lebih akurat — perubahan hanya pada file yang benar-benar berubah, bukan karena metadata file.

**3. Cache Mount: \`--mount=type=cache\`**

Fitur revolusioner BuildKit — kamu bisa menyimpan cache npm, pip, apt, atau Maven agar persist antar build:

\`\`\`dockerfile
# syntax=docker/dockerfile:1.2
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \\
    npm ci
COPY . .
RUN --mount=type=cache,target=/root/.npm \\
    npm run build
\`\`\`

Perhatikan baris pertama: \`# syntax=docker/dockerfile:1.2\` — ini memberi tahu Docker untuk menggunakan syntax BuildKit yang lebih baru.

Tanpa cache mount, setiap kali \`npm ci\` dijalankan, npm harus mendownload semua package dari internet. Dengan cache mount, package yang sudah di-download tersimpan di cache host dan langsung digunakan — **penghematan waktu build hingga 80%**.

**4. SSH Mount: \`--mount=type=ssh\`**

Untuk mengakses repositori privat (misal GitHub private repo) saat build:

\`\`\`dockerfile
# syntax=docker/dockerfile:1.2
FROM node:20-alpine AS builder
RUN --mount=type=ssh \\
    git clone git@github.com:company/private-repo.git
\`\`\`

Lalu build dengan:
\`\`\`bash
docker build --ssh default=$HOME/.ssh/id_rsa .
\`\`\`

Ini lebih aman daripada meng-copy SSH key ke dalam image (yang bisa bocor jika image dipush ke registry).

### Docker Buildx: Build untuk Multi-Platform

Buildx adalah CLI plugin yang memperluas BuildKit untuk mendukung multi-platform builds. Kamu bisa membangun image untuk ARM (Raspberry Pi, AWS Graviton) dan AMD64 secara bersamaan dari satu mesin:

\`\`\`bash
docker buildx build --platform linux/amd64,linux/arm64 \\
  -t myapp:latest --push .
\`\`\`

Ini adalah standar industri untuk membangun image yang bisa berjalan di berbagai arsitektur CPU.`,
            keyTakeaway: "BuildKit adalah build engine modern Docker dengan build paralel, cache mount (npm/pip), SSH mount, dan multi-platform build via Buildx. Aktifkan dengan DOCKER_BUILDKIT=1.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker BuildKit Overview", url: "https://docs.docker.com/build/buildkit/" },
              { type: "DOCUMENTATION", title: "Docker Buildx — Multi-Platform Builds", url: "https://docs.docker.com/build/building/multi-platform/" },
            ]
          },
          {
            type: "lesson",
            title: "Rootless Docker & Keamanan Container Tingkat Lanjut",
            body: `Meskipun Docker memberikan isolasi container, secara default daemon Docker berjalan sebagai **root**. Jika seseorang berhasil kabur dari container (container escape), mereka bisa mendapatkan akses root ke host. Ini adalah risiko keamanan serius.

### Rootless Docker

Docker menyediakan mode **Rootless** — menjalankan daemon Docker dan seluruh containernya sebagai user non-root (bukan root).

\`\`\`bash
# Instalasi rootless (sudah termasuk di Docker Desktop)
dockerd-rootless-setuptool.sh install

# Menjalankan perintah Docker tanpa root
docker context use rootless
docker run -d -p 8080:80 nginx:alpine
\`\`\`

**Keuntungan Rootless Mode:**
1. Container escape hanya memberikan akses ke user non-root, bukan root penuh
2. Tidak perlu privilege escalation
3. Cocok untuk multi-tenant environment berbagi satu server

**Kekurangan:**
1. Tidak bisa menggunakan port di bawah 1024 (80, 443) — perlu reverse proxy
2. Beberapa fitur storage driver (overlay2) tidak didukung di semua distribusi
3. Performa sedikit lebih rendah karena ekstra layer namespace

### Read-Only Root Filesystem

Ini adalah best practice keamanan yang paling sederhana namun sangat efektif:

\`\`\`bash
docker run --read-only --tmpfs /tmp myapp:latest
\`\`\`

Dengan \`--read-only\`, filesystem container menjadi **immutable** — tidak bisa menulis file apa pun. Jika aplikasi mencoba menulis file, operasi akan gagal. Ini mencegah serangan yang menulis malware ke dalam container.

Gunakan \`--tmpfs\` untuk mount sementara di folder yang memang perlu writable (/tmp, /var/run).

### Capabilities: Hapus Privilege yang Tidak Diperlukan

Secara default, Docker memberikan sekitar 14 Linux capabilities ke setiap container (dari total 40+). Prinsip Least Privilege mengatakan: matikan semua capabilities yang tidak dibutuhkan:

\`\`\`bash
# Hanya berikan kemampuan networking (bind port)
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp:latest

# Untuk aplikasi yang tidak perlu networking sama sekali (misal batch job)
docker run --cap-drop=ALL my-batch-job:latest
\`\`\`

### Security Checklist Production

Sebelum mendorong container ke production, pastikan checklist ini terpenuhi:

| Praktik | Command |
|---------|---------|
| Jangan root | \`USER node\` di Dockerfile |
| Read-only FS | \`--read-only\` |
| Drop all capabilities | \`--cap-drop=ALL --cap-add=NEEDED\` |
| Resource limits | \`--memory=512m --cpus=1\` |
| Healthcheck | \`HEALTHCHECK\` di Dockerfile |
| No privileged mode | Jangan pernah \`--privileged\` |
| Security scanning | \`docker scout cves myapp\` |
| Non-default seccomp | Gunakan seccomp profile ketat |

Dengan menerapkan semua praktik ini, container-mu akan memiliki postur keamanan yang setara dengan standar perusahaan teknologi besar.`,
            keyTakeaway: "Rootless Docker menjalankan container tanpa root privilege. Tambahkan --read-only, --cap-drop=ALL, dan --security-opt=no-new-privileges untuk keamanan maksimal di production.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Rootless Mode", url: "https://docs.docker.com/engine/security/rootless/" },
              { type: "DOCUMENTATION", title: "Docker Security Best Practices", url: "https://docs.docker.com/develop/security-best-practices/" },
            ]
          },
          {
            type: "summary",
            title: "Rangkuman Modul 3: Optimasi Docker",
            body: `Di modul ini, kita belajar bahwa Dockerfile yang bekerja di lokal belum tentu siap untuk production.

- **Ukuran Image Sangat Penting**: Menghemat biaya, mempercepat deploy, dan meningkatkan keamanan.
- **Multi-Stage Builds**: Solusi terbaik untuk memisahkan *build-time tools* dari *runtime environment*.
- **Frontend App**: Build menggunakan \`node\` stage, lalu oper hasil statis (HTML/CSS/JS) ke \`nginx\` stage.
- **Backend App**: Build menggunakan \`node\` stage dengan semua devDeps, lalu oper hasil compile ke \`node\` stage baru yang hanya memiliki dependencies production.
- **Security Dasar**: Selalu ganti user dari \`root\` menjadi user terbatas (misal \`USER node\`) pada instruksi terakhir Dockerfile.

Keahlian menulis Dockerfile yang bersih dan optimal membedakan antara developer Docker pemula dan DevOps Engineer Profesional.`,
            keyTakeaway: "Optimasi ukuran image dengan Multi-Stage Build bukan sekedar teori, tapi adalah kewajiban (mandatory) untuk deployment di lingkup perusahaan yang serius."
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahaman Multi-Stage Builds",
            body: "Mari buktikan pemahamanmu mengenai bagaimana data dan layer mengalir di Dockerfile yang memiliki beberapa tahapan (stage).",
            quizBank: [
              {
                id: "q1",
                question: "Apa tujuan utama dari Multi-Stage Build di Docker?",
                options: [
                  { id: "a", text: "Memungkinkan menjalankan beberapa container secara bersamaan" },
                  { id: "b", text: "Memisahkan build-time environment dari runtime untuk menghasilkan image yang lebih kecil" },
                  { id: "c", text: "Membuat image yang bisa berjalan di berbagai arsitektur CPU" },
                  { id: "d", text: "Menggabungkan beberapa Dockerfile menjadi satu file" },
                ],
                correctAnswer: "b",
                explanation: "Multi-Stage Build memungkinkan kamu menggunakan satu stage penuh dengan semua tools build (TypeScript compiler, devDependencies), lalu menyalin (COPY --from) hanya hasil kompilasi ke stage kedua yang lebih ringan tanpa tools build. Hasilnya: image produksi yang jauh lebih kecil dan aman.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Dalam frontend Multi-Stage Build, stage kedua biasanya menggunakan base image apa?",
                options: [
                  { id: "a", text: "node:20-alpine — untuk menjalankan Node.js server" },
                  { id: "b", text: "nginx:alpine — karena frontend hanya butuh web server untuk melayani file statis" },
                  { id: "c", text: "ubuntu:latest — agar kompatibel dengan semua library" },
                  { id: "d", text: "python:3.11 — karena Nginx butuh Python" },
                ],
                correctAnswer: "b",
                explanation: "Frontend app yang di-build akan menghasilkan file statis (HTML, CSS, JS). File-file ini tidak perlu Node.js runtime — cukup web server seperti Nginx atau Apache. Nginx:alpine hanya ~23 MB dan melayani file statis dengan performa sangat tinggi.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question: "Apa fungsi instruksi COPY --from=builder di Multi-Stage Build?",
                options: [
                  { id: "a", text: "Menyalin file dari folder builder di host machine" },
                  { id: "b", text: "Menyalin file hasil kompilasi dari stage lain ke stage saat ini" },
                  { id: "c", text: "Meng-copy image dari Docker Hub" },
                  { id: "d", text: "Membuat alias untuk stage builder" },
                ],
                correctAnswer: "b",
                explanation: "COPY --from=builder mengambil file dari stage yang bernama 'builder' (bisa dari stage sebelumnya di Dockerfile yang sama). Ini adalah mekanisme inti Multi-Stage Build: hanya file yang benar-benar diperlukan yang dipindahkan ke image final.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question: "Mengapa kita harus COPY package.json sebelum menjalankan RUN npm ci di Dockerfile?",
                options: [
                  { id: "a", text: "Karena npm ci tidak bisa berjalan tanpa package.json" },
                  { id: "b", text: "Agar Docker memanfaatkan layer caching — jika package.json tidak berubah, Docker menggunakan cache layer npm install" },
                  { id: "c", text: "Karena Docker hanya bisa meng-copy file satu per satu" },
                  { id: "d", text: "Tidak ada alasan khusus — bisa langsung COPY . ." },
                ],
                correctAnswer: "b",
                explanation: "Docker melakukan caching per layer. Dengan memisahkan COPY package.json dan RUN npm ci sebelum COPY ., jika source code berubah tapi dependencies tetap, Docker menggunakan cache dari layer npm ci. Ini bisa menghemat 30-60 detik setiap kali build.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question: "Apa kelebihan utama Multi-Stage Build dalam konteks keamanan?",
                options: [
                  { id: "a", text: "Bisa menjalankan antivirus di dalam container" },
                  { id: "b", text: "Tools build (compiler, debugger, library development) tidak masuk ke image produksi, mengurangi surface area serangan" },
                  { id: "c", text: "Multi-Stage Build otomatis mengenkripsi image" },
                  { id: "d", text: "Hanya pengguna dengan akses root yang bisa menggunakan fitur ini" },
                ],
                correctAnswer: "b",
                explanation: "Di stage build, kita menginstal tools seperti TypeScript compiler, linter, testing library, dan header development. Tools ini tidak diperlukan di produksi dan jika ada celah keamanan di salah satunya, penyerang bisa mengeksploitasinya. Multi-Stage Build memastikan hanya runtime minimal yang masuk ke image final.",
                difficulty: "medium",
              },
            ]
          }
        ]
      },

      // ============================================================
      // MODUL 4: Docker di Lingkungan Production (CI/CD)
      // ============================================================
      {
        title: "Docker in Production & CI/CD Pipeline",
        slug: "docker-production-cicd",
        xpReward: 100,
        slides: [
          {
            type: "lesson",
            title: "Siklus Hidup Docker di Production",
            body: `Sejauh ini kita baru membangun dan menjalankan container di komputer lokal (Development). Bagaimana caranya membawa aplikasi kita ke server live (Production)?

Siklus hidup Docker di skenario nyata melibatkan tiga tahap utama:
1. **BUILD**: Mengubah kode program + Dockerfile menjadi **Docker Image**.
2. **PUSH (Ship)**: Mengirim Docker Image tersebut ke sebuah **Container Registry** (seperti gudang online khusus image).
3. **PULL & RUN (Deploy)**: Server production menarik (pull) image tersebut dari Registry dan menjalankannya sebagai **Container**.

### Container Registries
Untuk menyimpan image, perusahaan tidak menggunakan Docker Hub publik (karena source code berpotensi terekspos). Mereka menggunakan **Private Registries**:
- **Amazon ECR** (Elastic Container Registry) - Ekosistem AWS
- **Google GCR/Artifact Registry** - Ekosistem Google Cloud
- **Docker Hub Pro** / GitHub Container Registry (ghcr.io)

### Kenapa Repot-repot Pakai Registry?
Mengapa tidak sekedar \`git pull\` di server production, lalu \`docker build\` langsung di sana?
- **Server Production Seharusnya Bodoh**: Server live hanya bertugas menjalankan container. Melakukan kompilasi/build di server live membebani CPU dan RAM secara signifikan.
- **Konsistensi Jaminan 100%**: Jika kamu mem-build image di satu tempat (CI Server), lalu mengujinya, dan mem-pushnya ke Registry, kamu tahu pasti bahwa *image byte-per-byte persis* itulah yang akan dijalankan di Production.
- **Rollback Instant**: Jika versi baru (v2.0) ternyata error, kamu bisa langsung menjalankan versi sebelumnya (v1.9) dari Registry dalam hitungan detik tanpa harus build ulang.`,
            keyTakeaway: "Siklus production: Build Image -> Push ke Registry -> Pull dari Registry ke Server Live -> Jalankan Container. Server production tidak boleh melakukan proses build!",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Production Overview", url: "https://docs.docker.com/get-started/overview/" }
            ]
          },
          {
            type: "lesson",
            title: "Pengantar CI/CD untuk Docker",
            body: `Mengotomatiskan siklus hidup Docker adalah tugas **CI/CD** (Continuous Integration / Continuous Deployment).

Kita tidak lagi melakukan \`docker build\` dan \`docker push\` secara manual dari laptop. Jika kamu melakukannya dari laptop: "Bagaimana jika koneksimu putus?", "Bagaimana jika laptop teman timmu punya environment berbeda?", dll.

### Alur CI/CD Modern
Kita menggunakan layanan seperti **GitHub Actions**, GitLab CI, atau Jenkins.

1. Developer melakukan \`git push\` kode baru ke repositori (branch \`main\`).
2. GitHub Actions otomatis mendeteksi perubahan dan menyalakan mesin runner cloud.
3. **CI Phase**: Runner mengkompilasi kode dan menjalankan Unit Tests. Jika gagal, proses berhenti.
4. **Build Phase**: Jika test lolos, Runner menjalankan \`docker build -t myapp:latest .\`
5. **Push Phase**: Runner login ke Registry rahasia dan melakukan \`docker push myapp:latest\`.
6. **CD Phase (Deploy)**: Runner me-remote SSH (atau via Webhook/API) ke Server Production (EC2/Droplet).
7. Server Production melakukan \`docker pull myapp:latest\` dan mere-start container dengan image baru tersebut!

Seluruh proses ini (dari git push sampai live di server) terjadi secara instan, otomatis, dan konsisten setiap saat tanpa ada campur tangan manusia. Inilah esensi DevOps.`,
            keyTakeaway: "CI/CD mengotomatiskan proses Build, Test, Push ke Registry, dan Pull di Server. Menghilangkan human error dari laptop lokal.",
            sources: [
              { type: "DOCUMENTATION", title: "GitHub Actions for Docker", url: "https://docs.docker.com/build/ci/github-actions/" },
              { type: "YOUTUBE", title: "Docker CI/CD Pipeline Explained", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo" }
            ]
          },
          {
            type: "lesson",
            title: "Contoh Pipeline: GitHub Actions",
            body: `Mari kita lihat seperti apa bentuk file konfigurasi CI/CD untuk Docker di **GitHub Actions**. File ini diletakkan di dalam folder \`.github/workflows/deploy.yml\` di dalam repositorimu.

\`\`\`yaml
name: Docker Build & Deploy Pipeline

# Pipeline dijalankan setiap ada push ke branch main
on:
  push:
    branches: [ "main" ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
    # 1. Checkout source code dari github
    - name: Check out the repo
      uses: actions/checkout@v3

    # 2. Login ke Docker Hub menggunakan Secrets
    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}

    # 3. Build & Push Image secara otomatis
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: namamu/myapp:latest, namamu/myapp:\${{ github.sha }}
\`\`\`

### Penjelasan Penting:
- **Secrets**: Kredensial untuk login ke Docker Hub atau AWS ECR tidak ditulis di file ini! Mereka disimpan dengan aman di menu Settings > Secrets di repositori GitHub.
- **Tagging Strategy**: Perhatikan baris \`tags:\`. Sangat disarankan untuk men-tag image dengan label \`latest\` **dan** dengan Git Commit Hash (\`\${{ github.sha }}\`). Ini membuat setiap image bersifat unik (immutable) dan mudah di-rollback jika ada masalah.`,
            keyTakeaway: "GitHub Actions bisa digunakan untuk melakukan build & push Docker secara otomatis hanya dengan satu file YAML. Selalu tag image dengan ID unik (Commit Hash) selain tag 'latest'.",
            sources: [
              { type: "DOCUMENTATION", title: "GitHub Actions — Build & Push Docker", url: "https://docs.github.com/en/actions/publishing-packages/publishing-docker-images" }
            ]
          },
          {
            type: "lesson",
            title: "Deploy ke Server: Dari Docker ke Swarm/K8s",
            body: `Langkah terakhir dari CD (Continuous Deployment) adalah menjalankan image di server production.

Bagaimana cara server production menjalankan container kita secara skalabel? Ada beberapa opsi dari yang termudah hingga yang kompleks:

### 1. Standalone Docker Host (EC2 / VPS)
Cara termudah. Server production hanyalah VPS biasa yang terinstall Docker. CD Pipeline melakukan SSH ke server ini, mengeksekusi \`docker-compose pull\` dan \`docker-compose up -d\`.
- **Kelebihan**: Sangat mudah di-setup, murah. Cocok untuk startup awal.
- **Kekurangan**: Terjadi downtime sepersekian detik saat container restart. Sulit diskalakan ke banyak server.

### 2. Docker Swarm
Orchestrator bawaan Docker. Menggabungkan beberapa server (misal 3 server) menjadi satu cluster (satu kesatuan).
- CD Pipeline cukup melempar instruksi ke Swarm Manager. Swarm akan mendistribusikan container ke ketiga server.
- **Kelebihan**: Mendukung *Rolling Update* (update tanpa downtime), Load Balancing otomatis.

### 3. Kubernetes (K8s) / AWS EKS / GCP GKE
Standar industri skala Enterprise. Kubernetes tidak diciptakan oleh Docker, melainkan oleh Google, tapi ia dirancang untuk menjalankan Docker container dalam skala raksasa (ribuan container di ratusan server).
- Kubernetes memiliki fitur auto-healing (jika container mati, ia akan dibangkitkan lagi otomatis di node/server yang sehat).
- **Kelebihan**: Ekosistem masif, tingkat fleksibilitas dan ketahanan paling tinggi di cloud.
- **Kekurangan**: Kurva belajar sangat curam, butuh dedicated Engineer.

**Saran Industri**: Jangan langsung gunakan Kubernetes jika kamu baru membangun aplikasi tahap MVP. Mulailah dari Docker Compose di satu server, pelajari siklus log/monitoringnya, barulah transisi ke Cloud Managed Service (seperti AWS ECS) atau Kubernetes jika load user-mu benar-benar membutuhkan skala besar.`,
            keyTakeaway: "Pilihan hosting Docker production bervariasi dari satu server biasa (Docker Compose), cluster (Docker Swarm), hingga standar enterprise raksasa (Kubernetes).",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Deployment Options", url: "https://docs.docker.com/get-started/deploy/" },
              { type: "DOCUMENTATION", title: "Kubernetes Overview", url: "https://kubernetes.io/docs/concepts/overview/" },
            ]
          },
          {
            type: "lesson",
            title: "Blue-Green Deployment",
            body: `Blue-Green deployment adalah strategi rilis perangkat lunak yang sangat populer di ekosistem container.

Ide utamanya:
1. Environment **Blue** adalah versi aplikasi saat ini yang sedang berjalan dan menerima traffic user.
2. Saat ada rilis versi baru, kita jalankan di environment **Green** (identik, tapi belum ada traffic user).
3. Kita test environment Green secara internal. Jika aman, kita perintahkan Load Balancer untuk mengalihkan 100% traffic dari Blue ke Green secara instan!

Jika ternyata Green bermasalah di production, kita tinggal kembalikan router ke Blue dalam hitungan detik. Tidak ada downtime.`,
            keyTakeaway: "Blue-Green Deployment mengurangi resiko downtime saat rilis versi baru dengan menyiapkan environment pengganti sebelum mengalihkan traffic.",
            sources: [
              { type: "ARTICLE", title: "Blue-Green Deployment", url: "https://aws.amazon.com/quickstart/architecture/blue-green-deployment/" }
            ]
          },
          {
            type: "lesson",
            title: "Monitoring Docker Containers",
            body: `Di server production, menjalankan container saja tidak cukup. Kamu harus tahu kondisinya.

Apakah CPU-nya overload? Apakah RAM-nya bocor (memory leak)?
Kamu bisa melihat statistik dasar menggunakan:
docker stats

Namun untuk enterprise, standar industrinya adalah menggunakan **Prometheus** (untuk mengambil metrik) dan **Grafana** (untuk membuat dashboard visual yang indah). Kamu bisa melihat grafik lonjakan CPU container secara real-time di Grafana.`,
            keyTakeaway: "Gunakan `docker stats` untuk cek ringkas, dan Prometheus + Grafana untuk visualisasi enterprise.",
            sources: [
              { type: "DOCUMENTATION", title: "Prometheus Monitoring", url: "https://prometheus.io/docs/introduction/overview/" }
            ]
          },
          {
            type: "lesson",
            title: "Logging di Production (ELK Stack)",
            body: `Saat kamu memiliki 10 server dan 50 container, kamu tidak mungkin melakukan "docker logs" satu per satu untuk mencari error.

Kamu butuh **Centralized Logging**. Konsepnya adalah semua log dari setiap container dikirim (forward) ke satu server log terpusat.
Stack paling populer adalah **ELK** (Elasticsearch, Logstash, Kibana) atau **EFK** (Elasticsearch, Fluentd, Kibana).

Dengan setup ini, kamu cukup buka dashboard Kibana, ketik "error payment", dan sistem akan mencari error tersebut di semua container di seluruh servermu secara instan.`,
            keyTakeaway: "Centralized logging seperti ELK Stack adalah kewajiban jika kamu memiliki banyak container yang berjalan di banyak server.",
            sources: [
              { type: "ARTICLE", title: "Centralized Logging with Docker", url: "https://docs.docker.com/config/containers/logging/" }
            ]
          },
          {
            type: "challenge",
            title: "AI Challenge: Mendesain Pipeline CI/CD",
            body: `Saatnya menguji pemahamanmu tentang flow DevOps!`,
            challenge: {
              instruction: "Tuliskan sebuah urutan langkah pipeline CI/CD yang ideal dari mulai kode di-push hingga rilis ke server production menggunakan strategi Blue-Green Deployment.",
              inputType: "text",
              inputPlaceholder: "1. Git Push...",
              starterCode: "1. Git Push ke branch main\n",
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
              sampleAnswer: "1. Git Push ke branch main\n2. Runner CI menjalankan Unit Tests\n3. Jika lolos, Runner melakukan Docker Build\n4. Runner mem-push Image ke Private ECR\n5. Runner men-trigger deployment di server production\n6. Server pull Image baru dan jalankan sebagai Green Environment\n7. Load Balancer diarahkan ke Green\n8. Blue dimatikan."
            }
          },
          {
            type: "lesson",
            title: "Rolling Updates: Update Tanpa Downtime",
            body: `Saat aplikasi sudah live di production, kamu pasti akan sering melakukan update — bug fix, fitur baru, perbaikan keamanan. Pertanyaannya: **bagaimana cara update container tanpa membuat aplikasi offline?**

Jawabannya adalah **Rolling Update** — strategi di mana container-container diperbarui satu per satu secara bergantian, bukan semua sekaligus.

### Cara Kerja Rolling Updates

Bayangkan kamu memiliki 5 container (instance) yang melayani traffic user melalui Load Balancer:

1. **Sebelum Update**: 5 container versi lama (v1.0) berjalan, semuanya menerima traffic.
2. **Langkah 1**: Orchestrator (Docker Swarm / Kubernetes) mengambil **1 container** dari rotasi Load Balancer.
3. **Langkah 2**: Container itu dihentikan dan diganti dengan versi baru (v2.0).
4. **Langkah 3**: Setelah container baru sehat (healthcheck lulus), ia dikembalikan ke rotasi Load Balancer.
5. **Langkah 4**: Langkah 1-3 diulang untuk container berikutnya — satu per satu.

Hasilnya: pengguna tidak merasakan downtime sama sekali karena setidaknya 4 dari 5 container selalu tersedia melayani traffic.

### Konfigurasi Rolling Update di Docker Compose (Swarm)

\`\`\`yaml
services:
  api:
    image: myapp:v2.0
    deploy:
      replicas: 5
      update_config:
        parallelism: 1        # Update 1 container setiap kali
        delay: 10s            # Tunggu 10 detik antar update
        failure_action: pause # Hentikan update jika ada yang gagal
        order: start-first    # Start container baru dulu sebelum matikan lama
      restart_policy:
        condition: any
\`\`\`

Parameter penting:
- **parallelism**: Berapa banyak container yang diupdate bersamaan. Nilai 1 berarti rolling satu per satu (paling aman).
- **delay**: Jeda waktu setelah update satu container sebelum melanjutkan ke container berikutnya. Memberi waktu untuk memantau apakah versi baru stabil.
- **failure_action**: Jika container baru gagal start, apa yang harus dilakukan? \`pause\` menghentikan proses update, \`rollback\` otomatis kembali ke versi lama.
- **order**: \`start-first\` memulai container baru sebelum mematikan container lama (zero-downtime). \`stop-first\` mematikan container lama dulu (ada downtime sebentar, tapi lebih hemat resource).

### Healthcheck — Syarat Mutlak Rolling Update

Rolling Update hanya efektif jika setiap container punya HEALTHCHECK yang akurat. Tanpa healthcheck, Docker tidak tahu apakah container baru sudah siap menerima traffic atau tidak. Jika container baru ternyata error, traffic user akan diarahkan ke container yang rusak.

Kombinasi Rolling Update + HEALTHCHECK + Load Balancer = fondasi **High Availability** di production.

### Rollback: Kembali ke Versi Lama

Jika update ternyata bermasalah, kamu bisa melakukan rollback dengan mudah:
\`\`\`bash
docker service update --rollback myapp_api
\`\`\`

Docker secara otomatis akan menjalankan Rolling Update terbalik — mengembalikan satu per satu container ke versi sebelumnya. Ini adalah safety net yang sangat penting.`,
            keyTakeaway: "Rolling Update memperbarui container satu per satu tanpa downtime. Kombinasikan dengan HEALTHCHECK dan Load Balancer untuk High Availability. Selalu siapkan strategi rollback.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Rolling Update", url: "https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/" }
            ]
          },
          {
            type: "lesson",
            title: "Docker Secrets: Mengelola Data Sensitif di Production",
            body: `Di lingkungan development, kamu mungkin menaruh password database langsung di \`docker-compose.yml\` melalui environment variable. **Ini adalah praktik yang sangat berbahaya!** File \`docker-compose.yml\` sering di-commit ke Git, yang berarti passwordmu akan tersimpan selamanya di riwayat repositori.

Docker menyediakan fitur **Docker Secrets** untuk menyimpan dan mengelola data sensitif seperti:
- Password database (PostgreSQL, MySQL, Redis)
- API keys (Stripe, AWS, SendGrid)
- TLS/SSL certificates
- Token autentikasi

### Cara Kerja Docker Secrets

1. Secret disimpan di **Swarm Manager** (bukan di disk container) — terenkripsi saat penyimpanan dan saat transit.
2. Container yang diizinkan bisa mengakses secret tersebut melalui file sementara di \`/run/secrets/\`.
3. Secret hanya tersedia untuk service/layanan yang secara eksplisit diberikan akses.

### Membuat Secret

\`\`\`bash
# Dari string langsung
echo "MyS3cur3P@ssword" | docker secret create db_password -

# Dari file
docker secret create db_password ./password.txt
\`\`\`

### Menggunakan Secret di Service

\`\`\`bash
docker service create \\
  --name myapp \\
  --secret db_password \\
  --secret stripe_api_key \\
  myapp:latest
\`\`\`

Di dalam container, secret akan muncul sebagai file:
\`\`\`bash
cat /run/secrets/db_password
# Output: MyS3cur3P@ssword
\`\`\`

Aplikasi bisa membaca file tersebut saat startup. Banyak framework modern (Node.js, Python, Go) sudah punya library untuk membaca Docker Secrets secara native.

### Docker Secrets di Compose File

\`\`\`yaml
services:
  api:
    image: myapp:latest
    secrets:
      - db_password
      - stripe_api_key

secrets:
  db_password:
    external: true  # Secret sudah dibuat via CLI
  stripe_api_key:
    file: ./stripe_key.txt  # Dibuat dari file saat deploy
\`\`\`

### Best Practice Secret Management

1. **Jangan pernah hardcode secret** di file yang masuk Git.
2. **Gunakan external secrets** untuk production — kelola secret di luar Docker (misal: HashiCorp Vault, AWS Secrets Manager, atau GitHub Secrets).
3. **Rotasi secret secara berkala** — ganti password setiap 90 hari.
4. **Minimalkan akses** — berikan secret hanya ke service yang benar-benar membutuhkannya.
5. **Untuk development**: gunakan file \`.env\` lokal yang tidak di-commit (pastikan di \`.gitignore\`).

Dengan Docker Secrets, kamu bisa menjalankan production workload dengan aman tanpa khawatir kredensial bocor melalui file konfigurasi.`,
            keyTakeaway: "Gunakan Docker Secrets untuk menyimpan password, API keys, dan sertifikat di production. Secret terenkripsi saat transit dan saat diam, hanya bisa diakses oleh service yang diizinkan, dan tidak tersimpan di file yang ter-commit ke Git.",
            sources: [
              { type: "DOCUMENTATION", title: "Manage Sensitive Data with Docker Secrets", url: "https://docs.docker.com/engine/swarm/secrets/" }
            ]
          },
          {
            type: "lesson",
            title: "Image Tagging & Versioning Strategy di Production",
            body: `Salah satu keputusan terpenting dalam pipeline Docker adalah **bagaimana memberi tag (label) pada image**. Tag yang salah bisa menyebabkan kebingungan, rollback yang sulit, dan bahkan downtime production.

### Masalah dengan Tag \`latest\`

\`\`\`bash
docker push myapp:latest  # ❌ JANGAN lakukan ini di production!
\`\`\`

Tag \`latest\` bersifat **mutable** — bisa berubah kapan saja. Dalam 6 bulan terakhir, tag \`latest\` bisa merujuk ke 100 versi berbeda. Jika ada bug, kamu tidak tahu versi mana yang sebenarnya berjalan.

### Strategi Tagging yang Benar

#### 1. Semantic Versioning (SemVer)

\`\`\`
myapp:1.0.0        # Major.Minor.Patch
myapp:1.0.0-alpha  # Pre-release
myapp:2.1.0-rc.1   # Release candidate
\`\`\`

- **Major**: Berubah saat ada breaking changes
- **Minor**: Berubah saat ada fitur baru (backward compatible)
- **Patch**: Berubah saat ada bug fix

#### 2. Git Commit SHA (Immutable Tags)

\`\`\`bash
# Di CI/CD pipeline
docker build -t myapp:\${{ github.sha }} .
docker push myapp:\${{ github.sha }}
\`\`\`

Setiap commit menghasilkan tag yang **immutable dan unique**. Keuntungan:
- Kamu bisa tahu persis kode mana yang ada di dalam image
- Rollback semudah menjalankan tag SHA lama
- Traceability penuh dari image ke commit

#### 3. Combined Strategy (Best Practice)

\`\`\`bash
# Di pipeline production
docker build -t myapp:1.0.0 .
docker tag myapp:1.0.0 myapp:\${{ github.sha }}
docker tag myapp:1.0.0 myapp:latest

docker push --all-tags myapp
\`\`\`

Ini menghasilkan tiga tag:
- \`myapp:1.0.0\` — SemVer untuk rilis
- \`myapp:abc1234\` — Commit SHA untuk traceability
- \`myapp:latest\` — Untuk kenyamanan development (tapi jangan dipakai di production!)

### Strategi Rollback

Dengan tagging yang benar, rollback tinggal mengubah referensi:

\`\`\`bash
# Sebelumnya jalan: myapp:2.0.0
# Ada bug, rollback ke 1.5.0:
docker service update --image myapp:1.5.0 myapp_api

# Atau di Kubernetes:
kubectl set image deployment/myapp myapp=myapp:1.5.0
\`\`\`

### Retention Policy

Di production, jangan simpan image selamanya — biaya storage membengkak:

| Image Age | Action |
|-----------|--------|
| < 30 hari | Simpan semua versi |
| 30-90 hari | Simpan hanya tagged version (bukan floating latest) |
| 90+ hari | Hapus kecuali tag SemVer stabil |

AWS ECR dan Docker Hub mendukung **Lifecycle Policies** otomatis untuk ini.`,
            keyTakeaway: "Gunakan kombinasi Semantic Versioning + Git Commit SHA untuk tagging image. Jangan gunakan tag `latest` di production. Terapkan retention policy untuk menghemat biaya storage registry.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Tag Best Practices", url: "https://docs.docker.com/engine/reference/commandline/tag/" },
              { type: "ARTICLE", title: "Docker Image Tagging Strategy — SemVer", url: "https://semver.org/" },
            ]
          },
          {
            type: "lesson",
            title: "Disaster Recovery & Backup Strategies untuk Container",
            body: `Aplikasi production pasti akan menghadapi kegagalan — server crash, database corrupt, human error (salah konfigurasi), atau bahkan bencana alam yang mematikan satu data center. **Disaster Recovery (DR)** adalah strategi untuk tetap berjalan saat terjadi bencana.

### 1. Backup Data Volume

Container sendiri bersifat **ephemeral** (sementara) — gampang diganti. Yang perlu di-backup adalah **data persisten** di volume.

\`\`\`bash
# Backup volume PostgreSQL
docker run --rm \\
  -v pgdata:/volume \\
  -v /backup:/backup \\
  alpine tar czf /backup/pg-2024-01-15.tar.gz -C /volume .
\`\`\`

Penjelasan: container Alpine sementara (\`--rm\`) mount volume \`pgdata\` dan folder backup lokal, lalu mengompres isi volume ke file tar.gz.

**Automate with Cron:**
\`\`\`bash
# Di host server, setiap jam 2 pagi
0 2 * * * docker run --rm -v pgdata:/volume -v /backup:/backup alpine tar czf /backup/pg-$(date +%Y%m%d).tar.gz -C /volume .
\`\`\`

### 2. Database-specific Backup

Untuk PostgreSQL, jangan backup file mentah — gunakan \`pg_dump\`:

\`\`\`bash
docker exec db pg_dump -U postgres mydb > /backup/mydb-2024-01-15.sql
\`\`\`

**Best practice:** simpan backup di **dua lokasi berbeda** — lokal server dan cloud storage (S3, Google Cloud Storage).

### 3. Recovery: Restore dari Backup

\`\`\`bash
# Restore volume
docker run --rm \\
  -v pgdata:/volume \\
  -v /backup:/backup \\
  alpine tar xzf /backup/pg-2024-01-15.tar.gz -C /volume

# Restore database
cat /backup/mydb-2024-01-15.sql | docker exec -i db psql -U postgres mydb
\`\`\`

### 4. Multi-Region Deployment

Untuk High Availability (HA) sejati, deploy container di **minimal 2 region**:

\`\`\`
Region A (ap-southeast-1)  ←── Load Balancer Global ──→  Region B (ap-southeast-2)
    │                                                            │
    ├─ Container App                                             ├─ Container App
    ├─ Database Replica (Primary)                                ├─ Database Replica (Standby)
    └─ S3 Bucket (Primary)                                       └─ S3 Bucket (Replicated)
\`\`\`

Dengan arsitektur ini:
- Jika Region A mati total, DNS/Load Balancer otomatis mengarahkan traffic ke Region B
- Database menggunakan **cross-region replication** (AWS RDS Multi-AZ, PostgreSQL Streaming)
- File storage menggunakan **S3 Cross-Region Replication**

### 5. Recovery Time Objective (RTO) & Recovery Point Objective (RPO)

Dua metrik kunci dalam Disaster Recovery:

- **RTO**: Berapa lama waktu yang dibutuhkan untuk mengembalikan layanan setelah bencana? (target: < 1 jam)
- **RPO**: Berapa banyak data yang bisa hilang? (target: < 15 menit)

| Strategi | RTO | RPO | Biaya |
|----------|-----|-----|-------|
| Backup harian + restore manual | 4-8 jam | 24 jam | Rendah |
| Backup tiap jam + automated restore | 1-2 jam | 1 jam | Sedang |
| Multi-region active-active | < 1 menit | < 1 detik | Tinggi |

**Saran**: Mulai dari backup harian, lalu tingkatkan sesuai kebutuhan bisnis. Untuk startup, RTO 4 jam dan RPO 24 jam biasanya sudah cukup di tahap awal.`,
            keyTakeaway: "Backup volume dan database secara rutin, simpan di minimal 2 lokasi. Untuk HA, deploy di multi-region dengan load balancer global. Tentukan RTO/RPO sesuai kebutuhan bisnis.",
            sources: [
              { type: "DOCUMENTATION", title: "Docker Backup & Restore Volumes", url: "https://docs.docker.com/storage/volumes/#back-up-restore-or-migrate-data-volumes" },
              { type: "ARTICLE", title: "AWS Disaster Recovery Options", url: "https://aws.amazon.com/blogs/architecture/disaster-recovery-options-in-the-cloud/" },
            ]
          },
          {
            type: "summary",
            title: "Rangkuman Modul 4 & Kelulusan!",
            body: `Selamat! Kamu telah menyelesaikan modul final dari kursus "Docker & Containerization — Dari Dasar hingga Production".

Kamu sekarang sudah mengerti gambaran besar *Software Development Life Cycle* (SDLC) modern:
1. Menulis kode dan membungkusnya secara rapi menggunakan **Dockerfile (Multi-Stage)**.
2. Menggabungkan banyak container (DB, API, Frontend) di lokal menggunakan **Docker Compose**.
3. Mempercayakan proses kompilasi otomatis ke **CI/CD Pipelines (GitHub Actions)**.
4. Menyimpan *artifact* di brankas online bernama **Container Registry (ECR/Docker Hub)**.
5. Mendistribusikannya ke lingkungan Server/Cloud secara instan.

Dengan menguasai skill-skill ini, kamu bukan sekadar "Programmer", tapi kamu sudah menjadi sosok yang memahami ritme **DevOps** modern — skill yang luar biasa diincar oleh banyak tech company hari ini. Terus eksplorasi, dan cobalah bangun arsitektur proyek pribadimu di AWS/GCP menggunakan Docker!`,
            keyTakeaway: "Penerapan Docker tidak hanya soal tools lokal, melainkan fondasi pergerakan DevOps untuk mengirimkan perangkat lunak secara cepat, andal, dan bebas konflik ke tangan pengguna akhir."
          },
          {
            type: "quiz",
            title: "Kuis Final: Docker Production & CI/CD",
            body: "Kuis terakhir untuk mengunci pengetahuanmu terkait arsitektur production dan flow CI/CD menggunakan Docker!",
            quizBank: [
              {
                id: "q1",
                question: "Apa keuntungan utama dari CI/CD pipeline ketika bekerja dengan Docker?",
                options: [
                  { id: "a", text: "Pipeline mengelola Docker Hub subscription" },
                  { id: "b", text: "Pipeline mengotomatiskan build, test, dan deploy image secara konsisten tanpa campur tangan manusia" },
                  { id: "c", text: "Pipeline menghapus kebutuhan untuk menulis Dockerfile" },
                  { id: "d", text: "Pipeline otomatis memperbaiki bug di source code" },
                ],
                correctAnswer: "b",
                explanation: "CI/CD mengotomatiskan seluruh siklus hidup container: build image di CI server (bukan laptop lokal), jalankan test, push ke registry, lalu deploy ke production. Ini memastikan konsistensi dan menghilangkan human error.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Apa perbedaan utama antara Container Registry dan Docker Hub publik?",
                options: [
                  { id: "a", text: "Tidak ada perbedaan — keduanya sama" },
                  { id: "b", text: "Container Registry seperti ECR atau GCR bersifat private dan hanya bisa diakses oleh anggota organisasi, lebih aman untuk source code perusahaan" },
                  { id: "c", text: "Docker Hub lebih cepat dari registry pribadi" },
                  { id: "d", text: "Container Registry hanya bisa dipakai di cloud" },
                ],
                correctAnswer: "b",
                explanation: "Perusahaan menggunakan private registries (Amazon ECR, Google Artifact Registry, GitHub Container Registry) untuk menyimpan image yang berisi source code proprietary. Registry pribadi memastikan hanya developer dan server yang berwenang yang bisa menarik (pull) image tersebut.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question: "Dalam strategi Blue-Green Deployment, apa yang terjadi jika environment Green ternyata bermasalah?",
                options: [
                  { id: "a", text: "Kedua environment (Blue dan Green) tetap berjalan sampai masalah selesai" },
                  { id: "b", text: "Load Balancer langsung dikembalikan ke Blue — rollback instan tanpa downtime" },
                  { id: "c", text: "Semua container dihentikan untuk investigasi" },
                  { id: "d", text: "Green tetap menerima traffic karena sudah live" },
                ],
                correctAnswer: "b",
                explanation: "Keunggulan utama Blue-Green adalah rollback instan: karena environment Blue (versi lama) masih berjalan dan tidak menerima traffic, Load Balancer cukup dialihkan kembali ke Blue. Pengguna tidak merasakan gangguan sama sekali.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question: "Apa peran Docker Secrets dalam arsitektur production?",
                options: [
                  { id: "a", text: "Mengenkripsi seluruh Docker image" },
                  { id: "b", text: "Menyimpan password, API key, dan data sensitif dengan aman, terenkripsi, dan tidak tersimpan di file yang di-commit ke Git" },
                  { id: "c", text: "Membatasi siapa yang bisa menjalankan perintah docker run" },
                  { id: "d", text: "Menggantikan kebutuhan firewall" },
                ],
                correctAnswer: "b",
                explanation: "Docker Secrets menyediakan cara aman untuk mengelola data sensitif: secret dienkripsi saat disimpan (at rest) dan saat dikirim (in transit), hanya bisa diakses oleh service yang diizinkan, dan tidak pernah tersimpan di file konfigurasi yang mungkin masuk ke Git.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question: "Mengapa server production sebaiknya TIDAK melakukan docker build sendiri?",
                options: [
                  { id: "a", text: "Karena server production tidak punya koneksi internet" },
                  { id: "b", text: "Karena membebani CPU/RAM server yang seharusnya fokus melayani traffic user, dan mengurangi konsistensi (build di CI server sudah teruji)" },
                  { id: "c", text: "Karena server production tidak kompatibel dengan Docker" },
                  { id: "d", text: "Karena docker build hanya bisa dijalankan di lokal" },
                ],
                correctAnswer: "b",
                explanation: "Server production seharusnya hanya menjalankan container (pull & run), bukan melakukan build. Build sebaiknya dilakukan di CI server (GitHub Actions, Jenkins) yang sudah teruji, lalu image yang sama persis dikirim ke registry. Build di production membuang resource dan berisiko menghasilkan image yang berbeda.",
                difficulty: "medium",
              },
            ]
          }
        ]
      }
    ]
  });

  console.log("✅ Seed Docker Premium selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
