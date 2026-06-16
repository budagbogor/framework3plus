/**
 * DevForge Studio — Tech Database
 * 
 * Database semua pilihan teknologi lengkap dengan:
 * - Kelebihan & kekurangan (bahasa awam)
 * - Rekomendasi level (best / good / advanced)
 * - Tagline singkat
 * - Ideal use case
 * 
 * Untuk menambah teknologi baru:
 * 1. Tambah object baru di kategori yang sesuai
 * 2. Ikuti format yang sama
 * 3. Update renderQBody() di index.html jika perlu kategori baru
 */

const TECH_DB = {

  // ─── FRONTEND ───────────────────────────────────────────────
  frontend: [
    {
      val: 'nextjs',
      icon: '▲',
      name: 'Next.js',
      tagline: 'Framework React paling populer saat ini',
      rec: 'best',
      recLabel: '⭐ Terbaik',
      pros: [
        'Cocok untuk semua jenis web app',
        'SEO-friendly (bagus untuk Google)',
        'Built-in routing, API, auth — serba ada',
        'Komunitas besar, mudah cari bantuan'
      ],
      cons: [
        'Agak kompleks untuk pemula',
        'Deploy butuh server (bukan cuma file statis)'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> SaaS, dashboard, e-commerce, app dengan banyak halaman'
    },
    {
      val: 'react',
      icon: '⚛',
      name: 'React',
      tagline: 'Library UI paling banyak dipakai di dunia',
      rec: 'good',
      recLabel: '✓ Bagus',
      pros: [
        'Ekosistem sangat besar',
        'Fleksibel, bisa dikombinasikan dengan apa saja',
        'Banyak tutorial dan developer-nya'
      ],
      cons: [
        'Tidak ada routing bawaan — harus tambah library',
        'Setup awal lebih ribet dari Next.js'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> SPA (Single Page App), dashboard internal, app sederhana'
    },
    {
      val: 'vue',
      icon: '💚',
      name: 'Vue 3',
      tagline: 'Framework yang lebih mudah dipelajari',
      rec: 'good',
      recLabel: '✓ Bagus',
      pros: [
        'Lebih mudah dipahami pemula',
        'Dokumentasi sangat bagus',
        'Performa sangat ringan'
      ],
      cons: [
        'Komunitas lebih kecil dari React',
        'Lebih sedikit pilihan kerja vs React'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Tim yang baru belajar, app skala menengah'
    },
    {
      val: 'expo',
      icon: '📱',
      name: 'React Native / Expo',
      tagline: 'Satu kode, jalan di iOS dan Android',
      rec: 'best',
      recLabel: '⭐ Terbaik Mobile',
      pros: [
        'Satu codebase untuk iOS + Android',
        'Lebih murah dari buat 2 app terpisah',
        'Hot reload cepat saat development'
      ],
      cons: [
        'Performa lebih lambat dari native',
        'Akses hardware terbatas untuk fitur spesifik'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Startup yang mau rilis mobile app cepat dengan budget efisien'
    },
    {
      val: 'flutter',
      icon: '🦋',
      name: 'Flutter',
      tagline: 'Framework Google untuk mobile & web',
      rec: 'adv',
      recLabel: '⚡ Advanced',
      pros: [
        'Performa sangat dekat dengan native',
        'Tampilan konsisten di semua platform',
        'Bisa untuk mobile, web, desktop sekaligus'
      ],
      cons: [
        'Bahasa Dart — kurang populer',
        'Butuh belajar ecosystem baru',
        'Bundle size lebih besar'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> App yang butuh performa tinggi dan tampilan pixel-perfect'
    }
  ],

  // ─── BACKEND ────────────────────────────────────────────────
  backend: [
    {
      val: 'nodejs-express',
      icon: '🟩',
      name: 'Node.js + Express',
      tagline: 'Backend JavaScript — satu bahasa untuk semua',
      rec: 'best',
      recLabel: '⭐ Terbaik Pemula',
      pros: [
        'Satu bahasa (JS) untuk frontend + backend',
        'Setup cepat, ekosistem besar (npm)',
        'Mudah deploy di mana saja'
      ],
      cons: [
        'Tidak ideal untuk CPU-intensive tasks',
        'Callback hell jika tidak pakai async/await'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> REST API, web app, real-time app'
    },
    {
      val: 'nextjs-api',
      icon: '▲',
      name: 'Next.js API Routes',
      tagline: 'Backend langsung di dalam Next.js — simpel',
      rec: 'best',
      recLabel: '⭐ Termudah',
      pros: [
        'Tidak perlu server terpisah',
        'Satu repo untuk frontend + backend',
        'Deploy ke Vercel gratis dan mudah'
      ],
      cons: [
        'Terbatas untuk logic yang sangat kompleks',
        'Tidak cocok untuk microservices besar'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Startup/MVP yang mau serba praktis dalam satu project'
    },
    {
      val: 'fastapi',
      icon: '🐍',
      name: 'Python + FastAPI',
      tagline: 'Backend Python tercepat, dengan auto-dokumentasi',
      rec: 'good',
      recLabel: '✓ Bagus',
      pros: [
        'Performa sangat cepat',
        'Auto-generate dokumentasi API',
        'Terbaik jika project butuh AI/ML'
      ],
      cons: [
        'Harus bisa Python',
        'Setup lebih panjang dari Node.js'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> App dengan AI features, data processing, ML pipeline'
    },
    {
      val: 'supabase-edge',
      icon: '⚡',
      name: 'Supabase Edge Functions',
      tagline: 'Backend serverless langsung dari Supabase',
      rec: 'good',
      recLabel: '✓ Termudah + DB',
      pros: [
        'Database + API dalam satu platform',
        'Gratis untuk project kecil',
        'Deploy otomatis, tidak perlu server'
      ],
      cons: [
        'Terbatas untuk logic yang sangat kompleks',
        'Vendor lock-in ke Supabase'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> MVP cepat, app sederhana, prototype'
    }
  ],

  // ─── DATABASE ───────────────────────────────────────────────
  database: [
    {
      val: 'supabase',
      icon: '🟢',
      name: 'Supabase (PostgreSQL)',
      tagline: 'Database + Auth + Storage dalam satu platform',
      rec: 'best',
      recLabel: '⭐ Terbaik Pemula',
      pros: [
        'Setup 5 menit, langsung pakai',
        'Gratis hingga project cukup besar',
        'Ada auth, storage, realtime sudah built-in',
        'Dashboard visual yang mudah dipahami'
      ],
      cons: [
        'Jika traffic sangat besar, biaya bisa naik',
        'Kurang fleksibel vs PostgreSQL mentah'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> 99% project baru — mulai dari MVP sampai skala menengah'
    },
    {
      val: 'mongodb',
      icon: '🍃',
      name: 'MongoDB',
      tagline: 'Database fleksibel untuk data tidak berstruktur',
      rec: 'good',
      recLabel: '✓ Situasional',
      pros: [
        'Simpan data format bebas (JSON)',
        'Cepat untuk prototyping',
        'Skalabilitas horizontal mudah'
      ],
      cons: [
        'Tidak ada JOIN seperti SQL',
        'Risiko data tidak konsisten',
        'Kurang cocok untuk data relasional'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> App dengan struktur data yang sering berubah, CMS, katalog produk'
    },
    {
      val: 'firebase',
      icon: '🔥',
      name: 'Firebase Firestore',
      tagline: 'Database Google — real-time dan mudah',
      rec: 'good',
      recLabel: '✓ Bagus Mobile',
      pros: [
        'Real-time sync built-in',
        'Sangat mudah untuk mobile app',
        'Gratis tier cukup besar'
      ],
      cons: [
        'Query terbatas dibanding SQL',
        'Harga bisa mahal kalau data besar',
        'Vendor lock-in Google'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Mobile app dengan real-time features (chat, live update)'
    }
  ],

  // ─── LARGE LANGUAGE MODELS (LLM) ────────────────────────────
  llm: [
    {
      val: 'claude',
      icon: '🟣',
      name: 'Claude 3.5+ (Anthropic)',
      tagline: 'Terbaik untuk reasoning, coding, dan instruksi panjang',
      rec: 'best',
      recLabel: '⭐ Terbaik Coding',
      pros: [
        'Konteks sangat panjang (200k token)',
        'Mengikuti instruksi kompleks dengan sangat baik',
        'Tool use / function calling terbaik',
        'Lebih aman dan terpercaya'
      ],
      cons: [
        'API berbayar (tidak ada free tier)',
        'Akses di beberapa region terbatas'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Coding agent, document analysis, complex reasoning'
    },
    {
      val: 'gpt',
      icon: '🟢',
      name: 'GPT-4o (OpenAI)',
      tagline: 'Paling populer, ekosistem terlengkap',
      rec: 'good',
      recLabel: '✓ Sangat Populer',
      pros: [
        'Komunitas dan tools terbesar',
        'Vision (baca gambar) built-in',
        'ChatGPT plugins ekosistem luas'
      ],
      cons: [
        'Rate limit lebih ketat',
        'Harga lebih tinggi untuk volume besar'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Multi-modal agent, prototyping cepat'
    },
    {
      val: 'gemini',
      icon: '🔵',
      name: 'Gemini 1.5 Pro (Google)',
      tagline: 'Konteks terpanjang — 1 juta token',
      rec: 'good',
      recLabel: '✓ Untuk Dokumen Besar',
      pros: [
        'Context window terbesar (1M token)',
        'Gratis tier cukup besar',
        'Integrasi Google Workspace'
      ],
      cons: [
        'Tool use masih berkembang',
        'Konsistensi output kadang kurang'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> RAG dengan dokumen besar, analisis data panjang'
    },
    {
      val: 'llama',
      icon: '🦙',
      name: 'Llama 3 (lokal/Groq)',
      tagline: 'Open source — gratis dan privat',
      rec: 'adv',
      recLabel: '⚡ Privacy-First',
      pros: [
        'Gratis (self-hosted)',
        'Data tidak keluar dari server kamu',
        'Customizable dengan fine-tuning'
      ],
      cons: [
        'Butuh GPU atau bayar cloud inference',
        'Kualitas lebih rendah dari model komersial'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Project yang data-nya sensitif, budget terbatas'
    }
  ],

  // ─── ORCHESTRATION ──────────────────────────────────────────
  orchestration: [
    {
      val: 'langgraph',
      icon: '🕸️',
      name: 'LangGraph',
      tagline: 'Terbaik untuk workflow agent yang kompleks',
      rec: 'best',
      recLabel: '⭐ Terbaik Production',
      pros: [
        'State management yang kuat',
        'Bisa buat loop, parallel, conditional flow',
        'Built-in human-in-the-loop',
        'Dipakai di banyak production system'
      ],
      cons: [
        'Kurva belajar lebih tinggi',
        'Overkill untuk agent sederhana'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Multi-step agent, production system, workflow kompleks'
    },
    {
      val: 'pydantic-ai',
      icon: '🤖',
      name: 'Pydantic AI',
      tagline: 'Framework Agen AI type-safe baru dari pencipta Pydantic',
      rec: 'best',
      recLabel: '⭐ Terbaik Type-Safe',
      pros: [
        'Integrasi penuh dengan Pydantic v2',
        'Type-safe dan terstruktur secara bawaan',
        'Sistem dependency injection yang tangguh',
        'Mudah digunakan dan di-debug'
      ],
      cons: [
        'Komunitas masih baru berkembang',
        'Integrasi pihak ketiga lebih sedikit dibanding LangChain'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Aplikasi production Python yang butuh output data terstruktur.'
    },
    {
      val: 'crewai',
      icon: '👥',
      name: 'CrewAI',
      tagline: 'Multi-agent dengan role seperti tim manusia',
      rec: 'good',
      recLabel: '✓ Termudah Multi-Agent',
      pros: [
        'Konsep mudah dipahami (agent punya "role")',
        'Setup cepat',
        'Bagus untuk prototyping tim agent'
      ],
      cons: [
        'Kurang fleksibel untuk flow yang sangat custom',
        'Debug lebih susah'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Multi-agent POC, automation pipeline berbasis role'
    },
    {
      val: 'autogen',
      icon: '⚡',
      name: 'AutoGen v0.4',
      tagline: 'Multi-agent berbasis event-driven & asinkron yang sangat scalable',
      rec: 'good',
      recLabel: '✓ Event-Driven',
      pros: [
        'Komunikasi multi-agent asinkron yang tangguh',
        'Arsitektur berbasis event-driven terbaru (v0.4)',
        'Sangat scalable untuk sistem terdistribusi'
      ],
      cons: [
        'Setup dan pemahaman konsep v0.4 berbeda jauh dari v0.2',
        'Kurva belajar lumayan tinggi'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Sistem multi-agent skala besar dan terdistribusi.'
    },
    {
      val: 'llamaindex-workflows',
      icon: '🗂️',
      name: 'LlamaIndex Workflows',
      tagline: 'Pembangunan agen data berbasis event yang intuitif',
      rec: 'good',
      recLabel: '✓ Data-Centric',
      pros: [
        'Sangat bagus untuk RAG dan pemrosesan data',
        'Event-driven murni, mudah diatur kontrol flow-nya',
        'Integrasi ekosistem LlamaIndex yang sangat luas'
      ],
      cons: [
        'Fokus utama pada data, kurang fleksibel untuk agent umum non-data'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Agen RAG tingkat lanjut dan pipeline ekstraksi data.'
    },
    {
      val: 'langchain',
      icon: '🔗',
      name: 'LangChain',
      tagline: 'Library agent paling banyak dipakai',
      rec: 'good',
      recLabel: '✓ Ekosistem Terbesar',
      pros: [
        'Ribuan integrasi siap pakai',
        'Komunitas besar, banyak contoh kode',
        'RAG dan retrieval sudah built-in'
      ],
      cons: [
        'Abstraksi kadang terlalu banyak',
        'Debugging lebih susah karena banyak layer'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> RAG app, chatbot dengan tools, agent pemula'
    },
    {
      val: 'custom',
      icon: '🔧',
      name: 'Custom (bare Python/JS)',
      tagline: 'Bangun sendiri dari nol — kontrol penuh',
      rec: 'adv',
      recLabel: '⚡ Full Control',
      pros: [
        'Kontrol penuh tanpa abstraksi',
        'Lebih mudah di-debug',
        'Tidak tergantung framework pihak ketiga'
      ],
      cons: [
        'Harus implementasi semuanya sendiri',
        'Lebih lama development-nya'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Tim berpengalaman, agent dengan logic sangat spesifik'
    }
  ],

  // ─── MEMORY & VECTOR DATABASE ───────────────────────────────
  memory: [
    {
      val: 'context',
      icon: '🧠',
      name: 'Context Window (short-term)',
      tagline: 'Memori percakapan — paling sederhana',
      rec: 'best',
      recLabel: '⭐ Mulai Sini',
      pros: [
        'Tidak perlu setup tambahan',
        'Otomatis tersedia di semua LLM',
        'Cukup untuk task pendek'
      ],
      cons: [
        'Hilang setelah session selesai',
        'Terbatas oleh panjang konteks model'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Semua agent — ini dasar yang selalu dipakai'
    },
    {
      val: 'supabase-vector',
      icon: '🟢',
      name: 'Supabase pgvector',
      tagline: 'Vector search di dalam PostgreSQL',
      rec: 'best',
      recLabel: '⭐ Terbaik + Praktis',
      pros: [
        'Tidak perlu database terpisah',
        'Gratis dalam ekosistem Supabase',
        'SQL + vector dalam satu tempat'
      ],
      cons: [
        'Performa vektor lebih lambat dari Pinecone untuk skala besar'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> RAG, knowledge base, project yang sudah pakai Supabase'
    },
    {
      val: 'qdrant',
      icon: '🎯',
      name: 'Qdrant',
      tagline: 'Database vektor open-source super cepat dengan filter payload',
      rec: 'good',
      recLabel: '✓ Open Source',
      pros: [
        'Performa luar biasa ditulis dalam Rust',
        'Pencarian vektor dengan filter payload yang canggih',
        'Bisa self-hosted dengan mudah'
      ],
      cons: [
        'Butuh manajemen infrastruktur jika self-hosted'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Pencarian kemiripan gambar/teks berskala besar.'
    },
    {
      val: 'pinecone',
      icon: '🌲',
      name: 'Pinecone',
      tagline: 'Database vektor tercepat untuk production',
      rec: 'good',
      recLabel: '✓ Skala Besar',
      pros: [
        'Performa query vektor terbaik',
        'Managed service, tidak perlu manage server',
        'Cocok untuk jutaan dokumen'
      ],
      cons: [
        'Berbayar untuk production',
        'Satu lagi service yang harus dikelola'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> RAG production dengan jutaan dokumen'
    },
    {
      val: 'milvus',
      icon: 'Ⓜ️',
      name: 'Milvus',
      tagline: 'Database vektor skala enterprise untuk miliaran data',
      rec: 'adv',
      recLabel: '⚡ Enterprise Only',
      pros: [
        'Arsitektur terdistribusi cloud-native',
        'Mendukung pencarian hybrid dan miliaran vektor',
        'Keamanan tingkat tinggi'
      ],
      cons: [
        'Sangat kompleks untuk setup dan di-manage',
        'Resource-intensive'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Perusahaan besar dengan kebutuhan pencarian vektor berskala masif.'
    },
    {
      val: 'redis-mem',
      icon: '🔴',
      name: 'Redis (session memory)',
      tagline: 'Cache cepat untuk memori sementara',
      rec: 'good',
      recLabel: '✓ Bagus',
      pros: [
        'Akses sangat cepat',
        'Cocok untuk multi-user agent session',
        'TTL otomatis untuk cleanup'
      ],
      cons: [
        'Data hilang kalau restart (tanpa persistence)',
        'Butuh server Redis'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Agent yang melayani banyak user secara bersamaan'
    }
  ],

  // ─── TOOLS & SKILLS ─────────────────────────────────────────
  agentTools: [
    {
      val: 'web-search',
      icon: '🔍',
      name: 'Web Search',
      tagline: 'Agent bisa cari info terbaru di internet',
      rec: 'best',
      recLabel: '⭐ Paling Berguna',
      pros: [
        'Info selalu up-to-date',
        'Tidak terbatas pada training data LLM',
        'Bisa cek fakta real-time'
      ],
      cons: [
        'Tambah latency',
        'Butuh API search (Tavily/Serper)',
        'Perlu validasi hasil'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Research agent, news summarizer, fact-checker'
    },
    {
      val: 'mcp',
      icon: '🔌',
      name: 'Model Context Protocol (MCP)',
      tagline: 'Standar Anthropic untuk menghubungkan agent dengan tools & data',
      rec: 'best',
      recLabel: '⭐ Terbaik Standar',
      pros: [
        'Protokol terstandarisasi, satu client untuk banyak server tool',
        'Keamanan tinggi dengan kontrol akses terpusat',
        'Ekosistem server MCP tumbuh sangat cepat (Postgres, Slack, dll)'
      ],
      cons: [
        'Butuh setup server MCP terpisah',
        'Teknologi baru yang terus berkembang'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Menghubungkan agen AI ke database internal, workspace, atau API pihak ketiga secara aman.'
    },
    {
      val: 'code-exec',
      icon: '💻',
      name: 'Code Execution',
      tagline: 'Agent bisa jalankan kode dan lihat hasilnya',
      rec: 'best',
      recLabel: '⭐ Untuk Coding Agent',
      pros: [
        'Agent bisa test dan debug sendiri',
        'Bisa proses data, buat grafik, kalkulasi akurat'
      ],
      cons: [
        'Risiko keamanan jika tidak di-sandbox',
        'Butuh lingkungan eksekusi yang aman'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Coding assistant, data analysis, automation agent'
    },
    {
      val: 'file-rw',
      icon: '📄',
      name: 'File Read/Write',
      tagline: 'Agent bisa baca dan simpan file',
      rec: 'good',
      recLabel: '✓ Berguna',
      pros: [
        'Bisa proses dokumen PDF, Word, CSV',
        'Simpan hasil ke file',
        'Workflow dokumen otomatis'
      ],
      cons: [
        'Perlu akses filesystem yang aman',
        'Hati-hati dengan sensitive files'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Document processing agent, report generator'
    },
    {
      val: 'api-calls',
      icon: '🔌',
      name: 'API Calls',
      tagline: 'Agent bisa panggil service eksternal',
      rec: 'good',
      recLabel: '✓ Sangat Fleksibel',
      pros: [
        'Integrasi ke service apapun',
        'Bisa kirim email, Slack, notifikasi',
        'Automation multi-platform'
      ],
      cons: [
        'Harus kelola API keys dengan aman',
        'Rate limiting tiap service berbeda'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Integration agent, workflow automation, CRM bot'
    },
    {
      val: 'browser',
      icon: '🌐',
      name: 'Browser Automation',
      tagline: 'Agent bisa "berselancar" di web seperti manusia',
      rec: 'adv',
      recLabel: '⚡ Advanced',
      pros: [
        'Bisa scrape site yang tidak ada API-nya',
        'Isi form, klik tombol secara otomatis',
        'Bisa screenshot halaman'
      ],
      cons: [
        'Lambat dan resource-intensive',
        'Mudah break kalau website update',
        'Banyak site blok bot'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Web scraping, automated testing, monitoring website'
    }
  ],

  // ─── OBSERVABILITY ──────────────────────────────────────────
  observability: [
    {
      val: 'langfuse',
      icon: '📊',
      name: 'Langfuse',
      tagline: 'LLM Engineering platform — tracing, eval, & analytics open-source',
      rec: 'best',
      recLabel: '⭐ Terbaik Open-Source',
      pros: [
        'Open-source dan bisa self-hosted',
        'Tracing latency, cost, dan token secara detail',
        'Evaluasi otomatis & manual (human feedback)'
      ],
      cons: [
        'Butuh setup server sendiri jika tidak pakai cloud service'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Tim yang butuh tracing murah, detail, dan kontrol atas data.'
    },
    {
      val: 'phoenix',
      icon: '🔥',
      name: 'Arize Phoenix',
      tagline: 'AI observability & evaluation gratis dari Arize',
      rec: 'good',
      recLabel: '✓ Evaluasi Cerdas',
      pros: [
        'Bagus untuk RAG troubleshooting',
        'Evaluasi otomatis LLM-as-a-judge sangat tangguh',
        'Mendukung OpenTelemetry'
      ],
      cons: [
        'Cloud platform berbayar untuk data besar'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Evaluasi RAG, deteksi drift data, dan debugging embedding.'
    },
    {
      val: 'langsmith',
      icon: '🦜',
      name: 'LangSmith',
      tagline: 'Platform monitoring bawaan dari ekosistem LangChain',
      rec: 'good',
      recLabel: '✓ LangChain Native',
      pros: [
        'Integrasi out-of-the-box dengan LangChain & LangGraph',
        'Debugging per-node yang sangat visual',
        'Dataset testing yang mudah'
      ],
      cons: [
        'Berbayar setelah limit free-tier terlampaui',
        'Vendor lock-in ekosistem LangChain'
      ],
      ideal: '<strong>Paling cocok untuk:</strong> Project yang menggunakan LangGraph atau LangChain secara intensif.'
    }
  ]
};

// Export untuk dipakai di modul lain (jika dikembangkan ke module bundler)
if (typeof module !== 'undefined') {
  module.exports = TECH_DB;
}

