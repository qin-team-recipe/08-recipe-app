import { Insertable } from "kysely";

import { db } from "@/lib/kysely";
import { Ingredient } from "@/types/db";

export async function seed() {
  await (
    [
      ["じぶんメモ", ["チーズ", "マカロニ", "バジル"]],
      ["グラタン", ["チーズ", "マカロニ", "ホワイトソース", "ブロッコリー"]],
      ["グラタン", ["マカロニ", "ブロッコリー"]],
      ["グラタン", ["キャベツ", "キャベツ", "キャベツ", "キャベツ"]],
    ] as const
  ).reduce(async (promise, [name, ingradients], index) => {
    await promise;
    if (index === 0) {
      await db.insertInto("List").values({ name, index }).execute();
    } else {
      await db.insertInto("List").values({ name, index, recipeId: name }).execute();
    }
    const result = await db.selectFrom("List").select("id").orderBy("createdAt", "desc").executeTakeFirst();
    if (!result) {
      return;
    }
    const ingradientData: Insertable<Ingredient>[] = ingradients.map((name, index) => ({
      name,
      listId: result.id,
      index,
    }));
    await db.insertInto("Ingredient").values(ingradientData).execute();
  }, Promise.resolve());

  const list = await db.selectFrom("List").selectAll().orderBy("createdAt").execute();
  console.table(list);
  if (!list) {
    return;
  }
  const ingredients = await db.selectFrom("Ingredient").selectAll().execute();
  console.table(ingredients);
}
