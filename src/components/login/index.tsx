"use client";

import { useSearchParams } from "next/navigation";

import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/button/button";

export function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = (() => {
    if (!searchParams) return "/";
    const callbackUrl = searchParams.get("callbackUrl");
    if (!callbackUrl) return "/";
    return callbackUrl;
  })();

  return (
    <main>
      <Button
        variant="blue"
        onClick={() => {
          signIn("google", { callbackUrl });
        }}
      >
        Googleでログイン
      </Button>
    </main>
  );
}
