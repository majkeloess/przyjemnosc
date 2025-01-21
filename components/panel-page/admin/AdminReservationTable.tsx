import { formatTime, sourceChanger } from "@/lib/utils";
import { getStatus } from "@/components/ui/getStatus";
import { formatDate } from "@/lib/utils";

import { ReservationExtended } from "@/types/types";

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
      <td className="p-2">{sourceChanger(reservation.source)}</td>
      <td className="p-2">{reservation.notes}</td>
    </tr>
  );
};

const AdminReservationTable = ({
  reservations,
}: {
  reservations: ReservationExtended[];
}) => {
  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default AdminReservationTable;
