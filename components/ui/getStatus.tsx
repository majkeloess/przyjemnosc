import { Reservation } from "@/types/types";
import { TrashIcon } from "../svg/TrashIcon";
import { cancelReservation } from "@/lib/mutations";

export const getStatus = (reservation: Reservation) => {
  if (reservation.status === "cancelled")
    return <span className="text-red-600">ANULOWANA</span>;
  if (reservation.status === "done")
    return <span className="text-green-700">ODBYTA</span>;
  return (
    <div className="flex justify-center items-center gap-2">
      <span className="text-blue-600">POTWIERDZONA</span>
      <button
        onClick={async () => {
          await cancelReservation(reservation.id, reservation.user_id);
        }}
      >
        <TrashIcon height="20px" width="20px" color="#2563eb" />
      </button>
    </div>
  );
};
