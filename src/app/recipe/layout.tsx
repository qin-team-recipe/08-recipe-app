import Link from "next/link";

import { HiArrowLeft } from "react-icons/hi2";

import { Tabs } from "@/components/tabs/tabs";
import { LinksMenu } from "@/features/link";
import { RecipeFavoriteButton } from "@/features/recipes";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div
        className={
          "relative aspect-square bg-[url('http://localhost:9000/app-recipe/recipes/RecipeImage.png')] bg-cover bg-no-repeat shadow-['0px_-60px_16px_-40px_#FFF_inset']"
        }
      >
        <button
          type={"button"}
          className={"text-mauve-normal absolute left-5 top-5 rounded-full bg-blacka-7 p-1 hover:bg-blacka-8"}
        >
          <HiArrowLeft className={"text-[32px] text-mauve-1"} />
        </button>
      </div>
      <div className={"space-y-3 p-4"}>
        <div className={"flex items-start justify-between"}>
          <h1 className={"max-w-[250px] text-xl font-bold"}>グラタングラタングラタングラタングラタン</h1>
          <LinksMenu />
          {/* <div className={"flex items-center gap-x-3 text-2xl"}>
            <button type={"button"}>
              <SlSocialYoutube />
            </button>
            <button type={"button"}>
              <IoLogoInstagram />
            </button>
            <button type={"button"}>
              <HiOutlineEllipsisHorizontalCircle />
            </button>
          </div> */}
        </div>
        <p>
          レシピとは、一般的には料理の作り方を指示した手順のことを指します。レシピには、必要な食材とその量、調理手順、調理時間、提供人数、料理の写真などが含まれます。特に家庭料理やプロのシェフが作る料理の方法を他人が再現できるように、または新しい料理を作るためのアイデアとして共有されます。
        </p>
        <div className={"flex items-center gap-x-4"}>
          <Link className={"group flex items-center gap-x-1 text-sm"} href={"/"}>
            <div className={"h-5 w-5 rounded-full bg-tomato-5"} />
            <div className={"sm:group-hover:underline"}>こたろシェフ</div>
          </Link>
          <div className={"text-sm"}>
            <span className={"mr-0.5 font-bold"}>1,234</span>
            <span>お気に入り</span>
          </div>
        </div>
        <RecipeFavoriteButton />
      </div>
      <Tabs
        tabList={[
          {
            name: "作り方",
            href: `/recipe`,
          },
          {
            name: "材料",
            href: `/`,
          },
        ]}
      />
      {children}
    </main>
  );
}
