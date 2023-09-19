import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-y-5 pt-5">
      <div>
        <Image src="/images/404.png" width={200} height={200} alt="404" />
      </div>
      <div>
        <p className="text-center font-bold">お探しのページが見つかりません</p>
        <p className="mt-3 text-center text-mauve-12">
          あなたがアクセスしたページは削除されたかURLが変更されているため表示することができません。
        </p>
      </div>
    </div>
  );
}
