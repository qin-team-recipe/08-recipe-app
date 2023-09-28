import { FC } from "react";

import { Chef } from "@/components/chef/chef";
import { ScrollArea } from "@/components/horizontal-scroll/horizontal-scroll";

type Props = {
  chefs: {
    id: string;
    name: string | null;
    image: string | null;
  }[];
};

export const HorizontalChefList: FC<Props> = (props) => {
  const { chefs } = props;

  return (
    <ScrollArea>
      <div className="flex max-w-full gap-x-2 overflow-x-scroll">
        {chefs.map((chef, index) => (
          <Chef key={index} {...chef} />
        ))}
      </div>
    </ScrollArea>
  );
};
