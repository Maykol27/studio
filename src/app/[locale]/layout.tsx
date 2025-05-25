import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import '../globals.css'; // Ajustar ruta si es necesario (debe ser correcta)
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['300', '400', '600'],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}>
        {/* ThemeProvider ya está en el RootLayout, no es necesario aquí de nuevo si RootLayout envuelve este */}
        {/* Si este es el layout más externo que usa ThemeProvider, mantenerlo.
            Basado en la estructura de App Router, RootLayout es el más externo.
            Aquí solo necesitamos el contenido específico del locale.
        */}
        {children}
        {/* Toaster también suele estar en RootLayout para ser global */}
      </body>
    </html>
  );
}

// Nota: Si ThemeProvider y Toaster ya están en src/app/layout.tsx (RootLayout),
// no necesitan ser repetidos aquí. El RootLayout envolverá a este LocaleLayout.
// Voy a quitar ThemeProvider y Toaster de aquí, asumiendo que están en el RootLayout que ahora envuelve todo.
// El `lang` y la carga de `metadata` específica del locale son correctos aquí.
