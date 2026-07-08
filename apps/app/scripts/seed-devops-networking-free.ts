import { createCourse, prisma } from "./_seed-helpers";

async function main() {
  await createCourse({
    title: "Networking untuk Cloud — Dasar Jaringan untuk Cloud Computing",
    slug: "networking-untuk-cloud",
    description: "Pahami konsep jaringan yang kamu butuhkan untuk bekerja dengan cloud computing. Belajar IP address, subnet, routing, firewall, DNS, dan load balancing dengan contoh praktis dari AWS, Google Cloud, dan Azure.",
    categorySlug: "devops-tools",
    difficulty: "BEGINNER",
    isPremium: false,
    modules: [
      {
        title: "Konsep Jaringan untuk Cloud",
        slug: "konsep-jaringan-cloud",
        xpReward: 50,
        slides: [
          {
            type: "lesson",
            title: "Selamat Datang di Networking untuk Cloud!",
            body: `Saat kamu deploy aplikasi ke cloud (AWS, Google Cloud, Azure), kamu tidak hanya upload code dan selesai. Kamu perlu memahami **bagaimana aplikasimu berkomunikasi** — dengan user, dengan database, dengan layanan lain, dan dengan internet.

Inilah mengapa networking penting untuk cloud computing. Tanpa pemahaman networking yang baik, kamu akan kesulitan:
- Mengamankan aplikasimu dari serangan
- Membuat aplikasi bisa diakses user tapi database tetap privat
- Menghubungkan beberapa server di region berbeda
- Troubleshoot kenapa aplikasi lambat atau tidak bisa diakses

### Bedanya Networking Tradisional vs Cloud Networking

**Networking Tradisional:** Kamu beli router fisik, pasang kabel, konfigurasi secara manual. Infrastruktur ada di kantor/data center sendiri.

**Cloud Networking:** Semua virtual. Kamu buat "jaringan virtual" (VPC) lewat dashboard atau kode. Tidak ada kabel fisik yang kamu sentuh. Scaling instant — butuh 10 server? Tinggal klik.

### Apa yang Akan Kamu Pelajari

**Modul 1 — Konsep Jaringan untuk Cloud:** IP address, subnet, CIDR, private vs public network, VPC (Virtual Private Cloud), security groups, dan firewall virtual.

**Modul 2 — DNS, Load Balancing & CDN:** Bagaimana domain diterjemahkan ke IP, cara mendistribusikan traffic ke banyak server, dan cara membuat website cepat di seluruh dunia.

Setelah kursus ini, kamu akan punya fondasi networking yang cukup untuk:
- Deploy aplikasi production di cloud dengan aman
- Memahami dokumentasi cloud provider tentang networking
- Troubleshoot masalah koneksi dan performa
- Lanjut belajar topik advanced seperti Kubernetes atau multi-region deployment

Mari kita mulai! 🚀`,
            keyTakeaway: "Cloud networking adalah networking virtual yang dikonfigurasi lewat software. Memahaminya penting untuk deploy aplikasi cloud yang aman, cepat, dan reliable.",
            sources: [
              { type: "DOCUMENTATION", title: "AWS VPC — Amazon Web Services", url: "https://aws.amazon.com/vpc/" },
              { type: "ARTICLE", title: "Cloud Networking Basics — Google Cloud", url: "https://cloud.google.com/learn/what-is-cloud-networking" },
              { type: "YOUTUBE", title: "Cloud Networking Explained", url: "https://www.youtube.com/watch?v=92N2yUq63AY" },
            ],
          },
          {
            type: "lesson",
            title: "IP Address & CIDR Notation di Cloud",
            body: `Setiap server atau container di cloud butuh **IP address** untuk berkomunikasi. Di cloud, kamu akan sering melihat notasi seperti ini: 10.0.0.0/16 atau 192.168.1.0/24. Ini disebut **CIDR notation** (Classless Inter-Domain Routing).

### IP Address Recap

IP address adalah alamat unik perangkat di jaringan. Format IPv4: empat angka 0-255 dipisah titik. Contoh: 10.0.1.25

### CIDR Notation: /16, /24, /28 itu Apa?

Angka setelah slash (/) menunjukkan **berapa bit yang digunakan untuk network portion**. Semakin kecil angkanya, semakin banyak IP yang tersedia.

**Contoh:**
- 10.0.0.0/16 = 65.536 alamat IP (10.0.0.0 - 10.0.255.255)
- 10.0.0.0/24 = 256 alamat IP (10.0.0.0 - 10.0.0.255)
- 10.0.0.0/28 = 16 alamat IP (10.0.0.0 - 10.0.0.15)

**Cara mengingatnya:** Angka lebih besar = range lebih kecil. /32 = hanya 1 IP. /0 = semua IP di dunia (0.0.0.0/0 artinya "internet").

### Private IP Range (RFC 1918)

Cloud provider menggunakan **private IP range** untuk jaringan internal yang tidak bisa diakses langsung dari internet:
- 10.0.0.0/8 (10.0.0.0 - 10.255.255.255) — paling banyak dipakai cloud
- 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
- 192.168.0.0/16 (192.168.0.0 - 192.168.255.255) — umum di jaringan rumah

### Contoh di AWS VPC

Saat kamu buat VPC di AWS, kamu tentukan CIDR block-nya. Misalnya:

VPC CIDR: 10.0.0.0/16 (65.536 IP)
- Subnet Public A: 10.0.1.0/24 (256 IP) — untuk web server
- Subnet Private A: 10.0.10.0/24 (256 IP) — untuk database
- Subnet Public B: 10.0.2.0/24 (256 IP) — untuk load balancer

Setiap subnet punya sebagian dari IP range VPC. IP address di dalam VPC bersifat **privat** — tidak bisa diakses langsung dari internet kecuali kamu beri public IP atau pasang load balancer.

### Public IP vs Elastic IP

**Public IP:** IP yang bisa diakses dari internet. Diberikan secara otomatis saat server launch dan **berubah** saat server restart.

**Elastic IP:** IP publik statis yang tidak berubah. Kamu "reserve" IP ini dan bisa pindah-pindahkan ke server lain. Berguna untuk production karena DNS/domain bisa point ke IP yang sama terus.

Memahami CIDR dan IP addressing adalah dasar untuk merancang jaringan cloud yang scalable dan terorganisir.`,
            keyTakeaway: "CIDR notation (10.0.0.0/16) menunjukkan range IP. Angka setelah slash = network bits. Private IP (10.x, 172.16.x, 192.168.x) untuk internal network, Public IP untuk akses dari internet.",
            sources: [
              { type: "DOCUMENTATION", title: "IP Addressing — AWS", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html" },
              { type: "YOUTUBE", title: "Subnetting Explained", url: "https://www.youtube.com/watch?v=s_Ntt6eTN94" }
            ]
          },
          {
            type: "lesson",
            title: "VPC: Virtual Private Cloud",
            body: `**VPC (Virtual Private Cloud)** adalah jaringan virtual pribadimu di cloud. Seperti membangun gedung kantor sendiri di dalam data center cloud provider — kamu yang tentukan tata letaknya, siapa yang boleh masuk, dan bagaimana ruangan terhubung.

### Komponen Utama VPC

**1. CIDR Block**
Range IP address yang akan digunakan VPC. Contoh: 10.0.0.0/16. Ini menentukan "sebesar apa" jaringanmu.

**2. Subnets**
Subdivisi VPC berdasarkan IP range dan lokasi (Availability Zone). Ada dua jenis:
- **Public Subnet:** Bisa akses internet. Untuk web server, load balancer.
- **Private Subnet:** Tidak bisa akses internet langsung. Untuk database, backend service.

**3. Route Table**
Aturan routing: "kalau data tujuannya 10.0.1.0/24, kirim ke subnet A. Kalau tujuannya internet (0.0.0.0/0), kirim ke Internet Gateway."

**4. Internet Gateway (IGW)**
Pintu gerbang VPC ke internet. Tanpa IGW, VPC benar-benar terisolasi dari dunia luar.

**5. NAT Gateway**
Memungkinkan server di private subnet akses internet (untuk download update, call API eksternal) tanpa menerima koneksi masuk dari internet. Seperti proxy satu arah.

### Contoh Arsitektur VPC Sederhana

VPC: 10.0.0.0/16

Public Subnet (10.0.1.0/24):
- Web Server (NGINX, Node.js app)
- Load Balancer

Private Subnet (10.0.10.0/24):
- Database (PostgreSQL, MySQL)
- Redis Cache
- Backend workers

**Security:**
- Web server di public subnet punya public IP, bisa diakses user dari internet
- Database di private subnet HANYA bisa diakses dari web server (lewat security group rules)
- Database tidak punya public IP dan tidak bisa diakses langsung dari luar

### Multi-AZ untuk High Availability

Best practice: deploy resource di minimal 2 Availability Zone (AZ). Kalau satu AZ down (datacenter bermasalah), aplikasimu masih jalan di AZ lain.

Contoh:
- Public Subnet A (AZ-1): Load Balancer, Web Server 1
- Public Subnet B (AZ-2): Load Balancer, Web Server 2
- Private Subnet A (AZ-1): Database Primary
- Private Subnet B (AZ-2): Database Standby

Load balancer distribute traffic ke web server di kedua AZ. Database replicate otomatis.

### VPC di AWS, Google Cloud, Azure

**AWS:** Amazon VPC (yang kita bahas ini)
**Google Cloud:** VPC Network (konsep mirip, terminologi sedikit beda)
**Azure:** Virtual Network (VNet)

Prinsipnya sama di semua cloud provider: isolasi jaringan virtual, kontrol penuh atas IP range dan routing, security groups untuk firewall.

VPC adalah fondasi semua deployment cloud yang serius. Tanpa VPC yang baik, aplikasimu rentan dan susah di-scale.`,
            keyTakeaway: "VPC adalah jaringan virtual pribadi di cloud. Komponen: CIDR block, Subnets (public/private), Route Table, Internet Gateway, NAT Gateway. Best practice: multi-AZ untuk high availability.",
            sources: [
              { type: "DOCUMENTATION", title: "What is Amazon VPC? — AWS", url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" },
              { type: "ARTICLE", title: "VPC Design Best Practices — AWS", url: "https://aws.amazon.com/answers/networking/aws-single-vpc-design/" },
            ],
          },
          {
            type: "lesson",
            title: "Security Groups & Network ACLs: Firewall Virtual",
            body: `Di dunia fisik, firewall adalah perangkat keras yang filter traffic jaringan. Di cloud, firewall virtual disebut **Security Groups** dan **Network ACLs** — dua lapisan keamanan yang bekerja di level berbeda.

### Security Groups (Firewall Level Instance)

Security Group adalah firewall stateful yang attach ke instance/server individual. Kamu define rules: "port mana yang boleh diakses dari mana".

**Karakteristik:**
- **Stateful:** Kalau request masuk diizinkan, response otomatis diizinkan keluar
- **Default:** Deny all inbound, allow all outbound
- **Allow rules only:** Kamu hanya bisa buat rule "izinkan" — tidak bisa "blokir spesifik"

**Contoh Rules untuk Web Server:**
Inbound:
- HTTP (port 80) from 0.0.0.0/0 (semua orang)
- HTTPS (port 443) from 0.0.0.0/0
- SSH (port 22) from 103.x.x.x/32 (hanya dari IP kantormu)

Outbound:
- All traffic to 0.0.0.0/0 (default)

**Contoh Rules untuk Database:**
Inbound:
- PostgreSQL (port 5432) from sg-webserver (hanya dari security group web server)

Outbound:
- All traffic to 0.0.0.0/0

### Network ACLs (Firewall Level Subnet)

Network ACL adalah firewall stateless di level subnet. Semua traffic masuk/keluar subnet harus lewat NACL.

**Karakteristik:**
- **Stateless:** Inbound dan outbound dievaluasi terpisah
- **Default:** Allow all inbound dan outbound
- **Allow dan Deny rules:** Bisa explicitly block IP/port tertentu
- **Rules numbered:** Dievaluasi dari nomor terkecil

**Kapan Pakai NACL:**
- Block IP address spesifik yang dicurigai attack (blacklist)
- Lapisan keamanan tambahan di atas Security Group
- Compliance requirement yang butuh defense in depth

### Security Groups vs NACLs

| Aspek | Security Group | Network ACL |
|-------|---------------|-------------|
| Level | Instance | Subnet |
| Stateful | Yes | No |
| Rules | Allow only | Allow & Deny |
| Default | Deny inbound | Allow all |
| Use Case | Primary firewall | Additional layer |

**Best Practice:** Gunakan Security Groups sebagai kontrol utama. NACL hanya untuk kasus spesifik seperti blocking IP berbahaya atau compliance.

### Prinsip Least Privilege

Jangan buka port yang tidak perlu. SSH (port 22) hanya dari IP kantor, bukan dari internet (0.0.0.0/0). Database JANGAN pernah punya public IP atau security group yang allow dari internet.`,
            keyTakeaway: "Security Groups (stateful, level instance) = firewall utama. Network ACLs (stateless, level subnet) = lapisan tambahan. Best practice: least privilege — hanya buka port yang benar-benar dibutuhkan.",
            sources: [
              { type: "YOUTUBE", title: "AWS Security Groups vs NACLs", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "example",
            title: "Studi Kasus: Merancang Security Groups untuk Aplikasi 3-Tier",
            body: `Mari kita lihat contoh nyata: aplikasi e-commerce dengan arsitektur 3-tier (Web, App, Database).

### Arsitektur

**Tier 1 — Web/Load Balancer (Public Subnet)**
- Application Load Balancer (ALB)
- Security Group: sg-alb

**Tier 2 — Application Server (Private Subnet)**
- EC2 instance running Node.js/Express
- Security Group: sg-app

**Tier 3 — Database (Private Subnet)**
- RDS PostgreSQL
- Security Group: sg-db

### Security Group Rules

**sg-alb (Load Balancer):**
Inbound:
- HTTP (80) from 0.0.0.0/0
- HTTPS (443) from 0.0.0.0/0

Outbound:
- Port 3000 to sg-app (forward ke app server)

**sg-app (Application Server):**
Inbound:
- Port 3000 from sg-alb (hanya dari load balancer)

Outbound:
- Port 5432 to sg-db (akses database)
- Port 443 to 0.0.0.0/0 (call API eksternal, misal payment gateway)

**sg-db (Database):**
Inbound:
- Port 5432 from sg-app (hanya dari app server)

Outbound:
- None (database tidak perlu akses keluar)

### Kenapa Ini Aman?

1. **User** hanya bisa akses load balancer (port 80/443)
2. **Load balancer** hanya bisa forward ke app server
3. **App server** tidak punya public IP — tidak bisa diakses langsung dari internet
4. **Database** hanya bisa diakses dari app server — tidak bisa diakses dari load balancer atau internet
5. **SSH** tidak dibuka ke internet — akses server lewat Session Manager atau bastion host

Kalau attacker berhasil masuk ke load balancer, mereka tidak bisa langsung akses database. Setiap layer punya proteksi terpisah — ini disebut **defense in depth**.

### Common Mistakes

❌ **Database punya public IP** — database HARUS di private subnet dan TIDAK punya public IP
❌ **SSH open to 0.0.0.0/0** — hacker scan port 22 di seluruh internet 24/7
❌ **App server allow dari 0.0.0.0/0** — seharusnya hanya dari load balancer
❌ **Semua service di public subnet** — sebagian besar service seharusnya di private subnet

Merancang security groups dengan benar adalah salah satu aspek terpenting dari cloud security.`,
            keyTakeaway: "Arsitektur 3-tier: ALB di public subnet (allow 80/443 from internet) → App di private subnet (allow from ALB only) → DB di private subnet (allow from App only). Defense in depth.",
            sources: [
              { type: "YOUTUBE", title: "3-Tier Architecture AWS", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "Routing: Mengarahkan Traffic ke Tujuan yang Benar",
            body: `**Routing** adalah proses menentukan jalur terbaik untuk data sampai ke tujuan. Di cloud, routing diatur lewat **Route Tables** yang berisi rules: "kalau tujuannya IP X, kirim ke arah Y".

### Route Table Anatomy

Setiap route punya 2 komponen:
1. **Destination (Tujuan):** IP address atau CIDR block
2. **Target (Kemana dikirim):** Internet Gateway, NAT Gateway, VPC Peering, dst

### Contoh Route Table

**Route Table untuk Public Subnet:**
| Destination | Target | Arti |
|-------------|--------|------|
| 10.0.0.0/16 | local | Traffic internal VPC tetap di VPC |
| 0.0.0.0/0 | igw-xxx | Semua traffic lain ke Internet Gateway |

**Route Table untuk Private Subnet:**
| Destination | Target | Arti |
|-------------|--------|------|
| 10.0.0.0/16 | local | Traffic internal VPC tetap di VPC |
| 0.0.0.0/0 | nat-xxx | Semua traffic lain ke NAT Gateway |

**Perbedaan kunci:** Public subnet route ke Internet Gateway (bisa terima dan kirim dari internet). Private subnet route ke NAT Gateway (bisa kirim ke internet tapi tidak bisa terima dari internet).

### Default Route: 0.0.0.0/0

0.0.0.0/0 artinya "semua IP di dunia" atau "internet". Ini disebut **default route** — kalau tidak ada route spesifik yang cocok, pakai route ini.

### Route Evaluation

Route dievaluasi dari **paling spesifik** ke paling umum:
1. Cek apakah ada route yang exact match
2. Cek route dengan prefix terpanjang
3. Kalau tidak ada yang cocok, pakai default route (0.0.0.0/0)

Contoh: Kamu kirim data ke 10.0.5.20
- Cek: ada route untuk 10.0.5.20/32? Tidak
- Cek: ada route untuk 10.0.5.0/24? Tidak
- Cek: ada route untuk 10.0.0.0/16? Ya! (local) → kirim lewat VPC internal

### VPC Peering

VPC Peering menghubungkan dua VPC (bisa di region sama atau beda) sehingga mereka bisa komunikasi lewat private IP.

Contoh: VPC-Prod (10.0.0.0/16) dan VPC-Staging (172.16.0.0/16)

**Route Table VPC-Prod:**
| Destination | Target |
|-------------|--------|
| 10.0.0.0/16 | local |
| 172.16.0.0/16 | pcx-xxx (peering connection) |
| 0.0.0.0/0 | igw-xxx |

Sekarang server di VPC-Prod bisa akses server di VPC-Staging lewat private IP tanpa lewat internet.

### Transit Gateway (Advanced)

Kalau kamu punya banyak VPC (misal 10 VPC untuk berbagai project), VPC Peering jadi kompleks (butuh 45 peering connection untuk connect 10 VPC semuanya).

Solusi: **Transit Gateway** — hub central yang connect semua VPC. Semua VPC connect ke Transit Gateway, dan Transit Gateway yang route traffic antar VPC.

Routing adalah fondasi network connectivity. Memahami route table membuatmu bisa troubleshoot masalah koneksi dan merancang network topology yang efisien.`,
            keyTakeaway: "Route Table menentukan kemana traffic dikirim. Public subnet route ke Internet Gateway, private subnet route ke NAT Gateway. Default route (0.0.0.0/0) = internet.",
            sources: [
              { type: "YOUTUBE", title: "AWS Route Tables", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "Bastion Host & Private Access",
            body: `Kamu sudah belajar bahwa server di private subnet tidak punya public IP dan tidak bisa diakses langsung dari internet. Tapi kalau kamu perlu SSH ke server itu untuk maintenance, bagaimana caranya?

### Solusi 1: Bastion Host (Jump Server)

**Bastion host** adalah server kecil di **public subnet** yang fungsinya hanya sebagai "pintu masuk" untuk SSH ke server di private subnet.

**Cara kerja:**
1. Kamu SSH ke bastion host (punya public IP)
2. Dari bastion host, kamu SSH ke server di private subnet (lewat private IP)

**Security:**
- Bastion host punya security group yang SANGAT ketat: SSH (port 22) hanya dari IP kantor/VPN
- Bastion host tidak menjalankan aplikasi apapun — hanya untuk access
- Semua akses di-log untuk audit trail

**Kelemahan:**
- Bastion host harus selalu running (biaya)
- Butuh maintain server (patching, monitoring)
- Kalau bastion host di-hack, attacker bisa akses semua private subnet

### Solusi 2: AWS Systems Manager Session Manager (Lebih Baik!)

Session Manager memungkinkanmu akses shell ke server tanpa SSH, tanpa bastion host, dan tanpa buka port 22.

**Cara kerja:**
- Instance install SSM agent
- Kamu buka Session Manager di AWS Console
- Dapat akses shell lewat browser — tidak lewat internet, tapi lewat AWS internal network

**Keuntungan:**
- Tidak perlu bastion host
- Tidak perlu buka port 22 (lebih aman!)
- Semua session di-log otomatis ke CloudWatch
- Bisa restrict akses lewat IAM policy

### Solusi 3: VPN atau Direct Connect

Untuk perusahaan besar, connect kantor ke VPC lewat:
- **VPN (Virtual Private Network):** Encrypted tunnel dari kantor ke VPC lewat internet
- **Direct Connect:** Koneksi dedicated fiber dari kantor ke AWS (bukan lewat internet)

Dengan VPN/Direct Connect, kantor dan VPC seperti satu jaringan lokal. Kamu bisa akses private subnet dari laptop kantor tanpa lewat bastion atau internet.

### Best Practice

**Untuk startup/tim kecil:** AWS Systems Manager Session Manager

**Untuk perusahaan menengah:** VPN + Session Manager

**Untuk enterprise:** Direct Connect + Session Manager + strict IAM policies

Jangan pernah buka SSH (port 22) ke 0.0.0.0/0 (internet) kecuali kamu suka hacker mengunjungi servermu.`,
            keyTakeaway: "Akses server di private subnet: Bastion Host (server jump), Session Manager (tanpa SSH, via browser), atau VPN/Direct Connect (kantor connect ke VPC). Session Manager adalah yang paling modern dan aman.",
            sources: [
              { type: "YOUTUBE", title: "AWS Bastion Host & Session Manager", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "Monitoring & Troubleshooting Network",
            body: `Ketika aplikasimu tidak bisa diakses atau lambat, masalahnya bisa di mana saja: aplikasi, database, atau **network**. Memahami cara monitoring dan troubleshoot network issue sangat penting untuk DevOps/Cloud Engineer.

### VPC Flow Logs

VPC Flow Logs merekam **semua traffic** yang masuk dan keluar dari network interface di VPC-mu. Setiap record berisi:
- Source IP, Destination IP
- Source Port, Destination Port
- Protocol (TCP/UDP)
- Action (ACCEPT atau REJECT)
- Bytes transferred

**Use case:**
- **Troubleshoot connectivity:** Kenapa server A tidak bisa connect ke server B?
- **Security analysis:** IP mana saja yang coba akses servermu?
- **Compliance:** Audit trail untuk regulasi

Flow logs bisa dikirim ke CloudWatch Logs atau S3 untuk analisis.

### Common Network Issues & How to Debug

**Problem 1: "Cannot connect to server"**

Checklist troubleshooting:
1. ✅ Server running? (cek EC2 dashboard)
2. ✅ Security Group allow traffic dari sourcemu?
3. ✅ Network ACL allow traffic?
4. ✅ Route table benar? (public subnet harus route ke IGW)
5. ✅ DNS resolve correctly? (kalau pakai domain)

Tools: AWS Reachability Analyzer — visual tool yang cek apakah traffic bisa sampai dari A ke B dan kalau tidak, di mana blocknya.

**Problem 2: "Connection intermittent/lambat"**

Kemungkinan:
- Network congestion (bandwidth habis)
- Latency tinggi (server di region jauh dari user)
- Packet loss
- Application issue (bukan network)

Tools:
- **CloudWatch Metrics:** Monitor network throughput, packet loss
- **Ping/Traceroute:** Cek latency dan hop count
- **MTR (My Traceroute):** Kombinasi ping + traceroute yang lebih detail

**Problem 3: "Outbound connection tidak jalan dari private subnet"**

Kemungkinan:
- NAT Gateway belum di-setup atau mati
- Route table private subnet tidak point ke NAT Gateway
- NAT Gateway di AZ yang berbeda dari instance (best practice: NAT per AZ)

### Network Performance Optimization

**1. Placement Groups**
Kalau butuh latency ultra-low antar instance (misal HPC, database cluster), gunakan **Cluster Placement Group** — semua instance ditempatkan di rack yang sama.

**2. Enhanced Networking**
Enable enhanced networking (SR-IOV) untuk throughput lebih tinggi dan latency lebih rendah. Gratis, tapi butuh instance type tertentu (t3, m5, c5, dll).

**3. Elastic Network Adapter (ENA)**
Driver network modern untuk throughput hingga 100 Gbps. Auto-enabled di instance modern.

**4. Monitor Bandwidth Limits**
Setiap instance type punya bandwidth limit. t3.micro = 5 Gbps, m5.large = 10 Gbps, dll. Kalau app butuh bandwidth tinggi, pilih instance type yang sesuai.

### Tools Troubleshooting

- **AWS Reachability Analyzer:** Visual path analysis
- **VPC Flow Logs:** Traffic audit trail
- **CloudWatch Metrics:** Network throughput, packet drop
- **tcpdump/Wireshark:** Packet capture (advanced)
- **netstat/ss:** Check active connections dan ports

Troubleshooting network membutuhkan mindset sistematis: isolate layer by layer (application → transport → network → physical), check configuration (security group, route table, NACL), dan verify dengan tools.`,
            keyTakeaway: "Troubleshoot network: VPC Flow Logs (audit trail), Reachability Analyzer (path check), CloudWatch (metrics). Cek security group, route table, NACL, dan NAT Gateway. Monitor bandwidth limits per instance type.",
            sources: [
              { type: "YOUTUBE", title: "AWS VPC Troubleshooting", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "summary",
            title: "Rangkuman: Konsep Jaringan untuk Cloud",
            body: `Selamat! Kamu sudah menguasai konsep networking fundamental untuk cloud computing. Mari rekap:

### IP Address & CIDR
- CIDR notation (10.0.0.0/16) menentukan IP range
- Private IP (10.x, 172.16.x, 192.168.x) untuk internal network
- Public IP untuk akses dari internet
- Elastic IP = public IP statis

### VPC (Virtual Private Cloud)
- Jaringan virtual pribadimu di cloud
- Komponen: CIDR block, Subnets, Route Table, Internet Gateway, NAT Gateway
- Public subnet: bisa akses & diakses dari internet
- Private subnet: tidak bisa diakses langsung dari internet

### Security
- **Security Groups:** Firewall stateful level instance (primary defense)
- **Network ACLs:** Firewall stateless level subnet (additional layer)
- **Principle of Least Privilege:** Hanya buka port yang dibutuhkan
- **Defense in Depth:** Multiple layers of security (ALB → App → DB)

### Routing
- Route Table menentukan kemana traffic dikirim
- Default route (0.0.0.0/0) = internet
- VPC Peering untuk connect VPC
- Transit Gateway untuk hub-and-spoke topology

### Access & Troubleshooting
- Bastion Host, Session Manager, atau VPN untuk akses private subnet
- VPC Flow Logs untuk audit trail
- Reachability Analyzer untuk troubleshoot connectivity
- CloudWatch untuk monitoring

### Di Modul Selanjutnya
Kamu akan belajar tentang **DNS, Load Balancing, dan CDN** — bagaimana domain diterjemahkan ke IP, cara distribute traffic ke banyak server, dan cara membuat website cepat di seluruh dunia.`,
            keyTakeaway: "VPC adalah fondasi cloud networking: private/public subnets, security groups, route tables, dan NAT gateway. Security berlapis dengan least privilege. Troubleshoot dengan Flow Logs dan Reachability Analyzer.",
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang Networking Cloud",
            body: "Pastikan kamu sudah memahami IP/CIDR, VPC, subnets, security groups, routing, dan troubleshooting sebelum lanjut ke modul 2.",
            quizBank: [
              {
                id: "q1",
                question: "Apa perbedaan utama antara public subnet dan private subnet di VPC?",
                options: [
                  { id: "a", text: "Public subnet menggunakan IPv4, private subnet menggunakan IPv6" },
                  { id: "b", text: "Public subnet punya route ke Internet Gateway, private subnet tidak" },
                  { id: "c", text: "Public subnet lebih aman dari private subnet" },
                  { id: "d", text: "Tidak ada perbedaan, hanya penamaan saja" },
                ],
                correctAnswer: "b",
                explanation: "Public subnet punya route table yang mengarah ke Internet Gateway (IGW) sehingga bisa diakses dari/ke internet. Private subnet tidak punya route ke IGW (biasanya route ke NAT Gateway) sehingga tidak bisa diakses langsung dari internet. Kedua subnet bisa pakai IPv4 atau IPv6.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Berapa banyak IP address yang tersedia di CIDR block 10.0.0.0/24?",
                options: [
                  { id: "a", text: "16 alamat IP" },
                  { id: "b", text: "256 alamat IP" },
                  { id: "c", text: "1024 alamat IP" },
                  { id: "d", text: "65536 alamat IP" },
                ],
                correctAnswer: "b",
                explanation: "/24 berarti 24 bit untuk network portion, sisanya 8 bit untuk host portion. 2^8 = 256 alamat IP (dari 10.0.0.0 hingga 10.0.0.255). AWS reserved 5 IP (network, broadcast, dll) jadi available untuk instance = 251 IP.",
                difficulty: "easy",
              },
              {
                id: "q3",
                question: "Apa fungsi NAT Gateway di cloud networking?",
                options: [
                  { id: "a", text: "Mengizinkan internet mengakses server di private subnet" },
                  { id: "b", text: "Mengizinkan server di private subnet akses internet tanpa menerima koneksi masuk" },
                  { id: "c", text: "Menggantikan fungsi Internet Gateway" },
                  { id: "d", text: "Menerjemahkan nama domain menjadi IP address" },
                ],
                correctAnswer: "b",
                explanation: "NAT Gateway adalah proxy one-way: server di private subnet bisa kirim request ke internet (untuk download update, call API eksternal) tapi internet TIDAK bisa inisiasi koneksi masuk ke server tersebut. Ini menjaga security sambil tetap allow outbound connectivity.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question: "Security Groups bersifat stateful. Apa artinya?",
                options: [
                  { id: "a", text: "Rules tidak pernah berubah setelah dibuat" },
                  { id: "b", text: "Kalau inbound request diizinkan, outbound response otomatis diizinkan" },
                  { id: "c", text: "Security group hanya mengizinkan traffic HTTPS" },
                  { id: "d", text: "Harus manually allow inbound dan outbound untuk setiap connection" },
                ],
                correctAnswer: "b",
                explanation: "Stateful artinya Security Group 'mengingat' connection state. Kalau kamu allow HTTP inbound (port 80), response dari server otomatis diizinkan keluar tanpa perlu outbound rule explicit. Sebaliknya, Network ACL bersifat stateless — harus manually allow inbound dan outbound.",
                difficulty: "medium",
              },
              {
                id: "q5",
                question: "Dalam arsitektur 3-tier (ALB → App → DB), mana yang BENAR?",
                options: [
                  { id: "a", text: "Semua tier harus di public subnet agar bisa saling komunikasi" },
                  { id: "b", text: "ALB di public subnet, App dan DB di private subnet" },
                  { id: "c", text: "Database harus punya public IP agar app bisa akses" },
                  { id: "d", text: "Security group database harus allow traffic dari 0.0.0.0/0" },
                ],
                correctAnswer: "b",
                explanation: "Best practice: ALB (Load Balancer) di public subnet untuk terima traffic dari internet. App server di private subnet (akses via ALB). Database di private subnet (akses hanya dari app server via security group). Database TIDAK BOLEH punya public IP atau allow dari internet — ini risiko security besar.",
                difficulty: "medium",
              },
              {
                id: "q6",
                question: "Apa yang dimaksud dengan 0.0.0.0/0 dalam routing?",
                options: [
                  { id: "a", text: "IP address localhost" },
                  { id: "b", text: "Semua IP address di dunia (internet)" },
                  { id: "c", text: "IP address reserved untuk NAT Gateway" },
                  { id: "d", text: "IP address internal VPC" },
                ],
                correctAnswer: "b",
                explanation: "0.0.0.0/0 adalah CIDR notation untuk 'semua IP address' atau 'internet'. Dalam route table, 0.0.0.0/0 → igw-xxx artinya 'kirim semua traffic yang tidak cocok dengan route lain ke Internet Gateway'. Ini disebut default route.",
                difficulty: "easy",
              },
              {
                id: "q7",
                question: "Kenapa server di private subnet butuh NAT Gateway?",
                options: [
                  { id: "a", text: "Untuk mendapat public IP address" },
                  { id: "b", text: "Untuk download update, call API eksternal, atau akses internet tanpa terekspos langsung" },
                  { id: "c", text: "Untuk komunikasi dengan server di public subnet" },
                  { id: "d", text: "NAT Gateway tidak diperlukan untuk private subnet" },
                ],
                correctAnswer: "b",
                explanation: "Server di private subnet tidak punya public IP dan tidak bisa akses internet langsung. NAT Gateway memungkinkan mereka kirim outbound request (download package, call payment gateway API) sambil tetap tidak terekspos dari internet. Tanpa NAT, server di private subnet benar-benar terisolasi.",
                difficulty: "medium",
              },
              {
                id: "q8",
                question: "Apa cara paling aman untuk SSH ke server di private subnet?",
                options: [
                  { id: "a", text: "Beri server tersebut public IP dan buka port 22 dari 0.0.0.0/0" },
                  { id: "b", text: "Gunakan AWS Systems Manager Session Manager (tanpa SSH)" },
                  { id: "c", text: "Setup VPN ke VPC dulu, lalu SSH via private IP" },
                  { id: "d", text: "Opsi B dan C sama-sama aman" },
                ],
                correctAnswer: "d",
                explanation: "Session Manager (opsi B) dan VPN (opsi C) sama-sama aman. Session Manager tidak perlu buka port 22 dan akses via AWS console (lebih praktis). VPN connect kantor ke VPC seperti LAN lokal (lebih familiar untuk sysadmin tradisional). Yang TIDAK aman: buka port 22 ke internet (opsi A) — ini mengundang brute force attack.",
                difficulty: "hard",
              },
              {
                id: "q9",
                question: "Apa perbedaan Security Groups dan Network ACLs?",
                options: [
                  { id: "a", text: "Tidak ada perbedaan, keduanya identik" },
                  { id: "b", text: "Security Groups stateful dan level instance, Network ACLs stateless dan level subnet" },
                  { id: "c", text: "Security Groups hanya untuk EC2, Network ACLs untuk RDS" },
                  { id: "d", text: "Network ACLs lebih powerful dan menggantikan Security Groups" },
                ],
                correctAnswer: "b",
                explanation: "Security Groups: stateful, level instance/ENI, allow rules only. Network ACLs: stateless, level subnet, allow & deny rules. Best practice: Security Groups sebagai kontrol utama (lebih mudah manage), Network ACLs sebagai lapisan tambahan atau untuk block IP specific.",
                difficulty: "medium",
              },
              {
                id: "q10",
                question: "Dalam konteks cloud networking, apa yang dimaksud dengan 'defense in depth'?",
                options: [
                  { id: "a", text: "Menggunakan firewall fisik yang tebal" },
                  { id: "b", text: "Multiple layers of security (Security Groups, NACLs, subnets, IAM)" },
                  { id: "c", text: "Enkripsi data dengan algoritma yang kuat" },
                  { id: "d", text: "Backup data di multiple regions" },
                ],
                correctAnswer: "b",
                explanation: "'Defense in depth' adalah strategi security berlapis: Security Groups per tier, Network ACLs per subnet, private subnets untuk backend, IAM untuk access control, encryption in-transit/at-rest, monitoring, dll. Kalau satu layer ditembus attacker, layer lain masih melindungi. Ini prinsip fundamental cloud security.",
                difficulty: "hard",
              },
            ],
          },
        ],
      },
      {
        title: "DNS, Load Balancing & CDN",
        slug: "dns-load-balancing-cdn",
        xpReward: 50,
        slides: [
          {
            type: "lesson",
            title: "DNS: Penerjemah Nama Domain ke IP Address",
            body: `Saat kamu ketik **google.com** di browser, bagaimana browser tahu harus connect ke server mana? Setiap website sebenarnya diakses lewat IP address (seperti 142.250.4.113), tapi siapa yang mau hafalin angka segitu banyak?

Di sinilah **DNS (Domain Name System)** bekerja — sistem yang menerjemahkan nama domain yang mudah diingat (google.com, facebook.com, clarise.my.id) menjadi IP address yang dipahami komputer.

### Analogi: DNS = Buku Telepon Internet

Dulu, kita cari nomor telepon orang di buku telepon. DNS adalah buku telepon internet: kamu kasih nama (domain), dia kasih nomor (IP address).

### Cara Kerja DNS (Step by Step)

Kamu ketik **clarise.my.id** di browser:

1. **Browser cek cache lokal** — pernah buka clarise.my.id sebelumnya? Kalau ya, IP sudah tersimpan di cache. Langsung connect.

2. **Kalau tidak ada, tanya DNS Resolver** (biasanya dari ISP atau Google DNS 8.8.8.8). Resolver ini yang akan cari tahu IP-nya.

3. **Resolver tanya Root DNS Server** — "Siapa yang urus domain .id?" Root server jawab: "Tanya TLD server untuk .id"

4. **Resolver tanya TLD Server (.id)** — "Siapa yang urus clarise.my.id?" TLD server jawab: "Tanya Name Server di Cloudflare (atau provider DNS clarise)"

5. **Resolver tanya Authoritative Name Server** — Server ini punya data pasti: "clarise.my.id = 103.x.x.x"

6. **Resolver kasih jawaban ke browser** — Browser connect ke 103.x.x.x

Proses ini terjadi dalam **milidetik** — kamu tidak sadar karena cepat sekali!

### DNS Record Types

**A Record:** Map domain ke IPv4 address
- clarise.my.id → 103.x.x.x

**AAAA Record:** Map domain ke IPv6 address
- clarise.my.id → 2001:db8::1

**CNAME Record:** Alias domain ke domain lain
- www.clarise.my.id → clarise.my.id

**MX Record:** Mail server untuk email
- clarise.my.id → mail.clarise.my.id (untuk email @clarise.my.id)

**TXT Record:** Informasi text arbitrary (sering untuk verifikasi atau SPF)
- clarise.my.id → "google-site-verification=xxx"

### TTL (Time To Live)

Setiap DNS record punya TTL — berapa lama record bisa di-cache. TTL 3600 = cache selama 1 jam. Kalau TTL habis, browser tanya DNS lagi (buat mastiin IP belum berubah).

### Cloud DNS Services

**AWS Route 53:** DNS service dari AWS — high availability, global, dengan health checks
**Google Cloud DNS:** DNS dari Google Cloud
**Cloudflare DNS:** Populer, gratis, cepat (1.1.1.1)

Menggunakan managed DNS service dari cloud provider jauh lebih reliable daripada self-host DNS server.`,
            keyTakeaway: "DNS menerjemahkan domain (clarise.my.id) ke IP address. Proses: Browser → DNS Resolver → Root Server → TLD Server → Authoritative Server → dapat IP. TTL menentukan durasi cache.",
            sources: [
              { type: "DOCUMENTATION", title: "What is DNS? — Cloudflare", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" },
              { type: "ARTICLE", title: "DNS Explained — AWS Route 53", url: "https://aws.amazon.com/route53/what-is-dns/" },
              { type: "YOUTUBE", title: "DNS Explained in 100 Seconds", url: "https://www.youtube.com/watch?v=UVR9lhUGAyU" },
            ],
          },
          {
            type: "lesson",
            title: "Load Balancing: Distribusi Traffic ke Banyak Server",
            body: `Bayangkan toko yang ramai — kalau hanya ada 1 kasir, antrian mengular. Solusi? Tambah kasir. Di dunia digital, **Load Balancer** adalah yang mengatur antrian: membagi traffic masuk ke beberapa server sehingga tidak ada satu server yang overload.

### Apa Itu Load Balancer?

Load Balancer duduk **di depan** server aplikasimu. Semua request dari user masuk ke load balancer, lalu load balancer forward request ke salah satu server backend yang available.

**Arsitektur tanpa Load Balancer:**
User → Server tunggal (kalau server mati atau overload, aplikasi down)

**Arsitektur dengan Load Balancer:**
User → Load Balancer → Server 1, Server 2, Server 3, ... (kalau 1 server mati, traffic auto pindah ke server lain)

### Keuntungan Load Balancing

**1. High Availability:** Kalau 1 server crash, load balancer stop kirim traffic kesitu dan kirim ke server lain. User tidak terpengaruh.

**2. Scalability:** Butuh handle traffic lebih besar? Tambah server. Load balancer otomatis distribute traffic ke server baru.

**3. Performance:** Tidak ada server yang overload karena traffic dibagi merata.

**4. Maintenance:** Mau update server? Matikan 1 server, update, nyalakan lagi — load balancer handle traffic ke server lain selama maintenance.

### Algoritma Load Balancing

**Round Robin:** Kirim request secara berurutan ke setiap server. Request 1 → Server A, Request 2 → Server B, Request 3 → Server C, Request 4 → Server A lagi, dst. Simpel dan fair.

**Least Connections:** Kirim request ke server yang sedang handle connection paling sedikit. Cocok kalau request punya durasi beda-beda (ada yang cepat, ada yang lama).

**IP Hash:** Hash IP address user dan kirim ke server yang sama terus. Berguna untuk session persistence (user selalu ke server yang sama).

**Weighted:** Server dikasih "weight" berbeda berdasarkan kapasitas. Server besar dapat weight 3, server kecil weight 1 — server besar dapat 3x lebih banyak traffic.

### Health Checks

Load balancer secara berkala "ping" setiap server untuk cek apakah masih hidup dan healthy. Kalau server tidak respond atau respond dengan error, load balancer mark server itu "unhealthy" dan stop kirim traffic kesitu.

**Contoh Health Check:**
- Kirim HTTP GET ke /health setiap 30 detik
- Kalau respond 200 OK dalam 5 detik → healthy
- Kalau tidak respond atau respond 500 → unhealthy
- Kalau 2 health check berturut-turut failed → mark unhealthy

### Jenis Load Balancer di Cloud

**Application Load Balancer (Layer 7 — HTTP/HTTPS):**
- Bisa routing berdasarkan URL path, hostname, headers
- Contoh: /api/* → backend servers, /images/* → image servers
- Paling umum untuk web applications

**Network Load Balancer (Layer 4 — TCP/UDP):**
- Ultra-low latency, jutaan request per detik
- Untuk game servers, video streaming, atau traffic non-HTTP
- Tidak bisa inspect HTTP content (karena layer 4)

**Gateway Load Balancer:**
- Untuk security appliances (firewall, IDS/IPS pihak ketiga)

Load Balancing adalah fondasi arsitektur cloud yang scalable dan resilient. Tanpa load balancer, aplikasimu akan jadi single point of failure.`,
            keyTakeaway: "Load Balancer distribute traffic ke banyak server untuk high availability dan scalability. Algoritma: Round Robin, Least Connections, IP Hash. Health checks untuk deteksi server unhealthy.",
            sources: [
              { type: "DOCUMENTATION", title: "What is Load Balancing? — AWS", url: "https://aws.amazon.com/what-is/load-balancing/" },
              { type: "ARTICLE", title: "Load Balancing Algorithms — NGINX", url: "https://www.nginx.com/resources/glossary/load-balancing/" },
            ],
          },
          {
            type: "lesson",
            title: "CDN: Membuat Website Cepat di Seluruh Dunia",
            body: `Website-mu di-host di server AWS Singapura. User dari Jakarta akses cepat (latensi 20ms). Tapi user dari London? Latensi 300ms — lambat banget! Solusinya: **CDN (Content Delivery Network)**.

### Apa Itu CDN?

CDN adalah jaringan server yang tersebar di berbagai lokasi di seluruh dunia. Setiap server (disebut **edge location** atau **PoP - Point of Presence**) menyimpan **copy** dari konten website-mu (gambar, CSS, JS, video). Saat user akses website, mereka dapat konten dari edge location **terdekat**, bukan dari server origin yang jauh.

### Cara Kerja CDN

**Tanpa CDN:**
User London → Request ke server Singapore (12.000 km, latensi 300ms) → Lambat

**Dengan CDN:**
User London → Request ke CDN edge di London (dekat, latensi 5ms) → Cepat!

**Alur lengkap:**
1. User London akses clarise.my.id/logo.png
2. Request diterima CloudFront edge di London
3. Edge cek: "Aku punya logo.png di cache?" 
   - **Cache HIT:** Ada! Langsung kirim ke user (5ms)
   - **Cache MISS:** Tidak ada. Request ke origin server Singapore, save di cache, kirim ke user (300ms pertama kali, lalu 5ms untuk request berikutnya)

### Keuntungan CDN

**1. Performa Global:** Website cepat di mana pun user berada

**2. Reduce Server Load:** Origin server tidak dibombardir request — sebagian besar request di-serve dari edge

**3. DDoS Protection:** CDN bisa absorb traffic attack karena kapasitasnya sangat besar

**4. HTTPS Gratis:** CDN provider biasanya kasih SSL/TLS certificate gratis

### Jenis Konten yang Di-cache

**Static Content (ideal untuk CDN):**
- Gambar (JPG, PNG, WebP)
- CSS, JavaScript
- Font files
- Video (MP4, streaming)
- PDF, ZIP

**Dynamic Content (tidak ideal untuk CDN):**
- API responses yang personalized
- Data real-time
- Content yang berubah setiap request

Tapi, CDN modern bisa optimize dynamic content dengan **edge computing** — jalankan code di edge location untuk reduce latency.

### Cache Control

Kamu bisa kontrol berapa lama CDN cache konten dengan **HTTP Cache-Control header**:

Cache-Control: max-age=86400 (cache selama 1 hari)
Cache-Control: no-cache (selalu revalidate dengan origin)
Cache-Control: no-store (jangan cache sama sekali)

### CDN Providers

**AWS CloudFront:** Integrasi seamless dengan AWS services (S3, EC2, Lambda@Edge)
**Cloudflare:** Populer, affordable, punya free tier yang generous
**Google Cloud CDN:** Integrasi dengan Google Cloud Platform
**Akamai:** CDN enterprise terbesar di dunia

### Use Case CDN

- **Streaming video:** Netflix, YouTube pakai CDN untuk serve video dari edge terdekat
- **E-commerce:** Amazon, Tokopedia pakai CDN untuk load gambar produk cepat
- **Gaming:** Update game dan assets di-distribute lewat CDN
- **SaaS:** Aplikasi web pakai CDN untuk load static assets (JS, CSS) cepat

CDN adalah salah satu cara paling efektif untuk improve user experience global tanpa butuh deploy server di setiap negara.`,
            keyTakeaway: "CDN (Content Delivery Network) menyimpan copy konten di edge locations di seluruh dunia. User dapat konten dari edge terdekat untuk latensi rendah. Cocok untuk static content (gambar, CSS, JS, video).",
            sources: [
              { type: "DOCUMENTATION", title: "What is CDN? — Cloudflare", url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" },
              { type: "ARTICLE", title: "Amazon CloudFront — AWS", url: "https://aws.amazon.com/cloudfront/" },
              { type: "YOUTUBE", title: "CDN Explained", url: "https://www.youtube.com/watch?v=Bsq5cKkS33I" },
            ],
          },
          {
            type: "example",
            title: "Studi Kasus: Merancang Infrastruktur Global untuk Startup",
            body: `Mari lihat bagaimana startup **"StreamKu"** (platform streaming video seperti Netflix mini) merancang infrastruktur networking mereka untuk user di Indonesia dan Asia Tenggara.

### Requirements

- User target: Indonesia (60%), Thailand (20%), Vietnam (15%), Malaysia (5%)
- 100.000 user aktif, 10.000 concurrent streams
- Video quality: 1080p (rata-rata 5 Mbps per stream)
- Budget: Startup stage (efisien tapi scalable)

### Arsitektur yang Dirancang

**Region & Multi-AZ:**
- **Primary Region:** AWS ap-southeast-3 (Jakarta) — dekat mayoritas user
- **Secondary Region:** AWS ap-southeast-1 (Singapore) — backup + serve user dari negara lain

**VPC Design:**
VPC Jakarta: 10.0.0.0/16
- Public Subnet A (AZ-a): 10.0.1.0/24 → ALB
- Public Subnet B (AZ-b): 10.0.2.0/24 → ALB
- Private Subnet A (AZ-a): 10.0.10.0/24 → App servers
- Private Subnet B (AZ-b): 10.0.11.0/24 → App servers
- Private Subnet C (AZ-a): 10.0.20.0/24 → Database (RDS), ElastiCache

**DNS (Route 53):**
- **Geolocation Routing:** User dari Indonesia → Jakarta region, user dari Thailand/Vietnam → Singapore region
- **Failover:** Kalau Jakarta down, otomatis redirect semua traffic ke Singapore
- **Health Checks:** Monitor ALB di setiap region

**Load Balancing:**
- **Application Load Balancer** di setiap region
- Distribute traffic ke 4-8 EC2 instances (auto-scaling)
- Health check: /health endpoint setiap 30 detik

**CDN (CloudFront):**
- Origin: S3 bucket di Jakarta (store video files)
- Edge locations: Jakarta, Bangkok, Singapore, Kuala Lumpur
- Cache video files dengan TTL 7 hari (video jarang berubah)
- Reduce bandwidth cost 70% karena mayoritas request di-serve dari edge

**Database:**
- RDS PostgreSQL Multi-AZ di Jakarta (metadata: user, playlist, watch history)
- ElastiCache Redis (session store, trending videos cache)
- S3 (video storage) dengan S3 Intelligent-Tiering untuk optimize cost

**Security:**
- ALB allow HTTP (80) dan HTTPS (443) dari 0.0.0.0/0
- App servers allow port 3000 from ALB security group only
- Database allow port 5432 from app servers only
- VPC Flow Logs → CloudWatch for security monitoring

### Biaya Estimasi (per bulan)

- EC2 (6x t3.medium): $150
- RDS (db.t3.medium Multi-AZ): $90
- ElastiCache (cache.t3.micro): $15
- ALB: $25
- CloudFront (500 TB transfer): $5.000
- S3 storage (100 TB video): $2.300
- **Total: ~$7.600/bulan**

Dengan CloudFront CDN, biaya bandwidth turun 70% (dari $17.000 tanpa CDN). CDN tidak cuma bikin cepat, tapi juga hemat biaya!

### Hasil

- Latensi Jakarta: <20ms (excellent)
- Latensi Thailand: <50ms (good)
- Availability: 99.95% (6 menit downtime per bulan — acceptable untuk startup)
- Scalable: Auto-scaling handle traffic spike saat ada konten viral

Ini adalah contoh nyata bagaimana networking concepts (VPC, load balancing, DNS, CDN) digabungkan untuk build aplikasi production-grade.`,
            keyTakeaway: "Infrastruktur global: Multi-region untuk reduce latency, Geolocation DNS routing, CDN untuk video delivery, Multi-AZ untuk high availability. CDN save bandwidth cost 70%+.",
            sources: [
              { type: "YOUTUBE", title: "Global Infrastructure Architecture", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "AWS Route 53: Lebih dari Sekadar DNS",
            body: `AWS Route 53 bukan sekadar DNS biasa, melainkan layanan DNS global yang sangat cerdas. Fitur unggulannya adalah **Routing Policies** yang memungkinkan kita mengarahkan traffic secara dinamis.
            
### Routing Policies di Route 53:
1. **Simple Routing:** DNS biasa. Arahkan domain ke IP tertentu.
2. **Weighted Routing:** Bagi traffic berdasarkan persentase (misal 80% ke server lama, 20% ke server baru). Sangat berguna untuk A/B testing atau blue/green deployment.
3. **Latency Routing:** Arahkan user ke region AWS yang memberikan latency paling rendah untuk mereka.
4. **Failover Routing:** Arahkan traffic ke server utama. Jika server utama mati (gagal health check), otomatis alihkan ke server backup.
5. **Geolocation Routing:** Arahkan traffic berdasarkan negara/benua asal user.`,
            keyTakeaway: "Route 53 menyediakan routing dinamis (Weighted, Latency, Failover, Geolocation) untuk optimasi performa dan high availability.",
            sources: [
              { type: "YOUTUBE", title: "AWS Route 53 Routing Policies", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "Web Application Firewall (WAF)",
            body: `Load balancer dan CDN berfungsi mendistribusikan traffic, tapi bagaimana kalau traffic tersebut adalah serangan hacker? Di sinilah **WAF** berperan.

WAF adalah firewall khusus untuk layer 7 (HTTP/HTTPS) yang menganalisa isi payload request untuk mendeteksi:
- **SQL Injection:** Mencoba mengekstrak data database via input form
- **Cross-Site Scripting (XSS):** Menyisipkan script jahat
- **Bot Traffic:** Serangan botnet atau scrapers

Kamu bisa attach AWS WAF di depan **Application Load Balancer (ALB)** atau **CloudFront (CDN)**. WAF akan memblokir request berbahaya sebelum mencapai server aplikasimu.`,
            keyTakeaway: "WAF melindungi aplikasi web dari exploit umum seperti SQL Injection dan XSS, dan biasanya ditempatkan di ALB atau CDN.",
            sources: [
              { type: "YOUTUBE", title: "AWS WAF Explained", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "Global Accelerator",
            body: `**AWS Global Accelerator** adalah layanan untuk meningkatkan performa dan availability aplikasi secara global menggunakan jaringan fiber optik privat milik AWS.

Bagaimana bedanya dengan CloudFront (CDN)?
- **CloudFront** mencache *static content* di edge locations.
- **Global Accelerator** mengoptimalkan *dynamic content* dan TCP/UDP traffic dengan merutekan traffic user melalui backbone AWS secepat mungkin, melewati kemacetan public internet.

User akan mendapatkan sepasang **Static Anycast IP**. IP ini bisa diakses dari seluruh dunia, tapi akan mengarahkan user ke edge location terdekat, lalu traffic meluncur via fiber optik AWS ke aplikasimu di region mana pun.`,
            keyTakeaway: "Global Accelerator menggunakan backbone jaringan privat AWS untuk mempercepat akses ke dynamic applications dan memberikan static IP global.",
            sources: [
              { type: "YOUTUBE", title: "AWS Global Accelerator", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "DDoS Protection dengan AWS Shield",
            body: `Serangan **DDoS (Distributed Denial of Service)** bertujuan melumpuhkan aplikasimu dengan membanjirinya menggunakan jutaan request palsu.

AWS menyediakan **AWS Shield**, sebuah layanan managed DDoS protection.
- **Shield Standard:** Gratis dan otomatis aktif untuk semua customer AWS. Melindungi dari serangan DDoS layer 3 dan layer 4 yang paling umum (seperti SYN/UDP floods).
- **Shield Advanced:** Berbayar (sangat mahal). Menyediakan proteksi khusus untuk aplikasi besar, deteksi anomali pintar, dan ganti rugi biaya infrastruktur jika terjadi lonjakan biaya akibat serangan DDoS.

Kombinasi **Route 53 + CloudFront + WAF + Shield** adalah standar emas (gold standard) untuk ketahanan perimeter aplikasi di cloud.`,
            keyTakeaway: "AWS Shield otomatis memitigasi serangan DDoS dasar, memastikan aplikasimu tetap online saat diserang.",
            sources: [
              { type: "YOUTUBE", title: "AWS Shield & DDoS Protection", url: "https://www.youtube.com/watch?v=g2JOHLHh4rI" }
            ]
          },
          {
            type: "lesson",
            title: "SSL/TLS & HTTPS: Enkripsi Data dalam Transit",
            body: `Pernahkah kamu lihat ikon **gembok** di browser saat mengakses website? Itu tandanya koneksi antara browsermu dan server dienkripsi menggunakan **HTTPS**. Di cloud, memahami HTTPS dan SSL/TLS sangat penting untuk keamanan aplikasi.

### HTTP vs HTTPS

**HTTP (Hypertext Transfer Protocol)** — data dikirim dalam bentuk teks biasa (plain text). Siapa pun yang bisa menyadap jaringan (ISP, hacker di WiFi publik, penyedia VPN) bisa membaca isi komunikasi — termasuk password dan data kartu kredit.

**HTTPS (HTTP Secure)** — data dienkripsi menggunakan **TLS (Transport Layer Security)**, sehingga hanya server tujuan yang bisa membacanya. Bahkan jika data disadap, yang terlihat hanyalah kode acak (encrypted).

### Cara Kerja HTTPS

1. Browser request HTTPS ke server
2. Server mengirim **SSL Certificate** (sertifikat digital) yang berisi public key
3. Browser memverifikasi sertifikat ke **Certificate Authority (CA)** — perusahaan tepercaya seperti Let's Encrypt, DigiCert, atau AWS Certificate Manager
4. Setelah terverifikasi, browser dan server membuat **session key** (kunci enkripsi sementara) menggunakan handshake TLS
5. Semua data selanjutnya dienkripsi dengan session key ini

### SSL/TLS di Cloud

**SSL Termination di Load Balancer:** Alih-alih setiap server menangani enkripsi sendiri (boros CPU), kamu bisa melakukan **SSL termination** di Load Balancer (ALB). ALB menangani HTTPS, lalu meneruskan traffic ke server backend dalam HTTP biasa di jaringan internal VPC yang aman. Ini menghemat resource server dan menyederhanakan manajemen sertifikat.

### AWS Certificate Manager (ACM)

AWS menyediakan **ACM** untuk membuat, mengelola, dan memperbarui SSL/TLS certificates secara **gratis**. Kamu attach certificate ke CloudFront, ALB, atau API Gateway, dan AWS mengurus perpanjangan otomatis. Tidak perlu khawatir sertifikat expired.`,
            keyTakeaway: "HTTPS mengenkripsi data dengan TLS. SSL Termination di Load Balancer (ALB) menghemat CPU server dan menyederhanakan manajemen. ACM menyediakan sertifikat gratis dengan perpanjangan otomatis.",
            sources: [
              { type: "DOCUMENTATION", title: "What is HTTPS? — Cloudflare", url: "https://www.cloudflare.com/learning/ssl/what-is-https/" },
              { type: "DOCUMENTATION", title: "AWS Certificate Manager — AWS Docs", url: "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html" },
            ],
          },
          {
            type: "lesson",
            title: "Network Monitoring & Observability di Cloud",
            body: `Setelah aplikasi production berjalan, pertanyaan pentingnya: **bagaimana cara tahu jaringan bekerja dengan baik?** Jawabannya adalah monitoring dan observability.

### Mengapa Network Monitoring Penting?

Tanpa monitoring, kamu akan buta terhadap masalah jaringan hingga user mengeluh. Dengan monitoring yang tepat, kamu bisa:
- **Deteksi dini** — tahu ada latency meningkat sebelum user complain
- **Troubleshoot cepat** — tahu di mana letak bottleneck (DNS? CDN? Load Balancer? Database?)
- **Capacity planning** — lihat trend traffic untuk merencanakan scaling

### Tools Network Monitoring di Cloud

**1. VPC Flow Logs**
Merekam semua traffic yang masuk dan keluar dari network interfaces di VPC. Informasi yang dicatat: source IP, destination IP, port, protocol, action (ACCEPT/REJECT), dan jumlah bytes. Sangat berguna untuk troubleshoot connectivity issues dan security analysis.

**2. CloudWatch Metrics**
- **ALB:** Request count, latency (target response time), HTTP 5xx/4xx count, active connections
- **NAT Gateway:** Bytes processed, active connections, error port allocation
- **Network Load Balancer:** Processed bytes, new connections, active flows

**3. Reachability Analyzer**
Tool dari AWS VPC untuk troubleshoot konektivitas. Kamu tentukan source dan destination (EC2 instance, RDS, ENI), dan AWS akan menganalisis apakah keduanya bisa berkomunikasi — termasuk menganalisis security groups, NACLs, dan route tables.

Contoh: "Kenapa EC2 di private subnet A tidak bisa konek ke RDS di private subnet B?" → Run Reachability Analyzer → akan tunjukkan di mana blokade-nya.

### Best Practices Network Monitoring

1. **Aktifkan VPC Flow Logs** di semua VPC production — simpan di S3 untuk audit dan analysis
2. **Set CloudWatch Alarms** untuk latency > 500ms dan error rate > 1%
3. **Gunakan Reachability Analyzer** sebelum blame network saat troubleshoot
4. **Monitor bandwidth utilization** — tahu kapan perlu scale up instance type
5. **Dashboard monitoring** — display metrics paling penting di satu layar untuk operational visibility`,
            keyTakeaway: "Network monitoring: VPC Flow Logs (traffic record), CloudWatch (metrics & alarms), Reachability Analyzer (connectivity troubleshoot). Wajib diaktifkan untuk semua environment production.",
            sources: [
              { type: "DOCUMENTATION", title: "VPC Flow Logs — AWS Docs", url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html" },
              { type: "DOCUMENTATION", title: "Reachability Analyzer — AWS Docs", url: "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html" },
            ],
          },
          {
            type: "summary",
            title: "Rangkuman: DNS, Load Balancing & CDN",
            body: `Selamat! Kamu sudah menguasai konsep networking lanjutan untuk cloud. Mari rekapitulasi modul ini:

### DNS (Domain Name System)
- Menerjemahkan domain (clarise.my.id) ke IP address
- Proses: Browser → DNS Resolver → Root → TLD → Authoritative Server
- Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (email), TXT (verification)
- TTL menentukan durasi cache
- Cloud DNS: Route 53, Google Cloud DNS, Cloudflare

### Load Balancing
- Distribute traffic ke banyak server
- Keuntungan: High availability, scalability, performance
- Algoritma: Round Robin, Least Connections, IP Hash, Weighted
- Health checks untuk deteksi server unhealthy
- Jenis: Application LB (Layer 7), Network LB (Layer 4)

### CDN (Content Delivery Network)
- Cache konten di edge locations di seluruh dunia
- User dapat konten dari edge terdekat (low latency)
- Cocok untuk static content: images, CSS, JS, video
- Cache control via HTTP headers (max-age, no-cache)
- Providers: CloudFront, Cloudflare, Google Cloud CDN

### Prinsip Arsitektur Cloud
- **Multi-AZ:** Deploy di minimal 2 availability zones
- **Multi-Region:** Deploy di beberapa region untuk global reach
- **Geolocation Routing:** User dari region X → server terdekat
- **Auto-Scaling:** Tambah/kurangi server based on demand
- **Monitoring:** CloudWatch, VPC Flow Logs, health checks

### Perjalanan Request User (Full Flow)

User ketik clarise.my.id:
1. **DNS lookup** (Route 53) → dapat IP CloudFront edge terdekat
2. **CloudFront edge** cek cache → HIT: serve langsung, MISS: request ke origin
3. **ALB** terima request dari origin → distribute ke app server yang healthy
4. **App server** (di private subnet) process request → query database lewat internal network
5. **Database** (RDS Multi-AZ) return data
6. **App server** return response → ALB → CloudFront → User

Semua ini terjadi dalam **puluhan milidetik** — user hanya tahu "website cepat".

### Next Steps

Kamu sudah punya fondasi networking yang kuat untuk:
- Deploy aplikasi production di cloud
- Merancang arsitektur multi-region yang scalable
- Troubleshoot network issues dengan confidence
- Lanjut belajar: Kubernetes networking, Service Mesh, atau Serverless architectures

Selamat belajar dan selamat membangun di cloud! 🚀`,
            keyTakeaway: "Arsitektur cloud modern: DNS routing → CDN edge → Load Balancer → App servers (private subnet) → Database. Multi-AZ untuk availability, Multi-Region untuk global reach, CDN untuk performance.",
          },
          {
            type: "quiz",
            title: "Kuis: Uji Pemahamanmu tentang DNS, Load Balancing & CDN",
            body: "Pastikan kamu sudah memahami DNS, load balancing algorithms, CDN, dan bagaimana semuanya bekerja bersama dalam arsitektur cloud modern.",
            quizBank: [
              {
                id: "q1",
                question: "Apa fungsi utama DNS (Domain Name System)?",
                options: [
                  { id: "a", text: "Mengenkripsi koneksi internet" },
                  { id: "b", text: "Menerjemahkan nama domain menjadi IP address" },
                  { id: "c", text: "Menyimpan file website di cloud" },
                  { id: "d", text: "Membagi traffic ke banyak server" },
                ],
                correctAnswer: "b",
                explanation: "DNS adalah sistem yang menerjemahkan nama domain yang mudah diingat (google.com) menjadi IP address yang dipahami komputer (142.250.4.113). Tanpa DNS, kita harus hafalkan IP address setiap website yang mau dikunjungi.",
                difficulty: "easy",
              },
              {
                id: "q2",
                question: "Apa keuntungan utama menggunakan Load Balancer?",
                options: [
                  { id: "a", text: "Membuat website load lebih cepat" },
                  { id: "b", text: "High availability dan scalability dengan distribute traffic ke banyak server" },
                  { id: "c", text: "Menyimpan cache konten static" },
                  { id: "d", text: "Menerjemahkan domain ke IP address" },
                ],
                correctAnswer: "b",
                explanation: "Load Balancer membagi traffic masuk ke beberapa server backend. Kalau satu server crash, traffic auto pindah ke server lain (high availability). Butuh handle lebih banyak traffic? Tambah server — load balancer otomatis distribute (scalability).",
                difficulty: "easy",
              },
              {
                id: "q3",
                question: "Algoritma load balancing mana yang paling cocok untuk memastikan user selalu connect ke server yang sama (session persistence)?",
                options: [
                  { id: "a", text: "Round Robin" },
                  { id: "b", text: "Least Connections" },
                  { id: "c", text: "IP Hash" },
                  { id: "d", text: "Weighted" },
                ],
                correctAnswer: "c",
                explanation: "IP Hash melakukan hash terhadap IP address user dan selalu mengirim user tersebut ke server yang sama. Ini berguna untuk session persistence (misal shopping cart harus tetap di server yang sama). Round Robin akan kirim ke server berbeda setiap request.",
                difficulty: "medium",
              },
              {
                id: "q4",
                question: "Apa perbedaan antara 'Cache HIT' dan 'Cache MISS' di CDN?",
                options: [
                  { id: "a", text: "Cache HIT artinya konten ada di edge, Cache MISS artinya harus request ke origin server" },
                  { id: "b", text: "Cache HIT artinya konten rusak, Cache MISS artinya konten valid" },
                  { id: "c", text: "Tidak ada perbedaan, keduanya sama" },
                  { id: "d", text: "Cache HIT hanya untuk video, Cache MISS untuk gambar" },
                ],
                correctAnswer: "a",
                explanation: "Cache HIT = konten sudah ada di edge location (serve langsung, cepat). Cache MISS = konten tidak ada di edge (harus request ke origin server, save di cache, baru serve ke user — lambat pertama kali, tapi request berikutnya jadi HIT).",
                difficulty: "easy",
              },
              {
                id: "q5",
                question: "Jenis konten mana yang PALING cocok untuk di-cache di CDN?",
                options: [
                  { id: "a", text: "API responses yang personalized per user" },
                  { id: "b", text: "Data real-time stock prices" },
                  { id: "c", text: "Gambar produk, CSS, JavaScript, dan video" },
                  { id: "d", text: "Database query results" },
                ],
                correctAnswer: "c",
                explanation: "Static content (gambar, CSS, JS, video) ideal untuk CDN karena kontennya sama untuk semua user dan jarang berubah. Dynamic/personalized content (API responses, real-time data) tidak cocok karena berbeda untuk setiap user dan sering berubah.",
                difficulty: "medium",
              },
              {
                id: "q6",
                question: "Apa fungsi 'Health Check' di Load Balancer?",
                options: [
                  { id: "a", text: "Mengecek kesehatan user yang akses website" },
                  { id: "b", text: "Mengecek apakah server backend masih hidup dan bisa terima traffic" },
                  { id: "c", text: "Mengecek kecepatan koneksi internet user" },
                  { id: "d", text: "Mengecek keamanan SSL certificate" },
                ],
                correctAnswer: "b",
                explanation: "Health Check adalah mekanisme load balancer untuk periodik ping setiap server backend. Kalau server tidak respond atau respond dengan error, load balancer mark server itu 'unhealthy' dan stop kirim traffic kesitu. Ini ensure user hanya di-route ke server yang healthy.",
                difficulty: "medium",
              },
              {
                id: "q7",
                question: "Dalam DNS, apa yang dimaksud dengan TTL (Time To Live)?",
                options: [
                  { id: "a", text: "Berapa lama domain valid sebelum expired" },
                  { id: "b", text: "Berapa lama DNS record bisa di-cache sebelum harus re-query" },
                  { id: "c", text: "Berapa lama server DNS harus online" },
                  { id: "d", text: "Kecepatan response DNS server" },
                ],
                correctAnswer: "b",
                explanation: "TTL menentukan berapa lama DNS record bisa di-cache oleh resolver atau browser. TTL 3600 = cache selama 1 jam. Setelah TTL habis, resolver akan query DNS lagi untuk memastikan IP address belum berubah. TTL rendah = perubahan cepat propagate tapi lebih banyak DNS query.",
                difficulty: "medium",
              },
              {
                id: "q8",
                question: "Apa keuntungan menggunakan CDN untuk video streaming?",
                options: [
                  { id: "a", text: "Video quality jadi lebih tinggi" },
                  { id: "b", text: "Reduce latency dan bandwidth cost dengan serve video dari edge terdekat user" },
                  { id: "c", text: "Video otomatis ter-compress" },
                  { id: "d", text: "Video tidak bisa di-download" },
                ],
                correctAnswer: "b",
                explanation: "CDN cache video di edge locations di seluruh dunia. User dapat video dari edge terdekat (latency rendah = no buffering). Origin server tidak dibombardir bandwidth (cost saving 70%+). Quality dan compression tidak diubah oleh CDN — itu tergantung encoding video.",
                difficulty: "medium",
              },
              {
                id: "q9",
                question: "Mana pernyataan yang BENAR tentang Application Load Balancer vs Network Load Balancer?",
                options: [
                  { id: "a", text: "Application LB bekerja di Layer 7 (HTTP/HTTPS), Network LB di Layer 4 (TCP/UDP)" },
                  { id: "b", text: "Network LB hanya untuk jaringan internal, Application LB untuk internet" },
                  { id: "c", text: "Application LB lebih cepat dari Network LB" },
                  { id: "d", text: "Tidak ada perbedaan, hanya nama yang beda" },
                ],
                correctAnswer: "a",
                explanation: "Application LB (ALB) bekerja di Layer 7 — bisa inspect HTTP content dan routing berdasarkan URL path/headers. Network LB (NLB) bekerja di Layer 4 — hanya lihat IP/port, tidak bisa inspect HTTP. NLB lebih cepat (ultra-low latency) tapi less flexible. ALB cocok untuk web apps, NLB untuk game servers atau streaming.",
                difficulty: "hard",
              },
              {
                id: "q10",
                question: "Dalam studi kasus StreamKu, mengapa menggunakan Geolocation Routing di Route 53?",
                options: [
                  { id: "a", text: "Untuk block user dari negara tertentu" },
                  { id: "b", text: "Agar user dari setiap region di-route ke server terdekat untuk reduce latency" },
                  { id: "c", text: "Untuk mendeteksi lokasi user dan tampilkan konten berbeda" },
                  { id: "d", text: "Tidak ada alasan khusus, hanya untuk eksperimen" },
                ],
                correctAnswer: "b",
                explanation: "Geolocation Routing mengarahkan user berdasarkan lokasi geografis mereka. User dari Indonesia → server Jakarta (latensi 20ms), user dari Thailand → server Singapore (latensi 50ms). Ini optimize user experience dengan reduce latency — prinsip fundamental dari distributed systems.",
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
