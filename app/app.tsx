import { redirect } from "next/navigation";

export default function Home() {
  redirect("/operator/dashboard");
  return null; // Harus mengembalikan sesuatu (JSX)
}
