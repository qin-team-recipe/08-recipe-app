"use client";

import { useState, useTransition } from "react";

import { updateRecipeFavorite } from "@/actions/recipe/recipe-favorite";

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
        await updateRecipeFavorite(recipeId, userId, !isFavorite);
      });
    }
  };
  const favoriteButtonToggleStyle = isFavorite
    ? "border-tomato-normal text-tomato-dim"
    : "bg-tomato-solid border-transparent";

  return (
    <button
      onClick={toggleFavorite}
      className={`w-full rounded-md  border px-3 py-1 text-sm ${favoriteButtonToggleStyle}`}
    >
      {isFavorite ? "お気に入りから削除" : "お気に入り追加"}
    </button>
  );
};
