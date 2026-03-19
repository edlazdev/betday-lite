"use client";

import { useState } from "react";

import { Pick, MatchCardProps } from "@/types";
import {
  BET_DEFAULT_STAKE,
  FEEDBACK_BET_ERROR,
  FEEDBACK_BET_REMOVED,
  FEEDBACK_BET_SUCCESS,
  MARKET_LABEL_1X2,
  MAX_PICKS_PER_MATCH,
  PICK_UPPER,
  TEAM_LABEL_MAX_LENGTH,
} from "@/lib/constants";
import { formatMatchTime, truncateText } from "@/lib/helpers";
import { useToast } from "@/components/providers/ToastProvider";
import { Card, CardHeader, OddsButton } from "@/components/ui/shared";

function existingBetForPick(selectedBets: { pick: Pick; betId: string }[] | undefined, pick: Pick) {
  return selectedBets?.find((b) => b.pick === pick);
}

export function MatchCard({
  match,
  isLoggedIn,
  selectedBets = [],
  onBetSuccess,
}: MatchCardProps) {
  const [loading, setLoading] = useState<Pick | null>(null);
  const toast = useToast();

  const timeStr = formatMatchTime(match.startTime);
  const odds = match.market.odds;

  const handleBet = async (pick: Pick) => {
    if (!isLoggedIn) return;
    const existing = existingBetForPick(selectedBets, pick);
    if (existing) {
      setLoading(pick);
      try {
        const res = await fetch(`/api/bets/${existing.betId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? FEEDBACK_BET_ERROR);
        }
        toast.warning(FEEDBACK_BET_REMOVED);
        onBetSuccess?.();
      } catch {
        toast.error(FEEDBACK_BET_ERROR);
      } finally {
        setLoading(null);
      }
      return;
    }
    if (selectedBets.length >= MAX_PICKS_PER_MATCH) {
      toast.error("Máximo 3 apuestas por partido (1, X, 2).");
      return;
    }
    setLoading(pick);
    try {
      const res = await fetch("/api/bets", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: match.id,
          pick,
          stake: BET_DEFAULT_STAKE,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? FEEDBACK_BET_ERROR);
      }
      toast.success(FEEDBACK_BET_SUCCESS);
      onBetSuccess?.();
    } catch {
      toast.error(FEEDBACK_BET_ERROR);
    } finally {
      setLoading(null);
    }
  };

  const label1 = truncateText(
    match.homeTeam.shortName || match.homeTeam.name,
    TEAM_LABEL_MAX_LENGTH
  );
  const label2 = truncateText(
    match.awayTeam.shortName || match.awayTeam.name,
    TEAM_LABEL_MAX_LENGTH
  );

  const disabled = !isLoggedIn || loading !== null;

  return (
    <Card className="w-72 shrink-0">
      <CardHeader left={timeStr} right={match.league.name} />

      <div className="flex flex-col gap-1 px-4 py-3">
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {match.homeTeam.name}
        </p>
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {match.awayTeam.name}
        </p>
      </div>

      <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <p className="mb-2 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span aria-hidden>ℹ</span>
          {MARKET_LABEL_1X2}
        </p>
        <div className="flex gap-2">
          <OddsButton
            value={odds.home}
            label={label1}
            loading={loading === PICK_UPPER.HOME}
            disabled={disabled}
            selected={!!existingBetForPick(selectedBets, PICK_UPPER.HOME)}
            onClick={() => handleBet(PICK_UPPER.HOME)}
          />
          <OddsButton
            value={odds.draw}
            label="Empate"
            loading={loading === PICK_UPPER.DRAW}
            disabled={disabled}
            selected={!!existingBetForPick(selectedBets, PICK_UPPER.DRAW)}
            onClick={() => handleBet(PICK_UPPER.DRAW)}
          />
          <OddsButton
            value={odds.away}
            label={label2}
            loading={loading === PICK_UPPER.AWAY}
            disabled={disabled}
            selected={!!existingBetForPick(selectedBets, PICK_UPPER.AWAY)}
            onClick={() => handleBet(PICK_UPPER.AWAY)}
          />
        </div>
      </div>
    </Card>
  );
}
