"use server";

import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";

export async function deleteUser(userId: string): Promise<ServerActionsResponse<string>> {
  try {
    await db
      .updateTable("User")
      .set({
        deletedAt: new Date(),
      })
      .where("id", "=", userId)
      .executeTakeFirst();
    return {
      success: true,
      data: userId,
      message: "User deleted",
    };
  } catch (error) {
    return {
      success: false,
      message: "failed User deleted",
    };
  }
}
