import type { NextAuthConfig } from "next-auth";

// Edge: sin Credentials (van en auth.ts)
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
        return false;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
