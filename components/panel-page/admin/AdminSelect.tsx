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
    <Link href={fullPath} className="flex justify-center whitespace-nowrap">
      <button
        className={`text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full text-sm ${
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
    <section className="flex flex-row flex-wrap justify-center gap-2 items-center w-full mx-auto">
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
  return <AdminSelectButtonArea userId={userId} />;
};

export default AdminSelect;
