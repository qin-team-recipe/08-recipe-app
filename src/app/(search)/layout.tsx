import { PropsWithChildren } from "react";

import { SearchSection } from "@/features/search";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <SearchSection />
      {children}
    </>
  );
}
