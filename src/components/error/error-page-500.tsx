"use client";

import { ReactNode } from "react";

import { ErrorPageBase } from "@/components/error/error-page-base";

export const ErrorPage500 = ({
  title = "原因不明のエラーです",
  description = "しばらくして再度やりなおしてください",
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) => {
  return (
    <ErrorPageBase title={title} description={description}>
      {children}
    </ErrorPageBase>
  );
};
