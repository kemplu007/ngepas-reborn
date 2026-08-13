/*==================================================
 NGEPAS REBORN
 File   : categoryService.js
 Module : Category API Service
==================================================*/

import { apiRequest } from './api';

/*==================================================
 GET CATEGORIES
==================================================*/

export async function getCategories() {
  return apiRequest('/categories');
}

/*==================================================
 CREATE CATEGORY
==================================================*/

export async function createCategory(category) {
  return apiRequest('/categories', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(category),
  });
}

/*==================================================
 UPDATE CATEGORY
==================================================*/

export async function updateCategory(id, category) {
  return apiRequest(`/categories/${id}`, {
    method: 'PUT',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(category),
  });
}

/*==================================================
 DELETE CATEGORY
==================================================*/

export async function deleteCategory(id) {
  return apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  });
}
