# Ngepas Discover — Wireframe v1

**Status:** Draft untuk validasi user, belum menjadi implementasi kode.

**Tujuan:** Menerjemahkan mockup resmi Ngepas menjadi struktur wireframe yang dapat diuji sebelum prototype. Wireframe ini tidak menambah fitur, tidak mengubah backend, dan tidak menghidupkan eksperimen progressive search.

## 1. Keputusan Utama

Discover v1 dibangun sebagai satu halaman mobile-first dengan urutan visual yang mengikuti aset resmi: **Header → Hero/Value Proposition → Kategori Populer → Pilihan Ngepas → Trending Minggu Ini → Artikel & Tips → Cara Kerja Ngepas → Why Ngepas → Trust/closing**.

Pada mobile, header terdiri dari baris identitas dan aksi cepat, kemudian search bar sebagai baris terpisah. Search tidak menggantikan header dan wordmark tidak berubah menjadi favicon. Pada desktop, wordmark berada di kiri, search di tengah, dan aksi Bandingkan, Notifikasi, serta Akun di kanan.

> Prinsip validasi: bentuk mengikuti mockup, destination mengikuti route truth, dan behavior hanya diaktifkan bila sudah memiliki tujuan nyata.

## 2. Screen Map

| Screen / area | Sumber mockup | Route / anchor | Peran |
|---|---|---|---|
| Discover Home | Step 6.1.1–6.1.8 | `/` dan `/discover` | Halaman utama kurasi dan bantuan keputusan |
| Header Discover | `1000702671.jpg` | Global pada Discover | Identitas, search, dan akses cepat |
| Hero / Value Proposition | `1000702670.jpg` | `#discover-search` untuk CTA search, `#cara-kerja` untuk CTA sekunder | Menjelaskan manfaat Ngepas dan memulai journey |
| Kategori Populer | `1000702672.jpg` | `#kategori-populer`, `/category` | Jalur cepat menemukan kebutuhan |
| Pilihan Ngepas | `1000702673.jpg` | `#hasil-produk`, `/product/:slug` | Menampilkan kandidat kurasi |
| Trending Minggu Ini | `1000702674.jpg` | `#hasil-produk` | Menampilkan pilihan yang sedang banyak dilihat |
| Artikel & Tips | `1000702676.jpg` | `#artikel-tips` | Membantu user memahami pilihan |
| Cara Kerja Ngepas | `1000702675.jpg` | `#cara-kerja` | Menjelaskan cara kerja kurasi |
| Why Ngepas | `1000702677.jpg` | `#why-ngepas` | Menjelaskan alasan mempercayai Ngepas |
| Trust / closing | `1000702678.jpg` | Bagian akhir Discover | Menutup halaman dengan bukti dan pengingat non-checkout |
| Product Detail | `additional/step-6-3-product-detail.jpg` | `/product/:slug` | Membantu memahami satu kandidat sebelum keluar ke marketplace |
| Compare | `additional/step-6-4-compare.jpg` | Belum menjadi route v1 | Referensi masa depan; tidak diaktifkan sebagai route palsu |

## 3. Wireframe Mobile Discover

```text
┌─────────────────────────────────┐
│ [☰]          Ngepas.       [♧] [○] │  Header row
├─────────────────────────────────┤
│ [⌕  Cari produk terbaik...  ⚙]  │  Search row
├─────────────────────────────────┤
│                                 │
│  HERO / VALUE PROPOSITION       │
│  Cari barang bagus itu susah.   │
│  Biar Ngepas yang pilihin.      │
│  ✓ Dibandingkan di banyak toko  │
│  ✓ Pilih produk terbaik         │
│  ✓ Hemat waktu & uang           │
│  [Mulai Cari Sekarang →]        │
│  [◉ Cara Kerja Ngepas]          │
│  [visual produk / ilustrasi]    │
│  [info marketplace]             │
├─────────────────────────────────┤
│  Kategori Populer       Lihat > │
│  [▯ Elektronik] [▣ Komputer]   │── horizontal scroll
│  [⌂ Rumah] [▱ Otomotif] [...]  │
│  [info singkat kategori]        │
├─────────────────────────────────┤
│  Pilihan Ngepas Untukmu Lihat > │
│  penjelasan singkat             │
│  [Pilihan] [Terbaru] [Promo]   │── horizontal tabs
│  [ProductCard] [ProductCard] → │── horizontal scroll
│  [trust marketplace strip]      │
├─────────────────────────────────┤
│  Trending Minggu Ini    Lihat > │
│  [ProductCard] [ProductCard] → │
├─────────────────────────────────┤
│  Artikel & Tips         Lihat > │
│  [tab Semua] [Rumah] [...]     │
│  [ArticleCard] [ArticleCard] → │
│  [Lihat Semua Artikel →]        │
├─────────────────────────────────┤
│  Cara Kerja Ngepas              │
│  [01] Cari kebutuhanmu          │
│  [02] Pahami alasannya          │
│  [03] Checkout di marketplace   │
├─────────────────────────────────┤
│  Kenapa Pilih Ngepas?           │
│  [benefit] [benefit] [benefit] →│
│  [trust metrics / bukti]        │
├─────────────────────────────────┤
│  [trust / closing information]  │
│                                 │
│  Panduan Ngepas: overlay kecil  │  dipetakan setelah page baseline
└─────────────────────────────────┘
```

## 4. Component Map

| Area | Komponen existing yang dipakai | Tanggung jawab wireframe |
|---|---|---|
| Header | `DiscoverHeader` | Layout header mobile/desktop, search row, notifikasi, akun, drawer trigger |
| Drawer | `MobileNavDrawer` | Destination nyata: Discover, Kategori, Cara Kerja, Why Ngepas, Artikel & Tips |
| Hero | `CampaignBanner` | Headline, benefit, CTA, visual produk, marketplace information |
| Section heading | `SectionHeading` | Eyebrow, title, description, action `Lihat Semua` |
| Category | `CategoryCard`, `getCategoryIcon()` | Icon, label, active/disabled state, selection |
| Product | `ProductCard` | Badge, favorite, image, title, rating, price, marketplace, detail CTA |
| Filter | `FilterPanel` atau tab ringan sesuai mockup | Filter kategori/tab; tidak membuat filter engine baru |
| Guide | `DiscoveryGuide` | Decision journey aid terpisah dari global navigation |
| Detail | `ProductDetail` | Alasan kurasi, rating, harga, favorite, dan action keluar ke marketplace saat kontrak siap |

## 5. State Map Minimum

| Komponen | Default | Interaksi | State yang wajib diuji |
|---|---|---|---|
| Header | Header row + search row | Fokus search, buka drawer, notifikasi, akun | default, search focus, drawer open, notification open, account open |
| Hero CTA | `Mulai Cari Sekarang` | Fokus atau scroll ke search | default, pressed, focus |
| CategoryCard | Outline + label | Pilih kategori | default, active, hover desktop, disabled |
| ProductCard | Data kurasi | Favorit dan buka detail | default, hover desktop, loading, favorite |
| ArticleCard | Artikel tersedia | Filter dan buka ringkasan | default, hover desktop, loading, empty |
| DiscoveryGuide | Compact | Expand lalu pilih tahap | compact, expanded, selected, inert/hidden |
| Drawer | Tertutup | Open, close overlay, Escape | closed, open, focus return |

## 6. Flow Utama

```text
User membuka Discover
        ↓
Melihat Header + Hero
        ↓
Memilih salah satu entry point
   ┌────┼─────────────┐
   ↓    ↓             ↓
Search Kategori       Hero CTA
   ↓    ↓             ↓
Hasil  Pilihan relevan  Fokus search
        ↓
Pilihan Ngepas / Trending
        ↓
Buka Product Detail
        ↓
Pahami alasan, rating, harga, dan pertimbangan
        ↓
Keluar ke marketplace saat action affiliate sudah tersedia
```

Panduan Ngepas hanya membantu berpindah di dalam flow tersebut. Ia tidak menjadi daftar route kedua dan tidak membuat halaman compare, akun publik, atau checkout baru.

## 7. Urutan Prototype Setelah Wireframe Disetujui

Prototype akan dibangun dalam slice terpisah. Slice pertama hanya **Header + Hero static**, slice kedua **Kategori Populer**, slice ketiga **Pilihan Ngepas/ProductCard**, slice keempat **Artikel dan Why Ngepas**, lalu slice terakhir **state interaksi dan Panduan Ngepas**. Tidak ada slice berikutnya yang dikerjakan sebelum slice sebelumnya direview dari HP.

## 8. Keputusan yang Memerlukan Persetujuan

User perlu memvalidasi tiga hal sebelum prototype dimulai: apakah urutan section di atas sudah sesuai mockup; apakah header mobile harus mempertahankan search sebagai baris kedua seperti aset resmi; dan apakah Panduan Ngepas sebaiknya ditambahkan setelah baseline halaman selesai, bukan dijadikan elemen pertama yang mengatur layout.

## Referensi

[1]: `./ngepas-core.md` — Ngepas Core.
[2]: `./navigation-ia-guide-v1.md` — Navigation IA & Panduan Ngepas.
[3]: `./uiux-system-v1.1.md` — UI/UX System v1.1.
[4]: `../assets/uiux-v1.1/reference/1000702670.jpg` — Hero / Value Proposition.
[5]: `../assets/uiux-v1.1/reference/1000702671.jpg` — Header Discover.
[6]: `../assets/uiux-v1.1/reference/1000702672.jpg` — Kategori Populer.
[7]: `../assets/uiux-v1.1/reference/1000702673.jpg` — Pilihan Ngepas.
[8]: `../assets/uiux-v1.1/reference/1000702676.jpg` — Artikel & Tips.
[9]: `../assets/uiux-v1.1/reference/1000702677.jpg` — Why Ngepas.
