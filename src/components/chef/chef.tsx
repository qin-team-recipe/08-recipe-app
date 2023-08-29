import { FC } from "react";
import Image from "next/image";

type Props = {
  imageSrc: string;
  name: string;
};

export const Chef: FC<Props> = (props) => {
  const { imageSrc, name } = props;

  return (
    <div className="relative z-[1] w-fit shrink-0">
      <div className="rounded-2xl shadow-[inset_0_-60px_60px_0_rgba(0,0,0,0.5)]">
        <Image
          src={imageSrc}
          alt={name}
          width={140}
          height={160}
          className="relative z-[-1] h-[160px] w-[140px] rounded-2xl"
        />
      </div>
      <span className="absolute bottom-2.5 left-2 line-clamp-2 font-semibold leading-tight text-whitea-13">{name}</span>
    </div>
  );
};
