export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>
    </div>
  );
}
