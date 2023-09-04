import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ErrorFormMessage = {
  className?: string;
  children: ReactNode;
};

export function ErrorFormMessage({ children, className }: ErrorFormMessage) {
  if (children) {
    return (
      <div role="alert" className={cn("mt-1 space-y-0 px-4 pt-1 text-sm font-semibold text-tomato-9", className)}>
        <span>{children}</span>
      </div>
    );
  } else {
    return <p role="alert"></p>;
  }
}
