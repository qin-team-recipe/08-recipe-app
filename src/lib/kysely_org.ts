import { Codegen, KyselyAuth } from "@auth/kysely-adapter";

import { dialect } from "@/lib/kysely-node";
import { DB } from "@/types/db";

export const db = new KyselyAuth<DB, Codegen>({ dialect });
