import AdminReservationForm from "@/components/panel-page/admin/AdminReservationForm";
import LeftArrow from "@/components/svg/LeftArrow";
import { getTableCapacity } from "@/lib/queries";
import Link from "next/link";

export default async function CreateReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const capacities = await getTableCapacity();
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-2xl font-medium uppercase text-center">
          Stwórz rezerwację
        </h1>
        <Link href="/rezerwacje/panel">
          <LeftArrow />
        </Link>
      </div>
      <AdminReservationForm userId={userId} capacities={capacities} />
    </div>
  );
}
