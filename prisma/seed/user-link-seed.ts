import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userLinkSeed = async () => {
  const users = await prisma.user.findMany();

  const userLinks: Prisma.UserLinkUncheckedCreateInput[] = [
    {
      userId: users[0].id,
      category: "youtube",
      url: "https://www.youtube.com/channel/UC3p5OTQsMEnmZktWUkw_Y0A",
    },
    {
      userId: users[0].id,
      category: "twitter",
      url: "https://twitter.com/kohkentetsu14?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
    },
    {
      userId: users[0].id,
      category: "instagram",
      url: "https://www.instagram.com/kohkentetsu/?hl=ja",
    },
    {
      userId: users[1].id,
      category: "youtube",
      url: "https://www.youtube.com/channel/UC1_eNNjFjV8Cp6QlxbOAnjA",
    },
    {
      userId: users[1].id,
      category: "instagram",
      url: "https://www.instagram.com/ouchi_de_sio/?hl=ja",
    },
    {
      userId: users[1].id,
      category: "other",
      url: "https://note.com/pirlo",
    },
  ];
  for (const userLink of userLinks) {
    await prisma.userLink.create({
      data: {
        ...userLink,
      },
    });
  }
};
