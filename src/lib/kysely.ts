import { Codegen, KyselyAuth } from "@auth/kysely-adapter";
import { LogEvent } from "kysely";

import { dialect } from "@/lib/kysely-node";
import { DB } from "@/types/db";

const kyselyConfig = {
  dialect,
  ...(process.env.NODE_ENV === "development" && {
    log: (event: LogEvent) => {
      if (event.level == "query") {
        const q = event.query;
        const time = Math.round(event.queryDurationMillis * 100) / 100;
        console.log(`\u001b[32mkysely:sql\u001b[0m [${q.sql}] parameters: [${q.parameters}] time: ${time}`);
      }
    },
  }),
};

export const db = new KyselyAuth<DB, Codegen>(kyselyConfig);
