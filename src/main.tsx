/*==================================================
 NGEPAS REBORN
 File    : main.tsx
 Module  : Core
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

/* React */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Router */
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

/* Context */

import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CategoryProvider } from './context/CategoryContext';
import { ToastProvider } from './context/ToastContext';

/* Components */
import ScrollToTop from './components/common/ScrollToTop';
import { FavoritesProvider } from './context/FavoritesContext';

/*==================================================
 APPLICATION
==================================================*/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <CategoryProvider>
            <ProductProvider>
              <FavoritesProvider>
                <ScrollToTop />
                <App />
              </FavoritesProvider>
            </ProductProvider>
          </CategoryProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
