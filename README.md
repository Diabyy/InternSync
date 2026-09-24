# InternSync — Smart Field Mentorship & Blocker Manager

> Aplikasi jembatan komunikasi operasional antara peserta PKL dan pembimbing lapangan industri agar alur kerja lebih transparan, terstruktur, dan minim rasa canggung.

---

## 1. Identifikasi Permasalahan di Industri

Berdasarkan evaluasi langsung di tempat Praktik Kerja Lapangan (PKL), terdapat kendala nyata pada alur komunikasi dan manajemen kerja antara peserta PKL dan pembimbing lapangan industri:

1. **Ketidakpastian Informasi dan Jam Kerja:**
   - Instruksi tugas dari pembimbing lapangan terkadang disampaikan secara lisan atau kurang terstruktur karena kesibukan pembimbing.
   - Hal ini berdampak langsung pada jam pulang dan jam operasional peserta PKL yang menjadi tidak teratur.
2. **Hambatan Komunikasi Langsung (*Awkward to Speak Up*):**
   - Peserta PKL sering merasa canggung, sungkan, atau takut dinilai tidak mampu saat ingin bertanya dan melaporkan kendala teknis secara tatap muka kepada pembimbing industri.
3. **Keterlambatan Penanganan Masalah (*Blocker Proyek*):**
   - Masalah teknis pada proyek sering dipendam sendiri oleh peserta dan baru terungkap saat mendekati tenggat waktu (*deadline*), sehingga mengganggu target pencapaian tim dan perusahaan.

---

## 2. Solusi & Fitur Utama InternSync

InternSync dirancang sebagai solusi berbasis web yang menghubungkan kebutuhan operasional harian peserta PKL dan pembimbing industri:

### 🛡️ Sistem Pelaporan Kendala (*Anonymous/Structured Blocker Alert*)
- Pelaporan kendala proyek secara terstruktur (mengaitkan tugas, kategori masalah, tingkat urgensi, dan deskripsi apa yang sudah dicoba).
- **Opsi Laporan Anonim:** Peserta dapat menyembunyikan identitas jika merasa sungkan, namun pembimbing tetap mendapatkan konteks masalah untuk segera memberikan arahan teknis.
- Status blocker otomatis membuka kembali penugasan setelah pembimbing mengirimkan solusi.

### 📋 Papan Tugas & Transparansi Jam Kerja (*Task & Work-Log Tracker*)
- **Papan Kanban Interaktif:** Menampilkan status penugasan (*Belum Dimulai, Dikerjakan, Terhambat, Selesai*) beserta perkiraan tenggat dan slider progres penyelesaian.
- **Pencatatan Jam Kerja (Timer Real-Time):** Fitur mulai dan selesai jam kerja untuk memastikan jam operasional peserta PKL tercatat transparan, terukur, dan sesuai batas kerja sehat (08.00 - 16.00 WIB).

### 📚 Pusat Informasi Tugas (*Task & Instruction Hub*)
- Ruang terpusat bagi pembimbing untuk mengunggah dan mendokumentasikan instruksi resmi, acuan desain UI/UX (Figma), dokumentasi API, dan standar operasional.
- Dilengkapi pencarian instan agar tidak ada informasi penting yang tercecer.

### ⏱️ Ringkasan Progres Harian (*1-Minute Daily Standup*)
- Formulir evaluasi ringkas harian (Apa yang diselesaikan, apa rencana berikutnya, hambatan, serta indikator mood/kondisi kerja).
- Pembimbing lapangan dapat memantau ritme kerja seluruh peserta dalam satu tampilan tanpa perlu bertanya berulang kali.

### 👥 Dual Role Experience
- Beralih peran instan antara mode **Peserta (Andi Pratama)** dan **Pembimbing (Rina Putri)** untuk demonstrasi alur kerja dua arah.

---

## 3. Stack Teknologi

Aplikasi ini dibangun menggunakan arsitektur modern berbasis React:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/) (Type-safe domain models)
- **Styling & Desain Sistem:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ikonografi:** [Lucide React](https://lucide.dev/) (SVG vector icons)
- **Tipografi:** Google Fonts (`Fredoka` untuk judul ekspresif & `Nunito` untuk teks antarmuka)
- **Manajemen State:** React Context API dengan sinkronisasi otomatis ke `localStorage`

---

## 4. Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- npm, pnpm, atau yarn

### Langkah Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/Diabyy/InternSync.git
   cd InternSync
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server development:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

4. **Build untuk Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 5. Deployment ke Vercel

Aplikasi ini dioptimalkan untuk di-deploy ke platform **Vercel**:

1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Hubungkan akun GitHub Anda dan pilih repository `Diabyy/InternSync`.
3. Vercel akan secara otomatis mendeteksi konfigurasi Next.js.
4. Klik tombol **Deploy**.
5. Aplikasi akan langsung tersedia secara publik dengan domain `https://internsync.vercel.app`.

---

## 6. Struktur Direktori Proyek

```text
InternSync/
├── legacy-vanilla/             # Backup arsip prototipe Vanilla JS awal
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout & font loader Google Fonts
│   │   ├── page.tsx            # Halaman utama aplikasi & router view
│   │   └── globals.css         # Desain token & gaya kustom
│   ├── types/
│   │   └── index.ts            # Definisi tipe TypeScript (Task, Blocker, Standup, dll.)
│   ├── data/
│   │   └── initialData.ts      # Data seed awal untuk simulasi demo
│   ├── context/
│   │   └── InternSyncContext.tsx # Central state management & local storage sync
│   ├── lib/
│   │   └── utils.ts            # Helper formatting tanggal, durasi, dan timer
│   └── components/
│       ├── common/             # Reusable UI (StatCard, ToastContainer)
│       ├── layout/             # Sidebar, Topbar, MobileNav
│       ├── modals/             # BlockerModal, TaskDetailModal, NewTaskModal, RespondModal
│       └── views/              # DashboardView, TasksView, BlockersView, StandupView, WorkLogView, ResourcesView
├── package.json
├── tsconfig.json
└── README.md
```

---

*Dikembangkan untuk mengoptimalkan efisiensi kerja, transparansi jam operasional, dan kelancaran komunikasi teknis antara peserta PKL dan pembimbing industri.*
