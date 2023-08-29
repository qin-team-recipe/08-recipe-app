import { getServerSession } from "next-auth";

import { Login } from "@/components/login";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return <Login />;

  return (
    <main>
      <p>{session && `${session.user?.name} でログイン中`}</p>
    </main>
  );
}
