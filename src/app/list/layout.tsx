import { PropsWithChildren } from "react";

import { ModeToggle, ThemeProvider } from "@/features/list";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <header className="bg-mauve-app border-mauve-dim flex items-center justify-between border-b px-4 py-3">
        <div className="h-6 w-6" />
        <h1 className="text-mauve-normal font-bold leading-6">買い物リスト</h1>
        <ModeToggle />
      </header>
      {children}
    </ThemeProvider>
  );
}
