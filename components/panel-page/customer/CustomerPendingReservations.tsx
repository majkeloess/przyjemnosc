import { Reservation } from "@/types/types";
import ReservationRow, { ReservationHeader } from "./ReservationRow";

export default function CustomerPendingReservations({
  userReservations,
}: {
  userReservations: Reservation[];
}) {
  return (
    <section className="flex flex-col gap-4 p-4 shadow-md rounded-xl bg-white h-fit">
      <h3 className="uppercase text-xl font-medium text-bronzelog">
        Twoje nadchodzące rezerwacje
      </h3>
      <div className="flex flex-col gap-2">
        <ReservationHeader action={true} />
        {userReservations.map((reservation) => (
          <ReservationRow
            key={reservation.id}
            reservation={reservation}
            action={true}
          />
        ))}
      </div>
    </section>
  );
}
