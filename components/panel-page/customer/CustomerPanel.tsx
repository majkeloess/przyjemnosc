import { getUserReservations } from "@/lib/queries";
import RezerwacjaForm from "@/components/reservation-page.tsx/RezerwacjaForm";
import { User } from "@/types/types";
import CustomerLoyaltyCodes from "./CustomerLoyaltyCodes";
import CustomerReservations from "./CustomerReservations";
import CustomerPendingReservations from "./CustomerPendingReservations";
export default async function CustomerPanel({
  userData,
  capacities,
}: {
  userData: User;
  capacities: number[];
}) {
  const userReservations = await getUserReservations(userData.id);

  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4">
      <div className="flex justify-center uppercase text-2xl font-medium">
        <h2>Witaj, {userData.username}</h2>
      </div>
      <div className="flex flex-col gap-8 mb-12 xl:flex-row xl:justify-center py-4 xl:px-48">
        <div className="flex flex-col gap-4 xl:w-1/2">
          <RezerwacjaForm userId={userData.id} capacities={capacities} />
          <CustomerLoyaltyCodes userId={userData.id} />
          <CustomerPendingReservations
            userReservations={userReservations.filter(
              (reservation) => reservation.status === "pending"
            )}
          />
        </div>
        <div className="flex flex-col gap-4 xl:w-1/2">
          <CustomerReservations
            userReservations={userReservations.filter(
              (reservation) => reservation.status !== "pending"
            )}
          />
        </div>
      </div>
    </div>
  );
}
