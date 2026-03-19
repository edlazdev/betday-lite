import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import type { Pick } from "@/types";
import { auth } from "@/auth";
import { PICK_UPPER } from "@/lib/constants";
import { getMatchById } from "@/lib/matches-data";
import {
  appendBet,
  betsCookieName,
  parseBetsJson,
  setBetsCookie,
  sortBetsByPlacedAt,
} from "@/lib/bets-session";

const VALID_PICKS: Pick[] = [PICK_UPPER.HOME, PICK_UPPER.DRAW, PICK_UPPER.AWAY];

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ bets: [] });
    }

    const cookieStore = await cookies();
    const raw = cookieStore.get(betsCookieName(session.user.id))?.value;
    const bets = sortBetsByPlacedAt(parseBetsJson(raw));
    const enriched = bets.map((bet) => {
      const match = getMatchById(bet.matchId);
      return {
        ...bet,
        homeTeamName: match?.homeTeam.name ?? "—",
        awayTeamName: match?.awayTeam.name ?? "—",
      };
    });
    return NextResponse.json({ bets: enriched });
  } catch (error) {
    console.error("[API /api/bets GET]", error);
    return NextResponse.json(
      { error: "Error al listar apuestas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

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

    const cookieStore = await cookies();
    const current = sortBetsByPlacedAt(
      parseBetsJson(cookieStore.get(betsCookieName(session.user.id))?.value)
    );
    const { bets: next, bet } = appendBet(current, match, pick as Pick, stakeNum);

    const res = NextResponse.json(bet, { status: 201 });
    setBetsCookie(res, session.user.id, next);
    return res;
  } catch (error) {
    console.error("[API /api/bets POST]", error);
    return NextResponse.json(
      { error: "Error al registrar apuesta" },
      { status: 500 }
    );
  }
}
