import { auth } from "@/auth";
import { ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(ROUTES.PROFILE)}`);
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mi perfil</h1>
      </header>
      <p className="text-zinc-600 dark:text-zinc-400">
        Aquí se mostrarán tus apuestas.
      </p>
    </div>
  );
}
