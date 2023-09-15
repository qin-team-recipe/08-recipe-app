"use client";

import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

import LoadingSpinner from "@/components/utils/loading-spinner";

import { RecipeListItemType } from "../../types";
import { VerticalRecipeList } from "./vertical-recipe-list";

export function RecipeListInfiniteScroll({
  search,
  initialContents,
  contentMaxCount,
  fetchAction,
}: {
  search: string | undefined;
  initialContents: RecipeListItemType[]; //DBのいずれかとしたい
  contentMaxCount: number;
  fetchAction: Function;
}) {
  const [contents, setContents] = useState<RecipeListItemType[]>(initialContents);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  async function loadMoreContents() {
    const next = page + 1;
    const contents: RecipeListItemType[] = await fetchAction({ search, page: next });
    if (contents?.length) {
      setPage(next);
      setContents((prev: RecipeListItemType[] | undefined) => [...(prev?.length ? prev : []), ...contents]);
    }
  }

  // TODO: wrap loadMoreMovies in useCallback and pass it to the dep array
  useEffect(() => {
    if (inView) {
      loadMoreContents();
    }
  }, [inView]);

  return (
    <>
      {contents && (
        <div className="px-4 pt-2">
          <VerticalRecipeList recipeList={contents} />
        </div>
      )}

      {contents.length < contentMaxCount && (
        <div
          ref={ref}
          className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
        >
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
