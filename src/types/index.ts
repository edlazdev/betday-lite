import { PICK_UPPER } from "@/lib/constants";

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
  startTime: string;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  market: Market;
}

export interface MatchesTodayResponse {
  date: string;
  timezone: string;
  matches: Match[];
}

export type Pick = typeof PICK_UPPER.HOME | typeof PICK_UPPER.DRAW | typeof PICK_UPPER.AWAY;

export type BetStatus = "PENDING" | "WON" | "LOST";

export interface Bet {
  id: string;
  matchId: string;
  placedAt: string;
  pick: Pick;
  odd: number;
  stake: number;
  status: BetStatus;
  return: number | null;
}

export interface BetEnriched extends Bet {
  homeTeamName: string;
  awayTeamName: string;
}

export interface BetDetailResponse extends Bet {
  match: Match | null;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export type ToastVariant = "success" | "error" | "warning";

export type ToastState = {
  message: string;
  variant: ToastVariant;
} | null;

export interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}

export interface UserMenuProps {
  user: User;
  children?: React.ReactNode;
}

export interface BetCardProps {
  bet: BetEnriched;
}

export interface ToastContainerProps {
  message: string | undefined;
  variant: ToastVariant;
  isExiting: boolean;
  onDismiss: () => void;
}

export interface OddsButtonProps {
  value: number;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  selected?: boolean;
  onClick: () => void;
}

export interface CarouselNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}

export interface CarouselProps {
  title?: string;
  children: React.ReactNode;
}

export interface CardHeaderProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: "article" | "div" | "section";
}

export interface SelectedBet {
  pick: Pick;
  betId: string;
}

export interface MatchCardProps {
  match: Match;
  isLoggedIn: boolean;
  selectedBets?: SelectedBet[];
  onBetSuccess?: () => void;
}

export interface MatchCarouselProps {
  matches: Match[];
  isLoggedIn: boolean;
  title?: string;
  selectedBetsByMatchId?: Record<string, SelectedBet[]>;
  onBetSuccess?: () => void;
}