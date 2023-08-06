import { ChefDetail } from "@/components/chef-detail/chef-detail";
import { Tabs } from "@/components/tabs/tabs";

export default function Layout({ params, children }: { params: { id: number }; children: React.ReactNode }) {
  return (
    <main className="flex w-full flex-col items-start gap-5 self-stretch">
      <ChefDetail />
      <Tabs
        tabList={[
          {
            name: "新着レシピ",
            href: `/chef/${params.id}`,
          },
          {
            name: "人気レシピ",
            href: `/chef/${params.id}/popular`,
          },
        ]}
      ></Tabs>
      {children}
    </main>
  );
}
