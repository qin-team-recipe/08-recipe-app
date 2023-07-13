import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Ingredient = {
  id: Generated<string>;
  name: string;
  isChecked: Generated<number>;
  listId: string;
};
export type List = {
  id: Generated<string>;
  name: string;
  createdAt: Generated<Timestamp>;
  index: number;
  recipeId: string | null;
};
export type DB = {
  Ingredient: Ingredient;
  List: List;
};
