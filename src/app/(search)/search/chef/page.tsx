import { Title } from "@/features/search";

export default function Page({
  searchParams: { q },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <>{typeof q === "string" ? <Title>「{q}」で検索</Title> : <Title>シェフ一覧</Title>}</>;
}
