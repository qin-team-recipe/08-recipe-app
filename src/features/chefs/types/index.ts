import { Selectable } from "kysely";

import { User } from "@/types/db";

export type ChefListItemType = Pick<
  Selectable<User>,
  "id" | "name" | "image" | "profileText" | "createdAt" | "updatedAt"
>;

export type ChefListItemWithRecipeCountType = ChefListItemType & {
  recipeCount: number;
};
