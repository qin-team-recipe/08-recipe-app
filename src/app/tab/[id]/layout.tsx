import { Tab, Tabs } from "@/components/tabs/tabs";

export default function layout({ params }: { params: { id: number } }) {
  const tabList: Tab[] = [
    {
      name: "レシピ",
      href: `/tab/${params.id}`,
    },
    {
      name: "リンク",
      href: `/tab/${params.id}/link`,
    },
  ];
  return <Tabs tabList={tabList}></Tabs>;
}
