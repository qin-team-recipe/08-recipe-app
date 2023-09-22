"use server";

import { revalidatePath } from "next/cache";

import { Updateable } from "kysely";

import { ServerActionsResult } from "@/actions/action";
import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";
import { Recipe } from "@/types/db";

export async function update(recipeId: string, updateValues: Updateable<Recipe>): Promise<ServerActionsResult> {
  try {
    const result = await db.updateTable("Recipe").set(updateValues).where("id", "=", recipeId).executeTakeFirst();
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
