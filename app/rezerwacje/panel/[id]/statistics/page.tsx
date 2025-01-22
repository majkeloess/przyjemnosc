import AdminNav from "@/components/panel-page/admin/AdminNav";
import AdminStatistics from "@/components/panel-page/admin/AdminStatistics";
import { getAllStats } from "@/lib/queries";

export default async function StatisticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const statistics = await getAllStats();
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <AdminNav userId={id} />
      <AdminStatistics statistics={statistics} />
    </div>
  );
}
