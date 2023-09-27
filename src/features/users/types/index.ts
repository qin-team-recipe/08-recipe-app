import { Selectable } from "kysely";

import { User } from "@/types/db";

export type UserChefDetail = Pick<Selectable<User>, "id" | "name" | "image" | "profileText">;
