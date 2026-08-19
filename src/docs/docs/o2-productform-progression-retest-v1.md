# O2 — ProductForm Progression Retest v1

**Tanggal operasi:** 19 Agustus 2026  
**Jenis:** evidence produksi read-only + triage dokumentasi  
**Linear:** [KEM-59 — ProductForm progression write guard audit](https://linear.app/kemplu/issue/KEM-59/o2-productform-progression-write-guard-audit)  
**Scope:** mengamati kembali navigasi Draft existing dari langkah dasar sampai langkah kurasi untuk menguji friction O1 setelah KEM-58 dipromosikan.  
**Non-scope:** tidak ada patch runtime, perubahan API/auth/backend, schema atau migration SQLite, upload/storage/WebP, billing, dependency, konfigurasi deploy, maupun publish Draft.

---

## 1. Tujuan dan pagar operasi

O1 mencatat dua friction terpisah: state sesi stale pada halaman admin dan perpindahan form setelah galeri. KEM-58 menangani evidence pertama di sisi client. O2 hanya menguji ulang jalur form menggunakan Draft IKEA MALM yang sudah ada, tanpa mengisi field, menambah gallery, menekan `Simpan perubahan`, `Publish`, atau `Hapus`.

> Draft IKEA MALM tetap merupakan data operasi nyata. Retest tidak memberikan persetujuan baru untuk mengubah atau memublikasikan produk tersebut.

---

## 2. Evidence observasi

| Tahap | Hasil teramati | Batas kepastian |
| --- | --- | --- |
| Daftar admin | `/admin/products` menyelesaikan loading menjadi lima produk tanpa `Unauthorized`. | Membuktikan sesi pada retest ini sehat; bukan klaim bahwa semua kondisi sesi sudah tercakup. |
| Draft existing | Produk ID `15` tampil sebagai `Draft`, kategori `lemari`, dan readiness `4/4`. | Status Draft tidak diubah oleh retest. |
| Langkah 1 → 2 | Tombol `Lanjut` membuka Harga dan stok dengan affiliate source yang tetap termuat. | Tidak ada input yang diedit. |
| Langkah 2 → 3 | Tombol `Lanjut` membuka Gambar dan preview; gambar utama CDN Shopee termuat dan gallery tetap `0/8`. | Tidak ada gambar gallery ditambah. |
| Langkah 3 → 4 | Tombol `Lanjut` membuka Detail dan kurasi, **tetapi toast menampilkan `Produk berhasil diperbarui`**. | Toast mengindikasikan potensi write; interaksi dihentikan langsung. |
| Readback admin | Endpoint admin terautentikasi mengembalikan HTTP `200`; Draft masih `draft`, URL affiliate dan gambar utama sumber tetap ada, sementara gallery serta field kurasi tetap kosong. | Readback melindungi field utama yang dicek, tetapi tidak menggantikan audit source/payload. |

---

## 3. Keputusan O2

Friction O1 berupa kembalinya operator dari galeri ke daftar **tidak terulang** pada retest ini: transisi visual mencapai Langkah 4. Namun toast pembaruan pada aksi yang diperlakukan operator sebagai navigasi mengubah fokus evidence menjadi **write-boundary ambiguity**. Tidak aman menyimpulkan bahwa navigasi tidak melakukan persist hanya dari tampilan stepper.

Produk ID `15` tetap Draft. Tidak ada konten kurasi sintetis yang diisi, tidak ada save/publish/delete eksplisit, dan tidak ada retest tambahan setelah toast. KEM-59 dicatat sebagai backlog agar temuan tidak berubah menjadi patch UI spontan.

---

## 4. Kontrak follow-up KEM-59

KEM-59 hanya boleh dimulai sebagai slice terpisah setelah source audit membuktikan batas callback/submit yang mengarah ke API. Jika perbaikan memang diperlukan, kontrak minimalnya adalah:

1. Tombol transisi Langkah 1–3 tidak mengirim request persist kecuali aksi simpan eksplisit yang dapat dipahami operator.
2. `Simpan perubahan` tetap menjadi satu-satunya affordance write pada tahap akhir, dengan state loading/error yang jujur.
3. Test atau evidence manual membedakan navigasi no-write dari submit write menggunakan request trace atau assertion yang dapat direproduksi.
4. KEM-59 tidak mengubah JWT/backend auth, schema/data/migration, storage/media, billing, dependency besar, deployment config, atau status Published produk.

Sebelum kontrak tersebut dipenuhi, tidak ada perubahan flow, tidak ada publish IKEA MALM, dan tidak ada perluasan ke Article, banner/campaign, upload, atau media pipeline.

---

## 5. Validation record

| Check | Hasil |
| --- | --- |
| Retest admin setelah KEM-58 | Lulus untuk pemuatan daftar pada sesi ini; tidak ada `Unauthorized` stale. |
| Draft visibility | Tetap Draft; tidak dipublikasikan. |
| Form progression | Langkah 1 → 2 → 3 → 4 terlihat; no-return-to-list O1 tidak terulang. |
| Write safety | Tidak dapat dinyatakan lulus: toast pembaruan pada transisi Langkah 3 memerlukan audit source/payload. |
| Runtime/code change pada O2 | Tidak ada. |

---

**Authority:** `ngepas-core.md`, `o1-real-content-workflow-test-v1.md`, `admin-session-state-resilience-v1.md`, `api-contract.md`, dan [KEM-59](https://linear.app/kemplu/issue/KEM-59/o2-productform-progression-write-guard-audit).
