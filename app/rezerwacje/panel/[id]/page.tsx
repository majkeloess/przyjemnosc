import {
  getReservations,
  getTableCapacity,
  getUser,
  getUserReservations,
} from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";
import { createReservation } from "@/lib/mutations";
import RezerwacjaForm from "@/components/reservation-page.tsx/RezerwacjaForm";

export default async function PanelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    const userData = await getUser(id);
    const capacities = await getTableCapacity();
    const reservations = await getReservations();
    const userReservations = await getUserReservations(id);

    if (!userData) {
      redirect("/rezerwacje");
    }

    return (
      <div className="flex flex-col gap-4 mx-auto max-w-2xl w-full px-4 h-[80dvh] mt-4">
        <div className="flex justify-center uppercase text-2xl font-medium">
          <h2>Witaj, {userData.username}</h2>
        </div>
        <div className="flex flex-col gap-4">
          <RezerwacjaForm userId={id} capacities={capacities} />
          <section className="flex flex-col gap-4">
            <h3 className="uppercase text-xl font-medium text-bronzelog">
              Twoje rezerwacje
            </h3>
            <div className="flex flex-col gap-2">
              {userReservations.length === 0 && (
                <div className="text-center my-4">
                  Nie zrobiłeś jeszcze żadnej rezerwacji, zarezerwuj już dziś i
                  zanurz się w tradycji polskiej kuchni.
                </div>
              )}
              {userReservations.map((reservation) => (
                <div key={reservation.id}>
                  {reservation.start_time.toLocaleString()}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    redirect("/rezerwacje");
  }
}
