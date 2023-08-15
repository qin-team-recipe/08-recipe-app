import Link from "next/link";

import { HiArrowLeft } from "react-icons/hi2";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full">
      <div className="flex h-12 items-center gap-x-4 border-b px-4 py-3">
        {/* TODO: リンクの差し替え */}
        <Link href={"/"}>
          <HiArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold leading-6 text-[#020010]">設定</h1>
      </div>
      {children}
    </main>
  );
}
