/*==================================================
 NGEPAS REBORN
 File    : ProductForm.jsx
 Module  : Admin Pages
==================================================*/

import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, Circle, Plus, Save, X } from "lucide-react";

import rooms from "../../data/rooms";
import roomCategories from "../../data/roomCategories";
import { useProducts } from "../../context/ProductContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate, useParams } from "react-router-dom";

/* Admin feature helpers */
import { getProductContentReadiness } from "../../components/admin/productReadiness";

/* UI Foundation */
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Container from "../../components/ui/Container";
import FormField from "../../components/ui/FormField";
import IconButton from "../../components/ui/IconButton";
import Input from "../../components/ui/Input";
import SelectField from "../../components/ui/SelectField";
import TextareaField from "../../components/ui/TextareaField";

/*==================================================
 DESIGN INTENT
 Admin form should read as one focused mobile-first
 work surface: explicit step context, restrained width,
 full-width touch actions, and visible completeness cues
 without changing form flow or product behavior.
==================================================*/

/*==================================================
 GALLERY URL ASSISTANT
 Mirrors the active product validator locally so admin
 receives actionable feedback before form submission.
==================================================*/
const PRODUCT_GALLERY_LIMIT = 8;

function isValidGalleryUrl(value) {
  try {
    const parsedUrl = new URL(value);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

/*==================================================
 INITIAL STATE
==================================================*/
const initialFormData = {
  name: "",
  room: "",
  category: "",
  image: "",
  price: "",
  originalPrice: "",
  discount: "",
  rating: "",
  sold: "",
  stock: "",
  affiliateLink: "",
  featured: false,
  badge: "",
  tags: "",
  status: "published",
  gallery: "",
  description: "",
  features: "",
  specifications: "",
  whyWeRecommend: "",
  bestFor: "",
  considerations: "",
};

/*==================================================
 COMPONENT
==================================================*/
function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adminProducts: products, addProduct, updateProduct } = useProducts();
  const { toast } = useToast();

  const editingProduct = products.find((p) => p.id === Number(id));
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormData);
  const [imageError, setImageError] = useState(false);

  const [gallery, setGallery] = useState([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [galleryUrlError, setGalleryUrlError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [curationError, setCurationError] = useState("");

  const CURATED_REASON_MIN_LENGTH = 8;

  /*==================================================
   DERIVED VALUES
  ==================================================*/
  const calculatedDiscount =
    formData.originalPrice &&
    formData.price &&
    Number(formData.originalPrice) > Number(formData.price)
      ? Math.round(
          ((Number(formData.originalPrice) - Number(formData.price)) /
            Number(formData.originalPrice)) *
            100,
        )
      : 0;

  const generatedSlug = formData.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  const contentReadiness = getProductContentReadiness(formData);
  const affiliateLinkReady =
    contentReadiness.items.find((item) => item.key === "affiliateLink")
      ?.complete ?? false;
  const mainImageReady =
    contentReadiness.items.find((item) => item.key === "image")?.complete ??
    false;

  const completenessItems = [
    {
      label: "Nama produk",
      step: 1,
      complete: Boolean(formData.name.trim()),
    },
    {
      label: "Harga",
      step: 2,
      complete: Boolean(String(formData.price).trim()),
    },
    {
      label: "Link affiliate",
      step: 2,
      complete: affiliateLinkReady,
    },
    {
      label: "Gambar utama",
      step: 3,
      complete: mainImageReady,
    },
  ];

  const completedRequiredFields = completenessItems.filter(
    (item) => item.complete,
  ).length;
  const isContentComplete =
    completedRequiredFields === completenessItems.length;
  const statusLabel = formData.status === "published" ? "Published" : "Draft";
  const gallerySlotsRemaining = Math.max(
    0,
    PRODUCT_GALLERY_LIMIT - gallery.length,
  );
  const galleryLimitReached = gallery.length >= PRODUCT_GALLERY_LIMIT;

  /*==================================================
   FOUNDATION OPTIONS
  ==================================================*/
  const roomOptions = [
    { value: "", label: "Pilih ruangan" },
    ...rooms.map((room) => ({
      value: room.slug,
      label: room.name,
    })),
  ];

  const categoryOptions = [
    { value: "", label: "Pilih kategori" },
    ...(formData.room
      ? (roomCategories[formData.room] || []).map((category) => ({
          value: category,
          label: category,
        }))
      : []),
  ];

  const statusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  const badgeOptions = [
    { value: "", label: "Tanpa badge" },
    { value: "Best Seller", label: "Best Seller" },
    { value: "Premium", label: "Premium" },
    { value: "Paling Worth It", label: "Paling Worth It" },
    { value: "Limited", label: "Limited" },
    { value: "New", label: "New" },
  ];

  /*==================================================
   HANDLERS
  ==================================================*/
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "image") setImageError(false);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value === "" ? "" : value,
    }));
  };

  const handleRoomChange = (e) => {
    const room = e.target.value;
    setFormData((prev) => ({ ...prev, room, category: "" }));
  };

  const handleAddGallery = () => {
    const url = newGalleryUrl.trim();

    if (!url) {
      setGalleryUrlError("Masukkan URL gambar terlebih dahulu.");
      return;
    }

    if (!isValidGalleryUrl(url)) {
      setGalleryUrlError("Gunakan URL gambar http atau https yang valid.");
      return;
    }

    if (gallery.includes(url)) {
      setGalleryUrlError("URL ini sudah ada di gallery.");
      return;
    }

    if (galleryLimitReached) {
      setGalleryUrlError(
        `Gallery maksimal ${PRODUCT_GALLERY_LIMIT} gambar. Hapus satu gambar sebelum menambah lagi.`,
      );
      return;
    }

    setGallery((prev) => [...prev, url]);
    setNewGalleryUrl("");
    setGalleryUrlError("");
  };

  const handleRemoveGallery = (urlToRemove) => {
    setGallery((prev) => prev.filter((url) => url !== urlToRemove));
    setGalleryUrlError("");
  };

  const handleGalleryUrlChange = (event) => {
    setNewGalleryUrl(event.target.value);
    if (galleryUrlError) setGalleryUrlError("");
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  /*==================================================
   LOAD DATA
  ==================================================*/
  useEffect(() => {
    if (!editingProduct) return;

    setFormData({
      name: editingProduct.name || "",
      room: editingProduct.room || "",
      category: editingProduct.category || "",
      image: editingProduct.image || "",
      price: String(editingProduct.price || "").replace(/\D/g, "") || "",
      originalPrice:
        String(editingProduct.originalPrice || "").replace(/\D/g, "") || "",
      discount: editingProduct.discount ?? "",
      rating: editingProduct.rating ?? "",
      sold: editingProduct.sold ?? "",
      stock: editingProduct.stock ?? "",
      affiliateLink: editingProduct.affiliateLink || "",
      featured: editingProduct.featured ?? false,
      badge: editingProduct.badge || "",
      tags: editingProduct.tags?.join(", ") || "",
      status: editingProduct.status || "published",
      gallery: editingProduct.gallery?.join("\n") || "",
      description: editingProduct.description || "",
      features: editingProduct.features?.join("\n") || "",
      specifications: editingProduct.specifications
        ? Object.entries(editingProduct.specifications)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        : "",
      whyWeRecommend: editingProduct.whyWeRecommend?.join("\n") || "",
      bestFor: editingProduct.bestFor?.join("\n") || "",
      considerations: editingProduct.considerations?.join("\n") || "",
    });

    setGallery(editingProduct.gallery || []);
  }, [editingProduct]);

  /*==================================================
   SUBMIT
  ==================================================*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* KEM-17: pemeriksaan lokal konsisten dengan server sebelum submit */
    const reasons = formData.whyWeRecommend
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const fits = formData.bestFor
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (formData.status === "published") {
      if (reasons.length === 0) {
        setCurationError("Alasan rekomendasi kurasi wajib diisi agar produk layak ditampilkan.");
        return;
      }
      const shortReason = reasons.find((r) => r.length < CURATED_REASON_MIN_LENGTH);
      if (shortReason) {
        setCurationError(`Setiap alasan rekomendasi kurasi minimal ${CURATED_REASON_MIN_LENGTH} karakter.`);
        return;
      }
      if (fits.length === 0) {
        setCurationError("Field cocok untuk wajib diisi agar produk layak ditampilkan.");
        return;
      }
    }
    setCurationError("");

    const payload = {
      ...formData,
      slug: generatedSlug,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || 0,
      discount: calculatedDiscount,
      rating: Number(formData.rating) || 0,
      sold: Number(formData.sold) || 0,
      stock: Number(formData.stock) || 0,
      featured: formData.featured,
      gallery: gallery,
      description: formData.description,
      features: formData.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      specifications: Object.fromEntries(
        formData.specifications
          .split("\n")
          .map((line) => line.split(":"))
          .filter(([k, v]) => k && v)
          .map(([k, v]) => [k.trim(), v.trim()]),
      ),
      whyWeRecommend: formData.whyWeRecommend
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      status: formData.status,
      badge: formData.badge,
      tags: formData.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bestFor: formData.bestFor
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      considerations: formData.considerations
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (isEditMode && editingProduct) {
        await updateProduct(editingProduct.id, payload);
        toast("Produk berhasil diperbarui", "success");
      } else {
        await addProduct(payload);
        toast("Produk baru berhasil ditambahkan", "success");
        setFormData(initialFormData);
        setGallery([]);
        setGalleryUrlError("");
        setCurationError("");
      }
      navigate("/admin/products");
    } catch (err) {
      toast(err.message || "Produk gagal disimpan", "error");
    }
  };

  /*==================================================
   UI LAYOUT (Compact Mobile Header)
  ==================================================*/
  return (
    <Container className="py-[var(--np-space-6)] lg:py-[var(--np-space-10)]">
      {/*==============================================
       COMPACT HEADER (Back + Title + Stepper)
      ==============================================*/}
      <header className="mb-[var(--np-space-6)] flex flex-col gap-[var(--np-space-4)] border-b border-[var(--np-color-border)] pb-[var(--np-space-4)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-[var(--np-space-3)]">
          <IconButton
            label="Kembali ke daftar produk"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </IconButton>
          <div>
            <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.08em] text-[var(--np-color-action-primary)]">
              Manajemen produk
            </p>
            <h1 className="text-[var(--np-text-h2)] font-semibold tracking-tight text-[var(--np-color-text-primary)]">
              {isEditMode ? "Edit produk" : "Tambah produk"}
            </h1>
            <div className="mt-[var(--np-space-2)] flex flex-wrap items-center gap-[var(--np-space-2)]">
              <Badge
                variant={formData.status === "published" ? "primary" : "neutral"}
              >
                {statusLabel}
              </Badge>
              <span className="text-[var(--np-text-caption)] text-[var(--np-color-text-secondary)]">
                Status produk saat ini
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex w-fit gap-[var(--np-space-2)]"
          aria-label="Progress form"
        >
          {[1, 2, 3, 4].map((step) => (
            <Badge
              key={step}
              variant={currentStep === step ? "primary" : "neutral"}
              className="w-8 justify-center rounded-np-sm px-0"
            >
              {step}
            </Badge>
          ))}
        </div>
      </header>

      <Card
        variant="muted"
        className="mx-auto mb-[var(--np-space-6)] w-full max-w-4xl space-y-[var(--np-space-4)]"
        aria-live="polite"
      >
        <div className="flex flex-col gap-[var(--np-space-3)] sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.08em] text-[var(--np-color-action-primary)]">
              Kesiapan katalog
            </p>
            <p className="mt-[var(--np-space-1)] text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
              {isContentComplete
                ? "Empat informasi dasar sudah terisi. URL gambar dan affiliate memakai format http/https."
                : "Lengkapi informasi yang ditandai; URL gambar dan affiliate harus memakai http/https."}
            </p>
          </div>
          <Badge variant={isContentComplete ? "primary" : "accent"}>
            {completedRequiredFields}/{completenessItems.length} siap
          </Badge>
        </div>

        <ul className="grid gap-[var(--np-space-2)] sm:grid-cols-2">
          {completenessItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-[var(--np-space-2)] rounded-np-sm border border-[var(--np-color-border)] bg-[var(--np-color-surface)] px-[var(--np-space-3)] py-[var(--np-space-2)]"
            >
              {item.complete ? (
                <CheckCircle2
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[var(--np-color-success)]"
                />
              ) : (
                <Circle
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[var(--np-color-subtle)]"
                />
              )}
              <span className="min-w-0 flex-1 text-[var(--np-text-small)] font-medium text-[var(--np-color-text-primary)]">
                {item.label}
              </span>
              <span className="shrink-0 text-[var(--np-text-caption)] text-[var(--np-color-text-secondary)]">
                {item.complete ? "Siap" : `Langkah ${item.step}`}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card
        as="form"
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-4xl gap-[var(--np-space-8)] p-[var(--np-space-4)] sm:p-[var(--np-space-6)]"
      >
          {/* LEFT COLUMN */}
          <div className="min-w-0 space-y-[var(--np-space-6)]">
            {/* STEP 1: BASIC INFO */}
            <div className={currentStep === 1 ? "block" : "hidden"}>
              <div className="mb-[var(--np-space-6)]">
                <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--np-color-action-primary)]">
                  Langkah 1 dari 4
                </p>
                <h2 className="mt-[var(--np-space-2)] text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
                  Info dasar
                </h2>
                <p className="mt-[var(--np-space-2)] text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
                  Isi identitas produk dan penempatannya di katalog Ngepas.
                </p>
              </div>

              <div className="space-y-[var(--np-space-5)]">
                <FormField label="Nama produk" htmlFor="product-name" required>
                  <Input
                    id="product-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Rak Bumbu Dapur"
                    required
                  />
                </FormField>

                <FormField
                  label="Slug"
                  htmlFor="product-slug"
                  hint="Slug dibuat otomatis dari nama produk."
                >
                  <Input
                    id="product-slug"
                    name="slug"
                    type="text"
                    value={generatedSlug}
                    readOnly
                    className="cursor-not-allowed bg-[var(--np-color-surface-muted)]"
                  />
                </FormField>

                <FormField label="Ruangan" htmlFor="product-room" required>
                  <SelectField
                    id="product-room"
                    name="room"
                    value={formData.room}
                    onChange={handleRoomChange}
                    options={roomOptions}
                    size="md"
                    required
                  />
                </FormField>

                <FormField label="Kategori" htmlFor="product-category" required>
                  <SelectField
                    id="product-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categoryOptions}
                    size="md"
                    disabled={!formData.room}
                    required
                  />
                </FormField>

                <FormField label="Status produk" htmlFor="product-status">
                  <SelectField
                    id="product-status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={statusOptions}
                    size="md"
                  />
                </FormField>

                <FormField label="Badge produk" htmlFor="product-badge">
                  <SelectField
                    id="product-badge"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    options={badgeOptions}
                    size="md"
                  />
                </FormField>

                <FormField
                  label="Tags"
                  htmlFor="product-tags"
                  hint="Pisahkan setiap tag dengan koma (,). Persistence tags masih menjadi gap backend existing."
                >
                  <Input
                    id="product-tags"
                    name="tags"
                    type="text"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="minimalis, kayu, bedroom"
                  />
                </FormField>
              </div>
            </div>

            {/* STEP 2: PRICING AND STOCK */}
            <div className={currentStep === 2 ? "block" : "hidden"}>
              <div className="mb-[var(--np-space-6)]">
                <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--np-color-action-primary)]">
                  Langkah 2 dari 4
                </p>
                <h2 className="mt-[var(--np-space-2)] text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
                  Harga dan stok
                </h2>
                <p className="mt-[var(--np-space-2)] text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
                  Atur harga, metrik katalog, stok, dan tautan affiliate produk.
                </p>
              </div>

              <div className="space-y-[var(--np-space-5)]">
                <div className="grid gap-[var(--np-space-5)] sm:grid-cols-2">
                  <FormField label="Harga" htmlFor="product-price" required>
                    <Input
                      id="product-price"
                      name="price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="89000"
                      required
                    />
                  </FormField>

                  <FormField label="Harga asli" htmlFor="product-original-price">
                    <Input
                      id="product-original-price"
                      name="originalPrice"
                      type="number"
                      min="0"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="109000"
                    />
                  </FormField>
                </div>

                <Card
                  variant="muted"
                  className="border-[var(--np-color-action-primary)]/20 bg-[var(--np-color-action-primary-soft)]"
                >
                  <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.08em] text-[var(--np-color-action-primary)]">
                    Diskon otomatis
                  </p>
                  <p className="mt-[var(--np-space-1)] text-[var(--np-text-h2)] font-semibold text-[var(--np-color-action-primary)]">
                    {calculatedDiscount}%
                  </p>
                </Card>

                <div className="grid gap-[var(--np-space-5)] sm:grid-cols-3">
                  <FormField label="Rating" htmlFor="product-rating" hint="Skala 0 sampai 5.">
                    <Input
                      id="product-rating"
                      name="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="4.8"
                    />
                  </FormField>

                  <FormField label="Terjual" htmlFor="product-sold">
                    <Input
                      id="product-sold"
                      name="sold"
                      type="number"
                      min="0"
                      value={formData.sold}
                      onChange={handleChange}
                      placeholder="120"
                    />
                  </FormField>

                  <FormField label="Stok" htmlFor="product-stock">
                    <Input
                      id="product-stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="25"
                    />
                  </FormField>
                </div>

                <FormField
                  label="Affiliate link"
                  htmlFor="product-affiliate-link"
                  hint="Gunakan URL marketplace yang menjadi sumber rekomendasi produk."
                >
                  <Input
                    id="product-affiliate-link"
                    name="affiliateLink"
                    type="url"
                    value={formData.affiliateLink}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </FormField>
              </div>
            </div>

            {/* STEP 3: GALLERY */}
            <div className={currentStep === 3 ? "block" : "hidden"}>
              <div className="space-y-[var(--np-space-6)]">
                <div>
                  <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--np-color-action-primary)]">
                    Langkah 3 dari 4
                  </p>
                  <h3 className="mt-2 text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
                    Gambar dan preview produk
                  </h3>
                  <p className="mt-2 text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
                    Gunakan URL gambar utama untuk preview produk, lalu tambahkan gambar pendukung ke gallery.
                  </p>
                </div>

                <Card variant="muted" className="space-y-[var(--np-space-5)]">
                  <FormField
                    label="URL gambar utama"
                    htmlFor="product-image"
                    hint="Gunakan URL gambar publik yang dapat dimuat oleh browser."
                  >
                    <Input
                      id="product-image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/product.jpg"
                    />
                  </FormField>

                  {formData.image && (
                    <Card variant="default" className="overflow-hidden p-0">
                      {imageError ? (
                        <div className="flex aspect-video items-center justify-center bg-[var(--np-color-surface-muted)] px-[var(--np-space-4)] text-center text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
                          Preview tidak tersedia
                        </div>
                      ) : (
                        <img
                          src={formData.image}
                          alt="Preview produk"
                          onError={() => setImageError(true)}
                          className="aspect-video w-full object-cover"
                        />
                      )}
                    </Card>
                  )}
                </Card>

                <Card variant="default" className="space-y-[var(--np-space-5)]">
                  <div className="flex flex-col gap-[var(--np-space-2)] sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-[var(--np-text-h4)] font-semibold text-[var(--np-color-text-primary)]">
                        Product gallery
                      </h4>
                      <p className="mt-1 text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
                        Tambahkan gambar pendukung untuk memperjelas rekomendasi.
                      </p>
                    </div>
                    <Badge variant="neutral">
                      {gallery.length}/{PRODUCT_GALLERY_LIMIT} gambar
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-[var(--np-space-3)] sm:flex-row sm:items-end">
                    <div className="min-w-0 flex-1">
                      <FormField
                        label="URL gambar gallery"
                        htmlFor="product-gallery-url"
                        error={galleryUrlError}
                        hint={
                          galleryLimitReached
                            ? `Batas ${PRODUCT_GALLERY_LIMIT} gambar tercapai. Hapus satu gambar untuk menambah URL baru.`
                            : `Tersisa ${gallerySlotsRemaining} slot. Hanya URL gambar http atau https yang dapat digunakan.`
                        }
                      >
                        <Input
                          id="product-gallery-url"
                          name="galleryUrl"
                          type="url"
                          value={newGalleryUrl}
                          onChange={handleGalleryUrlChange}
                          placeholder="https://example.com/detail.jpg"
                          invalid={Boolean(galleryUrlError)}
                          aria-describedby={
                            galleryUrlError
                              ? "product-gallery-url-error"
                              : "product-gallery-url-hint"
                          }
                          disabled={galleryLimitReached}
                        />
                      </FormField>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={handleAddGallery}
                      disabled={galleryLimitReached}
                      className="shrink-0"
                    >
                      <Plus size={16} aria-hidden="true" />
                      Tambah gambar
                    </Button>
                  </div>

                  {gallery.length > 0 ? (
                    <div className="grid grid-cols-2 gap-[var(--np-space-3)] sm:grid-cols-3">
                      {gallery.map((url, idx) => (
                        <div
                          key={url}
                          className="group relative aspect-square overflow-hidden rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)]"
                        >
                          <img
                            src={url}
                            alt={`Gallery ${idx + 1}`}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.src =
                                "https://placehold.co/150x150?text=Error";
                            }}
                          />
                          <IconButton
                            type="button"
                            label={`Hapus gambar gallery ${idx + 1}`}
                            variant="soft"
                            onClick={() => handleRemoveGallery(url)}
                            className="absolute right-[var(--np-space-2)] top-[var(--np-space-2)] text-[var(--np-color-danger)] opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          >
                            <X size={16} aria-hidden="true" />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Card variant="muted" className="px-[var(--np-space-4)] py-[var(--np-space-6)] text-center">
                      <p className="text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
                        Belum ada gambar gallery.
                      </p>
                    </Card>
                  )}
                </Card>
              </div>
            </div>

            {/* STEP 4: DETAIL */}
            <div className={currentStep === 4 ? "block" : "hidden"}>
              <div className="space-y-[var(--np-space-6)]">
                <div>
                  <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--np-color-action-primary)]">
                    Langkah 4 dari 4
                  </p>
                  <h3 className="mt-2 text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
                    Detail dan kurasi
                  </h3>
                  <p className="mt-2 text-[var(--np-text-small)] text-[var(--np-color-text-secondary)]">
                    Lengkapi konteks produk agar rekomendasi Ngepas mudah dipahami dan dipercaya.
                  </p>
                </div>

                <Card variant="muted" className="space-y-[var(--np-space-5)]">
                  <TextareaField
                    id="product-description"
                    name="description"
                    label="Deskripsi Produk"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Jelaskan produk secara singkat..."
                  />

                  <TextareaField
                    id="product-features"
                    name="features"
                    label="Keunggulan Produk"
                    hint="Satu keunggulan setiap baris."
                    value={formData.features}
                    onChange={handleChange}
                    rows={5}
                    placeholder={'Material premium\nMudah dibersihkan'}
                  />

                  <TextareaField
                    id="product-specifications"
                    name="specifications"
                    label="Spesifikasi Produk"
                    hint="Format: Nama: Nilai"
                    value={formData.specifications}
                    onChange={handleChange}
                    rows={6}
                    placeholder={'Material: Kayu Pinus\nWarna: Natural'}
                  />
                </Card>

                <Card variant="default" className="space-y-[var(--np-space-5)]">
                  {curationError && (
                    <div
                      role="alert"
                      className="flex items-start gap-[var(--np-space-2)] rounded-np-md border border-[var(--np-color-error-border,oklch(0.7 0.15 25))] bg-[var(--np-color-error-bg,oklch(0.95 0.04 25))] px-[var(--np-space-3)] py-[var(--np-space-3)]"
                    >
                      <AlertTriangle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--np-color-error,oklch(0.55 0.18 25))]" />
                      <p className="text-[var(--np-text-caption)] font-medium text-[var(--np-color-error,oklch(0.55 0.18 25))]">
                        {curationError}
                      </p>
                    </div>
                  )}
                  <TextareaField
                    id="product-why-we-recommend"
                    name="whyWeRecommend"
                    label="Kenapa Kami Merekomendasikan"
                    value={formData.whyWeRecommend}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Harga sesuai kualitas"
                  />

                  <TextareaField
                    id="product-best-for"
                    name="bestFor"
                    label="Cocok Untuk"
                    value={formData.bestFor}
                    onChange={handleChange}
                    rows={5}
                    placeholder={'Apartemen\nRumah Minimalis'}
                  />

                  <TextareaField
                    id="product-considerations"
                    name="considerations"
                    label="Hal yang Perlu Diperhatikan"
                    value={formData.considerations}
                    onChange={handleChange}
                    rows={5}
                    placeholder={'Tidak tahan air\nPerlu dirakit sendiri'}
                  />
                </Card>
              </div>
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex flex-col-reverse items-stretch gap-[var(--np-space-3)] border-t border-[var(--np-color-border)] pt-[var(--np-space-5)] sm:flex-row sm:items-center sm:justify-end">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                className="w-full sm:w-auto"
              >
                Kembali
              </Button>
            )}

            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep} className="w-full sm:w-auto">
                Lanjut
              </Button>
            ) : (
              <Button type="submit" className="w-full sm:w-auto">
                <Save size={18} aria-hidden="true" />
                {isEditMode ? "Simpan perubahan" : "Simpan produk"}
              </Button>
            )}

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/products")}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
          </div>
      </Card>
    </Container>
  );
}

export default ProductForm;
