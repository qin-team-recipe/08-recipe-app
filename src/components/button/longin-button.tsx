import { ComponentProps } from "react";

import { AiOutlineGoogle } from "react-icons/ai";
import { PiAppleLogoBold } from "react-icons/pi";
import { match } from "ts-pattern";

import { Button } from "@/components/button/button";

type Props = Omit<ComponentProps<typeof Button>, "size" | "variant"> & {
  variant: "google" | "apple";
};

export const LonginButton = ({ variant, ...props }: Props) => {
  const buttonStyle = match(variant)
    .with("google", () => "bg-blue-9 hover:bg-blue-10 border-transparent text-whitea-13")
    .with("apple", () => "bg-mauve-12 hover:opacity-90 border-transparent text-whitea-13")
    .exhaustive();

  const icon = match(variant)
    .with("google", () => <AiOutlineGoogle className={"text-base"} />)
    .with("apple", () => <PiAppleLogoBold className={"text-base"} />)
    .exhaustive();

  const text = match(variant)
    .with("google", () => "Googleでログイン")
    .with("apple", () => "Appleでログイン")
    .exhaustive();

  return (
    <Button className={`flex items-center justify-center gap-1 ${buttonStyle}`} size={"md"} {...props}>
      {icon}
      <span className={"text-sm font-bold"}>{text}</span>
    </Button>
  );
};
