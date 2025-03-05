"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LandingPage() {
  const router = useRouter();

  const selectRole = (role: string) => {
    Cookies.set("userRole", role, { expires: 1 }); // Simpan role di cookies selama 7 hari
    router.push(`/${role}/dashboard`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Pilih Peran Anda</h1>
      <div className="flex space-x-4">
        <button onClick={() => selectRole("operator")} className="p-4 bg-blue-500 text-white rounded">
          Operator
        </button>
        <button onClick={() => selectRole("pj")} className="p-4 bg-green-500 text-white rounded">
          PJ
        </button>
        <button onClick={() => selectRole("ppk")} className="p-4 bg-yellow-500 text-white rounded">
          PPK
        </button>
        <button onClick={() => selectRole("bendahara")} className="p-4 bg-red-500 text-white rounded">
          Bendahara
        </button>
      </div>
    </div>
  );
}
