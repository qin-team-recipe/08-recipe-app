"use server";

import { revalidatePath } from "next/cache";

import { ServerActionsResponse } from "@/actions/action";
import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";

export async function updateRecipeFavorite(
  recipeId: string,
  userId: string,
  isFavorite: boolean,
): Promise<ServerActionsResponse> {
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
      console.log("isFavorite true");
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

    return {
      success: true,
      status: 200,
      data: { recipeFavorite: { isFavorite } },
    };
  } catch (e) {
    return {
      success: false,
      status: 500,
      message: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  } finally {
    revalidatePath(`/recipe/${recipeId}`);
  }
}
