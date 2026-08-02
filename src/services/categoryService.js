/*==================================================
 NGEPAS REBORN
 File   : categoryService.js
 Module : Category API Service
==================================================*/

import API_URL from "./api";

/*==================================================
 GET CATEGORIES
==================================================*/

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);

  return response.json();
}

/*==================================================
 CREATE CATEGORY
==================================================*/

export async function createCategory(category) {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(category),
  });

  return response.json();
}

/*==================================================
 UPDATE CATEGORY
==================================================*/

export async function updateCategory(id, category) {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(category),
  });

  return response.json();
}

/*==================================================
 DELETE CATEGORY
==================================================*/

export async function deleteCategory(id) {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });

  return response.json();
}