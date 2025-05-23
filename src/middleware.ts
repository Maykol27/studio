// This file is intentionally left empty after reverting internationalization features.
// Next.js requires a middleware.ts file to exist if it's referenced in next.config.js,
// but its content can be minimal if no middleware logic is needed.
// For a clean state without i18n, this file would typically be deleted.
// If you have other middleware needs, you can add them here.
// For now, we export an empty middleware function to satisfy Next.js if it expects one.

export function middleware(request: any) {
  // No-op
}

export const config = {
  matcher: [
    // Add paths here if you need middleware for specific routes in the future.
    // For now, an empty or non-matching matcher is fine.
    // '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)', // Original matcher, can be commented out if no middleware is active
  ],
};
