import { match } from "ts-pattern";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
  variant?: "default" | "tomato" | "tomato-outline" | "black-outline";
};
export const Button = ({ size = "sm", variant = "default", className, ...props }: Props) => {
  const buttonStyle = match(variant)
    .with("default", () => "")
    .with("tomato", () => "bg-tomato-9 hover:bg-tomato-10 border-transparent text-whitea-13")
    .with("tomato-outline", () => "border border-tomato-7 text-tomato-11 hover:bg-tomato-1 hover:border-tomato-8")
    .with("black-outline", () => "border border-mauve-12 text-mauve-12 hover:bg-mauve-1")
    .exhaustive();

  const buttonSize = match(size)
    .with("sm", () => "py-1 text-sm")
    .with("md", () => "py-2 text-base")
    .exhaustive();

  return <button className={`w-full rounded px-3 leading-none ${buttonStyle} ${buttonSize} ${className}`} {...props} />;
};
