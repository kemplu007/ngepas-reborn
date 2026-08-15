/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductDetail.jsx
 Module  : Pages
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ExternalLink,
  Info,
  PackageCheck,
  ShoppingCart,
  Star,
  Tag,
  ThumbsUp,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/discover/ProductCard";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";

/*==================================================
 LOCAL STYLE CONTRACTS
==================================================*/

const primaryLinkClass =
  "inline-flex min-h-[var(--np-control-height-lg)] w-full items-center justify-center gap-2 rounded-np-md bg-[var(--np-color-action-primary)] px-[var(--np-space-5)] text-[var(--np-text-body)] font-medium text-[var(--np-color-action-primary-contrast)] transition-[background-color,border-color,color,opacity,transform] duration-np-fast ease-np-standard active:scale-[var(--np-motion-scale-pressed)] hover:bg-[var(--np-color-action-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2 motion-reduce:transition-none";

const backLinkClass =
  "inline-flex min-h-[var(--np-control-height-md)] items-center gap-2 rounded-np-md px-[var(--np-space-3)] text-[var(--np-text-small)] font-medium text-[var(--np-color-text-secondary)] transition-[background-color,color,transform] duration-np-fast ease-np-standard hover:bg-[var(--np-color-surface-accent)] hover:text-[var(--np-color-action-primary)] active:scale-[var(--np-motion-scale-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2 motion-reduce:transition-none";

/*==================================================
 DETAIL PANEL
==================================================*/

function DetailPanel({ icon: Icon, title, children, variant = "default" }) {
  return (
    <Card variant={variant} className="space-y-[var(--np-space-4)]">
      <div className="flex items-center gap-[var(--np-space-2)]">
        <Icon
          size={18}
          aria-hidden="true"
          className="shrink-0 text-[var(--np-color-action-primary)]"
        />
        <h2 className="text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
          {title}
        </h2>
      </div>
      {children}
    </Card>
  );
}

/*==================================================
 PRODUCT DETAIL
==================================================*/

function ProductDetail() {
  /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  const { products, loading, error } = useProducts();

  /*==================================================
   GET URL PARAMETER
  ==================================================*/

  const { slug } = useParams();

  /*==================================================
   FIND PRODUCT
  ==================================================*/

  const product = products.find((item) => item.slug === slug);

  /*==================================================
   GALLERY STATE
  ==================================================*/

  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = useMemo(() => {
    const images = [];

    if (product?.image) {
      images.push(product.image);
    }

    if (product?.gallery?.length) {
      product.gallery.forEach((item) => {
        if (!images.includes(item)) {
          images.push(item);
        }
      });
    }

    return images;
  }, [product]);

  useEffect(() => {
    setSelectedImage(0);
  }, [slug]);

  /*==================================================
   PRODUCT STATES
  ==================================================*/

  if (loading) {
    return (
      <Section surface="muted" className="min-h-[60vh]">
        <Card variant="elevated" className="mx-auto max-w-md text-center">
          <p className="text-[var(--np-text-small)] text-[var(--np-color-muted)]">
            Memuat produk...
          </p>
        </Card>
      </Section>
    );
  }

  if (error) {
    return (
      <Section surface="muted" className="min-h-[60vh]">
        <Card
          variant="elevated"
          className="mx-auto flex max-w-lg flex-col items-center gap-[var(--np-space-3)] text-center"
        >
          <Info
            size={22}
            aria-hidden="true"
            className="text-[var(--np-color-danger)]"
          />
          <h1 className="text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
            Produk belum dapat dimuat
          </h1>
          <p className="text-[var(--np-text-small)] text-[var(--np-color-muted)]">
            {error}
          </p>
          <Link to="/" className={backLinkClass}>
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke Home
          </Link>
        </Card>
      </Section>
    );
  }

  if (!product) {
    return (
      <Section surface="muted" className="min-h-[60vh]">
        <Card
          variant="elevated"
          className="mx-auto flex max-w-lg flex-col items-center gap-[var(--np-space-3)] text-center"
        >
          <AlertTriangle
            size={22}
            aria-hidden="true"
            className="text-[var(--np-color-yellow-700)]"
          />
          <h1 className="text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
            Produk tidak ditemukan.
          </h1>
          <p className="text-[var(--np-text-small)] text-[var(--np-color-muted)]">
            Produk mungkin sudah tidak tersedia atau tautannya tidak valid.
          </p>
          <Link to="/" className={backLinkClass}>
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke Home
          </Link>
        </Card>
      </Section>
    );
  }

  /*==================================================
   DESTRUCTURING
  ==================================================*/

  const {
    name,
    image,
    room,
    category,
    badge,
    tags = [],
    description,
    features = [],
    specifications = {},
    whyWeRecommend = [],
    bestFor = [],
    considerations = [],
    price,
    originalPrice,
    discount,
    rating,
    sold,
    stock,
    affiliateLink,
  } = product;

  /*==================================================
   RELATED PRODUCTS
  ==================================================*/

  const relatedProducts = products
    .filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    .slice(0, 3);

  /*==================================================
   PRODUCT DETAIL UI
  ==================================================*/

  return (
    <>
      {/*==================================================
       PRODUCT HERO
      ==================================================*/}

      <Section className="pt-[var(--np-space-5)] sm:pt-[var(--np-space-8)]">
        <Link to="/" className={backLinkClass}>
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali
        </Link>

        <div className="mt-[var(--np-space-6)] grid gap-[var(--np-space-8)] lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-[var(--np-space-12)]">
          {/*==================================================
           PRODUCT IMAGE AND GALLERY
          ==================================================*/}

          <div className="space-y-[var(--np-space-3)] lg:sticky lg:top-24">
            <Card variant="muted" className="overflow-hidden p-[var(--np-space-2)] sm:p-[var(--np-space-3)]">
              {galleryImages.length > 0 ? (
                <img
                  src={galleryImages[selectedImage]}
                  alt={name}
                  className="aspect-square w-full rounded-np-sm object-cover transition-transform duration-np-slow ease-np-standard hover:scale-[1.02] motion-reduce:transition-none"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-np-sm bg-[var(--np-color-surface-muted)] text-[var(--np-text-small)] text-[var(--np-color-muted)]">
                  Gambar produk belum tersedia.
                </div>
              )}
            </Card>

            {galleryImages.length > 1 && (
              <div className="flex gap-[var(--np-space-2)] overflow-x-auto pb-1">
                {galleryImages.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    aria-label={`Tampilkan gambar ${index + 1} dari ${name}`}
                    aria-pressed={selectedImage === index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 overflow-hidden rounded-np-sm border-2 p-0.5 transition-[border-color,box-shadow,transform] duration-np-normal ease-np-standard hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2 motion-reduce:transition-none ${selectedImage === index ? "border-[var(--np-color-action-primary)] shadow-np-sm" : "border-[var(--np-color-border)]"}`}
                  >
                    <img
                      src={item}
                      alt={`${name} ${index + 1}`}
                      className="h-16 w-16 rounded-np-xs object-cover sm:h-20 sm:w-20"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/*==================================================
           PRODUCT INFORMATION
          ==================================================*/}

          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="mb-[var(--np-space-4)] flex flex-wrap items-center gap-1.5 text-[var(--np-text-caption)] text-[var(--np-color-muted)]"
            >
              <Link to="/" className="hover:text-[var(--np-color-action-primary)]">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span>{room}</span>
              <span aria-hidden="true">/</span>
              <span>{category}</span>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-[var(--np-color-text-primary)]">
                {name}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-[var(--np-space-2)]">
              <Badge variant="primary">{category}</Badge>
              {badge && <Badge variant="accent">{badge}</Badge>}
            </div>

            <h1 className="mt-[var(--np-space-4)] max-w-2xl text-[var(--np-text-display)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--np-color-text-primary)]">
              {name}
            </h1>

            <p className="mt-[var(--np-space-4)] max-w-2xl text-[var(--np-text-body)] leading-relaxed text-[var(--np-color-text-secondary)]">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="mt-[var(--np-space-4)] flex flex-wrap gap-[var(--np-space-2)]">
                {tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/*==================================================
             PRICE AND META
            ==================================================*/}

            <div className="mt-[var(--np-space-6)]">
              {originalPrice && (
                <p className="text-[var(--np-text-small)] text-[var(--np-color-subtle)] line-through">
                  {originalPrice}
                </p>
              )}

              <div className="mt-1 flex flex-wrap items-center gap-[var(--np-space-3)]">
                <p className="text-[var(--np-text-h1)] font-semibold tracking-[-0.03em] text-[var(--np-color-action-primary)]">
                  {price}
                </p>
                {discount && <Badge variant="danger">-{discount}%</Badge>}
              </div>
            </div>

            <div className="mt-[var(--np-space-5)] flex flex-wrap gap-[var(--np-space-2)]">
              <Badge variant="accent">
                <Star
                  size={14}
                  aria-hidden="true"
                  className="mr-1 fill-current"
                />
                {rating}
              </Badge>
              <Badge variant="neutral">
                <Tag size={14} aria-hidden="true" className="mr-1" />
                {sold} Terjual
              </Badge>
              <Badge variant={stock > 10 ? "primary" : "danger"}>
                <PackageCheck size={14} aria-hidden="true" className="mr-1" />
                {stock > 10 ? `Stok ${stock}` : `Sisa ${stock}`}
              </Badge>
            </div>

            {/*==================================================
             WHY WE RECOMMEND
            ==================================================*/}

            <Card
              variant="default"
              className="mt-[var(--np-space-6)] border-[var(--np-color-green-200)] bg-[var(--np-color-green-100)]/40"
            >
              <div className="flex items-center gap-[var(--np-space-2)]">
                <ThumbsUp
                  size={18}
                  aria-hidden="true"
                  className="text-[var(--np-color-action-primary)]"
                />
                <h2 className="text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
                  Kenapa Kami Memilih Produk Ini
                </h2>
              </div>
              <ul className="mt-[var(--np-space-4)] space-y-[var(--np-space-3)]">
                {whyWeRecommend.map((item) => (
                  <li
                    key={item}
                    className="flex gap-[var(--np-space-2)] text-[var(--np-text-small)] leading-relaxed text-[var(--np-color-text-secondary)]"
                  >
                    <Check
                      size={17}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[var(--np-color-action-primary)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/*==================================================
             AFFILIATE CTA
            ==================================================*/}

            <div className="sticky bottom-4 z-20 mt-[var(--np-space-6)]">
              {affiliateLink ? (
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryLinkClass}
                >
                  <ShoppingCart size={18} aria-hidden="true" />
                  Cek Harga di Marketplace
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              ) : (
                <Button type="button" size="lg" disabled className="w-full">
                  <ShoppingCart size={18} aria-hidden="true" />
                  Link Marketplace Belum Tersedia
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/*==================================================
       SUPPORTING PRODUCT INFORMATION
      ==================================================*/}

      <Section className="pt-0">
        <div className="grid gap-[var(--np-space-4)] md:grid-cols-2 lg:grid-cols-4">
          <DetailPanel icon={Check} title="Keunggulan">
            <ul className="space-y-[var(--np-space-3)]">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-[var(--np-space-2)] text-[var(--np-text-small)] leading-relaxed text-[var(--np-color-text-secondary)]"
                >
                  <Check
                    size={16}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[var(--np-color-action-primary)]"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </DetailPanel>

          <DetailPanel icon={Tag} title="Spesifikasi">
            <dl className="space-y-[var(--np-space-3)]">
              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-[var(--np-space-3)] border-b border-[var(--np-color-border)] pb-[var(--np-space-2)] last:border-b-0 last:pb-0"
                >
                  <dt className="text-[var(--np-text-caption)] font-semibold capitalize text-[var(--np-color-text-secondary)]">
                    {key}
                  </dt>
                  <dd className="text-right text-[var(--np-text-caption)] text-[var(--np-color-muted)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </DetailPanel>

          <DetailPanel icon={PackageCheck} title="Cocok Untuk">
            <div className="flex flex-wrap gap-[var(--np-space-2)]">
              {bestFor.map((item) => (
                <Badge key={item} variant="neutral">
                  {item}
                </Badge>
              ))}
            </div>
          </DetailPanel>

          <DetailPanel icon={AlertTriangle} title="Perlu Diketahui" variant="muted">
            <ul className="space-y-[var(--np-space-3)]">
              {considerations.map((item) => (
                <li
                  key={item}
                  className="flex gap-[var(--np-space-2)] text-[var(--np-text-small)] leading-relaxed text-[var(--np-color-text-secondary)]"
                >
                  <Info
                    size={16}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[var(--np-color-yellow-700)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DetailPanel>
        </div>
      </Section>

      {/*==================================================
       RELATED PRODUCTS
      ==================================================*/}

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Pilihan terkait"
          title="Produk Serupa"
          description="Masih satu kategori dan mungkin juga cocok buat kamu."
        />

        <div className="grid gap-[var(--np-space-4)] sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              href={`/product/${item.slug}`}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default ProductDetail;
