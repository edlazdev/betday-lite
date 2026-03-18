import type { MarketOdds, Pick } from "@/types";

export const APP_NAME = "BetDay Lite";

export const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  BET: (id: string) => `/bets/${id}`,
} as const;

export const PICK_LABEL: Record<Pick, string> = {
  HOME: "1",
  DRAW: "X",
  AWAY: "2",
};

export const PICK_TO_ODDS_KEY: Record<Pick, keyof MarketOdds> = {
  HOME: "home",
  DRAW: "draw",
  AWAY: "away",
};

