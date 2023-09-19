import Image from "next/image";
import Link from "next/link";

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
      <Link href="/" className="transition hover:text-blue-11 hover:underline">
        TOPに戻る
      </Link>
    </div>
  );
}
