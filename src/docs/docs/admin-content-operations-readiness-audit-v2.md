<!--
NGEPAS REBORN
Document : Admin Content Operations Readiness Audit v2
Purpose  : Memperbarui fakta operasi konten admin setelah KEM-36, KEM-50,
           dan Article Content ADR v1 dipromosikan; tidak mengubah runtime.
-->

# Admin Content Operations Readiness Audit v2

**Status:** Review-ready · docs-only  
**Baseline:** `main@00d431b` setelah Article Content ADR v1  
**Scope:** Memetakan kemampuan operator yang benar-benar aktif, mengunci urutan kerja konten, dan memperbaiki checkpoint dokumentasi yang tertinggal setelah promotion. Tidak ada perubahan aplikasi atau data.

> **Keputusan utama:** operasi katalog nyata merupakan langkah berikutnya. Bukan UI baru, bukan CMS, bukan upload, dan bukan WebP pipeline. Admin sudah dapat mengelola produk dan kategori dengan kemampuan cukup untuk mengisi katalog; bukti pemakaian nyata harus datang sebelum fitur baru dipertimbangkan.

## 1. Evidence inventory

| Surface | Evidence runtime | Keputusan |
| --- | --- | --- |
| Route admin | `src/config/admin/routes.js` hanya mendeklarasikan dashboard, daftar/form produk, serta daftar/form kategori. Tidak ada route campaign, media library, upload, atau article admin. | **Keep.** Jangan menambah menu atau route baru secara asumtif. |
| Form produk | `ProductForm.jsx` memiliki wizard empat tahap, status Draft/Published, checklist kesiapan, validasi kurasi Published, input URL gambar utama, gallery URL, preview, serta batas delapan item gallery. | **Keep.** A1 dan A2 pada audit v1 telah tersedia sebagai capability existing. |
| Readiness | `productReadiness.js` hanya memvalidasi bentuk URL `http/https` untuk gambar utama dan affiliate; ia tidak mengklaim URL eksternal hidup. | **Keep.** Tetap sinyal read-only, bukan pemeriksa media atau publish engine. |
| Daftar produk | `Products.jsx` menyediakan pencarian nama/kategori, filter kategori, edit, hapus, dan bulk delete dengan konfirmasi. Tidak ada bulk publish, content-health scan, duplicate flow, atau media health check. | **Keep.** Operasi katalog dasar cukup untuk uji konten nyata. |
| Konten publik non-katalog | `Discover.jsx` tetap memiliki `discoverCampaign` dan `editorialCards` statis. Article Content ADR v1 telah mengunci kontrak sebelum implementasi, tetapi belum membuat route atau persistence. | **Defer.** Campaign dan Article bukan capability admin aktif. |

## 2. Urutan kerja yang dikunci

| Urutan | Pekerjaan | Mengapa sekarang | Batas |
| --- | --- | --- | --- |
| O1 | Uji workflow konten nyata dengan minimal 12 produk Published berkualitas. | Membuktikan apakah form, checklist, gallery URL, dan informasi kurasi benar-benar cukup untuk operator. | Operasi data oleh admin; tidak ada perubahan kode atau data contoh/rekaan oleh AI. |
| O2 | Catat friction yang dapat direproduksi dari O1. | Hanya masalah nyata yang dapat menjadi kandidat slice kecil berikutnya. | Satu masalah, satu kontrak, satu branch. |
| O3 | Jika gambar URL menjadi hambatan yang berulang, buat kontrak media terpisah terlebih dahulu. | Upload/WebP memerlukan keputusan storage, keamanan, recovery, dan fallback. | Tidak ada endpoint, storage, multipart, atau transformasi dalam audit/UI polish. |
| O4 | Jika editorial menjadi kebutuhan nyata, gunakan Article Content ADR v1 sebagai precondition implementasi. | Route, model, lifecycle, dan acceptance criteria sudah dibedakan dari Product. | Tidak ada reuse `ProductForm`, `ProductContext`, atau gallery product sebagai CMS artikel. |

## 3. Dokumentasi promotion yang dikoreksi

Audit menemukan label `Review-ready` KEM-50 dan Article Content ADR masih tersisa pada source dokumentasi walaupun keduanya telah dipromosikan. `changelog.md` dan `ngepas-core.md` diperbarui untuk menjadikan `main@00d431b`, PR #44, serta PR #45 sebagai checkpoint yang terbaca lintas sesi. Koreksi ini tidak mengubah keputusan historis per-slice; ia hanya mengembalikan konsistensi antara commit `main` dan dokumentasi authority.

## 4. Guardrail

- Tidak mengubah JWT, `ProtectedRoute`, token browser, service, Context, API, validator, controller, model, schema SQLite, atau data produksi.
- Tidak membuat upload native, storage asset, WebP, file picker, multipart endpoint, billing, provider, migration, atau recovery workflow baru.
- Tidak membuat campaign/banner CRUD atau Article CRUD; keduanya tetap memerlukan slice kontrak dan evidence sendiri.
- Tidak menganggap validasi format URL sebagai pemeriksaan keterjangkauan, keamanan sumber, hak pakai, atau kualitas gambar.
- Tidak mempublikasikan, mengubah, atau menghapus produk sebagai bagian dari audit ini.

## 5. Acceptance criteria slice ini

1. Capability admin yang disebutkan dapat ditelusuri ke route, form, helper, atau list existing.
2. A1/A2 ditandai sebagai capability existing, bukan backlog implementasi ulang.
3. O1 dinyatakan sebagai langkah berikutnya dan tetap operasi konten, bukan perubahan runtime.
4. `ngepas-core.md` dan `changelog.md` tidak lagi menampilkan KEM-50 atau Article Content ADR sebagai review-ready setelah promotion yang telah terjadi.
5. Diff hanya menyentuh Markdown; `git diff --check`, `npm run quality:check`, dan `npm run quality:contract-tests` lulus sebelum PR dibuka.

