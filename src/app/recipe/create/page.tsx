"use client";

import { useState } from "react";

import { RecipeForm } from "@/features/recipes";

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
      <RecipeForm />
    </div>
  );
};

export default Page;
