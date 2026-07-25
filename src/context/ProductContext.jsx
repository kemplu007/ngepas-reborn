/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductContext.jsx
 Module  : Context
==================================================*/

import { createContext, useContext, useState } from "react";

import initialProducts from "../data/products";

/*==================================================
 PRODUCT CONTEXT
==================================================*/

const ProductContext = createContext(null);

/*==================================================
 PRODUCT PROVIDER
==================================================*/

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

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

  return (
    <ProductContext.Provider
      value={{
        products,
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
