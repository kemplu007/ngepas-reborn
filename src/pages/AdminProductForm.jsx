/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : AdminProductForm.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import rooms from "../data/rooms";
import roomCategories from "../data/roomCategories";
import { useProducts } from "../context/ProductContext";
import { useParams } from "react-router-dom";

/*==================================================
 INITIAL FORM DATA
==================================================*/

/*
Nilai awal form produk.

Dipisahkan dari component agar:
- Struktur data mudah dibaca
- Form mudah di-reset
- Mudah dikembangkan saat CRUD aktif
*/

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
};

/*==================================================
 ADMIN PRODUCT FORM
==================================================*/

function AdminProductForm() {
  /*==================================================
   ROUTE PARAMETER
  ==================================================*/

  /*
  Mengambil ID produk dari URL.

  Jika ID tersedia, form berjalan dalam EDIT MODE.
  Jika ID tidak tersedia, form berjalan dalam CREATE MODE.
  */

  const { id } = useParams();

  /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  const { products, addProduct, updateProduct } = useProducts();

  /*==================================================
   EDIT PRODUCT DATA
  ==================================================*/

  /*
  Mencari produk berdasarkan ID dari URL.

  Route parameter berbentuk string,
  sehingga ID dikonversi menjadi Number.
  */

  const editingProduct = products.find((product) => product.id === Number(id));

  const isEditMode = Boolean(id);

  /*==================================================
   FORM STATE
  ==================================================*/

  const [formData, setFormData] = useState(initialFormData);

  /*==================================================
   LOAD EDIT PRODUCT
  ==================================================*/

  /*
  Mengisi form dengan data produk
  ketika halaman berjalan dalam EDIT MODE.

  Harga dikembalikan menjadi angka
  agar dapat digunakan oleh input type="number".
  */

  useEffect(() => {
    if (!editingProduct) return;

    setFormData({
      name: editingProduct.name || "",
      room: editingProduct.room || "",
      category: editingProduct.category || "",
      image: editingProduct.image || "",

      price: editingProduct.price?.replace(/\D/g, "") || "",

      originalPrice: editingProduct.originalPrice?.replace(/\D/g, "") || "",

      discount: editingProduct.discount ?? "",
      rating: editingProduct.rating ?? "",
      sold: editingProduct.sold ?? "",
      stock: editingProduct.stock ?? "",
      affiliateLink: editingProduct.affiliateLink || "",
      featured: editingProduct.featured ?? false,
    });
  }, [editingProduct]);

  /*==================================================
   INPUT HANDLER
  ==================================================*/

  /*
  Mengubah state berdasarkan input
  yang sedang diedit.
  */

  const handleChange = (event) => {
  const { name, value, type, checked } = event.target;

  setFormData((currentData) => ({
    ...currentData,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  /*==================================================
   ROOM HANDLER
  ==================================================*/

  /*
  Saat room berubah:
  - Simpan room baru
  - Reset category

  Category harus di-reset karena setiap
  room memiliki daftar kategori berbeda.
  */

  const handleRoomChange = (event) => {
    const room = event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      room,
      category: "",
    }));
  };

  /*==================================================
   FORM SUBMIT
  ==================================================*/

  /*
  Membentuk data produk baru dari form,
  kemudian mengirimkannya ke ProductContext.
  */

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      ...formData,

      slug: formData.name.toLowerCase().trim().replace(/\s+/g, "-"),

      price: `Rp${Number(formData.price).toLocaleString("id-ID")}`,

      originalPrice: formData.originalPrice
        ? `Rp${Number(formData.originalPrice).toLocaleString("id-ID")}`
        : "",

      discount: Number(formData.discount) || 0,
      rating: Number(formData.rating) || 0,
      sold: Number(formData.sold) || 0,
      stock: Number(formData.stock) || 0,

      featured: formData.featured,

      description: editingProduct?.description ?? "",
      features: editingProduct?.features ?? [],
      specifications: editingProduct?.specifications ?? {},
      whyWeRecommend: editingProduct?.whyWeRecommend ?? [],
      bestFor: editingProduct?.bestFor ?? [],
      considerations: editingProduct?.considerations ?? [],
    };

    /*==================================================
 CREATE / UPDATE PRODUCT
==================================================*/

    if (isEditMode && editingProduct) {
      updateProduct(editingProduct.id, newProduct);
    } else {
      addProduct(newProduct);

      setFormData(initialFormData);
    }
  };

  /*==================================================
   PRODUCT FORM UI
  ==================================================*/

  return (
    <section>
      {/*==============================================
       PAGE HEADER
      ==============================================*/}

      <div>
        <p className="text-sm font-semibold text-emerald-600">
          Product Management
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          {isEditMode ? "Edit Produk" : "Tambah Produk"}
        </h1>

        <p className="mt-2 text-slate-500">
          {isEditMode
            ? "Perbarui data produk yang dipilih."
            : "Tambahkan produk baru ke katalog Ngepas."}
        </p>
      </div>

      {/*==============================================
       PRODUCT FORM
      ==============================================*/}

      <form
        onSubmit={handleSubmit}
        className="
          mt-8
          space-y-6
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        {/*==============================================
         PRODUCT NAME
        ==============================================*/}

        <div>
          <label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700"
          >
            Nama Produk
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Contoh: Lampu Tidur Minimalis"
            required
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-emerald-600
              focus:ring-2
              focus:ring-emerald-100
            "
          />
        </div>

        {/*==============================================
         ROOM
        ==============================================*/}

        <div>
          <label
            htmlFor="room"
            className="text-sm font-semibold text-slate-700"
          >
            Ruangan
          </label>

          <select
            id="room"
            name="room"
            value={formData.room}
            onChange={handleRoomChange}
            required
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              focus:border-emerald-600
              focus:ring-2
              focus:ring-emerald-100
            "
          >
            <option value="">Pilih ruangan</option>

            {rooms.map((room) => (
              <option key={room.id} value={room.slug}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        {/*==============================================
         CATEGORY
        ==============================================*/}

        <div>
          <label
            htmlFor="category"
            className="text-sm font-semibold text-slate-700"
          >
            Kategori
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={!formData.room}
            required
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              disabled:cursor-not-allowed
              disabled:bg-slate-100
              focus:border-emerald-600
              focus:ring-2
              focus:ring-emerald-100
            "
          >
            <option value="">Pilih kategori</option>

            {formData.room &&
              roomCategories[formData.room]?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>

        {/*==============================================
 PRODUCT IMAGE
==================================================*/}

        <div>
          <label
            htmlFor="image"
            className="text-sm font-semibold text-slate-700"
          >
            URL Gambar Produk
          </label>

          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            placeholder="url atau text"
            className="
      mt-2
      w-full
      rounded-xl
      border
      border-slate-300
      px-4
      py-3
      outline-none
      transition
      focus:border-emerald-600
      focus:ring-2
      focus:ring-emerald-100
    "
          />

          {/*==============================================
   IMAGE PREVIEW
  ==============================================*/}

          {formData.image && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <img
                src={formData.image}
                alt="Preview produk"
                className="aspect-video w-full object-cover"
              />
            </div>
          )}
        </div>
        {/*==============================================
         PRICE
        ==============================================*/}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="text-sm font-semibold text-slate-700"
            >
              Harga
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="89000"
              required
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                focus:border-emerald-600
                focus:ring-2
                focus:ring-emerald-100
              "
            />
          </div>

          <div>
            <label
              htmlFor="originalPrice"
              className="text-sm font-semibold text-slate-700"
            >
              Harga Asli
            </label>

            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              min="0"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="109000"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                focus:border-emerald-600
                focus:ring-2
                focus:ring-emerald-100
              "
            />
          </div>
        </div>

        {/*==============================================
         PRODUCT META
        ==============================================*/}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            name="discount"
            type="number"
            min="0"
            max="100"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Diskon %"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />

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

        {/*==============================================
         AFFILIATE LINK
        ==============================================*/}

        <div>
          <label
            htmlFor="affiliateLink"
            className="text-sm font-semibold text-slate-700"
          >
            Affiliate Link
          </label>

          <input
            id="affiliateLink"
            name="affiliateLink"
            type="url"
            value={formData.affiliateLink}
            onChange={handleChange}
            placeholder="https://..."
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-emerald-600
              focus:ring-2
              focus:ring-emerald-100
            "
          />
        </div>

        {/*==============================================
 FEATURED PRODUCT
==============================================*/}

<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
  <label className="flex cursor-pointer items-center gap-3">
    <input
      name="featured"
      type="checkbox"
      checked={formData.featured}
      onChange={handleChange}
      className="h-5 w-5 accent-emerald-600"
    />

    <div>
      <p className="font-semibold text-slate-700">
        Tampilkan di Pilihan Ngepas
      </p>

      <p className="text-sm text-slate-500">
        Produk akan ditampilkan sebagai rekomendasi di homepage.
      </p>
    </div>
  </label>
</div>
        {/*==============================================
         SUBMIT BUTTON
        ==============================================*/}

        <button
          type="submit"
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
          "
        >
          <Save size={18} />

          {isEditMode ? "Simpan Perubahan" : "Simpan Produk"}
        </button>
      </form>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default AdminProductForm;
