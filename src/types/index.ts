
export interface League {
  id: string;
  name: string;
  country: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface MarketOdds {
  home: number;
  draw: number;
  away: number;
}

export interface Market {
  type: "1X2";
  odds: MarketOdds;
}

export interface Match {
  id: string;
  startTime: string; // ISO con timezone, ej: "2026-02-12T00:00:00-05:00"
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  market: Market;
}

export interface MatchesTodayResponse {
  date: string; // "YYYY-MM-DD"
  timezone: string;
  matches: Match[];
}

/** Selección en la apuesta: HOME = 1, DRAW = X, AWAY = 2 */
export type Pick = "HOME" | "DRAW" | "AWAY";

export type BetStatus = "PENDING" | "WON" | "LOST";

export interface Bet {
  id: string;
  matchId: string;
  placedAt: string; // ISO
  pick: Pick;
  odd: number;
  stake: number;
  status: BetStatus;
  return: number | null; // null si PENDING
}

export interface BetsMeResponse {
  bets: Bet[];
}

// ----- Usuario (NextAuth) -----

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}


// ----- props types -----
export interface UserMenuProps {
  user: User;
  children?: React.ReactNode;
}