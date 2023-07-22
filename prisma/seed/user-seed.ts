import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userSeed = async () => {
  const users: Prisma.UserUncheckedCreateInput[] = [
    {
      name: "山田シェフ",
      userType: "chef",
    },
    {
      name: "鳥羽周作",
      userType: "chef",
    },
    {
      name: "しまぶーさんの奥さん",
      userType: "general",
    },
  ];
  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
};
