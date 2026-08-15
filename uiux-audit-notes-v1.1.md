# Audit UI/UX v1.1 — temuan awal

Tanggal: 2026-08-15.

Referensi yang ditinjau: `1000702639.jpg` sebagai design system utama dan `1000702670.jpg` sebagai Hero / Value Proposition.

## Temuan design system

Ngepas memakai kanvas putih dengan hierarki hijau sebagai warna utama, aksen kuning dalam porsi terbatas, garis tipis, shadow ringan, radius bertingkat, dan icon outline. Logo Ngepas memakai wordmark hijau dengan titik kuning. Typography pada referensi adalah Inter; hierarchy yang terlihat mencakup heading besar tebal, heading section medium, body regular, body small, dan caption.

Komponen dasar yang harus dipakai ulang dalam prototype adalah tombol primary hijau, tombol secondary outline, tombol accent kuning, input search dengan state default/focused/filled/disabled, badge seperti Pilihan Ngepas/Baru/Diskon, product card, category card, feature/value card, rating, header desktop, header mobile, dan bottom navigation mobile.

## Temuan Hero

Flow Hero Discover harus menjawab nilai Ngepas dengan cepat. Struktur utama terdiri dari headline “Cari barang bagus itu susah. Biar Ngepas yang pilihin.”, subheadline tentang kurasi/perbandingan produk, tiga benefit, CTA utama “Mulai Cari Sekarang”, CTA sekunder “Cara Kerja Ngepas”, visual produk relevan, dan trust strip marketplace. Mobile memakai satu kolom; desktop memakai hero dua kolom dengan visual di kanan.

Header mobile menempatkan menu di kiri, logo di tengah, dan notifikasi di kanan. Header desktop menempatkan logo, search besar di tengah, lalu Compare, Notifikasi, dan Akun. Visual hero memakai komposisi produk elektronik dengan aksen titik kuning dan bentuk hijau muda; visual dapat divariasikan berdasarkan kategori tanpa mengganti grammar visual.

## Konsekuensi untuk wireframe dan prototype

Wireframe harus memisahkan struktur informasi dari dekorasi. Prototype pertama sebaiknya menguji alur Header → Hero → Kategori Populer → Pilihan Ngepas → Product Detail CTA, dengan state default, search focus, filter aktif, empty, loading, error, favorite, dan compare minimal yang bisa dicoba. Tidak boleh menambahkan checkout atau marketplace offer nyata sebelum datanya tersedia.


## Temuan Header dan Search / Filter

Header mobile memakai satu baris dengan menu hamburger di kiri, logo di tengah, notifikasi dan akun di kanan, lalu search bar di bawah. Header desktop menempatkan logo di kiri, search bar di tengah, dan Compare, Notifikasi, serta Akun di kanan. State yang harus dapat ditunjukkan pada prototype adalah default, search focus, menu open, notification open, dan account menu open.

Search / Filter mobile dimulai dari back, logo, dan notifikasi, lalu query/search bar, riwayat pencarian, kategori horizontal, harga, rating, lokasi/toko, urutan, serta CTA hijau untuk menampilkan hasil. Desktop memakai breadcrumb, judul hasil, chip filter aktif, panel filter di kiri, grid produk di kanan, sorting, dan penghitung jumlah hasil. State minimum: default, filter aktif, empty result, loading, dan hasil normal. Filter harus membantu keputusan dan tetap ringkas; tidak boleh membuat interface menjadi panel yang terlalu padat.


## Temuan Kategori dan Pilihan Ngepas

Kategori Populer pada mobile berupa horizontal scroll dengan icon outline, label singkat, dan state active yang diberi garis atau aksen hijau; desktop memakai grid beberapa kolom. Section memiliki judul, CTA Lihat Semua, dan helper card yang menjelaskan manfaat menjelajahi kategori. Wireframe tidak boleh menampilkan terlalu banyak kategori sekaligus di mobile.

Pilihan Ngepas berisi judul, subjudul singkat, chip tab seperti Pilihan Ngepas/Terbaru/Promo/kategori, filter, dan product card horizontal di mobile atau grid di desktop. Card wajib menampilkan badge kurasi, favorite, gambar produk, nama, rating, harga, marketplace, serta CTA Lihat Detail. Section juga menampilkan trust strip bahwa produk dibandingkan dari beberapa marketplace. State yang harus dicontohkan adalah default, hover desktop, loading, favorite, dan unavailable/stock terbatas.


## Temuan Product Detail dan Compare

Product Detail harus menjadi jembatan keputusan, bukan halaman checkout. Mobile menampilkan breadcrumb ringkas, gambar produk, badge Pilihan Ngepas, judul, rating, harga, waktu update, CTA Bandingkan Marketplace, favorite, alasan pemilihan, accordion spesifikasi/kelebihan-kekurangan/cocok untuk, review, produk terkait, dan sticky CTA. Desktop memakai hero dua kolom serta panel trust dan informasi marketplace.

Compare menerima dua atau tiga produk dan menampilkan chip produk terpilih, tabel parameter, rating, harga terbaik, garansi, fitur, Best Value, serta penawaran marketplace. Action marketplace hanya berupa Buka menuju marketplace; checkout tetap terjadi di luar Ngepas. Pada prototype vertical slice, cukup siapkan navigasi dan struktur menuju Product Detail; data offer marketplace nyata tetap di luar scope.

## Prototype Discover v1.1 — Uji 15 Agustus 2026

- Route preview berhasil dirender di `/prototype/discover` tanpa header legacy ganda setelah route dipindahkan keluar dari `MainLayout`.
- Header, Hero, Kategori Populer, Pilihan Ngepas, trust strip, Cara Kerja, dan Why Ngepas tampil sesuai alur wireframe.
- Search query `lampu` berhasil menyaring katalog lokal dan menampilkan hasil untuk Lampu Tidur Minimalis.
- Ikon filter header sempat hanya mengirim query; diperbaiki agar membuka panel filter dan scroll ke section hasil. Panel menyediakan kategori, rating minimum sebagai placeholder UI, dan reset filter.
- Klik `Lihat Detail` berhasil membuka `/prototype/discover/lampu-tidur-minimalis` dengan foto, harga, alasan rekomendasi, spesifikasi, cocok untuk, catatan affiliate, CTA compare, dan favorite.
- `npx vite build` berhasil. `npm run build` masih terblokir oleh 19 error TS7016 baseline karena repo mencampur entry `.tsx` dengan modul `.jsx/.js`; bukan error syntax prototype.
- Console browser mencatat `Failed to fetch` dari ProductContext dan CategoryContext karena backend API lokal belum dijalankan. Prototype tetap menampilkan fallback catalog untuk kebutuhan preview, tanpa perubahan backend.
- Tidak ada perubahan pada `main`; route prototype dan komponen baru tetap berada di branch kerja prototype.

Kesimpulan: vertical slice visual dapat direview, dengan satu blocker lingkungan yang diketahui: backend lokal belum aktif saat preview.

---

## Production verification — 2026-08-15

Setelah PR #2 di-merge ke `main`, Vercel membuat deployment production READY dari commit merge `25a68bd84b39a7d2d49cc05c1ce04a3d917798f8`. Domain `https://ngepas-reborn.vercel.app/` merender title `Ngepas — Kurasi yang membantu keputusan`, homepage Discover v1.1, empat product card, footer disclosure affiliate, dan link internal `/discover/:slug`.

Route `https://ngepas-reborn.vercel.app/discover/lampu-tidur-minimalis` berhasil dibuka dari card homepage. Product Detail menampilkan badge Pilihan Ngepas, rating, harga, pembaruan harga, alasan pemilihan, spesifikasi, cocok untuk, catatan affiliate, dan CTA Bandingkan Marketplace. Backend dan auth admin tidak diubah.
