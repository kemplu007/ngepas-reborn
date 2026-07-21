/*==================================================
 NGEPAS REBORN
 File    : useFavorites.js
 Module  : Hooks
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { useEffect, useState } from "react";

/*==================================================
 HOOK
==================================================*/

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  /*==================================================
   TOGGLE FAVORITE
  ==================================================*/

  const toggleFavorite = (slug) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(slug)
        ? prevFavorites.filter((item) => item !== slug)
        : [...prevFavorites, slug],
    );
  };

  /*==================================================
 SAVE FAVORITES
==================================================*/

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /*==================================================
   RETURN
  ==================================================*/

  return {
    favorites,
    toggleFavorite,
  };
}

/*==================================================
 EXPORT
==================================================*/

export default useFavorites;
