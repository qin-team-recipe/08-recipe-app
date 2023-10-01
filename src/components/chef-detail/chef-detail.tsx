import Link from "next/link";
import { notFound } from "next/navigation";

import { Selectable } from "kysely";
import { getServerSession } from "next-auth";
import { HiArrowLeft } from "react-icons/hi2";
import { TbSettingsFilled } from "react-icons/tb";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { LinksMenu } from "@/components/links-menu";
import { ShareButton } from "@/components/share-button";
import { ChefFollowButton, getIsFollowedByFollowerUserId, UserChefDetail } from "@/features/users";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserLink } from "@/types/db";

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
  if (!session || !session.user) {
    notFound();
  }
  const userLinks = chefInfo.userLinks.map((userLink, index) => ({ ...userLink, index }));

  const isFollowedByLoginUser = await getIsFollowedByFollowerUserId(chefInfo.id, session.user.id);

  return (
    <div className="flex w-full flex-col px-4 pt-4">
      <div
        className={cn(
          "mb-2 flex items-start",
          session?.user && chefInfo.id === session.user.id && "justify-between",
          !session?.user || (chefInfo.id !== session.user.id && "justify-end"),
        )}
      >
        {session && session.user && chefInfo.id === session.user.id && (
          <Link href="/fav">
            <HiArrowLeft size={24} />
          </Link>
        )}
        <div className={"flex items-center gap-x-3 text-2xl"}>
          <LinksMenu<Pick<Selectable<UserLink>, "id" | "url" | "category"> & { index: number }> links={userLinks} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1 py-4">
          <h1 className="text-xl font-bold text-mauve-12">{chefInfo.name}</h1>
          {/* ここはあえて残しています。figmaでは下記ユーザーIDを出す仕様でしたが我々の判断で表示しない仕様にしたので */}
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
      {session && session && session.user.id === chefInfo.id ? (
        <Link href="/settings/profile">
          <Button
            variant="black"
            className="-mr-0.5 inline-flex w-full items-center justify-center rounded-md border border-transparent  px-3 py-1 text-sm leading-none  hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:disabled:-mb-4 disabled:opacity-50"
          >
            <TbSettingsFilled color="white" className="hover:fill-mauve-12" />
            プロフィールを編集
          </Button>
        </Link>
      ) : (
        <ChefFollowButton
          initialIsFollowed={isFollowedByLoginUser}
          chefId={chefInfo.id}
          loginUserId={session.user.id}
        />
      )}
    </div>
  );
}
