/*==================================================
 NGEPAS REBORN
 File    : ProductForm.jsx
 Module  : Admin Pages
==================================================*/

import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

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

            {/* STEP 2: PRICING */}
            <div className={currentStep === 2 ? "block" : "hidden"}>
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Harga & Stok
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Harga
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="89000"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Harga Asli
                  </label>
                  <input
                    name="originalPrice"
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="109000"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 mb-4">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Diskon Otomatis
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  {calculatedDiscount}%
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <input
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
                <input
                  name="sold"
                  type="number"
                  min="0"
                  value={formData.sold}
                  onChange={handleChange}
                  placeholder="Terjual"
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stok"
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Affiliate Link
                </label>
                <input
                  name="affiliateLink"
                  type="url"
                  value={formData.affiliateLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* STEP 3: GALLERY */}
            <div className={currentStep === 3 ? "block" : "hidden"}>
              <h3 className="text-lg font-bold text-slate-800 mb-6">Gambar</h3>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  URL Gambar Utama
                </label>
                <input
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="url atau text"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                />
                {formData.image && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                    {imageError ? (
                      <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm text-slate-500">
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
                  </div>
                )}
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mt-4">
                <h2 className="mb-4 text-lg font-bold text-slate-800">
                  Product Gallery
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddGallery}
                    className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 transition"
                  >
                    + Add
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {gallery.length > 0 ? (
                    gallery.map((url, idx) => (
                      <div
                        key={idx}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                      >
                        <img
                          src={url}
                          alt={`Gallery ${idx + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/150x150?text=Error";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGallery(url)}
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          <span className="block h-3 w-3">✕</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-3 text-center text-sm text-slate-400 py-4">
                      No images added yet.
                    </p>
                  )}
                </div>
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
