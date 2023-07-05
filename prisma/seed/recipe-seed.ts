import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const recipeSeed = async () => {
  const users = await prisma.user.findMany();
  const recipes: Prisma.RecipeUncheckedCreateInput[] = [
    {
      userId: users[0].id,
      //https://cookpad.com/recipe/4748850
      name: "簡単おいしい♪基本のハンバーグ",
      description: "我が家で大大大人気の王道ハンバーグ。ふわっと＆ジューシー、ソースも簡単でおいしいです♪",
      isPublic: true,
    },
    // const recipes: Prisma.RecipeCreateInput[] = [ //これでエラーになる理由をしまぶーさんに聞く
    {
      userId: users[1].id,
      //url:https://www.kurashiru.com/recipes/9f751232-2656-43dd-8f31-80fc365ff2b6
      name: "最高の明太子パスタ",
      description:
        "東京・代々木上原にある、一つ星店「sio」の鳥羽周作シェフに教えていただいたレシピを、クラシルで再現！今回は、最高の明太子パスタのご紹介です。なめらかな明太子のソースと手作りニンニクオイルの香りがとまらない美味しさのパスタです。",
      isPublic: true,
    },
    {
      userId: users[1].id,
      //https://www.kurashiru.com/recipes/b9c05771-ef26-4c88-8c6f-7692ce1b631e
      name: "無限パスタ1 塩こぶバターときのこ",
      description:
        "東京・代々木上原にある、一つ星店「sio」の鳥羽周作シェフに教えていただいたレシピを、クラシルで再現！今回は、とにかく簡単、お子様から大人の方まで楽しめる無限パスタのご紹介です。少ない材料でさっと作れますが、塩昆布やバターがパスタに絡み、やみつきになる一品です。お好みのきのこや鶏ささみなどを加えてもおいしいですよ。",
      isPublic: true,
    },
    {
      userId: users[1].id,
      //https://www.kurashiru.com/recipes/3a83bedb-7082-45ab-9ed9-e47b350c120c
      name: "特製パラパラチャーハン",
      description:
        "東京・代々木上原にある、一つ星店「sio」の鳥羽周作シェフに教えていただいたレシピを、クラシルで再現！今回は、やみつきな料理のご紹介です。万能お米を使うことでご家庭で簡単にパラパラのチャーハンをお作りいただけます。今回のレシピはクラシルYouTubeの「鳥羽周作の◯◯な料理 vol.23」でもご紹介しております。ぜひチェックしてみてくださいね。",
      isPublic: true,
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: {
        ...recipe,
      },
    });
  }
};
