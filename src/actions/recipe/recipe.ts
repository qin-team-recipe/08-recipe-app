"use server";

import { revalidatePath } from "next/cache";

import { ServerActionsResult } from "@/actions/action";
import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";

export async function deleteRecipe(recipeId: string): Promise<ServerActionsResult> {
  try {
    const result = await db
      .updateTable("Recipe")
      .set({ deletedAt: new Date() })
      .where("id", "=", recipeId)
      .executeTakeFirst();
    console.log("result", result);
    console.log('result.numUpdatedRows === "1n"', result.numUpdatedRows === BigInt("1"));
    if (result.numUpdatedRows !== BigInt("1")) {
      throw new Error(ERROR_MESSAGE_UNKOWN_ERROR);
    }
    const updatedRecipe = await db.selectFrom("Recipe").selectAll().where("id", "=", recipeId).executeTakeFirst();

    return {
      success: true,
      status: 200,
      data: { recipe: updatedRecipe },
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
