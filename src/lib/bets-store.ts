import type { Bet, Match, Pick } from "@/types";
import { getOddByPick } from "@/lib/helpers";

// in-memory, resets on deploy
const betsStore = new Map<string, Bet>();

function nextBetId(): string {
  const max = Array.from(betsStore.values()).reduce((acc, b) => {
    const n = parseInt(b.id.replace(/^bet_/, ""), 10);
    return Number.isNaN(n) ? acc : Math.max(acc, n);
  }, 0);
  return `bet_${String(max + 1).padStart(3, "0")}`;
}

export function placeBet(match: Match, pick: Pick, stake: number): Bet {
  const odd = getOddByPick(match, pick);
  const bet: Bet = {
    id: nextBetId(),
    matchId: match.id,
    placedAt: new Date().toISOString(),
    pick,
    odd,
    stake,
    status: "PENDING",
    return: null,
  };
  betsStore.set(bet.id, bet);
  return bet;
}

export function getAllBets(): Bet[] {
  return Array.from(betsStore.values()).sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
  );
}

export function getBetById(betId: string): Bet | undefined {
  return betsStore.get(betId);
}

export function removeBet(betId: string): boolean {
  return betsStore.delete(betId);
}
