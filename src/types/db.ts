import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Recipe = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  name: string;
  isPublic: Generated<number>;
};
export type User = {
  id: string;
  name: string;
  user_type: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type DB = {
  Recipe: Recipe;
  users: User;
};
