/*==================================================
 NGEPAS REBORN
 File    : CategoryContext.jsx
 Module  : Context
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* React */
import { createContext, useContext, useEffect, useState } from "react";

/* Services */
import {
  getCategories,
  createCategory,
  updateCategory as editCategory,
  deleteCategory as removeCategory,
} from "../services/categoryService";

/*==================================================
 CONTEXT
==================================================*/

const CategoryContext = createContext(null);

/*==================================================
 PROVIDER
==================================================*/

export function CategoryProvider({ children }) {
  /*==================================================
   STATE
  ==================================================*/

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  /*==================================================
   HELPERS
  ==================================================*/

  /* Refresh Categories */

  const refreshCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCategories();

      setCategories(data || []);
    } catch (err) {
      console.error(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /*==================================================
   LIFECYCLE
  ==================================================*/

  useEffect(() => {
    refreshCategories();
  }, []);

  /*==================================================
   ACTIONS
  ==================================================*/

  /* Add Category */

  const addCategory = async (category) => {
    try {
      const newCategory = await createCategory(category);

      setCategories((prev) => [...prev, newCategory]);

      return newCategory;
    } catch (err) {
      console.error(err);

      setError(err.message);

      throw err;
    }
  };

  /* Update Category */

  const updateCategory = async (id, category) => {
    try {
      await editCategory(id, category);

      await refreshCategories();
    } catch (err) {
      console.error(err);

      setError(err.message);

      throw err;
    }
  };

  /* Delete Category */

  const deleteCategory = async (id) => {
    try {
      await removeCategory(id);

      await refreshCategories();
    } catch (err) {
      console.error(err);

      setError(err.message);

      throw err;
    }
  };

  /*==================================================
   RENDER
  ==================================================*/

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        refreshCategories,
        addCategory,
        editCategory: updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

/*==================================================
 HOOK
==================================================*/

export const useCategories = () => {
  const ctx = useContext(CategoryContext);

  if (!ctx) {
    throw new Error("useCategories wajib dipakai di dalam CategoryProvider");
  }

  return ctx;
};
