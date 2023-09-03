export default function Page({
  searchParams: { q },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (typeof q !== "string") {
    return <main>chef</main>;
  }

  return (
    <main className="px-4 py-5">
      <h2 className="text-mauve-normal font-bold">「{q}」で検索</h2>
    </main>
  );
}
