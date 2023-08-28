import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userSeed = async () => {
  const users: Prisma.UserUncheckedCreateInput[] = [
    {
      name: "山田シェフ",
      userType: "chef",
      profileText: `初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！ 絶賛発売中！`,
      image: `/chefs/chef_01`,
    },
    {
      name: "鳥羽周作",
      userType: "chef",
      profileText: `一つ星レストラン「sio」のオーナーシェフ鳥羽周作がおうちでできる簡単レシピを投稿していきます。幸せの分母を増やします`,
      image: `/chefs/chef_04`,
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
