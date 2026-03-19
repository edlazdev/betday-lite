import { NextRequest, NextResponse } from "next/server";

import { getMatchById } from "@/lib/matches-data";
import { getBetById, removeBet } from "@/lib/bets-store";

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
    return NextResponse.json({ ...bet, match: match ?? null });
  } catch (error) {
    console.error("[API /api/bets/[betId] GET]", error);
    return NextResponse.json(
      { error: "Error al obtener apuesta" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ betId: string }> }
) {
  try {
    const { betId } = await params;
    if (!removeBet(betId)) {
      return NextResponse.json(
        { error: "Apuesta no encontrada" },
        { status: 404 }
      );
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[API /api/bets/[betId] DELETE]", error);
    return NextResponse.json(
      { error: "Error al eliminar apuesta" },
      { status: 500 }
    );
  }
}
