/*==================================================
 NGEPAS REBORN
 File   : productService.js
 Module : Product API Service
==================================================*/

import { apiRequest } from "./api";

/*==================================================
 GET PRODUCTS
==================================================*/

export async function getProducts() {
  return apiRequest("/products");
}

/*==================================================
 GET ADMIN PRODUCTS
==================================================*/

export async function getAdminProducts() {
  return apiRequest("/products/admin");
}

/*==================================================
 GET PRODUCT BY SLUG
==================================================*/

export async function getProductBySlug(slug) {
  return apiRequest(`/products/${encodeURIComponent(slug)}`);
}

/*==================================================
 ADD PRODUCT
==================================================*/

export async function addProduct(product) {
  return apiRequest("/products", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(product),
  });
}

/*==================================================
 UPDATE PRODUCT
==================================================*/

export async function updateProduct(id, product) {
  return apiRequest(`/products/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(product),
  });
}

/*==================================================
 DELETE PRODUCT
==================================================*/

export async function deleteProduct(id) {
  return apiRequest(`/products/${id}`, {
    method: "DELETE",
  });
}
