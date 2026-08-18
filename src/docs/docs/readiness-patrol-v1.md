# Ngepas Reborn — Readiness Patrol v1

**Tanggal patrol:** 18 Agustus 2026  
**Baseline yang diaudit:** `origin/main` pada `9b7cc29`  
**Metode:** read-only review terhadap kode aktif, kontrak, pemeriksaan build/lint, `npm audit --omit=dev`, inspeksi deployment, request publik, dan walkthrough browser publik/admin.  
**Batas audit:** tidak ada data produksi, kredensial, konfigurasi Railway/Vercel, JWT, schema SQLite, atau runtime yang diubah.

> **Verdict:** **AMBER — layak untuk demo dan closed beta kecil setelah dua blocker P0 ditutup; belum layak untuk akuisisi traffic atau operasi affiliate yang agresif.** KEM-16 sampai KEM-30 memperkuat kualitas kurasi dan menutup lookup Draft per-slug. Namun quality gate proyek masih merah dan kontrak list publik masih dapat mengungkap Draft melalui raw API. Kedua hal itu harus selesai sebelum feature work berikutnya.

## 1. Apa yang sudah kuat

Proyek sudah memiliki fondasi yang jauh lebih baik dibanding baseline awal. KEM-16 dan KEM-17 membuat kualitas kurasi punya field dan validasi eksplisit. KEM-18 secara disiplin memilih **no-build** untuk gallery URL existing sehingga tidak membuka biaya media dan storage. KEM-19 memberi benchmark katalog mingguan yang read-only. KEM-30 membatasi Product Detail per-slug publik pada produk Published, tanpa mengganggu jalur admin.

| Area | Bukti yang ditemukan | Penilaian |
|---|---|---|
| Proses delivery | PR kecil, squash merge, branch cleanup, changelog, Linear, dan Notion sudah digunakan konsisten pada KEM-16—KEM-30. | **Kuat** |
| Boundary write | Route write produk diproteksi; validator dan model tetap menjadi jalur utama. | **Cukup kuat** |
| Product Detail per-slug | KEM-30 membatasi lookup publik pada `status = 'published'`; deployment runtime `7b959a6` terverifikasi sukses. | **Kuat untuk scope-nya** |
| Zero-Cost Runway | Gallery URL retained; tidak ada upload native, storage baru, WebP pipeline, atau billing yang ditambahkan. | **Sesuai guardrail** |
| Observability dasar | Benchmark katalog KEM-19 berjalan mingguan dan memiliki artifact GitHub Actions 14 hari. | **Berguna, namun belum quality gate** |
| Deployment | Vercel dan Railway berada pada commit main yang selaras saat patrol. | **Stabil pada pemeriksaan bounded** |

## 2. Release gate saat ini

| Gate | Status | Alasan |
|---|---|---|
| Demo founder / review UX | **Boleh** | Surface publik dan admin dapat dibuka; deployment sehat saat patrol. |
| Closed beta kecil | **Tahan sampai P0 selesai** | Build resmi dan lint belum hijau; raw list publik belum memiliki kontrak visibility yang aman. |
| Publikasi katalog terbatas | **Bersyarat** | Hanya setelah seluruh produk yang ditampilkan memiliki gambar publik dan affiliate URL valid. |
| Akuisisi traffic / promosi luas | **Belum** | Route publik ganda, CTA/content integrity, dan regression gate belum cukup kuat. |
| Scale katalog / banyak admin | **Belum perlu dibangun sekarang** | Model sekarang cukup untuk katalog kecil; pagination, boundary data terpisah, dan index tambahan dipicu setelah kebutuhan terukur. |

## 3. Temuan terkonfirmasi

### P0 — Blocker sebelum feature work atau traffic baru

| ID | Temuan | Bukti | Dampak | Slice yang disarankan |
|---|---|---|---|---|
| R-01 | `npm run lint` gagal pada dua rule `react-refresh/only-export-components`. | `@/components/ui/button.tsx` dan `src/context/AuthContext.tsx`. | PR tidak mempunyai sinyal regresi yang dapat dipercaya. | **PR-A: Quality Gate Hijau** |
| R-02 | `npm run build` gagal karena entry TypeScript mengimpor banyak modul `.jsx` tanpa deklarasi tipe (`TS7016`, 18 error). | `tsc -b && vite build` berhenti sebelum Vite build; `vite build` terpisah sebelumnya lulus. | Perintah release resmi tidak reproducible; developer dapat menerima state yang berbeda. | **PR-A: Quality Gate Hijau** |
| R-03 | `GET /api/products` publik masih mengembalikan produk Draft, walau KEM-30 telah menutup lookup per-slug. | Request read-only produksi dan query list model tidak memfilter `status = 'published'`. | Draft dan metadata kurasi masih dapat diambil melalui raw API; frontend harus terus mengandalkan filter lokal. | **PR-B: Public Catalog Contract** |

> **Keputusan arsitektur untuk R-02:** jangan memigrasikan seluruh aplikasi ke TypeScript secara mendadak. Pilih dan dokumentasikan satu policy lint/build untuk codebase campuran `.ts/.tsx/.js/.jsx`, buat perintah `npm run build` hijau, lalu jadikan perintah tersebut gate CI. Migrasi file ke TypeScript hanya dilakukan saat slice menyentuh file tersebut.

### P1 — Penting sebelum katalog digunakan pelanggan nyata

| ID | Temuan | Bukti | Dampak pengguna | Slice yang disarankan |
|---|---|---|---|---|
| R-04 | Ada dua pengalaman detail publik: `/discover/:slug` dirender oleh `Discover`, sedangkan `/product/:slug` memakai `MainLayout` + `ProductDetail`. | `src/App.tsx`, `Discover.jsx`, `ProductDetail.jsx`, dan walkthrough produksi. | Navigasi, hierarchy, fallback, dan CTA dapat berbeda untuk produk yang sama; sulit menjaga UX konsisten. | **PR-C: Canonical Public Detail** |
| R-05 | Public dan admin memakai `ProductProvider` yang sama; list publik mentah menjadi input untuk Discover, Category, Search, Featured Products, Detail, serta operasi admin. | `src/main.tsx`; pencarian struktural menemukan `useProducts()` pada kedua surface. | Boundary data kabur, data admin dapat bocor ke UI publik, dan kebutuhan caching/filter kelak sulit dipisahkan. | **PR-B** sebagai perubahan kontrak minimal; pemisahan client state penuh ditunda sampai ada bukti beban. |
| R-06 | Navbar/admin menu mengiklankan `/admin/orders`, `/admin/users`, dan `/admin/settings`, sedangkan route aktif tidak memilikinya. | `src/config/admin/menu.js` dibanding `src/App.tsx`. | Operator masuk dead-end/404; menurunkan kepercayaan pada panel admin. | **PR-D: Honest Admin IA** |
| R-07 | Dashboard admin tidak memberi sinyal yang jelas saat angka katalog tidak selaras dengan API/read model; Products masih menurunkan taxonomy dari `products.map(...)`. | Walkthrough `/admin`, `Dashboard.jsx`, `Products.jsx`. | Admin nonteknis sulit membedakan data kosong, loading, error, dan kategori belum sinkron. | **PR-D** |
| R-08 | Konten produk saat patrol masih menunjukkan aset gambar lokal/fallback dan link affiliate placeholder atau belum dapat dipastikan valid. | Walkthrough Product Detail, respons API read-only, dan guard CTA pada `ProductDetail.jsx`. | Pengunjung bisa melihat katalog yang tidak punya "jalan beli" yang jujur; conversion tidak dapat dinilai. | **PR-E: Content Readiness Checklist** |

### P2 — Hardening yang dijadwalkan, bukan alasan melakukan rewrite

| ID | Temuan | Bukti | Rekomendasi aman |
|---|---|---|---|
| R-09 | Tidak ada test otomatis dan belum ada workflow CI PR untuk lint/build. | `package.json` dan `.github/workflows/` hanya memuat benchmark katalog. | Tambahkan test kecil berbasis contract/harness setelah PR-A membuat build hijau; jangan membangun test suite besar sekaligus. |
| R-10 | CORS saat ini terbuka (`app.use(cors())`) dan belum ada rate limit eksplisit di API. | `server/index.js`. | Buat hardening config-only setelah environment/preview domain dipetakan; hindari mengunci preview atau admin secara tidak sengaja. |
| R-11 | `npm audit --omit=dev` melaporkan advisory indirect, termasuk `ip-address` severity high dan `hono` severity moderate, dengan fix tersedia. | Audit dependency read-only pada 18 Agustus 2026. | Trace dependency path, update minimal dan teruji pada slice dependency hygiene; advisory bukan bukti exploit aktif. |
| R-12 | List katalog belum memerlukan pagination untuk data sekarang; index, query policy, dan response public/admin perlu direncanakan sebelum katalog tumbuh. | Model list saat ini dan benchmark KEM-19 terhadap katalog kecil. | Tetapkan trigger terukur, misalnya volume katalog, latency baseline, atau kebutuhan filter nyata; jangan lakukan optimasi spekulatif. |
| R-13 | Komponen reusable dan token sudah tersedia, tetapi public routes masih memakai dua composition pattern. | `tokens.css`, foundation component docs, `Discover`, `MainLayout`, dan legacy Navbar. | Jadikan PR-C sebagai langkah konsolidasi terbatas; jangan redesign visual besar sebelum route canonical disepakati. |

## 4. Urutan PR menuju "siap diajak tempur"

Urutan ini adalah roadmap **execution-ready**, bukan perintah untuk mengerjakan semua sekaligus. Setiap nomor adalah satu branch, satu scope contract, satu set bukti, satu PR, lalu approval founder sebelum merge.

| Urutan | PR kandidat | Tujuan dan batas scope | Definition of Done |
|---:|---|---|---|
| A | **Quality Gate Hijau** | Menyatukan policy build/lint codebase campuran dan menambah CI PR minimal. Tidak ada redesign atau migrasi TypeScript besar. | `npm run lint` dan `npm run build` hijau lokal/CI; workflow PR memblokir merah; existing app tetap ter-build. |
| B | **Public Catalog Contract** | Pisahkan kontrak list public dari kebutuhan admin: list/detail publik hanya Published; jalur admin tetap terautentikasi dan dapat mengelola Draft. | Raw API list publik tidak memuat Draft; Discover, Category, Search, Featured, dan Detail konsisten; harness read-only membuktikan boundary. |
| C | **Canonical Public Detail** | Menentukan satu canonical route/komposisi detail publik dan membuat route lama redirect atau adapter tipis. | Satu sumber layout/CTA/error/related-product; tidak ada route detail yang memberi UX berbeda tanpa sengaja; link internal konsisten. |
| D | **Honest Admin IA** | Hilangkan atau sembunyikan menu yang belum ada, perjelas dashboard state, dan gunakan category source of truth yang ada. | Tidak ada menu 404; loading/empty/error dashboard dapat dibedakan; kategori admin tidak disimpulkan dari rows produk saja. |
| E | **Content Readiness Checklist** | Membuat checklist operasional admin untuk URL gambar publik, affiliate URL valid, status Published, dan cue kurasi. Bukan media pipeline baru. | Produk Published harus memenuhi syarat konten minimum sebelum dapat muncul publik; CTA tidak menjanjikan aksi yang belum tersedia. |
| F | **Dependency & HTTP Hardening** | Update dependency minimal yang terukur; CORS allowlist dan rate limit sesuai domain/traffic nyata. | Audit dependency ditinjau ulang; domain yang valid tetap berfungsi; limit/error response terdokumentasi. |
| G | **Contract Tests & Regression Harness** | Menambah test contract kecil untuk public/admin visibility, validator kurasi, dan route canonical. | Test dapat berjalan lokal/CI; bug KEM-30 tidak dapat muncul ulang tanpa gate gagal. |
| H | **Scale Trigger Review** | Mengevaluasi pagination, index, cache, dan pemisahan public/admin data berdasarkan benchmark/volume sebenarnya. | Keputusan bersandar pada metrik KEM-19 dan kebutuhan katalog, bukan asumsi. |

## 5. Improvisasi UX yang disetujui sebagai catatan, bukan perubahan diam-diam

Pengalaman kurator yang dipercaya tidak lahir dari card lebih bulat atau motion lebih ramai. Perbaikan UX paling bernilai saat ini adalah **kejujuran alur**: pengunjung harus selalu tahu apakah produk dapat dibeli, apakah ia sudah membaca detail yang canonical, dan ke mana navigasi akan membawanya. Operator admin harus hanya melihat alat yang benar-benar dapat dipakai.

Oleh sebab itu, recommendation UX pada patrol ini adalah:

1. **Utamakan satu halaman detail canonical** sebelum mempercantik kedua versi detail. Hal ini mengurangi split attention dan membuat event conversion, CTA affiliate, fallback gambar, dan copy kurasi dapat diperbaiki satu kali.
2. **Gunakan state yang eksplisit, bukan data semu.** Bila affiliate URL belum tersedia, tampilkan state "tautan belum tersedia" yang jujur; jangan memberi CTA hijau yang terlihat seperti checkout.
3. **Kurangi navigation debt pada admin.** Menu fitur masa depan tidak boleh tampil sebagai fitur aktif. Lebih baik menu dihilangkan sampai ada route dan scope contract.
4. **Pertahankan mobile-first dan token authority.** Perbaikan visual berikutnya harus masuk setelah PR-C/D, tetap memakai `tokens.css` dan component foundation, tanpa re-introduce radius, spacing, atau motion lokal yang tidak konsisten.

## 6. Definition of "siap diajak tempur"

Ngepas tidak perlu menunggu semua fitur marketplace untuk mulai membuktikan nilai. Status "siap diajak tempur" dicapai ketika guardrail berikut semua hijau:

| Domain | Kondisi minimum |
|---|---|
| Kualitas delivery | Lint, build, dan CI PR hijau; perubahan memiliki evidence dan rollback path. |
| Visibilitas data | Draft tidak muncul pada **seluruh** surface publik atau raw response public; admin tetap dapat mengelola Draft. |
| Alur publik | Satu detail canonical dengan CTA affiliate yang jujur, gambar yang dapat dirender, dan route internal konsisten. |
| Operasi admin | Tidak ada dead-end; category/product status dapat dipahami admin nonteknis; checklist publish jelas. |
| Konten | Setiap produk Published memenuhi gambar publik, affiliate URL valid, kategori, cue kurasi, dan disclosure yang dibutuhkan. |
| Keamanan operasional | Dependency audit ditinjau, CORS/rate limit sesuai kebutuhan nyata, dan tidak ada secret/data uji di repo. |
| Observability | Benchmark KEM-19 tetap berjalan dan gate/error yang penting dapat dideteksi sebelum atau sesudah rilis. |

## 7. Keputusan sprint berikutnya

**KEM-31** tetap menjadi ticket planning. Input utamanya adalah laporan ini. Pilihan yang direkomendasikan untuk dipilih founder pada KEM-31 adalah **PR-A: Quality Gate Hijau**, karena ia tidak mengubah user flow, tidak menambah biaya, dan mengembalikan kemampuan proyek untuk membuktikan perubahan berikutnya sebelum disebarkan.

Setelah PR-A, kerjakan **PR-B: Public Catalog Contract** sebelum memperluas konten atau melakukan polish UI. Ini menutup boundary Draft pada semua entry point dan mengurangi coupling yang telah terlihat di public/admin surface.

## 8. Evidence register

| Evidence | Hasil |
|---|---|
| Quality gate lokal | `npm run lint` gagal dengan 2 error; `npm run build` gagal dengan 18 error `TS7016`. |
| Build Vite terpisah | Pernah lulus pada validasi KEM-30; masalah release command berada pada policy TypeScript campuran. |
| Harness KEM-30 | Lulus pada branch KEM-30 sebelum merge; perubahan visibility per-slug telah dipromosikan. |
| Produksi Vercel/Railway | Kedua deployment sukses pada checkpoint KEM-30 saat diperiksa. |
| Browser public | `/`, `/discover/:slug`, `/product/:slug`, dan `/category` diperiksa read-only. |
| Browser admin | `/admin` diperiksa read-only; tidak ada write action dilakukan. |
| API publik | `GET /api/products` diperiksa read-only dan memperlihatkan boundary list masih lebih longgar dibanding KEM-30 per-slug. |
| Dependency audit | `npm audit --omit=dev` mencatat advisory indirect dengan fix tersedia; belum ada upgrade dilakukan. |
| Independent structural scan | Serena menegaskan `useProducts()` digunakan pada sejumlah surface publik dan admin, memperkuat temuan shared catalog context. |

---

**Status dokumen:** review-ready. Dokumen ini tidak mengesahkan perubahan runtime; ia menjadi input untuk KEM-31 dan setiap kandidat PR di atas.
