"use server";

import { revalidatePath } from "next/cache";

import { Selectable } from "kysely";

import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";
import { RecipeFavorite } from "@/types/db";

export async function getFavoriteCountByRecipeId(recipeId: string) {
  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "=", recipeId)
    .where("deletedAt", "is", null)
    .execute();

  return recipeFavorites.length;
}

export async function getIsFavoriteByUserId(recipeId: string, userId: string) {
  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId", "userId"])
    .where("recipeId", "=", recipeId)
    .where("userId", "=", userId)
    .where("deletedAt", "is", null)
    .execute();

  return recipeFavorites.length > 0;
}

export async function updateRecipeFavorite(
  recipeId: string,
  userId: string,
  isFavorite: boolean,
): Promise<ServerActionsResponse<{ recipeFavorite: { isFavorite: boolean } }>> {
  try {
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
        await db
          .insertInto("RecipeFavorite")
          .values({
            recipeId: recipeId,
            userId: userId,
          })
          .executeTakeFirst();
      }
    }

    return {
      success: true,
      data: { recipeFavorite: { isFavorite } },
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  } finally {
    revalidatePath(`/recipe/${recipeId}`);
  }
}
