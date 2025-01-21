import { z } from "zod";

export type MenuEnumType =
  | "przystawki"
  | "salatki"
  | "zupy"
  | "miesa"
  | "ryby"
  | "regionalne"
  | "dodatki"
  | "napoje";

export type UserType = "admin" | "customer";

export type ReservationSource = "page" | "phone";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  type: z.enum(["admin", "customer"]),
  created_at: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const MenuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  created_at: z.date(),
  type: z.enum([
    "przystawki",
    "salatki",
    "zupy",
    "miesa",
    "ryby",
    "regionalne",
    "dodatki",
    "napoje",
  ]),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;

export const TableSchema = z.object({
  id: z.number(),
  table_number: z.number(),
  capacity: z.number(),
  created_at: z.date(),
});

export type Table = z.infer<typeof TableSchema>;

export const ReservationStatusEnum = z.enum(["cancelled", "done", "pending"]);

export const ReservationSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  start_time: z.date(),
  end_time: z.date(),
  status: ReservationStatusEnum,
  notes: z.string().nullable(),
  source: z.enum(["page", "phone"]),
  created_at: z.date(),
});

export type Reservation = z.infer<typeof ReservationSchema>;

export const ReservationWithTableSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  start_time: z.date(),
  end_time: z.date(),
  status: ReservationStatusEnum,
  notes: z.string().nullable(),
  source: z.enum(["page", "phone"]),
  created_at: z.date(),
  table_number: z.number().nullable(),
});

export type ReservationWithTable = z.infer<typeof ReservationWithTableSchema>;

export const ReservationTablesSchema = z.object({
  reservation_id: z.number(),
  table_id: z.number(),
});

export type ReservationTables = z.infer<typeof ReservationTablesSchema>;

export const LoyaltyCodeSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  code: z.string(),
  discount_percentage: z.number().default(20),
  used: z.boolean().default(false),
  created_at: z.date(),
});

export type LoyaltyCode = z.infer<typeof LoyaltyCodeSchema>;

export const ReservationExtendedSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  start_time: z.date(),
  end_time: z.date(),
  status: ReservationStatusEnum,
  created_at: z.date(),
  username: z.string(),
  email: z.string().email(),
  table_number: z.number().nullable(),
  capacity: z.number().nullable(),
  notes: z.string().nullable(),
  source: z.enum(["page", "phone"]),
});

export type ReservationExtended = z.infer<typeof ReservationExtendedSchema>;

export const DailyReservationsStatsSchema = z.object({
  reservation_date: z.date(),
  total_reservations: z.string().transform(Number),
  completed: z.string().transform(Number),
  cancelled: z.string().transform(Number),
  pending: z.string().transform(Number),
  unique_customers: z.string().transform(Number),
  tables_used: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
});

export type DailyReservationsStats = z.infer<
  typeof DailyReservationsStatsSchema
>;

export const TablePopularityStatsSchema = z.object({
  table_number: z.number(),
  capacity: z.number(),
  total_reservations: z.string().transform(Number),
  successful_reservations: z.string().transform(Number),
  success_rate: z.string().transform(Number),
  cancellations: z.string().transform(Number),
  efficiency_ratio: z.string().transform(Number),
});

export type TablePopularityStats = z.infer<typeof TablePopularityStatsSchema>;

export const CustomerLoyaltyStatsSchema = z.object({
  username: z.string(),
  total_reservations: z.string().transform(Number),
  completed_reservations: z.string().transform(Number),
  loyalty_codes_received: z.string().transform(Number),
  loyalty_codes_used: z.string().transform(Number),
  completion_rate: z.string(),
  last_reservation_date: z.date(),
});

export type CustomerLoyaltyStats = z.infer<typeof CustomerLoyaltyStatsSchema>;

export const MonthlyReservationsStatsSchema = z.object({
  month: z.string(),
  total_reservations: z.string().transform(Number),
  completed: z.string().transform(Number),
  cancelled: z.string().transform(Number),
  pending: z.string().transform(Number),
  unique_tables_used: z.string().transform(Number),
});

export type MonthlyReservationsStats = z.infer<
  typeof MonthlyReservationsStatsSchema
>;

export type AdminPanelChoiceType =
  | "rezerwacje"
  | "tworzenie rezerwacji"
  | "użytkownicy"
  | "walidacja kodów"
  | "statystyki";

export const GeneralStatsSchema = z.object({
  total_reservations: z.string().transform(Number),
  completed_reservations: z.string().transform(Number),
  used_loyalty_codes: z.string().transform(Number),
  total_tables: z.string().transform(Number),
  total_menu_items: z.string().transform(Number),
  total_users: z.string().transform(Number),
});

export type GeneralStats = z.infer<typeof GeneralStatsSchema>;

export type Statistics = {
  lastWeekReservationsStats: DailyReservationsStats[];
  tablePopularityStats: TablePopularityStats[];
  topCustomersStats: CustomerLoyaltyStats[];
  monthlyStats: MonthlyReservationsStats[];
  generalStats: GeneralStats;
};
