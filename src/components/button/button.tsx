import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded px-3 text-sm leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        tomato: "bg-tomato-9 hover:enabled:bg-tomato-10 border-transparent text-whitea-13",
        blue: "bg-blue-9 hover:bg-blue-10 border-transparent text-whitea-13",
        black: "bg-mauve-12 hover:opacity-90 border-transparent text-whitea-13",
        tomatoOutline: "border border-tomato-7 text-tomato-11 hover:enabled:bg-tomato-1 hover:enabled:border-tomato-8",
        blackOutline: "border border-mauve-12 text-mauve-12 hover:enabled:bg-mauve-1",
        ghost: "bg-transparent",
      },
      size: {
        icon: "p-1",
        sm: "py-1 h-[25px]",
        md: "py-2 text-base leading-none h-[35px] w-[171px]",
        lg: "py-2 text-base leading-none h-[35px] w-[358px]",
      },
    },
    defaultVariants: {
      variant: "tomato",
      size: "sm",
    },
  },
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ size, variant, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
