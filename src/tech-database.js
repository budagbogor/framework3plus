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
  ]

  // ... (kategori lain ada di index.html untuk menjaga app tetap self-contained)
};

// Export untuk dipakai di modul lain (jika dikembangkan ke module bundler)
if (typeof module !== 'undefined') {
  module.exports = TECH_DB;
}
