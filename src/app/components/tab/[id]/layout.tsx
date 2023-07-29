import { Tabs } from "@/components/tabs/tabs";

export default function Layout({ params, children }: { params: { id: number }; children: React.ReactNode }) {
  return (
    <div>
      <Tabs
        tabList={[
          {
            name: "レシピ",
            href: `/components/tab/${params.id}`,
          },
          {
            name: "リンク",
            href: `/components/tab/${params.id}/link`,
          },
        ]}
      />
      {children}
    </div>
  );
}
