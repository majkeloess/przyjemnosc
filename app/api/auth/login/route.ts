import { signJWT } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyPassword } from "@/lib/bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const result = await pool.query(
      "SELECT * FROM restaurant.users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 }
      );
    }

    // Generuj token JWT
    const token = signJWT({ id: user.id, email: user.email });

    // Ustaw cookie z tokenem
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 dzień
    });

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
