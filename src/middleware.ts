import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // El panel ahora vive en su propia aplicación.
  if (pathname.startsWith("/panel-administracion")) {
    return NextResponse.redirect(ADMIN_URL);
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session && pathname.startsWith("/perfil")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
