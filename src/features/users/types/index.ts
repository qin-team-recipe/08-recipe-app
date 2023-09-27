import { Selectable } from "kysely";

import { User, UserLink } from "@/types/db";

export type UserChefDetail = Pick<Selectable<User>, "id" | "name" | "image" | "profileText"> & {
  userLinks: Pick<Selectable<UserLink>, "id" | "url" | "category">[];
};
