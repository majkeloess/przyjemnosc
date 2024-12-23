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
