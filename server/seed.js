/*==================================================
 NGEPAS REBORN
 File   : seed.js
 Module : Database Seeder
==================================================*/

const db = require("./database");

/*==================================================
 PRODUCT SEED DATA
==================================================*/

const products = [
  {
    room: "bedroom",
    category: "lampu-tidur",
    slug: "lampu-tidur-minimalis",
    name: "Lampu Tidur Minimalis",
    image: "/src/assets/products/lampu-tidur.jpg",

    price: 89000,
    originalPrice: 109000,
    discount: 18,

    badge: "Pilihan Ngepas",
    reason: "Cahaya hangat dan hemat listrik.",

    rating: 4.8,
    sold: 1200,
    featured: 1,
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

    bestFor: ["Kamar Tidur", "Meja Belajar", "Anak Kos"],

    considerations: [
      "Hanya untuk penggunaan indoor",
      "Bukan lampu utama ruangan",
    ],
  },

  {
    room: "living-room",
    category: "rak",
    slug: "rak-dinding-kayu",
    name: "Rak Dinding Kayu",
    image: "/src/assets/products/rak-dinding.jpg",

    price: 149000,
    originalPrice: 189000,
    discount: 21,

    badge: null,
    reason: null,

    rating: 4.9,
    sold: 890,
    featured: 1,
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

    bestFor: ["Ruang Tamu", "Kamar Tidur", "Apartemen"],

    considerations: [
      "Pastikan dinding cukup kuat",
      "Jangan melebihi kapasitas beban",
    ],
  },

  {
    room: "living-room",
    category: "dekorasi",
    slug: "tanaman-artificial",
    name: "Tanaman Artificial",
    image: "/src/assets/products/tanaman.jpg",

    price: 59000,
    originalPrice: 79000,
    discount: 25,

    badge: null,
    reason: null,

    rating: 4.7,
    sold: 2500,
    featured: 1,
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

    bestFor: ["Ruang Tamu", "Kantor", "Meja Kerja"],

    considerations: [
      "Perlu dibersihkan dari debu secara berkala",
      "Tidak memiliki aroma alami seperti tanaman hidup",
    ],
  },

  {
    room: "kitchen",
    category: "rak-bumbu",
    slug: "rak-bumbu-dapur",
    name: "Rak Bumbu Dapur",
    image: "/src/assets/products/rak-bumbu.jpg",

    price: 129000,
    originalPrice: 169000,
    discount: 24,

    badge: null,
    reason: null,

    rating: 4.9,
    sold: 640,
    featured: 1,
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

    bestFor: ["Dapur Minimalis", "Rumah Tangga", "Apartemen"],

    considerations: [
      "Rakit terlebih dahulu sebelum digunakan",
      "Gunakan pada permukaan yang rata",
    ],
  },
];

/*==================================================
 INSERT PRODUCTS
==================================================*/

const insertProduct = db.prepare(`
  INSERT INTO products (
    name,
    room,
    category,
    slug,
    price,
    originalPrice,
    discount,
    image,
    badge,
    reason,
    rating,
    sold,
    featured,
    stock,
    affiliateLink,
    description,
    features,
    specifications,
    whyWeRecommend,
    bestFor,
    considerations
  )
  VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

/*==================================================
 RUN SEED
==================================================*/

for (const product of products) {
  insertProduct.run(
    product.name,
    product.room,
    product.category,
    product.slug,
    product.price,
    product.originalPrice,
    product.discount,
    product.image,
    product.badge,
    product.reason,
    product.rating,
    product.sold,
    product.featured,
    product.stock,
    product.affiliateLink,
    product.description,
    JSON.stringify(product.features),
    JSON.stringify(product.specifications),
    JSON.stringify(product.whyWeRecommend),
    JSON.stringify(product.bestFor),
    JSON.stringify(product.considerations)
  );

  console.log(`Seeded: ${product.name}`);
}

console.log("🌱 Ngepas product seed completed.");
