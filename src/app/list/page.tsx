import { getServerSession } from "next-auth";

import { Login } from "@/components/login";
import { List } from "@/features/list";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return <Login imgSrc="/images/list-login.png" />;
  const {
    user: { id },
  } = session;
  const lists = await (async () => {
    const lists = await db
      .selectFrom("List")
      .select(["id", "name", "index", "originId"])
      .where("userId", "=", id)
      .orderBy("index asc")
      .execute();
    if (lists.length) {
      return lists;
    }
    // 初めてログインした場合など、じぶんメモを含めて買い物リストが0件の場合、空のじぶんメモを生成する
    await db.insertInto("List").values({ name: "じぶんメモ", userId: id, index: 0, originId: id }).execute();
    return await db
      .selectFrom("List")
      .select(["id", "name", "index", "originId"])
      .where("userId", "=", id)
      .orderBy("index asc")
      .execute();
  })();

  return (
    <main className="bg-mauve-app flex flex-col gap-12 pt-5">
      {await Promise.all(
        lists.map(async ({ id, name, index }) => {
          const ingredients = await db
            .selectFrom("ListIngredient")
            .selectAll()
            .where("listId", "=", id)
            .orderBy("index")
            .execute();
          return <List key={id} id={id} name={name} ingredients={ingredients} index={index} />;
        }),
      )}
    </main>
  );
}
