"use client";

import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/button/button";

export function Login() {
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
    </main>
  );
}
