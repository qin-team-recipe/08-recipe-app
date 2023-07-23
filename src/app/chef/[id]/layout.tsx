import { ChefDetail } from "@/components/chef-detail/chef-detail";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <ChefDetail />
      {children}
    </main>
  );
}
