"use server";

import { UserType } from "@/types/types";
import { hashPassword } from "./bcrypt";
import pool from "./db";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {
  const hashedPassword = await hashPassword(formData.get("password") as string);
  try {
    const query = `INSERT INTO restaurant.users (username, email, password_hash, type, created_at)  
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (email, username) DO NOTHING`;
    await pool.query(query, [
      formData.get("username") as string,
      formData.get("email") as string,
      hashedPassword,
      formData.get("type") as UserType,
      new Date(),
    ]);

    redirect("/rezerwacje");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


