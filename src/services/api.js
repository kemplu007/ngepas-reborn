/*==================================================
 NGEPAS REBORN
 File   : api.js
 Module : API Configuration
==================================================*/

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/*==================================================
 JWT TOKEN
==================================================*/

export function getToken() {
  return localStorage.getItem("ngepas_token");
}

/*==================================================
 SAVE JWT TOKEN
==================================================*/

export function saveToken(token) {
  localStorage.setItem("ngepas_token", token);
}

/*==================================================
 REMOVE JWT TOKEN
==================================================*/

export function removeToken() {
  localStorage.removeItem("ngepas_token");
}

/*==================================================
 API REQUEST
==================================================*/

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    const error = new Error(result.message || "Terjadi kesalahan.");
    error.status = response.status;
    throw error;
  }

  return result.data;
}

export default API_URL;
