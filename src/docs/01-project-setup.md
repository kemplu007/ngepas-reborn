# Ngepas Reborn 0.1 - Project Setup

## Sprint

Version : 0.1

---

## Objective

Membangun pondasi project Ngepas Reborn menggunakan React + Vite dengan struktur folder yang rapi dan mudah dikembangkan.

---

## Tech Stack

- React
- Vite
- TypeScript (Default Vite Entry)
- JSX Components
- Tailwind CSS (On Progress)
- shadcn/ui (Planned)

---

## Folder Structure

```
src
│
├── assets
├── components
│   ├── Hero.jsx
│   └── Navbar.jsx
│
├── data
├── docs
├── hooks
├── layouts
├── lib
├── pages
│   └── Home.jsx
│
├── styles
├── utils
│
├── App.tsx
├── index.css
└── main.tsx
```

---

## React Flow

```
main.tsx
    │
    ▼
App.tsx
    │
    ▼
Home.jsx
    │
    ├── Navbar.jsx
    └── Hero.jsx
```

---

## Completed

- React Project Created
- Folder Structure Organized
- Header Comment Standard Created
- Home Component Created
- Navbar Component Created
- Hero Component Created
- React Component Flow Working
- Project Entry Fixed (App.tsx)

## Completed

### Project Setup

- React Project Created
- Vite Project Created
- Folder Structure Organized
- Header Comment Standard Created

### Component Architecture

- Home Component Created
- Navbar Component Created
- Hero Component Created
- Universal Button Component Created

### Data Layer

- Hero Data
- Navigation Data
- Features Data

### React Flow

- Import / Export
- Component Structure
- Reusable Component
- Array Rendering (.map())

### Project Entry

- App.tsx selected as root component
- main.tsx selected as Vite entry
- Duplicate App.jsx removed
- Duplicate main.jsx removed

---

Project Status

🟢 Sprint 0.2 Completed

---

## Notes

Pada awal development ditemukan dua entry point:

- App.jsx
- App.tsx

serta

- main.jsx
- main.tsx

Setelah evaluasi diputuskan menggunakan entry bawaan Vite:

main.tsx → App.tsx

Sedangkan komponen tetap menggunakan JSX.

Keputusan ini diambil agar pondasi project tetap mengikuti standar Vite tanpa perlu migrasi ulang.

---

## Next Sprint

Version 0.2

Target:

- Activate Tailwind
- Build Navbar UI
- Build Hero UI
- Match Hero with Mockup
- Responsive Layout

---

Author

Muhammad Abdul Chakim & ChatGPT
