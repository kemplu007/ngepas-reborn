# AI Handoff Standard v1

**Status:** Operational authority — berlaku untuk semua sesi manusia dan AI yang membaca, merencanakan, mengubah, mereview, atau mempromosikan Ngepas.

**Tujuan:** Mencegah hilangnya konteks, scope creep, dan penutupan status tanpa bukti ketika pekerjaan berpindah antar-sesi atau antar-agen.

> `ngepas-core.md` tetap hukum produk. Dokumen ini tidak mengganti Core, kontrak API, coding standard, maupun foundation baseline; ia menjelaskan cara menyerahkan konteks dan bukti agar semua authority tersebut benar-benar dipakai.

## Prinsip operasi

Setiap handoff wajib memulai dari bukti repository dan tracker saat ini, bukan dari asumsi atau ringkasan percakapan saja. Satu slice hanya boleh mengubah kontrak yang sudah disetujui. Jika kebutuhan ternyata memerlukan field, payload, validator, service, endpoint, schema, migration, auth, billing, atau provider baru, handoff harus menandainya sebagai **contract change** dan meminta keputusan terpisah.

| Prinsip | Aturan praktis |
| --- | --- |
| **Core-first** | Baca `ngepas-core.md` sebelum memutuskan scope, lalu baca dokumen domain yang relevan. |
| **Evidence-first** | Nyatakan branch, commit/PR, file yang berubah, validasi, dan bukti tracker; jangan memakai klaim “sudah selesai” tanpa artefak. |
| **One slice** | Pisahkan implementasi, dokumentasi promosi, dan perubahan kontrak menjadi PR berbeda bila dapat direview sendiri. |
| **Honest status** | `Done` berarti semua acceptance criteria yang dijanjikan telah dibuktikan; `Blocked` berarti alasan dan unblocker jelas; `In Progress` tidak boleh menjadi tempat parkir tanpa next action. |
| **Safe continuation** | Artefak untracked, worktree aktif, branch dengan PR terbuka, dan branch yang belum merged dilindungi sebelum bersih-bersih. |

## State vocabulary

| State | Arti | Bukti minimum |
| --- | --- | --- |
| **Proposed** | Masalah dan scope telah dicatat, belum ada branch implementasi. | Problem statement, in/out scope, acceptance criteria. |
| **Review ready** | Branch/PR siap diputuskan. | Diff fokus, validasi, route/viewport yang diperiksa, dan guardrail. |
| **Promoted** | Sudah masuk `main`. | PR merged, merge commit, serta verifikasi remote. |
| **Documented** | Changelog/baseline dan tracker sudah mencatat promosi. | PR dokumen bila terpisah, checkpoint Linear dan Notion. |
| **Blocked** | Tidak aman atau tidak mungkin lanjut sekarang. | Penyebab, dampak, pemilik keputusan, dan kondisi unblock. |

## Envelope handoff wajib

Setiap sesi yang menyerahkan atau mengambil pekerjaan harus mengisi envelope berikut. Bagian yang tidak berlaku ditulis **N/A** dengan alasan; tidak boleh dihilangkan diam-diam.

| Bagian | Isi yang wajib dicatat |
| --- | --- |
| **Checkpoint** | Tanggal, tujuan sesi, serta state vocabulary saat ini. |
| **Source of truth** | Core dan dokumen/komponen/contract yang dibaca. |
| **Working state** | Repo path, branch aktif, `origin/main` baseline, worktree lain, dan untracked yang harus dilindungi. |
| **Scope** | Satu problem, owner file/surface, in-scope, out-of-scope, dan preserved behavior. |
| **Evidence** | PR/commit, diff summary, command validasi, viewport/route/fixture yang diperiksa, dan hasilnya. |
| **Guardrails** | Auth, API, backend, database, media, billing, data produksi, atau batas lain yang tidak disentuh. |
| **Tracker** | Status Linear, checkpoint Notion, dan apakah changelog/baseline sudah atau belum diperbarui. |
| **Next decision** | Satu langkah berikutnya, pemilik approval, dan kondisi stop/unblock. |

## Flow kerja lintas sesi

### 1. Sebelum mulai

Mulai dengan membaca Core dan artefak yang relevan, lalu cek `git branch --show-current`, `git status --short`, `git worktree list`, remote main, PR terbuka, serta status Linear/Notion bila pekerjaan sebelumnya melibatkan tracker. Temuan dari web, production API, atau connector harus disimpan ke catatan teks sebelum konteks sesi dapat terpotong.

Jangan menghapus branch karena tampak lama. Hapus hanya setelah memastikan branch sudah merged ke `main`, tidak memiliki PR terbuka, tidak dipakai worktree, dan bukan satu-satunya penunjuk commit yang masih dibutuhkan. Laporan lokal untracked bukan sampah otomatis.

### 2. Sebelum mengubah aplikasi

Tuliskan problem statement, file owner, perilaku yang dipertahankan, fallback ketika data kosong, scope guard, acceptance criteria, branch name, command validasi, dan kebutuhan approval. Pekerjaan visual-only tidak boleh menyelundupkan perubahan data contract. Cue editorial hanya boleh memakai field manusia yang sudah ada; tidak boleh menciptakan skor, review, label terbaik, kelangkaan palsu, atau kesimpulan otomatis.

### 3. Review dan promosi

Staging harus fokus pada file yang benar-benar disetujui. Jalankan minimal `git diff --check` dan `npx vite build`; tambah pemeriksaan route dan viewport yang relevan untuk perubahan UI. Bedakan warning baseline dari regresi baru dan jangan memperluas diff untuk “sekalian membetulkan” di luar slice.

Implementasi dipush melalui branch dan PR terpisah. `main` hanya boleh menerima merge setelah approval founder yang eksplisit, kecuali founder secara eksplisit memberi mandat promosi sesudah validasi untuk scope yang telah dikunci. Perubahan dokumentasi promosi dibuat sebagai lapisan audit terpisah jika substansinya dapat direview sendiri.

### 4. Setelah promosi

Verifikasi `origin/main`, tulis changelog dan foundation/contract yang relevan, lalu sinkronkan Linear dan Documentation Hub Notion. Tracker bukan pengganti GitHub: status harus membawa tautan atau commit yang dapat diaudit. Tutup checklist lokal hanya setelah bukti final tersimpan.

## Template copyable

```md
## Handoff — <nama slice>

**Checkpoint:** <tanggal> — <Proposed / Review ready / Promoted / Documented / Blocked>

### Source of truth
- Core: `<path>`
- Dokumen/surface yang dibaca: `<path atau URL>`

### Working state
- Branch: `<nama>` dari `<origin/main commit>`
- Protected local state: `<untracked/worktree atau N/A>`

### Scope contract
- Problem dan owner: `<satu kalimat>`
- In scope: `<file/perilaku>`
- Preserved: `<route, CTA, payload, state, dll.>`
- Out of scope / guardrails: `<auth, API, DB, media, billing, production data, dll.>`
- Honest fallback: `<apa yang terjadi saat data tidak tersedia>`

### Evidence
- PR/commit: `<URL atau hash>`
- Validation: `<git diff --check; npx vite build; route; viewport; hasil>`
- Known baseline: `<warning existing atau N/A>`

### Tracker dan next decision
- Linear: `<status/link>`
- Notion: `<checkpoint/link>`
- Next 1 slice / unblocker: `<satu langkah dan pemilik keputusan>`
```

## Peta authority

| Keputusan | Authority utama |
| --- | --- |
| Arah produk, guardrail, dan larangan arsitektur | `ngepas-core.md` |
| Token, komponen, motion, dan hierarchy UI | `uiux-system-v1.1.md`, `coding-standard.md`, `foundation-baseline-v1.md`, serta `src/styles/tokens.css` |
| Proses admin dan batas zero-cost media | `admin-publishing-runbook-v1.md`, kontrak media A3, dan decision brief A4 |
| Riwayat promosi | `changelog.md`, pull request GitHub, serta `origin/main` |
| Status operasional lintas sesi | Linear dan Documentation Hub Notion |

**Rule of conflict:** ketika rangkuman sesi, tracker, atau pesan lama bertentangan dengan repository dan Core, cek commit/PR dan dokumen authority terlebih dahulu. Jangan memperbaiki aplikasi hanya karena diagnosis lama belum diperbarui.
