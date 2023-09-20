import { ComponentProps } from "react";

import { Selectable } from "kysely";

import { RecipeCookingProcedure } from "@/types/db";

type Props = {
  data: Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index">[];
} & ComponentProps<"div">;
export const RecipeStep = ({ data, ...props }: Props) => {
  return (
    <div className={"divide-y divide-mauve-7 border-b border-mauve-7"} {...props}>
      {data.map((procedure, index) => (
        <RecipeStepItem key={procedure.id} index={index + 1} text={procedure.name} />
      ))}
    </div>
  );
};

type RecipeStepItemProps = {
  index: number;
  text: string;
};

const RecipeStepItem = ({ index, text }: RecipeStepItemProps) => {
  return (
    <div className={"flex gap-x-2 px-4 py-2"}>
      <div className={"grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tomato-10 text-sm text-tomato-1"}>
        {index}
      </div>
      <div className={"flex-1"}>
        <p className={"text-mauve-normal leading-snug"}>{text}</p>
      </div>
    </div>
  );
};
