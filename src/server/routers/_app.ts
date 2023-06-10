import { z } from "zod";

import { procedure, router } from "../trpc";

export const appRouter = router({
  sayHello: procedure
    .meta({ openapi: { method: "GET", path: "/say-hello" } })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
});

export type AppRouter = typeof appRouter;
