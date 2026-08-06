/*==================================================
 NGEPAS REBORN
 File   : categoryService.js
 Module : Category API Service
==================================================*/

import API_URL from "./api";

/*==================================================
 REQUEST HELPER
==================================================*/

async function request(endpoint, options = {}) {
  const headers = {
  ...(options.headers || {}),
};

if (options.method && options.method !== "GET") {
  headers["x-api-key"] = import.meta.env.VITE_ADMIN_API_KEY;
}

const response = await fetch(`${API_URL}${endpoint}`, {
  ...options,
  headers,
});

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Terjadi kesalahan.");
  }

  return result.data;
}

/*==================================================
 GET CATEGORIES
==================================================*/

export async function getCategories() {
  return request("/categories");
}

/*==================================================
 CREATE CATEGORY
==================================================*/

export async function createCategory(category) {
  return request("/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
}

/*==================================================
 UPDATE CATEGORY
==================================================*/

export async function updateCategory(id, category) {
  return request(`/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
}

/*==================================================
 DELETE CATEGORY
==================================================*/

export async function deleteCategory(id) {
  return request(`/categories/${id}`, {
    method: "DELETE",
  });
}
