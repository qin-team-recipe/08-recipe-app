"use client";

import { useEffect, useState } from "react";

import { Selectable } from "kysely";
import { useInView } from "react-intersection-observer";

import LoadingSpinner from "@/components/utils/loading-spinner";
import { DB } from "@/types/db";

type typeAnyDB = DB[keyof DB];

export default function InfiniteScrollContent({
  search,
  initialContents,
  fetchAction,
  childrenWithData,
}: {
  search: string | undefined;
  initialContents: Selectable<typeAnyDB>[]; //DBのいずれかとしたい
  fetchAction: Function;
  childrenWithData: (parentData: any) => React.ReactNode;
}) {
  const [contents, setContents] = useState<Selectable<typeAnyDB>[]>(initialContents);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  async function loadMoreContents() {
    const next = page + 1;
    const contents: typeAnyDB[] = await fetchAction({ search, page: next });
    if (contents?.length) {
      setPage(next);
      setContents((prev: Selectable<typeAnyDB>[] | undefined) => [...(prev?.length ? prev : []), ...movies]);
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
      {contents?.map((content: Selectable<typeAnyDB>) => {
        console.log("content", content);
        {
          childrenWithData(content);
        }
      })}

      {/* loading spinner */}
      <div
        ref={ref}
        className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
      >
        <LoadingSpinner />
      </div>
    </>
  );
}
