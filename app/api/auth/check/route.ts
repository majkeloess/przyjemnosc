import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    const { rows } = await pool.query(
      "SELECT id, email, username, type FROM restaurant.users WHERE id = $1",
      [decoded.userId]
    );

    if (!rows[0]) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: rows[0] });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ user: null });
  }
}
