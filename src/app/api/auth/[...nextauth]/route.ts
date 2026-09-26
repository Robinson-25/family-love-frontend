import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Esta es la única ruta /api que queda en el frontend:
// maneja la sesión del navegador (cookies). Los datos vienen del backend Express.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
