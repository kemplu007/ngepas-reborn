/*==================================================
 NGEPAS REBORN
 File    : iconMap.js
 Module  : Public Icon Registry
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import {
  CarFront,
  CookingPot,
  HeartPulse,
  House,
  Laptop,
  Monitor,
  MoreHorizontal,
  Shirt,
} from "lucide-react";

/*==================================================
 CATEGORY ICON MAP
==================================================*/

export const categoryIconMap = {
  Elektronik: Monitor,
  Komputer: Laptop,
  Rumah: House,
  Otomotif: CarFront,
  Dapur: CookingPot,
  Fashion: Shirt,
  Kesehatan: HeartPulse,
  Lainnya: MoreHorizontal,
};

/*==================================================
 HELPERS
==================================================*/

export function getCategoryIcon(categoryName = "") {
  return categoryIconMap[categoryName] || MoreHorizontal;
}

/*==================================================
 EXPORT
==================================================*/

export default categoryIconMap;

/*==================================================
 NOTES
==================================================*/

// Registry hanya menyimpan referensi komponen dari lucide-react.
// Taxonomy kategori tetap menjadi tanggung jawab data/context.
// Tambahkan mapping baru hanya setelah kategori resmi disetujui.
