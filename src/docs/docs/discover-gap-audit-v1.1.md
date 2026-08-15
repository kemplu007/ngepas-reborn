# Audit Gap Discover terhadap Mockup Step 6.1.0

Tanggal: 2026-08-15.

## Kesimpulan

Live Discover sudah memiliki alur dasar, tetapi belum mengikuti komposisi mockup resmi secara dekat. Perbedaan terbesar bukan pada warna utama, melainkan pada **kepadatan informasi, urutan section, struktur card, navigasi mobile, dan penggunaan aset visual**.

## Gap prioritas

| Area | Mockup resmi | Live saat ini | Prioritas |
|---|---|---|---|
| Header mobile | Logo berada di tengah, menu kiri, notifikasi kanan, search menjadi baris fokus kedua | Logo dan menu berada dalam satu row desktop-like; search ikut memadat di row yang sama pada ukuran kecil | P0 |
| Header desktop | Search terpusat, icon navigation outline, kategori icon row langsung di bawah header | Struktur sudah ada, tetapi belum punya category navigation row sebagai bagian header | P1 |
| Hero | Copy ringkas, tiga benefit, visual produk nyata yang lebih dominan, dua CTA | Copy sudah dekat, tetapi visual masih berupa ilustrasi abstrak dan hero terasa seperti blok landing page generik | P0 |
| Urutan Discover | Header, search, hero, kategori, Pilihan Ngepas, Trending, Artikel & Tips, Why Ngepas, footer | Header, hero, kategori, Pilihan Ngepas, Cara Kerja, Why Ngepas, footer | P0 |
| Product card | Card lebih padat: gambar, badge, favorite, rating + count, harga, marketplace, CTA | Card menampilkan informasi dasar tetapi belum sedekat card referensi dan belum ada count/marketplace yang konsisten | P0 |
| Trending | Section produk horizontal tersendiri | Belum ada | P1 |
| Artikel & Tips | Section editorial horizontal dengan tiga card | Belum ada | P1 |
| Why Ngepas | Feature/value cards memakai icon outline dan label pendek | Ada, tetapi masih berupa tiga card teks generik | P1 |
| Footer | Footer multi-column pada desktop dan ringkas pada mobile | Footer ringkas saja | P2 |
| Mobile bottom nav | Home, Cari, Kategori, Compare, Akun dengan icon outline | Ada label text, tetapi belum mengikuti hierarki icon/reference dengan rapat | P1 |

## Batas patch

Patch pertama hanya memperbaiki frontend Discover dan aset yang sudah tersedia. Tidak menambah endpoint, akun publik, product_offers, checkout, auth, atau database. Data demo hanya dipakai sebagai fallback ketika API belum menyediakan field yang diperlukan.

## Hasil preview alignment

Preview lokal pada `http://localhost:5173/` berhasil merender header dua baris mobile-friendly, rail kategori desktop, hero dengan foto produk nyata, product card yang lebih padat, Trending Minggu Ini, Artikel & Tips, Cara Kerja, Why Ngepas, footer, dan bottom navigation lima item. Search `lampu` tetap berfungsi dan menyisakan Lampu Tidur Minimalis pada Pilihan Ngepas. Build Vite dan diff check berhasil.

Catatan visual: struktur dan density sudah lebih dekat dengan mockup Step 6.1.0 daripada production sebelumnya. Data demo masih menampilkan `reviewCount` dan `marketplace` fallback sebagai `—` dan `Data katalog` ketika backend belum menyediakan field tersebut; ini sengaja tidak ditutup dengan data fiktif.

## Hasil regression Product Detail

Dari hasil search `lampu`, klik `Lihat Detail` berhasil membuka `/discover/lampu-tidur-minimalis`. Product Detail tetap merender gambar, badge, kategori, judul, rating, harga, CTA compare, favorite, alasan rekomendasi, spesifikasi, cocok untuk, dan catatan bahwa checkout terjadi di marketplace.

## Hasil regression filter

Homepage alignment berhasil kembali dari Product Detail. Tombol Filter di header membuka panel filter lokal yang menampilkan pilihan kategori, rating minimum, dan Reset filter. Tidak ada endpoint baru yang dipanggil untuk interaksi ini.
