"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import { UserMenuProps } from "@/types";
import { getInitials } from "@/lib/helpers";

export function UserMenu({ user, children }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Abrir menú de usuario"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "Usuario"}
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <span>{getInitials(user.name)}</span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-zinc-200 bg-white py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
          role="menu"
        >
          <div className="border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {user.name ?? "Usuario"}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {user.email ?? ""}
            </p>
          </div>
          <div className="px-2 py-1">{children}</div>
        </div>
      )}
    </div>
  );
}
