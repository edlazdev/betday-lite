import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { getMatchById } from "@/lib/matches-data";
import {
  betsCookieName,
  findBetById,
  parseBetsJson,
  removeBetById,
  setBetsCookie,
  sortBetsByPlacedAt,
} from "@/lib/bets-session";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ betId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { betId } = await params;
    const cookieStore = await cookies();
    const bets = sortBetsByPlacedAt(
      parseBetsJson(cookieStore.get(betsCookieName(session.user.id))?.value)
    );
    const bet = findBetById(bets, betId);
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
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { betId } = await params;
    const cookieStore = await cookies();
    const current = sortBetsByPlacedAt(
      parseBetsJson(cookieStore.get(betsCookieName(session.user.id))?.value)
    );
    const next = removeBetById(current, betId);
    if (!next) {
      return NextResponse.json(
        { error: "Apuesta no encontrada" },
        { status: 404 }
      );
    }

    const res = new NextResponse(null, { status: 204 });
    setBetsCookie(res, session.user.id, next);
    return res;
  } catch (error) {
    console.error("[API /api/bets/[betId] DELETE]", error);
    return NextResponse.json(
      { error: "Error al eliminar apuesta" },
      { status: 500 }
    );
  }
}
