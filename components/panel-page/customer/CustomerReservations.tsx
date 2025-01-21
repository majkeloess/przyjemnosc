import React from "react";
import { Reservation, ReservationWithTable } from "@/types/types";
import { getStatus } from "@/components/ui/getStatus";
import { formatDate, formatTime } from "@/lib/utils";

const ReservationRow = ({
  reservation,
}: {
  reservation: ReservationWithTable;
}) => {
  return (
    <div className="grid grid-cols-4 w-full">
      <span className="text-center text-sm xl:text-base">
        {formatDate(reservation.start_time)}
      </span>
      <span className="text-center text-sm xl:text-base">
        {formatTime(reservation.start_time)}
      </span>
      <span className="text-center text-sm xl:text-base">
        {reservation.table_number}
      </span>
      <span className="text-center text-sm xl:text-base">
        {getStatus(reservation)}
      </span>
    </div>
  );
};

function CustomerReservations({
  userReservations,
}: {
  userReservations: Reservation[];
}) {
  return (
    <section className="flex flex-col gap-4 xl:w-1/3">
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
        <div className="grid grid-cols-4 w-full font-medium mb-2">
          <span className="text-center text-sm xl:text-base">Data</span>
          <span className="text-center text-sm xl:text-base">Godzina</span>
          <span className="text-center text-sm xl:text-base">Stolik</span>
          <span className="text-center text-sm xl:text-base">Status</span>
        </div>
        {userReservations.map((reservation) => (
          <ReservationRow key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </section>
  );
}

export default CustomerReservations;
