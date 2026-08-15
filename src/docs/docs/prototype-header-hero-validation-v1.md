# Prototype Header + Hero — Validation v1

**Branch:** `feat/prototype-header-hero-v1`

**Scope:** Slice pertama prototype berdasarkan wireframe Discover v1. Perubahan hanya mencakup struktur Header dan Hero/Value Proposition. Tidak mencakup Panduan Ngepas, progressive search, backend, auth, product offers, atau route baru.

## Implemented

Header mobile sekarang memakai baris identitas dengan hamburger, wordmark Ngepas, dan notifikasi. Search ditempatkan sebagai baris kedua sesuai mockup resmi. Header desktop memakai wordmark di kiri, search di tengah, dan aksi Bandingkan, Notifikasi, serta Akun di kanan. Progressive search dan perubahan wordmark ke favicon tidak digunakan.

Hero memakai struktur statis yang terdiri dari eyebrow, headline, deskripsi, tiga benefit keputusan, CTA `Mulai Cari Sekarang`, CTA `Cara Kerja Ngepas`, visual produk dari aset repo, label pilihan, dan penjelasan bahwa checkout tetap berlangsung di marketplace.

## Automated Validation

| Check | Result |
|---|---|
| `git diff --check` | Pass |
| `npx vite build` | Pass; 1832 modules |
| Mobile search target `#discover-search` | Present |
| Desktop search target `#discover-search-desktop` | Present |
| Hero benefits | 3 items present |
| Hero secondary CTA | `#cara-kerja` |
| Hero image | Loaded successfully |
| Progressive search trigger | 0 present |

## Manual HP Review Required

Review slice ini dari HP pada tiga kondisi: header default dengan search row tetap berada di bawah identity row; Hero terbaca tanpa headline atau CTA terpotong; dan CTA `Cara Kerja Ngepas` scroll ke section `#cara-kerja` tanpa route palsu. Jika ukuran, jarak, atau rasa visual belum tepat, revisi hanya pada slice ini sebelum Kategori Populer dikerjakan.

## Reference

Wireframe dan flow: `discover-wireframe-v1.md` dan `discover-flow-v1.png`.

Mockup official: `src/docs/assets/uiux-v1.1/reference/1000702670.jpg` dan `1000702671.jpg`.
