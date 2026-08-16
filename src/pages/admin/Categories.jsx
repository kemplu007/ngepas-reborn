/*==================================================
 NGEPAS REBORN
 File    : Categories.jsx
 Module  : Admin Pages — Category Management + Toast
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* React */
import { useState } from "react";

/* Router */
import { Link, useNavigate } from "react-router-dom";

/* Icons */
import { Plus, Pencil, Trash2 } from "lucide-react";

/* Context */
import { useCategories } from "../../context/CategoryContext";

/* Foundation */
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

/* Components */
import ConfirmDialog from "../../components/common/ConfirmDialog";

/* Toast */
import { useToast } from "../../context/ToastContext";

/*==================================================
 COMPONENT
==================================================*/

function Categories() {
  /*==================================================
   HOOKS
  ==================================================*/

  const navigate = useNavigate();
  const { toast } = useToast();
  const { categories, loading, error, deleteCategory } = useCategories();

  /*==================================================
   STATE
  ==================================================*/

  const [confirmDialog, setConfirmDialog] = useState(null);

  /*==================================================
   HANDLERS
  ==================================================*/

  const handleCreate = () => {
    navigate("/admin/categories/new");
  };

  const handleEdit = (id) => {
    navigate(`/admin/categories/${id}/edit`);
  };

  const handleDelete = (id) => {
    const category = categories.find((item) => item.id === id);
    setConfirmDialog({
      open: true,
      title: "Hapus Kategori",
      message: `Yakin ingin menghapus kategori "${category?.name || id}"? Tindakan ini tidak dapat dibatalkan.`,
      onConfirm: async () => {
        try {
          await deleteCategory(id);
          toast("Kategori berhasil dihapus", "success");
        } catch (err) {
          toast(err.message || "Gagal menghapus kategori", "error");
        }
        setConfirmDialog(null);
      },
    });
  };

  /*==================================================
   RENDER STATES
  ==================================================*/

  if (loading) {
    return (
      <section className="rounded-[var(--np-radius-lg)] border border-[var(--np-color-border)] bg-[var(--np-color-surface)] p-6 shadow-[var(--np-shadow-sm)]">
        <p className="text-[var(--np-color-text-secondary)]">Memuat kategori...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-[var(--np-radius-lg)] border border-[var(--np-color-danger)] bg-[var(--np-color-danger-soft)] p-6 text-[var(--np-color-danger)]">
        {error}
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/*==================================================
       HEADER
      ==================================================*/}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.12em] text-[var(--np-color-success)]">
            Admin catalog
          </p>
          <h1 className="text-[var(--np-text-h1)] font-bold leading-[var(--np-leading-heading)] text-[var(--np-color-text-primary)]">
            Categories
          </h1>
          <p className="mt-2 text-[var(--np-color-text-secondary)]">
            Kelola seluruh kategori produk Ngepas.
          </p>
        </div>

        <Button type="button" variant="primary" size="md" onClick={handleCreate}>
          <Plus size={18} aria-hidden="true" />
          Tambah Kategori
        </Button>
      </div>

      {/*==================================================
       TABLE
      ==================================================*/}
      <div className="overflow-x-auto rounded-[var(--np-radius-lg)] border border-[var(--np-color-border)] bg-[var(--np-color-surface)] shadow-[var(--np-shadow-sm)]">
        <table className="w-full min-w-[720px] text-left text-[var(--np-text-small)]">
          <thead className="border-b border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)] text-[var(--np-color-text-secondary)]">
            <tr>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Room</th>
              <th className="px-4 py-3 font-medium">Icon</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--np-color-border)]">
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-surface-muted)]"
                >
                  <td className="px-4 py-3 font-semibold text-[var(--np-color-text-primary)]">
                    {category.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-[var(--np-text-caption)] text-[var(--np-color-muted)]">
                    {category.slug}
                  </td>
                  <td className="px-4 py-3 capitalize text-[var(--np-color-text-secondary)]">
                    {category.room}
                  </td>
                  <td className="px-4 py-3 text-[var(--np-text-h3)]" aria-label={category.icon ? `Icon ${category.icon}` : "Tidak ada icon"}>
                    {category.icon || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={category.status ? "primary" : "danger"}>
                      {category.status ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/categories/${category.id}/edit`}
                        className="inline-flex"
                        aria-label={`Edit ${category.name}`}
                        tabIndex={-1}
                      >
                        <IconButton label={`Edit ${category.name}`}>
                          <Pencil size={16} aria-hidden="true" />
                        </IconButton>
                      </Link>
                      <IconButton
                        label={`Hapus ${category.name}`}
                        variant="ghost"
                        className="hover:bg-[var(--np-color-danger-soft)] hover:text-[var(--np-color-danger)]"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[var(--np-color-text-secondary)]">
                  Belum ada kategori.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*==================================================
       CONFIRM DIALOG
      ==================================================*/}
      {confirmDialog && (
        <ConfirmDialog
          open={confirmDialog.open}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Categories;
