"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { TbShare } from "react-icons/tb";
import { RWebShare } from "react-web-share";

export function ShareButton({ size, text, url, title }: { size: number; text?: string; url?: string; title?: string }) {
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
  const pathname = usePathname();
  const shareText = !text && typeof document !== "undefined" && document.title ? document.title : "一流レシピ";

  return (
    <RWebShare
      data={{
        text: text ?? shareText,
        url: url ?? `${origin}${pathname}`,
        title,
      }}
    >
      <button>
        <TbShare size={size} />
      </button>
    </RWebShare>
  );
}
