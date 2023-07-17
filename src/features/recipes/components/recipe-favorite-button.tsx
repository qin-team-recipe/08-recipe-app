"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";

export const RecipeFavoriteButton = () => {
  const [isFavorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!isFavorite);

  return (
    <Button onClick={toggleFavorite} variant={isFavorite ? "outline" : "solid"}>
      {isFavorite ? "お気に入り追加" : "お気に入りから削除"}
    </Button>
  );
};
