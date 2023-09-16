import { randomUUID } from "crypto";

import InfiniteScrollContent from "@/components/infinite-scroll-content";
import {
  ChefListItemWithRecipeCountType,
  fetchChefsFollowedRecently,
  fetchChefsWithRecipeCount,
  getChefMaxCount,
  getChefMaxCountFollowedRecently,
  getChefsFollowedRecently,
  getChefsWithRecipeCount,
  VerticalChefList,
} from "@/features/chefs";
import { Title } from "@/features/search";

export default async function Page({ searchParams: { q } }: { searchParams: { [key: string]: string | undefined } }) {
  let chefs: ChefListItemWithRecipeCountType[];
  let chefMaxCount: number;
  if (typeof q === "string" && q.length > 0) {
    chefs = await getChefsWithRecipeCount({ query: q });
    chefMaxCount = await getChefMaxCount({ query: q });
  } else {
    chefs = await getChefsFollowedRecently({ query: q });
    chefMaxCount = await getChefMaxCountFollowedRecently({ query: q });
  }

  const loadChefContent = async (contents: any) => {
    "use server";

    return <VerticalChefList chefList={contents} />;
  };

  return (
    <>
      {typeof q === "string" ? (
        <>
          <section key={randomUUID()}>
            <Title>「{q}」で検索</Title>
            {/* なんでSCからCCへ関数が渡せないのか？ */}
            <InfiniteScrollContent
              search={q}
              initialContents={chefs}
              contentMaxCount={chefMaxCount}
              fetchAction={fetchChefsWithRecipeCount}
              loadContentComponent={loadChefContent}
            />
          </section>
        </>
      ) : (
        <>
          <section key={randomUUID()}>
            <Title>話題のレシピ</Title>
            <InfiniteScrollContent
              initialContents={chefs}
              contentMaxCount={chefMaxCount}
              fetchAction={fetchChefsFollowedRecently}
              loadContentComponent={loadChefContent}
            />
          </section>
        </>
      )}
    </>
  );
}
