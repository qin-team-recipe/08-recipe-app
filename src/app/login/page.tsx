import { Login } from "@/components/login";

export default function Page({
  searchParams: { callbackUrl },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Login imgSrc="/images/fav-login.png" callbackUrl={typeof callbackUrl === "string" ? callbackUrl : undefined} />
  );
}
