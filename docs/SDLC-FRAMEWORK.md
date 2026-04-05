# Framework SDLC Master — Dokumentasi Lengkap

> Software Development Life Cycle yang diperbarui untuk era AI (2025)

---

## Filosofi Dasar

Framework ini dibangun di atas 4 prinsip utama:

1. **Continuous Discovery** — Requirements bukan dokumen statis. Divalidasi terus dengan user dan data nyata setiap sprint.
2. **Shift-Left Testing** — QA dimulai dari fase requirements, bukan setelah coding selesai. Ini hemat biaya 10× dibanding fix bug di production.
3. **DevSecOps Embedded** — Security dan observability bukan add-on — dibangun sejak arsitektur awal.
4. **AI-Augmented Development** — AI copilot handle pekerjaan repetitif; developer fokus ke keputusan arsitektur dan business logic.

---

## 9 Fase SDLC

### Fase 01 — Planning
**Tujuan:** Meletakkan fondasi yang solid sebelum satu baris kode ditulis.

**Aktivitas utama:**
- Definisikan tujuan bisnis dengan format SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- Lakukan feasibility check: teknis, finansial, dan operasional
- Buat risk register awal — identifikasi risiko sebelum jadi masalah
- Alokasikan resource dan tentukan timeline realistis
- Buat stakeholder map

**Deliverables:**
- Business case document
- SMART goals document
- Risk register
- Project charter
- Stakeholder matrix

**Tools:** Jira, Notion, Miro, GitHub Projects

**Anti-pattern yang harus dihindari:**
- Langsung coding sebelum ada clarity tentang "apa yang dibangun dan untuk siapa"
- Timeline terlalu optimistis tanpa buffer

---

### Fase 02 — Requirements
**Tujuan:** Memahami kebutuhan user secara mendalam dan terus-menerus.

**Aktivitas utama:**
- User story mapping: visualisasikan journey pengguna end-to-end
- Jobs-to-be-done (JTBD): fokus pada "pekerjaan" yang ingin diselesaikan user
- Continuous discovery: loop singkat dengan user setiap 1-2 minggu
- Validasi dengan prototype cepat sebelum coding
- Dokumentasi acceptance criteria yang jelas

**Deliverables:**
- User story map
- Acceptance criteria per user story
- API contracts (jika ada integrasi)
- Non-functional requirements (performa, keamanan, accessibility)

**Perbedaan dari SDLC klasik:**
Di SDLC modern, requirements bukan "dikunci" di awal. Requirements adalah hipotesis yang terus divalidasi. Jika user feedback menunjukkan arah berbeda, pivot adalah tanda kecerdasan, bukan kegagalan.

---

### Fase 03 — System Design
**Tujuan:** Merancang arsitektur yang akan mensupport pertumbuhan dan mudah di-maintain.

**Aktivitas utama:**
- Component-driven architecture: desain sistem sebagai kumpulan komponen independen
- Architecture Decision Records (ADR): dokumentasikan keputusan arsitektur dan alasannya
- Design tokens di repo: warna, typography, spacing adalah bagian dari codebase
- Cloud sandbox untuk PoC: validasi asumsi teknis sebelum commit ke arsitektur
- Database schema design dengan normalisasi yang tepat
- API design (REST/GraphQL) dengan dokumentasi

**Deliverables:**
- System architecture diagram
- Database schema
- API design document
- ADR (Architecture Decision Records)
- Security model
- Infrastructure diagram

**Prinsip desain:**
- **Separation of Concerns**: setiap bagian sistem punya tanggung jawab yang jelas
- **DRY** (Don't Repeat Yourself): hindari duplikasi kode dan logika
- **KISS** (Keep It Simple, Stupid): kompleksitas adalah musuh maintainability
- **YAGNI** (You Aren't Gonna Need It): jangan build fitur yang belum dibutuhkan

---

### Fase 04 — Implementation
**Tujuan:** Menulis kode yang clean, tested, dan maintainable.

**Praktik modern:**
- **TDD (Test-Driven Development)**: tulis test sebelum kode produksi
- **Feature flags**: release fitur tanpa deploy baru, enable/disable per user segment
- **AI copilot**: gunakan GitHub Copilot/Cursor untuk boilerplate, fokus pada business logic
- **Conventional commits**: format commit message yang konsisten (feat:, fix:, chore:, dll)
- **Code review**: minimal satu reviewer sebelum merge ke main
- **Cloud dev environments**: Codespaces/Gitpod untuk konsistensi environment

**Deliverables:**
- Working code dengan unit tests
- Code review yang terdokumentasi
- Updated documentation

**Branch strategy (GitHub Flow):**
```
main          ← production-ready selalu
  └── feature/nama-fitur    ← satu branch per fitur
  └── fix/nama-bug          ← satu branch per bug fix
  └── chore/nama-task       ← maintenance tasks
```

---

### Fase 05 — Testing & QA
**Tujuan:** Memastikan kualitas di setiap layer, bukan hanya di akhir.

**Testing pyramid:**
```
        /\
       /  \
      / E2E \       ← Sedikit, tapi cover critical paths
     /--------\
    /Integration\   ← Test interaksi antar komponen
   /--------------\
  /   Unit Tests   \ ← Banyak, cepat, test per fungsi
 /------------------\
```

**Shift-left testing:**
- Unit tests ditulis bersamaan dengan kode (TDD)
- Integration tests di setiap PR
- E2E tests untuk critical user journeys
- Security scanning di setiap PR (OWASP ZAP, Snyk)
- Performance testing sebelum release major

**Tools:**
- Unit: Jest / Vitest
- Integration: Supertest (API), Testing Library (UI)
- E2E: Playwright / Cypress
- Performance: k6 / Artillery
- Security: OWASP ZAP / Snyk

**Target coverage:** > 80% untuk business logic kritikal

---

### Fase 06 — Deployment
**Tujuan:** Release fitur ke production dengan risiko minimal.

**Strategi deployment:**
- **Blue-Green**: jalankan dua environment identik, switch traffic ke yang baru
- **Canary**: release ke 5% user dulu, monitor, baru rollout penuh
- **Feature flags**: deploy kode tapi aktifkan fitur secara bertahap
- **Rollback otomatis**: jika error rate naik > threshold, rollback otomatis

**CI/CD Pipeline (GitHub Actions):**
```yaml
CI (setiap PR):
  lint → type-check → unit tests → integration tests → build

CD (merge ke main):
  build → deploy staging → smoke test → deploy production → health check
```

---

### Fase 07 — Monitoring
**Tujuan:** Tahu kondisi sistem sebelum user mengeluh.

**Four Golden Signals (Google SRE):**
1. **Latency**: berapa lama request diselesaikan?
2. **Traffic**: berapa banyak request per detik?
3. **Errors**: berapa persen request yang gagal?
4. **Saturation**: seberapa penuh resource (CPU, memory, disk)?

**Alerting yang baik:**
- Alert hanya untuk kondisi yang butuh aksi manusia
- Hindari alert fatigue — terlalu banyak alert = semua diabaikan
- Setiap alert harus punya runbook: "jika X terjadi, lakukan Y"

**Tools:** Datadog, Grafana, Sentry, OpenTelemetry, PagerDuty

---

### Fase 08 — Evaluation
**Tujuan:** Belajar dari data, bukan asumsi.

**Metrik yang diukur:**
- **Business**: DAU/MAU, conversion rate, retention, revenue
- **Technical**: deployment frequency, lead time, MTTR, change failure rate
- **Developer Experience (DevEx)**: developer happiness, onboarding time

**DORA Metrics (DevOps Research and Assessment):**
1. Deployment frequency
2. Lead time for changes
3. Mean time to recovery (MTTR)
4. Change failure rate

---

### Fase 09 — Maintenance
**Tujuan:** Menjaga kualitas sistem seiring waktu.

**Aktivitas utama:**
- Bug fixing dengan SLA yang jelas (Critical: same-day, High: 24h, Medium: sprint, Low: backlog)
- Dependency updates (security patches wajib segera)
- Technical debt reduction: alokasikan 20% sprint capacity
- Performance optimization
- Dokumentasi yang selalu up-to-date

---

## Referensi

- [Atlassian SDLC Guide](https://www.atlassian.com/agile/software-development/sdlc)
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [DORA State of DevOps Report](https://dora.dev/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [The Twelve-Factor App](https://12factor.net/)
