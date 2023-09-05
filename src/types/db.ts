import type { ColumnType } from "kysely";

import type { LinkCategory, UserType } from "./enums";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
  id: Generated<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};
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
  servings: number;
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
export type Session = {
  id: Generated<string>;
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type User = {
  id: Generated<string>;
  name: string | null;
  email: string | null;
  emailVerified: Timestamp | null;
  image: string | null;
  userType: Generated<UserType>;
  profileText: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type UserLink = {
  id: Generated<string>;
  userId: string;
  category: Generated<LinkCategory>;
  url: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  Ingredient: Ingredient;
  List: List;
  Recipe: Recipe;
  RecipeCookingProcedure: RecipeCookingProcedure;
  RecipeImage: RecipeImage;
  RecipeIngredient: RecipeIngredient;
  RecipeLink: RecipeLink;
  Session: Session;
  User: User;
  UserLink: UserLink;
  VerificationToken: VerificationToken;
};
