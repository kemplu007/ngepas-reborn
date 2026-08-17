# Ngepas Reborn — Production Tags Migration Runbook v1

**Status:** READY FOR EXECUTION REVIEW — backup gate direvisi, belum dijalankan di production
**Scope:** PR-2 Product Tags Persistence
**Target:** Railway service `ngepas-reborn` pada project `adventurous-perception`
**Database:** SQLite pada Railway Volume `ngepas-reborn-volume`
**DB path:** `/app/data/ngepas.db`
**Code commit:** `c81fa03` — `merge: promote product tags persistence`
**Tanggal penyusunan:** 2026-08-17

> Runbook ini hanya menyiapkan prosedur operasional. Tidak ada langkah pada dokumen ini yang boleh dijalankan terhadap database production sebelum recovery point terverifikasi dan approval eksekusi diberikan secara eksplisit.

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
| Tidak ada recovery point yang terverifikasi melalui backup Railway atau backup SQLite manual | Jangan menjalankan migration tanpa jalur recovery |
| Backup native tidak tersedia pada plan/project saat ini dan backup SQLite manual belum berhasil diunduh serta dibuka read-only | Hentikan eksekusi; jangan menganggap upgrade plan sebagai langkah otomatis |
| Backup melewati limit atau Railway menampilkan error | Jangan mengakali backup dengan menghapus volume |
| Health endpoint atau deployment log gagal setelah restart | Aplikasi belum terbukti sehat |
| Row count berubah selain perubahan yang diharapkan | Perlakukan sebagai insiden dan jangan lanjutkan |

## 3. Preflight tanpa perubahan data

Lakukan pemeriksaan berikut dari Railway Dashboard menggunakan akun yang memiliki akses ke project production. Pastikan service yang dipilih adalah `ngepas-reborn`, environment production, dan volume yang terpasang bernama `ngepas-reborn-volume` dengan mount path `/app/data`. Jika pemeriksaan atau command membutuhkan akses yang tidak tersedia di dashboard, gunakan Railway CLI hanya dari perangkat yang sudah login dan jangan menebak hasil query.

Catat timestamp UTC, deployment aktif sebelum eksekusi, status service, dan URL backend. Simpan hasilnya dalam catatan eksekusi. Pastikan backend merespons endpoint publik yang sudah ada, misalnya `GET https://ngepas-reborn-production-c3aa.up.railway.app/api/products`, sebelum deployment baru dimulai.

Pastikan branch default/deployment source Railway akan mengambil commit `c81fa03` atau commit yang lebih baru dan hanya berisi perubahan PR-2 yang sudah dipromosikan. Jangan mengubah environment variable, volume mount, root directory, atau start command untuk menjalankan migration ini.

## 4. Backup gate dan fallback tanpa fitur plan-gated

Railway-native backup adalah pilihan pertama **jika** tab Backups tersedia dan backup berhasil dibuat. Dokumentasi Railway menjelaskan dukungan backup volume, tetapi availability dapat berbeda menurut plan/project. Pada project Ngepas, dashboard menunjukkan fitur tersebut tidak tersedia atau sedang gated. Karena itu, runbook ini tidak menganggap backup native sebagai kemampuan yang selalu tersedia dan tidak memaksa upgrade plan.

### 4.1 Opsi A — Railway-native backup, bila tersedia

Pada service `ngepas-reborn`, buka pengaturan volume dan tab **Backups**. Buat manual backup sebelum deployment PR-2. Tunggu sampai status selesai, lalu catat timestamp/identifier. Jika backup ditolak, tidak muncul, atau statusnya tidak jelas, jangan menghapus volume dan lanjut ke Opsi B hanya bila akses SSH/CLI tersedia.

### 4.2 Opsi B — backup SQLite konsisten melalui SSH/CLI

Opsi ini memakai SQLite online backup API melalui `better-sqlite3`, bukan menyalin file database aktif dengan `cp`. Railway menyediakan `railway ssh` untuk menjalankan command di container dan `railway service files download` untuk mengunduh file service. Langkah ini membutuhkan Railway CLI yang sudah login serta SSH key yang terdaftar. Bila lu tidak punya CLI/SSH access, **stop gate aktif dan migration tidak boleh dijalankan**.

Pertama, pastikan kapasitas volume cukup untuk satu salinan database tambahan dan cek file database secara read-only. Jalankan dari terminal yang sudah terhubung ke project, environment, dan service yang benar:

```bash
railway ssh --service ngepas-reborn --environment production -- df -h /app/data
railway ssh --service ngepas-reborn --environment production -- ls -lh /app/data/ngepas.db
```

Kedua, buat backup dengan online backup API. Ganti `<timestamp>` dengan UTC timestamp, misalnya `20260817T130000Z`. Command ini membuat file backup di volume; command tersebut belum menjalankan migration atau mengubah schema:

```bash
railway ssh --service ngepas-reborn --environment production -- node -e 'const Database=require("better-sqlite3"); const db=new Database("/app/data/ngepas.db",{readonly:true,fileMustExist:true}); db.backup("/app/data/pre-pr2-tags-<timestamp>.db").then(()=>{console.log("backup complete"); db.close();}).catch((error)=>{console.error(error); db.close(); process.exit(1);});'
```

Ketiga, validasi backup di dalam container menggunakan koneksi read-only. `integrity_check` harus mengembalikan `ok`, dan jumlah produk pada backup harus sama dengan baseline:

```bash
railway ssh --service ngepas-reborn --environment production -- node -e 'const Database=require("better-sqlite3"); const db=new Database("/app/data/pre-pr2-tags-<timestamp>.db",{readonly:true,fileMustExist:true}); console.log(db.pragma("integrity_check",{simple:true})); console.log(db.prepare("SELECT COUNT(*) AS product_rows FROM products").get()); db.close();'
```

Keempat, unduh backup ke lokasi lokal yang aman dan **jangan** memasukkannya ke repository atau GitHub:

```bash
mkdir -p ./private-backups
railway service files download --service ngepas-reborn --environment production /app/data/pre-pr2-tags-<timestamp>.db ./private-backups/pre-pr2-tags-<timestamp>.db
```

Simpan file backup di perangkat pribadi yang aman. Catat ukuran file, SHA-256, timestamp, dan hasil `integrity_check`. Jangan mengirim database production ke chat atau connector. Setelah backup lokal berhasil diverifikasi, file sementara di volume boleh dibersihkan **hanya oleh owner secara manual** jika ruang volume menjadi masalah; penghapusan bukan bagian dari langkah AI dan tidak boleh dilakukan tanpa memastikan file lokal sudah aman.

Backup manual memiliki risiko operasional dan tidak menggantikan backup Railway-native sepenuhnya. Jika pembuatan, validasi, atau download backup gagal, **jangan deploy/restart**. Menghapus volume, membuat volume pengganti, atau menjalankan seed bukan solusi backup.

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

1. Pastikan salah satu recovery point sudah terverifikasi: backup native Railway yang Completed, atau backup SQLite manual yang sudah `integrity_check: ok`, row count cocok, berhasil diunduh, dan hash dicatat.
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

Jika database atau volume menunjukkan kerusakan, gunakan recovery point yang sudah dicatat pada langkah 4. Untuk backup native, ikuti restore flow Railway dan periksa staged change sebelum menerapkannya. Untuk backup SQLite manual, jangan mengganti `/app/data/ngepas.db` secara live. Hentikan write traffic sesuai incident procedure, validasi file backup, siapkan restore ke file terpisah, dan lakukan cutover hanya dengan approval owner serta langkah observasi yang dapat dibatalkan. Sadari bahwa restore mengembalikan keadaan data ke waktu backup dan dapat menghilangkan perubahan write setelah timestamp tersebut.

**Jangan menjalankan `DROP COLUMN tags` sebagai rollback cepat.** Penghapusan kolom bukan bagian dari migration ini dan dapat menambah risiko pada SQLite serta menghilangkan data tags yang sudah ditulis. Jika rollback database benar-benar diperlukan, gunakan recovery point dan catat dampak data secara eksplisit.

## 10. Evidence dan sign-off

Simpan evidence berikut sebelum menutup eksekusi:

| Evidence | Wajib dicatat |
|---|---|
| Target resource | Project, environment, service, volume, mount path |
| Backup | Opsi native atau manual, timestamp/identifier, status selesai, ukuran, SHA-256, dan hasil integrity check |
| Deployment | Commit, deployment ID, waktu mulai/selesai, status |
| Baseline | Row count dan hasil schema sebelum migration |
| Post-check | Schema, row count, null/empty count sesudah migration |
| Endpoint | GET products dan hasil round-trip write bila dilakukan |
| Recovery | Nama recovery point yang dipakai atau pernyataan rollback tidak diperlukan |
| Sign-off | Approval eksplisit owner setelah evidence lengkap |

Runbook ini berakhir pada **READY FOR EXECUTION REVIEW**. Status berubah menjadi **EXECUTED** hanya setelah recovery point, deployment, sanity check, endpoint verification, dan sign-off benar-benar selesai.

## References

[1]: ./product-persistence-contract-v1.md "Ngepas Product Persistence Contract v1"
[2]: https://docs.railway.com/volumes/backups "Railway Docs — Backups"
[3]: https://docs.railway.com/volumes/reference "Railway Docs — Volumes"
[4]: https://docs.railway.com/deployments/deployment-actions "Railway Docs — Deployment Actions"
[5]: https://docs.railway.com/pricing/plans "Railway Docs — Pricing Plans"
[6]: https://docs.railway.com/cli/ssh "Railway Docs — railway ssh"
[7]: https://docs.railway.com/cli/service "Railway Docs — railway service files"
[8]: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md "better-sqlite3 API — Database backup"
[9]: https://sqlite.org/backup.html "SQLite Online Backup API"

<!--==================================================
 END OF FILE
==================================================-->
