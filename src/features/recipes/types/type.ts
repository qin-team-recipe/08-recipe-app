import { Updateable } from "kysely";
import { z } from "zod";

import { Recipe } from "@/types/db";

export const RecipeUpdateSchema = z.object({}) satisfies Updateable<Recipe>;
