import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export function signJWT(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
