import AdminUsersTable from "@/components/panel-page/admin/AdminUsersTable";
import LeftArrow from "@/components/svg/LeftArrow";
import { getAllUsers } from "@/lib/queries";
import Link from "next/link";

export default async function AdminUsersPage() {
  const users = await getAllUsers();
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-2xl font-medium uppercase text-center">
          Użytkownicy
        </h1>
        <Link href="/rezerwacje/panel">
          <LeftArrow />
        </Link>
      </div>
      <AdminUsersTable users={users} />
    </div>
  );
}
