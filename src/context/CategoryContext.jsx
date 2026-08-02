
/*==================================================
 NGEPAS REBORN
 File    : CategoryContext.jsx
 Module  : Context
==================================================*/

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*==================================================
   REFRESH CATEGORIES
  ==================================================*/

  const refreshCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  /*==================================================
   ADD CATEGORY
  ==================================================*/

  const addCategory = async (category) => {
    try {
      const newCategory = await createCategory(category);

      setCategories((prev) => [...prev, newCategory]);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  /*==================================================
   UPDATE CATEGORY
  ==================================================*/

  const updateCategory = async (id, category) => {
    try {
      const updated = await editCategory(id, category);

      setCategories((prev) =>
        prev.map((item) =>
          item.id === id ? updated : item
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  /*==================================================
   DELETE CATEGORY
  ==================================================*/

  const deleteCategory = async (id) => {
    try {
      await removeCategory(id);

      setCategories((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        refreshCategories,
        addCategory,
        updateCategory,
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
    throw new Error(
      "useCategories wajib dipakai di dalam CategoryProvider"
    );
  }

  return ctx;
};