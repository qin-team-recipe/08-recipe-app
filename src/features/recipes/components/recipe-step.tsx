import { RecipeStepProp } from "@/features/recipes";

export const RecipeStep = ({ data, ...props }: RecipeStepProp) => {
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
      <div className={"grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-tomato-10 text-tomato-1"}>
        <span className="text-sm/[18px]">{index}</span>
      </div>
      <div className={"flex-1"}>
        <p className={"text-mauve-normal text-sm leading-snug"}>{text}</p>
      </div>
    </div>
  );
};
