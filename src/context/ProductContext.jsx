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

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
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
