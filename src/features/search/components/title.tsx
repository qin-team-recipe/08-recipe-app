import { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return <h2 className="text-mauve-normal font-bold">{children}</h2>;
}
