"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import { TbMoon, TbSun } from "react-icons/tb";

import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <TbSun
            className="text-mauve-normal rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            size={16}
          />
          <TbMoon
            className="text-mauve-normal absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            size={16}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
