import { TbDotsCircleHorizontal } from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/list";

const socialMedia = ["youtube", "instagram", "tiktok", "twitter", "facebook"];

type Props = {
  links: string[];
};

export const LinksMenu = ({ links }: Props) => {
  const socialMediaLinks = links.filter((link) => socialMedia.some((social) => link.toLowerCase().includes(social)));

  const otherLinks = links.filter((link) => !socialMedia.some((social) => link.toLowerCase().includes(social)));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-mb-0.5 -mr-0.5">
        <TbDotsCircleHorizontal className="text-mauve-dim" size={20} />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent>
          {socialMediaLinks.map((socialMediaLink, index) => (
            <LinksMenuItem key={index} link={socialMediaLink} />
          ))}
          <DropdownMenuItem>text</DropdownMenuItem>
          <DropdownMenuItem>text</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

type LinksMenuItemProps = {
  link: string;
};

const LinksMenuItem = ({ link }: LinksMenuItemProps) => {
  return <DropdownMenuItem>text</DropdownMenuItem>;
};
