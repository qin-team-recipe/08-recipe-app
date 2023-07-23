import { match } from "ts-pattern";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
  variant?: "default" | "tomato" | "tomato-outline" | "black-outline";
};
export const Button = ({ size = "sm", variant = "default", className, ...props }: Props) => {
  const buttonStyle = match(variant)
    .with("default", () => "")
    .with(
      "tomato",
      () =>
        "bg-tomato-9 hover:enabled:bg-tomato-10 border-transparent text-whitea-13 disabled:cursor-default disabled:opacity-50"
    )
    .with(
      "tomato-outline",
      () =>
        "border border-tomato-7 text-tomato-11 hover:enabled:bg-tomato-1 hover:enabled:border-tomato-8 disabled:cursor-default disabled:opacity-50"
    )
    .with(
      "black-outline",
      () => "border border-mauve-12 text-mauve-12 hover:enabled:bg-mauve-1 disabled:cursor-default disabled:opacity-50"
    )
    .exhaustive();

  const buttonSize = match(size)
    .with("sm", () => "py-1 text-sm")
    .with("md", () => "py-2 text-base")
    .exhaustive();

  return <button className={`w-full rounded px-3 leading-none ${buttonStyle} ${buttonSize} ${className}`} {...props} />;
};
