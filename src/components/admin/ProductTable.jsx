/*==================================================
 NGEPAS REBORN
 File    : ProductTable.jsx
 Module  : Admin Components — Product Table + Bulk Selection
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* Router */
import { Link } from "react-router-dom";

/* Icons */
import { Pencil, Trash2 } from "lucide-react";

/*==================================================
 COMPONENT
==================================================*/

function ProductTable({
  products,
  onDelete,
  selectedIds = [],
  onToggleSelect,
  onSelectAll,
  allSelected = false,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        {/*==================================================
         TABLE HEADER
        ==================================================*/}
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </th>
            <th className="px-4 py-3 font-medium">Produk</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">
              Kategori
            </th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">
              Harga
            </th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">Stok</th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">
              Status
            </th>
            <th className="px-4 py-3 font-medium text-right">Aksi</th>
          </tr>
        </thead>

        {/*==================================================
         TABLE BODY
        ==================================================*/}
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <tr
                key={product.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? "bg-emerald-50/60"
                    : "hover:bg-slate-50/80"
                }`}
              >
                {/* Checkbox */}
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(product.id)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </td>

                {/* Product info */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 shrink-0 rounded-lg object-cover border border-slate-200"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">
                        {product.name}
                      </p>
                      <p className="truncate text-xs text-slate-400 md:hidden">
                        {product.category} • {product.price}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3 hidden md:table-cell text-slate-600 capitalize">
                  {product.category}
                </td>

                {/* Price */}
                <td className="px-4 py-3 hidden md:table-cell font-medium text-emerald-600">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </td>

                {/* Stock */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock}` : "Habis"}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {product.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="rounded-lg p-2 text-slate-500 transition-all hover:bg-emerald-50 hover:text-emerald-600 active:scale-95"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
                      className="rounded-lg p-2 text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
