"use client";

import Link from "next/link";

import { Button } from "@/components/button/button";
import { ErrorPage500 } from "@/components/error/error-page-500";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <ErrorPage500>
        <>
          <Button variant="tomato" size="md" onClick={() => reset()}>
            もう一度やりなおす
          </Button>
          <Link href="/">
            <Button variant="tomatoOutline" size="md">
              トップへ戻る
            </Button>
          </Link>
        </>
      </ErrorPage500>
    </div>
  );
}
