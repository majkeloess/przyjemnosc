"use client";
import { getStatus } from "@/components/ui/getStatus";
import { cancelReservation } from "@/lib/mutations";
import { formatTime } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { ReservationWithTable } from "@/types/types";

export const ReservationHeader = ({ action = false }: { action?: boolean }) => {
  return (
    <div
      className={`grid ${
        action ? "grid-cols-5" : "grid-cols-4"
      } w-full font-medium mb-2`}
    >
      <span className="text-center text-sm xl:text-base">Data</span>
      <span className="text-center text-sm xl:text-base">Godzina</span>
      <span className="text-center text-sm xl:text-base">Stolik</span>
      <span className="text-center text-sm xl:text-base">Status</span>
      {action && (
        <span className="text-center text-sm xl:text-base">Akcja</span>
      )}
    </div>
  );
};

export default function ReservationRow({
  reservation,
  action = false,
}: {
  reservation: ReservationWithTable;
  action?: boolean;
}) {
  return (
    <div className={`grid ${action ? "grid-cols-5" : "grid-cols-4"} w-full`}>
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
      {action && (
        <div className="text-center h-full flex items-center justify-center">
          <button
            onClick={async () => {
              await cancelReservation(reservation.id, reservation.user_id);
            }}
            className="inline-block border border-red-500 hover:bg-red-500 text-red-500 px-2 py-1 rounded-lg transition-colors text-sm hover:text-white"
          >
            Anuluj
          </button>
        </div>
      )}
    </div>
  );
}
