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
import { Link } from "react-router-dom";

/*==================================================
 PRODUCT CARD
==================================================*/

function ProductCard({ product }) {
  /*==================================================
  PRODUCT DATA
==================================================*/

  const {
    slug,
    name,
    image,
    category,
    price,
    originalPrice,
    rating,
    sold,
    discount,
  } = product;

  return (
    <article
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
        hover:ring-2
hover:ring-emerald-100
        cursor-pointer
      "
    >
      {/*==================================================
        PRODUCT IMAGE
      ==================================================*/}

      <div className="relative overflow-hidden">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-red-500 to-rose-500 shadow-lg px-2 py-1 text-xs font-semibold text-white">
          -{discount}%
        </span>

        <button
          type="button"
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
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:text-red-500
            "
          />
        </button>

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="
            aspect-square
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
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>

        {/*==================================================
          PRODUCT RATING
        ==================================================*/}

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />

            <span>{rating}</span>
          </div>

          <span>•</span>

          <span>{sold} Terjual</span>
        </div>

        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {category}
        </p>

        {/*==================================================
          PRODUCT PRICE
        ==================================================*/}

        <div className="space-y-1">
          <p className="text-xs text-slate-400">Harga mulai</p>
          <p className="text-2xl font-extrabold text-emerald-600">{price}</p>

          <p className="text-xs line-through text-slate-400">{originalPrice}</p>
        </div>

        {/*==================================================
          CTA BUTTON
        ==================================================*/}

        <Link
          to={`/product/${slug}`}
          className="
    mt-6
    block
    w-full
    rounded-xl
    bg-emerald-600
    py-3
    text-center
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-emerald-700
    hover:shadow-lg
  "
        >
          Lihat Detail →
        </Link>
      </div>
    </article>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default ProductCard;
