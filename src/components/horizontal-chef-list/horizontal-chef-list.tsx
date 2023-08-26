import { FC, memo, ReactNode } from "react";

import { Chef } from "@/components/chef/chef";
import { ScrollArea } from "@/components/horizontal-scroll/horizontal-scroll";

type Props = {
  chefs: {
    name: string;
    imageSrc: string;
  }[];
};

export const HorizontalChefList: FC<Props> = (props) => {
  const { chefs } = props;

  return (
    <ScrollArea>
      <div className="flex max-w-full gap-x-2 overflow-x-scroll">
        {chefs.map((chef, index) => (
          <Chef key={index} imageSrc={chef.imageSrc} name={chef.name} />
        ))}
      </div>
    </ScrollArea>
  );
};
