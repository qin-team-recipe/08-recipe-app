import { ComponentProps, useMemo } from "react";

import { match } from "ts-pattern";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
  variant?: "solid" | "outline";
};
export const Button = ({ size = "sm", variant = "solid", ...props }: Props) => {
  const buttonStyle = useMemo(
    () =>
      match(variant)
        .with("solid", () => "bg-tomato-solid border-transparent")
        .with("outline", () => "border-tomato-normal text-tomato-dim")
        .exhaustive(),
    [variant]
  );
  const buttonSize = useMemo(
    () =>
      match(size)
        .with("sm", () => "py-1 text-sm")
        .with("md", () => "py-2 text-base")
        .exhaustive(),
    [size]
  );

  return <button className={`w-full rounded border px-3 leading-none ${buttonStyle} ${buttonSize}`} {...props} />;
};
