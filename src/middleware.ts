// This file can be deleted or left empty if no middleware is needed.
// For this revert, we'll leave it empty to effectively disable it.
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return;
}

export const config = {
  matcher: [], // No routes matched by middleware
};
