import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
function RejestracjaForm() {
  return (
    <form className="mt-6" action="">
      <div className="flex flex-col">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="name">imię</label>
            <input
              className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl"
              type="name"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="surname">nazwisko</label>
            <input
              className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl"
              type="surname"
              name="surname"
              id="surname"
              required
            />
          </div>
        </div>
        <label className="mt-4" htmlFor="email">
          e-mail
        </label>
        <input
          className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl"
          type="email"
          name="email"
          id="email"
          required
        />
        <label className="mt-4" htmlFor="password">
          hasło
        </label>
        <input
          className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="password">powtórz hasło</label>
        <input
          className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl"
          type="repeat-password"
          name="repeat-password"
          id="repeat-password"
          required
        />
        <div className="flex flex-row mt-4 gap-4 items-center">
          <Button text="Utwórz konto!" />
        </div>
      </div>
    </form>
  );
}

export default RejestracjaForm;
