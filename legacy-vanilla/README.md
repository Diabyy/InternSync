# InternSync

Prototipe website untuk membantu peserta PKL dan pembimbing lapangan mengelola tugas, jam kerja, laporan kendala, instruksi, dan progres harian dalam satu tempat.

## Fitur

- Dashboard peserta dan pembimbing
- Papan tugas dengan status dan progres
- Laporan blocker terstruktur dengan pilihan anonim
- Respons dan penyelesaian blocker oleh pembimbing
- Daily standup satu menit
- Pencatatan jam kerja dengan timer
- Pusat informasi dan dokumen proyek
- Data tersimpan otomatis melalui `localStorage`
- Tampilan responsif untuk desktop dan perangkat seluler

## Menjalankan Website

Tidak ada dependensi yang perlu dipasang. Jalankan server lokal dari folder proyek:

```powershell
python -m http.server 8000
```

Kemudian buka `http://localhost:8000` di browser.

Website juga dapat dibuka langsung melalui `index.html`, tetapi server lokal direkomendasikan agar semua resource dimuat secara konsisten.

## Akun Demo

Gunakan pilihan **Mode tampilan** pada sidebar untuk berpindah antara:

- Peserta: Andi Pratama
- Pembimbing: Rina Putri

Pilihan ini hanya mensimulasikan dua jenis pengguna dan tidak menggunakan autentikasi server.

## Struktur

```text
InternSync/
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   |-- data.js
|   `-- app.js
`-- README.md
```

## Reset Data

Gunakan tombol **Reset data demo** pada bagian bawah sidebar untuk menghapus perubahan dan mengembalikan seluruh data contoh.
