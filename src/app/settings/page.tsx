import Link from "next/link";

import { TbAlertCircle, TbArrowUpRight, TbChevronRight, TbLogout } from "react-icons/tb";

export default function Page() {
  return (
    <div>
      <h2 className="mt-5 px-4 font-bold leading-[19px]">利用規約や問い合わせ</h2>
      <div className="mt-3 flex flex-col">
        {/* TODO: リンクの設定 */}
        <Link href="/" className="flex justify-between px-4 py-3">
          <span>利用規約</span>
          <TbChevronRight className="h-6 w-6" />
        </Link>
        {/* TODO: リンクの設定 */}
        <Link href="/" className="flex justify-between px-4 py-3">
          <span>プライバシーポリシー</span>
          <TbChevronRight className="h-6 w-6" />
        </Link>
        {/* TODO: リンクの設定 */}
        <a
          href="https://www.google.com/"
          rel="noopener nofollow"
          target="_blank"
          className="flex justify-between px-4 py-3"
        >
          <span>運営会社</span>
          <TbArrowUpRight className="h-6 w-6" />
        </a>
        {/* TODO: リンクの設定 */}
        <a
          href="https://www.google.com/"
          rel="noopener nofollow"
          target="_blank"
          className="flex justify-between px-4 py-3"
        >
          <span>お問い合わせ</span>
          <TbArrowUpRight className="h-6 w-6" />
        </a>
      </div>
      <h2 className="mt-8 px-4 font-bold leading-[19px]">アカウントの操作</h2>
      <div className="mt-3 flex flex-col">
        <Link href="/" className="flex justify-between px-4 py-3">
          <span>ログアウト</span>
          <TbLogout className="h-6 w-6" />
        </Link>
      </div>
      <h2 className="mt-8 px-4 font-bold leading-[19px]">取り消しができない操作</h2>
      <div className="mt-3 flex flex-col">
        {/* TODO: モーダル表示 */}
        <button className="flex justify-between px-4 py-3">
          <span>退会する</span>
          <TbAlertCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
