"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";

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

  return <Button text="Wyloguj" onClick={handleLogout} />;
}
