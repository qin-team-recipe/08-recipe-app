"use client";

import { useState } from "react";

import { DropDownMenuRecipeInfoList, DropDownMenuRecipeIngredient } from "@/features/recipes";

const Page = () => {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [procedures, setProcedures] = useState<{ id: string | null; content: string | undefined }[]>([
    {
      id: "lkjafaljka",
      content: `1用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。`,
    },
    {
      id: "fadhlhlkafa",
      content: `2用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。`,
    },
  ]);

  const addIngredient = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    console.log("addIngredient called");
    console.log("event", event);
    setIngredients([...ingredients, ""]);
  };

  const addProcedure = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    console.log("addProcedure called");
    console.log("event", event);
    setProcedures([...procedures, { id: null, content: "" }]);
  };

  const moveUpProcedure = (index: number): void => {
    console.log("moveUpProcedure called");
    if (index !== 0) {
      const updateProcedures = [...procedures];
      const updateProceduresIndex = updateProcedures[index];
      updateProcedures[index] = updateProcedures[index - 1];
      updateProcedures[index - 1] = updateProceduresIndex;
      setProcedures(updateProcedures);
    }
  };

  const moveDownProcedure = (index: number): void => {
    console.log("moveDownProcedure called");
    if (index !== [...procedures].length) {
      const updateProcedures = [...procedures];
      const updateProceduresIndex = updateProcedures[index];
      updateProcedures[index] = updateProcedures[index + 1];
      updateProcedures[index + 1] = updateProceduresIndex;
      setProcedures(updateProcedures);
    }
  };

  const deleteProcedure = (index: number): void => {
    setProcedures(procedures.filter((procedure, indexProcedure) => indexProcedure !== index));
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
          ingredients.map((ingredient, index) => (
            <div className="relative flex items-center justify-end">
              <input
                type="text"
                className="w-full border border-mauve-6 py-3 pl-4 outline-1 outline-tomato-9
              "
                key={index}
                value={ingredient}
                placeholder="例：じゃがいも 5個"
              />
              <div className="absolute right-3">
                <DropDownMenuRecipeInfoList
                  index={index}
                  moveUp={function (index: number): void {
                    throw new Error("Function not implemented.");
                  }}
                  moveDown={function (index: number): void {
                    throw new Error("Function not implemented.");
                  }}
                  deleteList={function (index: number): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          ))}
        <div onClick={addIngredient}>材料を追加する</div>
      </div>
      <div className="pt-5 flex flex-col ">
        <label className="font-tile-m-bold pl-4 pb-1">作り方</label>
        {procedures &&
          procedures.map((procedure, index) => (
            <div className="relative flex items-center justify-end">
              <textarea
                className="w-full border border-mauve-6 py-3 pl-4 pr-8 outline-1 outline-tomato-9
              "
                key={index}
                value={procedure.content}
                placeholder="例：人参をむきます"
              />
              <div className="absolute right-3">
                <DropDownMenuRecipeIngredient
                  index={index}
                  edit={function (index: number): void {
                    throw new Error("Function not implemented.");
                  }}
                  moveUp={(index) => moveUpProcedure(index)}
                  moveDown={(index) => moveDownProcedure(index)}
                  deleteList={(index) => deleteProcedure(index)}
                />
              </div>
            </div>
          ))}
        <div onClick={addProcedure}>工程を追加する</div>
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
