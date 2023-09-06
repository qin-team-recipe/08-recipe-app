import { randomUUID } from "crypto";

import { Insertable } from "kysely";

import { Title } from "@/features/search";
import { Recipe } from "@/types/db";

export default function Page({
  searchParams: { q },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = randomUUID();
  const isPublic = 1;
  const recipes = [
    {
      userId,
      name: "簡単おいしい♪基本のハンバーグ",
      description: "我が家で大大大人気の王道ハンバーグ。ふわっと＆ジューシー、ソースも簡単でおいしいです♪",
      isPublic,
    },
    {
      userId,
      name: "最高の明太子パスタ",
      description:
        "東京・代々木上原にある、一つ星店「sio」の鳥羽周作シェフに教えていただいたレシピを、クラシルで再現！今回は、最高の明太子パスタのご紹介です。なめらかな明太子のソースと手作りニンニクオイルの香りがとまらない美味しさのパスタです。",
      isPublic,
    },
    {
      userId,
      name: "無限パスタ1 塩こぶバターときのこ",
      description:
        "東京・代々木上原にある、一つ星店「sio」の鳥羽周作シェフに教えていただいたレシピを、クラシルで再現！今回は、とにかく簡単、お子様から大人の方まで楽しめる無限パスタのご紹介です。少ない材料でさっと作れますが、塩昆布やバターがパスタに絡み、やみつきになる一品です。お好みのきのこや鶏ささみなどを加えてもおいしいですよ。",
      isPublic,
    },
    {
      userId,
      name: "特製パラパラチャーハン",
      description:
        "東京・代々木上原にある、一つ星店「sio」の鳥羽周作シェフに教えていただいたレシピを、クラシルで再現！今回は、やみつきな料理のご紹介です。万能お米を使うことでご家庭で簡単にパラパラのチャーハンをお作りいただけます。今回のレシピはクラシルYouTubeの「鳥羽周作の◯◯な料理 vol.23」でもご紹介しております。ぜひチェックしてみてくださいね。",
      isPublic,
    },
  ] satisfies Insertable<Recipe>[];

  return (
    <>
      {typeof q === "string" ? (
        <>
          <Title>「{q}」で検索</Title>
          <ul>
            {recipes
              .filter(({ name }) => name.includes(q))
              .map(({ name }, index) => (
                <li key={index}>{name}</li>
              ))}
          </ul>
        </>
      ) : (
        <>
          <Title>話題のレシピ</Title>
          <ul>
            {recipes.map(({ name }, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
