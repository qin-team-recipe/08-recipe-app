import { getServerSession } from "next-auth";

import Login from "@/components/login";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Login session={session} />
    </main>
  );
}
