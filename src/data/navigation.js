/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : navigation.js
 Module  : Data
 Version : 0.2
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 NAVIGATION DATA

 Data navigasi utama.

 Navbar akan mengambil data dari file ini,
 sehingga jika menu bertambah cukup ubah di sini.
==================================================*/

/*==================================================
  NAVIGATION DATA
==================================================*/

const navigation = [
  {
    id: 1,
    label: "Beranda",
    path: "/",
    enabled: true,
  },

  {
    id: 2,
    label: "Kategori",
    path: "/category",
    enabled: true,
  },

  {
    id: 3,
    label: "Favorit",
    path: "/favorite",
    enabled: false,
  },

  {
    id: 4,
    label: "Tentang",
    path: "/about",
    enabled: true,
  },
];

/*==================================================
 EXPORT
==================================================*/

export default navigation;
