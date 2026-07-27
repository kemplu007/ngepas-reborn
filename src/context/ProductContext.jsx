/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductContext.jsx
 Module  : Context
==================================================*/

import { createContext, useContext, useEffect, useState } from "react";

/*==================================================
 PRODUCT CONTEXT
==================================================*/

const ProductContext = createContext(null);

/*==================================================
 PRODUCT PROVIDER
==================================================*/

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /*==================================================
 LOAD PRODUCTS FROM BACKEND
==================================================*/

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil produk");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Backend gagal dihubungi:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  /*==================================================
   ADD PRODUCT
  ==================================================*/

  const addProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan produk");
      }

      const newProduct = await response.json();

      setProducts((currentProducts) => [...currentProducts, newProduct]);
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
    }
  };

  /*==================================================
 DELETE PRODUCT FROM BACKEND
==================================================*/

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus produk");
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId),
      );
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };
  /*==================================================
   UPDATE PRODUCT IN BACKEND
  ==================================================*/

  /*
  Memperbarui produk di backend berdasarkan ID.

  Jika backend berhasil memperbarui produk,
  state frontend ikut diperbarui menggunakan
  data terbaru dari backend.
  */

  const updateProduct = async (productId, updatedProduct) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!response.ok) {
        throw new Error("Gagal memperbarui produk");
      }

      const savedProduct = await response.json();

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? savedProduct : product,
        ),
      );
    } catch (error) {
      console.error("Gagal memperbarui produk:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

/*==================================================
 PRODUCT HOOK
==================================================*/

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts harus digunakan di dalam ProductProvider");
  }

  return context;
}
