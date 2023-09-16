"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

import LoadingSpinner from "@/components/utils/loading-spinner";
import { RecipeListItemType } from "@/features/recipes";

type ScrollContentType = RecipeListItemType | any;

type loadContentComponent = (contents: ScrollContentType[]) => Promise<JSX.Element>;

export default function InfiniteScrollContent({
  search,
  initialContents,
  contentMaxCount,
  fetchAction,
  loadContentComponent,
}: {
  search?: string | undefined;
  initialContents: ScrollContentType[]; //DBのいずれかとしたい
  contentMaxCount: number;
  fetchAction: Function;
  loadContentComponent: loadContentComponent;
}) {
  const [contents, setContents] = useState<ScrollContentType[]>(initialContents);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [contentElement, setContentElement] = useState<ReactNode | null>(null);

  const loadMoreContents = useCallback(async () => {
    const next = page + 1;
    const contents: ScrollContentType[] = await fetchAction({ search, page: next });
    if (contents?.length) {
      setPage(next);
      setContents((prev: ScrollContentType[] | undefined) => [...(prev?.length ? prev : []), ...contents]);
    }
  }, [fetchAction, search, page]);

  useEffect(() => {
    (async () => {
      if (contentElement && inView) {
        await loadMoreContents();
      }
    })();
  }, [inView]);

  // TODO: wrap loadMoreMovies in useCallback and pass it to the dep array
  useEffect(() => {
    (async () => {
      setContentElement(await loadContentComponent(contents));
    })();
  }, [contents]);

  return (
    <>
      {contents.length === 0 && (
        <div className="px-4 pt-2">
          <span>
            条件に当てはまるコンテンツは見つかりませんでした。
            <br />
            検索条件を変えて検索してみてください。
          </span>
        </div>
      )}
      {contents && contentElement && <div className="px-4 pt-2">{contentElement}</div>}

      {/* loading spinner */}
      {contents && contentElement && contents.length < contentMaxCount && (
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