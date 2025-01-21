import { TrashIcon } from "@/components/svg/TrashIcon";
import { User } from "@/types/types";
import { useState } from "react";

export default function AdminUsersTable({ users }: { users: User[] }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleDeleteUser = (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="w-full overflow-x-auto flex justify-center">
        <table className="max-w-6xl border-spacing-2 w-full">
          <thead>
            <tr>
              <th className="p-2 xl:p-3">ID</th>
              <th className="p-2 xl:p-3">Nazwa użytkownika</th>
              <th className="p-2 xl:p-3">Email</th>
              <th className="p-2 xl:p-3">Typ</th>
              <th className="p-2 xl:p-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 xl:p-3">{user.id}</td>
                <td className="p-2 xl:p-3">{user.username}</td>
                <td className="p-2 xl:p-3">{user.email}</td>
                <td className="p-2 xl:p-3">{user.type}</td>
                <td className="p-2 xl:p-3 flex flex-row gap-2 justify-center items-center">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
