import AdminNav from "@/components/panel-page/admin/AdminNav";
import AdminReservationTable from "@/components/panel-page/admin/AdminReservationTable";
import { getReservationsExtended, getTableCapacity } from "@/lib/queries";

export default async function AdminReservationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { reservations, total } = await getReservationsExtended({
    page: 1,
    pageSize: 15,
  });
  const capacities = await getTableCapacity();

  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <AdminNav userId={id} />
      <AdminReservationTable
        initialReservations={reservations}
        initialTotal={total}
        capacities={capacities}
      />
    </div>
  );
}
