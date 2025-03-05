"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedRole = Cookies.get("role");
    if (savedRole) {
      setRole(savedRole);
      router.push(`/${savedRole}/dashboard`); // Redirect ke dashboard sesuai role
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
