"use client";

import * as React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";
import { ScrollArea } from "@/components/horizontal-scroll/horizontal-scroll";

type Chef = {
  id: string;
  name: string | null;
  image: string | null;
};

type ChefProps = {
  chefs: Chef[];
};

const HorizonalSmallChefList = ({ chefs }: ChefProps) => (
  <ScrollArea>
    <ul className="flex space-x-4">
      {chefs.map((chef, index) => (
        <li key={index} className="w-[68px] cursor-pointer text-center transition-opacity ease-in-out hover:opacity-60">
          <Link href={`/chef/${chef.id}`}>
            <Avatar>
              <AvatarImage src={`images${chef.image}`} />
              <AvatarFallback>{chef.name}</AvatarFallback>
            </Avatar>
            <span className="mt-1 line-clamp-2 text-xs text-mauve-12">{chef.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </ScrollArea>
);

export { HorizonalSmallChefList };
