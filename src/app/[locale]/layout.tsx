import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
// Las fuentes, ThemeProvider y Toaster ahora se manejan exclusivamente en RootLayout (src/app/layout.tsx)
// La importación de globals.css también está en RootLayout.

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    // Next.js usará params.locale para el atributo lang en <html> del RootLayout
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale }; // params.locale es usado por Next.js para establecer el lang en <html>
}>) {
  // Este layout no renderiza <html> o <body>.
  // Solo devuelve sus children.
  // El RootLayout (src/app/layout.tsx) ya aplica las fuentes, ThemeProvider y Toaster.
  return <>{children}</>;
}
