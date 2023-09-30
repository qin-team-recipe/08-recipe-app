"use server";

import fs from "fs/promises";
import path from "path";

import { fileTypeFromBlob } from "file-type";
import { Insertable } from "kysely";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { FormValues } from "@/app/settings/profile/schema";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { UserLink } from "@/types/db";
import { LinkCategory } from "@/types/enums";

export async function updateProfile(data: Omit<FormValues, "profileImg">, formImage: FormData | null) {
  const session: Session | null = await getServerSession(authOptions);

  const user = session?.user;
  const userId = user?.id;

  if (userId === undefined) {
    return;
  }

  const file: File | null = formImage?.get("image") as unknown as File;
  if (file !== null) {
    uploadImageFile(file, userId);
  }
  const uploadedPath = file !== null ? await uploadImageFile(file, userId) : null;

  await updateProfileTable(userId, data.name, uploadedPath, data.profileText, data.urls);
}

async function uploadImageFile(file: File, name: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileType = await fileTypeFromBlob(file);

  // TODO: 暫定でローカルに画像を保存してます
  const uploadPath = path.join(process.cwd(), "public/images/chefs/", `${name}.${fileType?.ext}`);
  await fs.writeFile(uploadPath, buffer);

  return path.join("/images/chefs/", `${name}.${fileType?.ext}`);
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
    await db.insertInto("UserLink").values(urls).execute();
  });
}

const getCategoryFromUrl = (url: string): keyof typeof LinkCategory => {
  if (url.includes(LinkCategory.twitter)) {
    return LinkCategory.twitter;
  }
  if (url.includes(LinkCategory.facebook)) {
    return LinkCategory.facebook;
  }
  if (url.includes(LinkCategory.instagram)) {
    return LinkCategory.instagram;
  }
  if (url.includes(LinkCategory.tiktok)) {
    return LinkCategory.tiktok;
  }
  if (url.includes(LinkCategory.youtube)) {
    return LinkCategory.youtube;
  }
  return LinkCategory.other;
};
