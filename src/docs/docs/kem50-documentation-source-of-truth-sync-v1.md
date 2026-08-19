# KEM-50 — Documentation Source-of-Truth Sync v1

**Status:** Review-ready · docs-only  
**Branch:** `docs/kem-50-source-truth-sync-v1`  
**Baseline:** `origin/main@f0f35d2` setelah KEM-49  
**Scope:** Menyelaraskan status dokumen dengan state `main`; tidak mengubah runtime, API, auth, schema, data, deployment, atau user flow.

## Keputusan

Dokumentasi Ngepas harus diperlakukan sebagai memori operasional lintas AI, bukan catatan historis yang mengambang. Mulai checkpoint ini, status promosi slice dibaca dari `changelog.md` dan commit `main`; dokumen per-slice menjelaskan kontrak serta evidence pada saat slice dibuat, sehingga label review-ready lama tidak boleh dibaca sebagai keadaan repository saat ini.

| Sumber | Authority setelah KEM-50 |
| --- | --- |
| `ngepas-core.md` | Guardrail, arsitektur, checkpoint aktif, dan urutan keputusan berikutnya. |
| `api-contract.md` | Endpoint yang telah aktif dan boundary consumer API. |
| `readiness-patrol-v1.md` | Baseline historis serta hasil patrol A–H; bukan backlog runtime aktif setelah KEM-49. |
| `changelog.md` | Status promosi slice dan commit `main` yang authoritative. |
| Dokumen `kemXX-*.md` | Kontrak dan evidence bounded pada slice tersebut. |

## Status promosi yang diselaraskan

| Slice | Status main | Commit promosi |
| --- | --- | --- |
| KEM-16 Curated Decision Label | Promoted | `a2dbc36` |
| KEM-17 Published Curation Validator | Promoted | `b51d7c6` |
| KEM-18 Gallery Workflow Assessment | Promoted | `868790f` |
| KEM-19 Catalog Performance Baseline | Promoted | `d2bb158` |
| KEM-30 Draft Visibility Fix | Promoted | `7b959a6` |
| KEM-32 Quality Gate | Promoted | `9dac4e6` |
| KEM-33 Public Catalog Contract | Promoted | `9e0ad14` |
| KEM-34 Canonical Public Detail | Promoted | `39c3dcb` |
| KEM-35 Honest Admin IA | Promoted | `09036eb` |
| KEM-36 Content Readiness Checklist | Promoted | `e972524` |
| KEM-37 Dependency & HTTP Hardening | Promoted | `d6028a6` |
| KEM-38 Contract Tests & Regression Harness | Promoted | `2723a1f` |
| KEM-49 Scale Trigger Review | Promoted · no-build | `f0f35d2` |

## Batas yang dipertahankan

KEM-50 tidak mengubah hasil historis patrol, parameter runtime, rute, controller, service, `ProductContext`, JWT, CORS, rate limit, SQLite, media, billing, atau data produk. Review konten nyata dan ADR Artikel tetap harus dimulai sebagai slice terpisah, tidak disisipkan ke sinkronisasi dokumentasi.

## Validasi

1. Setiap commit promosi di tabel dapat ditelusuri pada `origin/main`.
2. Endpoint `GET /api/products/:slug` yang telah aktif tidak lagi ditulis sebagai endpoint berikutnya.
3. Readiness Patrol A–H ditandai sebagai baseline historis yang telah dieksekusi, sementara keputusan scale KEM-49 tetap no-build.
4. `git diff --check` dan Quality Gate resmi tetap harus lulus sebelum PR diajukan.

