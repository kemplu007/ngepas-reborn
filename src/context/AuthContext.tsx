/*==================================================
 NGEPAS REBORN
 File    : AuthContext.tsx
 Module  : Context
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/* Services */
import { login as loginService, logout as logoutService } from '../services/authService';

/*==================================================
 CONTEXT
==================================================*/

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

/*==================================================
 PROVIDER
==================================================*/

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('ngepas_token'));

  useEffect(() => {
    const syncToken = (event: StorageEvent) => {
      if (event.key === 'ngepas_token') {
        setToken(event.newValue);
      }
    };

    window.addEventListener('storage', syncToken);
    return () => window.removeEventListener('storage', syncToken);
  }, []);

  /*==================================================
   LOGIN
  ==================================================*/

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);

    setToken(data.token);
  };

  /*==================================================
   LOGOUT
  ==================================================*/

  const logout = () => {
    logoutService();

    setToken(null);
  };

  /*==================================================
   RENDER
  ==================================================*/

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*==================================================
 HOOK
==================================================*/

// Hook ini merupakan public API context dan tidak menyimpan state komponen sendiri.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth wajib dipakai di dalam AuthProvider');
  }

  return ctx;
}
