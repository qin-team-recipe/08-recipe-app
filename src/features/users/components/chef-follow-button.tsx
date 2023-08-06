"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";

export const ChefFollowButton = () => {
  const [isFollow, setFollow] = useState(false);
  const toggleFollow = () => setFollow(!isFollow);

  return isFollow ? (
    <Button onClick={toggleFollow}>フォローする</Button>
  ) : (
    <Button variant="tomatoOutline" onClick={toggleFollow}>
      フォロー中
    </Button>
  );
};
