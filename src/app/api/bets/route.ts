import { NextRequest, NextResponse } from "next/server";
import type { Pick } from "@/types";
import { getMatchById } from "@/lib/matches-data";
import { getAllBets, placeBet } from "@/lib/bets-store";

const VALID_PICKS: Pick[] = ["HOME", "DRAW", "AWAY"];

/**
 * GET /api/bets
 * Lista todas las apuestas del usuario (simuladas).
 */
export async function GET() {
  try {
    const bets = getAllBets();
    return NextResponse.json({ bets });
  } catch (error) {
    console.error("[API /api/bets GET]", error);
    return NextResponse.json(
      { error: "Error al listar apuestas" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bets
 * Crea una apuesta simulada.
 * Body: { matchId: string, pick: "HOME" | "DRAW" | "AWAY", stake: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId, pick, stake } = body;

    if (!matchId || typeof matchId !== "string") {
      return NextResponse.json(
        { error: "matchId es requerido y debe ser string" },
        { status: 400 }
      );
    }
    if (!VALID_PICKS.includes(pick)) {
      return NextResponse.json(
        { error: "pick debe ser HOME, DRAW o AWAY" },
        { status: 400 }
      );
    }
    const stakeNum = Number(stake);
    if (Number.isNaN(stakeNum) || stakeNum <= 0) {
      return NextResponse.json(
        { error: "stake debe ser un número positivo" },
        { status: 400 }
      );
    }

    const match = getMatchById(matchId);
    if (!match) {
      return NextResponse.json(
        { error: "Partido no encontrado" },
        { status: 404 }
      );
    }

    const bet = placeBet(match, pick as Pick, stakeNum);
    return NextResponse.json(bet, { status: 201 });
  } catch (error) {
    console.error("[API /api/bets POST]", error);
    return NextResponse.json(
      { error: "Error al registrar apuesta" },
      { status: 500 }
    );
  }
}
