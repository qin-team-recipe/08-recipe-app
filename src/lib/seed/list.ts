import { db } from "@/lib/kysely";

export async function seed() {
  await db
    .insertInto("List")
    .values([{ name: "foo" }, { name: "bar" }, { name: "baz" }])
    .execute();
  const listList = await db.selectFrom("List").selectAll().execute();
  console.log(listList);
}
