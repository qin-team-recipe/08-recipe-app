"use client";

import { useState } from "react";

import { TbPlus } from "react-icons/tb";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";

const className = "text-mauve-normal mr-auto";

export function MyList() {
  const [list, setList] = useState(["チーズ", "マカロニ", "バジル"]);
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-y-3">
      <div className={cn("flex justify-between px-4", isAdding ? "items-center" : "items-end")}>
        <h2 className="text-mauve-normal text-xl font-bold">じぶんメモ</h2>
        {isAdding ? (
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-mauve-dim px-0 text-sm"
              onClick={() => {
                setIsAdding(false);
                setValue("");
              }}
            >
              キャンセル
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-tomato-dim px-0 text-sm"
              onClick={() => {
                if (!value) {
                  setIsAdding(false);
                  return;
                }
                setList((list) => [...list, value]);
                setIsAdding(false);
                setValue("");
              }}
            >
              保存する
            </Button>
          </div>
        ) : (
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
        )}
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
            <Input
              className={className}
              variant="ghost"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              maxLength={30}
              autoFocus
            />
          </li>
        )}
      </ul>
    </div>
  );
}
