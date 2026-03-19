import Link from "next/link";
import { auth } from "@/auth";
import type { BetEnriched } from "@/types";
import { redirect } from "next/navigation";
import { BetCard } from "@/components/BetCard";
import { ROUTES, PROFILE_EMPTY_MESSAGE } from "@/lib/constants";
import { internalFetch } from "@/lib/internal-fetch";

async function getBetsEnriched(): Promise<BetEnriched[]> {
  const res = await internalFetch("/api/bets");
  if (!res.ok) return [];
  const data = await res.json();
  return data.bets ?? [];
}

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(ROUTES.PROFILE)}`);
  }

  const bets = await getBetsEnriched();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mis apuestas</h1>
      </header>

      {bets.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/50 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-800/50"
          role="status"
        >
          <p className="text-zinc-600 dark:text-zinc-400">
            {PROFILE_EMPTY_MESSAGE}
          </p>
          <Link
            href={ROUTES.HOME}
            className="mt-4 rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Ver partidos
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {bets.map((bet) => (
            <li key={bet.id}>
              <BetCard bet={bet} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
