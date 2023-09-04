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
      <Link href={"/components/horizontal-small-chef-list"} className={"hover:text-blue-11 hover:underline"}>
        HorizontalSmallChefListコンポーネント
      </Link>
      <Link href={"/components/vertical-recipe-list"} className={"hover:text-blue-11 hover:underline"}>
        VerticalRecipeListコンポーネント
      </Link>
      <Link href={"/components/chef"} className={"hover:text-blue-11 hover:underline"}>
        Chefコンポーネント
      </Link>
      <Link href={"/components/horizontal-chef-list"} className={"hover:text-blue-11 hover:underline"}>
        HorizontalChefListコンポーネント
      </Link>
      <Link href={"/components/form"} className={"hover:text-blue-11 hover:underline"}>
        Formコンポーネント
      </Link>
    </main>
  );
}
