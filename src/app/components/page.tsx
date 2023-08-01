import Link from "next/link";

export default function Page() {
  return (
    <main className="grid gap-4 p-4">
      <Link href={"/components/button"} className={"hover:text-blue-11 hover:underline"}>
        Buttonコンポーネント
      </Link>
      <Link href={"/components/tab/1"} className={"hover:text-blue-11 hover:underline"}>
        Tabコンポーネント
      </Link>
      <Link href={"/components/recipe-list-item"} className={"hover:text-blue-11 hover:underline"}>
        RecipeListItemコンポーネント
      </Link>
      <Link href={"/components/horizontal_small_chef_list"} className={"hover:text-blue-11 hover:underline"}>
        Horizontal_Small_Chef_Listコンポーネント
      </Link>
    </main>
  );
}
