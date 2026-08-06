/*==================================================
 NGEPAS REBORN
 File    : Products.jsx
 Module  : Admin Pages — Product Management + Bulk Delete
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* React */
import { useState, useCallback } from "react";

/* Router */
import { Link } from "react-router-dom";

/* Icons */
import { Plus, Trash2 } from "lucide-react";

/* Context */
import { useProducts } from "../../context/ProductContext";

/* Components */
import ProductTable from "../../components/admin/ProductTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";

/* Toast */
import { useToast } from "../../context/ToastContext";

/*==================================================
 COMPONENT
==================================================*/

function Products() {
  /*==================================================
   HOOKS
  ==================================================*/
  const { products, deleteProduct } = useProducts();
  const { toast } = useToast();

  /*==================================================
   STATE
  ==================================================*/
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  /*==================================================
   DERIVED DATA
  ==================================================*/
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();
    const matchSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword);
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const allFilteredSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((p) => selectedIds.includes(p.id));

  /*==================================================
   HANDLERS
  ==================================================*/

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (allFilteredSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  }, [allFilteredSelected, filteredProducts]);

  const handleDelete = useCallback(
    (id) => {
      const product = products.find((p) => p.id === id);
      setConfirmDialog({
        open: true,
        title: "Hapus Produk",
        message: `Yakin ingin menghapus "${product?.name || id}"? Tindakan ini tidak dapat dibatalkan.`,
        onConfirm: async () => {
          await deleteProduct(id);
          setSelectedIds((prev) => prev.filter((i) => i !== id));
          toast("Produk berhasil dihapus", "success");
          setConfirmDialog({ open: false });
        },
      });
    },
    [deleteProduct, toast, products],
  );

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) return;
    setConfirmDialog({
      open: true,
      title: "Hapus Produk Terpilih",
      message: `Yakin ingin menghapus ${selectedIds.length} produk terpilih? Tindakan ini tidak dapat dibatalkan.`,
      onConfirm: async () => {
        let successCount = 0;
        for (const id of selectedIds) {
          try {
            await deleteProduct(id);
            successCount++;
          } catch (err) {
            console.error(`Gagal menghapus produk ${id}:`, err);
          }
        }
        toast(
          `${successCount} produk berhasil dihapus`,
          successCount > 0 ? "success" : "error",
        );
        setSelectedIds([]);
        setConfirmDialog({ open: false });
      },
    });
  }, [selectedIds, deleteProduct, toast]);

  /*==================================================
   RENDER
  ==================================================*/

  return (
    <section className="flex flex-col gap-6">
      {/*==================================================
       HEADER
      ==================================================*/}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-600">Management</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Produk</h1>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          Tambah Produk
        </Link>
      </div>

      {/*==================================================
       BULK ACTIONS BAR
      ==================================================*/}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">
            {selectedIds.length} produk terpilih
          </p>
          <button
            type="button"
            onClick={handleBulkDelete}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Hapus Terpilih
          </button>
        </div>
      )}

      {/*==================================================
       FILTERS
      ==================================================*/}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau kategori produk..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 sm:w-72"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 sm:w-40"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/*==================================================
       PRODUCT TABLE
      ==================================================*/}
      {filteredProducts.length > 0 ? (
        <ProductTable
          products={filteredProducts}
          onDelete={handleDelete}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onSelectAll={toggleSelectAll}
          allSelected={allFilteredSelected}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-700">
            Produk tidak ditemukan
          </p>
          <p className="mt-2 text-slate-500">Coba gunakan kata kunci lain.</p>
        </div>
      )}

      {/*==================================================
       CONFIRM DIALOG
      ==================================================*/}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ open: false })}
      />
    </section>
  );
}

export default Products;
