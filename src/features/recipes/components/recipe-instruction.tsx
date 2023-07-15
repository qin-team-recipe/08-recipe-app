type Props = {
  index: number;
  text: string;
};
export const RecipeInstruction = ({ index, text }: Props) => {
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
