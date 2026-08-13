/*==================================================
 NGEPAS REBORN
 File   : authService.js
 Module : Authentication API Service
==================================================*/

import { apiRequest, saveToken, removeToken } from './api';

/*==================================================
 LOGIN
==================================================*/

export async function login(email, password) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  saveToken(data.token);

  return data;
}

/*==================================================
 LOGOUT
==================================================*/

export function logout() {
  removeToken();
}
