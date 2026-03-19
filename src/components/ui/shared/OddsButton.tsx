"use client";

import { OddsButtonProps } from "@/types";

const baseClasses =
  "flex flex-1 flex-col items-center rounded-lg border px-2 py-2 transition-all duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";
const defaultClasses =
  "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:bg-zinc-800";
const selectedClasses =
  "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-200";

export function OddsButton({
  value,
  label,
  loading = false,
  disabled = false,
  selected = false,
  onClick,
}: OddsButtonProps) {
  const buttonClasses = [
    baseClasses,
    selected ? selectedClasses : defaultClasses,
  ].join(" ");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <span
        className={
          selected
            ? "text-sm font-semibold text-emerald-800 dark:text-emerald-200"
            : "text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        }
      >
        {value.toFixed(2)}
      </span>
      <span
        className={
          selected
            ? "truncate text-xs text-emerald-700 dark:text-emerald-300"
            : "truncate text-xs text-zinc-600 dark:text-zinc-400"
        }
      >
        {loading ? "..." : label}
      </span>
    </button>
  );
}
