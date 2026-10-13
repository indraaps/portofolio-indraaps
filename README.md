# 🚀 Portofolio Indra Prayoga Saputra

Website portofolio statis dengan HTML, CSS, dan JavaScript murni — siap di-deploy ke GitHub Pages.

---

## 📁 Struktur Folder

```
indra-portfolio/
├── index.html                  # Halaman utama
├── style.css                   # Desain, animasi, responsif
├── script.js                   # Navigasi, filter, modal, GitHub API
├── README.md                   # Dokumentasi ini
├── .nojekyll                   # Nonaktifkan Jekyll di GitHub Pages
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   └── profile-placeholder.svg   # Avatar placeholder
│   │   ├── projects/
│   │   │   ├── studyspace.svg            # Thumbnail StudySpace
│   │   │   ├── gearup-workshop.svg       # Thumbnail GearUp
│   │   │   └── idea-journal.svg          # Thumbnail Idea Journal
│   │   ├── gallery/                      # Foto galeri (opsional)
│   │   └── og-image.png                  # Open Graph image (opsional)
│   ├── icons/
│   │   └── favicon.svg                   # Favicon
│   └── fonts/                            # Font lokal (opsional)
├── data/
│   └── projects.json           # Data proyek lokal (fallback)
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Actions untuk deployment
```

---

## 🖥️ Cara Menjalankan Secara Lokal

### Cara 1: Buka langsung
Klik dua kali `index.html` di file explorer.

### Cara 2: Live Server (disarankan)
1. Buka folder proyek di **VS Code**.
2. Install ekstensi **Live Server** dari Ritwick Dey.
3. Klik kanan pada `index.html` → **Open with Live Server**.
4. Website terbuka di browser dengan auto-reload.

### Cara 3: Python HTTP Server
```bash
cd indra-portfolio
python -m http.server 8080
```
Buka `http://localhost:8080` di browser.

---

## 🎨 Cara Menambahkan Foto Profil

1. Siapkan foto profil (disarankan format `.webp` atau `.jpg`, ukuran ≤ 500 KB).
2. Simpan ke `assets/images/profile/profile.webp`.
3. Untuk menampilkan foto di hero section, edit `index.html`:
   - Ganti bagian `<div class="portrait-illustration">...</div>` dengan:
     ```html
     <img src="assets/images/profile/profile.webp"
          alt="Foto Indra Prayoga Saputra"
          width="310" height="300"
          loading="eager"
          class="portrait-photo">
     ```
4. Foto placeholder SVG tetap tersedia di `profile-placeholder.svg` sebagai cadangan.

---

## 📂 Cara Menambahkan Proyek Secara Manual

### Menambahkan di `data/projects.json`
Tambahkan objek baru ke array di `data/projects.json`:

```json
{
  "name": "Nama Proyek Kamu",
  "description": "Deskripsi singkat tentang proyek ini.",
  "category": "web",
  "image": "assets/images/projects/nama-proyek.webp",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "repositoryUrl": "https://github.com/username/nama-repo",
  "demoUrl": "https://username.github.io/nama-repo/",
  "featured": false,
  "isExample": false,
  "status": "Selesai",
  "goal": "Tujuan atau konteks proyek ini."
}
```

### Menambahkan di HTML langsung
Salin struktur `<article class="project-card">...</article>` yang sudah ada di `index.html` dan sesuaikan kontennya.

### Thumbnail proyek
- Simpan gambar thumbnail di `assets/images/projects/`.
- Format yang disarankan: `.webp` atau `.svg`.
- Ukuran yang disarankan: 600×340 px.

---

## 🔗 Cara Mengganti Username GitHub

1. Buka `script.js`.
2. Cari bagian `PORTFOLIO_CONFIG` di baris paling atas:
   ```javascript
   const PORTFOLIO_CONFIG = {
     name: "Indra Prayoga Saputra",
     githubUsername: "GANTI_DENGAN_USERNAME_GITHUB", // ← Ganti ini
     showGithubProjects: true,
     pinnedRepositories: [],
     excludeRepositories: [],
     repositoryLimit: 12
   };
   ```
3. Ganti `"GANTI_DENGAN_USERNAME_GITHUB"` dengan username GitHub kamu yang sebenarnya.
4. **Opsional**: Isi `pinnedRepositories` dengan nama repo yang ingin ditampilkan lebih dulu.
5. **Opsional**: Isi `excludeRepositories` dengan nama repo yang ingin disembunyikan.

### Mengaktifkan integrasi repository
- Set `showGithubProjects: true` (sudah aktif secara default).
- Pastikan username sudah diganti dari placeholder.
- Repository publik akan otomatis ditampilkan.

### Menonaktifkan integrasi repository
- Set `showGithubProjects: false`.
- Hanya proyek lokal yang ditampilkan.

---

## 🌐 Cara Menambahkan Link Live Demo

Di `data/projects.json`, isi field `demoUrl` dengan URL live demo:

```json
"demoUrl": "https://username.github.io/nama-proyek/"
```

Tombol **Live Demo** hanya muncul jika `demoUrl` terisi. Jangan isi URL kosong atau placeholder.

---

## 📧 Cara Mengganti Informasi Kontak

1. Buka `index.html`.
2. Cari bagian contact (`id="contact"`).
3. Ganti link sosial media:
   - `#social-github`: Ganti `href="#"` dengan URL GitHub kamu.
   - `#social-linkedin`: Ganti `href="#"` dengan URL LinkedIn kamu.
   - `#social-email`: Ganti `href="#"` dengan `mailto:emailkamu@domain.com`.
4. Ganti tombol "Kirim email":
   - Ubah `href="#contact"` menjadi `href="mailto:emailkamu@domain.com?subject=Halo%20Indra"`.
   - Hapus baris `<p class="contact-note">` setelah link email sudah benar.

**⚠️ Jangan publikasikan website dengan link placeholder `#` — itu terlihat tidak profesional.**

---

## 🚀 Cara Deploy ke GitHub Pages

### Langkah 1: Buat Repository di GitHub
1. Buka [github.com/new](https://github.com/new).
2. Beri nama repository, misalnya `indra-portfolio`.
3. Set ke **Public**.
4. Jangan centang "Add a README file" (sudah ada).

### Langkah 2: Push Kode ke GitHub
```bash
cd indra-portfolio
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/indra-portfolio.git
git push -u origin main
```
Ganti `USERNAME` dengan username GitHub kamu.

### Langkah 3: Aktifkan GitHub Pages
1. Buka repository di GitHub.
2. Masuk ke **Settings** → **Pages**.
3. Di bagian **Source**, pilih **GitHub Actions**.
4. Workflow `deploy.yml` akan otomatis berjalan setiap kali ada push ke branch `main`.

### Langkah 4: Akses Website
Setelah workflow berhasil, website tersedia di:
- **Project site**: `https://USERNAME.github.io/indra-portfolio/`
- **User site** (jika repo bernama `USERNAME.github.io`): `https://USERNAME.github.io/`

### Perbedaan Project Site vs User Site

| Aspek | Project Site | User Site |
|-------|-------------|-----------|
| Nama repo | Bebas (misal `indra-portfolio`) | Harus `USERNAME.github.io` |
| URL | `USERNAME.github.io/nama-repo/` | `USERNAME.github.io/` |
| Jumlah | Bisa banyak | Hanya 1 per akun |
| Path aset | Perlu perhatian khusus | Relatif langsung |

---

## ❓ Pemecahan Masalah

### Gambar tidak muncul
- Pastikan path di HTML menggunakan path relatif (misalnya `assets/images/...`), bukan path absolut.
- Pastikan file benar-benar ada di folder yang ditunjuk.
- Periksa case-sensitivity: `Profile.webp` ≠ `profile.webp`.

### GitHub repository tidak tampil
- Periksa apakah `githubUsername` di `script.js` sudah benar.
- Pastikan repository kamu bersifat **Public**.
- Periksa console browser (F12) untuk error.
- GitHub API memiliki rate limit 60 request/jam tanpa autentikasi.

### Website tampil kosong setelah deploy
- Pastikan file `.nojekyll` ada di root proyek.
- Periksa tab **Actions** di GitHub untuk log deployment.
- Pastikan branch yang di-deploy adalah `main`.

### Modal tidak bisa ditutup
- Klik tombol ✕ di pojok kanan atas.
- Tekan tombol **Escape**.
- Klik area luar modal (backdrop).

### Filter kategori tidak bekerja
- Pastikan atribut `data-category` di setiap `<article>` sesuai dengan `data-filter` di tombol filter.

### Navigation mobile bermasalah
- Tekan tombol hamburger menu.
- Jika macet, refresh halaman.
- Tombol Escape juga bisa menutup menu.

---

## 📌 Personalisasi yang Wajib Diperbarui

Sebelum mempublikasikan website:

- [ ] Ganti `githubUsername` di `script.js` dengan username GitHub asli.
- [ ] Ganti link email placeholder di bagian Contact.
- [ ] Ganti link GitHub dan LinkedIn di Social Row.
- [ ] Ganti proyek contoh dengan proyek nyata (atau biarkan dengan label "Konsep").
- [ ] Tambahkan foto profil asli di `assets/images/profile/`.
- [ ] Perbarui daftar keahlian sesuai kemampuan yang dikuasai.
- [ ] Buat `og-image.png` untuk preview di media sosial (opsional).

---

## 📝 Catatan Konten

- Tiga proyek pada halaman ini (StudySpace, GearUp Workshop, Idea Journal) adalah **konsep contoh** untuk menunjukkan tata letak portofolio. Label "CONTOH" ditampilkan di website agar pengunjung tidak salah memahami.
- Informasi kontak default adalah placeholder — **jangan publikasikan sebelum menggantinya**.
- Ilustrasi hero dibuat sepenuhnya menggunakan CSS, tidak memerlukan foto eksternal.

---

## 🛠️ Teknologi

- **HTML5** — Struktur semantik
- **CSS3** — Desain responsif, animasi, ilustrasi CSS
- **JavaScript** — Navigasi, animasi scroll, filter, modal, integrasi GitHub API
- **GitHub Actions** — Deployment otomatis
- **GitHub Pages** — Hosting statis

---

*Dibuat dengan rasa ingin tahu ✳ dan banyak kopi (mungkin).*
