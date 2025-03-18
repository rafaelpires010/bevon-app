import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Lista de rotas desativadas
  const disabledRoutes = ["/cases", "/blog", "/contato"];

  // Verifica se a URL atual está na lista de rotas desativadas
  if (
    disabledRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cases/:path*", "/blog/:path*", "/contato/:path*"],
};
