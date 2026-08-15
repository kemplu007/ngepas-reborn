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

/* UI Foundation */
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import CheckboxField from "../../components/ui/CheckboxField";
import Container from "../../components/ui/Container";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import SelectField from "../../components/ui/SelectField";

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

  /* Room Options */

  const roomOptions = [
    { value: "", label: "Pilih ruangan" },
    ...rooms.map((room) => ({
      value: room.slug,
      label: room.name,
    })),
  ];

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
    <Container className="py-[var(--np-space-8)] lg:py-[var(--np-space-12)]">
      {/* Header */}

      <header className="mb-[var(--np-space-6)] max-w-[var(--np-layout-container)]">
        <p className="mb-[var(--np-space-2)] text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.08em] text-[var(--np-color-action-primary)]">
          Manajemen kategori
        </p>

        <h1 className="text-[var(--np-text-h2)] font-semibold text-[var(--np-color-text-primary)]">
          {id ? "Edit Kategori" : "Tambah Kategori"}
        </h1>

        <p className="mt-[var(--np-space-2)] text-[var(--np-text-body)] text-[var(--np-color-text-secondary)]">
          Tambahkan kategori baru ke dalam sistem Ngepas.
        </p>
      </header>

      {/* Form */}

      <Card as="form" onSubmit={handleSubmit} className="max-w-[var(--np-layout-container)] space-y-[var(--np-space-5)]">
        <FormField label="Nama kategori" htmlFor="category-name" required>
          <Input
            id="category-name"
            type="text"
            name="name"
            placeholder="Contoh: Kamar Tidur"
            value={form.name}
            onChange={handleChange}
            required
          />
        </FormField>

        <FormField
          label="Slug"
          htmlFor="category-slug"
          hint="Slug dibuat otomatis dari nama kategori."
        >
          <Input
            id="category-slug"
            type="text"
            name="slug"
            placeholder="kamar-tidur"
            value={form.slug}
            readOnly
            className="cursor-not-allowed bg-[var(--np-color-surface-muted)]"
          />
        </FormField>

        <FormField label="Ruangan" htmlFor="category-room" required>
          <SelectField
            id="category-room"
            name="room"
            value={form.room}
            onChange={handleChange}
            options={roomOptions}
            size="md"
            required
          />
        </FormField>

        <FormField
          label="Icon"
          htmlFor="category-icon"
          hint="Gunakan nama icon yang sudah terdaftar di icon registry."
        >
          <Input
            id="category-icon"
            type="text"
            name="icon"
            placeholder="Contoh: bed"
            value={form.icon}
            onChange={handleChange}
          />
        </FormField>

        <CheckboxField
          id="category-status"
          name="status"
          label="Kategori aktif"
          hint="Kategori aktif dapat muncul pada area yang mengonsumsi data kategori."
          checked={form.status}
          onChange={handleChange}
        />

        {/* Actions */}

        <div className="flex flex-col-reverse gap-[var(--np-space-3)] border-t border-[var(--np-color-border)] pt-[var(--np-space-5)] sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin/categories")}
          >
            Batal
          </Button>

          <Button type="submit">
            {id ? "Update" : "Simpan"}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default CategoryForm;
