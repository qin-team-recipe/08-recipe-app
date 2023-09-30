import { Selectable } from "kysely";

import { User, UserLink } from "@/types/db";

export type ChefListItemType = Pick<
  Selectable<User>,
  "id" | "name" | "image" | "profileText" | "createdAt" | "updatedAt"
>;

export type ChefListItemWithRecipeCountType = ChefListItemType & {
  recipeCount: number;
};

export type UserChefDetail = Pick<Selectable<User>, "id" | "name" | "image" | "profileText"> & {
  userLinks: Pick<Selectable<UserLink>, "id" | "url" | "category">[];
};
