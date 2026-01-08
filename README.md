# ☕ Coffee Calc - DevOps Final Assignment

Project ini merupakan **Tugas Besar / Final Assignment** untuk mata kuliah DevOps. Aplikasi ini dikembangkan berdasarkan project sebelumnya (**Coffee-Calc**) dengan penambahan fitur utama berupa persistensi data ke database dan implementasi monitoring stack.

## 🛠️ Deskripsi Project

Project ini mendemonstrasikan implementasi siklus DevOps secara end-to-end:

* **Improvement dari Project Sebelumnya**: Transformasi dari aplikasi stateless menjadi stateful dengan integrasi **PostgreSQL**.
* **Containerization**: Menggunakan Docker dan Docker Compose untuk orkestrasi microservices (App, DB, Prometheus, Grafana).
* **Automated CI/CD**: Implementasi GitHub Actions untuk otomatisasi pengiriman kode ke server produksi menggunakan SCP Shoutout To AppleBoy V3.
* **Monitoring Stack**: Penggunaan Prometheus dan Grafana untuk memantau performa aplikasi dan kesehatan server.

## 🏗️ Arsitektur Sistem

* **Backend**: Node.js (Express.js) - Menangani logika kalkulasi kopi.
* **Database**: PostgreSQL - Alpine (Service name: `test-db`) - Menyimpan data hasil kalkulasi.
* **Prometheus**: Mengumpulkan metrik dari aplikasi dan server.
* **Grafana**: Visualisasi data metrik melalui dashboard interaktif.

## 📦 Struktur Direktori
```text
├── config/
│   ├── prometheus.yml        # Konfigurasi scrape metrics
├── app-project (coffee-calc)/
│   ├── public/               # Application files
├── docker-compose.yml        # Orkestrasi seluruh stack devops
├── docker-compose.prod.yml   # Orkestrasi seluruh stack devops versi production
├── server.js                 # API dengan endpoint baru /test-db
├── .github/workflows/        # Automasi deployment (GitHub Actions)
└── README.md
```

## 🚀 Cara Menjalankan

### Prerequisites
- Docker & Docker Compose terinstall
- Node.js (untuk development lokal)
- Git

### Local Development
```bash
# Clone repository
git clone <repository-url>
cd coffee-calc

# Jalankan dengan Docker Compose
docker-compose up -d

# Atau untuk production
docker-compose -f docker-compose.prod.yml up -d
```

## 🔗 Akses Publik

* **Aplikasi**: `http://70.153.136.192:3000`
* **Test Database**: `http://70.153.136.192:3000/test-db`
* **Prometheus**: `http://70.153.136.192:9090`
* **Grafana**: `http://70.153.136.192:3001` (username: admin, password: admin)

---

## 📊 Testing Performance Metrics

* Metrics menggunakan `coffee_brews_total` 
* Video Demo Project: [Link Video](https://youtu.be/Ztppdyn1IP0)

## 👥 Team Roles & Responsibilities

**Integration Coordinator / Manager – Rafli Dhafin Kamil (2211104018)**  
Responsible for task distribution, timeline management, final system integration, and maintaining repository structure and naming standards.

**Docker & Compose Engineer – Rafli Dhafin Kamil (2211104018), Muhammad Samudra (2211104042)**  
Handles Dockerfile and docker-compose configuration and ensures the application and database run properly in local and VM environments.

**VM / Cloud Engineer – Zivana Afra Yulianto (2211104039)**  
Manages VM provisioning, firewall and SSH configuration, Docker and Docker Compose installation, and runs the application stack.

**CI/CD Engineer – Dewi Atika Muthi (2211104042)**  
Designs and implements the CI/CD pipeline for build, test, and deployment, including deployment to VM without using DockerHub.

**Observability Engineer – Rafli Dhafin Kamil (2211104018)**  
Sets up Prometheus and Grafana, builds monitoring dashboards, and ensures system metrics are properly collected.

**Documentation & Video – Elvaretta Anantya Velya (2211104074), Rafli Dhafin Kamil (2211104018)**  
Creates setup and architecture documentation, prepares demo flow, and ensures execution evidence through video.

## 🙏 Special Thanks To 

[@yudhaislamisulistya](https://github.com/yudhaislamisulistya) as a Lecturer and Mentor for teaching us how to build and learn DevOps in best practice way. It was an interesting class even if it's only 5 students XD

---

## 📝 License

This project is created for educational purposes as part of DevOps course assignment.