"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/rezerwacje");
      router.refresh();
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-back bg-bronzelog text-md rounded-full border-[2px] border-bronzelog  px-4 py-1"
    >
      Wyloguj
    </button>
  );
}
