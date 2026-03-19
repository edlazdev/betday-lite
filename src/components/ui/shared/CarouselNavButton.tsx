"use client";

import { CarouselNavButtonProps } from "@/types";

const PATH_PREV = "M15 19l-7-7 7-7";
const PATH_NEXT = "M9 5l7 7-7 7";

export function CarouselNavButton({
  direction,
  onClick,
  disabled = false,
  ariaLabel,
}: CarouselNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white disabled:invisible dark:bg-zinc-800/90 dark:hover:bg-zinc-700 ${
        direction === "prev" ? "left-0" : "right-0 left-auto"
      }`}
      aria-label={ariaLabel}
    >
      <svg
        className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "prev" ? PATH_PREV : PATH_NEXT}
        />
      </svg>
    </button>
  );
}
