import LogoutButton from "@/components/ui/LogoutButton";
import AdminSelect from "./AdminSelect";

const AdminNav = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-col justify-between items-center gap-4 w-full">
      <div className="flex items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-medium uppercase text-center">
          Panel administracyjny
        </h1>
        <LogoutButton />
      </div>
      <AdminSelect userId={userId} />
    </div>
  );
};

export default AdminNav;
