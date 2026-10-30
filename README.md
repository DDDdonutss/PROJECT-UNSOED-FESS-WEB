# UNSOED FESS

Website sederhana untuk mahasiswa Universitas Jenderal Soedirman (Unsoed) agar dapat menyampaikan aspirasi, lelucon, dan keluh kesah tanpa menampilkan nama. Proyek ini dibuat sebagai mini project kelompok dan dikembangkan sebagai website satu halaman (*single-page website*).

> **Catatan penting:** Versi repository saat ini berjalan sepenuhnya di browser. Fess yang dikirim disimpan di `localStorage` browser yang sedang digunakan, bukan dikirim ke server atau database. Karena itu, Fess tidak otomatis dibagikan atau terlihat oleh pengguna lain, dan data tidak tersinkron antarperangkat.

## Tujuan dan Latar Belakang

Mahasiswa sering memiliki saran, cerita, atau keluh kesah seputar kehidupan kampus, tetapi tidak selalu nyaman menyampaikannya dengan identitas pribadi. UNSOED FESS menyediakan antarmuka sederhana untuk menulis dan membaca kiriman secara anonim pada browser masing-masing.

Tujuan proyek:

- Menyediakan media untuk menyampaikan aspirasi, lelucon, dan keluh kesah seputar kehidupan kampus.
- Membuat proses pengiriman Fess mudah digunakan tanpa membuat akun.
- Menyediakan tampilan responsif yang dapat diakses melalui desktop maupun perangkat seluler.
- Menerapkan perhatian dasar terhadap aksesibilitas, privasi, dan kenyamanan penggunaan.

## Fitur dan Section Website

### Fitur

- **Kirim Fess:** Pengguna dapat menulis kiriman tanpa mencantumkan nama.
- **Tiga kategori:** Aspirasi, Lelucon, dan Keluh Kesah.
- **Validasi formulir:** Isi Fess tidak boleh kosong, kategori wajib dipilih, dan panjang kiriman maksimal 500 karakter.
- **Daftar Fess:** Kiriman ditampilkan dengan kategori dan waktu, dengan kiriman terbaru berada di bagian atas.
- **Pencarian Fess:** Menyaring daftar berdasarkan teks yang diketik.
- **Penyimpanan lokal:** Kiriman tersimpan di `localStorage` browser dan tetap tersedia setelah halaman dimuat ulang pada browser/origin yang sama.
- **Reset Fess:** Pengguna dapat menghapus semua kiriman lokal melalui tombol reset.
- **Mode gelap dan terang:** Pilihan tema disimpan di browser; kunjungan pertama mengikuti preferensi tema perangkat.
- **Navigasi responsif:** Menu navigasi menyesuaikan ukuran layar dan menyediakan perpindahan antar-section.
- **Animasi dan aksesibilitas:** Menggunakan animasi saat scroll, indikator fokus keyboard, label formulir, serta dukungan preferensi *reduced motion* pada navigasi scroll.

### Section

1. **Beranda** — pengenalan singkat UNSOED FESS.
2. **Tentang** — latar belakang, tujuan, visi, misi, dan aturan penggunaan.
3. **Kirim & Baca Fess** — formulir pengiriman serta daftar kiriman.
4. **Kategori Fess** — penjelasan kategori Aspirasi, Lelucon, dan Keluh Kesah.
5. **Kontak** — kanal kontak yang ditampilkan pada halaman.
6. **Footer** — identitas proyek dan navigasi bagian bawah.

> Informasi kontak pada `index.html` masih menggunakan alamat/tautan contoh. Ganti dengan kontak kelompok yang benar sebelum website dipublikasikan.

## Teknologi yang Digunakan

| Teknologi | Penggunaan |
|---|---|
| HTML5 | Struktur dan konten halaman. |
| CSS3 | Styling, design token, layout responsif, dan tema gelap/terang. |
| JavaScript | Validasi, pengelolaan Fess, pencarian, penyimpanan lokal, dan interaksi halaman. |
| Bootstrap | Grid, navbar, komponen, dan utilitas responsif. File CSS dan JavaScript tersedia di repository. |
| jQuery | Membantu interaksi pada `custom.js`. |
| AOS (Animate On Scroll) | Animasi elemen ketika halaman digulir. |
| Font Awesome | Ikon pada navigasi, tombol, dan kategori. |
| Google Fonts | Font Bricolage Grotesque dan Source Sans 3. Memerlukan koneksi internet agar dapat dimuat dari Google Fonts. |
| Browser `localStorage` | Penyimpanan Fess dan preferensi tema secara lokal. |

Proyek saat ini tidak menggunakan framework frontend, backend, API, atau database. Tidak diperlukan proses instalasi dependency melalui npm untuk menjalankannya.

## Struktur Repository

```text
PROJECT-UNSOED-FESS-WEB/
├── css/
│   ├── bootstrap.min.css
│   ├── font-awesome.min.css
│   ├── aos.css
│   └── style.css
├── fonts/
├── images/
│   └── favicon.svg
├── js/
│   ├── jquery.min.js
│   ├── bootstrap.min.js
│   ├── aos.js
│   ├── theme.js
│   ├── smoothscroll.js
│   ├── custom.js
│   └── app.js
├── .gitignore
├── index.html
├── README.md
└── engineering.md
```

Folder `fonts/` dan `images/` juga menyimpan aset pendukung lainnya. Daftar di atas merangkum file dan direktori utama yang digunakan halaman.

## Cara Menjalankan Website Secara Lokal

### Prasyarat

- Git, jika ingin mengunduh repository dengan `git clone`.
- Browser modern seperti Chrome, Firefox, Edge, atau Safari.
- Python 3 (opsional, untuk menjalankan server lokal sederhana).

### Langkah menjalankan

1. Clone repository:

   ```bash
   git clone https://github.com/DDDdonutss/PROJECT-UNSOED-FESS-WEB.git
   ```

2. Masuk ke folder proyek:

   ```bash
   cd PROJECT-UNSOED-FESS-WEB
   ```

3. Jalankan server lokal menggunakan Python:

   ```bash
   python -m http.server 8000
   ```

4. Buka alamat berikut di browser:

   ```text
   http://localhost:8000
   ```

Alternatifnya, buka file `index.html` langsung melalui browser. Menjalankan server lokal lebih disarankan agar perilaku pemuatan aset dan penyimpanan browser lebih konsisten.

## Dokumentasi Hasil Website

Screenshot halaman belum disertakan dalam repository saat dokumentasi ini disusun. Tambahkan hasil tangkapan layar ke folder `docs/screenshots/` agar tampilan website dapat ditinjau langsung dari repository.

Screenshot yang disarankan:

| Nama file | Tampilan yang didokumentasikan |
|---|---|
| `01-homepage.png` | Halaman utama/hero dan navbar. |
| `02-tentang.png` | Tentang, latar belakang, visi-misi, dan aturan penggunaan. |
| `03-kirim-fess.png` | Formulir pengiriman dan pilihan kategori. |
| `04-daftar-fess.png` | Daftar Fess, pencarian, dan contoh hasil kiriman. |
| `05-mode-gelap.png` | Tampilan website dalam mode gelap. |
| `06-mobile.png` | Tampilan halaman pada ukuran layar ponsel. |

Pastikan screenshot tidak menampilkan data pribadi. Karena Fess tersimpan secara lokal, gunakan data contoh yang aman saat mengambil screenshot.

**URL deployment:** Belum dicantumkan. Tambahkan URL website di bagian ini apabila proyek sudah di-deploy.

## Anggota Kelompok dan Kontribusi

Nama lengkap dan daftar anggota kelompok tidak dapat dipastikan hanya dari isi repository. Lengkapi tabel berikut dengan data anggota yang sebenarnya sebelum pengumpulan.

| No. | Nama anggota | Username GitHub | Kontribusi pada proyek |
|---:|---|---|---|
| 1 | `[Nama lengkap anggota 1]` | `[@username]` | `[Tuliskan kontribusi yang benar-benar dikerjakan]` |
| 2 | `[Nama lengkap anggota 2]` | `[@username]` | `[Tuliskan kontribusi yang benar-benar dikerjakan]` |
| 3 | `[Nama lengkap anggota 3]` | `[@username]` | `[Tuliskan kontribusi yang benar-benar dikerjakan]` |
| 4 | `[Nama lengkap anggota 4]` | `[@username]` | `[Tuliskan kontribusi yang benar-benar dikerjakan]` |

Akun pemilik repository GitHub: [DDDdonutss](https://github.com/DDDdonutss). Konfirmasikan apakah akun tersebut merupakan salah satu anggota kelompok dan tambahkan nama lengkap pemilik akun pada tabel jika sesuai.

### Ringkasan pembagian tugas

Gunakan tabel ini sebagai format pencatatan, bukan sebagai klaim pembagian tugas yang sudah terjadi. Sesuaikan dengan kontribusi aktual setiap anggota.

| Area pekerjaan | Anggota yang bertanggung jawab | Ringkasan pekerjaan |
|---|---|---|
| Struktur halaman dan konten HTML | `[Nama anggota]` | `[Section atau elemen yang dikerjakan]` |
| Desain, responsivitas, dan aksesibilitas | `[Nama anggota]` | `[Styling atau perbaikan yang dikerjakan]` |
| Logika JavaScript dan penyimpanan Fess | `[Nama anggota]` | `[Fitur yang dikerjakan]` |
| Pengujian dan dokumentasi | `[Nama anggota]` | `[Pengujian, screenshot, README, atau dokumentasi yang dikerjakan]` |

## Dokumentasi Teknis

Skema arsitektur, aturan pengodean (*coding rules*), struktur data, standar aksesibilitas, keamanan, dan panduan kontribusi dijelaskan lebih lanjut pada [`engineering.md`](engineering.md).

## Catatan Batasan Versi Saat Ini

- Fess disimpan secara lokal di browser, bukan dipublikasikan ke server bersama.
- Data tidak otomatis berpindah ke browser, perangkat, atau pengguna lain.
- Penghapusan data browser atau `localStorage` dapat menghilangkan Fess yang tersimpan.
- Website belum memiliki autentikasi, backend, database terpusat, maupun mekanisme moderasi server.
- Mode anonim pada tampilan berarti nama pengirim tidak diminta/ditampilkan oleh formulir; hal ini bukan jaminan anonimitas jaringan atau layanan hosting.

---

Dibuat untuk mini project kelompok — Universitas Jenderal Soedirman.
