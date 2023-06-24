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

export default function Page() {
  const size = 18;

  return (
    <>
      <header className="bg-mauve-app flex items-center justify-center border-b border-b-mauve-6 px-4 py-3">
        <h1 className="text-mauve-normal font-bold leading-6">買い物リスト</h1>
      </header>
      <main className="bg-mauve-app flex h-screen flex-col gap-5 pt-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-end justify-between px-4">
            <h2 className="text-mauve-normal text-xl font-bold">じぶんメモ</h2>
            <button className="p-1">
              <TbPlus className="text-mauve-dim" size={20} />
            </button>
          </div>
          <ul className="divide-y divide-mauve-6 border-y border-mauve-6">
            {["チーズ", "マカロニ", "バジル"].map((name, index) => (
              <div key={index} className="flex items-center justify-between gap-x-2 px-4 py-2">
                <div className="pr-2 py-1">
                  <TbCircleCheckFilled className="text-mauve-8" size={24} />
                </div>
                <li className="text-mauve-normal mr-auto">{name}</li>
                <span className="text-tomato-9 text-sm">削除</span>
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
                    ["レシピ詳細を見る", <TbToolsKitchen size={size} />],
                    ["上に移動する", <TbChevronUp size={size} />],
                    ["下に移動する", <TbChevronDown size={size} />],
                    ["買うものを追加する", <TbPlus size={size} />],
                  ] as const
                ).map(([text, icon], index) => {
                  return (
                    <DropdownMenuItem key={index} className="gap-1">
                      {icon}
                      {text}
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuItem className="gap-1 text-tomato-9">
                  <TbShoppingCartX className="text-tomato-9" size={size} />
                  リストから削除する
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul className="divide-y divide-mauve-6 border-y border-mauve-6">
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
    </>
  );
}
