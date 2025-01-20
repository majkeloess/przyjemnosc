"use client";
import React, { useState } from "react";
import { createUser } from "@/lib/mutations";
import RejestracjaModal from "../modals/RejestracjaModal";

function RejestracjaForm() {
  const [isSucessModalOpen, setIsSucessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClose = () => {
    setIsSucessModalOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await createUser(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      setIsSucessModalOpen(true);
    }
  };

  return (
    <>
      <form className="mt-6" action={handleSubmit}>
        <div className="flex flex-col">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <label htmlFor="username">nazwa użytkownika</label>
          <input
            className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl w-[70vw] xl:w-[20vw]"
            type="text"
            name="username"
            id="username"
            required
          />
          <label htmlFor="email">e-mail</label>
          <input
            className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl w-[70vw] xl:w-[20vw]"
            type="email"
            name="email"
            id="email"
            required
          />
          <label htmlFor="password">hasło</label>
          <input
            className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl w-[70vw] xl:w-[20vw]"
            type="password"
            name="password"
            id="password"
            required
          />
          <label htmlFor="confirm-password">powtórz hasło</label>
          <input
            className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl w-[70vw] xl:w-[20vw]"
            type="password"
            name="confirm-password"
            id="confirm-password"
            required
          />
          <input type="hidden" name="type" value="customer" />
          <div className="flex flex-row mt-4 gap-4 items-center">
            <button
              className="text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full"
              type="submit"
            >
              Utwórz konto!
            </button>
          </div>
        </div>
      </form>
      <RejestracjaModal isOpen={isSucessModalOpen} onClose={onClose} />
    </>
  );
}

export default RejestracjaForm;
