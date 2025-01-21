"use client";
import ValidLoyaltyCodeModal from "@/components/modals/ValidLoyaltyCodeModal";
import { validateLoyaltyCode } from "@/lib/mutations";
import { useState } from "react";

const AdminLoyaltyCodes = () => {
  const [isCodeValidModalOpen, setIsCodeValidModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoyaltyCode = async (formData: FormData) => {
    const code = formData.get("code");
    const result = await validateLoyaltyCode(code as string);
    if (result.error) {
      setError(result.error);
    } else {
      setIsCodeValidModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form
        action={handleLoyaltyCode}
        className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-xl shadow"
      >
        <h1 className="text-xl font-medium text-center">
          Wprowadź kod lojalnościowy
        </h1>
        <input
          type="text"
          name="code"
          className="bg-white px-4 py-2 text-bronzelog border-2 border-bronzelog rounded-xl  text-center text-2xl"
        />
        <button
          className="bg-bronzelog px-4 py-2 text-white rounded-xl"
          type="submit"
        >
          Zastosuj
        </button>
        {error && <div className="text-red-500 mb-4">{error}</div>}
      </form>
      <ValidLoyaltyCodeModal
        isOpen={isCodeValidModalOpen}
        onClose={() => setIsCodeValidModalOpen(false)}
      />
    </div>
  );
};

export default AdminLoyaltyCodes;
