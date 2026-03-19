import { auth } from "@/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import type { SelectedBet } from "@/types";
import { HomeTimeline } from "@/components/HomeTimeline";
import { getMatchesGroupedByHour } from "@/lib/matches-data";
import {
  betsCookieName,
  parseBetsJson,
  sortBetsByPlacedAt,
} from "@/lib/bets-session";

function selectedBetsByMatchIdFromBets(
  bets: { id: string; matchId: string; pick: SelectedBet["pick"] }[]
): Record<string, SelectedBet[]> {
  const map: Record<string, SelectedBet[]> = {};
  for (const b of bets) {
    if (!map[b.matchId]) map[b.matchId] = [];
    map[b.matchId].push({ pick: b.pick, betId: b.id });
  }
  return map;
}

export default async function Home() {
  const session = await auth();
  const grouped = getMatchesGroupedByHour();
  const hours = Array.from(grouped.keys());
  const isLoggedIn = !!session?.user;

  let selectedBetsByMatchId: Record<string, SelectedBet[]> = {};
  if (session?.user?.id) {
    const cookieStore = await cookies();
    const raw = cookieStore.get(betsCookieName(session.user.id))?.value;
    const bets = sortBetsByPlacedAt(parseBetsJson(raw));
    selectedBetsByMatchId = selectedBetsByMatchIdFromBets(bets);
  }

  const groupArray = hours.map((hour) => ({
    hour,
    matches: grouped.get(hour) ?? [],
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-1 text-2xl font-semibold">Partidos del día</h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        Resultado del partido (1X2).{" "}
        {!isLoggedIn && (
          <Link href="/login" className="underline hover:no-underline">
            Inicia sesión
          </Link>
        )}{" "}
        para simular apuestas.
      </p>

      {hours.length === 0 ? (
        <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
          No hay partidos programados para hoy.
        </p>
      ) : (
        <HomeTimeline
          groupArray={groupArray}
          selectedBetsByMatchId={selectedBetsByMatchId}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}
