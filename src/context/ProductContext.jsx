/*==================================================
 NGEPAS REBORN
 File    : ProductContext.jsx
 Module  : Context
==================================================*/

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import {
  getAdminProducts as fetchAdminProducts,
  getProducts,
  getProductBySlug as fetchProductBySlug,
  addProduct as createProduct,
  updateProduct as editProduct,
  deleteProduct as removeProduct,
} from "../services/productService";
import { useAuth } from "./AuthContext";
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
  const [adminProducts, setAdminProducts] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState(null);
  const { isAuthenticated } = useAuth();

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

  /*==================================================
   FETCH ADMIN CATALOG
  ==================================================*/
  const refreshAdminProducts = useCallback(async () => {
    if (!isAuthenticated) {
      setAdminProducts([]);
      setAdminError(null);
      setAdminLoading(false);
      return;
    }

    try {
      setAdminLoading(true);
      setAdminError(null);

      const data = await fetchAdminProducts();

      setAdminProducts(data);
    } catch (err) {
      console.error(err);
      if (err?.status === 401) {
        setAdminProducts([]);
        setAdminError(
          "Sesi admin belum tersinkron. Muat ulang katalog; bila masalah berulang, masuk ulang.",
        );
      } else {
        setAdminError(err.message);
      }
    } finally {
      setAdminLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshProducts();
  }, []);

  useEffect(() => {
    refreshAdminProducts();
  }, [refreshAdminProducts]);

  /*==================================================
   GET PRODUCT BY SLUG
  ==================================================*/
  const getProductBySlug = useCallback(async (slug) => {
    try {
      return await fetchProductBySlug(slug);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  /*==================================================
   ADD PRODUCT
  ==================================================*/
  const addProduct = async (product) => {
    try {
      const newProduct = await createProduct(product);

      setAdminProducts((prev) => [...prev, newProduct]);
      if (newProduct.status === "published") {
        setProducts((prev) => [...prev, newProduct]);
      }
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
      setAdminProducts((prev) => prev.filter((p) => p.id !== id));
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

      setAdminProducts((prev) =>
        prev.map((p) => (p.id === id ? product : p)),
      );
      setProducts((prev) => {
        const hasExistingProduct = prev.some((p) => p.id === id);

        if (product.status !== "published") {
          return prev.filter((p) => p.id !== id);
        }

        return hasExistingProduct
          ? prev.map((p) => (p.id === id ? product : p))
          : [product, ...prev];
      });
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
        adminProducts,
        adminLoading,
        adminError,
        refreshProducts,
        refreshAdminProducts,
        getProductBySlug,
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
