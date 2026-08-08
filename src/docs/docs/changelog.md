# ==================================================
# NGEPAS REBORN
# CHANGELOG
# ==================================================

## v1.2.0 — Auth Foundation (API Key)

Release Date: 2026-08-06

==================================================
BACKEND
==================================================

✓ authMiddleware (x-api-key vs ADMIN_API_KEY)
✓ POST/PUT/DELETE products + categories diproteksi
✓ GET tetap publik

==================================================
FRONTEND
==================================================

✓ productService + categoryService kirim x-api-key pada non-GET
✓ Key dari VITE_ADMIN_API_KEY (env, bukan hardcode)

==================================================
STATUS
==================================================

SPRINT 6.0 + 6.1 COMPLETED

==================================================
NEXT
==================================================

□ Sprint 6.5 Login + JWT + role (BE dulu)
□ GET slug / featured / search + pagination
□ Polish UI Mockup A (mobile)
□ CORS + rate limit
□ Upload image

==================================================

## v1.0.0 — Foundation Live

Release Date: 2026-08-06

==================================================
DEPLOYMENT
==================================================

✓ Backend Railway + Frontend Vercel
✓ better-sqlite3
✓ Init DB on start
✓ Volume /app/data + DB_PATH
✓ VITE_API_URL → Railway

==================================================
BACKEND / FRONTEND
==================================================

✓ CRUD Product + Category
✓ Service layer + Context
✓ Admin CRUD + homepage API-driven

==================================================
STATUS
==================================================

FOUNDATION + DEPLOY + VOLUME COMPLETED

==================================================

## v0.9.0

Release Date: 2026-08-03

✓ Admin Category CRUD
✓ API contract + response helper
✓ Bugfix category edit / refresh

==================================================
END
==================================================