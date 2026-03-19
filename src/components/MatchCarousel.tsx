"use client";

import { MatchCard } from "./MatchCard";
import { MatchCarouselProps } from "@/types";
import { Carousel } from "@/components/ui/shared";

export function MatchCarousel({
  matches,
  isLoggedIn,
  title,
  selectedBetsByMatchId,
  onBetSuccess,
}: MatchCarouselProps) {
  if (matches.length === 0) return null;

  return (
    <Carousel title={title}>
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          isLoggedIn={isLoggedIn}
          selectedBets={selectedBetsByMatchId?.[match.id]}
          onBetSuccess={onBetSuccess}
        />
      ))}
    </Carousel>
  );
}
