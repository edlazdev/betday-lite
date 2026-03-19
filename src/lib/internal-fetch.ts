import { headers } from "next/headers";

export async function internalFetch(path: string, init?: RequestInit) {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") || "http";
  const cookie = headersList.get("cookie") ?? "";
  const url = path.startsWith("http") ? path : `${proto}://${host}${path}`;

  return fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      ...Object.fromEntries(new Headers(init?.headers).entries()),
      ...(cookie ? { cookie } : {}),
    },
  });
}
