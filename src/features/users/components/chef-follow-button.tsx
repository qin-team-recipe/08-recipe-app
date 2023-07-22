"use client";

import { useState } from "react";

export const ChefFollowButton = () => {
  const [isFollow, setFollow] = useState(false);
  const toggleFollow = () => setFollow(!isFollow);
  const followButtonToggleStyle = isFollow
    ? "bg-tomato-solid border-transparent"
    : "border-tomato-normal text-tomato-dim";

  return (
    <button onClick={toggleFollow} className={`w-full rounded-md  border px-3 py-1 text-sm ${followButtonToggleStyle}`}>
      {isFollow ? "フォローする" : "フォロー中"}
    </button>
  );
};
