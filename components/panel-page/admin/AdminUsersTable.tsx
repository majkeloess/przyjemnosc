"use client";
import EditUserModal from "@/components/modals/EditUserModal";
import { deleteUser } from "@/lib/mutations";
import { User } from "@/types/types";
import { useState } from "react";

export default function AdminUsersTable({ users }: { users: User[] }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
  };

  const handleEditClick = (userId: string) => {
    setEditingUserId(userId);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUserId(null);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow max-w-6xl">
        <table className="w-full">
          <thead>
            <tr>
              <th className="hidden md:table-cell px-4 py-2">ID</th>
              <th className="px-4 py-2">Nazwa użytkownika</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Typ</th>
              <th className="px-4 py-2">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-bronzelog/30">
                <td className="hidden md:table-cell px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.type}</td>
                <td className="px-4 py-2 flex flex-row gap-2 justify-center items-center">
                  <button
                    onClick={() => handleEditClick(user.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && editingUserId && (
        <EditUserModal
          userId={editingUserId}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
