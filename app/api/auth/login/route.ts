import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/bcrypt";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { rows } = await pool.query(
      "SELECT * FROM restaurant.users WHERE email = $1",
      [email]
    );

    const user = rows[0];
    if (!user) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        type: user.type,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas logowania" },
      { status: 500 }
    );
  }
}
