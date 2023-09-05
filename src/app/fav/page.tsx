import Link from "next/link";

import { getServerSession } from "next-auth";
import { TbMenu } from "react-icons/tb";

import { Login } from "@/components/login";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen w-full text-mauve-12">
      <div className="flex h-12 items-center justify-between gap-x-4 border-b border-mauve-6 px-4 py-3">
        <Link href="/settings">
          <TbMenu className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold leading-6">お気に入り</h1>
        <div className="h-6 w-6"></div>
      </div>
      {session ? <p>{session && `${session.user?.name} でログイン中`}</p> : <Login imgSrc="/images/fav-login.png" />}
    </main>
  );
}
