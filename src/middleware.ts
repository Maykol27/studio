import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Simplemente pasa la solicitud sin modificarla
  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     // Evitar que el middleware se ejecute en rutas de API, archivos estáticos, etc.
//     '/((?!_next|api|images|img|fonts|videos|favicon.ico|sitemap.xml|robots.txt).*)',
//   ],
// };
