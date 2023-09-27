import { notFound } from "next/navigation";

import { jsonArrayFrom } from "kysely/helpers/mysql";

import { ChefDetail } from "@/components/chef-detail/chef-detail";
import { Tabs } from "@/components/tabs/tabs";
import { db } from "@/lib/kysely";

export default async function Layout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
  const chefInfo = await db
    .selectFrom("User")
    .select(["User.id", "User.name", "User.image", "User.profileText"])
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("UserLink")
          .select(["UserLink.id", "UserLink.url", "UserLink.category"])
          .whereRef("UserLink.userId", "=", "User.id")
          .where("UserLink.deletedAt", "is", null),
      ).as("userLinks"),
    ])
    .where("User.id", "=", params.id)
    .executeTakeFirst();
  if (!chefInfo) {
    notFound();
  }
  const { followerCount } = (
    await db
      .selectFrom("UserFollow")
      .select(({ fn }) => [fn.count<number>("id").as("followerCount")])
      .where("followedUserId", "=", params.id)
      .where("deletedAt", "is", null)
      .execute()
  )[0];
  const { recipeCount } = (
    await db
      .selectFrom("Recipe")
      .select(({ fn }) => [fn.count<number>("id").as("recipeCount")])
      .where("userId", "=", params.id)
      .where("isPublic", "=", 1)
      .where("deletedAt", "is", null)
      .execute()
  )[0];

  return (
    <main className="flex w-full flex-col items-start gap-5 self-stretch">
      <ChefDetail chefInfo={chefInfo} followerCount={followerCount} recipeCount={recipeCount} />
      <Tabs
        tabList={[
          {
            name: "新着レシピ",
            href: `/chef/${params.id}`,
          },
          {
            name: "人気レシピ",
            href: `/chef/${params.id}/popular`,
          },
        ]}
        scroll={false}
      ></Tabs>
      {children}
    </main>
  );
}
