import { IconType } from "react-icons";
import { TbChevronDown, TbChevronUp, TbDotsVertical, TbTrash } from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

export function DropDownMenuRecipeInfoList({
  index,
  length,
  moveUp,
  moveDown,
  deleteList,
}: {
  index: number;
  length: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  deleteList: (index: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-mb-0.5 -mr-0.5">
        <TbDotsVertical className="text-mauve-dim" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuGroup className="flex flex-col gap-3 px-3 py-[10px]">
          {(
            [
              {
                icon: TbChevronUp,
                text: "上に移動する",
                action: moveUp,
              },
              {
                icon: TbChevronDown,
                text: "下に移動する",
                action: moveDown,
              },
            ] as const satisfies readonly {
              icon: IconType;
              text: string;
              action?: (index: number) => void;
            }[]
          ).map(({ icon, text, action }, menuIndex) => {
            if ((index !== 0 || menuIndex !== 0) && (index !== length - 1 || menuIndex !== 1)) {
              return (
                <DropdownMenuItem
                  key={menuIndex}
                  className="text-mauve-dim gap-x-2 p-0"
                  onClick={async () => {
                    if (!action) return;
                    await action(index);
                  }}
                >
                  {((Icon: IconType) => (
                    <Icon size={18} className="text-mauve-dim" />
                  ))(icon)}
                  {text}
                </DropdownMenuItem>
              );
            }
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="m-0 p-0" />
        <DropdownMenuGroup className="flex flex-col gap-3 px-3 py-[10px]">
          {(
            [
              {
                icon: TbTrash,
                text: "リストから削除する",
                action: deleteList,
              },
            ] as const satisfies readonly {
              icon: IconType;
              text: string;
              action?: (index: number) => void;
            }[]
          ).map(({ icon, text, action }, menuIndex) => {
            return (
              <DropdownMenuItem
                key={menuIndex}
                className="text-mauve-dim gap-x-2 p-0"
                onClick={async () => {
                  if (!action) return;
                  await action(index);
                }}
              >
                {((Icon: IconType) => (
                  <Icon size={18} className="text-mauve-dim" />
                ))(icon)}
                {text}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
