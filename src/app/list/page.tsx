import { ChevronDown, ChevronUp, MoreVertical, Plus, ShoppingCart, Utensils } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/list";

export default function Page() {
  return (
    <main>
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
    </main>
  );
}
