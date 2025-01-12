import { MenuItem, ReservationSchema, UserSchema } from "@/types/types";
import { MenuItemSchema } from "@/types/types";
import pool from "./db";
import type { Reservation, User } from "@/types/types";

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
): Promise<Reservation[]> => {
  const { rows } = await pool.query(
    "SELECT * FROM restaurant.reservations WHERE user_id = $1",
    [id]
  );
  return ReservationSchema.array().parse(rows);
};

export const getReservations = async (): Promise<Reservation[]> => {
  const { rows } = await pool.query("SELECT * FROM restaurant.reservations");
  return ReservationSchema.array().parse(rows);
};
  