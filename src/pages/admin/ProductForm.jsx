/*==================================================
 NGEPAS REBORN
 File    : ProductForm.jsx
 Module  : Admin Pages
==================================================*/

import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Save, X } from "lucide-react";

import rooms from "../../data/rooms";
import roomCategories from "../../data/roomCategories";
import { useProducts } from "../../context/ProductContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate, useParams } from "react-router-dom";

/* UI Foundation */
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Container from "../../components/ui/Container";
import FormField from "../../components/ui/FormField";
import IconButton from "../../components/ui/IconButton";
import Input from "../../components/ui/Input";
import SelectField from "../../components/ui/SelectField";

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
  const { products, addProduct, updateProduct } = useProducts();
  const { toast } = useToast();

  const editingProduct = products.find((p) => p.id === Number(id));
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormData);
  const [imageError, setImageError] = useState(false);

  const [gallery, setGallery] = useState([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

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
    { value: "hidden", label: "Hidden" },
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
    if (url && !gallery.includes(url)) {
      setGallery((prev) => [...prev, url]);
      setNewGalleryUrl("");
    }
  };

  const handleRemoveGallery = (urlToRemove) => {
    setGallery((prev) => prev.filter((url) => url !== urlToRemove));
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
  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (isEditMode && editingProduct) {
      updateProduct(editingProduct.id, payload);
      toast("Produk berhasil diperbarui", "success");
    } else {
      addProduct(payload);
      toast("Produk baru berhasil ditambahkan", "success");
      setFormData(initialFormData);
      setGallery([]);
    }
    navigate("/admin/products");
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
          </div>
        </div>

        <div className="flex gap-[var(--np-space-2)]" aria-label="Progress form">
          {[1, 2, 3, 4].map((step) => (
            <Badge
              key={step}
              variant={currentStep === step ? "primary" : "neutral"}
              className="w-8 justify-center rounded-full px-0"
            >
              {step}
            </Badge>
          ))}
        </div>
      </header>

      <Card
        as="form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-[var(--np-space-8)] lg:grid-cols-2"
      >
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* STEP 1: BASIC INFO */}
            <div className={currentStep === 1 ? "block" : "hidden"}>
              <div className="mb-[var(--np-space-6)]">
                <Badge variant="primary">Langkah 1 dari 4</Badge>
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
                <Badge variant="primary">Langkah 2 dari 4</Badge>
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
                    Step 3
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
                      {gallery.length} gambar
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-[var(--np-space-3)] sm:flex-row sm:items-end">
                    <div className="min-w-0 flex-1">
                      <FormField
                        label="URL gambar gallery"
                        htmlFor="product-gallery-url"
                      >
                        <Input
                          id="product-gallery-url"
                          name="galleryUrl"
                          type="url"
                          value={newGalleryUrl}
                          onChange={(event) => setNewGalleryUrl(event.target.value)}
                          placeholder="https://example.com/detail.jpg"
                        />
                      </FormField>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={handleAddGallery}
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
              <h3 className="text-lg font-bold text-slate-800 mb-6">Detail</h3>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Deskripsi Produk
                </label>
                <textarea
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Jelaskan produk secara singkat..."
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Keunggulan Produk
                </label>
                <textarea
                  name="features"
                  rows={5}
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Material premium\nMudah dibersihkan"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-emerald-600"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Satu keunggulan setiap baris.
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Spesifikasi Produk
                </label>
                <textarea
                  name="specifications"
                  rows={6}
                  value={formData.specifications}
                  onChange={handleChange}
                  placeholder="Material: Kayu Pinus\nWarna: Natural"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-emerald-600"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Format: Nama: Nilai
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Kenapa Kami Merekomendasikan
                </label>
                <textarea
                  name="whyWeRecommend"
                  rows={5}
                  value={formData.whyWeRecommend}
                  onChange={handleChange}
                  placeholder="Harga sesuai kualitas"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Cocok Untuk
                </label>
                <textarea
                  name="bestFor"
                  rows={5}
                  value={formData.bestFor}
                  onChange={handleChange}
                  placeholder="Apartemen\nRumah Minimalis"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Hal yang Perlu Diperhatikan
                </label>
                <textarea
                  name="considerations"
                  rows={5}
                  value={formData.considerations}
                  onChange={handleChange}
                  placeholder="Tidak tahan air\nPerlu dirakit sendiri"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hidden lg:block"></div>

          {/* NAVIGATION BUTTONS */}
          <div className="col-span-1 flex flex-col-reverse gap-[var(--np-space-3)] border-t border-[var(--np-color-border)] pt-[var(--np-space-5)] sm:col-span-2 sm:flex-row sm:justify-end">
            {currentStep > 1 && (
              <Button type="button" variant="secondary" onClick={prevStep}>
                Kembali
              </Button>
            )}

            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep}>
                Lanjut
              </Button>
            ) : (
              <Button type="submit">
                <Save size={18} aria-hidden="true" />
                {isEditMode ? "Simpan perubahan" : "Simpan produk"}
              </Button>
            )}

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/products")}
            >
              Batal
            </Button>
          </div>
      </Card>
    </Container>
  );
}

export default ProductForm;
