import AdminLoyaltyCodes from "@/components/panel-page/admin/AdminLoyaltyCodes";
import AdminNav from "@/components/panel-page/admin/AdminNav";
import LeftArrow from "@/components/svg/LeftArrow";
import Link from "next/link";

export default async function LoyaltyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <AdminNav userId={id} />
      <AdminLoyaltyCodes />
    </div>
  );
}
