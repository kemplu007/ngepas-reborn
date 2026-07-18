/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductCard.jsx
 Module  : Components
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { Heart, Star } from "lucide-react";

/*==================================================
 COMPONENT
==================================================*/

function ProductCard({ product }) {
  return (
    <div
      className="
  group
  overflow-hidden
  rounded-2xl
  border
  border-slate-100
  bg-white
  shadow-sm
  transition-all
  duration-300
  hover:-translate-y-2
  hover:border-emerald-200
  hover:shadow-xl
"
    >
      {/*==================================================
             PRODUCT IMAGE
            ==================================================*/}
      <div className="relative overflow-hidden">
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white z-10">
          -{product.discount}%
        </span>

        <button
          className="
absolute
right-3
top-3
z-10
rounded-full
bg-white/90
p-2
shadow-md
backdrop-blur-sm
transition-all
duration-300
hover:scale-110
hover:bg-red-50
hover:shadow-lg
"
        >
          <Heart
            size={18}
            className="
    text-slate-500
    transition-colors
    duration-300
    group-hover:text-red-500
    group-hover:scale-110"
          />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="
h-56
w-full
object-cover
transition-transform
duration-500
group-hover:scale-105
"
        />
      </div>

      {/*==================================================
 PRODUCT INFO
==================================================*/}

      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>

        {/*==================================================
 PRODUCT RATING
==================================================*/}

        <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>

          <span>•</span>

          <span>Terjual {product.sold}</span>
        </div>

        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {product.category}
        </p>

        {/*==================================================
 PRODUCT PRICE
==================================================*/}

        <div className="mt-1 space-y-1">
          <p className="text-2xl font-extrabold text-emerald-600">
            {product.price}
          </p>

          <p className="text-xs text-slate-400 line-through">
            {product.originalPrice}
          </p>
        </div>

        {/*==================================================
 CTA BUTTON
==================================================*/}

        <button
          className="
    mt-6
    w-full
    rounded-xl
    bg-emerald-600
    py-3
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-emerald-700
        hover:shadow-lg
          
"
        >
          Lihat Produk
        </button>
      </div>
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default ProductCard;
