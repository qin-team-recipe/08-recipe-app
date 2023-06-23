import { Prisma, PrismaClient } from "@prisma/client";

export const userChefLinkSeed: Prisma.UserChefLinkCreateInput[] = [
  {
    category: "twitter",
    url: "https://twitter.com/kohkentetsu14",
  },
  {
    category: "youtube",
    url: "https://www.youtube.com/channel/UC3p5OTQsMEnmZktWUkw_Y0A",
  },
];
