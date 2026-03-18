import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

const DEMO_EMAIL = process.env.DEMO_USER_EMAIL ?? "demo@betday.dev";
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD ?? "demo123";

const authSecret =
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? "dev-secret-betday-lite-min-32-chars"
    : undefined);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: authSecret,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;
        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          return {
            id: "1",
            email: DEMO_EMAIL,
            name: "Usuario Demo",
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 días
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
