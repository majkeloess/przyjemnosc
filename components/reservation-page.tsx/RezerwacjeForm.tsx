import React from "react";
import Button from "@/components/ui/Button";
import { createUser } from "@/lib/mutations";

function RejestracjaForm() {
  return (
    <form className="mt-6" action={createUser}>
      <div className="flex flex-col">
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
          <Button type="submit" text="Utwórz konto!" />
          <button type="submit">test</button>
        </div>
      </div>
    </form>
  );
}

export default RejestracjaForm;
