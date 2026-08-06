# ==================================================
# NGEPAS REBORN
# CHANGELOG
# ==================================================

## v1.1.0 — Admin Panel Improvements

Release Date: 2026-08-06

==================================================
FRONTEND — ADMIN
==================================================

✓ Dashboard: tambah statistik Estimasi Revenue, Stok Menipis, Stok Habis
✓ Dashboard: tambah Produk per Kategori + persentase
✓ Dashboard: tambah Produk Terlaris (top 5 by sold)
✓ Dashboard: tambah Peringatan Stok Menipis dengan tombol Edit
✓ Products: tambah Bulk Delete (checkbox + select all)
✓ Products: tambah Confirm Dialog sebelum hapus
✓ Products: tambah Toast Notification (success/error)
✓ Categories: tambah Confirm Dialog sebelum hapus
✓ Categories: tambah Toast Notification (success/error)
✓ Categories: tambah tampilan Icon & Status Indicator
✓ CategoryForm: tambah Toast Notification (success/error)
✓ ProductForm: tambah Toast Notification + auto-redirect
✓ New: ToastContext (notifikasi visual success/error/info)
✓ New: ConfirmDialog component (konfirmasi aksi destruktif)
✓ New: Checkbox bulk selection di ProductTable
✓ main.tsx: tambah ToastProvider di Provider tree

==================================================
STATUS
==================================================

SPRINT 4.1 — ADMIN PANEL IMPROVEMENTS

COMPLETED

==================================================

## v1.0.0 — Foundation Live

Release Date: 2026-08-06

==================================================
DEPLOYMENT
==================================================

✓ Backend live di Railway
✓ Frontend live di Vercel
✓ Root Directory Railway = `server`
✓ Start command = `node index.js`
✓ better-sqlite3 (ganti dari node:sqlite)
✓ Auto init DB: `require("./database/init")` di index.js
✓ Seed dijalankan via Railway console
✓ Railway Volume mount `/app/data`
✓ Env `DB_PATH=/app/data/ngepas.db` (data persist)
✓ `VITE_API_URL` mengarah ke Railway API

==================================================
BACKEND
==================================================

✓ CRUD Product stabil
✓ CRUD Category stabil
✓ Response helper konsisten
✓ Init on start
✓ DB path via env (local + production)

==================================================
FRONTEND
==================================================

✓ Service layer (product + category)
✓ ProductContext + CategoryContext
✓ Admin Product + Category CRUD
✓ Homepage API-driven
✓ vercel.json SPA rewrite

==================================================
DOCUMENTATION
==================================================

✓ ngepas-core.md (AI entry point)
✓ api-contract.md
✓ coding-standard.md
✓ backend-architekture.md
✓ folders-backend.md
✓ folders-frontend.md
✓ Sync docs ke state live + Volume

==================================================
STATUS
==================================================

SPRINT FOUNDATION + DEPLOY + VOLUME

COMPLETED

==================================================
NEXT
==================================================

□ Auth admin / proteksi route
□ GET /api/products/:slug
□ Featured / search endpoints
□ Dashboard statistics
□ Responsive admin polish
□ Upload image

==================================================

## v0.9.0

Release Date: 2026-08-03

==================================================
FRONTEND
==================================================

✓ Admin Categories Page
✓ Category Form (Create / Edit)
✓ Category CRUD Integration
✓ Category Context + Service stabil

==================================================
BACKEND
==================================================

✓ CRUD Product + Category stabil
✓ SQLite boolean handling
✓ API Contract + Response Helper

==================================================
BUG FIX
==================================================

✓ Fix Admin Category Edit Route
✓ Fix Category Update Flow
✓ Fix Category Context Refresh

==================================================
STATUS
==================================================

SPRINT 4.0 — ADMIN CATEGORY CRUD — COMPLETED

==================================================
END
==================================================