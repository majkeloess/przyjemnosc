"use client";

import { useCallback, useState } from "react";
import { formatTime, sourceChanger } from "@/lib/utils";
import { getStatus } from "@/components/ui/getStatus";
import { formatDate } from "@/lib/utils";
import { ReservationExtended } from "@/types/types";
import debounce from "lodash/debounce";

const ReservationAdminTableHeader = () => {
  return (
    <thead>
      <tr className="text-sm uppercase">
        <th className="text-left p-2">Data</th>
        <th className="text-left p-2">Godzina</th>
        <th className="text-left p-2">Username</th>
        <th className="text-left p-2">Email</th>
        <th className="text-left p-2">Nr stolika</th>
        <th className="text-left p-2">Osoby</th>
        <th className="text-left p-2">Status</th>
        <th className="text-left p-2">Źródło</th>
        <th className="text-left p-2">Uwagi</th>
      </tr>
    </thead>
  );
};

const ReservationAdminTableRow = ({
  reservation,
}: {
  reservation: ReservationExtended;
}) => {
  return (
    <tr className="border-t hover:bg-bronzelog/20">
      <td className="p-2">{formatDate(reservation.start_time.toString())}</td>
      <td className="p-2">{formatTime(reservation.start_time)}</td>
      <td className="p-2">{reservation.username}</td>
      <td className="p-2">{reservation.email}</td>
      <td className="p-2">{reservation.table_number}</td>
      <td className="p-2">{reservation.capacity}</td>
      <td className="p-2">{getStatus(reservation)}</td>
      <td className="p-2">{sourceChanger(reservation.source)}</td>
      <td className="p-2">{reservation.notes}</td>
    </tr>
  );
};

const FilterBar = ({
  onFilterChange,
  capacities,
}: {
  onFilterChange: (filters: any) => void;
  capacities: number[];
}) => {
  const debouncedUsernameChange = debounce((value) => {
    onFilterChange({ username: value });
  }, 300);

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Szukaj po username..."
        onChange={(e) => debouncedUsernameChange(e.target.value)}
        className="p-2 border rounded"
      />
      <select
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="">Wszystkie statusy</option>
        <option value="pending">Potwierdzone</option>
        <option value="done">Odbyte</option>
        <option value="cancelled">Anulowane</option>
      </select>
      <select
        onChange={(e) => onFilterChange({ source: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="">Wszystkie źródła</option>
        <option value="page">Web</option>
        <option value="phone">Telefon</option>
      </select>
      <select
        onChange={(e) =>
          onFilterChange({
            capacity: e.target.value ? parseInt(e.target.value) : undefined,
          })
        }
        className="p-2 border rounded"
      >
        <option value="">Liczba osób</option>
        {capacities.map((capacity) => (
          <option key={capacity} value={capacity}>
            {capacity}
          </option>
        ))}
      </select>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Poprzednia
      </button>
      <span className="px-4 py-2">
        Strona {currentPage} z {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Następna
      </button>
    </div>
  );
};

const AdminReservationTable = ({
  initialReservations,
  initialTotal,
  capacities,
}: {
  initialReservations: ReservationExtended[];
  initialTotal: number;
  capacities: number[];
}) => {
  const [reservations, setReservations] = useState(initialReservations);
  const [total, setTotal] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const pageSize = 20;

  const fetchReservations = useCallback(
    async (page: number, newFilters = {}) => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...newFilters,
      });

      const response = await fetch(`/api/reservations?${queryParams}`);
      const data = await response.json();

      setReservations(data.reservations);
      setTotal(data.total);
    },
    []
  );

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
    fetchReservations(1, { ...filters, ...newFilters });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchReservations(page, filters);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <FilterBar onFilterChange={handleFilterChange} capacities={capacities} />
      {reservations.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-gray-600">
            Brak rezerwacji spełniających kryteria.
          </p>
          <p className="text-gray-500 text-sm">
            Zmień filtry wyszukiwania, aby zobaczyć więcej rezerwacji.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto flex justify-center p-4">
            <table className="max-w-6xl bg-white rounded-lg shadow p-4">
              <ReservationAdminTableHeader />
              <tbody>
                {reservations.map((reservation) => (
                  <ReservationAdminTableRow
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default AdminReservationTable;
