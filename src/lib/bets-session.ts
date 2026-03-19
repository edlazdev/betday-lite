import type { NextResponse } from "next/server";
import type { Bet, Match, Pick } from "@/types";
import { getOddByPick } from "@/lib/helpers";

const COOKIE_PREFIX = "betday_bets_";
export const BETS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export function betsCookieName(userId: string): string {
  return `${COOKIE_PREFIX}${encodeURIComponent(userId)}`;
}

export function parseBetsJson(raw: string | undefined): Bet[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data as Bet[];
  } catch {
    return [];
  }
}

export function sortBetsByPlacedAt(bets: Bet[]): Bet[] {
  return [...bets].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
  );
}

function nextBetId(bets: Bet[]): string {
  const max = bets.reduce((acc, b) => {
    const n = parseInt(b.id.replace(/^bet_/, ""), 10);
    return Number.isNaN(n) ? acc : Math.max(acc, n);
  }, 0);
  return `bet_${String(max + 1).padStart(3, "0")}`;
}

export function appendBet(
  current: Bet[],
  match: Match,
  pick: Pick,
  stake: number
): { bets: Bet[]; bet: Bet } {
  const bet: Bet = {
    id: nextBetId(current),
    matchId: match.id,
    placedAt: new Date().toISOString(),
    pick,
    odd: getOddByPick(match, pick),
    stake,
    status: "PENDING",
    return: null,
  };
  return { bets: [...current, bet], bet };
}

export function removeBetById(current: Bet[], betId: string): Bet[] | null {
  if (!current.some((b) => b.id === betId)) return null;
  return current.filter((b) => b.id !== betId);
}

export function findBetById(bets: Bet[], betId: string): Bet | undefined {
  return bets.find((b) => b.id === betId);
}

export function setBetsCookie(res: NextResponse, userId: string, bets: Bet[]) {
  res.cookies.set(betsCookieName(userId), JSON.stringify(bets), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: BETS_COOKIE_MAX_AGE,
  });
}
