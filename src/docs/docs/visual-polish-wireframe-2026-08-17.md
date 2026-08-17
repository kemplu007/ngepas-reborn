# Ngepas Visual Polish Wireframe — 2026-08-17

**Status:** Draft review. Belum ada komponen aplikasi, token, route, API, atau data yang diubah.

Dokumen ini menerjemahkan audit visual menjadi bentuk layar yang dapat dibaca dari ponsel. Wireframe Whimsical tidak dibuat karena endpoint connector belum tersedia dalam sesi ini; struktur di bawah tetap dapat dipindahkan satu-ke-satu ke Whimsical ketika connector pulih.

> **Arah yang dikunci:** Ngepas tetap merupakan alat kurasi keputusan, bukan marketplace. Visual harus memudahkan pengguna memindai alasan memilih produk, bukan membuat setiap card terasa seperti iklan atau tombol checkout.

## 1. Slice pertama — Discover Product Card Rhythm

### Tujuan

Membuat product card lebih tenang dan dapat dipindai di mobile, sehingga **badge kurasi**, **nama**, dan **harga** menjadi tiga sinyal utama. Action tetap jelas, tetapi tidak mengalahkan informasi keputusan.

### Wireframe mobile

```text
┌──────────────────────────────────┐
│ [BADGE KURASI]              (♡) │
│                                  │
│           PRODUCT IMAGE          │
│                                  │
├──────────────────────────────────┤
│ Kategori                         │
│ Nama produk maksimal dua baris   │
│ ★ 4,8   ·   256 review*           │
│ Rp 299.000                       │
│ Shopee*                           │
│                                  │
│ [ Lihat detail                 → ]│
└──────────────────────────────────┘

*Baris review dan marketplace hanya tampil bila data nyata tersedia.
```

| Elemen | Keputusan wireframe | Alasan |
|---|---|---|
| Badge kurasi | Tetap overlay pada gambar di kiri atas. | Menjaga signal editorial Ngepas lebih dahulu terlihat. |
| Favorite | Tetap icon action di kanan atas dan tidak berpindah. | Menghindari perubahan user flow. |
| Meta rating | Rating tetap ditampilkan; jumlah review dihilangkan bila tidak ada data nyata. | Menghindari placeholder `—` yang tampak seperti data belum selesai. |
| Marketplace | Hanya tampil bila sumber marketplace tersedia; tidak diganti data rekaan. | Menjaga kejujuran affiliate dan kualitas informasi. |
| Harga | Tetap paling kuat setelah nama, memakai hijau Ngepas yang telah ada. | Harga adalah sinyal keputusan yang relevan. |
| CTA detail | Berubah menjadi action outline/quiet dengan target sentuh yang sama; tidak mengubah href atau teks. | Menurunkan kompetisi visual dengan harga dan badge sambil tetap mudah ditemukan. |
| Radius dan motion | Tetap memakai token `np`; hover/press tetap transform ringan dan reduced-motion safe. | Mengikuti foundation, bukan menambah gaya baru. |

### Acceptance criteria slice pertama

| Kriteria | Bukti selesai |
|---|---|
| Satu rumah komponen utama | Diff terfokus pada `ProductCard.jsx`, dengan parent Discover hanya bila spacing memang perlu. |
| Data tetap jujur | Tidak ada default review count, marketplace, rating, atau testimoni baru yang dibuat untuk tampilan. |
| Flow tetap sama | Favorite, detail route, dan keyboard focus bekerja seperti sebelum patch. |
| Visual mengikuti referensi tim | Card lebih ringkas, CTA lebih rendah bobotnya, dan tidak ada card/template kedua. |
| Responsif | Verifikasi mobile 375 px dan desktop 1280 px sebelum review. |
| Tidak ada scope creep | Tidak mengubah Context, service, API, backend, auth JWT, atau persistence. |

## 2. Wireframe arah slice berikutnya

### Discover Hero Rhythm

```text
HEADER
──────────────────────────────────
Eyebrow singkat
Headline dua–tiga baris
Deskripsi satu paragraf pendek
✓ manfaat  ·  ✓ manfaat  ·  ✓ manfaat
[ Mulai cari sekarang ]
  Cara kerja Ngepas
──────────────────────────────────
Visual produk relevan + label singkat
Catatan marketplace satu baris
──────────────────────────────────
KATEGORI POPULER
```

Hero tidak memperoleh section baru atau CTA ketiga. Perbaikannya fokus pada ritme vertikal mobile, pengurangan kompetisi border/surface, dan pembedaan bobot CTA primer versus link edukasi.

### Product Detail Decision Rhythm

```text
Kembali
──────────────────────────────────
Gambar utama · thumbnail gallery
Kategori + badge
Nama produk
Harga · diskon
Rating · terjual · stok
──────────────────────────────────
Kenapa Ngepas memilih ini
  ✓ alasan nyata
  ✓ alasan nyata
──────────────────────────────────
[ Cek harga di marketplace ↗ ]  ← sticky mobile
```

Sticky action yang telah ada dipertahankan. Slice ini baru boleh dilakukan setelah data gallery real tersedia untuk visual review; ia tidak mengubah tujuan affiliate, checkout, atau compare.

### Admin Product Form Mobile Rhythm

```text
Kembali          Tambah produk
1 ●  2 ○  3 ○  4 ○
──────────────────────────────────
Langkah 1 dari 4
Info dasar
Penjelasan singkat

Nama produk
[                         ]
Ruangan
[ Pilih ruangan          ]
Kategori
[ Pilih kategori         ]

[ Lanjut ]
```

Perubahan nanti hanya menyamakan hierarchy setiap langkah, memperjelas hint format, dan menampilkan limit gallery sebagai konteks lokal. Ia bukan wizard baru, tidak mengubah payload, serta tidak boleh menyentuh auth atau validator backend.

## 3. Urutan eksekusi setelah approval

| Urutan | Branch yang diusulkan | Fokus | Mengapa tidak digabung |
|---|---|---|---|
| 1 | `polish/discover-product-card-rhythm-v1` | Product card dan state informasi kosong. | Dampak publik tinggi, rumah kode tunggal, review mobile mudah. |
| 2 | `polish/discover-hero-rhythm-v1` | Ritme hero dan bobot CTA. | Bersifat komposisi; perlu review visual terpisah agar tidak tertutup diff card. |
| 3 | `polish/product-detail-decision-rhythm-v1` | Gallery, decision block, sticky affiliate CTA. | Tergantung data gallery nyata untuk evaluasi yang jujur. |
| 4 | `polish/admin-product-form-mobile-rhythm-v1` | Hierarchy langkah dan input content. | Perlu sesi admin eksplisit dari founder untuk visual review browser. |

## 4. Batas yang tetap berlaku

Tidak ada slice di atas yang boleh menambahkan product offers, akun publik, review/testimoni palsu, checkout, upload media, endpoint, perubahan database, atau perubahan autentikasi. Semua patch kode dibuat dalam branch terpisah setelah approval, diuji dengan `git diff --check` dan `npx vite build`, lalu direview mobile serta desktop sebelum diajukan untuk merge.

— Manus AI
