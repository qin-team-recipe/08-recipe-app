import { ChevronDown, ChevronUp, MoreVertical, Plus, ShoppingCart, Utensils } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/list";

export default function Page() {
  return (
    <main>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto mr-0 block">
          <MoreVertical color="#6F6E77" />
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
          <DropdownMenuItem className="gap-1 text-[#E54D2E]">
            <ShoppingCart color="#E54D2E" size={18} />
            リストから削除する
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}
