"use server";

import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";

export async function updateRecipeCookingProcedure(
  recipeCookingProcedureId: string,
  recipeCookingProcedureName: string,
): Promise<ServerActionsResponse<string>> {
  try {
    await db
      .updateTable("RecipeCookingProcedure")
      .set({
        nameJson: recipeCookingProcedureName,
      })
      .where("id", "=", recipeCookingProcedureId)
      .execute();
    return {
      success: true,
      data: "success",
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  } finally {
  }
}
