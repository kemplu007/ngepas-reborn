/*==================================================
 NGEPAS REBORN
 File    : ProductContext.jsx
 Module  : Context
==================================================*/

import { createContext, useContext, useEffect, useState } from "react";

import {
  getProducts,
  addProduct as createProduct,
  updateProduct as editProduct,
  deleteProduct as removeProduct,
} from "../services/productService";
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
  const [error, setError] = useState(null);

  /*==================================================
   FETCH DATA FROM BACKEND
  ==================================================*/
  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);
  /*==================================================
   ADD PRODUCT
  ==================================================*/
  const addProduct = async (product) => {
    try {
      const newProduct = await createProduct(product);

      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    }
  };

  /*==================================================
   DELETE PRODUCT
  ==================================================*/
  const deleteProduct = async (id) => {
    try {
      await removeProduct(id);

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  /*==================================================
   UPDATE PRODUCT
  ==================================================*/
  const updateProduct = async (id, updated) => {
    try {
      const product = await editProduct(id, updated);

      setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
      return product;
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts,
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
 HOOK
==================================================*/
export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useProducts wajib dipakai di dalam ProductProvider");
  return ctx;
};
