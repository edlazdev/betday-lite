"use client";

import { CardProps } from "@/types";

const cardClasses =
  "flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/80 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/80 dark:hover:shadow-lg dark:hover:shadow-black/10";

export function Card({
  children,
  className = "",
  as: Component = "article",
}: CardProps) {
  return (
    <Component className={`${cardClasses} ${className}`.trim()}>
      {children}
    </Component>
  );
}
