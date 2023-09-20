import Link from "next/link";

import { getServerSession } from "next-auth";
import { TbAlertCircle, TbArrowLeft, TbArrowUpRight, TbChevronRight } from "react-icons/tb";

import { Logout } from "@/features/settings";
import { authOptions } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen w-full text-mauve-12">
      <div className="flex h-12 items-center gap-x-4 border-b px-4 py-3">
        {/* TODO: リンクの差し替え */}
        <Link href="/fav">
          <TbArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold leading-6">設定</h1>
      </div>
      <h2 className="mt-5 px-4 font-bold">利用規約や問い合わせ</h2>
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
      {session && (
        <>
          <h2 className="mt-8 px-4 font-bold">アカウントの操作</h2>
          <div className="mt-3 flex flex-col">
            <Logout />
          </div>
          <h2 className="mt-8 px-4 font-bold">取り消しができない操作</h2>
          <div className="mt-3 flex flex-col">
            {/* TODO: モーダル表示 */}
            <button className="flex justify-between px-4 py-3">
              <span>退会する</span>
              <TbAlertCircle className="h-6 w-6" />
            </button>
          </div>
        </>
      )}
    </main>
  );
}
