/*==================================================
 NGEPAS REBORN
 File    : CategoryForm.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* React */
import { useEffect, useState } from "react";

/* Router */
import { useNavigate, useParams } from "react-router-dom";
/* Data */
import rooms from "../../data/rooms";

/* Context */
import { useCategories } from "../../context/CategoryContext";

/* Toast */
import { useToast } from "../../context/ToastContext";

/*==================================================
 COMPONENT
==================================================*/

function CategoryForm() {
  /*==================================================
   HOOKS
==================================================*/

  const navigate = useNavigate();

  const { categories, addCategory, editCategory } = useCategories();
  const { toast } = useToast();
  const { id } = useParams();

  /*==================================================
   STATE
==================================================*/

  const [form, setForm] = useState({
    name: "",
    slug: "",
    room: "",
    icon: "",
    status: true,
  });

  /*==================================================
 EDIT MODE
==================================================*/

  useEffect(() => {
    if (!id || !categories) return;

    const category = categories.find((item) => String(item.id) === String(id));

    if (category) {
      setForm({
        name: category.name,
        slug: category.slug,
        room: category.room,
        icon: category.icon || "",
        status: Boolean(category.status),
      });
    }
  }, [id, categories]);
  /*==================================================
   HELPERS
==================================================*/

  /* Auto Slug */

  const createSlug = (text) => text.toLowerCase().trim().replace(/\s+/g, "-");

  /*==================================================
   HANDLERS
==================================================*/

  /* Handle Change */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: createSlug(value),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* Handle Submit */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editCategory(id, form);
        toast("Kategori berhasil diperbarui", "success");
      } else {
        await addCategory(form);
        toast("Kategori baru berhasil ditambahkan", "success");
      }
      navigate("/admin/categories");
    } catch (err) {
      toast(err.message || "Gagal menyimpan kategori", "error");
    }
  };

  /*==================================================
   RENDER
==================================================*/

  return (
    <section className="p-6">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {id ? "Edit Kategori" : "Tambah Kategori"}
        </h1>

        <p className="text-gray-500 mt-2">
          Tambahkan kategori baru ke dalam sistem Ngepas.
        </p>
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        {/* Name */}

        <input
          type="text"
          name="name"
          placeholder="Nama Kategori"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        {/* Slug */}

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          readOnly
          className="w-full border rounded-lg p-3 bg-gray-100"
        />

        {/* Room */}

        <select
          name="room"
          value={form.room}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">Pilih Ruangan</option>

          {rooms.map((room) => (
            <option key={room.id} value={room.slug}>
              {room.name}
            </option>
          ))}
        </select>

        {/* Icon */}

        <input
          type="text"
          name="icon"
          placeholder="Icon (contoh: bed)"
          value={form.icon}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Status */}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
          />

          <span>Aktif</span>
        </label>

        {/* Actions */}

        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="px-5 py-3 border rounded-lg hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            {id ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default CategoryForm;
