/*==================================================
 NGEPAS REBORN
 File    : ProductTable.jsx
 Module  : Admin Components — Product Table + Bulk Selection
 Intent  : Status tetap mudah dipindai pada daftar mobile tanpa
           mengubah data, aksi, atau perilaku tabel.
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* Router */
import { Link } from "react-router-dom";

/* Icons */
import { Pencil, Trash2 } from "lucide-react";

/* Admin feature helpers */
import { getProductContentReadiness } from "./productReadiness";

/* Foundation */
import Badge from "../ui/Badge";
import CheckboxField from "../ui/CheckboxField";
import IconButton from "../ui/IconButton";

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
    <div className="min-w-0 max-w-full overflow-x-auto rounded-np-lg border border-[var(--np-color-border)] bg-[var(--np-color-surface)] shadow-[var(--np-shadow-sm)]">
      <table className="min-w-[34rem] w-full text-left text-[var(--np-text-small)] md:min-w-0">
        {/*==================================================
         TABLE HEADER
        ==================================================*/}
        <thead className="border-b border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)] text-[var(--np-color-text-secondary)]">
          <tr>
            <th className="px-4 py-3 w-10">
              <CheckboxField
                id="product-table-select-all"
                checked={allSelected}
                onChange={onSelectAll}
                label=""
                className="[&>label]:hidden [&>input]:mt-0"
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
            <th className="px-4 py-3 font-medium hidden xl:table-cell">
              Kesiapan
            </th>
            <th className="px-4 py-3 font-medium text-right">Aksi</th>
          </tr>
        </thead>

        {/*==================================================
         TABLE BODY
        ==================================================*/}
        <tbody className="divide-y divide-[var(--np-color-border)]">
          {products.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            const readiness = getProductContentReadiness(product);
            const readinessLabel = readiness.isReady
              ? product.status === "published"
                ? "Siap publik"
                : "Konten siap"
              : product.status === "published"
                ? "Perlu dilengkapi"
                : "Belum lengkap";
            return (
              <tr
                key={product.id}
                className={`transition-colors duration-np-fast ease-np-standard ${
                  isSelected
                    ? "bg-[var(--np-color-surface-accent)]"
                    : "hover:bg-[var(--np-color-surface-muted)]"
                }`}
              >
                {/* Checkbox */}
                <td className="px-4 py-3">
                  <CheckboxField
                    id={`product-select-${product.id}`}
                    checked={isSelected}
                    onChange={() => onToggleSelect(product.id)}
                    label=""
                    className="[&>label]:hidden [&>input]:mt-0"
                  />
                </td>

                {/* Product info */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 shrink-0 rounded-np-md object-cover border border-[var(--np-color-border)]"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[var(--np-color-text-primary)]">
                        {product.name}
                      </p>
                      <div className="mt-[var(--np-space-1)] flex flex-wrap items-center gap-[var(--np-space-2)] lg:hidden">
                        <Badge
                          variant={
                            product.status === "published" ? "primary" : "neutral"
                          }
                        >
                          {product.status === "published" ? "Published" : "Draft"}
                        </Badge>
                        <Badge
                          variant={readiness.isReady ? "primary" : "accent"}
                          className="xl:hidden"
                        >
                          {readinessLabel}
                        </Badge>
                        <p className="truncate text-[var(--np-text-caption)] text-[var(--np-color-subtle)] md:hidden">
                          {product.category} • {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3 hidden md:table-cell capitalize text-[var(--np-color-text-secondary)]">
                  {product.category}
                </td>

                {/* Price */}
                <td className="px-4 py-3 hidden md:table-cell font-medium text-[var(--np-color-success)]">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </td>

                {/* Stock */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <Badge variant={product.stock > 0 ? "primary" : "danger"}>
                    {product.stock > 0 ? `${product.stock}` : "Habis"}
                  </Badge>
                </td>

                {/* Status */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <Badge
                    variant={
                      product.status === "published" ? "primary" : "neutral"
                    }
                  >
                    {product.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </td>

                {/* Content readiness */}
                <td className="hidden px-4 py-3 xl:table-cell">
                  <Badge variant={readiness.isReady ? "primary" : "accent"}>
                    {readinessLabel}
                  </Badge>
                  <p className="mt-[var(--np-space-1)] max-w-40 text-[var(--np-text-caption)] leading-snug text-[var(--np-color-text-secondary)]">
                    {readiness.isReady
                      ? "URL gambar dan affiliate siap."
                      : `Butuh: ${readiness.missingLabels.join(", ")}.`}
                  </p>
                </td>

                {/* Action */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="inline-flex"
                      aria-label={`Edit ${product.name}`}
                      tabIndex={-1}
                    >
                      <IconButton label={`Edit ${product.name}`}>
                        <Pencil size={16} />
                      </IconButton>
                    </Link>
                    <IconButton
                      label={`Hapus ${product.name}`}
                      variant="ghost"
                      className="hover:bg-[var(--np-color-danger-soft)] hover:text-[var(--np-color-danger)]"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 size={16} />
                    </IconButton>
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

/*==================================================
 EXPORT
==================================================*/

export default ProductTable;
