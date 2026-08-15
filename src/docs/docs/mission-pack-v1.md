# Ngepas Reborn — Mission Pack v1

**Status:** Draft operasional

**Pemilik produk:** Solo builder Ngepas

**Tim kerja:** Manusia + AI agents

**Source of truth sementara:** GitHub repository dan dokumen Core

**Target tracker:** Linear, setelah akses jaringan tersedia

**Tanggal:** 2026-08-15

## 1. Misi Produk

Ngepas adalah platform kurasi dan bantuan keputusan belanja berbasis affiliate. Ngepas bukan toko online dan bukan marketplace. User datang ke Ngepas untuk memahami pilihan produk, membandingkan alternatif, lalu checkout di marketplace partner.

> Sebelum checkout, cek dulu di Ngepas.

Fokus Phase 1 adalah kurasi produk, dimulai dari kategori Home & Living, dengan satu link affiliate per produk. Multi-harga marketplace melalui `product_offers` adalah pekerjaan Phase 3 dan tidak boleh dipercepat hanya karena desain sudah menampilkan beberapa marketplace.

## 2. Prinsip Operasional Tim

| Prinsip | Aturan kerja |
|---|---|
| Satu sumber kebenaran | `ngepas-core.md` menjadi rujukan utama jika ada konflik dengan dokumen lain. |
| Scope kecil | Setiap issue mempunyai satu outcome yang dapat diuji. |
| Branch dahulu | Semua perubahan kode bekerja di branch `feat/*`, `fix/*`, `docs/*`, atau `design/*`; jangan push langsung ke `main`. |
| Arsitektur FE | Component → Context → Service → API → Backend. Component dan Context tidak boleh memanggil `fetch()` langsung. |
| Arsitektur BE | Routes → Validator → Sanitizer → Parser → Controller → Model → SQLite. Controller tidak boleh berisi SQL. |
| YAGNI | Jangan membuat akun publik, review detail, CMS artikel, atau multi-marketplace sebelum datanya dan kebutuhan user terbukti. |
| Dokumentasi | Perubahan perilaku atau arsitektur harus didokumentasikan sebelum commit final. |
| Mobile first | Setiap layar publik harus mempunyai perilaku mobile ≤768px dan desktop ≥1024px yang jelas. |
| Review aman | Sebelum merge, perubahan harus dapat dijelaskan dengan bahasa sederhana dan diuji dari workflow yang tersedia di HP. |

## 3. Batas Scope yang Tidak Boleh Dilanggar

### Termasuk dalam scope saat ini

Pekerjaan saat ini mencakup adopsi design system tim, polish UI publik, Discover, Search & Filter dasar, Product Detail, dan Compare produk berbasis data yang sudah tersedia. Admin panel hanya disentuh jika diperlukan untuk mengisi field kurasi yang sudah menjadi bagian dari model produk.

### Tidak termasuk dalam scope saat ini

Pekerjaan ini tidak mencakup penggantian Express, SQLite, atau `better-sqlite3`; rebuild JWT admin; migrasi database besar; akun publik; sistem order; review detail; CMS artikel; realtime price scraping; dan compare marketplace nyata.

## 4. Milestone dan Urutan Kerja

| Milestone | Tujuan | Status | Dependensi |
|---|---|---|---|
| M0 — Mission Control | Menyatukan Core, design system, roadmap, dan handoff AI | In progress | Tidak ada |
| M1 — Discover Foundation | Membuat Home sesuai referensi tim: header, hero, kategori, pilihan, trending, artikel, why Ngepas | Planned | M0 |
| M2 — Search to Detail | Memastikan user dapat mencari produk dan membuka detail yang berguna | Planned | M1 |
| M3 — Compare Basic | Membandingkan dua atau tiga produk dengan data yang sudah ada | Planned | M2 |
| M4 — Backend Readiness | Menambah endpoint slug, validasi kurasi, gallery sederhana, dan query scalable bila diperlukan | Planned | M2–M3 |
| M5 — Marketplace Offers | Membandingkan harga nyata dari beberapa marketplace melalui `product_offers` | Future / Phase 3 | M4 dan sumber data yang valid |

## 5. Issue Backlog Siap Dipindahkan ke Linear

### M0 — Mission Control

#### NGP-M0-01 — Jadikan Core sebagai sumber kebenaran

**Prioritas:** P0

**Jenis:** Documentation / Process

**Outcome:** Semua agent membaca `src/docs/docs/ngepas-core.md` sebelum menyentuh kode dan mengikuti aturan branch, layer, deploy, serta YAGNI.

**Acceptance criteria:** Dokumen mission pack, UI/UX system, dan Core saling menunjuk; konflik diselesaikan dengan Core sebagai pemenang.

#### NGP-M0-02 — Pakai branch untuk setiap perubahan

**Prioritas:** P0

**Jenis:** Process

**Outcome:** Tidak ada pekerjaan baru yang langsung masuk `main`.

**Acceptance criteria:** Nama branch menjelaskan tujuan; commit kecil; pull request atau review dilakukan sebelum merge.

#### NGP-M0-03 — Siapkan AI handoff standar

**Prioritas:** P0

**Jenis:** Documentation

**Outcome:** GPT, Claude, Grok, Gemini, dan Manus menerima konteks proyek yang sama.

**Acceptance criteria:** Handoff selalu menyebut tujuan issue, file yang boleh disentuh, file yang tidak boleh disentuh, aturan Core, test yang harus dijalankan, dan hasil yang harus dilaporkan.

### M1 — Discover Foundation

#### NGP-M1-01 — Polish header Discover mobile dan desktop

**Prioritas:** P1

**Jenis:** Frontend / Design

**Outcome:** Header mengikuti referensi tim dengan logo fixed, search sebagai fokus utama, filter/quick access, notifikasi, akun, dan state default/search focus/menu open.

**Batasan:** Jangan mengubah logo, typography, palette hijau-kuning, icon style, breakpoint, atau spacing token.

**Acceptance criteria:** Mobile dan desktop mempunyai layout yang jelas; focus, disabled, menu open, dan notification state tidak merusak layout; tidak ada hardcoded backend URL.

#### NGP-M1-02 — Implementasi Hero / Value Proposition

**Prioritas:** P1

**Jenis:** Frontend / Content

**Outcome:** User memahami nilai Ngepas dalam beberapa detik dan mempunyai CTA menuju pencarian.

**Acceptance criteria:** Headline, subheadline, tiga benefit, CTA utama, CTA sekunder, visual, dan marketplace trust strip mengikuti referensi; CTA utama membuka alur Search.

#### NGP-M1-03 — Implementasi section Discover berbasis data yang sudah tersedia

**Prioritas:** P1

**Jenis:** Frontend / Data presentation

**Outcome:** Kategori populer, Pilihan Ngepas, dan Trending Minggu Ini menampilkan data API yang sudah ada tanpa membuat data palsu.

**Acceptance criteria:** Loading, empty, error, dan populated state tersedia; produk menggunakan field `featured`, `rating`, `sold`, `price`, `image`, dan `badge` yang benar-benar ada; link menuju Product Detail memakai route yang konsisten.

#### NGP-M1-04 — Tambahkan konten statis Artikel & Tips dan Why Ngepas

**Prioritas:** P2

**Jenis:** Frontend / Content

**Outcome:** Discover mempunyai edukasi dan trust tanpa menambah CMS atau endpoint baru.

**Acceptance criteria:** Konten disimpan di lokasi data statis yang mengikuti convention; tidak ada angka testimoni atau claim yang dibuat tanpa sumber; empty state tetap informatif jika konten belum tersedia.

### M2 — Search to Detail

#### NGP-M2-01 — Search & Filter dasar di frontend

**Prioritas:** P1

**Jenis:** Frontend

**Outcome:** User dapat mencari produk berdasarkan nama, kategori, dan atribut yang sudah tersedia tanpa backend baru.

**Acceptance criteria:** Search state, filter aktif, reset filter, sorting dasar, loading, empty result, dan error state tersedia; filter tidak memanggil `fetch()` dari component; service/context tetap mengikuti alur resmi.

#### NGP-M2-02 — Polish Product Detail berdasarkan data kurasi

**Prioritas:** P1

**Jenis:** Frontend

**Outcome:** User dapat memahami produk, kecocokan, pertimbangan, spesifikasi, rating, stok, dan CTA affiliate.

**Acceptance criteria:** Menampilkan `whyWeRecommend`, `bestFor`, `considerations`, `features`, `specifications`, `rating`, `stock`, harga, dan satu affiliate CTA bila datanya ada; CTA menjelaskan bahwa checkout terjadi di marketplace; tidak menampilkan gallery/review detail jika backend belum menyediakannya.

#### NGP-M2-03 — Endpoint publik Product Detail berdasarkan slug

**Prioritas:** P2

**Jenis:** Backend / API

**Outcome:** Product Detail tidak perlu mengambil seluruh katalog untuk menemukan satu produk.

**Endpoint target:** `GET /api/products/:slug`

**Batasan:** Tambahan mengikuti pipeline resmi; SQL hanya di model, controller hanya orkestrasi, response menggunakan response helper, dan kontrak API diperbarui sebelum commit final.

**Acceptance criteria:** Produk ditemukan berdasarkan slug; produk tidak ditemukan menghasilkan error response yang konsisten; frontend service memakai endpoint tersebut; test sukses dan not-found tersedia.

### M3 — Compare Basic

#### NGP-M3-01 — Compare dua atau tiga produk dari data yang sudah tersedia

**Prioritas:** P2

**Jenis:** Frontend

**Outcome:** User dapat memilih produk dari katalog lalu melihat perbandingan yang membantu keputusan.

**Acceptance criteria:** Maksimal tiga produk; compare state dapat dikosongkan; kolom penting meliputi harga, rating, sold, fitur, spesifikasi, best-for, dan considerations; produk yang datanya tidak lengkap diberi state yang jujur; tidak ada harga marketplace tambahan yang dihardcode.

#### NGP-M3-02 — Tampilkan Skor Ngepas hanya jika metodologinya jelas

**Prioritas:** P3

**Jenis:** Product decision support

**Outcome:** Skor membantu keputusan dan tidak menjadi klaim palsu.

**Acceptance criteria:** Formula atau label skor didokumentasikan; jika formula belum disepakati, gunakan label perbandingan kualitatif seperti “Best fit” berdasarkan field yang tersedia; jangan menampilkan angka pseudo-presisi.

### M4 — Backend Readiness

#### NGP-M4-01 — Perketat field kurasi di admin form dan validator

**Prioritas:** P2

**Jenis:** Backend + Admin FE

**Outcome:** Produk baru mempunyai alasan kurasi yang cukup untuk ditampilkan di UI Discover dan Product Detail.

**Field target:** `reason`, `whyWeRecommend`, `bestFor`, `considerations`, `slug`, `price`, `rating`, dan `stock`.

**Acceptance criteria:** Validasi server dan form admin konsisten; pesan error dapat dipahami; data lama tidak rusak; migrasi tidak menghapus data.

#### NGP-M4-02 — Tambahkan gallery sederhana bila Product Detail membutuhkannya

**Prioritas:** P3

**Jenis:** Backend / Data model

**Outcome:** Product Detail dapat menampilkan beberapa gambar yang benar-benar tersimpan.

**Batasan:** Jangan membuat asset pipeline besar; pilih field JSON sederhana atau tabel `product_images` setelah kebutuhan nyata dikonfirmasi.

#### NGP-M4-03 — Search/filter/pagination server-side saat katalog membesar

**Prioritas:** P3

**Jenis:** Backend / Performance

**Outcome:** Katalog tidak perlu selalu mengambil seluruh produk.

**Batasan:** Jangan dibuat sebelum ukuran data atau kebutuhan performa membenarkannya.

### M5 — Future / Phase 3

#### NGP-M5-01 — Model `product_offers` untuk marketplace

**Prioritas:** P4

**Jenis:** Backend / Phase 3

**Outcome:** Ngepas dapat menampilkan beberapa offer marketplace dengan harga, URL affiliate, promo, stok, dan waktu pembaruan yang bersumber.

**Batasan:** Tidak boleh memakai data palsu; tidak boleh memasukkan multi-marketplace ke field `products` secara asal; sumber data dan frekuensi update harus disepakati dahulu.

#### NGP-M5-02 — Public user account, wishlist, history, dan notification

**Prioritas:** P4

**Jenis:** Backend / Future

**Outcome:** Fitur Akun pada referensi menjadi fungsional, bukan sekadar dekorasi.

**Batasan:** Tidak dikerjakan dalam Phase 1; auth admin JWT yang ada tidak dibongkar untuk memaksakan fitur ini.

## 6. Definition of Done Umum

Sebuah issue dianggap selesai jika outcome-nya dapat dicoba, perubahan bekerja pada breakpoint yang relevan, state normal/loading/empty/error yang relevan sudah dipikirkan, aturan Core tidak dilanggar, branch bersih dari perubahan tak terkait, test atau build yang sesuai berhasil, dan dokumentasi diperbarui jika perilaku atau kontrak berubah.

Untuk backend, tambahan wajib mengikuti urutan Routes → Validator → Sanitizer → Parser → Controller → Model → SQLite. Controller tidak boleh berisi SQL dan response harus menggunakan `success()` atau `error()`.

Untuk frontend, component dan context tidak boleh memanggil `fetch()` langsung. Semua komunikasi API harus melewati service, dan URL API harus berasal dari environment.

## 7. Format Handoff Antar-Agent

Setiap agent yang mengambil issue wajib menerima konteks berikut:

```text
Issue:
Tujuan user:
Outcome yang harus selesai:
File yang boleh disentuh:
File yang tidak boleh disentuh:
Kontrak/Core yang relevan:
Batasan scope:
Cara test:
Risiko atau keputusan yang belum pasti:
```

Agent tidak boleh memperluas scope hanya karena menemukan ide tambahan. Ide tersebut masuk ke issue baru atau decision log, bukan dikerjakan diam-diam dalam issue aktif.

## 8. Decision Log Awal

| Keputusan | Alasan |
|---|---|
| Linear ditunda sementara | Akses jaringan memblokir Linear; GitHub menjadi source of truth sementara. |
| Backend tidak dirombak total | Express, SQLite, JWT admin, CRUD, dan layer architecture masih sesuai Phase 1. |
| Multi-marketplace ditahan | `product_offers` memang ditetapkan sebagai Phase 3 oleh Core. |
| Artikel dibuat statis dulu | Belum ada kebutuhan CMS yang terbukti. |
| Akun publik ditahan | Backend saat ini hanya mendukung auth admin. |
| UI dikerjakan dalam vertical slice | Risiko lebih rendah untuk solo builder dan lebih mudah dites dari HP. |

## 9. Urutan Vertical Slice Pertama

Vertical slice pertama yang direkomendasikan adalah **Header → Hero → Kategori Populer → Pilihan Ngepas → Product Detail CTA**. Slice ini memberikan pengalaman user yang utuh dari membuka Ngepas sampai memahami satu produk, tanpa menunggu backend marketplace atau akun publik.

Ukuran perubahan frontend harus tetap kecil, idealnya dua sampai tiga file utama per issue polish. Setiap issue berikutnya dibuat setelah slice sebelumnya dapat dicoba dan hasilnya dipahami.

## 10. Referensi Internal

- [`ngepas-core.md`](./ngepas-core.md) — sumber kebenaran arsitektur dan roadmap.
- [`uiux-system-v1.1.md`](./uiux-system-v1.1.md) — design system dan UX handoff tim.
- [`api-contract.md`](./api-contract.md) — kontrak endpoint dan response.
- [`coding-standard.md`](./coding-standard.md) — convention implementasi.
- [`backend-architekture.md`](./backend-architekture.md) — aturan layer backend.
- [`folders-frontend.md`](./folders-frontend.md) — struktur frontend.
- [`folders-backend.md`](./folders-backend.md) — struktur backend.

---

**Catatan:** Dokumen ini adalah mission pack operasional sementara. Ketika Linear sudah dapat diakses, setiap milestone dan issue dapat dipindahkan tanpa mengubah scope atau urutan kerja.
