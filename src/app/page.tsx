// This file is no longer used directly for rendering the page.
// The content has been moved to src/app/[locale]/page.tsx
// Next.js with i18n routing will redirect from '/' to '/[defaultLocale]' (e.g., '/es')
// based on the middleware and i18n config.

// You can keep this file minimal or add a redirect component if necessary,
// but middleware should handle it.
export default function RootPage() {
  return null; 
  // Or a component that redirects, though middleware is preferred.
  // For example:
  // import { redirect } from 'next/navigation';
  // import { i18n } from '@/i18n-config';
  // redirect(`/${i18n.defaultLocale}`);
}
