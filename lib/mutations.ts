"use server";

import { ReservationSchema, UserType } from "@/types/types";
import { hashPassword } from "./bcrypt";
import pool from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/rezerwacje");
    redirect("/rezerwacje");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const createReservation = async (formData: FormData) => {
  const client = await pool.connect();
  try {
    const userId = formData.get("user_id") as string;
    const numberOfPeople = parseInt(formData.get("table_id") as string);
    const date = formData.get("date") as string;
    const time = formData.get("start_time") as string;

    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    const availableTableResult = await client.query(
      `SELECT t.id 
       FROM restaurant.tables t
       WHERE t.capacity >= $1
       AND NOT EXISTS (
         SELECT 1 FROM restaurant.reservations r
         JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
         WHERE rt.table_id = t.id
         AND r.status = 'pending'
         AND (
           (r.start_time <= $2 AND r.end_time >= $2) OR
           (r.start_time <= $3 AND r.end_time >= $3) OR
           (r.start_time >= $2 AND r.end_time <= $3)
         )
       )
       ORDER BY t.capacity ASC
       LIMIT 1`,
      [numberOfPeople, startTime, endTime]
    );

    if (availableTableResult.rows.length === 0) {
      throw new Error("Brak dostępnych stolików dla tej liczby osób");
    }

    const tableId = availableTableResult.rows[0].id;

    const reservation = {
      id: 0,
      user_id: userId,
      start_time: startTime,
      end_time: endTime,
      status: "pending" as const,
      email_confirmation_sent: false,
      created_at: new Date(),
    };

    const validatedReservation = ReservationSchema.parse(reservation);

    await client.query("BEGIN");

    const reservationResult = await client.query(
      `INSERT INTO restaurant.reservations 
       (user_id, start_time, end_time, status, email_confirmation_sent) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        validatedReservation.user_id,
        validatedReservation.start_time,
        validatedReservation.end_time,
        validatedReservation.status,
        validatedReservation.email_confirmation_sent,
      ]
    );

    const reservationId = reservationResult.rows[0].id;

    await client.query(
      `INSERT INTO restaurant.reservationtables (reservation_id, table_id)
       VALUES ($1, $2)`,
      [reservationId, tableId]
    );

    await client.query("COMMIT");

    revalidatePath(`/rezerwacje/panel/${userId}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(
      `Failed to create reservation: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    client.release();
  }
};

export const cancelReservation = async (
  reservationId: number,
  userId: string
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // First delete the table assignment
    await client.query(
      `DELETE FROM restaurant.reservationtables 
       WHERE reservation_id = $1`,
      [reservationId]
    );

    // Then update the reservation status
    await client.query(
      `UPDATE restaurant.reservations 
       SET status = 'cancelled'
       WHERE id = $1`,
      [reservationId]
    );

    await client.query("COMMIT");
    revalidatePath(`/rezerwacje/panel/${userId}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(
      `Failed to cancel reservation: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    client.release();
  }
};
