import { redirect } from "next/navigation";

export default function Home() {
  redirect("/administrator/dashboard");
  return null; // Harus mengembalikan sesuatu (JSX)
}
