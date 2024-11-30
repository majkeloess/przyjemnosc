import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

function LoginForm() {
  return (
    <div>
      <h3 className="uppercase font-medium text-2xl">
        Dobrze cię znowu widzieć!
      </h3>
      <form className="mt-6" action="">
        <div className="flex flex-col">
          <label htmlFor="email">e-mail</label>
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
          <div className="flex flex-row mt-4 gap-4 items-center">
            <Button text="Zaloguj!" />
            <div>
              <p className="leading-3">Jesteś u nas pierwszy raz? </p>
              <Link href="/rejestracja">
                <p className="text-bronzelog underline">
                  Zarejestruj się tutaj!
                </p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
