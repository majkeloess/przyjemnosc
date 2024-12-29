import React from "react";
import Button from "@/components/ui/Button";
import { createUser } from "@/lib/mutations";

function RejestracjaForm() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    await createUser(formData);
  };

  return (
    <form className="mt-6" action={handleSubmit}>
      // ... existing input fields ...
    </form>
  );
}

export default RejestracjaForm;
