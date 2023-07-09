"use client";

import { useState } from "react";

export const RecipeFavoriteButton = () => {
  const [isFavorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!isFavorite);

  return (
    <button
      onClick={toggleFavorite}
      className={
        isFavorite
          ? "bg-tomato-solid rounded-md border border-transparent px-4 py-1 text-sm"
          : "border-tomato-normal text-tomato-dim rounded-md border px-4 py-1 text-sm"
      }
    >
      {isFavorite ? "お気に入り追加" : "お気に入りから削除"}
    </button>
  );
};
