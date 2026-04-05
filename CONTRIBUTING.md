# Panduan Kontribusi — DevForge Studio

Terima kasih mau berkontribusi! Berikut cara melakukannya.

---

## Cara Cepat Mulai

```bash
# 1. Fork repo ini di GitHub
# 2. Clone fork kamu
git clone https://github.com/YOUR_USERNAME/devforge-studio.git
cd devforge-studio

# 3. Buat branch baru
git checkout -b feature/tambah-teknologi-baru

# 4. Buka di browser untuk test
open public/index.html

# 5. Edit, test, commit
git add .
git commit -m "feat: tambah Svelte ke pilihan frontend"

# 6. Push dan buat Pull Request
git push origin feature/tambah-teknologi-baru
```

---

## Cara Menambah Teknologi Baru

Cari bagian `const TECH = {` di `public/index.html`, lalu tambah entry baru:

```javascript
{
  val: 'nama-unik',           // ID unik, huruf kecil, pakai tanda hubung
  icon: '🔧',                  // Emoji yang relevan
  name: 'Nama Teknologi',      // Nama tampilan
  tagline: 'Satu kalimat singkat yang menjelaskan teknologi ini',
  rec: 'best',                 // 'best' | 'good' | 'adv'
  recLabel: '⭐ Terbaik',       // Label badge
  pros: [
    'Kelebihan 1 — tulis dalam bahasa awam',
    'Kelebihan 2',
    'Kelebihan 3'
  ],
  cons: [
    'Kekurangan 1 — jujur ya!',
    'Kekurangan 2'
  ],
  ideal: '<strong>Paling cocok untuk:</strong> deskripsi singkat'
}
```

**Aturan penulisan:**
- Gunakan bahasa Indonesia yang mudah dipahami orang awam
- Minimal 2 kelebihan dan 1 kekurangan (jangan hanya pujian)
- Tagline maksimum 8 kata
- Pros/cons maksimum 5 item per list

---

## Jenis Kontribusi yang Disambut

### 🌟 High Impact
- [ ] Tambah kategori teknologi baru (e.g., state management, testing, monitoring)
- [ ] Export output ke PDF
- [ ] Integrasi GitHub API untuk auto-create repo

### 📝 Content
- [ ] Tambah teknologi yang belum ada
- [ ] Perbaiki penjelasan yang membingungkan
- [ ] Tambah bahasa lain (English version)
- [ ] Update teknologi yang sudah outdated

### 🐛 Bug Fix
- [ ] Perbaiki tampilan di mobile
- [ ] Fix copy button yang tidak bekerja
- [ ] Improve smart recommendation logic

### ✨ Enhancement
- [ ] Dark mode toggle
- [ ] Simpan progress wizard ke localStorage
- [ ] Share hasil via URL parameter

---

## Standar Kode

- **Tidak ada framework** — pure HTML/CSS/JS
- **Komentar** untuk logika yang tidak obvious
- **Bahasa Indonesia** untuk semua UI text
- **Test di mobile** sebelum PR (viewport 375px)

---

## Pertanyaan?

Buka Issue di GitHub atau diskusi di Discussions tab.
