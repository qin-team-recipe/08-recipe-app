import { TbChevronDown, TbChevronUp, TbDotsVertical, TbPlus, TbShoppingCartX, TbToolsKitchen } from "react-icons/tb";

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ModeToggle,
  ThemeProvider,
} from "@/features/list";

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <header className="bg-mauve-app border-mauve-dim flex items-center justify-between border-b px-4 py-3">
        <div className="h-6 w-6" />
        <h1 className="text-mauve-normal font-bold leading-6">買い物リスト</h1>
        <ModeToggle />
      </header>
      <main className="bg-mauve-app flex h-screen flex-col gap-5 pt-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-end justify-between px-4">
            <h2 className="text-mauve-normal text-xl font-bold">じぶんメモ</h2>
            <Button variant="ghost" size="icon" className="-mb-0.5 -mr-0.5">
              <TbPlus className="text-mauve-dim" size={20} />
            </Button>
          </div>
          <ul className="border-mauve-dim divide-mauve-dim divide-y border-y">
            {["チーズ", "マカロニ", "バジル"].map((name, index) => (
              <li key={index} className="flex items-center justify-between gap-x-2 px-4 py-2">
                <div className="flex h-8 w-8 items-center">
                  <Checkbox />
                </div>
                <label className="text-mauve-normal mr-auto">{name}</label>
                <span className="text-tomato-dim text-sm">削除</span>
              </li>
            ))}
          </ul>
        </div>
        {(
          [
            ["グラタン", ["チーズ", "マカロニ", "ホワイトソース", "ブロッコリー"]],
            ["グラタン", ["マカロニ", "ブロッコリー"]],
            ["グラタン", ["キャベツ", "キャベツ", "キャベツ", "キャベツ"]],
          ] as const
        ).map(([name, list], index) => (
          <div key={index} className="flex flex-col gap-y-3">
            <div className="flex items-end justify-between px-4">
              <h2 className="text-mauve-normal text-xl font-bold">{name}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger className="-mb-0.5 -mr-0.5">
                  <TbDotsVertical className="text-mauve-dim" size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {(
                    [
                      [TbToolsKitchen, "レシピ詳細を見る"],
                      [TbChevronUp, "上に移動する"],
                      [TbChevronDown, "下に移動する"],
                      [TbPlus, "買うものを追加する"],
                    ] as const
                  ).map(([icon, text], index) => {
                    return (
                      <DropdownMenuItem key={index} className="gap-x-1">
                        {((Icon) => (
                          <Icon size={18} className="text-mauve-normal" />
                        ))(icon)}
                        {text}
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuItem className="text-tomato-dim gap-1  focus:text-tomato-dim">
                    <TbShoppingCartX className="text-tomato-dim" size={18} />
                    リストから削除する
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ul className="border-mauve-dim divide-mauve-dim divide-y border-y">
              {list.map((name, index) => (
                <li key={index} className="flex items-center justify-between gap-x-2 px-4 py-2">
                  <div className="flex h-8 w-8 items-center">
                    <Checkbox />
                  </div>
                  <label className="text-mauve-normal mr-auto">{name}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </ThemeProvider>
  );
}
