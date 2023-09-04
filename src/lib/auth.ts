import { Codegen, Database, KyselyAdapter, KyselyAuth } from "@auth/kysely-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { dialect } from "@/lib/kysely";

export const authOptions: AuthOptions = {
  adapter: KyselyAdapter(new KyselyAuth<Database, Codegen>({ dialect })),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};
