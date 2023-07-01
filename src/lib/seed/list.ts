import { db } from "@/lib/kysely";

export async function seed() {
  const listlist = await db
    .insertInto("List")
    .values([{ name: "foo" }, { name: "bar" }, { name: "baz" }])
    .execute();
  console.log(listlist);
}
