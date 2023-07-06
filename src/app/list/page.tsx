import { revalidatePath } from "next/cache";

import { IconType } from "react-icons/lib";
import { TbChevronDown, TbChevronUp, TbDotsVertical, TbPlus, TbShoppingCartX, TbToolsKitchen } from "react-icons/tb";

import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ListMenuItem,
  ModeToggle,
  MyList,
  ThemeProvider,
} from "@/features/list";
import { db } from "@/lib/kysely";
import { seed } from "@/lib/seed/list";

export default async function Page() {
  function moveUp(index: number) {
    return async () => {
      "use server";
      if (index <= 1) return;
      const recipeList = await db.selectFrom("List").selectAll().orderBy("index").execute();
      const beforeList = recipeList
        .filter(({ index: currentIndex }) => currentIndex === index || currentIndex === index - 1)
        .map(({ id, index }) => ({ id, index }));
      console.log(beforeList);
      const afterList = [
        { ...beforeList[0], index: beforeList[1].index },
        { ...beforeList[1], index: beforeList[0].index },
      ];
      console.log(afterList);
      await Promise.all(
        afterList.map(async ({ id, index }) => {
          await db.updateTable("List").set({ index }).where("id", "=", id).executeTakeFirst();
        })
      );
      revalidatePath("/list");
    };
  }
  function moveDown(index: number) {
    return async () => {
      "use server";
      const recipeList = await db.selectFrom("List").selectAll().orderBy("index").execute();
      if (index >= recipeList.length - 1) return;
      const beforeList = recipeList
        .filter(({ index: currentIndex }) => currentIndex === index || currentIndex === index + 1)
        .map(({ id, index }) => ({ id, index }));
      console.log(beforeList);
      const afterList = [
        { ...beforeList[0], index: beforeList[1].index },
        { ...beforeList[1], index: beforeList[0].index },
      ];
      console.log(afterList);
      await Promise.all(
        afterList.map(async ({ id, index }) => {
          await db.updateTable("List").set({ index }).where("id", "=", id).executeTakeFirst();
        })
      );
      revalidatePath("/list");
    };
  }

  const result = await db
    .selectFrom("List")
    .select(({ fn: { countAll } }) => [countAll<string>().as("listCount")])
    .executeTakeFirst();
  if (result && !Number(result.listCount)) {
    await seed();
  }
  const list = await db.selectFrom("List").selectAll().orderBy("index").execute();
  const myList = list.filter(({ recipeId }) => !recipeId).at(0);
  const memo = myList ? await db.selectFrom("Ingredient").selectAll().where("listId", "=", myList.id).execute() : [];
  const recipeList = list.filter(({ recipeId }) => !!recipeId);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <header className="bg-mauve-app border-mauve-dim flex items-center justify-between border-b px-4 py-3">
        <div className="h-6 w-6" />
        <h1 className="text-mauve-normal font-bold leading-6">買い物リスト</h1>
        <ModeToggle />
      </header>
      <main className="bg-mauve-app flex flex-col gap-12 pt-5">
        <MyList memo={memo} />
        {recipeList.map(async ({ id, name, index }) => {
          const ingredients = await db
            .selectFrom("Ingredient")
            .select(["id", "name", "isChecked"])
            .where("listId", "=", id)
            .execute();

          return (
            <div key={id} className="flex flex-col gap-y-3">
              <div className="flex items-end justify-between px-4">
                <h2 className="text-mauve-normal text-xl font-bold">{name}</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger className="-mb-0.5 -mr-0.5">
                    <TbDotsVertical className="text-mauve-dim" size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {(
                      [
                        { icon: TbToolsKitchen, text: "レシピ詳細を見る", action: undefined },
                        {
                          icon: TbChevronUp,
                          text: "上に移動する",
                          action: moveUp(index),
                        },
                        {
                          icon: TbChevronDown,
                          text: "下に移動する",
                          action: moveDown(index),
                        },
                        { icon: TbPlus, text: "買うものを追加する", action: undefined },
                      ] as const satisfies readonly {
                        icon: IconType;
                        text: string;
                        action?: () => Promise<void>;
                      }[]
                    ).map(({ icon, text, action }, itemIndex) => {
                      return (
                        <ListMenuItem
                          key={itemIndex}
                          icon={((Icon: IconType) => (
                            <Icon size={18} className="text-mauve-normal" />
                          ))(icon)}
                          text={text}
                          action={action}
                        />
                      );
                    })}
                    <DropdownMenuItem className="text-tomato-dim gap-1  focus:text-tomato-dim">
                      <TbShoppingCartX className="text-tomato-dim" size={18} />
                      リストから削除する
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ul className="border-mauve-dim divide-mauve-dim divide-y border-y">
                {ingredients.map(({ id, name, isChecked }) => (
                  <li key={id} className="flex items-center justify-between gap-x-2 px-4 py-2">
                    <div className="flex items-center py-1 pr-2">
                      <Checkbox value={isChecked} />
                    </div>
                    <label className="text-mauve-normal mr-auto">{name}</label>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </main>
    </ThemeProvider>
  );
}
