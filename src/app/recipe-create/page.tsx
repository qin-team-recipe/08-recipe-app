"use client";

import { useState } from "react";

const Page = () => {
  const [ingredients, setIngredients] = useState<string[]>([""]);

  const addIngredient = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    console.log("addIngredient called");
    console.log("event", event);
    setIngredients([...ingredients, ""]);
  };

  return (
    <div className="bg-mauve-3 ">
      <div className="flex justify-between border-b border-mauve-6">
        <div>✗</div>
        <div>下書き一覧</div>
      </div>
      <div className="pt-5 flex flex-col ">
        <label className="font-tile-m-bold pl-4 pb-1">レシピ名</label>
        <input
          type="text"
          className="w-full border border-mauve-6 py-3 pl-4 outline-1 outline-tomato-9
        "
          placeholder="例：肉じゃが"
        />
      </div>
      <div className="pt-5 flex flex-col ">
        <label className="font-tile-m-bold pl-4 pb-1">材料/2人前</label>
        {ingredients &&
          ingredients.map((ingredient) => (
            <div>
              <input
                type="text"
                className="w-full border border-mauve-6 py-3 pl-4 outline-1 outline-tomato-9
              "
                key={ingredient}
                value={ingredient}
                placeholder="例：じゃがいも 5個"
              />
            </div>
          ))}
        <div onClick={addIngredient}>材料を追加する</div>
      </div>
      <div>
        <label>画像（任意）</label>
        <input type="file" />
      </div>
      <div>
        <label>レシピの紹介文（任意）</label>
        <textarea className="w-full" />
      </div>
      <div>
        <label>リンク（任意）</label>
        <input type="text" className="w-full" />
        <div>工程を追加する</div>
      </div>
      <div>
        <button>保存する</button>
        <button>削除する</button>
      </div>
    </div>
  );
};

export default Page;
