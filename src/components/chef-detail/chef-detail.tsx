import Link from "next/link";

import { getServerSession } from "next-auth";
import { HiArrowLeft } from "react-icons/hi2";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";
import { ShareButton } from "@/components/share-button";
import { ChefFollowButton, UserChefDetail } from "@/features/users";
import { authOptions } from "@/lib/auth";

export async function ChefDetail({
  chefInfo,
  followerCount,
  recipeCount,
}: {
  chefInfo: UserChefDetail;
  followerCount: number;
  recipeCount: number;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex w-full flex-col px-4 pt-4">
      <div className="mb-2 flex items-start justify-between">
        {session && session.user && chefInfo.id === session.user.id && (
          <Link href="/fav">
            <HiArrowLeft size={24} />
          </Link>
        )}
        {/* リンクボタンはコンポーネント化予定 */}
        <div className={"flex items-center gap-x-3 text-2xl"}>{/* <LinksMenu links={chefInfo.userLinks} /> */}</div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1 py-4">
          <h1 className="text-xl font-bold text-mauve-12">{chefInfo.name}</h1>
          {/* <p className="text-sm text-mauve-12">{chefInfo.id}</p> */}
        </div>
        <Avatar>
          <AvatarImage src={chefInfo.image ?? undefined} />
          <AvatarFallback>シェフ</AvatarFallback>
        </Avatar>
      </div>
      <p className="pb-2 text-mauve-12">{chefInfo.profileText}</p>
      <section className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-x-4 text-sm text-mauve-11">
          {[
            [recipeCount, "レシピ"],
            [followerCount, "フォロワー"],
          ].map(([count, unit], index) => (
            <div key={index} className="flex items-center gap-x-1">
              <span className="font-bold">{count}</span>
              <span>{unit}</span>
            </div>
          ))}
        </div>
        <ShareButton size={16} />
      </section>
      <ChefFollowButton />
    </div>
  );
}
