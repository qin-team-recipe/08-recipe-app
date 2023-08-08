import type { ColumnType } from "kysely";

import type { LinkCategory, UserType } from "./enums";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Ingredient = {
  id: Generated<string>;
  name: string;
  isChecked: Generated<number>;
  index: number;
  listId: string;
};
export type List = {
  id: Generated<string>;
  name: string;
  createdAt: Generated<Timestamp>;
  index: number;
  recipeId: string | null;
};
export type Recipe = {
  id: Generated<string>;
  userId: string;
  name: string;
  description: string;
  isPublic: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeCookingProcedure = {
  id: Generated<string>;
  recipeId: string;
  name: string;
  remarks: string | null;
  sort: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeImage = {
  id: Generated<string>;
  recipeId: string;
  imgSrc: string;
  sort: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeIngredient = {
  id: Generated<string>;
  recipeId: string;
  name: string;
  remarks: string | null;
  sort: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeLink = {
  id: Generated<string>;
  recipeId: string;
  url: string;
  category: Generated<LinkCategory>;
  sort: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type User = {
  id: Generated<string>;
  name: string;
  userType: Generated<UserType>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type UserChef = {
  id: Generated<string>;
  userId: string;
  profileImgSrc: string;
  profileText: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type UserChefLink = {
  id: Generated<string>;
  userChefId: string;
  category: Generated<LinkCategory>;
  url: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type DB = {
  Ingredient: Ingredient;
  List: List;
  Recipe: Recipe;
  RecipeCookingProcedure: RecipeCookingProcedure;
  RecipeImage: RecipeImage;
  RecipeIngredient: RecipeIngredient;
  RecipeLink: RecipeLink;
  User: User;
  UserChef: UserChef;
  UserChefLink: UserChefLink;
};
