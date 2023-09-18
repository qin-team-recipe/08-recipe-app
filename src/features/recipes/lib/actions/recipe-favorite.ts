"use server";

import { db } from "@/lib/kysely";

export async function setRecipeFavorite(recipeId: string, userId: string, isFavorite: boolean) {
  await db
    .updateTable("RecipeFavorite")
    .set({
      deletedAt: new Date(),
    })
    .where("recipeId", "=", recipeId)
    .where("userId", "=", userId)
    .execute();
  if (isFavorite) {
    const recipeFavorite = await db
      .selectFrom("RecipeFavorite")
      .select(["id"])
      .where("recipeId", "=", recipeId)
      .where("userId", "=", userId)
      .orderBy("updatedAt", "desc")
      .executeTakeFirst();

    if (recipeFavorite) {
      await db
        .updateTable("RecipeFavorite")
        .set({
          updatedAt: new Date(),
          deletedAt: null,
        })
        .where("id", "=", recipeFavorite.id)
        .execute();
    } else {
      db.insertInto("RecipeFavorite")
        .values({
          recipeId: recipeId,
          userId: userId,
        })
        .executeTakeFirst();
    }
  }
}
