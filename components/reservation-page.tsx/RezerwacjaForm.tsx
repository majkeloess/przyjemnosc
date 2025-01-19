"use client";

import { useState } from "react";
import { createReservation } from "@/lib/mutations";
import ReservationApprovedModal from "../ui/ReservationApprovedModal";
interface ReservationFormProps {
  userId: string;
  capacities: number[];
}

export default function RezerwacjaForm({
  userId,
  capacities,
}: ReservationFormProps) {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isReservationApprovedModalOpen, setIsReservationApprovedModalOpen] =
    useState(false);

  return (
    <form action={createReservation} className="flex flex-col gap-4">
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="start_time" value={selectedTime} />

      <section className="flex flex-col gap-4">
        <h3 className="uppercase text-xl font-medium text-bronzelog">
          Zarezerwuj stolik
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="table_id">Wybierz liczbę osób</label>
            <select
              className="bg-back px-4 text-bronzelog border-2 border-bronzelog rounded-xl w-full"
              id="table_id"
              name="table_id"
              required
            >
              {capacities.map((capacity) => (
                <option key={capacity} value={capacity}>
                  {capacity}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date">Wybierz datę</label>
            <input
              className="bg-back px-4 text-bronzelog border-2 border-bronzelog rounded-xl w-full"
              type="date"
              id="date"
              name="date"
              required
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time">Wybierz godzinę</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from({ length: 21 }, (_, i) => {
                const hour = Math.floor(i / 2) + 12;
                const minutes = i % 2 === 0 ? "00" : "30";
                const timeString = `${hour}:${minutes}`.padStart(5, "0");
                return (
                  <button
                    key={timeString}
                    type="button"
                    onClick={() => setSelectedTime(timeString)}
                    className={`px-3 py-1 border border-bronzelog rounded-lg hover:bg-bronzelog hover:text-white transition-colors w-[72px] text-center ${
                      selectedTime === timeString
                        ? "bg-bronzelog text-white"
                        : ""
                    }`}
                  >
                    {timeString}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setIsReservationApprovedModalOpen(true)}
            type="submit"
            className="bg-bronzelog text-white px-4 py-2 rounded-xl"
            disabled={!selectedTime}
          >
            Złóż rezerwację!
          </button>
        </div>
      </section>
      <ReservationApprovedModal
        isOpen={isReservationApprovedModalOpen}
        onClose={() => setIsReservationApprovedModalOpen(false)}
      />
    </form>
  );
}
