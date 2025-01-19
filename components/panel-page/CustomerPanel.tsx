import { getTableCapacity, getUserReservations } from "@/lib/queries";
import RezerwacjaForm from "@/components/reservation-page.tsx/RezerwacjaForm";
import { User } from "@/types/types";
import CustomerReservations from "./CustomerReservations";

export default async function CustomerPanel({ userData }: { userData: User }) {
  const capacities = await getTableCapacity();
  const userReservations = await getUserReservations(userData.id);

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-2xl w-full px-4 h-[80dvh] mt-4">
      <div className="flex justify-center uppercase text-2xl font-medium">
        <h2>Witaj, {userData.username}</h2>
      </div>
      <div className="flex flex-col gap-4">
        <RezerwacjaForm userId={userData.id} capacities={capacities} />
        <CustomerReservations userReservations={userReservations} />
      </div>
    </div>
  );
}
