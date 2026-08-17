# KEM-16 — Label Kurasi Kualitatif (Curated Decision Label)

**Status:** Implementasi branch review · Belum dipromosikan
**Branch:** `feat/curated-decision-label-v1` · Basis `origin/main@7333dc4`
**Tanggal kontrak:** 17 Agustus 2026
**Jenis slice:** Visual-only (FE Product Detail), tanpa perubahan API, Context, Service, backend, auth, media, atau guardrail lain.

## Sumber kebenaran

Acceptance criteria KEM-16 di Linear menyatakan bahwa skor atau sinyal perbandingan hanya berguna bila membantu keputusan tanpa menjadi klaim palsu, bahwa formula atau label harus didokumentasikan sebelum ditampilkan, bahwa label kualitatif seperti "Best fit" dipakai bila formula belum disepakati, bahwa angka pseudo-presisi dilarang, dan bahwa perbandingan harus dapat dijelaskan dalam bahasa sederhana. Batasan eksplisit: tidak mengarang metodologi, benchmark, atau bukti eksternal.

## Keputusan formula

Formula angka belum disepakati, sehingga KEM-16 memakai **label kualitatif tunggal** yang langsung dapat dijelaskan kepada user: produk yang memiliki alasan kurasi (`whyWeRecommend` berisi setidaknya satu alasan, field human-authored yang sudah dipromosikan F1/KEM-13) memperoleh kicker label **"Rekomendasi kurasi Ngepas"** pada header panel Panduan keputusan. Label ini hanya menyatakan fakta bahwa ada alasan kurasi tertulis, bukan peringkat, bukan skor, dan bukan perbandingan dengan produk lain.

| Aturan | Keputusan |
|---|---|
| Dasar label | Keberadaan `whyWeRecommend.length > 0` |
| Teks label | "Rekomendasi kurasi Ngepas" dengan penjelasan satu kalimat: "Ditandai dari alasan kurasi yang ditulis tim Ngepas, bukan skor otomatis." |
| Angka pseudo-presisi | Dilarang: tidak ada skor, persen, bintang buatan, atau peringkat |
| Perbandingan antar produk | Dilarang: tidak ada data pembanding yang jujur; tidak ada badge "lebih baik dari X" |
| Fallback | Tanpa label bila tidak ada field kurasi; empty panel tetap tidak dirender (kontrak F1) |
| Metodologi/benchmark eksternal | Dilarang, sesuai batasan acceptance criteria |

## Batas perubahan

Perubahan hanya pada `src/pages/public/ProductDetail.jsx`: satu elemen label pada header panel Panduan keputusan (area baris header DECISION GUIDE), memanfaatkan ikon Lucide `BadgeCheck` dan token `--np-*` yang sudah ada. Komponen, Context, Service, API, dan seluruh file backend tidak berubah. Auth JWT, write flow, schema, media, dan Zero-Cost Media Runway tidak tersentuh.

## Validasi

`git diff --check` bersih, `npx vite build` sukses, pemeriksaan visual viewport mobile (375 × 812) dan desktop (1280 × 720) melalui preview lokal dengan API produksi read-only. Label hanya tampil pada produk dengan alasan kurasi; produk tanpa field kurasi menampilkan panel Panduan keputusan secara normal tanpa label.

## Jejak promosi

PR dan commit promosi dicatat pada changelog dan foundation baseline setelah approval founder dan merge. Linear KEM-16 ditandai In Progress selama branch review dan Done setelah dokumentasi promosi masuk `main`.
