/**
 * Constantes de la aplicación.
 */

export const APP_NAME = "BetDay Lite";

export const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  BET: (id: string) => `/bets/${id}`,
} as const;
