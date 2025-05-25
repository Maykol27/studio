import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'], // Added 300 for lighter headings if needed
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['300', '400', '600'], // Added 300 for lighter body text
});

export const metadata: Metadata = {
  title: 'Aetheria Consulting',
  description: 'IA a tu Medida: Nuestro Proceso Hacia Tu Éxito.',
  // Consider adding more metadata like open graph tags, icons etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Defaulting to light mode (no 'dark' class on html tag initially)
    // The 'dark' class can be added dynamically if a dark mode toggle is implemented
    <html lang="es">
      <body className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
