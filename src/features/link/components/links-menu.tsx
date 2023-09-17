import { Selectable } from "kysely";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTiktok,
  TbBrandTwitter,
  TbBrandYoutube,
  TbDotsCircleHorizontal,
  TbLink,
} from "react-icons/tb";
import { match } from "ts-pattern";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/list";
import { RecipeLink } from "@/types/db";

export const LinksMenu = ({ recipeLinks }: { recipeLinks: Selectable<RecipeLink>[] }) => {
  const outsideIconLinks = recipeLinks.splice(0, 2);

  const otherLinks = recipeLinks.splice(2);

  return (
    <div className={"flex gap-x-4"}>
      {outsideIconLinks.length > 0 &&
        outsideIconLinks.map((outsideIconLink) => (
          <LinksMenuOutsideIcon key={outsideIconLink.id} link={outsideIconLink} />
        ))}

      {otherLinks.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger className={"-mb-0.5 -mr-0.5"}>
            <TbDotsCircleHorizontal className={"text-mauve-12 hover:text-mauve-11"} size={24} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className={"p-0"}>
            {otherLinks.length > 0 &&
              otherLinks.map((otherLink) => <LinksMenuItem key={otherLink.id} link={otherLink} />)}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

const LinksMenuOutsideIcon = ({ link }: { link: Selectable<RecipeLink> }) => {
  const icon = match(link)
    .with({ category: "youtube" }, () => <TbBrandYoutube size={24} />)
    .with({ category: "instagram" }, () => <TbBrandInstagram size={24} />)
    .with({ category: "tiktok" }, () => <TbBrandTiktok size={24} />)
    .with({ category: "twitter" }, () => <TbBrandTwitter size={24} />)
    .with({ category: "facebook" }, () => <TbBrandFacebook size={24} />)
    .with({ category: "other" }, () => <TbLink size={24} />)
    .exhaustive();

  return (
    <a className={"text-mauve-12 hover:text-mauve-11"} href={link.url} target={"_blank"} rel={"noopener noreferrer"}>
      {icon}
    </a>
  );
};

const LinksMenuItem = ({ link }: { link: Selectable<RecipeLink> }) => {
  const { icon, text } = match(link)
    .with({ category: "youtube" }, () => ({
      icon: <TbBrandYoutube size={16} />,
      text: "Youtube",
    }))
    .with({ category: "instagram" }, () => ({
      icon: <TbBrandInstagram size={16} />,
      text: "Instagram",
    }))
    .with({ category: "tiktok" }, () => ({
      icon: <TbBrandTiktok size={16} />,
      text: "TikTok",
    }))
    .with({ category: "twitter" }, () => ({
      icon: <TbBrandTwitter size={16} />,
      text: "Twitter",
    }))
    .with({ category: "facebook" }, () => ({
      icon: <TbBrandFacebook size={16} />,
      text: "Facebook",
    }))
    .with({ category: "other" }, () => ({
      icon: <TbLink size={16} />,
      text: link.url,
    }))
    .exhaustive();

  return (
    <a href={link.url} target={"_blank"} rel={"noopener noreferrer"}>
      <DropdownMenuItem className={"cursor-pointer"}>
        <div className={"text-mauve-dim flex items-center gap-x-2"}>
          {icon}
          <p className={"text-sm"}>{text}</p>
        </div>
      </DropdownMenuItem>
    </a>
  );
};
