"use client";

import { ReservationExtended, User } from "@/types/types";
import AdminReservationTable from "./AdminReservationTable";
import AdminReservationForm from "./AdminReservationForm";
import { SetStateAction, Dispatch, useState } from "react";
import AdminUsersTable from "./AdminUsersTable";

const AdminPanelChoiceList: AdminPanelChoiceType[] = [
  "rezerwacje",
  "tworzenie rezerwacji",
  "uzytkownicy",
  "walidacja kodow",
  "statystyki",
];

type AdminPanelChoiceType =
  | "rezerwacje"
  | "tworzenie rezerwacji"
  | "uzytkownicy"
  | "walidacja kodow"
  | "statystyki";

const AdminSelectButtonArea = ({
  panelChoice,
  setPanelChoice,
}: {
  panelChoice: AdminPanelChoiceType;
  setPanelChoice: Dispatch<SetStateAction<AdminPanelChoiceType>>;
}) => {
  return (
    <section className="flex flex-row gap-4">
      {AdminPanelChoiceList.map((choice) => (
        <AdminSelectButton
          currentChoice={panelChoice}
          key={choice}
          choice={choice}
          setPanelChoice={setPanelChoice}
        />
      ))}
    </section>
  );
};

const AdminSelectButton = ({
  currentChoice,
  choice,
  setPanelChoice,
}: {
  currentChoice: AdminPanelChoiceType;
  choice: AdminPanelChoiceType;
  setPanelChoice: Dispatch<SetStateAction<AdminPanelChoiceType>>;
}) => {
  return (
    <button
      className={`text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full ${
        currentChoice === choice ? "bg-bronzelog text-white" : ""
      }`}
      onClick={() => setPanelChoice(choice)}
    >
      {choice}
    </button>
  );
};

const AdminSelect = ({
  reservations,
  userData,
  capacities,
  users,
}: {
  reservations: ReservationExtended[];
  userData: User;
  capacities: number[];
  users: User[];
}) => {
  const [panelChoice, setPanelChoice] =
    useState<AdminPanelChoiceType>("rezerwacje");

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <div className="flex flex-row justify-center">
        <AdminSelectButtonArea
          panelChoice={panelChoice}
          setPanelChoice={setPanelChoice}
        />
      </div>
      <div className="flex flex-col gap-4 justify-center">
        {panelChoice === "rezerwacje" && (
          <AdminReservationTable reservations={reservations} />
        )}
        {panelChoice === "tworzenie rezerwacji" && (
          <AdminReservationForm userId={userData.id} capacities={capacities} />
        )}
        {panelChoice === "uzytkownicy" && <AdminUsersTable users={users} />}
      </div>
    </div>
  );
};

export default AdminSelect;
