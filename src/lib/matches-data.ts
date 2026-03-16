import type { Match, MatchesTodayResponse } from "@/types";

import matchesTodayJson from "@/data/matches.today.json";

const matchesData = matchesTodayJson as MatchesTodayResponse;

/**
 * Devuelve la respuesta de partidos del día (para API route o Server Component).
 */
export function getMatchesToday(): MatchesTodayResponse {
  return matchesData;
}

/**
 * Devuelve los partidos del día como array.
 */
export function getMatches(): Match[] {
  return matchesData.matches;
}

/**
 * Agrupa partidos por hora (clave = "HH:00" en la timezone del día).
 * Útil para el timeline de la Home.
 */
export function getMatchesGroupedByHour(): Map<string, Match[]> {
  const byHour = new Map<string, Match[]>();
  for (const match of matchesData.matches) {
    const date = new Date(match.startTime);
    const hourKey = `${String(date.getHours()).padStart(2, "0")}:00`;
    const list = byHour.get(hourKey) ?? [];
    list.push(match);
    byHour.set(hourKey, list);
  }
  // Ordenar las horas
  const sorted = new Map<string, Match[]>();
  const hours = Array.from(byHour.keys()).sort();
  for (const h of hours) {
    sorted.set(h, byHour.get(h)!);
  }
  return sorted;
}

/**
 * Busca un partido por id.
 */
export function getMatchById(matchId: string): Match | undefined {
  return matchesData.matches.find((m) => m.id === matchId);
}
