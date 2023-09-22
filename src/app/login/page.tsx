import { Login } from "@/components/login";

export default function Page({
  searchParams: { callbackUrl },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (typeof callbackUrl === "string") {
    return <Login imgSrc="/images/fav-login.png" callbackUrl={callbackUrl} />;
  }
  return <Login imgSrc="/images/fav-login.png" />;
}
