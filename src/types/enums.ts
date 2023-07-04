export const UserType = {
  user: "user",
  chef: "chef",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];
export const LinkCategory = {
  twitter: "twitter",
  facebook: "facebook",
  instagram: "instagram",
  tiktok: "tiktok",
  youtube: "youtube",
  other: "other",
} as const;
export type LinkCategory = (typeof LinkCategory)[keyof typeof LinkCategory];
