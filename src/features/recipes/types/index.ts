import { ComponentProps } from "react";

import { Selectable } from "kysely";

import { Recipe, RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink, User } from "@/types/db";

export type RecipeListItemType = Omit<Selectable<Recipe>, "deletedAt"> & {
  imgSrc: string;
  favoriteCount: number;
};

export type RecipeDetail = Selectable<Recipe> & { user: Pick<Selectable<User>, "id" | "name" | "image"> | null } & {
  recipeImages: Pick<Selectable<RecipeImage>, "id" | "imgSrc" | "index">[];
} & {
  recipeIngredients: Pick<Selectable<RecipeIngredient>, "id" | "name" | "index">[];
} & { recipeCookingProcedures: Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index">[] } & {
  recipeLinks: Pick<Selectable<RecipeLink>, "id" | "url" | "category" | "index">[];
};

export type RecipeCookingProcedureSelectable = Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index">;
export type RecipeIngredientSelectable = Pick<Selectable<RecipeIngredient>, "id" | "name" | "index">;

export type RecipeStepProp = {
  data: RecipeCookingProcedureSelectable[];
} & ComponentProps<"div">;
