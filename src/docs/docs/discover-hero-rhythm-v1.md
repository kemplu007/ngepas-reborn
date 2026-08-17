# Discover Hero Rhythm — Slice 2

**Status:** Promoted to `main` via merge commit `fb65112` after founder approval.
**Scope:** Komposisi visual `CampaignBanner` saja. Tidak mengubah copy, callback, route, data campaign, search/filter logic, asset, atau backend.

> **Tujuan:** Memendekkan ritme vertikal Hero pada mobile dan membuat desktop kembali ke pola dua kolom referensi tim, agar user mencapai kategori lebih cepat tanpa kehilangan nilai utama Ngepas.

## Baseline yang diaudit

| Area | Implementasi saat ini | Referensi resmi | Keputusan Slice 2 |
|---|---|---|---|
| Komposisi desktop | Copy, visual, lalu disclosure tersusun vertikal dalam satu card. | Copy dan visual berada sejajar dalam satu hero yang ringkas. [1] | Jadikan card sebagai grid dua kolom mulai breakpoint `lg`. |
| Ritme mobile | Copy lengkap lalu visual lebar; urutan informasi sudah benar tetapi jarak antarbagiannya masih dapat dipadatkan. | Headline → manfaat → CTA → visual → disclosure dalam satu kolom. [1] | Pertahankan urutan, ringkas spacing, dan jangan menambah section baru. |
| CTA | Primary sudah jelas; secondary tampil seperti text action. | Primary dan secondary memiliki hierarchy yang berbeda tetapi sama-sama mudah ditemukan. [1] | Primary tetap satu-satunya action hijau penuh; secondary menjadi quiet outline link tanpa mengubah href. |
| Manfaat | Tiga manfaat sudah sesuai contract; desktop tersebar dalam tiga kolom. | Daftar manfaat terbaca seperti bukti singkat di bawah description. [1] | Pada desktop dua kolom, tampilkan daftar vertikal agar scan path lebih pendek. |
| Visual dan affiliate disclosure | Asset relevan serta disclosure marketplace sudah ada. | Visual adalah bukti pendukung; CTA tidak boleh terasa seperti checkout. [1][2] | Pertahankan asset, label, dan disclosure apa adanya. Tidak menambah logo marketplace rekaan. |

## Kontrak implementasi

1. Hanya `src/components/discover/CampaignBanner.jsx` dan dokumen ini yang boleh masuk diff Slice 2.
2. Mobile tetap satu kolom: eyebrow → headline → description → manfaat → CTA → visual → disclosure.
3. Desktop mulai `lg` menggunakan dua kolom: copy di kiri, visual di kanan, disclosure di bawah sebagai satu baris penuh.
4. Tidak ada perubahan pada `discoverCampaign`, teks CTA, `onAction`, `secondaryCtaHref`, image source, `alt`, route, ataupun IDs section.
5. Primary CTA tetap memakai primitive `Button`; secondary tetap `<a>` dengan target yang sama, focus visible, dan target sentuh valid.
6. Semua spacing, warna, radius, border, touch target, dan motion memakai token `np` yang sudah ada. [3]
7. Tidak ada hard-coded marketplace logo, review, rating, testimoni, produk, atau angka baru untuk membuat Hero tampak lebih meyakinkan.

## Acceptance criteria

| Kriteria | Bukti selesai |
|---|---|
| Desktop mengikuti komposisi referensi | Copy dan visual tersusun dua kolom di ≥1024 px; disclosure berada di bawah keduanya. |
| Mobile tetap cepat dipindai | Tidak ada section atau CTA baru; visual tampil setelah action; spacing Hero lebih ringkas tanpa mengorbankan target sentuh. |
| Data dan flow tidak berubah | `campaign` props, `onAction`, href sekunder, dan asset yang sama dipakai sebelum dan sesudah patch. |
| Aksesibilitas terjaga | Heading `h1`, `aria-labelledby`, focus ring, reduced motion, dan alt dekoratif tetap ada. |
| Tidak ada regresi | `git diff --check`, `npx vite build`, review 375 px dan 1280 px lulus. |

## Hasil validasi implementasi

| Pemeriksaan | Hasil |
|---|---|
| Build dan diff | `git diff --check` dan `npx vite build` lulus pada 1843 modules. |
| Mobile 375 × 812 | Tidak ada horizontal document overflow. Heading → primary CTA → secondary CTA → visual memiliki urutan vertikal benar; kedua CTA terlihat pada viewport pertama dengan lebar target sentuh 309 px. |
| Desktop 1280 × 720 | Tidak ada horizontal document overflow. Headline mulai di x=101, visual mulai di x=607 dan berada sejajar secara vertikal, sehingga komposisi dua kolom aktif. |
| Console preview | Empat error yang ada berasal dari `ProductContext.jsx` dan `CategoryContext.jsx` saat backend lokal tidak aktif. Tidak ada error yang berasal dari `CampaignBanner.jsx` atau patch Hero. |

## Promotion checkpoint

Slice 2 dipromosikan melalui merge commit `fb65112` setelah approval eksplisit. Promotion ini tidak menyentuh data campaign, route, API, backend, database, auth JWT, Railway, atau konfigurasi deployment.

## Referensi internal

[1]: `src/docs/assets/uiux-v1.1/reference/1000702670.jpg` — Hero / Value Proposition resmi Ngepas.
[2]: `src/docs/docs/uiux-system-v1.1.md` — Value proposition, urutan Discover, dan batas affiliate.
[3]: `src/styles/tokens.css` — Foundation typography, spacing, color, radius, touch target, dan motion.

— Manus AI
