
/*==================================================
 NGEPAS REBORN
 File    : FavoritesContext.jsx
 Module  : Context
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { createContext, useContext } from "react";
import useFavorites from "../hooks/useFavorites";

/*==================================================
 CONTEXT
==================================================*/

const FavoritesContext = createContext();

/*==================================================
 PROVIDER
==================================================*/

function FavoritesProvider({ children }) {

  const favorite = useFavorites();

  return (
    <FavoritesContext.Provider value={favorite}>
      {children}
    </FavoritesContext.Provider>
  );
}

/*==================================================
 HOOK
==================================================*/

function useFavoriteContext() {
  return useContext(FavoritesContext);
}

/*==================================================
 EXPORT
==================================================*/

export {
  FavoritesProvider,
  useFavoriteContext,
};