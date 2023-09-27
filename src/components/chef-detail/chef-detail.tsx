import { HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2";
import { IoLogoInstagram } from "react-icons/io";
import { SlSocialYoutube } from "react-icons/sl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";
import { BackButton } from "@/components/chef-detail/back-button";
import { ChefFollowButton, UserChefDetail } from "@/features/users";

export const ChefDetail = ({
  chefInfo,
  followerCount,
  recipeCount,
}: {
  chefInfo: UserChefDetail;
  followerCount: number;
  recipeCount: number;
}) => {
  return (
    <div className="flex w-full flex-col px-4 pt-4">
      <div className="mb-2 flex items-start justify-between">
        <BackButton />
        {/* リンクボタンはコンポーネント化予定 */}
        <div className={"flex items-center gap-x-3 text-2xl"}>
          <button type={"button"}>
            <SlSocialYoutube />
          </button>
          <button type={"button"}>
            <IoLogoInstagram />
          </button>
          <button type={"button"}>
            <HiOutlineEllipsisHorizontalCircle />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1 py-4">
          <h1 className="text-xl font-bold text-mauve-12">{chefInfo.name}</h1>
          <p className="text-sm text-mauve-12">{chefInfo.id}</p>
        </div>
        <Avatar>
          <AvatarImage src={chefInfo.image ?? undefined} />
          <AvatarFallback>シェフ</AvatarFallback>
        </Avatar>
      </div>
      <p className="pb-2 text-mauve-12">{chefInfo.profileText}</p>
      <div className="flex items-center gap-x-4 pb-4 text-sm text-mauve-11">
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
      <ChefFollowButton />
    </div>
  );
};
