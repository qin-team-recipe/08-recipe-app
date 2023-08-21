import { Database, KyselyAdapter } from "@auth/kysely-adapter";
import { Kysely } from "kysely";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/lib/kysely";

export const authOptions: AuthOptions = {
  // HACK: 型エラーが発生するため、暫定的に対応（ライブラリ側の不具合の可能性あり）
  adapter: KyselyAdapter(db as unknown as Kysely<Database>),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
