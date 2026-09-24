window.INTERNSYNC_DEMO_DATA = {
  tasks: [
    {
      id: "TSK-104",
      title: "Implementasi halaman katalog produk",
      project: "Website UMKM Sari Rasa",
      status: "progress",
      priority: "high",
      due: "2026-09-14",
      progress: 65,
      estimate: "6 jam",
      description: "Membuat tampilan katalog yang responsif berdasarkan desain Figma dan menghubungkannya dengan data produk lokal.",
      instruction: "Gunakan semantic HTML, pastikan kartu produk tetap terbaca pada layar 375px, dan cocokkan spacing dengan desain.",
      mentor: "Rina Putri",
      tags: ["Frontend", "Responsive"]
    },
    {
      id: "TSK-105",
      title: "Validasi formulir pemesanan",
      project: "Website UMKM Sari Rasa",
      status: "blocker",
      priority: "urgent",
      due: "2026-09-13",
      progress: 35,
      estimate: "3 jam",
      description: "Menambahkan validasi pada formulir pemesanan dan menampilkan pesan kesalahan yang mudah dipahami.",
      instruction: "Validasi nama, nomor WhatsApp, alamat, dan jumlah pesanan sebelum data dikirim.",
      mentor: "Rina Putri",
      tags: ["JavaScript", "Form"]
    },
    {
      id: "TSK-106",
      title: "Optimasi gambar hero",
      project: "Website UMKM Sari Rasa",
      status: "todo",
      priority: "medium",
      due: "2026-09-16",
      progress: 0,
      estimate: "2 jam",
      description: "Mengurangi ukuran gambar hero tanpa menurunkan kualitas visual secara signifikan.",
      instruction: "Gunakan format WebP dan sediakan width serta height untuk mencegah layout shift.",
      mentor: "Rina Putri",
      tags: ["Performance"]
    },
    {
      id: "TSK-101",
      title: "Menyusun struktur halaman utama",
      project: "Website UMKM Sari Rasa",
      status: "done",
      priority: "medium",
      due: "2026-09-10",
      progress: 100,
      estimate: "4 jam",
      description: "Menyusun struktur awal halaman utama dengan HTML semantik.",
      instruction: "Gunakan bagian header, main, section, dan footer sesuai fungsi konten.",
      mentor: "Rina Putri",
      tags: ["HTML"]
    },
    {
      id: "TSK-102",
      title: "Membuat komponen navigasi",
      project: "Website UMKM Sari Rasa",
      status: "done",
      priority: "low",
      due: "2026-09-11",
      progress: 100,
      estimate: "3 jam",
      description: "Membuat navigasi desktop dan mobile yang mudah digunakan.",
      instruction: "Pastikan menu dapat digunakan dengan keyboard dan memiliki indikator halaman aktif.",
      mentor: "Rina Putri",
      tags: ["CSS", "Accessibility"]
    }
  ],
  blockers: [
    {
      id: "BLK-018",
      taskId: "TSK-105",
      title: "Data form hilang setelah validasi gagal",
      category: "Teknis",
      urgency: "urgent",
      description: "Saat satu input tidak valid, seluruh nilai form terhapus. Saya sudah mencoba mencegah reload dengan preventDefault tetapi masalah masih terjadi.",
      anonymous: false,
      author: "Andi Pratama",
      createdAt: "2026-09-12T09:20:00",
      status: "open",
      response: ""
    },
    {
      id: "BLK-017",
      taskId: "TSK-104",
      title: "Ukuran kartu tidak konsisten",
      category: "Desain",
      urgency: "medium",
      description: "Tinggi kartu berubah saat nama produk lebih dari dua baris.",
      anonymous: true,
      author: "Peserta anonim",
      createdAt: "2026-09-11T14:10:00",
      status: "resolved",
      response: "Gunakan grid pada isi kartu dan batasi judul dengan line-clamp dua baris."
    }
  ],
  standups: [
    {
      id: "STD-011",
      date: "2026-09-11",
      done: "Menyelesaikan layout katalog untuk desktop dan menambahkan data produk contoh.",
      plan: "Melanjutkan tampilan mobile dan validasi formulir pemesanan.",
      blocker: "Tinggi kartu produk belum konsisten.",
      mood: "good"
    },
    {
      id: "STD-010",
      date: "2026-09-10",
      done: "Membuat struktur HTML dan navigasi utama.",
      plan: "Mulai mengerjakan katalog produk.",
      blocker: "Tidak ada.",
      mood: "great"
    }
  ],
  workLogs: [
    { id: "LOG-021", date: "2026-09-11", start: "08:03", end: "16:08", duration: 485, note: "Layout katalog dan review bersama pembimbing" },
    { id: "LOG-020", date: "2026-09-10", start: "07:57", end: "16:02", duration: 485, note: "Struktur halaman utama dan navigasi" },
    { id: "LOG-019", date: "2026-09-09", start: "08:05", end: "15:55", duration: 470, note: "Mempelajari desain dan menyiapkan aset" }
  ],
  resources: [
    { id: "RES-01", type: "Panduan", title: "Standar Frontend Tim", description: "Aturan penamaan class, struktur folder, dan checklist sebelum review.", meta: "PDF - 1,8 MB", color: "teal" },
    { id: "RES-02", type: "Desain", title: "Figma Website Sari Rasa", description: "Desain final desktop dan mobile untuk proyek yang sedang dikerjakan.", meta: "Tautan eksternal", color: "purple" },
    { id: "RES-03", type: "Teknis", title: "Dokumentasi API Produk", description: "Struktur data produk, kategori, dan contoh respons API.", meta: "Dokumentasi - diperbarui 10 Sep", color: "orange" },
    { id: "RES-04", type: "Operasional", title: "Aturan Jam Kerja PKL", description: "Jam masuk, istirahat, izin, dan prosedur pencatatan lembur.", meta: "PDF - 640 KB", color: "blue" },
    { id: "RES-05", type: "Video", title: "Cara Melakukan Code Review", description: "Rekaman singkat alur mengirim tugas dan menerima revisi.", meta: "Video - 08:32", color: "pink" }
  ],
  participants: [
    { id: "USR-01", name: "Andi Pratama", initials: "AP", division: "Frontend", progress: 62, status: "blocker", standup: true, activeTasks: 3 },
    { id: "USR-02", name: "Siti Rahma", initials: "SR", division: "UI/UX", progress: 78, status: "on-track", standup: true, activeTasks: 2 },
    { id: "USR-03", name: "Dimas Saputra", initials: "DS", division: "Backend", progress: 48, status: "needs-update", standup: false, activeTasks: 4 },
    { id: "USR-04", name: "Nadia Putri", initials: "NP", division: "Quality Assurance", progress: 85, status: "on-track", standup: true, activeTasks: 2 }
  ],
  clockSession: null
};
