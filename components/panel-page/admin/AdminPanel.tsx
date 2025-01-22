import { User } from "@/types/types";
import AdminSelect from "./AdminSelect";
import LogoutButton from "@/components/ui/LogoutButton";
import AdminNav from "./AdminNav";

export default async function AdminPanel({
  userData,
  capacities,
}: {
  userData: User;
  capacities: number[];
}) {
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <AdminNav userId={userData.id} />
      <div className="text-center text-6xl font-medium uppercase mt-20">
        Witaj, adminie!
      </div>
      <p className="text-center text-2xl text-gray-500 font-normal">
        Mam nadzieję, że masz dobry dzień!
      </p>
    </div>
  );
}
