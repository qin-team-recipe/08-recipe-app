import { ChevronDown, ChevronUp, Plus, ShoppingCart, Utensils } from "lucide-react";
import { TbCircleCheckFilled, TbDotsVertical, TbPlus } from "react-icons/tb";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/list";

export default function Page() {
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
                <div className="py-1">
                  <TbCircleCheckFilled className="text-mauve-8" size={24} />
                </div>
                <li className="text-mauve-normal mr-auto">{name}</li>
                <span className="text-tomato-9">削除</span>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex items-end justify-between px-4">
          <h2 className="text-mauve-normal text-xl font-bold">グラタン</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto block">
              <TbDotsVertical className="text-mauve-dim" size={20} />
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
