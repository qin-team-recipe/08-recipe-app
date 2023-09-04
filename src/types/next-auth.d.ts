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
