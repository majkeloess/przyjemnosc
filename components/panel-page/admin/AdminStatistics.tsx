"use client";

import { Statistics } from "@/types/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const AdminStatistics = ({ statistics }: { statistics: Statistics }) => {
  const {
    lastWeekReservationsStats,
    tablePopularityStats,
    topCustomersStats,
    monthlyStats,
    generalStats,
  } = statistics;

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Wszystkie Rezerwacje</h3>
          <p className="text-2xl">{generalStats.total_reservations}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Zrealizowane Rezerwacje</h3>
          <p className="text-2xl">{generalStats.completed_reservations}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Użyte Kody Lojalnościowe</h3>
          <p className="text-2xl">{generalStats.used_loyalty_codes}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          Rezerwacje z Ostatniego Tygodnia
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lastWeekReservationsStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="reservation_date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_reservations"
              name="Wszystkie rezerwacje"
              stroke="#8884d8"
            />
            <Line
              type="monotone"
              dataKey="completed"
              name="Zrealizowane"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Popularność Stolików</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tablePopularityStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="table_number" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="total_reservations"
              name="Wszystkie rezerwacje"
              fill="#8884d8"
            />
            <Bar
              dataKey="successful_reservations"
              name="Udane rezerwacje"
              fill="#82ca9d"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Najlepsi Klienci</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Nazwa użytkownika</th>
                <th className="px-4 py-2">Liczba rezerwacji</th>
                <th className="px-4 py-2">Zrealizowane</th>
                <th className="px-4 py-2">Wskaźnik realizacji</th>
              </tr>
            </thead>
            <tbody>
              {topCustomersStats.map((customer, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-4 py-2">{customer.username}</td>
                  <td className="px-4 py-2">{customer.total_reservations}</td>
                  <td className="px-4 py-2">
                    {customer.completed_reservations}
                  </td>
                  <td className="px-4 py-2">{customer.completion_rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Statystyki Miesięczne</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="total_reservations"
              name="Wszystkie rezerwacje"
              fill="#8884d8"
            />
            <Bar dataKey="completed" name="Zrealizowane" fill="#82ca9d" />
            <Bar dataKey="cancelled" name="Anulowane" fill="#ff4242" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatistics;
