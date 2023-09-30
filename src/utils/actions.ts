"use server";

import fs from "fs/promises";
import path from "path";

import { fileTypeFromBlob } from "file-type";

import { IMAGE_DIR, IMAGE_PATH_RELATIVE } from "@/config/constant";
import { LinkCategory } from "@/types/enums";

export async function uploadImageFile(file: File, name: string, saveDir?: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileType = await fileTypeFromBlob(file);

  // TODO: 暫定でローカルに画像を保存してます
  const uploadPath = path.join(
    process.cwd(),
    saveDir ? `${IMAGE_PATH_RELATIVE}${saveDir}` : IMAGE_PATH_RELATIVE,
    `${name}.${fileType?.ext}`,
  );
  await fs.writeFile(uploadPath, buffer);

  return path.join(saveDir ? `/${IMAGE_DIR}${saveDir}` : `/${IMAGE_DIR}`, `${name}.${fileType?.ext}`);
}

export const getCategoryFromUrl = (url: string): keyof typeof LinkCategory => {
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
