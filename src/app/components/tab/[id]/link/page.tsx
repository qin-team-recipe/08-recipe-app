import Link from "next/link";

export default function Page() {
  return (
    <main className="grid gap-4 p-4">
      <Link href={"/components"} className={"hover:text-blue-11 hover:underline"}>
        戻る
      </Link>
    </main>
  );
}
