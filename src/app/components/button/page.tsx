import Link from "next/link";

import { Button } from "@/components/button/button";
import { LonginButton } from "@/components/button/longin-button";

export default function Page() {
  return (
    <main className="grid gap-4 p-4">
      <Link href={"/components"} className={"hover:text-blue-11 hover:underline"}>
        戻る
      </Link>

      <Button variant={"tomato"}>ボタン</Button>
      <Button variant={"tomato-outline"}>ボタン</Button>
      <Button variant={"black-outline"}>ボタン</Button>
      <Button variant={"tomato"} size={"md"}>
        ボタン
      </Button>
      <Button variant={"tomato-outline"} size={"md"}>
        ボタン
      </Button>
      <Button variant={"black-outline"} size={"md"}>
        ボタン
      </Button>
      <Button
        variant={"tomato"}
        size={"md"}
        className={"h-12 max-w-[200px] rounded-full shadow-[2px_6px_6px_0px_rgba(0,0,0,0.50)]"}
      >
        <span className={"font-bold"}>マイレシピ</span>を追加する
      </Button>
      <LonginButton variant={"google"} />
      <LonginButton variant={"apple"} />
    </main>
  );
}
