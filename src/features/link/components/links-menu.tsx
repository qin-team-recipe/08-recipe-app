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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/list";
import { LinkCategory } from "@/types/enums";

type Link = {
  url: string;
  category: LinkCategory;
};

const LINKS_DATA: Link[] = [
  {
    url: "https://www.youtube.com/",
    category: "youtube",
  },
  {
    url: "https://www.instagram.com/",
    category: "instagram",
  },
  {
    url: "https://www.tiktok.com/",
    category: "tiktok",
  },
  {
    url: "https://twitter.com/home",
    category: "twitter",
  },
  {
    url: "https://www.facebook.com/",
    category: "facebook",
  },
  {
    url: "https://www.google.com/",
    category: "other",
  },
];

const orderedCategories = ["youtube", "instagram", "tiktok", "twitter", "facebook"] satisfies LinkCategory[];

export const LinksMenu = () => {
  const socialMediaLinks = LINKS_DATA.flatMap((link) => {
    const category = orderedCategories.find((category) => category === link.category);
    return category ? [{ ...link, category }] : [];
  });

  const sortedSocialMediaLinks = socialMediaLinks.sort((a, b) => {
    return orderedCategories.indexOf(a.category) - orderedCategories.indexOf(b.category);
  });
  const outsideIconLinks = sortedSocialMediaLinks.splice(0, 2);

  const otherLinks = LINKS_DATA.filter((data) => data.category === "other");

  return (
    <div className={"flex gap-x-4"}>
      {outsideIconLinks.length > 0 &&
        outsideIconLinks.map((outsideIconLink, index) => (
          <LinksMenuOutsideIcon key={`links-menu-outside-icon-${index}`} link={outsideIconLink} />
        ))}

      <DropdownMenu>
        <DropdownMenuTrigger className={"-mb-0.5 -mr-0.5"}>
          <TbDotsCircleHorizontal className={"text-mauve-12 hover:text-mauve-11"} size={24} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className={"p-0"}>
          {sortedSocialMediaLinks.length > 0 &&
            sortedSocialMediaLinks.map((socialMediaLink, index) => (
              <LinksMenuItem key={`social-media-link-${index}`} link={socialMediaLink} />
            ))}
          {socialMediaLinks.length > 0 && otherLinks.length > 0 && <DropdownMenuSeparator className={"m-0"} />}
          {otherLinks.length > 0 &&
            otherLinks.map((otherLink, index) => <LinksMenuItem key={`other-link-${index}`} link={otherLink} />)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const LinksMenuOutsideIcon = ({ link }: { link: Link }) => {
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

const LinksMenuItem = ({ link }: { link: Link }) => {
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
