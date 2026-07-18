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
    name: "Lampu Tidur Minimalis",
    category: "Home",
    price: "Rp89.000",
    originalPrice: "Rp109.000",
    discount: 18,
    rating: 4.8,
    sold: "1.2k",
    image: lampuTidur,
  },
  {
    id: 2,
    name: "Rak Dinding Kayu",
    category: "Furniture",
    price: "Rp149.000",
    originalPrice: "Rp189.000",
    discount: 21,
    rating: 4.9,
    sold: "890",
    image: rakDinding,
  },
  {
    id: 3,
    name: "Tanaman Artificial",
    category: "Decoration",
    price: "Rp59.000",
    originalPrice: "Rp79.000",
    discount: 25,
    rating: 4.7,
    sold: "2.5k",
    image: tanaman,
  },
  {
    id: 4,
    name: "Rak Bumbu Dapur",
    category: "Kitchen",
    price: "Rp129.000",
    originalPrice: "Rp169.000",
    discount: 24,
    rating: 4.9,
    sold: "640",
    image: rakBumbu,
  },
];

/*==================================================
 EXPORT
==================================================*/

export default products;
