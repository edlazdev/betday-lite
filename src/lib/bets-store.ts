import type { Bet, Match, Pick } from "@/types";
import { getOddByPick } from "@/lib/helpers";
import betsMeJson from "@/data/bets.me.json";

const initialBets = (betsMeJson as { bets: Bet[] }).bets;
const betsStore = new Map<string, Bet>();

// Cargar apuestas iniciales del JSON
initialBets.forEach((b) => betsStore.set(b.id, b));

/**
 * Genera un id único para una nueva apuesta (sigue formato bet_XXX).
 */
function nextBetId(): string {
  const max = Array.from(betsStore.values()).reduce((max, b) => {
    const n = parseInt(b.id.replace(/^bet_/, ""), 10);
    return Number.isNaN(n) ? max : Math.max(max, n);
  }, 0);
  return `bet_${String(max + 1).padStart(3, "0")}`;
}

/**
 * Registra una apuesta simulada (mercado 1x2).
 * La apuesta se guarda en memoria y se devuelve en el formato de bets.me.json.
 */
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

/**
 * Devuelve todas las apuestas del usuario (iniciales + nuevas), ordenadas por fecha descendente.
 */
export function getAllBets(): Bet[] {
  return Array.from(betsStore.values()).sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
  );
}

/**
 * Devuelve una apuesta por id.
 */
export function getBetById(betId: string): Bet | undefined {
  return betsStore.get(betId);
}
