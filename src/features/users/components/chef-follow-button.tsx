"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { useRouter } from "next/navigation";

import { updateUserFollow } from "@/features/users";

export function ChefFollowButton({
  initialIsFollowed,
  chefId,
  loginUserId,
}: {
  initialIsFollowed?: boolean;
  chefId: string;
  loginUserId?: string;
}) {
  const router = useRouter();
  const [optimisticIsFollowed, optimisticSetIsFollowed] = useOptimistic(
    !!initialIsFollowed,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (state, _action: null) => !state,
  );

  const toggleFollow = async () => {
    if (!loginUserId) {
      router.push(`/login?callbackUrl=/chef/${chefId}`);
    } else {
      optimisticSetIsFollowed(null);
      await updateUserFollow(chefId, loginUserId, !optimisticIsFollowed);
    }
  };

  const followButtonToggleStyle = optimisticIsFollowed
    ? "border-tomato-normal text-tomato-dim"
    : "bg-tomato-solid border-transparent";

  return (
    <button
      onClick={toggleFollow}
      className={`mt-4 w-full rounded-md  border px-3 py-1 text-sm ${followButtonToggleStyle}`}
    >
      {optimisticIsFollowed ? "フォロー中" : "フォローする"}
    </button>
  );
}
