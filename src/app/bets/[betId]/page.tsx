import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ROUTES,
  PICK_LABEL,
  BET_STATUS_LABEL,
  BET_STATUS_CLASSES,
} from "@/lib/constants";
import BetDetailSkeleton from "./loading";
import { Card } from "@/components/ui/shared";
import { formatMatchTime } from "@/lib/helpers";
import type { BetDetailResponse } from "@/types";
import { internalFetch } from "@/lib/internal-fetch";

type PageProps = { params: Promise<{ betId: string }> };

async function getBetDetail(betId: string): Promise<BetDetailResponse | null> {
  const res = await internalFetch(
    `/api/bets/${encodeURIComponent(betId)}`
  );
  if (!res.ok) return null;
  return res.json();
}

async function BetDetailContent({ betId }: { betId: string }) {
  const data = await getBetDetail(betId);
  if (!data) notFound();

  const { match, ...bet } = data;

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Detalle de la apuesta</h1>
        <Link
          href={ROUTES.PROFILE}
          className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Volver a mis apuestas
        </Link>
      </div>

      <Card as="div" className="w-full">
        <div className="space-y-4 px-4 py-4">
          {match && (
            <div className="border-b border-zinc-200 pb-4 dark:border-zinc-700">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {match.league.name} · {formatMatchTime(match.startTime)}
              </p>
              <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-zinc-200 px-2 py-1 text-sm dark:bg-zinc-700">
              {PICK_LABEL[bet.pick]} @ {bet.odd.toFixed(2)}
            </span>
            <span
              className={`rounded px-2 py-1 text-sm ${BET_STATUS_CLASSES[bet.status]}`}
            >
              {BET_STATUS_LABEL[bet.status]}
            </span>
          </div>
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500 dark:text-zinc-400">Stake</dt>
              <dd className="font-medium">{bet.stake}</dd>
            </div>
            {bet.return !== null && (
              <div className="flex justify-between">
                <dt className="text-zinc-500 dark:text-zinc-400">Return</dt>
                <dd className="font-medium">{bet.return.toFixed(2)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-zinc-500 dark:text-zinc-400">Fecha</dt>
              <dd>{formatMatchTime(bet.placedAt)}</dd>
            </div>
          </dl>
        </div>
      </Card>

      <Link
        href={ROUTES.HOME}
        className="block text-center text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        Ir al inicio
      </Link>
    </div>
  );
}

export default async function BetDetailPage({ params }: PageProps) {
  const { betId } = await params;

  return (
    <Suspense fallback={<BetDetailSkeleton />}>
      <BetDetailContent betId={betId} />
    </Suspense>
  );
}
