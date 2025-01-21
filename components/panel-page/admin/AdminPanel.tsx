import {
  getReservationsExtended,
  getAllUsers,
  getAllStats,
} from "@/lib/queries";
import { User } from "@/types/types";
import AdminSelect from "./AdminSelect";

export default async function AdminPanel({
  userData,
  capacities,
}: {
  userData: User;
  capacities: number[];
}) {
  const reservations = await getReservationsExtended();
  const users = await getAllUsers();
  const statistics = await getAllStats();
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <h1 className="text-2xl font-medium uppercase text-center">
        Panel administracyjny
      </h1>
      <section className="flex flex-col gap-4 justify-center items-center">
        <AdminSelect
          users={users}
          reservations={reservations}
          userData={userData}
          capacities={capacities}
          statistics={statistics}
        />
      </section>
    </div>
  );
}
