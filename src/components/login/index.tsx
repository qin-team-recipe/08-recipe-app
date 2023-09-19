"use client";

import { FC } from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { TbBrandApple, TbBrandGoogle } from "react-icons/tb";

import { Button } from "@/components/button/button";

type Props = {
  imgSrc: string;
};

export const Login: FC<Props> = ({ imgSrc }) => {
  return (
    <div className="flex flex-col items-center gap-y-5 pt-5">
      <div className="">
        <Image src={imgSrc} width={200} height={200} alt="" />
      </div>
      <div className="">
        <p className="text-center font-bold">ログインをお願いします</p>
        <p className="mt-3 text-center text-mauve-12">こちらの機能を利用するにはログインが必要です</p>
      </div>
      <div className="flex gap-x-3">
        <Button
          className="gap-x-1"
          variant="blue"
          size="md"
          onClick={() => {
            signIn("google");
          }}
        >
          <TbBrandGoogle className="h-4 w-4 stroke-[3]" />
          <span className="text-sm font-bold">Googleログイン</span>
        </Button>
        <Button
          className="gap-x-1"
          variant="black"
          size="md"
          onClick={() => {
            signIn("apple");
          }}
        >
          <TbBrandApple className="h-4 w-4 stroke-[3]" />
          <span className="text-sm font-bold">Appleログイン</span>
        </Button>
      </div>
    </div>
  );
};
