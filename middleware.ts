import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname === "/rezerwacje") {
    if (token) {
      try {
        const decoded = await verifyJWT(token);
        return NextResponse.redirect(
          new URL(`/rezerwacje/panel/${decoded.id}`, request.url)
        );
      } catch (error) {
        console.error("Błąd weryfikacji tokenu:", error);
      }
    }
  }

  if (request.nextUrl.pathname.startsWith("/rezerwacje/panel")) {
    if (!token) {
      return NextResponse.redirect(new URL("/rezerwacje", request.url));
    }

    try {
      const decoded = await verifyJWT(token);
      const pathParts = request.nextUrl.pathname.split("/");
      const userId = pathParts[pathParts.length - 1];

      if (decoded.id !== userId) {
        return NextResponse.redirect(
          new URL(`/rezerwacje/panel/${decoded.id}`, request.url)
        );
      }
    } catch (error) {
      console.error("Błąd weryfikacji tokenu:", error);
      return NextResponse.redirect(new URL("/rezerwacje", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rezerwacje/panel/:path*", "/rezerwacje"],
};
