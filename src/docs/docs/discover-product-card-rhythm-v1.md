# Discover Product Card Rhythm v1

**Branch:** `polish/discover-product-card-rhythm-v1`  
**Status:** Implemented locally; pending final validation and founder review.  
**Scope:** Visual-only `ProductCard.jsx` patch. Tidak ada route, callback favorite, data source, context, API, backend, atau autentikasi yang diubah.

## Perubahan visual

| Area | Perilaku setelah patch |
|---|---|
| Harga | Harga numerik dirender sebagai mata uang Rupiah lokal, misalnya `Rp 129.000`, tanpa mengubah nilai sumber. |
| Review count | Placeholder `— review` tidak lagi tampil. Jumlah review hanya muncul bila nilai data nyata tersedia. |
| Marketplace | Placeholder `Data katalog` tidak lagi tampil sebagai marketplace. Nama marketplace nyata tetap ditampilkan. |
| CTA detail | CTA tetap menuju route yang sama dengan target sentuh dan focus ring yang terjaga, tetapi memperoleh treatment outline/quiet agar tidak mengalahkan harga dan badge. |
| Hierarki | Badge kurasi dan favorite tetap overlay gambar; kategori, nama, rating, harga, lalu CTA memiliki ritme vertikal yang lebih terpisah. |

## Observasi preview lokal

- Preview lokal pada `http://localhost:5174/` berhasil memuat Discover setelah patch.
- Verifikasi markup menunjukkan kartu tidak lagi merender placeholder review atau marketplace; harga tampil dalam format Rupiah.
- Browser pengujian pada viewport `375 × 812` berhasil memuat halaman Discover untuk review responsif.
- Pada `375 px`, lebar dokumen tetap `375 px` tanpa overflow horizontal halaman. Dua card pertama berlebar `160 px` pada posisi `16 px` dan `192 px`; card berikutnya tetap berada dalam track horizontal Discover yang memang dapat digeser.
- Pada `1280 px`, lebar dokumen tetap `1280 px` tanpa overflow. Empat card utama berlebar `276 px` dan mengisi grid dari `64 px` sampai `1216 px` secara seimbang.
- Console browser mencatat error pada `ProductContext.jsx:36` dan `CategoryContext.jsx:42`. Error tersebut mengarah ke konteks data yang membutuhkan backend lokal dan sudah muncul pada preview, bukan pada `ProductCard.jsx`; Slice 1 tidak menambah error Product Card baru.

## Guardrail

Tidak ada data testimoni, review count, rating, atau marketplace yang dibuat untuk mendukung tampilan. Validasi akhir tetap mencakup `git diff --check`, `npx vite build`, review browser mobile-desktop, serta approval founder sebelum promotion.

— Manus AI
