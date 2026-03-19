import type { Match, MatchesTodayResponse } from "@/types";

import matchesTodayJson from "@/data/matches.today.json";

const matchesData = matchesTodayJson as MatchesTodayResponse;

export function getMatchesGroupedByHour(): Map<string, Match[]> {
  const byHour = new Map<string, Match[]>();
  for (const match of matchesData.matches) {
    const date = new Date(match.startTime);
    const hourKey = `${String(date.getHours()).padStart(2, "0")}:00`;
    const list = byHour.get(hourKey) ?? [];
    list.push(match);
    byHour.set(hourKey, list);
  }
  const sorted = new Map<string, Match[]>();
  for (const h of [...byHour.keys()].sort()) {
    sorted.set(h, byHour.get(h)!);
  }
  return sorted;
}

export function getMatchById(matchId: string): Match | undefined {
  return matchesData.matches.find((m) => m.id === matchId);
}
