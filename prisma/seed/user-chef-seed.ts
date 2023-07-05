import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userChefSeed = async () => {
  const users = await prisma.user.findMany();
  const userChefs: Prisma.UserChefUncheckedCreateInput[] = [
    {
      userId: users[0].id,
      profileText: `初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！ 絶賛発売中！`,
      profileImgSrc: `/chefs/chef_01`,
    },
    {
      userId: users[1].id,
      profileText: `一つ星レストラン「sio」のオーナーシェフ鳥羽周作がおうちでできる簡単レシピを投稿していきます。幸せの分母を増やします`,
      profileImgSrc: `/chefs/chef_04`,
    },
  ];
  for (const userChef of userChefs) {
    await prisma.userChef.create({
      data: {
        ...userChef,
      },
    });
  }
};
