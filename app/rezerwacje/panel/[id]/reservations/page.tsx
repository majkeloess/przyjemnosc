import AdminReservationTable from "@/components/panel-page/admin/AdminReservationTable";
import LeftArrow from "@/components/svg/LeftArrow";
import { getReservationsExtended, getTableCapacity } from "@/lib/queries";
import Link from "next/link";
export default async function AdminReservationsPage() {
  const { reservations, total } = await getReservationsExtended({
    page: 1,
    pageSize: 20,
  });
  const capacities = await getTableCapacity();

  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-2xl font-medium uppercase text-center">
          Rezerwacje
        </h1>
        <Link href="/rezerwacje/panel">
          <LeftArrow />
        </Link>
      </div>
      <AdminReservationTable
        initialReservations={reservations}
        initialTotal={total}
        capacities={capacities}
      />
    </div>
  );
}
