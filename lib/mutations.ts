"use server";

import { ReservationSchema, UserType } from "@/types/types";
import { hashPassword } from "./bcrypt";
import pool from "./db";
import { revalidatePath } from "next/cache";

export const createUser = async (formData: FormData) => {
  const hashedPassword = await hashPassword(formData.get("password") as string);
  try {
    const checkQuery = `SELECT email, username FROM restaurant.users 
      WHERE email = $1 OR username = $2`;
    const checkResult = await pool.query(checkQuery, [
      formData.get("email") as string,
      formData.get("username") as string,
    ]);

    if (checkResult.rows.length > 0) {
      const existing = checkResult.rows[0];
      if (existing.email === formData.get("email")) {
        return { error: "Ten adres email jest już zajęty" };
      }
      if (existing.username === formData.get("username")) {
        return { error: "Ta nazwa użytkownika jest już zajęta" };
      }
    }

    const query = `INSERT INTO restaurant.users (username, email, password_hash, type, created_at)  
      VALUES ($1, $2, $3, $4, $5)`;
    await pool.query(query, [
      formData.get("username") as string,
      formData.get("email") as string,
      hashedPassword,
      formData.get("type") as UserType,
      new Date(),
    ]);

    revalidatePath("/rezerwacje");
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Nieznany błąd" };
  }
};

export const createReservation = async (formData: FormData) => {
  const client = await pool.connect();
  try {
    // Walidacja danych wejściowych
    const userId = formData.get("user_id");
    const numberOfPeopleStr = formData.get("table_id");
    const date = formData.get("date");
    const time = formData.get("start_time");

    if (!userId || !numberOfPeopleStr || !date || !time) {
      return { error: "Brak wymaganych danych" };
    }

    const numberOfPeople = parseInt(numberOfPeopleStr as string);
    if (isNaN(numberOfPeople) || numberOfPeople <= 0) {
      return { error: "Nieprawidłowa liczba osób" };
    }

    const notes = (formData.get("notes") as string) ?? "";
    const source = (formData.get("source") as string) ?? "page";

    // Walidacja daty i czasu
    const startTime = new Date(`${date}T${time}`);
    if (isNaN(startTime.getTime())) {
      return { error: "Nieprawidłowa data lub godzina" };
    }

    const now = new Date();
    if (startTime < now) {
      return { error: "Nie można zarezerwować stolika w przeszłości" };
    }

    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    await client.query("BEGIN");

    const availableTableResult = await client.query(
      `SELECT t.id 
       FROM restaurant.tables t
       WHERE t.capacity >= $1
       AND NOT EXISTS (
         SELECT 1 
         FROM restaurant.reservations r
         JOIN restaurant.reservationtables rt ON r.id = rt.reservation_id
         WHERE rt.table_id = t.id
         AND r.status != 'cancelled'
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
      return { error: "Brak dostępnych stolików dla tej liczby osób" };
    }

    const tableId = availableTableResult.rows[0].id;

    const reservation = {
      id: 0,
      user_id: userId as string,
      start_time: startTime,
      end_time: endTime,
      status: "pending" as const,
      notes,
      source,
      created_at: now,
    };

    const validatedReservation = ReservationSchema.parse(reservation);

    const reservationResult = await client.query(
      `INSERT INTO restaurant.reservations 
       (user_id, start_time, end_time, status, notes, source, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        validatedReservation.user_id,
        validatedReservation.start_time,
        validatedReservation.end_time,
        validatedReservation.status,
        validatedReservation.notes,
        validatedReservation.source,
        validatedReservation.created_at,
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
    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Błąd podczas tworzenia rezerwacji:", error);
    return {
      error:
        error instanceof Error
          ? `Błąd: ${error.message}`
          : "Wystąpił nieoczekiwany błąd podczas tworzenia rezerwacji",
    };
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

    await client.query(
      `DELETE FROM restaurant.reservationtables 
       WHERE reservation_id = $1`,
      [reservationId]
    );

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
    throw new Error(error instanceof Error ? error.message : "Nieznany błąd");
  } finally {
    client.release();
  }
};
