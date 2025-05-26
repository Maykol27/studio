
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This middleware function is a no-op.
// It exists to satisfy Next.js's requirement when a middleware.ts file is present
// but no actual middleware logic is intended to run in the current app state.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// To prevent this middleware from running on any paths, 
// you would typically use an empty matcher or a matcher that doesn't match anything.
// However, for just fixing the export error, the function above is sufficient.
// export const config = {
//   matcher: [], 
// };
