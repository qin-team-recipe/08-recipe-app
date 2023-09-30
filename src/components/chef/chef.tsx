import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  name: string | null;
  image: string | null;
};

export const Chef: FC<Props> = (props) => {
  const { image, name, id } = props;

  return (
    <Link href={`/chef/${id}`} className="relative z-[1] w-fit shrink-0">
      <div className="rounded-2xl shadow-[inset_0_-60px_60px_0_rgba(0,0,0,0.5)]">
        <Image
          // TODO: imageには絶対パス、相対パス、nullが入るので出し分ける関数を作成する
          src={`/images${image}` || "/images/no-image.jpg"}
          alt={name || "シェフの画像"}
          width={140}
          height={160}
          className="relative z-[-1] h-[160px] w-[140px] rounded-2xl"
        />
      </div>
      <span className="absolute bottom-2.5 left-2 line-clamp-2 font-semibold leading-tight text-whitea-13">{name}</span>
    </Link>
  );
};
