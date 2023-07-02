import { Insertable } from "kysely";

import { db } from "@/lib/kysely";
import { Ingredient } from "@/types/db";

export async function seed() {
  await (
    [
      ["グラタン", ["チーズ", "マカロニ", "ホワイトソース", "ブロッコリー"]],
      ["グラタン", ["マカロニ", "ブロッコリー"]],
      ["グラタン", ["キャベツ", "キャベツ", "キャベツ", "キャベツ"]],
    ] as const
  ).reduce(async (promise, [name, ingradients]) => {
    await promise;
    await db.insertInto("List").values({ name }).execute();
    const result = await db.selectFrom("List").select("id").orderBy("createdAt", "desc").executeTakeFirst();
    if (!result) {
      return;
    }
    const ingradientData: Insertable<Ingredient>[] = ingradients.map((name) => ({
      name,
      listId: result.id,
    }));
    await db.insertInto("Ingredient").values(ingradientData).execute();
  }, Promise.resolve());

  const list = await db.selectFrom("List").selectAll().orderBy("createdAt").executeTakeFirst();
  console.log(list);
  if (!list) {
    return;
  }
  const ingredients = await db.selectFrom("Ingredient").selectAll().where("listId", "=", list.id).execute();
  console.table(ingredients);
}
