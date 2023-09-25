"use client";

import { useState } from "react";

import { RecipeCookingProcedureSelectable, RecipeIngredientSelectable } from "@/features/recipes";

type TabContent = (RecipeCookingProcedureSelectable | RecipeIngredientSelectable)[];

type Tab = {
  name: string;
  contents: TabContent;
  getContentComponent: (contents: TabContent) => JSX.Element;
};

export function TabsWithoutLink({
  tabList,
  initialSelectedTabName,
}: {
  tabList: Tab[];
  initialSelectedTabName: string;
}) {
  const [activeTabName, setActiveTabName] = useState(initialSelectedTabName);
  return (
    <section>
      <div className="w-full text-center text-sm font-medium">
        <div className="flex flex-wrap">
          {tabList.map(({ name }) => {
            return (
              <div
                key={name}
                className={
                  activeTabName === name
                    ? "inline-block flex-1 rounded-t-lg border-b-2 border-mauve-12 p-2 font-bold text-mauve-12"
                    : "inline-block flex-1 rounded-t-lg border-b-2 border-mauve-6 p-2 text-mauve-12 hover:cursor-pointer hover:opacity-60"
                }
                onClick={() => setActiveTabName(name)}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {tabList.map(({ name, contents, getContentComponent }) => {
          return (
            <div key={name} className={activeTabName !== name ? "hidden" : ""}>
              {getContentComponent(contents)}
            </div>
          );
        })}
      </div>
    </section>
  );
}
