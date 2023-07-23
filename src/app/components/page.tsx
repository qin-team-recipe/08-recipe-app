import Link from "next/link";

import { Button } from "@/components/button/button";
import { LonginButton } from "@/components/button/longin-button";

export default function Page() {
  return (
    <main className="grid gap-4 p-4">
      <Link href={"/components/button"} className={"hover:text-blue-11 hover:underline"}>
        Buttonコンポート
      </Link>
      <Link href={"/components/tab/1"} className={"hover:text-blue-11 hover:underline"}>
        Tabコンポート
      </Link>
    </main>
  );
}
