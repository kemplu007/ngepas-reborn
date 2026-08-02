/*==================================================
 NGEPAS REBORN
 File    : Categories.jsx
 Module  : Admin Pages
==================================================*/
/*==================================================
 IMPORT
==================================================*/

/* Router */
import { Link, useNavigate } from "react-router-dom";

/* Icons */
import { Plus, Pencil, Trash2 } from "lucide-react";

/* Context */
import { useCategories } from "../../context/CategoryContext";

/*==================================================
 COMPONENT
==================================================*/

function Categories() {
  /*==================================================
   HOOKS
==================================================*/

  const navigate = useNavigate();
  /*==================================================
   CONTEXT
==================================================*/

  const { categories, loading, error, deleteCategory } = useCategories();

  if (loading) {
    return (
      <div className="p-6">
        <p>Memuat kategori...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  /*==================================================
   HANDLERS  ==================================================*/

  /* Handle Edit */

  const handleEdit = (id) => {
    navigate(`/admin/categories/${id}/edit`);
  };

  /* Handle Delete */

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus kategori ini?");

    if (!confirmed) return;

    try {
      await deleteCategory(id);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <section className="p-6">
      {/*==================================================
       HEADER    ==================================================*/}

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
       TABLE  ==================================================*/}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Nama</th>

              <th className="px-4 py-3">Slug</th>

              <th className="px-4 py-3">Room</th>

              <th className="px-4 py-3">Status</th>

              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="border-t">
                  <td className="px-4 py-3">{category.name}</td>

                  <td className="px-4 py-3">{category.slug}</td>

                  <td className="px-4 py-3">{category.room}</td>

                  <td className="px-4 py-3">
                    {category.status ? (
                      <span className="text-green-600 font-medium">Aktif</span>
                    ) : (
                      <span className="text-red-500 font-medium">Nonaktif</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      {/*Action*/}
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="p-2 rounded-lg border hover:bg-gray-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 rounded-lg border hover:bg-red-100 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Belum ada kategori.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Categories;
