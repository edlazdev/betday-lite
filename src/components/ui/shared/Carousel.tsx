"use client";

import { useRef, useState, useEffect, useCallback } from "react";

import { CarouselProps } from "@/types";
import {
  CAROUSEL_SCROLL_STEP_FACTOR,
  CAROUSEL_SCROLL_THRESHOLD,
  CAROUSEL_ARIA_PREV,
  CAROUSEL_ARIA_NEXT,
} from "@/lib/constants";
import { CarouselNavButton } from "./CarouselNavButton";

export function Carousel({ title, children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - CAROUSEL_SCROLL_THRESHOLD
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    updateScrollState();
    return () => ro.disconnect();
  }, [updateScrollState]);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * CAROUSEL_SCROLL_STEP_FACTOR;
    el.scrollBy({
      left: dir === "prev" ? -step : step,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 300);
  };

  return (
    <section className="w-full">
      {title && (
        <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {title}
        </h2>
      )}
      <div className="relative">
        <CarouselNavButton
          direction="prev"
          onClick={() => scroll("prev")}
          disabled={!canScrollLeft}
          ariaLabel={CAROUSEL_ARIA_PREV}
        />
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-2 no-scrollbar"
        >
          {children}
        </div>
        <CarouselNavButton
          direction="next"
          onClick={() => scroll("next")}
          disabled={!canScrollRight}
          ariaLabel={CAROUSEL_ARIA_NEXT}
        />
      </div>
    </section>
  );
}
