# Ngepas Reborn — Production Tags Migration Runbook v1

**Status:** READY FOR EXECUTION REVIEW — belum dijalankan di production
**Scope:** PR-2 Product Tags Persistence
**Target:** Railway service `ngepas-reborn` pada project `adventurous-perception`
**Database:** SQLite pada Railway Volume `ngepas-reborn-volume`
**DB path:** `/app/data/ngepas.db`
**Code commit:** `c81fa03` — `merge: promote product tags persistence`
**Tanggal penyusunan:** 2026-08-17

> Runbook ini hanya menyiapkan prosedur operasional. Tidak ada langkah pada dokumen ini yang boleh dijalankan terhadap database production sebelum backup terverifikasi dan approval eksekusi diberikan secara eksplisit.

## 1. Tujuan dan batas scope

Migration ini menambahkan kolom `products.tags` sebagai `TEXT NOT NULL DEFAULT '[]'` pada database SQLite existing. Initializer menjalankan migration saat backend start melalui `server/index.js` → `server/database/init.js`. Migration bersifat idempotent: pemeriksaan `PRAGMA table_info(products)` dilakukan sebelum `ALTER TABLE`, kemudian nilai `NULL` atau string kosong dinormalisasi menjadi `[]`.

Setelah migration, API membaca dan mengembalikan `tags` sebagai array JSON. PR-2 tidak mengubah auth JWT, endpoint, search/filter, SEO, public visibility, gallery, upload service, `product_offers`, atau data produk selain penambahan kolom dan normalisasi nilai kosong ke `[]`.

**Jangan menjalankan `server/seed.js` di production.** Seeder menghapus dan membuat ulang data sehingga bukan alat migration in-place.

## 2. Stop gates wajib

Eksekusi harus berhenti dan tidak boleh dilanjutkan apabila salah satu kondisi berikut terjadi:

| Stop gate | Alasan |
|---|---|
| Project, environment, service, atau volume tidak cocok | Mencegah perubahan ke resource yang salah |
| Deployment `c81fa03` belum tersedia atau belum berhasil | Runtime production belum membawa migration PR-2 |
| `DB_PATH` bukan `/app/data/ngepas.db` | Migration dapat berjalan pada file database yang salah |
| Backup manual belum selesai dan belum terlihat pada tab Backups | Tidak ada recovery point yang terverifikasi |
| Backup melewati limit atau Railway menampilkan error | Jangan mengakali backup dengan menghapus volume |
| Health endpoint atau deployment log gagal setelah restart | Aplikasi belum terbukti sehat |
| Row count berubah selain perubahan yang diharapkan | Perlakukan sebagai insiden dan jangan lanjutkan |

## 3. Preflight tanpa perubahan data

Lakukan pemeriksaan berikut dari Railway Dashboard menggunakan akun yang memang memiliki akses ke project production. Pastikan service yang dipilih adalah `ngepas-reborn`, environment production, dan volume yang terpasang bernama `ngepas-reborn-volume` dengan mount path `/app/data`.

Catat timestamp UTC, deployment aktif sebelum eksekusi, status service, dan URL backend. Simpan hasilnya dalam catatan eksekusi. Pastikan backend merespons endpoint publik yang sudah ada, misalnya `GET https://ngepas-reborn-production-c3aa.up.railway.app/api/products`, sebelum deployment baru dimulai.

Pastikan branch default/deployment source Railway akan mengambil commit `c81fa03` atau commit yang lebih baru dan hanya berisi perubahan PR-2 yang sudah dipromosikan. Jangan mengubah environment variable, volume mount, root directory, atau start command untuk menjalankan migration ini.

## 4. Backup Railway Volume

Pada service `ngepas-reborn`, buka pengaturan volume dan tab **Backups**. Buat **manual backup** sebelum deployment yang membawa migration PR-2. Railway mendukung backup manual dan backup terjadwal untuk isi volume, termasuk database SQLite. Setelah proses selesai, pastikan backup terlihat pada daftar backup dan catat timestamp/identifier yang ditampilkan Railway.

Backup manual memiliki batas ukuran berdasarkan kapasitas volume. Jika Railway menolak backup karena limit atau menampilkan keadaan yang tidak jelas, **berhenti**. Jangan menghapus volume, jangan menjalankan seed, dan jangan membuat volume pengganti tanpa keputusan recovery yang terpisah.

Backup harus tetap tersedia selama rollout dan verifikasi. Menghapus atau me-wipe volume dapat menghapus backup yang terkait, sehingga tindakan tersebut dilarang dalam runbook ini.

## 5. Pre-migration baseline

Sebelum deploy, catat baseline berikut dari Railway service shell/console apabila akses inspeksi tersedia. Bila console tidak tersedia pada akun atau plan, jangan menebak hasil query; simpan log deployment dan lakukan verifikasi endpoint setelah restart, lalu laporkan keterbatasannya.

```sql
PRAGMA table_info(products);
SELECT COUNT(*) AS product_rows FROM products;
SELECT COUNT(*) AS empty_or_null_tags
FROM products
WHERE tags IS NULL OR trim(tags) = '';
```

Untuk database lama, query pertama mungkin belum menampilkan kolom `tags`. Itu adalah kondisi yang diharapkan sebelum migration, bukan alasan untuk menjalankan `ALTER TABLE` manual. Migration resmi dijalankan oleh initializer ketika backend start.

## 6. Eksekusi migration melalui deployment

Migration dijalankan melalui jalur aplikasi resmi, bukan dari frontend dan bukan melalui perintah SQL manual yang dibuat di luar repository.

1. Pastikan backup manual sudah terverifikasi.
2. Deploy commit `c81fa03` ke service Railway sesuai workflow project yang sudah ada.
3. Tunggu deployment selesai dan jangan menganggap status build saja cukup; periksa runtime logs.
4. Pastikan log startup memuat `Database initialized successfully.` tanpa stack trace SQLite atau error `ALTER TABLE`.
5. Tunggu service kembali healthy. Volume yang terpasang dapat menyebabkan downtime singkat saat redeploy, sehingga lakukan pada waktu yang dapat dipantau.

Migration aman dijalankan ulang karena akan melewati `ALTER TABLE` jika kolom `tags` sudah ada dan hanya mengisi nilai kosong dengan default `[]`.

## 7. Post-migration sanity check

Setelah deployment sehat, ulangi pemeriksaan schema dan row count dari service shell/console bila tersedia:

```sql
PRAGMA table_info(products);
SELECT COUNT(*) AS product_rows FROM products;
SELECT COUNT(*) AS null_tags
FROM products
WHERE tags IS NULL;
SELECT COUNT(*) AS empty_tags
FROM products
WHERE trim(tags) = '';
```

Acceptance check:

| Check | Hasil yang diharapkan |
|---|---|
| `PRAGMA table_info(products)` | Kolom `tags` ada, bertipe `TEXT`, `notnull` aktif, default `[]` |
| `product_rows` | Sama dengan baseline sebelum migration |
| `null_tags` | `0` |
| `empty_tags` | `0` |
| Startup log | Database initialized tanpa error |

Migration tidak boleh mengubah jumlah row. Jika row count berbeda, hentikan rollout dan gunakan prosedur incident/recovery; jangan menjalankan seed sebagai usaha perbaikan.

## 8. Verifikasi endpoint dan round-trip

Lakukan verifikasi dari backend production setelah service healthy. Gunakan request read-only terlebih dahulu:

```bash
curl -i "https://ngepas-reborn-production-c3aa.up.railway.app/api/products"
```

Pastikan response sukses dan setiap product mengembalikan `tags` sebagai array, bukan string JSON. Untuk verifikasi write, gunakan satu produk yang memang aman untuk diedit dan lakukan hanya setelah admin JWT tersedia serta ada approval eksekusi write test. Payload harus memakai array tags, misalnya:

```json
{
  "tags": ["Dapur", "Minimalis"]
}
```

Setelah PUT berhasil, lakukan GET ulang, refresh halaman admin, dan pastikan nilai tetap sama. Jangan menguji dengan `server/seed.js`, jangan menghapus data, dan jangan mengubah produk yang sedang dipakai sebagai fixture penting tanpa catatan sebelum/sesudah.

## 9. Rollback dan recovery

PR-2 bersifat additive. Jika deployment code bermasalah tetapi database tetap sehat, rollback deployment Railway ke deployment terakhir yang sukses. Code lama tidak membaca kolom `tags`, sehingga kolom tambahan dapat tetap ada tanpa perlu `DROP COLUMN`.

Jika database atau volume menunjukkan kerusakan, data tidak konsisten, atau recovery point perlu dipulihkan, gunakan backup yang sudah dicatat pada langkah 4 melalui tab **Backups** Railway. Restore backup akan men-stage perubahan dan membutuhkan deploy/konfirmasi pada Railway; periksa detail staged change sebelum menerapkannya. Sadari bahwa restore mengembalikan keadaan data ke timestamp backup dan dapat menghilangkan perubahan write yang terjadi setelah backup tersebut.

**Jangan menjalankan `DROP COLUMN tags` sebagai rollback cepat.** Penghapusan kolom bukan bagian dari migration ini dan dapat menambah risiko pada SQLite serta menghilangkan data tags yang sudah ditulis. Jika rollback database benar-benar diperlukan, gunakan restore backup dan catat dampak data secara eksplisit.

## 10. Evidence dan sign-off

Simpan evidence berikut sebelum menutup eksekusi:

| Evidence | Wajib dicatat |
|---|---|
| Target resource | Project, environment, service, volume, mount path |
| Backup | Timestamp/identifier backup dan status selesai |
| Deployment | Commit, deployment ID, waktu mulai/selesai, status |
| Baseline | Row count dan hasil schema sebelum migration |
| Post-check | Schema, row count, null/empty count sesudah migration |
| Endpoint | GET products dan hasil round-trip write bila dilakukan |
| Recovery | Nama backup yang dipakai atau pernyataan rollback tidak diperlukan |
| Sign-off | Approval eksplisit owner setelah evidence lengkap |

Runbook ini berakhir pada **READY FOR EXECUTION REVIEW**. Status berubah menjadi **EXECUTED** hanya setelah backup, deployment, sanity check, endpoint verification, dan sign-off benar-benar selesai.

## References

[1]: ./product-persistence-contract-v1.md "Ngepas Product Persistence Contract v1"
[2]: https://docs.railway.com/volumes/backups "Railway Docs — Backups"
[3]: https://docs.railway.com/volumes/reference "Railway Docs — Volumes"
[4]: https://docs.railway.com/deployments/deployment-actions "Railway Docs — Deployment Actions"

<!--==================================================
 END OF FILE
==================================================-->
