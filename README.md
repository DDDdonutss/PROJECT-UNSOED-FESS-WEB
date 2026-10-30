# 🎓 UNSOED FESS

## Deskripsi Project

**UNSOED FESS** adalah website satu halaman (*single page*) bagi mahasiswa Universitas Jenderal Soedirman (UNSOED) untuk menyampaikan dan membaca *fess* (menfess) dengan tampilan yang rapi, responsif, dan nyaman digunakan. Pengunjung dapat membaca latar belakang dan aturan UNSOED FESS, mengirim fess lewat formulir yang tervalidasi, melihat serta mencari daftar fess, dan menelusuri kategori fess.

- **Nama project:** UNSOED FESS (repository: `PROJECT-UNSOED-FESS-WEB`)
- **Jenis project:** Website statis (HTML, CSS, JavaScript) tanpa backend/database
- **Repository:** https://github.com/DDDdonutss/PROJECT-UNSOED-FESS-WEB

---

## Anggota Kelompok

| No | Nama | Username GitHub | Peran |
|----|------|-----------------|-------|
| 1 | [ISI: Nama Lengkap] | [@DDDdonutss](https://github.com/DDDdonutss) | Maintainer & Frontend Developer |
| 2 | [ISI: Nama Lengkap] | [@PanjiSuryaGemilang](https://github.com/PanjiSuryaGemilang) | Frontend Developer |
| 3 | [ISI: Nama Lengkap] | [@PanjiSuryaGemilang3](https://github.com/PanjiSuryaGemilang3) | Frontend Developer |

---

## Tujuan dan Latar Belakang

Di lingkungan kampus, *menfess* sudah menjadi cara yang populer bagi mahasiswa untuk menyampaikan cerita, pertanyaan, maupun informasi. UNSOED FESS dibuat sebagai wadah berbasis web yang lebih tertata: tersedia penjelasan latar belakang, aturan, serta visi dan misi; formulir pengiriman dengan validasi; kategori fess; dan pencarian agar fess mudah ditemukan.

Selain itu, project ini menjadi sarana belajar bagi tim untuk:

- membangun website front-end yang responsif dan dapat diakses dengan baik;
- berkolaborasi memakai Git dan GitHub (issue → branch → pull request → review → merge).

---

## Fitur dan Section

Website berupa satu halaman (`index.html`) dengan lima section yang dapat diakses lewat navbar:

| Section | Anchor | Isi |
|---------|--------|-----|
| Beranda (Hero) | `#home` | Judul "UNSOED FESS", subheadline, dan tombol **Kirim Fess Sekarang** yang menggulir ke formulir. Latar bergambar dengan overlay dan animasi AOS. |
| Tentang | `#about` | Latar belakang, aturan, serta visi dan misi UNSOED FESS. |
| Kirim Fess | `#fess-form` | Kotak fess dan daftar fess: validasi input, counter, pencarian, tombol reset, serta penanganan input yang aman dari injeksi HTML. |
| Kategori | `#categories` | Daftar kategori fess. |
| Kontak | `#contact` | Informasi kontak. |

**Fitur pendukung**

- **Navbar** dengan 5 menu anchor, tombol menu untuk HP, *smooth scroll*, dan *scrollspy* (menu aktif ditandai dengan `aria-current`).
- **Dark mode:** tombol bulan/matahari di navbar; pilihan tema tersimpan di `localStorage` sehingga bertahan setelah halaman di-refresh.
- **Responsif:** tampilan menyesuaikan lebar layar hingga ukuran HP (sekitar 390px); menu mobile terbuka tanpa overflow.
- **Aksesibilitas:** dukungan mode *reduced motion* (animasi AOS langsung tampil, transisi dinonaktifkan, gulir instan).
- **Animasi** saat halaman digulir menggunakan AOS.

---

## Teknologi yang Digunakan

| Teknologi | Kegunaan |
|-----------|----------|
| HTML5 | Struktur halaman (`index.html`) |
| CSS3 | Tampilan, tata letak responsif, dan tema terang/gelap |
| JavaScript | Interaksi: validasi form, counter, daftar fess, pencarian, reset, dan dark mode |
| Bootstrap 5 (5.3+) | Komponen dan grid responsif, serta theming lewat `data-bs-theme` |
| jQuery | Pustaka pendukung interaksi |
| AOS (Animate On Scroll) | Animasi saat halaman digulir |
| Font Awesome | Ikon, misalnya ikon bulan/matahari pada tombol dark mode |
| Web Storage (`localStorage`) | Menyimpan pilihan tema |
| Git & GitHub | Version control, issue, branch, pull request, dan code review |

### Struktur Folder

```
PROJECT-UNSOED-FESS-WEB/
├── css/            # Stylesheet
├── fonts/          # Font lokal
├── images/         # Gambar dan aset visual
├── js/             # JavaScript (form, pencarian, dark mode, dll.)
├── screenshots/    # Tangkapan layar untuk dokumentasi
├── .gitignore
├── index.html      # Halaman utama (single page)
├── DOKUMENTASI.md  # Dokumentasi hasil website
└── README.md
```

---

## Cara Menjalankan Secara Lokal

**Prasyarat:** browser modern (Chrome, Edge, atau Firefox). Tidak perlu instalasi dependensi maupun proses build karena project berupa website statis. Jika Bootstrap, jQuery, AOS, atau Font Awesome dimuat lewat CDN, pastikan perangkat terhubung ke internet.

**1. Clone repository**

```bash
git clone https://github.com/DDDdonutss/PROJECT-UNSOED-FESS-WEB.git
cd PROJECT-UNSOED-FESS-WEB
```

**2. Jalankan website** (pilih salah satu)

- **Opsi A — Langsung dari browser:** klik dua kali `index.html`, atau seret file tersebut ke jendela browser.
- **Opsi B — VS Code + Live Server:** buka folder project di VS Code, pasang ekstensi *Live Server*, lalu klik kanan `index.html` → **Open with Live Server**.
- **Opsi C — Server lokal dengan Python:** jalankan perintah berikut, lalu buka `http://localhost:8000` di browser.

  ```bash
  python -m http.server 8000
  ```

- **Opsi D — Android (untuk pengujian):** buka folder project dengan aplikasi **Acode** (APK dari Play Store), lalu jalankan `index.html`. Pastikan semua file sudah berada di foldernya masing-masing (`css/`, `js/`, `fonts/`, `images/`).

---

## Pembagian Tugas dan Kontribusi

Pekerjaan dipecah menjadi issue berkode **T1–T7**, dikerjakan di branch masing-masing, lalu digabungkan ke `main` lewat pull request yang direview oleh pemilik repository.

| Kode | Issue / PR | Tugas | Penanggung jawab | Hasil utama |
|------|-----------|-------|------------------|-------------|
| T1 | #14 / PR #16 | Setup repository dan audit struktur proyek | @DDDdonutss | Kode awal website diunggah; struktur `css/`, `js/`, `fonts/`, `images/` ditata |
| T2 | #7 | Navbar, smooth-scroll, scrollspy | [ISI] | 5 menu anchor, tombol menu HP, gulir halus, scrollspy |
| T2 | #17 / PR #18 | Migrasi ke satu halaman | @PanjiSuryaGemilang | 4 halaman digabung menjadi `index.html`; `about.html`, `contact.html`, `fess.html` dihapus |
| T3 | #8 | Hero/Home | @DDDdonutss | Hero dengan judul, tombol "Kirim Fess Sekarang", latar + overlay, animasi AOS |
| T3 | #19 / PR #20 | Dark mode | @PanjiSuryaGemilang | Toggle tema terang/gelap yang tersimpan di `localStorage` |
| T4 | #9 | About (latar belakang, aturan, visi-misi) | @PanjiSuryaGemilang | Section Tentang |
| T4 | #21 / PR #22 | Fitur Search | @PanjiSuryaGemilang3 | Pencarian fess |
| T5 | #10 | Kategori Fess | @PanjiSuryaGemilang | Tampilan dan fungsi kategori fess |
| T5 | #23 / PR #24 | Perbaikan responsif dan aksesibilitas | @PanjiSuryaGemilang3 | Navbar dan menu mobile rapi, mode reduced motion, `aria-current` pada scrollspy |
| T7 | #12 | Kotak fess + daftar | [ISI] | Formulir tervalidasi, daftar fess, input aman, reset |
| — | #13, #27 | README, dokumentasi, dan refleksi | [ISI] | README.md, DOKUMENTASI.md, refleksi individu |

**Ringkasan per anggota**

- **@DDDdonutss** — mengelola repository dan alur kerja tim (issue, review, merge), serta mengerjakan setup awal dan section Hero/Home.
- **@PanjiSuryaGemilang** — migrasi ke satu halaman, dark mode, serta section About dan Kategori.
- **@PanjiSuryaGemilang3** — fitur pencarian serta perbaikan responsif dan aksesibilitas.

**Alur kerja tim**

1. Ambil issue yang ditugaskan.
2. Buat branch dari `main` terbaru, misalnya `feature/dark-mode`, `feature/search-fess`, atau `chore/migration-page`.
3. Commit dan push perubahan.
4. Buka pull request yang menautkan issue (`Closes #nomor`).
5. Minta review, lalu merge ke `main` setelah disetujui.

Riwayat lengkap dapat dilihat pada [issue yang sudah ditutup](https://github.com/DDDdonutss/PROJECT-UNSOED-FESS-WEB/issues?q=is%3Aissue+state%3Aclosed) dan [pull request](https://github.com/DDDdonutss/PROJECT-UNSOED-FESS-WEB/pulls?q=is%3Apr+is%3Aclosed).

---

## Dokumentasi

Tangkapan layar halaman utama dan bagian penting website tersedia di [DOKUMENTASI.md](DOKUMENTASI.md). Seluruh gambar disimpan pada folder [`screenshots/`](screenshots/).

---

*Dibuat oleh tim UNSOED FESS — Oktober 2026.*
