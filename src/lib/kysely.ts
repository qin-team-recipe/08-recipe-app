import { createPool } from 'mysql2'
import { Kysely, MysqlDialect } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { fetch } from "undici";
import { DB } from "@/types/types";

let dialect = null;
if (process.env.KYSELEY_DB_DIALECT === 'mysql') {
  dialect = new MysqlDialect({
    pool: createPool({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    })
  });
}
if (process.env.KYSELEY_DB_DIALECT === 'planetscale') {
  dialect = new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
    fetch,
  });
}

export const db = new Kysely<DB>({
  dialect
});
