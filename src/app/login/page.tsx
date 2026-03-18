import { signIn } from "@/auth";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

type Props = { searchParams: Promise<{ callbackUrl?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;
  const redirectTo = callbackUrl ?? ROUTES.PROFILE;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
      <form
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirectTo,
          });
        }}
      >
        <input type="hidden" name="callbackUrl" value={redirectTo} />
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="demo@betday.dev"
            className="rounded border border-zinc-300 px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="rounded border border-zinc-300 px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Entrar
        </button>
      </form>
      <p className="text-center text-sm text-zinc-500">
        Demo: <strong>demo@betday.dev</strong> / <strong>demo123</strong>
      </p>
      <Link
        href={ROUTES.HOME}
        className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
