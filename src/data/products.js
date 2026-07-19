/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : products.js
 Module  : Data
==================================================*/

/*==================================================
 PRODUCT IMAGES
==================================================*/

import lampuTidur from "../assets/products/lampu-tidur.jpg";
import rakDinding from "../assets/products/rak-dinding.jpg";
import tanaman from "../assets/products/tanaman.jpg";
import rakBumbu from "../assets/products/rak-bumbu.jpg";

/*==================================================
 PRODUCT DATA
==================================================*/

const products = [
  {
    id: 1,
    slug: "lampu-tidur-minimalis",

    name: "Lampu Tidur Minimalis",
    category: "Home",

    image: lampuTidur,

    price: "Rp89.000",
    originalPrice: "Rp109.000",
    discount: 18,

    rating: 4.8,
    sold: 1200,

    featured: true,
    stock: 35,

    affiliateLink: "#",

        description:
      "Lampu tidur bergaya minimalis dengan cahaya hangat yang nyaman untuk menemani waktu istirahat maupun bekerja.",

    features: [
      "LED Hemat Energi",
      "Cahaya Warm White",
      "Desain Minimalis Modern",
      "Material Premium",
    ],

    specifications: {
      warna: "Warm White",
      material: "ABS + Acrylic",
      ukuran: "20 x 12 cm",
      daya: "8 Watt",
    },

        whyWeRecommend: [
      "Cahaya hangat yang nyaman di mata",
      "Desain minimalis cocok untuk berbagai ruangan",
      "Hemat listrik untuk penggunaan harian",
    ],

    bestFor: [
      "Kamar Tidur",
      "Meja Belajar",
      "Anak Kos",
    ],

    considerations: [
      "Hanya untuk penggunaan indoor",
      "Bukan lampu utama ruangan",
    ],
  },

  {
    id: 2,
    slug: "rak-dinding-kayu",

    name: "Rak Dinding Kayu",
    category: "Furniture",

    image: rakDinding,

    price: "Rp149.000",
    originalPrice: "Rp189.000",
    discount: 21,

    rating: 4.9,
    sold: 890,

    featured: true,
    stock: 30,

    affiliateLink: "#",

        description:
      "Rak dinding kayu multifungsi untuk menyimpan dekorasi, buku, maupun perlengkapan rumah agar lebih rapi.",

    features: [
      "Kayu Berkualitas",
      "Pemasangan Mudah",
      "Minimalis",
      "Kuat dan Kokoh",
    ],

    specifications: {
      material: "Kayu MDF",
      ukuran: "60 x 20 cm",
      warna: "Natural Oak",
      kapasitas: "20 Kg",
    },

        whyWeRecommend: [
      "Memanfaatkan dinding agar ruangan lebih rapi",
      "Material kokoh dengan desain minimalis",
      "Mudah dipasang tanpa alat khusus",
    ],

    bestFor: [
      "Ruang Tamu",
      "Kamar Tidur",
      "Apartemen",
    ],

    considerations: [
      "Pastikan dinding cukup kuat",
      "Jangan melebihi kapasitas beban",
    ],
  },

  {
    id: 3,
    slug: "tanaman-artificial",

    name: "Tanaman Artificial",
    category: "Decoration",

    image: tanaman,

    price: "Rp59.000",
    originalPrice: "Rp79.000",
    discount: 25,

    rating: 4.7,
    sold: 2500,

    featured: true,
    stock: 39,

    affiliateLink: "#",

        description:
      "Tanaman artificial yang memberikan nuansa segar tanpa perlu disiram maupun perawatan rutin.",

    features: [
      "Tanpa Perawatan",
      "Daun Realistis",
      "Pot Minimalis",
      "Cocok untuk Indoor",
    ],

    specifications: {
      tinggi: "35 cm",
      material: "Plastic Premium",
      pot: "PVC",
      warna: "Hijau",
    },

        whyWeRecommend: [
      "Memberikan kesan segar tanpa perawatan",
      "Daun terlihat realistis",
      "Cocok sebagai dekorasi berbagai ruangan",
    ],

    bestFor: [
      "Ruang Tamu",
      "Kantor",
      "Meja Kerja",
    ],

    considerations: [
      "Perlu dibersihkan dari debu secara berkala",
      "Tidak memiliki aroma alami seperti tanaman hidup",
    ],
  },

  {
    id: 4,
    slug: "rak-bumbu-dapur",

    name: "Rak Bumbu Dapur",
    category: "Kitchen",

    image: rakBumbu,

    price: "Rp129.000",
    originalPrice: "Rp169.000",
    discount: 24,

    rating: 4.9,
    sold: 640,

    featured: true,
    stock: 25,

    affiliateLink: "#",

        description:
      "Rak bumbu dapur bertingkat untuk menyusun bumbu masak agar dapur tetap bersih dan mudah dijangkau.",

    features: [
      "2 Tingkat",
      "Anti Karat",
      "Mudah Dibersihkan",
      "Hemat Ruang",
    ],

    specifications: {
      material: "Besi Powder Coating",
      ukuran: "40 x 18 x 35 cm",
      warna: "Hitam",
      tingkat: "2",
    },

        whyWeRecommend: [
      "Membuat dapur lebih rapi dan terorganisir",
      "Material tahan karat untuk penggunaan jangka panjang",
      "Menghemat ruang di meja dapur",
    ],

    bestFor: [
      "Dapur Minimalis",
      "Rumah Tangga",
      "Apartemen",
    ],

    considerations: [
      "Rakit terlebih dahulu sebelum digunakan",
      "Gunakan pada permukaan yang rata",
    ],
  },
];

/*==================================================
 EXPORT
==================================================*/

export default products;