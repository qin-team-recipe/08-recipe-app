"use server";

import { headers } from "next/headers";

import { AppRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";

import { getUrl } from "./shared";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: getUrl(),
          headers() {
            return {
              ...Object.fromEntries(headers()),
              "x-trpc-source": "rsc",
            };
          },
        }),
      ],
    };
  },
});
