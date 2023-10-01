import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { Login } from "@/components/login";
import { ProfileForm } from "@/features/users";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";

export default async function Page() {
  const session: Session | null = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (userId === undefined) {
    return <Login imgSrc="/images/list-login.png" />;
  }

  const profile = await db
    .selectFrom("User")
    .select(["id", "name", "image", "profileText"])
    .where("id", "=", userId)
    .execute();
  const urls = await db.selectFrom("UserLink").select(["id", "url"]).where("userId", "=", userId).execute();

  return (
    <div>
      <h1 className="border-b border-mauve-6 px-4 py-3 text-center text-xl font-bold">編集</h1>
      <ProfileForm
        userId={userId}
        defaultName={profile[0].name!}
        defaultImage={profile[0].image === null ? undefined : profile[0].image}
        defaultProfileText={profile[0].profileText === null ? undefined : profile[0].profileText}
        defaultUrls={urls.map((url) => url.url)}
      />
    </div>
  );
}
