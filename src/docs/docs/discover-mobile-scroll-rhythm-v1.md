# Discover Mobile Scroll Rhythm v1

**Status:** Wireframe untuk validasi user. Belum menjadi implementasi.

## Prinsip Utama

> **Satu layar satu tugas utama.** User tidak dipaksa memahami Hero, kategori, produk, trust, dan artikel dalam satu viewport.

Prinsip ini tidak berarti setiap section harus dipaksa tepat `100vh`. Yang dikunci adalah bahwa setiap viewport memiliki **satu fokus dominan**, dengan batas section berikutnya muncul secara terkontrol sebagai isyarat scroll. Jika Hero membutuhkan sedikit lebih dari satu viewport karena visual produk, itu tetap satu tugas: memahami nilai Ngepas dan mulai mencari.

## Target Viewport

Wireframe memakai target mobile sekitar 360–390px CSS width dan tinggi efektif sekitar 720–820px setelah browser chrome. Layout menggunakan gutter kiri-kanan 24px pada konten utama. Tidak ada keputusan desktop yang boleh memaksa kepadatan mobile.

## Viewport Map

| Checkpoint | Fokus dominan | Isi yang boleh terlihat | Isi yang tidak boleh mengambil fokus |
|---|---|---|---|
| V0 — Entry | Memahami Ngepas | Identity row, search row, headline Hero, deskripsi, awal benefit, atau CTA bila ruang cukup | Kategori dan produk tidak boleh muncul sebagai kompetitor visual |
| V1 — Hero action | Memulai pencarian | Sisa benefit, CTA utama, CTA sekunder, visual produk, marketplace strip | Heading section Kategori tidak boleh menempel rapat pada CTA |
| V2 — Category discovery | Memilih jalur eksplorasi | Heading Kategori, CTA Lihat Semua, satu baris horizontal category cards, info strip pendek | Product grid tidak boleh dimulai sebelum user menyelesaikan area kategori |
| V3 — Product decision | Memahami pilihan | Heading Pilihan Ngepas, tab/filter, satu atau dua ProductCard horizontal, awal trust strip | Artikel tidak boleh muncul sebelum produk selesai dibaca |
| V4 — Trust + continuation | Merasa yakin dan lanjut | Trust strip, Trending heading atau continuation product row | Hero tidak boleh muncul lagi sebagai elemen floating |
| V5 — Education | Mendapat bantuan keputusan | Heading Artikel & Tips, tab, satu atau dua article cards, CTA Lihat Semua | Section Why Ngepas tidak boleh menekan artikel ke satu baris padat |
| V6 — Explanation | Memahami cara kerja | Cara Kerja Ngepas dengan tiga langkah yang bernapas | CTA belanja/checkout tidak boleh muncul karena Ngepas bukan toko |
| V7 — Trust closing | Menutup dengan alasan percaya | Why Ngepas dan closing/trust | Navigasi tambahan yang duplikatif tidak boleh muncul |

## Vertical Rhythm

| Area | Wireframe rule | Reason |
|---|---|---|
| Header identity row | 56–64px | Stabil, tidak memakan Hero |
| Search row | 52–56px, gap 8–12px dari identity row | Search tetap mudah ditemukan tanpa menjadi Hero kedua |
| Header ke Hero | 24px | Memberi napas setelah control area |
| Hero headline ke description | 12–16px | Headline tetap dominan tanpa terputus |
| Description ke benefit list | 16–20px | Benefit terbaca sebagai bukti, bukan paragraf baru |
| Benefit antarbaris | 10–12px | Tiga alasan tetap ringkas |
| Benefit ke CTA | 20–24px | CTA terasa sebagai keputusan berikutnya |
| CTA utama ke CTA sekunder | 8–12px | Satu kelompok aksi, bukan dua section |
| CTA ke visual Hero | 24–32px | Visual mendapat ruang dan tidak menabrak tombol |
| Hero ke Kategori | 40–56px | Perubahan tugas terasa jelas |
| Antar-section besar | 48–64px | Scroll rhythm tidak terasa seperti kumpulan card bertumpuk |

Nilai di atas adalah **wireframe rhythm**, bukan instruksi untuk menambah utility acak. Saat coding ulang, nilai harus dipetakan ke token spacing yang sudah ada di Ngepas.

## Hierarchy Scale Mobile

| Level | Peran | Rule |
|---|---|---|
| H1 Hero | Pesan utama | Satu fokus terbesar; sekitar 30–34px dengan line-height rapat, maksimal tiga baris pada target width |
| Section heading | Pergantian tugas | Sekitar 22–26px; tidak boleh lebih besar dari pesan Hero |
| Supporting text | Penjelasan | 14–16px dengan line-height nyaman; maksimal dua sampai tiga baris bila bisa |
| Benefit | Bukti keputusan | 13–14px; satu baris bila memungkinkan, tidak memakai copy panjang |
| CTA label | Aksi | 14–16px, semibold/bold, target sentuh minimal sesuai token |
| Metadata | Informasi sekunder | 11–12px; muted dan tidak bersaing dengan judul |

## Silhouette Per Viewport

```text
V0  ENTRY
┌────────────────────────┐
│ identity row           │
│ search row             │
│                        │
│ H1 Hero                │  fokus pertama
│ supporting text        │
│ benefit 1–3            │  bukti singkat
└───────────┬────────────┘
            │ scroll cue
V1  HERO ACTION
┌───────────▼────────────┐
│ CTA primary            │
│ CTA secondary          │
│                        │
│ visual product         │
│ marketplace strip      │
└───────────┬────────────┘
            │ section gap
V2  CATEGORY DISCOVERY
┌───────────▼────────────┐
│ Kategori Populer       │
│ Lihat Semua            │
│ [card][card][card] →   │
│ info strip              │
└───────────┬────────────┘
            │ section gap
V3  PRODUCT DECISION
┌───────────▼────────────┐
│ Pilihan Ngepas         │
│ tabs / filter          │
│ product row →          │
│ trust hint              │
└────────────────────────┘
```

## Acceptance Gate

Wireframe dianggap benar bila pada scroll pertama user hanya menangkap pesan Ngepas; pada scroll berikutnya user melihat tindakan yang dapat dilakukan; kategori tidak mengambil ruang Hero; ProductCard memiliki cukup ruang untuk gambar, nama, rating, harga, dan CTA; section tidak saling menempel; dan tidak ada floating navigation yang menutup konten. Bila komposisi masih terasa padat, solusi pertama adalah mengurangi isi atau memperbaiki rhythm, bukan mengecilkan semua font.

## References

[1]: `src/docs/assets/uiux-v1.1/reference/1000702670.jpg` — Mockup Hero / Value Proposition Discover.

[2]: `src/docs/assets/uiux-v1.1/reference/1000702671.jpg` — Mockup Header Discover Mobile & Desktop.

[3]: `src/docs/docs/mockup-wireframe-audit-v1.md` — Audit mockup resmi dan urutan section Discover.

[4]: `src/styles/tokens.css` — Design tokens Ngepas untuk spacing, typography, dan control sizing.
