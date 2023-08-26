import { FC, memo, ReactNode } from "react";
import Image from "next/image";

type Props = {
  imageSrc: string;
  name: string;
};

export const Chef: FC<Props> = (props) => {
  const { imageSrc, name } = props;

  return (
    <div className="relative w-fit">
      <Image
        src={imageSrc}
        alt={name}
        width={140}
        height={160}
        // TODO: insetの記述が間違っているので修正する
        className="h-[160px] w-[140px] rounded-2xl shadow-[inset_0_-60px_60px_0_rgba(0,0,0,0.5)]"
      />
      <span className="absolute bottom-2.5 left-2 line-clamp-2 font-semibold leading-tight text-whitea-13">{name}</span>
    </div>
  );
};
