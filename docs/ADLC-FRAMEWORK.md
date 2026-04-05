# Framework ADLC — Agentic Development Life Cycle

> Panduan lengkap membangun Agentic AI dari nol hingga production

---

## Apa Itu Agentic AI?

Agentic AI adalah sistem AI yang tidak hanya menjawab pertanyaan, tapi bisa:
- **Merencanakan** langkah-langkah untuk mencapai tujuan
- **Menggunakan tools** (search, code execution, API, file system)
- **Mengambil keputusan** secara mandiri berdasarkan konteks
- **Belajar dari feedback** dan memperbaiki diri
- **Berkolaborasi** dengan agent lain atau manusia

Perbedaan utama dari chatbot biasa: agent **bertindak**, bukan hanya **menjawab**.

---

## 5 Lapisan Arsitektur

```
┌─────────────────────────────────────────┐
│  Layer 5: Observability & Safety        │
│  Audit log, cost guard, kill switch     │
├─────────────────────────────────────────┤
│  Layer 4: Orchestration                 │
│  LangGraph / CrewAI / AutoGen           │
├─────────────────────────────────────────┤
│  Layer 3: Tools & Actions               │
│  Web search, code exec, API, file I/O   │
├─────────────────────────────────────────┤
│  Layer 2: Memory & Context              │
│  Short-term, long-term (vector), session│
├─────────────────────────────────────────┤
│  Layer 1: Foundation Model              │
│  Claude / GPT-4o / Gemini               │
└─────────────────────────────────────────┘
```

---

## 9 Fase ADLC

### Fase 01 — Goal Definition
**Tujuan:** Mendefinisikan "konstitusi" agent — aturan yang tidak bisa dilanggar.

**Yang harus didefinisikan:**

**Intent (niat):** Apa yang ingin dicapai agent ini?
```
✅ "Riset kompetitor setiap minggu dan buat laporan ringkas"
❌ "Lakukan riset" (terlalu kabur)
```

**Expected Outcomes (hasil yang diharapkan):**
```
✅ "Laporan PDF 2 halaman berisi 5 insight kompetitor utama, setiap Senin jam 9 pagi"
❌ "Laporan bagus" (tidak terukur)
```

**Hard Constraints (batasan keras):**
```
✅ "Tidak boleh mengakses data internal perusahaan tanpa izin eksplisit"
✅ "Budget maksimum $5 per run"
✅ "Harus berhenti jika confidence < 70%"
```

---

### Fase 02 — Build PRD (Product Requirements Document)

PRD untuk agentic AI berbeda dari software biasa. Fokus pada:

**Task Decomposition Strategy:**
```
Task besar: "Analisis sentimen produk kami"
  → Sub-task 1: Kumpulkan review dari Tokopedia, Shopee
  → Sub-task 2: Klasifikasikan positif/negatif/netral
  → Sub-task 3: Ekstrak tema utama
  → Sub-task 4: Buat visualisasi dan ringkasan
```

**Human-in-the-Loop Checkpoints:**
Tentukan di mana agent harus berhenti dan minta persetujuan manusia:
- Sebelum aksi destruktif (hapus data, kirim email massal)
- Ketika menemukan informasi mengejutkan
- Ketika confidence rendah
- Ketika biaya melebihi threshold

---

### Fase 03 — Write Skills (Tools & Prompts)

**Setiap tool harus punya:**
```python
{
    "name": "nama_tool",
    "description": "Apa yang tool ini lakukan — tulis dengan jelas untuk LLM",
    "input_schema": {
        "type": "object",
        "properties": {
            "param1": {
                "type": "string",
                "description": "Penjelasan parameter"
            }
        },
        "required": ["param1"]
    }
}
```

**Prinsip menulis system prompt yang baik:**

1. **Identitas yang jelas**: "Kamu adalah [nama], bertugas untuk [misi]"
2. **Capabilities list**: bullet point apa yang bisa dan tidak bisa dilakukan
3. **Decision rules**: "Jika X terjadi, lakukan Y. Jika Z, tanya dulu."
4. **Output format**: tentukan format output yang konsisten
5. **Failure handling**: apa yang dilakukan jika tools gagal

---

### Fase 04 — Orchestrate Agents

**3 Pattern Utama:**

**1. Single Agent + Tools (paling sederhana)**
```
User → Agent → [tool1, tool2, tool3] → User
```
Cocok untuk: task yang bisa diselesaikan satu agent dengan akses ke beberapa tools.

**2. Supervisor + Sub-agents (multi-agent)**
```
User → Supervisor Agent
              ├── Research Agent → [search, scraper]
              ├── Writer Agent → [file writer]
              └── Review Agent → [quality checker]
```
Cocok untuk: task kompleks yang bisa diparalelkan atau butuh spesialisasi.

**3. Peer-to-peer (A2A protocol)**
```
Agent A ←→ Agent B ←→ Agent C
```
Cocok untuk: sistem terdistribusi di mana tidak ada hierarki yang jelas.

---

### Fase 05 & 06 — Autonomous Coding & Testing

Agent bisa menulis kode dan test sendiri. Pattern yang disarankan:

```python
# Agent loop dengan self-correction
for attempt in range(3):
    code = agent.generate_code(spec)
    result = agent.run_tests(code)
    
    if result.all_passing:
        return code
    
    # Self-correct berdasarkan error
    agent.learn_from_error(result.errors)

# Jika 3x gagal, eskalasi ke manusia
escalate_to_human()
```

---

### Fase 07 — Manual Evaluation & Observability

**Evaluation Framework:**

```
Automated (setiap commit):
├── Task completion rate (>85% target)
├── LLM-as-judge scoring
├── Token cost per task
└── Latency P95

Manual (sampel 20 run/minggu):
├── Kualitas output subjektif
├── Edge case behavior
└── Consistency check
```

**LLM-as-Judge Pattern:**
Gunakan LLM lain untuk menilai output agent:
```
Model A (agent) → menghasilkan output
Model B (judge) → menilai output dengan rubrik
                → skor 1-5 per dimensi
```

---

### Fase 08 — Deployment

**Checklist sebelum production:**
- [ ] Semua tool calls diuji dengan input edge case
- [ ] Audit logging aktif dan ditest
- [ ] Rate limiting terpasang
- [ ] Cost guard dikonfigurasi (hard limit per run)
- [ ] Kill switch endpoint tersedia dan ditest
- [ ] Runbook ditulis untuk skenario darurat
- [ ] Rollback plan tersedia (prompt versi sebelumnya)

---

### Fase 09 — Monitoring & Feedback

**Yang harus dimonitor untuk agent:**

| Metrik | Threshold Alert | Artinya |
|--------|----------------|---------|
| Task completion rate | < 80% | Agent sering gagal |
| Hallucination rate | > 10% | Model drift atau prompt rusak |
| Cost per task | > 2× baseline | Ada inefficiency |
| Latency P95 | > 60 detik | Tools atau model lambat |
| Tool error rate | > 5% | Tool integration bermasalah |

**Prompt Drift Detection:**
Performa LLM bisa berubah seiring waktu karena model updates.
Jalankan eval suite yang sama setiap minggu dan track trendnya.

---

## Panduan Pemilihan Framework

| Kondisi | Rekomendasi |
|---------|-------------|
| Baru mulai, mau belajar | LangChain |
| Production, logic kompleks | LangGraph |
| Multi-agent, role-based | CrewAI |
| Research, multi-agent experimental | AutoGen |
| Kontrol penuh, tim berpengalaman | Custom Python |
| TypeScript stack | Mastra / Vercel AI SDK |

---

## Checklist Keamanan Agent

Sebelum deploy ke production, pastikan semua ini sudah ada:

- [ ] **Audit trail**: setiap tool call dicatat (siapa, apa, kapan, hasil)
- [ ] **Input validation**: semua input ke agent divalidasi
- [ ] **Output sanitization**: output agent tidak bisa inject code berbahaya
- [ ] **Cost guard**: hard limit per run dan per hari
- [ ] **Rate limiting**: maks request per user per waktu
- [ ] **Sandboxing**: code execution di environment terisolasi
- [ ] **Secret management**: API keys di environment variables, tidak di kode
- [ ] **Principle of least privilege**: agent hanya punya akses yang dibutuhkan
- [ ] **Kill switch**: cara cepat hentikan semua agent yang jalan
- [ ] **Rollback**: bisa kembali ke versi prompt sebelumnya dalam < 5 menit

---

## Referensi

- [Anthropic Model Spec](https://anthropic.com/model-card)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [CrewAI Documentation](https://docs.crewai.com/)
- [Microsoft AutoGen](https://microsoft.github.io/autogen/)
- [Building Effective Agents — Anthropic](https://www.anthropic.com/research/building-effective-agents)
- [LLM-as-Judge Paper](https://arxiv.org/abs/2306.05685)
