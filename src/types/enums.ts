export const UserType = {
  USER: "user",
  CHEF: "chef",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];
export const UserChefLinkCategory = {
  TWITTER: "twitter",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  TIKTOK: "tiktok",
  YOUTUBE: "youtube",
  OTHER: "other",
} as const;
export type UserChefLinkCategory = (typeof UserChefLinkCategory)[keyof typeof UserChefLinkCategory];
