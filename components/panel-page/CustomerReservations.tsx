import React from "react";
import { Reservation } from "@/types/types";

function CustomerReservations({
  userReservations,
}: {
  userReservations: Reservation[];
}) {
  return (
    <section className="flex flex-col gap-4">
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
        {userReservations.map((reservation) => (
          <div key={reservation.id}>
            {reservation.start_time.toLocaleString()}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerReservations;
