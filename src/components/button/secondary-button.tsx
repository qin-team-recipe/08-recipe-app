import { ComponentProps } from "react";

import { Button } from "@/components/button/button";

type Props = ComponentProps<typeof Button>;

export const SecondaryButton = ({ className, ...props }: Props) => {
  return <Button className={`border-mauve-12 text-mauve-12 hover:bg-mauve-1 ${className}`} {...props} />;
};
