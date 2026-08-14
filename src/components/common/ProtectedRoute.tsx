/*==================================================
 NGEPAS REBORN
 File    : ProtectedRoute.tsx
 Module  : Authentication Guard
==================================================*/

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/*==================================================
 PROTECTED ROUTE
==================================================*/

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
