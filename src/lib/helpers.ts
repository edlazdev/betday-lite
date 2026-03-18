import type { Match, Pick } from "@/types";
import { PICK_TO_ODDS_KEY } from "@/lib/constants";

export function getInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function getOddByPick(match: Match, pick: Pick): number {
  return match.market.odds[PICK_TO_ODDS_KEY[pick]];
}