import Link from "next/link";

import { AiOutlineGoogle } from "react-icons/ai";
import { PiAppleLogoBold } from "react-icons/pi";

import { Button } from "@/components/button/button";

export default function Page() {
  return (
    <main className="grid gap-4 p-4">
      <Link href={"/components"} className={"hover:text-blue-11 hover:underline"}>
        戻る
      </Link>

      <Button>ボタン</Button>
      <Button variant={"tomatoOutline"}>ボタン</Button>
      <Button variant={"blackOutline"}>ボタン</Button>
      <Button size={"md"}>ボタン</Button>
      <Button variant={"tomatoOutline"} size={"md"}>
        ボタン
      </Button>
      <Button variant={"blackOutline"} size={"md"}>
        ボタン
      </Button>
      <Button size={"md"} className={"h-12 max-w-[200px] rounded-full shadow-[2px_6px_6px_0px_rgba(0,0,0,0.50)]"}>
        <span className={"font-bold"}>マイレシピ</span>を追加する
      </Button>
      <Button variant={"blue"} size={"md"}>
        <AiOutlineGoogle className={"mr-1 text-base"} />
        <span className={"text-sm font-bold"}>Googleでログイン</span>
      </Button>
      <Button variant={"black"} size={"md"}>
        <PiAppleLogoBold className={"mr-1 text-base"} />
        <span className={"text-sm font-bold"}>Appleでログイン</span>
      </Button>
    </main>
  );
}
