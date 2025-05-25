import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

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

// Metadatos por defecto. Serán sobreescritos por los de [locale]/layout.tsx para rutas localizadas.
export const metadata: Metadata = {
  title: 'Aetheria Consulting', // Fallback
  description: 'IA a tu Medida: Nuestro Proceso Hacia Tu Éxito.', // Fallback
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Next.js inyectará dinámicamente el atributo `lang` aquí
  // basado en el `params.locale` del segmento de ruta activo ([locale]).
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
