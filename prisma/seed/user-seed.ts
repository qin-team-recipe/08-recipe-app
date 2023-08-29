import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userSeed = async () => {
  const users: Prisma.UserUncheckedCreateInput[] = [
    {
      id: "fdfe96d9-4623-11ee-bd9f-12df81db4123",
      name: "山田シェフ",
      userType: "chef",
    },
    {
      id: "fdfe96d9-4623-11ee-bd9f-12df81db4124",
      name: "鳥羽周作",
      userType: "chef",
    },
    {
      id: "fdfe96d9-4623-11ee-bd9f-12df81db4125",
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
