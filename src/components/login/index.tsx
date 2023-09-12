"use client";

import { FC } from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { TbBrandApple, TbBrandGoogle } from "react-icons/tb";

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
        <button
          className="flex h-fit gap-x-1 rounded bg-blue-9 px-3 py-2 text-sm font-bold leading-[17px] text-whitea-13 hover:bg-blue-10"
          onClick={() => {
            signIn("google");
          }}
        >
          <TbBrandGoogle className="h-4 w-4 stroke-[3]" />
          <span>Googleログイン</span>
        </button>
        <button
          className="flex h-fit gap-x-1 rounded bg-mauve-12 px-3 py-2 text-sm font-bold leading-[17px] text-whitea-13 hover:opacity-90"
          onClick={() => {
            signIn("apple");
          }}
        >
          <TbBrandApple className="h-4 w-4 stroke-[3]" />
          <span>Appleログイン</span>
        </button>
      </div>
    </div>
  );
};
