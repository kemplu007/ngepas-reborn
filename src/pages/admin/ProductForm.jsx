/*==================================================
 NGEPAS REBORN
 File    : ProductForm.jsx
 Module  : Admin Pages
==================================================*/

import { useEffect, useState } from "react";
import { Save, ArrowLeft } from "lucide-react";

import rooms from "../../data/rooms";
import roomCategories from "../../data/roomCategories";
import { useProducts } from "../../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

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
    } else {
      addProduct(payload);
      setFormData(initialFormData);
      setGallery([]);
    }
  };

  /*==================================================
   UI LAYOUT (Compact Mobile Header)
  ==================================================*/
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/*==============================================
       COMPACT HEADER (Back + Title + Stepper)
      ==============================================*/}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-full p-2 hover:bg-slate-100 transition"
          >
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">
            {isEditMode ? "Edit Produk" : "Tambah Produk"}
          </h1>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${currentStep === step ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* STEP 1: BASIC INFO */}
            <div className={currentStep === 1 ? "block" : "hidden"}>
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Info Dasar
              </h3>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Nama Produk
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Slug
                </label>
                <input
                  type="text"
                  value={generatedSlug}
                  readOnly
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Ruangan
                </label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleRoomChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600"
                >
                  <option value="">Pilih ruangan</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.slug}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={!formData.room}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none disabled:bg-slate-100 focus:border-emerald-600"
                >
                  <option value="">Pilih kategori</option>
                  {formData.room &&
                    roomCategories[formData.room]?.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Status Produk
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Badge Produk
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600"
                >
                  <option value="">Tanpa Badge</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Premium">Premium</option>
                  <option value="Paling Worth It">Paling Worth It</option>
                  <option value="Limited">Limited</option>
                  <option value="New">New</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Tags
                </label>
                <input
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="minimalis, kayu, bedroom"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Pisahkan setiap tag dengan koma (,).
                </p>
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
          <div className="col-span-1 lg:col-span-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-6 border-t border-slate-100 pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Kembali
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Lanjut
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                <Save size={18} />
                {isEditMode ? "Simpan Perubahan" : "Simpan Produk"}
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
