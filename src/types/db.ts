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
  User: User;
  UserChef: UserChef;
  UserChefLink: UserChefLink;
};
