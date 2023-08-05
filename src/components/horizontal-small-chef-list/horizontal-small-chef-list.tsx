"use client";

import * as React from "react";
import { Route } from "next";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";
import { ScrollArea } from "@/components/horizontal-scroll/horizontal-scroll";

type Chef<T extends string> = {
  name: string;
  imgPath: string;
  url: Route<T>;
};

type ChefProps<T extends string> = {
  chefs: Chef<T>[];
};

const HorizonalSmallChefList = <T extends string>({ chefs }: ChefProps<T>) => (
  <ScrollArea>
    <ul className="flex space-x-4">
      {chefs.map((chef, index) => (
        <li key={index} className="cursor-pointer text-center transition-opacity ease-in-out hover:opacity-60">
          <Link href={chef.url}>
            <Avatar>
              <AvatarImage src={chef.imgPath} />
              <AvatarFallback>{chef.name}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-mauve-12">{chef.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </ScrollArea>
);

export { HorizonalSmallChefList };
