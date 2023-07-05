"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [isFavorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!isFavorite);

  return (
    <main className={"h-screen"}>
      <div className={"aspect-square bg-tomato-3"}>jhsdkjhf</div>
      <div className={"space-y-3 p-4"}>
        <h1 className={"text-xl font-bold"}>レシピ</h1>
        <p>
          レシピとは、一般的には料理の作り方を指示した手順のことを指します。レシピには、必要な食材とその量、調理手順、調理時間、提供人数、料理の写真などが含まれます。特に家庭料理やプロのシェフが作る料理の方法を他人が再現できるように、または新しい料理を作るためのアイデアとして共有されます。
        </p>
        <div className={"flex items-center gap-x-4"}>
          <Link className={"group flex items-center gap-x-1 text-sm"} href={"/"}>
            <div className={"h-5 w-5 rounded-full bg-tomato-5"} />
            <div className={"sm:group-hover:underline"}>シェフ</div>
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
    </main>
  );
}
