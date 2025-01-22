import { User } from "@/types/types";
import AdminSelect from "./AdminSelect";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function AdminPanel({
  userData,
  capacities,
}: {
  userData: User;
  capacities: number[];
}) {
  return (
    <div className="flex flex-col gap-4 mx-auto w-full px-4 min-h-[80dvh] mt-4 mb-12">
      <div className="flex justify-center items-center flex-row gap-4">
        <h1 className="text-2xl font-medium uppercase text-center">
          Panel administracyjny
        </h1>
        <LogoutButton />
      </div>
      <section className="flex flex-col gap-4 justify-center items-center">
        <AdminSelect userId={userData.id} />
      </section>
    </div>
  );
}
