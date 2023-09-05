import { ListNumber } from "@/components/utilities/list-number";
import { ComponentProps } from "react";

type Props = {
  data: {
    text: string;
  }[];
} & ComponentProps<"div">;
export const RecipeStep = ({ data, ...props }: Props) => {
  return (
    <div className={"divide-y divide-mauve-7 border-b border-mauve-7"} {...props}>
      {data.map((instruction, index) => (
        <RecipeStepItem key={`recipe-instruction-${index}`} index={index + 1} text={instruction.text} />
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
      <ListNumber index={index}/>
      <div className={"flex-1"}>
        <p className={"text-mauve-normal leading-snug"}>{text}</p>
      </div>
    </div>
  );
};
