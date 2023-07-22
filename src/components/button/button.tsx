import { match } from "ts-pattern";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
};
export const Button = ({ size = "sm", className, ...props }: Props) => {
  const buttonSize = match(size)
    .with("sm", () => "py-1 text-sm")
    .with("md", () => "py-2 text-base")
    .exhaustive();

  return <button className={`w-full rounded border px-3 leading-none ${buttonSize} ${className}`} {...props} />;
};
