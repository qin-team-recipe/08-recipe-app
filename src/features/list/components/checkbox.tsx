"use client";

import * as React from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { TbCircleCheckFilled } from "react-icons/tb";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative h-6 w-6 rounded-full border-2 border-tomato-9 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-transparent data-[state=checked]:text-mauve-8",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-current")}
    >
      <TbCircleCheckFilled className="text-mauve-8 dark:text-mauvedark-8" size={30} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
