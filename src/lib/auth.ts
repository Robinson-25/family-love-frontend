import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { API_URL } from "./api";

// NextAuth ahora NO toca la base de datos: le pregunta al backend (Express).
// El backend devuelve { user, token } y guardamos ese token en la sesión
// para mandarlo como "Authorization: Bearer <token>" en cada petición.

type BackendSession = {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    image: string | null;
  };
  token: string;
};

async function postBackend(path: string, body: unknown): Promise<BackendSession> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "No se pudo iniciar sesión");
  return data as BackendSession;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { user, token } = await postBackend("/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });
        return {
          id: String(user.id),
          name: user.username,
          email: user.email,
          image: user.image,
          role: user.role,
          accessToken: token,
        };
      },
    }),
  ],
  callbacks: {
    // Al iniciar sesión con Google, el backend verifica el id_token de Google
    // y crea el usuario si no existe.
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!account.id_token) return false;
        try {
          const data = await postBackend("/auth/google", { idToken: account.id_token });
          Object.assign(user, {
            id: String(data.user.id),
            name: data.user.username,
            role: data.user.role,
            image: data.user.image ?? user.image,
            accessToken: data.token,
          });
        } catch (e) {
          console.error("[auth] Google falló:", e);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.image = token.picture ?? undefined;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
