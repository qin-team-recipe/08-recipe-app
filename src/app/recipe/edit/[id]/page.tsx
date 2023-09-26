export default function Page({ params: { id } }: { params: { id: string } }) {
  return <div>レシピ詳細の編集: {id}</div>;
}
