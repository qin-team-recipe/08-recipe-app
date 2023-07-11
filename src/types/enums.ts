export const UserType = {
  general: "general",
  chef: "chef",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];
export const LinkCategory = {
  twitter: "twitter",
  facebook: "facebook",
  instagram: "instagram",
  tiktok: "tiktok",
  youtube: "youtube",
  hp: "hp",
  other: "other",
} as const;
export type LinkCategory = (typeof LinkCategory)[keyof typeof LinkCategory];
