"use client";

import { useState } from "react";

export const RecipeFavoriteButton = () => {
  const [isFavorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!isFavorite);
  const favoriteButtonToggleStyle = isFavorite
    ? "bg-tomato-solid border-transparent"
    : "border-tomato-normal text-tomato-dim";

  return (
    <button
      onClick={toggleFavorite}
      className={`w-full rounded-md  border px-3 py-1 text-sm ${favoriteButtonToggleStyle}`}
    >
      {isFavorite ? "お気に入り追加" : "お気に入りから削除"}
    </button>
  );
};
