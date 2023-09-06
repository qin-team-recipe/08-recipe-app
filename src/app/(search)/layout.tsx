import { PropsWithChildren } from "react";

import { SearchSection } from "@/features/search";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <SearchSection />
      <section className="px-4 py-5">{children}</section>
    </main>
  );
}
