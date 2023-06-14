import { ConnectionString } from "connection-string";
import { Kysely, MysqlDialect } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { createPool } from "mysql2";
import { fetch } from "undici";

import { DB } from "@/types/types";

const { hosts, user, password, path } = new ConnectionString(process.env.DATABASE_URL);

export const db = new Kysely<DB>({
  dialect:
    process.env.KYSELEY_DB_DIALECT === "mysql"
      ? new MysqlDialect({
          pool: createPool({
            host: hosts && hosts[0].name,
            user,
            password,
            database: path && path[0],
          }),
        })
      : new PlanetScaleDialect({
          url: process.env.DATABASE_URL,
          fetch,
        }),
});
