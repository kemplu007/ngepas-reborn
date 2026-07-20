/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductCard.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { Star } from "lucide-react";
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
    price,
    originalPrice,
    rating,
    discount,
    badge,
    reason,
  } = product;

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/*==================================================
        PRODUCT IMAGE
      ==================================================*/}

      <div className="relative overflow-hidden">
        <span className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow">
          -{discount}%
        </span>

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="
            h-36
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

      <div className="space-y-1.5 p-3">
        {/* PRODUCT NAME */}

        <h3 className="text-[15px] line-clamp-2 min-h-10 font-semibold leading-snug text-slate-900">
          {name}
        </h3>

        {/* PRODUCT RATING */}

        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Star
            size={13}
            className="fill-yellow-400 text-yellow-400"
          />

          <span>{rating}</span>
        </div>

        {/* PRODUCT PRICE */}

        <div>

          <p className="text-base font-bold text-emerald-600">
            {price}
          </p>

          <p className="text-[11px] text-slate-400 line-through">
            {originalPrice}
          </p>
        </div>

        {/* BADGE */}

        {badge && (
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {badge}
          </span>
        )}

        {/* REASON */}

        {reason && (
          <p className="text-xs leading-relaxed text-slate-500">
            {reason}
          </p>
        )}

        {/* CTA */}

        <Link
          to={`/product/${slug}`}
          className="
            mt-3
            block
            rounded-lg
            bg-emerald-600
            py-2
            text-center
            text-[13px]
            font-semibold
            text-white
            transition-colors
            hover:bg-emerald-700
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