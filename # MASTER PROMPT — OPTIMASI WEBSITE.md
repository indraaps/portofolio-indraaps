# MASTER PROMPT — OPTIMASI WEBSITE PORTOFOLIO INDRA PRAYOGA SAPUTRA

Bertindaklah sebagai Senior Front-End Developer, UI/UX Designer, JavaScript Engineer, QA Engineer, dan GitHub Pages Deployment Specialist.

Saya sudah memiliki website portofolio pribadi bernama **Indra Prayoga Saputra — Creative Portfolio** yang menggunakan HTML, CSS, dan JavaScript murni.

Tugasmu adalah melanjutkan, memeriksa, memperbaiki, dan menyempurnakan proyek yang sudah ada hingga menjadi website portofolio profesional yang responsif, interaktif, cepat, mudah dirawat, dan siap dipublikasikan ke GitHub Pages.

**PENTING:** Jangan hanya memberikan tutorial, contoh kode, atau rekomendasi. Periksa file proyek yang sebenarnya, edit dan buat file yang diperlukan, implementasikan fitur sampai berfungsi, lalu lakukan pengujian. Pertahankan identitas visual website yang sudah ada.

## 1. Identitas dan konsep desain

Nama: Indra Prayoga Saputra  
Bidang: Web Developer / Mahasiswa Informatika  
Teknologi utama: HTML, CSS, JavaScript  
Gaya: Creative & Interactive, modern, futuristik, elegan, dan eksperimental.

Pertahankan karakter desain berikut:
- Dark mode dengan latar hitam kebiruan.
- Aksen ungu, pink, cyan, dan gradient yang harmonis.
- Tipografi modern, whitespace yang baik, dan hierarki visual yang jelas.
- Kartu proyek interaktif dengan efek hover.
- Animasi scroll yang halus.
- Navigasi yang nyaman di desktop dan smartphone.
- Tampilan profesional tanpa berlebihan menggunakan animasi.

Jangan mengganti keseluruhan desain tanpa alasan. Tingkatkan desain yang sudah ada secara konsisten.

## 2. Periksa seluruh proyek sebelum mengubahnya

Periksa file dan struktur direktori yang tersedia, khususnya:
- index.html
- style.css
- script.js
- README.md

Identifikasi seluruh masalah seperti:
- Error JavaScript di console.
- Tautan yang salah atau belum berfungsi.
- Gambar yang gagal dimuat.
- Elemen yang keluar dari layar.
- Navigasi mobile yang bermasalah.
- Filter proyek yang tidak sesuai.
- Modal yang tidak dapat ditutup.
- Elemen yang tidak responsif.
- Konten placeholder yang belum ditandai.
- Masalah path ketika website dijalankan melalui GitHub Pages.

Perbaiki masalah yang ditemukan tanpa menghapus fitur yang masih berfungsi.

## 3. Buat struktur folder aset foto yang rapi

Buat struktur direktori berikut di dalam root proyek:

```text
indra-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   ├── profile.webp
│   │   │   └── profile-placeholder.svg
│   │   ├── projects/
│   │   │   ├── studyspace.webp
│   │   │   ├── gearup-workshop.webp
│   │   │   └── idea-journal.webp
│   │   ├── gallery/
│   │   └── og-image.png
│   ├── icons/
│   └── fonts/
├── data/
│   └── projects.json
├── .nojekyll
└── .github/
    └── workflows/
        └── deploy.yml
```

Sesuaikan struktur tersebut jika diperlukan, tetapi jangan membuat referensi file yang tidak ada.

Ketentuan aset:
1. Gunakan foto profil asli hanya jika tersedia. Jangan membuat atau menganggap ilustrasi sebagai foto asli Indra.
2. Jika foto belum tersedia, tampilkan avatar atau ilustrasi placeholder yang menarik.
3. Jangan menghasilkan file foto kosong yang seolah-olah merupakan foto asli.
4. Buat placeholder SVG lokal yang benar-benar valid.
5. Tambahkan gambar thumbnail proyek yang sesuai. Jika gambar asli belum tersedia, gunakan ilustrasi CSS atau SVG buatan sendiri.
6. Semua aset lokal harus memakai path relatif yang kompatibel dengan GitHub Pages.
7. Gunakan `loading="lazy"` untuk gambar yang tidak berada di bagian hero.
8. Gunakan `width`, `height`, atau `aspect-ratio` untuk mengurangi layout shift.
9. Tambahkan teks alternatif `alt` yang relevan.
10. Gunakan fallback ketika gambar gagal dimuat.
11. Jangan mengandalkan hotlink gambar dari situs yang mungkin memblokir akses.
12. Jika membuat gambar baru, simpan dalam folder aset proyek dan pastikan file benar-benar tersedia.

## 4. Tampilkan proyek dari GitHub secara otomatis

Buat integrasi untuk menampilkan repository publik GitHub milik saya di bagian Projects Showcase.

Buat konfigurasi yang mudah diedit, misalnya:

```javascript
const PORTFOLIO_CONFIG = {
  name: "Indra Prayoga Saputra",
  githubUsername: "GANTI_DENGAN_USERNAME_GITHUB",
  showGithubProjects: true,
  pinnedRepositories: [],
  excludeRepositories: [],
  repositoryLimit: 12
};
```

Letakkan konfigurasi di file terpisah jika itu membuat kode lebih rapi.

Persyaratan integrasi GitHub:

1. Gunakan GitHub REST API untuk mengambil repository publik dari username yang dikonfigurasi.
2. Jangan mengarang username, repository, jumlah stars, bahasa pemrograman, atau statistik.
3. Tampilkan informasi repository yang benar-benar diterima dari API, termasuk:
   - Nama repository.
   - Deskripsi.
   - Bahasa pemrograman utama jika tersedia.
   - Jumlah stars jika tersedia.
   - Tanggal pembaruan terakhir jika tersedia.
   - Link menuju repository GitHub.
   - Link demo jika tersedia dan dikonfigurasi.
4. Tambahkan tombol “Lihat Source Code” dan “Live Demo” jika tautannya benar-benar tersedia.
5. Jangan menganggap repository otomatis memiliki demo hanya karena mempunyai source code.
6. Prioritaskan repository yang dipilih dalam `pinnedRepositories`, kemudian tampilkan repository lain sesuai pengaturan.
7. Hormati `excludeRepositories`.
8. Urutkan repository secara masuk akal, misalnya berdasarkan tanggal pembaruan terbaru.
9. Tampilkan loading state saat mengambil data.
10. Tampilkan pesan error yang ramah jika API gagal atau username tidak valid.
11. Sediakan fallback berupa data lokal dari `data/projects.json`.
12. Jika API gagal, website tetap harus dapat menampilkan proyek lokal tanpa halaman menjadi kosong.
13. Tangani repository tanpa deskripsi, tanpa bahasa, dan tanpa gambar.
14. Jangan menggunakan token GitHub pribadi di JavaScript browser.
15. Gunakan hanya repository publik untuk integrasi tanpa autentikasi.
16. Tangani rate limit dan jangan melakukan fetch berulang yang tidak diperlukan.
17. Jangan menampilkan informasi yang tidak disediakan oleh API.
18. Jangan mengambil README secara otomatis tanpa kebutuhan yang jelas.

Buat `data/projects.json` sebagai sumber data fallback. Setiap proyek harus memiliki struktur yang konsisten, misalnya:

```json
[
  {
    "name": "Nama Proyek",
    "description": "Deskripsi proyek yang benar-benar telah dibuat.",
    "category": "web",
    "image": "assets/images/projects/nama-proyek.webp",
    "technologies": ["HTML", "CSS", "JavaScript"],
    "repositoryUrl": "https://github.com/USERNAME/REPOSITORY",
    "demoUrl": "",
    "featured": false,
    "isExample": true
  }
]
```

Data tersebut adalah skema contoh, bukan informasi repository nyata. Jangan menganggap URL contoh sebagai URL valid. Gunakan data lokal contoh dengan label “Konsep” atau “Contoh” sampai diganti dengan proyek asli.

Pastikan fungsi filter kategori tetap bekerja untuk proyek lokal maupun repository GitHub.

## 5. Buat halaman detail proyek yang informatif

Setiap kartu proyek harus dapat membuka detail proyek melalui modal atau halaman detail.

Tampilkan:
- Nama proyek.
- Gambar atau thumbnail.
- Deskripsi.
- Tujuan dan masalah yang ingin diselesaikan.
- Solusi atau pendekatan desain.
- Teknologi yang digunakan.
- Status proyek.
- Repository.
- Live demo jika tersedia.

Jangan mengarang pengalaman, klien, hasil bisnis, pencapaian, atau status penyelesaian proyek.

Bedakan dengan jelas antara:
- Proyek nyata.
- Proyek latihan.
- Konsep desain.
- Proyek yang sedang dikembangkan.

Pastikan modal dapat dibuka, ditutup menggunakan tombol, ditutup dengan tombol Escape, dan tidak menyebabkan masalah aksesibilitas keyboard.

## 6. Sempurnakan interaksi JavaScript

Audit dan perbaiki:
- Menu navigasi mobile.
- Navigasi ke section.
- Penanda menu aktif.
- Animasi reveal saat scroll.
- Filter proyek.
- Modal detail proyek.
- Tombol kembali ke atas.
- Efek hover.
- Efek cursor glow.
- Tahun copyright otomatis.
- Loading dan error state GitHub API.

Gunakan event listener yang sesuai, hindari duplikasi kode, dan tangani elemen yang mungkin belum tersedia.

Jangan sampai satu error JavaScript menghentikan seluruh fitur website.

Hormati `prefers-reduced-motion`. Pastikan website tetap nyaman digunakan pada perangkat sentuh, keyboard, dan pembaca layar.

Hindari library tambahan jika fitur dapat dibuat dengan JavaScript murni.

## 7. Tingkatkan kualitas UI/UX

Periksa seluruh section:
- Hero.
- About Me.
- Projects Showcase.
- Skills.
- Contact.
- Footer.

Ketentuan:
- Layout harus responsif untuk layar 320 px hingga desktop lebar.
- Tidak boleh ada horizontal overflow yang tidak disengaja.
- Teks harus terbaca dengan kontras yang cukup.
- Tombol memiliki hover, focus, dan active state yang konsisten.
- Navigasi keyboard harus berfungsi.
- Gunakan heading secara hierarkis.
- Berikan feedback saat data sedang dimuat.
- Jangan membuat tombol dekoratif yang tidak memiliki aksi.
- Gunakan placeholder kontak yang jelas jika informasi pribadi belum tersedia.
- Jangan menampilkan nomor telepon, email, atau akun sosial yang dikarang sebagai milik saya.

## 8. SEO dan metadata

Lengkapi:
- Judul halaman.
- Meta description.
- Theme color.
- Open Graph title, description, dan image.
- Favicon lokal.
- Semantic HTML.
- Alt text gambar.
- Canonical URL hanya jika domain final telah diketahui.
- `robots.txt` atau sitemap hanya jika memang sesuai kebutuhan.

Pastikan metadata tidak berisi username atau domain yang belum dikonfirmasi.

Buat `og-image.png` hanya jika aset benar-benar dihasilkan dan tersedia.

## 9. GitHub Pages deployment

Siapkan website agar dapat dijalankan sebagai static website di GitHub Pages.

Persyaratan:
1. Website tidak boleh membutuhkan server backend untuk fitur dasar.
2. Semua path aset harus berfungsi pada project site maupun root site.
3. Hindari path absolut seperti `/assets/images/profile.webp` jika dapat merusak deployment pada URL berbentuk `/nama-repository/`.
4. Gunakan path relatif yang konsisten.
5. Pastikan API GitHub bekerja dari halaman HTTPS.
6. Tambahkan file `.nojekyll` bila diperlukan.
7. Buat workflow GitHub Actions untuk deployment otomatis menggunakan GitHub Pages Actions yang sesuai dan versi action yang valid.
8. Jangan mengasumsikan workflow berhasil sebelum hasil eksekusinya tersedia.
9. Sertakan instruksi untuk mengaktifkan GitHub Pages pada pengaturan repository.
10. Dokumentasikan perbedaan antara repository biasa dan repository khusus username GitHub Pages.
11. Jangan meminta atau menaruh GitHub Personal Access Token di file publik.
12. Jangan mengunggah file rahasia, `.env`, kredensial, atau token.
13. Jika akses GitHub tidak tersedia dari lingkungan kerja, siapkan file deployment dan berikan instruksi yang bisa saya lakukan sendiri.

Buat README yang menjelaskan:
- Cara menjalankan secara lokal.
- Struktur folder.
- Cara menambahkan foto.
- Cara menambahkan proyek manual.
- Cara mengganti username GitHub.
- Cara mengaktifkan integrasi repository.
- Cara menambahkan link live demo.
- Cara deploy menggunakan GitHub Pages.
- Cara memecahkan masalah umum.

## 10. Testing dan validasi wajib

Setelah implementasi, jangan langsung menyatakan proyek selesai.

Lakukan pemeriksaan berikut:
- Validasi struktur HTML.
- Periksa file CSS dan JavaScript.
- Periksa seluruh path aset.
- Pastikan semua gambar lokal yang direferensikan benar-benar ada.
- Uji filter kategori.
- Uji modal detail.
- Uji navigasi mobile.
- Uji tampilan tanpa koneksi API GitHub.
- Uji username GitHub yang belum dikonfigurasi.
- Uji repository yang memiliki deskripsi kosong.
- Uji fallback ketika gambar gagal dimuat.
- Uji tampilan di desktop dan smartphone.
- Periksa console error dan network error jika browser testing tersedia.
- Uji path relatif pada struktur URL project site GitHub Pages.
- Pastikan tidak ada tautan contoh yang diklaim sebagai tautan nyata.

Jika browser automation tersedia, gunakan untuk menjalankan pengujian interaksi. Jika tidak tersedia, lakukan validasi statis dan jelaskan pengujian yang belum dapat dilakukan.

Perbaiki setiap masalah yang ditemukan dan ulangi pemeriksaan.

## 11. Urutan pengerjaan

Kerjakan dalam urutan berikut:

Tahap 1 — Audit file dan struktur proyek.

Tahap 2 — Perbaikan bug dan konsistensi UI/UX.

Tahap 3 — Pembuatan folder aset, placeholder SVG, dan konfigurasi gambar.

Tahap 4 — Integrasi GitHub API, data lokal, filter, dan detail proyek.

Tahap 5 — SEO, aksesibilitas, responsivitas, dan optimasi performa.

Tahap 6 — Konfigurasi GitHub Pages dan dokumentasi deployment.

Tahap 7 — Testing, perbaikan akhir, dan laporan hasil.

Jangan berhenti setelah hanya membuat rencana. Implementasikan semua tahapan yang dapat dilakukan dalam lingkungan kerja.

## 12. Laporan akhir

Setelah selesai, berikan laporan yang mencakup:
- File yang dibuat dan diubah.
- Fitur yang telah berfungsi.
- Cara mengubah username GitHub.
- Cara menambahkan foto profil dan thumbnail proyek.
- Cara mengganti proyek contoh dengan proyek nyata.
- Hasil testing yang benar-benar dilakukan.
- Masalah yang belum terselesaikan.
- Langkah yang perlu saya lakukan untuk memublikasikan website.
- URL website hanya jika deployment benar-benar telah berhasil dan URL-nya telah diverifikasi.

Target akhir adalah website portofolio pribadi yang menarik, stabil, responsif, mudah dikembangkan, tidak mengarang data pribadi, dan siap di-deploy ke GitHub Pages.