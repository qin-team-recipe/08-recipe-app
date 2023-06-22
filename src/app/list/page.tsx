import { ChevronDown, ChevronUp, MoreVertical, Plus, ShoppingCart, Utensils } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/list";

export default function Page() {
  return (
    <>
      <header className="bg-mauve-app flex items-center justify-center border-b border-b-mauve-6 px-4 py-3">
        <h1 className="text-mauve-normal text-xl font-bold leading-6">買い物リスト</h1>
      </header>
      <main className="bg-mauve-app h-screen pt-5">
        <div className="flex flex-col gap-3 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-mauve-normal font-bold">じぶんメモ</h2>
            <span>+</span>
          </div>
          <ul>
            {["チーズ", "マカロニ", "バジル"].map((name, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>o</span>
                <li className="text-mauve-normal mr-auto text-sm">{name}</li>
                <span className="text-sm text-tomato-9">削除</span>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between px-4">
          <h2 className="text-mauve-normal font-bold">グラタン</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto block">
              <MoreVertical className="text-mauve-11" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="gap-1">
                <Utensils size={18} />
                レシピ詳細を見る
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1">
                <ChevronUp size={18} />
                上に移動する
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1">
                <ChevronDown size={18} />
                下に移動する
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1">
                <Plus size={18} />
                買うものを追加する
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1 text-tomato-9">
                <ShoppingCart className="text-tomato-9" size={18} />
                リストから削除する
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </main>
    </>
  );
}
