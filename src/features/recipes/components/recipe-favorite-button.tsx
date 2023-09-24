"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { useRouter } from "next/navigation";

import { updateRecipeFavorite } from "@/features/recipes";

export const RecipeFavoriteButton = ({
  initialIsFavorite,
  recipeId,
  userId,
}: {
  initialIsFavorite?: boolean;
  recipeId: string;
  userId?: string;
}) => {
  const router = useRouter();
  const [optimisticIsFavorite, optimisticSetIsFavorite] = useOptimistic<boolean, null>(
    initialIsFavorite as boolean,
    (state: boolean) => !state,
  );
  const toggleFavorite = async () => {
    if (!userId) {
      router.push(`/login?callbackUrl=/recipe/${recipeId}`);
    } else {
      optimisticSetIsFavorite(null);
      await updateRecipeFavorite(recipeId, userId, !optimisticIsFavorite);
    }
  };
  const favoriteButtonToggleStyle = optimisticIsFavorite
    ? "border-tomato-normal text-tomato-dim"
    : "bg-tomato-solid border-transparent";

  return (
    <button
      onClick={toggleFavorite}
      className={`mt-4 w-full rounded-md  border px-3 py-1 text-sm ${favoriteButtonToggleStyle}`}
    >
      {optimisticIsFavorite ? "お気に入りから削除" : "お気に入り追加"}
    </button>
  );
};
