import { auth, signOut } from "@/auth";
import { APP_NAME, ROUTES } from "@/lib/constants";
import Link from "next/link";
import { UserMenu } from "./UserMenu";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link
          href={ROUTES.HOME}
          className="font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={ROUTES.HOME}
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Inicio
          </Link>
          {session?.user && (
            <Link
              href={ROUTES.PROFILE}
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Perfil
            </Link>
          )}
          {session?.user ? (
            <UserMenu user={session.user}>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: ROUTES.HOME });
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  role="menuitem"
                >
                  Cerrar sesión
                </button>
              </form>
            </UserMenu>
          ) : (
            <Link
              href="/login"
              className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
