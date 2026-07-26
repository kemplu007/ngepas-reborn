/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductContext.jsx
 Module  : Context
==================================================*/

import { createContext, useContext, useEffect, useState } from "react";

import initialProducts from "../data/products";

/*==================================================
 PRODUCT CONTEXT
==================================================*/

const ProductContext = createContext(null);

/*==================================================
 PRODUCT PROVIDER
==================================================*/

export function ProductProvider({ children }) {
  
  const [products, setProducts] = useState(() => {
  const savedProducts = localStorage.getItem("ngepas-products");

  if (savedProducts) {
    return JSON.parse(savedProducts);
  }

  return initialProducts;
});

  /*==================================================
 SAVE PRODUCTS TO LOCAL STORAGE
==================================================*/

/*
Menyimpan products setiap kali
data produk mengalami perubahan.
*/

useEffect(() => {
  localStorage.setItem(
    "ngepas-products",
    JSON.stringify(products)
  );
}, [products]);
  /*==================================================
   ADD PRODUCT
  ==================================================*/

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts((currentProducts) => [...currentProducts, newProduct]);
  };
  
  /*==================================================
   DELETE PRODUCT
  ==================================================*/

  /*
  Menghapus produk berdasarkan ID.

  Product dengan ID yang sesuai akan
  dikeluarkan dari shared product state.
  */

  const deleteProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId
      )
    );
  };

  /*==================================================
   UPDATE PRODUCT
  ==================================================*/

  /*
  Memperbarui data produk berdasarkan ID.

  Product dengan ID yang sesuai akan diganti
  dengan data terbaru dari Admin Product Form.
  */

  const updateProduct = (productId, updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...updatedProduct,
              id: product.id,
            }
          : product
      )
    );
    
  };

  /*==================================================
 RESET PRODUCTS
==================================================*/

/*
Mengembalikan seluruh data produk
ke data awal dari products.js.

Digunakan selama development untuk
membersihkan perubahan dari localStorage.
*/

const resetProducts = () => {
  setProducts(initialProducts);
};

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        resetProducts,
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
