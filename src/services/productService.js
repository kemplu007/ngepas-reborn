/*==================================================
 NGEPAS REBORN
 File   : productService.js
 Module : Product API Service
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
 GET PRODUCTS
==================================================*/

export async function getProducts() {
  return request("/products");
}

/*==================================================
 ADD PRODUCT
==================================================*/

export async function addProduct(product) {
  return request("/products", {
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
  return request(`/products/${id}`, {
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
  return request(`/products/${id}`, {
    method: "DELETE",
  });
}
