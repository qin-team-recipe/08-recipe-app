import type { ColumnType } from "kysely";

import type { UserChefLinkCategory, UserType } from "./enums";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Recipe = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  is_public: Generated<number>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type RecipeIngredient = {
  id: string;
  recipe_id: string;
  remarks: string;
  is_public: Generated<number>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type User = {
  id: string;
  name: string;
  userType: Generated<UserType>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type UserChef = {
  id: Generated<number>;
  user_id: string;
  profile_img_src: string;
  profile_text: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
};
export type UserChefLink = {
  id: Generated<number>;
  user_chef_id: number;
  category: Generated<UserChefLinkCategory>;
  url: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type DB = {
  recipes: Recipe;
  recipe_ingredients: RecipeIngredient;
  users: User;
  user_chefs: UserChef;
  user_chef_links: UserChefLink;
};
