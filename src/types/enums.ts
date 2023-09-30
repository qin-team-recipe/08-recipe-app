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
  other: "other",
} as const;
export type LinkCategory = (typeof LinkCategory)[keyof typeof LinkCategory];
export const RecipeStatus = {
  public: "public",
  private: "private",
  draft: "draft",
} as const;
export type RecipeStatus = (typeof RecipeStatus)[keyof typeof RecipeStatus];
