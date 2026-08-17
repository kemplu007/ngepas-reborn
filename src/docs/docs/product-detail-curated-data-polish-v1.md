# KEM-13 — Product Detail Curated-Data Polish v1

**Status:** Promoted — implementasi masuk `main`; catatan promosi berada pada branch dokumentasi terpisah
**Implementation branch:** `polish/product-detail-curated-data-v1` dari `origin/main` commit `fba9dd1`
**Promotion:** PR #25 merged ke `main` melalui merge commit `44e31d6`
**Owner surface:** `src/pages/public/ProductDetail.jsx`

## Problem statement

F1 telah menampilkan `whyWeRecommend`, `bestFor`, dan `considerations` secara jujur pada **Panduan keputusan**. KEM-13 tidak membuat field atau alasan baru. Slice ini hanya memperjelas scan path dan pemisahan tiga jenis sinyal kurasi agar pembaca memahami alasan, kecocokan, serta pertimbangan sebelum membuka marketplace.

## Scope contract

| Concern | Decision |
| --- | --- |
| In scope | Komposisi dan hierarchy visual panel **Panduan keputusan** dalam `ProductDetail.jsx`, memakai `Card`, `Badge`, ikon Lucide, serta token `--np-*` yang sudah ada. |
| Preserved behavior | Lookup produk melalui `useProducts`, route `/product/:slug`, gallery, price/meta, sticky CTA mobile, href/target/rel affiliate, fallback CTA disabled, serta detail dan produk terkait. |
| Honest fallback | Subbagian hanya render ketika array kurasi corresponding berisi data. Jika semua field kosong, panel tidak tampil. Tidak ada placeholder yang tampak seperti rekomendasi. |
| Forbidden contract changes | Tidak ada perubahan Context, Service, API, backend, database, schema, payload, validator, auth JWT, route, persistence, upload, WebP, storage, billing, secret, scheduler, atau data produksi. |
| Visual delta | Panel memakai header editorial yang lebih mudah dipindai dan struktur sinyal yang tegas namun tetap ringan; alasan, kecocokan, dan pertimbangan tidak saling bersaing atau terduplikasi. |

## Acceptance criteria

1. Tiga jenis sinyal kurasi tetap mengambil **hanya** nilai manusia yang sudah ada.
2. Hierarki panel jelas pada mobile tanpa menambah card kosong, skor, label “terbaik”, review sintetis, atau kelangkaan palsu.
3. CTA marketplace tetap berada setelah panduan keputusan di alur DOM dan mempertahankan behavior sticky yang telah diverifikasi pada F1.
4. Product Detail tetap dapat dibaca pada `375 × 812` dan `1280 × 720` tanpa overflow horizontal atau regresi focus/motion.
5. `git diff --check` dan `npx vite build` lulus sebelum branch diajukan review.

## Validation plan

| Check | Route/data | Expected result |
| --- | --- | --- |
| Static integrity | Diff branch KEM-13 | Tidak ada whitespace error dan file di luar scope. |
| Build | Root repository | `npx vite build` lulus. |
| Mobile | `/product/rak-bumbu-dapur`, `375 × 812` | Hierarki keputusan terbaca, CTA tidak menutup konten awal, tanpa overflow horizontal. |
| Desktop | `/product/rak-bumbu-dapur`, `1280 × 720` | Komposisi dua kolom dan CTA statis tetap terjaga. |
| Console | Route yang sama | Tidak ada regresi baru; warning baseline dicatat terpisah. |

## Catatan verifikasi awal

Preview lokal dijalankan dengan `VITE_API_URL=https://ngepas-reborn-production-c3aa.up.railway.app/api` sebagai sumber **read-only** agar Product Detail menggunakan data nyata tanpa mutation. Route `/product/rak-bumbu-dapur` berhasil memuat data kurasi F1.

Pada viewport `375 × 812`, `document.documentElement.scrollWidth` sama dengan `375`, sehingga tidak ada horizontal overflow. Judul panduan keputusan berada pada koordinat awal `1033 px`; CTA marketplace berada pada `1726 px`. Bukti posisi ini mengonfirmasi CTA tetap setelah panduan keputusan dalam alur baca dan tidak menutup informasi awal.

Pada viewport `1280 × 720`, `document.documentElement.scrollWidth` sama dengan `1280`. Panel panduan keputusan berada sesudah ringkasan harga, dan wrapper CTA affiliate terukur memiliki `position: static` pada breakpoint desktop. Dengan demikian, komposisi dua kolom serta kontrak CTA desktop yang tidak sticky tetap terjaga.

Console hanya mencatat error React baseline yang sudah diketahui: duplicate key `/category` pada navigasi. Error itu tidak berasal dari `ProductDetail.jsx`, bukan ditambah oleh KEM-13, dan berada di luar scope slice ini.

## Promotion boundary

Implementasi telah dipromosikan setelah approval founder eksplisit. Changelog, foundation baseline, Linear, dan Notion harus membawa merge commit serta scope guard yang sama; dokumentasi promosi tetap menjadi lapisan audit terpisah dan tidak mengubah aplikasi.

## Final promotion evidence

- PR: `https://github.com/kemplu007/ngepas-reborn/pull/25`
- Merge commit: `44e31d6`
- Branch implementation: sudah merged; remote branch telah dihapus setelah promosi
- Scope tetap visual-only; seluruh guardrail pada Scope contract tetap berlaku

## Referensi internal

- `src/docs/docs/ngepas-core.md`
- `src/docs/docs/ai-handoff-standard-v1.md`
- `src/docs/docs/uiux-system-v1.1.md`
- `src/docs/docs/discover-product-detail-decision-rhythm-v1.md`
- `src/docs/docs/foundation-baseline-v1.md`
- `src/styles/tokens.css`
