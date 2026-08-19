# KEM-59 — ProductForm Write-Boundary Audit v1

**Tanggal audit:** 19 Agustus 2026
**Jenis:** source audit read-only; keputusan no-patch runtime
**Linear:** [KEM-59 — ProductForm progression write guard audit](https://linear.app/kemplu/issue/KEM-59/o2-productform-progression-write-guard-audit)
**Baseline:** `main@e1517d4`
**Scope:** menelusuri apakah navigasi wizard `ProductForm` dapat memicu persist produk tanpa aksi simpan eksplisit setelah evidence O2.
**Non-scope:** perubahan source runtime, request produksi tambahan, JWT/backend auth, API contract, schema/data/migration, media/storage/WebP, billing, dependency, deployment, dan publish Draft.

---

## 1. Pertanyaan audit

O2 menangkap toast **“Produk berhasil diperbarui”** setelah operator menggunakan `Lanjut` dari galeri ke kurasi pada Draft IKEA MALM. Interaksi dihentikan dan readback hanya memastikan status Draft serta field utama yang dicek tetap aman. Audit ini tidak menganggap toast sebagai bukti cukup bahwa `Lanjut` melakukan write; audit menelusuri callback sampai service untuk menguji klaim tersebut.

> Kesimpulan harus mengikuti jalur kode yang terverifikasi, bukan hanya tampilan stepper maupun label toast.

---

## 2. Trace boundary dari UI ke API

| Lapisan | Evidence source | Kesimpulan terikat |
| --- | --- | --- |
| Form | `ProductForm` merender `Card as="form"` dengan `onSubmit={handleSubmit}`. | Persist hanya dapat dimulai melalui event submit form. |
| Navigasi | `nextStep` hanya menjalankan `setCurrentStep((prev) => prev + 1)`; `prevStep` hanya menurunkan state step. | Kedua callback tidak membangun payload, memanggil context, service, maupun `navigate`. |
| Tombol | Jika step kurang dari 4, `Lanjut` dirender dengan `type="button"` dan `onClick={nextStep}`. Pada step 4, barulah `Simpan perubahan` dirender dengan `type="submit"`. | Aksi progres dan aksi persist dipisahkan secara eksplisit. |
| Primitive Button | `Button` menerima `type` dengan default `button` dan meneruskannya ke elemen native `<button type={type}>`. | Prop `type="button"` pada `Lanjut` tidak hilang di level foundation. |
| Primitive Card | `Card` meneruskan `onSubmit` dan props lain ke elemen yang dipilih melalui `as`. | `Card as="form"` tidak menambahkan callback persist tersembunyi. |
| Handler submit | Hanya `handleSubmit` yang memanggil `updateProduct` saat edit atau `addProduct` saat create, lalu menampilkan toast sukses. | Toast **“Produk berhasil diperbarui”** hanya dapat berasal dari cabang `handleSubmit` pada source saat ini. |
| Context dan service | `ProductContext.updateProduct` memanggil `productService.updateProduct`; service mengirim `PUT /products/:id`. | Request write admin terikat pada pemanggilan `updateProduct`, bukan pada `nextStep`. |

---

## 3. Diagnosis

Source `main@e1517d4` **tidak menunjukkan jalur** dari `Lanjut` ke `handleSubmit`, `updateProduct`, `addProduct`, ataupun `PUT /products/:id`. Kontrak browser untuk tombol navigasi juga eksplisit `type="button"`, sehingga tombol tersebut seharusnya tidak men-submit form native.

Dengan demikian, evidence O2 tidak cukup untuk menyatakan ada defect runtime pada navigation boundary saat ini. Toast yang terekam tetap merupakan observasi valid, tetapi tidak dapat diatribusikan ke callback `nextStep` tanpa trace request yang membuktikan `PUT`, `POST`, atau submit dari DOM saat kejadian. Audit tidak menemukan perubahan kode yang aman dan perlu dibuat sekarang.

Tidak ada patch runtime dibuat. Keputusan ini menghindari dua risiko: menambah guard UI yang duplikatif terhadap kontrak tombol yang sudah benar, atau mengubah workflow admin yang bekerja berdasarkan satu observasi yang belum memiliki request trace.

---

## 4. Keputusan dan re-open trigger

KEM-59 **selesai sebagai audit no-patch**. Produk IKEA MALM tetap Draft; O2 tidak memberi izin publish ataupun perubahan konten.

Ticket baru hanya dibuka jika salah satu evidence berikut tersedia pada build yang dapat diidentifikasi:

1. Network trace memperlihatkan `PUT /api/products/:id` atau `POST /api/products` setelah klik pada tombol dengan teks `Lanjut` dan `type="button"`.
2. Reproduksi terkontrol membuktikan `handleSubmit` dijalankan tanpa `Simpan perubahan` atau tanpa event submit yang disengaja.
3. Commit baru mengubah `nextStep`, markup tombol, `Button`, `Card`, atau jalur context/service sehingga trace di atas tidak lagi berlaku.

Jika re-open trigger tercapai, slice baru wajib memulai dari contract test atau harness yang membedakan navigasi no-write dan submit write. Slice tersebut tidak boleh menyentuh JWT/backend auth, schema/migration, storage/media, billing, atau publish produk tanpa kontrak baru.

---

## 5. Validation record

| Check | Hasil |
| --- | --- |
| Audit Core/API dan O2 | Scope dan guardrail konsisten; tidak ada endpoint atau media feature baru. |
| Trace `nextStep` / `prevStep` | Hanya mengubah `currentStep`. |
| Tipe tombol `Lanjut` | `button`, diteruskan oleh primitive foundation. |
| Trace write | `handleSubmit` → `updateProduct`/`addProduct` → product service `PUT`/`POST`. |
| Keputusan runtime | No-patch; tidak ada source aplikasi yang diubah. |

---

**Authority:** `ngepas-core.md`, `api-contract.md`, `o2-productform-progression-retest-v1.md`, `ProductForm.jsx`, `Button.jsx`, `Card.jsx`, `ProductContext.jsx`, `productService.js`, dan [KEM-59](https://linear.app/kemplu/issue/KEM-59/o2-productform-progression-write-guard-audit).
