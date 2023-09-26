import { randomUUID } from "crypto";

import { Title } from "@/features/search";
import {
  ChefListItemWithRecipeCountType,
  getChefMaxCount,
  getChefsFollowedRecently,
  getChefsWithRecipeCount,
  InfiniteScrollVerticalChefList,
} from "@/features/users";

export default async function Page({ searchParams: { q } }: { searchParams: { [key: string]: string | undefined } }) {
  let chefs: ChefListItemWithRecipeCountType[];
  let chefMaxCount: number;
  if (typeof q === "string" && q.length > 0) {
    chefs = await getChefsWithRecipeCount({ query: q });
    chefMaxCount = await getChefMaxCount({ query: q });
  } else {
    chefs = await getChefsWithRecipeCount({ query: q });
    chefMaxCount = await getChefMaxCount({ query: q });
  }

  return (
    <>
      {typeof q === "string" ? (
        <>
          <section key={randomUUID()}>
            <Title>「{q}」で検索</Title>
            <InfiniteScrollVerticalChefList
              search={q}
              initialContents={chefs}
              contentMaxCount={chefMaxCount}
              fetchAction={getChefsWithRecipeCount}
            />
          </section>
        </>
      ) : (
        <>
          <section key={randomUUID()}>
            <Title>シェフ一覧</Title>
            <InfiniteScrollVerticalChefList
              search={q}
              initialContents={chefs}
              contentMaxCount={chefMaxCount}
              fetchAction={getChefsFollowedRecently}
            />
          </section>
        </>
      )}
    </>
  );
}
