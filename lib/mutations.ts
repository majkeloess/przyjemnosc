"use server";

import { ReservationSchema, UserType } from "@/types/types";
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

export const createReservation = async (formData: FormData) => {
  const userId = formData.get("user_id") as string;
  const tableId = parseInt(formData.get("table_id") as string);
  const date = formData.get("date") as string;
  const time = formData.get("start_time") as string;

  const startTime = new Date(`${date}T${time}`);
  const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

  const reservation = {
    id: 0,
    user_id: userId,
    table_id: tableId,
    start_time: startTime,
    end_time: endTime,
    status: "pending" as const,
    email_confirmation_sent: false,
    created_at: new Date(),
  };

  const validatedReservation = ReservationSchema.parse(reservation);

  await pool.query(
    `INSERT INTO restaurant.reservations 
     (user_id, table_id, start_time, end_time, status, email_confirmation_sent) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      validatedReservation.user_id,
      validatedReservation.table_id,
      validatedReservation.start_time,
      validatedReservation.end_time,
      validatedReservation.status,
      validatedReservation.email_confirmation_sent,
    ]
  );
};

export const deleteReservation = async (id: string) => {
  await pool.query("DELETE FROM restaurant.reservations WHERE id = $1", [id]);
};
