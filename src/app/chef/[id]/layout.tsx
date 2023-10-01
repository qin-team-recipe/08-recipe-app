import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { jsonArrayFrom } from "kysely/helpers/mysql";
import { getServerSession } from "next-auth";

import { Button } from "@/components/button/button";
import { ChefDetail } from "@/components/chef-detail/chef-detail";
import { Tabs } from "@/components/tabs/tabs";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { RecipeStatus } from "@/types/enums";

const getChefById = cache(async (id: string) => {
  return await db.selectFrom("User").selectAll().where("id", "=", id).executeTakeFirst();
});

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  const chef = await getChefById(id);

  return { title: chef && chef.name ? `${chef.name}/一流レシピ` : "シェフ詳細/一流レシピ" };
}

export default async function Layout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

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
      .where("status", "=", RecipeStatus.public)
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
      {session && session.user && params.id === session.user.id && (
        <Link href="/recipe/create">
          <Button
            size="md"
            variant="tomato"
            className="fixed bottom-20 left-1/2 h-12 w-48 -translate-x-1/2 rounded-full px-3 py-2 text-base shadow-md md:bottom-10 md:ml-16"
          >
            <span className="font-bold">マイレシピ</span>を追加する
          </Button>
        </Link>
      )}
    </main>
  );
}
