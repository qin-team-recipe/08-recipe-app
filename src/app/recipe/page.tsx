"use client";

import { useState } from "react";
import Link from "next/link";

import { TbCopy } from "react-icons/tb";

import { Tabs } from "@/components/tabs/tabs";

export default function Page() {
  const [isFavorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!isFavorite);

  return (
    <main>
      <div className={"aspect-square bg-tomato-3"}>jhsdkjhf</div>
      <div className={"space-y-3 p-4"}>
        <h1 className={"text-xl font-bold"}>レシピ</h1>
        <p>
          レシピとは、一般的には料理の作り方を指示した手順のことを指します。レシピには、必要な食材とその量、調理手順、調理時間、提供人数、料理の写真などが含まれます。特に家庭料理やプロのシェフが作る料理の方法を他人が再現できるように、または新しい料理を作るためのアイデアとして共有されます。
        </p>
        <div className={"flex items-center gap-x-4"}>
          <Link className={"group flex items-center gap-x-1 text-sm"} href={"/"}>
            <div className={"h-5 w-5 rounded-full bg-tomato-5"} />
            <div className={"sm:group-hover:underline"}>こたろシェフ</div>
          </Link>
          <div className={"text-sm"}>
            <span className={"mr-0.5 font-bold"}>1,234</span>
            <span>お気に入り</span>
          </div>
        </div>
        <button
          onClick={toggleFavorite}
          className={
            isFavorite
              ? "bg-tomato-solid rounded-md border border-transparent px-4 py-1 text-sm"
              : "border-tomato-normal text-tomato-dim rounded-md border px-4 py-1 text-sm"
          }
        >
          {isFavorite ? "お気に入り追加" : "お気に入りから削除"}
        </button>
      </div>
      <Tabs
        tabList={[
          {
            name: "作り方",
            href: `/recipe`,
          },
          {
            name: "リンク",
            href: `/`,
          },
        ]}
      />
      <div className={"divide-y divide-mauve-7 border-b border-mauve-7"}>
        <div className={"flex gap-x-2 px-4 py-2"}>
          <div className={"grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tomato-10 text-sm text-tomato-1"}>
            1
          </div>
          <div className={"flex-1"}>
            <p className={"text-mauve-normal leading-snug"}>
              用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。
            </p>
          </div>
        </div>
        <div className={"flex gap-x-2 px-4 py-2"}>
          <div className={"grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tomato-10 text-sm text-tomato-1"}>
            2
          </div>
          <div className={"flex-1"}>
            <p className={"text-mauve-normal leading-snug"}>
              用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。
            </p>
          </div>
        </div>
        <div className={"flex gap-x-2 px-4 py-2"}>
          <div className={"grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tomato-10 text-sm text-tomato-1"}>
            3
          </div>
          <div className={"flex-1"}>
            <p className={"text-mauve-normal leading-snug"}>
              用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。
            </p>
          </div>
        </div>
      </div>

      <div className={"flex cursor-pointer items-center justify-end gap-x-1 px-4 py-2 text-blue-11"}>
        <TbCopy className={"text-base"} />
        <p className={"text-xs"}>コピーする</p>
      </div>
    </main>
  );
}
