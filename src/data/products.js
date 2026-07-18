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
  },
];

/*==================================================
 EXPORT
==================================================*/

export default products;