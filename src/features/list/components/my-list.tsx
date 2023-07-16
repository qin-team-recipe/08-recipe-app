"use client";

import { useState } from "react";

import { Selectable } from "kysely";
import { TbPlus } from "react-icons/tb";

import { Ingredient } from "@/types/db";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";

const className = "text-mauve-normal mr-auto";

export function MyList({
  ingredients,
  deleteIngredient,
  addIngredient,
}: {
  ingredients: Selectable<Ingredient>[];
  deleteIngredient: (id: string, index: number) => Promise<void>;
  addIngredient: (text: string, listId: string, index: number) => Promise<void>;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [{ listId }] = ingredients;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-end justify-between px-4">
        <h2 className="text-mauve-normal text-xl font-bold">じぶんメモ</h2>
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
      </div>
      <ul className="border-mauve-dim divide-mauve-dim divide-y border-y">
        {ingredients.map(({ id, name, index }) => (
          <li key={id} className="flex items-center justify-between gap-x-2 px-4 py-2">
            <div className="flex items-center py-1 pr-2">
              <Checkbox />
            </div>
            <label className={className}>{name}</label>
            <Button
              className="text-tomato-dim -mr-2 text-sm"
              variant="ghost"
              size="sm"
              onClick={async () => {
                await deleteIngredient(id, index);
              }}
            >
              削除
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
                if (!listId) return;
                await addIngredient(event.target.value, listId, ingredients.length);
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
