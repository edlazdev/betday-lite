import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Inicio</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Timeline del día y apuestas 1x2 (próximo paso).
      </p>
    </div>
  );
}
