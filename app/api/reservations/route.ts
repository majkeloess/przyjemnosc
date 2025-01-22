import { getReservationsExtended } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const username = searchParams.get("username") || "";
  const status = searchParams.get("status") || "";
  const source = searchParams.get("source") || "";
  const capacity = searchParams.get("capacity")
    ? parseInt(searchParams.get("capacity")!)
    : undefined;

  const { reservations, total } = await getReservationsExtended({
    page,
    pageSize: 20,
    username,
    status,
    source,
    capacity,
  });

  return NextResponse.json({ reservations, total });
}
