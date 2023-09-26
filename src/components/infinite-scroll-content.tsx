"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

import LoadingSpinner from "@/components/utils/loading-spinner";

type ContentComponent<T> = (contents: T[]) => ReactElement;
type FetchAction<T> = ({ search, page }: { search?: string; page: number }) => Promise<T[]>;

export default function InfiniteScrollContent<T>({
  search,
  initialContents,
  contentMaxCount,
  fetchAction,
  contentComponent,
}: {
  search?: string | undefined;
  initialContents: T[];
  contentMaxCount: number;
  fetchAction: FetchAction<T>;
  contentComponent: ContentComponent<T>;
}) {
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [contents, setContents] = useState<T[]>(initialContents);

  const loadMoreContents = useCallback(async () => {
    const next = page + 1;
    if (fetchAction) {
      const contents = await fetchAction({
        search,
        page: next,
      });
      if (contents?.length) {
        setPage(next);
        setContents((prev: T[] | undefined) => [...(prev?.length ? prev : []), ...contents]);
      }
    }
  }, [search, page]);

  useEffect(() => {
    (async () => {
      if (contents && inView) {
        await loadMoreContents();
      }
    })();
  }, [inView]);

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
      {contents && contentComponent && <div className="px-4 pt-2">{contentComponent(contents)}</div>}

      {/* loading spinner */}
      {contents && contents.length < contentMaxCount && (
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
