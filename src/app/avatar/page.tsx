import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";

export default function page() {
  return (
    <Avatar>
      <AvatarImage src="/images/chef_04.jpeg" />
      <AvatarFallback>画像</AvatarFallback>
    </Avatar>
  );
}
