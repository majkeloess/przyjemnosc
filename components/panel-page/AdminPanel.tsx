import { getReservationsExtended } from "@/lib/queries";
import { ReservationExtended, User } from "@/types/types";
import { getStatus } from "../ui/getStatus";
import { formatDate, formatTime } from "@/lib/utils";

const ReservationAdminTableHeader = () => {
  return (
    <thead>
      <tr className="text-sm uppercase">
        <th className="text-left p-2">Data</th>
        <th className="text-left p-2">Godzina</th>
        <th className="text-left p-2">Username</th>
        <th className="text-left p-2">Email</th>
        <th className="text-left p-2">Nr stolika</th>
        <th className="text-left p-2">Osoby</th>
        <th className="text-left p-2">Status</th>
        <th className="text-left p-2">Źródło</th>
        <th className="text-left p-2">Uwagi</th>
      </tr>
    </thead>
  );
};

const ReservationAdminTableRow = ({
  reservation,
}: {
  reservation: ReservationExtended;
}) => {
  return (
    <tr className="border-t hover:bg-bronzelog/20">
      <td className="p-2">{formatDate(reservation.start_time)}</td>
      <td className="p-2">{formatTime(reservation.start_time)}</td>
      <td className="p-2">{reservation.username}</td>
      <td className="p-2">{reservation.email}</td>
      <td className="p-2">{reservation.table_number}</td>
      <td className="p-2">{reservation.capacity}</td>
      <td className="p-2">{getStatus(reservation)}</td>
      <td className="p-2">{reservation.source}</td>
      <td className="p-2">{reservation.notes}</td>
    </tr>
  );
};

const ReservationAdminTable = ({
  reservations,
}: {
  reservations: ReservationExtended[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <ReservationAdminTableHeader />
        <tbody>
          {reservations.map((reservation) => (
            <ReservationAdminTableRow
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default async function AdminPanel({ userData }: { userData: User }) {
  const reservations = await getReservationsExtended();

  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <h1 className="text-2xl font-medium uppercase text-center">
        Panel administracyjny
      </h1>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-medium uppercase text-bronzelog">
          Rezerwacje
        </h2>
        <div className="flex flex-col gap-4 max-w-[95vw] lg:max-w-[90vw] mx-auto">
          <ReservationAdminTable reservations={reservations} />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-medium uppercase text-bronzelog">
          Zarezerwuj stolik
        </h2>
      </section>
    </div>
  );
}
