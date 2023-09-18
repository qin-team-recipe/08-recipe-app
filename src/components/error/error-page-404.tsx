"use client";

import { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/button/button";
import { ErrorPageBase } from "@/components/error/error-page-base";

export const ErrorPage404 = ({
  title = "ページが見つかりません",
  description = "トップに戻り別のシェフやレシピを探してください",
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) => {
  return (
    <ErrorPageBase title={title} description={description}>
      {children ? (
        children
      ) : (
        <Link href="/">
          <Button variant="tomato" size="md">
            トップへ戻る
          </Button>
        </Link>
      )}
    </ErrorPageBase>
  );
};
