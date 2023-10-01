import type { ColumnType } from "kysely";

import type { LinkCategory, RecipeStatus, UserType } from "./enums";

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
export type List = {
  id: Generated<string>;
  userId: string;
  name: string;
  createdAt: Generated<Timestamp>;
  index: number;
  originId: string;
};
export type ListIngredient = {
  id: Generated<string>;
  listId: string;
  name: string;
  isChecked: Generated<number>;
  index: number;
};
export type Recipe = {
  id: Generated<string>;
  userId: string;
  name: string;
  description: string;
  servings: number;
  status: Generated<RecipeStatus>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeCookingProcedure = {
  id: Generated<string>;
  recipeId: string;
  name: string;
  remarks: string | null;
  index: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeFavorite = {
  id: Generated<string>;
  recipeId: string;
  userId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeImage = {
  id: Generated<string>;
  recipeId: string;
  imgSrc: string;
  index: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeIngredient = {
  id: Generated<string>;
  recipeId: string;
  name: string;
  remarks: string | null;
  index: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
};
export type RecipeLink = {
  id: Generated<string>;
  recipeId: string;
  url: string;
  category: Generated<LinkCategory>;
  index: number;
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
export type UserFollow = {
  id: Generated<string>;
  followedUserId: string;
  followerUserId: string;
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
  List: List;
  ListIngredient: ListIngredient;
  Recipe: Recipe;
  RecipeCookingProcedure: RecipeCookingProcedure;
  RecipeFavorite: RecipeFavorite;
  RecipeImage: RecipeImage;
  RecipeIngredient: RecipeIngredient;
  RecipeLink: RecipeLink;
  Session: Session;
  User: User;
  UserFollow: UserFollow;
  UserLink: UserLink;
  VerificationToken: VerificationToken;
};
