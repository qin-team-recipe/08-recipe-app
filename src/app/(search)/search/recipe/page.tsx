export default function Page({
  searchParams: { q },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (typeof q !== "string") {
    return <main>recipe</main>;
  }

  return (
    <main>
      <h2 className="text-mauve-normal font-bold">「{q}」で検索</h2>
    </main>
  );
}
