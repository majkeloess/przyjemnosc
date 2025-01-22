"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminPanelChoiceList: { label: string; path: string }[] = [
  { label: "rezerwacje", path: "reservations" },
  { label: "tworzenie rezerwacji", path: "create" },
  { label: "użytkownicy", path: "users" },
  { label: "walidacja kodów", path: "loyalty" },
  { label: "statystyki", path: "statistics" },
];

const AdminSelectButton = ({
  path,
  label,
  userId,
}: {
  path: string;
  label: string;
  userId: string;
}) => {
  const pathname = usePathname();
  const fullPath = `/rezerwacje/panel/${userId}/${path}`;

  return (
    <Link href={fullPath}>
      <button
        className={`text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full ${
          pathname === fullPath ? "bg-bronzelog text-white" : ""
        }`}
      >
        {label}
      </button>
    </Link>
  );
};

const AdminSelectButtonArea = ({ userId }: { userId: string }) => {
  return (
    <section className="flex flex-row gap-4 flex-wrap justify-center">
      {AdminPanelChoiceList.map((choice) => (
        <AdminSelectButton
          key={choice.path}
          path={choice.path}
          label={choice.label}
          userId={userId}
        />
      ))}
    </section>
  );
};

const AdminSelect = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <div className="flex flex-row justify-center">
        <AdminSelectButtonArea userId={userId} />
      </div>
    </div>
  );
};

export default AdminSelect;
