# KEM-36 — Content Readiness Checklist v1

## Tujuan

Membantu admin melihat apakah **URL gambar publik** dan **URL affiliate** produk sudah memakai format `http://` atau `https://` yang dapat dipakai oleh surface publik. Slice ini adalah sinyal read-only; bukan sistem upload, pengecekan keterjangkauan URL, atau mekanisme publish baru.

## Scope

| Surface | Perubahan |
| --- | --- |
| `ProductForm` | Checklist Kesiapan katalog menganggap gambar utama dan link affiliate siap hanya bila format URL `http/https` valid. |
| `ProductTable` | Baris produk menampilkan badge kesiapan dan detail URL yang masih perlu dilengkapi pada desktop. Badge juga muncul pada metadata mobile. |
| `productReadiness.js` | Helper feature-level untuk menyamakan pemeriksaan format URL antara form dan tabel. |

## Kontrak yang Dipertahankan

- Tetap memakai data `adminProducts` dari `ProductContext`; tidak ada fetch baru atau perubahan endpoint.
- Tidak ada perubahan validator backend, JWT, schema SQLite, upload native, storage media, WebP pipeline, billing, payload, atau write flow.
- Validator Published KEM-17 untuk `whyWeRecommend` dan `bestFor` tetap menjadi otoritas tersendiri.
- `http/https` hanya membuktikan **format URL**, bukan bahwa target eksternal masih hidup atau dapat diakses.

## Acceptance Criteria

1. Form membedakan URL kosong/tidak valid dari URL `http/https` untuk gambar utama dan affiliate.
2. Tabel admin menampilkan status kesiapan tanpa mengubah aksi edit, hapus, filter, pilihan massal, atau route.
3. Produk Published yang belum lengkap memperoleh sinyal “Perlu dilengkapi”; Draft tetap mendapat sinyal konten tanpa diklaim sudah publik.
4. `npm run quality:check` dan `git diff --check` lulus sebelum PR dibuka.

## Evidence Validasi

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run quality:check` | Lulus: lint dan build Vite sukses. Peringatan bundle besar adalah baseline build existing dan tidak berubah oleh slice ini. |
| `git diff --check` | Lulus tanpa whitespace error. |
| Harness helper murni | Lulus 6 assertion: URL `http/https`, URL kosong, protokol `ftp`, produk lengkap, dan produk belum lengkap. Harness dihapus setelah pemeriksaan. |
