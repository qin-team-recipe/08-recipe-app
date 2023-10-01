"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/kysely";

export async function addItem(name: string, index: number, listId: string) {
  await db.insertInto("ListIngredient").values({ name, index, listId }).execute();
  revalidatePath("/list");
}

export async function deleteItem(id: string, index: number) {
  const result = await db.selectFrom("ListIngredient").select("listId").where("id", "=", id).executeTakeFirst();
  if (!result) return;
  await db.deleteFrom("ListIngredient").where("id", "=", id).execute();
  const ingredients = await db
    .selectFrom("ListIngredient")
    .select("id")
    .where("index", ">", index)
    .where("listId", "=", result.listId)
    .orderBy("index")
    .execute();
  if (!ingredients.length) {
    revalidatePath("/list");
    return;
  }
  await ingredients.reduce(async (promise, { id }, currentIndex) => {
    await promise;
    await db
      .updateTable("ListIngredient")
      .set({ index: index + currentIndex })
      .where("id", "=", id)
      .execute();
  }, Promise.resolve());
  revalidatePath("/list");
}

async function swap(firstIndex: number, secondIndex: number) {
  const [first, second] = await db
    .selectFrom("List")
    .selectAll()
    .where((eb) => eb("index", "=", firstIndex).or("index", "=", secondIndex))
    .orderBy("index")
    .execute();
  if (!first || !second) return;
  await db.updateTable("List").set({ index: second.index }).where("id", "=", first.id).execute();
  await db.updateTable("List").set({ index: first.index }).where("id", "=", second.id).execute();
}

export async function moveUp(index: number) {
  if (index <= 1) return;
  await swap(index - 1, index);
  revalidatePath("/list");
}

export async function moveDown(index: number) {
  if (!index) return;
  const result = await db
    .selectFrom("List")
    .select(({ fn: { countAll } }) => [countAll<string>().as("listCount")])
    .executeTakeFirst();
  if (!result || (result && index >= Number(result.listCount) - 1)) return;
  await swap(index, index + 1);
  revalidatePath("/list");
}

export async function deleteList(index: number) {
  if (!index) return;
  const result = await db.selectFrom("List").select("id").where("index", ">=", index).orderBy("index").execute();
  if (!result) return;
  const [{ id }, ...rest] = result;
  await db.deleteFrom("ListIngredient").where("listId", "=", id).execute();
  await db.deleteFrom("List").where("id", "=", id).execute();
  await Promise.all(
    rest.map(async ({ id }, currentIndex) => {
      await db
        .updateTable("List")
        .set({ index: index + currentIndex })
        .where("id", "=", id)
        .execute();
    }),
  );
  revalidatePath("/list");
}
