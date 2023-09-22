"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

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
  const [optimisticIsFavorite, optimisticSetIsFavorite] = useOptimistic<boolean, null>(
    initialIsFavorite as boolean,
    (state: boolean) => !state,
  );
  console.log("optimisticIsFavorite", optimisticIsFavorite);
  const toggleFavorite = async () => {
    if (!userId) {
      alert("お気に入り追加するにはログインしてください");
    } else {
      optimisticSetIsFavorite(null);
      await updateRecipeFavorite(recipeId, userId, optimisticIsFavorite);
    }
  };
  const favoriteButtonToggleStyle = optimisticIsFavorite
    ? "border-tomato-normal text-tomato-dim"
    : "bg-tomato-solid border-transparent";

  return (
    <button
      onClick={toggleFavorite}
      className={`w-full rounded-md  border px-3 py-1 text-sm ${favoriteButtonToggleStyle}`}
    >
      {optimisticIsFavorite ? "お気に入りから削除" : "お気に入り追加"}
    </button>
  );
};
