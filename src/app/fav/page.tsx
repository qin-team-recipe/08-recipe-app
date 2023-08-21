import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <p>{session && `${session.user?.name} でログイン中`}</p>
    </main>
  );
}
