# Dokumentasi Teknis DevForge Studio v3.0

Selamat datang di dokumentasi resmi **DevForge Studio**, generator arsitektur perangkat lunak cerdas yang dirancang untuk mempercepat fase inisiasi proyek Anda.

---

## 🏗️ Arsitektur Sistem

DevForge Studio adalah aplikasi **Single Page Application (SPA)** murni yang dibangun menggunakan:
- **HTML5 & Vanilla JavaScript**: Logika inti tanpa ketergantungan framework berat.
- **Vanilla CSS3**: Desain sistem "Sapphire Ash Morning" yang responsif dan elegan.
- **JSZip**: Kompresi bundle proyek sisi klien (client-side).
- **Puter.js & AI Proxy**: Integrasi provider AI (SumoPod, OpenRouter, Puter.js) untuk pengayaan konten.

---

## 🤖 Integrasi AI (AI Enhancement)

DevForge Studio mendukung tiga provider utama untuk memperkuat hasil *bundle* Anda:

### 1. SumoPod (Tanpa API Key)
- Menggunakan endpoint `/v1/chat/completions`.
- Sangat stabil untuk penggunaan cepat.

### 2. OpenRouter (API Key Diperlukan)
- Memberikan akses ke ratusan model (Llama 3.3, Claude, Gemini).
- Dilengkapi fitur **Auto-Switch** untuk mengatasi pembatasan *rate limit* pada model gratis.

### 3. Puter.js (Zero-Configuration)
- Menggunakan library `puter.ai.chat()`.
- Tidak memerlukan API Key manual (menggunakan akun Puter.com Anda).
- Versi model terbaru 2026 selalu diperbarui secara otomatis.

---

## 🔄 Alur Kerja Terbaik (Best Workflow)

Untuk mendapatkan hasil maksimal, ikuti alur kerja berikut:

1.  **Pilih Mode**: Tentukan jenis proyek Anda:
    - **Framework 01 (Website Master)**: Landing page, blog, portfolio.
    - **Framework 02 (SDLC Master)**: Web app, mobile, desktop, ERP.
    - **Framework 03 (ADLC Agentic)**: Agent AI, RAG, otonom.

### Ringkasan Fase Framework
#### Framework 01 — Website Mastery (7 Fase)
| Fase | Aktivitas |
|------|-----------|
| 01 Identitas | Nama, tujuan, dan deskripsi target audiens |
| 02 Tipe Web | Pemilihan struktur (Landing Page, Blog, Docs, dll) |
| 03 Web Builder | Pemilihan engine (Astro, Next.js, 11ty) |
| 04 Content Mgmt | Integrasi CMS (Markdown, Sanity, Contentful) |
| 05 UX Features | Animasi (Framer), Forms (Formspree), SEO |
| 06 Deployment | Hosting (Vercel, Netlify, Cloudflare Pages) |
| 07 Output | Penyesuaian output (Penuh, Parsial, Prompt Only) |

#### Framework 02 — SDLC Master (9 Fase)
| Fase | Aktivitas |
|------|-----------|
| 01 Planning | Scope, goals, risk register |
| 02 Requirements | User stories, continuous discovery |
| 03 System Design | Architecture, DB schema, ADR |
| 04 Implementation | TDD, feature flags, AI copilot |
| 05 Testing & QA | Shift-left, automated pipelines |
| 06 Deployment | CI/CD, blue-green, canary |
| 07 Monitoring | Four golden signals, APM |
| 08 Evaluation | KPI review, tech debt |
| 09 Maintenance | SLA, hotfix, refactoring |

#### Framework 03 — ADLC Agentic (9 Fase)
| Fase | Aktivitas |
|------|-----------|
| 01 Goal Definition | Mission, outcomes, constraints |
| 02 Build PRD | Agent spec, HITL checkpoints |
| 03 Write Skills | Tool schemas, system prompts |
| 04 Orchestrate | Agent topology, state machine |
| 05 Autonomous Coding | Code gen, auto-review |
| 06 Autonomous Testing | LLM-as-judge, self-healing |
| 07 Manual Eval | Quality gate, observability |
| 08 Deployment | Agentic CI/CD, rollback |
| 09 Monitoring | Drift detection, cost tracking |

2.  **Konfigurasi AI**: Hubungkan Puter.js atau masukkan API Key OpenRouter sebelum mulai mengisi wizard.
3.  **Isi Wizard**: Berikan deskripsi proyek yang spesifik (minimal 2 kalimat).
4.  **Generasi**: Tunggu hingga proses analisis selesai (~3 detik).
5.  **Review & Download**: Periksa struktur folder dan PRD di tab preview, lalu download ZIP bundle.

---

## 🛠️ Pengembangan & Kontribusi

Proyek ini menggunakan struktur file tunggal `public/index.html` untuk kemudahan deployment. Fungsi serverless berada di `api/ai-proxy.js`.

### Deployment ke Vercel:
```bash
npx vercel --prod
```

### Jalankan Lokal:
```bash
npx vercel dev --port 3001
```

---

*&copy; 2026 B.O.A Indonesia — Memberdayakan Developer dengan Kecerdasan Buatan.*
