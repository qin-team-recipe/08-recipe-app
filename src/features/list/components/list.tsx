"use client";

import { useState } from "react";

import { Selectable } from "kysely";
import { IconType } from "react-icons";
import {
  TbChefHat,
  TbChevronDown,
  TbChevronUp,
  TbCircleCheck,
  TbDotsCircleHorizontal,
  TbPlus,
  TbTrash,
} from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { addItem, deleteItem, deleteList, moveDown, moveUp } from "@/features/list";
import { ListIngredient } from "@/types/db";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";

const className = "text-mauve-normal mr-auto";

export function List({
  id,
  name,
  ingredients,
  index,
}: {
  id: string;
  name: string;
  ingredients: Selectable<ListIngredient>[];
  index: number;
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-end justify-between px-4">
        <h2 className="text-mauve-normal text-xl font-bold">{name}</h2>
        <div className="flex gap-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="-mb-0.5 -mr-0.5"
            onClick={() => {
              setIsAdding(true);
            }}
          >
            <TbPlus className="text-mauve-dim" size={20} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="-mb-0.5 -mr-0.5">
              <TbDotsCircleHorizontal className="text-mauve-dim" size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
              {!!index && (
                <DropdownMenuGroup className="flex flex-col gap-3 px-3 py-[10px]">
                  {(
                    [
                      {
                        icon: TbChefHat,
                        text: "レシピ詳細を見る",
                        action: undefined,
                      },
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
                      action?: (index: number) => Promise<void>;
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
              )}
              <DropdownMenuSeparator className="m-0 p-0" />
              <DropdownMenuGroup className="flex flex-col gap-3 px-3 py-[10px]">
                {(
                  [
                    {
                      icon: TbCircleCheck,
                      text: "完了したアイテムだけ削除する",
                      action: undefined,
                    },
                    {
                      icon: TbTrash,
                      text: "レシピを買い物リストから削除する",
                      action: deleteList,
                    },
                  ] as const satisfies readonly {
                    icon: IconType;
                    text: string;
                    action?: (index: number) => Promise<void>;
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
        </div>
      </div>
      <ul className="border-mauve-dim divide-mauve-dim divide-y border-y">
        {ingredients.map(({ id, name, index }) => (
          <li key={id} className="flex items-center justify-between gap-x-2 px-4 py-2">
            <div className="flex items-center py-1 pr-2">
              <Checkbox />
            </div>
            <label className={className}>{name}</label>
            <Button
              className="text-tomato-dim -mr-0.5 p-0 text-sm"
              variant="ghost"
              size="icon"
              onClick={async () => {
                await deleteItem(id, index);
              }}
            >
              <TbTrash size={20} className="text-mauve-dim" />
            </Button>
          </li>
        ))}
        {isAdding && (
          <li className="flex items-center justify-between gap-x-2 px-4 py-2">
            <div className="flex items-center py-1 pr-2">
              <Checkbox />
            </div>
            <Input
              className={className}
              variant="ghost"
              maxLength={30}
              onBlur={async (event) => {
                await addItem(event.target.value, ingredients.length, id);
                setIsAdding(false);
              }}
              autoFocus
            />
          </li>
        )}
      </ul>
    </div>
  );
}
