import { Selectable } from "kysely";

import { Recipe } from "@/types/db";

export type RecipeListItemType = Omit<Selectable<Recipe>, "deletedAt"> & {
  imgSrc: string;
  favoriteCount: number;
};
