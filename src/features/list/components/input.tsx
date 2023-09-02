import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva("flex placeholder:text-mauve-8 w-full", {
  variants: {
    variant: {
      default:
        "bg-mauve-app rounded-md border h-10 px-3 py-2 border-mauve-dim ring-offset-mauve-1 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mauve-6 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-mauvedark-1",
      ghost: "bg-transparent focus:outline-none",
      search:
        "text-mauve-normal rounded-lg border-0 bg-mauve-3 px-10 py-1.5 text-sm font-bold leading-6 placeholder:text-mauve-dim focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mauve-7 dark:bg-mauvedark-3 dark:focus-visible:ring-mauvedark-7 focus-visible:outline-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, ...props }, ref) => {
  return <input className={cn(inputVariants({ variant, className }))} ref={ref} {...props} />;
});
Input.displayName = "Input";

export { Input };
