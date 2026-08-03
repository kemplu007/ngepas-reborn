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

import { Star, ArrowRight } from "lucide-react";
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
        border-border
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
      "
    >
      {/*==================================================
        PRODUCT IMAGE
      ==================================================*/}

      <div className="relative overflow-hidden">
        {discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-white shadow-sm">
            -{discount}%
          </span>
        )}

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

        <h3 className="text-[15px] line-clamp-2 min-h-10 font-semibold leading-snug text-foreground">
          {name}
        </h3>

        {/* PRODUCT RATING */}

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star size={13} className="fill-amber-400 text-amber-400" />

          <span>{rating}</span>
        </div>

        {/* PRODUCT PRICE */}

        <div>
          <p className="text-base font-bold text-primary">{price}</p>

          <p className="text-[11px] text-muted-foreground line-through">
            {originalPrice}
          </p>
        </div>

        {/* BADGE */}

        {badge && (
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {badge}
          </span>
        )}

        {/* REASON */}

        {reason && (
          <p className="text-xs leading-relaxed text-muted-foreground">{reason}</p>
        )}

        {/* CTA */}

        <Link
          to={`/product/${slug}`}
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-1
            rounded-lg
            bg-secondary
            py-2
            text-center
            text-[13px]
            font-semibold
            text-secondary-foreground
            transition-colors
            hover:bg-primary
            hover:text-primary-foreground
          "
        >
          Lihat Detail
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default ProductCard;
