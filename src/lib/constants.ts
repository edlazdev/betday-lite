import type { MarketOdds, Pick } from "@/types";

export const APP_NAME = "BetDay Lite";

export const PICK_UPPER = {
  HOME: "HOME",
  DRAW: "DRAW",
  AWAY: "AWAY",
} as const;

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

export const CAROUSEL_SCROLL_STEP_FACTOR = 0.8;
export const CAROUSEL_SCROLL_THRESHOLD = 2;
export const CAROUSEL_ARIA_PREV = "Ver partidos anteriores";
export const CAROUSEL_ARIA_NEXT = "Ver más partidos";

export const BET_DEFAULT_STAKE = 10;

export const FEEDBACK_BET_SUCCESS = "Apuesta registrada";
export const FEEDBACK_BET_ERROR = "Error al apostar";
export const FEEDBACK_BET_REMOVED = "Apuesta cancelada.";
export const MARKET_LABEL_1X2 = "Resultado del partido (1X2)";
export const TEAM_LABEL_MAX_LENGTH = 12;

export const BET_STATUS_LABEL: Record<"PENDING" | "WON" | "LOST", string> = {
  PENDING: "Pendiente",
  WON: "Ganada",
  LOST: "Perdida",
};

export const PROFILE_EMPTY_MESSAGE =
  "Aún no tienes apuestas. Ve al inicio y apuesta en los partidos del día.";

export const MAX_PICKS_PER_MATCH = 3;

export const BET_STATUS_CLASSES: Record<"PENDING" | "WON" | "LOST", string> = {
  PENDING:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  WON: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  LOST: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

