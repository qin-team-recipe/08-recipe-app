import { ComponentProps, ReactElement } from "react";

import { Selectable } from "kysely";

import { DB, Recipe, RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink, User } from "@/types/db";

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

export type RecipeDetailTabProp = {
  name: string;
  contents: Partial<DB[keyof DB]>[];
  // contents: any;
  getContentComponent: (contents: Partial<DB[keyof DB]>[]) => ReactElement;
};

export type RecipeCookingProcedureSelectable = Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index">;
export type RecipeIngredientSelectable = Pick<Selectable<RecipeIngredient>, "id" | "name" | "index">;

export type RecipeStepProp = {
  data: RecipeCookingProcedureSelectable[];
} & ComponentProps<"div">;

export type ServerActionsResponse =
  | {
      success: true;
      status: 200;
      data: any;
      message?: string;
    }
  | {
      success: false;
      status: number;
      message: string;
    };
