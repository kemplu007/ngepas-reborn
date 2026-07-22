
/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : roomCategories.js
 Module  : Data
==================================================*/

/*==================================================
 ROOM CATEGORY DATA

 Daftar kategori berdasarkan ruangan.

 Digunakan oleh:
 - CategoryPage.jsx
==================================================*/

const roomCategories = {
  bedroom: [
    "kasur",
    "lemari",
    "lampu-tidur",
    "meja",
    "karpet",
  ],

  "living-room": [
  "sofa",
  "meja-tv",
  "rak",
  "karpet",
  "lampu",
],

  kitchen: [
  "kompor",
  "rice-cooker",
  "piring",
  "wajan",
  "rak-bumbu",
],

  bathroom: [
    "shower",
    "rak-kamar-mandi",
    "cermin",
    "keset",
    "handuk",
  ],

  workspace: [
    "meja",
    "kursi",
    "monitor",
    "lampu-meja",
    "rak",
  ],
};

/*==================================================
 EXPORT
==================================================*/

export default roomCategories;