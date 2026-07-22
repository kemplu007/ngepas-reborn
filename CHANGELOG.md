# NGEPAS REBORN CHANGELOG

Semua perubahan penting pada project akan dicatat di sini.

---

# Checkpoint 0.8
Tanggal: 18 Juli 2026

## ✨ Added

- React Router
- Dynamic Route (`:slug`)
- Product Detail Page
- Back Navigation
- Product Slug
- Affiliate Link Structure

## 🎨 Improved

- Product data architecture
- URL readability
- Router structure

---

# Checkpoint 0.9
Tanggal: 19 Juli 2026

## ✨ Added

- Dynamic Product Detail
- Related Products
- Scroll To Top
- Decision Engine
  - Why We Recommend
  - Best For
  - Considerations

## 🎨 Improved

- Product Detail Typography
- Product Image Presentation
- Decision Section Hierarchy
- Header Navigation
- Stock Badge
- Overall Readability

## 🔧 Refactor

- Product Detail Layout
- Cleaner UI Hierarchy

---

# Checkpoint 1.0
Tanggal: 19 Juli 2026

## ✨ Added

- Favorite System
- Favorites Context API
- Custom Hook
- Local Storage Persistence
- Favorite Button
- Favorite Synchronization

## 🔧 Refactor

- ProductCard consumes Context
- Removed Prop Drilling
- FeaturedProducts simplified

## 🐛 Fixed

- Favorite persists after refresh
- Favorite sync between Home & Detail

---

# Checkpoint 1.1
Tanggal: 21 Juli 2026

## 🎨 Improved

- Complete Product Detail redesign
- Better visual hierarchy
- Marketplace CTA repositioned
- Premium information cards
- Improved spacing & typography
- Better Related Products section
- Better mobile experience

## 🔧 Refactor

- Removed Favorite System
- Simplified Product Detail
- Cleaner Product Detail structure
- Better component readability

## 🗑 Removed

- Favorite Context
- Favorite Button
- Favorite logic

## Added
- Add roomCategories data
- Prepare room → category navigation
- Blueprint Alive BP-03

## [0.6] - Blueprint Navigation System

### Added
- Room navigation data
- Room category mapping
- Category selection state
- Dynamic category rendering

### Changed
- Refactored product data structure
- Added room field
- Updated category to blueprint-based structure
- Reset selected category when room changes

### Improved
- Consistent product object convention
- Better foundation for product filtering engine

## [0.7]

### Added
- Active room selection
- Active category selection
- Product filtering system
- Dynamic product rendering
- Empty state for unavailable products

### Improved
- Blueprint navigation flow
- Room & category interaction
- UI feedback for selected items

### Refactored
- Product data structure
- Category filtering logic