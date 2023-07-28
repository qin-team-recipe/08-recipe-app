export const UserType = {
  general: "general",
  chef: "chef",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];
