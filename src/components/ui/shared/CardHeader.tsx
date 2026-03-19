"use client";

import { CardHeaderProps } from "@/types";

export function CardHeader({ left, right, className = "" }: CardHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-700 ${className}`.trim()}
    >
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {left}
      </span>
      <span className="truncate text-xs text-zinc-500 dark:text-zinc-500">
        {right}
      </span>
    </div>
  );
}
