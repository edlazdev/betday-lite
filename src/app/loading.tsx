export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mb-4 h-4 w-96 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-52 w-72 shrink-0 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>
    </div>
  );
}
