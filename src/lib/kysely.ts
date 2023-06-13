import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { fetch } from "undici";

import { DB } from "@/types/types";

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
    fetch,
  }),
});
