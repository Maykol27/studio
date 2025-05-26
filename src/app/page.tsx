// This file is no longer the main entry point for the landing page.
// The content has been moved to src/app/[locale]/page.tsx
// This file can be deleted or adapted for a non-localized fallback if absolutely necessary,
// but the middleware should handle redirection to localized paths.

// For now, we can redirect to the default locale or show a simple message.
// However, with the current middleware, users should always be redirected.
import { redirect } from 'next/navigation';
import { i18n } from '@/i18n-config';

export default function RootPage() {
  // Redirect to the default locale.
  // The middleware should ideally handle this, but this is a fallback.
  redirect(`/${i18n.defaultLocale}`);
  // Or, if you want to render something minimal:
  // return <p>Loading locale...</p>;
}
