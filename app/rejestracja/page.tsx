import RejestracjaForm from "@/components/reservation-page.tsx/RezerwacjeForm";
import RezerwacjeForm from "@/components/reservation-page.tsx/RezerwacjeForm";
import Button from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

function RejestracjaPage() {
  return (
    <section className="h-[60dvh] flex justify-center items-center">
      <RejestracjaForm />
    </section>
  );
}

export default RejestracjaPage;
