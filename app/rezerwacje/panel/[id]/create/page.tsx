import AdminReservationForm from "@/components/panel-page/admin/AdminReservationForm";
import AdminNav from "@/components/panel-page/admin/AdminNav";
import { getTableCapacity } from "@/lib/queries";

export default async function CreateReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const capacities = await getTableCapacity();
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <AdminNav userId={userId} />
      <AdminReservationForm userId={userId} capacities={capacities} />
    </div>
  );
}
