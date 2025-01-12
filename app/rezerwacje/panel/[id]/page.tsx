import { getTableCapacity, getUser } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

export default async function PanelPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const userData = await getUser(params.id);
    const capacities = await getTableCapacity();

    if (!userData) {
      redirect("/rezerwacje");
    }

    return (
      <div>
        <div>
          <h2>Witaj, {userData.username}</h2>
        </div>
        <div className="flex flex-col gap-4 xl:flex-row">
          <section className="xl:w-1/2">
            <h3>Zarezerwuj stolik</h3>
            <div>
              <label htmlFor="capacity">Wybierz liczbę osób</label>
              <select id="capacity" name="capacity">
                {capacities.map((capacity) => (
                  <option key={capacity} value={capacity}>
                    {capacity}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date">Wybierz datę</label>
              <input
                type="date"
                id="date"
                name="date"
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
              />
            </div>
            <div>
              <label htmlFor="time">Wybierz godzinę</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: 21 }, (_, i) => {
                  const hour = Math.floor(i / 2) + 12;
                  const minutes = i % 2 === 0 ? "00" : "30";
                  const timeString = `${hour}:${minutes}`;
                  return (
                    <button
                      key={timeString}
                      type="button"
                      className="px-3 py-1 border border-bronzelog rounded-lg hover:bg-bronzelog hover:text-white transition-colors"
                    >
                      {timeString}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="xl:w-1/2">Twoje rezerwacje</section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    redirect("/rezerwacje");
  }
}
