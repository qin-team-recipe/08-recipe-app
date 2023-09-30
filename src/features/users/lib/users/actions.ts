"use server";

import { Insertable } from "kysely";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";
import { UserLink } from "@/types/db";
import { getCategoryFromUrl, uploadImageFile } from "@/utils/actions";

import { UserProfileFormValues } from "../../types/users";

export async function updateProfile(data: Omit<UserProfileFormValues, "profileImg">, formImage: FormData | null) {
  const session: Session | null = await getServerSession(authOptions);

  const user = session?.user;
  const userId = user?.id;

  if (userId === undefined) {
    return;
  }

  const file: File | null = formImage?.get("image") as unknown as File;
  const uploadedPath = file !== null ? await uploadImageFile(file, `${userId}_${Date.now()}`) : null;

  await updateProfileTable(userId, data.name, uploadedPath, data.profileText, data.urls);
}

async function updateProfileTable(
  userId: string,
  name: string,
  profileImg: string | null,
  profileText: string | undefined,
  links: { value?: string | undefined }[],
) {
  const profileData = {
    name: name,
    image: profileImg,
    profileText: profileText === undefined ? null : profileText,
  };

  const urls: Insertable<UserLink>[] = links
    .filter((link) => link.value)
    .map((link) => ({
      userId: userId,
      category: getCategoryFromUrl(link.value!),
      url: link.value!,
    }));

  await db.transaction().execute(async () => {
    await db.updateTable("User").set(profileData).where("id", "=", userId).execute();
    await db.deleteFrom("UserLink").where("userId", "=", userId).executeTakeFirstOrThrow();
    if (urls.length > 0) {
      await db.insertInto("UserLink").values(urls).execute();
    }
  });
}

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
