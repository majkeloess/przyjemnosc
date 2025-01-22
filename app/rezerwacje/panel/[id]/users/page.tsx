import AdminNav from "@/components/panel-page/admin/AdminNav";
import AdminUsersTable from "@/components/panel-page/admin/AdminUsersTable";
import LeftArrow from "@/components/svg/LeftArrow";
import { getAllUsers } from "@/lib/queries";
import Link from "next/link";

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const users = await getAllUsers();
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <AdminNav userId={id} />
      <AdminUsersTable users={users} />
    </div>
  );
}
