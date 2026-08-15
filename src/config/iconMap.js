/*==================================================
 NGEPAS REBORN
 File    : iconMap.js
 Module  : Public Icon Registry
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import {
  Baby,
  CarFront,
  CookingPot,
  Dumbbell,
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
  "Ibu & Anak": Baby,
  Olahraga: Dumbbell,
  Lainnya: MoreHorizontal,
};

const categoryAliases = {
  "ibu & anak": "Ibu & Anak",
  olahraga: "Olahraga",
  bathroom: "Rumah",
  bedroom: "Rumah",
  decor: "Rumah",
  dekorasi: "Rumah",
  furniture: "Rumah",
  home: "Rumah",
  household: "Rumah",
  kitchen: "Dapur",
  living: "Rumah",
  "living room": "Rumah",
  komputer: "Komputer",
  laptop: "Komputer",
  mobile: "Elektronik",
  smartphone: "Elektronik",
  technology: "Elektronik",
};

/*==================================================
 HELPERS
==================================================*/

function normalizeCategoryLabel(categoryName = "") {
  return categoryName.toString().trim().toLowerCase().replace(/[\s_-]+/g, " ");
}

export function getCategoryIcon(categoryName = "") {
  const label = categoryName.toString().trim();
  const normalizedLabel = normalizeCategoryLabel(label);
  const mappedLabel = categoryAliases[normalizedLabel] || label;

  return categoryIconMap[mappedLabel] || MoreHorizontal;
}

/*==================================================
 EXPORT
==================================================*/

export default categoryIconMap;

/*==================================================
 NOTES
==================================================*/

// Registry hanya menyimpan referensi komponen dari lucide-react.
// Alias menjaga data kategori dinamis tetap mendapat icon bermakna.
// Taxonomy kategori tetap menjadi tanggung jawab data/context.
// Tambahkan mapping baru hanya setelah kategori resmi disetujui.

/*==================================================
 END OF FILE
==================================================*/
