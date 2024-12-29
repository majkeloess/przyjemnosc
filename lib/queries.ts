import { MenuItem } from "@/types/types";
import { MenuItemSchema } from "@/types/types";
import pool from "./db";

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
