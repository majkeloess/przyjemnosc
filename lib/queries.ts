import {
  LoyaltyCodeSchema,
  MenuItem,
  ReservationExtendedSchema,
  ReservationSchema,
  ReservationWithTableSchema,
  UserSchema,
} from "@/types/types";
import { MenuItemSchema } from "@/types/types";
import pool from "./db";
import type {
  LoyaltyCode,
  Reservation,
  ReservationExtended,
  ReservationWithTable,
  User,
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
