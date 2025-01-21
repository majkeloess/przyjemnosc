"use client";
import { useState } from "react";
import { createReservation } from "@/lib/mutations";
import ReservationApprovedModal from "@/components/modals/ReservationApprovedModal";
interface ReservationFormProps {
  userId: string;
  capacities: number[];
}

const AdminReservationForm = ({ userId, capacities }: ReservationFormProps) => {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isReservationApprovedModalOpen, setIsReservationApprovedModalOpen] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createReservation(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      setIsReservationApprovedModalOpen(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-center xl:max-w-2xl items-center mx-auto">
      <form action={handleSubmit} className="w-full flex flex-col gap-4">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input type="hidden" name="user_id" value={userId} />
        <input type="hidden" name="start_time" value={selectedTime} />
        <input type="hidden" name="source" value="phone" />
        <section className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-2">
              <label htmlFor="notes">
                Dodatkowe informacje (np. imię i nazwisko)
              </label>
              <textarea
                className="bg-back px-4 text-bronzelog border-2 border-black rounded-xl"
                name="notes"
                id="notes"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-bronzelog text-white px-4 py-2 rounded-xl disabled:opacity-50"
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
    </div>
  );
};

export default AdminReservationForm;
