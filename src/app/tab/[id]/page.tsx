import { Tab, Tabs } from "@/components/tabs/tabs";

const tabList: Tab[] = [
  {
    name: "レシピ",
    href: { pathname: `/tab/1` },
  },
  {
    name: "リンク",
    href: { pathname: `/tab/2` },
  },
];
export default function Page() {
  return <Tabs tabList={tabList}></Tabs>;
}
