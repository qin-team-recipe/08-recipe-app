import { ComponentProps } from "react";

import { match } from "ts-pattern";

import { Button } from "@/components/button/button";

type Props = ComponentProps<typeof Button> & {
  variant?: "default" | "outline";
};
export const PrimaryButton = ({ variant = "default", className, ...props }: Props) => {
  const buttonStyle = match(variant)
    .with("default", () => "bg-tomato-9 hover:bg-tomato-10 border-transparent text-whitea-13")
    .with("outline", () => "border border-tomato-7 text-tomato-11 hover:bg-tomato-1 hover:border-tomato-8")
    .exhaustive();

  return <Button className={`${buttonStyle} ${className}`} {...props} />;
};
