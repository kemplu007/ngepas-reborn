# ==================================================
# NGEPAS REBORN
# CHANGELOG
# ==================================================

## v1.5.0 — Discover Filter Surface + Global Panel Motion

Release Date: 2026-08-15

==================================================
FRONTEND POLISH
==================================================

✓ FilterPanel mengikuti pola mockup Search & Filter: surface putih, hierarki bernomor, border tipis, dan kontrol native yang tetap accessible
✓ FilterPanel tetap presentational; callback dan state business tidak berubah
✓ MobileNavDrawer dirampingkan ke `min(80vw, 320px)` dengan padding mobile yang lebih compact
✓ Utility `.np-motion-surface` reusable untuk panel dan drawer dengan transform/opacity, token motion, dan reduced-motion support
✓ Overlay dan drawer menggunakan state `data-motion-state` agar transisi muncul/hilang konsisten

STATUS: DISCOVER MOBILE POLISH REVIEW

==================================================

## v1.4.0 — FE JWT Login + Logout

Release Date: 2026-08-14

==================================================
FRONTEND
==================================================

✓ AuthContext (token, login, logout, isAuthenticated)
✓ authService: POST /auth/login + saveToken / removeToken
✓ api.js: Authorization Bearer otomatis jika token ada
✓ /admin/login (Login.jsx)
✓ ProtectedRoute → redirect ke /admin/login
✓ Logout di AdminLayout
✓ productService / categoryService lewat apiRequest (Bearer)
✓ AuthProvider di main.tsx
✓ Vercel Speed Insights (App.tsx)

==================================================
DEPLOY / OPS
==================================================

✓ Vercel: 1 project saja (duplikat dihapus)
✓ Railway: 1 project resmi (adventurous-perception)
  - Domain: ngepas-reborn-production-c3aa.up.railway.app
  - Volume: ngepas-reborn-volume → /app/data
✓ Duplikat Railway (lovely-encouragement) dihapus

==================================================
STATUS
==================================================

SPRINT 6.5 FE COMPLETED
(Auth end-to-end: BE JWT + FE login/logout + Bearer write)

==================================================
NEXT
==================================================

□ Polish UI halaman /admin/login (masih minimal)
□ GET /api/products/:slug
□ Search / featured / pagination
□ Validasi kurasi wajib di admin form
□ CORS ketat + rate limit write
□ Polish UI mobile (Mockup A)
□ Upload image
□ product_offers multi-marketplace (Phase 3)

==================================================

## v1.3.0 — JWT Login (Backend)

Release Date: 2026-08-08

✓ Tabel users (init.js)
✓ userModel.getUserByEmail
✓ POST /api/auth/login (bcrypt + JWT 1d)
✓ authMiddleware: Bearer JWT dulu, fallback x-api-key
✓ seed admin (ADMIN_EMAIL + ADMIN_PASSWORD)
✓ package: bcryptjs, jsonwebtoken
✓ Production: JWT_SECRET + seed + login 200 + token

STATUS: SPRINT 6.5 BE COMPLETED

==================================================

## v1.2.0 — Auth Foundation (API Key)

Release Date: 2026-08-06

✓ authMiddleware x-api-key
✓ POST/PUT/DELETE products + categories diproteksi
✓ FE Service kirim x-api-key (VITE_ADMIN_API_KEY) — diganti Bearer di v1.4.0

STATUS: SPRINT 6.0 + 6.1 COMPLETED

==================================================

## v1.0.0 — Foundation Live

Release Date: 2026-08-06

✓ Railway + Vercel + Volume + better-sqlite3
✓ CRUD Product + Category
✓ Service layer + Context + Admin

==================================================

## v0.9.0

Release Date: 2026-08-03

✓ Admin Category CRUD + bug form

==================================================
END
==================================================