import Link from "next/link";

import { FiAlertCircle } from "react-icons/fi";
import { HiArrowUpRight, HiChevronRight } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";

export default function Page() {
  return (
    <div>
      <h2 className="mt-5 px-4 font-bold leading-[19px]">利用規約や問い合わせ</h2>
      <div className="mt-3 flex flex-col">
        {/* TODO: リンクの設定 */}
        <Link href="/" className="flex justify-between px-4 py-3">
          <span>利用規約</span>
          <HiChevronRight className="h-6 w-6" />
        </Link>
        {/* TODO: リンクの設定 */}
        <Link href="/" className="flex justify-between px-4 py-3">
          <span>プライバシーポリシー</span>
          <HiChevronRight className="h-6 w-6" />
        </Link>
        {/* TODO: リンクの設定 */}
        <a
          href="https://www.google.com/"
          rel="noopener nofollow"
          target="_blank"
          className="flex justify-between px-4 py-3"
        >
          <span>運営会社</span>
          <HiArrowUpRight className="h-6 w-6" />
        </a>
        {/* TODO: リンクの設定 */}
        <a
          href="https://www.google.com/"
          rel="noopener nofollow"
          target="_blank"
          className="flex justify-between px-4 py-3"
        >
          <span>お問い合わせ</span>
          <HiArrowUpRight className="h-6 w-6" />
        </a>
      </div>
      <h2 className="mt-8 px-4 font-bold leading-[19px]">アカウントの操作</h2>
      <div className="mt-3 flex flex-col">
        <Link href="/" className="flex justify-between px-4 py-3">
          <span>ログアウト</span>
          <MdLogout className="h-6 w-6" />
        </Link>
      </div>
      <h2 className="mt-8 px-4 font-bold leading-[19px]">取り消しができない操作</h2>
      <div className="mt-3 flex flex-col">
        {/* TODO: モーダル表示 */}
        <button className="flex justify-between px-4 py-3">
          <span>退会する</span>
          <FiAlertCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
