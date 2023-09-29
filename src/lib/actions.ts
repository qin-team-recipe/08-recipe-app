"use server";

import fs from "fs/promises";
import path from "path";

import { fileTypeFromBlob } from "file-type";

import { IMAGE_ROOT_PATH } from "@/config/constant";

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  console.log("timestamp", timestamp);
  return { timestamp };
}

export async function uploadFile(file: File, fileName: string, folder?: string) {
  if (file && file instanceof Blob) {
    const fileTypeResult = await fileTypeFromBlob(file);
    if (!fileTypeResult) {
      throw new Error("file type cannot be detected");
    }
    if (fileTypeResult) {
      await file.arrayBuffer().then((data) => {
        console.log("data arrayBuffer", data);
        const buffer = Buffer.from(data);
        const uploadDir = path.join(
          process.cwd(),
          folder ? `public/images/${folder}` : "public/images/recipes",
          `/${fileName}.${fileTypeResult.ext}`,
        );
        fs.writeFile(uploadDir, buffer);
      });
      return folder
        ? `${IMAGE_ROOT_PATH}/${folder}/${fileName}.${fileTypeResult.ext}`
        : `${IMAGE_ROOT_PATH}/${fileName}.${fileTypeResult.ext}`;
    }
  }
}
