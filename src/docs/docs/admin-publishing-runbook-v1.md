<!--
NGEPAS REBORN
Document : Admin Publishing Runbook v1
Purpose  : SOP mobile-first, tanpa biaya, untuk menerbitkan katalog produk secara mandiri memakai kemampuan admin yang sudah tersedia.
-->

# Admin Publishing Runbook v1

## Status

| Field | Nilai |
| --- | --- |
| Status | Draf operasional F0; siap divalidasi dan diajukan untuk review pada branch `docs/admin-publishing-runbook-v1`. |
| Tujuan | Membuat proses input produk dapat dijalankan mandiri dari ponsel tanpa menunggu upload native, WebP, storage baru, atau bantuan developer. |
| Permukaan | `/admin/products`, `/admin/products/new`, dan `/admin/products/:id/edit`. |
| Biaya baru | Tidak ada. |

> Runbook ini menjelaskan cara memakai produk yang ada saat ini. Ia **bukan** fitur baru, tidak mengubah aturan affiliate, dan tidak menggantikan pengecekan sumber informasi oleh admin.

## Prinsip kerja F0

1. **Draft lebih aman daripada tebakan.** Produk baru secara awal menunjukkan status `Published`; bila informasi atau sumber belum siap, ubah ke `Draft` pada Langkah 1 sebelum menekan simpan.
2. **Hanya tulis yang bisa dicek.** Harga, stok, rating, jumlah terjual, spesifikasi, dan klaim produk tidak boleh dikarang. Jika ragu, kosongkan, gunakan nilai yang benar dari sumber, atau simpan sebagai draft sambil mencari kepastian.
3. **Gunakan gambar yang berhak dipakai.** Jalur nol biaya memakai URL `https://` atau `http://` yang sudah tersedia. Admin hanya memakai gambar milik sendiri atau yang memang diizinkan untuk dipakai.
4. **Bantu orang mengambil keputusan.** Isi alasan rekomendasi dan pertimbangan dengan bahasa sederhana serta jujur; jangan hanya menyalin promosi toko.
5. **Satu produk selesai lebih baik daripada banyak produk setengah jadi.** Fokus pada katalog yang dapat dipercaya dan bisa dipelihara.

## Persiapan sebelum membuka admin

| Yang disiapkan | Minimum yang dibutuhkan | Catatan nol biaya |
| --- | --- | --- |
| Sumber produk | Halaman produk marketplace/sumber rekomendasi yang dapat dibuka kembali | Simpan URL sumber untuk mengecek ulang harga dan ketersediaan. |
| Link affiliate | URL affiliate yang benar dari sumber rekomendasi | Jangan publish jika link belum siap atau tidak bisa dibuka. |
| Gambar utama | Satu URL gambar `http/https` yang diizinkan untuk dipakai | Sistem belum menerima upload file dan belum mengubah gambar menjadi WebP. |
| Galeri pendukung | Opsional, maksimal 8 URL gambar `http/https` berbeda | Gunakan hanya gambar yang membantu menjelaskan produk; bukan sekadar memenuhi kuota. |
| Catatan kurasi | Siapa yang cocok, alasan rekomendasi, serta batas/pertimbangan produk | Tulis dari pemeriksaan sumber, bukan asumsi. |

## Alur penerbitan dari ponsel

### 1. Mulai dari daftar produk

1. Buka **Admin → Produk**.
2. Ketuk **Tambah Produk**.
3. Gunakan daftar produk untuk mencari kembali produk yang sudah dibuat melalui nama atau kategori.
4. Jangan memakai aksi hapus massal sebagai cara merapikan draft. Hapus bersifat destruktif dan aplikasi menampilkan konfirmasi karena tindakan ini tidak dapat dibatalkan.

### 2. Langkah 1 dari 4 — Info dasar

| Isi | Cara aman |
| --- | --- |
| Nama produk | Tulis nama yang mudah dicari dan sesuai sumber; slug dibuat otomatis. |
| Ruangan dan kategori | Pilih ruangan dulu, lalu kategori yang relevan akan tersedia. |
| Status produk | Pilih **Draft** bila masih mengumpulkan bukti atau ingin meninjau ulang. Pilih **Published** hanya setelah checklist akhir terpenuhi. |
| Badge | Opsional. Gunakan hanya bila klaimnya masuk akal dan dapat dipertanggungjawabkan; tidak wajib untuk semua produk. |
| Tags | Boleh dipakai sebagai catatan input, tetapi jangan mengandalkan tags sebagai hasil publik karena persistence tags masih dicatat sebagai gap existing. |

### 3. Langkah 2 dari 4 — Harga dan tautan affiliate

1. Isi **Harga** dari sumber yang baru dicek.
2. Isi **Harga asli** hanya jika benar-benar ada harga pembanding yang jelas. Diskon dihitung otomatis; jangan membuat harga pembanding fiktif.
3. Isi rating, terjual, dan stok hanya jika nilainya dapat diperiksa dari sumber. Jangan mengarang angka sosial sebagai pemanis katalog.
4. Tempel **Affiliate link** yang benar. Buka kembali link tersebut sebelum publish untuk memastikan ia menuju produk yang tepat.

> Cue kesiapan katalog menghitung **nama produk, harga, link affiliate, dan gambar utama**. Target minimum sebelum review adalah `4/4 siap`; cue ini membantu membaca kesiapan, tetapi tidak mengubah status atau menyimpan produk otomatis.

### 4. Langkah 3 dari 4 — Gambar utama dan gallery URL

1. Tempel URL gambar utama `http/https`.
2. Pastikan preview gambar terlihat wajar, bukan placeholder error atau gambar produk yang salah.
3. Untuk gambar pendukung, tempel satu URL di input gallery lalu ketuk **Tambah gambar**.
4. Counter menunjukkan jumlah gambar dan slot tersisa. Sistem lokal menolak URL kosong, protokol selain `http/https`, URL duplikat, serta gallery lebih dari **8** gambar.
5. Ketuk ikon hapus pada thumbnail jika gambar salah atau sudah tidak relevan.

> Asisten gallery membantu format URL, **bukan** memeriksa izin penggunaan gambar, keaktifan file jarak jauh, atau kualitas konten. Admin tetap memeriksa preview sebelum menyimpan.

### 5. Langkah 4 dari 4 — Detail dan kurasi

Gunakan format di bawah agar pembaca mendapat alasan yang cukup untuk menilai produk.

| Field | Cara mengisi yang ringkas dan jujur |
| --- | --- |
| Deskripsi produk | Satu sampai dua kalimat tentang fungsi dan konteks utama produk. |
| Keunggulan produk | Satu keunggulan per baris; tulis manfaat yang memang didukung sumber. |
| Spesifikasi produk | Satu pasangan `Nama: Nilai` per baris, misalnya `Material: Kayu pinus`. |
| Kenapa kami merekomendasikan | Tulis alasan Ngepas memilihnya: nilai guna, kecocokan, atau trade-off yang masuk akal. |
| Cocok untuk | Satu tipe ruang, kebutuhan, atau pengguna per baris. |
| Hal yang perlu diperhatikan | Satu keterbatasan nyata per baris, misalnya ukuran, perakitan, atau perawatan. |

### 6. Simpan, cek, lalu publish

1. Baca kembali ringkasan **Kesiapan katalog**: nama, harga, link affiliate, dan gambar utama harus `4/4 siap`.
2. Bila masih ada yang belum pasti, kembali ke Langkah 1, pilih status **Draft**, lalu ketuk **Simpan produk**.
3. Bila semua informasi telah dicek, pilih status **Published** dan ketuk **Simpan produk**.
4. Simpan menjalankan create/update yang langsung menuju daftar produk. Tidak ada autosave, antrean review tersembunyi, atau publish terpisah.
5. Di daftar produk, gunakan pencarian atau filter kategori untuk menemukan produk. Badge **Published/Draft** juga tetap tersedia pada metadata daftar mobile.
6. Jika ada harga, gambar, atau link yang berubah, buka aksi edit pada produk, perbarui informasi, lalu simpan kembali.

## Checklist sebelum status Published

- [ ] Nama, ruangan, dan kategori sesuai produk.
- [ ] Harga serta harga pembanding—jika ada—sudah dicek dari sumber.
- [ ] Affiliate link membuka produk yang tepat.
- [ ] Cue kesiapan katalog menunjukkan `4/4 siap`.
- [ ] Gambar utama tampil benar dan admin berhak memakai gambar tersebut.
- [ ] Gallery—jika ada—berisi URL valid, berbeda, dan relevan; tidak lebih dari 8 gambar.
- [ ] Deskripsi, keunggulan, dan spesifikasi tidak menyalin klaim yang tidak bisa dicek.
- [ ] Alasan rekomendasi, kecocokan, serta pertimbangan membuat pembaca lebih mudah memutuskan—termasuk kekurangannya.
- [ ] Status dipilih sengaja: `Draft` untuk belum siap, `Published` untuk siap tampil.

## Jika ada masalah

| Gejala | Tindakan yang tersedia sekarang |
| --- | --- |
| Link affiliate belum pasti | Simpan sebagai Draft atau jangan simpan dulu; periksa sumber sampai URL benar. |
| Gambar tidak tampil | Ganti dengan URL `http/https` yang benar dan periksa lagi preview-nya. Tidak ada upload file dari form saat ini. |
| URL gallery ditolak | Periksa apakah kosong, bukan `http/https`, sama dengan gambar lain, atau gallery sudah 8 gambar. |
| Harga atau detail berubah | Edit produk dari daftar, cek ulang sumber, lalu simpan perubahan. |
| Tidak yakin produk layak direkomendasikan | Tetap Draft. Jangan memaksa Published hanya demi menambah jumlah katalog. |

## Scorecard mingguan manual — 15 menit

Gunakan catatan ponsel atau spreadsheet apa pun yang sudah tersedia. Tidak perlu aplikasi, analytics, atau layanan baru.

| Minggu | Draft baru | Published baru | Link sudah dicek | Gambar perlu diganti | Produk perlu diperbarui | Catatan hambatan berikutnya |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `YYYY-MM-DD` |  |  |  |  |  |  |

Tujuan scorecard bukan mengejar angka kosong. Ia membantu membedakan tiga masalah sebelum kita membangun fitur: apakah admin kesulitan **mengisi konten**, apakah sumber/affiliate link sering berubah, atau apakah pelanggan belum menemukan katalog.

## Batas F0 dan langkah setelahnya

| Area | Keputusan |
| --- | --- |
| Upload file, WebP, object storage, billing, provider, secret, scheduler | Dibekukan dalam **Zero-Cost Media Runway** sampai kebutuhan nyata dan approval biaya terpisah tersedia. |
| Auth JWT, API, backend, schema, persistence, payload, route | Tidak berubah. |
| A5 banner dan A6 artikel | Ditahan agar tim membuktikan ritme katalog dan keputusan pembeli terlebih dahulu. |
| Slice potensial berikutnya | F1 — **Product decision-quality cues**, visual-only dan hanya memakai field kurasi yang sudah ada, setelah runbook ini dipakai/review. |

## Acceptance criteria F0

- [x] Pengelola konten dapat menyelesaikan alur tambah, draft, simpan, edit, dan publish dari ponsel tanpa asumsi fitur yang belum ada.
- [x] Runbook membedakan cue kesiapan dari validasi server dan tidak menganggap ada autosave atau antrean review.
- [x] Jalur gambar menggunakan URL existing `http/https` dengan batas gallery 8 dan tanpa biaya/infrastruktur baru.
- [x] Ada checklist kualitas serta scorecard manual yang dapat dipakai tanpa analytics atau layanan baru.
- [x] Guardrail Core, A3, dan Zero-Cost Media Runway dipertahankan.

## Review yang diminta

Review difokuskan pada apakah setiap instruksi dapat dipahami dari layar ponsel oleh pengelola konten nonteknis, apakah bahasa Draft/Published tidak membingungkan, dan apakah checklist menerapkan kejujuran informasi tanpa menambah pekerjaan yang tidak diperlukan.
