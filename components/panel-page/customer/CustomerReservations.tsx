import React from "react";
import { Reservation } from "@/types/types";
import ReservationRow, { ReservationHeader } from "./ReservationRow";

function CustomerOldReservations({
  userReservations,
}: {
  userReservations: Reservation[];
}) {
  return (
    <section className="flex flex-col gap-4 p-4 shadow-md rounded-xl bg-white h-fit">
      <h3 className="uppercase text-xl font-medium text-bronzelog">
        Twoje rezerwacje
      </h3>
      <div className="flex flex-col gap-2">
        {userReservations.length === 0 && (
          <div className="text-center my-4">
            Nie zrobiłeś jeszcze żadnej rezerwacji, zarezerwuj już dziś i zanurz
            się w tradycji polskiej kuchni.
          </div>
        )}
        <ReservationHeader />
        {userReservations.map((reservation) => (
          <ReservationRow key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </section>
  );
}

export default CustomerOldReservations;
