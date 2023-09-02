import { PropsWithChildren } from "react";

import { SearchSection } from "./search-section";

export function SearchLayout({ children }: PropsWithChildren) {
  return (
    <div className="px-4 py-2">
      <SearchSection />
      {children}
    </div>
  );
}
