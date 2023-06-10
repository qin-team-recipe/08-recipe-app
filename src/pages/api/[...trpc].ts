import { NextApiRequest, NextApiResponse } from "next";

import { appRouter } from "@/server/routers/_app";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-openapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  return createOpenApiNextHandler({
    router: appRouter,
    createContext: () => ({}),
  })(req, res);
};

export default handler;
