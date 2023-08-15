"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";

import { Button } from "@/components/button/button";

export default function Login({ session }: { session: Session | null }) {
  return (
    <main>
      <Button
        variant="blue"
        onClick={() => {
          signIn("google");
        }}
      >
        Googleでログイン
      </Button>
      <p>{session && `${session.user?.name} でログイン中`}</p>
    </main>
  );
}
