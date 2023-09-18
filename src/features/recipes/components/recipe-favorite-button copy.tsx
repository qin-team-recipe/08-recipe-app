"use client";

import { useState, useTransition } from "react";

import { setRecipeFavorite } from "@/features/recipes";

export const RecipeFavoriteButton = ({
  initialIsFavorite,
  recipeId,
  userId,
}: {
  initialIsFavorite?: boolean;
  recipeId: string;
  userId?: string;
}) => {
  const [isFavorite, setFavorite] = useState(initialIsFavorite);
  const [, startTransition] = useTransition();
  const toggleFavorite = () => {
    if (!userId) {
      alert("お気に入り追加するにはログインしてください");
    } else {
      setFavorite(!isFavorite);
      startTransition(async () => {
        await setRecipeFavorite(recipeId, userId, !isFavorite);
      });
    }
  };
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
