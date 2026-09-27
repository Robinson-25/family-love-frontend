import { NextRequest, NextResponse } from "next/server";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

// El sitio público ya no tiene cuentas de usuario.
// Las direcciones antiguas se redirigen para que ningún enlace viejo quede roto.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/panel-administracion")) {
    return NextResponse.redirect(ADMIN_URL);
  }

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/perfil")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel-administracion/:path*", "/login/:path*", "/register/:path*", "/perfil/:path*"],
};
