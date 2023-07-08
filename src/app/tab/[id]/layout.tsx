import { Tabs } from "@/components/tabs/tabs";

export default function layout({ params }: { params: { id: number } }) {
  return (
    <Tabs
      tabList={[
        {
          name: "レシピ",
          href: `/tab/${params.id}`,
        },
        {
          name: "リンク",
          href: `/tab/${params.id}/link`,
        },
      ]}
    ></Tabs>
  );
}
