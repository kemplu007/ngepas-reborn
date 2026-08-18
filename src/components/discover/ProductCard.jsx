/*==================================================
 NGEPAS REBORN
 File    : ProductCard.jsx
 Module  : Discover Components
==================================================*/

import { ArrowRight, Heart, Star, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import IconButton from "../ui/IconButton";

function ProductCard({
  product,
  favorite = false,
  onFavorite,
  href,
  compact = false,
}) {
  const productHref = href || `/product/${product.slug}`;
  const hasRating = product.rating !== undefined && product.rating !== null && product.rating !== "";
  const hasReviewCount = product.reviewCount !== undefined && product.reviewCount !== null && product.reviewCount !== "" && product.reviewCount !== "—";
  const hasMarketplace = Boolean(product.marketplace) && product.marketplace !== "Data katalog";
  const priceLabel = product.priceLabel || (typeof product.price === "number"
    ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price)
    : product.price);

  return (
    <article
      className={`group min-w-[var(--np-card-min-width)] overflow-hidden rounded-np-sm border border-[var(--np-color-border)] bg-[var(--np-color-white)] shadow-[var(--np-shadow-none)] transition-[border-color,box-shadow,transform] duration-np-fast ease-np-standard hover:-translate-y-[var(--np-motion-distance-sm)] hover:border-[var(--np-color-green-200)] hover:shadow-[var(--np-shadow-sm)] motion-reduce:hover:translate-y-0 ${compact ? "sm:min-w-[11.875rem]" : "sm:min-w-0"}`}
    >
      <div className="relative aspect-[1.28] overflow-hidden bg-[var(--np-color-surface-muted)]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-np-normal ease-np-standard group-hover:scale-105 motion-reduce:transform-none"
        />
        {product.badge && (
          <Badge className="absolute left-2.5 top-2.5 bg-[var(--np-color-green-700)] text-white">
            {product.badge}
          </Badge>
        )}
        {onFavorite && (
          <IconButton
            label={favorite ? "Hapus dari favorite" : "Simpan ke favorite"}
            pressed={favorite}
            onClick={() => onFavorite(product.slug)}
            className="absolute right-2.5 top-2.5 bg-white/90 shadow-[var(--np-shadow-sm)] backdrop-blur"
          >
            <Heart size={16} className={favorite ? "fill-rose-500 text-rose-500" : ""} />
          </IconButton>
        )}
      </div>
      <div className="space-y-[var(--np-space-3)] p-[var(--np-space-3)] sm:p-[var(--np-space-4)]">
        <p className="text-[var(--np-text-caption)] font-medium text-[var(--np-color-subtle)]">
          {product.category}
        </p>
        <h3 className="line-clamp-2 min-h-10 text-[var(--np-text-small)] font-semibold leading-tight text-[var(--np-color-ink)]">
          {product.name}
        </h3>
        {hasRating && (
          <div className="flex items-center gap-[var(--np-space-1)] text-[var(--np-text-caption)] text-[var(--np-color-muted)]">
            <Star size={13} className="fill-[var(--np-color-yellow-500)] text-[var(--np-color-yellow-500)]" />
            <span className="font-medium text-[var(--np-color-ink-soft)]">{product.rating}</span>
            {hasReviewCount && <span aria-label={`${product.reviewCount} review`}>· {product.reviewCount} review</span>}
          </div>
        )}
        <p className="text-[var(--np-text-body)] font-semibold text-[var(--np-color-green-700)]">{priceLabel}</p>
        {hasMarketplace && (
          <p className="flex items-center gap-[var(--np-space-1)] text-[var(--np-text-caption)] text-[var(--np-color-subtle)]">
            <Tag size={11} aria-hidden="true" /> {product.marketplace}
          </p>
        )}
        <Link
          to={productHref}
          className="flex min-h-[var(--np-control-height-md)] items-center justify-between gap-[var(--np-space-2)] rounded-np-xs border border-[var(--np-color-border-strong)] bg-[var(--np-color-white)] px-[var(--np-space-3)] text-[var(--np-text-caption)] font-semibold text-[var(--np-color-green-700)] transition-[background-color,border-color,color] duration-np-fast ease-np-standard hover:border-[var(--np-color-green-700)] hover:bg-[var(--np-color-green-100)] hover:text-[var(--np-color-green-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          <span className="whitespace-nowrap">Lihat detail</span><ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
