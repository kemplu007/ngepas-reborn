/*==================================================
 NGEPAS REBORN
 File    : ProductContext.jsx
 Module  : Context
==================================================*/

import { createContext, useContext, useEffect, useState } from "react";

/*==================================================
 CONTEXT
==================================================*/
const ProductContext = createContext(null);

/*==================================================
 PROVIDER
==================================================*/
export function ProductProvider({ children }) {
  /*==================================================
   STATE
  ==================================================*/
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /*==================================================
   FETCH DATA FROM BACKEND
  ==================================================*/
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const json = await res.json();

        // Ambil data dari properti "data" (sesuai response backend lu)
        if (json.success) setProducts(json.data);
      } catch (err) {
        console.error("Koneksi backend gagal:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  /*==================================================
   ADD PRODUCT
  ==================================================*/
  const addProduct = async (product) => {
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Gagal tambah produk");
      
      const result = await res.json();
      setProducts((prev) => [...prev, result.data]);
    } catch (err) {
      console.error(err);
    }
  };

  /*==================================================
   DELETE PRODUCT
  ==================================================*/
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal hapus produk");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /*==================================================
   UPDATE PRODUCT
  ==================================================*/
  const updateProduct = async (id, updated) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Gagal update produk");

      const result = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? result.data : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

/*==================================================
 HOOK
==================================================*/
export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts wajib dipakai di dalam ProductProvider");
  return ctx;
};