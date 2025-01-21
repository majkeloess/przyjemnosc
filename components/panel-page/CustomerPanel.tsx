import { getUserReservations } from "@/lib/queries";
import RezerwacjaForm from "@/components/reservation-page.tsx/RezerwacjaForm";
import { User } from "@/types/types";
import CustomerReservations from "./CustomerReservations";
import CustomerLoyaltyCodes from "./CustomerLoyaltyCodes";

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
      <div className="flex flex-col gap-8 mb-12 xl:flex-row xl:justify-center">
        <RezerwacjaForm userId={userData.id} capacities={capacities} />
        <CustomerReservations userReservations={userReservations} />
        <CustomerLoyaltyCodes userId={userData.id} />
      </div>
    </div>
  );
}
