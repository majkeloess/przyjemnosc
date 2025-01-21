import {
  LoyaltyCodeSchema,
  MenuItem,
  ReservationExtendedSchema,
  ReservationSchema,
  ReservationWithTableSchema,
  UserSchema,
  DailyReservationsStatsSchema,
  TablePopularityStatsSchema,
  CustomerLoyaltyStatsSchema,
  MonthlyReservationsStatsSchema,
} from "@/types/types";
import { MenuItemSchema } from "@/types/types";
import pool from "./db";
import type {
  LoyaltyCode,
  Reservation,
  ReservationExtended,
  ReservationWithTable,
  User,
  DailyReservationsStats,
  TablePopularityStats,
  CustomerLoyaltyStats,
  MonthlyReservationsStats,
  GeneralStats,
} from "@/types/types";

export const getUser = async (id: string): Promise<User> => {
  const { rows } = await pool.query(
    "SELECT * FROM restaurant.users WHERE id = $1",
    [id]
  );
  return UserSchema.parse(rows[0]);
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const { rows } = await pool.query("SELECT * FROM restaurant.menuitems");

    return MenuItemSchema.array().parse(rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};

export const getTableCapacity = async (): Promise<number[]> => {
  try {
    const { rows } = await pool.query(
      "SELECT DISTINCT capacity FROM restaurant.tables ORDER BY capacity"
    );

    return rows.map((r) => r.capacity);
  } catch (error) {
    console.error("Error fetching table capacity:", error);
    return [];
  }
};

export const getUserReservations = async (
  id: string
): Promise<ReservationWithTable[]> => {
  const { rows } = await pool.query(
    `SELECT r.*, t.table_number 
     FROM restaurant.reservations r
     LEFT JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
     LEFT JOIN restaurant.tables t ON rt.table_id = t.id
     WHERE r.user_id = $1
     ORDER BY r.start_time DESC`,
    [id]
  );
  return ReservationWithTableSchema.array().parse(rows);
};

export const getUserLoyaltyCodes = async (
  id: string
): Promise<LoyaltyCode[]> => {
  const { rows } = await pool.query(
    "SELECT * FROM restaurant.loyaltycodes WHERE user_id = $1",
    [id]
  );
  return LoyaltyCodeSchema.array().parse(rows);
};

export const getReservations = async (): Promise<Reservation[]> => {
  const { rows } = await pool.query("SELECT * FROM restaurant.reservations");
  return ReservationSchema.array().parse(rows);
};

export const getReservationsExtended = async (): Promise<
  ReservationExtended[]
> => {
  try {
    const { rows } = await pool.query(
      `SELECT 
        r.*,
        u.username,
        u.email,
        t.table_number,
        t.capacity
      FROM restaurant.reservations r
      LEFT JOIN restaurant.users u ON r.user_id = u.id
      LEFT JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
      LEFT JOIN restaurant.tables t ON rt.table_id = t.id
      ORDER BY r.start_time DESC`
    );

    return ReservationExtendedSchema.array().parse(rows);
  } catch (error) {
    console.error("Error fetching extended reservations:", error);
    return [];
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  const { rows } = await pool.query("SELECT * FROM restaurant.users");
  return UserSchema.array().parse(rows);
};

// Statystyki rezerwacji z ostatnich 7 dni
export const getLastWeekReservationsStats = async (): Promise<
  DailyReservationsStats[]
> => {
  const { rows } = await pool.query(`
    SELECT *
    FROM restaurant.daily_reservations_report
    WHERE reservation_date >= CURRENT_DATE - INTERVAL '7 days'
    ORDER BY reservation_date DESC
  `);
  return DailyReservationsStatsSchema.array().parse(rows);
};

// Statystyki popularności stolików
export const getTablePopularityStats = async (): Promise<
  TablePopularityStats[]
> => {
  const { rows } = await pool.query(`
    SELECT 
      table_number,
      capacity,
      total_reservations,
      successful_reservations,
      success_rate,
      cancellations,
      ROUND(successful_reservations::DECIMAL / capacity, 2) as efficiency_ratio
    FROM restaurant.table_popularity_report
    WHERE total_reservations > 0
    ORDER BY success_rate DESC
  `);
  return TablePopularityStatsSchema.array().parse(rows);
};

// Top 10 najbardziej lojalnych klientów
export const getTopCustomersStats = async (): Promise<
  CustomerLoyaltyStats[]
> => {
  const { rows } = await pool.query(`
    SELECT
      username,
      total_reservations,
      completed_reservations,
      loyalty_codes_received,
      loyalty_codes_used,
      ROUND((completed_reservations::DECIMAL / NULLIF(total_reservations, 0) * 100), 2) || '%' as completion_rate,
      last_reservation_date
    FROM restaurant.customer_loyalty_report
    WHERE total_reservations > 0
    ORDER BY completed_reservations DESC, total_reservations DESC
    LIMIT 10
  `);
  return CustomerLoyaltyStatsSchema.array().parse(rows);
};

// Statystyki miesięczne
export const getMonthlyStats = async (): Promise<
  MonthlyReservationsStats[]
> => {
  const { rows } = await pool.query(`
    SELECT 
      TO_CHAR(reservation_date, 'YYYY-MM') as month,
      SUM(total_reservations) as total_reservations,
      SUM(completed) as completed,
      SUM(cancelled) as cancelled,
      SUM(pending) as pending,
      COUNT(DISTINCT tables_used) as unique_tables_used
    FROM restaurant.daily_reservations_report
    GROUP BY TO_CHAR(reservation_date, 'YYYY-MM')
    ORDER BY month DESC
    LIMIT 12
  `);
  return MonthlyReservationsStatsSchema.array().parse(rows);
};

// Ogólne statystyki
export const getGeneralStats = async (): Promise<GeneralStats> => {
  const { rows } = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM restaurant.users WHERE type = 'customer') as total_customers,
      (SELECT COUNT(*) FROM restaurant.reservations) as total_reservations,
      (SELECT COUNT(*) FROM restaurant.reservations WHERE status = 'done') as completed_reservations,
      (SELECT COUNT(*) FROM restaurant.loyaltycodes WHERE used = true) as used_loyalty_codes,
      (SELECT COUNT(*) FROM restaurant.tables) as total_tables,
      (SELECT COUNT(*) FROM restaurant.menuitems) as total_menu_items
  `);
  return rows[0];
};

export const getAllStats = async (): Promise<{
  lastWeekReservationsStats: DailyReservationsStats[];
  tablePopularityStats: TablePopularityStats[];
  topCustomersStats: CustomerLoyaltyStats[];
  monthlyStats: MonthlyReservationsStats[];
  generalStats: GeneralStats;
}> => {
  const [
    lastWeekReservationsStats,
    tablePopularityStats,
    topCustomersStats,
    monthlyStats,
    generalStats,
  ] = await Promise.all([
    getLastWeekReservationsStats(),
    getTablePopularityStats(),
    getTopCustomersStats(),
    getMonthlyStats(),
    getGeneralStats(),
  ]);

  return {
    lastWeekReservationsStats,
    tablePopularityStats,
    topCustomersStats,
    monthlyStats,
    generalStats,
  };
};
