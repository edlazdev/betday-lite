"use client";

import Link from "next/link";

import type { BetCardProps } from "@/types";
import { Card } from "@/components/ui/shared";
import {
  PICK_LABEL,
  ROUTES,
  BET_STATUS_LABEL,
  BET_STATUS_CLASSES,
} from "@/lib/constants";

export function BetCard({ bet }: BetCardProps) {
  return (
    <Link href={ROUTES.BET(bet.id)} className="block transition opacity-90 hover:opacity-100">
      <Card as="div" className="w-full max-w-md">
        <div className="flex flex-col gap-2 px-4 py-3">
          <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {bet.homeTeamName} vs {bet.awayTeamName}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
              {PICK_LABEL[bet.pick]} @ {bet.odd.toFixed(2)}
            </span>
            <span
              className={`rounded px-2 py-0.5 ${BET_STATUS_CLASSES[bet.status]}`}
            >
              {BET_STATUS_LABEL[bet.status]}
            </span>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Stake: {bet.stake}</span>
            {bet.return !== null && (
              <span>Return: {bet.return.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
