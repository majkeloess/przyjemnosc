import { ReservationSource } from "@/types/types";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTime = (date: Date) => {
  const time = new Date(date);
  return time.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const sourceChanger = (source: ReservationSource) => {
  if (source === "page") {
    return "Strona";
  }
  return "Telefon";
};
