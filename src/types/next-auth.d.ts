import NextAuth from "next-auth";

declare module "next-auth/adapters" {
  type JsonObject = {
    [Key in string]?: JsonValue;
  };
  type JsonArray = JsonValue[];
  type JsonPrimitive = string | number | boolean | null;
  type JsonValue = JsonPrimitive | JsonObject | JsonArray;
  interface AdapterAccount {
    type: "oauth" | "email" | "oidc";
    [key: string]: JsonValue | undefined;
  }
}

//参考
//https://github.com/nextauthjs/next-auth/issues/7658#issuecomment-1565239992
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string };
  }
}
