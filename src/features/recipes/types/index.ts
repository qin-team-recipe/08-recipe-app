import { Selectable } from "kysely";

import { Recipe, RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink, User } from "@/types/db";

export type RecipeListItemType = Omit<Selectable<Recipe>, "deletedAt"> & {
  imgSrc: string;
  favoriteCount: number;
};

export type RecipeDetail = Selectable<Recipe> & { User: Pick<Selectable<User>, "id" | "name" | "image">[] } & {
  RecipeImage: Pick<Selectable<RecipeImage>, "id" | "imgSrc" | "index">[];
} & {
  RecipeIngredient: Pick<Selectable<RecipeIngredient>, "id" | "name" | "index">;
} & { RecipeCookingProcedure: Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index"> } & {
  RecipeLink: Selectable<RecipeLink>[];
};
