import { TbChevronDown, TbChevronUp, TbDotsVertical, TbPlus, TbShoppingCartX, TbToolsKitchen } from "react-icons/tb";

import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ModeToggle,
  MyList,
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
      <main className="bg-mauve-app flex flex-col gap-12 pt-5">
        <MyList />
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
                  <div className="flex items-center py-1 pr-2">
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
