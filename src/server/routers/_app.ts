import { z } from "zod";

import { procedure, router } from "../trpc";

export const appRouter = router({
  sayHello: procedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
});

export type AppRouter = typeof appRouter;
