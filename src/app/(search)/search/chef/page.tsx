import { randomUUID } from "crypto";

import { Title } from "@/features/search";
import { getChefMaxCount, getChefsWithRecipeCount, InfiniteScrollVerticalChefList } from "@/features/users";

export default async function Page({ searchParams: { q } }: { searchParams: { [key: string]: string | undefined } }) {
  const chefs = await getChefsWithRecipeCount({ query: q });
  const chefMaxCount = await getChefMaxCount({ query: q });

  return (
    <>
      {typeof q === "string" && q.length > 0 ? (
        <section key={randomUUID()}>
          <Title>「{q}」で検索</Title>
          <InfiniteScrollVerticalChefList
            search={q}
            initialContents={chefs}
            contentMaxCount={chefMaxCount}
            fetchAction={getChefsWithRecipeCount}
          />
        </section>
      ) : (
        <section key={randomUUID()}>
          <Title>シェフ一覧</Title>
          <InfiniteScrollVerticalChefList
            search={q}
            initialContents={chefs}
            contentMaxCount={chefMaxCount}
            fetchAction={getChefsWithRecipeCount}
          />
        </section>
      )}
    </>
  );
}
