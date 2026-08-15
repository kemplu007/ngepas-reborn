# Wireframe Discover → Product Detail v1.1

Status: Draft implementasi pada branch `feat/discover-vertical-slice`.

Dokumen ini menerjemahkan mockup dan design system tim menjadi struktur wireframe yang dapat diuji. Wireframe bukan desain baru; ia adalah kerangka informasi sebelum styling final. Referensi utama tetap `ngepas-core.md` dan `uiux-system-v1.1.md`.

## Tujuan vertical slice

Membuktikan bahwa user dapat memahami nilai Ngepas, menemukan kategori atau produk, membuka Product Detail, lalu melihat CTA yang menjelaskan perpindahan ke marketplace. Prototype tidak melakukan checkout, tidak membuat akun publik, tidak menambah endpoint backend, dan tidak membuat data marketplace palsu.

## Flow utama

```text
Discover
  → fokus Search
  → query/filter lokal dari produk yang sudah tersedia
  → hasil produk
  → Product Detail
  → CTA Bandingkan Marketplace / kembali ke Discover
```

## Screen map

| Screen | Viewport | Struktur wajib | Interaksi yang diuji |
|---|---|---|---|
| S0 Discover | Mobile dan desktop | Header, Hero, Kategori Populer, Pilihan Ngepas, trust strip, Why Ngepas ringkas | Menu, search focus, kategori, favorite, detail |
| S1 Search focus | Mobile dan desktop | Header berubah menjadi mode pencarian, query, chip riwayat/suggestion | Fokus input, submit query, clear query |
| S2 Filter | Mobile sheet / desktop panel | Kategori, harga, rating, sorting | Toggle filter, apply, reset |
| S3 Search result | Mobile horizontal cards / desktop grid | Query summary, filter chips, result cards, empty state | Filter, favorite, buka detail |
| S4 Product Detail | Mobile dan desktop | Hero produk, badge kurasi, rating, harga, alasan, spesifikasi, CTA affiliate | Favorite, compare CTA, back |
| S5 Compare entry | Placeholder state | Pesan bahwa compare menerima 2–3 produk | Tombol kembali atau pilih produk lain |

## Wireframe mobile

```text
┌──────────────────────────────┐
│ ☰          Ngepas.       ♧  │  Header
│ [⌕ Cari produk terbaik... ⚙] │
├──────────────────────────────┤
│ Cari barang bagus itu susah. │
│ Biar Ngepas yang pilihin.    │  Hero headline
│ ✓ Dibandingkan di banyak toko│
│ ✓ Pilih produk terbaik       │
│ ✓ Hemat waktu & uang         │
│ [Mulai Cari Sekarang  →]     │
│ [Cara Kerja Ngepas]          │
│      [ visual produk ]       │
├──────────────────────────────┤
│ Kategori Populer   Lihat semua│
│ [▣ Elektronik][▣ Rumah] →    │  Horizontal scroll
├──────────────────────────────┤
│ Pilihan Ngepas      Lihat semua│
│ [Ngepas][Terbaru][Promo]     │
│ ┌──────────┐ ┌──────────┐    │
│ │ product  │ │ product  │ →  │  Product cards
│ │ badge    │ │ favorite │    │
│ │ rating   │ │ harga    │    │
│ │ [Detail] │ │ [Detail] │    │
│ └──────────┘ └──────────┘    │
│ ✓ Dibandingkan di 5+ marketplace│ Trust strip
├──────────────────────────────┤
│ Why Ngepas                    │
│ [Objektif] [Hemat waktu] ...  │
├──────────────────────────────┤
│ Home  Cari  Kategori Compare Akun│ Bottom navigation
└──────────────────────────────┘
```

## Wireframe search dan filter

```text
┌──────────────────────────────┐
│ ‹        Ngepas.          ♧  │
│ [⌕ headphone bluetooth   ×]  │  Query
│ Riwayat: [headset ×] [air ×] │
│ Kategori [Elektronik]        │
│ Harga [Semua] [100k–500k]    │
│ Rating [4★] [4.5★]           │
│ Lokasi / Toko          ›     │
│ Urutkan: Relevansi      ˅    │
│ [Tampilkan hasil]            │
├──────────────────────────────┤
│ Hasil untuk “headphone”      │
│ [Elektronik ×] [4★ ×]        │
│ ┌──────────┐ ┌──────────┐    │
│ │ product  │ │ product  │    │
│ │ rating   │ │ rating   │    │
│ │ [Detail] │ │ [Detail] │    │
│ └──────────┘ └──────────┘    │
└──────────────────────────────┘
```

## Wireframe Product Detail

```text
┌──────────────────────────────┐
│ ‹          Ngepas.        ♧  │
│ Home › Elektronik › Produk   │
│ ┌──────────────────────────┐ │
│ │       product image      │ │
│ └──────────────────────────┘ │
│ PILIHAN NGEPAS               │
│ Nama produk panjang         ♡│
│ ★ 4.8 (256)                  │
│ Rp 299.000                  │
│ Update: hari ini             │
│ [⚖ Bandingkan Marketplace]  │
│ [♡ Simpan ke Favorite]       │
├──────────────────────────────┤
│ Kenapa Kami Memilih Produk Ini│
│ ✓ alasan kurasi              │
│ ✓ kualitas dan manfaat       │
│ ✓ cocok untuk penggunaan     │
├──────────────────────────────┤
│ Spesifikasi Utama        ›   │
│ Kelebihan & Kekurangan    ›  │
│ Cocok Untuk              ›   │
│ Review & Rating           ›  │
│ Produk Terkait           ›  │
├──────────────────────────────┤
│ Rp 299.000  [Bandingkan →]  │  Sticky action
└──────────────────────────────┘
```

## Acceptance criteria prototype

| Area | Lulus apabila |
|---|---|
| Brand | Logo, aksen titik kuning, palette hijau-kuning, typography, icon outline, radius, dan whitespace mengikuti referensi v1.1. |
| Mobile | Layout nyaman pada lebar sekitar 360–430px; tidak ada overflow horizontal kecuali carousel kategori/produk yang memang dikendalikan. |
| Desktop | Pada lebar ≥1024px, header dan section berubah menjadi grid/multi-column tanpa mengubah urutan informasi. |
| Data | Product dan category dibaca melalui context/service yang sudah ada; tidak ada `fetch()` langsung dari component. |
| Discover | Hero, kategori, Pilihan Ngepas, CTA, dan trust strip terlihat dalam satu alur. |
| Search | Search focus, query, clear, filter sederhana, hasil normal, dan empty state dapat dicoba tanpa endpoint baru. |
| Detail | Klik kartu membuka Product Detail dengan data produk yang dipilih dan CTA affiliate yang jujur. |
| Scope | Tidak ada checkout, public account, product_offers, perubahan JWT, atau perubahan backend. |
| Quality | Build dan lint berjalan, console tidak berisi error akibat perubahan prototype. |

## Batasan implementasi

Prototype ini menggunakan solusi paling kecil yang membuktikan flow. Filter bersifat lokal pada data produk yang sudah diambil oleh `ProductContext`. Jika skala katalog membesar, pekerjaan search/filter/pagination server-side mengikuti issue Linear M4-03, bukan dikerjakan di branch ini.

## Referensi internal

[1]: `./ngepas-core.md` — Core Ngepas Reborn
[2]: `./uiux-system-v1.1.md` — Handoff UI/UX v1.1
[3]: `../assets/uiux-v1.1/reference/1000702639.jpg` — Design system visual tim
[4]: `../assets/uiux-v1.1/reference/1000702670.jpg` — Hero / Value Proposition
[5]: `../assets/uiux-v1.1/reference/1000702679.jpg` — Search & Filter
[6]: `../assets/uiux-v1.1/additional/step-6-3-product-detail.jpg` — Product Detail

— Manus AI
