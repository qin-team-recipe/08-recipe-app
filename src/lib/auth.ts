import { Codegen, Database, KyselyAdapter, KyselyAuth } from "@auth/kysely-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { dialect } from "@/lib/kysely-node";

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
  //下記参考にセッション情報にUserテーブルのidを含める
  //https://github.com/nextauthjs/next-auth/issues/7658#issuecomment-1565239992
  callbacks: {
    async session({ session, token }) {
      session.user && (session.user.id = token.sub!);
      return session;
    },
  },
};
