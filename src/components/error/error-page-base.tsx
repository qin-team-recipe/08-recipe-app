"use client";

import { PropsWithChildren, ReactElement } from "react";
import Image from "next/image";

export const ErrorPageBase = ({
  title,
  description,
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
}>): ReactElement => {
  return (
    <div className="flex flex-col items-center gap-y-5 pt-5">
      <div className="">
        <Image src={"/images/error.png"} width={200} height={200} alt="" />
      </div>
      <div className="">
        <p className="text-center font-bold">{title}</p>
        <p className="mt-3 text-center text-mauve-12">{description}</p>
      </div>
      <div className="flex gap-x-3">{children}</div>
    </div>
  );
};
