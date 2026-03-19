export default function BetDetailLoading() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-6 h-6 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-zinc-700 dark:bg-zinc-800/80">
        <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-4 h-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}
