import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userChefLinkSeed = async () => {
  const userChefs = await prisma.userChef.findMany();

  const userChefLinks: Prisma.UserChefLinkUncheckedCreateInput[] = [
    {
      userChefId: userChefs[0].id,
      category: "youtube",
      url: "https://www.youtube.com/channel/UC3p5OTQsMEnmZktWUkw_Y0A",
    },
    {
      userChefId: userChefs[0].id,
      category: "twitter",
      url: "https://twitter.com/kohkentetsu14?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
    },
    {
      userChefId: userChefs[0].id,
      category: "instagram",
      url: "https://www.instagram.com/kohkentetsu/?hl=ja",
    },
    {
      userChefId: userChefs[1].id,
      category: "youtube",
      url: "https://www.youtube.com/channel/UC1_eNNjFjV8Cp6QlxbOAnjA",
    },
    {
      userChefId: userChefs[1].id,
      category: "instagram",
      url: "https://www.instagram.com/ouchi_de_sio/?hl=ja",
    },
    {
      userChefId: userChefs[1].id,
      category: "other",
      url: "https://note.com/pirlo",
    },
  ];
  for (const userChefLink of userChefLinks) {
    await prisma.userChefLink.create({
      data: {
        ...userChefLink,
      },
    });
  }
};
