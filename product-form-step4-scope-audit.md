# ProductForm Step 4 Scope Audit

Tanggal audit: 2026-08-16
Branch kerja: `feat/admin-product-form-details-v1`

## Keputusan scope

Step 4 dibagi menjadi tiga area yang tidak boleh dicampur dalam satu patch:

| Area | Status pada repository | Keputusan |
|---|---|---|
| Details | State, payload, controller, model, schema, dan read parser sudah memiliki kontrak untuk `description`, `features`, `specifications`, `whyWeRecommend`, `bestFor`, dan `considerations` | Aman dimigrasikan sebagai foundation UI tanpa perubahan backend |
| Varian produk | Tidak ada state, payload, endpoint, controller, model, schema, atau acceptance criteria resmi | Tidak dikoding pada slice ini; perlu product/API contract terpisah |
| Upload service | `POST /api/upload` masih tercatat sebagai next/future endpoint; tidak ada service frontend, route backend, storage contract, atau file-processing path aktif | Tidak diimplementasikan pada slice ini; perlu architecture, storage, auth, validation, dan deployment decision terpisah |

## Details yang boleh dimigrasikan

Primitive yang digunakan untuk Details adalah `Card`, `TextareaField` yang ditambahkan sebagai foundation, `Input` bila diperlukan, dan `ui/Button` untuk navigation yang sudah ada. Migrasi hanya mengubah markup, label/helper/error association, semantic token, focus state, disabled state, dan reduced-motion behavior.

Nama field, `value`, `onChange`, state form, transform payload, submit handler, Context, service, API route, auth JWT, dan redirect harus tetap sama.

## Evidence contract

`api-contract.md` mendefinisikan field Details pada body POST/PUT `/api/products`: `description`, `features`, `specifications`, `whyWeRecommend`, `bestFor`, dan `considerations`. Backend controller, model, schema, dan parser juga sudah menangani field tersebut.

Sebaliknya, audit ProductForm sebelumnya mencatat `gallery`, `tags`, dan `status` sebagai gap persistence existing. Varian produk dan upload service bahkan belum memiliki kontrak aktif. Karena Core melarang YAGNI dan penambahan endpoint tanpa update contract, dua area tersebut tidak boleh disisipkan ke migrasi visual Details.

## Acceptance criteria slice Details

1. Semua field Details memakai foundation reusable atau primitive baru yang memiliki kontrak jelas.
2. Tidak ada raw textarea/input/button yang tersisa di section Details setelah slice selesai.
3. Semua `name`, `value`, `onChange`, state, payload, dan submit behavior tetap identik.
4. `git diff --check` dan `npx vite build` lulus.
5. Diff tidak menyentuh `server/`, service, context, route, auth, atau API contract.
6. Changelog, foundation baseline, Linear, dan Notion mencatat batas scope dengan jujur.
7. Varian dan upload service dicatat sebagai follow-up contract slice, bukan implementasi tersembunyi.

## Referensi repository

- `src/docs/docs/ngepas-core.md`
- `src/docs/docs/api-contract.md`
- `src/docs/docs/foundation-patrol-v1-report.md`
- `src/pages/admin/ProductForm.jsx`
- `server/controllers/productController.js`
- `server/models/productModel.js`
- `server/database/init.js`
- `src/services/productService.js`
