import React from "react";
import { Reservation } from "@/types/types";
import { getStatus } from "../ui/getStatus";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ReservationRow = ({ reservation }: { reservation: Reservation }) => {
  return (
    <div className="grid grid-cols-3 w-full">
      <span className="text-center">{formatDate(reservation.start_time)}</span>
      <span className="text-center">{formatTime(reservation.start_time)}</span>
      <span className="text-center">{getStatus(reservation)}</span>
    </div>
  );
};

function CustomerReservations({
  userReservations,
}: {
  userReservations: Reservation[];
}) {
  return (
    <section className="flex flex-col gap-4 mb-12">
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
        <div className="grid grid-cols-3 w-full font-medium mb-2">
          <span className="text-center">Data</span>
          <span className="text-center">Godzina</span>
          <span className="text-center">Status</span>
        </div>
        {userReservations.map((reservation) => (
          <ReservationRow key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </section>
  );
}

export default CustomerReservations;
