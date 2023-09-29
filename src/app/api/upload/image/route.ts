import { NextResponse } from "next/server";

import { uploadFile } from "@/lib/actions";

export async function POST(req: Request) {
  const data = await req.formData();
  const timestamp = data.get("timestamp") as string;
  console.log("timestamp", timestamp);
  const file = data.get("file") as File;
  const folder = data.get("folder") as string;
  try {
    const imageSrc = await uploadFile(file, timestamp, folder);
    return NextResponse.json({ imageSrc });
  } catch {
    return NextResponse.json({ msg: "upload failed!" });
  }
}
