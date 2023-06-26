"use client";

import { useState } from "react";

import { TbPlus } from "react-icons/tb";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Checkbox } from "./checkbox";

const className = "text-mauve-normal mr-auto";

export function MyList() {
  const [list, setList] = useState(["チーズ", "マカロニ", "バジル"]);
  const [isAdding, setIsAdding] = useState(false);

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
        {list.map((name, index) => (
          <li key={index} className="flex items-center justify-between gap-x-2 px-4 py-2">
            <div className="flex items-center py-1 pr-2">
              <Checkbox />
            </div>
            <label className={className}>{name}</label>
            <Button
              className="text-tomato-dim -mr-2 text-sm"
              variant="ghost"
              size="sm"
              onClick={() => {
                setList((list) => list.filter((_, currentIndex) => currentIndex !== index));
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
            <input
              className={cn(className, "bg-transparent")}
              onBlur={(event) => {
                const { value } = event.target;
                setIsAdding(false);
                if (!value) return;
                setList((list) => [...list, value]);
              }}
              autoFocus
            />
          </li>
        )}
      </ul>
    </div>
  );
}
