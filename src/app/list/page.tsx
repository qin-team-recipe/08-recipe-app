import {
  TbChevronDown,
  TbChevronUp,
  TbCircleCheckFilled,
  TbDotsVertical,
  TbPlus,
  TbShoppingCartX,
  TbToolsKitchen,
} from "react-icons/tb";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/list";
import { ModeToggle } from "@/features/list/components/mode-toggle";
import { ThemeProvider } from "@/features/list/components/theme-provider";

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <header className="bg-mauve-app flex items-center justify-between border-b border-mauve-dim px-4 py-3">
        <div className="w-6 h-6" />
        <h1 className="text-mauve-normal font-bold leading-6">買い物リスト</h1>
        <ModeToggle />
      </header>
      <main className="bg-mauve-app flex h-screen flex-col gap-5 pt-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-end justify-between px-4">
            <h2 className="text-mauve-normal text-xl font-bold">じぶんメモ</h2>
            <button className="p-1">
              <TbPlus className="text-mauve-dim" size={20} />
            </button>
          </div>
          <ul className="divide-y divide-mauve-dim border-y border-mauve-dim">
            {["チーズ", "マカロニ", "バジル"].map((name, index) => (
              <div key={index} className="flex items-center justify-between gap-x-2 px-4 py-2">
                <div className="pr-2 py-1">
                  <TbCircleCheckFilled className="text-mauve-8" size={24} />
                </div>
                <li className="text-mauve-normal mr-auto">{name}</li>
                <span className="text-tomato-dim text-sm">削除</span>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-end justify-between px-4">
            <h2 className="text-mauve-normal text-xl font-bold">グラタン</h2>
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-auto block">
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
                <DropdownMenuItem className="gap-1 text-tomato-dim focus:text-tomato-dim">
                  <TbShoppingCartX className="text-tomato-dim" size={18} />
                  リストから削除する
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul className="divide-y divide-mauve-dim border-y border-mauve-dim">
            {["チーズ", "マカロニ", "ホワイトソース", "ブロッコリー"].map((name, index) => (
              <div key={index} className="flex items-center justify-between gap-x-2 px-4 py-2">
                <div className="pr-2 py-1">
                  <TbCircleCheckFilled className="text-mauve-8" size={24} />
                </div>
                <li className="text-mauve-normal mr-auto">{name}</li>
              </div>
            ))}
          </ul>
        </div>
      </main>
    </ThemeProvider>
  );
}
