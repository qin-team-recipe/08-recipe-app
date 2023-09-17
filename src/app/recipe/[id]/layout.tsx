import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { HiArrowLeft } from "react-icons/hi2";

import { Tabs } from "@/components/tabs/tabs";
import { LinksMenu } from "@/features/link";
import {
  getFavoriteCountByRecipeId,
  getRecipeById,
  getRecipeLinksById,
  RecipeFavoriteButton,
} from "@/features/recipes";
import { getUserByRecipeId } from "@/features/users";

export default async function layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const recipe = await getRecipeById(id);
  const recipeUser = await getUserByRecipeId(id);
  if (!recipe || !recipeUser) {
    redirect(`/`);
  }
  const recipeLinks = await getRecipeLinksById(id);
  console.log("recipeLinks", recipeLinks);
  const recipeFavoriteCount = await getFavoriteCountByRecipeId(id);

  return (
    <main>
      <div className={"relative aspect-square bg-cover bg-no-repeat shadow-['0px_-60px_16px_-40px_#FFF_inset']"}>
        <Image className="object-contain" src={`/images${recipe.imgSrc}`} fill alt={recipe.name} />
        <Link href="/">
          <button
            type={"button"}
            className={"text-mauve-normal absolute left-5 top-5 rounded-full bg-blacka-7 p-1 hover:bg-blacka-8"}
          >
            <HiArrowLeft className={"text-[32px] text-mauve-1"} />
          </button>
        </Link>
      </div>
      <div className={"space-y-3 p-4"}>
        <div className={"flex items-start justify-between"}>
          <h1 className={"max-w-[250px] text-xl font-bold"}>{recipe.name}</h1>
          <LinksMenu recipeLinks={recipeLinks} />
        </div>
        <p>{recipe.description}</p>
        <div className={"flex items-center gap-x-4"}>
          <Link className={"group flex items-center gap-x-1 text-sm"} href={`/chef/${recipeUser.id}`}>
            <div className={"h-5 w-5 rounded-full bg-tomato-5"} />
            <div className={"sm:group-hover:underline"}>{recipeUser.name ?? "名前登録中のシェフ"}</div>
          </Link>
          <div className={"text-sm"}>
            <span className={"mr-0.5 font-bold"}>{recipeFavoriteCount}</span>
            <span>お気に入り</span>
          </div>
        </div>
        <RecipeFavoriteButton />
      </div>
      <Tabs
        tabList={[
          {
            name: "作り方",
            href: `/recipe/${id}`,
          },
          {
            name: "材料",
            href: `/recipe/${id}/ingredients`,
          },
        ]}
      />
      {children}
    </main>
  );
}
