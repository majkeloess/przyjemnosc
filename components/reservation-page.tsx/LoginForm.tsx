"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        router.push(`/rezerwacje/panel/${data.user.id}`);
      }
    } catch (err) {
      console.error("Błąd logowania:", err);
      setError("Nieprawidłowy email lub hasło");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="uppercase font-medium text-2xl">
        Dobrze cię znowu widzieć!
      </h3>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">e-mail</label>
          <input
            className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex flex-row mt-4 gap-4 items-center">
            <button
              className="text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Zaloguj!"}
            </button>
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
