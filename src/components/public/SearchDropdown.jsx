/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : SearchDropdown.jsx
 Module  : Components
==================================================*/

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import highlightText from "../../utils/highlightText";

/*==================================================
 COMPONENT
==================================================*/

function SearchDropdown() {
  /*==================================================
 STATE
==================================================*/

  const [keyword, setKeyword] = useState("");

  const { products } = useProducts();
  /*==================================================
 FILTER PRODUCT
==================================================*/

  const filteredProducts = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    if (!search) return [];

    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
        );
      })
      .slice(0, 5);
  }, [keyword]);

  /*==================================================
 HANDLER
==================================================*/

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const clearSearch = () => {
    setKeyword("");
  };

  /*==================================================
 RETURN
==================================================*/

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Cari produk..."
          value={keyword}
          onChange={handleChange}
          className="w-full rounded-full border border-border bg-muted/50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-background focus:ring-2 focus:ring-ring/20"
        />
      </div>

      {keyword && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                onClick={clearSearch}
                className="flex items-center gap-3 border-b border-border px-3 py-2.5 transition hover:bg-accent last:border-none"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-12 rounded-lg object-cover flex-shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-foreground">
                    {highlightText(product.name, keyword)}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {highlightText(product.category, keyword)}
                    <span className="mx-1">•</span>
                    <span className="font-semibold text-primary">
                      {product.price}
                    </span>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-5 text-center">
              <p className="font-medium text-foreground">
                Produk tidak ditemukan
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Coba gunakan kata kunci lain.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;
