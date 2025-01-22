import { editUser } from "@/lib/mutations";
import { useState } from "react";

const EditUserForm = ({
  userId,
  setIsEditModalOpen,
}: {
  userId: string;
  setIsEditModalOpen: (isOpen: boolean) => void;
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await editUser(userId, formData);
    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-medium uppercase text-center">
        Edytuj użytkownika
      </h1>
      <form
        action={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="username">nazwa użytkownika</label>
          <input
            className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl "
            type="text"
            name="username"
            id="username"
          />
          <label htmlFor="email">e-mail</label>
          <input
            className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl "
            type="email"
            name="email"
            id="email"
          />

          <div className="flex flex-row mt-4 gap-4 items-center">
            <button
              className="bg-bronzelog border-[2px]  text-white px-6 py-2 rounded-full"
              type="submit"
            >
              Zapisz
            </button>
            <button
              className="text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full"
              type="button"
              onClick={() => setIsEditModalOpen(false)}
            >
              Anuluj
            </button>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};

export default EditUserForm;
