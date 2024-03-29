"use client";

import { TbPlus } from "react-icons/tb";

import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const AddInputButton = ({ text, className, ...props }: Props) => {
  return (
    <button type="button" className={cn("flex", className)} {...props}>
      <TbPlus className="h-4 w-4 stroke-tomato-9" />
      <span className="text-sm leading-4 text-tomato-9">{text}</span>
    </button>
  );
};
