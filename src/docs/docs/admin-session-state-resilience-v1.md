# ==================================================
# NGEPAS REBORN
# ADMIN SESSION-STATE RESILIENCE v1
# ==================================================

## Status

**Review-ready.** Slice ini memperbaiki recovery state frontend setelah kegagalan `401 Unauthorized` pada pemuatan katalog admin. Tidak ada perubahan backend, kontrak JWT, maupun data produksi.

## Evidence

Uji O1 pada 19 Agustus 2026 menunjukkan token admin yang tersimpan dapat diterima oleh `GET /api/products/admin`, namun halaman `/admin/products` sempat menampilkan `Unauthorized` sebelum route dimuat ulang. Setelah reload, katalog berhasil termuat tanpa login ulang. Evidence tersebut menunjukkan gap pemulihan state client, bukan bukti perubahan `JWT_SECRET`, akun admin, CORS, schema SQLite, atau endpoint auth.

| Lokasi | Temuan | Konsekuensi sebelum slice |
|---|---|---|
| `src/services/api.js` | Error request hanya membawa pesan; status HTTP tidak tersedia bagi caller. | Context tidak dapat membedakan `401` dari kegagalan lain. |
| `src/context/AuthContext.tsx` | Token dibaca saat mount dan diperbarui dari fungsi login/logout internal. | Perubahan token lintas tab tidak menyinkronkan state context. |
| `src/context/ProductContext.jsx` | Kegagalan katalog admin hanya disimpan sebagai `adminError`. | Error `401` tidak menghapus snapshot katalog admin atau memberi instruksi pemulihan yang spesifik. |
| `src/pages/admin/Products.jsx` | State error sudah terlihat, tetapi tidak menyediakan retry katalog. | Operator harus mengandalkan reload halaman untuk mencoba lagi. |

## Kontrak Perbaikan v1

> Perbaikan ini memulihkan state client; perbaikan ini **bukan** refresh-token flow, perubahan masa berlaku JWT, atau redesign login.

1. `apiRequest` harus melekatkan `status` respons pada objek error agar Context dapat menangani `401` secara eksplisit tanpa parsing pesan error.
2. `AuthProvider` harus menyelaraskan `ngepas_token` saat event browser `storage` terjadi, sehingga login/logout di tab lain tidak meninggalkan `isAuthenticated` lama.
3. `ProductContext` harus mengosongkan `adminProducts` saat kegagalan `401` dan mengganti pesan teknis dengan instruksi pemulihan yang jujur.
4. Halaman Products harus menyediakan retry eksplisit yang memanggil `refreshAdminProducts()` ulang menggunakan token terbaru dari `localStorage`.
5. Tidak ada retry otomatis, refresh token, silent re-authentication, perubahan role, atau write data dalam slice ini.

## Acceptance Criteria

| Kriteria | Bukti yang diperlukan |
|---|---|
| Error request mengenali status `401` | `apiRequest` menempelkan `status` respons pada error. |
| Snapshot admin tidak tertinggal pada `401` | `adminProducts` dikosongkan ketika Context menerima error berstatus `401`. |
| Operator memiliki jalan pulih tanpa reload manual | Products menampilkan aksi **Coba muat ulang katalog** saat `adminError` ada. |
| Sesi lintas tab konsisten | Event `storage` menyelaraskan state token AuthContext. |
| Guardrail tetap utuh | Tidak ada perubahan JWT backend, endpoint, schema/data, storage, billing, dependency, atau konfigurasi deploy. |

## Validasi yang Direncanakan

Jalankan `git diff --check`, `npm run quality:check`, dan `npm run quality:contract-tests`. Setelah deployment, lakukan walkthrough read-only terhadap login, refresh katalog admin, serta logout/login lintas tab bila browser mendukungnya.

## Non-goals

Slice ini tidak membangun refresh token, remember-me, multi-admin/role, background polling, retry otomatis, global error boundary baru, atau perubahan media/content workflow.
