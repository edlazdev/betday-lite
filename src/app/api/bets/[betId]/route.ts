import { NextRequest, NextResponse } from "next/server";
import { getBetById } from "@/lib/bets-store";
import { getMatchById } from "@/lib/matches-data";

/**
 * GET /api/bets/[betId]
 * Detalle de una apuesta, enriquecido con datos del partido.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ betId: string }> }
) {
  try {
    const { betId } = await params;
    const bet = getBetById(betId);

    if (!bet) {
      return NextResponse.json(
        { error: "Apuesta no encontrada" },
        { status: 404 }
      );
    }

    const match = getMatchById(bet.matchId);
    return NextResponse.json({
      ...bet,
      match: match ?? null,
    });
  } catch (error) {
    console.error("[API /api/bets/[betId]]", error);
    return NextResponse.json(
      { error: "Error al obtener apuesta" },
      { status: 500 }
    );
  }
}
