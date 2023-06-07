"use client";

import { AppRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";
import {
  experimental_createActionHook,
  experimental_createTRPCNextAppDirClient,
  experimental_serverActionLink,
} from "@trpc/next/app-dir/client";

import { getUrl } from "./shared";

export const api = experimental_createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: getUrl(),
          headers() {
            return {
              "x-trpc-source": "client",
            };
          },
        }),
      ],
    };
  },
});

export const useAction = experimental_createActionHook({
  links: [experimental_serverActionLink()],
});
