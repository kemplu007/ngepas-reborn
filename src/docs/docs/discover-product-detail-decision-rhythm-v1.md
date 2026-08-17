# Product Detail Decision Rhythm — Slice 3

**Status:** Approved for audit and implementation planning; belum siap promotion.
**Scope:** Polish presentasional untuk `ProductDetail` dan bila diperlukan komposisi feature-local yang sudah ada. Tidak mengubah props, Context, service, API, schema gallery, route, checkout, offer, atau auth.

> **Tujuan:** Membuat pengguna dapat memindai bukti produk, sinyal keputusan, alasan kurasi, dan action affiliate dalam urutan yang lebih tenang—tanpa membuat Ngepas terasa seperti marketplace atau checkout.

## Hierarki dari mockup resmi

Mockup [Step 6.3 Product Detail](../assets/uiux-v1.1/additional/step-6-3-product-detail.jpg) menentukan pola berikut.

| Area | Mobile | Desktop | Kontrak Slice 3 |
|---|---|---|---|
| Gallery | Gambar utama dengan thumbnail ringkas berada sebelum informasi utama. | Thumbnail vertikal di kiri gambar utama. | Gallery yang sudah ada diperlakukan sebagai bukti keputusan. Tidak ada upload, transformasi gambar, atau fallback asset baru. |
| Informasi keputusan | Badge → judul → rating → harga → tanggal pembaruan tampil dekat gallery. | Informasi utama berada di kolom kanan gallery. | Harga dan signal ketersediaan tetap kuat; tidak menciptakan rating, review, stok, maupun diskon bila data tidak tersedia. |
| CTA | Action utama dan favorite mudah dijangkau setelah informasi utama; sticky CTA di bawah viewport. | CTA affiliate dan favorite berdekatan, tidak bersaing dengan block alasan. | CTA tetap menuju marketplace sesuai flow sekarang dan menjelaskan perpindahan keluar. Tidak ada checkout Ngepas. |
| Alasan kurasi | “Kenapa Kami Memilih Produk Ini” muncul dekat CTA, sebelum detail panjang. | Block alasan tampil sebagai panel ringkas di kolom pendukung. | Alasan yang tersedia diposisikan sebagai bukti kurasi; tidak ditambah copy atau data rekaan. |
| Detail lanjutan | Spesifikasi, plus-minus, cocok untuk, review, dan related hadir setelah keputusan utama. | Navigasi detail berada setelah hero utama. | Slice 3 tidak mengubah isi, route, maupun state block lanjutan. |

## Guardrail kesiapan gallery

`gallery` sudah persisten di codebase, tetapi migration production dan write verification Railway masih ditahan sampai recovery procedure aman tersedia. Slice visual ini hanya boleh menangani **gallery yang sudah diberikan oleh response existing**, dengan fallback main image yang sudah ada. Tidak ada migration, upload, production write test, atau data seed baru.

## Baseline production yang diamati

Product Detail publik pada [https://ngepas-reborn.vercel.app/product/rak-bumbu-dapur](https://ngepas-reborn.vercel.app/product/rak-bumbu-dapur) dapat dimuat setelah state loading. Pada viewport desktop, layout sudah dua kolom: gallery utama di kiri dan informasi keputusan di kanan. Gambar utama tampak memakai fallback visual karena asset source tidak tersedia di browser saat audit; Slice 3 tidak memperbaiki asset atau menambah fallback baru.

Urutan data yang teramati adalah breadcrumb → badge kategori → judul/deskripsi → harga lama/harga utama/diskon → rating/terjual/stok → alasan kurasi → CTA marketplace → detail lanjutan. Urutan ini sesuai semantic flow dan tetap dipertahankan. Perbaikan Slice 3 hanya akan memperjelas pemisahan cluster gallery, meta keputusan, alasan kurasi, serta sticky action; tidak memperbaiki loading produk, asset pipeline, ataupun source data production.

## Kontrak implementasi yang diusulkan

1. Desktop (`lg` atau breakpoint token yang telah dipakai) menguatkan cluster gallery–informasi melalui layout dua kolom tanpa mengganti urutan DOM atau data flow.
2. Mobile mempertahankan urutan gallery → badge/meta → title → price → alasan kurasi → detail; sticky affiliate CTA tetap ada dan mudah dijangkau.
3. Jika gallery kosong, Product Detail tetap memakai main image dan tidak menampilkan control gallery palsu.
4. Jika rating, review count, marketplace, harga lama, atau discount kosong, UI tidak boleh membuat nilai pengganti yang tampak seperti data nyata.
5. Action favorite, compare, dan affiliate mempertahankan callback, target, href, serta feedback existing.
6. Semua visual memakai token `np` existing, focus state, icon Lucide yang sudah ada, dan reduced-motion safe.
7. Maksimum 2–3 file kode untuk slice ini; dokumentasi slice masuk commit review.

## Acceptance criteria

| Kriteria | Bukti selesai |
|---|---|
| Hierarki keputusan lebih jelas | Gallery, harga/meta, alasan kurasi, dan CTA memiliki scan path yang terlihat tanpa section baru. |
| Kontrak data tetap | Tidak ada perubahan pada ProductContext, service, API, server, schema, atau payload. |
| Empty data jujur | Gallery kosong fallback ke main image; meta kosong tidak diganti placeholder yang terlihat seperti data. |
| CTA aman | Affiliate CTA tetap memiliki destination nyata dan tetap membedakan Ngepas dari checkout. |
| Responsif dan aksesibel | Review 375 px dan 1280 px; focus state, keyboard behavior, dan motion existing tidak rusak. |
| Validasi | `git diff --check` dan `npx vite build` lulus sebelum review founder. |

## Keputusan patch Slice 3

| Cluster | Perubahan presentasional | Alasan | Batas tegas |
|---|---|---|---|
| Gallery | Menambahkan label posisi gambar ketika memang ada lebih dari satu gambar; memperkuat surface gallery dan thumbnail selected state yang sudah ada. | Gallery berubah dari visual tunggal menjadi bukti keputusan ketika data URL tersedia. | Tidak ada control bila gallery kosong, tidak ada lightbox, carousel, upload, atau transformasi asset. |
| Harga dan meta | Format angka price/original price sebagai Rupiah bila nilai numerik; rendering rating, terjual, dan stok hanya bila data nyata tersedia. | Menghilangkan scan friction dan mencegah placeholder data palsu. | Tidak menghitung discount baru, tidak menambah review count, dan tidak mengubah source produk. |
| Alasan kurasi | Memberi eyebrow kecil dan memperjelas panel sebagai rangkuman editorial sebelum CTA. | Menegaskan keunikan Ngepas dibanding halaman checkout. | Tidak menambah alasan atau copy produk baru. |
| Affiliate CTA | Membungkus sticky mobile CTA dalam surface tipis; desktop kembali menjadi action biasa. | Action mudah dijangkau di mobile tanpa menutupi informasi atau terasa sebagai checkout internal. | Label, href, target, rel, callback, dan behavior click tidak berubah. |

Patch maksimal berada pada `ProductDetail.jsx` dan dokumen ini. Tidak ada perubahan `ProductContext`, route, server, token global, maupun komponen shared.

## Catatan verifikasi data read-only

Baseline production memuat produk dari `https://ngepas-reborn-production-c3aa.up.railway.app/api/products`. Endpoint tersebut hanya dipakai sebagai `VITE_API_URL` pada preview lokal agar review visual Slice 3 memakai data produk yang sama dengan layar production; tidak ada request POST, PUT, DELETE, migration, atau write verification yang dilakukan.

## Observasi preview desktop awal

Preview lokal dengan data produk read-only berhasil memuat `Rak Bumbu Dapur`. Pada lebar desktop, visual utama berada di kolom kiri dan hierarchy keputusan berada di kolom kanan: kategori → nama → ringkasan harga → rating/terjual/stok → panel Pilihan Ngepas → CTA affiliate. Produk ini tidak memiliki gallery URL, sehingga tidak ada control gallery tambahan yang tampil; hal tersebut sesuai kontrak graceful fallback Slice 3.

## Status review mobile

Browser pengujian telah dibuka pada route yang sama dan diatur ke viewport `375 × 812`. Pemeriksaan snapshot, screenshot, overflow horizontal, serta posisi sticky CTA akan dipakai sebagai bukti visual sebelum branch masuk review.

Screenshot full-page dan snapshot aksesibilitas pada viewport mobile telah direkam. Hasil pemuatan mencatat satu error console existing yang perlu diidentifikasi terpisah; belum ada warning dan belum ada bukti error baru yang mengarah ke `ProductDetail.jsx`.

Review visual menemukan bahwa penerapan awal `position: sticky` dengan `bottom` memindahkan CTA ke area baca sebelum posisinya di alur DOM, sehingga CTA bertabrakan dengan pembuka panel harga pada `375 px`. Remediasi pertama dengan action bar `fixed` menghindari overlap awal, tetapi secara tidak perlu menutupi konten saat pengguna melanjutkan ke detail lanjutan.

Implementasi akhir memakai CTA `sticky` dengan **threshold `top` setara tepi bawah viewport**, dan tetap berada dalam alur DOM sesudah panel alasan kurasi. Berbeda dari `bottom`, threshold ini tidak menarik CTA ke area baca pada awal halaman; CTA baru menempel ketika pengguna telah tiba di action setelah harga dan alasan. Pada desktop CTA tetap static seperti kontrak Slice 3.

Catatan validasi: screenshot **full-page** browser dapat merepresentasikan elemen `sticky` sebagai layer yang sedang menempel, bukan posisi awalnya dalam flow. Bukti akhir CTA mobile harus memakai screenshot viewport biasa serta snapshot posisi elemen, bukan screenshot full-page saja.

Validasi viewport awal `375 × 812` pasca-threshold selesai: gallery, breadcrumb, label kategori, judul, dan deskripsi muncul tanpa overflow horizontal; pembuka panel **Ringkasan harga** tetap terbaca pada bagian bawah viewport, sedangkan CTA belum tampil sebelum posisinya setelah alasan kurasi tercapai. Ini mengonfirmasi CTA tidak lagi menutupi hierarchy keputusan awal.

Viewport browser pengujian kemudian diubah ke `1280 × 720` dan screenshot desktop direkam untuk mengonfirmasi layout dua kolom serta reset CTA ke action statis pada breakpoint `lg`.

Hasil desktop menampilkan gallery di kolom kiri dan informasi keputusan di kolom kanan; Ringkasan harga, badge meta nyata, serta panel Pilihan Ngepas tetap tersusun tanpa overlap. Console hanya mengandung error baseline React tentang duplicate key `/category` pada navigasi, bukan error dari `ProductDetail.jsx`; tidak ada warning tercatat.

Pemeriksaan terukur pada `375 × 812` mengembalikan `documentScrollWidth: 375` untuk `viewportWidth: 375`, sehingga tidak ada horizontal overflow. Panel harga berada pada koordinat awal `786.28 px`, CTA berada pada `1285.28 px`, dan pemeriksaan DOM mengonfirmasi CTA muncul setelah harga. Hasil ini melengkapi bukti visual mobile bahwa action tidak lagi menutup area keputusan awal.

## Referensi internal

[1]: `src/docs/assets/uiux-v1.1/additional/step-6-3-product-detail.jpg` — Mockup Step 6.3 Product Detail.
[2]: `src/docs/docs/uiux-system-v1.1.md` — Flow, CTA affiliate, dan batas implementasi Product Detail.
[3]: `src/docs/docs/product-persistence-contract-v1.md` — Contract persistence gallery dan scope guard.
[4]: `src/styles/tokens.css` — Authority visual dan motion.

— Manus AI
