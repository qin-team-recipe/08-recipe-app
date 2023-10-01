import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="bg-mauve-app border-mauve-dim flex items-center justify-center border-b px-4 py-3">
        <h1 className="text-mauve-normal text-xl font-bold leading-6">買い物リスト</h1>
      </header>
      {children}
    </>
  );
}
