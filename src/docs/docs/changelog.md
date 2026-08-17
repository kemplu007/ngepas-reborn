# ==================================================
# NGEPAS REBORN
# CHANGELOG
# ==================================================

## Unreleased — FE Foundation Baseline v1

Release Date: 2026-08-17

==================================================

## CURATED DECISION LABEL — KEM-16 (menunggu approval founder)

✓ `ProductDetail.jsx` menampilkan label kualitatif "Rekomendasi kurasi Ngepas" dengan ikon BadgeCheck pada header panel Panduan keputusan, hanya bila `whyWeRecommend` berisi setidaknya satu alasan kurasi yang ditulis manusia
✓ Label hanya menyatakan keberadaan alasan kurasi tertulis; tidak ada skor, angka pseudo-presisi, bintang buatan, peringkat, atau perbandingan antar produk, dan tidak ada klaim metodologi atau bukti eksternal
✓ Penjelasan satu kalimat "Ditandai dari alasan kurasi yang ditulis tim Ngepas, bukan skor otomatis" tersedia bersama label agar pengungkapan tetap jujur
✓ Label memakai token `--np-*` dan ikon Lucide existing; produk tanpa alasan kurasi menampilkan panel Panduan keputusan secara normal tanpa label
✓ Tidak ada perubahan pada Context, service, payload, API, backend, database, schema, persistence, auth JWT, upload, media, storage, billing, dependency, atau data produksi

VALIDATION: `git diff --check` PASSED; `npx vite build` PASSED; pemeriksaan visual mobile 375×812 dan desktop 1280×720 melalui preview lokal dengan API produksi read-only

✓ Kontrak dokumen: `src/docs/docs/kem16-curated-decision-label-contract-v1.md`
✓ Branch: `feat/curated-decision-label-v1` (basis `7333dc4`, belum ada PR terbuka)

STATUS: KEM-16 REVIEW READY — MENUNGGU APPROVAL FOUNDER SEBELUM DIPROMOSIKAN KE `main`

==================================================

## CURATED DECISION LABEL — KEM-16 (menunggu approval founder)

✓ `ProductDetail.jsx` menampilkan label kualitatif "Rekomendasi kurasi Ngepas" dengan ikon BadgeCheck pada header panel Panduan keputusan, hanya bila `whyWeRecommend` berisi setidaknya satu alasan kurasi yang ditulis manusia
✓ Label hanya menyatakan keberadaan alasan kurasi tertulis; tidak ada skor, angka pseudo-presisi, bintang buatan, peringkat, atau perbandingan antar produk, dan tidak ada klaim metodologi atau bukti eksternal
✓ Penjelasan satu kalimat "Ditandai dari alasan kurasi yang ditulis tim Ngepas, bukan skor otomatis" tersedia bersama label agar pengungkapan tetap jujur
✓ Label memakai token `--np-*` dan ikon Lucide existing; produk tanpa alasan kurasi menampilkan panel Panduan keputusan secara normal tanpa label
✓ Tidak ada perubahan pada Context, service, payload, API, backend, database, schema, persistence, auth JWT, upload, media, storage, billing, dependency, atau data produksi

VALIDATION: `git diff --check` PASSED; `npx vite build` PASSED; pemeriksaan visual mobile 375×812 dan desktop 1280×720 melalui preview lokal dengan API produksi read-only

✓ Kontrak dokumen: `src/docs/docs/kem16-curated-decision-label-contract-v1.md`
✓ Branch: `feat/curated-decision-label-v1`

STATUS: KEM-16 REVIEW READY — MENUNGGU APPROVAL FOUNDER SEBELUM DIPROMOSIKAN KE `main`

==================================================

## PERKETAT FIELD KURASI — KEM-17 (menunggu approval founder)

✓ `server/helpers/validators/productValidator.js` menambahkan `validateCurationFields`: produk berstatus `published` wajib memiliki `whyWeRecommend` (minimal satu alasan, masing-masing minimal 8 karakter) dan `bestFor` (minimal satu kecocokan); `considerations` tetap opsional agar pengungkapan jujur
✓ Produk berstatus `draft` tidak terkena aturan kurasi (draft exception) sehingga alur kerja admin dapat menyimpan progres tanpa klaim kurasi sebelum produk layak ditampilkan
✓ Jalur `updateProduct` mengevaluasi status tujuan (request atau status existing) agar produk draft lama tidak terkena enforcement destruktif; tidak ada migrasi schema maupun kerusakan data lama
✓ `src/pages/admin/ProductForm.jsx` menjalankan pemeriksaan lokal yang konsisten dengan server sebelum submit dan menampilkan alert error berbahasa manusia yang merujuk field spesifik pada card kurasi
✓ Field target `reason`, `rating`, dan `stock` tidak dipakai panel Panduan keputusan publik saat ini sehingga tidak diubah; pipeline backend mengikuti Routes → Validator → Sanitizer → Controller → Model tanpa menyentuh auth JWT

VALIDATION: harness read-only 7 assertion PASSED (fungsi murni tanpa database produksi); `git diff --check` PASSED; `node --check` backend PASSED; `npx vite build` PASSED

✓ Kontrak dokumen: `src/docs/docs/kem17-curated-fields-enforcement-contract-v1.md`
✓ Branch: `feat/curated-fields-enforcement-v1`

STATUS: KEM-17 REVIEW READY — MENUNGGU APPROVAL FOUNDER SEBELUM DIPROMOSIKAN KE `main`

==================================================

## PRODUCT DETAIL BY SLUG — KEM-14

✓ `GET /api/products/:slug` menambahkan lookup publik read-only untuk satu produk, dengan parameter slug tervalidasi dan disanitasi melalui jalur Routes → Validator → Sanitizer → Controller → Model → SQLite
✓ Lookup SQL tetap parameterized dan hanya berada di Product Model; controller mempertahankan response helper existing untuk 200 sukses, 400 slug invalid, dan 404 produk tidak ditemukan
✓ `productService` dan `ProductContext` mengekspos lookup per-slug; `ProductDetail` memakai action Context sebagai sumber produk utama tanpa fetch langsung atau pemuatan katalog penuh untuk detail utama
✓ Route `/product/:slug`, CTA marketplace, gallery, harga, panel kurasi KEM-13, related products, write flow, auth JWT, schema, migration, persistence, data produksi, upload, WebP, storage, billing, secret, scheduler, dan kebijakan visibility publik existing dipertahankan

VALIDATION: `git diff --check`, `node --check` untuk seluruh file backend yang berubah, harness controller read-only untuk 200/400/404, dan `npx vite build` PASSED. Tidak ada database produksi yang dibaca atau ditulis oleh harness.

✓ Branch `feat/product-detail-by-slug-v1` dipromosikan ke `main` melalui PR #27 setelah approval eksplisit founder
✓ Merge commit promotion: `2c57ac2`

STATUS: KEM-14 PRODUCT DETAIL BY SLUG PROMOTED TO `main` — DETAIL REQUEST NOW USES A FOCUSED READ-ONLY CONTRACT

==================================================

## PRODUCT DETAIL CURATED-DATA POLISH — KEM-13

✓ `ProductDetail.jsx` memperjelas scan path panel Panduan keputusan supaya alasan pemilihan, kecocokan, dan pertimbangan lebih mudah dipindai sebelum CTA marketplace
✓ Panel tetap memakai hanya `whyWeRecommend`, `bestFor`, dan `considerations` yang sudah diisi manusia; subbagian dan panel utama tetap hilang saat datanya kosong tanpa skor, review sintetis, label “terbaik”, kelangkaan palsu, atau placeholder promosi
✓ Lookup melalui `useProducts`, route `/product/:slug`, gallery, price/meta, sticky CTA mobile, CTA desktop static, href/target/rel affiliate, fallback CTA, detail, dan produk terkait dipertahankan
✓ Tidak ada perubahan Context, service, payload, API, backend, database, schema, persistence, auth JWT, upload, WebP, storage, billing, secret, scheduler, endpoint media, dependency, atau data produksi

VALIDATION: `git diff --check` + `npx vite build` PASSED; `/product/rak-bumbu-dapur` diperiksa read-only terhadap API Railway pada mobile 375×812 dan desktop 1280×720 tanpa horizontal overflow. Warning duplicate key `/category` pada navigasi existing dicatat sebagai baseline di luar scope KEM-13.

✓ Branch `polish/product-detail-curated-data-v1` dipromosikan ke `main` melalui PR #25 setelah approval eksplisit founder
✓ Merge commit promotion: `44e31d6`

STATUS: KEM-13 PRODUCT DETAIL CURATED-DATA POLISH PROMOTED TO `main` — CURATION HIERARCHY IS CLEARER WITHOUT A NEW DATA CONTRACT

==================================================

## AI HANDOFF STANDARD — CROSS-SESSION OPERATIONS

✓ `ai-handoff-standard-v1.md` menetapkan envelope wajib untuk konteks lintas sesi/AI: source of truth, branch/worktree state, scope contract, evidence validasi, guardrail, tracker, dan next decision
✓ State vocabulary Proposed / Review ready / Promoted / Documented / Blocked menggantikan status percakapan yang ambigu; Linear `In Progress` tidak boleh dipakai sebagai tempat parkir tanpa bukti dan next action
✓ Standar ini mengunci branch hygiene: branch hanya dihapus setelah bukti merged, tidak ada PR terbuka, tidak dipakai worktree, serta artefak untracked telah dilindungi
✓ Tidak ada perubahan aplikasi, auth JWT, route, API, backend, database, schema, persistence, media, billing, atau data produksi

VALIDATION: `git diff --check` PASSED; dokumen merujuk Core, UI/UX system, coding standard, foundation baseline, changelog, serta checkpoint Linear/Notion existing

STATUS: AI HANDOFF STANDARD ESTABLISHED — FUTURE SLICES REQUIRE EVIDENCE-BASED HANDOFF AND TRACKER CHECKPOINTS

==================================================

## PRODUCTION PERSISTENCE VERIFICATION — POST-REVIEW EVIDENCE

✓ Live `GET /api/products` pada Railway produksi sudah mengembalikan field persistence penuh: `status` (published/draft), `tags`, `gallery`, serta field kurasi `whyWeRecommend`, `bestFor`, dan `considerations` yang dipakai Panduan keputusan F1
✓ Verifikasi independen dilakukan pada 17 Agt 2026 setelah review bedah tim menemukan field persistence tidak tampak di endpoint; hasil review memakai snapshot yang usang dan sudah dinyatakan tidak berlaku
✓ `tags` dan `gallery` masih kosong pada data seed existing; kondisi ini berasal dari data entry, bukan kegagalan migration atau runtime
✓ Tidak ada perubahan apa pun pada aplikasi; verifikasi bersifat read-only terhadap endpoint produksi

VALIDATION: respons HTTP 200 pada `https://ngepas-reborn-production-c3aa.up.railway.app/api/products` berisi `status`, `tags`, `gallery`, dan field kurasi pada setiap produk

STATUS: PRODUCTION PERSISTENCE FIELDS VERIFIED LIVE — REVIEW CLAIM DEEMED OUTDATED AFTER INDEPENDENT RE-VERIFICATION

==================================================

## PRODUCT DECISION-QUALITY CUES — F1

✓ `ProductDetail.jsx` kini menyatukan `whyWeRecommend`, `bestFor`, dan `considerations` existing menjadi Panduan keputusan sebelum CTA marketplace agar pembaca dapat melihat alasan pemilihan, kecocokan, serta trade-off dalam satu urutan baca mobile-first
✓ Setiap subbagian hanya dirender saat data kurasi yang bersangkutan tersedia; produk tanpa seluruh data kurasi tidak menerima card kosong, placeholder promosi, skor Ngepas, atau kesimpulan otomatis
✓ Cue Cocok untuk dan Perlu dipertimbangkan tidak lagi diduplikasi pada informasi pendukung; bagian bawah hanya memuat Keunggulan dan Spesifikasi saat masing-masing memiliki data
✓ CTA marketplace, `href`, `target`, `rel`, state link kosong, sticky mobile, desktop action, gallery state, route, Context, service, API, backend, database, schema, persistence, auth JWT, dan data produksi dipertahankan
✓ Tidak ada upload, WebP, storage, provider, billing, secret, scheduler, endpoint media, dependency, atau perubahan Zero-Cost Media Runway

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules); Product Detail diuji dengan katalog produksi read-only pada desktop dan viewport mobile 375×812 tanpa horizontal overflow. Console preview mencatat key `/category` duplikat dari navigasi existing di luar scope F1; F1 tidak menyentuh router atau navigasi.

✓ Branch `feat/product-decision-quality-cues-v1` dipromosikan ke `main` melalui PR #21 setelah approval eksplisit
✓ Merge commit promotion: `c386a5b`

STATUS: PRODUCT DECISION-QUALITY CUES F1 PROMOTED TO `main` — CURATION SIGNALS ARE CLEARER WITHOUT NEW DATA CONTRACT

==================================================

## ADMIN PUBLISHING RUNBOOK — F0 ZERO-COST OPERATIONS

✓ `admin-publishing-runbook-v1.md` kini menjadi SOP penerbitan katalog mobile-first bagi pengelola konten nonteknis: persiapan data, alur enam langkah, status Draft/Published, cue kesiapan `4/4`, Gallery URL Assistant, checklist kontrol kualitas, dan scorecard manual mingguan
✓ Runbook hanya memakai kemampuan yang sudah ada: field produk serta URL HTTPS `image`/`gallery` existing; gambar, alasan rekomendasi, harga, dan tautan affiliate tetap wajib diperiksa secara jujur sebelum publish
✓ Tidak ada upload native, transformasi WebP, provider storage, billing, secret, endpoint, dependency, schema, migration, scheduler, API runtime, perubahan auth JWT, atau data produksi yang ditambahkan
✓ Guardrail Zero-Cost Media Runway tetap aktif; evaluasi A4 native upload + WebP baru boleh dibuka setelah sekitar 20 produk lengkap, ritme konten empat minggu, dan hambatan operasional nyata dapat dibuktikan

VALIDATION: `git diff --check` PASSED; PR dokumentasi F0 hanya mengubah `src/docs/docs/admin-publishing-runbook-v1.md`; Vercel Preview Comments SUCCESS

✓ Branch `docs/admin-publishing-runbook-v1` dipromosikan ke `main` setelah approval eksplisit melalui PR #19
✓ Merge commit promotion: `088d1dd`

STATUS: F0 ADMIN PUBLISHING RUNBOOK PROMOTED TO `main` — ZERO-COST OPERATIONS READY FOR CONTENT ONBOARDING

==================================================

## ZERO-COST MEDIA RUNWAY — A4 DECISION GATE

✓ Founder menyetujui jalur Z0 sebagai default: admin memakai field URL `image` dan `gallery` existing untuk konten produk, tanpa native upload, akun storage aplikasi, billing, secret, endpoint, schema, migration, scheduler, atau perubahan runtime
✓ Hosting gratis manual pihak ketiga hanya menjadi cadangan operasional jika URL sumber yang berhak dipakai tidak praktis; ia tidak diintegrasikan ke aplikasi dan tidak menciptakan komitmen biaya Ngepas
✓ Implementasi A4 native upload + WebP dibekukan sampai kebutuhan nyata terbukti: sekitar 20 produk lengkap, ritme input selama empat minggu, dan hambatan URL manual/kuota gratis/insiden gambar dapat dibuktikan
✓ Sesudah milestone, keputusan biaya tetap membutuhkan approval founder terpisah untuk provider, ownership akun, domain asset, quota, recovery point, dan cleanup; prinsip YAGNI mencegah biaya maupun kompleksitas dini

VALIDATION: keputusan ini hanya memperbarui dokumentasi; tidak ada dependency, API, backend, database, auth JWT, provider, billing, credential, maupun deployment yang diubah

✓ Branch `docs/admin-media-a4-decision-brief-v1` dipromosikan ke `main` setelah approval eksplisit melalui PR #17
✓ Merge commit promotion: `2fd16d1`

STATUS: ZERO-COST MEDIA RUNWAY ACTIVE — A4 NATIVE UPLOAD/WEBP FROZEN UNTIL PRODUCTIVE MILESTONE

==================================================

## ADMIN MEDIA UPLOAD CONTRACT — SLICE A3

✓ Kontrak keputusan media menetapkan target object storage kelas S3, jalur Browser → backend Express → transformasi → storage, dan kompatibilitas penuh untuk field URL `image` serta `gallery` yang sudah live
✓ Usulan A4 mendefinisikan metadata `media_assets`, relasi `product_media_links`, state lifecycle, validasi file berlapis, error taxonomy, observability, cleanup guard, recovery runbook, dan acceptance criteria tanpa mengubah runtime
✓ Sharp dicatat sebagai kandidat transformasi WebP saja; instalasi dependency, provider storage, endpoint multipart, schema, migration, secret, scheduler, maupun code upload tidak masuk A3
✓ Implementasi A4 diblokir hingga provider/region/domain asset, ownership biaya, quota, credential rotation, recovery point, dan mekanisme cleanup disetujui secara eksplisit

VALIDATION: `git diff --check` + `npx vite build` PASSED; review kontrak merujuk Product Persistence Contract, API contract, model/controller produk, initializer SQLite, renderer public, OWASP File Upload Cheat Sheet, dan sumber resmi Sharp

✓ Branch `docs/admin-media-upload-contract-v1` dipromosikan ke `main` setelah approval eksplisit melalui PR #15
✓ Merge commit promotion: `11f3df8`

STATUS: ADMIN MEDIA UPLOAD CONTRACT SLICE A3 PROMOTED TO `main` — A4 REMAINS DECISION-GATED

==================================================

## GALLERY URL ASSISTANT — SLICE A2

✓ `ProductForm.jsx` kini memberi counter `n/8 gambar`, hint slot tersisa, dan feedback lokal ketika URL gallery kosong, tidak memakai `http/https`, duplikat, atau telah mencapai batas kontrak
✓ URL valid ditambahkan memakai state gallery dan handler form existing; urutan editorial serta aksi hapus existing dipertahankan
✓ Tidak ada perubahan pada payload, validator, route, service, Context, API, backend, database, schema, persistence, auth JWT, upload, storage, WebP, ataupun endpoint media

VALIDATION: `git diff --check` + `npx vite build` PASSED; uji desktop menolak protokol tidak valid/duplikat dan menerima URL HTTPS tanpa submit; mobile 390 px tanpa horizontal overflow

✓ Branch `feat/admin-gallery-url-assistant-v1` dipromosikan ke `main` setelah approval eksplisit melalui PR #13
✓ Merge commit promotion: `4adaba4`

STATUS: GALLERY URL ASSISTANT SLICE A2 PROMOTED TO `main`

==================================================

## PRODUCT COMPLETENESS CUES — SLICE A1

✓ `ProductForm.jsx` sekarang menampilkan ringkasan kelengkapan visual `0–4 siap` untuk nama produk, harga, link affiliate, dan gambar utama agar admin mengetahui prioritas field sebelum menyimpan
✓ `ProductTable.jsx` memakai `Badge` foundation yang sama untuk memperlihatkan status Published/Draft di metadata daftar mobile saat kolom status desktop disembunyikan
✓ Cue dihitung dari state form dan data produk yang sudah ada; state, handler, payload, validator, route, service, Context, API, backend, database, schema, persistence, dan auth JWT dipertahankan
✓ Tidak ada field, endpoint, upload, storage, WebP, campaign, artikel, atau perubahan flow simpan yang ditambahkan

VALIDATION: `git diff --check` + `npx vite build` PASSED; ringkasan merespons input nama tanpa submit dan console preview tidak mencatat error atau warning

✓ Branch `feat/admin-product-completeness-cues-v1` dipromosikan ke `main` setelah approval eksplisit melalui PR #11
✓ Merge commit promotion: `4a23c6b`

STATUS: PRODUCT COMPLETENESS CUES SLICE A1 PROMOTED TO `main`

==================================================

## ADMIN PRODUCT FORM MOBILE RHYTHM — SLICE 4

✓ `ProductForm.jsx` memperjelas hierarchy langkah, lebar baca, spacing berbasis token, dan ritme action form untuk layar mobile tanpa mengubah alur kerja admin
✓ Indicator langkah, heading, dan action row tetap memakai primitive foundation yang ada; tidak ada primitive visual baru atau pola navigasi baru yang ditambahkan
✓ State, handler, payload, route, service, Context, upload service, persistence, API, backend, database, schema, dan auth JWT dipertahankan

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules); Step 1–3 desktop diperiksa pada preview lokal terautentikasi; mobile Step 1 serta urutan semantik diperiksa tanpa membuat, mengubah, atau menghapus produk

✓ Branch `polish/admin-product-form-mobile-rhythm-v1` dipromosikan ke `main` setelah approval eksplisit melalui PR #8
✓ Merge commit promotion: `6b56897`

STATUS: ADMIN PRODUCT FORM MOBILE RHYTHM SLICE 4 PROMOTED TO `main`

==================================================

## PRODUCT DETAIL DECISION RHYTHM — SLICE 3

✓ `ProductDetail.jsx` memperjelas orientasi gallery, ringkasan harga format Rupiah, serta pengungkapan diskon tanpa mengubah data produk
✓ Badge rating, terjual, dan stok hanya dirender bila nilai nyata tersedia; panel alasan kurasi juga kondisional agar tidak membuat klaim atau placeholder rekaan
✓ CTA affiliate mobile berada setelah hierarchy keputusan dan sticky pada threshold baca yang aman; desktop mempertahankan action statis dalam komposisi dua kolom
✓ Tidak ada perubahan pada `useProducts`, route `/product/:slug`, callback/link affiliate, Context, service, API, backend, database, schema, checkout, offer, atau auth JWT

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules); mobile 375×812 tanpa horizontal overflow; desktop 1280×720 mempertahankan komposisi dua kolom

✓ Branch `polish/product-detail-decision-rhythm-v1` dipromosikan ke `main` setelah approval eksplisit melalui PR #6
✓ Merge commit promotion: `94fd8c1`

STATUS: PRODUCT DETAIL DECISION RHYTHM SLICE 3 PROMOTED TO `main`

==================================================

## DISCOVER HERO RHYTHM — SLICE 2

✓ `CampaignBanner.jsx` mempertahankan mobile one-column flow dan memakai komposisi copy-kiri/visual-kanan pada desktop
✓ Hierarki CTA diringankan: action utama tetap Button hijau, sedangkan action sekunder menjadi quiet outline tanpa mengganti copy atau destination
✓ Manfaat ditata sebagai scan path vertikal desktop; asset visual dan disclosure marketplace dipertahankan tanpa data atau logo rekaan
✓ Tidak ada perubahan pada `discoverCampaign`, `onAction`, `secondaryCtaHref`, asset, alt, section ID, route, search/filter logic, API, backend, database, auth JWT, Railway, atau deployment

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules); mobile 375 px tanpa overflow; desktop 1280 px memakai komposisi dua kolom

✓ Branch `polish/discover-hero-rhythm-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `fb65112`

STATUS: DISCOVER HERO RHYTHM SLICE 2 PROMOTED TO `main`

==================================================

FRONTEND FOUNDATION
==================================================

✓ `src/components/ui/Button.jsx` dikunci sebagai authority visual tunggal; `common/Button.jsx` menjadi compatibility wrapper
✓ `Container`, `IconButton`, dan `Badge` diselaraskan ke semantic tokens dan motion tokens
✓ `Input`, `FormField`, `Card`, dan `Dialog` ditambahkan sebagai primitive reusable lintas public/admin
✓ `/admin/login` menjadi proof-of-system pertama untuk `Input`, `FormField`, dan `ui/Button`
✓ `ConfirmDialog` memakai `Dialog` dan `ui/Button` tanpa mengubah callback delete atau auth flow
✓ Dialog memiliki Escape, click-outside, focus return, body lock, semantic labeling, dan reduced-motion-compatible surface motion
✓ `SelectField` dan `CheckboxField` ditambahkan sebagai primitive form reusable lintas public/admin
✓ `CategoryForm` dimigrasikan ke `Container`, `Card`, `Input`, `FormField`, `SelectField`, `CheckboxField`, dan `ui/Button` tanpa mengubah payload, service, auth, atau redirect
✓ `SelectField` menggunakan satu kontrak reusable berbasis `options` array; CategoryForm mempertahankan kepadatan field admin melalui `size="md"`

VALIDATION: `git diff --check` + `npx vite build` PASSED (1841 modules)

==================================================
PUBLIC PAGE MIGRATION
==================================================

✓ `CategoryPage.jsx` memakai `Section`, `SectionHeading`, `Card`, `SearchInput`, `SelectField`, dan Discover `ProductCard`
✓ State filter, query params `room`/`category`, sorting, loading/error state, dan destination `/product/:slug` dipertahankan
✓ `SelectField.jsx` memakai kontrak reusable berbasis `options` array, semantic tokens, accessible labeling, helper/error state, dan reduced-motion-safe transition
✓ Tidak ada perubahan pada auth JWT, service/context/API, backend, database, atau route contract

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: CATEGORY PAGE FOUNDATION MIGRATION REVIEW

==================================================
INTEGRATION CHECKPOINT
==================================================

✓ CategoryPage dan CategoryForm sudah dipromosikan ke `main` setelah review branch terpisah
✓ Konflik `SelectField` diselesaikan dengan satu authority options-array untuk public dan admin
✓ `category-form-preview-audit.md` dipertahankan sebagai catatan review route protected dan browser verification
✓ Merge validation: `git diff --check` + `npx vite build` PASSED (1843 modules)

STATUS: FOUNDATION SLICES INTEGRATED — PRODUCTION PUSH COMPLETED

==================================================

## PRODUCT DETAIL FOUNDATION SLICE

✓ `ProductDetail.jsx` memakai `Section`, `Card`, `Badge`, `Button`, `SectionHeading`, dan Discover `ProductCard`
✓ Raw surface, badge, CTA, dan legacy related-product card diganti dengan foundation/token composition
✓ Gallery thumbnail mempertahankan selection state dan ditambah accessible pressed state
✓ Loading, error, dan not-found state memakai surface foundation tanpa mengubah route atau data contract
✓ Affiliate link, target external, `useProducts`, `useParams`, related-product filter, serta route `/product/:slug` dipertahankan
✓ Tidak ada perubahan pada auth JWT, service/context/API contract, backend, database, compare endpoint, atau favorite state baru

VALIDATION: `git diff --check` + JSX parser + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT DETAIL FOUNDATION SLICE PROMOTED TO `main` — PRODUCTION ROUTE VERIFIED

==================================================

## PRODUCT DETAIL PRODUCTION PROMOTION

✓ ProductDetail foundation di-merge ke `main` melalui merge commit `e3adb58`
✓ `origin/main` berhasil dipush dan route `/product/rak-bumbu-dapur` berhasil dimuat di production
✓ Loading state lalu loaded state berhasil diverifikasi pada route ProductDetail
✓ Production screenshot mencatat observasi asset image utama yang tampak blank pada capture; tidak diperbaiki di luar scope promotion dan menunggu audit asset/runtime terpisah bila reproducible

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules); production route LOAD PASSED

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 1

✓ ProductForm shell memakai `Container`, `Card`, `IconButton`, `Badge`, dan `ui/Button`
✓ Field Step 1 memakai `Input`, `FormField`, dan `SelectField` dengan kontrak `options` array
✓ Step navigation, state, handler, payload, service, context, auth, route, dan backend dipertahankan
✓ Contract audit mencatat `tags`, `gallery`, dan `status` sebagai gap persistence existing; tidak ada perubahan backend/schema pada slice ini

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT FORM FOUNDATION STEP 1 READY FOR REVIEW ON `feat/admin-product-form-foundation-v1`

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 2 HARGA & STOK

✓ Field `price`, `originalPrice`, `rating`, `sold`, `stock`, dan `affiliateLink` memakai `FormField` dan `Input`
✓ Ringkasan diskon otomatis memakai `Card` muted dan semantic foundation tokens
✓ Name field, value binding, `handleChange`, kalkulasi diskon, native validation, dan payload dipertahankan
✓ Tidak ada field varian produk, endpoint baru, perubahan backend/schema, auth, route, atau service contract

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT FORM FOUNDATION STEP 2 READY FOR REVIEW ON `feat/admin-product-form-foundation-v1`

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 3 GALLERY & PREVIEW

✓ URL gambar utama memakai `FormField` dan `Input` dengan type URL serta helper text
✓ Preview gambar utama memakai `Card` muted/default dan mempertahankan `imageError` fallback
✓ Gallery memakai `Card`, `Badge`, `Button`, dan `IconButton` dengan label hapus aksesibel
✓ State `image`, `gallery`, `newGalleryUrl`, handler tambah/hapus, fallback image, dan payload dipertahankan
✓ Tidak ada upload service, gallery schema, backend persistence, varian produk, atau perubahan auth/route/service contract

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT FORM FOUNDATION STEP 3 READY FOR REVIEW ON `feat/admin-product-form-gallery-v1`

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 4 DETAILS

✓ Primitive baru `TextareaField.jsx` dibuat sebagai foundation untuk label, hint/error, required, invalid, size, focus, token, dan reduced motion
✓ Field `description`, `features`, `specifications`, `whyWeRecommend`, `bestFor`, dan `considerations` memakai `TextareaField` dalam komposisi `Card`
✓ Name field, value binding, `handleChange`, rows, placeholder, payload, service, auth, route, dan backend dipertahankan
✓ Varian produk dan upload service tidak diimplementasikan karena belum memiliki state, payload, schema, endpoint, dan acceptance criteria aktif

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/admin-product-form-details-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Scope tetap terbatas pada Details dan primitive `TextareaField`; varian produk serta upload service tidak masuk

STATUS: PRODUCT FORM FOUNDATION STEP 4 DETAILS PROMOTED TO `main` VIA MERGE COMMIT `4c46bd0`

==================================================

## PRODUCT TABLE FOUNDATION SLICE

✓ `ProductTable.jsx` memakai `CheckboxField`, `Badge`, dan `IconButton`; harga memakai format rupiah; stok dan status memakai badge semantic (primary saat stok ada, danger saat habis, neutral untuk draft)
✓ Edit memakai `Link` wrapper dengan `IconButton` berlabel aksesibel; hapus memakai `IconButton` ghost dengan hover danger
✓ `Products.jsx` memakai `Button`, `SearchInput`, dan `SelectField` dengan label resmi untuk filter kategori
✓ State filter, bulk delete, `ConfirmDialog`, `useProducts`, `useToast`, route, payload, auth JWT, service, dan backend dipertahankan tanpa perubahan
✓ Review visual di dev server dengan data produksi: tabel merender produk nyata, filter kategori berfungsi, dan search/filter foundation tampil sesuai kiblat

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/admin-product-table-foundation-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Tidak ada perubahan pada auth JWT, service/context/API contract, backend, database, atau varian produk dan upload service

STATUS: PRODUCT TABLE FOUNDATION SLICE PROMOTED TO `main` VIA MERGE COMMIT `0c27b67`

==================================================

## ADMIN SIDEBAR ACTIVE OUTLINE FIX

✓ Active `NavLink` tidak lagi memakai outline default yang dapat terlihat sebagai double outline saat fokus
✓ Keyboard focus tetap terlihat melalui focus ring hijau berbasis token dengan offset terhadap surface Sidebar
✓ Radius, transition duration, easing, dan reduced-motion behavior mengikuti token foundation
✓ Tidak ada perubahan pada route, menu, logout, auth JWT, layout, atau navigation behavior

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

STATUS: ADMIN SIDEBAR ACTIVE OUTLINE FIX PROMOTED TO `main` VIA MERGE COMMIT `bb41b73`

==================================================

## ADMIN CATEGORIES LISTING FOUNDATION

✓ Halaman Categories admin memakai `Button` untuk CTA tambah kategori
✓ Listing table memakai surface, border, shadow, spacing, typography, dan hover token foundation
✓ Status Aktif/Nonaktif memakai `Badge` reusable
✓ Action edit/hapus memakai `IconButton` dengan label aksesibilitas dan destination edit nyata
✓ Loading/error state memakai surface dan semantic color token
✓ CategoryContext, categoryService, ConfirmDialog, toast, CRUD behavior, route, auth JWT, dan backend tetap dipertahankan

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules); preview berhasil memuat 6 kategori nyata

STATUS: ADMIN CATEGORIES LISTING FOUNDATION PROMOTED TO `main` VIA MERGE COMMIT `0a11f39`

==================================================

## PRODUCT STATUS PERSISTENCE — PR-1

✓ Migration idempotent menambahkan `products.status` dengan enum kontrak `published` atau `draft`
✓ Row lama dan produk baru memakai default `published`; update mempertahankan status lama ketika field tidak dikirim
✓ Validator, sanitizer, parser, model, controller, initializer, dan seed lokal diperbarui tanpa menyentuh auth JWT
✓ Product response sekarang membawa nilai status yang sudah dipersistenkan; PR-1 belum mengubah visibility endpoint publik
✓ Scope guard tetap aktif: tags, gallery, upload service, product_offers, search, dan public visibility filtering tidak masuk slice ini

VALIDATION: `git diff --check` + backend syntax check + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-status-persistence-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `377e22d`

STATUS: PRODUCT STATUS PERSISTENCE PR-1 PROMOTED TO `main`

==================================================

## PRODUCT STATUS READ-BACK VERIFICATION — PR-1.5

✓ ProductForm menunggu response create/update dari backend sebelum menampilkan toast sukses atau melakukan navigasi kembali ke daftar
✓ ProductContext mengembalikan row persisted dari service dan meneruskan error agar kegagalan status invalid tidak menjadi sukses palsu
✓ Opsi status FE diselaraskan dengan enum contract `published`/`draft`; opsi `hidden` dihapus
✓ ProductTable tetap memakai `product.status` dari ProductContext tanpa hardcoded fallback lokal
✓ Tidak ada perubahan pada auth JWT, endpoint, schema, tags, gallery, upload service, product_offers, search, atau visibility publik

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-status-readback-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `170a1c1`

STATUS: PRODUCT STATUS READ-BACK PR-1.5 PROMOTED TO `main`

==================================================

## PRODUCT TAGS PERSISTENCE — PR-2

✓ Migration idempotent menambahkan `products.tags` dengan default `[]` untuk row legacy
✓ Tags dinormalisasi dengan trim, penghapusan item kosong, deduplikasi case-insensitive, dan ejaan item pertama dipertahankan
✓ Validator memberlakukan maksimal 12 tag per produk dan maksimal 40 karakter per tag
✓ Controller, model, parser, dan seed lokal sudah meneruskan tags sebagai JSON array tanpa mengubah route atau auth
✓ ProductForm dan ProductContext yang sudah dipromosikan sebelumnya langsung meneruskan serta membaca kembali tags melalui alur resmi
✓ Tags hanya dipersistenkan; search, filter, SEO, public visibility, upload, gallery, dan product_offers tetap di luar scope

VALIDATION: migration/parser/model round-trip smoke test + backend syntax check + `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-tags-persistence-v1` dipromosikan ke `main` melalui merge commit `c81fa03`

STATUS: PRODUCT TAGS PERSISTENCE PR-2 PROMOTED TO `main`

==================================================

## PRODUCT GALLERY URL PERSISTENCE — PR-3

✓ Migration idempotent menambahkan `products.gallery` dengan default `[]` dan menormalkan nilai legacy kosong menjadi `[]`
✓ Gallery menerima array maksimal 8 URL absolut `http://` atau `https://`; sanitizer hanya melakukan trim dan mempertahankan urutan editorial
✓ Controller, model, parser, initializer, dan seed lokal meneruskan gallery sebagai JSON array tanpa mengubah route, auth JWT, atau response helper
✓ POST tanpa gallery menyimpan `[]`; PUT tanpa gallery mempertahankan nilai gallery yang tersimpan; response GET/POST/PUT selalu memberi array bersih
✓ `image` tetap gambar utama; tidak ada upload, object storage, WebP, multipart, endpoint media, search, public visibility, atau `product_offers`
✓ ProductForm dan ProductDetail tidak membutuhkan patch karena payload dan read-back gallery sudah tersedia sebelum PR-3

VALIDATION: migration/model/parser/validator/controller smoke test + backend syntax check + `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-gallery-persistence-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `1088246`
✓ Tidak ada migration production Railway atau write verification yang dijalankan pada promotion ini; keduanya tetap menunggu runbook dan recovery procedure terpisah

STATUS: PRODUCT GALLERY URL PERSISTENCE PR-3 PROMOTED TO `main`

==================================================

## DISCOVER PRODUCT CARD RHYTHM — SLICE 1

✓ `ProductCard.jsx` merapikan hierarchy badge, kategori, nama, rating, harga, dan CTA tanpa mengubah props, route detail, favorite flow, API, backend, atau data produk
✓ Harga numerik dirender sebagai format Rupiah; placeholder `— review` dan `Data katalog` tidak lagi muncul bila data nyata tidak tersedia
✓ CTA detail tetap memiliki destination, target sentuh, dan focus ring yang sama, dengan bobot visual yang lebih tenang terhadap harga dan badge kurasi
✓ Browser review membuktikan tidak ada document overflow pada 375 px; empat card desktop tampil seimbang pada 1280 px

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `polish/discover-product-card-rhythm-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `ee5d889`
✓ Tidak ada perubahan backend, auth JWT, database, API, Railway, atau konfigurasi deployment

STATUS: DISCOVER PRODUCT CARD RHYTHM SLICE 1 PROMOTED TO `main`

==================================================

## v1.5.0 — Discover Filter Surface + Global Panel Motion

Release Date: 2026-08-15

==================================================
FRONTEND POLISH
==================================================

✓ FilterPanel mengikuti pola mockup Search & Filter: surface putih, hierarki bernomor, border tipis, dan kontrol native yang tetap accessible
✓ FilterPanel tetap presentational; callback dan state business tidak berubah
✓ MobileNavDrawer dirampingkan ke `min(80vw, 320px)` dengan padding mobile yang lebih compact
✓ Utility `.np-motion-surface` reusable untuk panel dan drawer dengan transform/opacity, token motion, dan reduced-motion support
✓ Overlay dan drawer menggunakan state `data-motion-state` agar transisi muncul/hilang konsisten

STATUS: DISCOVER MOBILE POLISH REVIEW

==================================================

## v1.4.0 — FE JWT Login + Logout

Release Date: 2026-08-14

==================================================
FRONTEND
==================================================

✓ AuthContext (token, login, logout, isAuthenticated)
✓ authService: POST /auth/login + saveToken / removeToken
✓ api.js: Authorization Bearer otomatis jika token ada
✓ /admin/login (Login.jsx)
✓ ProtectedRoute → redirect ke /admin/login
✓ Logout di AdminLayout
✓ productService / categoryService lewat apiRequest (Bearer)
✓ AuthProvider di main.tsx
✓ Vercel Speed Insights (App.tsx)

==================================================
DEPLOY / OPS
==================================================

✓ Vercel: 1 project saja (duplikat dihapus)
✓ Railway: 1 project resmi (adventurous-perception)
  - Domain: ngepas-reborn-production-c3aa.up.railway.app
  - Volume: ngepas-reborn-volume → /app/data
✓ Duplikat Railway (lovely-encouragement) dihapus

==================================================
STATUS
==================================================

SPRINT 6.5 FE COMPLETED
(Auth end-to-end: BE JWT + FE login/logout + Bearer write)

==================================================
NEXT
==================================================

□ Polish UI halaman /admin/login (masih minimal)
□ GET /api/products/:slug
□ Search / featured / pagination
□ Validasi kurasi wajib di admin form
□ CORS ketat + rate limit write
□ Polish UI mobile (Mockup A)
□ Upload image
□ product_offers multi-marketplace (Phase 3)

==================================================

## v1.3.0 — JWT Login (Backend)

Release Date: 2026-08-08

✓ Tabel users (init.js)
✓ userModel.getUserByEmail
✓ POST /api/auth/login (bcrypt + JWT 1d)
✓ authMiddleware: Bearer JWT dulu, fallback x-api-key
✓ seed admin (ADMIN_EMAIL + ADMIN_PASSWORD)
✓ package: bcryptjs, jsonwebtoken
✓ Production: JWT_SECRET + seed + login 200 + token

STATUS: SPRINT 6.5 BE COMPLETED

==================================================

## v1.2.0 — Auth Foundation (API Key)

Release Date: 2026-08-06

✓ authMiddleware x-api-key
✓ POST/PUT/DELETE products + categories diproteksi
✓ FE Service kirim x-api-key (VITE_ADMIN_API_KEY) — diganti Bearer di v1.4.0

STATUS: SPRINT 6.0 + 6.1 COMPLETED

==================================================

## v1.0.0 — Foundation Live

Release Date: 2026-08-06

✓ Railway + Vercel + Volume + better-sqlite3
✓ CRUD Product + Category
✓ Service layer + Context + Admin

==================================================

## v0.9.0

Release Date: 2026-08-03

✓ Admin Category CRUD + bug form

==================================================
END
==================================================
