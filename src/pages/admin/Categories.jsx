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

  const handleEdit = (id) => {
    navigate(`/admin/categories/${id}/edit`);
  };

  const handleDelete = (id) => {
    const category = categories.find((c) => c.id === id);
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
   RENDER
  ==================================================*/

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-500">Memuat kategori...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <section className="p-6">
      {/*==================================================
       HEADER
      ==================================================*/}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500 mt-1">
            Kelola seluruh kategori produk Ngepas.
          </p>
        </div>

        <Link
          to="/admin/categories/new"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Tambah Kategori
        </Link>
      </div>

      {/*==================================================
       TABLE
      ==================================================*/}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="border-t hover:bg-slate-50/50 transition">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {category.name}
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                    {category.slug}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">
                    {category.room}
                  </td>
                  <td className="px-4 py-3 text-lg">{category.icon || "—"}</td>
                  <td className="px-4 py-3">
                    {category.status ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 font-medium text-sm">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="p-2 rounded-lg border hover:bg-gray-100 transition"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 rounded-lg border hover:bg-red-100 text-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
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

export default Categories;
