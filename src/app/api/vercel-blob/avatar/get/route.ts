import { head } from "@vercel/blob";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get("url");
  const blobDetails = await head(blobUrl);

  return Response.json(blobDetails);
}
