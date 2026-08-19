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
import { useCategories } from "../../context/CategoryContext";

/* Components */
import AdminDataState from "../../components/admin/AdminDataState";
import ProductTable from "../../components/admin/ProductTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";

/* Foundation */
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import SelectField from "../../components/ui/SelectField";

/* Toast */
import { useToast } from "../../context/ToastContext";

/*==================================================
 COMPONENT
==================================================*/

function Products() {
  /*==================================================
   HOOKS
  ==================================================*/
  const {
    adminProducts: products = [],
    adminLoading,
    adminError,
    refreshAdminProducts,
    deleteProduct,
  } = useProducts();
  const {
    categories: categoryRecords = [],
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
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
  const categoryOptions = [
    "All",
    ...categoryRecords.map((category) => category.name).filter(Boolean),
  ];
  const isLoading = adminLoading || categoriesLoading;
  const loadError = adminError || categoriesError;

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

  const handleRetryAdminLoad = useCallback(() => {
    setSelectedIds([]);
    refreshAdminProducts();
  }, [refreshAdminProducts]);

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
          <p className="text-[var(--np-text-small)] font-semibold text-[var(--np-color-action-primary)]">
            Management
          </p>
          <h1 className="mt-1 text-[var(--np-text-h1)] font-bold text-[var(--np-color-text-primary)]">
            Produk
          </h1>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary">
            <Plus size={18} />
            Tambah Produk
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <AdminDataState
          state="loading"
          title="Memuat katalog admin"
          description="Produk dan kategori sedang disiapkan."
        />
      ) : loadError ? (
        <div className="flex flex-col items-start gap-[var(--np-space-3)]">
          <AdminDataState
            state="error"
            title="Katalog admin belum dapat dimuat"
            description={loadError}
          />
          {adminError ? (
            <Button variant="outline" onClick={handleRetryAdminLoad}>
              Coba muat ulang katalog
            </Button>
          ) : null}
        </div>
      ) : products.length === 0 ? (
        <AdminDataState
          state="empty"
          title="Belum ada produk"
          description="Gunakan tombol Tambah Produk saat konten kurasi siap dimasukkan."
        />
      ) : (
        <>

      {/*==================================================
       BULK ACTIONS BAR
      ==================================================*/}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-np-md border border-[var(--np-color-danger-soft)] bg-[var(--np-color-danger-soft)] px-4 py-3">
          <p className="text-[var(--np-text-small)] font-medium text-[var(--np-color-danger)]">
            {selectedIds.length} produk terpilih
          </p>
          <Button
            variant="danger"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleBulkDelete}
          >
            <Trash2 size={16} />
            Hapus Terpilih
          </Button>
        </div>
      )}

      {/*==================================================
       FILTERS
      ==================================================*/}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
            placeholder="Cari nama atau kategori produk..."
          />
        </div>
        <div className="w-full sm:w-40">
          <SelectField
            id="product-category-filter"
            name="product-category-filter"
            label="Kategori"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            options={categoryOptions.map((cat) => ({
              value: cat,
              label: cat,
            }))}
          />
        </div>
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
        <div className="rounded-np-xl border border-dashed border-[var(--np-color-border)] bg-[var(--np-color-surface)] p-10 text-center">
          <p className="text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-secondary)]">
            Produk tidak ditemukan
          </p>
          <p className="mt-2 text-[var(--np-color-subtle)]">
            Coba gunakan kata kunci lain.
          </p>
        </div>
      )}
        </>
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

/*==================================================
 EXPORT
==================================================*/

export default Products;
