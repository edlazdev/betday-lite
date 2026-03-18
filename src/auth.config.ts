import type { NextAuthConfig } from "next-auth";

/**
 * Configuración Edge-compatible para el middleware.
 * Solo incluye opciones que pueden ejecutarse en Edge (sin Credentials aquí).
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      const isOnBetDetail = nextUrl.pathname.startsWith("/bets/");
      if (isOnProfile || isOnBetDetail) {
        if (isLoggedIn) return true;
        return false; // Redirige a signIn (login)
      }
      return true;
    },
  },
  providers: [], // Credentials se añade en auth.ts (no es Edge-compatible)
} satisfies NextAuthConfig;
