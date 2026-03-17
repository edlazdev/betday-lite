import { NextResponse } from "next/server";
import { getMatchesToday } from "@/lib/matches-data";

/**
 * GET /api/matches
 * Devuelve los partidos del día (date, timezone, matches[]).
 * Uso: timeline Home, Server Components o fetch desde cliente.
 */
export async function GET() {
  try {
    const data = getMatchesToday();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API /api/matches]", error);
    return NextResponse.json(
      { error: "Error al obtener partidos" },
      { status: 500 }
    );
  }
}
