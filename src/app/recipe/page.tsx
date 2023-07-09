import { TbCopy } from "react-icons/tb";

import { RecipeInstruction } from "@/features/recipes/components/RecipeInstruction";

const RECIPE_INSTRUCTIONS = [
  {
    text: "用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。",
  },
  {
    text: "用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。",
  },
  {
    text: "用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。",
  },
  {
    text: "用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。",
  },
];

export default function Page() {
  return (
    <div>
      <div className={"divide-y divide-mauve-7 border-b border-mauve-7"}>
        {RECIPE_INSTRUCTIONS.map((instruction, index) => (
          <RecipeInstruction key={`recipe-instruction-${index}`} index={index + 1} text={instruction.text} />
        ))}
      </div>

      <div className={"flex cursor-pointer items-center justify-end gap-x-1 px-4 py-2 text-blue-11"}>
        <TbCopy className={"text-base"} />
        <p className={"text-xs"}>コピーする</p>
      </div>
    </div>
  );
}
