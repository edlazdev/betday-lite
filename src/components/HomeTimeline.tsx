"use client";

import { useRouter } from "next/navigation";

import type { Match, SelectedBet } from "@/types";
import { MatchCarousel } from "@/components/MatchCarousel";

type Props = {
  groupArray: { hour: string; matches: Match[] }[];
  selectedBetsByMatchId: Record<string, SelectedBet[]>;
  isLoggedIn: boolean;
};

export function HomeTimeline({
  groupArray,
  selectedBetsByMatchId,
  isLoggedIn,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      {groupArray.map(({ hour, matches }) => (
        <MatchCarousel
          key={hour}
          title={hour}
          matches={matches}
          isLoggedIn={isLoggedIn}
          selectedBetsByMatchId={selectedBetsByMatchId}
          onBetSuccess={() => router.refresh()}
        />
      ))}
    </div>
  );
}
