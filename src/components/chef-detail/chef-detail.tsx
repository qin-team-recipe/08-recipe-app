import { HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2";
import { IoLogoInstagram } from "react-icons/io";
import { SlSocialYoutube } from "react-icons/sl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";
import { BackButton } from "@/components/chef-detail/back-button";
import { ChefFollowButton } from "@/features/users";

export const ChefDetail = () => {
  // デザイン用の仮の値
  const chef_detail_info = {
    name: "山々駄々シェフ",
    user_id: "yamada19990101",
    image_path: "/images/chef_04.jpeg",
    detail:
      "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。",
    recipe_count: 2345,
    follower_count: 1234,
  };

  return (
    <div className="p-4">
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
          <h1 className="text-xl font-bold text-mauve-12">{chef_detail_info.name}</h1>
          <p className="text-sm text-mauve-12">{chef_detail_info.user_id}</p>
        </div>
        <Avatar>
          <AvatarImage src={chef_detail_info.image_path} />
          <AvatarFallback>シェフ</AvatarFallback>
        </Avatar>
      </div>
      <p className="pb-2 text-mauve-12">{chef_detail_info.detail}</p>
      <div className="flex items-center gap-x-4 pb-4 text-sm text-mauve-11">
        {[
          [chef_detail_info.recipe_count, "レシピ"],
          [chef_detail_info.follower_count, "フォロワー"],
        ].map(([count, unit], index) => (
          <div key={index} className="flex items-center gap-x-1">
            <span className="font-bold">{count}</span>
            <span>{unit}</span>
          </div>
        ))}
      </div>
      {/* フォローするボタンはコンポーネント化予定 */}
      <ChefFollowButton />
    </div>
  );
};
